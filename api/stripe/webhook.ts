import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';

// Disable body parsing for raw webhook payload
export const config = {
    api: {
        bodyParser: false,
    },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

// Dynamic import for Supabase to avoid issues
async function getSupabase() {
    const { createClient } = await import('@supabase/supabase-js');
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        { auth: { autoRefreshToken: false, persistSession: false } }
    );
}

/**
 * Find user by email in profiles table
 */
async function findUserByEmail(email: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('email', email)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error finding user:', error);
    }
    return data;
}

/**
 * Create or update subscription in Supabase
 */
async function upsertSubscription(
    userId: string | null,
    stripeSubscription: any,
    customerEmail: string,
    productName: string,
    tier: string
) {
    const supabase = await getSupabase();

    const subscriptionData = {
        user_id: userId,
        stripe_customer_id: typeof stripeSubscription.customer === 'string'
            ? stripeSubscription.customer
            : stripeSubscription.customer?.id,
        stripe_subscription_id: stripeSubscription.id,
        product_name: productName,
        tier: tier,
        status: stripeSubscription.status,
        amount_cents: stripeSubscription.items?.data?.reduce(
            (sum: number, item: any) => sum + (item.price?.unit_amount || 0) * (item.quantity || 1), 0
        ) || 0,
        currency: stripeSubscription.currency,
        billing_interval: stripeSubscription.items?.data?.[0]?.price?.recurring?.interval || 'month',
        current_period_start: stripeSubscription.current_period_start
            ? new Date(stripeSubscription.current_period_start * 1000).toISOString()
            : null,
        current_period_end: stripeSubscription.current_period_end
            ? new Date(stripeSubscription.current_period_end * 1000).toISOString()
            : null,
        cancel_at_period_end: stripeSubscription.cancel_at_period_end || false,
        canceled_at: stripeSubscription.canceled_at
            ? new Date(stripeSubscription.canceled_at * 1000).toISOString()
            : null,
        metadata: {
            customer_email: customerEmail,
            stripe_metadata: stripeSubscription.metadata,
        },
    };

    const { data, error } = await supabase
        .from('subscriptions')
        .upsert(subscriptionData, {
            onConflict: 'stripe_subscription_id',
            ignoreDuplicates: false
        })
        .select()
        .single();

    if (error) {
        console.error('Error upserting subscription:', error);
        throw error;
    }

    return data;
}

/**
 * Record invoice in billing_history
 */
async function recordInvoice(userId: string | null, invoice: any) {
    const supabase = await getSupabase();

    // Find subscription_id in our database
    let subscriptionId = null;
    if (invoice.subscription) {
        const stripeSubId = typeof invoice.subscription === 'string'
            ? invoice.subscription
            : invoice.subscription?.id;

        if (stripeSubId) {
            const { data: sub } = await supabase
                .from('subscriptions')
                .select('id')
                .eq('stripe_subscription_id', stripeSubId)
                .single();

            subscriptionId = sub?.id;
        }
    }

    const invoiceData = {
        user_id: userId,
        subscription_id: subscriptionId,
        stripe_invoice_id: invoice.id,
        stripe_payment_intent_id: typeof invoice.payment_intent === 'string'
            ? invoice.payment_intent
            : invoice.payment_intent?.id || null,
        stripe_charge_id: invoice.charge
            ? (typeof invoice.charge === 'string' ? invoice.charge : invoice.charge?.id)
            : null,
        description: invoice.description || `Invoice ${invoice.number}`,
        amount_cents: invoice.amount_due || 0,
        amount_paid_cents: invoice.amount_paid || 0,
        currency: invoice.currency,
        status: invoice.status === 'paid' ? 'paid' :
            invoice.status === 'open' ? 'pending' :
                invoice.status || 'pending',
        invoice_date: new Date(invoice.created * 1000).toISOString(),
        due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
        paid_at: invoice.status_transitions?.paid_at
            ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
            : null,
        invoice_pdf_url: invoice.invoice_pdf,
        hosted_invoice_url: invoice.hosted_invoice_url,
        metadata: {
            number: invoice.number,
            customer_email: invoice.customer_email,
            lines: invoice.lines?.data?.map((line: any) => ({
                description: line.description,
                amount: line.amount,
            })),
        },
    };

    const { error } = await supabase
        .from('billing_history')
        .upsert(invoiceData, {
            onConflict: 'stripe_invoice_id',
            ignoreDuplicates: false
        });

    if (error) {
        console.error('Error recording invoice:', error);
    }
}

/**
 * Store pending session for later linking during signup
 */
async function storePendingSession(session: any) {
    const supabase = await getSupabase();
    const metadata = session.metadata || {};

    const sessionData = {
        stripe_session_id: session.id,
        stripe_customer_id: typeof session.customer === 'string'
            ? session.customer
            : session.customer?.id,
        customer_email: session.customer_email || '',
        plan_type: metadata.type || 'automation',
        product_name: metadata.productName || 'OASIS AI Automation',
        tier: metadata.tier || 'professional',
        amount_total_cents: session.amount_total,
        currency: session.currency || 'usd',
        status: 'pending',
    };

    const { error } = await supabase
        .from('pending_stripe_sessions')
        .upsert(sessionData, {
            onConflict: 'stripe_session_id',
            ignoreDuplicates: false
        });

    if (error) {
        console.error('Error storing pending session:', error);
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const signature = req.headers['stripe-signature'];
    if (!signature) {
        console.error('No Stripe signature found');
        return res.status(400).json({ error: 'No signature' });
    }

    const rawBody = await getRawBody(req);
    let event: any;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature as string,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: 'Invalid signature' });
    }

    console.log(`📬 Received Stripe event: ${event.type}`);
    const supabase = await getSupabase();

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const metadata = session.metadata;

            console.log('✅ CHECKOUT COMPLETED');
            console.log('Email:', session.customer_email);
            console.log('Amount:', session.amount_total ? `$${session.amount_total / 100}` : 'N/A');

            // Store session for later linking during signup
            await storePendingSession(session);

            // Try to find existing user and link immediately
            if (session.customer_email) {
                const user = await findUserByEmail(session.customer_email);

                if (user && session.subscription) {
                    // User already exists - retrieve full subscription and link
                    const subscription = await stripe.subscriptions.retrieve(
                        typeof session.subscription === 'string'
                            ? session.subscription
                            : session.subscription.id
                    );

                    await upsertSubscription(
                        user.id,
                        subscription,
                        session.customer_email,
                        metadata?.productName || 'OASIS AI Automation',
                        metadata?.tier || 'professional'
                    );

                    console.log(`✅ Linked subscription to existing user: ${user.email}`);

                    // Mark pending session as linked
                    await supabase
                        .from('pending_stripe_sessions')
                        .update({
                            status: 'linked',
                            linked_user_id: user.id,
                            linked_at: new Date().toISOString()
                        })
                        .eq('stripe_session_id', session.id);
                } else {
                    console.log(`⏳ User not found, session stored for later: ${session.customer_email}`);
                }
            }
            break;
        }

        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
            const subscription = event.data.object;
            console.log(`📅 Subscription ${event.type.includes('created') ? 'created' : 'updated'}: ${subscription.id}`);

            // Get customer email
            const customer = typeof subscription.customer === 'string'
                ? await stripe.customers.retrieve(subscription.customer)
                : subscription.customer;

            const email = (customer as any).email;

            if (email) {
                const user = await findUserByEmail(email);
                if (user) {
                    await upsertSubscription(
                        user.id,
                        subscription,
                        email,
                        subscription.metadata?.productName || 'OASIS AI Automation',
                        subscription.metadata?.tier || 'professional'
                    );
                    console.log(`✅ Subscription synced for user: ${email}`);
                }
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object;
            console.log('❌ Subscription cancelled:', subscription.id);

            // Update status in database
            await supabase
                .from('subscriptions')
                .update({
                    status: 'cancelled',
                    canceled_at: new Date().toISOString()
                })
                .eq('stripe_subscription_id', subscription.id);
            break;
        }

        case 'invoice.paid': {
            const invoice = event.data.object;
            console.log('💰 Invoice paid:', invoice.id);

            // Find user and record invoice
            if (invoice.customer_email) {
                const user = await findUserByEmail(invoice.customer_email);
                await recordInvoice(user?.id || null, invoice);
                console.log(`✅ Invoice recorded for: ${invoice.customer_email}`);
            }
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object;
            console.log('⚠️ Payment failed:', invoice.id);

            // Update subscription status if linked
            if (invoice.subscription) {
                const stripeSubId = typeof invoice.subscription === 'string'
                    ? invoice.subscription
                    : invoice.subscription?.id;

                if (stripeSubId) {
                    await supabase
                        .from('subscriptions')
                        .update({ status: 'past_due' })
                        .eq('stripe_subscription_id', stripeSubId);
                }
            }

            // Record failed invoice
            if (invoice.customer_email) {
                const user = await findUserByEmail(invoice.customer_email);
                await recordInvoice(user?.id || null, invoice);
            }
            break;
        }

        case 'invoice.created':
        case 'invoice.finalized': {
            const invoice = event.data.object;
            console.log(`📄 Invoice ${event.type}:`, invoice.id);

            if (invoice.customer_email) {
                const user = await findUserByEmail(invoice.customer_email);
                await recordInvoice(user?.id || null, invoice);
            }
            break;
        }

        case 'checkout.session.expired':
        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;
            const metadata = session.metadata || {};
            const customerEmail = session.customer_email || session.customer_details?.email;
            const type = metadata.type;

            console.log(`🧹 Checkout cancelled/expired: ${session.id}`);

            if (!customerEmail) {
                console.log('No email found in session, skipping cleanup');
                break;
            }

            if (type === 'custom_agreement') {
                // Delete incomplete custom agreements
                const { data: deletedAgreements, error: agreementError } = await supabase
                    .from('custom_agreements')
                    .delete()
                    .eq('client_email', customerEmail)
                    .in('status', ['pending', 'nda_signed', 'legal_accepted'])
                    .select();

                if (agreementError) {
                    console.error('Error deleting custom_agreements:', agreementError);
                } else {
                    console.log(`🗑️ Deleted ${deletedAgreements?.length || 0} incomplete custom agreements for ${customerEmail}`);
                }

                // Delete related legal_acceptances
                const { error: legalError } = await supabase
                    .from('legal_acceptances')
                    .delete()
                    .eq('client_email', customerEmail)
                    .eq('related_purchase_type', 'custom');

                if (legalError) {
                    console.error('Error deleting legal_acceptances:', legalError);
                } else {
                    console.log(`🗑️ Cleaned up legal acceptances for cancelled custom agreement: ${customerEmail}`);
                }
            } else {
                // Standard product purchase cleanup
                const { data: deletedPurchases, error: purchaseError } = await supabase
                    .from('product_purchases')
                    .delete()
                    .eq('client_email', customerEmail)
                    .in('status', ['draft', 'legal_accepted', 'payment_pending'])
                    .select();

                if (purchaseError) {
                    console.error('Error deleting product_purchases:', purchaseError);
                } else {
                    console.log(`🗑️ Deleted ${deletedPurchases?.length || 0} incomplete purchases for ${customerEmail}`);
                }

                // Delete related legal_acceptances
                const productId = metadata.productId;
                if (productId) {
                    const { error: legalError } = await supabase
                        .from('legal_acceptances')
                        .delete()
                        .eq('client_email', customerEmail)
                        .eq('related_purchase_type', productId);

                    if (legalError) {
                        console.error('Error deleting legal_acceptances:', legalError);
                    }
                }
            }

            // Also delete pending session
            const { error: pendingError } = await supabase
                .from('pending_stripe_sessions')
                .delete()
                .eq('stripe_session_id', session.id);

            if (!pendingError) {
                console.log(`🗑️ Removed pending session: ${session.id}`);
            }
            break;
        }

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
}

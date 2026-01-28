/**
 * Stripe Webhook Handler for OASIS AI
 * 
 * This handles all Stripe events and automatically updates Supabase.
 * Deploy this as a Vercel serverless function or Edge function.
 * 
 * SETUP INSTRUCTIONS:
 * 1. In Stripe Dashboard → Developers → Webhooks
 * 2. Add endpoint: https://oasisai.work/api/webhooks/stripe
 * 3. Select events: checkout.session.completed, invoice.paid, customer.subscription.updated
 * 4. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET env var
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe (uses default API version)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Initialize Supabase with service role (bypasses RLS)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Webhook handler
export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature');
    const body = await req.text();

    if (!sig) {
        return new Response('No signature', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log(`Processing Stripe event: ${event.type}`);

    try {
        switch (event.type) {
            // When checkout is completed (payment successful)
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutCompleted(session);
                break;
            }

            // When an invoice is paid (subscription renewals)
            case 'invoice.paid': {
                const invoice = event.data.object as Stripe.Invoice;
                await handleInvoicePaid(invoice);
                break;
            }

            // When subscription status changes
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionUpdated(subscription);
                break;
            }

            // When subscription is deleted/cancelled
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response(JSON.stringify({ received: true }), { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new Response('Webhook processing failed', { status: 500 });
    }
}

/**
 * Handle successful checkout - MOST IMPORTANT
 * This runs when a customer completes payment
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerId = session.customer as string;

    console.log(`Checkout completed for: ${customerEmail}`);

    if (!customerEmail) {
        console.error('No customer email in session');
        return;
    }

    // 1. Update custom_agreements if this was a custom agreement payment
    const { data: agreement, error: agreementError } = await supabase
        .from('custom_agreements')
        .update({
            payment_status: 'paid',
            status: 'active',
            stripe_customer_id: customerId,
            stripe_session_id: session.id,
            paid_at: new Date().toISOString(),
        })
        .eq('client_email', customerEmail.toLowerCase())
        .eq('status', 'nda_signed') // Only update if NDA was signed
        .select()
        .single();

    if (agreement) {
        console.log(`Updated custom agreement for ${customerEmail} to PAID`);
    }

    // 2. Create or update user profile
    await ensureUserProfile(customerEmail, customerId, session);

    // 3. Create subscription record if applicable
    if (session.subscription) {
        await createSubscriptionRecord(session, customerEmail);
    }

    // 4. Create invoice record
    if (session.invoice) {
        const invoice = await stripe.invoices.retrieve(session.invoice as string);
        await upsertInvoice(invoice, customerEmail);
    }
}

/**
 * Handle paid invoices (subscription renewals, one-time payments)
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
    const customerEmail = invoice.customer_email;

    if (!customerEmail) {
        console.error('No customer email in invoice');
        return;
    }

    console.log(`Invoice paid for: ${customerEmail}`);

    // Update any pending agreements
    await supabase
        .from('custom_agreements')
        .update({
            payment_status: 'paid',
            status: 'active',
        })
        .eq('client_email', customerEmail.toLowerCase())
        .in('payment_status', ['pending', null]);

    // Upsert the invoice record
    await upsertInvoice(invoice, customerEmail);
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    // Get customer email
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) return;

    const email = (customer as Stripe.Customer).email;
    if (!email) return;

    console.log(`Subscription updated for: ${email}`);

    // Update subscription record
    const subData = subscription as any;
    await supabase
        .from('subscriptions')
        .update({
            status: subscription.status,
            current_period_start: new Date(subData.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subData.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
        })
        .eq('stripe_subscription_id', subscription.id);
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await supabase
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancel_at_period_end: false,
        })
        .eq('stripe_subscription_id', subscription.id);

    console.log(`Subscription ${subscription.id} cancelled`);
}

/**
 * Ensure user has a profile in Supabase
 */
async function ensureUserProfile(
    email: string,
    stripeCustomerId: string,
    session: Stripe.Checkout.Session
) {
    // Check if profile exists
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

    if (existingProfile) {
        // Update with Stripe customer ID
        await supabase
            .from('profiles')
            .update({ stripe_customer_id: stripeCustomerId })
            .eq('email', email.toLowerCase());
        return;
    }

    // Profile doesn't exist - it will be created when user signs up
    // We can store pending customer info for later linking
    console.log(`Profile not found for ${email} - will be linked on signup`);
}

/**
 * Create subscription record
 */
async function createSubscriptionRecord(
    session: Stripe.Checkout.Session,
    email: string
) {
    const sub = await stripe.subscriptions.retrieve(session.subscription as string);
    const priceId = sub.items.data[0]?.price?.id;
    const price = await stripe.prices.retrieve(priceId);
    const product = await stripe.products.retrieve(price.product as string);

    // Find user
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

    const subData = sub as any;
    await supabase
        .from('subscriptions')
        .upsert({
            user_id: profile?.id,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: sub.id,
            product_name: product.name,
            status: sub.status,
            amount_cents: price.unit_amount || 0,
            currency: price.currency,
            billing_interval: price.recurring?.interval || 'month',
            current_period_start: new Date(subData.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subData.current_period_end * 1000).toISOString(),
        }, { onConflict: 'stripe_subscription_id' });
}

/**
 * Upsert invoice record
 */
async function upsertInvoice(invoice: Stripe.Invoice, email: string) {
    // Find user
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

    await supabase
        .from('invoices')
        .upsert({
            user_id: profile?.id,
            user_email: email.toLowerCase(),
            stripe_invoice_id: invoice.id,
            stripe_customer_id: invoice.customer as string,
            amount_cents: invoice.amount_paid,
            currency: invoice.currency,
            status: invoice.status,
            description: invoice.description || invoice.lines?.data?.[0]?.description || 'Payment',
            invoice_pdf_url: invoice.invoice_pdf,
            hosted_invoice_url: invoice.hosted_invoice_url,
            paid_at: invoice.status === 'paid' ? new Date().toISOString() : null,
        }, { onConflict: 'stripe_invoice_id' });
}

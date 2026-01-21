import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Supabase with SERVICE ROLE key to allow admin actions
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://skgrbweyscysyetubemg.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Initialize Stripe for session retrieval
let stripe: any = null;
async function getStripe() {
    if (!stripe) {
        const Stripe = (await import('stripe')).default;
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
            apiVersion: '2023-10-16' as any,
        });
    }
    return stripe;
}

/**
 * Link Stripe subscription to user after signup
 */
async function linkStripeSubscription(
    userId: string,
    userEmail: string,
    sessionId?: string
) {
    console.log(`🔗 Attempting to link Stripe subscription for user: ${userEmail}`);

    try {
        const stripeClient = await getStripe();

        // Method 1: Try to find pending session by session_id
        if (sessionId) {
            const { data: pendingSession } = await supabase
                .from('pending_stripe_sessions')
                .select('*')
                .eq('stripe_session_id', sessionId)
                .eq('status', 'pending')
                .single();

            if (pendingSession) {
                console.log(`✅ Found pending session: ${sessionId}`);

                // Retrieve full session from Stripe
                const session = await stripeClient.checkout.sessions.retrieve(sessionId, {
                    expand: ['subscription']
                });

                if (session.subscription) {
                    const subscription = typeof session.subscription === 'object'
                        ? session.subscription
                        : await stripeClient.subscriptions.retrieve(session.subscription);

                    // Create subscription record
                    const { error: subError } = await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userId,
                            stripe_customer_id: pendingSession.stripe_customer_id,
                            stripe_subscription_id: subscription.id,
                            product_name: pendingSession.product_name || 'OASIS AI Automation',
                            tier: pendingSession.tier || 'professional',
                            status: subscription.status,
                            amount_cents: subscription.items.data.reduce(
                                (sum: number, item: any) => sum + (item.price?.unit_amount || 0) * (item.quantity || 1), 0
                            ),
                            currency: subscription.currency,
                            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        }, {
                            onConflict: 'stripe_subscription_id'
                        });

                    if (subError) {
                        console.error('Error creating subscription:', subError);
                    } else {
                        console.log(`✅ Subscription linked to user: ${userId}`);
                    }

                    // Fetch and record invoices
                    await syncStripeInvoices(userId, pendingSession.stripe_customer_id, stripeClient);
                }

                // Mark session as linked
                await supabase
                    .from('pending_stripe_sessions')
                    .update({
                        status: 'linked',
                        linked_user_id: userId,
                        linked_at: new Date().toISOString()
                    })
                    .eq('stripe_session_id', sessionId);

                return true;
            }
        }

        // Method 2: Try to find pending session by email
        const { data: pendingByEmail } = await supabase
            .from('pending_stripe_sessions')
            .select('*')
            .eq('customer_email', userEmail)
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (pendingByEmail) {
            console.log(`✅ Found pending session by email: ${userEmail}`);

            if (pendingByEmail.stripe_customer_id) {
                // Find active subscriptions for this customer
                const subscriptions = await stripeClient.subscriptions.list({
                    customer: pendingByEmail.stripe_customer_id,
                    status: 'active',
                    limit: 1,
                });

                if (subscriptions.data.length > 0) {
                    const subscription = subscriptions.data[0];

                    await supabase
                        .from('subscriptions')
                        .upsert({
                            user_id: userId,
                            stripe_customer_id: pendingByEmail.stripe_customer_id,
                            stripe_subscription_id: subscription.id,
                            product_name: pendingByEmail.product_name || 'OASIS AI Automation',
                            tier: pendingByEmail.tier || 'professional',
                            status: subscription.status,
                            amount_cents: subscription.items.data.reduce(
                                (sum: number, item: any) => sum + (item.price?.unit_amount || 0) * (item.quantity || 1), 0
                            ),
                            currency: subscription.currency,
                            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        }, {
                            onConflict: 'stripe_subscription_id'
                        });

                    console.log(`✅ Subscription linked via email match: ${userId}`);

                    // Sync invoices
                    await syncStripeInvoices(userId, pendingByEmail.stripe_customer_id, stripeClient);
                }

                // Mark as linked
                await supabase
                    .from('pending_stripe_sessions')
                    .update({
                        status: 'linked',
                        linked_user_id: userId,
                        linked_at: new Date().toISOString()
                    })
                    .eq('id', pendingByEmail.id);
            }

            return true;
        }

        console.log(`ℹ️ No pending Stripe session found for: ${userEmail}`);
        return false;

    } catch (error) {
        console.error('Error linking Stripe subscription:', error);
        return false;
    }
}

/**
 * Sync all Stripe invoices for a customer
 */
async function syncStripeInvoices(userId: string, customerId: string, stripeClient: any) {
    try {
        const invoices = await stripeClient.invoices.list({
            customer: customerId,
            limit: 50,
        });

        for (const invoice of invoices.data) {
            // Find subscription_id in our database
            let subscriptionId = null;
            if (invoice.subscription) {
                const stripeSubId = typeof invoice.subscription === 'string'
                    ? invoice.subscription
                    : invoice.subscription.id;

                const { data: sub } = await supabase
                    .from('subscriptions')
                    .select('id')
                    .eq('stripe_subscription_id', stripeSubId)
                    .single();

                subscriptionId = sub?.id;
            }

            await supabase
                .from('billing_history')
                .upsert({
                    user_id: userId,
                    subscription_id: subscriptionId,
                    stripe_invoice_id: invoice.id,
                    description: invoice.description || `Invoice ${invoice.number}`,
                    amount_cents: invoice.amount_due,
                    amount_paid_cents: invoice.amount_paid,
                    currency: invoice.currency,
                    status: invoice.status === 'paid' ? 'paid' :
                        invoice.status === 'open' ? 'pending' :
                            invoice.status,
                    invoice_date: new Date(invoice.created * 1000).toISOString(),
                    paid_at: invoice.status_transitions?.paid_at
                        ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
                        : null,
                    invoice_pdf_url: invoice.invoice_pdf,
                    hosted_invoice_url: invoice.hosted_invoice_url,
                }, {
                    onConflict: 'stripe_invoice_id'
                });
        }

        console.log(`✅ Synced ${invoices.data.length} invoices for user: ${userId}`);
    } catch (error) {
        console.error('Error syncing invoices:', error);
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, password, fullName, companyName, sessionId } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        console.log(`📝 Signup attempt: ${email}, sessionId: ${sessionId || 'none'}`);

        // 1. Try to Create User with Admin API (Auto-confirm email)
        const { data: user, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                company_name: companyName
            }
        });

        let targetUser = user?.user;
        let isNewUser = true;

        // Handle "User already registered" case
        if (createError) {
            isNewUser = false;
            console.log('User exists, attempting login...', createError.message);

            // Try to Sign In
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInData?.session) {
                targetUser = signInData.user;

                // Even for existing users, try to link any pending Stripe sessions
                if (targetUser && sessionId) {
                    await linkStripeSubscription(targetUser.id, email, sessionId);
                }

                return res.status(200).json({
                    success: true,
                    user: signInData.user,
                    session: signInData.session,
                    access_token: signInData.session.access_token,
                    refresh_token: signInData.session.refresh_token,
                    message: 'Account existed, logged in successfully.'
                });
            }

            // If Sign In failed because "Email not confirmed", fix it
            if (signInError && signInError.message.includes('Email not confirmed')) {
                console.log('User unverified, forcing verification...');

                const { data: userList } = await supabase.auth.admin.listUsers();
                const existingUser = userList.users.find(u => u.email === email);

                if (existingUser) {
                    await supabase.auth.admin.updateUserById(existingUser.id, { email_confirm: true });
                    const { data: retryData } = await supabase.auth.signInWithPassword({ email, password });

                    if (retryData?.session) {
                        targetUser = retryData.user;

                        if (targetUser && sessionId) {
                            await linkStripeSubscription(targetUser.id, email, sessionId);
                        }

                        return res.status(200).json({
                            success: true,
                            user: retryData.user,
                            session: retryData.session,
                            access_token: retryData.session.access_token,
                            refresh_token: retryData.session.refresh_token
                        });
                    }
                }
            }

            if (signInError) {
                console.error('Login failed during signup reuse:', signInError);
                return res.status(400).json({
                    error: 'Account already exists. Please use the correct password or a different email.'
                });
            }
        }

        if (!targetUser) {
            return res.status(500).json({ error: 'Failed to create or retrieve user object' });
        }

        // 2. For new users, try to link Stripe subscription
        if (isNewUser && (sessionId || email)) {
            await linkStripeSubscription(targetUser.id, email, sessionId);
        }

        // 3. Log the new user in
        const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (sessionError) {
            return res.status(200).json({
                success: true,
                message: 'Account created, but auto-login failed. Please sign in manually.',
                user: targetUser
            });
        }

        return res.status(200).json({
            success: true,
            user: targetUser,
            session: sessionData.session,
            access_token: sessionData.session?.access_token,
            refresh_token: sessionData.session?.refresh_token
        });

    } catch (err: any) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

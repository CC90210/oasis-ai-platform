import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCorsHeaders } from '../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    setCorsHeaders(req, res);

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check for Stripe secret key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        console.error('STRIPE_SECRET_KEY is not set');
        return res.status(500).json({
            error: 'Payment system not configured. Please contact support.'
        });
    }

    // Dynamically import Stripe
    let Stripe;
    try {
        Stripe = (await import('stripe')).default;
    } catch (importError: any) {
        console.error('Failed to import Stripe:', importError.message);
        return res.status(500).json({
            error: 'Payment system error. Please contact support.'
        });
    }

    // Initialize Stripe
    let stripe;
    try {
        stripe = new Stripe(stripeSecretKey, {});
    } catch (initError: any) {
        console.error('Failed to initialize Stripe:', initError.message);
        return res.status(500).json({
            error: 'Payment system error. Please contact support.'
        });
    }

    try {
        const {
            clientName,
            clientEmail,
            companyName,
            automationType,
            upfrontCostCents,
            monthlyCostCents,
            currency = 'usd',
        } = req.body || {};

        // Normalize currency to lowercase
        const normalizedCurrency = (currency || 'usd').toLowerCase();

        // Validate required fields
        if (!clientEmail) {
            return res.status(400).json({ error: 'Client email is required' });
        }

        if (!automationType) {
            return res.status(400).json({ error: 'Automation type is required' });
        }

        if ((!upfrontCostCents || upfrontCostCents <= 0) && (!monthlyCostCents || monthlyCostCents <= 0)) {
            return res.status(400).json({ error: 'At least one cost must be provided' });
        }

        const lineItems: any[] = [];
        const hasMonthlyRecurring = monthlyCostCents && monthlyCostCents > 0;
        const hasUpfront = upfrontCostCents && upfrontCostCents > 0;

        // Determine checkout mode
        // If there's a monthly cost, we use subscription mode
        // If only upfront, we use payment mode
        const mode = hasMonthlyRecurring ? 'subscription' : 'payment';

        // Add upfront/setup fee if exists
        if (hasUpfront) {
            lineItems.push({
                price_data: {
                    currency: normalizedCurrency,
                    product_data: {
                        name: `${automationType} - Setup Fee`,
                        description: companyName
                            ? `Custom agreement for ${companyName}`
                            : `Custom agreement for ${clientName}`,
                    },
                    unit_amount: upfrontCostCents,
                },
                quantity: 1,
            });
        }

        // Add monthly subscription if exists
        if (hasMonthlyRecurring) {
            lineItems.push({
                price_data: {
                    currency: normalizedCurrency,
                    product_data: {
                        name: `${automationType} - Monthly Service`,
                        description: 'Ongoing automation service, maintenance, and support',
                    },
                    unit_amount: monthlyCostCents,
                    recurring: {
                        interval: 'month' as const,
                    },
                },
                quantity: 1,
            });
        }

        // Build checkout session params
        const sessionParams: any = {
            mode,
            line_items: lineItems,
            customer_email: clientEmail,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/custom-agreement/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/custom-agreement?cancelled=true`,
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                type: 'custom_agreement',
                automationType,
                clientName: clientName || '',
                companyName: companyName || '',
                currency: normalizedCurrency,
            },
        };

        // Add subscription metadata if in subscription mode
        if (mode === 'subscription') {
            sessionParams.subscription_data = {
                metadata: {
                    type: 'custom_agreement_subscription',
                    automationType,
                    clientName: clientName || '',
                },
            };
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create(sessionParams);

        // Return success response
        return res.status(200).json({
            url: session.url,
            sessionId: session.id,
        });

    } catch (error: any) {
        console.error('Custom checkout error:', error.message);

        return res.status(500).json({
            error: 'Failed to create checkout session. Please try again.'
        });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check Stripe key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
        console.error('STRIPE_SECRET_KEY not set');
        return res.status(500).json({ error: 'Payment system not configured' });
    }

    try {
        const stripe = new Stripe(stripeSecretKey, {
        });

        const {
            purchaseId,
            productId,
            productName,
            clientEmail,
            upfrontCents,
            monthlyCents,
            currency = 'usd'
        } = req.body;

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        // Setup fee (one-time)
        if (upfrontCents > 0) {
            lineItems.push({
                price_data: {
                    currency,
                    product_data: {
                        name: `${productName} - Setup Fee`,
                    },
                    unit_amount: upfrontCents,
                },
                quantity: 1,
            });
        }

        // Monthly subscription
        if (monthlyCents > 0) {
            lineItems.push({
                price_data: {
                    currency,
                    product_data: {
                        name: `${productName} - Monthly Service`,
                    },
                    unit_amount: monthlyCents,
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: monthlyCents > 0 ? 'subscription' : 'payment',
            line_items: lineItems,
            customer_email: clientEmail,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oasisai.work'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&purchase_id=${purchaseId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oasisai.work'}/checkout?cancelled=true`,
            metadata: {
                purchaseId,
                productId,
            },
            payment_method_types: ['card'],
            allow_promotion_codes: true,
        });

        return res.status(200).json({ url: session.url });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return res.status(500).json({ error: error.message || 'Checkout failed' });
    }
}

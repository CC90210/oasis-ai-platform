import type { VercelRequest, VercelResponse } from '@vercel/node';

const PAYPAL_CLIENT_ID = process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || 'AWj36CkXVGVjHIIO7LHsvtRQoACy6Gbg4KTJu0CD1dJrRBkLqm8G9PYIpr40vCZ8ZZl63o-5eHDfD-8J';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'ECNgsX5iCs5Xi2xI6gU1pEX6lm00BvCXcskSfTuj8a_v-FwHCiL5LFPjG8PspiH60fz-_JiGiVBcJops';
const PAYPAL_API = 'https://api-m.paypal.com'; // Use sandbox for testing: https://api-m.sandbox.paypal.com

// Same pricing data as Stripe to match pricing
const PRICING: Record<string, { setupFee: number; tiers?: Record<string, number>; monthlyFee?: number }> = {
    // Standard tier ($149/$297/$497)
    'website-chat': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },
    'email': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },
    'appointment-booking': { setupFee: 897, tiers: { starter: 149, professional: 297, business: 497 } },
    'google-review': { setupFee: 797, tiers: { starter: 149, professional: 297, business: 497 } },
    'invoice-handling': { setupFee: 1197, tiers: { starter: 149, professional: 297, business: 497 } },
    'website-building': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },

    // Premium tier ($197/$347/$547)
    'voice-ai': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'lead-generation': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'social-media': { setupFee: 1197, tiers: { starter: 197, professional: 347, business: 547 } },
    'revenue-ops': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'document-processing': { setupFee: 1697, tiers: { starter: 197, professional: 347, business: 547 } },
    'hr-onboarding': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },

    // Bundles
    'launchpad': { setupFee: 1497, monthlyFee: 347 },
    'integration-suite': { setupFee: 4997, monthlyFee: 497 },
};

async function getPayPalAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
        throw new Error('Missing PayPal credentials');
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            // 'Content-Type': 'application/x-www-form-urlencoded', // fetch automatically sets this if body is URLSearchParams, but here we likely need standard form-urlencoding string
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get PayPal access token: ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
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
        const { productId, productType, tier, currency = 'usd', discountPercent = 0 } = req.body;

        // Get pricing (same logic as Stripe)
        const pricing = PRICING[productId];
        if (!pricing) {
            return res.status(400).json({ error: 'Invalid product' });
        }

        let setupFee = pricing.setupFee;
        let monthlyFee: number;

        if (productType === 'bundle' || pricing.monthlyFee !== undefined) {
            monthlyFee = pricing.monthlyFee!;
        } else {
            if (!pricing.tiers || !pricing.tiers[tier]) {
                return res.status(400).json({ error: 'Invalid tier' });
            }
            monthlyFee = pricing.tiers[tier];
        }

        // Apply discount if valid
        if (discountPercent > 0 && discountPercent <= 50) {
            const multiplier = 1 - (discountPercent / 100);
            setupFee = Math.round(setupFee * multiplier);
            monthlyFee = Math.round(monthlyFee * multiplier);
        }

        // For first payment: setup fee + first month
        const totalAmount = setupFee + monthlyFee;

        // Get PayPal access token
        const accessToken = await getPayPalAccessToken();

        // Create PayPal order
        const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: currency.toUpperCase(),
                        value: totalAmount.toFixed(2),
                    },
                    description: `OASIS AI - ${productId} (${tier || 'bundle'})`,
                }],
                application_context: {
                    brand_name: 'OASIS AI',
                    return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/checkout/success?method=paypal`,
                    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/pricing`,
                },
            }),
        });

        const order = await orderResponse.json();

        // Find approval URL
        const approvalUrl = order.links?.find((link: any) => link.rel === 'approve')?.href;

        if (!approvalUrl) {
            throw new Error('Failed to get PayPal approval URL');
        }

        return res.status(200).json({
            orderId: order.id,
            approvalUrl,
        });

    } catch (error: any) {
        console.error('PayPal checkout error:', error);
        return res.status(500).json({ error: error.message || 'PayPal checkout failed' });
    }
}

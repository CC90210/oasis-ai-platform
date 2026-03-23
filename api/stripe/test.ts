import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        // Test 1: Can we import stripe?
        const { stripe } = require('../_lib/stripe');
        const hasWebhooks = typeof stripe.webhooks === 'object';

        return res.json({
            status: 'ok',
            stripeLoaded: true,
            hasWebhooks,
            envCheck: {
                STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
                STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
                SUPABASE_URL: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL),
                SUPABASE_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            },
            nodeVersion: process.version,
        });
    } catch (err: any) {
        return res.status(500).json({
            status: 'error',
            error: err.message,
            stack: err.stack?.split('\n').slice(0, 5),
        });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        // Dynamic import to avoid Node v24 cold-start crash
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
        return res.json({
            status: 'ok',
            stripeLoaded: typeof stripe.webhooks === 'object',
            envCheck: {
                STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
                STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
            },
            nodeVersion: process.version,
        });
    } catch (err: any) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
}

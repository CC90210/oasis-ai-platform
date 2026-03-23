import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../_lib/stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
    try {
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

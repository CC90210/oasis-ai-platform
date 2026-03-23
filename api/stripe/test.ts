import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
    return res.json({
        status: 'ok',
        envCheck: {
            STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
            STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
        },
        nodeVersion: process.version,
    });
}

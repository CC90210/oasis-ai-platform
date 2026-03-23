import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStripe } from '../_lib/stripe';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const stripe = await getStripe();
        return res.json({
            status: 'ok',
            stripeLoaded: typeof stripe.webhooks === 'object',
            nodeVersion: process.version,
        });
    } catch (err: any) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authenticateUser, setCorsHeaders, supabase } from '../_lib/auth';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        return res.json({
            status: 'ok',
            supabaseLoaded: typeof supabase === 'object',
            nodeVersion: process.version,
        });
    } catch (err: any) {
        return res.status(500).json({ status: 'error', error: err.message });
    }
}

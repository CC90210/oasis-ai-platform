import type { VercelRequest, VercelResponse } from '@vercel/node';

let _supabase: any = null;

async function getSupabase() {
    if (!_supabase) {
        const { createClient } = await import('@supabase/supabase-js');
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
        _supabase = createClient(url, key);
    }
    return _supabase;
}

/**
 * Validates the Supabase session from the request headers
 * @returns The user object if valid, null otherwise
 */
export async function authenticateUser(req: VercelRequest) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const supabase = await getSupabase();
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        console.error('Authentication error:', error?.message);
        return null;
    }

    return user;
}

/**
 * Get supabase client for direct queries
 */
export async function getSupabaseClient() {
    return getSupabase();
}

/**
 * Restricts CORS to allowed origins or whitelists
 */
export function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
    const allowedOrigins = [
        'https://oasisai.work',
        'https://www.oasisai.work',
        'http://localhost:3000',
        'http://localhost:5173'
    ];

    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://oasisai.work');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
}

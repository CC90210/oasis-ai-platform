import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Supabase with SERVICE ROLE key to allow admin actions (like auto-confirming emails)
// We prioritize the key from the environment, but fallback to the one provided by the user if needed for immediate stability
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://skgrbweyscysyetubemg.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c3lldHViZW1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY2NjY3NCwiZXhwIjoyMDgzMjQyNjc0fQ.VawWeg_UCTPutIosfOaVyF8IgVT4iSIiXArhX2XxZn0';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
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
        const { email, password, fullName, companyName } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 1. Create User with Admin API (Auto-confirm email)
        const { data: user, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // This bypasses the email verification requirement!
            user_metadata: {
                full_name: fullName,
                company_name: companyName
            }
        });

        if (createError) {
            console.error('Signup Error:', createError);
            return res.status(400).json({ error: createError.message });
        }

        if (!user.user) {
            return res.status(500).json({ error: 'Failed to create user object' });
        }

        // 2. Insert into Profiles table (if you have one, usually handled by triggers, but safe to ensure)
        // We'll trust the trigger or existing flows if you have them, but since we are admin, we can modify public.profiles if needed.
        // For now, we assume the Auth creation is sufficient as triggers usually handle the rest.

        // 3. Log the user in immediately to get a session token to return to client
        // Since we just created them, we know the password.
        const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (sessionError) {
            // This shouldn't happen if creation succeeded, but handle it
            return res.status(200).json({
                success: true,
                message: 'Account created, but auto-login failed. Please sign in manually.',
                user: user.user
            });
        }

        return res.status(200).json({
            success: true,
            user: user.user,
            session: sessionData.session, // Return the session so the client can auto-login
            access_token: sessionData.session?.access_token,
            refresh_token: sessionData.session?.refresh_token
        });

    } catch (err: any) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

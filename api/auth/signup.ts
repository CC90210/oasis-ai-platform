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

        // 1. Try to Create User with Admin API (Auto-confirm email)
        const { data: user, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                company_name: companyName
            }
        });

        let targetUser = user.user;

        // Handle "User already registered" case
        if (createError) {
            // If user exists, we want to allow them to "signup" again (essentially login) 
            // OR fix their hung "unverified" state.
            console.log('User exists, attempting checks...', createError.message);

            // 2. Try to Sign In
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInData.session) {
                // It worked! Just return the session.
                return res.status(200).json({
                    success: true,
                    user: signInData.user,
                    session: signInData.session,
                    access_token: signInData.session.access_token,
                    refresh_token: signInData.session.refresh_token,
                    message: 'Account existed, logged in successfully.'
                });
            }

            // 3. If Sign In failed because "Email not confirmed", fix it.
            if (signInError && signInError.message.includes('Email not confirmed')) {
                console.log('User unverified, forcing verification...');

                // We need the User ID to update them. Since we have Service Key, we can search.
                // Note: listUsers is not efficient for millions of users, but fine for portal.
                const { data: userList } = await supabase.auth.admin.listUsers();
                const existingUser = userList.users.find(u => u.email === email);

                if (existingUser) {
                    // Force confirm
                    await supabase.auth.admin.updateUserById(existingUser.id, { email_confirm: true });

                    // Retry Login
                    const { data: retryData } = await supabase.auth.signInWithPassword({ email, password });

                    if (retryData.session) {
                        return res.status(200).json({
                            success: true,
                            user: retryData.user,
                            session: retryData.session,
                            access_token: retryData.session.access_token,
                            refresh_token: retryData.session.refresh_token
                        });
                    }
                }
            }

            // If password was wrong or other error
            if (signInError) {
                console.error('Login failed during signup reuse:', signInError);
                return res.status(400).json({ error: 'Account already exists. Please use the correct password or a different email.' });
            }
        }

        if (!targetUser) {
            return res.status(500).json({ error: 'Failed to create or retrieve user object' });
        }

        // 4. Log the new user in (if we just created them)
        const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (sessionError) {
            // This shouldn't happen if creation succeeded, but handle it
            return res.status(200).json({
                success: true,
                message: 'Account created, but auto-login failed. Please sign in manually.',
                user: targetUser
            });
        }

        return res.status(200).json({
            success: true,
            user: targetUser,
            session: sessionData.session, // Return the session so the client can auto-login
            access_token: sessionData.session?.access_token,
            refresh_token: sessionData.session?.refresh_token
        });

    } catch (err: any) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

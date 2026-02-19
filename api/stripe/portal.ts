import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';
import { authenticateUser, setCorsHeaders, supabase } from '../lib/auth';

/**
 * POST /api/stripe/portal
 * Create a Stripe Billing Portal session for the customer
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Authenticate User (Principle 4)
        const user = await authenticateUser(req);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized. Please sign in.' });
        }

        const { customerId, returnUrl } = req.body;

        // 2. Validate Input (Principle 2)
        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID required' });
        }

        // 3. Authorization Check (Principle 4 / 7)
        // Verify this customer ID belongs to the authenticated user
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single();

        if (profileError || profile?.stripe_customer_id !== customerId) {
            console.error(`🔒 Security Alert: User ${user.email} attempted to access portal for different customer: ${customerId}`);
            return res.status(403).json({ error: 'Access denied. This is not your billing account.' });
        }

        // Determine return URL
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work';
        const finalReturnUrl = returnUrl || `${appUrl}/portal/billing`;

        // Create Stripe Billing Portal Session
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: finalReturnUrl,
        });

        console.log(`✅ Portal session created for user: ${user.id}`); // Log ID, not PII

        return res.status(200).json({
            url: session.url,
            success: true
        });
    } catch (error: any) {
        console.error('Portal error:', error.message);

        // Handle specific Stripe errors
        if (error.code === 'resource_missing') {
            return res.status(404).json({
                error: 'Billing account not found. Please contact support.'
            });
        }

        return res.status(500).json({
            error: 'Failed to create portal session. Please try again.'
        });
    }
}

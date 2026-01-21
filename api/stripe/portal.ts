import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';

/**
 * POST /api/stripe/portal
 * Create a Stripe Billing Portal session for the customer
 * 
 * Allows customers to:
 * - Update payment methods
 * - View invoice history
 * - Cancel subscription
 * - Upgrade/downgrade plans (if configured in Stripe Dashboard)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { customerId, returnUrl } = req.body;

        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID required' });
        }

        // Determine return URL
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work';
        const finalReturnUrl = returnUrl || `${appUrl}/portal/billing`;

        // Create Stripe Billing Portal Session
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: finalReturnUrl,
            // Optional: Configure what the customer can do
            // This can also be set in Stripe Dashboard under Billing > Customer Portal
        });

        console.log(`✅ Portal session created for customer: ${customerId}`);

        return res.status(200).json({
            url: session.url,
            success: true
        });
    } catch (error: any) {
        console.error('Portal error:', error);

        // Handle specific Stripe errors
        if (error.code === 'resource_missing') {
            return res.status(404).json({
                error: 'Customer not found in Stripe. Please contact support.'
            });
        }

        return res.status(500).json({
            error: error.message || 'Failed to create portal session'
        });
    }
}

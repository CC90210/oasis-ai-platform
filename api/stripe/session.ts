import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';
import { setCorsHeaders } from '../lib/auth';

/**
 * GET /api/stripe/session?session_id=xxx
 * Retrieve Stripe checkout session details for post-purchase flow
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { session_id } = req.query;

        if (!session_id || typeof session_id !== 'string') {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Retrieve the checkout session from Stripe
        // Expanded customer and subscription to provide details for the success page
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['subscription', 'customer', 'line_items']
        });

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Extract relevant data
        const subscription = session.subscription as any;
        const customer = session.customer as any;
        const lineItems = session.line_items?.data || [];

        // Determine plan details
        let planType = session.metadata?.type || 'automation';
        let productName = 'OASIS AI Automation';
        let tier = session.metadata?.tier || 'professional';
        let monthlyAmount = 0;

        for (const item of lineItems) {
            if (item.price?.recurring) {
                monthlyAmount = (item.amount_total || 0);
                productName = item.description || (item.price?.product as any)?.name || productName;
            }
        }

        if (subscription && typeof subscription === 'object') {
            const subItems = subscription.items?.data || [];
            if (subItems.length > 0) {
                monthlyAmount = subItems.reduce((total: number, item: any) => {
                    return total + (item.price?.unit_amount || 0) * (item.quantity || 1);
                }, 0);
            }
        }

        // Build response
        const response = {
            success: true,
            session: {
                id: session.id,
                status: session.status,
                payment_status: session.payment_status,
                amount_total: session.amount_total,
                currency: session.currency,
            },
            subscription: subscription ? {
                id: subscription.id,
                status: subscription.status,
                current_period_end: subscription.current_period_end,
            } : null,
            customer: customer ? {
                // Only provide non-sensitive name for the UI
                name: customer.name,
                email: customer.email
            } : null,
            plan: {
                type: planType,
                product_name: productName,
                tier: tier,
                monthly_amount_cents: monthlyAmount,
                currency: session.currency || 'usd',
            },
            metadata: session.metadata,
        };

        return res.status(200).json(response);

    } catch (error: any) {
        console.error('Session retrieval error:', error.message);

        if (error.code === 'resource_missing') {
            return res.status(404).json({ error: 'Checkout session not found' });
        }

        return res.status(500).json({
            error: 'Failed to retrieve session details. Please try again.'
        });
    }
}

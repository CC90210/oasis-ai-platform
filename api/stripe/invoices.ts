import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';
import { authenticateUser, setCorsHeaders, supabase } from '../lib/auth';

/**
 * GET /api/stripe/invoices?customer_id=xxx
 * Fetch all invoices for a Stripe customer
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
        // 1. Authenticate User (Principle 4)
        const user = await authenticateUser(req);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized. Please sign in.' });
        }

        const { customer_id, limit = '10' } = req.query;

        if (!customer_id || typeof customer_id !== 'string') {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        // 2. Authorization Check (Principle 4 / 7)
        // Verify this customer ID belongs to the authenticated user
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single();

        if (profileError || profile?.stripe_customer_id !== customer_id) {
            console.error(`🔒 Security Alert: User ${user.id} attempted to access invoices for different customer: ${customer_id}`);
            return res.status(403).json({ error: 'Access denied. These are not your invoices.' });
        }

        // Fetch invoices from Stripe
        const invoices = await stripe.invoices.list({
            customer: customer_id,
            limit: Math.min(parseInt(limit as string) || 10, 100),
            expand: ['data.subscription'],
        });

        // Transform to a simpler format
        const formattedInvoices = invoices.data.map((invoice) => ({
            id: invoice.id,
            number: invoice.number,
            description: invoice.description || `Invoice ${invoice.number}`,
            amount_cents: invoice.amount_due,
            amount_paid_cents: invoice.amount_paid,
            currency: invoice.currency,
            status: invoice.status,
            invoice_date: invoice.created ? new Date(invoice.created * 1000).toISOString() : null,
            due_date: invoice.due_date ? new Date(invoice.due_date * 1000).toISOString() : null,
            paid_at: invoice.status_transitions?.paid_at
                ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
                : null,
            invoice_pdf_url: invoice.invoice_pdf,
            hosted_invoice_url: invoice.hosted_invoice_url,
            subscription_id: typeof (invoice as any).subscription === 'string'
                ? (invoice as any).subscription
                : (invoice as any).subscription?.id,
            line_items: invoice.lines?.data?.map((line: any) => ({
                description: line.description,
                amount: line.amount,
                quantity: line.quantity,
            })) || [],
        }));

        return res.status(200).json({
            success: true,
            invoices: formattedInvoices,
            has_more: invoices.has_more,
        });

    } catch (error: any) {
        console.error('Invoices retrieval error:', error.message);

        if (error.code === 'resource_missing') {
            return res.status(404).json({ error: 'Billing records not found' });
        }

        return res.status(500).json({
            error: 'Failed to retrieve invoices. Please try again.'
        });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';

/**
 * GET /api/stripe/invoices?customer_id=xxx
 * Fetch all invoices for a Stripe customer
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { customer_id, limit = '10' } = req.query;

        if (!customer_id || typeof customer_id !== 'string') {
            return res.status(400).json({ error: 'Customer ID is required' });
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
            line_items: invoice.lines?.data?.map((line) => ({
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
        console.error('Invoices retrieval error:', error);

        if (error.code === 'resource_missing') {
            return res.status(404).json({ error: 'Customer not found' });
        }

        return res.status(500).json({
            error: error.message || 'Failed to retrieve invoices'
        });
    }
}

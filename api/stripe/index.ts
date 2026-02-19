import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../_lib/stripe';
import { authenticateUser, setCorsHeaders, supabase } from '../_lib/auth';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    setCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Route based on a 'flow' query parameter or request body
    const flow = req.query.flow || req.body?.flow;

    try {
        switch (flow) {
            case 'portal':
                return await handlePortal(req, res);
            case 'invoices':
                return await handleInvoices(req, res);
            case 'checkout':
                return await handleCheckout(req, res);
            case 'custom-checkout':
                return await handleCustomCheckout(req, res);
            case 'session':
                return await handleSession(req, res);
            default:
                return res.status(400).json({ error: 'Invalid or missing flow parameter' });
        }
    } catch (error: any) {
        console.error(`Stripe unexpected error [${flow}]:`, error.message);
        return res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
}

/**
 * Logic from portal.ts
 */
async function handlePortal(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const user = await authenticateUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { customerId, returnUrl } = req.body;
    if (!customerId) return res.status(400).json({ error: 'Customer ID required' });

    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single();
    if (profile?.stripe_customer_id !== customerId) return res.status(403).json({ error: 'Access denied' });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work';
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl || `${appUrl}/portal/billing`,
    });

    return res.status(200).json({ url: session.url, success: true });
}

/**
 * Logic from invoices.ts
 */
async function handleInvoices(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') return res.status(405).end();

    const user = await authenticateUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { customer_id, limit = '10' } = req.query;
    if (!customer_id) return res.status(400).json({ error: 'Customer ID required' });

    const { data: profile } = await supabase.from('profiles').select('stripe_customer_id').eq('id', user.id).single();
    if (profile?.stripe_customer_id !== customer_id) return res.status(403).json({ error: 'Access denied' });

    const invoices = await stripe.invoices.list({
        customer: customer_id as string,
        limit: Math.min(parseInt(limit as string) || 10, 100),
        expand: ['data.subscription'],
    });

    const formattedInvoices = invoices.data.map((invoice) => ({
        id: invoice.id,
        number: invoice.number,
        description: invoice.description || `Invoice ${invoice.number}`,
        amount_cents: invoice.amount_due,
        amount_paid_cents: invoice.amount_paid,
        currency: invoice.currency,
        status: invoice.status,
        invoice_date: invoice.created ? new Date(invoice.created * 1000).toISOString() : null,
        invoice_pdf_url: invoice.invoice_pdf,
        hosted_invoice_url: invoice.hosted_invoice_url,
    }));

    return res.status(200).json({ success: true, invoices: formattedInvoices, has_more: invoices.has_more });
}

/**
 * Logic from checkout.ts
 */
async function handleCheckout(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { purchaseId, productId, productName, clientEmail, upfrontCents, monthlyCents, currency = 'usd' } = req.body;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    if (upfrontCents > 0) {
        lineItems.push({
            price_data: { currency, product_data: { name: `${productName} - Setup Fee` }, unit_amount: upfrontCents },
            quantity: 1,
        });
    }
    if (monthlyCents > 0) {
        lineItems.push({
            price_data: {
                currency,
                product_data: { name: `${productName} - Monthly Service` },
                unit_amount: monthlyCents,
                recurring: { interval: 'month' }
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
        mode: monthlyCents > 0 ? 'subscription' : 'payment',
        line_items: lineItems,
        customer_email: clientEmail,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oasisai.work'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&purchase_id=${purchaseId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://oasisai.work'}/checkout?cancelled=true`,
        metadata: { purchaseId, productId },
        payment_method_types: ['card'],
        allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
}

/**
 * Logic from custom-checkout.ts
 */
async function handleCustomCheckout(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { clientEmail, automationType, upfrontCostCents, monthlyCostCents, currency = 'usd', clientName, companyName } = req.body;

    const lineItems: any[] = [];
    if (upfrontCostCents > 0) {
        lineItems.push({
            price_data: {
                currency,
                product_data: { name: `${automationType} - Setup Fee`, description: `Custom agreement for ${companyName || clientName}` },
                unit_amount: upfrontCostCents,
            },
            quantity: 1,
        });
    }
    if (monthlyCostCents > 0) {
        lineItems.push({
            price_data: {
                currency,
                product_data: { name: `${automationType} - Monthly Service` },
                unit_amount: monthlyCostCents,
                recurring: { interval: 'month' },
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
        mode: monthlyCostCents > 0 ? 'subscription' : 'payment',
        line_items: lineItems,
        customer_email: clientEmail,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/custom-agreement/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/custom-agreement?cancelled=true`,
        metadata: { type: 'custom_agreement', automationType, clientName, companyName },
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
}

/**
 * Logic from session.ts
 */
async function handleSession(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') return res.status(405).end();

    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: 'Session ID required' });

    const session = await stripe.checkout.sessions.retrieve(session_id as string, {
        expand: ['subscription', 'customer', 'line_items']
    });

    return res.status(200).json({
        success: true,
        session: { id: session.id, status: session.status, payment_status: session.payment_status },
        customer: { name: (session.customer as any)?.name, email: (session.customer as any)?.email },
        metadata: session.metadata
    });
}

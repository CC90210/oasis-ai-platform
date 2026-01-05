import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';

export const config = {
    api: {
        bodyParser: false,
    },
};

async function getRawBody(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const signature = req.headers['stripe-signature'];
    if (!signature) {
        console.error('No Stripe signature found');
        return res.status(400).json({ error: 'No signature' });
    }

    const rawBody = await getRawBody(req);
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature as string,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: 'Invalid signature' });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const metadata = session.metadata;

            console.log('✅ SALE COMPLETED!');
            console.log('-------------------');
            console.log('Product:', metadata?.productName);
            console.log('Type:', metadata?.productType);
            console.log('Tier:', metadata?.tier || 'N/A');
            console.log('Customer:', metadata?.customerName);
            console.log('Business:', metadata?.businessName);
            console.log('Email:', session.customer_email);
            console.log('Amount:', session.amount_total ? `$${session.amount_total / 100}` : 'N/A');
            console.log('Currency:', metadata?.currency?.toUpperCase());
            console.log('Session ID:', session.id);
            console.log('-------------------');

            // TODO: Add your business logic here
            break;
        }

        case 'customer.subscription.created': {
            const subscription = event.data.object as Stripe.Subscription;
            console.log('📅 New subscription created:', subscription.id);
            console.log('Status:', subscription.status);
            break;
        }

        case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription;
            console.log('🔄 Subscription updated:', subscription.id);
            console.log('New status:', subscription.status);
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            console.log('❌ Subscription cancelled:', subscription.id);
            break;
        }

        case 'invoice.paid': {
            const invoice = event.data.object as Stripe.Invoice;
            console.log('💰 Invoice paid:', invoice.id);
            console.log('Amount:', `$${(invoice.amount_paid || 0) / 100}`);
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object as Stripe.Invoice;
            console.log('⚠️ Payment failed:', invoice.id);
            console.log('Customer:', invoice.customer_email);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
}

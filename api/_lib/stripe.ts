import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
        }
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
        });
    }
    return _stripe;
}

// Backwards compat — calls getStripe() on first use
export const stripe = {
    get webhooks() { return getStripe().webhooks; },
    get customers() { return getStripe().customers; },
    get subscriptions() { return getStripe().subscriptions; },
    get checkout() { return getStripe().checkout; },
    get invoices() { return getStripe().invoices; },
    get billingPortal() { return getStripe().billingPortal; },
    get prices() { return getStripe().prices; },
    get products() { return getStripe().products; },
    get paymentIntents() { return getStripe().paymentIntents; },
} as unknown as Stripe;

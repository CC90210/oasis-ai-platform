import type Stripe from 'stripe';

let _stripe: Stripe | null = null;

export async function getStripe(): Promise<Stripe> {
    if (!_stripe) {
        const { default: StripeSDK } = await import('stripe');
        _stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY || '');
    }
    return _stripe;
}

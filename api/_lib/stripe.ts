// Stripe SDK lazy loader
// The stripe npm package crashes on top-level import in Node v24.
// Each handler must use: const stripe = await getStripe()
// This file exists only as documentation — handlers should import inline.

let _stripe: any = null;

export async function getStripe(): Promise<any> {
    if (!_stripe) {
        const mod = 'stripe';
        const { default: StripeSDK } = await import(mod);
        _stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY || '');
    }
    return _stripe;
}

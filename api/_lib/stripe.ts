let _stripe: any = null;

export async function getStripe(): Promise<any> {
    if (!_stripe) {
        // Use variable to prevent bundler from statically resolving the import
        const mod = 'stripe';
        const { default: StripeSDK } = await import(/* webpackIgnore: true */ mod);
        _stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY || '');
    }
    return _stripe;
}

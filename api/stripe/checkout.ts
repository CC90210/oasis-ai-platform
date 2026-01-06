import type { VercelRequest, VercelResponse } from '@vercel/node';

// Pricing data - hardcoded to avoid any import issues
// This ensures the API route is self-contained and doesn't fail due to import resolution errors
const PRICING: Record<string, { setupFee: number; tiers?: Record<string, number>; monthlyFee?: number }> = {
    // Standard tier ($149/$297/$497)
    'website-chat': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },
    'email': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },
    'appointment-booking': { setupFee: 897, tiers: { starter: 149, professional: 297, business: 497 } },
    'google-review': { setupFee: 797, tiers: { starter: 149, professional: 297, business: 497 } },
    'invoice-handling': { setupFee: 1197, tiers: { starter: 149, professional: 297, business: 497 } },
    'website-building': { setupFee: 997, tiers: { starter: 149, professional: 297, business: 497 } },

    // Premium tier ($197/$347/$547)
    'voice-ai': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'lead-generation': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'social-media': { setupFee: 1197, tiers: { starter: 197, professional: 347, business: 547 } },
    'revenue-ops': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },
    'document-processing': { setupFee: 1697, tiers: { starter: 197, professional: 347, business: 547 } },
    'hr-onboarding': { setupFee: 1497, tiers: { starter: 197, professional: 347, business: 547 } },

    // Bundles
    'launchpad': { setupFee: 1497, monthlyFee: 347 },
    'integration-suite': { setupFee: 4997, monthlyFee: 497 },
};

const PRODUCT_NAMES: Record<string, string> = {
    'website-chat': 'Website Chat Automation',
    'email': 'Email Automation',
    'appointment-booking': 'Appointment & Booking Automation',
    'google-review': 'Google Review Automation',
    'invoice-handling': 'Invoice Handling Automation',
    'website-building': 'Website Building & Hosting',
    'voice-ai': 'Voice AI Automation',
    'lead-generation': 'Lead Generation Automation',
    'social-media': 'Social Media Content Automation',
    'revenue-ops': 'Revenue Operations Automation',
    'document-processing': 'Data Entry & Document Processing',
    'hr-onboarding': 'HR & Onboarding Automation',
    'launchpad': 'OASIS Launchpad',
    'integration-suite': 'Integration Suite',
};

const EXCHANGE_RATE_CAD_TO_USD = 0.71;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check for Stripe secret key FIRST
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        console.error('STRIPE_SECRET_KEY is not set in environment variables');
        return res.status(500).json({
            error: 'Payment system not configured. Please contact support.',
            debug: 'STRIPE_SECRET_KEY missing'
        });
    }

    // Dynamically import Stripe to catch any import errors
    let Stripe;
    try {
        Stripe = (await import('stripe')).default;
    } catch (importError: any) {
        console.error('Failed to import Stripe:', importError);
        return res.status(500).json({
            error: 'Payment system error. Please contact support.',
            debug: 'Stripe import failed: ' + importError.message
        });
    }

    // Initialize Stripe
    let stripe;
    try {
        stripe = new Stripe(stripeSecretKey, {
            // Use default API version to avoid type errors with mismatched @types/stripe
        });
    } catch (initError: any) {
        console.error('Failed to initialize Stripe:', initError);
        return res.status(500).json({
            error: 'Payment system error. Please contact support.',
            debug: 'Stripe init failed: ' + initError.message
        });
    }

    try {
        // Parse request body
        // Parse request body
        const {
            items = [], // Array of { productId, productType, tier, quantity }
            currency = 'usd',
            discountPercent = 0,
            promoCode,
            // Legacy fallbacks
            productId,
            productType,
            tier,
        } = req.body || {};

        // Normalize items array
        let cartItems = items;
        if (cartItems.length === 0 && productId) {
            cartItems = [{ productId, productType, tier, quantity: 1 }];
        }

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'No products specified' });
        }

        const stripeLineItems = [];

        for (const item of cartItems) {
            const { productId, productType = 'automation', tier = 'professional', quantity = 1 } = item;

            const pricing = PRICING[productId];
            if (!pricing) {
                // Skip invalid items or return error?
                // Returning error is safer to prevent partial orders
                return res.status(400).json({ error: `Invalid product: ${productId}` });
            }

            // Get product name
            const productName = PRODUCT_NAMES[productId] || productId;

            // Calculate prices
            let setupFee: number;
            let monthlyFee: number;
            let tierName = '';

            if (productType === 'bundle' || pricing.monthlyFee !== undefined) {
                // Bundle pricing
                setupFee = pricing.setupFee;
                monthlyFee = pricing.monthlyFee!;
            } else {
                // Automation with tiers
                if (!pricing.tiers || !pricing.tiers[tier]) {
                    return res.status(400).json({ error: `Invalid tier: ${tier} for product ${productId}` });
                }
                setupFee = pricing.setupFee;
                monthlyFee = pricing.tiers[tier];
                tierName = ` - ${tier.charAt(0).toUpperCase() + tier.slice(1)}`;
            }

            // Apply discount if valid
            let finalSetupFee = setupFee;
            let finalMonthlyFee = monthlyFee;

            if (discountPercent > 0 && discountPercent <= 50) {
                const multiplier = 1 - (discountPercent / 100);
                finalSetupFee = Math.round(setupFee * multiplier);
                finalMonthlyFee = Math.round(monthlyFee * multiplier);
            }

            // Apply Currency Conversion if USD
            // Base prices are in CAD
            if (currency === 'usd') {
                finalSetupFee = Math.round(finalSetupFee * EXCHANGE_RATE_CAD_TO_USD);
                finalMonthlyFee = Math.round(finalMonthlyFee * EXCHANGE_RATE_CAD_TO_USD);
            }

            // Add Setup Fee Line Item (One-time)
            stripeLineItems.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: `${productName} (${currency.toUpperCase()})${tierName} - Setup Fee`,
                        description: promoCode
                            ? `One-time setup (${discountPercent}% discount with ${promoCode})`
                            : 'One-time setup, implementation, and onboarding',
                    },
                    unit_amount: finalSetupFee * 100, // Convert to cents
                },
                quantity: quantity,
            });

            // Add Monthly Subscription Line Item (Recurring)
            stripeLineItems.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: `${productName} (${currency.toUpperCase()})${tierName} - Monthly`,
                        description: 'Ongoing maintenance, support, and optimization',
                    },
                    unit_amount: finalMonthlyFee * 100,
                    recurring: {
                        interval: 'month' as any, // Cast to any to fix TS error
                    },
                },
                quantity: quantity,
            });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: stripeLineItems,
            metadata: {
                type: 'cart_checkout',
                itemCount: cartItems.length.toString(),
                promoCode: promoCode || '',
                currency,
            },
            subscription_data: {
                metadata: {
                    type: 'cart_subscription',
                    promoCode: promoCode || '',
                },
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/checkout`,
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true,
            },
        });

        // Return success response
        return res.status(200).json({
            url: session.url,
            sessionId: session.id,
        });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);

        // Return proper JSON error
        return res.status(500).json({
            error: error.message || 'Failed to create checkout session',
            type: error.type || 'unknown',
        });
    }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stripe } from '../lib/stripe';
import { ALL_AUTOMATIONS, BUNDLES, TierType } from '../lib/pricing';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY is not set');
        return res.status(500).json({ error: 'Payment system not configured' });
    }

    try {
        const {
            productId,
            productType, // 'automation' or 'bundle'
            tier, // 'starter' | 'professional' | 'business' (only for automations)
            currency = 'usd', // 'usd' or 'cad'
            customerEmail,
            customerName,
            customerPhone,
            businessName,
            promoCode,
        } = req.body;

        // Validate inputs
        if (!productId || !productType) {
            return res.status(400).json({ error: 'Product ID and type are required' });
        }

        let productName: string;
        let productDescription: string;
        let setupFee: number;
        let monthlyFee: number;

        // Get pricing based on product type
        if (productType === 'bundle') {
            const bundle = BUNDLES[productId as keyof typeof BUNDLES];
            if (!bundle) {
                return res.status(400).json({ error: 'Invalid bundle ID' });
            }
            productName = bundle.name;
            productDescription = bundle.description;
            setupFee = bundle.setupFee;
            monthlyFee = bundle.monthlyFee;
        } else {
            // Automation
            if (!tier) {
                return res.status(400).json({ error: 'Tier is required for automations' });
            }
            const automation = ALL_AUTOMATIONS[productId as keyof typeof ALL_AUTOMATIONS];
            if (!automation) {
                return res.status(400).json({ error: 'Invalid automation ID' });
            }
            const tierData = automation.tiers[tier as TierType];
            if (!tierData) {
                return res.status(400).json({ error: 'Invalid tier' });
            }
            productName = `${automation.name} - ${tierData.name}`;
            productDescription = automation.description;
            setupFee = automation.setupFee;
            monthlyFee = tierData.price;
        }

        // Check for promo code
        const validCodes: Record<string, number> = {
            'OASISAI15': 15,
            'WELCOME10': 10,
        };

        let serverDiscountPercent = 0;
        if (promoCode && validCodes[promoCode.toUpperCase()]) {
            serverDiscountPercent = validCodes[promoCode.toUpperCase()];
        }

        // Apply discount
        const discountMultiplier = 1 - serverDiscountPercent / 100;

        // Convert to cents and apply discount
        const setupFeeCents = Math.round((setupFee * discountMultiplier) * 100);
        const monthlyFeeCents = Math.round((monthlyFee * discountMultiplier) * 100);

        const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://oasisai.work'}/pricing`;

        // Create Stripe Checkout Session with dynamic pricing
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                // One-time setup fee (added to first invoice)
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: `${productName} - Setup Fee`,
                            description: promoCode
                                ? `One-time setup (${serverDiscountPercent}% discount applied)`
                                : 'One-time setup, implementation, and onboarding',
                        },
                        unit_amount: setupFeeCents,
                    },
                    quantity: 1,
                },
                // Recurring monthly subscription
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: `${productName} - Monthly Subscription`,
                            description: 'Ongoing maintenance, support, and optimization',
                        },
                        unit_amount: monthlyFeeCents,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            customer_email: customerEmail || undefined,
            metadata: {
                productId,
                productType,
                tier: tier || '',
                productName,
                customerName: customerName || '',
                customerPhone: customerPhone || '',
                businessName: businessName || '',
                currency,
                promoCode: promoCode || '',
                discountPercent: serverDiscountPercent.toString(),
            },
            subscription_data: {
                metadata: {
                    productId,
                    productType,
                    tier: tier || '',
                    productName,
                    customerName: customerName || '',
                    businessName: businessName || '',
                },
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true,
            },
            tax_id_collection: {
                enabled: true,
            },
        });

        return res.status(200).json({
            url: session.url,
            sessionId: session.id,
        });

    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return res.status(500).json({ error: error.message || 'Failed to create checkout session' });
    }
}

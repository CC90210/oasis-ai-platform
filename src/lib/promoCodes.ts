import { supabase } from './supabase';

// Promo Code Types
export interface PromoCode {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    applies_to: 'setup' | 'monthly' | 'both';
    max_uses: number | null;
    uses_count: number;
    valid_from: string;
    valid_until: string | null;
    is_active: boolean;
    created_at: string;
}

export interface PromoValidationResult {
    valid: boolean;
    error?: string;
    promo?: PromoCode;
    setupDiscount: number; // in cents
    monthlyDiscount: number; // in cents - should typically be 0 for standard promos
    discountPercent: number; // for display purposes
}

/**
 * Validate a promo code for a specific user.
 * 
 * IMPORTANT: This validates:
 * 1. Code exists and is active
 * 2. Code hasn't expired
 * 3. Max uses hasn't been reached
 * 4. User hasn't already used this code
 * 
 * Discounts are applied ONLY to what the promo specifies:
 * - 'setup' = Only setup/implementation fee (most common)
 * - 'monthly' = Only monthly retainer
 * - 'both' = Both (rare, for special promotions)
 */
export async function validatePromoCode(
    code: string,
    userEmail: string,
    setupCostCents: number,
    monthlyCostCents: number
): Promise<PromoValidationResult> {
    const normalizedCode = code.toUpperCase().trim();

    if (!normalizedCode) {
        return { valid: false, error: 'Please enter a promo code', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
    }

    try {
        // 1. Check if promo code exists and is active
        const { data: promo, error: promoError } = await supabase
            .from('promo_codes')
            .select('*')
            .eq('code', normalizedCode)
            .eq('is_active', true)
            .single();

        if (promoError || !promo) {
            return { valid: false, error: 'Invalid promo code', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
        }

        // 2. Check if code has expired
        if (promo.valid_until && new Date(promo.valid_until) < new Date()) {
            return { valid: false, error: 'This promo code has expired', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
        }

        // 3. Check if valid_from has passed
        if (promo.valid_from && new Date(promo.valid_from) > new Date()) {
            return { valid: false, error: 'This promo code is not yet active', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
        }

        // 4. Check if max uses reached
        if (promo.max_uses !== null && promo.uses_count >= promo.max_uses) {
            return { valid: false, error: 'This promo code has reached its usage limit', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
        }

        // 5. Check if THIS USER has already used this code (prevent reuse)
        const { data: existingUsage } = await supabase
            .from('promo_code_usage')
            .select('id')
            .eq('promo_code_id', promo.id)
            .eq('user_email', userEmail.toLowerCase())
            .single();

        if (existingUsage) {
            return { valid: false, error: 'You have already used this promo code', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
        }

        // 6. Calculate discount - ONLY apply to what the code specifies
        let setupDiscount = 0;
        let monthlyDiscount = 0;

        // Setup/Implementation fee discount
        if (promo.applies_to === 'setup' || promo.applies_to === 'both') {
            if (promo.discount_type === 'percentage') {
                setupDiscount = Math.round(setupCostCents * (promo.discount_value / 100));
            } else {
                // Fixed amount discount (in cents)
                setupDiscount = Math.min(promo.discount_value, setupCostCents); // Can't discount more than the cost
            }
        }

        // Monthly retainer discount - IMPORTANT: Most promos should NOT apply to monthly
        // Only apply if explicitly set to 'monthly' or 'both'
        if (promo.applies_to === 'monthly' || promo.applies_to === 'both') {
            if (promo.discount_type === 'percentage') {
                monthlyDiscount = Math.round(monthlyCostCents * (promo.discount_value / 100));
            } else {
                monthlyDiscount = Math.min(promo.discount_value, monthlyCostCents);
            }
        }

        return {
            valid: true,
            promo,
            setupDiscount,
            monthlyDiscount,
            discountPercent: promo.discount_type === 'percentage' ? promo.discount_value : 0,
        };
    } catch (err) {
        console.error('Error validating promo code:', err);
        return { valid: false, error: 'Error validating promo code. Please try again.', setupDiscount: 0, monthlyDiscount: 0, discountPercent: 0 };
    }
}

/**
 * Record that a user has used a promo code.
 * Call this AFTER successful payment to prevent reuse.
 */
export async function recordPromoUsage(
    promoCodeId: string,
    userEmail: string,
    discountAmountCents: number,
    userId?: string,
    orderId?: string
): Promise<{ success: boolean; error?: string }> {
    try {
        // Record the usage
        const { error: insertError } = await supabase.from('promo_code_usage').insert({
            promo_code_id: promoCodeId,
            user_email: userEmail.toLowerCase(),
            user_id: userId || null,
            order_id: orderId || null,
            discount_amount_cents: discountAmountCents,
        });

        if (insertError) {
            console.error('Error recording promo usage:', insertError);
            return { success: false, error: 'Failed to record promo usage' };
        }

        // Increment uses count on the promo code
        const { error: rpcError } = await supabase.rpc('increment_promo_uses', { promo_id: promoCodeId });

        if (rpcError) {
            console.error('Error incrementing promo uses:', rpcError);
            // Don't fail the whole operation, usage is still recorded
        }

        return { success: true };
    } catch (err) {
        console.error('Error in recordPromoUsage:', err);
        return { success: false, error: 'An error occurred' };
    }
}

/**
 * Client-side validation for promo codes.
 * Falls back to hardcoded codes if database is unavailable.
 * NOTE: Always validate server-side before processing payment!
 */
export function validatePromoCodeOffline(code: string): { valid: boolean; discountPercent: number; appliesTo: 'setup' | 'monthly' | 'both' } {
    const validCodes: Record<string, { percent: number; appliesTo: 'setup' | 'monthly' | 'both' }> = {
        'WELCOME10': { percent: 10, appliesTo: 'setup' },
        'OASISAI15': { percent: 15, appliesTo: 'setup' },
        'LAUNCH20': { percent: 20, appliesTo: 'setup' },
    };

    const upperCode = code.toUpperCase().trim();
    const codeData = validCodes[upperCode];

    if (codeData) {
        return { valid: true, discountPercent: codeData.percent, appliesTo: codeData.appliesTo };
    }

    return { valid: false, discountPercent: 0, appliesTo: 'setup' };
}

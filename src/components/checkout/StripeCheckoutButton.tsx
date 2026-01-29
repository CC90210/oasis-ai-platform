import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface StripeCheckoutButtonProps {
    productId: string;
    productType: 'automation' | 'bundle';
    tier?: 'starter' | 'professional' | 'business';
    currency?: 'usd' | 'cad';
    buttonText?: string;
    className?: string;
    variant?: 'primary' | 'secondary';
    customerName?: string;
    businessName?: string;
    customerEmail?: string;
    customerPhone?: string;
    discountPercent?: number;
    promoCode?: string;
    items?: Array<{ productId: string; productType: string; tier?: string, quantity?: number }>;
}

export function StripeCheckoutButton({
    productId,
    productType,
    tier,
    items,
    currency = 'usd',
    buttonText = 'Get Started',
    className = '',
    variant = 'primary',
    customerName,
    businessName,
    customerEmail,
    customerPhone,
    discountPercent,
    promoCode,
}: StripeCheckoutButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            // Store checkout details in sessionStorage for the legal acceptance page
            const checkoutData = {
                productId,
                productType,
                tier: tier || 'professional',
                currency,
                customerName,
                businessName,
                customerEmail,
                customerPhone,
                discountPercent: discountPercent || 0,
                promoCode: promoCode || '',
                items: items || [{ productId, productType, tier, quantity: 1 }],
            };

            sessionStorage.setItem('pendingCheckout', JSON.stringify(checkoutData));

            // Redirect to checkout page with legal acceptance
            window.location.href = `/checkout/legal?product=${productId}&type=${productType}&tier=${tier || 'professional'}&currency=${currency}`;
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    const baseStyles = 'w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed';
    const variantStyles = variant === 'primary'
        ? 'bg-cyan-500 hover:bg-cyan-400 text-black'
        : 'bg-white hover:bg-gray-100 text-black';

    return (
        <div>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`${baseStyles} ${variantStyles} ${className}`}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        {buttonText}
                        <span className="ml-1">→</span>
                    </>
                )}
            </button>
            {error && (
                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
        </div>
    );
}

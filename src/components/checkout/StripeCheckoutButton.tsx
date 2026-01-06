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
}

export function StripeCheckoutButton({
    productId,
    productType,
    tier,
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
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    productType,
                    tier,
                    currency,
                    customerName,
                    businessName,
                    customerEmail,
                    customerPhone,
                    discountPercent,
                    promoCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'Something went wrong');
        } finally {
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

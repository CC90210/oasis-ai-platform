import { useState } from 'react';
import { StripeCheckoutButton } from './StripeCheckoutButton';
import { TierSelector } from './TierSelector';
import { CurrencySelector } from './CurrencySelector';
import { AutomationProduct } from '@/lib/pricing';
import * as LucideIcons from 'lucide-react';

interface AutomationPaymentCardProps {
    automation: AutomationProduct;
    paypalEnabled?: boolean;
}

export function AutomationPaymentCard({
    automation,
    paypalEnabled = true,
}: AutomationPaymentCardProps) {
    const [tier, setTier] = useState<'starter' | 'professional' | 'business'>('professional');
    const [currency, setCurrency] = useState<'usd' | 'cad'>('usd');
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

    // Promo Code State
    const [showPromoCode, setShowPromoCode] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);

    const Icon = (LucideIcons as any)[automation.icon] || LucideIcons.Zap;
    const currencySymbol = currency === 'usd' ? '$' : 'CA$';

    // Price Calculation
    const selectedPrice = automation.tiers[tier].price;
    const setupFee = automation.setupFee;

    const discountedSetup = setupFee * (1 - discountPercent / 100);
    const discountedMonthly = selectedPrice * (1 - discountPercent / 100);
    const totalDueToday = discountedSetup + discountedMonthly;

    const applyPromoCode = () => {
        const validCodes: Record<string, number> = {
            'OASISAI15': 15,
            'WELCOME10': 10,
        };

        const upperCode = promoCode.toUpperCase().trim();

        if (validCodes[upperCode]) {
            setPromoApplied(true);
            setPromoError('');
            setDiscountPercent(validCodes[upperCode]);
        } else {
            setPromoError('Invalid promo code');
            setPromoApplied(false);
            setDiscountPercent(0);
        }
    };

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{automation.name}</h3>
                            <p className="text-sm text-gray-400">{automation.description}</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                        {automation.highlight}
                    </span>
                </div>
            </div>


            {/* Urgency Banner */}
            <div className="bg-orange-500/10 border-b border-orange-500/20 px-6 py-2">
                <p className="text-orange-400 text-xs font-medium flex items-center gap-2 justify-center">
                    <LucideIcons.Clock className="w-3 h-3" />
                    High demand: Only 3 spots left for implementation this week
                </p>
            </div>

            {/* Pricing */}
            <div className="p-6 space-y-6">
                {/* Currency Toggle */}
                <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />

                {/* Tier Selection */}
                <TierSelector
                    tiers={automation.tiers}
                    selectedTier={tier}
                    onTierChange={setTier}
                    currency={currency}
                />

                {/* Promo Code Section */}
                <div className="mb-4">
                    {!showPromoCode ? (
                        <button
                            onClick={() => setShowPromoCode(true)}
                            className="text-cyan-400 text-xs hover:underline flex items-center gap-1"
                        >
                            <LucideIcons.Tag className="w-3 h-3" />
                            Have a promo code?
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:outline-none placeholder-gray-500"
                                />
                                <button
                                    onClick={applyPromoCode}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    Apply
                                </button>
                            </div>
                            {promoApplied && (
                                <p className="text-green-400 text-xs flex items-center gap-1">
                                    <LucideIcons.Check className="w-3 h-3" />
                                    {discountPercent}% discount applied!
                                </p>
                            )}
                            {promoError && (
                                <p className="text-red-400 text-xs">{promoError}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Price Summary */}
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">One-time setup fee</span>
                        <div className="text-right">
                            {discountPercent > 0 && (
                                <span className="text-gray-500 line-through mr-2 text-xs">{currencySymbol}{setupFee.toLocaleString()}</span>
                            )}
                            <span className="text-white">{currencySymbol}{discountedSetup.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{automation.tiers[tier].name} plan (monthly)</span>
                        <div className="text-right">
                            {discountPercent > 0 && (
                                <span className="text-gray-500 line-through mr-2 text-xs">{currencySymbol}{selectedPrice}</span>
                            )}
                            <span className="text-white">{currencySymbol}{discountedMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                        </div>
                    </div>

                    {discountPercent > 0 && (
                        <div className="flex justify-between text-xs text-green-400 pt-1">
                            <span>Discount ({discountPercent}% off)</span>
                            <span>-{currencySymbol}{((setupFee + selectedPrice) * discountPercent / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                    )}

                    <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between">
                            <span className="text-gray-300 font-medium">Due today</span>
                            <span className="text-cyan-400 font-bold text-lg">
                                {currencySymbol}{totalDueToday.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Then {currencySymbol}{discountedMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo starting next month
                        </p>
                    </div>
                </div>

                {/* Payment Method Toggle */}
                <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
                    <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition flex items-center justify-center gap-2 ${paymentMethod === 'stripe'
                            ? 'bg-cyan-500 text-black'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        💳 Card / Apple Pay
                        <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                            Preferred
                        </span>
                    </button>
                    {paypalEnabled && (
                        <button
                            disabled
                            className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed opacity-50 border border-gray-800"
                        >
                            PayPal (Coming Soon)
                        </button>
                    )}
                </div>

                {/* Checkout Button */}
                {paymentMethod === 'stripe' ? (
                    <StripeCheckoutButton
                        productId={automation.id}
                        productType="automation"
                        tier={tier}
                        currency={currency}
                        buttonText={`Pay ${currencySymbol}${totalDueToday.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                        variant="primary"
                        discountPercent={discountPercent}
                        promoCode={promoApplied ? promoCode : undefined}
                    />
                ) : (
                    <button
                        className="w-full py-3 px-6 rounded-lg font-semibold bg-[#FFC439] hover:bg-[#f0b830] text-black transition"
                        onClick={() => {
                            // Placeholder for PayPal logic
                            console.log('PayPal checkout for:', automation.id, tier);
                            alert('Please use Card payment for now, or contact support for PayPal Invoice.');
                        }}
                    >
                        Pay with PayPal
                    </button>
                )}

                {/* Trust Badges - Enhanced */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <LucideIcons.Shield className="w-3 h-3 text-green-400" />
                        <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <LucideIcons.CheckCircle className="w-3 h-3 text-green-400" />
                        <span>Money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <LucideIcons.CreditCard className="w-3 h-3 text-green-400" />
                        <span>Secure payment</span>
                    </div>
                </div>

                {/* Features */}
                <div className="border-t border-gray-800 pt-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">What's included:</h4>
                    <ul className="space-y-2">
                        {automation.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                <LucideIcons.Check className="w-4 h-4 text-cyan-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

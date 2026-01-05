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

    const Icon = (LucideIcons as any)[automation.icon] || LucideIcons.Zap;
    const currencySymbol = currency === 'usd' ? '$' : 'CA$';
    const selectedPrice = automation.tiers[tier].price;
    const totalDueToday = automation.setupFee + selectedPrice;

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

                {/* Price Summary */}
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">One-time setup fee</span>
                        <span className="text-white">{currencySymbol}{automation.setupFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{automation.tiers[tier].name} plan (monthly)</span>
                        <span className="text-white">{currencySymbol}{selectedPrice}/mo</span>
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between">
                            <span className="text-gray-300 font-medium">Due today</span>
                            <span className="text-cyan-400 font-bold text-lg">
                                {currencySymbol}{totalDueToday.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Then {currencySymbol}{selectedPrice}/mo starting next month
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
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${paymentMethod === 'paypal'
                                ? 'bg-cyan-500 text-black'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            PayPal
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
                        buttonText={`Pay ${currencySymbol}${totalDueToday.toLocaleString()}`}
                        variant="primary"
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

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                    <span>🔒 256-bit SSL</span>
                    <span>✓ Secure checkout</span>
                    <span>💳 Apple Pay ready</span>
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

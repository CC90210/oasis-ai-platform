import { Check } from 'lucide-react';
import type { TierType } from '../../lib/pricing';

interface TierSelectorProps {
    tiers: {
        starter: { price: number; name: string };
        professional: { price: number; name: string };
        business: { price: number; name: string };
    };
    selectedTier: TierType;
    onTierChange: (tier: TierType) => void;
    currency: 'usd' | 'cad';
}

export function TierSelector({
    tiers,
    selectedTier,
    onTierChange,
    currency,
}: TierSelectorProps) {
    const currencySymbol = currency === 'usd' ? '$' : 'CA$';
    const EXCHANGE_RATE_CAD_TO_USD = 0.71;

    const tierFeatures = {
        starter: ['Basic features', 'Email support', 'Monthly updates'],
        professional: ['All Starter features', 'Priority support', 'Weekly optimization', 'Advanced analytics'],
        business: ['All Professional features', '24/7 support', 'Dedicated manager', 'Custom integrations', 'SLA guarantee'],
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">Select Your Plan</label>
            <div className="grid grid-cols-1 gap-3">
                {(Object.keys(tiers) as TierType[]).map((tierKey) => {
                    const tier = tiers[tierKey];
                    const isSelected = selectedTier === tierKey;
                    const isRecommended = tierKey === 'professional';

                    let displayPrice = tier.price;
                    if (currency === 'usd') {
                        displayPrice = Math.round(displayPrice * EXCHANGE_RATE_CAD_TO_USD);
                    }

                    return (
                        <button
                            key={tierKey}
                            onClick={() => onTierChange(tierKey)}
                            className={`relative p-4 rounded-lg border-2 transition text-left cursor-pointer w-full ${isSelected
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                }`}
                        >
                            {isRecommended && (
                                <span className="absolute -top-2 right-3 bg-cyan-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                                    RECOMMENDED
                                </span>
                            )}

                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-white">{tier.name}</h4>
                                    <ul className="mt-2 space-y-1">
                                        {tierFeatures[tierKey].slice(0, 3).map((feature: string, i: number) => (
                                            <li key={i} className="text-xs text-gray-400 flex items-center gap-1">
                                                <Check className="w-3 h-3 text-cyan-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <div>
                                        <span className="text-2xl font-bold text-white">
                                            {currencySymbol}{displayPrice}
                                        </span>
                                        <span className="text-gray-400 text-sm">/mo</span>
                                    </div>
                                    {isSelected && (
                                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-black" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

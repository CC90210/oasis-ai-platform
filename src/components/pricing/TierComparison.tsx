import React from 'react';
import { Check, X } from 'lucide-react';
import { Automation } from '../../data/pricingData';

interface TierComparisonProps {
    automation: Automation;
    onSelect: (tierName: string) => void;
}

const TierComparison: React.FC<TierComparisonProps> = ({ automation, onSelect }) => {
    const isFourTiers = automation.tiers.length >= 4;

    return (
        <div className="w-full overflow-x-auto pb-4 pt-4"> {/* Added pt-4 for badge space */}
            <div className={`
                w-full grid gap-4 mx-auto
                ${isFourTiers
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1100px]'
                    : 'grid-cols-1 md:grid-cols-3 max-w-[900px]'
                }
            `}>
                {automation.tiers.map((tier, idx) => (
                    <div
                        key={idx}
                        className={`
                            relative flex flex-col p-6 rounded-xl border transition-all duration-300
                            ${tier.isPopular
                                ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-cyan-500 shadow-lg shadow-cyan-500/10 scale-[1.02] z-10'
                                : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                            }
                        `}
                    >
                        {tier.isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6 text-center">
                            <h4 className="text-lg font-semibold text-white mb-2">{tier.name}</h4>
                            <div className="flex justify-center items-end text-white">
                                <span className="text-3xl font-bold">${tier.price}</span>
                                <span className="text-gray-400 ml-1 mb-1">/mo</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex-grow">
                            {tier.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-start text-sm">
                                    <Check size={16} className="text-cyan-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700/50 mt-auto">
                            <button
                                onClick={() => onSelect(tier.name.toLowerCase())}
                                className={`
                                w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:-translate-y-1
                                ${tier.isPopular
                                        ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                                        : 'bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400'
                                    }
                            `}>
                                Select {tier.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TierComparison;

import React from 'react';
import { Check, X } from 'lucide-react';
import { Automation } from '../../data/pricingData';

interface TierComparisonProps {
    automation: Automation;
}

const TierComparison: React.FC<TierComparisonProps> = ({ automation }) => {
    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="min-w-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

                        <div className="mt-8 pt-6 border-t border-gray-700/50">
                            <button className={`
                                w-full py-2 px-4 rounded-lg font-medium transition-colors
                                ${tier.isPopular
                                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
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

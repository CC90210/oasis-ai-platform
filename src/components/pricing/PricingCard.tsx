import React from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { Automation } from '../../data/pricingData';

interface PricingCardProps {
    automation: Automation;
    onViewTiers: (automation: Automation) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ automation, onViewTiers }) => {
    const Icon = automation.icon;

    return (
        <div className="bg-[#1A1A2E] border border-cyan-500/20 rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                        <Icon size={24} className="text-gray-300 group-hover:text-cyan-400" />
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">${automation.setupFee}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">One-time Setup</div>
                    </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{automation.name}</h3>
                <p className="text-sm text-gray-400 mb-6 flex-grow">{automation.description}</p>

                {/* Tag */}
                <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                        <Zap size={12} className="mr-1.5 fill-cyan-400" />
                        {automation.tag}
                    </div>
                </div>

                {/* Features Preview */}
                <div className="space-y-3 mb-6">
                    {automation.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-300">
                            <Check size={16} className="text-cyan-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-gray-700/50">
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-sm text-gray-400">Monthly from</div>
                        <div className="text-xl font-bold text-white">
                            ${automation.monthlyFrom}<span className="text-sm font-normal text-gray-500">/mo</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onViewTiers(automation)}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors group-hover:translate-y-[-2px] active:translate-y-[0px]"
                    >
                        Configure Plan
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;

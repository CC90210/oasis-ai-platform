import { useNavigate } from 'react-router-dom';
import { AutomationProduct, BundleProduct } from '@/lib/pricing';
import * as LucideIcons from 'lucide-react';

interface SimplePricingCardProps {
    product: AutomationProduct | BundleProduct;
    type: 'automation' | 'bundle';
}

export function SimplePricingCard({ product, type }: SimplePricingCardProps) {
    const navigate = useNavigate();

    // Determine icon
    let Icon = LucideIcons.Zap;
    if ('icon' in product && product.icon) {
        Icon = (LucideIcons as any)[product.icon] || LucideIcons.Zap;
    } else if (type === 'bundle') {
        Icon = LucideIcons.Package;
    }

    // Determine highlight tag
    const highlight = 'highlight' in product ? product.highlight : (product as BundleProduct).tag;

    // Determine starting price
    let monthlyPrice = 0;
    if ('tiers' in product) {
        monthlyPrice = product.tiers.starter.price;
    } else if ('monthlyFee' in product) {
        monthlyPrice = (product as BundleProduct).monthlyFee;
    }

    const handleConfigure = () => {
        navigate(`/pricing/${product.id}`);
    };

    return (
        <div className="bg-gray-900/80 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition flex flex-col h-full">
            {/* Icon */}
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-cyan-400" />
            </div>

            {/* Highlight Badge */}
            {highlight && (
                <span className="inline-block self-start text-xs font-medium bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded mb-3">
                    {highlight}
                </span>
            )}

            {/* Name & Description */}
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>

            {/* Pricing Summary */}
            <div className="border-t border-gray-800 pt-4 mb-4 mt-auto">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">One-time setup</span>
                    <span className="text-white font-medium">${product.setupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Monthly from</span>
                    <span className="text-cyan-400 font-bold">${monthlyPrice}/mo</span>
                </div>
            </div>

            {/* Single CTA Button */}
            <button
                onClick={handleConfigure}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition"
            >
                Configure Plan →
            </button>
        </div>
    );
}

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ALL_AUTOMATIONS, BUNDLES, AutomationProduct, BundleProduct } from '@/lib/pricing';
import { AutomationPaymentCard } from '@/components/checkout/AutomationPaymentCard';

const ProductConfigPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    // Find the product
    let product: AutomationProduct | BundleProduct | undefined;
    let productType: 'automation' | 'bundle' = 'automation';

    // Check automations
    product = Object.values(ALL_AUTOMATIONS).find(p => p.id === productId);

    // Check bundles if not found
    if (!product) {
        product = Object.values(BUNDLES).find(p => p.id === productId);
        if (product) {
            productType = 'bundle';
        }
    }

    // Redirect if invalid product
    useEffect(() => {
        if (!product && productId) {
            navigate('/pricing');
        }
        // Scroll to top on load
        window.scrollTo(0, 0);
    }, [product, productId, navigate]);

    if (!product) return null;

    // Convert Bundle to AutomationProduct-like structure for the card if needed,
    // or we might need to adjust AutomationPaymentCard to handle bundles too.
    // For now, let's assume AutomationPaymentCard can handle 'automation' type primarily.
    // However, the card expects AutomationProduct interface which has 'tiers'.
    // Bundles don't have tiers in the same way.
    // For this task, let's focus on Automations as requested ("Configure Plan").
    // If it's a bundle, we might want a slightly different view or adapt the card.

    // Let's adapt the AutomationPaymentCard to handle Bundles gracefully or create a wrapper.
    // Since the prompt mainly showed the Automation detail flow, let's get that working perfectly.
    // For Bundles, we can construct a fake "tier" object so the card works, or simpler:
    // Just pass it as is and let the card handle if we modify the card props.

    // We'll proceed with adapting the data for now.

    const isBundle = productType === 'bundle';
    let adaptedProduct: AutomationProduct;

    if (isBundle) {
        const bundle = product as BundleProduct;
        // Mock tiers for bundle to fit the interface if we reuse the component
        // But better is to make the component flexible. 
        // Given constraints, I'll adapt the data to match AutomationProduct interface for now
        adaptedProduct = {
            id: bundle.id,
            name: bundle.name,
            description: bundle.description || '',
            icon: 'Package', // Default icon for bundles
            setupFee: bundle.setupFee,
            tiers: {
                starter: { price: bundle.monthlyFee, name: 'Standard' },
                professional: { price: bundle.monthlyFee, name: 'Standard' },
                business: { price: bundle.monthlyFee, name: 'Standard' }
            },
            highlight: bundle.tag || '',
            features: bundle.features
        };
    } else {
        adaptedProduct = product as AutomationProduct;
    }

    return (
        <div className="min-h-screen pt-24 pb-20 relative">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate('/pricing')}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to All Plans
                </button>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Configure Your Plan</h1>
                    <p className="text-gray-400 text-center mb-10">Select your preferred tier and payment method.</p>

                    {/* Reuse the detailed card here */}
                    <AutomationPaymentCard
                        automation={adaptedProduct}
                        paypalEnabled={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductConfigPage;

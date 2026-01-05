import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { ALL_AUTOMATIONS, BUNDLES as BUNDLES_OBJ, BundleProduct } from '@/lib/pricing';
import { SimplePricingCard } from '@/components/pricing/SimplePricingCard';
import { COMMON_INCLUSIONS } from '@/data/pricingData';

const BUNDLES: BundleProduct[] = Object.values(BUNDLES_OBJ);

const PricingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">

            {/* 1. Hero Section */}
            <div className="container mx-auto px-4 text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                    Automation Solutions <br className="hidden md:block" />
                    Built for <span className="text-cyan-400">Your Business</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Every automation includes monthly ROI documentation and personalized setup consultation.
                </p>
            </div>

            {/* 2. Bundle Packages */}
            <div className="container mx-auto px-4 mb-24">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Comprehensive Bundles</h2>
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {BUNDLES.map((bundle, idx) => (
                        <SimplePricingCard
                            key={idx}
                            product={bundle}
                            type="bundle"
                        />
                    ))}
                </div>
            </div>

            {/* 3. Automations Grid */}
            <div className="container mx-auto px-4 mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Custom Automations</h2>
                    <p className="text-gray-400">Specific solutions for specific problems. Setup fee + monthly subscription.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {Object.values(ALL_AUTOMATIONS).map((automation) => (
                        <SimplePricingCard
                            key={automation.id}
                            product={automation}
                            type="automation"
                        />
                    ))}
                </div>
            </div>

            {/* 5. What's Included */}
            <div className="container mx-auto px-4 mb-24">
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Included with Every Automation</h3>
                        <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {COMMON_INCLUSIONS.map((inclusion, idx) => (
                            <div key={idx} className="flex items-center p-4 bg-gray-900/50 rounded-lg border border-gray-800/50">
                                <ShieldCheck size={24} className="text-cyan-500 mr-4 flex-shrink-0" />
                                <span className="text-gray-200 font-medium">{inclusion}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Enterprise CTA */}
            <div className="container mx-auto px-4 mb-24">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-[#1A1A2E] border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Need something bigger?</h2>
                            <p className="text-xl text-cyan-400 font-semibold mb-4">Enterprise Transformation</p>
                            <p className="text-gray-400 max-w-lg">
                                Full-scale automation infrastructure, HIPAA/SOC 2 compliance, and dedicated success managers for large organizations.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/contact')}
                            className="whitespace-nowrap px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            {/* 7. FAQ Section */}
            <div className="container mx-auto px-4 mb-12">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {[
                        { q: "What happens after I purchase?", a: "A member of our team will contact you within 1 hour to schedule your setup consultation. We'll discuss your specific needs, collect any necessary credentials, and create a custom implementation plan for your business." },
                        { q: "How long does setup take?", a: "Most automations are live within 3-7 business days. Complex enterprise solutions may take 2-4 weeks depending on integration requirements." },
                        { q: "What's included in monthly ROI documentation?", a: "You get a detailed report showing exactly what your automation achieved: hours saved, leads captured, revenue generated, and interactions handled." },
                        { q: "Can I upgrade my plan later?", a: "Yes! You can upgrade or downgrade your subscription tier at any time. Changes take effect on your next billing cycle." }
                    ].map((faq, idx) => (
                        <div key={idx} className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-left">
                            <h4 className="flex items-center text-lg font-semibold text-white mb-3">
                                <HelpCircle size={18} className="text-cyan-500 mr-3 flex-shrink-0" />
                                {faq.q}
                            </h4>
                            <p className="text-gray-400 pl-8">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;

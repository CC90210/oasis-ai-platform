import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CheckoutPage.css';
import { track } from '@vercel/analytics';
import { PAYPAL_PLANS, CHECKOUT_PRICING, CHECKOUT_FEATURES, AUTOMATIONS } from '../../data/pricingData';
import { ShieldCheck, Lock, HelpCircle, ArrowLeft, Check } from 'lucide-react';

declare global {
    interface Window {
        paypal: any;
    }
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    // Parse Query Params
    const automationId = searchParams.get('automation');
    const tierId = searchParams.get('tier') as 'starter' | 'professional' | 'business';

    // Derived Data
    const automation = AUTOMATIONS.find(a => a.id === automationId);

    // State
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [paypalError, setPaypalError] = useState<string | null>(null);

    // FIX: Ensure scrolling is enabled (modal might have locked it)
    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);

    // Load PayPal SDK
    useEffect(() => {
        // Validation Redirect
        if (!automation || !tierId || !CHECKOUT_PRICING[automationId as keyof typeof CHECKOUT_PRICING]) {
            console.error("Invalid checkout params");
            return;
        }

        // Check if script already exists
        if (window.paypal) {
            setScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.id = 'paypal-sdk-script';
        // Add disable-funding=paylater,credit as per instructions
        script.src = "https://www.paypal.com/sdk/js?client-id=ARszgUzcALzWPVkBu8NOn47jSK4cKFWjVrZWMKJRXUXhEag2dqq2dVCx0A39-UCcqtZHsBV6q83j8n8A&vault=true&intent=subscription&disable-funding=paylater,credit";
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        script.async = true;

        script.onload = () => {
            setScriptLoaded(true);
        };

        script.onerror = () => {
            setPaypalError('Failed to connect to payment processor. Please verify your connection.');
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup logic if needed
        };
    }, [automationId, tierId, automation]);


    // Render PayPal Buttons
    useEffect(() => {
        if (!scriptLoaded || !window.paypal || !automationId || !tierId) return;

        const containerId = 'paypal-button-container';
        const container = document.getElementById(containerId);

        if (container) {
            container.innerHTML = ''; // Clear previous

            try {
                // Get Plan ID
                const planId = PAYPAL_PLANS[automationId as keyof typeof PAYPAL_PLANS]?.[tierId];

                if (!planId) {
                    setPaypalError("Plan not found for this selection.");
                    return;
                }

                window.paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'gold',
                        layout: 'vertical',
                        label: 'subscribe'
                    },
                    createSubscription: function (data: any, actions: any) {
                        return actions.subscription.create({
                            plan_id: planId,
                            application_context: {
                                brand_name: 'OASIS AI',
                                user_action: 'SUBSCRIBE_NOW'
                            }
                        });
                    },
                    onApprove: function (data: any, actions: any) {
                        setLoading(true);
                        // Track success
                        track('purchase_approved', {
                            subscription_id: data.subscriptionID,
                            automation: automationId,
                            tier: tierId
                        });
                        navigate(`/subscription-success?subscription_id=${data.subscriptionID}&automation=${automationId}&tier=${tierId}`);
                    },
                    onError: function (err: any) {
                        console.error('PayPal onError:', err);
                    },
                    onCancel: function (data: any) {
                        console.log('PayPal onCancel', data);
                    }
                }).render(`#${containerId}`);

            } catch (err) {
                console.error("Button Render Error", err);
                setPaypalError("Could not render checkout buttons.");
            }
        }

    }, [scriptLoaded, automationId, tierId]);


    // Render Error State if Params Invalid
    if (!automation || !tierId) {
        return (
            <div className="min-h-screen pt-32 text-white text-center bg-[#0a0a14]">
                <h2 className="text-2xl font-bold mb-4">Invalid Checkout Link</h2>
                <button
                    onClick={() => navigate('/pricing')}
                    className="text-cyan-400 hover:text-cyan-300 underline font-medium"
                >
                    Return to Pricing
                </button>
            </div>
        );
    }

    const pricing = CHECKOUT_PRICING[automationId as keyof typeof CHECKOUT_PRICING];
    const monthlyPrice = pricing.monthly[tierId];
    const setupFee = pricing.setup;
    const totalToday = setupFee + monthlyPrice;
    const features = CHECKOUT_FEATURES[automationId as keyof typeof CHECKOUT_FEATURES]?.[tierId] || [];

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white flex flex-col">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <div className="text-2xl font-bold text-white mb-2">Processing Payment</div>
                    <p className="text-gray-400">Please do not close this window...</p>
                </div>
            )}

            <div className="flex-grow pt-28 pb-20 px-4">
                <div className="container mx-auto max-w-6xl">

                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate('/pricing')}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl md:text-4xl font-bold">Secure Checkout</h1>
                    </div>

                    {paypalError && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8 flex items-center justify-center gap-3">
                            <span className="font-bold">Error:</span> {paypalError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                        {/* LEFT COLUMN: ORDER SUMMARY */}
                        <div className="space-y-6 order-2 lg:order-1">
                            {/* Summary Card */}
                            <div className="bg-[#12121f] border border-[#2a2a4a] rounded-2xl p-6 md:p-8 shadow-xl">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{automation.name}</h3>
                                            <p className="text-cyan-400 text-sm font-medium capitalize">{tierId} Plan</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-[#2a2a4a] py-6 space-y-4">
                                    <div className="flex justify-between text-gray-300">
                                        <span>One-time setup fee</span>
                                        <span className="font-medium text-white">${setupFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>First month subscription</span>
                                        <span className="font-medium text-white">${monthlyPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="border-t border-[#2a2a4a] pt-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-lg font-bold text-white">Total Due Today</span>
                                        <span className="text-3xl font-bold text-cyan-400">${totalToday.toLocaleString()}</span>
                                    </div>
                                    <p className="text-right text-gray-500 text-sm font-medium">
                                        (Tax Included)
                                    </p>
                                    <p className="text-right text-gray-500 text-sm mt-1">
                                        Then ${monthlyPrice}/mo
                                    </p>
                                </div>
                            </div>

                            {/* Trust Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#12121f]/50 border border-[#2a2a4a] rounded-xl p-4 flex items-center gap-3">
                                    <ShieldCheck className="text-cyan-500" size={24} />
                                    <div>
                                        <div className="font-bold text-white text-sm">Secure Encrypted</div>
                                        <div className="text-gray-500 text-xs">256-bit SSL protection</div>
                                    </div>
                                </div>
                                <div className="bg-[#12121f]/50 border border-[#2a2a4a] rounded-xl p-4 flex items-center gap-3">
                                    <Lock className="text-cyan-500" size={24} />
                                    <div>
                                        <div className="font-bold text-white text-sm">Privacy Verified</div>
                                        <div className="text-gray-500 text-xs">Data never shared</div>
                                    </div>
                                </div>
                            </div>

                            {/* Help Box */}
                            <div className="border border-[#2a2a4a] rounded-xl p-6 bg-gradient-to-br from-[#12121f] to-[#0a0a14]">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400">
                                        <HelpCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2">Need help with your order?</h4>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Our support team is available 24/7 to assist you with the setup process.
                                        </p>
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="text-cyan-400 text-sm font-bold hover:text-cyan-300 transition-colors"
                                        >
                                            Contact Support →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: PAYMENT & FEATURES */}
                        <div className="space-y-6 order-1 lg:order-2">
                            {/* Payment Card */}
                            <div className="bg-[#12121f] border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-900/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white relative z-10">
                                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                                    Complete Payment
                                </h2>

                                <p className="text-gray-400 text-sm mb-8 relative z-10">
                                    Choose your preferred payment method below. Your subscription will start immediately after successful payment.
                                </p>

                                {/* PayPal Container */}
                                <div className="min-h-[150px] relative z-10">
                                    <div id="paypal-button-container" className="w-full">
                                        {!scriptLoaded && (
                                            <div className="animate-pulse space-y-3">
                                                <div className="h-12 bg-gray-800 rounded-lg"></div>
                                                <div className="h-12 bg-gray-800 rounded-lg"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-[#2a2a4a] text-center relative z-10">
                                    <p className="text-xs text-gray-500">
                                        By subscribing, you agree to our <span className="underline cursor-pointer hover:text-gray-400" onClick={() => navigate('/terms')}>Terms of Service</span>.
                                        Recurring billing, cancel anytime.
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="bg-[#12121f] border border-[#2a2a4a] rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Included in {tierId} Plan</h3>
                                <ul className="space-y-3">
                                    {features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                            <div className="mt-0.5 p-0.5 bg-cyan-500/20 rounded-full">
                                                <Check className="text-cyan-400 w-3 h-3" strokeWidth={3} />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CheckoutPage;

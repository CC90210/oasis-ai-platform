import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CheckoutPage.css';
import { track } from '@vercel/analytics';
import { PAYPAL_PLANS, CHECKOUT_PRICING, CHECKOUT_FEATURES, AUTOMATIONS } from '../../data/pricingData';

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

    // Load PayPal SDK
    useEffect(() => {
        // Validation Redirect
        if (!automation || !tierId || !CHECKOUT_PRICING[automationId as keyof typeof CHECKOUT_PRICING]) {
            console.error("Invalid checkout params");
            // navigate('/pricing'); // Disabled for debugging, better to show error
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
                            plan_id: planId
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
                        // setPaypalError('An error occurred during payment. Please try again.');
                        // Sometimes onError fires for window closures, so be careful showing generic errors immediately
                    },
                    onCancel: function (data: any) {
                        console.log('PayPal onCancel', data);
                        // User closed window, do nothing
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
            <div className="min-h-screen pt-24 text-white text-center">
                <h2>Invalid Checkout Link</h2>
                <button onClick={() => navigate('/pricing')} className="text-cyan-400 mt-4 underline">Return to Pricing</button>
            </div>
        );
    }

    const pricing = CHECKOUT_PRICING[automationId as keyof typeof CHECKOUT_PRICING];
    const monthlyPrice = pricing.monthly[tierId];
    const setupFee = pricing.setup;
    const totalToday = setupFee + monthlyPrice;
    const features = CHECKOUT_FEATURES[automationId as keyof typeof CHECKOUT_FEATURES]?.[tierId] || [];

    return (
        <div className="checkout-page pt-24 min-h-screen bg-[#0a0a14] text-white">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-xl font-semibold">Processing your subscription...</div>
                </div>
            )}

            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Secure Checkout</h1>

                {paypalError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8 text-center">
                        {paypalError}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

                    {/* LEFT COLUMN: ORDER SUMMARY */}
                    <div className="space-y-6">
                        <div className="bg-[#12121f] border border-[#2a2a4a] rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span className="font-medium">{automation.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 text-sm">
                                    <span className="capitalize">{tierId} Plan</span>
                                </div>
                            </div>

                            <div className="border-t border-[#2a2a4a] pt-4 space-y-3">
                                <div className="flex justify-between text-gray-300">
                                    <span>One-time setup fee</span>
                                    <span>${setupFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>First month</span>
                                    <span>${monthlyPrice}</span>
                                </div>
                            </div>

                            <div className="border-t border-[#2a2a4a] mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">Total Due Today</span>
                                    <span className="text-2xl font-bold text-cyan-400">${totalToday.toLocaleString()}</span>
                                </div>
                                <p className="text-right text-gray-500 text-sm mt-1">
                                    Then ${monthlyPrice}/mo
                                </p>
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className="bg-[#12121f] border border-[#2a2a4a] rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-200">What's Included</h3>
                            <ul className="space-y-3">
                                {features.map((feat, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                                        <span className="text-cyan-400 font-bold">✓</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PAYMENT */}
                    <div className="space-y-6">
                        <div className="bg-[#12121f] border border-[#2a2a4a] rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                            <p className="text-gray-400 text-sm mb-6">Secure, encrypted transaction</p>

                            {/* PayPal Container */}
                            <div className="min-h-[200px] flex flex-col justify-center">
                                <div id="paypal-button-container" className="w-full">
                                    {!scriptLoaded && (
                                        <div className="animate-pulse space-y-3">
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                            <div className="h-12 bg-gray-700 rounded"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[#2a2a4a]">
                                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    <span>Guaranteed Safe & Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

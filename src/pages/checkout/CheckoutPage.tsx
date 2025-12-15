import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

declare global {
    interface Window {
        paypal: any;
        PAYPAL_CLIENT_ID: string;
    }
}

interface CartItem {
    automationType: string;
    automationName: string;
    setupFee: number;
    tierKey: string;
    tierName: string;
    monthlyPrice: number;
    features: string[];
}

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [sdkReady, setSdkReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const paypalButtonRef = useRef<HTMLDivElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Load cart
        const storedCart = sessionStorage.getItem('oasis_cart');
        const cartData: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

        if (cartData.length === 0) {
            navigate('/pricing');
            return;
        }

        setCart(cartData);
        setLoading(false);

        // Load PayPal SDK
        const loadPayPal = async () => {
            if (window.paypal) {
                setSdkReady(true);
                return;
            }

            try {
                // Client ID sourced from window (injected by Vite define) or meta env
                const clientId = window.PAYPAL_CLIENT_ID || import.meta.env.VITE_PAYPAL_CLIENT_ID;

                if (!clientId) {
                    console.error("PayPal Client ID not found. Ensure PAYPAL_CLIENT_ID is set in .env");
                    setErrorMessage("Payment System Configuration Error: Missing PayPal Client ID. Please contact support.");
                    return;
                }

                if (document.getElementById('paypal-sdk')) {
                    setSdkReady(true);
                    return;
                }

                const script = document.createElement('script');
                script.id = 'paypal-sdk';
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=CAD&intent=capture&components=buttons`;
                script.async = true;
                script.onload = () => setSdkReady(true);
                script.onerror = () => {
                    console.error("PayPal SDK failed to load");
                    setErrorMessage("Unable to load secure payment processor. Please check your internet connection or try again later.");
                };
                document.body.appendChild(script);
            } catch (err) {
                console.error("Failed to load PayPal SDK", err);
                setErrorMessage("An unexpected error occurred loading the payment system.");
            }
        };

        loadPayPal();
    }, [navigate]);

    const calculateTotals = () => {
        const setupTotal = cart.reduce((acc, item) => acc + item.setupFee, 0);
        const monthlyTotal = cart.reduce((acc, item) => acc + item.monthlyPrice, 0);
        const tax = (setupTotal + monthlyTotal) * 0.13; // 13% HST
        const grandTotal = setupTotal + monthlyTotal + tax;
        return { setupTotal, monthlyTotal, tax, grandTotal };
    };

    const validateForm = () => {
        const errors: Record<string, boolean> = {};
        if (!formData.firstName) errors.firstName = true;
        if (!formData.lastName) errors.lastName = true;
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = true;
        if (!formData.company) errors.company = true;

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (sdkReady && paypalButtonRef.current && window.paypal) {
            // clear container before render
            paypalButtonRef.current.innerHTML = '';

            try {
                window.paypal.Buttons({
                    style: {
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'rect',
                        label: 'pay',
                        height: 50
                    },
                    createOrder: async (data: any, actions: any) => {
                        if (!validateForm()) {
                            return actions.reject();
                        }

                        const totals = calculateTotals();

                        try {
                            const response = await fetch('/api/paypal/create-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    cart,
                                    totals,
                                    customer: formData
                                })
                            });

                            if (!response.ok) throw new Error('Order creation failed');
                            const order = await response.json();
                            return order.id;
                        } catch (err) {
                            console.error("Create Order Error:", err);
                            setErrorMessage("Failed to initialize payment. Please try again.");
                            return actions.reject();
                        }
                    },
                    onApprove: async (data: any, actions: any) => {
                        try {
                            const response = await fetch('/api/paypal/capture-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    orderID: data.orderID,
                                    cart,
                                    customer: formData
                                })
                            });

                            if (!response.ok) throw new Error('Capture failed');
                            const result = await response.json();

                            sessionStorage.removeItem('oasis_cart');
                            navigate(`/checkout/success?order=${result.orderNumber}`);
                        } catch (err) {
                            console.error('Payment capture failed', err);
                            setErrorMessage("Payment processing failed. Please contact support.");
                        }
                    },
                    onError: (err: any) => {
                        console.error('PayPal Widget Error:', err);
                        // Don't show generic error immediately if it's just validation, but here it's likely system error
                    }
                }).render(paypalButtonRef.current);
            } catch (err) {
                console.error("PayPal Render Error:", err);
                setErrorMessage("Failed to render payment buttons.");
            }
        }
    }, [sdkReady, cart, formData, formErrors, navigate]);

    const totals = calculateTotals();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-white">Secure Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Form & Payment */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step 1: Contact Info */}
                        <div className="bg-[#161B22]/80 border border-cyan-500/20 rounded-xl p-8">
                            <h2 className="text-xl font-semibold mb-6 text-cyan-400">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        className={`w-full bg-[#0D1117] border ${formErrors.firstName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        className={`w-full bg-[#0D1117] border ${formErrors.lastName ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full bg-[#0D1117] border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className={`w-full bg-[#0D1117] border ${formErrors.company ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                                        placeholder="Acme Inc."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Payment */}
                        <div className="bg-[#161B22]/80 border border-cyan-500/20 rounded-xl p-8">
                            <h2 className="text-xl font-semibold mb-6 text-cyan-400">Payment Method</h2>
                            <div ref={paypalButtonRef} className="min-h-[150px]">
                                {errorMessage ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-red-400 bg-red-500/10 rounded-lg p-4 text-center">
                                        <AlertCircle className="mb-2" size={24} />
                                        <span className="font-semibold">Unable to Load Payment</span>
                                        <span className="text-sm mt-1">{errorMessage}</span>
                                    </div>
                                ) : !sdkReady && (
                                    <div className="flex items-center justify-center h-40 text-gray-500">
                                        <Loader2 className="animate-spin mr-2" /> Loading Secure Payment...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#161B22]/80 border border-cyan-500/20 rounded-xl p-8 sticky top-24">
                            <h2 className="text-xl font-semibold mb-6 text-cyan-400">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start pb-4 border-b border-gray-800 last:border-0">
                                        <div>
                                            <div className="font-bold text-white">{item.automationName}</div>
                                            <div className="text-cyan-400 text-xs uppercase tracking-wider mt-1">{item.tierName} Plan</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-300">${item.setupFee.toLocaleString()} <span className="text-[10px] text-gray-500">setup</span></div>
                                            <div className="text-gray-300">${item.monthlyPrice} <span className="text-[10px] text-gray-500">/mo</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-700">
                                <div className="flex justify-between text-gray-400">
                                    <span>Setup Fees</span>
                                    <span id="setup-total">${totals.setupTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>First Month</span>
                                    <span id="monthly-total">${totals.monthlyTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (13%)</span>
                                    <span id="tax-total">${totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-gray-800 mt-4">
                                    <span>Total Today</span>
                                    <span id="grand-total" className="text-cyan-400">${totals.grandTotal.toLocaleString()}</span>
                                </div>
                                <p id="recurring-note" className="text-right text-xs text-gray-500 mt-2">
                                    Then ${totals.monthlyTotal.toLocaleString()}/mo starting next month
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-center text-cyan-500 text-sm font-medium bg-cyan-500/5 p-4 rounded-lg border border-cyan-500/10">
                                <ShieldCheck size={18} className="mr-2" />
                                Secure SSL Encrypted Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

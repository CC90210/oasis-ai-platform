import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Load cart from session storage
        const storedCart = sessionStorage.getItem('oasis_cart');
        const cartData: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

        // In a real app we might validate URL params against the cart or add them if missing
        // For now, we trust sessionStorage as the source of truth if populated

        if (cartData.length === 0) {
            navigate('/pricing');
            return;
        }

        setCart(cartData);
        setLoading(false);
    }, [navigate]);

    const handleMockPayment = async () => {
        setProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart
        sessionStorage.removeItem('oasis_cart');

        // Use a random order ID
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Navigate to success (or dashboard if logged in, but for flow likely a success page)
        // Since we don't have an OrderSuccessPage in the file list yet (or I missed it), 
        // I'll assume we might need to create one or just alert for now. 
        // EDIT: I saw OrderSuccessPage.tsx in the file list earlier!
        navigate(`/checkout/success?order=${orderId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
        );
    }

    // Totals logic
    const setupTotal = cart.reduce((acc, item) => acc + item.setupFee, 0);
    const monthlyTotal = cart.reduce((acc, item) => acc + item.monthlyPrice, 0);
    const tax = (setupTotal + monthlyTotal) * 0.13; // 13% HST mock
    const totalToday = setupTotal + monthlyTotal + tax;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column: Mock Payment Form */}
                    <div className="space-y-8">
                        <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
                            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">First Name</label>
                                    <input type="text" className="w-full bg-[#0A0A0A] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Last Name</label>
                                    <input type="text" className="w-full bg-[#0A0A0A] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Doe" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-gray-400">Email Address</label>
                                    <input type="email" className="w-full bg-[#0A0A0A] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@example.com" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800">
                            <h2 className="text-xl font-semibold mb-6">Payment Method (Simulated)</h2>

                            {/* Mock PayPal Button */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleMockPayment}
                                    disabled={processing}
                                    className="w-full bg-[#0070BA] hover:bg-[#003087] text-white font-bold py-4 rounded-lg flex items-center justify-center transition-colors relative overflow-hidden"
                                >
                                    {processing ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <span className="italic font-bold text-xl mr-1">Pay</span>
                                            <span className="italic font-bold text-xl">Pal</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-gray-500 text-center">
                                    This is a mock checkout. No real money will be charged.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="bg-[#161B22] p-8 rounded-2xl border border-gray-800 h-fit">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                        <div className="space-y-6 mb-8">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start pb-6 border-b border-gray-800 last:border-0 last:pb-0">
                                    <div>
                                        <h3 className="font-semibold text-white">{item.automationName}</h3>
                                        <p className="text-cyan-400 text-sm font-medium mt-1">{item.tierName} Plan</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-gray-300">${item.setupFee.toLocaleString()} <span className="text-xs text-gray-500">setup</span></div>
                                        <div className="text-gray-300">${item.monthlyPrice} <span className="text-xs text-gray-500">/mo</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-gray-700">
                            <div className="flex justify-between text-gray-400">
                                <span>Setup Fees</span>
                                <span>${setupTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>First Month Subscription</span>
                                <span>${monthlyTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax (13%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-gray-800 mt-4">
                                <span>Total Today</span>
                                <span>${totalToday.toLocaleString()}</span>
                            </div>
                            <p className="text-right text-xs text-gray-500 mt-2">
                                Then ${monthlyTotal.toLocaleString()}/mo starting next month
                            </p>
                        </div>

                        <div className="mt-8 flex items-center justify-center text-cyan-500 text-sm font-medium bg-cyan-500/10 p-4 rounded-lg">
                            <ShieldCheck size={18} className="mr-2" />
                            Secure SSL Encrypted Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

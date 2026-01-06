import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../store/cartStore';
import { StripeCheckoutButton } from '../../components/checkout/StripeCheckoutButton';
import { ALL_AUTOMATIONS, BUNDLES } from '../../lib/pricing';
import { ArrowLeft, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, removeItem } = useCart();
    const [currency, setCurrency] = useState<'usd' | 'cad'>('usd');

    // Hardcoded for now, matches API
    const EXCHANGE_RATE_CAD_TO_USD = 0.71;

    const currencySymbol = currency === 'usd' ? '$' : 'CA$';

    // Helper to find product details
    const getProductDetails = (id: string, type: 'agent' | 'bundle') => {
        if (type === 'bundle') {
            return Object.values(BUNDLES).find(b => b.id === id);
        }
        return Object.values(ALL_AUTOMATIONS).find(a => a.id === id);
    };

    // Calculate real total (Setup + Monthly Tier)
    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const product = getProductDetails(item.id, item.type);
            if (!product) return total;

            let itemTotal = product.setupFee;

            // Add monthly fee based on tier
            if (item.type === 'agent' && item.tier && 'tiers' in product) {
                // @ts-ignore
                const tierPrice = product.tiers[item.tier]?.price || 0;
                itemTotal += tierPrice;
            } else if (item.type === 'bundle' && 'monthlyFee' in product) {
                // @ts-ignore
                itemTotal += product.monthlyFee;
            }

            return total + (itemTotal * item.quantity);
        }, 0);
    };

    const subtotalCAD = calculateTotal();
    const subtotal = currency === 'usd'
        ? Math.round(subtotalCAD * EXCHANGE_RATE_CAD_TO_USD)
        : subtotalCAD;

    // Prepare items for Stripe API
    const stripeItems = items.map(item => ({
        productId: item.id,
        productType: item.type,
        tier: item.tier || 'professional',
        quantity: item.quantity
    }));

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a14] flex flex-col items-center justify-center text-white px-4">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8 text-center max-w-md">
                    Looks like you haven't added any automations yet. Browse our marketplace to find the perfect AI agent for your business.
                </p>
                <Link to="/pricing" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-colors">
                    Browse Automations
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white pt-28 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">

                <div className="flex items-center gap-4 mb-8">
                    <Link to="/pricing" className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#12121f] border border-[#2a2a4a] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold mb-6">Order Items</h2>

                            <div className="space-y-6">
                                {items.map((item) => {
                                    const product = getProductDetails(item.id, item.type);

                                    if (!product) return null;

                                    let price = product.setupFee;
                                    let monthly = 0;

                                    if (item.type === 'agent' && item.tier && 'tiers' in product) {
                                        // @ts-ignore
                                        monthly = product.tiers[item.tier]?.price || 0;
                                    } else if (item.type === 'bundle' && 'monthlyFee' in product) {
                                        // @ts-ignore
                                        monthly = product.monthlyFee;
                                    }

                                    price += monthly;

                                    if (currency === 'usd') {
                                        price = Math.round(price * EXCHANGE_RATE_CAD_TO_USD);
                                    }

                                    return (
                                        <div key={item.id + item.tier} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                                                    <ShoppingBag className="w-8 h-8 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                                    {item.tier && (
                                                        <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 capitalize mr-2">
                                                            {item.tier} Plan
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="text-right">
                                                    <div className="font-bold text-xl text-cyan-400">
                                                        {currencySymbol}{price.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Setup + First Month</div>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-500 hover:text-red-400 transition-colors p-2"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#12121f] border border-[#2a2a4a] rounded-2xl p-6 sticky top-32">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            {/* Currency Toggle */}
                            <div className="bg-gray-800 rounded-lg p-1 flex mb-6">
                                <button
                                    onClick={() => setCurrency('usd')}
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${currency === 'usd' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                                >
                                    USD ($)
                                </button>
                                <button
                                    onClick={() => setCurrency('cad')}
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${currency === 'cad' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                                >
                                    CAD (CA$)
                                </button>
                            </div>

                            <div className="space-y-3 mb-6 border-b border-gray-800 pb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{currencySymbol}{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-bold text-cyan-400">{currencySymbol}{subtotal.toLocaleString()}</span>
                            </div>

                            <StripeCheckoutButton
                                productId="cart-checkout" // Dummy ID
                                productType="automation" // Dummy type
                                items={stripeItems}
                                currency={currency}
                                buttonText="Proceed to Payment"
                                className="w-full"
                            />

                            <p className="text-xs text-center text-gray-500 mt-4">
                                Secure payment powered by Stripe. You will be redirected to complete your purchase.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

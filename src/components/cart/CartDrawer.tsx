import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { agents, bundles } from '@/data/products';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
    const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        key="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-secondary border-l border-white/10 shadow-2xl z-[70] flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-5 h-5 text-oasis-cyan" />
                                <h2 className="text-xl font-display font-bold text-white">Your Cart</h2>
                                <span className="bg-oasis-cyan/10 text-oasis-cyan text-xs font-bold px-2 py-1 rounded-full">
                                    {items.length}
                                </span>
                            </div>
                            <button onClick={toggleCart} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="w-8 h-8 text-text-tertiary" />
                                    </div>
                                    <p className="text-text-secondary">Your cart is empty.</p>
                                    <button onClick={toggleCart} className="text-oasis-cyan text-sm font-medium hover:underline">
                                        Continue Browsing
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const product = item.type === 'agent'
                                        ? agents[item.id as keyof typeof agents]
                                        : bundles[item.id as keyof typeof bundles];

                                    if (!product) return null;

                                    return (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            className="bg-bg-tertiary p-4 rounded-xl border border-white/5 flex gap-4"
                                        >
                                            <div className="p-3 bg-bg-primary rounded-lg h-fit">
                                                <product.icon className="w-5 h-5 text-oasis-cyan" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-white text-sm">{product.title}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-text-tertiary hover:text-red-400 transition-colors p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <p className="text-oasis-cyan font-bold text-sm mb-3">${product.price.toLocaleString()}</p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 bg-bg-primary rounded-lg p-1 border border-white/5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1 hover:bg-white/10 rounded transition-colors text-text-secondary"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1 hover:bg-white/10 rounded transition-colors text-text-secondary"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <span className="text-xs text-text-tertiary">One-time setup</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-bg-tertiary/50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-text-secondary">Subtotal</span>
                                    <span className="text-2xl font-bold text-white">${getTotal().toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-text-tertiary mb-6 text-center">
                                    Taxes and retainer calculated at checkout.
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-oasis"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

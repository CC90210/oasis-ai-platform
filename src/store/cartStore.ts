import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { agents, bundles } from '@/data/products';

export type ProductType = keyof typeof agents | keyof typeof bundles;

interface CartItem {
    id: ProductType;
    type: 'agent' | 'bundle';
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (id: ProductType, type: 'agent' | 'bundle') => void;
    removeItem: (id: ProductType) => void;
    updateQuantity: (id: ProductType, delta: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getTotal: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (id, type) => set((state) => {
                const existingItem = state.items.find(item => item.id === id);
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                        isOpen: true
                    };
                }
                return { items: [...state.items, { id, type, quantity: 1 }], isOpen: true };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),

            updateQuantity: (id, delta) => set((state) => ({
                items: state.items.map(item => {
                    if (item.id === id) {
                        const newQuantity = Math.max(1, item.quantity + delta);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
            })),

            clearCart: () => set({ items: [], isOpen: false }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            // Explicit open and close functions to prevent stuck state
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            getTotal: () => {
                const state = get();
                return state.items.reduce((total, item) => {
                    const product = item.type === 'agent'
                        ? agents[item.id as keyof typeof agents]
                        : bundles[item.id as keyof typeof bundles];
                    return total + (product?.price || 0) * item.quantity;
                }, 0);
            }
        }),
        {
            name: 'oasis-cart-storage',
            // Only persist items, NOT the isOpen state
            // This prevents the cart from being stuck open after refresh
            partialize: (state) => ({ items: state.items }),
        }
    )
);

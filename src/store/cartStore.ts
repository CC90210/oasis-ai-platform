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
    clearCart: () => void;
    toggleCart: () => void;
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
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
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
        }
    )
);

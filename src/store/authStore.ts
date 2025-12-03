import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    name: string;
    email: string;
    company?: string;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    discountCode: string | null;
    login: (user: User) => void;
    signup: (user: User) => void;
    logout: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            discountCode: null,
            login: (user) => set({ user, isAuthenticated: true }),
            signup: (user) => {
                // Generate a random discount code suffix
                const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
                const code = `WELCOME10-${suffix}`;
                set({ user, isAuthenticated: true, discountCode: code });
            },
            logout: () => set({ user: null, isAuthenticated: false, discountCode: null }),
        }),
        {
            name: 'oasis-auth-storage',
        }
    )
);

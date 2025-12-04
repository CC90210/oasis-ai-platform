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
    // New: track if user has active automations (is a paying client)
    hasActiveAutomations: boolean;
    // New: track user type
    userType: 'prospect' | 'client' | null;
    login: (user: User, isExistingClient?: boolean) => void;
    signup: (user: User) => void;
    logout: () => void;
    // New: upgrade prospect to client (after they purchase)
    upgradeToClient: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            discountCode: null,
            hasActiveAutomations: false,
            userType: null,

            login: (user, isExistingClient = false) => set({
                user,
                isAuthenticated: true,
                // Existing clients who login have active automations
                hasActiveAutomations: isExistingClient,
                userType: isExistingClient ? 'client' : 'prospect'
            }),

            signup: (user) => {
                // Generate a random discount code suffix
                const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
                const code = `WELCOME10-${suffix}`;
                set({
                    user,
                    isAuthenticated: true,
                    discountCode: code,
                    // New signups are prospects, not clients yet
                    hasActiveAutomations: false,
                    userType: 'prospect'
                });
            },

            logout: () => set({
                user: null,
                isAuthenticated: false,
                discountCode: null,
                hasActiveAutomations: false,
                userType: null
            }),

            upgradeToClient: () => set({
                hasActiveAutomations: true,
                userType: 'client'
            })
        }),
        {
            name: 'oasis-auth-storage',
        }
    )
);

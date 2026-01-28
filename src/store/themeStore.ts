import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useTheme = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: 'dark', // Default to dark mode

            setTheme: (theme: Theme) => {
                set({ theme });
                // Apply theme class to dashboard root ONLY (not document)
                applyThemeClass(theme);
            },

            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark';
                set({ theme: newTheme });
                applyThemeClass(newTheme);
            }
        }),
        {
            name: 'oasis-theme-storage',
            onRehydrateStorage: () => (state) => {
                // Apply theme class when store rehydrates from localStorage
                if (state?.theme) {
                    applyThemeClass(state.theme);
                }
            }
        }
    )
);

// Helper function to apply theme class to DASHBOARD ONLY (not main website)
function applyThemeClass(theme: Theme) {
    // Only apply to dashboard-root if it exists (dashboard pages)
    const dashboardRoot = document.getElementById('dashboard-root');
    if (dashboardRoot) {
        if (theme === 'light') {
            dashboardRoot.classList.add('light');
            dashboardRoot.classList.remove('dark');
        } else {
            dashboardRoot.classList.add('dark');
            dashboardRoot.classList.remove('light');
        }
    }
    // Never modify document.documentElement - main website stays dark always
}

// Initialize theme on module load
if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('oasis-theme-storage');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.state?.theme) {
                // Delay to ensure DOM is ready
                setTimeout(() => applyThemeClass(parsed.state.theme), 0);
            }
        } catch {
            // Default to dark mode if parsing fails
            setTimeout(() => applyThemeClass('dark'), 0);
        }
    }
}


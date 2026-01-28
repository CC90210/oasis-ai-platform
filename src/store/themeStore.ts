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
                if (state?.theme) {
                    applyThemeClass(state.theme);
                }
            }
        }
    )
);

// Helper function to apply theme class
function applyThemeClass(theme: Theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    } else {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    }
}

// Initialize theme on module load
if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('oasis-theme-storage');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (parsed.state?.theme) {
                applyThemeClass(parsed.state.theme);
            }
        } catch {
            applyThemeClass('dark');
        }
    }
}



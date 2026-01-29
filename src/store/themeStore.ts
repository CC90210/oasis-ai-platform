import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light';

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

export const useTheme = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: 'dark', // Default to dark mode

            get isDark() {
                return get().theme === 'dark';
            },

            setTheme: (theme: Theme) => {
                set({ theme });
                applyThemeToDOM(theme);
            },

            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark';
                set({ theme: newTheme });
                applyThemeToDOM(newTheme);
            }
        }),
        {
            name: 'oasis-theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state?.theme) {
                    // Apply immediately on rehydrate
                    requestAnimationFrame(() => {
                        applyThemeToDOM(state.theme);
                    });
                }
            }
        }
    )
);

// Comprehensive theme application function
function applyThemeToDOM(theme: Theme) {
    const root = document.documentElement;
    const body = document.body;

    // All possible theme class names to remove
    const classesToRemove = ['light', 'dark', 'light-mode', 'dark-mode'];

    // Remove all theme classes from root
    classesToRemove.forEach(cls => {
        root.classList.remove(cls);
        body.classList.remove(cls);
    });

    // Add new theme classes (both naming conventions for compatibility)
    if (theme === 'light') {
        root.classList.add('light', 'light-mode');
        body.classList.add('light', 'light-mode');
    } else {
        root.classList.add('dark', 'dark-mode');
        body.classList.add('dark', 'dark-mode');
    }

    // Set data-theme attribute for CSS variable selectors
    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#030712' : '#ffffff');
    }

    // Also update dashboard root if it exists
    const dashboardRoot = document.getElementById('dashboard-root');
    if (dashboardRoot) {
        classesToRemove.forEach(cls => dashboardRoot.classList.remove(cls));
        dashboardRoot.classList.add(theme);
        dashboardRoot.setAttribute('data-theme', theme);
    }

    console.log(`[ThemeStore] Theme applied: ${theme}`);
}

// Initialize theme on module load
if (typeof window !== 'undefined') {
    // Apply theme as soon as possible
    const initTheme = () => {
        const stored = localStorage.getItem('oasis-theme-storage');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.state?.theme) {
                    applyThemeToDOM(parsed.state.theme);
                    return;
                }
            } catch {
                // Fall through to default
            }
        }
        applyThemeToDOM('dark');
    };

    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key
const THEME_KEY = 'oasis-theme';

// Get initial theme from localStorage or default to dark
function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    // Check multiple possible storage keys for backward compatibility
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    // Check old storage key
    const oldStored = localStorage.getItem('oasis-theme-storage');
    if (oldStored) {
        try {
            const parsed = JSON.parse(oldStored);
            if (parsed.state?.theme === 'light' || parsed.state?.theme === 'dark') {
                return parsed.state.theme;
            }
        } catch {
            // Ignore parse errors
        }
    }

    return 'dark';
}

// Apply theme to document (can be called immediately)
function applyTheme(theme: Theme) {
    const root = document.documentElement;
    const body = document.body;

    // Remove all theme classes
    root.classList.remove('light', 'dark', 'light-mode', 'dark-mode');
    body.classList.remove('light', 'dark', 'light-mode', 'dark-mode');

    // Add both naming conventions for compatibility
    if (theme === 'light') {
        root.classList.add('light', 'light-mode');
        body.classList.add('light', 'light-mode');
    } else {
        root.classList.add('dark', 'dark-mode');
        body.classList.add('dark', 'dark-mode');
    }

    // Set data-theme attribute
    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);

    // Update dashboard root if it exists
    const dashboardRoot = document.getElementById('dashboard-root');
    if (dashboardRoot) {
        dashboardRoot.classList.remove('light', 'dark', 'light-mode', 'dark-mode');
        dashboardRoot.classList.add(theme);
        dashboardRoot.setAttribute('data-theme', theme);
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#030712' : '#f8fafc');
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    // Apply theme on mount and changes
    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    // Also apply immediately on first render (before useEffect runs)
    if (typeof window !== 'undefined') {
        applyTheme(theme);
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// Export for use outside React components
export { applyTheme, getInitialTheme, THEME_KEY };

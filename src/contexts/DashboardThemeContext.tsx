import React, { createContext, useContext, useEffect, useState } from 'react';

type DashboardTheme = 'dark' | 'light';

interface DashboardThemeContextType {
    dashboardTheme: DashboardTheme;
    setDashboardTheme: (theme: DashboardTheme) => void;
    toggleDashboardTheme: () => void;
}

const DashboardThemeContext = createContext<DashboardThemeContextType | undefined>(undefined);

// SEPARATE storage key from main website theme
const DASHBOARD_THEME_KEY = 'oasis-dashboard-theme';

export function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
    const [dashboardTheme, setDashboardThemeState] = useState<DashboardTheme>(() => {
        // Only read from dashboard-specific storage on initial load
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(DASHBOARD_THEME_KEY);
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
        }
        return 'dark'; // Default dashboard theme
    });

    // Apply theme class ONLY to dashboard root, never to body/html
    useEffect(() => {
        const dashboardRoot = document.getElementById('dashboard-root');
        if (dashboardRoot) {
            dashboardRoot.classList.remove('light', 'dark');
            dashboardRoot.classList.add(dashboardTheme);
        }

        // Save to dashboard-specific storage
        localStorage.setItem(DASHBOARD_THEME_KEY, dashboardTheme);
    }, [dashboardTheme]);

    const setDashboardTheme = (theme: DashboardTheme) => {
        setDashboardThemeState(theme);
    };

    const toggleDashboardTheme = () => {
        setDashboardThemeState(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <DashboardThemeContext.Provider value={{ dashboardTheme, setDashboardTheme, toggleDashboardTheme }}>
            {children}
        </DashboardThemeContext.Provider>
    );
}

export function useDashboardTheme() {
    const context = useContext(DashboardThemeContext);
    if (context === undefined) {
        throw new Error('useDashboardTheme must be used within a DashboardThemeProvider');
    }
    return context;
}

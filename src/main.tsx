import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/text-fix.css'
import './styles/theme.css'
import './styles/stars.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'

// Apply theme IMMEDIATELY before React renders (prevents flash)
const THEME_KEY = 'oasis-theme';
const savedTheme = (() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    // Check old storage key for backward compatibility
    const oldStored = localStorage.getItem('oasis-theme-storage');
    if (oldStored) {
        try {
            const parsed = JSON.parse(oldStored);
            if (parsed.state?.theme) return parsed.state.theme;
        } catch { /* ignore */ }
    }
    return 'dark';
})();

// Apply theme classes immediately
document.documentElement.classList.add(savedTheme, savedTheme === 'light' ? 'light-mode' : 'dark-mode');
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
)

import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';
import { CartDrawer } from './components/cart/CartDrawer';
import { Analytics } from '@vercel/analytics/react';
import StarField from './components/StarField';
import CinematicDNA from './components/CinematicDNA';

// Lazy load pages for performance
import { Navigate } from 'react-router-dom';

// ... other imports ...

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const PricingPage = lazy(() => import('./pages/pricing/PricingPage'));
const ProductConfigPage = lazy(() => import('./pages/pricing/ProductConfigPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/checkout/SuccessPage'));
const SubscriptionSuccessPage = lazy(() => import('./pages/subscription-success/SubscriptionSuccessPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const CaseStudiesPage = lazy(() => import('./pages/case-studies/CaseStudiesPage'));

// Portal Pages
const PortalLoginPage = lazy(() => import('./pages/portal/LoginPage'));
const PortalSignupPage = lazy(() => import('./pages/portal/SignupPage'));
const PortalDashboard = lazy(() => import('./pages/portal/DashboardPage'));
const PortalAutomationsPage = lazy(() => import('./pages/portal/AutomationsPage'));
const PortalReportsPage = lazy(() => import('./pages/portal/ReportsPage'));
const PortalBillingPage = lazy(() => import('./pages/portal/BillingPage'));
const PortalSupportPage = lazy(() => import('./pages/portal/SupportPage'));
const PortalSettingsPage = lazy(() => import('./pages/portal/SettingsPage'));
const TestConnection = lazy(() => import('./pages/portal/TestConnection'));
const ConnectionDebugger = lazy(() => import('./pages/portal/ConnectionDebugger'));

const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));

// Custom Agreement Pages
const CustomAgreementPage = lazy(() => import('./pages/custom-agreement/CustomAgreementPage'));
const CustomAgreementSuccessPage = lazy(() => import('./pages/custom-agreement/CustomAgreementSuccessPage'));

function App() {
    // Initialize state based on session storage to prevent flash of content
    const [showSplash, setShowSplash] = useState(() => {
        return !sessionStorage.getItem('splashPlayed');
    });

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('splashPlayed', 'true');
    };

    // Loading fallback
    const PageLoader = () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <ErrorBoundary>
            <StarField paused={showSplash} />
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}


            {/* Main content is always rendered behind the splash screen for seamless transition */}
            <Router>
                <ScrollToTop />
                {/* Global Cart Drawer - Persists across route transitions */}
                <CartDrawer />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<MainLayout showChat={!showSplash} showNav={!showSplash}><LandingPage /></MainLayout>} />
                        <Route path="/services" element={<MainLayout showChat={!showSplash}><ServicesPage /></MainLayout>} />
                        <Route path="/pricing" element={<MainLayout showChat={!showSplash}><PricingPage /></MainLayout>} />
                        <Route path="/pricing/:productId" element={<MainLayout showChat={!showSplash}><ProductConfigPage /></MainLayout>} />
                        <Route path="/contact" element={<MainLayout showChat={!showSplash}><ContactPage /></MainLayout>} />
                        <Route path="/blog" element={<MainLayout showChat={!showSplash}><BlogPage /></MainLayout>} />
                        <Route path="/blog/:slug" element={<MainLayout showChat={!showSplash}><BlogPost /></MainLayout>} />
                        <Route path="/case-studies" element={<MainLayout showChat={!showSplash}><CaseStudiesPage /></MainLayout>} />
                        <Route path="/checkout" element={<MainLayout showChat={!showSplash}><CheckoutPage /></MainLayout>} />
                        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                        <Route path="/subscription-success" element={<MainLayout showChat={!showSplash}><SubscriptionSuccessPage /></MainLayout>} />

                        {/* Custom Agreement Pages */}
                        <Route path="/custom-agreement" element={<MainLayout showChat={!showSplash}><CustomAgreementPage /></MainLayout>} />
                        <Route path="/custom-agreement/success" element={<CustomAgreementSuccessPage />} />

                        {/* Legal Pages */}
                        <Route path="/privacy" element={<MainLayout showChat={!showSplash}><PrivacyPage /></MainLayout>} />
                        <Route path="/terms" element={<MainLayout showChat={!showSplash}><TermsPage /></MainLayout>} />

                        {/* Portal Routes */}
                        <Route path="/portal/login" element={<PortalLoginPage />} />
                        <Route path="/portal/signup" element={<PortalSignupPage />} />
                        <Route path="/portal/dashboard" element={<PortalDashboard />} />
                        <Route path="/portal/automations" element={<PortalAutomationsPage />} />
                        <Route path="/portal/reports" element={<PortalReportsPage />} />
                        <Route path="/portal/billing" element={<PortalBillingPage />} />
                        <Route path="/portal/support" element={<PortalSupportPage />} />
                        <Route path="/portal/settings" element={<PortalSettingsPage />} />
                        <Route path="/portal/test" element={<TestConnection />} />
                        <Route path="/portal/debug" element={<ConnectionDebugger />} />

                        {/* Convenience Redirects */}
                        <Route path="/login" element={<Navigate to="/portal/login" replace />} />
                        <Route path="/portal" element={<Navigate to="/portal/login" replace />} />
                    </Routes>
                </Suspense>
                <Analytics />
            </Router>
        </ErrorBoundary>
    );
}

export default App;

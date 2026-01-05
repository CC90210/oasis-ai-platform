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
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const PricingPage = lazy(() => import('./pages/pricing/PricingPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/checkout/SuccessPage'));
const SubscriptionSuccessPage = lazy(() => import('./pages/subscription-success/SubscriptionSuccessPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const CaseStudiesPage = lazy(() => import('./pages/case-studies/CaseStudiesPage'));
const LoginPage = lazy(() => import('./pages/login'));
const ClientDashboard = lazy(() => import('./pages/dashboard/[clientId]'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));

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
            <CinematicDNA />
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

            {/* Main content is always rendered behind the splash screen for seamless transition */}
            <Router>
                <ScrollToTop />
                {/* Global Cart Drawer - Persists across route transitions */}
                <CartDrawer />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<MainLayout showChat={!showSplash}><LandingPage /></MainLayout>} />
                        <Route path="/services" element={<MainLayout showChat={!showSplash}><ServicesPage /></MainLayout>} />
                        <Route path="/pricing" element={<MainLayout showChat={!showSplash}><PricingPage /></MainLayout>} />
                        <Route path="/contact" element={<MainLayout showChat={!showSplash}><ContactPage /></MainLayout>} />
                        <Route path="/blog" element={<MainLayout showChat={!showSplash}><BlogPage /></MainLayout>} />
                        <Route path="/blog/:slug" element={<MainLayout showChat={!showSplash}><BlogPost /></MainLayout>} />
                        <Route path="/case-studies" element={<MainLayout showChat={!showSplash}><CaseStudiesPage /></MainLayout>} />
                        <Route path="/checkout" element={<MainLayout showChat={!showSplash}><CheckoutPage /></MainLayout>} />
                        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                        <Route path="/subscription-success" element={<MainLayout showChat={!showSplash}><SubscriptionSuccessPage /></MainLayout>} />

                        {/* Legal Pages */}
                        <Route path="/privacy" element={<MainLayout showChat={!showSplash}><PrivacyPage /></MainLayout>} />
                        <Route path="/terms" element={<MainLayout showChat={!showSplash}><TermsPage /></MainLayout>} />

                        {/* Portal Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/dashboard/:clientId" element={<ClientDashboard />} />

                        {/* Redirect old routes */}
                        <Route path="/portal/*" element={<LoginPage />} />
                    </Routes>
                </Suspense>
                <Analytics />
            </Router>
        </ErrorBoundary>
    );
}

export default App;

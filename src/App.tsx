import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/landing/LandingPage';
import ServicesPage from './pages/services/ServicesPage';
import PricingPage from './pages/pricing/PricingPage';
import ContactPage from './pages/contact/ContactPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import BlogPage from './pages/blog/BlogPage';
import BlogPost from './pages/blog/BlogPost';
import CaseStudiesPage from './pages/casestudies/CaseStudiesPage';
import LoginPage from './pages/portal/LoginPage';
import SignupPage from './pages/portal/SignupPage';
import WelcomePage from './pages/portal/WelcomePage';
import ClientDashboard from './pages/portal/ClientDashboard';
import PrivacyPage from './pages/legal/PrivacyPage';
import TermsPage from './pages/legal/TermsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';

function App() {
    // Initialize state based on session storage to prevent flash of content
    const [showSplash, setShowSplash] = useState(() => {
        return !sessionStorage.getItem('splashPlayed');
    });

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('splashPlayed', 'true');
    };

    return (
        <ErrorBoundary>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

            {/* Main content is always rendered behind the splash screen for seamless transition */}
            <Router>
                <ScrollToTop />
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

                    {/* Legal Pages */}
                    <Route path="/privacy" element={<MainLayout showChat={!showSplash}><PrivacyPage /></MainLayout>} />
                    <Route path="/terms" element={<MainLayout showChat={!showSplash}><TermsPage /></MainLayout>} />

                    {/* Portal Routes - Public */}
                    <Route path="/portal/login" element={<LoginPage />} />
                    <Route path="/portal/signup" element={<SignupPage />} />

                    {/* Portal Routes - Protected */}
                    {/* New signups/prospects go to Welcome page */}
                    <Route path="/portal/welcome" element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    } />

                    {/* Existing clients with active automations go to Dashboard */}
                    <Route path="/portal/dashboard" element={
                        <ProtectedRoute>
                            <ClientDashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;

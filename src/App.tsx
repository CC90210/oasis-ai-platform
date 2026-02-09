import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { CartDrawer } from './components/cart/CartDrawer';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for performance
import { Navigate } from 'react-router-dom';

// Public Pages
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage'));
const PricingPage = lazy(() => import('./pages/pricing/PricingPage'));
const ProductConfigPage = lazy(() => import('./pages/pricing/ProductConfigPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/checkout/CheckoutSuccessPage'));
const LegalCheckoutPage = lazy(() => import('./pages/checkout/LegalCheckoutPage'));
const SubscriptionSuccessPage = lazy(() => import('./pages/subscription-success/SubscriptionSuccessPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const CaseStudiesPage = lazy(() => import('./pages/case-studies/CaseStudiesPage'));

// Portal Pages
const PortalLoginPage = lazy(() => import('./pages/portal/LoginPage'));
const PortalSignupPage = lazy(() => import('./pages/portal/SignupPage'));
const PortalWelcomePage = lazy(() => import('./pages/portal/WelcomePage'));
const PortalDashboard = lazy(() => import('./pages/portal/DashboardPage'));
const PortalAutomationsPage = lazy(() => import('./pages/portal/AutomationsPage'));
const PortalReportsPage = lazy(() => import('./pages/portal/ReportsPage'));
const PortalBillingPage = lazy(() => import('./pages/portal/BillingPage'));
const PortalSupportPage = lazy(() => import('./pages/portal/SupportPage'));
const PortalSettingsPage = lazy(() => import('./pages/portal/SettingsPage'));
const PortalProfilePage = lazy(() => import('./pages/portal/ProfilePage'));
const TestConnection = lazy(() => import('./pages/portal/TestConnection'));
const ConnectionDebugger = lazy(() => import('./pages/portal/ConnectionDebugger'));

// Legal Pages
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const MSAPage = lazy(() => import('./pages/legal/MSAPage'));
const LegalHubPage = lazy(() => import('./pages/legal/LegalHubPage'));
const IPAssignmentPage = lazy(() => import('./pages/legal/IPAssignmentPage'));
const SOWTemplatePage = lazy(() => import('./pages/legal/SOWTemplatePage'));
const PartnershipTermSheetPage = lazy(() => import('./pages/legal/PartnershipTermSheetPage'));
const ContractorAgreementPage = lazy(() => import('./pages/legal/ContractorAgreementPage'));

// Custom Agreement Pages
const CustomAgreementPage = lazy(() => import('./pages/custom-agreement/CustomAgreementPage'));
const CustomAgreementSuccessPage = lazy(() => import('./pages/custom-agreement/CustomAgreementSuccessPage'));

function App() {
    // Loading fallback
    const PageLoader = () => (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <ErrorBoundary>
            <ThemeProvider>
                {/* Main content - immediate access */}
                <Router>
                    <ScrollToTop />
                    {/* Global Cart Drawer - Persists across route transitions */}
                    <CartDrawer />
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
                            <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
                            <Route path="/pricing" element={<MainLayout><PricingPage /></MainLayout>} />
                            <Route path="/pricing/:productId" element={<MainLayout><ProductConfigPage /></MainLayout>} />
                            <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
                            <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
                            <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
                            <Route path="/case-studies" element={<MainLayout><CaseStudiesPage /></MainLayout>} />
                            <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
                            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                            <Route path="/checkout/legal" element={<LegalCheckoutPage />} />
                            <Route path="/subscription-success" element={<MainLayout><SubscriptionSuccessPage /></MainLayout>} />

                            {/* Custom Agreement Pages */}
                            <Route path="/custom-agreement" element={<MainLayout><CustomAgreementPage /></MainLayout>} />
                            <Route path="/custom-agreement/success" element={<CustomAgreementSuccessPage />} />

                            {/* Legal Pages */}
                            <Route path="/legal" element={<MainLayout><LegalHubPage /></MainLayout>} />
                            <Route path="/legal/privacy-policy" element={<MainLayout><PrivacyPage /></MainLayout>} />
                            <Route path="/legal/terms-of-service" element={<MainLayout><TermsPage /></MainLayout>} />
                            <Route path="/legal/master-services-agreement" element={<MainLayout><MSAPage /></MainLayout>} />
                            <Route path="/legal/ip-assignment" element={<MainLayout><IPAssignmentPage /></MainLayout>} />
                            <Route path="/legal/statement-of-work" element={<MainLayout><SOWTemplatePage /></MainLayout>} />
                            <Route path="/legal/partnership-term-sheet" element={<MainLayout><PartnershipTermSheetPage /></MainLayout>} />
                            <Route path="/legal/contractor-agreement" element={<MainLayout><ContractorAgreementPage /></MainLayout>} />

                            {/* Portal Auth Routes (No Protection) */}
                            <Route path="/portal/login" element={<PortalLoginPage />} />
                            <Route path="/portal/signup" element={<PortalSignupPage />} />

                            {/* Protected Portal Routes */}
                            <Route path="/portal/welcome" element={
                                <ProtectedRoute>
                                    <PortalWelcomePage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/dashboard" element={
                                <ProtectedRoute>
                                    <PortalDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/automations" element={
                                <ProtectedRoute>
                                    <PortalAutomationsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/reports" element={
                                <ProtectedRoute>
                                    <PortalReportsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/billing" element={
                                <ProtectedRoute>
                                    <PortalBillingPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/support" element={
                                <ProtectedRoute>
                                    <PortalSupportPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/settings" element={
                                <ProtectedRoute>
                                    <PortalSettingsPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/profile" element={
                                <ProtectedRoute>
                                    <PortalProfilePage />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/test" element={
                                <ProtectedRoute>
                                    <TestConnection />
                                </ProtectedRoute>
                            } />
                            <Route path="/portal/debug" element={
                                <ProtectedRoute>
                                    <ConnectionDebugger />
                                </ProtectedRoute>
                            } />

                            {/* Convenience Redirects */}
                            <Route path="/privacy" element={<Navigate to="/legal/privacy-policy" replace />} />
                            <Route path="/terms" element={<Navigate to="/legal/terms-of-service" replace />} />
                            <Route path="/login" element={<Navigate to="/portal/login" replace />} />
                            <Route path="/portal" element={<Navigate to="/portal/dashboard" replace />} />
                        </Routes>
                    </Suspense>
                    <Analytics />
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;

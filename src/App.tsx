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
import LoginPage from './pages/portal/LoginPage';
import SignupPage from './pages/portal/SignupPage';
import ChatPage from './pages/portal/ChatPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
                    <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
                    <Route path="/pricing" element={<MainLayout><PricingPage /></MainLayout>} />
                    <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
                    <Route path="/blog" element={<MainLayout><BlogPage /></MainLayout>} />
                    <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
                    <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />

                    {/* Portal Routes */}
                    <Route path="/portal/login" element={<LoginPage />} />
                    <Route path="/portal/signup" element={<SignupPage />} />
                    <Route path="/portal/chat" element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PortalLayout } from '@/components/layout/PortalLayout';
import LandingPage from '@/pages/landing/LandingPage';
import AboutPage from '@/pages/about/AboutPage';
import ServicesPage from '@/pages/services/ServicesPage';
import PricingPage from '@/pages/pricing/PricingPage';
import CaseStudiesPage from '@/pages/case-studies/CaseStudiesPage';
import ContactPage from '@/pages/contact/ContactPage';
import LoginPage from '@/pages/portal/LoginPage';
import DashboardPage from '@/pages/portal/DashboardPage';
import AutomationsPage from '@/pages/portal/AutomationsPage';
import ChatPage from '@/pages/portal/ChatPage';
import KnowledgeBasePage from '@/pages/portal/KnowledgeBasePage';
import BillingPage from '@/pages/portal/BillingPage';
import TeamPage from '@/pages/portal/TeamPage';
import SettingsPage from '@/pages/portal/SettingsPage';

const MarketingLayout = () => (
    <MainLayout>
        <Outlet />
    </MainLayout>
);

const PortalLayoutWrapper = () => (
    <PortalLayout>
        <Outlet />
    </PortalLayout>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Marketing Routes */}
                <Route element={<MarketingLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/case-studies" element={<CaseStudiesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/portal/login" element={<LoginPage />} />

                {/* Protected Portal Routes */}
                <Route path="/portal" element={<PortalLayoutWrapper />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="automations" element={<AutomationsPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="knowledge" element={<KnowledgeBasePage />} />
                    <Route path="billing" element={<BillingPage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from '../chat/ChatWidget';

interface MainLayoutProps {
    children: React.ReactNode;
    showChat?: boolean;
    showNav?: boolean;
}

export const MainLayout = ({ children, showChat = true, showNav = true }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-transparent text-text-primary relative overflow-x-hidden selection:bg-oasis-cyan/30 selection:text-white">
            {/* Header with fade-in transition */}
            <div className={`transition-opacity duration-500 ${showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <Header />
            </div>
            {showChat && <ChatWidget />}
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

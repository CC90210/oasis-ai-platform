import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { ChatWidget } from '../chat/ChatWidget';

interface MainLayoutProps {
    children: React.ReactNode;
    showChat?: boolean;
}

export const MainLayout = ({ children, showChat = true }: MainLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-primary">
            <Header />
            <CartDrawer />
            {showChat && <ChatWidget />}
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

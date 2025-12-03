import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { ChatWidget } from '../chat/ChatWidget';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-primary">
            <Header />
            <CartDrawer />
            <ChatWidget />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

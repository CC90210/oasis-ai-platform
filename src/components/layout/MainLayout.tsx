import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingParticles } from '../animations/FloatingParticles';
import { ChatWidget } from '../chat/ChatWidget';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-oasis-mist font-sans text-oasis-charcoal">
            <FloatingParticles />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
};

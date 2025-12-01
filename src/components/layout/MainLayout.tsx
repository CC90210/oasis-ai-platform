import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingParticles } from '../animations/FloatingParticles';
import { ChatWidget } from '../chat/ChatWidget';
import { FloatingCTA } from './FloatingCTA';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-bg-primary font-sans text-text-primary relative overflow-x-hidden">
            <FloatingParticles />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <ChatWidget />
            <FloatingCTA />
        </div>
    );
};

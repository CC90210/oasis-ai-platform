import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortalHeaderProps {
    setSidebarOpen: (isOpen: boolean) => void;
}

export const PortalHeader = ({ setSidebarOpen }: PortalHeaderProps) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-bg-secondary px-6 shadow-sm">
            <button
                className="md:hidden text-text-secondary hover:text-white"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-tertiary" />
                    <input
                        type="search"
                        placeholder="Search automations, docs, or chats..."
                        className="w-full rounded-md border border-white/10 bg-bg-tertiary pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan placeholder-text-tertiary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-text-secondary hover:text-oasis-cyan hover:bg-white/5 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-oasis-cyan"></span>
                </Button>
            </div>
        </header>
    );
};

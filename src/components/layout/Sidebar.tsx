import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Workflow,
    MessageSquare,
    Database,
    CreditCard,
    Users,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
        { name: 'Automations', href: '/portal/automations', icon: Workflow },
        { name: 'AI Chat', href: '/portal/chat', icon: MessageSquare },
        { name: 'Knowledge Base', href: '/portal/knowledge', icon: Database },
        { name: 'Billing', href: '/portal/billing', icon: CreditCard },
        { name: 'Team', href: '/portal/team', icon: Users },
        { name: 'Settings', href: '/portal/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-bg-primary/80 backdrop-blur-sm md:hidden transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-bg-primary text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:w-64 md:flex-col border-r border-white/10",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo */}
                <div className="flex h-16 items-center px-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-oasis-cyan to-blue-600 text-bg-primary font-bold">
                            O
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight">OASIS AI</span>
                    </div>
                    <button
                        className="ml-auto md:hidden text-text-secondary hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-oasis-cyan text-bg-primary font-bold"
                                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* User & Logout */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-oasis-cyan/20 flex items-center justify-center text-oasis-cyan font-bold">
                            CC
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">CC Admin</p>
                            <p className="text-xs text-text-tertiary truncate">cc@oasis-ai.com</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-text-secondary hover:text-white hover:bg-red-500/10 hover:text-red-500"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                    </Button>
                </div>
            </div>
        </>
    );
};

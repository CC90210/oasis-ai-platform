import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PortalHeader } from './PortalHeader';

interface PortalLayoutProps {
    children: React.ReactNode;
}

export const PortalLayout = ({ children }: PortalLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-oasis-mist overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <PortalHeader setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Bot, FileText, CreditCard, HelpCircle,
    User, LogOut, Loader2
} from 'lucide-react';
import { supabase, logout, Profile } from '@/lib/supabase';
import { useEffect, useState } from 'react';

// Reuse the StatusBadge logic here if you want it globally, 
// or simply keep this layout focused on navigation.

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/portal/login');
            return;
        }

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // Even if profile is missing, we use user data as fallback display
        setProfile((data as Profile) || {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || 'Client',
            company_name: user.user_metadata?.company_name || '',
            created_at: new Date().toISOString()
        });
        setLoading(false);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/portal/login');
    };

    const navItems = [
        { path: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/portal/automations', icon: Bot, label: 'My Automations' },
        { path: '/portal/reports', icon: FileText, label: 'Reports' },
        { path: '/portal/billing', icon: CreditCard, label: 'Billing' },
        { path: '/portal/support', icon: HelpCircle, label: 'Support' },
        { path: '/portal/settings', icon: User, label: 'Settings' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex selection:bg-cyan-500/20 text-white font-sans">
            {/* Sidebar (Desktop) */}
            <aside className="w-72 bg-[#0a0a0f] border-r border-[#1a1a2e] p-6 flex flex-col hidden lg:flex shadow-2xl z-20">
                {/* Logo */}
                <div className="flex items-center gap-4 mb-10 pl-2">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative h-12 w-12 bg-[#0a0a14] rounded-xl flex items-center justify-center border border-[#2a2a3e] shadow-xl">
                            <Bot className="w-7 h-7 text-cyan-400" />
                        </div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        OASIS AI
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <a
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                                        : 'text-gray-400 hover:bg-[#151520] hover:text-white border border-transparent'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-l-xl"></div>
                                )}
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400 transition-colors'}`} />
                                <span className="font-medium">{item.label}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Profile Footer */}
                <div className="border-t border-[#1a1a2e] pt-6 mt-6">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-900 to-purple-900 flex items-center justify-center border border-[#2a2a3e] text-white font-bold shadow-lg">
                            {profile?.full_name?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate text-sm">{profile?.full_name || 'Client'}</p>
                            <p className="text-gray-500 text-xs truncate">{profile?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#151520] hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-[#2a2a3e] hover:border-red-500/20 transition-all duration-200 text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0a0a0f] border-b border-[#1a1a2e] p-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-cyan-400" />
                    <span className="font-bold text-white">OASIS AI</span>
                </div>
                {/* Mobile menu toggle would go here */}
            </div>

            {/* Main Page Content */}
            <main className="flex-1 overflow-auto pt-20 lg:pt-0 relative">
                {/* Cinematic Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

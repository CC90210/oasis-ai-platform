import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard, Bot, FileText, CreditCard, HelpCircle,
    User, LogOut, Menu, X
} from 'lucide-react';
import { supabase, logout, Profile } from '@/lib/supabase';
import { useEffect, useState, useRef } from 'react';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const authCheckComplete = useRef(false);

    useEffect(() => {
        // Only run auth check once
        if (authCheckComplete.current) return;

        const checkAuth = async () => {
            try {
                // Quick session check
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    navigate('/portal/login');
                    return;
                }

                // Get user
                const { data: { user }, error } = await supabase.auth.getUser();

                if (error || !user) {
                    navigate('/portal/login');
                    return;
                }

                // Load profile (with graceful fallback)
                try {
                    const { data: profileData } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    setProfile(profileData || {
                        id: user.id,
                        email: user.email!,
                        full_name: user.user_metadata?.full_name || 'Client',
                        company_name: '',
                        phone: null,
                        avatar_url: null,
                        created_at: new Date().toISOString()
                    });
                } catch {
                    // Profile query failed, use fallback
                    setProfile({
                        id: user.id,
                        email: user.email!,
                        full_name: user.user_metadata?.full_name || 'Client',
                        company_name: '',
                        phone: null,
                        avatar_url: null,
                        created_at: new Date().toISOString()
                    });
                }

                authCheckComplete.current = true;
            } catch (err) {
                console.error('Auth check error:', err);
                navigate('/portal/login');
            } finally {
                setLoading(false);
            }
        };

        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            if (loading) {
                setLoading(false);
                // If still loading after 8 seconds, show content anyway
            }
        }, 8000);

        checkAuth();

        return () => clearTimeout(timeout);
    }, []);

    // Close mobile menu on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            authCheckComplete.current = false;
            navigate('/portal/login');
        }
    };

    const navItems = [
        { path: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/portal/automations', icon: Bot, label: 'My Automations' },
        { path: '/portal/reports', icon: FileText, label: 'Reports' },
        { path: '/portal/billing', icon: CreditCard, label: 'Billing' },
        { path: '/portal/support', icon: HelpCircle, label: 'Support' },
        { path: '/portal/settings', icon: User, label: 'Settings' },
    ];

    // Show minimal loading only on initial load
    if (loading && !profile) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">Loading portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex selection:bg-cyan-500/20 text-white font-sans relative">
            {/* Subtle starfield background for portal */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(80)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/30 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.4 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Sidebar (Desktop) */}
            <aside className="w-72 bg-[#0a0a0f] border-r border-[#1a1a2e] p-6 flex flex-col hidden lg:flex shadow-2xl z-20 fixed top-0 left-0 h-screen">
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
                            <Link
                                key={item.path}
                                to={item.path}
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
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div className="border-t border-[#1a1a2e] pt-6 mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                profile?.full_name?.charAt(0) || profile?.email?.charAt(0)?.toUpperCase() || 'C'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{profile?.full_name || 'Client'}</p>
                            <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm font-medium border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0a0a0f] border-b border-[#1a1a2e] px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#0a0a14] rounded-xl flex items-center justify-center border border-[#2a2a3e]">
                            <Bot className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="font-bold text-white">OASIS AI</span>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-gray-400 hover:text-white"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="absolute inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="absolute top-0 left-0 bottom-0 w-72 bg-[#0a0a0f] p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 bg-[#0a0a14] rounded-xl flex items-center justify-center border border-[#2a2a3e]">
                                <Bot className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="font-bold text-white">OASIS AI</span>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                            : 'text-gray-400 hover:bg-[#151520] hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="border-t border-[#1a1a2e] pt-4">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-gray-400 hover:text-red-400 rounded-lg transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}

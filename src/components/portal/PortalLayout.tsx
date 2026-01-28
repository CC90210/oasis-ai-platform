import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard, Bot, FileText, CreditCard, HelpCircle,
    User, LogOut, Menu, X, Home, ExternalLink
} from 'lucide-react';
import { supabase, logout, Profile } from '@/lib/supabase';
import { useEffect, useState, useRef } from 'react';
import StarField from '@/components/StarField';

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
            // Redirect to homepage, not login - users can access login from there if needed
            navigate('/');
        }
    };

    type NavItem =
        | { type: 'divider' }
        | { type: 'link'; path: string; icon: React.ComponentType<{ className?: string }>; label: string; external?: boolean };

    const navItems: NavItem[] = [
        { type: 'link', path: '/', icon: Home, label: 'Back to Website', external: true },
        { type: 'divider' },
        { type: 'link', path: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { type: 'link', path: '/portal/automations', icon: Bot, label: 'My Automations' },
        { type: 'link', path: '/portal/reports', icon: FileText, label: 'Reports' },
        { type: 'link', path: '/portal/billing', icon: CreditCard, label: 'Billing' },
        { type: 'link', path: '/portal/support', icon: HelpCircle, label: 'Support' },
        { type: 'link', path: '/portal/settings', icon: User, label: 'Settings' },
    ];

    // Show minimal loading only on initial load
    if (loading && !profile) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[var(--text-secondary)] text-sm">Loading portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex selection:bg-cyan-500/20 text-[var(--text-primary)] font-sans relative overflow-x-hidden max-w-full transition-colors duration-300">
            {/* Real StarField background - same as main site */}
            <StarField />

            {/* Sidebar (Desktop) */}
            <aside className="w-72 bg-[var(--bg-primary)] border-r border-[var(--bg-tertiary)] p-6 flex flex-col hidden lg:flex shadow-2xl z-20 fixed top-0 left-0 h-screen transition-colors duration-300">
                {/* Logo - Clickable to go home */}
                <Link to="/" className="flex items-center gap-4 mb-10 pl-2 group/logo hover:opacity-90 transition">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover/logo:opacity-50 transition duration-500"></div>
                        <div className="relative h-12 w-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] shadow-xl">
                            <Bot className="w-7 h-7 text-cyan-400" />
                        </div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-muted)]">
                        OASIS AI
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item, index) => {
                        // Handle divider
                        if (item.type === 'divider') {
                            return <div key={`divider-${index}`} className="border-t border-[var(--bg-tertiary)] my-3" />;
                        }

                        // TypeScript now knows item.type === 'link'
                        const linkItem = item;
                        const isActive = location.pathname === linkItem.path;
                        const isExternal = linkItem.external === true;
                        const IconComponent = linkItem.icon;

                        return (
                            <Link
                                key={linkItem.path}
                                to={linkItem.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isExternal
                                    ? 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] border border-transparent'
                                    : isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] border border-transparent'
                                    }`}
                            >
                                {isActive && !isExternal && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-l-xl"></div>
                                )}
                                <IconComponent className={`w-5 h-5 ${isActive && !isExternal ? 'text-cyan-400' : 'text-[var(--text-muted)] group-hover:text-cyan-400 transition-colors'}`} />
                                <span className="font-medium">{linkItem.label}</span>
                                {isExternal && <ExternalLink className="w-3 h-3 ml-auto opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div className="border-t border-[var(--bg-tertiary)] pt-6 mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden flex-shrink-0">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                profile?.full_name?.charAt(0) || profile?.email?.charAt(0)?.toUpperCase() || 'C'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-[var(--text-primary)] truncate">{profile?.full_name || 'Client'}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{profile?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm font-medium border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--bg-primary)] border-b border-[var(--bg-tertiary)] px-4 py-3 max-w-full transition-colors duration-300">
                <div className="flex items-center justify-between">
                    {/* Home button */}
                    <Link
                        to="/"
                        className="p-2 -ml-2 text-[var(--text-secondary)] hover:text-cyan-400 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Back to website"
                    >
                        <Home className="w-5 h-5" />
                    </Link>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center border border-[var(--border)] flex-shrink-0">
                            <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="font-bold text-[var(--text-primary)]">OASIS AI</span>
                    </Link>

                    {/* Menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 -mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-[var(--bg-primary)] p-6 flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)]">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                </div>
                                <span className="font-bold text-[var(--text-primary)]">OASIS AI</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {navItems.map((item, index) => {
                                // Handle divider
                                if (item.type === 'divider') {
                                    return <div key={`mobile-divider-${index}`} className="border-t border-[var(--bg-tertiary)] my-3" />;
                                }

                                // TypeScript now knows item.type === 'link'
                                const linkItem = item;
                                const isActive = location.pathname === linkItem.path;
                                const isExternal = linkItem.external === true;
                                const IconComponent = linkItem.icon;

                                return (
                                    <Link
                                        key={linkItem.path}
                                        to={linkItem.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all min-h-[48px] ${isExternal
                                            ? 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                                            : isActive
                                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                                            }`}
                                    >
                                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium">{linkItem.label}</span>
                                        {isExternal && <ExternalLink className="w-3 h-3 ml-auto opacity-50" />}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="border-t border-[var(--bg-tertiary)] pt-4 mt-4">
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden flex-shrink-0">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        profile?.full_name?.charAt(0) || profile?.email?.charAt(0)?.toUpperCase() || 'C'
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[var(--text-primary)] truncate text-sm">{profile?.full_name || 'Client'}</p>
                                    <p className="text-xs text-[var(--text-muted)] truncate">{profile?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full px-4 py-3 text-[var(--text-secondary)] hover:text-red-400 rounded-lg transition min-h-[48px]"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content - prevent horizontal scroll */}
            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen overflow-x-hidden max-w-full">
                <div className="overflow-hidden max-w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

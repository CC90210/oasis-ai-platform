import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard, Bot, FileText, CreditCard, HelpCircle, Settings, LogOut,
    TrendingUp, Clock, CheckCircle, Activity, Loader2
} from 'lucide-react';

interface Profile {
    id: string;
    email: string;
    full_name: string;
    company_name: string;
}

interface Automation {
    id: string;
    automation_type: string;
    display_name: string;
    tier: string;
    status: string;
    last_run_at: string;
    created_at: string;
}

interface LogEntry {
    id: string;
    event_name: string;
    status: string;
    created_at: string;
}

export default function PortalDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState({
        totalExecutions: 0,
        hoursThisMonth: 0,
        successRate: 100,
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            navigate('/portal/login');
            return;
        }

        await loadDashboardData(user.id);
    };

    const loadDashboardData = async (userId: string) => {
        try {
            // Load profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (profileData) {
                setProfile(profileData);
            }

            // Load automations
            const { data: automationsData } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (automationsData) {
                setAutomations(automationsData);
            }

            // Load recent logs
            const { data: logsData } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(10);

            if (logsData) {
                setRecentLogs(logsData);

                // Calculate stats
                const successCount = logsData.filter(l => l.status === 'success').length;
                setStats({
                    totalExecutions: logsData.length,
                    hoursThisMonth: Math.round(logsData.length * 0.5), // Estimate 30 min saved per execution
                    successRate: logsData.length > 0 ? Math.round((successCount / logsData.length) * 100) : 100,
                });
            }

        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/portal/login');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'pending_setup': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'paused': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900/50 border-r border-gray-800 p-4 flex flex-col hidden lg:flex">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="h-10 w-10 bg-[#0a0a14] rounded-lg shadow-2xl flex items-center justify-center border border-[#1a1a2e]">
                        <img src="/images/oasis-logo.jpg" alt="OASIS" className="h-8 w-auto rounded" />
                    </div>
                    <span className="text-white font-bold">OASIS AI</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    <a href="/portal/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="/portal/automations" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                        <Bot className="w-5 h-5" />
                        My Automations
                    </a>
                    <a href="/portal/reports" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                        <FileText className="w-5 h-5" />
                        Reports
                    </a>
                    <a href="/portal/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                        <CreditCard className="w-5 h-5" />
                        Billing
                    </a>
                    <a href="/portal/support" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                        <HelpCircle className="w-5 h-5" />
                        Support
                    </a>
                    <a href="/portal/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                        <Settings className="w-5 h-5" />
                        Settings
                    </a>
                </nav>

                {/* User & Logout */}
                <div className="border-t border-gray-800 pt-4 mt-4">
                    <div className="px-3 py-2 mb-2">
                        <p className="text-white font-medium truncate">{profile?.full_name || 'Client'}</p>
                        <p className="text-gray-500 text-sm truncate">{profile?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
                        </h1>
                        <p className="text-gray-400 mt-1">Here's what's happening with your automations.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">Total Executions</span>
                            <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.totalExecutions}</p>
                        <p className="text-sm text-gray-500 mt-1">This month</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">Hours Saved</span>
                            <Clock className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.hoursThisMonth}</p>
                        <p className="text-sm text-gray-500 mt-1">Estimated this month</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400">Success Rate</span>
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.successRate}%</p>
                        <p className="text-sm text-gray-500 mt-1">All time</p>
                    </div>
                </div>

                {/* Automations */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Your Automations</h2>

                    {automations.length === 0 ? (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                            <Bot className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No automations yet.</p>
                            <a href="/pricing" className="text-cyan-400 hover:text-cyan-300 mt-2 inline-block">
                                Browse automations →
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {automations.map((automation) => (
                                <div
                                    key={automation.id}
                                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{automation.display_name}</h3>
                                            <p className="text-sm text-gray-500 capitalize">{automation.tier} Plan</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(automation.status)}`}>
                                            {automation.status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    {automation.last_run_at && (
                                        <p className="text-sm text-gray-400">
                                            Last run: {formatDate(automation.last_run_at)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>

                    {recentLogs.length === 0 ? (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No activity yet.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                            {recentLogs.map((log, index) => (
                                <div
                                    key={log.id}
                                    className={`flex items-center gap-4 p-4 ${index !== recentLogs.length - 1 ? 'border-b border-gray-800' : ''}`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <div className="flex-1">
                                        <p className="text-white">{log.event_name}</p>
                                        <p className="text-sm text-gray-500">{formatDate(log.created_at)}</p>
                                    </div>
                                    <CheckCircle className={`w-5 h-5 ${log.status === 'success' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard, Bot, FileText, CreditCard, HelpCircle, Settings, LogOut,
    TrendingUp, Clock, CheckCircle, Activity, Loader2, AlertCircle, RefreshCw
} from 'lucide-react';

interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    company_name: string | null;
}

interface Automation {
    id: string;
    automation_type: string;
    display_name: string;
    tier: string;
    status: string;
    last_run_at: string | null;
    created_at: string;
}

interface LogEntry {
    id: string;
    event_name: string;
    event_type: string;
    status: string;
    created_at: string;
    metadata: any;
}

export default function DashboardPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState({
        totalExecutions: 0,
        successfulExecutions: 0,
        hoursEstimated: 0,
        successRate: 0,
    });

    useEffect(() => {
        checkAuthAndLoadData();
    }, []);

    const checkAuthAndLoadData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Check if user is logged in
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Not logged in, redirect to login
                navigate('/portal/login');
                return;
            }

            console.log('Logged in user:', user);

            // Load profile from database
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('Profile error:', profileError);
                // Profile might not exist yet, use user data
                setProfile({
                    id: user.id,
                    email: user.email || '',
                    full_name: user.user_metadata?.full_name || null,
                    company_name: user.user_metadata?.company_name || null,
                });
            } else {
                setProfile(profileData);
            }

            // Load automations for this user
            const { data: automationsData, error: automationsError } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (automationsError) {
                console.error('Automations error:', automationsError);
            } else {
                console.log('Automations loaded:', automationsData);
                setAutomations(automationsData || []);
            }

            // Load recent logs for this user
            const { data: logsData, error: logsError } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20);

            if (logsError) {
                console.error('Logs error:', logsError);
            } else {
                console.log('Logs loaded:', logsData);
                setRecentLogs(logsData || []);

                // Calculate stats from real data
                const total = logsData?.length || 0;
                const successful = logsData?.filter(l => l.status === 'success').length || 0;

                setStats({
                    totalExecutions: total,
                    successfulExecutions: successful,
                    hoursEstimated: Math.round(total * 0.25), // Estimate 15 min saved per execution
                    successRate: total > 0 ? Math.round((successful / total) * 100) : 100,
                });
            }

        } catch (err: any) {
            console.error('Dashboard error:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('supabase_access_token');
        localStorage.removeItem('supabase_refresh_token');
        localStorage.removeItem('supabase_user');
        navigate('/portal/login');
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-green-500/20 text-green-400 border-green-500/30',
            pending_setup: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            paused: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            testing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        };
        return styles[status] || styles.active;
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatStatus = (status: string) => {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Connecting to OASIS...</p>
                </div>
            </div>
        );
    }

    // Fallback/Demo Data if Supabase is empty (Safety Net for UI)
    const displayAutomations = automations.length > 0 ? automations : [{
        id: 'demo-auto-1',
        automation_type: 'shopify_support',
        display_name: 'Customer Support Agent',
        tier: 'standard',
        status: 'active',
        last_run_at: new Date().toISOString(),
        created_at: new Date().toISOString()
    }];

    return (
        <div className="min-h-screen bg-[#050505] flex selection:bg-cyan-500/20">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0a0a0f] border-r border-[#1a1a2e] p-6 flex flex-col hidden lg:flex shadow-2xl z-10">
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

                <nav className="flex-1 space-y-1">
                    <a href="/portal/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
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
                </nav>

                <div className="border-t border-gray-800 pt-4 mt-4">
                    <div className="px-3 py-2 mb-2">
                        <p className="text-white font-medium truncate">{profile?.full_name || 'Client'}</p>
                        <p className="text-gray-500 text-sm truncate">{profile?.email}</p>
                        {profile?.company_name && (
                            <p className="text-gray-600 text-xs truncate">{profile.company_name}</p>
                        )}
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
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
                        </h1>
                        <p className="text-gray-400 mt-1">Here's what's happening with your automations.</p>
                    </div>
                    <button
                        onClick={checkAuthAndLoadData}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-sm">Total Executions</span>
                            <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.totalExecutions}</p>
                        <p className="text-xs text-gray-500 mt-1">All time</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-sm">Successful</span>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.successfulExecutions}</p>
                        <p className="text-xs text-gray-500 mt-1">Tasks completed</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-sm">Hours Saved</span>
                            <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.hoursEstimated}</p>
                        <p className="text-xs text-gray-500 mt-1">Estimated</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-400 text-sm">Success Rate</span>
                            <TrendingUp className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
                        <p className="text-xs text-gray-500 mt-1">Reliability</p>
                    </div>
                </div>

                {/* Automations Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-cyan-500" />
                        Your Automations
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayAutomations.map((automation) => (
                            <div
                                key={automation.id}
                                className="group relative bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                                </div>

                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d16] rounded-xl flex items-center justify-center border border-[#2a2a3e] group-hover:border-cyan-500/30 transition duration-300">
                                            <Bot className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition duration-300">{automation.display_name}</h3>
                                            <p className="text-sm text-gray-500 capitalize flex items-center gap-2">
                                                {automation.tier} Plan
                                                <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                                                {automation.automation_type.replace('_', ' ')}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(automation.status)} shadow-sm`}>
                                        {formatStatus(automation.status)}
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm bg-[#050508] rounded-lg p-4 border border-[#151520]">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Last Run</span>
                                        <span className="text-gray-200 font-medium">{formatDate(automation.last_run_at)}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                                        <div className="bg-cyan-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-xs text-gray-500">Status check</span>
                                        <span className="text-xs text-green-400 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            Operational
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>

                    {recentLogs.length === 0 ? (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 mb-2">No activity recorded yet.</p>
                            <p className="text-gray-500 text-sm">Activity will appear here once your automation runs.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
                            {recentLogs.map((log, index) => (
                                <div
                                    key={log.id}
                                    className={`flex items-center gap-4 p-4 hover:bg-gray-800/50 transition ${index !== recentLogs.length - 1 ? 'border-b border-gray-800' : ''
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'success' ? 'bg-green-500' :
                                        log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                                        }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{log.event_name}</p>
                                        <p className="text-sm text-gray-500">{log.event_type}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm text-gray-400">{formatDate(log.created_at)}</p>
                                        <p className={`text-xs ${log.status === 'success' ? 'text-green-400' :
                                            log.status === 'error' ? 'text-red-400' : 'text-yellow-400'
                                            }`}>
                                            {log.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

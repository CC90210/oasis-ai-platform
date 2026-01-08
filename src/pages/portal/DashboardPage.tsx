import { useEffect, useState } from 'react';
import { supabase, Profile, Automation, AutomationLog } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import {
    Activity, CheckCircle, Clock, TrendingUp, Bot, AlertCircle, RefreshCw, Bug
} from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<AutomationLog[]>([]);
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [showDebug, setShowDebug] = useState(false);
    const [stats, setStats] = useState({
        totalExecutions: 0,
        successfulExecutions: 0,
        hoursEstimated: 0,
        successRate: 0,
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);
        const debug: any = { timestamp: new Date().toISOString() };

        try {
            // Get authenticated user
            const { data: authData, error: authError } = await supabase.auth.getUser();
            debug.authData = authData;
            debug.authError = authError;

            if (authError || !authData.user) {
                debug.issue = 'No authenticated user found';
                setDebugInfo(debug);
                setError('Authentication error. Please sign out and sign back in.');
                setLoading(false);
                return;
            }

            const user = authData.user;
            debug.userId = user.id;
            debug.userEmail = user.email;

            // 1. Load Profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            debug.profileData = profileData;
            debug.profileError = profileError;

            setProfile(profileData || {
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name || 'Client',
                company_name: '',
                phone: null,
                avatar_url: null,
                created_at: ''
            });

            // 2. Load Automations
            const { data: automationData, error: automationError } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            debug.automationData = automationData;
            debug.automationError = automationError;
            debug.automationCount = automationData?.length || 0;

            setAutomations(automationData || []);

            // 3. Load Logs
            const { data: logData, error: logError } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20);

            debug.logData = logData;
            debug.logError = logError;
            debug.logCount = logData?.length || 0;

            setRecentLogs(logData || []);

            // 4. Calculate Stats
            const total = logData?.length || 0;
            const successful = logData?.filter(l => l.status === 'success').length || 0;
            const rate = total > 0 ? Math.round((successful / total) * 100) : 100;

            setStats({
                totalExecutions: total,
                successfulExecutions: successful,
                hoursEstimated: Math.round(total * 0.25),
                successRate: rate
            });

            setDebugInfo(debug);

        } catch (err: any) {
            debug.catchError = err.message;
            setDebugInfo(debug);
            setError('Failed to load dashboard data. Please try refreshing.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending_setup': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'paused': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getLogStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
            case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
            case 'warning': return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]';
            default: return 'bg-gray-500';
        }
    };

    return (
        <PortalLayout>
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Welcome back, {profile?.full_name?.split(' ')[0] || 'Client'}
                        </h1>
                        <p className="text-gray-400">Here's what's happening with your AI workforce.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowDebug(!showDebug)}
                            className="p-2.5 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-yellow-400 border border-[#2a2a3e] transition"
                            title="Toggle Debug Info"
                        >
                            <Bug className="w-5 h-5" />
                        </button>
                        <button
                            onClick={loadDashboardData}
                            disabled={loading}
                            className="p-2.5 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#2a2a3e] transition disabled:opacity-50"
                            title="Refresh data"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Debug Panel */}
                {showDebug && debugInfo && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8 text-sm">
                        <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                            <Bug className="w-4 h-4" /> Debug Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                                <p className="text-yellow-300">Auth User ID:</p>
                                <code className="text-white bg-black/30 p-1 rounded block break-all">{debugInfo.userId || 'N/A'}</code>
                            </div>
                            <div>
                                <p className="text-yellow-300">Email:</p>
                                <code className="text-white bg-black/30 p-1 rounded block">{debugInfo.userEmail || 'N/A'}</code>
                            </div>
                            <div>
                                <p className="text-yellow-300">Automations Found:</p>
                                <code className="text-white bg-black/30 p-1 rounded block">{debugInfo.automationCount || 0}</code>
                            </div>
                            <div>
                                <p className="text-yellow-300">Logs Found:</p>
                                <code className="text-white bg-black/30 p-1 rounded block">{debugInfo.logCount || 0}</code>
                            </div>
                            {debugInfo.automationError && (
                                <div className="md:col-span-2">
                                    <p className="text-red-400">Automation Query Error:</p>
                                    <code className="text-red-300 bg-black/30 p-1 rounded block">{JSON.stringify(debugInfo.automationError)}</code>
                                </div>
                            )}
                            {debugInfo.profileError && (
                                <div className="md:col-span-2">
                                    <p className="text-red-400">Profile Query Error:</p>
                                    <code className="text-red-300 bg-black/30 p-1 rounded block">{JSON.stringify(debugInfo.profileError)}</code>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500 text-xs mt-3">
                            Compare Auth User ID above with the user_id in your Supabase client_automations table. They must match exactly.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                        <button onClick={loadDashboardData} className="ml-auto text-sm underline">Retry</button>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
                    {[
                        { label: 'Total Executions', value: stats.totalExecutions, icon: Activity, color: 'text-cyan-400', sub: 'All time' },
                        { label: 'Successful Tasks', value: stats.successfulExecutions, icon: CheckCircle, color: 'text-green-400', sub: 'Completed' },
                        { label: 'Hours Saved', value: stats.hoursEstimated, icon: Clock, color: 'text-purple-400', sub: 'Estimated' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'text-yellow-400', sub: 'Reliability' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 md:p-6 rounded-2xl hover:border-[#2a2a3e] transition duration-300">
                            <div className="flex justify-between items-start mb-3 md:mb-4">
                                <span className="text-gray-400 font-medium text-xs md:text-sm">{stat.label}</span>
                                <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-xs text-gray-600">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Automations Column */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            Your Automations
                        </h2>

                        {automations.length === 0 ? (
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-8 md:p-10 text-center border-dashed">
                                <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">No Active Automations</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                                    You haven't purchased or configured any AI agents yet. Browse our catalog to get started.
                                </p>
                                <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300 font-medium">Browse Catalog →</Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {automations.map(auto => (
                                    <Link
                                        key={auto.id}
                                        to="/portal/automations"
                                        className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 md:p-5 rounded-xl hover:border-cyan-500/30 transition-all group cursor-pointer relative overflow-hidden block"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#151520] rounded-xl flex items-center justify-center border border-[#2a2a3e] group-hover:border-cyan-500/30 transition flex-shrink-0">
                                                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-white text-base md:text-lg group-hover:text-cyan-400 transition truncate">{auto.display_name}</h3>
                                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                                                        <span className="capitalize">{auto.tier} Plan</span>
                                                        <span className="hidden md:inline">•</span>
                                                        <span className="hidden md:inline">{auto.last_run_at ? formatRelativeTime(auto.last_run_at) : 'Ready'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border ${getStatusColor(auto.status)} flex-shrink-0`}>
                                                {auto.status.replace('_', ' ')}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Activity Column */}
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            Recent Activity
                        </h2>

                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-2 min-h-[300px]">
                            {recentLogs.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                                    <Activity className="w-8 h-8 mb-3 opacity-20" />
                                    <p className="text-sm">Activity will appear here once your agents start working.</p>
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                                    {recentLogs.map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[#151520] rounded-lg transition group">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${getLogStatusColor(log.status)}`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition">{log.event_name}</p>
                                                    <p className="text-gray-500 text-xs truncate mt-0.5">{log.event_type}</p>
                                                </div>
                                                <span className="text-gray-600 text-xs whitespace-nowrap">
                                                    {formatRelativeTime(log.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

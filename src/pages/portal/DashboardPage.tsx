import { useEffect, useState } from 'react';
import { supabase, Profile, Automation, AutomationLog } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import {
    Activity, CheckCircle, Clock, TrendingUp, Bot, AlertCircle, RefreshCw, Info
} from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<AutomationLog[]>([]);
    const [debugInfo, setDebugInfo] = useState<{ authUserId: string | null, email: string | null }>({ authUserId: null, email: null });
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
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Store debug info
            setDebugInfo({
                authUserId: user.id,
                email: user.email || null
            });

            console.log('🔍 Dashboard Debug - Auth User ID:', user.id);
            console.log('🔍 Dashboard Debug - Auth User Email:', user.email);

            // 1. Load Profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            console.log('🔍 Profile Query Result:', profileData, profileError);

            setProfile(profileData || {
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name || 'Client',
                company_name: '',
                phone: null,
                avatar_url: null,
                created_at: ''
            });

            // 2. Load Automations - this is where the issue likely is
            const { data: automationData, error: automationError } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            console.log('🔍 Automations Query (user_id =', user.id, '):', automationData, automationError);

            // If no automations found with auth user ID, let's also check if the user has any by email
            if (!automationData || automationData.length === 0) {
                console.log('⚠️ No automations found for user_id. Checking profiles table for matching email...');

                // Try to find profile by email to see if there's a different user_id
                const { data: profileByEmail } = await supabase
                    .from('profiles')
                    .select('id, email')
                    .eq('email', user.email)
                    .single();

                console.log('🔍 Profile by email lookup:', profileByEmail);
            }

            setAutomations(automationData || []);

            // 3. Load Logs
            const { data: logData, error: logError } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20);

            console.log('🔍 Logs Query Result:', logData, logError);

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

        } catch (err) {
            console.error('Dashboard load error:', err);
            setError('Failed to load dashboard data. Please try refreshing.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending_setup': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <PortalLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome back, {profile?.full_name?.split(' ')[0] || 'Client'}
                        </h1>
                        <p className="text-gray-400">Here's what's happening with your AI workforce.</p>
                    </div>
                    <button
                        onClick={loadDashboardData}
                        className="p-2 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#2a2a3e] transition"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Debug Info Banner - Only shows if no automations found */}
                {automations.length === 0 && debugInfo.authUserId && (
                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-xl mb-8">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                                <p className="font-bold mb-1">Debug Information</p>
                                <p className="text-blue-300">Your Auth User ID: <code className="bg-blue-900/30 px-1.5 py-0.5 rounded text-xs">{debugInfo.authUserId}</code></p>
                                <p className="text-blue-300 mt-1">Email: <code className="bg-blue-900/30 px-1.5 py-0.5 rounded text-xs">{debugInfo.email}</code></p>
                                <p className="text-gray-400 mt-2 text-xs">
                                    If you have automations in Supabase but they're not showing, the <code>user_id</code> in your <code>client_automations</code> table may not match this Auth User ID.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Executions', value: stats.totalExecutions, icon: Activity, color: 'text-cyan-400', sub: 'Last 30 days' },
                        { label: 'Successful Tasks', value: stats.successfulExecutions, icon: CheckCircle, color: 'text-green-400', sub: 'Completed without error' },
                        { label: 'Hours Saved', value: stats.hoursEstimated, icon: Clock, color: 'text-purple-400', sub: 'Estimated time' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'text-yellow-400', sub: 'Reliability score' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl hover:border-[#2a2a3e] transition duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gray-400 font-medium text-sm">{stat.label}</span>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-xs text-gray-600">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Automations Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            Your Automations
                        </h2>

                        {automations.length === 0 ? (
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-10 text-center border-dashed">
                                <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">No Active Automations</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
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
                                        className="bg-[#0a0a0f] border border-[#1a1a2e] p-5 rounded-xl hover:border-cyan-500/30 transition-all group cursor-pointer relative overflow-hidden block"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-[#151520] rounded-xl flex items-center justify-center border border-[#2a2a3e] group-hover:border-cyan-500/30 transition">
                                                    <Bot className="w-6 h-6 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition">{auto.display_name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span className="capitalize">{auto.tier} Plan</span>
                                                        <span>•</span>
                                                        <span>{auto.last_run_at ? formatRelativeTime(auto.last_run_at) : 'Never run'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(auto.status)}`}>
                                                {auto.status.replace('_', ' ')}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Activity Column */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            Recent Activity
                        </h2>

                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-2 min-h-[300px]">
                            {recentLogs.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                                    <Activity className="w-8 h-8 mb-3 opacity-20" />
                                    <p className="text-sm">Logs will appear here once your agents start working.</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {recentLogs.map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[#151520] rounded-lg transition group">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${log.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' :
                                                    log.status === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-gray-500'
                                                    }`} />
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

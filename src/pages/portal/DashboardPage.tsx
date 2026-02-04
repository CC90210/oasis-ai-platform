import { useEffect, useState, useRef } from 'react';
import { supabase, Profile, Automation, AutomationLog } from '@/lib/supabase';
import {
    fetchDashboardMetrics,
    DashboardMetrics,
    formatMoneySaved,
    formatPercentage,
    getAutomationTypeConfig,
    METRICS_CONFIG
} from '@/lib/metrics';
import { Link } from 'react-router-dom';
import {
    Activity, Clock, TrendingUp, Bot, AlertCircle, RefreshCw, DollarSign,
    Zap, Shield, HeadphonesIcon, Sparkles, ArrowRight, BarChart3, Calendar,
    Mail, Phone, Users, Target, Timer, Flame, Award, Percent, Crown
} from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

// Icon mapping for automation types
const ICON_MAP: Record<string, any> = {
    Mail, Phone, Users, Target, Timer, Calendar, Bot, Zap, Shield, Award
};

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<AutomationLog[]>([]);
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        loadDashboardData();

        // REAL-TIME: Subscribe to logs for instant dashboard updates
        let channel: any;
        const setupRealtime = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Listen to any changes in specific user's logs
            channel = supabase.channel('dashboard-realtime')
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'automation_logs',
                    filter: `user_id=eq.${user.id}`
                }, () => {
                    console.log('Real-time event: Refreshing metrics...');
                    loadDashboardData(false); // Silent refresh
                })
                .subscribe();
        };
        setupRealtime();

        loadingTimeout.current = setTimeout(() => { if (loading) setLoading(false); }, 10000);
        return () => {
            if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
            if (channel) supabase.removeChannel(channel);
        };
    }, []);

    const loadDashboardData = async (showLoading = true) => {
        if (showLoading) setLoading(true);
        setError(null);

        try {
            const { data: authData, error: authError } = await supabase.auth.getUser();
            if (authError || !authData.user) {
                setError('Authentication error. Please sign out and sign back in.');
                setLoading(false);
                return;
            }

            const user = authData.user;

            // Load profile with cross-check for Admin status
            let profileData: any;
            try {
                const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                if (error) throw error;
                profileData = data;
                setProfile(data);
            } catch (err) {
                const fallbackProfile = {
                    id: user.id,
                    email: user.email!,
                    full_name: user.user_metadata?.full_name || 'Client',
                    role: 'client' as const
                };
                setProfile(fallbackProfile as any);
                profileData = fallbackProfile;
            }

            // Determine admin status
            const isAdmin =
                profileData?.role === 'admin' ||
                profileData?.role === 'super_admin' ||
                profileData?.is_admin ||
                profileData?.is_owner ||
                ['konamak@icloud.com', 'keitemplaysgames@gmail.com'].includes(user.email || '');

            // Fetch automations 
            let autoQuery = supabase.from('automations').select('*');
            if (!isAdmin) autoQuery = autoQuery.eq('user_id', user.id);

            const { data: automationData, error: autoError } = await autoQuery;
            if (autoError) console.error('Automations fetch failed:', autoError);

            // Robust data mapping
            const mappedAutomations = (automationData || []).map(a => ({
                ...a,
                name: a.display_name || a.name || 'Untitled Automation',
                type: a.automation_type || a.type || 'default',
                status: a.status || 'active',
                created_at: a.created_at || new Date().toISOString()
            })) as Automation[];

            setAutomations(mappedAutomations);

            // Fetch metrics (Initial)
            const metricsResult = await fetchDashboardMetrics(user.id, isAdmin);
            setMetrics(metricsResult);

            // RESILIENT LOG FETCH
            let logsQuery = supabase.from('automation_logs').select('*');
            if (!isAdmin) {
                const ids = mappedAutomations.map(a => a.id);
                if (ids.length > 0) {
                    const idList = ids.map(id => `'${id}'`).join(',');
                    logsQuery = logsQuery.or(`user_id.eq.${user.id},automation_id.in.(${idList})`);
                } else {
                    logsQuery = logsQuery.eq('user_id', user.id);
                }
            }

            const { data: logData, error: logError } = await logsQuery
                .order('created_at', { ascending: false })
                .limit(10);

            if (logError) {
                console.warn('Dashboard logs fetch failed:', logError);
                setRecentLogs([]);
            } else {
                setRecentLogs((logData || []) as AutomationLog[]);
            }


        } catch (err: any) {
            console.error('Dashboard error:', err);
            setError('Failed to load dashboard data. Please try refreshing.');
        } finally {
            setLoading(false);
            if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending_setup': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-gray-500/10 text-[var(--text-secondary)] border-gray-500/20';
        }
    };

    const getLogStatusColor = (status: string | undefined) => {
        const s = String(status || '').toLowerCase();
        if (s === 'success' || s === 'completed' || s === '') return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
        if (s === 'error' || s === 'failed') return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
        return 'bg-gray-500';
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const primaryConfig = getAutomationTypeConfig((automations[0] as any)?.type || (automations[0] as any)?.automation_type || 'default');

    const getInsightValue = (index: number): string | number => {
        if (!metrics) return 0;
        switch (index) {
            case 0: return metrics.executionsThisWeek;
            case 1: return metrics.avgResponseTime;
            case 2: return `${metrics.costReduction}%`;
            default: return 0;
        }
    };

    // Helper to calculate aggregate stats if metrics are zero
    const getAggValue = (key: 'runs' | 'hours' | 'money') => {
        if (!automations.length) return 0;
        const totalRuns = automations.reduce((sum, a) => sum + (a.stats?.total_runs || (a as any).total_runs || 0), 0);
        const totalHours = automations.reduce((sum, a) => sum + (a.stats?.hours_saved || (a as any).hours_saved || 0), 0);

        if (key === 'runs') return totalRuns;
        if (key === 'hours') return totalHours;
        if (key === 'money') return totalHours * 25;
        return 0;
    };

    return (
        <PortalLayout>
            <div className="p-6 md:p-8 max-w-7xl mx-auto page-transition">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Client'}
                            </h1>
                            {profile?.is_owner && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full whitespace-nowrap">
                                    <Crown className="w-4 h-4 text-yellow-500" />
                                    <span className="text-yellow-500 text-sm font-bold">Owner</span>
                                </span>
                            )}
                        </div>
                        <p className="text-[var(--text-secondary)]">Here's what's happening with your AI workforce.</p>
                    </div>
                    <button
                        onClick={() => loadDashboardData()}
                        className="p-2.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                        <button onClick={() => loadDashboardData()} className="ml-auto text-sm underline hover:text-red-300">Retry</button>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-8">
                    {[
                        { label: 'Total Executions', value: metrics?.totalExecutions || getAggValue('runs'), icon: Activity, color: 'text-cyan-400', sub: 'All time' },
                        { label: 'Tasks This Week', value: metrics?.executionsThisWeek || 0, icon: Flame, color: 'text-orange-400', sub: 'Recent activity' },
                        { label: 'Hours Saved', value: metrics?.hoursSaved || getAggValue('hours'), icon: Clock, color: 'text-purple-400', sub: 'vs manual' },
                        { label: 'Money Saved', value: formatMoneySaved(metrics?.moneySaved || getAggValue('money')), icon: DollarSign, color: 'text-emerald-400', sub: `vs platform avg` },
                        { label: 'Success Rate', value: formatPercentage(metrics?.successRate || 100), icon: TrendingUp, color: 'text-green-400', sub: 'Reliability' }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-4 md:p-5 rounded-2xl hover:border-[var(--border)] transition ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[var(--text-secondary)] font-medium text-xs">{stat.label}</span>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</h3>
                            <p className="text-xs text-[var(--text-muted)]">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            Your Automations
                        </h2>

                        {automations.length === 0 ? (
                            <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-8 text-center border-dashed">
                                <Bot className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-4 opacity-30" />
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Active Automations</h3>
                                <p className="text-[var(--text-muted)] mb-6 text-sm">Your agents will appear here once configured.</p>
                                <Link to="/portal/support" className="text-cyan-400 hover:text-cyan-300 font-medium">Contact Support →</Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {automations.map(auto => {
                                    const config = getAutomationTypeConfig(auto.type || (auto as any).automation_type || 'default');
                                    return (
                                        <Link key={auto.id} to="/portal/automations" className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-5 rounded-xl hover:border-cyan-500/30 transition-all group block">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                                    <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] group-hover:border-cyan-500/30 flex-shrink-0">
                                                        <Bot className={`w-6 h-6 text-${config.color}-400`} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-[var(--text-primary)] text-lg group-hover:text-cyan-400 transition truncate">
                                                            {auto.name}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                                            <span className="capitalize">{(auto.type || '').replace('-', ' ')}</span>
                                                            <span>•</span>
                                                            <span className="text-emerald-500">${config.hourlyRate}/hr saved</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border flex-shrink-0 self-start sm:self-center ${getStatusColor(auto.status || 'active')}`}>
                                                    {(auto.status || 'active').replace('_', ' ')}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            Recent Activity
                        </h2>
                        <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-2 min-h-[300px]">
                            {recentLogs.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center p-8 text-[var(--text-muted)] text-center">
                                    <Activity className="w-8 h-8 mb-3 opacity-20" />
                                    <p className="text-sm">Activity will appear here as your agents work.</p>
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                                    {recentLogs.map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[var(--bg-tertiary)] rounded-lg transition group">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${getLogStatusColor(log.status)}`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[var(--text-primary)] text-sm font-medium truncate group-hover:text-cyan-400">{log.event_name}</p>
                                                    <p className="text-[var(--text-muted)] text-xs truncate">{log.event_type || 'Automation Execution'}</p>
                                                </div>
                                                <span className="text-[var(--text-muted)] text-xs whitespace-nowrap">{formatRelativeTime(log.created_at)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance & Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-gradient-to-br from-[var(--bg-card-strong)] to-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-cyan-500" />
                            AI Performance Insights
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {primaryConfig.insights.map((insight, idx) => (
                                <div key={idx} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[var(--text-secondary)] text-sm">{insight.label}</span>
                                    </div>
                                    <p className="text-2xl font-bold text-[var(--text-primary)]">{getInsightValue(idx)}</p>
                                    <p className={`text-xs text-${insight.color}-400 mt-1 uppercase font-bold tracking-tighter`}>{insight.unit}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <p className="text-[var(--text-secondary)] text-sm">
                                Your AI has saved <span className="text-cyan-400 font-bold">{metrics?.hoursSaved || 0} hours</span> so far this month.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[var(--bg-card-strong)] to-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" /> Quick Actions
                        </h3>
                        {[
                            { label: 'View Automations', to: '/portal/automations', icon: Bot, color: 'text-cyan-400' },
                            { label: 'View Reports', to: '/portal/reports', icon: BarChart3, color: 'text-purple-400' },
                            { label: 'Support', to: '/portal/support', icon: HeadphonesIcon, color: 'text-green-400' }
                        ].map((action, i) => (
                            <Link key={i} to={action.to} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-[var(--border-hover)] transition group">
                                <div className="flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                                    <action.icon className={`w-5 h-5 ${action.color}`} /> {action.label}
                                </div>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-1 transition" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

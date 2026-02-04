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
        loadingTimeout.current = setTimeout(() => {
            if (loading) setLoading(false);
        }, 10000);
        return () => {
            if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
        };
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: authData, error: authError } = await supabase.auth.getUser();
            if (authError || !authData.user) {
                setError('Authentication error. Please sign out and sign back in.');
                setLoading(false);
                return;
            }

            const user = authData.user;

            // Load profile
            let profileData;
            try {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                profileData = data;
                setProfile(data || {
                    id: user.id, email: user.email!, full_name: user.user_metadata?.full_name || 'Client',
                    company_name: '', phone: null, avatar_url: null, created_at: '', role: 'client'
                });
            } catch {
                setProfile({
                    id: user.id, email: user.email!, full_name: user.user_metadata?.full_name || 'Client',
                    company_name: '', phone: null, avatar_url: null, created_at: '', role: 'client'
                });
            }

            // Fetch automations with role-based filtering from client_automations
            let query = supabase.from('client_automations').select('*');

            // Admins/Owners see all automations, clients only see their own
            const isAdmin = profileData?.role === 'admin' || profileData?.role === 'super_admin' || profileData?.is_admin || profileData?.is_owner;

            if (!isAdmin) {
                query = query.eq('user_id', user.id);
            }

            const { data: automationData, error: autoError } = await query.order('created_at', { ascending: false });
            if (autoError) throw autoError;

            // Robust data mapping: handle both 'name' and 'display_name'
            const mappedAutomations = (automationData || []).map(a => ({
                ...a,
                name: a.display_name || a.name || 'Untitled Automation',
                type: a.automation_type || a.type || 'default'
            }));

            setAutomations(mappedAutomations);

            // Fetch recent logs (admins see all, clients see their own)
            let logsQuery = supabase.from('automation_logs').select('*');
            if (!isAdmin) {
                logsQuery = logsQuery.eq('user_id', user.id);
            }

            const { data: logData, error: logError } = await logsQuery
                .order('created_at', { ascending: false })
                .limit(10);

            if (logError) throw logError;
            setRecentLogs(logData || []);

            // CRITICAL: Fetch metrics using centralized service
            const dashboardMetrics = await fetchDashboardMetrics(user.id);
            setMetrics(dashboardMetrics);

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

    const getLogStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
            case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
            default: return 'bg-gray-500';
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Get primary automation config for insights
    const getPrimaryAutomationConfig = () => {
        if (automations.length === 0) return getAutomationTypeConfig('default');
        return getAutomationTypeConfig(automations[0]?.automation_type || 'default');
    };

    const primaryConfig = getPrimaryAutomationConfig();

    // Calculate dynamic insights based on metrics
    const getInsightValue = (index: number): string | number => {
        if (!metrics) return 0;

        switch (index) {
            case 0: // Tickets/Tasks resolved
                return metrics.executionsThisWeek;
            case 1: // Response time
                return metrics.avgResponseTime;
            case 2: // Cost reduction
                return `${metrics.costReduction}%`;
            default:
                return 0;
        }
    };

    if (loading) {
        return (
            <PortalLayout>
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="w-8 h-8 animate-spin text-cyan-500" />
                </div>
            </PortalLayout>
        );
    }

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
                            {/* Owner Badge - NEVER truncate */}
                            {profile?.is_owner && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full whitespace-nowrap flex-shrink-0" style={{ minWidth: 'fit-content' }}>
                                    <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                    <span className="text-yellow-500 text-sm font-bold whitespace-nowrap">Owner</span>
                                </span>
                            )}
                            {profile?.is_admin && !profile?.is_owner && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
                                    <Shield className="w-4 h-4 text-purple-400" />
                                    <span className="text-purple-400 text-sm font-bold">Admin</span>
                                </span>
                            )}
                        </div>
                        <p className="text-[var(--text-secondary)]">Here's what's happening with your AI workforce.</p>
                    </div>
                    <button
                        onClick={loadDashboardData}
                        disabled={loading}
                        className="p-2.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                        <button onClick={loadDashboardData} className="ml-auto text-sm underline hover:text-red-300">Retry</button>
                    </div>
                )}

                {/* Stats Grid - Using HYBRID METRICS (Logs + Automation Aggregates) */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-8">
                    {[
                        {
                            label: 'Total Executions',
                            value: metrics?.totalExecutions || automations.reduce((sum, a) => sum + (a.stats?.total_runs || (a as any).total_runs || 0), 0),
                            icon: Activity,
                            color: 'text-cyan-400',
                            sub: 'All time',
                            glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                        },
                        {
                            label: 'Tasks This Week',
                            value: metrics?.executionsThisWeek || automations.reduce((sum, a) => sum + (a.stats?.successful_runs || (a as any).successful_runs || 0), 0),
                            icon: Flame,
                            color: 'text-orange-400',
                            sub: 'Recent activity',
                            glow: 'shadow-[0_0_20px_rgba(251,146,60,0.1)]'
                        },
                        {
                            label: 'Hours Saved',
                            value: metrics?.hoursSaved || automations.reduce((sum, a) => sum + (a.stats?.hours_saved || (a as any).hours_saved || 0), 0),
                            icon: Clock,
                            color: 'text-purple-400',
                            sub: 'vs manual work',
                            glow: 'shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                        },
                        {
                            label: 'Money Saved',
                            value: metrics?.moneySaved ? formatMoneySaved(metrics.moneySaved) : formatMoneySaved(automations.reduce((sum, a) => sum + (a.stats?.hours_saved || (a as any).hours_saved || 0), 0) * 25),
                            icon: DollarSign,
                            color: 'text-emerald-400',
                            sub: `vs ${formatMoneySaved(metrics?.humanCostEquivalent || 0)} human`,
                            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        },
                        {
                            label: 'Success Rate',
                            value: metrics?.successRate ? formatPercentage(metrics.successRate) : formatPercentage(automations.length > 0 ? 100 : 0),
                            icon: TrendingUp,
                            color: 'text-green-400',
                            sub: 'Reliability score',
                            glow: 'shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                        }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-4 md:p-5 rounded-2xl hover:border-[var(--border)] transition ${stat.glow} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[var(--text-secondary)] font-medium text-xs">{stat.label}</span>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</h3>
                            <p className="text-xs text-[var(--text-muted)]">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {/* Automations Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            Your Automations
                        </h2>

                        {automations.length === 0 ? (
                            <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-8 text-center border-dashed">
                                <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-8 h-8 text-[var(--text-muted)]" />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Active Automations</h3>
                                <p className="text-[var(--text-muted)] mb-6 max-w-sm mx-auto text-sm">
                                    Your AI agents will appear here once configured.
                                </p>
                                <Link to="/portal/support" className="text-cyan-400 hover:text-cyan-300 font-medium">Contact Support →</Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {automations.map(auto => {
                                    const autoType = auto.type || (auto as any).automation_type || 'default';
                                    const config = getAutomationTypeConfig(autoType);
                                    return (
                                        <Link key={auto.id} to="/portal/automations" className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-4 md:p-5 rounded-xl hover:border-cyan-500/30 transition-all group relative overflow-hidden block">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] group-hover:border-cyan-500/30 transition flex-shrink-0">
                                                        <Bot className={`w-5 h-5 sm:w-6 sm:h-6 text-${config.color}-400`} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-[var(--text-primary)] text-base sm:text-lg group-hover:text-cyan-400 transition truncate sm:whitespace-normal">
                                                            {auto.name || (auto as any).display_name}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
                                                            <span className="capitalize">{(auto as any).tier || 'Standard'} Plan</span>
                                                            <span className="hidden sm:inline">•</span>
                                                            <span className="text-emerald-500">${config.hourlyRate}/hr saved</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase border flex-shrink-0 self-start sm:self-center ${getStatusColor(auto.status)}`}>
                                                    {auto.status.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            Recent Activity
                        </h2>

                        <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-2 min-h-[280px]">
                            {recentLogs.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[var(--text-muted)]">
                                    <Activity className="w-8 h-8 mb-3 opacity-20" />
                                    <p className="text-sm">Activity will appear here once your agents start working.</p>
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-[280px] overflow-y-auto">
                                    {recentLogs.map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[var(--bg-tertiary)] rounded-lg transition group">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${getLogStatusColor(log.status)}`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[var(--text-primary)] text-sm font-medium truncate group-hover:text-cyan-400 transition">{log.event_name}</p>
                                                    <p className="text-[var(--text-muted)] text-xs truncate mt-0.5">{log.event_type}</p>
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

                {/* Bottom Section - Dynamic Performance Insights & Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Dynamic Performance Insights */}
                    <div className="md:col-span-2 bg-gradient-to-br from-[var(--bg-card-strong)] to-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-cyan-500" />
                            AI Performance Insights
                            {automations.length > 0 && (
                                <span className="text-xs text-[var(--text-muted)] font-normal ml-2">
                                    Based on {automations[0]?.name || (automations[0] as any).display_name}
                                </span>
                            )}
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {primaryConfig.insights.map((insight, idx) => (
                                <div key={idx} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--border-hover)] transition">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-lg bg-${insight.color}-500/10 flex items-center justify-center`}>
                                            {idx === 0 && <Target className={`w-5 h-5 text-${insight.color}-400`} />}
                                            {idx === 1 && <Timer className={`w-5 h-5 text-${insight.color}-400`} />}
                                            {idx === 2 && <Percent className={`w-5 h-5 text-${insight.color}-400`} />}
                                        </div>
                                        <span className="text-[var(--text-secondary)] text-sm">{insight.label}</span>
                                    </div>
                                    <p className="text-2xl font-bold text-[var(--text-primary)]">{getInsightValue(idx)}</p>
                                    <p className={`text-xs text-${insight.color}-400 mt-1`}>↑ {insight.unit}</p>
                                </div>
                            ))}
                        </div>

                        {/* Value Proposition Banner */}
                        <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-[var(--text-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-primary)] font-medium">Your AI is working 24/7</p>
                                    <p className="text-[var(--text-secondary)] text-sm">
                                        That's <span className="text-cyan-400 font-bold">{metrics?.hoursSaved || 0}+ hours</span> saved so far vs. hiring a human employee at ${METRICS_CONFIG.HOURLY_RATE}/hr
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-[var(--bg-card-strong)] to-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link to="/portal/automations" className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-cyan-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition">View Automations</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-cyan-400 transition" />
                            </Link>
                            <Link to="/portal/reports" className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-purple-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition">View Reports</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-purple-400 transition" />
                            </Link>
                            <Link to="/portal/support" className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-green-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <HeadphonesIcon className="w-5 h-5 text-green-400" />
                                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition">Get Support</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-green-400 transition" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

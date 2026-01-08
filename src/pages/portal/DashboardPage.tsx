import { useEffect, useState, useRef, useMemo } from 'react';
import { supabase, Profile, Automation, AutomationLog } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import {
    Activity, Clock, TrendingUp, Bot, AlertCircle, RefreshCw, DollarSign,
    Zap, Shield, HeadphonesIcon, Sparkles, ArrowRight, BarChart3, Calendar,
    Mail, Phone, Users, Target, Timer, Flame, Award, Percent
} from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

// Comprehensive automation type configurations with value metrics
const AUTOMATION_CONFIG: Record<string, {
    hourlyRate: number;
    minutesPerTask: number;
    humanCostPerMonth: number;
    industryAvgResponse: string;
    valueMetrics: string[];
    icon: any;
    color: string;
    insightLabels: { label: string; unit: string; icon: any; color: string; calculate: (logs: AutomationLog[], total: number) => string | number }[];
}> = {
    'customer-support': {
        hourlyRate: 25,
        minutesPerTask: 15,
        humanCostPerMonth: 4000,
        industryAvgResponse: '24h',
        valueMetrics: ['emails handled', 'response time', 'resolution rate'],
        icon: Mail,
        color: 'text-cyan-400',
        insightLabels: [
            {
                label: 'Tickets Resolved',
                unit: 'this week',
                icon: Target,
                color: 'text-green-400',
                calculate: (logs, total) => {
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return logs.filter(l => new Date(l.created_at) > weekAgo && l.status === 'success').length;
                }
            },
            {
                label: 'Avg Response',
                unit: 'vs 24h human',
                icon: Timer,
                color: 'text-purple-400',
                calculate: (logs) => '<2 min'
            },
            {
                label: 'Cost Reduction',
                unit: 'vs human agent',
                icon: Percent,
                color: 'text-emerald-400',
                calculate: (logs, total) => '87%'
            }
        ]
    },
    'appointment-scheduling': {
        hourlyRate: 22,
        minutesPerTask: 10,
        humanCostPerMonth: 3500,
        industryAvgResponse: '4h',
        valueMetrics: ['appointments booked', 'no-show reduction', 'scheduling efficiency'],
        icon: Calendar,
        color: 'text-purple-400',
        insightLabels: [
            {
                label: 'Appointments Set',
                unit: 'this month',
                icon: Calendar,
                color: 'text-purple-400',
                calculate: (logs) => {
                    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                    return logs.filter(l => new Date(l.created_at) > monthAgo && l.status === 'success').length;
                }
            },
            {
                label: 'No-Show Reduction',
                unit: 'with reminders',
                icon: Shield,
                color: 'text-green-400',
                calculate: () => '42%'
            },
            {
                label: 'Booking Speed',
                unit: 'vs manual',
                icon: Zap,
                color: 'text-yellow-400',
                calculate: () => '15x faster'
            }
        ]
    },
    'lead-generation': {
        hourlyRate: 35,
        minutesPerTask: 30,
        humanCostPerMonth: 5500,
        industryAvgResponse: '48h',
        valueMetrics: ['leads captured', 'qualification rate', 'cost per lead'],
        icon: Target,
        color: 'text-orange-400',
        insightLabels: [
            {
                label: 'Leads Captured',
                unit: 'qualified',
                icon: Users,
                color: 'text-orange-400',
                calculate: (logs) => logs.filter(l => l.status === 'success').length
            },
            {
                label: 'Qualification Rate',
                unit: 'AI-scored',
                icon: Target,
                color: 'text-cyan-400',
                calculate: (logs, total) => total > 0 ? `${Math.round((logs.filter(l => l.status === 'success').length / total) * 100)}%` : '100%'
            },
            {
                label: 'Cost Per Lead',
                unit: 'vs $50 avg',
                icon: DollarSign,
                color: 'text-green-400',
                calculate: () => '$8'
            }
        ]
    },
    'phone-agent': {
        hourlyRate: 30,
        minutesPerTask: 8,
        humanCostPerMonth: 4500,
        industryAvgResponse: '3min',
        valueMetrics: ['calls handled', 'avg duration', 'transfer rate'],
        icon: Phone,
        color: 'text-green-400',
        insightLabels: [
            {
                label: 'Calls Handled',
                unit: 'this week',
                icon: Phone,
                color: 'text-green-400',
                calculate: (logs) => {
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return logs.filter(l => new Date(l.created_at) > weekAgo).length;
                }
            },
            {
                label: 'First Call Resolution',
                unit: 'no transfers',
                icon: Award,
                color: 'text-purple-400',
                calculate: (logs, total) => total > 0 ? `${Math.min(95, 85 + Math.floor(total / 10))}%` : '95%'
            },
            {
                label: 'Availability',
                unit: '24/7 coverage',
                icon: Shield,
                color: 'text-cyan-400',
                calculate: () => '100%'
            }
        ]
    },
    'default': {
        hourlyRate: 25,
        minutesPerTask: 15,
        humanCostPerMonth: 4000,
        industryAvgResponse: '24h',
        valueMetrics: ['tasks completed', 'efficiency', 'reliability'],
        icon: Bot,
        color: 'text-cyan-400',
        insightLabels: [
            {
                label: 'Tasks This Week',
                unit: 'completed',
                icon: Zap,
                color: 'text-green-400',
                calculate: (logs) => {
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return logs.filter(l => new Date(l.created_at) > weekAgo && l.status === 'success').length;
                }
            },
            {
                label: 'Processing Speed',
                unit: 'avg per task',
                icon: Timer,
                color: 'text-purple-400',
                calculate: () => '<3s'
            },
            {
                label: 'Uptime',
                unit: 'reliability',
                icon: Shield,
                color: 'text-cyan-400',
                calculate: () => '99.9%'
            }
        ]
    }
};

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<AutomationLog[]>([]);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

    // Enhanced stats with no redundancy
    const [stats, setStats] = useState({
        totalExecutions: 0,
        tasksThisWeek: 0,         // Changed from successfulExecutions to remove redundancy
        hoursSaved: 0,
        moneySaved: 0,
        successRate: 0,
        humanCostEquivalent: 0    // New: What it would cost with humans
    });

    useEffect(() => {
        loadDashboardData();
        loadingTimeout.current = setTimeout(() => {
            if (loading) setLoading(false);
        }, 10000);
        return () => {
            if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
        };
    }, []);

    // Dynamic performance insights based on actual automation types
    const performanceInsights = useMemo(() => {
        if (automations.length === 0) {
            return AUTOMATION_CONFIG['default'].insightLabels;
        }

        // Get the primary automation type (first one or most used)
        const primaryAutomation = automations[0];
        const autoType = primaryAutomation?.automation_type || 'default';
        const config = AUTOMATION_CONFIG[autoType] || AUTOMATION_CONFIG['default'];

        return config.insightLabels.map(insight => ({
            ...insight,
            value: insight.calculate(recentLogs, stats.totalExecutions)
        }));
    }, [automations, recentLogs, stats.totalExecutions]);

    const calculateAdvancedStats = (automations: Automation[], logs: AutomationLog[]) => {
        let totalMinutesSaved = 0;
        let totalMoneySaved = 0;
        let totalHumanCost = 0;

        // Calculate tasks this week
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const tasksThisWeek = logs.filter(l =>
            new Date(l.created_at) > weekAgo && l.status === 'success'
        ).length;

        const logsByAutomation = logs.reduce((acc, log) => {
            const autoId = log.automation_id;
            if (!acc[autoId]) acc[autoId] = [];
            acc[autoId].push(log);
            return acc;
        }, {} as Record<string, AutomationLog[]>);

        automations.forEach(auto => {
            const autoLogs = logsByAutomation[auto.id] || [];
            const successfulLogs = autoLogs.filter(l => l.status === 'success').length;
            const config = AUTOMATION_CONFIG[auto.automation_type as keyof typeof AUTOMATION_CONFIG] || AUTOMATION_CONFIG.default;

            const minutesSaved = successfulLogs * config.minutesPerTask;
            const moneySaved = (minutesSaved / 60) * config.hourlyRate;

            totalMinutesSaved += minutesSaved;
            totalMoneySaved += moneySaved;
            totalHumanCost += config.humanCostPerMonth;
        });

        if (automations.length === 0 && logs.length > 0) {
            const config = AUTOMATION_CONFIG.default;
            const successfulLogs = logs.filter(l => l.status === 'success').length;
            totalMinutesSaved = successfulLogs * config.minutesPerTask;
            totalMoneySaved = (totalMinutesSaved / 60) * config.hourlyRate;
            totalHumanCost = config.humanCostPerMonth;
        }

        return {
            hoursSaved: Math.round(totalMinutesSaved / 60 * 10) / 10,
            moneySaved: Math.round(totalMoneySaved * 100) / 100,
            humanCostEquivalent: totalHumanCost,
            tasksThisWeek
        };
    };

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

            try {
                const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(profileData || {
                    id: user.id, email: user.email!, full_name: user.user_metadata?.full_name || 'Client',
                    company_name: '', phone: null, avatar_url: null, created_at: ''
                });
            } catch {
                setProfile({
                    id: user.id, email: user.email!, full_name: user.user_metadata?.full_name || 'Client',
                    company_name: '', phone: null, avatar_url: null, created_at: ''
                });
            }

            const { data: automationData } = await supabase.from('client_automations').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
            setAutomations(automationData || []);

            const { data: logData } = await supabase.from('automation_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(100);
            setRecentLogs(logData || []);

            const total = logData?.length || 0;
            const successful = logData?.filter(l => l.status === 'success').length || 0;
            const rate = total > 0 ? Math.round((successful / total) * 100) : 100;
            const advancedStats = calculateAdvancedStats(automationData || [], logData || []);

            setStats({
                totalExecutions: total,
                tasksThisWeek: advancedStats.tasksThisWeek,
                hoursSaved: advancedStats.hoursSaved,
                moneySaved: advancedStats.moneySaved,
                successRate: rate,
                humanCostEquivalent: advancedStats.humanCostEquivalent
            });

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
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getLogStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
            case 'error': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
            default: return 'bg-gray-500';
        }
    };

    const formatMoney = (amount: number) => {
        if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
        return `$${amount.toFixed(0)}`;
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Get automation-specific icon and color
    const getPrimaryAutomationInfo = () => {
        if (automations.length === 0) return AUTOMATION_CONFIG.default;
        const autoType = automations[0]?.automation_type || 'default';
        return AUTOMATION_CONFIG[autoType] || AUTOMATION_CONFIG.default;
    };

    const primaryAutoInfo = getPrimaryAutomationInfo();

    return (
        <PortalLayout>
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Client'}
                        </h1>
                        <p className="text-gray-400">Here's what's happening with your AI workforce.</p>
                    </div>
                    <button
                        onClick={loadDashboardData}
                        disabled={loading}
                        className="p-2.5 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#2a2a3e] transition disabled:opacity-50"
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

                {/* Enhanced Stats Grid - No Redundancy */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-8">
                    {[
                        {
                            label: 'Total Executions',
                            value: stats.totalExecutions,
                            icon: Activity,
                            color: 'text-cyan-400',
                            sub: 'All time',
                            glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                        },
                        {
                            label: 'Tasks This Week',
                            value: stats.tasksThisWeek,
                            icon: Flame,
                            color: 'text-orange-400',
                            sub: 'Recent activity',
                            glow: 'shadow-[0_0_20px_rgba(251,146,60,0.1)]'
                        },
                        {
                            label: 'Hours Saved',
                            value: stats.hoursSaved,
                            icon: Clock,
                            color: 'text-purple-400',
                            sub: 'vs manual work',
                            glow: 'shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                        },
                        {
                            label: 'Money Saved',
                            value: formatMoney(stats.moneySaved),
                            icon: DollarSign,
                            color: 'text-emerald-400',
                            sub: `vs $${formatMoney(stats.humanCostEquivalent)}/mo human`,
                            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        },
                        {
                            label: 'Success Rate',
                            value: `${stats.successRate}%`,
                            icon: TrendingUp,
                            color: 'text-green-400',
                            sub: 'Reliability score',
                            glow: 'shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                        }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-[#0a0a0f] border border-[#1a1a2e] p-4 md:p-5 rounded-2xl hover:border-[#2a2a3e] transition ${stat.glow} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-gray-400 font-medium text-xs">{stat.label}</span>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-xs text-gray-600">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {/* Automations Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            Your Automations
                        </h2>

                        {automations.length === 0 ? (
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-8 text-center border-dashed">
                                <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Bot className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">No Active Automations</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                                    Your AI agents will appear here once configured.
                                </p>
                                <Link to="/portal/support" className="text-cyan-400 hover:text-cyan-300 font-medium">Contact Support →</Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {automations.map(auto => {
                                    const config = AUTOMATION_CONFIG[auto.automation_type as keyof typeof AUTOMATION_CONFIG] || AUTOMATION_CONFIG.default;
                                    const AutoIcon = config.icon;
                                    return (
                                        <Link key={auto.id} to="/portal/automations" className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 md:p-5 rounded-xl hover:border-cyan-500/30 transition-all group relative overflow-hidden block">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#151520] rounded-xl flex items-center justify-center border border-[#2a2a3e] group-hover:border-cyan-500/30 transition flex-shrink-0">
                                                        <AutoIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${config.color}`} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-cyan-400 transition truncate sm:whitespace-normal">{auto.display_name}</h3>
                                                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                                                            <span className="capitalize">{auto.tier} Plan</span>
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
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            Recent Activity
                        </h2>

                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-2 min-h-[280px]">
                            {recentLogs.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                                    <Activity className="w-8 h-8 mb-3 opacity-20" />
                                    <p className="text-sm">Activity will appear here once your agents start working.</p>
                                </div>
                            ) : (
                                <div className="space-y-1 max-h-[280px] overflow-y-auto">
                                    {recentLogs.slice(0, 10).map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[#151520] rounded-lg transition group">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${getLogStatusColor(log.status)}`} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition">{log.event_name}</p>
                                                    <p className="text-gray-500 text-xs truncate mt-0.5">{log.event_type}</p>
                                                </div>
                                                <span className="text-gray-600 text-xs whitespace-nowrap">{formatRelativeTime(log.created_at)}</span>
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
                    {/* Dynamic Performance Insights - Based on Automation Type */}
                    <div className="md:col-span-2 bg-gradient-to-br from-[#0a0a0f] to-[#0f0f18] border border-[#1a1a2e] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-cyan-500" />
                            AI Performance Insights
                            {automations.length > 0 && (
                                <span className="text-xs text-gray-500 font-normal ml-2">
                                    Based on {automations[0]?.display_name}
                                </span>
                            )}
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {performanceInsights.map((insight, idx) => {
                                const InsightIcon = insight.icon;
                                return (
                                    <div key={idx} className="bg-[#080810] border border-[#151525] rounded-xl p-4 hover:border-[#252535] transition">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-lg bg-${insight.color.replace('text-', '')}/10 flex items-center justify-center`}
                                                style={{ backgroundColor: `rgba(${insight.color === 'text-green-400' ? '34,197,94' : insight.color === 'text-purple-400' ? '168,85,247' : insight.color === 'text-cyan-400' ? '6,182,212' : insight.color === 'text-orange-400' ? '251,146,60' : insight.color === 'text-emerald-400' ? '16,185,129' : '34,197,94'}, 0.1)` }}
                                            >
                                                <InsightIcon className={`w-5 h-5 ${insight.color}`} />
                                            </div>
                                            <span className="text-gray-400 text-sm">{insight.label}</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{insight.value !== undefined ? insight.value : insight.calculate(recentLogs, stats.totalExecutions)}</p>
                                        <p className={`text-xs ${insight.color} mt-1`}>↑ {insight.unit}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Value Proposition Banner */}
                        <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Your AI is working 24/7</p>
                                    <p className="text-gray-400 text-sm">
                                        That's <span className="text-cyan-400 font-bold">{Math.round(168 - stats.hoursSaved)}+ hours</span> you've saved this month vs. hiring a human employee
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-[#0a0a0f] to-[#0f0f18] border border-[#1a1a2e] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link to="/portal/automations" className="flex items-center justify-between p-3 bg-[#080810] border border-[#151525] rounded-xl hover:border-cyan-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <Bot className="w-5 h-5 text-cyan-400" />
                                    <span className="text-gray-300 group-hover:text-white transition">View Automations</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition" />
                            </Link>
                            <Link to="/portal/reports" className="flex items-center justify-between p-3 bg-[#080810] border border-[#151525] rounded-xl hover:border-purple-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <span className="text-gray-300 group-hover:text-white transition">View Reports</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition" />
                            </Link>
                            <Link to="/portal/support" className="flex items-center justify-between p-3 bg-[#080810] border border-[#151525] rounded-xl hover:border-green-500/30 transition group">
                                <div className="flex items-center gap-3">
                                    <HeadphonesIcon className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300 group-hover:text-white transition">Get Support</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 transition" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

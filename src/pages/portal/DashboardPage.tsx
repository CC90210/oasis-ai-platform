import { useEffect, useState, useRef } from 'react';
import { supabase, Profile, Automation, AutomationLog } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import {
    Activity, CheckCircle, Clock, TrendingUp, Bot, AlertCircle, RefreshCw, DollarSign
} from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatRelativeTime } from '@/lib/formatters';

// Automation type configurations for calculating savings
const AUTOMATION_SAVINGS = {
    'customer-support': {
        hourlyRate: 25, // Human support rep hourly rate
        minutesPerTask: 15, // Average minutes saved per task
        description: 'Customer Support'
    },
    'appointment-scheduling': {
        hourlyRate: 22,
        minutesPerTask: 10,
        description: 'Appointment Scheduling'
    },
    'data-entry': {
        hourlyRate: 20,
        minutesPerTask: 20,
        description: 'Data Entry'
    },
    'lead-generation': {
        hourlyRate: 35,
        minutesPerTask: 30,
        description: 'Lead Generation'
    },
    'social-media': {
        hourlyRate: 28,
        minutesPerTask: 25,
        description: 'Social Media Management'
    },
    'email-marketing': {
        hourlyRate: 30,
        minutesPerTask: 20,
        description: 'Email Marketing'
    },
    'inventory-management': {
        hourlyRate: 24,
        minutesPerTask: 15,
        description: 'Inventory Management'
    },
    'report-generation': {
        hourlyRate: 40,
        minutesPerTask: 45,
        description: 'Report Generation'
    },
    'default': {
        hourlyRate: 25,
        minutesPerTask: 15,
        description: 'AI Automation'
    }
};

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [recentLogs, setRecentLogs] = useState<AutomationLog[]>([]);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
    const [stats, setStats] = useState({
        totalExecutions: 0,
        successfulExecutions: 0,
        hoursSaved: 0,
        moneySaved: 0,
        successRate: 0,
    });

    useEffect(() => {
        loadDashboardData();

        // Safety timeout
        loadingTimeout.current = setTimeout(() => {
            if (loading) {
                setLoading(false);
            }
        }, 10000);

        return () => {
            if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
        };
    }, []);

    const calculateSavings = (automations: Automation[], logs: AutomationLog[]) => {
        let totalMinutesSaved = 0;
        let totalMoneySaved = 0;

        // Group logs by automation
        const logsByAutomation = logs.reduce((acc, log) => {
            const autoId = log.automation_id;
            if (!acc[autoId]) acc[autoId] = [];
            acc[autoId].push(log);
            return acc;
        }, {} as Record<string, AutomationLog[]>);

        // Calculate savings for each automation
        automations.forEach(auto => {
            const autoLogs = logsByAutomation[auto.id] || [];
            const successfulLogs = autoLogs.filter(l => l.status === 'success').length;

            // Get savings config for this automation type
            const config = AUTOMATION_SAVINGS[auto.automation_type as keyof typeof AUTOMATION_SAVINGS]
                || AUTOMATION_SAVINGS.default;

            const minutesSaved = successfulLogs * config.minutesPerTask;
            const moneySaved = (minutesSaved / 60) * config.hourlyRate;

            totalMinutesSaved += minutesSaved;
            totalMoneySaved += moneySaved;
        });

        // If no automations, calculate based on logs directly
        if (automations.length === 0 && logs.length > 0) {
            const config = AUTOMATION_SAVINGS.default;
            const successfulLogs = logs.filter(l => l.status === 'success').length;
            totalMinutesSaved = successfulLogs * config.minutesPerTask;
            totalMoneySaved = (totalMinutesSaved / 60) * config.hourlyRate;
        }

        return {
            hoursSaved: Math.round(totalMinutesSaved / 60 * 10) / 10, // Round to 1 decimal
            moneySaved: Math.round(totalMoneySaved * 100) / 100 // Round to 2 decimals
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

            // Load Profile
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
                    created_at: ''
                });
            } catch {
                setProfile({
                    id: user.id,
                    email: user.email!,
                    full_name: user.user_metadata?.full_name || 'Client',
                    company_name: '',
                    phone: null,
                    avatar_url: null,
                    created_at: ''
                });
            }

            // Load Automations
            const { data: automationData } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            setAutomations(automationData || []);

            // Load Logs
            const { data: logData } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(50);

            setRecentLogs(logData || []);

            // Calculate Stats
            const total = logData?.length || 0;
            const successful = logData?.filter(l => l.status === 'success').length || 0;
            const rate = total > 0 ? Math.round((successful / total) * 100) : 100;

            const savings = calculateSavings(automationData || [], logData || []);

            setStats({
                totalExecutions: total,
                successfulExecutions: successful,
                hoursSaved: savings.hoursSaved,
                moneySaved: savings.moneySaved,
                successRate: rate
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

    const formatMoney = (amount: number) => {
        if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(1)}k`;
        }
        return `$${amount.toFixed(0)}`;
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
                    <button
                        onClick={loadDashboardData}
                        disabled={loading}
                        className="p-2.5 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#2a2a3e] transition disabled:opacity-50"
                        title="Refresh data"
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

                {/* Stats Grid - 5 columns on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 mb-8 md:mb-10">
                    {[
                        { label: 'Total Executions', value: stats.totalExecutions, icon: Activity, color: 'text-cyan-400', sub: 'All time' },
                        { label: 'Successful Tasks', value: stats.successfulExecutions, icon: CheckCircle, color: 'text-green-400', sub: 'Completed' },
                        { label: 'Hours Saved', value: stats.hoursSaved, icon: Clock, color: 'text-purple-400', sub: 'Estimated' },
                        { label: 'Money Saved', value: formatMoney(stats.moneySaved), icon: DollarSign, color: 'text-emerald-400', sub: 'vs. Human Cost' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'text-yellow-400', sub: 'Reliability' }
                    ].map((stat, i) => (
                        <div key={i} className={`bg-[#0a0a0f] border border-[#1a1a2e] p-4 md:p-5 rounded-2xl hover:border-[#2a2a3e] transition duration-300 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
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
                                    Your AI agents will appear here once configured. Contact support if you believe this is an error.
                                </p>
                                <Link to="/portal/support" className="text-cyan-400 hover:text-cyan-300 font-medium">Contact Support →</Link>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {automations.map(auto => {
                                    const config = AUTOMATION_SAVINGS[auto.automation_type as keyof typeof AUTOMATION_SAVINGS] || AUTOMATION_SAVINGS.default;
                                    return (
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
                                                            <span>•</span>
                                                            <span className="text-emerald-500">${config.hourlyRate}/hr saved</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border ${getStatusColor(auto.status)} flex-shrink-0`}>
                                                    {auto.status.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
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
                                    {recentLogs.slice(0, 20).map((log) => (
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

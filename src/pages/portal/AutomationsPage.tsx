import { useEffect, useState } from 'react';
import { supabase, Automation, AutomationLog } from '@/lib/supabase';
import {
    fetchAutomationMetrics,
    AutomationMetrics,
    formatPercentage,
    getAutomationTypeConfig
} from '@/lib/metrics';
import { Bot, Activity, Loader2, ChevronDown, ChevronUp, Mail, User, FileText, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate, formatRelativeTime } from '@/lib/formatters';

// AI-friendly labels for metadata fields
const AI_LABELS: Record<string, { label: string; icon: any; color: string }> = {
    'agent_summary': { label: 'AI Agent Summary', icon: Sparkles, color: 'text-purple-400' },
    'gmail_agent_summary': { label: 'Email Agent Summary', icon: Mail, color: 'text-cyan-400' },
    'agents_output': { label: 'Agent Output', icon: MessageSquare, color: 'text-green-400' },
    'customer': { label: 'Customer', icon: User, color: 'text-blue-400' },
    'email': { label: 'Email Address', icon: Mail, color: 'text-cyan-400' },
    'summary': { label: 'Summary', icon: FileText, color: 'text-yellow-400' },
    'response': { label: 'AI Response', icon: MessageSquare, color: 'text-green-400' },
    'output': { label: 'Output', icon: FileText, color: 'text-purple-400' },
};

const getFieldConfig = (key: string) => {
    const normalizedKey = key.toLowerCase().replace(/[_-\s]/g, '_');
    return AI_LABELS[normalizedKey] || {
        label: key.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        icon: FileText,
        color: 'text-gray-400'
    };
};

// Parse metadata safely - handles both objects and strings
const parseMetadata = (metadata: any): Record<string, any> | null => {
    if (!metadata) return null;

    // If it's already an object, return it
    if (typeof metadata === 'object' && !Array.isArray(metadata)) {
        return metadata;
    }

    // If it's a string, try to parse it as JSON
    if (typeof metadata === 'string') {
        try {
            const parsed = JSON.parse(metadata);
            if (typeof parsed === 'object' && !Array.isArray(parsed)) {
                return parsed;
            }
        } catch {
            // If parsing fails, return it as a single "data" field
            return { data: metadata };
        }
    }

    return null;
};

export default function AutomationsPage() {
    const [loading, setLoading] = useState(true);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [selectedAuto, setSelectedAuto] = useState<Automation | null>(null);
    const [logs, setLogs] = useState<AutomationLog[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
    const [userId, setUserId] = useState<string | null>(null);

    // CRITICAL: Use centralized metrics for consistency
    const [automationMetrics, setAutomationMetrics] = useState<AutomationMetrics | null>(null);

    useEffect(() => {
        loadAutomations();
    }, []);

    useEffect(() => {
        if (selectedAuto && userId) {
            loadLogsAndMetrics(selectedAuto.id, userId);
        } else {
            setLogs([]);
            setAutomationMetrics(null);
        }
    }, [selectedAuto, userId]);

    const loadAutomations = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setUserId(user.id);

            const { data, error } = await supabase
                .from('client_automations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAutomations(data || []);

            if (data && data.length > 0) {
                setSelectedAuto(data[0]);
            }
        } catch (err: any) {
            console.error('Error loading automations:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadLogsAndMetrics = async (automationId: string, userId: string) => {
        setLoadingLogs(true);
        try {
            // Fetch logs for display
            const { data, error } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('automation_id', automationId)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data || []);

            // CRITICAL: Fetch metrics using centralized service for consistency with Dashboard
            const metrics = await fetchAutomationMetrics(automationId, userId);
            setAutomationMetrics(metrics);

        } catch (err) {
            console.error('Error loading logs:', err);
        } finally {
            setLoadingLogs(false);
        }
    };

    const toggleLogExpanded = (logId: string) => {
        const newExpanded = new Set(expandedLogs);
        if (newExpanded.has(logId)) {
            newExpanded.delete(logId);
        } else {
            newExpanded.add(logId);
        }
        setExpandedLogs(newExpanded);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending_setup': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            {/* Main container - prevent horizontal scroll */}
            <div className="h-[calc(100vh-80px)] lg:h-screen flex flex-col lg:flex-row overflow-hidden max-w-full">

                {/* Left Panel: List */}
                <div className={`w-full lg:w-1/3 border-r border-[#1a1a2e] flex flex-col bg-[#0a0a0f] overflow-hidden ${selectedAuto ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-4 sm:p-6 border-b border-[#1a1a2e] bg-[#0a0a0f] flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 flex-shrink-0" />
                            <span className="truncate">My Automations</span>
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                        {automations.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No automations found.</p>
                            </div>
                        ) : (
                            automations.map(auto => (
                                <button
                                    key={auto.id}
                                    onClick={() => setSelectedAuto(auto)}
                                    className={`w-full text-left p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${selectedAuto?.id === auto.id
                                        ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                        : 'bg-[#0a0a0f] border-[#1a1a2e] hover:border-gray-700'
                                        }`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className={`font-bold text-sm sm:text-base break-words ${selectedAuto?.id === auto.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                            {auto.display_name}
                                        </h3>
                                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full border flex-shrink-0 ${getStatusColor(auto.status)}`}>
                                            {auto.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span className="capitalize">{auto.tier} Plan</span>
                                        <span>{formatRelativeTime(auto.last_run_at || new Date().toISOString())}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: Details */}
                <div className={`flex-1 flex flex-col bg-[#050508] overflow-hidden ${!selectedAuto ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                    {!selectedAuto ? (
                        <div className="text-center text-gray-500">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Select an automation to view details</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="p-4 sm:p-6 border-b border-[#1a1a2e] bg-[#0a0a0f] flex items-center justify-between shadow-lg z-10 flex-shrink-0">
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    <button
                                        onClick={() => setSelectedAuto(null)}
                                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white flex-shrink-0"
                                    >
                                        ←
                                    </button>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#151520] border border-[#2a2a3e] flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-base sm:text-xl font-bold text-white break-words leading-tight">
                                            {selectedAuto.display_name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-1">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedAuto.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]' : 'bg-gray-500'}`}></span>
                                            <span className="capitalize truncate">{selectedAuto.status.replace('_', ' ')}</span>
                                            <span className="text-gray-600">•</span>
                                            <span className="capitalize truncate">{selectedAuto.tier} Plan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

                                    {/* Stats - Using CENTRALIZED METRICS for consistency */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Type</p>
                                            <p className="text-white text-sm sm:text-base font-medium truncate">{selectedAuto.automation_type}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Created</p>
                                            <p className="text-white text-sm sm:text-base font-medium truncate">{formatDate(selectedAuto.created_at)}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Total Runs</p>
                                            {/* CRITICAL: Use centralized metrics for consistency with Dashboard */}
                                            <p className="text-white text-sm sm:text-base font-medium">
                                                {loadingLogs ? '...' : automationMetrics?.totalRuns || 0}
                                            </p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">Reliability</p>
                                            {/* CRITICAL: Use centralized metrics for consistency */}
                                            <p className="text-green-400 text-sm sm:text-base font-medium">
                                                {loadingLogs ? '...' : formatPercentage(automationMetrics?.reliability || 100)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Additional Metrics Row */}
                                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 p-3 sm:p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                <p className="text-[10px] sm:text-xs text-green-400 uppercase tracking-wider">Successful</p>
                                            </div>
                                            <p className="text-white text-lg sm:text-xl font-bold">
                                                {automationMetrics?.successfulRuns || 0}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 p-3 sm:p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Activity className="w-4 h-4 text-orange-400" />
                                                <p className="text-[10px] sm:text-xs text-orange-400 uppercase tracking-wider">This Week</p>
                                            </div>
                                            <p className="text-white text-lg sm:text-xl font-bold">
                                                {automationMetrics?.runsThisWeek || 0}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 p-3 sm:p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-4 h-4 text-red-400" />
                                                <p className="text-[10px] sm:text-xs text-red-400 uppercase tracking-wider">Failed</p>
                                            </div>
                                            <p className="text-white text-lg sm:text-xl font-bold">
                                                {automationMetrics?.failedRuns || 0}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Activity Log */}
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                                            Activity Log
                                            <span className="text-xs text-gray-500 font-normal">
                                                (showing last 50)
                                            </span>
                                        </h3>

                                        {loadingLogs ? (
                                            <div className="py-10 text-center"><Loader2 className="animate-spin w-8 h-8 text-cyan-500 mx-auto" /></div>
                                        ) : logs.length === 0 ? (
                                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-6 sm:p-8 text-center">
                                                <p className="text-gray-500 text-sm sm:text-base">No activity recorded for this automation yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {logs.map((log) => {
                                                    const isExpanded = expandedLogs.has(log.id);
                                                    const parsedMetadata = parseMetadata(log.metadata);
                                                    const hasMetadata = parsedMetadata && Object.keys(parsedMetadata).length > 0;

                                                    return (
                                                        <div key={log.id} className="relative pl-4 sm:pl-6 pb-4 border-l border-[#1a1a2e] last:border-0 last:pb-0 group">
                                                            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>

                                                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl group-hover:border-[#2a2a3e] transition overflow-hidden">
                                                                <div className="p-3 sm:p-4">
                                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                                        <div className="min-w-0 flex-1">
                                                                            <h4 className="font-bold text-white text-sm sm:text-base break-words">{log.event_name}</h4>
                                                                            <p className="text-gray-500 text-xs sm:text-sm break-words">{log.event_type}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 flex-shrink-0">
                                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                                                {log.status}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-gray-600 text-xs">{formatRelativeTime(log.created_at)}</span>
                                                                        {hasMetadata && (
                                                                            <button
                                                                                onClick={() => toggleLogExpanded(log.id)}
                                                                                className="text-cyan-400 text-xs flex items-center gap-1 hover:text-cyan-300 transition min-h-[32px] px-2"
                                                                            >
                                                                                {isExpanded ? 'Hide Details' : 'View Execution Details'}
                                                                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Execution Details - SCROLLABLE */}
                                                                {isExpanded && parsedMetadata && (
                                                                    <div className="border-t border-[#1a1a2e] p-3 sm:p-4 bg-[#080810]">
                                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                            <Sparkles className="w-3 h-3" />
                                                                            Execution Details
                                                                        </p>
                                                                        {/* Scrollable container */}
                                                                        <div className="max-h-64 sm:max-h-80 overflow-y-auto pr-2 space-y-4">
                                                                            {Object.entries(parsedMetadata).map(([key, value]) => {
                                                                                const config = getFieldConfig(key);
                                                                                const IconComponent = config.icon;

                                                                                return (
                                                                                    <div key={key} className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg p-3">
                                                                                        <div className={`flex items-center gap-2 mb-2 ${config.color}`}>
                                                                                            <IconComponent className="w-4 h-4 flex-shrink-0" />
                                                                                            <span className="text-xs uppercase tracking-wider font-medium">{config.label}</span>
                                                                                        </div>
                                                                                        <div className="text-gray-200 text-sm break-words whitespace-pre-wrap">
                                                                                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PortalLayout>
    );
}

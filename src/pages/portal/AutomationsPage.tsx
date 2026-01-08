import { useEffect, useState } from 'react';
import { supabase, Automation, AutomationLog } from '@/lib/supabase';
import { Bot, Activity, Loader2, ChevronDown, ChevronUp, Mail, User, FileText, MessageSquare, Sparkles } from 'lucide-react';
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

    useEffect(() => {
        loadAutomations();
    }, []);

    useEffect(() => {
        if (selectedAuto) {
            loadLogs(selectedAuto.id);
        } else {
            setLogs([]);
        }
    }, [selectedAuto]);

    const loadAutomations = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

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

    const loadLogs = async (automationId: string) => {
        setLoadingLogs(true);
        try {
            const { data, error } = await supabase
                .from('automation_logs')
                .select('*')
                .eq('automation_id', automationId)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data || []);
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

    const calculateReliability = () => {
        if (logs.length === 0) return 100;
        const successful = logs.filter(l => l.status === 'success').length;
        return Math.round((successful / logs.length) * 100);
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            <div className="h-[calc(100vh-80px)] lg:h-screen flex flex-col lg:flex-row overflow-hidden">

                {/* Left Panel: List */}
                <div className={`w-full lg:w-1/3 border-r border-[#1a1a2e] flex flex-col bg-[#0a0a0f] ${selectedAuto ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-[#1a1a2e] bg-[#0a0a0f]">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Bot className="w-6 h-6 text-cyan-500" />
                            My Automations
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {automations.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">No automations found.</p>
                            </div>
                        ) : (
                            automations.map(auto => (
                                <div
                                    key={auto.id}
                                    onClick={() => setSelectedAuto(auto)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${selectedAuto?.id === auto.id
                                        ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                        : 'bg-[#0a0a0f] border-[#1a1a2e] hover:border-gray-700'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`font-bold ${selectedAuto?.id === auto.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                            {auto.display_name}
                                        </h3>
                                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full border ${getStatusColor(auto.status)}`}>
                                            {auto.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span className="capitalize">{auto.tier} Plan</span>
                                        <span>{formatRelativeTime(auto.last_run_at || new Date().toISOString())}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: Details */}
                <div className={`flex-1 flex flex-col bg-[#050508] ${!selectedAuto ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                    {!selectedAuto ? (
                        <div className="text-center text-gray-500">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Select an automation to view details</p>
                        </div>
                    ) : (
                        <>
                            {/* Header - Removed settings button */}
                            <div className="p-6 border-b border-[#1a1a2e] bg-[#0a0a0f] flex items-center justify-between shadow-lg z-10">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedAuto(null)}
                                        className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white"
                                    >
                                        ←
                                    </button>
                                    <div className="w-12 h-12 rounded-xl bg-[#151520] border border-[#2a2a3e] flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{selectedAuto.display_name}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className={`w-2 h-2 rounded-full ${selectedAuto.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]' : 'bg-gray-500'}`}></span>
                                            <span className="capitalize">{selectedAuto.status.replace('_', ' ')}</span>
                                            <span className="text-gray-600">•</span>
                                            <span className="capitalize">{selectedAuto.tier} Plan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                <div className="max-w-4xl mx-auto space-y-8">

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Type</p>
                                            <p className="text-white font-medium">{selectedAuto.automation_type}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Created</p>
                                            <p className="text-white font-medium">{formatDate(selectedAuto.created_at)}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Runs</p>
                                            <p className="text-white font-medium">{logs.length}</p>
                                        </div>
                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 rounded-xl">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reliability</p>
                                            <p className="text-green-400 font-medium">{calculateReliability()}%</p>
                                        </div>
                                    </div>

                                    {/* Activity Log */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-purple-500" />
                                            Activity Log
                                        </h3>

                                        {loadingLogs ? (
                                            <div className="py-10 text-center"><Loader2 className="animate-spin w-8 h-8 text-cyan-500 mx-auto" /></div>
                                        ) : logs.length === 0 ? (
                                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8 text-center">
                                                <p className="text-gray-500">No activity recorded for this automation yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {logs.map((log) => {
                                                    const isExpanded = expandedLogs.has(log.id);
                                                    const parsedMetadata = parseMetadata(log.metadata);
                                                    const hasMetadata = parsedMetadata && Object.keys(parsedMetadata).length > 0;

                                                    return (
                                                        <div key={log.id} className="relative pl-6 pb-4 border-l border-[#1a1a2e] last:border-0 last:pb-0 group">
                                                            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>

                                                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl group-hover:border-[#2a2a3e] transition overflow-hidden">
                                                                <div className="p-4">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div>
                                                                            <h4 className="font-bold text-white">{log.event_name}</h4>
                                                                            <p className="text-xs text-gray-500">{formatRelativeTime(log.created_at)}</p>
                                                                        </div>
                                                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${log.status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                                                            {log.status}
                                                                        </span>
                                                                    </div>

                                                                    {/* Expandable Technical Details */}
                                                                    {hasMetadata && (
                                                                        <button
                                                                            onClick={() => toggleLogExpanded(log.id)}
                                                                            className="flex items-center gap-1 text-cyan-500 text-xs hover:text-cyan-400 transition mt-2"
                                                                        >
                                                                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                                            {isExpanded ? 'Hide' : 'View'} Execution Details
                                                                        </button>
                                                                    )}
                                                                </div>

                                                                {/* Expanded Details - Properly formatted */}
                                                                {isExpanded && hasMetadata && (
                                                                    <div className="border-t border-[#1a1a2e] bg-[#080810] p-4">
                                                                        <h5 className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-medium flex items-center gap-2">
                                                                            <Sparkles className="w-3 h-3 text-purple-400" />
                                                                            Execution Details
                                                                        </h5>
                                                                        <div className="space-y-4">
                                                                            {Object.entries(parsedMetadata!).map(([key, value]) => {
                                                                                const config = getFieldConfig(key);
                                                                                const Icon = config.icon;
                                                                                const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);

                                                                                return (
                                                                                    <div key={key} className="bg-[#0a0a10] rounded-xl border border-[#151525] overflow-hidden">
                                                                                        <div className="flex items-center gap-3 p-3 border-b border-[#151525] bg-[#0c0c12]">
                                                                                            <div className={`w-8 h-8 rounded-lg bg-[#151520] flex items-center justify-center`}>
                                                                                                <Icon className={`w-4 h-4 ${config.color}`} />
                                                                                            </div>
                                                                                            <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                                                                                        </div>
                                                                                        <div className="p-4">
                                                                                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                                                                {displayValue}
                                                                                            </p>
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

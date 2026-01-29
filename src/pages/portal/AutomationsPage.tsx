import { useEffect, useState } from 'react';
import { supabase, Automation, AutomationLog } from '@/lib/supabase';
import {
    fetchAutomationMetrics,
    AutomationMetrics,
    formatPercentage,
    getAutomationTypeConfig
} from '@/lib/metrics';
import {
    Bot, Activity, Loader2, ChevronDown, ChevronUp, Mail, User, FileText,
    MessageSquare, Sparkles, TrendingUp, Trash2, MoreVertical, Edit,
    Download, X, AlertTriangle
} from 'lucide-react';
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
        color: 'text-[var(--text-secondary)]'
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

    // NEW: Settings menu state
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [savingName, setSavingName] = useState(false);

    // NEW: Delete log state
    const [deleteLogId, setDeleteLogId] = useState<string | null>(null);
    const [deletingLog, setDeletingLog] = useState(false);

    // NEW: Clear all logs state
    const [showClearAllLogs, setShowClearAllLogs] = useState(false);
    const [clearingAllLogs, setClearingAllLogs] = useState(false);

    useEffect(() => {
        loadAutomations();
    }, []);

    useEffect(() => {
        if (selectedAuto && userId) {
            loadLogsAndMetrics(selectedAuto.id, userId);
            setNewName(selectedAuto.display_name);
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
            default: return 'bg-gray-500/10 text-[var(--text-secondary)] border-gray-500/20';
        }
    };

    // NEW: Handle rename automation
    const handleRename = async () => {
        if (!newName.trim() || !selectedAuto || !userId) return;

        setSavingName(true);
        try {
            const { error } = await supabase
                .from('client_automations')
                .update({ display_name: newName.trim() })
                .eq('id', selectedAuto.id)
                .eq('user_id', userId);

            if (!error) {
                // Update local state
                setSelectedAuto(prev => prev ? { ...prev, display_name: newName.trim() } : null);
                setAutomations(prev => prev.map(a =>
                    a.id === selectedAuto.id ? { ...a, display_name: newName.trim() } : a
                ));
                setEditingName(false);
            } else {
                alert('Failed to rename automation');
            }
        } catch (err) {
            console.error('Error renaming:', err);
            alert('Failed to rename automation');
        } finally {
            setSavingName(false);
        }
    };

    // NEW: Handle delete single log
    const handleDeleteLog = async (logId: string) => {
        if (!userId) return;

        setDeletingLog(true);
        try {
            const { error } = await supabase
                .from('automation_logs')
                .delete()
                .eq('id', logId)
                .eq('user_id', userId);

            if (!error) {
                setLogs(prev => prev.filter(log => log.id !== logId));
                setDeleteLogId(null);
            } else {
                alert('Failed to delete log');
            }
        } catch (err) {
            console.error('Error deleting log:', err);
            alert('Failed to delete log');
        } finally {
            setDeletingLog(false);
        }
    };

    // NEW: Handle clear all logs
    const handleClearAllLogs = async () => {
        if (!selectedAuto || !userId) return;

        setClearingAllLogs(true);
        try {
            const { error } = await supabase
                .from('automation_logs')
                .delete()
                .eq('automation_id', selectedAuto.id)
                .eq('user_id', userId);

            if (!error) {
                setLogs([]);
                setShowClearAllLogs(false);
                // Reload metrics after clearing
                const metrics = await fetchAutomationMetrics(selectedAuto.id, userId);
                setAutomationMetrics(metrics);
            } else {
                alert('Failed to clear logs');
            }
        } catch (err) {
            console.error('Error clearing logs:', err);
            alert('Failed to clear logs');
        } finally {
            setClearingAllLogs(false);
        }
    };

    // NEW: Export logs to CSV
    const exportLogsToCSV = () => {
        if (!logs.length || !selectedAuto) return;

        const headers = ['Date', 'Event Name', 'Event Type', 'Status'];
        const rows = logs.map(log => [
            new Date(log.created_at).toISOString(),
            log.event_name,
            log.event_type,
            log.status
        ]);

        const csv = [headers, ...rows].map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedAuto.display_name.replace(/[^a-z0-9]/gi, '_')}-logs-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            {/* Main container - prevent horizontal scroll */}
            <div className="h-[calc(100vh-80px)] lg:h-screen flex flex-col lg:flex-row overflow-hidden max-w-full">

                {/* Left Panel: List */}
                <div className={`w-full lg:w-1/3 border-r border-[var(--bg-tertiary)] flex flex-col bg-[var(--bg-primary)] overflow-hidden ${selectedAuto ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-4 sm:p-6 border-b border-[var(--bg-tertiary)] bg-[var(--bg-primary)] flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 flex-shrink-0" />
                            <span className="truncate">My Automations</span>
                        </h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                        {automations.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-[var(--text-muted)]">No automations found.</p>
                            </div>
                        ) : (
                            automations.map(auto => (
                                <button
                                    key={auto.id}
                                    onClick={() => setSelectedAuto(auto)}
                                    className={`w-full text-left p-3 sm:p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${selectedAuto?.id === auto.id
                                        ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                        : 'bg-[var(--bg-primary)] border-[var(--bg-tertiary)] hover:border-[var(--border)]'
                                        }`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className={`font-bold text-sm sm:text-base break-words ${selectedAuto?.id === auto.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                                            {auto.display_name}
                                        </h3>
                                        <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full border flex-shrink-0 ${getStatusColor(auto.status)}`}>
                                            {auto.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
                                        <span className="capitalize">{auto.tier} Plan</span>
                                        <span>{formatRelativeTime(auto.last_run_at || new Date().toISOString())}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: Details */}
                <div className={`flex-1 flex flex-col bg-[var(--bg-main)] overflow-hidden ${!selectedAuto ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                    {!selectedAuto ? (
                        <div className="text-center text-[var(--text-muted)]">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Select an automation to view details</p>
                        </div>
                    ) : (
                        <>
                            {/* Header with Settings Menu */}
                            <div className="p-4 sm:p-6 border-b border-[var(--bg-tertiary)] bg-[var(--bg-primary)] flex items-center justify-between shadow-lg z-10 flex-shrink-0">
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    <button
                                        onClick={() => setSelectedAuto(null)}
                                        className="lg:hidden p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex-shrink-0"
                                    >
                                        ←
                                    </button>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-base sm:text-xl font-bold text-[var(--text-primary)] break-words leading-tight">
                                            {selectedAuto.display_name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${selectedAuto.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]' : 'bg-gray-500'}`}></span>
                                            <span className="capitalize truncate">{selectedAuto.status.replace('_', ' ')}</span>
                                            <span className="text-[var(--text-muted)]">•</span>
                                            <span className="capitalize truncate">{selectedAuto.tier} Plan</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Menu Button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-card)] transition"
                                    >
                                        <MoreVertical className="w-5 h-5" />
                                    </button>

                                    {showSettingsMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowSettingsMenu(false)}
                                            />
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-xl z-20">
                                                <button
                                                    onClick={() => { setEditingName(true); setShowSettingsMenu(false); }}
                                                    className="w-full px-4 py-3 text-left text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] flex items-center gap-2 rounded-t-lg transition"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Rename
                                                </button>
                                                <button
                                                    onClick={() => { exportLogsToCSV(); setShowSettingsMenu(false); }}
                                                    className="w-full px-4 py-3 text-left text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] flex items-center gap-2 rounded-b-lg transition"
                                                    disabled={logs.length === 0}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Export Logs
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

                                    {/* Stats - Using CENTRALIZED METRICS for consistency */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Type</p>
                                            <p className="text-[var(--text-primary)] text-sm sm:text-base font-medium truncate">{selectedAuto.automation_type}</p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Created</p>
                                            <p className="text-[var(--text-primary)] text-sm sm:text-base font-medium truncate">{formatDate(selectedAuto.created_at)}</p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Runs</p>
                                            {/* CRITICAL: Use centralized metrics for consistency with Dashboard */}
                                            <p className="text-[var(--text-primary)] text-sm sm:text-base font-medium">
                                                {loadingLogs ? '...' : automationMetrics?.totalRuns || 0}
                                            </p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-3 sm:p-4 rounded-xl">
                                            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Reliability</p>
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
                                                <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <p className="text-[10px] sm:text-xs text-green-400 font-medium whitespace-nowrap">Success</p>
                                            </div>
                                            <p className="text-[var(--text-primary)] text-lg sm:text-xl font-bold">
                                                {automationMetrics?.successfulRuns || 0}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 p-3 sm:p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Activity className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                                <p className="text-[10px] sm:text-xs text-orange-400 font-medium whitespace-nowrap">This Week</p>
                                            </div>
                                            <p className="text-[var(--text-primary)] text-lg sm:text-xl font-bold">
                                                {automationMetrics?.runsThisWeek || 0}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 p-3 sm:p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                <p className="text-[10px] sm:text-xs text-red-400 font-medium whitespace-nowrap">Failed</p>
                                            </div>
                                            <p className="text-[var(--text-primary)] text-lg sm:text-xl font-bold">
                                                {automationMetrics?.failedRuns || 0}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Activity Log Header with Clear All */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                                                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                                                Activity Log
                                                <span className="text-xs text-[var(--text-muted)] font-normal">
                                                    ({logs.length} entries)
                                                </span>
                                            </h3>
                                            {logs.length > 0 && (
                                                <button
                                                    onClick={() => setShowClearAllLogs(true)}
                                                    className="text-sm text-[var(--text-secondary)] hover:text-red-400 transition"
                                                >
                                                    Clear All
                                                </button>
                                            )}
                                        </div>

                                        {loadingLogs ? (
                                            <div className="py-10 text-center"><Loader2 className="animate-spin w-8 h-8 text-cyan-500 mx-auto" /></div>
                                        ) : logs.length === 0 ? (
                                            <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl p-6 sm:p-8 text-center">
                                                <p className="text-[var(--text-muted)] text-sm sm:text-base">No activity recorded for this automation yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {logs.map((log) => {
                                                    const isExpanded = expandedLogs.has(log.id);
                                                    const parsedMetadata = parseMetadata(log.metadata);
                                                    const hasMetadata = parsedMetadata && Object.keys(parsedMetadata).length > 0;

                                                    return (
                                                        <div key={log.id} className="relative pl-4 sm:pl-6 pb-4 border-l border-[var(--bg-tertiary)] last:border-0 last:pb-0 group/log">
                                                            <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-main)] ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>

                                                            <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl group-hover/log:border-[var(--border)] transition overflow-hidden">
                                                                <div className="p-3 sm:p-4">
                                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                                        <div className="min-w-0 flex-1">
                                                                            <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base break-words">{log.event_name}</h4>
                                                                            <p className="text-[var(--text-muted)] text-xs sm:text-sm break-words">{log.event_type}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-2 flex-shrink-0">
                                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                                                {log.status}
                                                                            </span>
                                                                            {/* Delete button - shows on hover */}
                                                                            <button
                                                                                onClick={() => setDeleteLogId(log.id)}
                                                                                className="p-1.5 text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover/log:opacity-100 transition rounded hover:bg-red-500/10"
                                                                                title="Delete log"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-[var(--text-muted)] text-xs">{formatRelativeTime(log.created_at)}</span>
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
                                                                    <div className="border-t border-[var(--bg-tertiary)] p-3 sm:p-4 bg-[var(--bg-secondary)]">
                                                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                            <Sparkles className="w-3 h-3" />
                                                                            Execution Details
                                                                        </p>
                                                                        {/* Scrollable container */}
                                                                        <div className="max-h-64 sm:max-h-80 overflow-y-auto pr-2 space-y-4">
                                                                            {Object.entries(parsedMetadata).map(([key, value]) => {
                                                                                const config = getFieldConfig(key);
                                                                                const IconComponent = config.icon;

                                                                                return (
                                                                                    <div key={key} className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-lg p-3">
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

            {/* MODAL: Rename Automation */}
            {editingName && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Rename Automation</h3>
                            <button onClick={() => setEditingName(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] mb-4 focus:border-cyan-500 focus:outline-none transition"
                            placeholder="Automation name"
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditingName(false)}
                                className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRename}
                                disabled={savingName || !newName.trim()}
                                className="flex-1 py-2.5 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition disabled:opacity-50"
                            >
                                {savingName ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Delete Log Confirmation */}
            {deleteLogId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Delete Log Entry?</h3>
                        </div>
                        <p className="text-[var(--text-secondary)] mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteLogId(null)}
                                className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteLog(deleteLogId)}
                                disabled={deletingLog}
                                className="flex-1 py-2.5 bg-red-500 text-[var(--text-primary)] font-semibold rounded-lg hover:bg-red-400 transition disabled:opacity-50"
                            >
                                {deletingLog ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Clear All Logs Confirmation */}
            {showClearAllLogs && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Clear All Logs?</h3>
                        </div>
                        <p className="text-[var(--text-secondary)] mb-2">
                            This will permanently delete <span className="text-[var(--text-primary)] font-bold">{logs.length}</span> log entries.
                        </p>
                        <p className="text-[var(--text-muted)] text-sm mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowClearAllLogs(false)}
                                className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClearAllLogs}
                                disabled={clearingAllLogs}
                                className="flex-1 py-2.5 bg-red-500 text-[var(--text-primary)] font-semibold rounded-lg hover:bg-red-400 transition disabled:opacity-50"
                            >
                                {clearingAllLogs ? 'Clearing...' : 'Clear All'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}

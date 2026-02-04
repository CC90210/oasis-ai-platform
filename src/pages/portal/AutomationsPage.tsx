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

const parseMetadata = (metadata: any): Record<string, any> | null => {
    if (!metadata) return null;
    if (typeof metadata === 'object' && !Array.isArray(metadata)) return metadata;
    if (typeof metadata === 'string') {
        try {
            const parsed = JSON.parse(metadata);
            if (typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
        } catch {
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
    const [automationMetrics, setAutomationMetrics] = useState<AutomationMetrics | null>(null);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const [deleteLogId, setDeleteLogId] = useState<string | null>(null);
    const [deletingLog, setDeletingLog] = useState(false);
    const [showClearAllLogs, setShowClearAllLogs] = useState(false);
    const [clearingAllLogs, setClearingAllLogs] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        loadAutomations();

        // REAL-TIME: Subscribe to logs and automations
        let channel: any;
        const setupRealtime = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            channel = supabase.channel('automations-realtime')
                .on('postgres_changes', {
                    event: '*', schema: 'public', table: 'automation_logs', filter: `user_id=eq.${user.id}`
                }, () => {
                    console.log('Real-time update: Refreshing logs and metrics');
                    // We only refresh if we have a selected automation
                    // The refresh is handled by the effect on selectedAuto/userId
                })
                .subscribe();
        };
        setupRealtime();

        return () => { if (channel) supabase.removeChannel(channel); };
    }, []);

    useEffect(() => {
        if (selectedAuto && userId) {
            const isAdmin =
                profile?.role === 'admin' ||
                profile?.role === 'super_admin' ||
                profile?.is_admin ||
                profile?.is_owner ||
                ['konamak@icloud.com', 'keitemplaysgames@gmail.com'].includes(profile?.email || '');

            loadLogsAndMetrics(selectedAuto.id, userId, isAdmin);
            setNewName(selectedAuto.name || (selectedAuto as any).display_name || '');
        } else {
            setLogs([]);
            setAutomationMetrics(null);
        }
    }, [selectedAuto, userId, profile]);

    const loadAutomations = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUserId(user.id);

            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profileData || { email: user.email, role: 'client' });

            const isAdmin = profileData?.role === 'admin' || profileData?.role === 'super_admin' || profileData?.is_admin || profileData?.is_owner || ['konamak@icloud.com', 'keitemplaysgames@gmail.com'].includes(user.email || '');

            let query = supabase.from('automations').select('*');
            if (!isAdmin) query = query.eq('user_id', user.id);

            const { data, error } = await query;
            if (error) console.error('Automations fetch error:', error);

            const mappedData = (data || []).map(a => ({
                ...a,
                name: a.display_name || a.name || 'Untitled Automation',
                type: a.automation_type || a.type || 'default',
                status: a.status || 'active',
                created_at: a.created_at || new Date().toISOString(),
                config: a.config || {}
            })) as Automation[];

            setAutomations(mappedData);
            if (mappedData.length > 0 && !selectedAuto) {
                setSelectedAuto(mappedData[0]);
            }
        } catch (err: any) {
            console.error('Error loading automations:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadLogsAndMetrics = async (automationId: string, userId: string, isAdmin: boolean = false) => {
        setLoadingLogs(true);
        try {
            // RESILIENT LOG FETCH: We rely on automation_id for relevance. 
            // We omit user_id check here because if the user can select the automation, 
            // they should see its logs, and RLS will handle the security layer.
            let logsQuery = supabase.from('automation_logs').select('*').eq('automation_id', automationId);

            // For non-admins, we still filter by user_id on the log if possible, 
            // but we use OR to allow logs that only have the automation_id.
            if (!isAdmin) {
                logsQuery = logsQuery.or(`user_id.eq.${userId},automation_id.eq.${automationId}`);
            }

            const { data: logData, error } = await logsQuery
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) {
                console.warn('Logs fetch failed, retrying simple select:', error);
                const { data: backup } = await supabase.from('automation_logs').select('id, created_at').eq('automation_id', automationId).limit(10);
                setLogs((backup || []) as any);
            } else {
                setLogs((logData || []) as AutomationLog[]);
            }

            const metrics = await fetchAutomationMetrics(automationId, userId, isAdmin);
            setAutomationMetrics(metrics);
        } catch (err) {
            console.error('Error loading logs/metrics:', err);
        } finally {
            setLoadingLogs(false);
        }
    };

    const toggleLogExpanded = (logId: string) => {
        const newExpanded = new Set(expandedLogs);
        if (newExpanded.has(logId)) newExpanded.delete(logId);
        else newExpanded.add(logId);
        setExpandedLogs(newExpanded);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'pending_setup': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            default: return 'bg-gray-500/10 text-[var(--text-secondary)] border-gray-500/20';
        }
    };

    const handleRename = async () => {
        if (!newName.trim() || !selectedAuto || !userId) return;
        setSavingName(true);
        try {
            const { error } = await supabase.from('client_automations').update({ display_name: newName.trim() }).eq('id', selectedAuto.id).eq('user_id', userId);
            if (!error) {
                const updatedName = newName.trim();
                setSelectedAuto(prev => prev ? { ...prev, name: updatedName } : null);
                setAutomations(prev => prev.map(a => a.id === selectedAuto.id ? { ...a, name: updatedName } : a));
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

    const handleDeleteLog = async (logId: string) => {
        if (!userId) return;
        setDeletingLog(true);
        try {
            const { error } = await supabase.from('automation_logs').delete().eq('id', logId).eq('user_id', userId);
            if (!error) {
                setLogs(prev => prev.filter(log => log.id !== logId));
                setDeleteLogId(null);
                // Refresh metrics
                const metrics = await fetchAutomationMetrics(selectedAuto?.id || '', userId);
                setAutomationMetrics(metrics);
            } else alert('Failed to delete log');
        } catch (err) { alert('Failed to delete log'); } finally { setDeletingLog(false); }
    };

    const handleClearAllLogs = async () => {
        if (!selectedAuto || !userId) return;
        setClearingAllLogs(true);
        try {
            const { error } = await supabase.from('automation_logs').delete().eq('automation_id', selectedAuto.id).eq('user_id', userId);
            if (!error) {
                setLogs([]);
                setShowClearAllLogs(false);
                const metrics = await fetchAutomationMetrics(selectedAuto.id, userId);
                setAutomationMetrics(metrics);
            } else alert('Failed to clear logs');
        } catch (err) { alert('Failed to clear logs'); } finally { setClearingAllLogs(false); }
    };

    const exportLogsToCSV = () => {
        if (!logs.length || !selectedAuto) return;
        const headers = ['Date', 'Event Name', 'Event Type', 'Status'];
        const rows = logs.map(log => [new Date(log.created_at).toISOString(), log.event_name, log.event_type, log.status]);
        const csv = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const fileName = (selectedAuto.name || 'automation').replace(/[^a-z0-9]/gi, '_');
        a.download = `${fileName}-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;

    return (
        <PortalLayout>
            <div className="h-[calc(100vh-80px)] lg:h-screen flex flex-col lg:flex-row overflow-hidden max-w-full">
                {/* Sidebar */}
                <div className={`w-full lg:w-1/3 border-r border-[var(--bg-tertiary)] flex flex-col bg-[var(--bg-primary)] overflow-hidden ${selectedAuto ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-[var(--bg-tertiary)] flex-shrink-0">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                            <Bot className="w-6 h-6 text-cyan-500" />
                            <span>My Automations</span>
                        </h1>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {automations.map(auto => (
                            <button key={auto.id} onClick={() => setSelectedAuto(auto)} className={`w-full text-left p-4 rounded-xl border transition-all ${selectedAuto?.id === auto.id ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-[var(--bg-primary)] border-[var(--bg-tertiary)] hover:border-[var(--border)]'}`}>
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="font-bold text-[var(--text-primary)] truncate">{auto.name}</h3>
                                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full border flex-shrink-0 ${getStatusColor(auto.status || 'active')}`}>{auto.status || 'active'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
                                    <span className="capitalize">{(auto.type || '').replace('-', ' ')}</span>
                                    <span>{formatRelativeTime(auto.created_at || new Date().toISOString())}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className={`flex-1 flex flex-col bg-[var(--bg-main)] overflow-hidden ${!selectedAuto ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                    {!selectedAuto ? (
                        <div className="text-center text-[var(--text-muted)]">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Select an automation to view details</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-6 border-b border-[var(--bg-tertiary)] bg-[var(--bg-primary)] flex items-center justify-between shadow-lg z-10 flex-shrink-0">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <button onClick={() => setSelectedAuto(null)} className="lg:hidden p-2 -ml-2 text-[var(--text-secondary)]">←</button>
                                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-xl font-bold text-[var(--text-primary)] truncate">{selectedAuto.name}</h2>
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mt-1">
                                            <span className={`w-2 h-2 rounded-full ${selectedAuto.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]' : 'bg-gray-500'}`}></span>
                                            <span className="capitalize">{selectedAuto.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setShowSettingsMenu(!showSettingsMenu)} className="p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] rounded-lg"><MoreVertical className="w-5 h-5" /></button>
                                {showSettingsMenu && (
                                    <div className="absolute right-6 top-20 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-xl z-20">
                                        <button onClick={() => { setEditingName(true); setShowSettingsMenu(false); }} className="w-full px-4 py-3 text-left hover:bg-[var(--bg-tertiary)] flex items-center gap-2 transition"><Edit className="w-4 h-4" /> Rename</button>
                                        <button onClick={() => { exportLogsToCSV(); setShowSettingsMenu(false); }} className="w-full px-4 py-3 text-left hover:bg-[var(--bg-tertiary)] flex items-center gap-2 transition" disabled={logs.length === 0}><Download className="w-4 h-4" /> Export Logs</button>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto p-8">
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-4 rounded-xl">
                                            <p className="text-xs text-[var(--text-muted)] uppercase mb-1">Total Runs</p>
                                            <p className="text-xl font-bold text-[var(--text-primary)]">{loadingLogs ? '...' : automationMetrics?.totalRuns || 0}</p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-4 rounded-xl">
                                            <p className="text-xs text-[var(--text-muted)] uppercase mb-1">Reliability</p>
                                            <p className="text-xl font-bold text-green-400">{loadingLogs ? '...' : formatPercentage(automationMetrics?.reliability || 100)}</p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-4 rounded-xl">
                                            <p className="text-xs text-[var(--text-muted)] uppercase mb-1">Successful</p>
                                            <p className="text-xl font-bold text-[var(--text-primary)]">{automationMetrics?.successfulRuns || 0}</p>
                                        </div>
                                        <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] p-4 rounded-xl">
                                            <p className="text-xs text-[var(--text-muted)] uppercase mb-1">This Week</p>
                                            <p className="text-xl font-bold text-orange-400">{automationMetrics?.runsThisWeek || 0}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2"><Activity className="w-5 h-5 text-purple-500" /> Activity Log ({logs.length})</h3>
                                            {logs.length > 0 && <button onClick={() => setShowClearAllLogs(true)} className="text-sm text-red-400 hover:underline">Clear All</button>}
                                        </div>
                                        <div className="space-y-4">
                                            {logs.map(log => (
                                                <div key={log.id} className="relative pl-6 pb-4 border-l border-[var(--bg-tertiary)] last:border-0 group">
                                                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-main)] ${String(log.status || '').toLowerCase() === 'error' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                    <div className="bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl p-4 hover:border-[var(--border)] transition">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="min-w-0 flex-1">
                                                                <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base">{log.event_name}</h4>
                                                                <p className="text-[var(--text-muted)] text-xs sm:text-sm capitalize">{log.event_type || 'Execution'}</p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <span className="text-[var(--text-muted)] text-xs">{formatRelativeTime(log.created_at)}</span>
                                                                    {parseMetadata(log.metadata) && (
                                                                        <button onClick={() => toggleLogExpanded(log.id)} className="text-cyan-400 text-xs font-medium hover:underline">
                                                                            {expandedLogs.has(log.id) ? 'Hide Details' : 'View Details'}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button onClick={() => setDeleteLogId(log.id)} className="p-1.5 text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                        {expandedLogs.has(log.id) && parseMetadata(log.metadata) && (
                                                            <div className="mt-4 pt-4 border-t border-[var(--bg-tertiary)] space-y-3">
                                                                {Object.entries(parseMetadata(log.metadata)!).map(([key, val]) => (
                                                                    <div key={key} className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
                                                                        <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">{key.replace(/_/g, ' ')}</p>
                                                                        <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap break-words">{typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modals */}
            {editingName && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Rename Automation</h3>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-primary)] mb-4 focus:border-cyan-500 focus:outline-none" autoFocus />
                        <div className="flex gap-3">
                            <button onClick={() => setEditingName(false)} className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg">Cancel</button>
                            <button onClick={handleRename} disabled={savingName || !newName.trim()} className="flex-1 py-2.5 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50">{savingName ? 'Saving...' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteLogId && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="text-red-400 w-6 h-6" /></div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Delete Log Entry?</h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteLogId(null)} className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg">Cancel</button>
                            <button onClick={() => handleDeleteLog(deleteLogId)} disabled={deletingLog} className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 disabled:opacity-50">{deletingLog ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            )}

            {showClearAllLogs && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle className="text-red-400 w-6 h-6" /></div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Clear All Logs?</h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-6">This will delete all {logs.length} logs for this automation.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowClearAllLogs(false)} className="flex-1 py-2.5 bg-[var(--bg-card)] text-[var(--text-primary)] rounded-lg">Cancel</button>
                            <button onClick={handleClearAllLogs} disabled={clearingAllLogs} className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 disabled:opacity-50">{clearingAllLogs ? 'Clearing...' : 'Clear All'}</button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}

import { useEffect, useState } from 'react';
import { supabase, Automation, AutomationLog } from '@/lib/supabase';
import { Bot, Play, Pause, Settings, Activity, AlertCircle, Loader2 } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate, formatRelativeTime, formatLogMetadata } from '@/lib/formatters';

export default function AutomationsPage() {
    const [loading, setLoading] = useState(true);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [selectedAuto, setSelectedAuto] = useState<Automation | null>(null);
    const [logs, setLogs] = useState<AutomationLog[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAutomations();
    }, []);

    // Load logs when an automation is selected
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

            // Select the first one by default if available
            if (data && data.length > 0) {
                setSelectedAuto(data[0]);
            }
        } catch (err: any) {
            console.error('Error loading automations:', err);
            setError('Failed to load your automations.');
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
            <div className="h-[calc(100vh-80px)] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-[#050505]">

                {/* Left Panel: List (Mobile: Full Width, Desktop: 1/3) */}
                <div className={`w-full lg:w-1/3 border-r border-[#1a1a2e] flex flex-col ${selectedAuto ? 'hidden lg:flex' : 'flex'}`}>
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

                {/* Right Panel: Details (Mobile: Full Width, Desktop: 2/3) */}
                <div className={`flex-1 flex flex-col bg-[#050505] ${!selectedAuto ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
                    {!selectedAuto ? (
                        <div className="text-center text-gray-500">
                            <Bot className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Select an automation to view details</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
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
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-[#151520] hover:bg-[#252535] text-gray-400 hover:text-white border border-[#2a2a3e] transition">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                <div className="max-w-4xl mx-auto space-y-8">

                                    {/* Stats / Info */}
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
                                            <p className="text-green-400 font-medium">100%</p>
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
                                                {logs.map((log, i) => (
                                                    <div key={log.id} className="relative pl-6 pb-4 border-l border-[#1a1a2e] last:border-0 last:pb-0 group">
                                                        <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                                                            }`}></div>

                                                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-4 rounded-xl group-hover:border-[#2a2a3e] transition">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <h4 className="font-bold text-white">{log.event_name}</h4>
                                                                    <p className="text-xs text-gray-500">{formatRelativeTime(log.created_at)}</p>
                                                                </div>
                                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${log.status === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                                    }`}>
                                                                    {log.status}
                                                                </span>
                                                            </div>

                                                            {/* Metadata Display */}
                                                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                                <div className="mt-3 pt-3 border-t border-[#1a1a2e] text-sm">
                                                                    {JSON.stringify(log.metadata).length < 200 ? (
                                                                        <div className="grid grid-cols-1 gap-1">
                                                                            {formatLogMetadata(log.metadata)?.map((meta, i) => (
                                                                                <div key={i} className="flex gap-2">
                                                                                    <span className="text-gray-500">{meta.label}:</span>
                                                                                    <span className="text-gray-300 truncate">{meta.value}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <details className="cursor-pointer">
                                                                            <summary className="text-cyan-500 text-xs hover:text-cyan-400 transition mb-2">View Technical Details</summary>
                                                                            <pre className="bg-[#050505] p-3 rounded-lg overflow-x-auto text-xs text-gray-400 font-mono">
                                                                                {JSON.stringify(log.metadata, null, 2)}
                                                                            </pre>
                                                                        </details>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
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

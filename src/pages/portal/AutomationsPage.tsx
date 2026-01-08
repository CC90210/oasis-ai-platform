import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Bot, Play, Pause, Settings, Activity, Loader2, AlertCircle } from 'lucide-react';

interface Automation {
    id: string;
    automation_type: string;
    display_name: string;
    tier: string;
    status: string;
    last_run_at: string | null;
    created_at: string;
    webhook_secret?: string;
}

export default function AutomationsPage() {
    const [loading, setLoading] = useState(true);
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAutomations();
    }, []);

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
        } catch (err: any) {
            console.error('Error loading automations:', err);
            // Fallback for demo if needed, but trying to be strict production
            setError('Failed to load automations');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Bot className="w-8 h-8 text-cyan-500" />
                        My Automations
                    </h1>
                    <p className="text-gray-400 mt-2">Manage and configure your active AI agents.</p>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <div className="grid gap-6">
                    {automations.map((auto) => (
                        <div key={auto.id} className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#151520] rounded-2xl flex items-center justify-center border border-[#2a2a3e]">
                                        <Bot className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{auto.display_name}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                            <span className="bg-[#1a1a2e] px-2 py-0.5 rounded text-cyan-400 font-mono text-xs border border-cyan-500/20">
                                                ID: {auto.id}
                                            </span>
                                            <span>•</span>
                                            <span className="capitalize">{auto.tier} Plan</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#252535] text-white rounded-lg border border-[#2a2a3e] transition">
                                        <Settings className="w-4 h-4" />
                                        Configure
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-lg shadow-cyan-900/20 transition">
                                        <Activity className="w-4 h-4" />
                                        View Logs
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[#1a1a2e] grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-medium tracking-wider mb-1">Status</p>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        active
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-medium tracking-wider mb-1">Last Run</p>
                                    <p className="text-gray-300">
                                        {auto.last_run_at ? new Date(auto.last_run_at).toLocaleString() : 'Never'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-medium tracking-wider mb-1">Next Scheduled</p>
                                    <p className="text-gray-300">Automatic (Trigger Based)</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {automations.length === 0 && !loading && (
                        <div className="text-center py-20 bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl border-dashed">
                            <Bot className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-300">No Automations Yet</h3>
                            <p className="text-gray-500 mt-2">Contact our sales team to deploy your first agent.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

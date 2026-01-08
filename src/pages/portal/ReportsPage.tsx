import { useEffect, useState } from 'react';
import { supabase, MonthlyReport } from '@/lib/supabase';
import { FileText, Download, Filter, Loader2, AlertCircle } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate, formatCurrency } from '@/lib/formatters';

export default function ReportsPage() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<MonthlyReport[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('monthly_reports')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'published')
                .order('report_month', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (err) {
            console.error('Error loading reports:', err);
            setError('Failed to load reports.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            <div className="p-8 max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FileText className="w-8 h-8 text-cyan-500" />
                        Reports & Analytics
                    </h1>
                    <p className="text-gray-400 mt-2">Comprehensive performance reports for your AI workforce.</p>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* No Reports State */}
                    {reports.length === 0 && (
                        <div className="col-span-2 bg-[#0a0a0f] border border-[#1a1a2e] p-12 rounded-2xl text-center border-dashed">
                            <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2a2a3e]">
                                <Filter className="w-8 h-8 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Reports Yet</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mb-6">
                                Monthly reports are generated automatically at the start of each month once you have active automation history.
                            </p>
                            <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">Learn how reports are calculated →</button>
                        </div>
                    )}

                    {reports.map((report) => (
                        <div key={report.id} className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl hover:border-cyan-500/30 transition shadow-lg hover:shadow-cyan-500/5 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#151520] rounded-xl flex items-center justify-center border border-[#2a2a3e] group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 transition">
                                        <FileText className="w-6 h-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">{report.title}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(report.report_month)}</p>
                                    </div>
                                </div>
                                {report.file_url ? (
                                    <a
                                        href={report.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-[#151520] hover:bg-cyan-600 text-gray-400 hover:text-white border border-[#2a2a3e] transition"
                                        title="Download PDF"
                                    >
                                        <Download className="w-5 h-5" />
                                    </a>
                                ) : (
                                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">Processing</span>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4 p-4 bg-[#050505] rounded-xl border border-[#1a1a2e]">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Saved</p>
                                    <p className="text-white font-medium">{report.hours_saved || 0} hrs</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tasks</p>
                                    <p className="text-white font-medium">{report.tasks_automated || 0}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Value</p>
                                    <p className="text-green-400 font-medium">{formatCurrency(report.estimated_value_cents || 0)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PortalLayout>
    );
}

import { useEffect, useState } from 'react';
import { supabase, MonthlyReport } from '@/lib/supabase';
import { FileText, Download, Loader2, BarChart3, TrendingUp, Clock } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate, formatCurrency } from '@/lib/formatters';

export default function ReportsPage() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<MonthlyReport[]>([]);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('monthly_reports')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'published')
                .order('report_month', { ascending: false });

            setReports(data || []);
        } catch (err) {
            console.error('Error loading reports:', err);
            // Don't show error - just show empty state
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PortalLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="animate-spin text-cyan-500 w-8 h-8" />
                </div>
            </PortalLayout>
        );
    }

    return (
        <PortalLayout>
            <div className="p-8 max-w-6xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                        <FileText className="w-8 h-8 text-cyan-500" />
                        Reports & Analytics
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-2">Comprehensive performance reports for your AI workforce.</p>
                </header>

                {/* Reports Grid */}
                {reports.length === 0 ? (
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-12 rounded-2xl text-center border-dashed">
                        <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--border)]">
                            <BarChart3 className="w-10 h-10 text-[var(--text-muted)]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">No Reports Available Yet</h3>
                        <p className="text-[var(--text-muted)] max-w-md mx-auto mb-6">
                            Monthly performance reports are generated automatically at the start of each month once your automations have been running.
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-500" />
                                    <span>Reports generated monthly</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span>Track ROI & time saved</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {reports.map((report) => (
                            <div key={report.id} className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] p-6 rounded-2xl hover:border-cyan-500/30 transition shadow-lg hover:shadow-cyan-500/5 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-xl flex items-center justify-center border border-[var(--border)] group-hover:bg-cyan-900/20 group-hover:border-cyan-500/30 transition">
                                            <FileText className="w-6 h-6 text-cyan-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition">{report.title}</h3>
                                            <p className="text-sm text-[var(--text-muted)]">{formatDate(report.report_month)}</p>
                                        </div>
                                    </div>
                                    {report.file_url ? (
                                        <a
                                            href={report.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-cyan-600 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition"
                                            title="Download PDF"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">Processing</span>
                                    )}
                                </div>

                                <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--bg-main)] rounded-xl border border-[var(--bg-tertiary)]">
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Saved</p>
                                        <p className="text-[var(--text-primary)] font-medium">{report.hours_saved || 0} hrs</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Tasks</p>
                                        <p className="text-[var(--text-primary)] font-medium">{report.tasks_automated || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Value</p>
                                        <p className="text-green-400 font-medium">{formatCurrency(report.estimated_value_cents || 0)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}

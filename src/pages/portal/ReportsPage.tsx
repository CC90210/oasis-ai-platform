import { FileText, Download, Filter } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <FileText className="w-8 h-8 text-purple-500" />
                            Reports & Analytics
                        </h1>
                        <p className="text-gray-400 mt-2">Detailed metrics on your automation performance.</p>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Placeholder for Reports */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-xl text-center py-20">
                        <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2a2a3e]">
                            <Filter className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Detailed Reports Coming Soon</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            We are currently gathering more data from your agents. Detailed PDF reports and CSV exports will be available here shortly.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-xl">
                        <h3 className="text-lg font-semibold text-white mb-6">Execution Summary</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-[#151520] rounded-lg border border-[#2a2a3e]">
                                    <div>
                                        <p className="text-white font-medium">Monthly efficiency report</p>
                                        <p className="text-xs text-gray-500">Jan 2026</p>
                                    </div>
                                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

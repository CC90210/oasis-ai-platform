import React from 'react';
import { Upload, FileText, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KnowledgeBasePage = () => {
    const documents = [
        { id: 1, name: "Company Handbook.pdf", size: "2.4 MB", date: "Oct 24, 2023", status: "ready" },
        { id: 2, name: "Product Catalog.csv", size: "156 KB", date: "Nov 02, 2023", status: "ready" },
        { id: 3, name: "Sales Scripts.docx", size: "845 KB", date: "Nov 15, 2023", status: "processing" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Knowledge Base</h1>
                    <p className="text-text-secondary">Manage documents for your AI agents to reference.</p>
                </div>
                <Button className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                </Button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center bg-bg-tertiary hover:bg-white/5 transition-colors cursor-pointer">
                <div className="h-12 w-12 bg-oasis-cyan/10 text-oasis-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-text-secondary">Support for PDF, DOCX, TXT, and CSV (max 25MB)</p>
            </div>

            {/* Document List */}
            <div className="bg-bg-secondary rounded-xl border border-white/10 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <Search className="h-5 w-5 text-text-tertiary" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="flex-1 outline-none text-sm bg-transparent text-white placeholder-text-tertiary"
                    />
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-bg-tertiary text-text-secondary font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Size</th>
                            <th className="px-6 py-3">Uploaded</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-white/5">
                                <td className="px-6 py-4 flex items-center gap-3 font-medium text-white">
                                    <FileText className="h-5 w-5 text-oasis-cyan" />
                                    {doc.name}
                                </td>
                                <td className="px-6 py-4 text-text-secondary">{doc.size}</td>
                                <td className="px-6 py-4 text-text-secondary">{doc.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${doc.status === 'ready' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-text-secondary hover:text-error transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KnowledgeBasePage;

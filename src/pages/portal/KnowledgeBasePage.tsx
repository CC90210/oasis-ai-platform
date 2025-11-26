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
                    <h1 className="text-2xl font-bold text-oasis-midnight">Knowledge Base</h1>
                    <p className="text-oasis-slate">Manage documents for your AI agents to reference.</p>
                </div>
                <Button className="bg-oasis-teal hover:bg-oasis-deep-ocean text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                </Button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-oasis-slate/20 rounded-xl p-12 text-center bg-oasis-pearl/30 hover:bg-oasis-pearl/50 transition-colors cursor-pointer">
                <div className="h-12 w-12 bg-oasis-teal/10 text-oasis-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-oasis-midnight mb-2">Drop files here or click to upload</h3>
                <p className="text-sm text-oasis-slate">Support for PDF, DOCX, TXT, and CSV (max 25MB)</p>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-xl border border-oasis-slate/10 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-oasis-slate/10 flex items-center gap-4">
                    <Search className="h-5 w-5 text-oasis-slate" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        className="flex-1 outline-none text-sm"
                    />
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-oasis-pearl/50 text-oasis-slate font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Size</th>
                            <th className="px-6 py-3">Uploaded</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-oasis-slate/10">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-oasis-pearl/30">
                                <td className="px-6 py-4 flex items-center gap-3 font-medium text-oasis-midnight">
                                    <FileText className="h-5 w-5 text-oasis-teal" />
                                    {doc.name}
                                </td>
                                <td className="px-6 py-4 text-oasis-slate">{doc.size}</td>
                                <td className="px-6 py-4 text-oasis-slate">{doc.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${doc.status === 'ready' ? 'bg-oasis-mint/10 text-oasis-mint' : 'bg-oasis-amber/10 text-oasis-amber'}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-oasis-slate hover:text-oasis-rose transition-colors">
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

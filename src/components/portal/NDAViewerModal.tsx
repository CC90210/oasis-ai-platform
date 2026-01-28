import { X, Download, Shield, Calendar, User } from 'lucide-react';

interface NDAViewerModalProps {
    agreement: {
        id: string;
        client_name: string;
        company_name?: string;
        automation_type: string;
        nda_signature_name: string;
        nda_signed_at: string;
        upfront_cost_cents: number;
        monthly_cost_cents: number;
        currency: string;
        created_at: string;
    };
    onClose: () => void;
}

export default function NDAViewerModal({ agreement, onClose }: NDAViewerModalProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDownload = () => {
        const ndaContent = generateNDAText(agreement);
        const blob = new Blob([ndaContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NDA-${agreement.id.slice(0, 8)}-${new Date(agreement.created_at).toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Non-Disclosure Agreement</h2>
                            <p className="text-sm text-gray-500">Agreement #{agreement.id.slice(0, 8)}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Signature Info */}
                <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-800">
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Signed by:</span>
                            <span className="text-white font-medium">{agreement.nda_signature_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white font-medium">{formatDate(agreement.nda_signed_at)}</span>
                        </div>
                    </div>
                </div>

                {/* NDA Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose prose-invert prose-sm max-w-none">
                        <h2 className="text-xl font-bold text-white mb-4">NON-DISCLOSURE AGREEMENT</h2>

                        <p className="text-gray-400 text-sm mb-6">Effective Date: {formatDate(agreement.nda_signed_at)}</p>

                        <p className="text-gray-300 mb-4">
                            This Non-Disclosure Agreement ("Agreement") is entered into by and between:
                        </p>

                        <p className="text-gray-300 mb-2">
                            <strong className="text-white">OASIS AI Solutions</strong> ("Company"), a business entity
                            operating in Ontario, Canada, with contact email oasisaisolutions@gmail.com
                        </p>

                        <p className="text-gray-300 mb-4">and</p>

                        <p className="text-gray-300 mb-6">
                            <strong className="text-white">{agreement.company_name || agreement.client_name}</strong> ("Client")
                        </p>

                        <h3 className="text-white font-semibold mt-6 mb-3">1. CONFIDENTIAL INFORMATION</h3>
                        <p className="text-gray-300 mb-4">
                            "Confidential Information" includes, but is not limited to: pricing terms, discount rates,
                            custom agreement details, payment schedules, and any financial arrangements between the
                            parties that differ from publicly advertised rates.
                        </p>

                        <h3 className="text-white font-semibold mt-6 mb-3">2. OBLIGATIONS</h3>
                        <p className="text-gray-300 mb-2">The Client agrees to:</p>
                        <ul className="text-gray-300 list-disc pl-5 space-y-1 mb-4">
                            <li>Keep all pricing and financial terms strictly confidential</li>
                            <li>Not disclose any custom pricing arrangements to third parties</li>
                            <li>Not use the Confidential Information for any purpose other than the intended business relationship</li>
                            <li>Take reasonable measures to protect the confidentiality of this information</li>
                        </ul>

                        <h3 className="text-white font-semibold mt-6 mb-3">3. DURATION</h3>
                        <p className="text-gray-300 mb-4">
                            This Agreement shall remain in effect for a period of two (2) years from the effective date,
                            or for the duration of the business relationship plus one (1) year, whichever is longer.
                        </p>

                        <h3 className="text-white font-semibold mt-6 mb-3">4. PERMITTED DISCLOSURES</h3>
                        <p className="text-gray-300 mb-4">
                            The Client may disclose Confidential Information if required by law, provided that the Client
                            gives the Company reasonable advance notice to seek protective measures.
                        </p>

                        <h3 className="text-white font-semibold mt-6 mb-3">5. REMEDIES</h3>
                        <p className="text-gray-300 mb-4">
                            The Client acknowledges that breach of this Agreement may cause irreparable harm to the Company,
                            and the Company shall be entitled to seek equitable relief, including injunction and specific
                            performance, in addition to all other remedies available at law.
                        </p>

                        <h3 className="text-white font-semibold mt-6 mb-3">6. GOVERNING LAW</h3>
                        <p className="text-gray-300 mb-4">
                            This Agreement shall be governed by and construed in accordance with the laws of the Province
                            of Ontario, Canada.
                        </p>

                        {/* Signature Block */}
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <p className="text-gray-400 text-sm mb-4">
                                This agreement was digitally signed and is legally binding.
                            </p>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <p className="text-gray-500 text-xs uppercase mb-1">Digital Signature</p>
                                <p className="text-white text-xl font-serif italic">{agreement.nda_signature_name}</p>
                                <p className="text-gray-500 text-sm mt-2">{formatDate(agreement.nda_signed_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 flex justify-end gap-3">
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition"
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper function to generate downloadable NDA text
function generateNDAText(agreement: NDAViewerModalProps['agreement']): string {
    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return `
NON-DISCLOSURE AGREEMENT

Effective Date: ${formatDate(agreement.nda_signed_at)}

This Non-Disclosure Agreement ("Agreement") is entered into by and between:

OASIS AI Solutions ("Company"), a business entity operating in Ontario, Canada

and

${agreement.company_name || agreement.client_name} ("Client")

================================================================================

1. CONFIDENTIAL INFORMATION

"Confidential Information" includes, but is not limited to: pricing terms, discount rates, custom agreement details, payment schedules, and any financial arrangements between the parties that differ from publicly advertised rates.

2. OBLIGATIONS

The Client agrees to:
- Keep all pricing and financial terms strictly confidential
- Not disclose any custom pricing arrangements to third parties
- Not use the Confidential Information for any purpose other than the intended business relationship
- Take reasonable measures to protect the confidentiality of this information

3. DURATION

This Agreement shall remain in effect for a period of two (2) years from the effective date, or for the duration of the business relationship plus one (1) year, whichever is longer.

4. PERMITTED DISCLOSURES

The Client may disclose Confidential Information if required by law, provided that the Client gives the Company reasonable advance notice to seek protective measures.

5. REMEDIES

The Client acknowledges that breach of this Agreement may cause irreparable harm to the Company, and the Company shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law.

6. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada.

================================================================================

DIGITAL SIGNATURE

Signed by: ${agreement.nda_signature_name}
Date: ${formatDate(agreement.nda_signed_at)}
Agreement ID: ${agreement.id}

This agreement was digitally signed and is legally binding.

================================================================================

OASIS AI Solutions
Email: oasisaisolutions@gmail.com
Phone: 705-440-3117
Website: https://oasisai.work
  `.trim();
}

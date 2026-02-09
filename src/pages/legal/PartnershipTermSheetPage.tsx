import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PartnershipTermSheetPage() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="border-b border-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="prose prose-invert prose-purple max-w-none">
                    <p className="text-purple-400 text-sm font-medium mb-2">Internal Template</p>
                    <h1 className="text-4xl font-bold text-white mb-2">Partnership Term Sheet</h1>
                    <p className="text-gray-400 mb-8">
                        Document 5 · Summary of Equity Arrangements
                    </p>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 my-6">
                        <p className="text-yellow-200 text-sm m-0 italic text-center">
                            *Non-Binding Summary of Proposed Terms*
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl border border-white/5 mb-12">
                        <p className="text-gray-300">Date: [DATE]</p>
                        <p className="text-gray-300">Parties: OASIS AI Solutions and [PARTNER NAME(S)]</p>
                    </div>

                    <h2>1. PROPOSED STRUCTURE</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-700">Party</th>
                                    <th className="px-4 py-2 border border-gray-700">Equity %</th>
                                    <th className="px-4 py-2 border border-gray-700">Capital Contribution</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700 font-bold text-white text-purple-400">OASIS AI Solutions</td>
                                    <td className="px-4 py-2 border border-gray-700">[X]%</td>
                                    <td className="px-4 py-2 border border-gray-700">Technology, IP, Development Services</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700">[Partner 1]</td>
                                    <td className="px-4 py-2 border border-gray-700">[X]%</td>
                                    <td className="px-4 py-2 border border-gray-700">$[X] / Services</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>2. OASIS AI REQUIRED PROTECTIONS</h2>
                    <p>The following protections must be included in the Operating Agreement:</p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.1 Unanimous Consent Required For:</h3>
                    <ul>
                        <li>Sale of company or substantially all assets</li>
                        <li>Merger or acquisition</li>
                        <li>Issuance of new equity</li>
                        <li>Incurrence of debt over $[X]</li>
                        <li>Amendment of governance documents</li>
                        <li>Removal of OASIS AI from management</li>
                        <li>Any IP licensing or transfer</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.2 IP Provisions</h3>
                    <ul>
                        <li>All pre-existing OASIS AI IP remains with OASIS AI</li>
                        <li>Company receives license to use such IP</li>
                        <li>Upon dissolution or OASIS AI exit, all IP reverts to OASIS AI</li>
                        <li>Upon material breach by other partners, all IP reverts to OASIS AI</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.3 Anti-Dilution</h3>
                    <ul>
                        <li>OASIS AI equity cannot be diluted without consent</li>
                        <li>Any new issuance requires pro-rata participation rights</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.4 Exit Rights</h3>
                    <ul>
                        <li>OASIS AI may exit upon 90 days notice</li>
                        <li>Exit triggers buy-out at fair market value</li>
                        <li>Accelerated exit upon material breach by others</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.5 Tag-Along Rights</h3>
                    <ul>
                        <li>If any partner sells, OASIS AI may participate on same terms</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">2.6 Management</h3>
                    <ul>
                        <li>OASIS AI retains technical control over all development</li>
                        <li>Key technical decisions require OASIS AI approval</li>
                    </ul>

                    <h2>3. MATERIAL BREACH TRIGGERS</h2>
                    <p>The following constitute material breach by non-OASIS AI partners:</p>
                    <ul>
                        <li>Failure to make capital contributions</li>
                        <li>Misappropriation of funds</li>
                        <li>Unauthorized disclosure of confidential information</li>
                        <li>Actions taken without required consent</li>
                        <li>Filing litigation against OASIS AI without good faith basis</li>
                        <li>Violation of fiduciary duties</li>
                    </ul>

                    <h2>4. CONSEQUENCES OF BREACH</h2>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 my-6">
                        <p className="text-red-200 font-bold mb-4">Upon material breach by non-OASIS AI partners:</p>
                        <ul className="text-red-100 space-y-2 mb-0">
                            <li>All restrictive covenants on OASIS AI terminate</li>
                            <li>All IP reverts to OASIS AI</li>
                            <li>OASIS AI may dissolve partnership</li>
                            <li>OASIS AI may purchase breaching party's interest at discount</li>
                            <li>OASIS AI may continue development independently</li>
                        </ul>
                    </div>

                    <h2>5. NON-BINDING</h2>
                    <p>This Term Sheet is non-binding and for discussion purposes only. Binding obligations arise only upon execution of a definitive Operating Agreement.</p>

                    <div className="mt-12 pt-12 border-t border-gray-800">
                        <p className="font-bold text-white mb-4 text-sm uppercase">OASIS AI SOLUTIONS</p>
                        <div className="space-y-4 max-w-sm">
                            <div className="border-b border-gray-700 pb-2 text-gray-400">By: _______________________________</div>
                            <div className="text-gray-400 text-sm">Name: Conaugh McKenna</div>
                            <div className="text-gray-400 text-sm">Title: Owner/Founder</div>
                            <div className="border-b border-gray-700 pb-2 text-gray-400">Date: _______________________________</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

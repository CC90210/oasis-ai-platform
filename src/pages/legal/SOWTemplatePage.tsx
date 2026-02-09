import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SOWTemplatePage() {
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
                    <p className="text-purple-400 text-sm font-medium mb-2">Legal Template</p>
                    <h1 className="text-4xl font-bold text-white mb-2">Statement of Work (SOW)</h1>
                    <p className="text-gray-400 mb-8">
                        Document 4 · Template for Project Execution
                    </p>

                    <div className="bg-gray-800 p-6 rounded-xl border border-white/5 mb-12">
                        <p className="text-gray-300 font-bold mb-4">SOW Number: [SOW-XXXX]</p>
                        <p className="text-gray-300">Date: [DATE]</p>
                        <p className="text-gray-300">Client: [CLIENT NAME]</p>
                        <hr className="border-gray-700 my-4" />
                        <p className="text-gray-400 text-sm italic">
                            This Statement of Work ("SOW") is entered into pursuant to the Master Services Agreement between OASIS AI Solutions and Client.
                        </p>
                    </div>

                    <h2>1. PROJECT DESCRIPTION</h2>
                    <div className="bg-gray-800 p-4 rounded-lg my-4 italic text-gray-400">
                        [DESCRIPTION OF THE PROJECT SCOPE AND OBJECTIVES]
                    </div>

                    <h2>2. DELIVERABLES</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-700">#</th>
                                    <th className="px-4 py-2 border border-gray-700">Deliverable</th>
                                    <th className="px-4 py-2 border border-gray-700">Description</th>
                                    <th className="px-4 py-2 border border-gray-700">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700 text-center">1</td>
                                    <td className="px-4 py-2 border border-gray-700">Example Deliverable</td>
                                    <td className="px-4 py-2 border border-gray-700">Detailed explanation</td>
                                    <td className="px-4 py-2 border border-gray-700">[DATE]</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>3. TIMELINE</h2>
                    <ul>
                        <li>Project Start: [DATE]</li>
                        <li>Estimated Completion: [DATE]</li>
                    </ul>

                    <h2>4. FEES AND PAYMENT</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-700">Milestone</th>
                                    <th className="px-4 py-2 border border-gray-700">Amount</th>
                                    <th className="px-4 py-2 border border-gray-700">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700">Deposit (Non-refundable)</td>
                                    <td className="px-4 py-2 border border-gray-700">$[X] (50%)</td>
                                    <td className="px-4 py-2 border border-gray-700">Upon signing</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700">Milestone 1</td>
                                    <td className="px-4 py-2 border border-gray-700">$[X] (25%)</td>
                                    <td className="px-4 py-2 border border-gray-700">[DATE]</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-700">Final Delivery</td>
                                    <td className="px-4 py-2 border border-gray-700">$[X] (25%)</td>
                                    <td className="px-4 py-2 border border-gray-700">Upon delivery</td>
                                </tr>
                                <tr className="font-bold text-white">
                                    <td className="px-4 py-2 border border-gray-700">Total</td>
                                    <td className="px-4 py-2 border border-gray-700" colSpan={2}>$[X]</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>5. CLIENT RESPONSIBILITIES</h2>
                    <p>Client shall provide:</p>
                    <ul>
                        <li>[LIST OF REQUIREMENTS/RESOURCES]</li>
                        <li>Timely feedback within [X] business days</li>
                        <li>Access to necessary systems and personnel</li>
                    </ul>

                    <h2>6. ASSUMPTIONS</h2>
                    <ul>
                        <li>[LIST OF PROJECT ASSUMPTIONS]</li>
                    </ul>

                    <h2>7. CHANGE ORDERS</h2>
                    <p>Any changes to scope require a written Change Order signed by both parties. Changes may affect timeline and fees.</p>

                    <h2>8. INTELLECTUAL PROPERTY</h2>
                    <p>Per the Master Services Agreement:</p>
                    <ul>
                        <li>Pre-Existing IP remains with OASIS AI</li>
                        <li>Project IP transfers upon full payment and compliance</li>
                        <li>General knowledge remains with OASIS AI</li>
                    </ul>

                    <h2>9. ACCEPTANCE</h2>
                    <p>Deliverables shall be deemed accepted unless Client provides written notice of deficiencies within 10 business days of delivery.</p>

                    <h2>10. INCORPORATION</h2>
                    <p>This SOW is subject to and incorporates by reference the Master Services Agreement. In case of conflict, the MSA governs.</p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-800">
                        <div>
                            <p className="font-bold text-white mb-4 text-sm uppercase">OASIS AI SOLUTIONS</p>
                            <div className="space-y-4">
                                <div className="border-b border-gray-700 pb-2 text-gray-400">By: _______________________________</div>
                                <div className="text-gray-400 text-sm">Name: Conaugh McKenna</div>
                                <div className="text-gray-400 text-sm">Title: Owner/Founder</div>
                                <div className="border-b border-gray-700 pb-2 text-gray-400">Date: _______________________________</div>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-4 text-sm uppercase">CLIENT: [NAME]</p>
                            <div className="space-y-4">
                                <div className="border-b border-gray-700 pb-2 text-gray-400">By: _______________________________</div>
                                <div className="border-b border-gray-700 pb-2 text-gray-400">Name: _______________________________</div>
                                <div className="border-b border-gray-700 pb-2 text-gray-400">Title: _______________________________</div>
                                <div className="border-b border-gray-700 pb-2 text-gray-400">Date: _______________________________</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IPAssignmentPage() {
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
                    <h1 className="text-4xl font-bold text-white mb-2">IP Assignment Agreement</h1>
                    <p className="text-gray-400 mb-8">
                        Document 3 · Template for Client Use
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-12 not-prose">
                        <p className="text-purple-200 text-sm m-0">
                            <strong>INTELLECTUAL PROPERTY ASSIGNMENT AGREEMENT</strong>
                            <br /><br />
                            This IP Assignment Agreement ("Assignment") is entered into as of [DATE] by and between:
                            <br /><br />
                            <strong>OASIS AI Solutions</strong> ("Assignor")
                            <br />
                            141 Sixth Street, Collingwood, Ontario L9Y 1Z1, Canada
                            <br /><br />
                            AND
                            <br /><br />
                            <strong>[CLIENT NAME]</strong> ("Assignee")
                            <br />
                            [CLIENT ADDRESS]
                        </p>
                    </div>

                    <h2>RECITALS</h2>
                    <p>WHEREAS, Assignor has developed certain intellectual property in connection with services provided to Assignee under that certain Master Services Agreement dated [DATE] and Statement of Work dated [DATE] (collectively, the "Service Agreements");</p>
                    <p>WHEREAS, Assignee has satisfied all conditions precedent to IP transfer as specified in the Service Agreements;</p>
                    <p>NOW, THEREFORE, in consideration of the mutual promises herein, the parties agree:</p>

                    <h2>1. CONFIRMATION OF CONDITION SATISFACTION</h2>
                    <p>Assignee confirms and Assignor acknowledges that:</p>
                    <ul>
                        <li>☐ All fees due under the Service Agreements have been paid in full</li>
                        <li>☐ Assignee is not in breach of any provision of the Service Agreements</li>
                        <li>☐ All other conditions precedent to IP transfer have been satisfied</li>
                    </ul>
                    <p><strong>Total Fees Paid: $[AMOUNT]</strong></p>
                    <p><strong>Date of Final Payment: [DATE]</strong></p>

                    <h2>2. ASSIGNED IP</h2>
                    <p>Subject to the terms hereof, Assignor hereby assigns to Assignee the following specifically identified Project IP:</p>
                    <div className="bg-gray-800 p-4 rounded-lg my-4 italic text-gray-400">
                        [DETAILED DESCRIPTION OF ASSIGNED IP]
                    </div>

                    <h2>3. EXCLUDED IP (RETAINED BY ASSIGNOR)</h2>
                    <p>The following Pre-Existing IP is expressly EXCLUDED from this Assignment and remains the sole property of Assignor:</p>
                    <ul>
                        <li>All proprietary frameworks, libraries, and tools developed by Assignor</li>
                        <li>All methodologies, processes, and know-how</li>
                        <li>All general-purpose code and components</li>
                        <li>[SPECIFIC ITEMS]</li>
                    </ul>
                    <p>Assignee receives only a non-exclusive license to use such Pre-Existing IP as incorporated in the Assigned IP.</p>

                    <h2>4. REPRESENTATIONS</h2>
                    <p>Assignor represents that:</p>
                    <ul>
                        <li>It has the right to make this Assignment</li>
                        <li>To its knowledge, the Assigned IP does not infringe third-party rights</li>
                        <li>There are no liens or encumbrances on the Assigned IP</li>
                    </ul>

                    <h2>5. LIMITATION</h2>
                    <p>This Assignment does not:</p>
                    <ul>
                        <li>Transfer any rights beyond those specifically identified herein</li>
                        <li>Waive any of Assignor's rights under the Service Agreements</li>
                        <li>Modify any limitations of liability in the Service Agreements</li>
                    </ul>

                    <h2>6. GOVERNING LAW</h2>
                    <p>This Assignment is governed by the laws of Ontario, Canada.</p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-800">
                        <div>
                            <p className="font-bold text-white mb-4 text-sm uppercase">ASSIGNOR: OASIS AI SOLUTIONS</p>
                            <div className="space-y-4">
                                <div className="border-b border-gray-700 pb-2 text-gray-400">By: _______________________________</div>
                                <div className="text-gray-400 text-sm">Name: Conaugh McKenna</div>
                                <div className="text-gray-400 text-sm">Title: Owner/Founder</div>
                                <div className="border-b border-gray-700 pb-2 text-gray-400">Date: _______________________________</div>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-4 text-sm uppercase">ASSIGNEE: [CLIENT NAME]</p>
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

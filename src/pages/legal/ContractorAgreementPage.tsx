import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContractorAgreementPage() {
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
                    <h1 className="text-4xl font-bold text-white mb-2">Independent Contractor Agreement</h1>
                    <p className="text-gray-400 mb-8">
                        Document 6 · Engagement of Subcontractors
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-12 not-prose text-purple-200">
                        This Agreement is between OASIS AI Solutions ("Company") and [CONTRACTOR NAME] ("Contractor").
                    </div>

                    <h2>1. SERVICES</h2>
                    <p>Contractor shall provide [DESCRIPTION] services.</p>

                    <h2>2. COMPENSATION</h2>
                    <p>[RATE/TERMS]</p>

                    <h2>3. INTELLECTUAL PROPERTY</h2>
                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.1 Work Product</h3>
                    <p>All work product created by Contractor in connection with services for Company shall be the sole property of Company.</p>
                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.2 Assignment</h3>
                    <p>Contractor hereby assigns to Company all right, title, and interest in and to all work product.</p>
                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.3 Pre-Existing IP</h3>
                    <p>Contractor shall not incorporate any pre-existing IP into work product without Company's written consent.</p>

                    <h2>4. CONFIDENTIALITY</h2>
                    <p>Contractor shall maintain confidentiality of all Company and Company client information.</p>

                    <h2>5. NON-COMPETE / NON-SOLICIT</h2>
                    <p>During the term and for [X] months thereafter, Contractor shall not:</p>
                    <ul>
                        <li>Directly solicit Company's clients</li>
                        <li>Compete with Company in [SCOPE]</li>
                    </ul>

                    <h2>6. INDEPENDENT CONTRACTOR</h2>
                    <p>Contractor is an independent contractor, not an employee.</p>

                    <h2>7. INDEMNIFICATION</h2>
                    <p>Contractor shall indemnify Company against claims arising from Contractor's services.</p>

                    <h2>8. TERM AND TERMINATION</h2>
                    <p>Either party may terminate upon [X] days written notice.</p>

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
                            <p className="font-bold text-white mb-4 text-sm uppercase">CONTRACTOR: [NAME]</p>
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

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MSAPage() {
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
                    <p className="text-purple-400 text-sm font-medium mb-2">Legal</p>
                    <h1 className="text-4xl font-bold text-white mb-2">Master Services Agreement (MSA)</h1>
                    <p className="text-gray-400 mb-8">
                        Version 2026-02-09-v1 · Last Updated: February 9, 2026
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-12 not-prose">
                        <p className="text-purple-200 text-sm m-0">
                            <strong>OASIS AI SOLUTIONS - MASTER SERVICES AGREEMENT</strong>
                            <br /><br />
                            This Master Services Agreement ("MSA") is entered into by and between OASIS AI Solutions ("Developer", "OASIS AI", "we", "us", or "our"), a sole proprietorship located at 141 Sixth Street, Collingwood, Ontario L9Y 1Z1, Canada, and the client engaging our services ("Client", "you", or "your").
                            <br /><br />
                            By engaging OASIS AI Solutions for any services, signing any agreement with OASIS AI Solutions, or accepting any deliverables from OASIS AI Solutions, Client agrees to be bound by the terms of this Master Services Agreement.
                        </p>
                    </div>

                    <h2 id="article-1">ARTICLE 1: DEFINITIONS</h2>
                    <p><strong>1.1 "Services"</strong> means any and all automation, software development, consulting, implementation, or related services provided by OASIS AI to Client.</p>
                    <p><strong>1.2 "Deliverables"</strong> means any work product, software, code, documentation, or other materials created by OASIS AI in connection with the Services.</p>
                    <p><strong>1.3 "Pre-Existing IP"</strong> means any intellectual property, including but not limited to software, code, libraries, frameworks, tools, methodologies, know-how, and techniques that: (a) were developed by OASIS AI prior to the commencement of Services; (b) are developed by OASIS AI independently of the Services; or (c) are developed by OASIS AI for general use across multiple clients.</p>
                    <p><strong>1.4 "Project IP"</strong> means intellectual property specifically created for Client as part of the Deliverables, excluding any Pre-Existing IP incorporated therein.</p>
                    <p><strong>1.5 "General Knowledge"</strong> means skills, knowledge, experience, ideas, concepts, know-how, and techniques of a general nature related to automation, software development, artificial intelligence, and related fields that OASIS AI may acquire or develop during the course of providing Services.</p>
                    <p><strong>1.6 "Statement of Work" or "SOW"</strong> means any document describing specific Services, Deliverables, timelines, and fees agreed upon by the parties.</p>

                    <h2 id="article-2">ARTICLE 2: INTELLECTUAL PROPERTY OWNERSHIP</h2>
                    <p><strong>2.1 Pre-Existing IP.</strong> OASIS AI retains all right, title, and interest in and to all Pre-Existing IP. Nothing in this Agreement or any SOW shall be construed to transfer ownership of any Pre-Existing IP to Client. To the extent any Pre-Existing IP is incorporated into Deliverables, OASIS AI grants Client a non-exclusive, perpetual, royalty-free license to use such Pre-Existing IP solely as part of the Deliverables and solely for Client's internal business purposes.</p>
                    <p><strong>2.2 Project IP Ownership Conditions.</strong> Transfer of ownership of Project IP to Client is expressly conditioned upon:</p>
                    <ul>
                        <li>(a) Full payment of all fees and expenses due under this Agreement and any applicable SOW;</li>
                        <li>(b) Client's compliance with all terms of this Agreement;</li>
                        <li>(c) Execution of a written IP Assignment Agreement specifically identifying the Project IP to be transferred;</li>
                        <li>(d) No material breach of this Agreement by Client.</li>
                    </ul>
                    <p><strong>2.3 Retention of Rights Until Transfer.</strong> Until all conditions in Section 2.2 are satisfied, OASIS AI retains all right, title, and interest in and to all Deliverables, including Project IP. Client acknowledges that any use of Deliverables prior to satisfaction of transfer conditions constitutes a license only, which may be revoked upon Client's breach.</p>
                    <p><strong>2.4 General Knowledge.</strong> Notwithstanding any other provision of this Agreement or any other agreement between the parties, OASIS AI shall be free to use and employ its General Knowledge without restriction. This includes the right to:</p>
                    <ul>
                        <li>(a) Provide similar services to other clients, including competitors of Client;</li>
                        <li>(b) Develop similar or related software, tools, or solutions for any purpose;</li>
                        <li>(c) Use any skills, techniques, or knowledge of a general nature acquired during the engagement.</li>
                    </ul>
                    <p><strong>2.5 No Work-for-Hire.</strong> Unless explicitly stated in a separate written agreement signed by both parties, no work performed by OASIS AI shall be considered "work made for hire" under applicable copyright law.</p>
                    <p><strong>2.6 Source Code Escrow.</strong> All source code developed under this Agreement shall be maintained by OASIS AI. Release of source code to Client is subject to satisfaction of all conditions in Section 2.2.</p>

                    <h2 id="article-3">ARTICLE 3: PAYMENT TERMS</h2>
                    <p><strong>3.1 Fees.</strong> Client agrees to pay all fees as specified in the applicable SOW.</p>
                    <p><strong>3.2 Payment Schedule.</strong> Unless otherwise specified:</p>
                    <ul>
                        <li>(a) 50% of estimated fees are due upon execution of SOW (non-refundable deposit);</li>
                        <li>(b) 25% due upon delivery of initial prototype or milestone;</li>
                        <li>(c) 25% due upon final delivery.</li>
                    </ul>
                    <p><strong>3.3 Late Payment.</strong> Amounts not paid when due shall accrue interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is less. Additionally:</p>
                    <ul>
                        <li>(a) OASIS AI may suspend Services until payment is received;</li>
                        <li>(b) IP transfer provisions shall be held in abeyance until all amounts are paid;</li>
                        <li>(c) OASIS AI may revoke any licenses granted hereunder.</li>
                    </ul>
                    <p><strong>3.4 Disputed Amounts.</strong> Client must notify OASIS AI in writing of any disputed amounts within 10 days of invoice date. Undisputed amounts must be paid according to terms.</p>

                    <h2 id="article-4">ARTICLE 4: TERM, TERMINATION, AND BREACH</h2>
                    <p><strong>4.1 Term.</strong> This Agreement shall commence upon Client's engagement of OASIS AI and continue until terminated as provided herein.</p>
                    <p><strong>4.2 Termination for Convenience by Client.</strong> Client may terminate this Agreement or any SOW for convenience upon 30 days written notice, provided Client pays:</p>
                    <ul>
                        <li>(a) All fees for Services performed through termination date;</li>
                        <li>(b) Non-cancellable expenses incurred by OASIS AI;</li>
                        <li>(c) A termination fee equal to 25% of remaining estimated fees under any active SOW.</li>
                    </ul>
                    <p><strong>4.3 Termination for Convenience by OASIS AI.</strong> OASIS AI may terminate this Agreement or any SOW for convenience upon 30 days written notice. In such event, OASIS AI shall refund any prepaid fees for Services not yet performed, less reasonable compensation for work completed.</p>
                    <p><strong>4.4 Termination for Cause.</strong> Either party may terminate this Agreement immediately upon written notice if the other party:</p>
                    <ul>
                        <li>(a) Commits a material breach that remains uncured for 15 days after written notice;</li>
                        <li>(b) Becomes insolvent or files for bankruptcy;</li>
                        <li>(c) Engages in fraudulent or illegal conduct.</li>
                    </ul>
                    <p><strong>4.5 Effect of Client Breach.</strong> Upon any material breach by Client, including but not limited to non-payment, violation of confidentiality, or unauthorized use of Deliverables:</p>
                    <ul>
                        <li>(a) All licenses granted to Client hereunder shall immediately terminate;</li>
                        <li>(b) All IP transfer provisions shall be void and unenforceable;</li>
                        <li>(c) OASIS AI shall retain all rights to all Deliverables;</li>
                        <li>(d) Client shall immediately cease all use of Deliverables;</li>
                        <li>(e) Any restrictive covenants binding OASIS AI (including non-compete or non-replication clauses) shall immediately terminate;</li>
                        <li>(f) OASIS AI may pursue all available legal remedies.</li>
                    </ul>
                    <p><strong>4.6 Mutual Termination of Restrictive Covenants.</strong> Any agreement containing restrictive covenants binding OASIS AI (including but not limited to non-compete, non-solicitation, or non-replication provisions) shall be subject to the following:</p>
                    <ul>
                        <li>(a) Such restrictive covenants shall only be enforceable so long as Client remains in full compliance with all obligations under this Agreement and any other agreement between the parties;</li>
                        <li>(b) Upon any material breach by Client, all such restrictive covenants shall immediately and automatically terminate;</li>
                        <li>(c) Client's failure to make timely payments constitutes a material breach for purposes of this Section.</li>
                    </ul>

                    <h2 id="article-5">ARTICLE 5: LIMITATION OF LIABILITY</h2>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 my-6">
                        <p><strong>5.1 Limitation.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, OASIS AI'S TOTAL LIABILITY TO CLIENT FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY CLIENT TO OASIS AI DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
                        <p><strong>5.2 Exclusion of Consequential Damages.</strong> IN NO EVENT SHALL OASIS AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, EVEN IF OASIS AI HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                    </div>
                    <p><strong>5.3 Exceptions.</strong> The limitations in this Article 5 shall not apply to:</p>
                    <ul>
                        <li>(a) Client's breach of intellectual property provisions;</li>
                        <li>(b) Client's breach of confidentiality obligations;</li>
                        <li>(c) Client's indemnification obligations;</li>
                        <li>(d) Amounts owed by Client for Services rendered.</li>
                    </ul>
                    <p><strong>5.4 Essential Purpose.</strong> The parties acknowledge that the limitations in this Article 5 are essential to the bargain between the parties and shall apply regardless of the form of action, whether in contract, tort, strict liability, or otherwise.</p>

                    <h2 id="article-6">ARTICLE 6: INDEMNIFICATION</h2>
                    <p><strong>6.1 By Client.</strong> Client shall defend, indemnify, and hold harmless OASIS AI, its officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:</p>
                    <ul>
                        <li>(a) Client's use of Deliverables;</li>
                        <li>(b) Client's breach of this Agreement;</li>
                        <li>(c) Client's violation of any law or regulation;</li>
                        <li>(d) Any claim that Client's specifications, requirements, or materials infringe third-party rights;</li>
                        <li>(e) Any dispute between Client and any third party related to the Services or Deliverables;</li>
                        <li>(f) Client's business operations, products, or services.</li>
                    </ul>
                    <p><strong>6.2 Procedure.</strong> OASIS AI shall promptly notify Client of any claim subject to indemnification, allow Client to control the defense (with counsel reasonably acceptable to OASIS AI), and cooperate reasonably in the defense. OASIS AI may participate in the defense with its own counsel at its own expense.</p>

                    <h2 id="article-7">ARTICLE 7: WARRANTIES AND DISCLAIMERS</h2>
                    <p><strong>7.1 OASIS AI Warranties.</strong> OASIS AI warrants that:</p>
                    <ul>
                        <li>(a) Services shall be performed in a professional and workmanlike manner;</li>
                        <li>(b) OASIS AI has the right to enter into this Agreement;</li>
                        <li>(c) To OASIS AI's knowledge, Deliverables shall not infringe any third-party intellectual property rights (excluding any infringement arising from Client's specifications or materials).</li>
                    </ul>
                    <p><strong>7.2 Disclaimer.</strong> EXCEPT AS EXPRESSLY SET FORTH IN SECTION 7.1, OASIS AI MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT. OASIS AI DOES NOT WARRANT THAT DELIVERABLES WILL BE ERROR-FREE OR UNINTERRUPTED.</p>
                    <p><strong>7.3 Client Responsibilities.</strong> Client acknowledges that successful implementation of Services may depend on Client's timely provision of information, feedback, access, and resources. OASIS AI shall not be liable for any delays or deficiencies caused by Client's failure to fulfill its responsibilities.</p>

                    <h2 id="article-8">ARTICLE 8: CONFIDENTIALITY</h2>
                    <p><strong>8.1 Mutual Obligations.</strong> Each party agrees to maintain the confidentiality of the other party's Confidential Information and to use such information only for purposes of this Agreement.</p>
                    <p><strong>8.2 OASIS AI's Confidential Information.</strong> Client acknowledges that the following constitute OASIS AI's Confidential Information:</p>
                    <ul>
                        <li>(a) All source code, algorithms, and technical designs;</li>
                        <li>(b) OASIS AI's pricing, business practices, and methodologies;</li>
                        <li>(c) All Pre-Existing IP;</li>
                        <li>(d) The terms of this Agreement.</li>
                    </ul>
                    <p><strong>8.3 Survival.</strong> Confidentiality obligations shall survive termination of this Agreement for a period of five (5) years, except for trade secrets, which shall be protected indefinitely.</p>

                    <h2 id="article-9">ARTICLE 9: PARTNERSHIP AND EQUITY ARRANGEMENTS</h2>
                    <p><strong>9.1 Applicability.</strong> This Article 9 applies to any arrangement in which Client and OASIS AI agree to form a partnership, joint venture, or other equity-sharing relationship.</p>
                    <p><strong>9.2 Written Agreement Required.</strong> No partnership, joint venture, or equity arrangement shall be effective unless documented in a separate written Operating Agreement or Partnership Agreement signed by all parties.</p>
                    <p><strong>9.3 OASIS AI Protections in Equity Arrangements.</strong> Any such arrangement shall include, at minimum:</p>
                    <ul>
                        <li><strong>(a) IP Contribution Acknowledgment.</strong> Acknowledgment that OASIS AI's contribution of intellectual property, technical expertise, and development services constitutes a capital contribution equal in value to any cash or other contributions by other partners.</li>
                        <li><strong>(b) Protective Provisions.</strong> Unanimous consent requirements for:
                            <ul>
                                <li>Sale or disposition of substantially all assets</li>
                                <li>Merger or acquisition</li>
                                <li>Issuance of additional equity</li>
                                <li>Amendment of governance documents</li>
                                <li>Incurrence of material debt</li>
                                <li>Termination of key personnel (including OASIS AI principals)</li>
                            </ul>
                        </li>
                        <li><strong>(c) Tag-Along Rights.</strong> If any partner proposes to sell their interest, OASIS AI shall have the right to participate in such sale on the same terms.</li>
                        <li><strong>(d) Drag-Along Protections.</strong> OASIS AI may not be compelled to sell its interest except upon a sale of the entire company at a minimum valuation to be specified.</li>
                        <li><strong>(e) Anti-Dilution.</strong> OASIS AI's equity percentage shall not be diluted without consent.</li>
                        <li><strong>(f) IP Reversion.</strong> Upon dissolution of the partnership or material breach by other partners, all intellectual property developed by OASIS AI shall revert to OASIS AI.</li>
                        <li><strong>(g) Exit Rights.</strong> OASIS AI shall have the right to exit the partnership upon 90 days notice and receive fair market value for its interest.</li>
                    </ul>
                    <p><strong>9.4 Material Breach by Partners.</strong> The following shall constitute material breach by any partner other than OASIS AI:</p>
                    <ul>
                        <li>(a) Failure to make required capital contributions;</li>
                        <li>(b) Misappropriation of partnership funds or assets;</li>
                        <li>(c) Unauthorized disclosure of Confidential Information;</li>
                        <li>(d) Violation of fiduciary duties;</li>
                        <li>(e) Actions taken without required consent;</li>
                        <li>(f) Filing of litigation against OASIS AI or the partnership without good faith basis.</li>
                    </ul>
                    <p><strong>9.5 Consequences of Partner Breach.</strong> Upon material breach by any partner other than OASIS AI:</p>
                    <ul>
                        <li>(a) All restrictive covenants binding OASIS AI shall terminate;</li>
                        <li>(b) OASIS AI may elect to dissolve the partnership;</li>
                        <li>(c) OASIS AI shall have the right to purchase breaching partner's interest at a discount;</li>
                        <li>(d) All IP contributed or developed by OASIS AI shall revert to OASIS AI's sole ownership;</li>
                        <li>(e) OASIS AI shall be free to continue development and commercialization of any technology independently.</li>
                    </ul>

                    <h2 id="article-10">ARTICLE 10: DISPUTE RESOLUTION</h2>
                    <p><strong>10.1 Negotiation.</strong> The parties shall attempt to resolve any dispute through good faith negotiation.</p>
                    <p><strong>10.2 Mediation.</strong> If negotiation fails, the parties shall attempt mediation before a mutually agreed mediator.</p>
                    <p><strong>10.3 Governing Law.</strong> This Agreement shall be governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
                    <p><strong>10.4 Jurisdiction.</strong> Any litigation shall be brought exclusively in the courts of Ontario, Canada. Client consents to personal jurisdiction in such courts.</p>
                    <p><strong>10.5 Attorneys' Fees.</strong> The prevailing party in any litigation shall be entitled to recover reasonable attorneys' fees and costs.</p>

                    <h2 id="article-11">ARTICLE 11: GENERAL PROVISIONS</h2>
                    <p><strong>11.1 Entire Agreement.</strong> This Agreement, together with any SOWs and other documents expressly incorporated by reference, constitutes the entire agreement between the parties regarding its subject matter.</p>
                    <p><strong>11.2 Amendment.</strong> This Agreement may only be amended by written agreement signed by both parties.</p>
                    <p><strong>11.3 Waiver.</strong> No waiver of any provision shall be effective unless in writing. No failure to exercise any right shall constitute a waiver of such right.</p>
                    <p><strong>11.4 Severability.</strong> If any provision is found unenforceable, the remaining provisions shall continue in effect.</p>
                    <p><strong>11.5 Assignment.</strong> Client may not assign this Agreement without OASIS AI's prior written consent. OASIS AI may assign this Agreement to any successor or affiliate.</p>
                    <p><strong>11.6 Independent Contractor.</strong> OASIS AI is an independent contractor. Nothing in this Agreement creates an employment, agency, or partnership relationship (except as explicitly agreed in a separate Partnership Agreement).</p>
                    <p><strong>11.7 Survival.</strong> Provisions regarding intellectual property, confidentiality, limitation of liability, indemnification, and any other provisions that by their nature should survive, shall survive termination of this Agreement.</p>
                    <p><strong>11.8 Notices.</strong> All notices shall be in writing and sent to the addresses specified in the applicable SOW or as otherwise updated by the parties.</p>
                    <p><strong>11.9 Force Majeure.</strong> Neither party shall be liable for delays caused by circumstances beyond its reasonable control.</p>
                    <p><strong>11.10 Publicity.</strong> OASIS AI may identify Client as a customer and provide a general description of Services performed, unless Client provides written notice to the contrary.</p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 my-12 text-center">
                        <p className="text-purple-200 m-0">
                            <strong>BY ENGAGING OASIS AI SOLUTIONS, CLIENT ACKNOWLEDGES HAVING READ, UNDERSTOOD, AND AGREED TO THIS MASTER SERVICES AGREEMENT.</strong>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .bg-gray-900 { background: white !important; }
                    .text-white, .text-gray-300, .text-gray-400 { color: black !important; }
                    .text-purple-400, .text-purple-200 { color: #6b21a8 !important; }
                    .border-gray-800, .border-purple-500\\/30, .border-red-500\\/30 { border-color: #ccc !important; }
                    .bg-gray-800, .bg-purple-500\\/10, .bg-red-500\\/10 { background: #f3f4f6 !important; }
                }
            `}</style>
        </div>
    );
}

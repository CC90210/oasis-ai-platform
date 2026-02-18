import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
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
                    <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
                    <p className="text-gray-400 mb-8">
                        Version 2026-02-09-v1 · Last Updated: February 9, 2026
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-12 not-prose">
                        <p className="text-purple-200 text-sm m-0">
                            <strong>OASIS AI SOLUTIONS - TERMS OF SERVICE</strong>
                            <br /><br />
                            Welcome to OASIS AI Solutions. These Terms of Service ("Terms") govern your use of our website, services, and any engagement with our company.
                        </p>
                    </div>

                    <h2 id="acceptance">1. Acceptance of Terms</h2>
                    <p>By accessing our website, engaging our services, or entering into any agreement with OASIS AI Solutions, you agree to be bound by:</p>
                    <ul>
                        <li>These Terms of Service</li>
                        <li>Our <Link to="/legal/master-services-agreement" className="text-purple-400 hover:text-purple-300">Master Services Agreement</Link></li>
                        <li>Our <Link to="/legal/privacy-policy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link></li>
                        <li>Any applicable Statement of Work</li>
                    </ul>

                    <h2 id="services">2. Our Services</h2>
                    <p>OASIS AI Solutions provides automation, software development, AI implementation, and related technology services. All services are subject to our Master Services Agreement.</p>

                    <h2 id="ip">3. Intellectual Property</h2>
                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.1 Our IP</h3>
                    <p>All content on this website, including text, graphics, logos, software, and methodologies, is the property of OASIS AI Solutions and protected by intellectual property laws.</p>
                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.2 Client Projects</h3>
                    <p>Intellectual property rights in client projects are governed by our Master Services Agreement. Key points:</p>
                    <ul>
                        <li>OASIS AI retains all Pre-Existing IP</li>
                        <li>Project IP transfers only upon full payment and compliance</li>
                        <li>OASIS AI retains the right to use general knowledge and skills</li>
                    </ul>

                    <h2 id="obligations">4. Client Obligations</h2>
                    <p>By engaging our services, you agree to:</p>
                    <ul>
                        <li>Provide accurate information</li>
                        <li>Make timely payments as agreed</li>
                        <li>Comply with all terms of our Master Services Agreement</li>
                        <li>Not misuse our Deliverables or confidential information</li>
                    </ul>

                    <h2 id="liability">5. Limitation of Liability</h2>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 my-6">
                        <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, OASIS AI SOLUTIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU IN THE TWELVE MONTHS PRECEDING THE CLAIM.</strong></p>
                    </div>

                    <h2 id="indemnification">6. Indemnification</h2>
                    <p>You agree to indemnify and hold harmless OASIS AI Solutions from any claims arising from your use of our services, your breach of these Terms, or your violation of any rights of another.</p>

                    <h2 id="governing-law">7. Governing Law</h2>
                    <p>These Terms are governed by the laws of the Province of Ontario, Canada.</p>

                    <h2 id="dispute-resolution">8. Dispute Resolution</h2>
                    <p>Any disputes shall be resolved through negotiation, then mediation, before litigation. Litigation shall be brought exclusively in Ontario, Canada.</p>

                    <h2 id="modifications">9. Modifications</h2>
                    <p>We may modify these Terms at any time. Continued use of our services constitutes acceptance of modified Terms.</p>

                    <h2 id="severability">10. Severability</h2>
                    <p>If any provision is found unenforceable, the remaining provisions continue in effect.</p>

                    <h2 id="contact">11. Contact</h2>
                    <div className="bg-gray-800 rounded-lg p-6 my-4 border-l-4 border-purple-500">
                        <p className="text-white font-semibold mb-2">OASIS AI Solutions</p>
                        <p className="text-gray-300 m-0">141 Sixth Street</p>
                        <p className="text-gray-300 m-0">Collingwood, Ontario L9Y 1Z1, Canada</p>
                        <p className="text-gray-300 m-0">Tel: +1 240-332-5062</p>
                        <p className="text-gray-300 m-0">Email: oasisaisolutions@gmail.com</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 my-12 text-center">
                        <p className="text-purple-200 m-0">
                            By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

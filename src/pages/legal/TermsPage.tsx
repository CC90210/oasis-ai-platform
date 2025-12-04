import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard, Ban, RefreshCw, Mail } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="bg-bg-primary min-h-screen font-sans text-text-primary">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-oasis-cyan/10 rounded-full blur-[100px]" />
                </div>

                <div className="section-container relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-oasis-cyan hover:text-oasis-cyan-dark transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Terms of <span className="text-oasis-cyan">Service</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl">
                        Last updated: December 4, 2024
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        {/* Agreement */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                By accessing or using the services provided by OASIS AI Solutions ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and clients of our AI automation services.
                            </p>
                        </div>

                        {/* Services */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Our Services</h2>
                            </div>
                            <div className="space-y-4 text-text-secondary">
                                <p>OASIS AI Solutions provides AI automation services including but not limited to:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>AI chatbot development and deployment</li>
                                    <li>Voice AI agent solutions</li>
                                    <li>Workflow automation using n8n and similar platforms</li>
                                    <li>Email automation systems</li>
                                    <li>Custom AI integrations</li>
                                    <li>Ongoing maintenance and support</li>
                                </ul>
                                <p className="mt-4">
                                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.
                                </p>
                            </div>
                        </div>

                        {/* Payment Terms */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Payment Terms</h2>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>One-time setup fees are due upon project commencement</li>
                                <li>Monthly retainer fees are billed in advance on a recurring basis</li>
                                <li>All prices are in USD unless otherwise specified</li>
                                <li>Late payments may result in service suspension</li>
                                <li>Refunds are handled on a case-by-case basis per our guarantee policy</li>
                                <li>You are responsible for any applicable taxes</li>
                            </ul>
                        </div>

                        {/* Client Responsibilities */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Client Responsibilities</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                As a client, you agree to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Provide accurate and complete information for service setup</li>
                                <li>Maintain the confidentiality of your account credentials</li>
                                <li>Use our services in compliance with all applicable laws</li>
                                <li>Not use our services for illegal, harmful, or fraudulent purposes</li>
                                <li>Not reverse engineer or attempt to extract source code from our solutions</li>
                                <li>Provide timely feedback and approvals during project development</li>
                            </ul>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Ban className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                            </div>
                            <div className="space-y-4 text-text-secondary">
                                <p>
                                    To the maximum extent permitted by law, OASIS AI Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                                </p>
                                <p>
                                    Our total liability for any claim arising from these terms or our services shall not exceed the amount paid by you in the twelve (12) months preceding the claim.
                                </p>
                                <p>
                                    We do not guarantee specific business outcomes, revenue increases, or cost savings from our automation solutions, as results may vary based on implementation and usage.
                                </p>
                            </div>
                        </div>

                        {/* Termination */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Termination</h2>
                            </div>
                            <div className="space-y-4 text-text-secondary">
                                <p>
                                    Either party may terminate the service agreement with 30 days written notice. Upon termination:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Access to our platforms and services will be revoked</li>
                                    <li>You will receive any deliverables completed up to the termination date</li>
                                    <li>Outstanding payments remain due and payable</li>
                                    <li>We may retain certain data as required by law or for legitimate business purposes</li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="space-y-2 text-text-secondary">
                                <p><strong className="text-white">Email:</strong> oasisaisolutions@gmail.com</p>
                                <p><strong className="text-white">Phone:</strong> 705-440-3117</p>
                                <p><strong className="text-white">Location:</strong> Toronto, Ontario, Canada</p>
                            </div>
                        </div>

                        {/* Governing Law */}
                        <div className="mt-8 p-6 border border-white/10 rounded-xl">
                            <p className="text-text-tertiary text-sm text-center">
                                These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;

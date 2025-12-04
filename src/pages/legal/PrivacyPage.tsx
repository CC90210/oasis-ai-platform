import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="bg-bg-primary min-h-screen font-sans text-text-primary">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-16">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-oasis-cyan/10 rounded-full blur-[100px]" />
                </div>

                <div className="section-container relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-oasis-cyan hover:text-oasis-cyan-dark transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Privacy <span className="text-oasis-cyan">Policy</span>
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
                        {/* Introduction */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Introduction</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                OASIS AI Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website oasisai.work or use our AI automation services.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                            </div>
                            <div className="space-y-4 text-text-secondary">
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Personal Information</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Name and contact information (email, phone number)</li>
                                        <li>Business name and industry</li>
                                        <li>Billing and payment information</li>
                                        <li>Account credentials</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Automatically Collected Information</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Device and browser information</li>
                                        <li>IP address and location data</li>
                                        <li>Usage data and analytics</li>
                                        <li>Cookies and similar technologies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
                            </div>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>To provide and maintain our AI automation services</li>
                                <li>To process transactions and send billing information</li>
                                <li>To communicate with you about your account and our services</li>
                                <li>To improve our website and services</li>
                                <li>To send marketing communications (with your consent)</li>
                                <li>To comply with legal obligations</li>
                            </ul>
                        </div>

                        {/* Data Protection */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Data Protection</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information, including:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>SSL/TLS encryption for data in transit</li>
                                <li>Encrypted storage for sensitive data</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and authentication measures</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </div>

                        {/* Your Rights */}
                        <div className="glass-card p-8 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Your Rights</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                Depending on your location, you may have the following rights:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Access to your personal data</li>
                                <li>Correction of inaccurate data</li>
                                <li>Deletion of your data ("right to be forgotten")</li>
                                <li>Data portability</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6 text-oasis-cyan" />
                                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="space-y-2 text-text-secondary">
                                <p><strong className="text-white">Email:</strong> oasisaisolutions@gmail.com</p>
                                <p><strong className="text-white">Phone:</strong> 705-440-3117</p>
                                <p><strong className="text-white">Location:</strong> Toronto, Ontario, Canada</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPage;

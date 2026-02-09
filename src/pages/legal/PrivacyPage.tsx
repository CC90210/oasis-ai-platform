import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
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
                    <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
                    <p className="text-gray-400 mb-8">
                        Version 2026-02-09-v1 · Last Updated: February 9, 2026
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-12 not-prose">
                        <p className="text-purple-200 text-sm m-0">
                            <strong>OASIS AI SOLUTIONS - PRIVACY POLICY</strong>
                            <br /><br />
                            OASIS AI Solutions ("OASIS," "we," "us," or "our") is a sole proprietorship owned and operated by Conaugh McKenna.
                            We respect your privacy and are committed to protecting your personal information through our compliance with this policy.
                        </p>
                    </div>

                    <h2 id="introduction">1. Introduction</h2>
                    <p>
                        This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit
                        the website oasisai.solutions (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                    </p>

                    <h2 id="collection">2. Information We Collect</h2>
                    <p>We collect several types of information from and about users of our Website and Services, including:</p>
                    <ul>
                        <li><strong className="text-white">Personal Information:</strong> By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</li>
                        <li><strong className="text-white">Business Information:</strong> Details regarding your business operations, industry, and automation requirements.</li>
                        <li><strong className="text-white">Technical Information:</strong> About your internet connection, the equipment you use to access our Website, and usage details.</li>
                    </ul>

                    <h2 id="usage">3. How We Use Information</h2>
                    <p>We use information that we collect about you or that you provide to us:</p>
                    <ul>
                        <li>To present our Website and its contents to you.</li>
                        <li>To provide you with information, products, or services that you request from us.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                        <li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
                        <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                        <li>To notify you about changes to our Website or any products or services we offer.</li>
                    </ul>

                    <h2 id="sharing">4. Data Sharing & Disclosure</h2>
                    <p className="font-semibold text-white">We do not sell your personal information to third parties.</p>
                    <p>We may disclose aggregated information about our users without restriction. We may disclose personal information:</p>
                    <ul>
                        <li>To contractors, service providers, and other third parties we use to support our business (e.g., Stripe, OpenAI, Vercel).</li>
                        <li>To fulfill the purpose for which you provide it.</li>
                        <li>For any other purpose disclosed by us when you provide the information.</li>
                        <li>To comply with any court order, law, or legal process.</li>
                        <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of OASIS AI Solutions, our customers, or others.</li>
                    </ul>

                    <h2 id="security">5. Data Security & Protection</h2>
                    <p>
                        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access,
                        use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
                    </p>

                    <h2 id="liability">6. Data Limitation of Liability</h2>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 my-6">
                        <p className="text-red-200 font-semibold m-0 uppercase tracking-wide text-sm">
                            Critical Data Disclaimer
                        </p>
                        <p className="text-red-100 mt-2 mb-0">
                            WHILE WE USE COMMERCIALLY REASONABLE EFFORTS TO PROTECT YOUR DATA, OASIS AI SOLUTIONS IS NOT LIABLE FOR DATA BREACHES,
                            HACKS, OR UNAUTHORIZED ACCESS CAUSED BY VULNERABILITIES IN THIRD-PARTY PLATFORMS (INCLUDING BUT NOT LIMITED TO VERCEL,
                            SUPABASE, STRIPE, OR OPENAI). YOU PROVIDE INFORMATION AT YOUR OWN RISK.
                        </p>
                    </div>
                    <p>
                        Our liability for any data-related incident is strictly limited to the amount specified in Section 5 of our Terms of Service.
                    </p>

                    <h2 id="retention">7. Data Retention</h2>
                    <p>
                        We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for,
                        including for the purposes of satisfying any legal, accounting, or reporting requirements.
                    </p>

                    <h2 id="rights">8. Your Rights & Choices</h2>
                    <p>Depending on your jurisdiction (e.g., Canada, California, EU), you may have the following rights:</p>
                    <ul>
                        <li>The right to access the personal information we hold about you.</li>
                        <li>The right to request that we correct any inaccurate personal information.</li>
                        <li>The right to request the deletion of your personal information (subject to legal retention requirements).</li>
                        <li>The right to withdraw consent for data processing at any time.</li>
                    </ul>

                    <h2 id="cookies">9. Cookies & Tracking</h2>
                    <p>
                        We use cookies and similar tracking technologies to track activity on our Website and hold certain information.
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>

                    <h2 id="international">10. International Transfers</h2>
                    <p>
                        We are based in Canada. Your information may be transferred to—and maintained on—computers located outside of your state,
                        province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                    </p>

                    <h2 id="contact">11. Contact Information</h2>
                    <div className="bg-gray-800 rounded-lg p-6 my-4 border-l-4 border-purple-500">
                        <p className="text-white font-semibold mb-2">OASIS AI Solutions</p>
                        <p className="text-gray-300 m-0">141 Sixth Street</p>
                        <p className="text-gray-300 m-0">Collingwood, Ontario L9Y 1Z1, Canada</p>
                        <p className="text-gray-300 m-0">Tel: +1 240-332-5062</p>
                        <p className="text-gray-300 m-0">Email: legal@oasisai.solutions</p>
                        <p className="text-gray-300 m-0">Attn: Privacy Officer (Conaugh McKenna)</p>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 my-12 text-center">
                        <p className="text-purple-200 m-0">
                            By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
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

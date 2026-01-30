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
                        Version 2026-01-30-v1 · Last Updated: January 30, 2026
                    </p>

                    {/* Table of Contents */}
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-12 not-prose">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Navigation</h2>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <a href="#introduction" className="text-gray-400 hover:text-purple-400 transition">1. Introduction</a>
                            <a href="#collection" className="text-gray-400 hover:text-purple-400 transition">2. Information We Collect</a>
                            <a href="#usage" className="text-gray-400 hover:text-purple-400 transition">3. How We Use Information</a>
                            <a href="#sharing" className="text-gray-400 hover:text-purple-400 transition">4. Data Sharing & Disclosure</a>
                            <a href="#security" className="text-gray-400 hover:text-purple-400 transition">5. Data Security & Protection</a>
                            <a href="#liability" className="text-gray-400 hover:text-purple-400 transition">6. Data Limitation of Liability</a>
                            <a href="#retention" className="text-gray-400 hover:text-purple-400 transition">7. Data Retention</a>
                            <a href="#rights" className="text-gray-400 hover:text-purple-400 transition">8. Your Rights & Choices</a>
                            <a href="#cookies" className="text-gray-400 hover:text-purple-400 transition">9. Cookies & Tracking</a>
                            <a href="#international" className="text-gray-400 hover:text-purple-400 transition">10. International Transfers</a>
                            <a href="#contact" className="text-gray-400 hover:text-purple-400 transition">11. Contact Information</a>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <h2 id="introduction" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">1. Introduction</h2>
                    <p className="text-gray-300">
                        OASIS AI Solutions ("OASIS," "we," "us," or "our") is a sole proprietorship owned and operated by Conaugh McKenna.
                        We respect your privacy and are committed to protecting your personal information through our compliance with this policy.
                    </p>
                    <p className="text-gray-300">
                        This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit
                        the website oasisai.work (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                    </p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 my-6">
                        <p className="text-purple-200 text-sm m-0">
                            <strong>Policy Scope:</strong> This policy applies to information we collect on this Website, in email, text,
                            and other electronic messages between you and this Website, and through our AI automation services.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <h2 id="collection" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">2. Information We Collect</h2>
                    <p className="text-gray-300">We collect several types of information from and about users of our Website and Services, including:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li><strong className="text-white">Personal Information:</strong> By which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</li>
                        <li><strong className="text-white">Business Information:</strong> Details regarding your business operations, industry, and automation requirements.</li>
                        <li><strong className="text-white">Technical Information:</strong> About your internet connection, the equipment you use to access our Website, and usage details.</li>
                    </ul>

                    {/* Section 3 */}
                    <h2 id="usage" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">3. How We Use Information</h2>
                    <p className="text-gray-300">We use information that we collect about you or that you provide to us:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li>To present our Website and its contents to you.</li>
                        <li>To provide you with information, products, or services that you request from us.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                        <li>To provide you with notices about your account/subscription, including expiration and renewal notices.</li>
                        <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                        <li>To notify you about changes to our Website or any products or services we offer.</li>
                    </ul>

                    {/* Section 4 */}
                    <h2 id="sharing" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">4. Data Sharing & Disclosure</h2>
                    <p className="text-gray-300 font-semibold text-white">We do not sell your personal information to third parties.</p>
                    <p className="text-gray-300">We may disclose aggregated information about our users without restriction. We may disclose personal information:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li>To contractors, service providers, and other third parties we use to support our business (e.g., Stripe, OpenAI, Vercel).</li>
                        <li>To fulfill the purpose for which you provide it.</li>
                        <li>For any other purpose disclosed by us when you provide the information.</li>
                        <li>To comply with any court order, law, or legal process.</li>
                        <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of OASIS AI Solutions, our customers, or others.</li>
                    </ul>

                    {/* Section 5 */}
                    <h2 id="security" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">5. Data Security & Protection</h2>
                    <p className="text-gray-300">
                        We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access,
                        use, alteration, and disclosure. All information you provide to us is stored on secure servers behind firewalls.
                    </p>
                    <p className="text-gray-300">
                        The safety and security of your information also depends on you. Where we have given you (or where you have chosen)
                        a password for access to certain parts of our Website, you are responsible for keeping this password confidential.
                    </p>

                    {/* Section 6 - DISCREET PROTECTION (CRITICAL) */}
                    <h2 id="liability" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">6. Data Limitation of Liability</h2>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-6">
                        <p className="text-red-200 font-semibold m-0 uppercase tracking-wide text-sm">
                            Critical Data Disclaimer
                        </p>
                        <p className="text-red-100 mt-2 mb-0">
                            WHILE WE USE COMMERCIALLY REASONABLE EFFORTS TO PROTECT YOUR DATA, OASIS AI SOLUTIONS IS NOT LIABLE FOR DATA BREACHES,
                            HACKS, OR UNAUTHORIZED ACCESS CAUSED BY VULNERABILITIES IN THIRD-PARTY PLATFORMS (INCLUDING BUT NOT LIMITED TO VERCEL,
                            SUPABASE, STRIPE, OR OPENAI). YOU PROVIDE INFORMATION AT YOUR OWN RISK.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        Our liability for any data-related incident is strictly limited to the amount specified in Section 9 of our Terms of Service.
                    </p>

                    {/* Section 7 */}
                    <h2 id="retention" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">7. Data Retention</h2>
                    <p className="text-gray-300">
                        We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for,
                        including for the purposes of satisfying any legal, accounting, or reporting requirements.
                    </p>

                    {/* Section 8 */}
                    <h2 id="rights" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">8. Your Rights & Choices</h2>
                    <p className="text-gray-300">Depending on your jurisdiction (e.g., Canada, California, EU), you may have the following rights:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li>The right to access the personal information we hold about you.</li>
                        <li>The right to request that we correct any inaccurate personal information.</li>
                        <li>The right to request the deletion of your personal information (subject to legal retention requirements).</li>
                        <li>The right to withdraw consent for data processing at any time.</li>
                    </ul>

                    {/* Section 9 */}
                    <h2 id="cookies" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">9. Cookies & Tracking</h2>
                    <p className="text-gray-300">
                        We use cookies and similar tracking technologies to track activity on our Website and hold certain information.
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>

                    {/* Section 10 */}
                    <h2 id="international" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">10. International Transfers</h2>
                    <p className="text-gray-300">
                        We are based in Canada. Your information may be transferred to—and maintained on—computers located outside of your state,
                        province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                    </p>

                    {/* Section 11 */}
                    <h2 id="contact" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">11. Contact Information</h2>
                    <p className="text-gray-300">To ask questions or comment about this privacy policy and our privacy practices, contact us at:</p>
                    <div className="bg-gray-800 rounded-lg p-4 my-4">
                        <p className="text-white font-semibold mb-1">OASIS AI Solutions</p>
                        <p className="text-gray-300 m-0">Email: oasisaisolutions@gmail.com</p>
                        <p className="text-gray-300 m-0">Attn: Privacy Officer (Conaugh McKenna)</p>
                        <p className="text-gray-300 m-0">Collingwood, Ontario, Canada</p>
                    </div>

                    {/* Final Agreement */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 my-12">
                        <p className="text-purple-200 text-center m-0">
                            <strong>By using our website and services, you acknowledge that you have read and understood this Privacy Policy.</strong>
                        </p>
                    </div>

                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          .bg-gray-900 { background: white !important; }
          .text-white, .text-gray-300, .text-gray-400 { color: black !important; }
          .text-purple-400, .text-purple-200 { color: #6b21a8 !important; }
          .text-red-200, .text-red-100 { color: #b91c1c !important; }
          .border-gray-800, .border-red-500\\/30, .border-purple-500\\/30 { border-color: #ccc !important; }
          .bg-gray-800, .bg-gray-800\\/50, .bg-red-500\\/10, .bg-purple-500\\/10 { background: #f3f4f6 !important; }
        }
      `}</style>
        </div>
    );
}

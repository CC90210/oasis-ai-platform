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
                        Version 2026-01-28-v1 · Last Updated: January 28, 2026
                    </p>

                    {/* Table of Contents */}
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-12 not-prose">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Navigation</h2>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                            <a href="#services" className="text-gray-400 hover:text-purple-400 transition">1. Services We Provide</a>
                            <a href="#eligibility" className="text-gray-400 hover:text-purple-400 transition">2. Eligibility</a>
                            <a href="#ai-technology" className="text-gray-400 hover:text-purple-400 transition">3. Understanding AI Technology</a>
                            <a href="#third-party" className="text-gray-400 hover:text-purple-400 transition">4. Third-Party Dependencies</a>
                            <a href="#payment" className="text-gray-400 hover:text-purple-400 transition">5. Payment Terms</a>
                            <a href="#acceptable-use" className="text-gray-400 hover:text-purple-400 transition">6. Acceptable Use</a>
                            <a href="#your-data" className="text-gray-400 hover:text-purple-400 transition">7. Your Data</a>
                            <a href="#ip" className="text-gray-400 hover:text-purple-400 transition">8. Intellectual Property</a>
                            <a href="#liability" className="text-gray-400 hover:text-purple-400 transition">9. Limitation of Liability</a>
                            <a href="#indemnification" className="text-gray-400 hover:text-purple-400 transition">10. Indemnification</a>
                            <a href="#termination" className="text-gray-400 hover:text-purple-400 transition">11. Termination</a>
                            <a href="#disputes" className="text-gray-400 hover:text-purple-400 transition">12. Dispute Resolution</a>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="space-y-4 text-gray-300 text-lg">
                        <p>
                            OASIS AI Solutions is a sole proprietorship legally owned and operated by Conaugh McKenna.
                            The business is registered with the Province of Ontario, Canada, and is based in Collingwood, Ontario.
                        </p>
                        <p>
                            Conaugh McKenna holds 100% ownership of OASIS AI Solutions. There are no partners, shareholders,
                            or equity holders. Any individuals who assist with the business do so as independent contractors,
                            not as partners or owners.
                        </p>
                        <p>
                            These Terms of Service ("Terms") govern your use of services provided by OASIS AI Solutions
                            ("OASIS," "we," "us," or "our"). By purchasing, accessing, or using our services,
                            you ("Client," "you," or "your") agree to be bound by these Terms.
                        </p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 my-6">
                        <p className="text-yellow-200 text-sm m-0">
                            <strong>Please read these Terms carefully.</strong> They include important information about
                            our services, your responsibilities, and limitations on our liability.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <h2 id="services" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">1. Services We Provide</h2>
                    <p className="text-gray-300">
                        OASIS AI Solutions offers AI-powered automation services including:
                    </p>
                    <ul className="text-gray-300 space-y-2">
                        <li>Customer support automation and chatbots</li>
                        <li>Lead generation and qualification systems</li>
                        <li>Appointment booking automation</li>
                        <li>Review management and response systems</li>
                        <li>Voice AI agents</li>
                        <li>Social media automation</li>
                        <li>Website development</li>
                        <li>Custom AI solutions</li>
                    </ul>
                    <p className="text-gray-300">
                        The specific services you receive will be outlined in your order confirmation or service agreement.
                    </p>

                    {/* Section 2 */}
                    <h2 id="eligibility" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">2. Eligibility</h2>
                    <p className="text-gray-300">
                        To use our services, you must be at least 18 years old and able to form a legally binding contract.
                        If you're using our services on behalf of a business, you represent that you have authority to bind
                        that business to these Terms.
                    </p>

                    {/* Section 3 - AI TECHNOLOGY (CRITICAL) */}
                    <h2 id="ai-technology" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">3. Understanding AI Technology</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.1 The Nature of AI</h3>
                    <p className="text-gray-300"><strong className="text-white">You acknowledge and agree that:</strong></p>
                    <ul className="text-gray-300 space-y-2">
                        <li>Artificial intelligence is an evolving technology that may produce unexpected or imperfect results</li>
                        <li>AI outputs require human review and oversight before use with customers</li>
                        <li>AI cannot replace professional judgment in areas like legal, medical, financial, or safety-critical decisions</li>
                        <li>The quality of AI outputs depends significantly on input data and configuration</li>
                        <li>AI systems may occasionally generate content that is inaccurate, inappropriate, or requires correction</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.2 Your Responsibility to Review</h3>
                    <p className="text-gray-300">
                        You agree to review all AI-generated content, responses, and outputs before deploying them to your
                        customers or end users. You are responsible for ensuring AI outputs are appropriate for your specific
                        business context and comply with applicable laws.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">3.3 AI Is Not a Guarantee</h3>
                    <div className="bg-gray-800 rounded-lg p-4 my-4">
                        <p className="text-gray-300 m-0"><strong className="text-white">We do not guarantee that AI services will:</strong></p>
                        <ul className="text-gray-300 space-y-1 mt-2 mb-0">
                            <li>Generate specific revenue increases or business outcomes</li>
                            <li>Produce error-free outputs</li>
                            <li>Work identically across all business contexts</li>
                            <li>Meet regulatory requirements specific to your industry without customization</li>
                            <li>Replace the need for human oversight and judgment</li>
                        </ul>
                    </div>

                    {/* Section 4 - THIRD PARTY (CRITICAL) */}
                    <h2 id="third-party" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">4. Third-Party Dependencies</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">4.1 Platform Reliance</h3>
                    <p className="text-gray-300">
                        Our services integrate with and depend on third-party platforms including but not limited to:
                        Google (Calendar, Business Profile, Ads), Meta (Facebook, Instagram), Twilio, OpenAI, ElevenLabs,
                        various CRM systems, and hosting providers.
                    </p>
                    <p className="text-gray-300"><strong className="text-white">You acknowledge that:</strong></p>
                    <ul className="text-gray-300 space-y-2">
                        <li>Third-party platforms may change their APIs, pricing, terms, or availability at any time</li>
                        <li>Platform outages or changes are beyond our control</li>
                        <li>We cannot guarantee uninterrupted access when third-party services are unavailable</li>
                        <li>Features that depend on third parties may be modified or discontinued if platforms change</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">4.2 No Liability for Third Parties</h3>
                    <p className="text-gray-300">
                        We are not responsible for any losses, damages, or disruptions caused by third-party platform changes,
                        outages, policy updates, or discontinuation of services.
                    </p>

                    {/* Section 5 */}
                    <h2 id="payment" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">5. Payment Terms</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">5.1 Pricing</h3>
                    <p className="text-gray-300">
                        Prices for our services are as quoted in your order confirmation or custom agreement.
                        All prices are in the currency specified at the time of purchase.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">5.2 Payment Methods</h3>
                    <p className="text-gray-300">
                        We accept payment via Stripe. By providing payment information, you authorize us to charge the applicable fees.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">5.3 Recurring Subscriptions</h3>
                    <p className="text-gray-300">
                        If your service includes monthly fees, you authorize recurring charges until you cancel.
                        Cancel anytime with 30 days notice.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">5.4 Refund Policy</h3>
                    <ul className="text-gray-300 space-y-2">
                        <li><strong className="text-white">Setup fees</strong> are non-refundable once work has commenced</li>
                        <li><strong className="text-white">Monthly fees</strong> are non-refundable for the current billing period</li>
                        <li>Refund requests must be submitted within 14 days of payment</li>
                        <li>Disputes are handled in accordance with Section 12</li>
                    </ul>

                    {/* Section 6 */}
                    <h2 id="acceptable-use" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">6. Acceptable Use</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">6.1 You Agree Not to Use Our Services to:</h3>
                    <ul className="text-gray-300 space-y-2">
                        <li>Violate any laws or regulations</li>
                        <li>Generate spam, fraudulent, or deceptive content</li>
                        <li>Harass, threaten, or harm others</li>
                        <li>Infringe on intellectual property rights</li>
                        <li>Process data in violation of privacy laws</li>
                        <li>Engage in activities harmful to minors</li>
                        <li>Circumvent security measures</li>
                        <li>Use automation in ways that violate third-party platform terms</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">6.2 Compliance</h3>
                    <p className="text-gray-300">
                        You are responsible for ensuring your use of our services complies with all laws applicable to your
                        business, including industry-specific regulations, data protection laws, and advertising standards.
                    </p>

                    {/* Section 7 */}
                    <h2 id="your-data" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">7. Your Data</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">7.1 Data Ownership</h3>
                    <p className="text-gray-300">
                        You retain ownership of all data and content you provide to us. We access your data solely to
                        provide the services you've requested.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">7.2 Data Processing</h3>
                    <p className="text-gray-300">
                        We process data in accordance with our <Link to="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>.
                        You are responsible for obtaining necessary consents from your customers before sharing their data with us.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">7.3 Data Security</h3>
                    <p className="text-gray-300">
                        We implement reasonable security measures but cannot guarantee absolute security. You acknowledge
                        that no system is immune to all threats.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">7.4 Data Retention</h3>
                    <p className="text-gray-300">
                        We retain your data for the duration of our business relationship plus 7 years for legal and
                        accounting purposes, unless you request earlier deletion.
                    </p>

                    {/* Section 8 */}
                    <h2 id="ip" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">8. Intellectual Property</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">8.1 Our Property</h3>
                    <p className="text-gray-300">
                        OASIS AI Solutions retains ownership of our software, methodologies, frameworks, code libraries,
                        and proprietary systems. You receive a license to use delivered solutions for your business,
                        not ownership of underlying technology.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">8.2 Your Content</h3>
                    <p className="text-gray-300">
                        You retain ownership of your business content, branding, and data. By using our services, you
                        grant us a limited license to use your content solely to provide the services.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">8.3 Custom Work</h3>
                    <p className="text-gray-300">
                        For custom development projects, ownership and licensing terms will be specified in your service agreement.
                    </p>

                    {/* Section 9 - LIABILITY (CRITICAL) */}
                    <h2 id="liability" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">9. Limitation of Liability</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">9.1 Disclaimer of Warranties</h3>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4">
                        <p className="text-red-200 font-semibold m-0">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
                        </p>
                    </div>
                    <p className="text-gray-300">
                        We specifically disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">9.2 What We're Not Liable For</h3>
                    <div className="bg-gray-800 rounded-lg p-6 my-4 border-l-4 border-red-500">
                        <p className="text-white font-bold mb-4">OASIS AI SOLUTIONS AND CONAUGH MCKENNA SHALL NOT BE LIABLE FOR:</p>
                        <ul className="text-gray-300 space-y-2 mb-0">
                            <li>Indirect, incidental, special, consequential, or punitive damages</li>
                            <li>Lost profits, revenue, data, business opportunities, or anticipated savings</li>
                            <li>Business interruption, loss of goodwill, or reputational damage</li>
                            <li>Damages arising from AI outputs, hallucinations, errors, or automated decisions</li>
                            <li>Issues caused by third-party platform changes, outages, or API deprecation</li>
                            <li>Damages resulting from unauthorized access to your systems or data breaches</li>
                            <li><strong className="text-white">AGGREGATE LIABILITY CAP:</strong> IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF OASIS AI SOLUTIONS FOR ALL CLAIMS EXCEED THE TOTAL FEES PAID BY YOU IN THE <span className="underline">THREE (3) MONTHS</span> PRECEDING THE CLAIM.</li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">9.3 AI-Specific Disclaimer</h3>
                    <p className="text-gray-300"><strong className="text-white">You expressly acknowledge that:</strong></p>
                    <ul className="text-gray-300 space-y-2">
                        <li>AI technology may produce errors, inaccuracies, or unexpected results</li>
                        <li>You are responsible for reviewing and approving all AI outputs before customer deployment</li>
                        <li>Decisions based on AI recommendations are made at your own risk</li>
                        <li>We are not liable for any business decisions, customer interactions, or outcomes influenced by AI systems we provide</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">9.4 Essential Limitation</h3>
                    <p className="text-gray-300">
                        <strong className="text-white">These limitations apply regardless of:</strong> whether we were advised
                        of the possibility of such damages, whether any remedy fails of its essential purpose, or the form
                        of action (contract, tort, or otherwise).
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">9.5 Jurisdictional Variations</h3>
                    <p className="text-gray-300">
                        Some jurisdictions do not allow certain warranty exclusions or liability limitations. In such
                        jurisdictions, our liability is limited to the maximum extent permitted by law.
                    </p>

                    {/* Section 10 - INDEMNIFICATION (CRITICAL) */}
                    <h2 id="indemnification" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">10. Indemnification</h2>
                    <div className="bg-gray-800 p-6 rounded-xl border border-white/5">
                        <p className="text-gray-300">
                            You agree to indemnify, defend, and hold harmless OASIS AI Solutions, its owner (Conaugh McKenna), contractors,
                            and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including absolute indemnity
                            for legal fees and disbursements) arising from or relating to:
                        </p>
                        <ul className="text-gray-300 space-y-2 mt-4">
                            <li>Your use or misuse of our services or AI-generated outputs</li>
                            <li>Your violation of these Terms or any applicable law</li>
                            <li>Your violation of any third-party rights, including intellectual property or privacy rights</li>
                            <li>Any content you create, deploy, or distribute using our services</li>
                            <li>Your business operations, customer interactions, and service delivery</li>
                            <li>Any claims by your customers, employees, or end users</li>
                            <li>Errors or omissions in the data you provide to us</li>
                        </ul>
                    </div>

                    {/* Section 11 */}
                    <h2 id="termination" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">11. Termination</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">11.1 By You</h3>
                    <p className="text-gray-300">
                        You may terminate your service by providing 30 days written notice to oasisaisolutions@gmail.com.
                        You remain responsible for all fees through the termination date.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">11.2 By Us</h3>
                    <p className="text-gray-300">We may suspend or terminate your access immediately if you:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li>Violate these Terms</li>
                        <li>Fail to pay fees when due</li>
                        <li>Engage in fraudulent or illegal activity</li>
                        <li>Use services in a way that harms us, other users, or third parties</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">11.3 Effect of Termination</h3>
                    <p className="text-gray-300">Upon termination:</p>
                    <ul className="text-gray-300 space-y-2">
                        <li>Your access to services ceases</li>
                        <li>You must pay all outstanding fees</li>
                        <li>You may request data export within 30 days</li>
                        <li>Sections 9, 10, and 12 survive termination</li>
                    </ul>

                    {/* Section 12 - DISPUTES (CRITICAL) */}
                    <h2 id="disputes" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">12. Dispute Resolution</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">12.1 Governing Law</h3>
                    <p className="text-gray-300">
                        These Terms are governed by the laws of the Province of Ontario, Canada.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">12.2 Informal Resolution</h3>
                    <p className="text-gray-300">
                        Before filing any formal claim, you agree to contact us at oasisaisolutions@gmail.com to attempt
                        informal resolution. We will work in good faith to resolve disputes within 30 days.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">12.3 Jurisdiction</h3>
                    <p className="text-gray-300">
                        Any disputes not resolved informally shall be resolved exclusively in the courts of Ontario, Canada.
                        You consent to personal jurisdiction in these courts.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">12.4 Class Action Waiver</h3>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4">
                        <p className="text-red-200 font-semibold m-0">
                            YOU AGREE TO RESOLVE DISPUTES WITH US ON AN INDIVIDUAL BASIS ONLY. YOU WAIVE ANY RIGHT TO
                            PARTICIPATE IN CLASS ACTIONS OR CLASS-WIDE ARBITRATION.
                        </p>
                    </div>

                    {/* Section 13 */}
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">13. Changes to These Terms</h2>
                    <p className="text-gray-300">
                        We may update these Terms periodically. We will notify you of material changes by email or through
                        our website. Your continued use of services after changes constitutes acceptance of the updated Terms.
                    </p>

                    {/* Section 14 */}
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">14. General Provisions</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">14.1 Entire Agreement</h3>
                    <p className="text-gray-300">
                        These Terms, along with our Privacy Policy and any service agreements, constitute the complete
                        agreement between you and OASIS AI Solutions.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">14.2 Severability</h3>
                    <p className="text-gray-300">
                        If any provision is found unenforceable, the remaining provisions remain in full force.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">14.3 No Waiver</h3>
                    <p className="text-gray-300">
                        Our failure to enforce any right does not waive that right.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">14.4 Assignment</h3>
                    <p className="text-gray-300">
                        You may not assign these Terms without our consent. We may assign our rights freely.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-3">14.5 Force Majeure</h3>
                    <p className="text-gray-300">
                        We are not liable for delays or failures due to circumstances beyond our reasonable control,
                        including natural disasters, pandemics, internet outages, or government actions.
                    </p>

                    {/* Contact */}
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">15. Contact Us</h2>
                    <p className="text-gray-300">For questions about these Terms:</p>
                    <div className="bg-gray-800 rounded-lg p-4 my-4">
                        <p className="text-white font-semibold mb-1">OASIS AI Solutions</p>
                        <p className="text-gray-300 m-0">Email: oasisaisolutions@gmail.com</p>
                        <p className="text-gray-300 m-0">Location: Collingwood, Ontario, Canada</p>
                    </div>

                    {/* Final Agreement */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 my-12">
                        <p className="text-purple-200 text-center m-0">
                            <strong>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
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
          .text-red-200 { color: #b91c1c !important; }
          .text-yellow-200 { color: #854d0e !important; }
          .border-gray-800, .border-yellow-500\\/30, .border-red-500\\/30, .border-purple-500\\/30 { border-color: #ccc !important; }
          .bg-gray-800, .bg-gray-800\\/50, .bg-yellow-500\\/10, .bg-red-500\\/10, .bg-purple-500\\/10 { background: #f3f4f6 !important; }
        }
      `}</style>
        </div>
    );
}

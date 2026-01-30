import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
                        Last updated: January 9, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-8 pb-20">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                        <div className="glass-card p-8 mb-8">
                            <p className="text-text-secondary leading-relaxed">
                                OASIS AI Solutions ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">1.1 Information You Provide</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li><strong className="text-white">Account Information:</strong> Name, email address, phone number, company name</li>
                                <li><strong className="text-white">Payment Information:</strong> Credit card details, billing address (processed by Stripe)</li>
                                <li><strong className="text-white">Business Information:</strong> Details about your business operations relevant to our services</li>
                                <li><strong className="text-white">Communications:</strong> Messages, emails, and support requests you send us</li>
                                <li><strong className="text-white">Agreement Information:</strong> Digital signatures, NDA acceptances, service preferences</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">1.2 Information Collected Automatically</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li><strong className="text-white">Device Information:</strong> IP address, browser type, operating system</li>
                                <li><strong className="text-white">Usage Data:</strong> Pages visited, features used, time spent on site</li>
                                <li><strong className="text-white">Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">1.3 Information from Third Parties</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li><strong className="text-white">Payment Processors:</strong> Transaction confirmations from Stripe</li>
                                <li><strong className="text-white">Analytics Providers:</strong> Aggregated usage statistics</li>
                                <li><strong className="text-white">Integration Partners:</strong> Data from connected platforms (with your authorization)</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <p className="text-text-secondary mb-4">We use your information to:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Provide, maintain, and improve our Services</li>
                                <li>Process payments and send transaction confirmations</li>
                                <li>Communicate with you about your account and services</li>
                                <li>Respond to your inquiries and support requests</li>
                                <li>Send marketing communications (with your consent)</li>
                                <li>Analyze usage patterns to improve our offerings</li>
                                <li>Detect, prevent, and address technical issues or fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing and Disclosure</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.1 We Do Not Sell Your Information</h3>
                            <p className="text-text-secondary font-semibold">We do not sell, rent, or trade your personal information to third parties.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.2 Service Providers</h3>
                            <p className="text-text-secondary mb-2">We may share information with trusted service providers who assist us in operating our business, including:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li><strong className="text-white">Payment Processing:</strong> Stripe (for payment transactions)</li>
                                <li><strong className="text-white">Hosting:</strong> Vercel, Supabase (for website and database hosting)</li>
                                <li><strong className="text-white">Email:</strong> Communication service providers</li>
                                <li><strong className="text-white">Analytics:</strong> Usage tracking and analysis tools</li>
                            </ul>
                            <p className="text-text-secondary mt-2">These providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.3 Legal Requirements</h3>
                            <p className="text-text-secondary mb-2">We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Comply with legal obligations</li>
                                <li>Protect our rights or property</li>
                                <li>Prevent fraud or illegal activity</li>
                                <li>Protect the safety of our users or the public</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">3.4 Business Transfers</h3>
                            <p className="text-text-secondary">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                        </div>

                        {/* Section 4 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p className="text-text-secondary mb-4">We implement appropriate technical and organizational measures to protect your information, including:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>SSL/TLS encryption for data in transit</li>
                                <li>Encrypted storage for sensitive data</li>
                                <li>Access controls and authentication</li>
                                <li>Regular security assessments</li>
                                <li>Employee training on data protection</li>
                            </ul>
                            <p className="text-text-secondary mt-4">However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
                        </div>

                        {/* Section 5 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                            <p className="text-text-secondary mb-4">We retain your information for:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li><strong className="text-white">Account Data:</strong> Duration of your account plus 7 years</li>
                                <li><strong className="text-white">Transaction Records:</strong> 7 years (for legal and tax purposes)</li>
                                <li><strong className="text-white">Communications:</strong> 3 years after last interaction</li>
                                <li><strong className="text-white">Analytics Data:</strong> 2 years in aggregated form</li>
                            </ul>
                            <p className="text-text-secondary mt-4">You may request deletion of your data, subject to legal retention requirements.</p>
                        </div>

                        {/* Section 6 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.1 Access and Correction</h3>
                            <p className="text-text-secondary">You may access and update your account information through the client portal or by contacting us.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.2 Data Portability</h3>
                            <p className="text-text-secondary">You may request a copy of your data in a structured, machine-readable format.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.3 Deletion</h3>
                            <p className="text-text-secondary">You may request deletion of your personal information. We will comply unless we have a legal obligation to retain it.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.4 Marketing Opt-Out</h3>
                            <p className="text-text-secondary mb-2">You may opt out of marketing communications at any time by:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Clicking "unsubscribe" in any marketing email</li>
                                <li>Contacting us directly</li>
                                <li>Updating your preferences in the client portal</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.5 Cookies</h3>
                            <p className="text-text-secondary">You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.</p>
                        </div>

                        {/* Section 7 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">7.1 Types of Cookies We Use</h3>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li><strong className="text-white">Essential Cookies:</strong> Required for site functionality</li>
                                <li><strong className="text-white">Preference Cookies:</strong> Remember your settings and choices</li>
                                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how you use our site</li>
                                <li><strong className="text-white">Marketing Cookies:</strong> Used to deliver relevant advertisements (if applicable)</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">7.2 Third-Party Analytics</h3>
                            <p className="text-text-secondary">We use analytics services (such as Vercel Analytics) to collect and analyze usage data. These services may use cookies and similar technologies.</p>
                        </div>

                        {/* Section 8 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
                            <p className="text-text-secondary">Our services are hosted in Canada and the United States. If you access our services from outside these countries, your information may be transferred to and processed in these jurisdictions.</p>
                        </div>

                        {/* Section 9 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                            <p className="text-text-secondary">Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will delete it promptly.</p>
                        </div>

                        {/* Section 10 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">10. California Privacy Rights</h2>
                            <p className="text-text-secondary mb-4">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Right to know what personal information we collect</li>
                                <li>Right to delete your personal information</li>
                                <li>Right to opt out of the sale of personal information (we do not sell your information)</li>
                                <li>Right to non-discrimination for exercising your rights</li>
                            </ul>
                        </div>

                        {/* Section 11 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">11. Canadian Privacy Rights</h2>
                            <p className="text-text-secondary mb-4">We comply with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy laws. Canadian residents have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Access their personal information</li>
                                <li>Challenge the accuracy and completeness of their information</li>
                                <li>Withdraw consent for certain data uses</li>
                            </ul>
                        </div>

                        {/* Section 12 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Policy</h2>
                            <p className="text-text-secondary mb-4">We may update this Privacy Policy from time to time. We will notify you of significant changes by:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Posting the updated policy on our website</li>
                                <li>Updating the "Last Updated" date</li>
                                <li>Sending an email notification for material changes</li>
                            </ul>
                            <p className="text-text-secondary mt-4">Your continued use of our Services after changes constitutes acceptance of the updated policy.</p>
                        </div>

                        {/* Section 13 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                            <p className="text-text-secondary mb-4">For questions, concerns, or requests regarding this Privacy Policy or your personal information, contact us at:</p>
                            <div className="space-y-2 text-text-secondary">
                                <p><strong className="text-white">OASIS AI Solutions</strong></p>
                                <p><strong className="text-white">Email:</strong> oasisaisolutions@gmail.com</p>
                                <p><strong className="text-white">Phone:</strong> +1 (240) 332-5062</p>
                                <p><strong className="text-white">Location:</strong> Collingwood, Ontario, Canada</p>
                                <p className="mt-4"><strong className="text-white">Privacy Officer:</strong> Conaugh McKenna</p>
                                <p><strong className="text-white">Response Time:</strong> We aim to respond to all privacy inquiries within 30 days.</p>
                            </div>
                        </div>

                        {/* Final Notice */}
                        <div className="p-6 border border-oasis-cyan/30 rounded-xl bg-oasis-cyan/5">
                            <p className="text-text-secondary text-center font-semibold">
                                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPage;

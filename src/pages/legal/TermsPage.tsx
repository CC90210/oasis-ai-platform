import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
                                Welcome to OASIS AI Solutions ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website, services, automations, and any related products (collectively, the "Services").
                            </p>
                            <p className="text-text-secondary leading-relaxed mt-4">
                                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, do not use our Services.
                            </p>
                        </div>

                        {/* Section 1 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Services Description</h2>
                            <p className="text-text-secondary mb-4">OASIS AI Solutions provides AI-powered automation services, including but not limited to:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Customer support automation</li>
                                <li>Lead generation systems</li>
                                <li>Appointment booking solutions</li>
                                <li>Review management tools</li>
                                <li>Social media automation</li>
                                <li>Voice AI agents</li>
                                <li>Website development</li>
                                <li>Custom software solutions</li>
                            </ul>
                            <p className="text-text-secondary mt-4">
                                The specific features and functionality of your Services will be outlined in your individual service agreement or order confirmation.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
                            <p className="text-text-secondary">
                                You must be at least 18 years old and capable of forming a binding contract to use our Services. By using our Services, you represent and warrant that you meet these requirements.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
                            <p className="text-text-secondary mb-4">To access certain features, you may need to create an account. You agree to:</p>
                            <ul className="list-disc list-inside space-y-2 text-text-secondary">
                                <li>Provide accurate, current, and complete information</li>
                                <li>Maintain the security of your password and account</li>
                                <li>Promptly update any changes to your information</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Notify us immediately of any unauthorized access</li>
                            </ul>
                            <p className="text-text-secondary mt-4">We reserve the right to suspend or terminate accounts that violate these Terms.</p>
                        </div>

                        {/* Section 4 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">4.1 Pricing</h3>
                            <p className="text-text-secondary">All prices are quoted in the currency specified at the time of purchase (USD or CAD). Prices are subject to change with 30 days' notice for ongoing subscriptions.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">4.2 Payment</h3>
                            <p className="text-text-secondary">Payment is due according to the terms specified in your service agreement. For subscriptions, you authorize us to charge your payment method on a recurring basis.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">4.3 Refunds</h3>
                            <p className="text-text-secondary font-semibold">Setup fees and one-time payments are non-refundable.</p>
                            <p className="text-text-secondary mt-2">Monthly subscription fees may be refunded on a pro-rata basis at our sole discretion if you cancel within the first 14 days of service and the automation has not been deployed.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">4.4 Late Payments</h3>
                            <p className="text-text-secondary mb-2">Late payments may result in:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Service suspension after 7 days</li>
                                <li>Service termination after 30 days</li>
                                <li>Collection efforts and associated costs</li>
                                <li>Interest charges of 1.5% per month on overdue amounts</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Service Level and Performance</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">5.1 Uptime</h3>
                            <p className="text-text-secondary">We strive to maintain 99.9% uptime for our automation services. However, we do not guarantee uninterrupted service and are not liable for any downtime or service interruptions.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">5.2 Results</h3>
                            <p className="text-text-secondary font-semibold">We do not guarantee specific results from our Services.</p>
                            <p className="text-text-secondary mt-2">The effectiveness of automations depends on many factors outside our control, including but not limited to:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary mt-2">
                                <li>Quality of your existing data</li>
                                <li>Your business processes</li>
                                <li>Third-party platform availability</li>
                                <li>Customer behavior</li>
                                <li>Market conditions</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">5.3 Third-Party Dependencies</h3>
                            <p className="text-text-secondary">Our Services may rely on third-party platforms (e.g., email providers, CRM systems, social media platforms). We are not responsible for changes, outages, or limitations imposed by these third parties.</p>
                        </div>

                        {/* Section 6 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.1 Our Property</h3>
                            <p className="text-text-secondary">All intellectual property rights in our Services, including software, designs, methodologies, and documentation, remain our exclusive property. You receive only a limited license to use the Services as described herein.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.2 Your Content</h3>
                            <p className="text-text-secondary">You retain ownership of your data and content. By using our Services, you grant us a limited license to use, process, and store your content solely to provide the Services.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">6.3 Custom Development</h3>
                            <p className="text-text-secondary mb-2">For custom solutions and website development:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>We retain ownership of underlying code, frameworks, and methodologies</li>
                                <li>You receive a perpetual license to use the delivered solution for your business</li>
                                <li>Source code transfer may be negotiated separately</li>
                            </ul>
                        </div>

                        {/* Section 7 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">7. Confidentiality</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">7.1 Your Information</h3>
                            <p className="text-text-secondary">We will maintain the confidentiality of your business information and will not disclose it to third parties except as necessary to provide the Services or as required by law.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">7.2 Custom Pricing</h3>
                            <p className="text-text-secondary">If you have a custom pricing agreement with us, the terms of that agreement are confidential and subject to the Non-Disclosure Agreement you signed.</p>
                        </div>

                        {/* Section 8 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">8. Data Protection</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">8.1 Data Processing</h3>
                            <p className="text-text-secondary">We process data in accordance with our Privacy Policy. You are responsible for ensuring you have the right to share any personal data with us and that such sharing complies with applicable laws.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">8.2 Data Security</h3>
                            <p className="text-text-secondary">We implement reasonable security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">8.3 Data Retention</h3>
                            <p className="text-text-secondary">We retain your data for the duration of our business relationship plus 7 years, or as required by law. Upon termination, you may request data export within 30 days.</p>
                        </div>

                        {/* Section 9 - IMPORTANT */}
                        <div className="glass-card p-8 mb-8 border-2 border-yellow-500/30">
                            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">9.1 Disclaimer of Warranties</h3>
                            <p className="text-text-secondary font-semibold uppercase">THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">9.2 Limitation of Damages</h3>
                            <p className="text-text-secondary font-semibold uppercase mb-2">TO THE MAXIMUM EXTENT PERMITTED BY LAW, OASIS AI SOLUTIONS SHALL NOT BE LIABLE FOR ANY:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                                <li>Loss of profits, revenue, data, or business opportunities</li>
                                <li>Damages arising from service interruptions or errors</li>
                                <li>Damages exceeding the total fees paid by you in the 12 months preceding the claim</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">9.3 Essential Purpose</h3>
                            <p className="text-text-secondary font-semibold">These limitations apply even if we have been advised of the possibility of such damages and regardless of whether any remedy fails of its essential purpose.</p>
                        </div>

                        {/* Section 10 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                            <p className="text-text-secondary mb-2">You agree to indemnify, defend, and hold harmless OASIS AI Solutions and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Your use of the Services</li>
                                <li>Your violation of these Terms</li>
                                <li>Your violation of any third-party rights</li>
                                <li>Any content you provide through the Services</li>
                                <li>Your business operations and customer interactions</li>
                            </ul>
                        </div>

                        {/* Section 11 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">11.1 By You</h3>
                            <p className="text-text-secondary">You may terminate your account at any time by providing written notice. You remain responsible for all fees incurred prior to termination.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">11.2 By Us</h3>
                            <p className="text-text-secondary mb-2">We may suspend or terminate your access immediately if you:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Violate these Terms</li>
                                <li>Fail to pay fees when due</li>
                                <li>Engage in fraudulent or illegal activity</li>
                                <li>Use the Services in a way that harms us or other users</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">11.3 Effect of Termination</h3>
                            <p className="text-text-secondary mb-2">Upon termination:</p>
                            <ul className="list-disc list-inside space-y-1 text-text-secondary">
                                <li>Your access to Services will cease</li>
                                <li>You must pay all outstanding fees</li>
                                <li>We may delete your data after 30 days (unless legally required to retain)</li>
                                <li>Sections 6, 9, 10, and 13 survive termination</li>
                            </ul>
                        </div>

                        {/* Section 12 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">12.1 Governing Law</h3>
                            <p className="text-text-secondary">These Terms are governed by the laws of the Province of Ontario, Canada, without regard to conflict of law principles.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">12.2 Jurisdiction</h3>
                            <p className="text-text-secondary">Any disputes shall be resolved exclusively in the courts of Ontario, Canada. You consent to personal jurisdiction in these courts.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">12.3 Arbitration Option</h3>
                            <p className="text-text-secondary">At our sole discretion, we may elect to resolve disputes through binding arbitration administered by a recognized arbitration body in Ontario.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">12.4 Class Action Waiver</h3>
                            <p className="text-text-secondary font-semibold uppercase">YOU AGREE TO RESOLVE DISPUTES WITH US ON AN INDIVIDUAL BASIS AND WAIVE ANY RIGHT TO PARTICIPATE IN CLASS ACTIONS.</p>
                        </div>

                        {/* Section 13 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">13. General Provisions</h2>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.1 Entire Agreement</h3>
                            <p className="text-text-secondary">These Terms, together with our Privacy Policy and any service agreements, constitute the entire agreement between you and OASIS AI Solutions.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.2 Modifications</h3>
                            <p className="text-text-secondary">We may modify these Terms at any time. Continued use of the Services after changes constitutes acceptance of the modified Terms.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.3 Severability</h3>
                            <p className="text-text-secondary">If any provision is found unenforceable, the remaining provisions remain in full force and effect.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.4 No Waiver</h3>
                            <p className="text-text-secondary">Our failure to enforce any right or provision does not constitute a waiver of that right or provision.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.5 Assignment</h3>
                            <p className="text-text-secondary">You may not assign these Terms without our written consent. We may assign our rights and obligations freely.</p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-2">13.6 Force Majeure</h3>
                            <p className="text-text-secondary">We are not liable for delays or failures due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, strikes, or internet outages.</p>
                        </div>

                        {/* Section 14 */}
                        <div className="glass-card p-8 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                            <p className="text-text-secondary mb-4">For questions about these Terms, contact us at:</p>
                            <div className="space-y-2 text-text-secondary">
                                <p><strong className="text-white">OASIS AI Solutions</strong></p>
                                <p><strong className="text-white">Email:</strong> oasisaisolutions@gmail.com</p>
                                <p><strong className="text-white">Phone:</strong> 705-440-3117</p>
                                <p><strong className="text-white">Location:</strong> Ontario, Canada</p>
                            </div>
                        </div>

                        {/* Final Notice */}
                        <div className="p-6 border border-oasis-cyan/30 rounded-xl bg-oasis-cyan/5">
                            <p className="text-text-secondary text-center font-semibold">
                                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;

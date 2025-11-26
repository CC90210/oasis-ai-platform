import { motion } from 'framer-motion';
import { CheckCircle, X, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PricingPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: "What's included in the monthly retainer?",
            answer: "The monthly retainer covers all the software subscriptions and API credits that power your automations: OpenAI/Claude API usage, n8n hosting, voice AI costs, monitoring systems, and priority technical support. It's like paying your AI employees' salaries to keep them working 24/7."
        },
        {
            question: "Can I cancel the monthly retainer?",
            answer: "Yes, but your automations will stop functioning as we can no longer maintain the underlying infrastructure. We can provide handoff documentation if you wish to self-manage, but most clients prefer the peace of mind of ongoing support."
        },
        {
            question: "How much do additional workflows cost?",
            answer: "Additional workflows beyond your package are quoted separately based on complexity. Simple workflows start around $500-$1000 one-time. Complex workflows with advanced AI features range from $1500-$3000. The monthly retainer covers maintaining all your workflows regardless of how many you have."
        },
        {
            question: "Do you offer payment plans?",
            answer: "Yes! We can split the one-time fee across 2-3 months for the Integration Suite. Contact us to discuss payment arrangements that work for your cash flow."
        },
        {
            question: "What if I need changes to my automations?",
            answer: "Minor tweaks and optimization are included in your monthly retainer. Major feature additions or new workflows are quoted separately. We'll always give you a clear price before doing any additional work."
        },
        {
            question: "How quickly will I see ROI?",
            answer: "Most clients report saving 15-25 hours per week within the first month. At an average hourly value of $50-$100, the Launchpad pays for itself in 2-3 weeks. The Integration Suite typically pays for itself within the first 30-45 days."
        }
    ];

    return (
        <div className="bg-deep-black min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-dark py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Simple, <span className="text-neon">Transparent</span> Pricing
                        </h1>
                        <p className="text-xl text-light-gray">
                            No hidden fees. No surprises. Just honest pricing for world-class automation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Launchpad */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300"
                        >
                            <h3 className="text-3xl font-display font-bold mb-2">OASIS Launchpad</h3>
                            <p className="text-light-gray mb-6">Perfect for getting started</p>

                            <div className="mb-6">
                                <div className="text-5xl font-bold text-neon mb-2">$997</div>
                                <div className="text-light-gray mb-1">one-time setup fee</div>
                                <div className="text-2xl font-bold text-white">+ $497/month</div>
                                <div className="text-sm text-light-gray">retainer (keeps your automation running)</div>
                            </div>

                            <div className="mb-8 p-4 rounded-lg bg-dark-navy/50 border border-neon/20">
                                <p className="text-sm text-light-gray">
                                    <span className="text-neon font-semibold">What you get:</span> One custom automation workflow that permanently transforms how you work. This is not a subscription—it's infrastructure you own.
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "1 custom automation workflow (your choice)",
                                    "AI chatbot integration for website",
                                    "Initial setup, configuration & deployment",
                                    "Operator training session (recorded + live)",
                                    "30 days of technical support",
                                    "Documentation and handoff materials",
                                    "5-day delivery timeline"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                                        <span className="text-light-gray">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="btn-secondary w-full">
                                    Get Started
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* Integration Suite */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-gradient-dark border-2 border-neon shadow-neon-strong relative"
                        >
                            <div className="absolute top-0 right-8 bg-neon text-black px-4 py-1 rounded-b-lg font-bold text-sm">
                                MOST POPULAR
                            </div>

                            <h3 className="text-3xl font-display font-bold mb-2 mt-4">OASIS Integration Suite</h3>
                            <p className="text-light-gray mb-6">Comprehensive multi-channel automation</p>

                            <div className="mb-6">
                                <div className="text-5xl font-bold text-neon mb-2">$3,500 - $6,500</div>
                                <div className="text-light-gray mb-1">one-time implementation fee</div>
                                <div className="text-2xl font-bold text-white">+ $497/month</div>
                                <div className="text-sm text-light-gray">retainer (keeps all automations running)</div>
                            </div>

                            <div className="mb-8 p-4 rounded-lg bg-neon/10 border border-neon/30">
                                <p className="text-sm text-white">
                                    <span className="text-neon font-semibold">Price breakdown:</span>
                                </p>
                                <ul className="text-sm text-light-gray mt-2 space-y-1">
                                    <li>• $3,500: 3 workflows + chatbot</li>
                                    <li>• $4,500-$5,500: Complex integrations, 4-5 workflows</li>
                                    <li>• $6,500: Voice AI, advanced RAG, 5+ systems</li>
                                </ul>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "3-5 custom automation workflows",
                                    "AI-powered website chatbot (custom personality)",
                                    "Phone automation system (voice AI)",
                                    "CRM integration and synchronization",
                                    "Multi-channel automation (email, SMS, chat)",
                                    "Calendar and scheduling automation",
                                    "Integration with existing software stack",
                                    "Real-time analytics dashboard",
                                    "90 days of optimization and support",
                                    "Comprehensive documentation and training",
                                    "7-14 day delivery timeline"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                                        <span className="text-white font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="btn-primary w-full">
                                    Book Consultation
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Feature Comparison */}
                    <div className="mt-16 max-w-6xl mx-auto">
                        <h3 className="text-3xl font-display font-bold text-center mb-8">
                            Detailed <span className="text-neon">Comparison</span>
                        </h3>
                        <div className="glass-effect rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-dark-navy">
                                    <tr>
                                        <th className="text-left p-4 text-white font-display">Feature</th>
                                        <th className="text-center p-4 text-white font-display">Launchpad</th>
                                        <th className="text-center p-4 text-white font-display">Integration Suite</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neon/10">
                                    {[
                                        ["Custom Workflows", "1", "3-5"],
                                        ["AI Chatbot", "✓", "✓ (Advanced)"],
                                        ["Voice AI", "✗", "✓"],
                                        ["CRM Integration", "✗", "✓"],
                                        ["Multi-channel", "✗", "✓"],
                                        ["Analytics Dashboard", "Basic", "Advanced"],
                                        ["Support Duration", "30 days", "90 days"],
                                        ["Delivery Time", "3-5 days", "7-14 days"]
                                    ].map(([feature, basic, pro], index) => (
                                        <tr key={index} className="hover:bg-dark-navy/30 transition-colors">
                                            <td className="p-4 text-light-gray">{feature}</td>
                                            <td className="p-4 text-center text-white">{basic}</td>
                                            <td className="p-4 text-center text-neon font-semibold">{pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Frequently Asked <span className="text-neon">Questions</span>
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-dark-navy/30 transition-colors"
                                >
                                    <span className="font-display font-bold text-lg text-white">{faq.question}</span>
                                    <HelpCircle className={`w-6 h-6 text-neon flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-light-gray">
                                        {faq.answer}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Still Have <span className="text-neon">Questions</span>?
                        </h2>
                        <p className="text-xl text-light-gray mb-10">
                            Book a free 15-minute call and we'll help you choose the right package for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg">
                                    Book Free Strategy Call
                                </button>
                            </Link>
                            <a href="tel:705-440-3117">
                                <button className="btn-secondary text-lg">
                                    Call 705-440-3117
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;

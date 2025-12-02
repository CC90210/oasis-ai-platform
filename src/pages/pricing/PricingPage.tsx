import { useState } from 'react';
import { CheckCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="bg-bg-primary min-h-screen overflow-x-hidden font-sans text-text-primary">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-8"
                        >
                            Simple, <span className="text-oasis-cyan">Transparent</span> Pricing
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            No hidden fees. No surprises. Just honest pricing for world-class automation.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Launchpad */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col"
                        >
                            <h3 className="text-3xl font-display font-bold mb-2 text-white">OASIS Launchpad</h3>
                            <p className="text-text-secondary mb-8">Perfect for getting started</p>

                            <div className="mb-8 p-6 rounded-2xl bg-bg-tertiary border border-white/5">
                                <div className="text-5xl font-bold text-oasis-cyan mb-2">$997</div>
                                <div className="text-text-tertiary text-sm mb-4">one-time setup fee</div>
                                <div className="text-2xl font-bold text-white">+ $497/month</div>
                                <div className="text-sm text-text-tertiary">retainer (keeps your automation running)</div>
                            </div>

                            <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                                <p className="text-sm text-text-secondary">
                                    <span className="text-oasis-cyan font-semibold">What you get:</span> One custom automation workflow that permanently transforms how you work. This is not a subscription—it's infrastructure you own.
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
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
                                        <CheckCircle className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                        <span className="text-text-secondary">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/checkout?agent=launchpad" className="mt-auto">
                                <button className="btn-primary w-full py-4 text-lg shadow-oasis">
                                    Get Started
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* Integration Suite */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 border-oasis-cyan relative flex flex-col transform md:-translate-y-4 shadow-oasis"
                        >
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-oasis-cyan text-bg-primary px-6 py-2 rounded-full font-bold text-sm shadow-lg tracking-wide">
                                MOST POPULAR
                            </div>

                            <h3 className="text-3xl font-display font-bold mb-2 mt-4 text-white">OASIS Integration Suite</h3>
                            <p className="text-text-secondary mb-8">Comprehensive multi-channel automation</p>

                            <div className="mb-8 p-6 rounded-2xl bg-bg-tertiary border border-oasis-cyan/30">
                                <div className="text-5xl font-bold text-oasis-cyan mb-2">$3,500 - $6,500</div>
                                <div className="text-text-tertiary text-sm mb-4">one-time implementation fee</div>
                                <div className="text-2xl font-bold text-white">+ $497/month</div>
                                <div className="text-sm text-text-tertiary">retainer (keeps all automations running)</div>
                            </div>

                            <div className="mb-8 p-4 rounded-xl bg-oasis-cyan/10 border border-oasis-cyan/30">
                                <p className="text-sm text-white mb-2">
                                    <span className="text-oasis-cyan font-semibold">Price breakdown:</span>
                                </p>
                                <ul className="text-sm text-text-secondary space-y-1">
                                    <li>• $3,500: 3 workflows + chatbot</li>
                                    <li>• $4,500-$5,500: Complex integrations, 4-5 workflows</li>
                                    <li>• $6,500: Voice AI, advanced RAG, 5+ systems</li>
                                </ul>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
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
                                        <CheckCircle className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                        <span className="text-white font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="mt-auto">
                                <button className="btn-primary w-full py-4 text-lg shadow-oasis">
                                    Book Consultation
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Feature Comparison */}
                    <div className="mt-24 max-w-6xl mx-auto">
                        <h3 className="text-3xl font-display font-bold text-center mb-12">
                            Detailed <span className="text-oasis-cyan">Comparison</span>
                        </h3>
                        <div className="glass-card overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="text-left p-6 text-white font-display text-lg">Feature</th>
                                        <th className="text-center p-6 text-white font-display text-lg">Launchpad</th>
                                        <th className="text-center p-6 text-white font-display text-lg">Integration Suite</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
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
                                        <tr key={index} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6 text-text-secondary font-medium">{feature}</td>
                                            <td className="p-6 text-center text-white">{basic}</td>
                                            <td className="p-6 text-center text-oasis-cyan font-bold">{pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-bg-primary">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Frequently Asked <span className="text-oasis-cyan">Questions</span>
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass-card overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors focus:outline-none"
                                >
                                    <span className="font-display font-bold text-lg text-white">{faq.question}</span>
                                    {openFaq === index ? <ChevronUp className="w-6 h-6 text-oasis-cyan" /> : <ChevronDown className="w-6 h-6 text-text-tertiary" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-text-secondary leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-oasis-cyan/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                            Still Have <span className="text-oasis-cyan">Questions</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                            Book a free 15-minute call and we'll help you choose the right package for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300">
                                    Book Free Strategy Call
                                </button>
                            </Link>
                            <a href="tel:705-440-3117">
                                <button className="btn-secondary text-lg px-10 py-5 hover:bg-white/10">
                                    Call 705-440-3117
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;

import { useState } from 'react';
import { CheckCircle, ArrowRight, ChevronDown, ChevronUp, Zap, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { agents, bundles } from '@/data/products';
import { useCart } from '@/store/cartStore';

const PricingPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { addItem } = useCart();

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
                            Transparent <span className="text-oasis-cyan">Pricing</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Choose a bundle for maximum value, or select individual agents to solve specific problems.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Bundles Section */}
            <section className="py-12 bg-bg-secondary">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">Popular Bundles</h2>
                        <p className="text-text-secondary">Complete automation solutions for your business.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Launchpad */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col border border-white/5 hover:border-oasis-cyan/30 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-oasis-cyan/10 rounded-lg">
                                    <Zap className="w-8 h-8 text-oasis-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">{bundles.launchpad.title}</h3>
                                    <p className="text-text-tertiary text-sm">Best for getting started</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-4xl font-bold text-oasis-cyan mb-2">${bundles.launchpad.price}</div>
                                <div className="text-text-tertiary text-sm">one-time setup fee</div>
                            </div>

                            <p className="text-text-secondary mb-8">{bundles.launchpad.description}</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {bundles.launchpad.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                        <span className="text-text-secondary">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => addItem('launchpad', 'bundle')}
                                className="mt-auto btn-secondary w-full py-4 text-lg"
                            >
                                Add to Cart
                            </button>
                        </motion.div>

                        {/* Integration Suite */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col border border-oasis-cyan/50 relative shadow-oasis"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oasis-cyan text-bg-primary px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                                MOST POPULAR
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-oasis-cyan/20 rounded-lg">
                                    <Layers className="w-8 h-8 text-oasis-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">{bundles['integration-suite'].title}</h3>
                                    <p className="text-text-tertiary text-sm">For scaling businesses</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-4xl font-bold text-oasis-cyan mb-2">${bundles['integration-suite'].price}</div>
                                <div className="text-text-tertiary text-sm">one-time setup fee</div>
                            </div>

                            <p className="text-text-secondary mb-8">{bundles['integration-suite'].description}</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {bundles['integration-suite'].features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                        <span className="text-white font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="mt-auto">
                                <button className="btn-primary w-full py-4 text-lg shadow-oasis">
                                    Book Consultation
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Individual Agents Section */}
            <section className="py-20 bg-bg-primary">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">A La Carte Agents</h2>
                        <p className="text-text-secondary">Specific solutions for specific problems. Mix and match to build your workforce.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {Object.entries(agents).map(([slug, agent], index) => {
                            const Icon = agent.icon;
                            return (
                                <motion.div
                                    key={slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-6 flex flex-col hover:border-oasis-cyan/30 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-bg-tertiary rounded-lg group-hover:bg-oasis-cyan/10 transition-colors">
                                            <Icon className="w-6 h-6 text-oasis-cyan" />
                                        </div>
                                        <div className="text-xl font-bold text-white">${agent.price}</div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{agent.title}</h3>
                                    <p className="text-text-secondary text-sm mb-6 flex-1">{agent.description}</p>

                                    <ul className="space-y-2 mb-6">
                                        {agent.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-xs text-text-tertiary">
                                                <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => addItem(slug as any, 'agent')}
                                        className="w-full btn-secondary py-2 text-sm group-hover:bg-oasis-cyan group-hover:text-bg-primary transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-bg-secondary">
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
        </div>
    );
};

export default PricingPage;

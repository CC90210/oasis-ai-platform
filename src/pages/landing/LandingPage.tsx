import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, MessageSquare, Calendar, Mail, Database, Phone, Star, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { NeuralNetworkBackground } from '../../components/animations/NeuralNetworkBackground';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    const [roiInputs, setRoiInputs] = useState({
        hoursPerWeek: 10,
        hourlyRate: 50,
        missedLeads: 10,
        leadValue: 100
    });

    const calculateROI = () => {
        const monthlyTimeSavings = roiInputs.hoursPerWeek * 4 * roiInputs.hourlyRate;
        const monthlyLeadRevenue = roiInputs.missedLeads * roiInputs.leadValue;
        const totalMonthlyValue = monthlyTimeSavings + monthlyLeadRevenue;
        return {
            monthly: totalMonthlyValue,
            annual: totalMonthlyValue * 12
        };
    };

    const roi = calculateROI();

    const faqs = [
        { q: "How long does implementation take?", a: "For individual agents, we can have you up and running in 3-5 business days. Custom integration suites typically take 7-14 days depending on complexity." },
        { q: "What's included in the monthly retainer?", a: "The retainer covers server hosting, API credits (OpenAI, Anthropic, etc.), ongoing maintenance, bug fixes, and support. It ensures your AI employees keep working 24/7." },
        { q: "Can I start small and add more later?", a: "Absolutely. Many clients start with a single agent (like our Website Chat Widget) and expand to full automation suites as they see the ROI." },
        { q: "What industries do you work with?", a: "We specialize in HVAC, fitness, wellness, beauty, e-commerce, and professional services, but our agents can be trained for any industry." },
        { q: "Do I need technical knowledge?", a: "None at all. We handle all the technical setup, integration, and maintenance. You just tell us what you need the AI to do." },
        { q: "What happens if something breaks?", a: "Our systems have 99.9% uptime monitoring. If an issue occurs, our team is alerted immediately and typically resolves it before you even notice." }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="bg-bg-primary min-h-screen overflow-x-hidden font-sans text-text-primary">
            {/* Section 1: Hero */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <NeuralNetworkBackground />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-oasis-cyan/20 rounded-full blur-[100px] animate-pulse-glow" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[120px] animate-float" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-oasis-cyan/30 bg-oasis-cyan/5">
                            <Sparkles className="w-4 h-4 text-oasis-cyan" />
                            <span className="text-sm font-medium text-oasis-cyan">🚀 Now Serving SMBs Across Canada</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-oasis-cyan to-oasis-cyan-dark">AI Workforce</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
                            We build custom AI systems that automate your customer service, lead generation, and operations—so you can focus on growing your business.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/pricing" className="btn-primary text-lg px-8 py-4">
                                Get Started
                            </Link>
                            <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
                                Book Free Strategy Call
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-text-tertiary">
                            Trusted by 10+ businesses | 15+ workflows deployed | 24/7 automation
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Pain Points */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Sound Familiar?</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">The Challenges We Solve</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, text: "Drowning in repetitive admin tasks" },
                            { icon: Zap, text: "Missing leads after business hours" },
                            { icon: TrendingUp, text: "Inconsistent customer response times" },
                            { icon: Bot, text: "Can't scale without hiring more staff" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 hover:border-oasis-cyan/50 group"
                            >
                                <div className="p-3 rounded-lg bg-oasis-cyan/10 w-fit mb-4 group-hover:bg-oasis-cyan/20 transition-colors">
                                    <item.icon className="w-8 h-8 text-oasis-cyan" />
                                </div>
                                <p className="text-lg font-medium leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Services Overview */}
            <section className="py-24 bg-bg-primary relative overflow-hidden">
                <div className="section-container relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">What We Automate</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">AI Agents That Work 24/7</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: MessageSquare, title: "Customer Support", desc: "Instant answers to FAQs and support tickets, 24/7.", slug: "chat-widget" },
                            { icon: Target, title: "Lead Capture", desc: "Qualify and route leads from your website automatically.", slug: "lead-capture" },
                            { icon: Calendar, title: "Appointment Booking", desc: "Schedule meetings without the back-and-forth emails.", slug: "appointment-booking" },
                            { icon: Mail, title: "Email Automation", desc: "Draft and send personalized responses to common emails.", slug: "email-automation" },
                            { icon: Star, title: "Review Management", desc: "Monitor and respond to Google reviews instantly.", slug: "google-reviews" },
                            { icon: Phone, title: "Voice AI (Phone)", desc: "Handle inbound and outbound calls with natural AI voice.", slug: "voice-ai" }
                        ].map((service, index) => (
                            <Link to={`/services/${service.slug}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-8 h-full hover:shadow-oasis transition-all duration-300 group"
                                >
                                    <div className="mb-6 inline-block p-4 rounded-xl bg-bg-tertiary border border-white/10 group-hover:border-oasis-cyan/50 transition-colors">
                                        <service.icon className="w-8 h-8 text-oasis-cyan group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-oasis-cyan transition-colors">{service.title}</h3>
                                    <p className="text-text-secondary leading-relaxed mb-4">{service.desc}</p>
                                    <span className="text-oasis-cyan text-sm font-medium flex items-center">
                                        Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: How It Works */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">How It Works</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">From Consultation to Automation</h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Connector Line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-oasis-cyan/50 to-transparent md:-translate-x-1/2" />

                            {[
                                { title: "Discovery Call", desc: "We learn your processes and identify automation opportunities.", time: "15-30 min" },
                                { title: "Custom Proposal", desc: "We design a detailed plan with fixed pricing and deliverables.", time: "2-3 days" },
                                { title: "Build & Deploy", desc: "Our team builds your agents. You approve each milestone.", time: "5-14 days" },
                                { title: "Training & Launch", desc: "We train your team and ensure a smooth handover.", time: "1 day" },
                                { title: "Ongoing Support", desc: "We monitor and optimize your agents to ensure performance.", time: "Monthly" }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block flex-1" />

                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-bg-primary border-2 border-oasis-cyan flex items-center justify-center font-bold text-oasis-cyan shadow-oasis">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1 glass-card p-6 md:p-8 border-l-4 border-l-oasis-cyan">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <span className="text-xs font-mono text-oasis-cyan bg-oasis-cyan/10 px-2 py-1 rounded">{step.time}</span>
                                        </div>
                                        <p className="text-text-secondary">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Pricing Preview */}
            <section className="py-24 bg-bg-primary relative">
                <div className="section-container">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Simple Pricing</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">Investment That Pays for Itself</h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            Enterprise-grade automation at 65-75% below agency rates.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Launchpad */}
                        <div className="glass-card p-8 flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">OASIS Launchpad</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">$997</div>
                            <p className="text-text-secondary mb-6">Perfect for getting started with one powerful workflow.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 1 Custom AI Agent</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Website Chat Widget</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 30 Days Support</li>
                            </ul>
                            <Link to="/checkout" className="btn-secondary w-full text-center">Get Started</Link>
                        </div>

                        {/* Integration Suite */}
                        <div className="glass-card p-8 flex flex-col border-oasis-cyan relative transform md:-translate-y-4 shadow-oasis">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-oasis-cyan text-bg-primary px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Integration Suite</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">$3.5k - $6.5k</div>
                            <p className="text-text-secondary mb-6">Comprehensive automation for growing businesses.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 3-5 Custom Agents</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Voice AI + Chat</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> CRM Integration</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 90 Days Support</li>
                            </ul>
                            <Link to="/contact" className="btn-primary w-full text-center">Book Consultation</Link>
                        </div>

                        {/* Individual Agents */}
                        <div className="glass-card p-8 flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">Individual Agents</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">From $597</div>
                            <p className="text-text-secondary mb-6">Know exactly what you need? Pick and choose.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Self-Checkout Available</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Specific Solutions</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Rapid Deployment</li>
                            </ul>
                            <Link to="/services" className="btn-secondary w-full text-center">Browse Agents</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: ROI Calculator */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Calculate Your Savings</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">See How Much AI Can Save You</h2>
                    </div>

                    <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Hours spent on admin per week: <span className="text-oasis-cyan font-bold">{roiInputs.hoursPerWeek}</span></label>
                                    <input
                                        type="range" min="0" max="40" value={roiInputs.hoursPerWeek}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, hoursPerWeek: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Your hourly rate: <span className="text-oasis-cyan font-bold">${roiInputs.hourlyRate}</span></label>
                                    <input
                                        type="range" min="25" max="200" step="5" value={roiInputs.hourlyRate}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, hourlyRate: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Leads missed per month: <span className="text-oasis-cyan font-bold">{roiInputs.missedLeads}</span></label>
                                    <input
                                        type="range" min="0" max="100" value={roiInputs.missedLeads}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, missedLeads: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Average value per lead: <span className="text-oasis-cyan font-bold">${roiInputs.leadValue}</span></label>
                                    <input
                                        type="range" min="50" max="1000" step="50" value={roiInputs.leadValue}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, leadValue: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center space-y-6 bg-bg-tertiary/50 p-6 rounded-xl border border-white/5">
                                <div className="text-center">
                                    <div className="text-sm text-text-tertiary mb-1">Potential Monthly Value</div>
                                    <div className="text-4xl font-bold text-oasis-cyan">${roi.monthly.toLocaleString()}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-text-tertiary mb-1">Potential Annual Value</div>
                                    <div className="text-3xl font-bold text-white">${roi.annual.toLocaleString()}</div>
                                </div>
                                <div className="pt-4 border-t border-white/10 text-center">
                                    <p className="text-sm text-text-secondary mb-4">Most agents pay for themselves in &lt; 1 month.</p>
                                    <Link to="/contact" className="btn-primary w-full block">Get Your Custom Quote</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 7: Case Study */}
            <section className="py-24 bg-bg-primary relative">
                <div className="section-container">
                    <div className="glass-card p-8 md:p-12 border-oasis-cyan/20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Real Results</span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">How We Transformed an E-Commerce Brand</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Challenge:</strong> Overwhelmed support team, missed opportunities.</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Solution:</strong> 24/7 AI support + cart recovery + upsells.</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Results:</strong> 40% reduction in workload, 15% revenue increase.</p>
                                    </div>
                                </div>
                                <blockquote className="border-l-4 border-oasis-cyan pl-4 italic text-text-tertiary mb-8">
                                    "OASIS AI transformed how we handle customer interactions. What used to take hours now happens automatically."
                                </blockquote>
                                <Link to="/case-studies" className="btn-secondary">Read Full Case Study</Link>
                            </div>
                            <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-bg-tertiary to-bg-secondary rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                                <TrendingUp className="w-24 h-24 text-oasis-cyan opacity-20" />
                                <div className="absolute inset-0 bg-oasis-cyan/5" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8: FAQ */}
            <section className="py-24 bg-bg-secondary">
                <div className="section-container max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-6">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass-card overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium text-white">{faq.q}</span>
                                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-oasis-cyan" /> : <ChevronDown className="w-5 h-5 text-text-tertiary" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-4"
                                        >
                                            <p className="text-text-secondary border-t border-white/10 pt-4">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 9: Final CTA */}
            <section className="py-32 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-oasis-cyan/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                        Ready to Build Your <br /><span className="text-oasis-cyan">AI Workforce</span>?
                    </h2>
                    <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                        Book a free 15-minute strategy call and discover how automation can transform your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300">
                            Book Free Strategy Call
                        </Link>
                        <a href="tel:705-440-3117" className="btn-secondary text-lg px-10 py-5">
                            Call 705-440-3117
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

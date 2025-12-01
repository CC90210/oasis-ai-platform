import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, MessageSquare, Calendar, Mail, Database } from 'lucide-react';
import { NeuralNetworkBackground } from '../../components/animations/NeuralNetworkBackground';

const LandingPage = () => {
    return (
        <div className="bg-deep-black min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-dark">
                {/* Neural Network Background */}
                <NeuralNetworkBackground />

                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-neon/20 rounded-full blur-[100px] animate-pulse-glow" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon/10 rounded-full blur-[120px] animate-float" />
                </div>

                <div className="section-container relative z-10 py-20 md:py-32">
                    <motion.div
                        initial={{ y: 30 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-neon" />
                            <span className="text-sm text-light-gray">Trusted by Canadian Businesses</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Stop Drowning in <span className="text-neon animate-neon-pulse">Busywork</span>.
                            <br />Start Scaling Your Business.
                        </h1>

                        <p className="text-xl md:text-2xl text-light-gray mb-10 max-w-3xl mx-auto">
                            Enterprise-grade AI automation for businesses of any size. Custom workflows that work 24/7 so you don't have to.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                                </button>
                            </Link>
                            <Link to="/services">
                                <button className="btn-secondary text-lg">
                                    See How It Works
                                </button>
                            </Link>
                        </div>

                        <motion.div
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16"
                        >
                            <div className="glass-effect rounded-2xl p-8 shadow-neon-strong">
                                <div className="flex flex-wrap justify-around gap-8">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-neon">15+</div>
                                        <div className="text-light-gray mt-1">Workflow Types</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-neon">20+</div>
                                        <div className="text-light-gray mt-1">Hours Saved/Week</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-neon">99%+</div>
                                        <div className="text-light-gray mt-1">Uptime</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Sound <span className="text-neon">Familiar</span>?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Clock, text: "Spending hours on tasks that should take minutes?" },
                            { icon: Zap, text: "Missing leads because you can't respond fast enough?" },
                            { icon: TrendingUp, text: "Feeling trapped IN your business instead of growing it?" },
                            { icon: Bot, text: "Watching competitors scale while you're stuck doing admin work?" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-6 rounded-xl glass-effect hover:shadow-neon transition-all duration-300"
                            >
                                <item.icon className="w-8 h-8 text-neon flex-shrink-0 mt-1" />
                                <p style={{ color: "#E2E8F0" }}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6">
                        What We <span className="text-neon">Automate</span>
                    </h2>
                    <p className="text-xl text-light-gray text-center mb-16 max-w-3xl mx-auto">
                        Enterprise-grade automation at small business prices. Here's what we can build for you:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MessageSquare,
                                title: "Customer Support",
                                description: "AI chatbots that never sleep, handling 60%+ of inquiries automatically"
                            },
                            {
                                icon: Brain,
                                title: "Lead Management",
                                description: "Capture, qualify, and follow up automatically with every lead"
                            },
                            {
                                icon: Calendar,
                                title: "Appointment Booking",
                                description: "Voice AI and chat scheduling working for you 24/7"
                            },
                            {
                                icon: Mail,
                                title: "Email & Communication",
                                description: "Smart responses, follow-ups, and sequences that feel personal"
                            },
                            {
                                icon: Database,
                                title: "Data & CRM Sync",
                                description: "Keep all your systems talking to each other automatically"
                            },
                            {
                                icon: Sparkles,
                                title: "Review Management",
                                description: "Automated requests and response handling for 5-star reputation"
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                className="p-6 rounded-xl glass-effect hover:shadow-neon transition-all duration-300 cursor-pointer group"
                            >
                                <service.icon className="w-12 h-12 text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-display font-bold mb-3">{service.title}</h3>
                                <p style={{ color: "#E2E8F0" }}>{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        How It <span className="text-neon">Works</span>
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Discovery Call", time: "15-30 min", description: "We learn your processes and pain points" },
                            { step: "02", title: "Custom Proposal", time: "2-3 days", description: "Detailed automation plan with fixed pricing" },
                            { step: "03", title: "Build & Deploy", time: "5-14 days", description: "We build, you approve each milestone" },
                            { step: "04", title: "Training & Launch", time: "1 day", description: "Your team learns to leverage everything we've built" },
                            { step: "05", title: "Ongoing Support", time: "Monthly", description: "Monthly retainer keeps your AI employees running 24/7" }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ x: -30 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex gap-6 mb-8 last:mb-0"
                            >
                                {/* Connector Line */}
                                {index < 4 && (
                                    <div className="absolute left-6 top-16 w-0.5 h-12 bg-neon/30" />
                                )}

                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center font-bold text-black">
                                        {step.step}
                                    </div>
                                </div>

                                <div className="flex-1 glass-effect p-6 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-display font-bold">{step.title}</h3>
                                        <span className="text-neon text-sm font-mono">{step.time}</span>
                                    </div>
                                    <p style={{ color: "#E2E8F0" }}>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6">
                        <span className="text-neon">Simple</span> Pricing
                    </h2>
                    <p className="text-xl text-light-gray text-center mb-16 max-w-3xl mx-auto">
                        All prices include deployment, training, and documentation. Monthly retainer covers all software costs to keep your automations running.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* OASIS Launchpad */}
                        <motion.div
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300"
                        >
                            <h3 className="text-3xl font-display font-bold mb-2">OASIS Launchpad</h3>
                            <p className="text-light-gray mb-6">Perfect for getting started</p>

                            <div className="mb-6">
                                <div className="text-4xl font-bold text-neon mb-1">$997</div>
                                <div style={{ color: "#E2E8F0" }}>one-time + $497/month</div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "1 custom automation workflow",
                                    "AI chatbot integration",
                                    "30 days support",
                                    "Training included",
                                    "5-day delivery"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0" />
                                        <span style={{ color: "#E2E8F0" }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="btn-secondary w-full">
                                    Get Started
                                </button>
                            </Link>
                        </motion.div>

                        {/* OASIS Integration Suite */}
                        <motion.div
                            initial={{ y: 20 }}
                            whileInView={{ y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-gradient-dark border-2 border-neon shadow-neon-strong relative"
                        >
                            <div className="absolute top-0 right-8 bg-neon text-black px-4 py-1 rounded-b-lg font-bold text-sm">
                                MOST POPULAR
                            </div>

                            <h3 className="text-3xl font-display font-bold mb-2 mt-2">OASIS Integration Suite</h3>
                            <p className="text-light-gray mb-6">Comprehensive automation</p>

                            <div className="mb-6">
                                <div className="text-4xl font-bold text-neon mb-1">$3,500 - $6,500</div>
                                <div style={{ color: "#E2E8F0" }}>one-time + $497/month</div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "3-5 custom automation workflows",
                                    "AI chatbot + Voice AI",
                                    "CRM integration",
                                    "Multi-channel automation",
                                    "90 days optimization",
                                    "7-14 day delivery"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0" />
                                        <span className="text-white font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact">
                                <button className="btn-primary w-full">
                                    Book Consultation
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Ready to Build Your <span className="text-neon">AI Workforce</span>?
                        </h2>
                        <p className="text-xl text-light-gray mb-10">
                            Book a free 15-minute strategy call and discover how automation can transform your business.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
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

export default LandingPage;



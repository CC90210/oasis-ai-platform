import { Target, Lightbulb, Users, Shield, Zap, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const values = [
        {
            icon: Zap,
            title: "Technical Excellence",
            description: "We build production-grade systems, not basic Zapier clones. Every automation is engineered for reliability and scale."
        },
        {
            icon: Shield,
            title: "Transparency",
            description: "Fixed pricing, no hidden fees, honest timelines. You always know exactly what you're getting and what it costs."
        },
        {
            icon: Target,
            title: "Client Success",
            description: "We measure ourselves by your outcomes. Time saved, revenue grown, customers delighted—that's our scorecard."
        },
        {
            icon: Users,
            title: "Accessibility",
            description: "Enterprise capabilities for every business size. No company is too small for intelligent automation."
        },
        {
            icon: Lightbulb,
            title: "Continuous Innovation",
            description: "Always learning, always improving. We stay ahead of AI trends so your business stays competitive."
        }
    ];

    return (
        <div className="bg-bg-primary min-h-screen overflow-x-hidden font-sans text-text-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-8"
                        >
                            About <span className="text-oasis-cyan">OASIS AI</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Making enterprise-grade automation accessible to every business.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                                Our <span className="text-oasis-cyan">Mission</span>
                            </h2>
                            <div className="text-xl text-text-secondary leading-relaxed space-y-6">
                                <p>
                                    OASIS AI exists to bridge the gap between enterprise-grade automation and small business accessibility.
                                    We believe every business deserves the competitive advantage of intelligent automation—regardless of size, industry, or budget.
                                </p>
                                <p>
                                    We don't just build automations—we build AI employees. Every workflow we create represents hours reclaimed,
                                    revenue recovered, and potential unlocked. We are technical craftsmen who measure success not in lines of code,
                                    but in client outcomes: time saved, customers delighted, revenue grown.
                                </p>
                                <p className="text-oasis-cyan font-semibold text-2xl mt-10 italic">
                                    "Work on your business, not in your business."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24 bg-bg-primary relative">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 md:p-12 hover:border-oasis-cyan/30 transition-colors"
                        >
                            <div className="text-center mb-10">
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-oasis-cyan to-blue-500 mx-auto mb-6 flex items-center justify-center shadow-oasis">
                                    <span className="text-4xl font-bold text-white">CM</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2 text-white">Conaugh McKenna</h3>
                                <p className="text-oasis-cyan text-lg font-medium tracking-wide">Sole Proprietor</p>
                            </div>

                            <div className="text-text-secondary text-lg leading-relaxed space-y-6">
                                <p>
                                    OASIS AI Solutions was founded by Conaugh McKenna with a mission to help small and medium-sized businesses
                                    harness the power of AI automation. Based in Collingwood, Ontario, we specialize in creating custom
                                    AI workflows that help business owners work ON their business, not IN their business.
                                </p>
                                <p>
                                    As a sole proprietorship 100% owned and operated by Conaugh McKenna, OASIS AI delivers direct,
                                    expert-led automation infrastructure without the enterprise price tag or agency overhead.
                                </p>
                                <p className="italic border-l-4 border-oasis-cyan pl-6 py-2 bg-oasis-cyan/5 rounded-r-lg">
                                    "I watched too many talented business owners drowning in admin work while their competitors scaled with automation.
                                    The technology exists to level the playing field—it just needed to be packaged honestly and priced fairly."
                                </p>
                                <p>
                                    That philosophy drives everything at OASIS AI: technical excellence without the enterprise price tag,
                                    transparent pricing without hidden fees, and real results that compound over time.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Our <span className="text-oasis-cyan">Values</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 hover:shadow-oasis transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div className="mb-6 inline-block p-3 rounded-xl bg-oasis-cyan/10 group-hover:bg-oasis-cyan/20 transition-colors">
                                    <value.icon className="w-10 h-10 text-oasis-cyan" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-oasis-cyan transition-colors">{value.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-bg-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-oasis-cyan/5 blur-[100px] pointer-events-none" />

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
                                Our <span className="text-oasis-cyan">Philosophy</span>
                            </h2>
                            <div className="text-xl text-text-secondary leading-relaxed space-y-10">
                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-oasis-cyan/10 flex items-center justify-center flex-shrink-0 text-oasis-cyan font-bold text-xl">1</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">AI should enhance human capability</h3>
                                        <p>Not replace human connection. We build systems that handle the busywork so you can focus on what humans do best: creative thinking, relationship building, and strategic decision-making.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-oasis-cyan/10 flex items-center justify-center flex-shrink-0 text-oasis-cyan font-bold text-xl">2</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Democratizing enterprise automation</h3>
                                        <p>For businesses that have been traditionally priced out of sophisticated solutions. A 5-person team deserves the same intelligent tools as a 500-person corporation.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-oasis-cyan/10 flex items-center justify-center flex-shrink-0 text-oasis-cyan font-bold text-xl">3</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">The OASIS Promise</h3>
                                        <p>Enterprise capabilities at small business prices. Custom solutions, not cookie-cutter templates. Results that compound over time. Partnership, not just service.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Proudly <span className="text-oasis-cyan">Canadian</span>
                    </h2>

                    <div className="flex justify-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-12 border border-white/5 hover:border-oasis-cyan/30 transition-all hover:-translate-y-1 group text-center"
                        >
                            <MapPin className="w-16 h-16 text-oasis-cyan mb-6 mx-auto group-hover:scale-110 transition-transform" />
                            <h3 className="text-3xl font-display font-bold mb-2 text-white">Collingwood, Ontario</h3>
                            <p className="text-text-secondary text-lg">Headquarters & Sole Proprietorship</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-xl text-text-secondary mb-8">
                            Based in Canada, serving businesses globally with an understanding of Canadian business needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="mailto:oasisaisolutions@gmail.com" className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <Mail className="w-5 h-5 text-oasis-cyan group-hover:scale-110 transition-transform" />
                                <span className="text-white font-medium">oasisaisolutions@gmail.com</span>
                            </a>
                            <a href="tel:+12403325062" className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <Phone className="w-5 h-5 text-oasis-cyan group-hover:scale-110 transition-transform" />
                                <span className="text-white font-medium">+1 (240) 332-5062</span>
                            </a>
                        </div>
                    </motion.div>
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
                            Let's Build Your <span className="text-oasis-cyan">AI Workforce</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                            Ready to escape the busywork trap? Book a free strategy call today.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300">
                                Book Free Strategy Call
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

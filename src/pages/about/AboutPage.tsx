import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, TrendingUp, Shield, Zap, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="bg-deep-black min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-dark py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            About <span className="text-neon">OASIS AI</span>
                        </h1>
                        <p className="text-2xl text-light-gray max-w-3xl mx-auto">
                            Making enterprise-grade automation accessible to every business.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                Our <span className="text-neon">Mission</span>
                            </h2>
                            <div className="text-xl text-light-gray leading-relaxed space-y-4">
                                <p>
                                    OASIS AI exists to bridge the gap between enterprise-grade automation and small business accessibility.
                                    We believe every business deserves the competitive advantage of intelligent automation—regardless of size, industry, or budget.
                                </p>
                                <p>
                                    We don't just build automations—we build AI employees. Every workflow we create represents hours reclaimed,
                                    revenue recovered, and potential unlocked. We are technical craftsmen who measure success not in lines of code,
                                    but in client outcomes: time saved, customers delighted, revenue grown.
                                </p>
                                <p className="text-neon font-semibold text-2xl mt-8">
                                    "Work on your business, not in your business."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-effect rounded-2xl p-8 md:p-12"
                        >
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-neon mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-black">CM</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2">Conaugh McKenna</h3>
                                <p className="text-neon text-lg">Founder & CEO</p>
                            </div>

                            <div className="text-light-gray text-lg leading-relaxed space-y-4">
                                <p>
                                    Conaugh McKenna founded OASIS AI with a clear mission: to make enterprise-level automation accessible
                                    to businesses of all sizes. With deep technical expertise in AI and automation systems, Conaugh saw
                                    a growing divide between large corporations with unlimited budgets and small businesses struggling with
                                    manual processes.
                                </p>
                                <p>
                                    "I watched too many talented business owners drowning in admin work while their competitors scaled with automation,"
                                    says Conaugh. "The technology exists to level the playing field—it just needed to be packaged honestly and priced fairly."
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
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Our <span className="text-neon">Values</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-xl glass-effect hover:shadow-neon transition-all duration-300"
                            >
                                <value.icon className="w-12 h-12 text-neon mb-4" />
                                <h3 className="text-2xl font-display font-bold mb-3">{value.title}</h3>
                                <p className="text-light-gray">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                                Our <span className="text-neon">Philosophy</span>
                            </h2>
                            <div className="text-xl text-light-gray leading-relaxed space-y-6 text-left">
                                <p className="flex items-start gap-4">
                                    <span className="text-neon font-bold text-2xl flex-shrink-0">AI should enhance human capability,</span>
                                </p>
                                <p className="pl-12">not replace human connection. We build systems that handle the busywork so you can focus on what humans do best: creative thinking, relationship building, and strategic decision-making.</p>

                                <p className="flex items-start gap-4 mt-8">
                                    <span className="text-neon font-bold text-2xl flex-shrink-0">We democratize enterprise-grade automation</span>
                                </p>
                                <p className="pl-12">for businesses that have been traditionally priced out of sophisticated solutions. A 5-person team deserves the same intelligent tools as a 500-person corporation.</p>

                                <p className="flex items-start gap-4 mt-8">
                                    <span className="text-neon font-bold text-2xl flex-shrink-0">The OASIS Promise:</span>
                                </p>
                                <p className="pl-12">Enterprise capabilities at small business prices. Custom solutions, not cookie-cutter templates. Results that compound over time. Partnership, not just service.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Proudly <span className="text-neon">Canadian</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl glass-effect"
                        >
                            <MapPin className="w-12 h-12 text-neon mb-4" />
                            <h3 className="text-2xl font-display font-bold mb-2">Toronto, Ontario</h3>
                            <p className="text-light-gray">Headquarters</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl glass-effect"
                        >
                            <MapPin className="w-12 h-12 text-neon mb-4" />
                            <h3 className="text-2xl font-display font-bold mb-2">Montreal, Quebec</h3>
                            <p className="text-light-gray">Secondary Office</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <p className="text-xl text-light-gray mb-8">
                            Based in Canada, serving businesses globally with an understanding of Canadian business needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:oasisaisolutions@gmail.com" className="flex items-center gap-2 text-neon hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                                <span>oasisaisolutions@gmail.com</span>
                            </a>
                            <a href="tel:705-440-3117" className="flex items-center gap-2 text-neon hover:text-white transition-colors">
                                <Phone className="w-5 h-5" />
                                <span>705-440-3117</span>
                            </a>
                        </div>
                    </motion.div>
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
                            Let's Build Your <span className="text-neon">AI Workforce</span>
                        </h2>
                        <p className="text-xl text-light-gray mb-10">
                            Ready to escape the busywork trap? Book a free strategy call today.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg">
                                Book Free Strategy Call
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

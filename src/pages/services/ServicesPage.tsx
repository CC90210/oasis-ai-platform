import { Database, Phone, BarChart3, Plug, Code, ArrowRight, MessageSquare, Target, Calendar, Mail, Layout, Briefcase, Monitor, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/GlobalBackground';

const BOOKING_LINK = 'https://calendar.app.google/tpfvJYBGircnGu8G8';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const ServicesPage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden font-sans text-white">
            {/* Background */}
            <div
                className="fixed inset-0 -z-20"
                style={{ background: 'linear-gradient(180deg, #030712 0%, #071426 50%, #030712 100%)' }}
            />
            <GlobalBackground intensity="high" showDNA={false} />
            <div className="fixed inset-0 pointer-events-none -z-10" style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(6,182,212,0.08) 0%, transparent 65%)'
            }} />

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-oasis-teal/30 bg-oasis-slate/40 backdrop-blur-md text-sm font-medium tracking-wide text-oasis-mist/90">
                        <span className="w-2 h-2 rounded-full bg-oasis-teal animate-pulse" />
                        Services
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">What we</span>
                        <span className="block italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            build.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                        Custom software solutions powered by intelligent automation.
                        We construct the digital infrastructure your business needs to scale.
                    </motion.p>
                </motion.div>
            </section>

            {/* Section 1: Custom Software Development */}
            <section className="py-24 relative z-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="mb-16"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase block mb-4">Foundation</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl mb-6 text-white">
                            Enterprise applications <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">built for you</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-3xl leading-relaxed">
                            We don't do one-size-fits-all. Every software application we build is designed from scratch based on your unique business needs, white-labeled under your brand, and built for your secure workflows.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: Layout, title: "Client Portals", desc: "Secure dashes for your clients to view data, files, and status updates." },
                            { icon: BarChart3, title: "Operations Dashboards", desc: "Centralized command centers to track every metric in your business." },
                            { icon: Briefcase, title: "Property Management", desc: "End-to-end systems for real estate, assets, and booking." },
                            { icon: Monitor, title: "CRM & Sales Platforms", desc: "Custom sales pipelines tailored exactly to your closing process." },
                            { icon: Database, title: "Inventory Systems", desc: "Real-time tracking of stock, orders, and logistics." },
                            { icon: Code, title: "Custom Tools", desc: "If you can imagine it, we can build it. No limitations." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-500"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-oasis-teal/0 to-oasis-sky/0 group-hover:from-oasis-teal/10 group-hover:to-oasis-sky/5 transition-all duration-500 -z-10" />
                                <div className="p-3 rounded-xl bg-oasis-teal/10 w-fit mb-6 group-hover:bg-oasis-teal/20 transition-colors">
                                    <item.icon className="w-7 h-7 text-oasis-teal" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section 2: Intelligent Automation */}
            <section className="py-24 relative z-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="mb-16"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase block mb-4">Intelligence</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl mb-6 text-white">
                            Automation that <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">powers your software</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-3xl leading-relaxed">
                            Our automations don't just sit in a separate tool — they're embedded directly into your software, working behind the scenes to eliminate manual work.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: MessageSquare, title: "AI Chat & Support", desc: "Instant answers for customers, 24/7." },
                            { icon: Phone, title: "Voice AI Agents", desc: "Handle inbound calls and outbound leads naturally." },
                            { icon: Mail, title: "Email Processing", desc: "Drafts, sorts, and replies to emails automatically." },
                            { icon: Layers, title: "Document Generation", desc: "Create contracts and invoices instantly." },
                            { icon: Target, title: "Lead Qualification", desc: "Score and route leads based on your criteria." },
                            { icon: Calendar, title: "Smart Scheduling", desc: "Book appointments without back-and-forth." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-500"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-oasis-teal/0 to-oasis-sky/0 group-hover:from-oasis-teal/10 group-hover:to-oasis-sky/5 transition-all duration-500 -z-10" />
                                <div className="p-3 rounded-xl bg-oasis-sky/10 w-fit mb-6 group-hover:bg-oasis-sky/20 transition-colors">
                                    <item.icon className="w-7 h-7 text-oasis-sky" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section 3: Integration & Data */}
            <section className="py-24 relative z-10 px-6">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oasis-teal/30 to-transparent" />
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl mb-6 text-white">
                            Everything <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">connected</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-2xl mx-auto">
                            Your business runs on multiple tools. We make them talk to each other.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                    >
                        {[
                            { name: "Google Workspace", desc: "Calendar, Drive, Gmail" },
                            { name: "CRMs", desc: "HubSpot, Salesforce" },
                            { name: "Payments", desc: "Stripe, Square" },
                            { name: "Communication", desc: "Twilio, Email, WhatsApp" },
                            { name: "Databases", desc: "Supabase, Postgres" },
                            { name: "Cloud", desc: "AWS, Vercel" },
                            { name: "AI Models", desc: "OpenAI, Anthropic" },
                            { name: "Custom APIs", desc: "Anything with an API" }
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-300 group"
                            >
                                <Plug className="w-8 h-8 text-oasis-teal mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-semibold text-white text-base mb-1 group-hover:text-oasis-teal transition-colors">{tech.name}</div>
                                <div className="text-sm text-white/40">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative z-10 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl leading-[0.95] mb-8">
                        <span className="text-white/95">Ready to</span>{' '}
                        <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">build?</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
                        Let's discuss your project and how we can bring it to life.
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href={BOOKING_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white font-semibold shadow-oasis-elevated hover:shadow-oasis-glow transition-all duration-500 hover:scale-[1.02]"
                        >
                            <span>Book a Strategy Call</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky blur-xl opacity-40 -z-10" />
                        </a>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white/90 font-medium hover:bg-white/5 transition-all"
                        >
                            Send a Message
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default ServicesPage;

import { Database, Phone, BarChart3, Plug, Code, ArrowRight, MessageSquare, Target, Calendar, Mail, Layout, Briefcase, Monitor, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServicesPage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden font-sans text-text-primary relative">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none">
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-8"
                        >
                            What We <span className="text-oasis-cyan">Build</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Custom software solutions powered by intelligent automation.
                            We construct the digital infrastructure your business needs to scale.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Section 1: Custom Software Development */}
            <section className="py-20 relative bg-bg-secondary/30">
                <div className="section-container">
                    <div className="mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm block mb-2">Foundation</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Enterprise Applications Built for You</h2>
                        <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
                            We don't do one-size-fits-all. Every software application we build is designed from scratch based on your unique business needs, white-labeled under your brand, and built for your secure workflows.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 group hover:border-oasis-cyan/50 transition-all duration-300"
                            >
                                <item.icon className="w-10 h-10 text-oasis-cyan mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Section 2: Intelligent Automation */}
            < section className="py-20 relative" >
                <div className="section-container">
                    <div className="mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm block mb-2">Intelligence</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Automation That Powers Your Software</h2>
                        <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
                            Our automations don't just sit in a separate tool — they're embedded directly into your software, working behind the scenes to eliminate manual work.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 group hover:shadow-oasis transition-all duration-300"
                            >
                                <item.icon className="w-10 h-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Section 3: Integration & Data */}
            < section className="py-24 relative overflow-hidden bg-bg-secondary/30" >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oasis-cyan/30 to-transparent" />

                <div className="section-container relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Everything <span className="text-oasis-cyan">Connected</span>
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Your business runs on multiple tools. We make them talk to each other.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl glass-card hover:border-oasis-cyan/50 transition-all duration-300 group"
                            >
                                <Plug className="w-8 h-8 text-oasis-cyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-oasis-cyan transition-colors">{tech.name}</div>
                                <div className="text-sm text-text-tertiary">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-32 relative overflow-hidden" >
                <div className="absolute inset-0 pointer-events-none">
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Ready to <span className="text-oasis-cyan">Build</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                            Let's discuss your project and how we can bring it to life.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300 group">
                                Start Your Transformation
                                <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default ServicesPage;

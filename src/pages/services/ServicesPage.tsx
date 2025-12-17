import { useEffect, useRef } from 'react';
import { Workflow, Bot, Database, Phone, BarChart3, Plug, Code, CheckCircle, ArrowRight, MessageSquare, Target, Calendar, Mail, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlobalBackground from '../../components/GlobalBackground';

const ServicesPage = () => {
    const services = [
        {
            icon: MessageSquare,
            title: "AI Chat Agents",
            description: "Intelligent chatbots that handle customer support, answer FAQs, and guide users 24/7.",
            features: ["Instant responses", "Human-like conversation", "Escalation to humans", "Multi-language support"]
        },
        {
            icon: Phone,
            title: "Voice AI",
            description: "Natural-sounding voice agents that handle inbound and outbound calls for booking and support.",
            features: ["Appointment scheduling", "Inbound call handling", "Outbound lead qualification", "Call transcription"]
        },
        {
            icon: Workflow,
            title: "Workflow Automation",
            description: "Connect your apps and automate complex business processes without lifting a finger.",
            features: ["n8n integration", "Cross-platform sync", "Error handling", "Real-time monitoring"]
        },
        {
            icon: Target,
            title: "Lead Capture & Qual.",
            description: "Automatically capture, qualify, and route leads to your CRM or sales team.",
            features: ["Form integration", "Lead scoring", "Instant notifications", "CRM sync"]
        },
        {
            icon: Mail,
            title: "Email Automation",
            description: "Smart email sequences that nurture leads and follow up with customers automatically.",
            features: ["Personalized outreach", "Follow-up sequences", "Newsletter automation", "Response handling"]
        },
        {
            icon: Star,
            title: "Review Management",
            description: "Automatically request and respond to reviews to boost your online reputation.",
            features: ["Google Review requests", "Automated responses", "Sentiment analysis", "Reputation monitoring"]
        }
    ];

    return (
        <div className="bg-bg-primary min-h-screen overflow-x-hidden font-sans text-text-primary relative">
            <GlobalBackground intensity="medium" showDNA={false} />

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
                            Our <span className="text-oasis-cyan">Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Enterprise-grade AI automation services that transform your business operations.
                            We build, deploy, and maintain intelligent systems that work 24/7.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 hover:shadow-oasis transition-all duration-300 group"
                            >
                                <div className="mb-6 inline-block p-4 rounded-xl bg-bg-tertiary border border-white/10 group-hover:border-oasis-cyan/50 transition-colors">
                                    <service.icon className="w-10 h-10 text-oasis-cyan group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-oasis-cyan transition-colors">{service.title}</h3>
                                <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>

                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-oasis-cyan flex-shrink-0 mt-1" />
                                            <span className="text-text-tertiary text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-24 bg-bg-primary relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oasis-cyan/30 to-transparent" />

                <div className="section-container relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Built with <span className="text-oasis-cyan">Best-in-Class</span> Technology
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            We leverage the most powerful AI models and automation tools available.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { name: "n8n", desc: "Workflow Engine" },
                            { name: "OpenAI", desc: "GPT-4 & Assistants" },
                            { name: "Claude", desc: "Anthropic AI" },
                            { name: "ElevenLabs", desc: "Voice AI" },
                            { name: "Pinecone", desc: "Vector Database" },
                            { name: "Twilio", desc: "Communications" },
                            { name: "Stripe", desc: "Payments" },
                            { name: "Custom Code", desc: "Production-Grade" }
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl glass-card hover:border-oasis-cyan/50 transition-all duration-300 group"
                            >
                                <Code className="w-8 h-8 text-oasis-cyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-oasis-cyan transition-colors">{tech.name}</div>
                                <div className="text-sm text-text-tertiary">{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Ready to <span className="text-oasis-cyan">Automate</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                            Book a free 15-minute strategy call and discover which automations will save you the most time.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300 group">
                                Book Free Strategy Call
                                <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

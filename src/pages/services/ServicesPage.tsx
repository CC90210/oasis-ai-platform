import { motion } from 'framer-motion';
import { Workflow, Bot, Database, Phone, BarChart3, Plug, Code, Zap, Brain, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    const services = [
        {
            icon: Workflow,
            title: "N8n Workflow Automation",
            description: "Connect 1000+ apps and build sophisticated automation workflows without code. We create custom business logic that handles complex processes automatically.",
            features: [
                "Connect any app with 1000+ integrations",
                "Custom business logic and decision trees",
                "Error handling and monitoring",
                "Scalable infrastructure",
                "Real-time execution tracking"
            ]
        },
        {
            icon: Bot,
            title: "AI Agent Development",
            description: "Intelligent AI assistants that understand your business and communicate with your customers like a real team member.",
            features: [
                "Customer support chatbots (60%+ automation)",
                "Lead qualification agents",
                "Email response automation",
                "Multi-model support (GPT-4, Claude, Gemini)",
                "Custom personality and brand voice"
            ]
        },
        {
            icon: Database,
            title: "RAG Systems & Knowledge Bases",
            description: "Turn your documents and data into an intelligent knowledge base that your AI can search and reference instantly.",
            features: [
                "Document upload and vectorization",
                "Intelligent semantic search",
                "Context-aware responses",
                "Real-time data sync",
                "Multi-source knowledge integration"
            ]
        },
        {
            icon: Phone,
            title: "Voice AI Integration",
            description: "Natural-sounding voice AI that answers calls, books appointments, and handles customer inquiries over the phone.",
            features: [
                "ElevenLabs voice agents",
                "Phone appointment booking",
                "Call transcript analysis",
                "Multi-language support",
                "24/7 availability"
            ]
        },
        {
            icon: BarChart3,
            title: "Reporting & Insights",
            description: "We compile all your automation data into comprehensive monthly reports. Every lead captured, every customer served, every task automated—we track it all and deliver clear insights so you can see exactly how your AI employees are performing.",
            features: [
                "Monthly data compilation from all automations",
                "Performance metrics and KPIs",
                "Lead and customer interaction summaries",
                "Recommendations for optimization",
                "Delivered directly to your inbox"
            ]
        },
        {
            icon: Plug,
            title: "Integration Services",
            description: "Connect all your business tools and keep them in sync automatically, eliminating manual data entry.",
            features: [
                "CRM integrations (HubSpot, Salesforce, etc.)",
                "E-commerce platforms (Shopify, WooCommerce)",
                "Email marketing tools",
                "Payment processors",
                "Custom API connections"
            ]
        }
    ];

    return (
        <div className="bg-deep-black min-h-screen">
            {/* Hero Section */}
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
                            Our <span className="text-neon">Services</span>
                        </h1>
                        <p className="text-xl text-light-gray max-w-3xl mx-auto">
                            Enterprise-grade AI automation services that transform your business operations.
                            We build, deploy, and maintain intelligent systems that work 24/7.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 group"
                            >
                                <service.icon className="w-16 h-16 text-neon mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-3xl font-display font-bold mb-4">{service.title}</h3>
                                <p className="text-light-gray mb-6">{service.description}</p>

                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                            <span className="text-light-gray">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
                        Built with <span className="text-neon">Best-in-Class</span> Technology
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { name: "n8n", desc: "Workflow Engine" },
                            { name: "OpenAI", desc: "GPT-4 & Assistants" },
                            { name: "Claude", desc: "Anthropic AI" },
                            { name: "ElevenLabs", desc: "Voice AI" },
                            { name: "Pinecone", desc: "Vector Database" },
                            { name: "Twilio", desc: "Communications" },
                            { name: "Stripe", desc: "Payments" },
                            { name: "Custom Code", desc: "Production-Grade Development" }
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-xl glass-effect hover:shadow-neon transition-all"
                            >
                                <Code className="w-10 h-10 text-neon mx-auto mb-3" />
                                <div className="font-bold text-white mb-1">{tech.name}</div>
                                <div className="text-sm text-light-gray">{tech.desc}</div>
                            </motion.div>
                        ))}
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to <span className="text-neon">Automate</span>?
                        </h2>
                        <p className="text-xl text-light-gray mb-10">
                            Book a free 15-minute strategy call and discover which automations will save you the most time.
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

export default ServicesPage;

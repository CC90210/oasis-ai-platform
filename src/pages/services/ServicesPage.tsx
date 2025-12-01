import { useEffect, useRef } from 'react';
import { Workflow, Bot, Database, Phone, BarChart3, Plug, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

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
            description: "We compile all your automation data into comprehensive monthly reports. Every lead captured, every customer served, every task automated—we track it all and deliver clear insights.",
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
        <div className="bg-deep-black min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-dark py-24">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Our <span className="text-neon">Services</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                            Enterprise-grade AI automation services that transform your business operations.
                            We build, deploy, and maintain intelligent systems that work 24/7.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll p-8 md:p-10 rounded-3xl glass-effect hover:shadow-neon transition-all duration-300 group border border-white/5 hover:-translate-y-2"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-8 inline-block p-4 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-neon/50 transition-colors">
                                    <service.icon className="w-12 h-12 text-neon group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-neon transition-colors">{service.title}</h3>
                                <p className="text-light-gray mb-8 text-lg leading-relaxed">{service.description}</p>

                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                                            <span className="text-gray-300 text-lg">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-24 bg-dark-navy relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

                <div className="section-container relative z-10">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Built with <span className="text-neon">Best-in-Class</span> Technology
                        </h2>
                        <p className="text-xl text-light-gray max-w-2xl mx-auto">
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
                            <div
                                key={index}
                                className="animate-on-scroll text-center p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 border border-white/5 hover:-translate-y-1 group"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <Code className="w-10 h-10 text-neon mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-white text-lg mb-1 group-hover:text-neon transition-colors">{tech.name}</div>
                                <div className="text-sm text-gray-400">{tech.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-on-scroll">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Ready to <span className="text-neon">Automate</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-light-gray mb-12 max-w-2xl mx-auto">
                            Book a free 15-minute strategy call and discover which automations will save you the most time.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg px-10 py-5 shadow-neon-strong hover:scale-105 transition-transform duration-300 group">
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

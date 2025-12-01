import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, MessageSquare, Calendar, Mail, Database } from 'lucide-react';
import { NeuralNetworkBackground } from '../../components/animations/NeuralNetworkBackground';

const LandingPage = () => {
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

    return (
        <div className="bg-deep-black min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark pt-20">
                {/* Neural Network Background */}
                <NeuralNetworkBackground />

                {/* Animated Background Glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-neon/20 rounded-full blur-[100px] animate-pulse-glow" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon/10 rounded-full blur-[120px] animate-float" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 border border-white/10">
                                <Sparkles className="w-4 h-4 text-neon" />
                                <span className="text-sm text-light-gray font-medium">Trusted by Canadian Businesses</span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Stop Drowning in <span className="text-neon animate-neon-pulse inline-block">Busywork</span>.
                            <br />Start Scaling Your Business.
                        </h1>

                        <p className="text-xl md:text-2xl text-light-gray mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            Enterprise-grade AI automation for businesses of any size. Custom workflows that work 24/7 so you don't have to.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <Link to="/contact">
                                <button className="btn-primary text-lg px-8 py-4 group">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/services">
                                <button className="btn-secondary text-lg px-8 py-4">
                                    See How It Works
                                </button>
                            </Link>
                        </div>

                        <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                            <div className="glass-effect rounded-2xl p-8 md:p-12 shadow-neon-strong border border-white/5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                    <div className="text-center p-4">
                                        <div className="text-4xl md:text-5xl font-bold text-neon mb-2">15+</div>
                                        <div className="text-light-gray font-medium">Workflow Types</div>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="text-4xl md:text-5xl font-bold text-neon mb-2">20+</div>
                                        <div className="text-light-gray font-medium">Hours Saved/Week</div>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="text-4xl md:text-5xl font-bold text-neon mb-2">99%</div>
                                        <div className="text-light-gray font-medium">System Uptime</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem/Agitation Section */}
            <section className="py-24 bg-dark-navy relative">
                <div className="section-container">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Sound <span className="text-neon">Familiar</span>?
                        </h2>
                        <p className="text-xl text-light-gray max-w-2xl mx-auto">
                            Most business owners are stuck in the daily grind. It's time to break free.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Clock, text: "Spending hours on repetitive tasks that should take minutes?" },
                            { icon: Zap, text: "Missing valuable leads because you can't respond fast enough?" },
                            { icon: TrendingUp, text: "Feeling trapped IN your business instead of growing it?" },
                            { icon: Bot, text: "Watching competitors scale while you're stuck doing admin work?" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll flex items-start gap-6 p-8 rounded-xl glass-effect hover:shadow-neon transition-all duration-300 border border-white/5 group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="p-3 rounded-lg bg-neon/10 group-hover:bg-neon/20 transition-colors">
                                    <item.icon className="w-8 h-8 text-neon flex-shrink-0" />
                                </div>
                                <p className="text-lg text-gray-200 font-medium leading-relaxed pt-1">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-24 bg-deep-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-neon/5 blur-[100px] pointer-events-none" />

                <div className="section-container relative z-10">
                    <div className="text-center mb-20 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            What We <span className="text-neon">Automate</span>
                        </h2>
                        <p className="text-xl text-light-gray max-w-3xl mx-auto">
                            Enterprise-grade automation at small business prices. We build custom solutions tailored to your specific needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MessageSquare,
                                title: "Customer Support",
                                description: "AI chatbots that never sleep, handling 60%+ of inquiries automatically with human-like responses."
                            },
                            {
                                icon: Brain,
                                title: "Lead Management",
                                description: "Capture, qualify, and follow up automatically with every lead across all your channels."
                            },
                            {
                                icon: Calendar,
                                title: "Appointment Booking",
                                description: "Voice AI and chat scheduling working for you 24/7 to fill your calendar without the back-and-forth."
                            },
                            {
                                icon: Mail,
                                title: "Email & Communication",
                                description: "Smart responses, follow-ups, and sequences that feel personal and drive engagement."
                            },
                            {
                                icon: Database,
                                title: "Data & CRM Sync",
                                description: "Keep all your systems talking to each other automatically. No more manual data entry."
                            },
                            {
                                icon: Sparkles,
                                title: "Review Management",
                                description: "Automated requests and response handling to build your 5-star reputation on autopilot."
                            }
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 group border border-white/5 hover:-translate-y-2"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-neon/50 transition-colors">
                                    <service.icon className="w-8 h-8 text-neon group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-neon transition-colors">{service.title}</h3>
                                <p className="text-light-gray leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-dark-navy relative">
                <div className="section-container">
                    <div className="text-center mb-20 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            How It <span className="text-neon">Works</span>
                        </h2>
                        <p className="text-xl text-light-gray max-w-2xl mx-auto">
                            A simple, transparent process to get your AI workforce up and running.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {[
                            { step: "01", title: "Discovery Call", time: "15-30 min", description: "We learn your processes, pain points, and goals to identify the highest-impact automation opportunities." },
                            { step: "02", title: "Custom Proposal", time: "2-3 days", description: "We design a detailed automation plan with fixed pricing and clear deliverables. No surprises." },
                            { step: "03", title: "Build & Deploy", time: "5-14 days", description: "Our team builds your custom solution. You approve each milestone before we move forward." },
                            { step: "04", title: "Training & Launch", time: "1 day", description: "We train your team on how to use the new system and ensure a smooth handover." },
                            { step: "05", title: "Ongoing Support", time: "Monthly", description: "We monitor, maintain, and optimize your automations to ensure they keep delivering value." }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll relative flex gap-8 mb-12 last:mb-0 group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Connector Line */}
                                {index < 4 && (
                                    <div className="absolute left-6 top-16 bottom-[-48px] w-0.5 bg-gradient-to-b from-neon/50 to-transparent" />
                                )}

                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-black border-2 border-neon flex items-center justify-center font-bold text-neon shadow-neon group-hover:bg-neon group-hover:text-black transition-all duration-300">
                                        {step.step}
                                    </div>
                                </div>

                                <div className="flex-1 glass-effect p-8 rounded-2xl border border-white/5 hover:border-neon/30 transition-colors">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                                        <h3 className="text-2xl font-display font-bold text-white">{step.title}</h3>
                                        <span className="inline-block px-3 py-1 rounded-full bg-neon/10 text-neon text-sm font-mono border border-neon/20">
                                            {step.time}
                                        </span>
                                    </div>
                                    <p className="text-light-gray leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-deep-black relative">
                <div className="section-container">
                    <div className="text-center mb-20 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            <span className="text-neon">Simple</span> Pricing
                        </h2>
                        <p className="text-xl text-light-gray max-w-3xl mx-auto">
                            Transparent pricing with no hidden fees. Choose the package that fits your growth stage.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* OASIS Launchpad */}
                        <div className="animate-on-scroll p-8 rounded-3xl glass-effect hover:shadow-neon transition-all duration-300 border border-white/5 flex flex-col">
                            <h3 className="text-3xl font-display font-bold mb-2 text-white">OASIS Launchpad</h3>
                            <p className="text-light-gray mb-8">Perfect for getting started with automation</p>

                            <div className="mb-8 p-6 rounded-2xl bg-black/40 border border-white/5">
                                <div className="text-4xl font-bold text-neon mb-2">$997</div>
                                <div className="text-gray-400 text-sm">one-time setup fee</div>
                                <div className="text-white font-medium mt-2">+ $497/month retainer</div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "1 Custom Automation Workflow",
                                    "Basic AI Chatbot Integration",
                                    "30 Days Priority Support",
                                    "Team Training Session",
                                    "5-Day Delivery Guarantee"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="mt-auto">
                                <button className="btn-secondary w-full py-4 text-lg">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* OASIS Integration Suite */}
                        <div className="animate-on-scroll p-8 rounded-3xl bg-gradient-dark border-2 border-neon shadow-neon-strong relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-neon text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg tracking-wide">
                                MOST POPULAR
                            </div>

                            <h3 className="text-3xl font-display font-bold mb-2 text-white mt-4">OASIS Integration Suite</h3>
                            <p className="text-light-gray mb-8">Comprehensive automation for scaling businesses</p>

                            <div className="mb-8 p-6 rounded-2xl bg-black/40 border border-neon/30">
                                <div className="text-4xl font-bold text-neon mb-2">$3,500 - $6,500</div>
                                <div className="text-gray-400 text-sm">one-time setup fee</div>
                                <div className="text-white font-medium mt-2">+ $497/month retainer</div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {[
                                    "3-5 Custom Automation Workflows",
                                    "Advanced AI Chatbot + Voice AI",
                                    "Full CRM & Database Integration",
                                    "Multi-channel Automation Strategy",
                                    "90 Days Optimization & Support",
                                    "Priority 24/7 Monitoring",
                                    "7-14 Day Delivery"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                        <span className="text-white font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="mt-auto">
                                <button className="btn-primary w-full py-4 text-lg shadow-neon">
                                    Book Consultation
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-on-scroll">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Ready to Build Your <br /><span className="text-neon">AI Workforce</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-light-gray mb-12 max-w-2xl mx-auto">
                            Book a free 15-minute strategy call and discover exactly how automation can transform your business.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg px-10 py-5 shadow-neon-strong hover:scale-105 transition-transform duration-300">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-6 h-6" />
                                </button>
                            </Link>
                            <a href="tel:705-440-3117">
                                <button className="btn-secondary text-lg px-10 py-5 hover:bg-white/10">
                                    Call 705-440-3117
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

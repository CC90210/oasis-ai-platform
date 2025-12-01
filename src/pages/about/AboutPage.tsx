import { useEffect, useRef } from 'react';
import { Target, Lightbulb, Users, TrendingUp, Shield, Zap, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
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
        <div className="bg-deep-black min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-dark py-24">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            About <span className="text-neon">OASIS AI</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                            Making enterprise-grade automation accessible to every business.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-on-scroll text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                                Our <span className="text-neon">Mission</span>
                            </h2>
                            <div className="text-xl text-light-gray leading-relaxed space-y-6">
                                <p>
                                    OASIS AI exists to bridge the gap between enterprise-grade automation and small business accessibility.
                                    We believe every business deserves the competitive advantage of intelligent automation—regardless of size, industry, or budget.
                                </p>
                                <p>
                                    We don't just build automations—we build AI employees. Every workflow we create represents hours reclaimed,
                                    revenue recovered, and potential unlocked. We are technical craftsmen who measure success not in lines of code,
                                    but in client outcomes: time saved, customers delighted, revenue grown.
                                </p>
                                <p className="text-neon font-semibold text-2xl mt-10 italic">
                                    "Work on your business, not in your business."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24 bg-dark-navy relative">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <div className="animate-on-scroll glass-effect rounded-3xl p-8 md:p-12 border border-white/5 hover:border-neon/30 transition-colors">
                            <div className="text-center mb-10">
                                <div className="w-28 h-28 rounded-full bg-gradient-neon mx-auto mb-6 flex items-center justify-center shadow-neon">
                                    <span className="text-4xl font-bold text-black">CM</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2 text-white">Conaugh McKenna</h3>
                                <p className="text-neon text-lg font-medium tracking-wide">Founder & CEO</p>
                            </div>

                            <div className="text-light-gray text-lg leading-relaxed space-y-6">
                                <p>
                                    Conaugh McKenna founded OASIS AI with a clear mission: to make enterprise-level automation accessible
                                    to businesses of all sizes. With deep technical expertise in AI and automation systems, Conaugh saw
                                    a growing divide between large corporations with unlimited budgets and small businesses struggling with
                                    manual processes.
                                </p>
                                <p className="italic border-l-4 border-neon pl-6 py-2 bg-neon/5 rounded-r-lg">
                                    "I watched too many talented business owners drowning in admin work while their competitors scaled with automation.
                                    The technology exists to level the playing field—it just needed to be packaged honestly and priced fairly."
                                </p>
                                <p>
                                    That philosophy drives everything at OASIS AI: technical excellence without the enterprise price tag,
                                    transparent pricing without hidden fees, and real results that compound over time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 animate-on-scroll">
                        Our <span className="text-neon">Values</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 border border-white/5 hover:-translate-y-2 group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-6 inline-block p-3 rounded-xl bg-neon/10 group-hover:bg-neon/20 transition-colors">
                                    <value.icon className="w-10 h-10 text-neon" />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-neon transition-colors">{value.title}</h3>
                                <p className="text-light-gray leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-dark-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-neon/5 blur-[100px] pointer-events-none" />

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-on-scroll">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
                                Our <span className="text-neon">Philosophy</span>
                            </h2>
                            <div className="text-xl text-light-gray leading-relaxed space-y-10">
                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0 text-neon font-bold text-xl">1</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">AI should enhance human capability</h3>
                                        <p>Not replace human connection. We build systems that handle the busywork so you can focus on what humans do best: creative thinking, relationship building, and strategic decision-making.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0 text-neon font-bold text-xl">2</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Democratizing enterprise automation</h3>
                                        <p>For businesses that have been traditionally priced out of sophisticated solutions. A 5-person team deserves the same intelligent tools as a 500-person corporation.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-neon/10 flex items-center justify-center flex-shrink-0 text-neon font-bold text-xl">3</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">The OASIS Promise</h3>
                                        <p>Enterprise capabilities at small business prices. Custom solutions, not cookie-cutter templates. Results that compound over time. Partnership, not just service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 animate-on-scroll">
                        Proudly <span className="text-neon">Canadian</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="animate-on-scroll p-8 rounded-2xl glass-effect border border-white/5 hover:border-neon/30 transition-all hover:-translate-y-1 group">
                            <MapPin className="w-12 h-12 text-neon mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-display font-bold mb-2 text-white">Toronto, Ontario</h3>
                            <p className="text-light-gray">Headquarters</p>
                        </div>

                        <div className="animate-on-scroll p-8 rounded-2xl glass-effect border border-white/5 hover:border-neon/30 transition-all hover:-translate-y-1 group" style={{ transitionDelay: '100ms' }}>
                            <MapPin className="w-12 h-12 text-neon mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-display font-bold mb-2 text-white">Montreal, Quebec</h3>
                            <p className="text-light-gray">Secondary Office</p>
                        </div>
                    </div>

                    <div className="animate-on-scroll mt-16 text-center" style={{ transitionDelay: '200ms' }}>
                        <p className="text-xl text-light-gray mb-8">
                            Based in Canada, serving businesses globally with an understanding of Canadian business needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="mailto:oasisaisolutions@gmail.com" className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <Mail className="w-5 h-5 text-neon group-hover:scale-110 transition-transform" />
                                <span className="text-white font-medium">oasisaisolutions@gmail.com</span>
                            </a>
                            <a href="tel:705-440-3117" className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group">
                                <Phone className="w-5 h-5 text-neon group-hover:scale-110 transition-transform" />
                                <span className="text-white font-medium">705-440-3117</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-dark relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-3xl mx-auto text-center animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                            Let's Build Your <span className="text-neon">AI Workforce</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-light-gray mb-12 max-w-2xl mx-auto">
                            Ready to escape the busywork trap? Book a free strategy call today.
                        </p>
                        <Link to="/contact">
                            <button className="btn-primary text-lg px-10 py-5 shadow-neon-strong hover:scale-105 transition-transform duration-300">
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

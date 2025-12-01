import { useEffect, useRef } from 'react';
import { TrendingUp, Clock, Users, DollarSign, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudiesPage = () => {
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
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-dark py-24">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Real <span className="text-neon">Results</span> for Real Businesses
                        </h1>
                        <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                            See how automation is transforming businesses across different industries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Case Study */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <div className="animate-on-scroll glass-effect rounded-3xl p-8 md:p-12 border-2 border-neon shadow-neon-strong relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />

                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-6 h-6 text-neon fill-neon animate-pulse" />
                                <span className="text-neon font-bold tracking-wider text-sm">FEATURED SUCCESS STORY</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                                E-Commerce Success Story
                            </h2>
                            <p className="text-xl text-light-gray mb-10 leading-relaxed max-w-3xl">
                                Direct-to-consumer health & wellness brand transforms customer support and recovers lost revenue.
                            </p>

                            {/* Challenge */}
                            <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">The Challenge</h3>
                                <p className="text-light-gray leading-relaxed text-lg">
                                    A growing e-commerce business was drowning in customer support tickets. Their small team
                                    couldn't keep up with inquiries, leading to slow response times, frustrated customers, and
                                    thousands of dollars in lost revenue from abandoned carts that were never recovered. They were
                                    spending 40+ hours per week on repetitive support tasks that could be automated.
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="mb-10">
                                <h3 className="text-2xl font-display font-bold mb-6 text-white">Our Solution</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        "24/7 AI customer support chatbot handling 60%+ of inquiries",
                                        "Automated customer segmentation and personalized follow-ups",
                                        "Abandoned cart recovery automation",
                                        "Post-purchase upsell sequences",
                                        "Real-time inventory and order status automation"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-black/30 border border-white/5">
                                            <CheckCircle className="w-5 h-5 text-neon flex-shrink-0 mt-1" />
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Results */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                {[
                                    { icon: TrendingUp, value: "40%", label: "Reduction in Support Tickets" },
                                    { icon: DollarSign, value: "15%", label: "Revenue Increase" },
                                    { icon: Clock, value: "1000s", label: "Hours Saved Annually" },
                                    { icon: Users, value: "Higher", label: "Customer Satisfaction" }
                                ].map((metric, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-6 rounded-xl bg-dark-navy/50 border border-neon/20 hover:border-neon/50 transition-colors"
                                    >
                                        <metric.icon className="w-10 h-10 text-neon mx-auto mb-3" />
                                        <div className="text-3xl font-bold text-neon mb-1">{metric.value}</div>
                                        <div className="text-sm text-light-gray">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="bg-gradient-neon/10 border-l-4 border-neon p-8 rounded-r-xl">
                                <p className="text-xl italic text-white mb-4 leading-relaxed">
                                    "The customer support automation alone paid for itself in the first month. Our response times went
                                    from hours to seconds, and our customers love it. OASIS delivered exactly what they promised."
                                </p>
                                <p className="text-neon font-bold text-lg">
                                    — E-commerce Founder
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Overview */}
            <section className="py-24 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 animate-on-scroll">
                        Results We <span className="text-neon">Deliver</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Clock,
                                metric: "20+ hours/week",
                                description: "Average time saved per client through intelligent automation"
                            },
                            {
                                icon: TrendingUp,
                                metric: "40-60%",
                                description: "Reduction in manual administrative tasks across all implementations"
                            },
                            {
                                icon: Users,
                                metric: "24/7",
                                description: "Availability for customer-facing automations and support systems"
                            },
                            {
                                icon: Star,
                                metric: "99%+",
                                description: "Uptime on all deployed workflows and automation systems"
                            },
                            {
                                icon: DollarSign,
                                metric: "65-75%",
                                description: "Below traditional agency rates for enterprise-grade solutions"
                            },
                            {
                                icon: CheckCircle,
                                metric: "15+",
                                description: "Different workflow types built and deployed across industries"
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 text-center border border-white/5 hover:-translate-y-2 group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="mb-6 inline-block p-4 rounded-full bg-neon/10 group-hover:bg-neon/20 transition-colors">
                                    <item.icon className="w-10 h-10 text-neon" />
                                </div>
                                <div className="text-4xl font-bold text-neon mb-4">{item.metric}</div>
                                <p className="text-light-gray text-lg leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-deep-black">
                <div className="section-container">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 animate-on-scroll">
                        What Our <span className="text-neon">Clients</span> Say
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                quote: "Before OASIS AI, I was drowning in admin work. Now my business runs itself while I sleep. Conaugh and his team built exactly what I needed—no fluff, just results. Best investment I've made in years.",
                                author: "Marcus T.",
                                title: "Service Business Owner, Toronto"
                            },
                            {
                                quote: "I was skeptical about AI automation, but OASIS made it simple. They handled everything from setup to training, and now I'm saving 25+ hours a week. My only regret is not doing this sooner.",
                                author: "Sarah L.",
                                title: "E-commerce Founder, Vancouver"
                            },
                            {
                                quote: "What impressed me most was how Conaugh actually listened to my specific needs. This wasn't a cookie-cutter solution—it was built for MY business. The ROI has been incredible.",
                                author: "David R.",
                                title: "Clinic Owner, Montreal"
                            },
                            {
                                quote: "The customer support automation alone paid for itself in the first month. Our response times went from hours to seconds, and our customers love it. OASIS delivered exactly what they promised.",
                                author: "Jennifer K.",
                                title: "Retail Business Owner, Calgary"
                            },
                            {
                                quote: "I run a small team and couldn't afford to hire more staff. OASIS AI gave me the equivalent of 2-3 employees for a fraction of the cost. Game changer for any small business owner.",
                                author: "Michael P.",
                                title: "Agency Owner, Ottawa"
                            },
                            {
                                quote: "The transparency and fixed pricing made this an easy decision. No surprises, no hidden fees. Just honest automation work that actually delivers results. Highly recommend.",
                                author: "Lisa M.",
                                title: "Consultant, Toronto"
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="animate-on-scroll p-8 rounded-2xl glass-effect hover:shadow-neon transition-all duration-300 border border-white/5 hover:-translate-y-1"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-neon text-neon" />
                                    ))}
                                </div>
                                <p className="text-light-gray mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center font-bold text-black">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.author}</div>
                                        <div className="text-sm text-neon">{testimonial.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                            Ready to Write Your <span className="text-neon">Success Story</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-light-gray mb-12 max-w-2xl mx-auto">
                            Join the growing number of businesses transforming their operations with intelligent automation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact">
                                <button className="btn-primary text-lg px-10 py-5 shadow-neon-strong hover:scale-105 transition-transform duration-300">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-6 h-6" />
                                </button>
                            </Link>
                            <Link to="/pricing">
                                <button className="btn-secondary text-lg px-10 py-5 hover:bg-white/10">
                                    View Pricing
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudiesPage;

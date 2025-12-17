import { TrendingUp, Clock, Users, DollarSign, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CaseStudiesPage = () => {
    return (
        <div className="min-h-screen overflow-x-hidden font-sans text-text-primary relative">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-8"
                        >
                            Real <span className="text-oasis-cyan">Results</span> for Real Businesses
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            See how automation is transforming businesses across different industries.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Case Study */}
            <section className="py-20 relative">
                <div className="section-container">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-3xl p-8 md:p-12 border-2 border-oasis-cyan shadow-oasis-strong relative overflow-hidden"
                        >

                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-6 h-6 text-oasis-cyan fill-oasis-cyan animate-pulse" />
                                <span className="text-oasis-cyan font-bold tracking-wider text-sm">FEATURED SUCCESS STORY</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                                E-Commerce Success Story
                            </h2>
                            <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-3xl">
                                Direct-to-consumer health & wellness brand transforms customer support and recovers lost revenue.
                            </p>

                            {/* Challenge */}
                            <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">The Challenge</h3>
                                <p className="text-text-secondary leading-relaxed text-lg">
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
                                            <CheckCircle className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
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
                                        className="text-center p-6 rounded-xl bg-bg-tertiary border border-oasis-cyan/20 hover:border-oasis-cyan/50 transition-colors"
                                    >
                                        <metric.icon className="w-10 h-10 text-oasis-cyan mx-auto mb-3" />
                                        <div className="text-3xl font-bold text-oasis-cyan mb-1">{metric.value}</div>
                                        <div className="text-sm text-text-secondary">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="bg-gradient-to-r from-oasis-cyan/10 to-transparent border-l-4 border-oasis-cyan p-8 rounded-r-xl">
                                <p className="text-xl italic text-white mb-4 leading-relaxed">
                                    "The customer support automation alone paid for itself in the first month. Our response times went
                                    from hours to seconds, and our customers love it. OASIS delivered exactly what they promised."
                                </p>
                                <p className="text-oasis-cyan font-bold text-lg">
                                    — E-commerce Founder
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Results Overview */}
            <section className="py-24 relative">
                <div className="section-container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
                    >
                        Results We <span className="text-oasis-cyan">Deliver</span>
                    </motion.h2>

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
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 hover:shadow-oasis transition-all duration-300 text-center hover:-translate-y-2 group"
                            >
                                <div className="mb-6 inline-block p-4 rounded-full bg-oasis-cyan/10 group-hover:bg-oasis-cyan/20 transition-colors">
                                    <item.icon className="w-10 h-10 text-oasis-cyan" />
                                </div>
                                <div className="text-4xl font-bold text-oasis-cyan mb-4">{item.metric}</div>
                                <p className="text-text-secondary text-lg leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative">
                <div className="section-container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-center mb-16"
                    >
                        What Our <span className="text-oasis-cyan">Clients</span> Say
                    </motion.h2>

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
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 hover:shadow-oasis transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-oasis-cyan text-oasis-cyan" />
                                    ))}
                                </div>
                                <p className="text-text-secondary mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oasis-cyan to-blue-500 flex items-center justify-center font-bold text-white">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.author}</div>
                                        <div className="text-sm text-oasis-cyan">{testimonial.title}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="section-container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold mb-8"
                        >
                            Ready to Write Your <span className="text-oasis-cyan">Success Story</span>?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
                        >
                            Join the growing number of businesses transforming their operations with intelligent automation.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link to="/contact">
                                <button className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300">
                                    Book Free Strategy Call
                                    <ArrowRight className="inline-block ml-2 w-6 h-6" />
                                </button>
                            </Link>
                            <Link to="/pricing">
                                <button className="btn-secondary text-lg px-10 py-5 hover:bg-white/10">
                                    View Pricing
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudiesPage;

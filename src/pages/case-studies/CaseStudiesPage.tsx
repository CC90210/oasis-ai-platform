import { Clock, Users, DollarSign, Star, ArrowRight, CheckCircle, Code } from 'lucide-react';
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
                            Our <span className="text-oasis-cyan">Work</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Real software. Real results. Real transformation.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Case Study: PropFlow */}
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
                                <span className="text-oasis-cyan font-bold tracking-wider text-sm">FEATURED PROJECT</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                                PropFlow: Real Estate Management, Reimagined
                            </h2>
                            <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-3xl">
                                A comprehensive property management platform built from the ground up for a portfolio of 200+ units.
                            </p>

                            {/* Challenge */}
                            <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">The Challenge</h3>
                                <p className="text-text-secondary leading-relaxed text-lg">
                                    A property management company was drowning in spreadsheets, manual document creation, and missed follow-ups. They were using 5 different disconnected tools to manage tenants, leases, and maintenance, leading to data errors and lost revenue.
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="mb-10">
                                <h3 className="text-2xl font-display font-bold mb-6 text-white">The Solution</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        "Custom-built Property & Unit Database",
                                        "Automated Tenant Application & Approval Flow",
                                        "One-Click Document Generation (Leases, Notices)",
                                        "Integrated Showings Calendar",
                                        "Automated Rent & Renewal Reminders",
                                        "Landlord Communication Portal"
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
                                    { icon: Clock, value: "40+", label: "Hours Saved / Week" },
                                    { icon: CheckCircle, value: "100%", label: "Document Delivery Rate" },
                                    { icon: Users, value: "3x", label: "Faster Onboarding" },
                                    { icon: DollarSign, value: "Zero", label: "Missed Renewals" }
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
                                    "PropFlow completely transformed how we manage our properties. The system handles all the heavy lifting—documents, reminders, scheduling—so we can focus on growing our portfolio."
                                </p>
                                <p className="text-oasis-cyan font-bold text-lg">
                                    — Property Manager
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Upcoming Projects */}
            <section className="py-24 relative">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">More Transformations</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Grapevine Cottage */}
                        <div className="glass-card p-8 hover:border-oasis-cyan/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Star className="w-32 h-32 text-oasis-cyan" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 border border-white/10">
                                    <Code className="w-6 h-6 text-oasis-cyan" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Grapevine Cottage</h3>
                                <p className="text-oasis-cyan text-sm font-bold mb-4 uppercase tracking-wider">Boutique Digital Evolution</p>
                                <p className="text-text-secondary mb-8 leading-relaxed flex-grow">
                                    End-to-end digital transformation for a cherished local thrift and boutique store. We engineered a highly optimized online presence, built a stunning custom website, and fully digitized their product catalog with seamless payment implementation. By deploying advanced backend automations for chat messaging and form submissions, we saved immense resources and gave the owner her time back.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/5">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <CheckCircle className="w-4 h-4 text-oasis-cyan" />
                                            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">Automation</span>
                                        </div>
                                        <div className="text-lg font-bold text-white">24/7 Chat & Forms</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Star className="w-4 h-4 text-oasis-cyan" />
                                            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">E-Commerce</span>
                                        </div>
                                        <div className="text-lg font-bold text-white">Listings & Payments</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-Volume E-Commerce */}
                        <div className="glass-card p-8 hover:border-oasis-cyan/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Clock className="w-32 h-32 text-oasis-cyan" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 border border-white/10">
                                    <DollarSign className="w-6 h-6 text-oasis-cyan" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">High-Volume E-Commerce</h3>
                                <p className="text-oasis-cyan text-sm font-bold mb-4 uppercase tracking-wider">Autonomous Shopify Agent</p>
                                <p className="text-text-secondary mb-8 leading-relaxed flex-grow">
                                    We deployed an intricate AI integration for a massively successful Shopify brand to entirely automate customer interactions and operational hurdles. By deeply analyzing their business model, we optimized processes that previously drained resources, permanently cutting their operational costs in half compared to human equivalents while effortlessly scaling with massive demand.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/5">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="w-4 h-4 text-oasis-cyan" />
                                            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">Revenue Handled</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white">$2M+</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="w-4 h-4 text-oasis-cyan" />
                                            <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">Cost Reduction</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white flex items-baseline gap-1">50% <span className="text-sm font-normal text-text-secondary tracking-normal">vs. human</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials (Keep existing ones but update tone slightly if needed, keeping generic) */}
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
                                quote: "Before OASIS AI, we were drowning in admin work. Now our property management runs itself while we sleep. They built exactly what we needed—no fluff, just results. Best investment we've made.",
                                author: "PropFlow Team",
                                title: "Real Estate Management"
                            },
                            {
                                quote: "OASIS AI brought our boutique to life online. From the stunning website build to automating our chat and form submissions, they optimized our business so we can focus entirely on our products. Truly above and beyond.",
                                author: "Kim",
                                title: "Owner, Grapevine Cottage"
                            },
                            {
                                quote: "Integrating OASIS AI into our Shopify store changed everything. It completely revolutionized our resource efficiency, effortlessly handling a $2M+ influx while cutting our costs by 50%. An absolute machine.",
                                author: "Operations Director",
                                title: "High-Volume Shopify Brand"
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
                            Ready to Build <span className="text-oasis-cyan">Something Great?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
                        >
                            Join the growing number of businesses transforming their operations with custom software.
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
                                    Start Your Project
                                    <ArrowRight className="inline-block ml-2 w-6 h-6" />
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

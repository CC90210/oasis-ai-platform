import { Clock, Users, DollarSign, Star, ArrowRight, CheckCircle, Code } from 'lucide-react';
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

const CaseStudiesPage = () => {
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
                        Case Studies
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">Our</span>
                        <span className="block italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            work.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                        Real software. Real results. Real transformation.
                    </motion.p>
                </motion.div>
            </section>

            {/* Featured Case Study: PropFlow */}
            <section className="py-20 relative z-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={fadeUp}
                        className="rounded-2xl bg-white/5 backdrop-blur-xl border border-oasis-teal/30 p-8 md:p-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-oasis-teal/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                        <div className="flex items-center gap-2 mb-6">
                            <Star className="w-5 h-5 text-oasis-teal fill-oasis-teal" />
                            <span className="text-oasis-teal font-mono text-sm tracking-[0.2em] uppercase">Featured Project</span>
                        </div>

                        <h2 className="font-editorial text-4xl md:text-5xl mb-6 text-white">
                            PropFlow: Real estate management, <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">reimagined</span>
                        </h2>
                        <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-3xl">
                            A comprehensive property management platform built from the ground up for a portfolio of 200+ units.
                        </p>

                        {/* Challenge */}
                        <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-editorial text-2xl mb-4 text-white">The Challenge</h3>
                            <p className="text-white/60 leading-relaxed text-lg">
                                A property management company was drowning in spreadsheets, manual document creation, and missed follow-ups. They were using 5 different disconnected tools to manage tenants, leases, and maintenance, leading to data errors and lost revenue.
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="mb-10">
                            <h3 className="font-editorial text-2xl mb-6 text-white">The Solution</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Custom-built Property & Unit Database",
                                    "Automated Tenant Application & Approval Flow",
                                    "One-Click Document Generation (Leases, Notices)",
                                    "Integrated Showings Calendar",
                                    "Automated Rent & Renewal Reminders",
                                    "Landlord Communication Portal"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <CheckCircle className="w-5 h-5 text-oasis-teal flex-shrink-0 mt-0.5" />
                                        <span className="text-white/80">{item}</span>
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
                                    className="text-center p-6 rounded-xl bg-white/5 border border-oasis-teal/20 hover:border-oasis-teal/40 transition-colors"
                                >
                                    <metric.icon className="w-8 h-8 text-oasis-teal mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-oasis-teal mb-1">{metric.value}</div>
                                    <div className="text-sm text-white/50">{metric.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quote */}
                        <div className="border-l-2 border-oasis-teal pl-8 py-2">
                            <p className="text-xl italic text-white/90 mb-4 leading-relaxed">
                                "PropFlow completely transformed how we manage our properties. The system handles all the heavy lifting — documents, reminders, scheduling — so we can focus on growing our portfolio."
                            </p>
                            <p className="text-oasis-teal font-semibold">
                                — Property Manager
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* More Transformations */}
            <section className="py-24 relative z-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl text-white">
                            More <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">transformations</span>
                        </motion.h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Grapevine Cottage */}
                        <motion.div
                            variants={fadeUp}
                            className="group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                <Star className="w-32 h-32 text-oasis-teal" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 rounded-xl bg-oasis-teal/10 w-fit mb-6 border border-oasis-teal/20">
                                    <Code className="w-6 h-6 text-oasis-teal" />
                                </div>
                                <h3 className="font-editorial text-3xl text-white mb-2">Grapevine Cottage</h3>
                                <p className="text-oasis-teal text-sm font-mono mb-4 uppercase tracking-[0.2em]">Boutique Digital Evolution</p>
                                <p className="text-white/60 mb-8 leading-relaxed flex-grow">
                                    End-to-end digital transformation for a cherished local thrift and boutique store. We engineered a highly optimized online presence, built a stunning custom website, and fully digitized their product catalog with seamless payment implementation. By deploying advanced backend automations for chat messaging and form submissions, we saved immense resources and gave the owner her time back.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <CheckCircle className="w-4 h-4 text-oasis-teal" />
                                            <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Automation</span>
                                        </div>
                                        <div className="text-base font-semibold text-white">24/7 Chat & Forms</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Star className="w-4 h-4 text-oasis-teal" />
                                            <span className="text-xs text-white/40 uppercase tracking-wider font-bold">E-Commerce</span>
                                        </div>
                                        <div className="text-base font-semibold text-white">Listings & Payments</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* High-Volume E-Commerce */}
                        <motion.div
                            variants={fadeUp}
                            className="group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                <Clock className="w-32 h-32 text-oasis-teal" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-3 rounded-xl bg-oasis-teal/10 w-fit mb-6 border border-oasis-teal/20">
                                    <DollarSign className="w-6 h-6 text-oasis-teal" />
                                </div>
                                <h3 className="font-editorial text-3xl text-white mb-2">High-Volume E-Commerce</h3>
                                <p className="text-oasis-teal text-sm font-mono mb-4 uppercase tracking-[0.2em]">Autonomous Shopify Agent</p>
                                <p className="text-white/60 mb-8 leading-relaxed flex-grow">
                                    We deployed an intricate AI integration for a massively successful Shopify brand to entirely automate customer interactions and operational hurdles. By deeply analyzing their business model, we optimized processes that previously drained resources, permanently cutting their operational costs in half compared to human equivalents while effortlessly scaling with massive demand.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/10">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="w-4 h-4 text-oasis-teal" />
                                            <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Revenue Handled</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white">$2M+</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="w-4 h-4 text-oasis-teal" />
                                            <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Cost Reduction</span>
                                        </div>
                                        <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                                            50% <span className="text-sm font-normal text-white/40">vs. human</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative z-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl text-white">
                            What our <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">clients say</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                quote: "Before OASIS AI, we were drowning in admin work. Now our property management runs itself while we sleep. They built exactly what we needed — no fluff, just results. Best investment we've made.",
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
                                variants={fadeUp}
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-300"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-oasis-teal text-oasis-teal" />
                                    ))}
                                </div>
                                <p className="text-white/70 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oasis-teal to-oasis-sky flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.author}</div>
                                        <div className="text-sm text-oasis-teal">{testimonial.title}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative z-10 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl leading-[0.95] mb-8">
                        <span className="text-white/95">Ready to build</span>{' '}
                        <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">something great?</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
                        Join the growing number of businesses transforming their operations with custom software.
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
                            Start Your Project
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default CaseStudiesPage;

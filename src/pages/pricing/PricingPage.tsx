import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HelpCircle, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ALL_AUTOMATIONS, BUNDLES as BUNDLES_OBJ, BundleProduct } from '@/lib/pricing';
import { SimplePricingCard } from '@/components/pricing/SimplePricingCard';
import { COMMON_INCLUSIONS } from '@/data/pricingData';
const BOOKING_LINK = 'https://calendar.app.google/tpfvJYBGircnGu8G8';

const BUNDLES: BundleProduct[] = Object.values(BUNDLES_OBJ);

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const PricingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen overflow-x-hidden font-sans text-white">
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
                        Pricing
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">Custom software.</span>
                        <span className="block italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            Intelligent automation.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                        Transparent pricing for enterprise-grade solutions. Secure your workflows, control your data.
                    </motion.p>
                </motion.div>
            </section>

            {/* First-Time User Banner */}
            <section className="relative z-10 px-6 mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeUp}
                    className="max-w-4xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-oasis-teal/30 p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-3 rounded-xl bg-oasis-teal/10 flex-shrink-0">
                                <Gift className="w-8 h-8 text-oasis-teal" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-lg mb-1">Partner with OASIS</p>
                                <p className="text-white/60">
                                    Book a discovery call today and get a{' '}
                                    <span className="text-white font-medium">Free Technical Architecture Map</span> for your business.
                                </p>
                            </div>
                        </div>
                        <a
                            href={BOOKING_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white font-semibold whitespace-nowrap hover:scale-[1.02] transition-all duration-300"
                        >
                            Book Call
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Bundle Packages */}
            <section className="relative z-10 px-6 mb-24">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl text-white mb-4">
                            Core <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">solutions</span>
                        </motion.h2>
                    </motion.div>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {BUNDLES.map((bundle, idx) => (
                            <SimplePricingCard
                                key={idx}
                                product={bundle}
                                type="bundle"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Automations Grid */}
            <section className="relative z-10 px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl text-white mb-4">
                            Individual <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">modules</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-white/60">Add integrated capabilities to your custom software.</motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.values(ALL_AUTOMATIONS).map((automation) => (
                            <SimplePricingCard
                                key={automation.id}
                                product={automation}
                                type="automation"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="relative z-10 px-6 mb-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="max-w-5xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12"
                >
                    <motion.div variants={fadeUp} className="text-center mb-10">
                        <h3 className="font-editorial text-3xl md:text-4xl text-white mb-4">
                            Included with <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">every build</span>
                        </h3>
                        <div className="h-px w-20 bg-gradient-to-r from-oasis-teal to-oasis-sky mx-auto rounded-full" />
                    </motion.div>

                    <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {COMMON_INCLUSIONS.map((inclusion, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                            >
                                <ShieldCheck className="w-5 h-5 text-oasis-teal flex-shrink-0" />
                                <span className="text-white/80 font-medium">{inclusion}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Enterprise CTA */}
            <section className="relative z-10 px-6 mb-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-oasis-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <motion.div variants={fadeUp}>
                            <h2 className="font-editorial text-3xl md:text-4xl text-white mb-2">Need something bigger?</h2>
                            <p className="text-oasis-teal font-semibold text-lg mb-4">Enterprise Partnership</p>
                            <p className="text-white/60 max-w-lg">
                                Full-scale custom software infrastructure, white-labeled platforms, and dedicated engineering teams.
                            </p>
                        </motion.div>
                        <motion.button
                            variants={fadeUp}
                            onClick={() => navigate('/contact')}
                            className="whitespace-nowrap px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
                        >
                            Contact Sales
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Custom Agreement CTA */}
            <section className="relative z-10 px-6 mb-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={stagger}
                    className="max-w-4xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-oasis-teal/30 p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-48 h-48 bg-oasis-teal/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-oasis-teal/10 border border-oasis-teal/20 flex items-center justify-center flex-shrink-0 text-3xl">
                            🤝
                        </div>
                        <motion.div variants={fadeUp} className="flex-1 text-center md:text-left">
                            <h3 className="font-editorial text-2xl md:text-3xl text-white mb-2">Have a Custom Agreement?</h3>
                            <p className="text-white/60">
                                Already discussed pricing with our team? Complete your custom deal online with secure payment.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => navigate('/custom-agreement')}
                                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white font-semibold whitespace-nowrap hover:scale-[1.02] transition-all duration-300"
                            >
                                Complete Custom Deal
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all whitespace-nowrap"
                            >
                                Contact for Enterprise
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="relative z-10 px-6 mb-24">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-12"
                    >
                        <motion.h2 variants={fadeUp} className="font-editorial text-4xl md:text-5xl text-white">
                            Common <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">questions</span>
                        </motion.h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="space-y-4"
                    >
                        {[
                            { q: "What happens after I purchase?", a: "A member of our team will contact you within 1 hour to schedule your setup consultation. We'll discuss your specific needs, collect any necessary credentials, and create a custom implementation plan for your business." },
                            { q: "How long does setup take?", a: "Most automations are live within 3-7 business days. Complex enterprise solutions may take 2-4 weeks depending on integration requirements." },
                            { q: "What's included in monthly ROI documentation?", a: "You get a detailed report showing exactly what your automation achieved: hours saved, leads captured, revenue generated, and interactions handled." },
                            { q: "Can I upgrade my plan later?", a: "Yes! You can upgrade or downgrade your subscription tier at any time. Changes take effect on your next billing cycle." }
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeUp}
                                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-left"
                            >
                                <h4 className="flex items-center text-lg font-semibold text-white mb-3">
                                    <HelpCircle className="w-5 h-5 text-oasis-teal mr-3 flex-shrink-0" />
                                    {faq.q}
                                </h4>
                                <p className="text-white/60 pl-8">{faq.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;

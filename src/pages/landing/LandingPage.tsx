import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, MessageSquare, Calendar, Mail, Database, Phone, ChevronDown, ChevronUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalBackground from '../../components/GlobalBackground';

const BOOKING_LINK = 'https://calendar.app.google/tpfvJYBGircnGu8G8';

// ── Reusable animation presets ────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const LandingPage = () => {
    const [roiInputs, setRoiInputs] = useState({ hoursPerWeek: 10, hourlyRate: 50, missedLeads: 10, leadValue: 100 });
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const calculateROI = () => {
        const monthlyTimeSavings = roiInputs.hoursPerWeek * 4 * roiInputs.hourlyRate;
        const monthlyLeadRevenue = roiInputs.missedLeads * roiInputs.leadValue;
        const totalMonthlyValue = monthlyTimeSavings + monthlyLeadRevenue;
        return { monthly: totalMonthlyValue, annual: totalMonthlyValue * 12 };
    };
    const roi = calculateROI();

    const faqs = [
        { q: "How long does implementation take?", a: "For individual agents, we're up and running in 3-5 business days. Custom integration suites run 7-14 days depending on complexity." },
        { q: "What's included in the monthly retainer?", a: "Server hosting, API credits (OpenAI, Anthropic), ongoing maintenance, bug fixes, and support. Your AI employees keep working 24/7." },
        { q: "Can I start small and expand?", a: "Absolutely. Most clients start with one agent and grow into full automation suites as they see ROI." },
        { q: "Do I need to be local?", a: "Not at all. We serve clients internationally through video, secure tools, and the client portal. Location is never the limit." },
        { q: "What industries do you work with?", a: "Deep expertise in HVAC, fitness, wellness, beauty, e-commerce, and professional services. Our systems adapt to any vertical." },
        { q: "Do I need technical knowledge?", a: "None. We handle all technical setup, integration, and maintenance. You just tell us what the AI should do." },
        { q: "What if something breaks?", a: "99.9% uptime monitoring. Issues are resolved before you notice — usually within minutes." }
    ];

    return (
        <div className="min-h-screen overflow-x-hidden font-sans text-white">
            {/* ═══════════════════════════════════════════════════════════════
                BACKGROUND — Stable dark ocean + lightweight canvas starfield
                (Canvas 2D twinkling stars, not heavy WebGL — same layer the
                original site used, no latency, no flashing.)
                ═══════════════════════════════════════════════════════════════ */}
            <div
                className="fixed inset-0 -z-20"
                style={{
                    background: 'linear-gradient(180deg, #030712 0%, #071426 50%, #030712 100%)'
                }}
            />
            <GlobalBackground intensity="high" showDNA={false} />

            {/* Subtle teal vignette — unified feel across all sections */}
            <div className="fixed inset-0 pointer-events-none -z-10" style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(6,182,212,0.08) 0%, transparent 65%)'
            }} />

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — HERO
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-6xl mx-auto text-center relative"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-oasis-teal/30 bg-oasis-slate/40 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-oasis-teal animate-pulse" />
                        <span className="text-sm font-medium tracking-wide text-oasis-mist/90">OASIS AI · 2026</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">Calm waters.</span>
                        <span className="block italic bg-gradient-to-r from-oasis-mist via-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            Intelligent tides.
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        Custom AI systems built from scratch — tailored to your business, embedded with intelligent agents that never sleep. Your operations, automated into an asset.
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
                        <Link to="/services" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white/90 font-medium hover:bg-white/5 transition-all">
                            Explore What We Build
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-20 flex flex-wrap justify-center items-center gap-8 text-white/40 text-sm">
                        <span>Trusted by businesses across Simcoe County</span>
                        <span className="hidden sm:block w-px h-4 bg-white/20" />
                        <span>99.9% uptime · 24/7 automation · Custom-built</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-6 h-6 text-white/40" />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — PAIN POINTS
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">Sound Familiar?</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">
                            The weight you carry every day
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: Clock, text: "Drowning in repetitive admin tasks" },
                            { icon: Zap, text: "Missing leads after business hours" },
                            { icon: TrendingUp, text: "Inconsistent customer response times" },
                            { icon: Bot, text: "Can't scale without hiring more staff" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-500"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-oasis-teal/0 to-oasis-sky/0 group-hover:from-oasis-teal/10 group-hover:to-oasis-sky/5 transition-all duration-500 -z-10" />
                                <div className="p-3 rounded-xl bg-oasis-teal/10 w-fit mb-6 group-hover:bg-oasis-teal/20 transition-colors">
                                    <item.icon className="w-7 h-7 text-oasis-teal" />
                                </div>
                                <p className="text-lg font-medium leading-relaxed text-white/90">{item.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — SERVICES
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">We Build What You Need</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">
                            Custom software. <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">Powered by AI.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-3xl mx-auto mt-6">
                            We don't sell templates. We architect enterprise-grade platforms tailored to your business, then embed intelligent agents to run them.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: Database, title: "Custom Portals", desc: "Client dashboards, internal tools, and management systems built from scratch." },
                            { icon: MessageSquare, title: "Intelligent Chat", desc: "Embedded AI support agents that know your business inside out." },
                            { icon: Target, title: "Lead Engines", desc: "Automated lead capture, qualification, and routing systems." },
                            { icon: Calendar, title: "Smart Scheduling", desc: "Booking systems that manage your calendar without you." },
                            { icon: Mail, title: "Inbox Zero", desc: "Email agents that draft, sort, and reply to communications." },
                            { icon: Phone, title: "Voice AI", desc: "Phone systems that handle calls naturally, 24/7." }
                        ].map((s, i) => (
                            <Link to="/services" key={i}>
                                <motion.div
                                    variants={fadeUp}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-sky/40 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-oasis-teal to-oasis-sky scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    <div className="mb-6 inline-block p-4 rounded-xl bg-gradient-to-br from-oasis-teal/10 to-oasis-sky/10 border border-oasis-teal/20 group-hover:border-oasis-teal/50 transition-colors">
                                        <s.icon className="w-7 h-7 text-oasis-teal group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="font-editorial text-3xl mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-oasis-teal group-hover:to-oasis-sky group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                        {s.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed mb-6">{s.desc}</p>
                                    <span className="inline-flex items-center gap-2 text-oasis-teal text-sm font-medium">
                                        Learn more
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — HOW IT WORKS
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">How It Works</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">
                            From consultation <br className="hidden md:block" />to automation
                        </motion.h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-oasis-teal/60 via-oasis-sky/40 to-transparent md:-translate-x-1/2" />

                        {[
                            { title: "Discovery", desc: "We dive deep into your business — workflows, pain points, vision.", time: "Day 1" },
                            { title: "Design & Build", desc: "Our team architects and develops custom software tailored to your exact needs.", time: "Week 1-2" },
                            { title: "Automate & Integrate", desc: "We embed intelligent automations that handle repetitive tasks and sync data.", time: "Week 3" },
                            { title: "Launch & Optimize", desc: "We deploy, train your team, and continuously improve based on real usage data.", time: "Ongoing" }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative flex items-start gap-6 md:gap-10 mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="hidden md:block flex-1" />
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-oasis-teal to-oasis-sky flex items-center justify-center font-editorial text-2xl text-white shadow-oasis-glow">
                                        {i + 1}
                                    </div>
                                </div>
                                <div className="flex-1 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-editorial text-3xl text-white">{step.title}</h3>
                                        <span className="text-xs font-mono text-oasis-teal bg-oasis-teal/10 px-3 py-1 rounded-full border border-oasis-teal/20">{step.time}</span>
                                    </div>
                                    <p className="text-white/70 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — PRICING
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-20"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">Simple Pricing</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">
                            Investment that <br className="hidden md:block" />pays for itself
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-2xl mx-auto mt-6">
                            Enterprise-grade automation at 65-75% below agency rates.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    >
                        {[
                            {
                                name: "Launchpad",
                                price: "$2,500",
                                desc: "Perfect for getting started with one powerful workflow.",
                                features: ["1 Custom AI Agent", "Website Chat Widget", "30 Days Support"],
                                cta: "Get Started",
                                href: "/checkout?product=launchpad",
                                featured: false
                            },
                            {
                                name: "Integration Suite",
                                price: "$7,500",
                                desc: "Custom software + 3 integrated automations.",
                                features: ["3-5 Custom Agents", "Voice AI + Chat", "CRM Integration", "90 Days Support"],
                                cta: "Book Consultation",
                                href: BOOKING_LINK,
                                featured: true
                            },
                            {
                                name: "Individual Agents",
                                price: "From $797",
                                desc: "Know exactly what you need? Pick and choose.",
                                features: ["Self-Checkout Available", "Specific Solutions", "Rapid Deployment"],
                                cta: "Browse Agents",
                                href: "/pricing",
                                featured: false
                            }
                        ].map((tier, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className={`relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-500 flex flex-col ${
                                    tier.featured
                                        ? 'bg-gradient-to-br from-oasis-teal/15 to-oasis-sky/10 border-oasis-teal/50 md:-translate-y-4 shadow-oasis-elevated'
                                        : 'bg-white/5 border-white/10 hover:border-oasis-teal/30'
                                }`}
                            >
                                {tier.featured && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white text-xs font-semibold tracking-wider uppercase shadow-oasis-glow">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="font-editorial text-3xl text-white mb-2">{tier.name}</h3>
                                <div className="font-editorial text-5xl italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent mb-4">{tier.price}</div>
                                <p className="text-white/60 mb-8">{tier.desc}</p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center text-sm text-white/80">
                                            <CheckCircle className="w-4 h-4 text-oasis-teal mr-3 flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {tier.href.startsWith('http') ? (
                                    <a href={tier.href} target="_blank" rel="noopener noreferrer" className={`w-full text-center py-3 rounded-full font-semibold transition-all ${tier.featured ? 'bg-gradient-to-r from-oasis-teal to-oasis-sky text-white hover:shadow-oasis-glow' : 'border border-white/20 text-white hover:bg-white/5'}`}>
                                        {tier.cta}
                                    </a>
                                ) : (
                                    <Link to={tier.href} className={`w-full text-center py-3 rounded-full font-semibold transition-all block ${tier.featured ? 'bg-gradient-to-r from-oasis-teal to-oasis-sky text-white hover:shadow-oasis-glow' : 'border border-white/20 text-white hover:bg-white/5'}`}>
                                        {tier.cta}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 6 — ROI CALCULATOR
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.span variants={fadeUp} className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">Calculate Your Savings</motion.span>
                        <motion.h2 variants={fadeUp} className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">See what AI saves you</motion.h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8 }}
                        className="relative p-10 md:p-14 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10"
                    >
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-oasis-teal/5 to-oasis-sky/5 -z-10" />

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                {[
                                    { label: 'Hours on admin per week', value: roiInputs.hoursPerWeek, min: 0, max: 40, step: 1, key: 'hoursPerWeek', display: roiInputs.hoursPerWeek },
                                    { label: 'Your hourly rate', value: roiInputs.hourlyRate, min: 25, max: 200, step: 5, key: 'hourlyRate', display: `$${roiInputs.hourlyRate}` },
                                    { label: 'Leads missed per month', value: roiInputs.missedLeads, min: 0, max: 100, step: 1, key: 'missedLeads', display: roiInputs.missedLeads },
                                    { label: 'Average value per lead', value: roiInputs.leadValue, min: 50, max: 1000, step: 50, key: 'leadValue', display: `$${roiInputs.leadValue}` }
                                ].map((input) => (
                                    <div key={input.key}>
                                        <label className="flex justify-between items-center text-sm font-medium text-white/70 mb-3">
                                            <span>{input.label}</span>
                                            <span className="font-editorial text-2xl italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                                                {input.display}
                                            </span>
                                        </label>
                                        <input
                                            type="range"
                                            min={input.min}
                                            max={input.max}
                                            step={input.step}
                                            value={input.value}
                                            onChange={(e) => setRoiInputs({ ...roiInputs, [input.key]: parseInt(e.target.value) })}
                                            className="w-full h-1 rounded-full appearance-none cursor-pointer bg-white/10 accent-oasis-teal"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col justify-center space-y-8 p-8 rounded-2xl bg-gradient-to-br from-oasis-teal/10 to-oasis-sky/5 border border-oasis-teal/20">
                                <div className="text-center">
                                    <div className="text-xs font-mono tracking-[0.3em] uppercase text-white/50 mb-3">Monthly Value</div>
                                    <motion.div
                                        key={roi.monthly}
                                        initial={{ scale: 0.95, opacity: 0.7 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-editorial text-6xl italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent"
                                    >
                                        ${roi.monthly.toLocaleString()}
                                    </motion.div>
                                </div>
                                <div className="text-center pt-4 border-t border-white/10">
                                    <div className="text-xs font-mono tracking-[0.3em] uppercase text-white/50 mb-3">Annual Value</div>
                                    <div className="font-editorial text-4xl italic text-white">${roi.annual.toLocaleString()}</div>
                                </div>
                                <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 rounded-full font-semibold bg-gradient-to-r from-oasis-teal to-oasis-sky text-white hover:shadow-oasis-glow transition-all block">
                                    Get Your Custom Quote
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 7 — CASE STUDY
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative p-10 md:p-16 rounded-3xl bg-white/5 backdrop-blur-2xl border border-oasis-teal/20 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-oasis-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                        <div className="grid md:grid-cols-2 gap-12 items-center relative">
                            <div>
                                <span className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">Real Results</span>
                                <h2 className="font-editorial text-4xl md:text-5xl italic mt-4 mb-8 text-white">
                                    PropFlow: real estate, <br />reimagined.
                                </h2>
                                <div className="space-y-4 mb-8">
                                    {[
                                        { label: 'Challenge', text: '200+ properties managed via spreadsheets.' },
                                        { label: 'Solution', text: 'Custom portal + auto-documents + rent reminders.' },
                                        { label: 'Results', text: '40+ hours/week saved, zero missed renewals.' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-oasis-teal mt-2 mr-4 flex-shrink-0" />
                                            <p className="text-white/80 leading-relaxed">
                                                <strong className="text-white">{item.label}:</strong> {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <blockquote className="border-l-2 border-oasis-teal pl-6 italic text-white/70 mb-8 font-editorial text-xl">
                                    "PropFlow completely transformed how we manage 200+ properties. The automation sends invoices before I even remember to."
                                </blockquote>
                                <Link to="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-oasis-teal/40 text-oasis-teal hover:bg-oasis-teal/10 transition-all">
                                    Read Full Case Study
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10">
                                <img
                                    src="/images/case-study-ecommerce.png"
                                    alt="PropFlow platform"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-oasis-slate/80 via-transparent to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 8 — FAQ
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-32 px-6 z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-oasis-teal font-mono text-sm tracking-[0.3em] uppercase">Questions</span>
                        <h2 className="font-editorial text-5xl md:text-7xl italic mt-4 text-white">Everything, answered.</h2>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-oasis-teal/30 transition-colors"
                            >
                                <button
                                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span className="font-medium text-white group-hover:text-oasis-teal transition-colors">{faq.q}</span>
                                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-oasis-teal" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-5 text-white/70 border-t border-white/10 pt-4">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 9 — FINAL CTA
                ═══════════════════════════════════════════════════════════════ */}
            <section className="relative py-40 px-6 overflow-hidden z-10">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] bg-oasis-teal/20 rounded-full blur-[180px] animate-pulse" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-5xl mx-auto text-center"
                >
                    <h2 className="font-editorial text-6xl md:text-8xl lg:text-9xl italic leading-[0.95] mb-10 text-white">
                        Your oasis <br />
                        <span className="bg-gradient-to-r from-oasis-teal via-oasis-sky to-oasis-mist bg-clip-text text-transparent">awaits.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
                        Book a 30-minute strategy call. We'll map exactly what to automate first — no pitch, no pressure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <a
                            href={BOOKING_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white text-lg font-semibold shadow-oasis-elevated hover:shadow-oasis-glow transition-all duration-500 hover:scale-[1.03]"
                        >
                            <span>Book Your Strategy Call</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="tel:+12403325062" className="inline-flex items-center gap-2 px-8 py-5 rounded-full border border-white/20 text-white/90 text-lg font-medium hover:bg-white/5 transition-all">
                            Or call +1 (240) 332-5062
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default LandingPage;

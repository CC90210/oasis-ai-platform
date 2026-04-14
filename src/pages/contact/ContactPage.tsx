import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { motion } from 'framer-motion';
const BOOKING_LINK = 'https://calendar.app.google/tpfvJYBGircnGu8G8';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const ContactPage = () => {
    const { isSubmitting, isSuccess, isError, errorMessage, submitForm, reset } = useFormSubmit();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        message: '',
        timewaster: '',
        website: '' // Honeypot field
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm('contact', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleReset = () => {
        reset();
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            industry: '',
            message: '',
            timewaster: '',
            website: ''
        });
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-oasis-teal/50 focus:ring-1 focus:ring-oasis-teal/30 transition-all";

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
                        Contact
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="font-editorial text-6xl md:text-8xl leading-[0.95] tracking-tight mb-8">
                        <span className="block text-white/95">Let's talk</span>
                        <span className="block italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">
                            automation.
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                        Book a free 15-30 minute strategy call, or fill out the form below and we'll be in touch within 24 hours.
                    </motion.p>
                    <motion.div variants={fadeUp} className="mt-8">
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
                    </motion.div>
                </motion.div>
            </section>

            {/* Contact Methods & Form */}
            <section className="py-20 relative z-10 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={stagger}
                            className="lg:col-span-1 space-y-4"
                        >
                            {[
                                {
                                    icon: Mail,
                                    title: "Email Us",
                                    content: <a href="mailto:oasisaisolutions@gmail.com" className="text-white/60 hover:text-oasis-teal transition-colors break-all text-sm">oasisaisolutions@gmail.com</a>
                                },
                                {
                                    icon: Phone,
                                    title: "Call Us",
                                    content: <a href="tel:+12403325062" className="text-white/60 hover:text-oasis-teal transition-colors">+1 (240) 332-5062</a>
                                },
                                {
                                    icon: MapPin,
                                    title: "Our Location",
                                    content: <p className="text-white/60">Collingwood, Ontario, Canada</p>
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-oasis-teal/40 transition-all duration-300"
                                >
                                    <div className="p-3 rounded-xl bg-oasis-teal/10 w-fit mb-4 group-hover:bg-oasis-teal/20 transition-colors">
                                        <item.icon className="w-6 h-6 text-oasis-teal" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2 text-white">{item.title}</h3>
                                    {item.content}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            className="lg:col-span-2"
                        >
                            <div className="p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                                <h2 className="font-editorial text-3xl md:text-4xl text-white mb-8">Send us a message</h2>

                                {/* Success State */}
                                {isSuccess ? (
                                    <div className="bg-oasis-teal/5 border border-oasis-teal/20 rounded-2xl p-12 text-center">
                                        <div className="w-20 h-20 bg-oasis-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-12 h-12 text-oasis-teal" />
                                        </div>
                                        <h3 className="text-3xl font-semibold text-white mb-4">Message Sent!</h3>
                                        <p className="text-white/60 mb-8 text-lg">
                                            Thanks for reaching out. We'll get back to you within 24 hours, usually much sooner.
                                        </p>
                                        <button
                                            onClick={handleReset}
                                            className="text-oasis-teal hover:text-white transition-colors font-medium"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Honeypot field - hidden from humans */}
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            style={{ display: 'none' }}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-white/60 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-white/60 mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="Your Company Inc."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-white/60 mb-2">
                                                Industry
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="industry"
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleChange}
                                                    className={`${inputClass} appearance-none`}
                                                >
                                                    <option value="" className="bg-[#071426]">Select an industry...</option>
                                                    <option value="hvac" className="bg-[#071426]">HVAC & Home Services</option>
                                                    <option value="fitness" className="bg-[#071426]">Fitness & Wellness</option>
                                                    <option value="beauty" className="bg-[#071426]">Beauty & Personal Care</option>
                                                    <option value="ecommerce" className="bg-[#071426]">E-commerce & Retail</option>
                                                    <option value="professional" className="bg-[#071426]">Professional Services</option>
                                                    <option value="healthcare" className="bg-[#071426]">Healthcare</option>
                                                    <option value="property" className="bg-[#071426]">Property Management</option>
                                                    <option value="restaurant" className="bg-[#071426]">Restaurants & Hospitality</option>
                                                    <option value="realestate" className="bg-[#071426]">Real Estate</option>
                                                    <option value="legal" className="bg-[#071426]">Legal & Accounting</option>
                                                    <option value="other" className="bg-[#071426]">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                    <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">
                                                Describe Your Automation Needs *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Tell us about your biggest time-wasters and what you'd like to automate..."
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="timewaster" className="block text-sm font-medium text-white/60 mb-2">
                                                What's your biggest time-waster right now? (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="timewaster"
                                                name="timewaster"
                                                value={formData.timewaster}
                                                onChange={handleChange}
                                                className={inputClass}
                                                placeholder="e.g., Following up with leads manually"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {isError && (
                                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-oasis-teal to-oasis-sky text-white font-semibold hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>

                                        <p className="text-sm text-white/40 text-center">
                                            We typically respond within 24 hours. For urgent inquiries, call us at{' '}
                                            <a href="tel:+12403325062" className="text-oasis-teal hover:underline">
                                                +1 (240) 332-5062
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Happens Next */}
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
                            What happens <span className="italic bg-gradient-to-r from-oasis-teal to-oasis-sky bg-clip-text text-transparent">next?</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                step: "1",
                                title: "Discovery Call",
                                description: "We discuss your business goals, current bottlenecks, and vision. No sales pitch — just strategy."
                            },
                            {
                                step: "2",
                                title: "Architecture Plan",
                                description: "We design a comprehensive Technical Architecture Map showing exactly how your custom software will work."
                            },
                            {
                                step: "3",
                                title: "Build & Launch",
                                description: "Our team builds your platform and integrates intelligent agents. We launch only when you're 100% satisfied."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                className="text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-oasis-teal/40 flex items-center justify-center text-2xl font-bold text-oasis-teal mx-auto mb-6 transition-all duration-300">
                                    {item.step}
                                </div>
                                <h3 className="font-editorial text-2xl mb-4 text-white">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

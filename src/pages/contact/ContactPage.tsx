import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { motion } from 'framer-motion';

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

    return (
        <div className="bg-bg-primary font-sans text-text-primary relative overflow-hidden">
            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none">
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-8"
                        >
                            Let's <span className="text-oasis-cyan">Talk</span> Automation
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                        >
                            Book a free 15-30 minute strategy call, or fill out the form below and we'll be in touch within 24 hours.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Contact Methods & Form */}
            <section className="py-20 bg-bg-secondary">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 hover:shadow-oasis transition-all group"
                            >
                                <Mail className="w-10 h-10 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Email Us</h3>
                                <a href="mailto:oasisaisolutions@gmail.com" className="text-text-secondary hover:text-oasis-cyan transition-colors break-all">
                                    oasisaisolutions@gmail.com
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="glass-card p-8 hover:shadow-oasis transition-all group"
                            >
                                <Phone className="w-10 h-10 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Call Us</h3>
                                <a href="tel:705-440-3117" className="text-text-secondary hover:text-oasis-cyan transition-colors">
                                    705-440-3117
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="glass-card p-8 hover:shadow-oasis transition-all group"
                            >
                                <MapPin className="w-10 h-10 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Our Locations</h3>
                                <p className="text-text-secondary mb-1">Toronto, Ontario (HQ)</p>
                                <p className="text-text-secondary">Montreal, Quebec</p>
                            </motion.div>


                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="glass-card p-8 md:p-10">
                                <h2 className="text-3xl font-display font-bold mb-8 text-white">Send Us a Message</h2>

                                {/* Success State */}
                                {isSuccess ? (
                                    <div className="bg-[#00FF88]/10 border-2 border-[#00FF88]/30 rounded-2xl p-12 text-center animate-fade-in-up">
                                        <div className="w-20 h-20 bg-[#00FF88]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-12 h-12 text-[#00FF88]" />
                                        </div>
                                        <h3 className="text-3xl font-semibold text-white mb-4">Message Sent Successfully!</h3>
                                        <p className="text-text-secondary mb-8 text-lg">
                                            Thanks for reaching out. We'll get back to you within 24 hours, usually much sooner!
                                        </p>
                                        <button
                                            onClick={handleReset}
                                            className="text-oasis-cyan hover:text-white hover:underline font-medium text-lg transition-colors"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
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

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                    placeholder="Your Company Inc."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-text-secondary mb-2">
                                                Industry
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="industry"
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-bg-primary">Select an industry...</option>
                                                    <option value="hvac" className="bg-bg-primary">HVAC & Home Services</option>
                                                    <option value="fitness" className="bg-bg-primary">Fitness & Wellness</option>
                                                    <option value="beauty" className="bg-bg-primary">Beauty & Personal Care</option>
                                                    <option value="ecommerce" className="bg-bg-primary">E-commerce & Retail</option>
                                                    <option value="professional" className="bg-bg-primary">Professional Services</option>
                                                    <option value="healthcare" className="bg-bg-primary">Healthcare</option>
                                                    <option value="property" className="bg-bg-primary">Property Management</option>
                                                    <option value="restaurant" className="bg-bg-primary">Restaurants & Hospitality</option>
                                                    <option value="realestate" className="bg-bg-primary">Real Estate</option>
                                                    <option value="legal" className="bg-bg-primary">Legal & Accounting</option>
                                                    <option value="other" className="bg-bg-primary">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                    <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                                                Describe Your Automation Needs *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all resize-none"
                                                placeholder="Tell us about your biggest time-wasters and what you'd like to automate..."
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="timewaster" className="block text-sm font-medium text-text-secondary mb-2">
                                                What's your biggest time-waster right now? (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="timewaster"
                                                name="timewaster"
                                                value={formData.timewaster}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border border-white/10 text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                placeholder="e.g., Following up with leads manually"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {isError && (
                                            <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B]/30 rounded-xl p-4 text-[#FF6B6B] flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-oasis hover:shadow-oasis-strong transition-all"
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

                                        <p className="text-sm text-text-tertiary text-center">
                                            We typically respond within 24 hours. For urgent inquiries, call us at{' '}
                                            <a href="tel:705-440-3117" className="text-oasis-cyan hover:underline">
                                                705-440-3117
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Contact Us */}
            <section className="py-20 bg-bg-primary">
                <div className="section-container">
                    <h2 className="text-4xl font-display font-bold text-center mb-16">
                        What Happens <span className="text-oasis-cyan">Next</span>?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: "1",
                                title: "We Listen",
                                description: "Tell us about your business, your processes, and your pain points. No sales pitch—just honest conversation."
                            },
                            {
                                step: "2",
                                title: "We Propose",
                                description: "Within 2-3 days, you'll receive a detailed automation plan with fixed pricing and clear timelines."
                            },
                            {
                                step: "3",
                                title: "We Build",
                                description: "Once approved, we build your AI workforce in 5-14 days. You approve each milestone before we proceed."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 rounded-full bg-bg-secondary border-2 border-oasis-cyan flex items-center justify-center text-3xl font-bold text-oasis-cyan mx-auto mb-6 shadow-oasis group-hover:bg-oasis-cyan group-hover:text-bg-primary transition-all duration-300">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

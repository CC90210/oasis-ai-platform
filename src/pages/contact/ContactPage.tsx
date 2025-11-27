import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useFormSubmit } from '../../hooks/useFormSubmit';

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
        <div className="bg-deep-black min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-dark py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Let's <span className="text-neon">Talk</span> Automation
                        </h1>
                        <p className="text-xl text-light-gray max-w-2xl mx-auto">
                            Book a free 15-30 minute strategy call, or fill out the form below and we'll be in touch within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods & Form */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-2xl p-6 hover:shadow-neon transition-all"
                            >
                                <Mail className="w-10 h-10 text-neon mb-4" />
                                <h3 className="font-display font-bold text-xl mb-2">Email Us</h3>
                                <a href="mailto:oasisaisolutions@gmail.com" className="text-light-gray hover:text-neon transition-colors break-all">
                                    oasisaisolutions@gmail.com
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-2xl p-6 hover:shadow-neon transition-all"
                            >
                                <Phone className="w-10 h-10 text-neon mb-4" />
                                <h3 className="font-display font-bold text-xl mb-2">Call Us</h3>
                                <a href="tel:705-440-3117" className="text-light-gray hover:text-neon transition-colors">
                                    705-440-3117
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-2xl p-6 hover:shadow-neon transition-all"
                            >
                                <MapPin className="w-10 h-10 text-neon mb-4" />
                                <h3 className="font-display font-bold text-xl mb-2">Our Locations</h3>
                                <p className="text-light-gray mb-2">Toronto, Ontario (HQ)</p>
                                <p className="text-light-gray">Montreal, Quebec</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-2xl p-6 bg-gradient-neon/10 border-2 border-neon"
                            >
                                <Calendar className="w-10 h-10 text-neon mb-4" />
                                <h3 className="font-display font-bold text-xl mb-2">Book a Call</h3>
                                <p className="text-light-gray mb-4">
                                    Schedule a free 15-30 minute strategy session
                                </p>
                                <a
                                    href="https://calendly.com/oasis-ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full inline-block text-center"
                                >
                                    Book Now
                                </a>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-effect rounded-2xl p-8"
                            >
                                <h2 className="text-3xl font-display font-bold mb-6">Send Us a Message</h2>

                                {/* Success State */}
                                {isSuccess ? (
                                    <div className="bg-[#00FF88]/10 border-2 border-[#00FF88]/30 rounded-2xl p-8 text-center">
                                        <div className="w-16 h-16 bg-[#00FF88]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-10 h-10 text-[#00FF88]" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                                        <p className="text-light-gray mb-6">
                                            Thanks for reaching out. We'll get back to you within 24 hours, usually much sooner!
                                        </p>
                                        <button
                                            onClick={handleReset}
                                            className="text-[#00D4FF] hover:underline font-medium"
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
                                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                                    placeholder="Your Company Inc."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                                                Industry
                                            </label>
                                            <select
                                                id="industry"
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                            >
                                                <option value="">Select an industry...</option>
                                                <option value="hvac">HVAC & Home Services</option>
                                                <option value="fitness">Fitness & Wellness</option>
                                                <option value="beauty">Beauty & Personal Care</option>
                                                <option value="ecommerce">E-commerce & Retail</option>
                                                <option value="professional">Professional Services</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="property">Property Management</option>
                                                <option value="restaurant">Restaurants & Hospitality</option>
                                                <option value="realestate">Real Estate</option>
                                                <option value="legal">Legal & Accounting</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                                Describe Your Automation Needs *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all resize-none"
                                                placeholder="Tell us about your biggest time-wasters and what you'd like to automate..."
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="timewaster" className="block text-sm font-medium text-white mb-2">
                                                What's your biggest time-waster right now? (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="timewaster"
                                                name="timewaster"
                                                value={formData.timewaster}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-dark-navy border border-neon/20 text-white placeholder-light-gray focus:outline-none focus:border-neon focus:ring-2 focus:ring-neon/20 transition-all"
                                                placeholder="e.g., Following up with leads manually"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {isError && (
                                            <div className="bg-[#FF6B6B]/10 border-2 border-[#FF6B6B]/30 rounded-xl p-4 text-[#FF6B6B]">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

                                        <p className="text-sm text-light-gray text-center">
                                            We typically respond within 24 hours. For urgent inquiries, call us at{' '}
                                            <a href="tel:705-440-3117" className="text-neon hover:underline">
                                                705-440-3117
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Contact Us */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl font-display font-bold text-center mb-12">
                        What Happens <span className="text-neon">Next</span>?
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
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-neon flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3">{item.title}</h3>
                                <p className="text-light-gray">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, CheckCircle } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const ContactPage = () => {
    const { isSubmitting, isSuccess, isError, errorMessage, submitForm, reset } = useFormSubmit();
    const observerRef = useRef<IntersectionObserver | null>(null);

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
            <section className="relative overflow-hidden bg-gradient-dark py-24">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-neon/20 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Let's <span className="text-neon">Talk</span> Automation
                        </h1>
                        <p className="text-xl md:text-2xl text-light-gray max-w-3xl mx-auto leading-relaxed">
                            Book a free 15-30 minute strategy call, or fill out the form below and we'll be in touch within 24 hours.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods & Form */}
            <section className="py-20 bg-deep-black">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="animate-on-scroll glass-effect rounded-2xl p-8 hover:shadow-neon transition-all border border-white/5 group">
                                <Mail className="w-10 h-10 text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Email Us</h3>
                                <a href="mailto:oasisaisolutions@gmail.com" className="text-light-gray hover:text-neon transition-colors break-all">
                                    oasisaisolutions@gmail.com
                                </a>
                            </div>

                            <div className="animate-on-scroll glass-effect rounded-2xl p-8 hover:shadow-neon transition-all border border-white/5 group" style={{ transitionDelay: '100ms' }}>
                                <Phone className="w-10 h-10 text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Call Us</h3>
                                <a href="tel:705-440-3117" className="text-light-gray hover:text-neon transition-colors">
                                    705-440-3117
                                </a>
                            </div>

                            <div className="animate-on-scroll glass-effect rounded-2xl p-8 hover:shadow-neon transition-all border border-white/5 group" style={{ transitionDelay: '200ms' }}>
                                <MapPin className="w-10 h-10 text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Our Locations</h3>
                                <p className="text-light-gray mb-1">Toronto, Ontario (HQ)</p>
                                <p className="text-light-gray">Montreal, Quebec</p>
                            </div>

                            <div className="animate-on-scroll glass-effect rounded-2xl p-8 bg-gradient-neon/10 border-2 border-neon group" style={{ transitionDelay: '300ms' }}>
                                <Calendar className="w-10 h-10 text-neon mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display font-bold text-xl mb-2 text-white">Book a Call</h3>
                                <p className="text-light-gray mb-6">
                                    Schedule a free 15-30 minute strategy session
                                </p>
                                <a
                                    href="https://calendly.com/oasis-ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full inline-block text-center py-3 shadow-neon"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="animate-on-scroll glass-effect rounded-2xl p-8 md:p-10 border border-white/5">
                                <h2 className="text-3xl font-display font-bold mb-8 text-white">Send Us a Message</h2>

                                {/* Success State */}
                                {isSuccess ? (
                                    <div className="bg-[#00FF88]/10 border-2 border-[#00FF88]/30 rounded-2xl p-12 text-center animate-fade-in-up">
                                        <div className="w-20 h-20 bg-[#00FF88]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-12 h-12 text-[#00FF88]" />
                                        </div>
                                        <h3 className="text-3xl font-semibold text-white mb-4">Message Sent Successfully!</h3>
                                        <p className="text-light-gray mb-8 text-lg">
                                            Thanks for reaching out. We'll get back to you within 24 hours, usually much sooner!
                                        </p>
                                        <button
                                            onClick={handleReset}
                                            className="text-[#00D4FF] hover:text-white hover:underline font-medium text-lg transition-colors"
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
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
                                                    placeholder="Your Company Inc."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                                                Industry
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="industry"
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all appearance-none"
                                                >
                                                    <option value="" className="bg-dark-navy">Select an industry...</option>
                                                    <option value="hvac" className="bg-dark-navy">HVAC & Home Services</option>
                                                    <option value="fitness" className="bg-dark-navy">Fitness & Wellness</option>
                                                    <option value="beauty" className="bg-dark-navy">Beauty & Personal Care</option>
                                                    <option value="ecommerce" className="bg-dark-navy">E-commerce & Retail</option>
                                                    <option value="professional" className="bg-dark-navy">Professional Services</option>
                                                    <option value="healthcare" className="bg-dark-navy">Healthcare</option>
                                                    <option value="property" className="bg-dark-navy">Property Management</option>
                                                    <option value="restaurant" className="bg-dark-navy">Restaurants & Hospitality</option>
                                                    <option value="realestate" className="bg-dark-navy">Real Estate</option>
                                                    <option value="legal" className="bg-dark-navy">Legal & Accounting</option>
                                                    <option value="other" className="bg-dark-navy">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                                Describe Your Automation Needs *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all resize-none"
                                                placeholder="Tell us about your biggest time-wasters and what you'd like to automate..."
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="timewaster" className="block text-sm font-medium text-gray-300 mb-2">
                                                What's your biggest time-waster right now? (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="timewaster"
                                                name="timewaster"
                                                value={formData.timewaster}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
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
                                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-neon hover:shadow-neon-strong transition-all"
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

                                        <p className="text-sm text-gray-400 text-center">
                                            We typically respond within 24 hours. For urgent inquiries, call us at{' '}
                                            <a href="tel:705-440-3117" className="text-neon hover:underline">
                                                705-440-3117
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Contact Us */}
            <section className="py-20 bg-dark-navy">
                <div className="section-container">
                    <h2 className="text-4xl font-display font-bold text-center mb-16 animate-on-scroll">
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
                            <div
                                key={index}
                                className="animate-on-scroll text-center group"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="w-20 h-20 rounded-full bg-black border-2 border-neon flex items-center justify-center text-3xl font-bold text-neon mx-auto mb-6 shadow-neon group-hover:bg-neon group-hover:text-black transition-all duration-300">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-light-gray leading-relaxed max-w-xs mx-auto">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle, ImageOff } from 'lucide-react';

const CaseStudiesPage = () => {
    const caseStudies = [
        {
            id: 'ecommerce-support',
            title: 'Scaling Support for a High-Growth E-Commerce Brand',
            client: 'LuxeAthletics',
            industry: 'E-Commerce / Fashion',
            stats: [
                { label: 'Response Time', value: '< 30s', icon: Clock },
                { label: 'Support Costs', value: '-40%', icon: TrendingUp },
                { label: 'CSAT Score', value: '4.9/5', icon: Users },
            ],
            summary: "LuxeAthletics was growing fast, but their customer support team was drowning. They were missing messages on Instagram, taking 24+ hours to reply to emails, and losing sales. We implemented a Multi-Channel AI Support Agent that handles 80% of inquiries automatically.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" // Friends/Shopping
        },
        {
            id: 'hvac-lead-capture',
            title: 'Doubling Lead Conversion for a Local HVAC Company',
            client: 'CoolBreeze HVAC',
            industry: 'Home Services',
            stats: [
                { label: 'Leads Captured', value: '+150%', icon: Users },
                { label: 'Booking Rate', value: '35%', icon: CheckCircle },
                { label: 'Admin Hours', value: '-15/wk', icon: Clock },
            ],
            summary: "CoolBreeze was missing calls while out on jobs. We set up a Voice AI agent to answer phones 24/7, qualify leads, and book appointments directly into their calendar. They never miss a potential customer now.",
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80" // Industrial/Tech
        },
        {
            id: 'real-estate-outreach',
            title: 'Automating Cold Outreach for a Real Estate Agency',
            client: 'Prime Properties',
            industry: 'Real Estate',
            stats: [
                { label: 'Meetings Booked', value: '+300%', icon: TrendingUp },
                { label: 'Open Rate', value: '65%', icon: Users },
                { label: 'Agent Morale', value: 'High', icon: CheckCircle },
            ],
            summary: "Agents were burning out making 50 cold calls a day. We built an automated outreach system that sends personalized emails and SMS to warm leads, only passing them to agents when they are ready to book a viewing.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" // Building
        }
    ];

    const [imageError, setImageError] = useState<Record<string, boolean>>({});

    const handleImageError = (id: string) => {
        setImageError(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="bg-bg-primary min-h-screen pt-24 pb-20">
            <div className="section-container">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Client <span className="text-oasis-cyan">Success</span> Stories
                    </h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        See how businesses like yours are using AI to save time, cut costs, and explode their growth.
                    </p>
                </div>

                <div className="space-y-24">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-oasis-strong group aspect-video bg-bg-tertiary">
                                    <div className="absolute inset-0 bg-oasis-cyan/10 group-hover:bg-transparent transition-colors duration-500 z-10" />

                                    {!imageError[study.id] ? (
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            onError={() => handleImageError(study.id)}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-bg-tertiary to-bg-secondary">
                                            <TrendingUp className="w-16 h-16 text-oasis-cyan opacity-20 mb-4" />
                                            <span className="text-text-tertiary text-sm">Image unavailable</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="bg-bg-primary/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-white border border-white/10">
                                            {study.client}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div>
                                    <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm mb-2 block">{study.industry}</span>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                        {study.title}
                                    </h2>
                                    <p className="text-text-secondary text-lg leading-relaxed">
                                        {study.summary}
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {study.stats.map((stat, i) => (
                                        <div key={i} className="bg-bg-tertiary/50 border border-white/5 p-4 rounded-xl text-center">
                                            <stat.icon className="w-6 h-6 text-oasis-cyan mx-auto mb-2" />
                                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                            <div className="text-xs text-text-tertiary uppercase tracking-wide">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4">
                                    <Link to="/contact" className="btn-secondary inline-flex items-center">
                                        Get Similar Results <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 text-center bg-gradient-dark rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-oasis-cyan/5 animate-pulse-glow pointer-events-none" />
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10">
                        Ready to Write Your Success Story?
                    </h2>
                    <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto relative z-10">
                        Join the forward-thinking businesses that are automating their way to the top.
                    </p>
                    <Link to="/contact" className="btn-primary text-lg px-8 py-4 relative z-10">
                        Book Your Strategy Call
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesPage;

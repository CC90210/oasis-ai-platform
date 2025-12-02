import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageSquare, Star, Mail, Calendar, Target, Phone, Database, Layers } from 'lucide-react';

const agents = {
    'chat-widget': {
        title: 'Website Chat Widget Agent',
        price: 797,
        description: '24/7 AI-powered chat assistant on your website that answers questions, qualifies leads, captures contact information, and books appointments.',
        icon: MessageSquare,
        features: [
            'Custom-trained AI chatbot matching your brand voice',
            'Lead capture form integration',
            'FAQ knowledge base setup (up to 50 Q&As)',
            'Email notification for new leads',
            'Mobile-responsive chat widget',
            '14-day support + training'
        ],
        roi: {
            costPerMissedLead: '$50-$500',
            leadsCaptured: '10-50',
            monthlyValue: '$500-$25,000',
            payback: '1-2 weeks'
        }
    },
    'google-reviews': {
        title: 'Google Review Response Agent',
        price: 597,
        description: 'Automatically monitors and responds to Google reviews, drafts personalized responses, and alerts you to negative reviews for human approval.',
        icon: Star,
        features: [
            'Google Business Profile integration',
            'Auto-response for 5-star reviews',
            'Human-in-the-loop for negative reviews',
            'Telegram/Email alerts for new reviews',
            'Response templates customized to your brand',
            'Review sentiment analysis'
        ],
        roi: {
            timeSaved: '1-8 hours',
            value: 'Priceless reputation protection',
            payback: 'Immediate'
        }
    },
    'email-automation': {
        title: 'Gmail/Email Automation Agent',
        price: 997,
        description: 'Intelligent email processing that categorizes, prioritizes, drafts responses, and routes emails to the right team members automatically.',
        icon: Mail,
        features: [
            'Gmail/Outlook integration',
            'AI-powered email categorization',
            'Auto-draft responses for common inquiries',
            'Priority inbox with sentiment detection',
            'CRM integration for lead emails',
            'Follow-up reminder automation'
        ],
        roi: {
            hoursSaved: '8-16 hours/week',
            monthlyValue: '$1,600-$3,200',
            payback: '1-2 weeks'
        }
    },
    'appointment-booking': {
        title: 'Appointment Booking Agent',
        price: 897,
        description: 'AI-powered scheduling assistant that handles booking requests via chat, email, or phone, syncs with your calendar, and sends confirmations/reminders.',
        icon: Calendar,
        features: [
            'Google Calendar/Calendly integration',
            'Natural language booking',
            'Automatic confirmation emails',
            'Reminder sequences (24hr, 1hr before)',
            'Rescheduling and cancellation handling',
            'Time zone detection'
        ],
        roi: {
            monthlyTimeSaved: '2-25 hours',
            noShowReduction: '30-50%',
            payback: '1 month'
        }
    },
    'lead-capture': {
        title: 'Lead Capture & Qualification Agent',
        price: 897,
        description: 'Captures leads from multiple sources, qualifies them with AI-powered conversations, scores them, and routes hot leads to your sales team.',
        icon: Target,
        features: [
            'Multi-source lead capture',
            'AI qualification conversations',
            'Lead scoring algorithm',
            'CRM integration (HubSpot, Salesforce, etc.)',
            'Hot lead alerts via Telegram/SMS',
            'Weekly lead pipeline reports'
        ],
        roi: {
            monthlyHoursSaved: '10-30 hours',
            conversionIncrease: '+25-50%',
            payback: '2-4 weeks'
        }
    },
    'voice-ai': {
        title: 'Voice AI Phone Agent',
        price: '2,497 - 3,997',
        description: 'AI-powered phone system that answers calls 24/7, handles inquiries, books appointments, qualifies leads, and transfers to humans when needed.',
        icon: Phone,
        features: [
            'Twilio phone number setup',
            'ElevenLabs voice AI with natural speech',
            'Custom voice personality',
            'Call recording and transcription',
            'CRM integration for call logs',
            'Call routing and transfer logic'
        ],
        roi: {
            missedCalls: '50-200/month',
            lostRevenue: '$2,500-$100,000',
            payback: '1-2 months'
        },
        consultation: true
    },
    'rag-knowledge': {
        title: 'RAG Knowledge Base Agent',
        price: '1,997 - 2,997',
        description: 'AI agent with access to all your company knowledge (documents, SOPs, manuals, FAQs) that can answer complex questions with source citations.',
        icon: Database,
        features: [
            'Pinecone vector database setup',
            'Document ingestion pipeline',
            'Semantic search with citations',
            'Integration with chat/email/voice agents',
            'Knowledge base management dashboard',
            'Auto-refresh for updated documents'
        ],
        consultation: true
    },
    'custom-multi-agent': {
        title: 'Custom Multi-Agent System',
        price: '4,997+',
        description: 'Fully custom AI automation ecosystem with multiple coordinated agents working together to transform your entire business operations.',
        icon: Layers,
        features: [
            'Full customer journey automation',
            'Operations command center',
            'Industry-specific automation suites',
            'Complex integration projects',
            'Milestone-based development',
            'Comprehensive training and handoff'
        ],
        consultation: true
    }
};

const AgentPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const agent = agents[slug as keyof typeof agents];

    if (!agent) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center text-white">
                Agent not found
            </div>
        );
    }

    const Icon = agent.icon;

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center justify-center p-3 bg-oasis-cyan/10 rounded-xl mb-6">
                                <Icon className="w-8 h-8 text-oasis-cyan" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                                {agent.title}
                            </h1>
                            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                                {agent.description}
                            </p>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="text-3xl font-bold text-oasis-cyan">
                                    ${agent.price}
                                    {!agent.consultation && <span className="text-sm text-text-tertiary font-normal ml-2">one-time setup</span>}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {agent.consultation ? (
                                    <Link to="/contact" className="btn-primary text-center shadow-oasis">
                                        Book Consultation
                                    </Link>
                                ) : (
                                    <Link to={`/checkout?agent=${slug}`} className="btn-primary text-center shadow-oasis">
                                        Add to Cart
                                    </Link>
                                )}
                                <Link to="/services" className="btn-secondary text-center">
                                    View All Agents
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-oasis-cyan/20 blur-3xl rounded-full opacity-30" />
                            <div className="glass-card p-8 relative z-10 border-oasis-cyan/30 shadow-oasis">
                                <h3 className="text-xl font-display font-bold text-white mb-6">What's Included</h3>
                                <ul className="space-y-4">
                                    {agent.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="w-5 h-5 text-oasis-cyan mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-text-secondary">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ROI Section */}
            {agent.roi && (
                <section className="bg-bg-secondary py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-display font-bold text-white mb-4">Return on Investment</h2>
                            <p className="text-text-secondary max-w-2xl mx-auto">
                                Our agents pay for themselves in weeks, not years. Here's the typical value delivered.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Object.entries(agent.roi).map(([key, value], index) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-6 text-center hover:shadow-oasis transition-all"
                                >
                                    <div className="text-3xl font-bold text-oasis-cyan mb-2">{value}</div>
                                    <div className="text-text-tertiary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center glass-card p-12 border-oasis-cyan/30 relative overflow-hidden shadow-oasis-strong"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oasis-cyan to-transparent" />
                    <h2 className="text-3xl font-display font-bold text-white mb-6">Ready to Automate?</h2>
                    <p className="text-text-secondary mb-8 text-lg">
                        Get your {agent.title} set up and running in just a few days.
                    </p>
                    {agent.consultation ? (
                        <Link to="/contact" className="btn-primary inline-flex items-center shadow-oasis">
                            Book Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    ) : (
                        <Link to="/checkout" className="btn-primary inline-flex items-center shadow-oasis">
                            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default AgentPage;

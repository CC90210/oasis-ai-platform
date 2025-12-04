import { Link } from 'react-router-dom';
import {
    Ticket,
    ShoppingCart,
    ArrowRight,
    Bot,
    MessageSquare,
    Calendar,
    Mail,
    Star,
    Phone,
    Copy,
    Check,
    Home,
    LogOut,
    User
} from 'lucide-react';
import { useAuth } from '@/store/authStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Available agents for purchase
const availableAgents = [
    {
        id: 'chat-widget',
        name: 'Website Chat Widget',
        description: '24/7 AI customer support that answers questions and captures leads.',
        price: 897,
        icon: MessageSquare,
        popular: true
    },
    {
        id: 'lead-capture',
        name: 'Lead Capture Agent',
        description: 'Qualify and route leads automatically with intelligent follow-up.',
        price: 997,
        icon: Bot,
        popular: false
    },
    {
        id: 'appointment-booking',
        name: 'Appointment Booking',
        description: 'Smart scheduling that syncs with your calendar.',
        price: 797,
        icon: Calendar,
        popular: false
    },
    {
        id: 'email-automation',
        name: 'Email Automation',
        description: 'Personalized email responses and follow-up sequences.',
        price: 897,
        icon: Mail,
        popular: false
    },
    {
        id: 'google-reviews',
        name: 'Review Management',
        description: 'Monitor and respond to Google reviews automatically.',
        price: 697,
        icon: Star,
        popular: false
    },
    {
        id: 'voice-ai',
        name: 'Voice AI Agent',
        description: 'Handle phone calls with natural AI voice.',
        price: 1497,
        icon: Phone,
        popular: false
    }
];

const WelcomePage = () => {
    const { user, discountCode, logout } = useAuth();
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        if (discountCode) {
            navigator.clipboard.writeText(discountCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary">
            {/* Header */}
            <header className="bg-bg-secondary border-b border-white/5 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI"
                                className="w-10 h-10 rounded-xl shadow-lg"
                            />
                            <span className="font-display font-bold text-xl text-white">
                                OASIS <span className="text-oasis-cyan">AI</span>
                            </span>
                        </Link>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Main Website</span>
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="w-8 h-8 rounded-full bg-oasis-cyan/20 flex items-center justify-center">
                                    <User className="w-4 h-4 text-oasis-cyan" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-white">{user?.name}</p>
                                    <p className="text-xs text-text-tertiary">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="p-2 text-text-tertiary hover:text-white transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-display font-bold text-white mb-2">
                        Welcome, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-text-secondary">
                        You're all set up. Now let's get your business automated.
                    </p>
                </motion.div>

                {/* Discount Code Banner */}
                {discountCode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 mb-8 border-oasis-cyan/30"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-oasis-cyan/20 flex items-center justify-center">
                                    <Ticket className="w-6 h-6 text-oasis-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Your 10% Welcome Discount</h3>
                                    <p className="text-sm text-text-secondary">Use this code at checkout for 10% off your first automation</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-bg-primary border border-oasis-cyan/30 px-6 py-3 rounded-lg font-mono text-oasis-cyan font-bold text-lg tracking-wider">
                                    {discountCode}
                                </div>
                                <button
                                    onClick={copyCode}
                                    className="p-3 bg-oasis-cyan/10 hover:bg-oasis-cyan/20 rounded-lg transition-colors"
                                    title="Copy code"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-oasis-cyan" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
                >
                    <Link to="/pricing" className="glass-card p-6 hover:border-oasis-cyan/50 group transition-all">
                        <ShoppingCart className="w-8 h-8 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">View All Packages</h3>
                        <p className="text-sm text-text-secondary">See our full pricing and package options</p>
                    </Link>

                    <Link to="/contact" className="glass-card p-6 hover:border-oasis-cyan/50 group transition-all">
                        <Calendar className="w-8 h-8 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Book Free Consultation</h3>
                        <p className="text-sm text-text-secondary">Talk to our team about your needs</p>
                    </Link>

                    <Link to="/case-studies" className="glass-card p-6 hover:border-oasis-cyan/50 group transition-all">
                        <Star className="w-8 h-8 text-oasis-cyan mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">See Results</h3>
                        <p className="text-sm text-text-secondary">Read case studies from our clients</p>
                    </Link>
                </motion.div>

                {/* Available Agents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white">Custom Agents</h2>
                            <p className="text-text-secondary">Start with any of our individual AI agents</p>
                        </div>
                        <Link to="/pricing" className="text-oasis-cyan hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                            View all options <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableAgents.map((agent, index) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                className="glass-card p-6 relative group hover:border-oasis-cyan/50 transition-all"
                            >
                                {agent.popular && (
                                    <div className="absolute -top-3 left-4 bg-oasis-cyan text-bg-primary text-xs font-bold px-3 py-1 rounded-full">
                                        POPULAR
                                    </div>
                                )}

                                <div className="w-12 h-12 rounded-xl bg-oasis-cyan/10 flex items-center justify-center mb-4 group-hover:bg-oasis-cyan/20 transition-colors">
                                    <agent.icon className="w-6 h-6 text-oasis-cyan" />
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2">{agent.name}</h3>
                                <p className="text-sm text-text-secondary mb-4">{agent.description}</p>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-oasis-cyan">${agent.price}</span>
                                        <span className="text-text-tertiary text-sm"> one-time</span>
                                    </div>
                                    <Link
                                        to={`/checkout?agent=${agent.id}`}
                                        className="btn-primary py-2 px-4 text-sm"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 glass-card p-8 text-center"
                >
                    <h3 className="text-2xl font-display font-bold text-white mb-4">
                        Not sure where to start?
                    </h3>
                    <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                        Book a free 15-minute strategy call with our team. We'll analyze your business and recommend the best automation solutions for your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-primary">
                            Book Free Strategy Call
                        </Link>
                        <a href="tel:705-440-3117" className="btn-secondary">
                            Call 705-440-3117
                        </a>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-tertiary text-sm">
                    <p>© 2024 OASIS AI Solutions. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;

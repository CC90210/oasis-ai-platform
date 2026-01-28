import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, Profile } from '@/lib/supabase';
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
    User,
    Loader2,
    CheckCircle,
    LayoutDashboard,
    CreditCard,
    Headphones,
    Rocket,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

// Available agents for purchase
const availableAgents = [
    {
        id: 'website-chat',
        name: 'Website Chat Widget',
        description: '24/7 AI customer support that answers questions and captures leads.',
        price: 897,
        icon: MessageSquare,
        popular: true
    },
    {
        id: 'lead-generation',
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
        id: 'email',
        name: 'Email Automation',
        description: 'Personalized email responses and follow-up sequences.',
        price: 897,
        icon: Mail,
        popular: false
    },
    {
        id: 'google-review',
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

// Onboarding steps for new users
const onboardingSteps = [
    {
        id: 1,
        title: 'Explore Your Dashboard',
        description: 'View your automation metrics and activity at a glance',
        icon: LayoutDashboard,
        link: '/portal/dashboard',
        color: 'cyan'
    },
    {
        id: 2,
        title: 'Set Up Billing',
        description: 'Add your payment method and manage your subscription',
        icon: CreditCard,
        link: '/portal/billing',
        color: 'green'
    },
    {
        id: 3,
        title: 'Complete Your Profile',
        description: 'Add your company info and notification preferences',
        icon: User,
        link: '/portal/profile',
        color: 'purple'
    },
    {
        id: 4,
        title: 'Contact Support',
        description: 'Have questions? Our team is ready to help',
        icon: Headphones,
        link: '/portal/support',
        color: 'yellow'
    }
];

const WelcomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [copied, setCopied] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/portal/login');
                return;
            }

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);

            // Check completed steps from profile
            if (profileData?.onboarding_steps) {
                setCompletedSteps(profileData.onboarding_steps);
            }

            // Hide welcome animation after 2 seconds
            setTimeout(() => setShowWelcomeAnimation(false), 2000);

        } catch (err) {
            console.error('Error loading user data:', err);
        } finally {
            setLoading(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase
                .from('profiles')
                .update({ onboarding_completed: true })
                .eq('id', user.id);

            navigate('/portal/dashboard');
        } catch (err) {
            console.error('Error completing onboarding:', err);
        }
    };

    const markStepComplete = async (stepId: number) => {
        if (completedSteps.includes(stepId)) return;

        const newCompletedSteps = [...completedSteps, stepId];
        setCompletedSteps(newCompletedSteps);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase
                .from('profiles')
                .update({ onboarding_steps: newCompletedSteps })
                .eq('id', user.id);
        } catch (err) {
            console.error('Error saving step:', err);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const copyCode = () => {
        navigator.clipboard.writeText('WELCOME10');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
            green: 'bg-green-500/10 text-green-400 border-green-500/30',
            purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
            yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
        };
        return colors[color] || colors.cyan;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    const firstName = profile?.full_name?.split(' ')[0] || 'there';
    const isNewUser = !profile?.onboarding_completed;
    const allStepsComplete = completedSteps.length >= onboardingSteps.length;

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
            {/* Welcome Animation Overlay */}
            {showWelcomeAnimation && isNewUser && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="fixed inset-0 z-50 bg-[var(--bg-main)] flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            className="w-24 h-24 mx-auto mb-6"
                        >
                            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                <Sparkles className="w-12 h-12 text-[var(--text-primary)]" />
                            </div>
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-2">Welcome to OASIS AI!</h1>
                        <p className="text-[var(--text-secondary)]">Setting up your portal...</p>
                    </motion.div>
                </motion.div>
            )}

            {/* Header */}
            <header className="bg-[var(--bg-primary)] border-b border-[var(--bg-tertiary)] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI"
                                className="w-10 h-10 rounded-xl"
                            />
                            <span className="font-bold text-xl">
                                OASIS <span className="text-cyan-500">AI</span>
                            </span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Website</span>
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-[var(--bg-tertiary)]">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <User className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium">{profile?.full_name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{profile?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: showWelcomeAnimation ? 2 : 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        Welcome, {firstName}!
                        <motion.span
                            animate={{ rotate: [0, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            👋
                        </motion.span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg">
                        {isNewUser
                            ? "Let's get you set up with your automation portal."
                            : "Your automations are ready and running."
                        }
                    </p>
                </motion.div>

                {/* Discount Code Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: showWelcomeAnimation ? 2.1 : 0.1 }}
                    className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 p-6 rounded-2xl mb-8"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <Ticket className="w-7 h-7 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Your 10% Welcome Discount</h3>
                                <p className="text-[var(--text-secondary)]">Use this code at checkout for 10% off your next purchase</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--bg-main)]/50 border border-cyan-500/50 px-6 py-3 rounded-lg font-mono text-cyan-400 font-bold text-xl tracking-wider">
                                WELCOME10
                            </div>
                            <button
                                onClick={copyCode}
                                className="p-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-cyan-400" />}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Onboarding Steps (for new users) */}
                {isNewUser && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: showWelcomeAnimation ? 2.2 : 0.2 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Getting Started</h2>
                                <p className="text-[var(--text-secondary)]">Complete these steps to get the most out of your portal</p>
                            </div>
                            <div className="text-sm text-[var(--text-secondary)]">
                                {completedSteps.length} / {onboardingSteps.length} completed
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {onboardingSteps.map((step, index) => {
                                const isComplete = completedSteps.includes(step.id);
                                const Icon = step.icon;

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (showWelcomeAnimation ? 2.3 : 0.3) + index * 0.1 }}
                                    >
                                        <Link
                                            to={step.link}
                                            onClick={() => markStepComplete(step.id)}
                                            className={`block p-5 rounded-xl border transition-all ${isComplete
                                                ? 'bg-green-500/10 border-green-500/30'
                                                : 'bg-[var(--bg-primary)] border-[var(--bg-tertiary)] hover:border-[var(--border)]'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isComplete
                                                    ? 'bg-green-500/20'
                                                    : getColorClasses(step.color).split(' ')[0]
                                                    }`}>
                                                    {isComplete ? (
                                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                                    ) : (
                                                        <Icon className={`w-6 h-6 ${getColorClasses(step.color).split(' ')[1]}`} />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`font-bold ${isComplete ? 'text-green-400' : 'text-[var(--text-primary)]'}`}>
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-[var(--text-muted)] text-sm">{step.description}</p>
                                                </div>
                                                <ArrowRight className={`w-5 h-5 ${isComplete ? 'text-green-400' : 'text-gray-600'}`} />
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Complete Onboarding Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: showWelcomeAnimation ? 2.7 : 0.7 }}
                            onClick={completeOnboarding}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 ${allStepsComplete
                                ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black hover:from-cyan-400 hover:to-cyan-300'
                                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-main)]'
                                }`}
                        >
                            <Rocket className="w-5 h-5" />
                            {allStepsComplete ? 'Go to Dashboard' : 'Skip Setup & Go to Dashboard'}
                        </motion.button>
                    </motion.div>
                )}

                {/* Quick Actions for Returning Users */}
                {!isNewUser && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
                    >
                        <Link to="/portal/dashboard" className="p-6 bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl hover:border-cyan-500/50 transition group">
                            <LayoutDashboard className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition" />
                            <h3 className="text-lg font-bold mb-2">Dashboard</h3>
                            <p className="text-[var(--text-secondary)] text-sm">View your automation metrics</p>
                        </Link>

                        <Link to="/portal/billing" className="p-6 bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl hover:border-green-500/50 transition group">
                            <CreditCard className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition" />
                            <h3 className="text-lg font-bold mb-2">Billing</h3>
                            <p className="text-[var(--text-secondary)] text-sm">Manage your subscription</p>
                        </Link>

                        <Link to="/portal/support" className="p-6 bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl hover:border-purple-500/50 transition group">
                            <Headphones className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition" />
                            <h3 className="text-lg font-bold mb-2">Support</h3>
                            <p className="text-[var(--text-secondary)] text-sm">Get help from our team</p>
                        </Link>
                    </motion.div>
                )}

                {/* Available Agents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: showWelcomeAnimation && isNewUser ? 2.8 : 0.3 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Add More Automations</h2>
                            <p className="text-[var(--text-secondary)]">Expand your automation capabilities</p>
                        </div>
                        <Link to="/pricing" className="text-cyan-400 hover:text-[var(--text-primary)] flex items-center gap-1 text-sm font-medium">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableAgents.slice(0, 3).map((agent, index) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (showWelcomeAnimation && isNewUser ? 2.9 : 0.4) + index * 0.1 }}
                                className="p-6 bg-[var(--bg-primary)] border border-[var(--bg-tertiary)] rounded-xl hover:border-cyan-500/50 transition relative"
                            >
                                {agent.popular && (
                                    <span className="absolute -top-3 left-4 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                                        POPULAR
                                    </span>
                                )}

                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                                    <agent.icon className="w-6 h-6 text-cyan-400" />
                                </div>

                                <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                                <p className="text-[var(--text-secondary)] text-sm mb-4">{agent.description}</p>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-cyan-400">${agent.price}</span>
                                        <span className="text-[var(--text-muted)] text-sm"> one-time</span>
                                    </div>
                                    <Link
                                        to={`/pricing/${agent.id}`}
                                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-sm transition"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-[var(--bg-tertiary)] mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[var(--text-muted)] text-sm">
                    <p>© 2026 OASIS AI Solutions. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <Link to="/privacy" className="hover:text-[var(--text-primary)] transition">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-[var(--text-primary)] transition">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default WelcomePage;

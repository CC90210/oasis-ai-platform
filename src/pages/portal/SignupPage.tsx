import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User, Building, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/authStore';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        password: ''
    });
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we would validate and send to backend
        signup({
            name: formData.name,
            email: formData.email,
            company: formData.company
        });
        navigate('/portal/chat');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 relative overflow-hidden font-sans text-text-primary">
            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[100px] -top-48 -left-48 animate-pulse-glow"></div>
                <div className="absolute w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[100px] -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 relative z-10 my-10"
            >
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/oasis-logo.jpg"
                            alt="OASIS AI Solutions"
                            className="h-24 w-auto rounded-xl shadow-oasis"
                        />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white">
                        Create Account
                    </h1>
                    <p className="text-oasis-cyan text-lg font-medium">
                        Get 10% off your first automation!
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-8 rounded-3xl space-y-6 border border-white/5 shadow-oasis-strong">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Company Field (Optional) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Company Name (Optional)</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                    placeholder="Acme Inc."
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full btn-primary py-6 text-lg font-semibold rounded-xl shadow-oasis hover:shadow-oasis-strong transition-all duration-300"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Already have an account */}
                    <div className="text-center text-sm text-text-secondary pt-4 border-t border-white/5">
                        Already have an account?{' '}
                        <Link
                            to="/portal/login"
                            className="text-oasis-cyan hover:text-white font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8">
                    <Link
                        to="/"
                        className="text-text-secondary hover:text-white text-sm transition-colors flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to main website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;

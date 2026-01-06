import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/store/authStore';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isExistingClient, setIsExistingClient] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validate against backend and check if user has active subscriptions
        login({ name: 'User', email }, isExistingClient);
        // Route based on whether they have active automations
        if (isExistingClient) {
            navigate('/portal/dashboard');
        } else {
            navigate('/portal/welcome');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 relative overflow-hidden font-sans text-text-primary">
            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[100px] -top-48 -left-48 animate-pulse-glow"></div>
                <div className="absolute w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[100px] -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 relative z-10"
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
                        Client Portal
                    </h1>
                    <p className="text-oasis-cyan text-lg font-medium">
                        Work on your business, not in your business.
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="glass-card p-8 rounded-3xl space-y-6 border border-white/5 shadow-oasis-strong">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="mt-2 text-text-secondary">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-white">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all duration-200"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-white">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-oasis-cyan hover:text-white transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-bg-tertiary border border-white/10 rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Existing Client Checkbox */}
                        <div className="flex items-center">
                            <input
                                id="existing-client"
                                name="existing-client"
                                type="checkbox"
                                checked={isExistingClient}
                                onChange={(e) => setIsExistingClient(e.target.checked)}
                                className="h-4 w-4 rounded border-white/10 bg-bg-tertiary text-oasis-cyan focus:ring-oasis-cyan focus:ring-offset-0"
                            />
                            <label htmlFor="existing-client" className="ml-2 block text-sm text-text-secondary">
                                I am an existing client with active automations
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#00D4FF] text-black hover:bg-[#00D4FF]/90 py-6 text-lg font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(0,212,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,212,255,0.23)] transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Don't have an account */}
                    <div className="text-center text-sm text-text-secondary pt-4 border-t border-white/5">
                        Don't have an account?{' '}
                        <Link
                            to="/portal/signup"
                            className="text-oasis-cyan hover:text-white font-medium transition-colors"
                        >
                            Create Account (Get 10% Off)
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center space-y-3 mt-8">
                    <p className="text-text-secondary text-sm">
                        Need help accessing your account?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a
                            href="mailto:oasisaisolutions@gmail.com"
                            className="text-oasis-cyan hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            oasisaisolutions@gmail.com
                        </a>
                        <span className="hidden sm:inline text-text-tertiary">|</span>
                        <a
                            href="tel:705-440-3117"
                            className="text-oasis-cyan hover:text-white transition-colors"
                        >
                            📞 705-440-3117
                        </a>
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
                    <p className="text-text-tertiary text-xs mt-4">
                        © 2024 OASIS AI Solutions. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateClient } from '../lib/auth';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isExistingClient, setIsExistingClient] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            try {
                // If existing client checkbox is checked, we can route them differently or handle logic
                // For now, let's keep the core auth logic the same
                const client = authenticateClient(email, password);

                if (client) {
                    // Store session data
                    sessionStorage.setItem('clientId', client.clientId);
                    sessionStorage.setItem('companyName', client.companyName);
                    sessionStorage.setItem('clientEmail', client.email);

                    // Redirect to dashboard
                    navigate(`/dashboard/${client.clientId}`);
                } else {
                    setError('Invalid email or password');
                    // Fallback for demo: if they clicked "Existing Client", maybe just let them in?
                    // No, security first. But we can handle the 'User' fallback from the other file if needed.
                    // For now, stick to strict auth.
                }
            } catch (err) {
                setError('An unexpected error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050508] px-4 relative overflow-hidden font-sans text-white">
            {/* Animated background particles effect matching homepage */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/20 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Login Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8 relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 bg-[#0a0a14] rounded-xl shadow-2xl flex items-center justify-center border border-[#1a1a2e]">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI"
                                className="h-20 w-auto rounded-lg"
                                onError={(e) => {
                                    // Fallback if image fails
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerText = 'OASIS';
                                    e.currentTarget.parentElement!.className = 'h-24 w-24 bg-[#0a0a14] rounded-xl shadow-2xl flex items-center justify-center border border-[#1a1a2e] text-cyan-400 font-bold text-xl';
                                }}
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-wide">
                        Client Portal
                    </h1>
                    <p className="text-[#00D4FF] text-lg font-medium">
                        Work on your business, not in your business.
                    </p>
                </div>

                {/* Login Form Card */}
                {/* Explicitly using solid background and high z-index to fix visibility issues */}
                <div className="bg-[#12121f] border border-[#2a2a4a] p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-visible z-20">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="mt-2 text-gray-400">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                                <span className="text-white">{error}</span>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-[#00D4FF] hover:text-white transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-[#1a1a2e] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
                                className="h-4 w-4 rounded border-gray-600 bg-[#1a1a2e] text-[#00D4FF] focus:ring-[#00D4FF] accent-[#00D4FF]"
                            />
                            <label htmlFor="existing-client" className="ml-2 block text-sm text-gray-400 cursor-pointer">
                                I am an existing client with active automations
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00D4FF] text-black hover:bg-[#00D4FF]/90 py-4 text-lg font-bold rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 transform hover:-translate-y-1 relative z-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Don't have an account */}
                    <div className="text-center text-sm text-gray-400 pt-4 border-t border-gray-800">
                        Don't have an account?{' '}
                        <Link
                            to="/portal/signup"
                            className="text-[#00D4FF] hover:text-white font-medium transition-colors"
                        >
                            Create Account (Get 10% Off)
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center space-y-3 mt-8 relative z-20">
                    <p className="text-gray-400 text-sm">
                        Need help accessing your account?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a
                            href="mailto:oasisaisolutions@gmail.com"
                            className="text-[#00D4FF] hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            oasisaisolutions@gmail.com
                        </a>
                        <span className="hidden sm:inline text-gray-500">|</span>
                        <a
                            href="tel:+12403325062"
                            className="text-[#00D4FF] hover:text-white transition-colors"
                        >
                            📞 +1 (240) 332-5062
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 relative z-20">
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to main website
                    </Link>
                    <p className="text-gray-600 text-xs mt-4">
                        © 2024 OASIS AI Solutions. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;

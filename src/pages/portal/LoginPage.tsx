import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-deep-black px-4 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-neon/10 rounded-full blur-[100px] -top-48 -left-48 animate-pulse-glow"></div>
                <div className="absolute w-96 h-96 bg-neon/10 rounded-full blur-[100px] -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in-up">
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/oasis-logo.jpg"
                            alt="OASIS AI Solutions"
                            className="h-24 w-auto rounded-xl shadow-neon"
                        />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white">
                        Client Portal
                    </h1>
                    <p className="text-neon text-lg font-medium">
                        Work on your business, not in your business.
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="glass-effect p-8 rounded-3xl space-y-6 border border-white/5 shadow-neon-strong">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="mt-2 text-light-gray">Sign in to access your dashboard</p>
                    </div>

                    <form className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-white">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all duration-200"
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
                                    className="text-sm text-neon hover:text-white transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-white/10 bg-black/50 text-neon focus:ring-neon focus:ring-offset-0"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-light-gray">
                                Remember me
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full btn-primary py-6 text-lg font-semibold rounded-xl shadow-neon hover:shadow-neon-strong transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Don't have an account */}
                    <div className="text-center text-sm text-light-gray pt-4 border-t border-white/5">
                        Don't have an account?{' '}
                        <Link
                            to="/contact"
                            className="text-neon hover:text-white font-medium transition-colors"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center space-y-3 mt-8">
                    <p className="text-light-gray text-sm">
                        Need help accessing your account?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a
                            href="mailto:oasisaisolutions@gmail.com"
                            className="text-neon hover:text-white transition-colors flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            oasisaisolutions@gmail.com
                        </a>
                        <span className="hidden sm:inline text-gray-600">|</span>
                        <a
                            href="tel:705-440-3117"
                            className="text-neon hover:text-white transition-colors"
                        >
                            📞 705-440-3117
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8">
                    <Link
                        to="/"
                        className="text-light-gray hover:text-white text-sm transition-colors flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to main website
                    </Link>
                    <p className="text-gray-600 text-xs mt-4">
                        © 2024 OASIS AI Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

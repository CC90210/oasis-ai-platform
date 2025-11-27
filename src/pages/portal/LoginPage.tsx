import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0F] via-[#0D1117] to-[#0A0A0F] px-4 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-glow"></div>
                <div className="absolute w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md space-y-8 relative z-10">
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/images/oasis-logo.jpg"
                            alt="OASIS AI Solutions"
                            className="h-32 w-auto"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-white">
                        Client Portal
                    </h1>
                    <p className="text-[#00D4FF] text-lg font-medium">
                        Work on your business, not in your business.
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="glass-effect p-8 rounded-2xl space-y-6 backdrop-blur-xl bg-[#0D1117]/70 border border-[#00D4FF]/20 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="mt-2 text-[#8B949E]">Sign in to access your dashboard</p>
                    </div>

                    <form className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-white">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8B949E]" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-[#161B22] border border-[#00D4FF]/30 rounded-lg text-white placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent focus:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-200"
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
                                    className="text-sm text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8B949E]" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="w-full pl-11 pr-12 py-3 bg-[#161B22] border border-[#00D4FF]/30 rounded-lg text-white placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:border-transparent focus:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] hover:text-white transition-colors"
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
                                className="h-4 w-4 rounded border-[#00D4FF]/30 bg-[#161B22] text-[#00D4FF] focus:ring-[#00D4FF] focus:ring-offset-0"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#8B949E]">
                                Remember me
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-[1.02]"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Don't have an account */}
                    <div className="text-center text-sm text-[#8B949E] pt-4 border-t border-[#00D4FF]/10">
                        Don't have an account?{' '}
                        <Link
                            to="/contact"
                            className="text-[#00D4FF] hover:text-[#00D4FF]/80 font-medium transition-colors"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>

                {/* Help Section */}
                <div className="text-center space-y-3 mt-8">
                    <p className="text-[#8B949E] text-sm">
                        Need help accessing your account?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <a
                            href="mailto:oasisaisolutions@gmail.com"
                            className="text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            oasisaisolutions@gmail.com
                        </a>
                        <span className="hidden sm:inline text-[#8B949E]">|</span>
                        <a
                            href="tel:705-440-3117"
                            className="text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
                        >
                            📞 705-440-3117
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8">
                    <Link
                        to="/"
                        className="text-[#8B949E] hover:text-white text-sm transition-colors"
                    >
                        ← Back to main website
                    </Link>
                    <p className="text-[#8B949E]/60 text-xs mt-4">
                        © 2024 OASIS AI Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalLoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isExistingClient, setIsExistingClient] = useState(true);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (authError) {
                console.error('Auth error:', authError);
                if (authError.message.includes('Invalid login credentials')) {
                    setError('Invalid email or password. Please try again.');
                } else if (authError.message.includes('Email not confirmed')) {
                    setError('Please check your email to confirm your account.');
                } else {
                    setError(authError.message);
                }
                return;
            }

            if (data.user) {
                // Update last login
                await supabase
                    .from('profiles')
                    .update({ last_login_at: new Date().toISOString() })
                    .eq('id', data.user.id);

                // Redirect to dashboard
                navigate('/portal/dashboard');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden text-white font-sans">
            {/* Animated background particles effect */}
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 bg-[#0a0a14] rounded-xl shadow-2xl flex items-center justify-center border border-[#1a1a2e]">
                            <img src="/images/oasis-logo.jpg" alt="OASIS AI" className="h-20 w-auto rounded-lg" onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerText = 'OASIS';
                                e.currentTarget.parentElement!.className = 'h-24 w-24 bg-[#0a0a14] rounded-xl shadow-2xl flex items-center justify-center border border-[#1a1a2e] text-cyan-400 font-bold text-xl';
                            }} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
                    <p className="text-[#00D4FF] mb-8">Work on your business, not in your business.</p>
                </div>

                {/* Login Card */}
                <div className="w-full bg-[#12121f] border border-[#2a2a4a] rounded-3xl p-8 shadow-2xl relative overflow-visible z-20">
                    <h2 className="text-xl font-bold text-white mb-2 text-center">Welcome Back</h2>
                    <p className="text-gray-400 text-sm text-center mb-6">Sign in to access your dashboard</p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    required
                                    className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link to="/portal/forgot-password" className="text-sm text-[#00D4FF] hover:text-white transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Existing Client Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isExistingClient}
                                onChange={(e) => setIsExistingClient(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-600 bg-[#1a1a2e] text-[#00D4FF] focus:ring-[#00D4FF] accent-[#00D4FF]"
                            />
                            <span className="text-sm text-gray-400">I am an existing client with active automations</span>
                        </label>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#00D4FF] hover:bg-[#00D4FF]/90 disabled:bg-[#00D4FF]/50 text-black font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 transform hover:-translate-y-1 relative z-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Create Account Link */}
                    <p className="mt-6 text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/portal/signup" className="text-[#00D4FF] hover:text-white font-medium transition-colors">
                            Create Account (Get 10% Off)
                        </Link>
                    </p>
                </div>

                {/* Support */}
                <div className="mt-8 text-center text-gray-500 text-sm relative z-20">
                    <p>Need help accessing your account?</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <a href="mailto:oasisaisolutions@gmail.com" className="text-[#00D4FF] hover:text-white flex items-center gap-1 transition-colors">
                            <Mail className="w-4 h-4" />
                            oasisaisolutions@gmail.com
                        </a>
                        <span>|</span>
                        <a href="tel:705-440-3117" className="text-[#00D4FF] hover:text-white transition-colors">
                            📞 705-440-3117
                        </a>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-6 text-center relative z-20">
                    <Link to="/" className="text-gray-500 hover:text-white flex items-center justify-center gap-2 transition-colors">
                        ← Back to main website
                    </Link>
                </div>

                <p className="mt-4 text-center text-gray-700 text-xs relative z-20">© 2026 OASIS AI Solutions. All rights reserved.</p>
            </motion.div>
        </div>
    );
}

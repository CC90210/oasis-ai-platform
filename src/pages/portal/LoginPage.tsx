import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('Account created successfully! Please sign in.');
        }

        // Check if already logged in
        checkSession();
    }, [searchParams]);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            navigate('/portal/dashboard');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Use standard Supabase SDK method which handles session persistence automatically
            // This prevents the redirect loop bug by correctly saving tokens to localStorage
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    throw new Error('Invalid email or password. Please try again.');
                } else if (error.message.includes('Email not confirmed')) {
                    throw new Error('Please check your email to confirm your account before logging in.');
                }
                throw error;
            }

            if (data.session) {
                // Successful login
                setSuccessMessage('Login successful! Redirecting...');

                // Short delay to show success message before redirect
                setTimeout(() => {
                    // Use standard navigation first
                    navigate('/portal/dashboard');
                }, 500);
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            {/* Back to Website Link - Top */}
            <div className="absolute top-4 left-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition px-3 py-2 rounded-lg hover:bg-white/5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to OASIS AI</span>
                </Link>
            </div>

            {/* Logo */}
            <div className="mb-8">
                <img src="/logo.png" alt="OASIS AI" className="h-16 w-auto" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
            <p className="text-cyan-400 mb-8">Work on your business, not in your business.</p>

            {/* Login Card */}
            <div className="w-full max-w-md bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-2 text-center">Welcome Back</h2>
                <p className="text-gray-400 text-sm text-center mb-6">Sign in to access your dashboard</p>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 animate-pulse">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{successMessage}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-300">Password</label>
                            <Link to="/portal/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
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
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
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
                </form>

                {/* Create Account Link */}
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/portal/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        Create Account (Get 10% Off)
                    </Link>
                </p>
            </div>

            {/* Support */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>Need help accessing your account?</p>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <a href="mailto:oasisaisolutions@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                        oasisaisolutions@gmail.com
                    </a>
                    <span>|</span>
                    <a href="tel:+12403325062" className="text-cyan-400 hover:text-cyan-300">
                        +1 (240) 332-5062
                    </a>
                </div>
            </div>

            {/* Back Link */}
            <Link to="/" className="mt-6 text-gray-500 hover:text-gray-300 flex items-center gap-2">
                ← Back to main website
            </Link>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

// Hardcoded Supabase credentials
const SUPABASE_URL = 'https://skgrbweyscysyetubemg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c3lldHViZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTI0MTcsImV4cCI6MjA1MTcyODQxN30.VawWeg_UCTPutIosfOaVyF8IgVT4iSIiXArhX2XxZn0';

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');

    useEffect(() => {
        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('Account created successfully! Please sign in.');
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        setDebugInfo('Starting login...');

        try {
            setDebugInfo('Sending request to Supabase...');

            // Direct fetch to Supabase Auth API
            const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password: password,
                }),
            });

            setDebugInfo(`Response status: ${response.status}`);

            const data = await response.json();

            setDebugInfo(`Response: ${JSON.stringify(data).substring(0, 100)}`);

            if (!response.ok) {
                const errorMsg = data.error_description || data.msg || data.message || 'Login failed';

                if (errorMsg.includes('Invalid login credentials') || errorMsg.includes('invalid')) {
                    setError('Invalid email or password. Please try again.');
                } else if (errorMsg.includes('Email not confirmed')) {
                    setError('Please check your email to confirm your account before logging in.');
                } else {
                    setError(errorMsg);
                }
                setLoading(false);
                return;
            }

            // Success - store tokens
            if (data.access_token) {
                localStorage.setItem('supabase_access_token', data.access_token);
                localStorage.setItem('supabase_refresh_token', data.refresh_token || '');
                localStorage.setItem('supabase_user', JSON.stringify(data.user));

                setDebugInfo('Login successful! Redirecting...');

                // Redirect to dashboard
                window.location.href = '/portal/dashboard';
            } else {
                setError('Login failed. Please try again.');
            }

        } catch (err: any) {
            console.error('Login error:', err);
            setDebugInfo(`Error: ${err.message}`);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            {/* Logo */}
            <div className="mb-8">
                <img src="/logo.png" alt="OASIS AI" className="h-16 w-auto" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
            <p className="text-cyan-400 mb-8">Work on your business, not in your business.</p>

            {/* Login Card */}
            <div className="w-full max-w-md bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-2 text-center">Welcome Back</h2>
                <p className="text-gray-400 text-sm text-center mb-6">Sign in to access your dashboard</p>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400">
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

                {/* Debug Info */}
                {debugInfo && (
                    <div className="mb-4 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-xs font-mono">
                        {debugInfo}
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
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition flex items-center justify-center gap-2"
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
                    <a href="tel:705-440-3117" className="text-cyan-400 hover:text-cyan-300">
                        705-440-3117
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

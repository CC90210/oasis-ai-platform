import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Building, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

// Use environment variables injected by Vite
// Checks process.env first (via define) then standard import.meta.env
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        companyName: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [debugInfo, setDebugInfo] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setDebugInfo('Starting signup...');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        // Validate email
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            setDebugInfo('Sending request to Supabase...');

            // Direct fetch to Supabase Auth API
            const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                    data: {
                        full_name: formData.fullName,
                        company_name: formData.companyName,
                    },
                }),
            });

            setDebugInfo(`Response status: ${response.status}`);

            const data = await response.json();

            setDebugInfo(`Response data: ${JSON.stringify(data).substring(0, 200)}`);

            if (!response.ok) {
                // Handle specific error messages
                const errorMsg = data.error_description || data.msg || data.message || 'Signup failed';

                if (errorMsg.includes('already registered') || errorMsg.includes('already been registered')) {
                    setError('This email is already registered. Please sign in instead.');
                } else if (errorMsg.includes('valid email')) {
                    setError('Please enter a valid email address.');
                } else if (errorMsg.includes('password')) {
                    setError('Password must be at least 6 characters.');
                } else {
                    setError(errorMsg);
                }
                setLoading(false);
                return;
            }

            // Success!
            if (data.user || data.id) {
                setDebugInfo('User created successfully!');
                setSuccess(true);

                // Store session if provided
                if (data.access_token) {
                    localStorage.setItem('supabase_access_token', data.access_token);
                    localStorage.setItem('supabase_refresh_token', data.refresh_token || '');
                }

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '/portal/login?registered=true';
                }, 2000);
            } else {
                // Check if email confirmation is required
                if (data.confirmation_sent_at || response.status === 200) {
                    setSuccess(true);
                    setDebugInfo('Account created! Check email for confirmation.');
                    setTimeout(() => {
                        window.location.href = '/portal/login?registered=true';
                    }, 2000);
                }
            }

        } catch (err: any) {
            console.error('Signup error:', err);
            setDebugInfo(`Error: ${err.message}`);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-gray-400 mb-6">
                        Redirecting to login...
                    </p>
                    <Loader2 className="w-6 h-6 animate-spin text-cyan-500 mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-cyan-400 mb-8">Get 10% off your first automation!</p>

            {/* Signup Card */}
            <div className="w-full max-w-md bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-8">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Debug Info - Remove in production */}
                {debugInfo && (
                    <div className="mb-4 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-xs font-mono">
                        {debugInfo}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Smith"
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Company Name</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Acme Inc."
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Minimum 6 characters"
                                required
                                minLength={6}
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                            />
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
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/portal/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>

            {/* Back Link */}
            <Link to="/" className="mt-8 text-gray-500 hover:text-gray-300 flex items-center gap-2">
                ← Back to main website
            </Link>
        </div>
    );
}

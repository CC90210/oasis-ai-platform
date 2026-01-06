import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, User, Building, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function PortalSignupPage() {
    const navigate = useNavigate();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting signup for:', formData.email);

            // Create auth user
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        company_name: formData.companyName,
                    },
                },
            });

            console.log('Signup response:', { data, authError });

            if (authError) {
                console.error('Auth error:', authError);

                if (authError.message.includes('already registered')) {
                    setError('This email is already registered. Please sign in instead.');
                } else if (authError.message.includes('valid email')) {
                    setError('Please enter a valid email address.');
                } else if (authError.message.includes('password')) {
                    setError('Password must be at least 6 characters.');
                } else {
                    setError(authError.message);
                }
                setLoading(false);
                return;
            }

            if (data.user) {
                console.log('User created:', data.user.id);

                // Update profile with additional info
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        full_name: formData.fullName,
                        company_name: formData.companyName,
                    })
                    .eq('id', data.user.id);

                if (profileError) {
                    console.error('Profile update error:', profileError);
                    // Don't fail signup for this
                }

                setSuccess(true);

                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = '/portal/dashboard';
                }, 2000);
            }
        } catch (err: any) {
            console.error('Signup catch error:', err);
            setError('Connection error. Please check your internet and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#12121f] border border-[#2a2a4a] rounded-3xl p-8 text-center shadow-2xl">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-gray-400 mb-6">
                        Your account has been created successfully. Redirecting to your dashboard...
                    </p>
                    <Loader2 className="w-6 h-6 animate-spin text-[#00D4FF] mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
            {/* Animated background particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/10 animate-pulse"
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

            {/* Logo */}
            <div className="mb-8 text-center relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-[#00D4FF] mb-8 font-medium">Get 10% off your first automation!</p>
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-md bg-[#12121f] border border-[#2a2a4a] rounded-3xl p-8 shadow-2xl relative z-20">
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Smith"
                                required
                                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Acme Inc."
                                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                required
                                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Minimum 8 characters"
                                required
                                minLength={8}
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

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-[#00D4FF] hover:bg-[#00D4FF]/90 disabled:bg-[#00D4FF]/50 text-black font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 transform hover:-translate-y-1 relative z-50 flex items-center justify-center gap-2"
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
                    </div>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/portal/login" className="text-[#00D4FF] hover:text-white font-medium transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>

            {/* Back Link */}
            <Link to="/" className="mt-8 text-gray-500 hover:text-white flex items-center gap-2 transition-colors relative z-20">
                ← Back to main website
            </Link>
        </div>
    );
}

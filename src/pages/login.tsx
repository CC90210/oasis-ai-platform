import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateClient } from '../lib/auth';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            try {
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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Brand Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-wider">
                        OASIS <span className="text-cyan-500">AI</span>
                    </h1>
                    <p className="text-gray-400 mt-2">Client Portal Access</p>
                </div>

                {/* Login Card */}
                <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-all duration-200 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Login to Portal
                                    <ArrowRight className="ml-2" size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        Having trouble? <a href="mailto:support@oasisai.ca" className="text-cyan-500 hover:underline">Contact Support</a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;

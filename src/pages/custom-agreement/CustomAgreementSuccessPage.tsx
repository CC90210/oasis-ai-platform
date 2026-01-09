import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    CheckCircle,
    Loader2,
    Mail,
    MessageSquare,
    ArrowRight,
    Home,
    UserPlus
} from 'lucide-react';

export default function CustomAgreementSuccessPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple timeout to show loading state
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
                    <p className="text-gray-400">Confirming your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="max-w-lg w-full relative z-10">
                {/* Success Card */}
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800 shadow-2xl">
                    {/* Success Icon with Animation */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                        <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">
                        Payment Successful! 🎉
                    </h1>

                    <p className="text-gray-400 mb-8">
                        Thank you for completing your custom agreement. Your automation journey with OASIS AI begins now!
                    </p>

                    {/* What Happens Next */}
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-cyan-400">→</span>
                            What happens next?
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Check Your Email</p>
                                    <p className="text-sm text-gray-400">
                                        You'll receive a confirmation email with your receipt and agreement details
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Team Contact (Within 24 Hours)</p>
                                    <p className="text-sm text-gray-400">
                                        Your dedicated implementation manager will reach out to schedule your kickoff call
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/portal/signup"
                            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition"
                        >
                            <UserPlus className="w-5 h-5" />
                            Create Portal Account
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </Link>
                    </div>

                    {/* Contact Support */}
                    <p className="text-xs text-gray-500 mt-8">
                        Questions? Email us at{' '}
                        <a href="mailto:oasisaisolutions@gmail.com" className="text-cyan-400 hover:underline">
                            oasisaisolutions@gmail.com
                        </a>
                    </p>
                </div>

                {/* Session ID Reference */}
                {sessionId && (
                    <p className="text-center text-xs text-gray-600 mt-4">
                        Reference: {sessionId.slice(0, 24)}...
                    </p>
                )}
            </div>
        </div>
    );
}

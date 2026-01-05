import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Loader2, Calendar, Mail, MessageSquare } from 'lucide-react';

export default function CheckoutSuccessPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple timeout to show loading state
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
                    <p className="text-gray-400">Processing your order...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                {/* Success Card */}
                <div className="bg-gray-900 rounded-2xl p-8 text-center border border-gray-800">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome to OASIS! 🎉
                    </h1>

                    <p className="text-gray-400 mb-8">
                        Your payment was successful. Our team is already preparing your automation setup.
                    </p>

                    {/* What Happens Next */}
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left">
                        <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Confirmation Email</p>
                                    <p className="text-sm text-gray-400">Check your inbox for receipt and next steps</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Team Contact (Within 24hrs)</p>
                                    <p className="text-sm text-gray-400">Your implementation manager will reach out</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Discovery Call</p>
                                    <p className="text-sm text-gray-400">We'll schedule your strategy session</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/"
                            className="block w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition text-center"
                        >
                            Return Home
                        </Link>
                        <a
                            href="https://calendly.com/oasisai/discovery"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition text-center"
                        >
                            Schedule Call Now
                        </a>
                    </div>

                    {/* Support */}
                    <p className="text-xs text-gray-500 mt-6">
                        Questions? Email us at{' '}
                        <a href="mailto:support@oasisai.work" className="text-cyan-400 hover:underline">
                            support@oasisai.work
                        </a>
                    </p>
                </div>

                {/* Session ID (for reference) */}
                {sessionId && (
                    <p className="text-center text-xs text-gray-600 mt-4">
                        Order ID: {sessionId.slice(0, 20)}...
                    </p>
                )}
            </div>
        </div>
    );
}

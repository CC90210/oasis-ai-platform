import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order');

    useEffect(() => {
        // Optional: Trigger confetti or analytics here
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
            <div className="bg-[#161B22] max-w-lg w-full p-8 rounded-2xl border border-gray-800 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-gray-400 mb-8">
                    Your order <span className="text-white font-mono">{orderId}</span> has been processed.
                </p>

                <div className="bg-gray-800/50 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start">
                            <span className="mr-2 text-cyan-500">1.</span>
                            Check your email for your receipt and order details.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-cyan-500">2.</span>
                            An implementation specialist will contact you within 1 hour to schedule your setup call.
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-cyan-500">3.</span>
                            We'll begin customizing your automation immediately after our consultation.
                        </li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Return to Home
                    </Link>
                    <Link
                        to="/login"
                        className="block w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Client Portal Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { track } from '@vercel/analytics';

const SubscriptionSuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const subscriptionId = searchParams.get('subscription_id');
    const automationId = searchParams.get('automation');
    const tier = searchParams.get('tier');

    useEffect(() => {
        if (!subscriptionId) {
            // Validate presence of ID, if missing redirect home (optional, for safety)
            // navigate('/');
        } else {
            // Track purchase
            track('purchase_completed', {
                subscription_id: subscriptionId,
                automation: automationId || 'unknown',
                tier: tier || 'unknown'
            });
        }
    }, [subscriptionId, automationId, tier]);

    return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 pt-20">
            <div className="max-w-lg w-full text-center animate-in fade-in zoom-in duration-500">

                {/* Success Icon */}
                <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-cyan-500/10">
                    <Check size={48} className="text-cyan-400" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
                <p className="text-gray-400 mb-8 text-lg">
                    Thank you for your purchase. We have received your subscription and are preparing your account.
                </p>

                {/* Next Steps Card */}
                <div className="bg-[#12121f] border border-[#2a2a4a] rounded-xl p-8 text-left mb-8 shadow-2xl">
                    <h3 className="text-white font-semibold mb-6 flex items-center">
                        <span className="w-2 h-8 bg-cyan-500 rounded-full mr-3"></span>
                        What happens next?
                    </h3>
                    <ol className="space-y-4 text-gray-300">
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] text-cyan-400 font-bold flex items-center justify-center">1</span>
                            <span>You'll receive a confirmation email shortly with your receipt.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] text-cyan-400 font-bold flex items-center justify-center">2</span>
                            <span>Our onboarding team will contact you <strong>within 1 hour</strong> to schedule your setup consultation.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] text-cyan-400 font-bold flex items-center justify-center">3</span>
                            <span>We'll gather your specific requirements and begin building your automation.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] text-cyan-400 font-bold flex items-center justify-center">4</span>
                            <span className="text-white">Your automation will be live within 3-7 business days.</span>
                        </li>
                    </ol>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-xl transition transform hover:scale-[1.02]"
                    >
                        Return to Homepage
                    </Link>
                    <p className="text-sm text-gray-500">
                        Order ID: <span className="font-mono">{subscriptionId || 'Processing...'}</span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SubscriptionSuccessPage;

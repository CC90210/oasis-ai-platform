import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Calendar, Rocket } from 'lucide-react';
import { supabase } from '@/lib/supabase';


export default function CheckoutSuccessPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const purchaseId = searchParams.get('purchase_id');

    useEffect(() => {
        // Update purchase status
        if (purchaseId) {
            supabase
                .from('product_purchases')
                .update({
                    stripe_checkout_session_id: sessionId,
                    payment_status: 'completed',
                    paid_at: new Date().toISOString(),
                    status: 'paid',
                    updated_at: new Date().toISOString(),
                })
                .eq('id', purchaseId)
                .then(({ error }) => {
                    if (error) console.error('Error updating purchase status:', error);
                });
        }
    }, [purchaseId, sessionId]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative flex items-center justify-center px-4">


            <div className="max-w-lg w-full text-center relative z-10">
                {/* Success Icon */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                    Payment Successful!
                </h1>

                <p className="text-[var(--text-secondary)] text-lg mb-10">
                    Thank you for your purchase. We're excited to help you transform your business with AI automation.
                </p>

                {/* What happens next */}
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 md:p-8 text-left mb-8 border border-[var(--bg-tertiary)]">
                    <h2 className="text-[var(--text-primary)] font-semibold text-lg mb-6 flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-purple-400" />
                        What happens next?
                    </h2>
                    <ul className="space-y-5">
                        <li className="flex items-start gap-4">
                            <span className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 border border-purple-500/30">1</span>
                            <div>
                                <p className="text-[var(--text-primary)] font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                    Check your email
                                </p>
                                <p className="text-[var(--text-muted)] text-sm mt-1">
                                    You'll receive a confirmation and receipt shortly
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 border border-purple-500/30">2</span>
                            <div>
                                <p className="text-[var(--text-primary)] font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-cyan-400" />
                                    Schedule onboarding
                                </p>
                                <p className="text-[var(--text-muted)] text-sm mt-1">
                                    Our team will reach out within 24 hours to schedule your kickoff call
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 border border-purple-500/30">3</span>
                            <div>
                                <p className="text-[var(--text-primary)] font-medium flex items-center gap-2">
                                    <Rocket className="w-4 h-4 text-cyan-400" />
                                    Launch your automation
                                </p>
                                <p className="text-[var(--text-muted)] text-sm mt-1">
                                    We'll build and deploy your AI systems within the agreed timeline
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/portal"
                        className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                    >
                        Go to Portal
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 py-4 px-6 bg-[var(--bg-card)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold rounded-xl transition border border-[var(--bg-tertiary)]"
                    >
                        Return Home
                    </Link>
                </div>

                {/* Session Reference */}
                {sessionId && (
                    <p className="text-[var(--text-muted)] text-xs mt-8">
                        Reference: {sessionId.slice(0, 20)}...
                    </p>
                )}
            </div>
        </div>
    );
}

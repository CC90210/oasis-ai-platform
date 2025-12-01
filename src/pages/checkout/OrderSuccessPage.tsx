import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const OrderSuccessPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans text-text-primary">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full glass-card p-8 sm:p-12 text-center shadow-oasis-strong border border-white/5"
            >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-green-500" />
                </div>

                <h1 className="text-4xl font-display font-bold text-white mb-4">Order Confirmed!</h1>
                <p className="text-text-secondary text-lg mb-8">
                    Thank you for choosing OASIS AI. Your automation journey begins now.
                </p>

                <div className="bg-bg-tertiary/50 p-6 rounded-xl text-left mb-8 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4">Next Steps</h3>
                    <ol className="space-y-4">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-4">1</span>
                            <div>
                                <p className="font-medium text-white">Check your email</p>
                                <p className="text-sm text-text-tertiary">We've sent a confirmation and onboarding guide to your inbox.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-4">2</span>
                            <div>
                                <p className="font-medium text-white">Complete your profile</p>
                                <p className="text-sm text-text-tertiary">Log in to the client portal to provide details for your agent.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-4">3</span>
                            <div>
                                <p className="font-medium text-white">We build & deploy</p>
                                <p className="text-sm text-text-tertiary">Our team will have your agent ready in 3-5 business days.</p>
                            </div>
                        </li>
                    </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/portal/dashboard" className="btn-primary inline-flex items-center justify-center shadow-oasis">
                        Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link to="/" className="btn-secondary inline-flex items-center justify-center">
                        Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccessPage;

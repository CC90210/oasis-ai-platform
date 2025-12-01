import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Lock, Shield } from 'lucide-react';

const CheckoutPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        website: '',
        referral: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="min-h-screen bg-bg-primary pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-text-primary">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Checkout Form */}
                <div className="lg:col-span-7">
                    {/* Step Indicator */}
                    <div className="flex items-center space-x-4 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s ? 'bg-oasis-cyan text-bg-primary' : 'bg-bg-tertiary text-text-tertiary border border-text-tertiary/20'
                                    }`}>
                                    {step > s ? <Check className="w-5 h-5" /> : s}
                                </div>
                                <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${step >= s ? 'text-white' : 'text-text-tertiary'}`}>
                                    {s === 1 ? 'Info' : s === 2 ? 'Payment' : 'Confirm'}
                                </span>
                                {s < 3 && <div className="w-12 h-px bg-white/10 mx-4" />}
                            </div>
                        ))}
                    </div>

                    <div className="glass-card p-6 sm:p-8 shadow-oasis">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-2xl font-display font-bold text-white mb-6">Customer Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-1">Company Name *</label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                                placeholder="Acme Inc."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Industry</label>
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                        >
                                            <option value="">Select Industry...</option>
                                            <option value="hvac">HVAC</option>
                                            <option value="fitness">Fitness</option>
                                            <option value="beauty">Beauty</option>
                                            <option value="ecommerce">E-commerce</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="real-estate">Real Estate</option>
                                            <option value="professional-services">Professional Services</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-1">Website URL</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all"
                                            placeholder="https://example.com"
                                        />
                                    </div>

                                    <button
                                        onClick={nextStep}
                                        className="w-full btn-primary mt-6 shadow-oasis"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-2xl font-display font-bold text-white mb-6">Payment Method</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="p-4 border border-oasis-cyan/30 bg-oasis-cyan/5 rounded-lg flex items-center justify-between cursor-pointer hover:bg-oasis-cyan/10 transition-colors">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 rounded-full border-2 border-oasis-cyan bg-oasis-cyan mr-3" />
                                            <span className="font-medium text-white">PayPal / Card</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            {/* Icons would go here */}
                                            <span className="text-xs text-text-tertiary">Visa, MC, Amex, PayPal</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-bg-tertiary/50 p-4 rounded-lg mb-6 border border-white/5">
                                    <h3 className="text-lg font-semibold text-white mb-2">Monthly Retainer</h3>
                                    <p className="text-sm text-text-tertiary mb-4">
                                        Required to keep your AI agents running. Covers software, API credits, and support.
                                    </p>

                                    <div className="space-y-3">
                                        <label className="flex items-center p-3 border border-white/10 rounded-lg cursor-pointer hover:border-oasis-cyan/50 transition-colors">
                                            <input type="radio" name="retainer" className="text-oasis-cyan focus:ring-oasis-cyan bg-bg-tertiary border-white/20" />
                                            <div className="ml-3 flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-white">OASIS Essentials</span>
                                                    <span className="text-oasis-cyan">$297/mo</span>
                                                </div>
                                                <p className="text-xs text-text-tertiary">Basic support & monitoring</p>
                                            </div>
                                        </label>

                                        <label className="flex items-center p-3 border-2 border-oasis-cyan bg-oasis-cyan/5 rounded-lg cursor-pointer">
                                            <input type="radio" name="retainer" defaultChecked className="text-oasis-cyan focus:ring-oasis-cyan bg-bg-tertiary border-white/20" />
                                            <div className="ml-3 flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-white">OASIS Standard (Recommended)</span>
                                                    <span className="text-oasis-cyan">$497/mo</span>
                                                </div>
                                                <p className="text-xs text-text-tertiary">Priority support & optimization</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={prevStep}
                                        className="w-1/3 btn-secondary"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        className="w-2/3 btn-primary shadow-oasis"
                                    >
                                        Complete Purchase
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-white mb-4">Order Confirmed!</h2>
                                <p className="text-text-secondary mb-8">
                                    Thank you for choosing OASIS AI. We've sent a confirmation email to {formData.email}.
                                </p>
                                <div className="bg-bg-tertiary p-6 rounded-lg text-left max-w-md mx-auto mb-8 border border-white/5">
                                    <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
                                    <ol className="space-y-4">
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-3">1</span>
                                            <span className="text-sm text-text-secondary">You'll receive an onboarding email within 5 minutes.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-3">2</span>
                                            <span className="text-sm text-text-secondary">Fill out the detailed requirements form for your agent.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-oasis-cyan/20 text-oasis-cyan flex items-center justify-center text-sm font-bold mr-3">3</span>
                                            <span className="text-sm text-text-secondary">Our team will configure and deploy your agent within 3-5 days.</span>
                                        </li>
                                    </ol>
                                </div>
                                <button className="btn-primary shadow-oasis">
                                    Go to Dashboard
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-32">
                        <div className="glass-card p-6 border border-white/5 shadow-oasis-strong">
                            <h3 className="text-xl font-display font-bold text-white mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-bg-tertiary rounded-lg mr-3 flex items-center justify-center border border-white/5">
                                            <span className="text-2xl">🤖</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Website Chat Widget</h4>
                                            <p className="text-xs text-text-tertiary">Tier 1 Agent</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-white">$797.00</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 border-b border-white/10 pb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Subtotal</span>
                                    <span className="text-white">$797.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Monthly Retainer (1st mo)</span>
                                    <span className="text-white">$497.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-secondary">Tax (13% HST)</span>
                                    <span className="text-white">$168.22</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-sm text-text-tertiary">Total Today</span>
                                    <div className="text-3xl font-bold text-oasis-cyan">$1,462.22</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-text-tertiary block">Then $497/mo</span>
                                    <span className="text-xs text-text-tertiary">starting Jan 1st</span>
                                </div>
                            </div>

                            <div className="flex space-x-2 mb-6">
                                <input
                                    type="text"
                                    placeholder="Discount Code"
                                    className="w-full px-4 py-2 bg-bg-tertiary border border-white/10 rounded-lg text-white placeholder-text-tertiary focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-all text-sm"
                                />
                                <button className="btn-secondary py-2 px-4 text-sm">Apply</button>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <div className="flex items-center text-xs text-text-tertiary">
                                    <Lock className="w-3 h-3 mr-2 text-green-500" />
                                    Secure 256-bit SSL Encrypted Payment
                                </div>
                                <div className="flex items-center text-xs text-text-tertiary">
                                    <Shield className="w-3 h-3 mr-2 text-green-500" />
                                    30-Day Money-Back Guarantee
                                </div>
                                <div className="flex items-center text-xs text-text-tertiary">
                                    <CreditCard className="w-3 h-3 mr-2 text-green-500" />
                                    No hidden fees
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;

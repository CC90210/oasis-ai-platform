import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSearchParams, Link } from 'react-router-dom';

// Agent Data from Master Prompt
const agents = {
    'chat-widget': {
        title: 'Website Chat Widget Agent',
        price: 797,
        tier: 1
    },
    'google-reviews': {
        title: 'Google Review Response Agent',
        price: 597,
        tier: 1
    },
    'email-automation': {
        title: 'Gmail/Email Automation Agent',
        price: 997,
        tier: 1
    },
    'appointment-booking': {
        title: 'Appointment Booking Agent',
        price: 897,
        tier: 1
    },
    'lead-capture': {
        title: 'Lead Capture & Qualification Agent',
        price: 897,
        tier: 1
    },
    'launchpad': {
        title: 'OASIS Launchpad Bundle',
        price: 997,
        tier: 3
    }
};

const retainers = {
    'essentials': {
        name: 'OASIS Essentials',
        price: 297,
        description: 'Basic support & monitoring'
    },
    'standard': {
        name: 'OASIS Standard (Recommended)',
        price: 497,
        description: 'Priority support & optimization'
    },
    'priority': {
        name: 'OASIS Priority',
        price: 797,
        description: 'Dedicated account manager & premium support'
    }
};

const CheckoutPage = () => {
    const [searchParams] = useSearchParams();
    const agentSlug = searchParams.get('agent');
    const selectedAgent = agentSlug ? agents[agentSlug as keyof typeof agents] : null;

    const [step, setStep] = useState(1);
    const [selectedRetainer, setSelectedRetainer] = useState<keyof typeof retainers>('standard');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        website: '',
        referral: ''
    });

    // Redirect if no agent selected
    if (!selectedAgent) {
        return (
            <div className="min-h-screen bg-bg-primary pt-32 px-4 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">No Agent Selected</h2>
                <p className="text-text-secondary mb-8">Please select an agent from our services page.</p>
                <Link to="/services" className="btn-primary">View Services</Link>
            </div>
        );
    }

    // Calculations
    const agentPrice = selectedAgent.price;
    const retainerPrice = retainers[selectedRetainer].price;
    const subtotal = agentPrice + retainerPrice;
    const taxRate = 0.13; // 13% HST
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    // PayPal Options
    const initialOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
        currency: "CAD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
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
                                        <div className="bg-bg-tertiary/50 p-4 rounded-lg mb-6 border border-white/5">
                                            <h3 className="text-lg font-semibold text-white mb-2">Monthly Retainer</h3>
                                            <p className="text-sm text-text-tertiary mb-4">
                                                Required to keep your AI agents running. Covers software, API credits, and support.
                                            </p>

                                            <div className="space-y-3">
                                                {Object.entries(retainers).map(([key, plan]) => (
                                                    <label key={key} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedRetainer === key ? 'border-oasis-cyan bg-oasis-cyan/5' : 'border-white/10 hover:border-oasis-cyan/50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="retainer"
                                                            checked={selectedRetainer === key}
                                                            onChange={() => setSelectedRetainer(key as keyof typeof retainers)}
                                                            className="text-oasis-cyan focus:ring-oasis-cyan bg-bg-tertiary border-white/20"
                                                        />
                                                        <div className="ml-3 flex-1">
                                                            <div className="flex justify-between">
                                                                <span className="font-medium text-white">{plan.name}</span>
                                                                <span className="text-oasis-cyan">${plan.price}/mo</span>
                                                            </div>
                                                            <p className="text-xs text-text-tertiary">{plan.description}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PayPal Buttons */}
                                        <div className="mt-6">
                                            <PayPalButtons
                                                style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        intent: "CAPTURE",
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    currency_code: "CAD",
                                                                    value: totalAmount.toFixed(2),
                                                                },
                                                                description: `${selectedAgent.title} + ${retainers[selectedRetainer].name}`,
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={async (data, actions) => {
                                                    if (actions.order) {
                                                        const order = await actions.order.capture();
                                                        console.log("Order captured:", order);
                                                        nextStep();
                                                    }
                                                }}
                                                onError={(err) => {
                                                    console.error("PayPal Checkout onError", err);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 mt-6">
                                        <button
                                            onClick={prevStep}
                                            className="w-full btn-secondary"
                                        >
                                            Back
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
                                                <h4 className="font-medium text-white">{selectedAgent.title}</h4>
                                                <p className="text-xs text-text-tertiary">Tier {selectedAgent.tier} Agent</p>
                                            </div>
                                        </div>
                                        <span className="font-medium text-white">${agentPrice.toLocaleString()}.00</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6 border-b border-white/10 pb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Subtotal</span>
                                        <span className="text-white">${agentPrice.toLocaleString()}.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Monthly Retainer (1st mo)</span>
                                        <span className="text-white">${retainerPrice.toLocaleString()}.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Tax (13% HST)</span>
                                        <span className="text-white">${taxAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <span className="text-sm text-text-tertiary">Total Today</span>
                                        <div className="text-3xl font-bold text-oasis-cyan">${totalAmount.toFixed(2)}</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-text-tertiary block">Then ${retainerPrice}/mo</span>
                                        <span className="text-xs text-text-tertiary">starting next month</span>
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
        </PayPalScriptProvider>
    );
};

export default CheckoutPage;

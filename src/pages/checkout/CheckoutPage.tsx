import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Bot, Shield, Sparkles, Zap } from 'lucide-react';
import LegalAcceptance, { AcceptanceData } from '@/components/legal/LegalAcceptance';
import { supabase } from '@/lib/supabase';


// Product definitions matching pricing page
const PRODUCTS: Record<string, {
    name: string;
    description: string;
    price: number;
    monthly: number;
    features: string[];
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
}> = {
    launchpad: {
        name: 'OASIS Launchpad',
        description: 'Perfect for getting started with AI automation',
        price: 2500,
        monthly: 347,
        features: [
            'AI-powered chatbot setup',
            'Lead capture automation',
            'Basic CRM integration',
            '30-day support included'
        ],
        icon: Zap,
        gradient: 'from-cyan-500 to-blue-500',
    },
    integration: {
        name: 'Integration Suite',
        description: 'Complete AI automation setup for growing businesses',
        price: 5000,
        monthly: 497,
        features: [
            'Full automation ecosystem',
            'Voice AI agent setup',
            'Multi-platform integration',
            'Custom workflow design',
            '90-day priority support'
        ],
        icon: Sparkles,
        gradient: 'from-purple-500 to-pink-500',
    },
    'ai-ops': {
        name: 'AI Ops Monthly Retainer',
        description: 'Ongoing optimization, support, and scaling',
        price: 0,
        monthly: 497,
        features: [
            'Dedicated AI specialist',
            'Monthly performance reviews',
            'Continuous optimization',
            'Priority support 24/7',
            'New feature implementations'
        ],
        icon: Bot,
        gradient: 'from-orange-500 to-red-500',
    },
};

export default function CheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get('product') || '';
    const product = PRODUCTS[productId];
    const wasCancelled = searchParams.get('cancelled') === 'true';

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        companyName: '',
        phone: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);

    // Redirect if invalid product
    useEffect(() => {
        if (!product) {
            navigate('/pricing');
        }
    }, [product, navigate]);

    if (!product) {
        return null;
    }

    const ProductIcon = product.icon;

    const validateDetails = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.clientName.trim()) {
            newErrors.clientName = 'Name is required';
        }

        if (!formData.clientEmail.trim()) {
            newErrors.clientEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
            newErrors.clientEmail = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateDetails()) {
            setStep(2);
        }
    };

    const handleLegalAcceptance = async (acceptanceData: AcceptanceData) => {
        setIsProcessing(true);
        setGeneralError(null);

        try {
            // Create record in product_purchases
            const { data: purchase, error: insertError } = await supabase
                .from('product_purchases')
                .insert({
                    client_name: formData.clientName,
                    client_email: formData.clientEmail,
                    company_name: formData.companyName || null,
                    phone: formData.phone || null,
                    product_tier: productId,
                    product_name: product.name,
                    upfront_cost_cents: product.price * 100,
                    monthly_cost_cents: product.monthly * 100,
                    currency: 'USD',
                    tos_accepted: true,
                    tos_accepted_at: acceptanceData.tosAcceptedAt,
                    tos_version: acceptanceData.tosVersion,
                    privacy_accepted: true,
                    privacy_accepted_at: acceptanceData.privacyAcceptedAt,
                    privacy_version: acceptanceData.privacyVersion,
                    service_agreement_accepted: true,
                    service_agreement_accepted_at: acceptanceData.serviceAgreementAcceptedAt,
                    service_agreement_signature: acceptanceData.serviceAgreementSignature,
                    user_agent: navigator.userAgent,
                    status: 'legal_accepted',
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Log to legal_acceptances for audit trail
            await supabase.from('legal_acceptances').insert([
                {
                    client_name: formData.clientName,
                    client_email: formData.clientEmail,
                    company_name: formData.companyName || null,
                    document_type: 'terms_of_service',
                    document_version: acceptanceData.tosVersion,
                    acceptance_method: 'checkbox',
                    related_purchase_type: productId,
                    user_agent: navigator.userAgent,
                },
                {
                    client_name: formData.clientName,
                    client_email: formData.clientEmail,
                    company_name: formData.companyName || null,
                    document_type: 'privacy_policy',
                    document_version: acceptanceData.privacyVersion,
                    acceptance_method: 'checkbox',
                    related_purchase_type: productId,
                    user_agent: navigator.userAgent,
                },
                {
                    client_name: formData.clientName,
                    client_email: formData.clientEmail,
                    company_name: formData.companyName || null,
                    document_type: 'service_agreement',
                    document_version: acceptanceData.serviceAgreementVersion,
                    acceptance_method: 'signature',
                    signature_name: acceptanceData.serviceAgreementSignature,
                    related_purchase_type: productId,
                    user_agent: navigator.userAgent,
                },
            ]);

            // Create Stripe checkout session using existing API format
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    purchaseId: purchase.id,
                    productId: productId,
                    productName: product.name,
                    clientEmail: formData.clientEmail,
                    upfrontCents: product.price * 100,
                    monthlyCents: product.monthly * 100,
                    currency: 'usd',
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);
            if (!data.url) throw new Error('No checkout URL received');

            // Redirect to Stripe
            window.location.href = data.url;

        } catch (error: any) {
            console.error('Checkout error:', error);
            setGeneralError(error.message || 'Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative">


            {/* Header */}
            <div className="border-b border-[var(--bg-tertiary)] relative z-10 bg-[var(--bg-primary)]/80 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link
                        to="/pricing"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 text-sm transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pricing
                    </Link>
                </div>
            </div>

            {/* Cancelled Warning */}
            {wasCancelled && (
                <div className="max-w-5xl mx-auto px-4 pt-4 relative z-10">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-4 rounded-xl flex items-center gap-3">
                        <span>Payment was cancelled. You can try again when you're ready.</span>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10">
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-400' : 'text-[var(--text-muted)]'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step > 1 ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' : step === 1 ? 'bg-purple-500/20 text-purple-400 border border-purple-500' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                            }`}>
                            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Details</span>
                    </div>

                    <div className="w-8 sm:w-12 h-px bg-[var(--bg-tertiary)]" />

                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-400' : 'text-[var(--text-muted)]'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step > 2 ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white' : step === 2 ? 'bg-purple-500/20 text-purple-400 border border-purple-500' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                            }`}>
                            {step > 2 ? <Check className="w-4 h-4" /> : '2'}
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Terms</span>
                    </div>

                    <div className="w-8 sm:w-12 h-px bg-[var(--bg-tertiary)]" />

                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-[var(--bg-tertiary)]">
                            3
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Payment</span>
                    </div>
                </div>

                {/* General Error */}
                {generalError && (
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
                            {generalError}
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <form onSubmit={handleDetailsSubmit} className="max-w-xl mx-auto lg:mx-0">
                                <div className="mb-8">
                                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">Your Details</h1>
                                    <p className="text-[var(--text-secondary)]">Tell us a bit about yourself to get started.</p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                            className={`w-full px-4 py-3 bg-[var(--bg-card)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.clientName ? 'border-red-500' : 'border-[var(--bg-tertiary)]'
                                                }`}
                                            placeholder="John Smith"
                                        />
                                        {errors.clientName && (
                                            <p className="text-red-400 text-sm mt-1">{errors.clientName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Email *</label>
                                        <input
                                            type="email"
                                            value={formData.clientEmail}
                                            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                            className={`w-full px-4 py-3 bg-[var(--bg-card)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.clientEmail ? 'border-red-500' : 'border-[var(--bg-tertiary)]'
                                                }`}
                                            placeholder="john@company.com"
                                        />
                                        {errors.clientEmail && (
                                            <p className="text-red-400 text-sm mt-1">{errors.clientEmail}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Company Name <span className="text-[var(--text-muted)]">(optional)</span></label>
                                        <input
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--bg-tertiary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            placeholder="Acme Inc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Phone <span className="text-[var(--text-muted)]">(optional)</span></label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--bg-tertiary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-semibold rounded-xl transition shadow-lg shadow-purple-500/25"
                                >
                                    Continue
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <LegalAcceptance
                                clientName={formData.clientName}
                                onAcceptanceComplete={handleLegalAcceptance}
                                isLoading={isProcessing}
                            />
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-[var(--bg-card)] rounded-2xl p-6 sticky top-8 border border-[var(--bg-tertiary)]">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Order Summary</h3>

                            <div className="border-b border-[var(--bg-tertiary)] pb-5 mb-5">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0`}>
                                        <ProductIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-primary)] font-semibold">{product.name}</p>
                                        <p className="text-[var(--text-muted)] text-sm mt-1">{product.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="border-b border-[var(--bg-tertiary)] pb-5 mb-5">
                                <p className="text-[var(--text-secondary)] text-sm font-medium mb-3">What's included:</p>
                                <ul className="space-y-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3">
                                {product.price > 0 && (
                                    <div className="flex justify-between text-[var(--text-secondary)]">
                                        <span>Setup Fee</span>
                                        <span className="font-medium text-[var(--text-primary)]">${product.price.toLocaleString()}</span>
                                    </div>
                                )}
                                {product.monthly > 0 && (
                                    <div className="flex justify-between text-[var(--text-secondary)]">
                                        <span>Monthly</span>
                                        <span className="font-medium text-[var(--text-primary)]">${product.monthly}/mo</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-[var(--bg-tertiary)] mt-5 pt-5">
                                <div className="flex justify-between text-[var(--text-primary)] font-bold text-xl">
                                    <span>Total Due Today</span>
                                    <span>${(product.price || product.monthly).toLocaleString()}</span>
                                </div>
                                {product.monthly > 0 && product.price > 0 && (
                                    <p className="text-[var(--text-muted)] text-sm mt-2">
                                        Then ${product.monthly}/mo starting next month
                                    </p>
                                )}
                            </div>

                            {/* Trust badges */}
                            <div className="mt-6 pt-5 border-t border-[var(--bg-tertiary)]">
                                <div className="flex items-center justify-center gap-2 text-[var(--text-muted)] text-xs">
                                    <Shield className="w-4 h-4" />
                                    <span>Secure checkout powered by Stripe</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

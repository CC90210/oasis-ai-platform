import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Check, Package, Zap, AlertCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import LegalAcceptance, { AcceptanceData } from '@/components/legal/LegalAcceptance';
import { supabase } from '@/lib/supabase';
import { ALL_AUTOMATIONS, BUNDLES } from '@/lib/pricing';
import StarField from '@/components/StarField';

interface CheckoutData {
    productId: string;
    productType: string;
    tier: string;
    currency: string;
    customerName?: string;
    businessName?: string;
    customerEmail?: string;
    customerPhone?: string;
    discountPercent?: number;
    promoCode?: string;
    items?: Array<{ productId: string; productType: string; tier?: string; quantity?: number }>;
}

export default function LegalCheckoutPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const [step, setStep] = useState(1); // 1 = Details, 2 = Legal
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        companyName: '',
        phone: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);

    // Load checkout data from session storage
    useEffect(() => {
        const stored = sessionStorage.getItem('pendingCheckout');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setCheckoutData(data);
                // Pre-fill if customer info available
                if (data.customerName) setFormData(prev => ({ ...prev, clientName: data.customerName }));
                if (data.customerEmail) setFormData(prev => ({ ...prev, clientEmail: data.customerEmail }));
                if (data.businessName) setFormData(prev => ({ ...prev, companyName: data.businessName }));
                if (data.customerPhone) setFormData(prev => ({ ...prev, phone: data.customerPhone }));
            } catch (e) {
                console.error('Failed to parse checkout data', e);
            }
        } else {
            // No checkout data, redirect to pricing
            navigate('/pricing');
        }
    }, [navigate]);

    if (!checkoutData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
                <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Get product info
    const productId = checkoutData.productId;
    let productName = productId;
    let productIcon: any = Zap;
    let setupFee = 0;
    let monthlyFee = 0;

    // Check automations
    const automation = Object.values(ALL_AUTOMATIONS).find(p => p.id === productId);
    if (automation) {
        productName = automation.name;
        productIcon = (LucideIcons as any)[automation.icon] || Zap;
        setupFee = automation.setupFee;
        const tier = (checkoutData.tier || 'professional') as keyof typeof automation.tiers;
        monthlyFee = automation.tiers[tier]?.price || automation.tiers.professional.price;
    }

    // Check bundles
    const bundle = Object.values(BUNDLES).find(p => p.id === productId);
    if (bundle) {
        productName = bundle.name;
        productIcon = Package;
        setupFee = bundle.setupFee;
        monthlyFee = bundle.monthlyFee;
    }

    // Apply currency conversion (prices are in CAD)
    const EXCHANGE_RATE = 0.71;
    if (checkoutData.currency === 'usd') {
        setupFee = Math.round(setupFee * EXCHANGE_RATE);
        monthlyFee = Math.round(monthlyFee * EXCHANGE_RATE);
    }

    // Apply discount if applicable
    const discountPercent = checkoutData.discountPercent || 0;
    const discountedSetup = Math.round(setupFee * (1 - discountPercent / 100));
    const totalDueToday = discountedSetup + monthlyFee;
    const currencySymbol = checkoutData.currency === 'usd' ? '$' : 'CA$';

    const ProductIcon = productIcon;

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

            // Now proceed to Stripe checkout
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: checkoutData.productId,
                    productType: checkoutData.productType,
                    tier: checkoutData.tier,
                    items: checkoutData.items,
                    currency: checkoutData.currency,
                    customerName: formData.clientName,
                    businessName: formData.companyName,
                    customerEmail: formData.clientEmail,
                    customerPhone: formData.phone,
                    discountPercent: checkoutData.discountPercent,
                    promoCode: checkoutData.promoCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            if (data.url) {
                // Clear session storage
                sessionStorage.removeItem('pendingCheckout');
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }

        } catch (error: any) {
            console.error('Checkout error:', error);
            setGeneralError(error.message || 'Something went wrong. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative">
            <StarField forceTheme="dark" />

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

            <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 relative z-10">
                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-cyan-400' : 'text-[var(--text-muted)]'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step > 1 ? 'bg-cyan-500 text-black' : step === 1 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                            }`}>
                            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Details</span>
                    </div>

                    <div className="w-8 sm:w-12 h-px bg-[var(--bg-tertiary)]" />

                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-cyan-400' : 'text-[var(--text-muted)]'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step > 2 ? 'bg-cyan-500 text-black' : step === 2 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
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
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{generalError}</span>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <form onSubmit={handleDetailsSubmit} className="max-w-xl mx-auto lg:mx-0">
                                <div className="mb-8">
                                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">Complete Your Purchase</h1>
                                    <p className="text-[var(--text-secondary)]">Enter your details to continue.</p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.clientName}
                                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                            className={`w-full px-4 py-3 bg-[var(--bg-card)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition ${errors.clientName ? 'border-red-500' : 'border-[var(--bg-tertiary)]'
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
                                            className={`w-full px-4 py-3 bg-[var(--bg-card)] border rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition ${errors.clientEmail ? 'border-red-500' : 'border-[var(--bg-tertiary)]'
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
                                            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--bg-tertiary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                            placeholder="Acme Inc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[var(--text-secondary)] mb-2 font-medium">Phone <span className="text-[var(--text-muted)]">(optional)</span></label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--bg-tertiary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition shadow-lg shadow-cyan-500/25"
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
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <ProductIcon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-[var(--text-primary)] font-semibold">{productName}</p>
                                        <p className="text-[var(--text-muted)] text-sm mt-1 capitalize">
                                            {checkoutData.tier} tier • {checkoutData.currency?.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Setup Fee</span>
                                    <div className="text-right">
                                        {discountPercent > 0 && (
                                            <span className="text-[var(--text-muted)] line-through mr-2 text-sm">{currencySymbol}{setupFee}</span>
                                        )}
                                        <span className="font-medium text-[var(--text-primary)]">{currencySymbol}{discountedSetup}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[var(--text-secondary)]">
                                    <span>Monthly</span>
                                    <span className="font-medium text-[var(--text-primary)]">{currencySymbol}{monthlyFee}/mo</span>
                                </div>
                                {discountPercent > 0 && (
                                    <div className="flex justify-between text-green-400 text-sm">
                                        <span>Discount ({discountPercent}%)</span>
                                        <span>-{currencySymbol}{setupFee - discountedSetup}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-[var(--bg-tertiary)] mt-5 pt-5">
                                <div className="flex justify-between text-[var(--text-primary)] font-bold text-xl">
                                    <span>Due Today</span>
                                    <span className="text-cyan-400">{currencySymbol}{totalDueToday}</span>
                                </div>
                                <p className="text-[var(--text-muted)] text-sm mt-2">
                                    Then {currencySymbol}{monthlyFee}/mo starting next month
                                </p>
                            </div>

                            {/* Promo code info */}
                            {checkoutData.promoCode && (
                                <div className="mt-4 pt-4 border-t border-[var(--bg-tertiary)]">
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <Check className="w-4 h-4" />
                                        <span>Code <strong>{checkoutData.promoCode}</strong> applied</span>
                                    </div>
                                </div>
                            )}

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

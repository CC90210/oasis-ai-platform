import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Shield,
    Lock,
    CreditCard,
    FileText,
    User,
    Building,
    Phone,
    Mail,
    DollarSign,
    Calendar,
    AlertCircle,
    Loader2,
    CheckCircle,
    Scale
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import LegalAcceptance, { AcceptanceData } from '@/components/legal/LegalAcceptance';

// Type definitions
interface FormData {
    fullName: string;
    email: string;
    companyName: string;
    phone: string;
    serviceType: string;
    agreementReference: string;
    upfrontCost: string;
    monthlyCost: string;
    currency: 'USD' | 'CAD';
    ndaSignature: string;
    ndaAgreed: boolean;
}

// Updated service types with descriptions
const SERVICE_TYPES = [
    { id: 'customer-support', name: 'Customer Support Agent', description: 'AI-powered customer service automation' },
    { id: 'lead-generation', name: 'Lead Generation', description: 'Automated lead finding & enrichment' },
    { id: 'appointment-booking', name: 'Appointment Booking', description: 'Smart scheduling automation' },
    { id: 'review-management', name: 'Review Management', description: 'Google review automation' },
    { id: 'social-media', name: 'Social Media Manager', description: 'Content creation & posting automation' },
    { id: 'voice-ai', name: 'Voice AI Agent', description: 'Phone call automation' },
    { id: 'website-build', name: 'Website Development', description: 'Custom website design & build' },
    { id: 'workflow-automation', name: 'Workflow Automation', description: 'Business process automation' },
    { id: 'integration', name: 'System Integration', description: 'Connect your tools & platforms' },
    { id: 'custom', name: 'Custom Solution', description: 'Tailored to your specific needs' },
];

const NDA_TEXT = `NON-DISCLOSURE AGREEMENT

Effective Date: {{DATE}}

This Non-Disclosure Agreement ("Agreement") is entered into by and between:

OASIS AI Solutions ("Company"), a business entity operating in Ontario, Canada, with contact email oasisaisolutions@gmail.com

and

{{CLIENT_NAME}} ("Client")

1. CONFIDENTIAL INFORMATION

"Confidential Information" includes, but is not limited to: pricing terms, discount rates, custom agreement details, payment schedules, and any financial arrangements between the parties that differ from publicly advertised rates.

2. OBLIGATIONS

The Client agrees to:
• Keep all pricing and financial terms strictly confidential
• Not disclose any custom pricing arrangements to third parties
• Not use the Confidential Information for any purpose other than the intended business relationship
• Take reasonable measures to protect the confidentiality of this information

3. DURATION

This Agreement shall remain in effect for a period of two (2) years from the effective date, or for the duration of the business relationship plus one (1) year, whichever is longer.

4. PERMITTED DISCLOSURES

The Client may disclose Confidential Information if required by law, provided that the Client gives the Company reasonable advance notice to seek protective measures.

5. REMEDIES

The Client acknowledges that breach of this Agreement may cause irreparable harm to the Company, and the Company shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available at law.

6. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada.

By signing below, both parties acknowledge that they have read, understood, and agree to be bound by the terms and conditions of this Non-Disclosure Agreement.`;

export default function CustomAgreementPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [agreementId, setAgreementId] = useState<string | null>(null);
    const [showCancelledMessage, setShowCancelledMessage] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        serviceType: '',
        agreementReference: '',
        upfrontCost: '',
        monthlyCost: '',
        currency: 'USD',
        ndaSignature: '',
        ndaAgreed: false
    });

    // Check for cancelled payment
    useEffect(() => {
        if (searchParams.get('cancelled') === 'true') {
            setShowCancelledMessage(true);
            // Clear the URL param
            window.history.replaceState({}, '', '/custom-agreement');
        }
    }, [searchParams]);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError(null);
    };

    const validateStep1 = (): boolean => {
        if (!formData.fullName.trim()) {
            setError('Full name is required');
            return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Valid email is required');
            return false;
        }
        if (!formData.serviceType) {
            setError('Please select a service type');
            return false;
        }
        const upfront = parseFloat(formData.upfrontCost) || 0;
        const monthly = parseFloat(formData.monthlyCost) || 0;
        if (upfront <= 0 && monthly <= 0) {
            setError('Please enter at least one cost (upfront or monthly)');
            return false;
        }
        return true;
    };

    const validateStep2 = (): boolean => {
        if (!formData.ndaSignature.trim()) {
            setError('Please sign the NDA by typing your full legal name');
            return false;
        }
        if (formData.ndaSignature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
            setError('Signature must match your full name');
            return false;
        }
        if (!formData.ndaAgreed) {
            setError('You must agree to the terms of the NDA');
            return false;
        }
        return true;
    };

    const handleContinue = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
    };

    // After NDA is signed, save to Supabase and move to step 3
    const handleNdaSigned = async () => {
        if (!validateStep2()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            // Convert costs to cents
            const upfrontCostCents = Math.round(parseFloat(formData.upfrontCost || '0') * 100);
            const monthlyCostCents = Math.round(parseFloat(formData.monthlyCost || '0') * 100);

            // Get service name from ID
            const serviceInfo = SERVICE_TYPES.find(s => s.id === formData.serviceType);
            const serviceName = serviceInfo?.name || formData.serviceType;

            // Prepare data for Supabase
            const agreementData = {
                client_name: formData.fullName,
                client_email: formData.email,
                company_name: formData.companyName || null,
                phone: formData.phone || null,
                automation_type: serviceName,
                agreement_reference: formData.agreementReference || null,
                upfront_cost_cents: upfrontCostCents,
                monthly_cost_cents: monthlyCostCents,
                currency: formData.currency.toLowerCase(),
                nda_signed: true,
                nda_signed_at: new Date().toISOString(),
                nda_signature_name: formData.ndaSignature,
                status: 'nda_signed',
            };

            // Save to Supabase
            const { data: insertedData, error: supabaseError } = await supabase
                .from('custom_agreements')
                .insert(agreementData)
                .select()
                .single();

            if (supabaseError) {
                console.error('Supabase error:', supabaseError);
                throw supabaseError;
            }

            // Store the agreement ID for later
            setAgreementId(insertedData.id);
            setCurrentStep(3); // Move to legal acceptance
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle legal acceptance and proceed to Stripe
    const handleLegalAcceptance = async (acceptanceData: AcceptanceData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Update the custom_agreements record with legal acceptance
            if (agreementId) {
                const { error: updateError } = await supabase
                    .from('custom_agreements')
                    .update({
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
                    .eq('id', agreementId);

                if (updateError) throw updateError;
            }

            // Log to legal_acceptances table for audit trail
            await supabase.from('legal_acceptances').insert([
                {
                    client_name: formData.fullName,
                    client_email: formData.email,
                    company_name: formData.companyName || null,
                    document_type: 'terms_of_service',
                    document_version: acceptanceData.tosVersion,
                    acceptance_method: 'checkbox',
                    related_agreement_id: agreementId,
                    related_purchase_type: 'custom',
                    user_agent: navigator.userAgent,
                },
                {
                    client_name: formData.fullName,
                    client_email: formData.email,
                    company_name: formData.companyName || null,
                    document_type: 'privacy_policy',
                    document_version: acceptanceData.privacyVersion,
                    acceptance_method: 'checkbox',
                    related_agreement_id: agreementId,
                    related_purchase_type: 'custom',
                    user_agent: navigator.userAgent,
                },
                {
                    client_name: formData.fullName,
                    client_email: formData.email,
                    company_name: formData.companyName || null,
                    document_type: 'service_agreement',
                    document_version: acceptanceData.serviceAgreementVersion,
                    acceptance_method: 'signature',
                    signature_name: acceptanceData.serviceAgreementSignature,
                    related_agreement_id: agreementId,
                    related_purchase_type: 'custom',
                    user_agent: navigator.userAgent,
                },
            ]);

            // Proceed to Stripe checkout
            await createStripeCheckout();

        } catch (err: any) {
            console.error('Error saving legal acceptance:', err);
            setError(err.message || 'An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    // Create Stripe checkout session
    const createStripeCheckout = async () => {
        const upfrontCostCents = Math.round(parseFloat(formData.upfrontCost || '0') * 100);
        const monthlyCostCents = Math.round(parseFloat(formData.monthlyCost || '0') * 100);
        const serviceInfo = SERVICE_TYPES.find(s => s.id === formData.serviceType);
        const serviceName = serviceInfo?.name || formData.serviceType;

        const response = await fetch('/api/stripe/custom-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientName: formData.fullName,
                clientEmail: formData.email,
                companyName: formData.companyName,
                automationType: serviceName,
                upfrontCostCents,
                monthlyCostCents,
                currency: formData.currency.toLowerCase(),
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create checkout session');
        }

        if (data.url) {
            window.location.href = data.url;
        } else {
            throw new Error('No checkout URL returned');
        }
    };


    const formatNDAText = () => {
        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const clientName = formData.companyName
            ? `${formData.fullName} / ${formData.companyName}`
            : formData.fullName || '[Client Name]';

        return NDA_TEXT
            .replace('{{DATE}}', today)
            .replace('{{CLIENT_NAME}}', clientName);
    };

    const upfrontAmount = parseFloat(formData.upfrontCost) || 0;
    const monthlyAmount = parseFloat(formData.monthlyCost) || 0;
    const currencySymbol = formData.currency === 'USD' ? 'US$' : 'CA$';
    const currencyLabel = formData.currency === 'USD' ? 'USD' : 'CAD';

    return (
        <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Complete Your <span className="text-cyan-400">Custom Agreement</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Finalize your pre-negotiated deal securely online
                    </p>
                </div>

                {/* Cancelled Payment Message */}
                {showCancelledMessage && (
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <div>
                                <p className="text-yellow-200 font-medium">Payment cancelled</p>
                                <p className="text-yellow-200/70 text-sm">Your payment was cancelled. You can try again below.</p>
                            </div>
                            <button
                                onClick={() => setShowCancelledMessage(false)}
                                className="ml-auto text-yellow-400 hover:text-yellow-300"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Progress Steps - 4 Steps */}
                <div className="max-w-3xl mx-auto mb-10">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700">
                            <div
                                className="h-full bg-cyan-500 transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                            />
                        </div>

                        {/* Step 1: Details */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 1 ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-400'
                                }`}>
                                {currentStep > 1 ? <Check className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <span className={`mt-2 text-xs sm:text-sm ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                                Details
                            </span>
                        </div>

                        {/* Step 2: NDA */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 2 ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-400'
                                }`}>
                                {currentStep > 2 ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>
                            <span className={`mt-2 text-xs sm:text-sm ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                                NDA
                            </span>
                        </div>

                        {/* Step 3: Terms */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 3 ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-400'
                                }`}>
                                {currentStep > 3 ? <Check className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
                            </div>
                            <span className={`mt-2 text-xs sm:text-sm ${currentStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
                                Terms
                            </span>
                        </div>

                        {/* Step 4: Payment */}
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= 4 ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-400'
                                }`}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <span className={`mt-2 text-xs sm:text-sm ${currentStep >= 4 ? 'text-white' : 'text-gray-500'}`}>
                                Payment
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">

                        {/* Step 1: Details */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-cyan-400" />
                                    Your Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                value={formData.fullName}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                placeholder="John Smith"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Company Name
                                        </label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                value={formData.companyName}
                                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                placeholder="Acme Inc."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Service Type <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={formData.serviceType}
                                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-gray-800">Select the service we discussed...</option>
                                        {SERVICE_TYPES.map((service) => (
                                            <option key={service.id} value={service.id} className="bg-gray-800">
                                                {service.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Agreement Reference
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={formData.agreementReference}
                                            onChange={(e) => handleInputChange('agreementReference', e.target.value)}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                            placeholder="e.g. Discovery call on Jan 9"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Optional - reference your discussion with our team</p>
                                </div>

                                <div className="pt-4 border-t border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-cyan-400" />
                                            Custom Pricing
                                        </h3>

                                        {/* Currency Selector */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-sm">Currency:</span>
                                            <div className="flex bg-gray-800 rounded-lg p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange('currency', 'USD')}
                                                    className={`px-3 py-1 rounded text-sm transition ${formData.currency === 'USD'
                                                        ? 'bg-cyan-500 text-black font-medium'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    USD $
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange('currency', 'CAD')}
                                                    className={`px-3 py-1 rounded text-sm transition ${formData.currency === 'CAD'
                                                        ? 'bg-cyan-500 text-black font-medium'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    CAD $
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Upfront Cost ({currencyLabel})
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                                                    {currencySymbol}
                                                </span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.upfrontCost}
                                                    onChange={(e) => handleInputChange('upfrontCost', e.target.value)}
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Monthly Cost ({currencyLabel})
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                                                    {currencySymbol}
                                                </span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.monthlyCost}
                                                    onChange={(e) => handleInputChange('monthlyCost', e.target.value)}
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Enter the prices discussed with our team
                                    </p>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <span className="text-red-200 text-sm">{error}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleContinue}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2"
                                >
                                    Continue to NDA
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Step 2: NDA */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-cyan-400" />
                                        Non-Disclosure Agreement
                                    </h2>
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </div>

                                {/* NDA Text Display */}
                                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 max-h-80 overflow-y-auto">
                                    <pre className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                                        {formatNDAText()}
                                    </pre>
                                </div>

                                {/* Pricing Summary */}
                                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                                    <h4 className="text-white font-medium mb-2">Your Custom Pricing Summary</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Service Type:</span>
                                            <span className="text-white">
                                                {SERVICE_TYPES.find(s => s.id === formData.serviceType)?.name || formData.serviceType}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Currency:</span>
                                            <span className="text-white">{formData.currency}</span>
                                        </div>
                                        {upfrontAmount > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Upfront (one-time):</span>
                                                <span className="text-cyan-400 font-semibold">{currencySymbol}{upfrontAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {monthlyAmount > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Monthly:</span>
                                                <span className="text-cyan-400 font-semibold">{currencySymbol}{monthlyAmount.toFixed(2)}/mo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Signature */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Electronic Signature <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ndaSignature}
                                        onChange={(e) => handleInputChange('ndaSignature', e.target.value)}
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition font-serif italic text-lg"
                                        placeholder="Type your full legal name"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Type your full legal name exactly as entered above: <span className="text-cyan-400">{formData.fullName}</span>
                                    </p>
                                </div>

                                {/* Checkbox */}
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative mt-0.5">
                                        <input
                                            type="checkbox"
                                            checked={formData.ndaAgreed}
                                            onChange={(e) => handleInputChange('ndaAgreed', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${formData.ndaAgreed
                                            ? 'bg-cyan-500 border-cyan-500'
                                            : 'border-gray-600 group-hover:border-gray-500'
                                            }`}>
                                            {formData.ndaAgreed && <Check className="w-3 h-3 text-black" />}
                                        </div>
                                    </div>
                                    <span className="text-gray-300 text-sm">
                                        I have read, understood, and agree to be bound by the terms and conditions of this Non-Disclosure Agreement.
                                    </span>
                                </label>

                                {/* Error Display */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <span className="text-red-200 text-sm">{error}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleNdaSigned}
                                    disabled={isSubmitting}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRight className="w-5 h-5" />
                                            Sign & Continue
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Step 3: Legal Acceptance */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <Scale className="w-5 h-5 text-purple-400" />
                                        Terms & Agreement
                                    </h2>
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <span className="text-red-200 text-sm">{error}</span>
                                    </div>
                                )}

                                <LegalAcceptance
                                    clientName={formData.fullName}
                                    onAcceptanceComplete={handleLegalAcceptance}
                                    isLoading={isSubmitting}
                                />
                            </div>
                        )}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs">SSL Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs">Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs">PCI Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

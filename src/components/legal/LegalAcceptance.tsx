import React, { useState } from 'react';
import { Check, Shield, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

// Version constants - UPDATE THESE when legal docs change
export const CURRENT_TOS_VERSION = '2026-01-28-v1';
export const CURRENT_PRIVACY_VERSION = '2026-01-28-v1';
export const CURRENT_SERVICE_AGREEMENT_VERSION = '2026-01-28-v1';

export interface AcceptanceData {
    tosAccepted: boolean;
    tosAcceptedAt: string;
    tosVersion: string;
    privacyAccepted: boolean;
    privacyAcceptedAt: string;
    privacyVersion: string;
    serviceAgreementAccepted: boolean;
    serviceAgreementAcceptedAt: string;
    serviceAgreementVersion: string;
    serviceAgreementSignature: string;
}

interface LegalAcceptanceProps {
    clientName: string;
    onAcceptanceComplete: (data: AcceptanceData) => void;
    isLoading?: boolean;
}

export default function LegalAcceptance({
    clientName,
    onAcceptanceComplete,
    isLoading = false
}: LegalAcceptanceProps) {
    const [tosChecked, setTosChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [serviceAgreementChecked, setServiceAgreementChecked] = useState(false);
    const [signature, setSignature] = useState('');
    const [showAgreementText, setShowAgreementText] = useState(false);

    const canProceed = tosChecked && privacyChecked && serviceAgreementChecked && signature.trim().length > 0;

    const handleContinue = () => {
        if (!canProceed || isLoading) return;

        const now = new Date().toISOString();
        onAcceptanceComplete({
            tosAccepted: true,
            tosAcceptedAt: now,
            tosVersion: CURRENT_TOS_VERSION,
            privacyAccepted: true,
            privacyAcceptedAt: now,
            privacyVersion: CURRENT_PRIVACY_VERSION,
            serviceAgreementAccepted: true,
            serviceAgreementAcceptedAt: now,
            serviceAgreementVersion: CURRENT_SERVICE_AGREEMENT_VERSION,
            serviceAgreementSignature: signature.trim(),
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                    <Shield className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Almost There</h2>
                <p className="text-[var(--text-secondary)]">
                    Please review and accept our terms before completing your purchase.
                </p>
            </div>

            <div className="space-y-4">
                {/* Terms of Service */}
                <label className="flex items-start gap-4 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--bg-tertiary)] hover:border-purple-500/50 cursor-pointer transition group">
                    <div className="relative mt-1">
                        <input
                            type="checkbox"
                            checked={tosChecked}
                            onChange={(e) => setTosChecked(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${tosChecked
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-[var(--text-muted)] group-hover:border-purple-400'
                            }`}>
                            {tosChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                    </div>
                    <div className="flex-1">
                        <span className="text-[var(--text-primary)] font-medium">
                            I agree to the{' '}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Terms of Service
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </span>
                        <p className="text-[var(--text-muted)] text-sm mt-1">
                            Service scope, payment terms, and liability limitations
                        </p>
                    </div>
                </label>

                {/* Privacy Policy */}
                <label className="flex items-start gap-4 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--bg-tertiary)] hover:border-purple-500/50 cursor-pointer transition group">
                    <div className="relative mt-1">
                        <input
                            type="checkbox"
                            checked={privacyChecked}
                            onChange={(e) => setPrivacyChecked(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${privacyChecked
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-[var(--text-muted)] group-hover:border-purple-400'
                            }`}>
                            {privacyChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                    </div>
                    <div className="flex-1">
                        <span className="text-[var(--text-primary)] font-medium">
                            I acknowledge the{' '}
                            <a
                                href="/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Privacy Policy
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </span>
                        <p className="text-[var(--text-muted)] text-sm mt-1">
                            How we collect, use, and protect your data
                        </p>
                    </div>
                </label>

                {/* Service Agreement */}
                <div className="p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--bg-tertiary)]">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative mt-1">
                            <input
                                type="checkbox"
                                checked={serviceAgreementChecked}
                                onChange={(e) => setServiceAgreementChecked(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${serviceAgreementChecked
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-[var(--text-muted)] group-hover:border-purple-400'
                                }`}>
                                {serviceAgreementChecked && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="text-[var(--text-primary)] font-medium">
                                I agree to the Service Agreement
                            </span>
                            <p className="text-[var(--text-muted)] text-sm mt-1">
                                AI services provided "as is" • Results may vary • Third-party platforms may change
                            </p>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowAgreementText(!showAgreementText);
                                }}
                                className="text-purple-400 hover:text-purple-300 text-sm mt-2 flex items-center gap-1"
                            >
                                {showAgreementText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                {showAgreementText ? 'Hide' : 'View'} full agreement
                            </button>
                        </div>
                    </label>

                    {/* Expandable Service Agreement */}
                    {showAgreementText && (
                        <div className="mt-4 p-4 bg-[var(--bg-secondary)] rounded-lg max-h-64 overflow-y-auto text-sm text-[var(--text-secondary)] border border-[var(--bg-tertiary)]">
                            <ServiceAgreementText clientName={clientName} />
                        </div>
                    )}

                    {/* Signature Field */}
                    {serviceAgreementChecked && (
                        <div className="mt-4 pt-4 border-t border-[var(--bg-tertiary)]">
                            <label className="block text-sm text-[var(--text-muted)] mb-2">
                                Type your full legal name to sign
                            </label>
                            <input
                                type="text"
                                value={signature}
                                onChange={(e) => setSignature(e.target.value)}
                                placeholder={clientName || "Your full legal name"}
                                className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--bg-tertiary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            />
                            {signature.trim() && (
                                <p className="text-xs text-[var(--text-muted)] mt-2 flex items-center gap-1">
                                    <Check className="w-3 h-3 text-green-400" />
                                    Electronic signature will be recorded with timestamp
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!canProceed || isLoading}
                className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2 ${canProceed && !isLoading
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white cursor-pointer shadow-lg shadow-purple-500/25'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
                    }`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                    </>
                ) : (
                    'Continue to Payment'
                )}
            </button>

            {/* Trust Note */}
            <p className="text-center text-[var(--text-muted)] text-sm mt-4 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Your information is encrypted and secure
            </p>
        </div>
    );
}


// Service Agreement Text Component
function ServiceAgreementText({ clientName }: { clientName: string }) {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="space-y-4">
            <h3 className="font-bold text-[var(--text-primary)] text-base">SERVICE AGREEMENT</h3>
            <p className="text-[var(--text-muted)] text-xs">Effective Date: {today}</p>

            <p>
                This Service Agreement ("Agreement") is between OASIS AI Solutions ("Provider"),
                operating in Ontario, Canada, and {clientName || "[Client]"} ("Client").
            </p>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">1. NATURE OF SERVICES</h4>
            <p>
                Provider offers AI-powered automation services including customer support, lead generation,
                appointment booking, review management, voice AI agents, and custom solutions. Client acknowledges:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
                <li>AI technology is continuously evolving and results may vary</li>
                <li>Services depend on third-party platforms (Google, Meta, Twilio, etc.) which may change without notice</li>
                <li>Provider cannot guarantee specific business outcomes, revenue increases, or lead volumes</li>
                <li>AI outputs should be reviewed by Client before use with customers</li>
            </ul>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">2. CLIENT RESPONSIBILITIES</h4>
            <p>Client agrees to:</p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
                <li>Review and approve AI-generated content before deployment</li>
                <li>Maintain appropriate oversight of automated systems</li>
                <li>Ensure compliance with applicable laws in their industry and jurisdiction</li>
                <li>Not use services for illegal, harmful, or unethical purposes</li>
                <li>Provide accurate information for system configuration</li>
            </ul>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">3. LIMITATION OF LIABILITY</h4>
            <p>
                <strong className="text-[var(--text-primary)]">SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong> Provider shall not be liable for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-muted)]">
                <li>Lost revenue, profits, or business opportunities</li>
                <li>Decisions made based on AI outputs</li>
                <li>Third-party platform outages, changes, or discontinuation</li>
                <li>Data loss or security breaches beyond Provider's reasonable control</li>
                <li>Indirect, incidental, or consequential damages of any kind</li>
            </ul>
            <p className="mt-2">
                <strong className="text-[var(--text-primary)]">Maximum liability is limited to the total fees paid by Client in the 12 months preceding any claim.</strong>
            </p>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">4. INDEMNIFICATION</h4>
            <p>
                Client agrees to indemnify and hold harmless Provider from any claims, damages, or expenses
                arising from Client's use of the services, violation of laws, or breach of this Agreement.
            </p>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">5. AI DISCLAIMER</h4>
            <p>
                Client acknowledges that artificial intelligence technology may produce unexpected outputs,
                require human oversight, and is not a substitute for professional judgment. Provider does not
                guarantee the accuracy, completeness, or appropriateness of AI-generated content for Client's
                specific use case.
            </p>

            <h4 className="font-semibold text-[var(--text-primary)] mt-4">6. GOVERNING LAW</h4>
            <p>
                This Agreement is governed by the laws of Ontario, Canada. Any disputes shall be resolved
                in the courts of Ontario, Canada. Client waives the right to participate in class actions.
            </p>

            <p className="text-[var(--text-muted)] text-xs mt-6 pt-4 border-t border-[var(--bg-tertiary)]">
                By signing below, you acknowledge that you have read, understood, and agree to be bound by this Agreement.
            </p>
        </div>
    );
}

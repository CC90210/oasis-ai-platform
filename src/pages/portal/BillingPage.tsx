import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Profile, isBillingExempt, isOwnerAccount } from '@/lib/supabase';
import {
    CreditCard, FileText, Loader2, DollarSign, Calendar, CheckCircle,
    AlertTriangle, ExternalLink, Download, Settings, Mail, Phone,
    Shield, Package, MessageCircle, Crown, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PortalLayout from '@/components/portal/PortalLayout';
import NDAViewerModal from '@/components/portal/NDAViewerModal';
import { formatCurrency, formatDate } from '@/lib/formatters';


interface Subscription {
    id: string;
    user_id: string;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    product_name: string;
    tier: string | null;
    status: 'active' | 'past_due' | 'cancelled' | 'paused' | 'trialing' | 'incomplete';
    amount_cents: number;
    currency: string;
    billing_interval: string;
    current_period_start: string | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    created_at: string;
    // Custom agreement fields
    is_custom_agreement?: boolean;
    custom_price?: number;
    custom_name?: string;
    agreement_details?: {
        type?: string;
        includes?: string[];
        billing_cycle?: string;
        setup_fee?: number;
        setup_fee_paid?: boolean;
    };
}

interface BillingHistory {
    id: string;
    stripe_invoice_id: string | null;
    description: string;
    amount_cents: number;
    amount_paid_cents: number;
    currency: string;
    status: string;
    invoice_date: string;
    paid_at: string | null;
    invoice_pdf_url: string | null;
    hosted_invoice_url: string | null;
}

export default function BillingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([]);
    const [hasAccess, setHasAccess] = useState(true);
    const [portalLoading, setPortalLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    // NEW: Tabbed interface and agreements
    const [activeTab, setActiveTab] = useState<'overview' | 'agreements' | 'invoices'>('overview');
    const [agreements, setAgreements] = useState<any[]>([]);
    const [viewingNDA, setViewingNDA] = useState<any>(null);

    useEffect(() => {
        loadBillingData();
    }, []);

    const loadBillingData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/portal/login');
                return;
            }

            // Load profile to check for owner/billing exempt status
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileData) {
                setProfile(profileData);
            }

            // If user is billing exempt (owner account), skip subscription check
            if (profileData?.billing_exempt || profileData?.is_owner) {
                setHasAccess(true);
                setLoading(false);
                return;
            }

            // Load subscription from Supabase
            const { data: subData, error: subError } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (subError && subError.code !== 'PGRST116') {
                console.error('Error loading subscription:', subError);
            }

            // Check if user has an active subscription
            if (!subData || !['active', 'trialing', 'past_due'].includes(subData.status)) {
                setHasAccess(false);
                setSubscription(null);
            } else {
                setSubscription(subData);
                setHasAccess(true);
            }

            // Load billing history from Supabase
            const { data: historyData, error: historyError } = await supabase
                .from('billing_history')
                .select('*')
                .eq('user_id', user.id)
                .order('invoice_date', { ascending: false })
                .limit(20);

            if (historyError && historyError.code !== 'PGRST116') {
                console.error('Error loading billing history:', historyError);
            }

            setBillingHistory(historyData || []);

            // NEW: Load custom agreements (NDAs)
            const { data: agreementsData, error: agreementsError } = await supabase
                .from('custom_agreements')
                .select('*')
                .eq('client_email', user.email)
                .order('created_at', { ascending: false });

            if (agreementsError && agreementsError.code !== 'PGRST116') {
                console.error('Error loading agreements:', agreementsError);
            }

            setAgreements(agreementsData || []);

        } catch (err) {
            console.error('Error loading billing:', err);
        } finally {
            setLoading(false);
        }
    };



    const isCustomAgreement = subscription?.is_custom_agreement ||
        !subscription?.stripe_customer_id?.startsWith('cus_') ||
        subscription?.stripe_customer_id?.includes('custom') ||
        subscription?.stripe_customer_id?.includes('demo') ||
        subscription?.stripe_customer_id?.includes('oasis');

    // Helper function to get the correct status badge for agreements
    const getAgreementStatusBadge = (agreement: any) => {
        // Check payment_status first (highest priority)
        if (agreement.payment_status === 'paid') {
            return { label: 'PAID', className: 'bg-green-500/20 text-green-400' };
        }
        if (agreement.payment_status === 'failed') {
            return { label: 'FAILED', className: 'bg-red-500/20 text-red-400' };
        }

        // Then check general status
        if (agreement.status === 'active') {
            return { label: 'ACTIVE', className: 'bg-green-500/20 text-green-400' };
        }
        if (agreement.status === 'nda_signed') {
            return { label: 'NDA SIGNED', className: 'bg-purple-500/20 text-purple-400' };
        }
        if (agreement.status === 'payment_pending') {
            return { label: 'AWAITING PAYMENT', className: 'bg-yellow-500/20 text-yellow-400' };
        }

        return { label: 'PENDING', className: 'bg-yellow-500/20 text-yellow-400' };
    };

    const openStripePortal = async () => {
        // For custom agreements, don't try to open Stripe portal
        if (isCustomAgreement) {
            setError('You have a custom agreement. Please contact us to manage your subscription.');
            return;
        }

        if (!subscription?.stripe_customer_id) {
            setError('No Stripe customer ID found. Please contact support.');
            return;
        }

        setPortalLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: subscription.stripe_customer_id,
                    returnUrl: window.location.href
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || 'Failed to open billing portal. Please contact support.');
            }
        } catch (err) {
            console.error('Portal error:', err);
            setError('Failed to open billing portal. Please contact support.');
        } finally {
            setPortalLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-green-500/20 text-green-400 border-green-500/30',
            trialing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            past_due: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
            paused: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            paid: 'bg-green-500/20 text-green-400 border-green-500/30',
            pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            failed: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
        return styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    // Get the display price (custom price takes priority)
    const displayPrice = subscription?.custom_price || subscription?.amount_cents || 0;
    const displayName = subscription?.custom_name || subscription?.product_name || 'Subscription';

    if (loading) {
        return (
            <PortalLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="animate-spin text-cyan-500 w-8 h-8" />
                </div>
            </PortalLayout>
        );
    }

    // Special Owner Account Section - billing exempt
    if (isBillingExempt(profile) || isOwnerAccount(profile)) {
        return (
            <PortalLayout>
                <div className="p-8 max-w-5xl mx-auto page-transition">
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Crown className="w-8 h-8 text-yellow-500" />
                            Owner Account
                        </h1>
                        <p className="text-gray-400 mt-2">Your account status and automation tracking.</p>
                    </header>

                    {/* Owner Account Status Card */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                                <Crown className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-white">Billing Exempt</h2>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                                        ACTIVE
                                    </span>
                                </div>
                                <p className="text-gray-400 mb-4 max-w-2xl">
                                    As the owner of OASIS AI, your account is exempt from billing. All automations
                                    are tracked for internal case studies and ROI documentation. Your usage helps
                                    demonstrate the value of our services to potential clients.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                                    <div className="bg-[#0a0a0f]/50 border border-[#1a1a2e] rounded-xl p-4">
                                        <p className="text-gray-500 text-sm">Account Type</p>
                                        <p className="text-white font-bold text-lg">Owner / Admin</p>
                                    </div>
                                    <div className="bg-[#0a0a0f]/50 border border-[#1a1a2e] rounded-xl p-4">
                                        <p className="text-gray-500 text-sm">Billing Status</p>
                                        <p className="text-green-400 font-bold text-lg">Exempt</p>
                                    </div>
                                    <div className="bg-[#0a0a0f]/50 border border-[#1a1a2e] rounded-xl p-4">
                                        <p className="text-gray-500 text-sm">Access Level</p>
                                        <p className="text-purple-400 font-bold text-lg">Full Access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links for Owner */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-cyan-500" />
                                Admin Actions
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    to="/portal/automations"
                                    className="flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                >
                                    <span className="text-gray-300 group-hover:text-white">View My Automations</span>
                                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                </Link>
                                <Link
                                    to="/portal/reports"
                                    className="flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                >
                                    <span className="text-gray-300 group-hover:text-white">ROI Reports & Case Studies</span>
                                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-purple-500" />
                                Usage Tracking
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Your automation usage is being tracked for internal case studies.
                                This data helps demonstrate ROI to potential clients.
                            </p>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="text-green-400">Tracking Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PortalLayout>
        );
    }

    // Guardrail: No subscription - redirect to plans or support
    if (!hasAccess && !subscription) {
        return (
            <PortalLayout>
                <div className="p-8 max-w-3xl mx-auto">
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl text-center">
                        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-10 h-10 text-yellow-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">No Active Subscription</h1>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            You don't have an active subscription linked to your account.
                            Please contact our team to get started or resolve any billing issues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-xl hover:from-cyan-400 hover:to-cyan-300 transition shadow-lg shadow-cyan-500/20"
                            >
                                View Plans
                            </Link>
                            <Link
                                to="/portal/support"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white font-medium rounded-xl hover:bg-[#2a2a3e] transition border border-[#2a2a3e]"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </PortalLayout>
        );
    }


    return (
        <PortalLayout>
            <div className="p-8 max-w-5xl mx-auto page-transition">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-cyan-500" />
                        Billing & Agreements
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your plan, view agreements, and access invoices.</p>
                </header>

                {/* Tab Navigation */}
                <div className="flex gap-1 mb-6 border-b border-gray-800">
                    {(['overview', 'agreements', 'invoices'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition ${activeTab === tab
                                ? 'border-cyan-500 text-cyan-400'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab === 'agreements' ? 'Agreements & NDAs' : tab}
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-red-400">{error}</p>
                        {isCustomAgreement && (
                            <div className="flex gap-3 mt-3">
                                <a
                                    href="mailto:oasisaisolutions@gmail.com"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                                >
                                    <Mail className="w-4 h-4" />
                                    oasisaisolutions@gmail.com
                                </a>
                                <a
                                    href="tel:+12403325062"
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                                >
                                    <Phone className="w-4 h-4" />
                                    +1 (240) 332-5062
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* AGREEMENTS TAB */}
                {activeTab === 'agreements' && (
                    <div className="space-y-4">
                        {agreements.length === 0 ? (
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No agreements found</p>
                                <p className="text-sm text-gray-500 mt-2">Your signed agreements and NDAs will appear here.</p>
                            </div>
                        ) : (
                            agreements.map((agreement: any) => (
                                <div key={agreement.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold capitalize">
                                                    {agreement.automation_type?.replace(/-/g, ' ')} Agreement
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {agreement.agreement_reference || `#${agreement.id.slice(0, 8)}`}
                                                </p>
                                            </div>
                                        </div>
                                        {(() => {
                                            const status = getAgreementStatusBadge(agreement);
                                            return (
                                                <span className={`px-2 py-1 text-xs rounded ${status.className}`}>
                                                    {status.label}
                                                </span>
                                            );
                                        })()}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                        <div>
                                            <p className="text-gray-500">Setup Cost</p>
                                            <p className="text-white">{formatCurrency(agreement.upfront_cost_cents || 0)} {agreement.currency?.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Monthly</p>
                                            <p className="text-white">{formatCurrency(agreement.monthly_cost_cents || 0)}/mo</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Date</p>
                                            <p className="text-white">{formatDate(agreement.created_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Currency</p>
                                            <p className="text-white uppercase">{agreement.currency || 'USD'}</p>
                                        </div>
                                    </div>

                                    {/* NDA Info */}
                                    {agreement.nda_signed && (
                                        <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-green-400" />
                                                <div>
                                                    <p className="text-white text-sm font-medium">NDA Signed</p>
                                                    <p className="text-gray-500 text-xs">
                                                        By {agreement.nda_signature_name} on {formatDate(agreement.nda_signed_at)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setViewingNDA(agreement)}
                                                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg flex items-center gap-2 transition"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* INVOICES TAB */}
                {activeTab === 'invoices' && (
                    <div>
                        {billingHistory.length === 0 ? (
                            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
                                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400 mb-2">No invoices yet</p>
                                <p className="text-sm text-gray-500">
                                    Contact <a href="mailto:oasisaisolutions@gmail.com" className="text-cyan-400 hover:underline">oasisaisolutions@gmail.com</a> for invoice requests.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {billingHistory.map(invoice => (
                                    <div key={invoice.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{invoice.description}</p>
                                                <p className="text-sm text-gray-500">{formatDate(invoice.invoice_date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-white font-bold">{formatCurrency(invoice.amount_cents)}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded ${invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {invoice.status?.toUpperCase()}
                                                </span>
                                            </div>
                                            {invoice.invoice_pdf_url && (
                                                <a
                                                    href={invoice.invoice_pdf_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                                                >
                                                    <Download className="w-4 h-4 text-gray-400" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* OVERVIEW TAB - Original content */}
                {activeTab === 'overview' && (
                    <>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Current Plan */}
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-cyan-500" />
                                    Current Plan
                                </h2>

                                {subscription ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-[#151520] rounded-xl border border-[#2a2a3e]">
                                            <div>
                                                <h3 className="text-white font-bold text-lg">{displayName}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {isCustomAgreement && (
                                                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30">
                                                            Custom Agreement
                                                        </span>
                                                    )}
                                                    <p className="text-gray-400 text-sm capitalize">{subscription.tier || 'Professional'} Tier</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-cyan-400">
                                                    {formatCurrency(displayPrice)}
                                                </p>
                                                <p className="text-gray-500 text-sm">/{subscription.billing_interval || 'month'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm px-3 py-1 rounded-full border ${getStatusBadge(subscription.status)}`}>
                                                {subscription.status === 'active' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                                {subscription.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            {subscription.cancel_at_period_end && (
                                                <span className="text-yellow-400 text-sm">Cancels at period end</span>
                                            )}
                                        </div>

                                        {subscription.current_period_end && (
                                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Next billing: {formatDate(subscription.current_period_end)}
                                            </p>
                                        )}

                                        {/* What's Included - for custom agreements */}
                                        {isCustomAgreement && subscription.agreement_details?.includes && (
                                            <div className="mt-4 pt-4 border-t border-[#1a1a2e]">
                                                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                                    <Package className="w-4 h-4" />
                                                    What's Included:
                                                </h4>
                                                <ul className="space-y-1">
                                                    {subscription.agreement_details.includes.map((item: string, index: number) => (
                                                        <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                                            {item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {subscription.status === 'past_due' && (
                                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                                <p className="text-yellow-400 text-sm">
                                                    ⚠️ Your payment is past due. Please update your payment method.
                                                </p>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-[#1a1a2e]">
                                            {isCustomAgreement ? (
                                                // Custom Agreement - Contact Support
                                                <div className="w-full">
                                                    <p className="text-gray-400 text-sm mb-3">
                                                        You have a custom agreement. To make changes, please contact us:
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <a
                                                            href="mailto:oasisaisolutions@gmail.com"
                                                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition border border-cyan-500/30"
                                                        >
                                                            <Mail className="w-4 h-4" />
                                                            Email Support
                                                        </a>
                                                        <a
                                                            href="tel:+12403325062"
                                                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white rounded-lg transition border border-[#2a2a3e]"
                                                        >
                                                            <Phone className="w-4 h-4" />
                                                            +1 (240) 332-5062
                                                        </a>
                                                        <Link
                                                            to="/portal/support"
                                                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#2a2a3e] text-white rounded-lg transition border border-[#2a2a3e]"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            Open Ticket
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Standard Stripe Subscription
                                                <button
                                                    onClick={openStripePortal}
                                                    disabled={portalLoading}
                                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-semibold rounded-lg transition disabled:opacity-50"
                                                >
                                                    {portalLoading ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Settings className="w-4 h-4" />
                                                    )}
                                                    Manage Subscription
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2a2a3e]">
                                            <CreditCard className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <h3 className="text-white font-bold mb-2">No Active Subscription</h3>
                                        <p className="text-gray-500 text-sm mb-4">
                                            Contact us to set up your billing preferences.
                                        </p>
                                        <Link
                                            to="/portal/support"
                                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
                                        >
                                            Contact Support →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-purple-500" />
                                    Quick Actions
                                </h2>

                                <div className="space-y-3">
                                    {isCustomAgreement ? (
                                        // Custom Agreement Actions
                                        <>
                                            <a
                                                href="mailto:oasisaisolutions@gmail.com?subject=Billing%20Inquiry"
                                                className="w-full flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                                        <Mail className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-white font-medium">Request Invoice</p>
                                                        <p className="text-gray-500 text-sm">Get a copy of your latest invoice</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                            </a>

                                            <a
                                                href="mailto:oasisaisolutions@gmail.com?subject=Update%20Payment%20Method"
                                                className="w-full flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-green-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-white font-medium">Update Payment Method</p>
                                                        <p className="text-gray-500 text-sm">Change how you pay</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                            </a>

                                            <Link
                                                to="/portal/support"
                                                className="w-full flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                                        <MessageCircle className="w-5 h-5 text-purple-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-white font-medium">Billing Support</p>
                                                        <p className="text-gray-500 text-sm">Questions about your agreement</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                            </Link>
                                        </>
                                    ) : subscription?.stripe_customer_id && (
                                        // Standard Stripe Actions
                                        <>
                                            <button
                                                onClick={openStripePortal}
                                                disabled={portalLoading}
                                                className="w-full flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-white font-medium">Update Payment Method</p>
                                                        <p className="text-gray-500 text-sm">Change your card or payment details</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                            </button>

                                            <button
                                                onClick={openStripePortal}
                                                disabled={portalLoading}
                                                className="w-full flex items-center justify-between p-4 bg-[#151520] hover:bg-[#1a1a2e] rounded-xl border border-[#2a2a3e] transition group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-green-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-white font-medium">View All Invoices</p>
                                                        <p className="text-gray-500 text-sm">Download receipts and invoices</p>
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                                            </button>
                                        </>
                                    )}

                                    <div className="border-t border-[#1a1a2e] pt-4 mt-4">
                                        <div className="flex items-center gap-2 mb-3 text-sm">
                                            <div className="w-6 h-6 rounded bg-gradient-to-r from-[#635BFF] to-[#7A73FF] flex items-center justify-center">
                                                <span className="text-white text-[10px] font-bold">S</span>
                                            </div>
                                            <span className="text-gray-400">Secure payments by <span className="text-white font-medium">Stripe</span></span>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            Your payment information is encrypted and secure. We never store your card details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Billing History */}
                        <div className="mt-8 bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-green-500" />
                                Recent Invoices
                            </h2>

                            {billingHistory.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-3 border border-[#2a2a3e]">
                                        <FileText className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        {isCustomAgreement
                                            ? "Contact us to receive invoice copies via email."
                                            : "No billing history available yet. Invoices will appear here after your first payment."
                                        }
                                    </p>
                                    {isCustomAgreement && (
                                        <a
                                            href="mailto:oasisaisolutions@gmail.com?subject=Invoice%20Request"
                                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mt-3"
                                        >
                                            <Mail className="w-4 h-4" />
                                            Request Invoice →
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {billingHistory.slice(0, 5).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 bg-[#151520] rounded-xl border border-[#2a2a3e] hover:border-[#3a3a4e] transition"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#1a1a2e] rounded-lg flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{item.description}</p>
                                                    <p className="text-gray-500 text-sm">{formatDate(item.invoice_date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-white font-medium">{formatCurrency(item.amount_paid_cents || item.amount_cents)}</p>
                                                    <span className={`text-xs px-2 py-0.5 rounded border ${getStatusBadge(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    {item.invoice_pdf_url && (
                                                        <a
                                                            href={item.invoice_pdf_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition"
                                                            title="Download PDF"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {item.hosted_invoice_url && (
                                                        <a
                                                            href={item.hosted_invoice_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition"
                                                            title="View Invoice"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Support Section */}
                <div className="mt-8 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 p-6 rounded-2xl">
                    <h2 className="text-lg font-bold text-white mb-2">Need Help?</h2>
                    <p className="text-gray-400 mb-4">
                        Questions about your subscription or billing? We're here to help.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="mailto:oasisaisolutions@gmail.com"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Support
                        </a>
                        <a
                            href="tel:+12403325062"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-white rounded-lg hover:bg-[#2a2a3e] transition border border-[#2a2a3e]"
                        >
                            <Phone className="w-4 h-4" />
                            +1 (240) 332-5062
                        </a>
                    </div>
                </div>
            </div>

            {/* NDA Viewer Modal */}
            {viewingNDA && (
                <NDAViewerModal
                    agreement={viewingNDA}
                    onClose={() => setViewingNDA(null)}
                />
            )}
        </PortalLayout>
    );
}

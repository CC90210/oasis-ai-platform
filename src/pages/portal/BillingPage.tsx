import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { CreditCard, FileText, Loader2, DollarSign, Calendar, CheckCircle, AlertTriangle, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortalLayout from '@/components/portal/PortalLayout';
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

        } catch (err) {
            console.error('Error loading billing:', err);
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <PortalLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="animate-spin text-cyan-500 w-8 h-8" />
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
            <div className="p-8 max-w-5xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-cyan-500" />
                        Billing & Subscription
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your plan, payment methods, and view invoices.</p>
                </header>

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
                                        <h3 className="text-white font-bold text-lg">{subscription.product_name}</h3>
                                        <p className="text-gray-400 text-sm capitalize">{subscription.tier || 'Professional'} Tier</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-cyan-400">
                                            {formatCurrency(subscription.amount_cents)}
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

                                {subscription.status === 'past_due' && (
                                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                        <p className="text-yellow-400 text-sm">
                                            ⚠️ Your payment is past due. Please update your payment method to avoid service interruption.
                                        </p>
                                    </div>
                                )}
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

                    {/* Billing Summary */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            Billing Summary
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-[#151520] rounded-xl border border-[#2a2a3e]">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Monthly Service Fee</span>
                                    <span className="text-white font-medium">
                                        {subscription ? formatCurrency(subscription.amount_cents) : '$0.00'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">{subscription?.product_name || 'No Plan'}</span>
                                    <span className="text-gray-500 capitalize">{subscription?.tier || 'N/A'} Tier</span>
                                </div>
                            </div>

                            {/* Last Payment Info */}
                            {billingHistory.length > 0 && billingHistory[0].status === 'paid' && (
                                <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-green-400 text-sm font-medium">Last Payment</p>
                                            <p className="text-gray-500 text-xs">
                                                {billingHistory[0].paid_at ? formatDate(billingHistory[0].paid_at) : 'N/A'}
                                            </p>
                                        </div>
                                        <span className="text-green-400 font-bold">
                                            {formatCurrency(billingHistory[0].amount_paid_cents)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-[#1a1a2e] pt-4">
                                <div className="flex items-center gap-2 mb-3 text-sm">
                                    <div className="w-6 h-6 rounded bg-gradient-to-r from-[#635BFF] to-[#7A73FF] flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold">S</span>
                                    </div>
                                    <span className="text-gray-400">Payments processed by <span className="text-white font-medium">Stripe</span></span>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Need to update your billing information or have questions about your invoice?
                                </p>
                                <Link
                                    to="/portal/support"
                                    className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 inline-block"
                                >
                                    Contact billing support →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Billing History */}
                <div className="mt-8 bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-2xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-500" />
                        Billing History
                    </h2>

                    {billingHistory.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-[#151520] rounded-full flex items-center justify-center mx-auto mb-3 border border-[#2a2a3e]">
                                <FileText className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                No billing history available yet. Invoices will appear here after your first payment cycle.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {billingHistory.map((item) => (
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
            </div>
        </PortalLayout>
    );
}

import { useEffect, useState } from 'react';
import { supabase, Subscription } from '@/lib/supabase';
import { CreditCard, FileText, Loader2, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface BillingHistory {
    id: string;
    description: string;
    amount_cents: number;
    date: string;
    status: 'paid' | 'pending' | 'failed';
}

export default function BillingPage() {
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([]);

    useEffect(() => {
        loadBillingData();
    }, []);

    const loadBillingData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Load subscription from Supabase
            const { data: subData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .single();

            setSubscription(subData || null);

            // For now, billing history would come from a separate table or Stripe
            // We'll show empty state if no data exists
            setBillingHistory([]);

        } catch (err) {
            console.error('Error loading billing:', err);
        } finally {
            setLoading(false);
        }
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
                                        <p className="text-2xl font-bold text-cyan-400">{formatCurrency(subscription.amount_cents)}</p>
                                        <p className="text-gray-500 text-sm">/month</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 text-sm">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Active Subscription</span>
                                </div>
                                {subscription.current_period_end && (
                                    <p className="text-gray-500 text-sm">
                                        Next billing: {formatDate(subscription.current_period_end)}
                                    </p>
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
                                    <span className="text-white font-medium">$100.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Customer Support Agent</span>
                                    <span className="text-gray-500">Professional Tier</span>
                                </div>
                            </div>

                            <div className="border-t border-[#1a1a2e] pt-4">
                                <div className="flex items-center gap-2 mb-3 text-sm">
                                    <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold">W</span>
                                    </div>
                                    <span className="text-gray-400">Payments processed by <span className="text-white font-medium">Wwise</span></span>
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
                                <div key={item.id} className="flex items-center justify-between p-4 bg-[#151520] rounded-xl border border-[#2a2a3e] hover:border-[#3a3a4e] transition">
                                    <div>
                                        <p className="text-white font-medium">{item.description}</p>
                                        <p className="text-gray-500 text-sm">{formatDate(item.date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-medium">{formatCurrency(item.amount_cents)}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                                            item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                            {item.status}
                                        </span>
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

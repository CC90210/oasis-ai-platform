import { useEffect, useState } from 'react';
import { supabase, Subscription } from '@/lib/supabase';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatCurrency, formatDate } from '@/lib/formatters';

export default function BillingPage() {
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    useEffect(() => {
        loadSubscription();
    }, []);

    const loadSubscription = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            setSubscriptions(data || []);
        } catch (err) {
            console.error('Error loading billing:', err);
        } finally {
            setLoading(false);
        }
    };

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

                <div className="space-y-8">
                    {/* Active Plan */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Current Plan</h2>
                        {subscriptions.length === 0 && !loading ? (
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">No Active Subscription</h3>
                                    <p className="text-gray-400 max-w-md">
                                        You are currently not subscribed to any premium automation plans. Upgrade to unlock the full power of OASIS AI.
                                    </p>
                                </div>
                                <a href="/pricing" className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition transform hover:scale-105">
                                    View Plans
                                </a>
                            </div>
                        ) : (
                            subscriptions.map(sub => (
                                <div key={sub.id} className="bg-gradient-to-br from-[#0a0a0f] to-[#11111a] border border-[#1a1a2e] p-8 rounded-2xl relative overflow-hidden mb-4">
                                    <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-2xl font-bold text-white">{sub.product_name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${sub.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {sub.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 flex items-center gap-2">
                                                <span className="text-3xl font-bold text-white">{formatCurrency(sub.amount_cents, sub.currency)}</span>
                                                <span className="text-sm">/ month</span>
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
                                            <p className="text-white font-medium flex items-center gap-2 justify-end">
                                                <Clock className="w-4 h-4 text-cyan-500" />
                                                {sub.current_period_end ? formatDate(sub.current_period_end) : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-[#1a1a2e] grid md:grid-cols-3 gap-4">
                                        {['Unlimited Executions', 'Priority Support', 'Advanced Analytics'].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-300">
                                                <CheckCircle className="w-5 h-5 text-cyan-500" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </section>

                    {/* Payment Method Stub */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-[#1a1a2e] rounded border border-[#2a2a3e] flex items-center justify-center">
                                        <div className="w-6 h-4 bg-gray-600 rounded-sm opacity-50"></div>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">•••• •••• •••• 4242</p>
                                        <p className="text-xs text-gray-500">Expires 12/28</p>
                                    </div>
                                </div>
                                <button className="text-sm text-cyan-400 hover:text-white transition">Update</button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Billing History</h2>
                            <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-[#1a1a2e] flex justify-between items-center hover:bg-[#151520] transition cursor-pointer">
                                    <div>
                                        <p className="text-white text-sm font-medium">Invoice #INV-2024-001</p>
                                        <p className="text-gray-500 text-xs">Jan 1, 2026</p>
                                    </div>
                                    <span className="text-gray-400 text-sm">$499.00</span>
                                </div>
                                <div className="p-4 flex justify-center">
                                    <button className="text-xs text-gray-500 hover:text-white transition">View All Invoices</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PortalLayout>
    );
}

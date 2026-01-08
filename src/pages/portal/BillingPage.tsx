import { CreditCard, Check, AlertTriangle } from 'lucide-react';

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-green-500" />
                        Billing & Subscription
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your subscription and payment methods.</p>
                </header>

                {/* Current Plan Card */}
                <div className="bg-gradient-to-br from-[#0a0a0f] to-[#12121a] border border-[#1a1a2e] rounded-xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <CreditCard className="w-64 h-64 text-cyan-500 -rotate-12 transform translate-x-12 -translate-y-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Current Plan</h3>
                                <h2 className="text-4xl font-bold text-white">Professional</h2>
                                <p className="text-cyan-400 mt-1 font-medium">$299/month</p>
                            </div>
                            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                Active
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {['Unlimited Automations', 'Priority Support', 'Advanced Analytics', 'Custom Integrations'].map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-cyan-400" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                                Manage Subscription
                            </button>
                            <button className="border border-[#2a2a3e] bg-[#151520] text-gray-300 font-medium px-6 py-3 rounded-lg hover:text-white transition">
                                View Invoices
                            </button>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 bg-[#151520] rounded-lg border border-[#2a2a3e]">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#2a2a3e] p-2 rounded">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-white">•••• •••• •••• 4242</p>
                                <p className="text-gray-500 text-sm">Expires 12/28</p>
                            </div>
                        </div>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

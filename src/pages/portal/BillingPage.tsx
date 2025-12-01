import React from 'react';
import { CreditCard, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BillingPage = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Billing & Subscription</h1>
                <p className="text-text-secondary">Manage your plan and payment methods.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Plan */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-bg-secondary p-6 rounded-xl border border-white/10 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Current Plan</h3>
                                <div className="text-3xl font-black text-oasis-cyan mt-2">$497<span className="text-sm font-normal text-text-secondary">/month</span></div>
                                <p className="text-sm text-text-secondary mt-1">AI Ops Monthly Retainer</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">Active</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Automation Executions</span>
                                <span className="font-medium text-white">1,248 / 5,000</span>
                            </div>
                            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                                <div className="h-full bg-oasis-cyan w-[25%]"></div>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">AI Chat Tokens</span>
                                <span className="font-medium text-white">450k / 1M</span>
                            </div>
                            <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[45%]"></div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-white text-bg-primary hover:bg-white/90 font-bold">Upgrade Plan</Button>
                            <Button variant="outline" className="text-error border-error/20 hover:bg-error/5 hover:text-error">Cancel Subscription</Button>
                        </div>
                    </div>

                    {/* Invoice History */}
                    <div className="bg-bg-secondary rounded-xl border border-white/10 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-lg font-bold text-white">Invoice History</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-bg-tertiary text-text-secondary font-medium">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {[
                                    { date: "Nov 01, 2023", amount: "$497.00", status: "paid" },
                                    { date: "Oct 01, 2023", amount: "$497.00", status: "paid" },
                                    { date: "Sep 01, 2023", amount: "$3,500.00", status: "paid" },
                                ].map((invoice, i) => (
                                    <tr key={i} className="hover:bg-white/5">
                                        <td className="px-6 py-4 text-white">{invoice.date}</td>
                                        <td className="px-6 py-4 text-white">{invoice.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium capitalize">
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-oasis-cyan hover:text-oasis-cyan/80">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-bg-secondary p-6 rounded-xl border border-white/10 shadow-sm h-fit">
                    <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg mb-6">
                        <div className="h-10 w-16 bg-bg-tertiary rounded flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-text-secondary" />
                        </div>
                        <div>
                            <div className="font-medium text-white">Visa ending in 4242</div>
                            <div className="text-xs text-text-secondary">Expires 12/24</div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full border-white/10 text-text-secondary hover:text-white hover:bg-white/5">
                        Update Payment Method
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;

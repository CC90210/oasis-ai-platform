import React from 'react';
import { CreditCard, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BillingPage = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-oasis-midnight">Billing & Subscription</h1>
                <p className="text-oasis-slate">Manage your plan and payment methods.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Plan */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-oasis-slate/10 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-oasis-midnight">Current Plan</h3>
                                <div className="text-3xl font-black text-oasis-teal mt-2">$497<span className="text-sm font-normal text-oasis-slate">/month</span></div>
                                <p className="text-sm text-oasis-slate mt-1">AI Ops Monthly Retainer</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-oasis-mint/10 text-oasis-mint text-sm font-medium">Active</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-oasis-slate">Automation Executions</span>
                                <span className="font-medium text-oasis-midnight">1,248 / 5,000</span>
                            </div>
                            <div className="h-2 bg-oasis-pearl rounded-full overflow-hidden">
                                <div className="h-full bg-oasis-teal w-[25%]"></div>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-oasis-slate">AI Chat Tokens</span>
                                <span className="font-medium text-oasis-midnight">450k / 1M</span>
                            </div>
                            <div className="h-2 bg-oasis-pearl rounded-full overflow-hidden">
                                <div className="h-full bg-oasis-deep-ocean w-[45%]"></div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-oasis-midnight text-white">Upgrade Plan</Button>
                            <Button variant="outline" className="text-oasis-rose border-oasis-rose/20 hover:bg-oasis-rose/5">Cancel Subscription</Button>
                        </div>
                    </div>

                    {/* Invoice History */}
                    <div className="bg-white rounded-xl border border-oasis-slate/10 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-oasis-slate/10">
                            <h3 className="text-lg font-bold text-oasis-midnight">Invoice History</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-oasis-pearl/50 text-oasis-slate font-medium">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-oasis-slate/10">
                                {[
                                    { date: "Nov 01, 2023", amount: "$497.00", status: "paid" },
                                    { date: "Oct 01, 2023", amount: "$497.00", status: "paid" },
                                    { date: "Sep 01, 2023", amount: "$3,500.00", status: "paid" },
                                ].map((invoice, i) => (
                                    <tr key={i} className="hover:bg-oasis-pearl/30">
                                        <td className="px-6 py-4 text-oasis-midnight">{invoice.date}</td>
                                        <td className="px-6 py-4 text-oasis-midnight">{invoice.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-oasis-mint/10 text-oasis-mint text-xs font-medium capitalize">
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-oasis-teal hover:text-oasis-deep-ocean">
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
                <div className="bg-white p-6 rounded-xl border border-oasis-slate/10 shadow-sm h-fit">
                    <h3 className="text-lg font-bold text-oasis-midnight mb-6">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-oasis-slate/20 rounded-lg mb-6">
                        <div className="h-10 w-16 bg-oasis-pearl rounded flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-oasis-slate" />
                        </div>
                        <div>
                            <div className="font-medium text-oasis-midnight">Visa ending in 4242</div>
                            <div className="text-xs text-oasis-slate">Expires 12/24</div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full border-oasis-slate/20">
                        Update Payment Method
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;

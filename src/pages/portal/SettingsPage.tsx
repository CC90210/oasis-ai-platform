import React from 'react';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-oasis-midnight">Settings</h1>
                <p className="text-oasis-slate">Manage your account preferences and security.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-oasis-slate/10 shadow-sm space-y-8">
                {/* Profile */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-oasis-midnight border-b border-oasis-slate/10 pb-2">Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-oasis-midnight">Full Name</label>
                            <input type="text" defaultValue="CC Admin" className="w-full px-3 py-2 border border-oasis-slate/20 rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-oasis-midnight">Email Address</label>
                            <input type="email" defaultValue="cc@oasis-ai.com" className="w-full px-3 py-2 border border-oasis-slate/20 rounded-md" />
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-oasis-midnight border-b border-oasis-slate/10 pb-2">Notifications</h3>
                    <div className="space-y-3">
                        {[
                            "Email me when an automation fails",
                            "Email me weekly performance reports",
                            "Email me about product updates",
                            "Email me when billing invoice is ready"
                        ].map((item, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="h-4 w-4 text-oasis-teal rounded border-oasis-slate/30 focus:ring-oasis-teal" />
                                <span className="text-sm text-oasis-slate">{item}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-oasis-midnight border-b border-oasis-slate/10 pb-2">Security</h3>
                    <div className="space-y-4">
                        <Button variant="outline" className="border-oasis-slate/20">Change Password</Button>
                        <div className="flex items-center justify-between p-4 bg-oasis-pearl/30 rounded-lg border border-oasis-slate/10">
                            <div>
                                <div className="font-medium text-oasis-midnight">Two-Factor Authentication</div>
                                <div className="text-xs text-oasis-slate">Add an extra layer of security to your account.</div>
                            </div>
                            <Button variant="outline" className="text-oasis-teal border-oasis-teal/20 hover:bg-oasis-teal/5">Enable 2FA</Button>
                        </div>
                    </div>
                </section>

                <div className="pt-4 border-t border-oasis-slate/10 flex justify-end gap-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button className="bg-oasis-teal hover:bg-oasis-deep-ocean text-white">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

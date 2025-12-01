import React from 'react';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
                <p className="text-text-secondary">Manage your account preferences and security.</p>
            </div>

            <div className="bg-bg-secondary p-8 rounded-xl border border-white/10 shadow-sm space-y-8">
                {/* Profile */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Full Name</label>
                            <input type="text" defaultValue="CC Admin" className="w-full px-3 py-2 border border-white/10 bg-bg-tertiary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-oasis-cyan/50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Email Address</label>
                            <input type="email" defaultValue="cc@oasis-ai.com" className="w-full px-3 py-2 border border-white/10 bg-bg-tertiary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-oasis-cyan/50" />
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Notifications</h3>
                    <div className="space-y-3">
                        {[
                            "Email me when an automation fails",
                            "Email me weekly performance reports",
                            "Email me about product updates",
                            "Email me when billing invoice is ready"
                        ].map((item, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="h-4 w-4 text-oasis-cyan rounded border-white/30 focus:ring-oasis-cyan bg-bg-tertiary" />
                                <span className="text-sm text-text-secondary">{item}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Security */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Security</h3>
                    <div className="space-y-4">
                        <Button variant="outline" className="border-white/10 text-text-secondary hover:text-white hover:bg-white/5">Change Password</Button>
                        <div className="flex items-center justify-between p-4 bg-bg-tertiary rounded-lg border border-white/10">
                            <div>
                                <div className="font-medium text-white">Two-Factor Authentication</div>
                                <div className="text-xs text-text-secondary">Add an extra layer of security to your account.</div>
                            </div>
                            <Button variant="outline" className="text-oasis-cyan border-oasis-cyan/20 hover:bg-oasis-cyan/5 hover:text-oasis-cyan">Enable 2FA</Button>
                        </div>
                    </div>
                </section>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                    <Button variant="ghost" className="text-text-secondary hover:text-white hover:bg-white/5">Cancel</Button>
                    <Button className="bg-oasis-cyan hover:bg-oasis-cyan/80 text-bg-primary font-bold">Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

import { User, Lock, Bell, Moon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <User className="w-8 h-8 text-gray-400" />
                        Account Settings
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your profile and preferences.</p>
                </header>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-cyan-500" />
                            Profile Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input type="text" className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg p-3 text-white" defaultValue="Client User" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg p-3 text-white opacity-50 cursor-not-allowed" defaultValue="client@example.com" disabled />
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-purple-500" />
                            Security
                        </h3>
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#1a1a2e]">
                            <div>
                                <p className="text-white font-medium">Password</p>
                                <p className="text-gray-500 text-sm">Last changed 3 months ago</p>
                            </div>
                            <button className="text-cyan-400 hover:text-cyan-300 font-medium">Changed Password</button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white font-medium">Two-Factor Authentication</p>
                                <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-yellow-500" />
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            {['Email notifications for failed runs', 'Weekly summary reports', 'Marketing updates'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-[#151520] border-[#2a2a3e] text-cyan-500 focus:ring-cyan-500" />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

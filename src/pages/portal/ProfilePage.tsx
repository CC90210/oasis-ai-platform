import { useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { User, Shield, Key, Bell, Loader2, AlertCircle, Save, CheckCircle } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate } from '@/lib/formatters';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        phone: ''
    });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile(data);
                setFormData({
                    full_name: data.full_name || '',
                    company_name: data.company_name || '',
                    phone: data.phone || ''
                });
            } else {
                // Fallback if profile row doesn't exist yet but user does
                setProfile({
                    id: user.id,
                    email: user.email!,
                    full_name: user.user_metadata?.full_name || '',
                    company_name: user.user_metadata?.company_name || '',
                    phone: '',
                    avatar_url: null,
                    created_at: new Date().toISOString()
                });
                setFormData({
                    full_name: user.user_metadata?.full_name || '',
                    company_name: user.user_metadata?.company_name || '',
                    phone: ''
                });
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);
        setSuccessMsg(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const updates = {
                id: user.id,
                ...formData,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;

            setSuccessMsg('Profile updated successfully.');
            // Update local state
            setProfile(prev => prev ? ({ ...prev, ...formData }) : null);

        } catch (err) {
            console.error('Error updating profile:', err);
            setErrorMsg('Failed to update profile.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    return (
        <PortalLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <User className="w-8 h-8 text-cyan-500" />
                        Account Settings
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your personal information and security preferences.</p>
                </header>

                <div className="grid gap-8">
                    {/* Identity Card */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                            {profile?.full_name?.charAt(0) || profile?.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{profile?.email}</h2>
                            <p className="text-gray-500">Member since {formatDate(profile?.created_at || new Date().toISOString())}</p>
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Personal Information</h3>
                            {successMsg && <span className="text-green-400 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> {successMsg}</span>}
                            {errorMsg && <span className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errorMsg}</span>}
                        </div>

                        <form onSubmit={updateProfile} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={formData.company_name}
                                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                        className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={profile?.email}
                                        disabled
                                        className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                                        title="Contact support to change email"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security Section (Placeholder for now) */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4 text-white">
                                <Shield className="w-6 h-6 text-cyan-500" />
                                <h3 className="text-lg font-bold">Security</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">Manage your password and 2FA settings to keep your account safe.</p>
                            <button className="text-cyan-400 hover:text-white text-sm font-medium flex items-center gap-2">
                                <Key className="w-4 h-4" /> Change Password
                            </button>
                        </div>

                        <div className="bg-[#0a0a0f] border border-[#1a1a2e] p-8 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4 text-white">
                                <Bell className="w-6 h-6 text-cyan-500" />
                                <h3 className="text-lg font-bold">Notifications</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">Choose what updates and alerts you want to receive.</p>
                            <button className="text-cyan-400 hover:text-white text-sm font-medium">
                                Manage Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}


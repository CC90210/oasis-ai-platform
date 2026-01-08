import { useEffect, useState, useRef } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { User, Shield, Bell, Loader2, AlertCircle, Save, CheckCircle, Camera, Upload } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate } from '@/lib/formatters';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        phone: ''
    });
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                setAvatarUrl(data.avatar_url);
                setFormData({
                    full_name: data.full_name || '',
                    company_name: data.company_name || '',
                    phone: data.phone || ''
                });
            } else {
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

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setErrorMsg('Please select an image file');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setErrorMsg('Image must be less than 2MB');
            return;
        }

        setUploadingImage(true);
        setErrorMsg(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Create a unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                // If storage bucket doesn't exist, use base64 fallback
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const base64 = event.target?.result as string;
                    setAvatarUrl(base64);

                    // Save to profile
                    await supabase.from('profiles').upsert({
                        id: user.id,
                        avatar_url: base64,
                        updated_at: new Date()
                    });

                    setSuccessMsg('Profile picture updated!');
                    setProfile(prev => prev ? ({ ...prev, avatar_url: base64 }) : null);
                };
                reader.readAsDataURL(file);
                return;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setAvatarUrl(publicUrl);

            // Update profile with new avatar URL
            await supabase.from('profiles').upsert({
                id: user.id,
                avatar_url: publicUrl,
                updated_at: new Date()
            });

            setSuccessMsg('Profile picture updated!');
            setProfile(prev => prev ? ({ ...prev, avatar_url: publicUrl }) : null);

        } catch (err) {
            console.error('Error uploading avatar:', err);
            setErrorMsg('Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
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
                avatar_url: avatarUrl,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;

            setSuccessMsg('Profile updated successfully!');
            setProfile(prev => prev ? ({ ...prev, ...formData, avatar_url: avatarUrl }) : null);

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

    const getInitials = () => {
        if (formData.full_name) {
            return formData.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return profile?.email?.charAt(0).toUpperCase() || 'C';
    };

    return (
        <PortalLayout>
            <div className="p-6 md:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-2">
                        <User className="w-7 h-7 text-cyan-500" />
                        Account Settings
                    </h1>
                    <p className="text-gray-400">Manage your personal information and security preferences.</p>
                </div>

                {/* Success/Error Messages */}
                {successMsg && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{successMsg}</span>
                    </div>
                )}
                {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Profile Card with Avatar */}
                <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div
                                onClick={handleAvatarClick}
                                className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center cursor-pointer relative overflow-hidden group-hover:ring-4 ring-cyan-500/30 transition-all duration-300"
                            >
                                {uploadingImage ? (
                                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                                ) : avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-white">{getInitials()}</span>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-[#0a0a0f] cursor-pointer hover:bg-cyan-400 transition" onClick={handleAvatarClick}>
                                <Upload className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-bold text-white">{profile?.email}</h2>
                            <p className="text-gray-400 text-sm mt-1">Member since {formatDate(profile?.created_at || new Date().toISOString())}</p>
                            <p className="text-cyan-400 text-xs mt-2">Click on your avatar to upload a new photo</p>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={updateProfile}>
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full bg-[#151520] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                    className="w-full bg-[#151520] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="Acme Inc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[#151520] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={profile?.email || ''}
                                    disabled
                                    className="w-full bg-[#101015] border border-[#1a1a2e] rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                            >
                                {submitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>

                {/* Security & Notifications */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Security</h3>
                                <p className="text-xs text-gray-500">Manage your password and 2FA settings</p>
                            </div>
                        </div>
                        <button className="text-cyan-400 text-sm hover:text-cyan-300 transition flex items-center gap-1">
                            Change Password →
                        </button>
                    </div>

                    <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Notifications</h3>
                                <p className="text-xs text-gray-500">Choose what updates and alerts you want</p>
                            </div>
                        </div>
                        <button className="text-cyan-400 text-sm hover:text-cyan-300 transition flex items-center gap-1">
                            Manage Preferences →
                        </button>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

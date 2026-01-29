import { useEffect, useState, useRef } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { User, Shield, Bell, Loader2, AlertCircle, Save, CheckCircle, Camera, Upload, Eye, EyeOff, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/store/themeStore';
import PortalLayout from '@/components/portal/PortalLayout';
import { formatDate } from '@/lib/formatters';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        phone: ''
    });
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Password change state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    // Notification preferences state
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notifications, setNotifications] = useState({
        email_automation_alerts: true,
        email_weekly_summary: true,
        email_billing_updates: true,
        push_enabled: false
    });
    const [savingNotifications, setSavingNotifications] = useState(false);
    // Theme toggle for dashboard appearance
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setUserEmail(user.email || '');

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
                // Load notification preferences if they exist
                if (data.notification_preferences) {
                    setNotifications({
                        ...notifications,
                        ...data.notification_preferences
                    });
                }
            } else {
                // Create a new profile entry
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

        if (!file.type.startsWith('image/')) {
            setErrorMsg('Please select an image file');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setErrorMsg('Image must be less than 2MB');
            return;
        }

        setUploadingImage(true);
        setErrorMsg(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Read file as base64
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const base64 = event.target?.result as string;

                    // Update the avatar immediately in UI
                    setAvatarUrl(base64);

                    // Save to Supabase - use proper ISO string for timestamp
                    const { error } = await supabase.from('profiles').upsert({
                        id: user.id,
                        email: user.email,
                        avatar_url: base64,
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'id'
                    });

                    if (error) {
                        console.error('Supabase error:', error);
                        throw error;
                    }

                    setSuccessMsg('Profile picture updated!');
                    setProfile(prev => prev ? ({ ...prev, avatar_url: base64 }) : null);
                } catch (err: any) {
                    console.error('Error saving avatar:', err);
                    setErrorMsg(err.message || 'Failed to save avatar');
                } finally {
                    setUploadingImage(false);
                }
            };
            reader.onerror = () => {
                setErrorMsg('Failed to read image file');
                setUploadingImage(false);
            };
            reader.readAsDataURL(file);

        } catch (err: any) {
            console.error('Error uploading avatar:', err);
            setErrorMsg(err.message || 'Failed to upload image. Please try again.');
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

            // Build update object with proper types
            const updates: Record<string, any> = {
                id: user.id,
                email: user.email,
                full_name: formData.full_name || null,
                company_name: formData.company_name || null,
                phone: formData.phone || null,
                updated_at: new Date().toISOString()
            };

            // Only include avatar_url if it exists
            if (avatarUrl) {
                updates.avatar_url = avatarUrl;
            }

            const { error } = await supabase
                .from('profiles')
                .upsert(updates, {
                    onConflict: 'id'
                });

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            setSuccessMsg('Profile updated successfully!');
            setProfile(prev => prev ? ({
                ...prev,
                ...formData,
                avatar_url: avatarUrl
            }) : null);

            // Auto-hide success message after 3 seconds
            setTimeout(() => setSuccessMsg(null), 3000);

        } catch (err: any) {
            console.error('Error updating profile:', err);
            setErrorMsg(err.message || 'Failed to update profile.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrorMsg('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setErrorMsg('Password must be at least 6 characters');
            return;
        }

        setChangingPassword(true);
        setErrorMsg(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: passwordData.newPassword
            });

            if (error) throw error;

            setSuccessMsg('Password changed successfully!');
            setShowPasswordModal(false);
            setPasswordData({ newPassword: '', confirmPassword: '' });
            setTimeout(() => setSuccessMsg(null), 3000);
        } catch (err: any) {
            console.error('Error changing password:', err);
            setErrorMsg(err.message || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleSaveNotifications = async () => {
        setSavingNotifications(true);
        setErrorMsg(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                email: user.email,
                notification_preferences: notifications,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id'
            });

            if (error) throw error;

            setSuccessMsg('Notification preferences saved!');
            setShowNotificationModal(false);
            setTimeout(() => setSuccessMsg(null), 3000);
        } catch (err: any) {
            console.error('Error saving notifications:', err);
            setErrorMsg(err.message || 'Failed to save notification preferences');
        } finally {
            setSavingNotifications(false);
        }
    };

    if (loading) {
        return <PortalLayout><div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-cyan-500 w-8 h-8" /></div></PortalLayout>;
    }

    const getInitials = () => {
        if (formData.full_name) {
            return formData.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return userEmail?.charAt(0).toUpperCase() || 'C';
    };

    return (
        <PortalLayout>
            <div className="p-6 md:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3 mb-2">
                        <User className="w-7 h-7 text-cyan-500" />
                        Account Settings
                    </h1>
                    <p className="text-[var(--text-secondary)]">Manage your personal information and security preferences.</p>
                </div>

                {/* Success/Error Messages */}
                {successMsg && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{successMsg}</span>
                        <button onClick={() => setSuccessMsg(null)} className="ml-auto"><X className="w-4 h-4" /></button>
                    </div>
                )}
                {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{errorMsg}</span>
                        <button onClick={() => setErrorMsg(null)} className="ml-auto"><X className="w-4 h-4" /></button>
                    </div>
                )}

                {/* Profile Card with Avatar */}
                <div className="bg-[var(--bg-card-strong)] backdrop-blur-sm border border-[var(--bg-tertiary)] rounded-2xl p-6 mb-6 transition-colors duration-300">
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

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-[var(--bg-card-strong)] cursor-pointer hover:bg-cyan-400 transition" onClick={handleAvatarClick}>
                                <Upload className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">{userEmail}</h2>
                            <p className="text-[var(--text-secondary)] text-sm mt-1">Member since {formatDate(profile?.created_at || new Date().toISOString())}</p>
                            <p className="text-cyan-400 text-xs mt-2">Click on your avatar to upload a new photo</p>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={updateProfile}>
                    <div className="bg-[var(--bg-card-strong)] backdrop-blur-sm border border-[var(--bg-tertiary)] rounded-2xl p-6 mb-6 transition-colors duration-300">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Personal Information</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="Acme Inc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    disabled
                                    className="w-full bg-[var(--bg-tertiary)] opacity-60 border border-[var(--bg-tertiary)] rounded-xl px-4 py-3 text-[var(--text-secondary)] cursor-not-allowed"
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
                    <div className="bg-[var(--bg-card-strong)] backdrop-blur-sm border border-[var(--bg-tertiary)] rounded-2xl p-6 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-primary)]">Security</h3>
                                <p className="text-xs text-[var(--text-secondary)]">Manage your password and 2FA settings</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="text-cyan-400 text-sm hover:text-cyan-300 transition flex items-center gap-1"
                        >
                            Change Password →
                        </button>
                    </div>

                    <div className="bg-[var(--bg-card-strong)] backdrop-blur-sm border border-[var(--bg-tertiary)] rounded-2xl p-6 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-primary)]">Notifications</h3>
                                <p className="text-xs text-[var(--text-secondary)]">Choose what updates and alerts you want</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNotificationModal(true)}
                            className="text-cyan-400 text-sm hover:text-cyan-300 transition flex items-center gap-1"
                        >
                            Manage Preferences →
                        </button>
                    </div>

                    {/* Appearance - New Card */}
                    <div className="bg-[var(--bg-card-strong)] backdrop-blur-sm border border-[var(--bg-tertiary)] rounded-2xl p-6 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                {theme === 'dark' ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-blue-400" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-primary)]">Appearance</h3>
                                <p className="text-xs text-[var(--text-secondary)]">Customize your interface theme</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm text-[var(--text-primary)]">
                                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </span>

                            <button
                                onClick={toggleTheme}
                                className={`
                                    relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                                    ${theme === 'dark' ? 'bg-[#151520] border border-cyan-500/30' : 'bg-gray-200 border border-gray-300'}
                                `}
                            >
                                <span
                                    className={`
                                        inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md
                                        ${theme === 'dark' ? 'translate-x-[22px] bg-cyan-400' : 'translate-x-1'}
                                    `}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-400" />
                                Change Password
                            </h3>
                            <button onClick={() => setShowPasswordModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50 transition pr-12"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">Confirm Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-cyan-500/50 transition"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-secondary)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                disabled={changingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[var(--text-primary)] font-medium rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Preferences Modal */}
            {showNotificationModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--bg-card-strong)] border border-[var(--bg-tertiary)] rounded-2xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-400" />
                                Notification Preferences
                            </h3>
                            <button onClick={() => setShowNotificationModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border)] cursor-pointer hover:border-[#3a3a4e] transition">
                                <div>
                                    <p className="text-[var(--text-primary)] font-medium">Automation Alerts</p>
                                    <p className="text-xs text-[var(--text-muted)]">Get notified when automations execute</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifications.email_automation_alerts}
                                    onChange={(e) => setNotifications({ ...notifications, email_automation_alerts: e.target.checked })}
                                    className="w-5 h-5 accent-cyan-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border)] cursor-pointer hover:border-[#3a3a4e] transition">
                                <div>
                                    <p className="text-[var(--text-primary)] font-medium">Weekly Summary</p>
                                    <p className="text-xs text-[var(--text-muted)]">Receive weekly performance reports</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifications.email_weekly_summary}
                                    onChange={(e) => setNotifications({ ...notifications, email_weekly_summary: e.target.checked })}
                                    className="w-5 h-5 accent-cyan-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border)] cursor-pointer hover:border-[#3a3a4e] transition">
                                <div>
                                    <p className="text-[var(--text-primary)] font-medium">Billing Updates</p>
                                    <p className="text-xs text-[var(--text-muted)]">Get notified about billing and invoices</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifications.email_billing_updates}
                                    onChange={(e) => setNotifications({ ...notifications, email_billing_updates: e.target.checked })}
                                    className="w-5 h-5 accent-cyan-500"
                                />
                            </label>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowNotificationModal(false)}
                                className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-xl hover:bg-[var(--bg-secondary)] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNotifications}
                                disabled={savingNotifications}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-[var(--text-primary)] font-medium rounded-xl hover:from-cyan-400 hover:to-cyan-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {savingNotifications ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PortalLayout>
    );
}

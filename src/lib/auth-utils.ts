export function isAdminUser(profile: any | null, email?: string | null): boolean {
    if (profile?.role === 'admin' || profile?.role === 'super_admin' || profile?.is_admin === true || profile?.is_owner === true) {
        return true;
    }

    // Check email using VITE_ADMIN_EMAILS
    if (email) {
        const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
        if (adminEmails.includes(email)) {
            return true;
        }
    }

    return false;
}

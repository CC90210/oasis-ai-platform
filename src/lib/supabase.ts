import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
// We fallback to the hardcoded values if env vars are missing (development safety net)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://skgrbweyscysyetubemg.supabase.co';
// Guaranteed correct key from vite.config.ts
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c3lldHViZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NjY2NzQsImV4cCI6MjA4MzI0MjY3NH0.00kIbn4a4PwfIRzidwRWMigqHIcn_ssk_u1nN8_S2Pc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

// Auth helpers
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('supabase_access_token');
    localStorage.removeItem('supabase_refresh_token');
    localStorage.removeItem('supabase_user');
};

// TypeScript interfaces
export interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    company_name: string | null;
    phone: string | null;
    avatar_url: string | null;
    created_at: string;
    role: 'client' | 'admin' | 'super_admin';
    // Legacy flags - kept for compatibility
    is_owner?: boolean;
    is_admin?: boolean;
    billing_exempt?: boolean;
    onboarding_completed?: boolean;
    onboarding_steps?: number[];
}

// Helper functions for owner/admin checks
export function isOwnerAccount(profile: Profile | null): boolean {
    return profile?.role === 'super_admin' || profile?.is_owner === true;
}

export function isAdminAccount(profile: Profile | null): boolean {
    return profile?.role === 'super_admin' || profile?.role === 'admin' || profile?.is_admin === true || profile?.is_owner === true;
}

export function isBillingExempt(profile: Profile | null): boolean {
    return profile?.billing_exempt === true;
}

export interface Automation {
    id: string;
    user_id: string;
    automation_type: string;
    display_name: string;
    tier: string;
    status: 'pending_setup' | 'active' | 'paused' | 'cancelled';
    webhook_secret?: string;
    config: Record<string, any>;
    stats?: {
        total_runs: number;
        hours_saved: number;
        successful_runs?: number;
        failed_runs?: number;
    };
    last_run_at: string | null;
    created_at: string;
    // Compatibility fields
    name?: string;
    type?: string;
}

export interface AutomationLog {
    id: string;
    automation_id: string;
    user_id: string;
    event_type: string;
    event_name: string;
    status: string;
    metadata: Record<string, any>;
    description?: string;
    execution_time_ms?: number;
    created_at: string;
}

export interface SupportTicket {
    id: string;
    user_id: string;
    subject: string;
    description: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in_progress' | 'waiting_on_client' | 'resolved' | 'closed';
    created_at: string;
    updated_at: string;
}

export interface MonthlyReport {
    id: string;
    user_id: string;
    automation_id: string | null;
    title: string;
    report_month: string;
    file_url: string | null;
    hours_saved: number | null;
    tasks_automated: number | null;
    estimated_value_cents: number | null;
    roi_percentage: number | null;
    status: 'draft' | 'published';
    created_at: string;
}

export interface Subscription {
    id: string;
    user_id: string;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_price_id: string | null;
    product_name: string;
    tier: string | null;
    status: 'active' | 'past_due' | 'cancelled' | 'paused' | 'trialing' | 'incomplete';
    amount_cents: number;
    currency: string;
    billing_interval: 'month' | 'year';
    current_period_start: string | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    canceled_at: string | null;
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface BillingHistory {
    id: string;
    user_id: string;
    subscription_id: string | null;
    stripe_invoice_id: string | null;
    stripe_payment_intent_id: string | null;
    stripe_charge_id: string | null;
    description: string;
    amount_cents: number;
    amount_paid_cents: number;
    currency: string;
    status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible' | 'pending' | 'failed';
    invoice_date: string;
    due_date: string | null;
    paid_at: string | null;
    invoice_pdf_url: string | null;
    hosted_invoice_url: string | null;
    metadata: Record<string, any>;
    created_at: string;
}

export interface PendingStripeSession {
    id: string;
    stripe_session_id: string;
    stripe_customer_id: string | null;
    customer_email: string;
    plan_type: string | null;
    product_name: string | null;
    tier: string | null;
    amount_total_cents: number | null;
    currency: string;
    status: 'pending' | 'linked' | 'expired';
    linked_user_id: string | null;
    linked_at: string | null;
    expires_at: string;
    created_at: string;
}

// Also export for components that need direct access
export { SUPABASE_URL as supabaseUrl, SUPABASE_ANON_KEY as supabaseAnonKey };


-- ============================================================
-- STRIPE INTEGRATION SCHEMA FOR OASIS AI
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. SUBSCRIPTIONS TABLE (Enhanced for Stripe Integration)
-- Drop and recreate to ensure proper structure
DROP TABLE IF EXISTS public.billing_history CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;

CREATE TABLE public.subscriptions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Stripe IDs
    stripe_customer_id text,
    stripe_subscription_id text UNIQUE,
    stripe_price_id text,
    
    -- Product Details
    product_name text NOT NULL,
    tier text DEFAULT 'professional',
    
    -- Status
    status text DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled', 'paused', 'trialing', 'incomplete')),
    
    -- Billing
    amount_cents integer NOT NULL DEFAULT 0,
    currency text DEFAULT 'usd',
    billing_interval text DEFAULT 'month' CHECK (billing_interval IN ('month', 'year')),
    
    -- Period
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    cancel_at_period_end boolean DEFAULT false,
    canceled_at timestamp with time zone,
    
    -- Metadata
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BILLING HISTORY TABLE (Stripe Invoices)
CREATE TABLE public.billing_history (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
    
    -- Stripe Invoice IDs
    stripe_invoice_id text UNIQUE,
    stripe_payment_intent_id text,
    stripe_charge_id text,
    
    -- Invoice Details
    description text NOT NULL,
    amount_cents integer NOT NULL DEFAULT 0,
    amount_paid_cents integer NOT NULL DEFAULT 0,
    currency text DEFAULT 'usd',
    
    -- Status
    status text DEFAULT 'pending' CHECK (status IN ('draft', 'open', 'paid', 'void', 'uncollectible', 'pending', 'failed')),
    
    -- Dates
    invoice_date timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    due_date timestamp with time zone,
    paid_at timestamp with time zone,
    
    -- PDF/Receipt
    invoice_pdf_url text,
    hosted_invoice_url text,
    
    -- Metadata
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PENDING STRIPE SESSIONS TABLE (For linking pre-purchase to post-signup)
CREATE TABLE IF NOT EXISTS public.pending_stripe_sessions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    stripe_session_id text UNIQUE NOT NULL,
    stripe_customer_id text,
    customer_email text NOT NULL,
    
    -- Session Details
    plan_type text,
    product_name text,
    tier text,
    amount_total_cents integer,
    currency text DEFAULT 'usd',
    
    -- Status
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'linked', 'expired')),
    linked_user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    linked_at timestamp with time zone,
    
    -- Expiry
    expires_at timestamp with time zone DEFAULT (timezone('utc'::text, now()) + interval '7 days'),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ENABLE RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_stripe_sessions ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES

-- Subscriptions: Users can only view their own
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON public.subscriptions;
CREATE POLICY "Service role can manage all subscriptions" ON public.subscriptions
    FOR ALL USING (auth.role() = 'service_role');

-- Billing History: Users can only view their own
DROP POLICY IF EXISTS "Users can view own billing history" ON public.billing_history;
CREATE POLICY "Users can view own billing history" ON public.billing_history
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all billing history" ON public.billing_history;
CREATE POLICY "Service role can manage all billing history" ON public.billing_history
    FOR ALL USING (auth.role() = 'service_role');

-- Pending Sessions: Service role only (webhook operations)
DROP POLICY IF EXISTS "Service role can manage pending sessions" ON public.pending_stripe_sessions;
CREATE POLICY "Service role can manage pending sessions" ON public.pending_stripe_sessions
    FOR ALL USING (auth.role() = 'service_role');

-- Users can view pending sessions by their email (for matching during signup)
DROP POLICY IF EXISTS "Users can view own pending sessions" ON public.pending_stripe_sessions;
CREATE POLICY "Users can view own pending sessions" ON public.pending_stripe_sessions
    FOR SELECT USING (
        customer_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
        OR linked_user_id = auth.uid()
    );

-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_billing_history_user_id ON public.billing_history(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_history_subscription ON public.billing_history(subscription_id);
CREATE INDEX IF NOT EXISTS idx_billing_history_stripe_invoice ON public.billing_history(stripe_invoice_id);

CREATE INDEX IF NOT EXISTS idx_pending_sessions_email ON public.pending_stripe_sessions(customer_email);
CREATE INDEX IF NOT EXISTS idx_pending_sessions_stripe_id ON public.pending_stripe_sessions(stripe_session_id);

-- 7. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_subscriptions_updated_at ON public.subscriptions;
CREATE TRIGGER set_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 8. SAMPLE DATA FOR TESTING (Kim's Professional Tier - $150/month)
-- Uncomment and run manually if needed for testing

/*
-- First, get Kim's user ID from profiles table
-- Replace 'kim@example.com' with actual email

INSERT INTO public.subscriptions (
    user_id,
    stripe_customer_id,
    stripe_subscription_id,
    product_name,
    tier,
    status,
    amount_cents,
    currency,
    current_period_start,
    current_period_end
) VALUES (
    (SELECT id FROM public.profiles WHERE email = 'kim@example.com'),
    'cus_example123',
    'sub_example123',
    'Website Chat Automation',
    'professional',
    'active',
    15000,  -- $150.00
    'usd',
    NOW(),
    NOW() + INTERVAL '1 month'
);
*/

-- Done!
SELECT 'Stripe integration schema created successfully!' as status;

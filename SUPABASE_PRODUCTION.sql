-- CLEAR EXISTING TABLES (Warning: Deletes all data if you uncomment!)
-- DROP TABLE IF EXISTS legal_acceptances CASCADE;
-- DROP TABLE IF EXISTS custom_agreements CASCADE;
-- DROP TABLE IF EXISTS product_purchases CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;
-- DROP TABLE IF EXISTS automations CASCADE;
-- DROP TABLE IF EXISTS automation_logs CASCADE;

-- 1. LEGAL ACCEPTANCES (Audit Trail for Terms/NDA)
CREATE TABLE IF NOT EXISTS legal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  document_type TEXT NOT NULL, -- 'terms_of_service', 'privacy_policy', 'service_agreement', 'nda'
  document_version TEXT NOT NULL,
  acceptance_method TEXT DEFAULT 'checkbox', -- 'checkbox' or 'signature'
  signature_name TEXT, -- Only for signature types
  related_purchase_type TEXT, -- 'launchpad', 'integration-suite', 'custom'
  related_agreement_id UUID, -- For custom agreements
  user_agent TEXT,
  ip_address TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CUSTOM AGREEMENTS (For bespoke deals - Fully Synced with Frontend)
CREATE TABLE IF NOT EXISTS custom_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  automation_type TEXT NOT NULL, -- Formerly service_type
  agreement_reference TEXT,
  upfront_cost_cents BIGINT NOT NULL DEFAULT 0,
  monthly_cost_cents BIGINT NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'usd',
  
  -- NDA Specific
  nda_signed BOOLEAN DEFAULT false,
  nda_signed_at TIMESTAMPTZ,
  nda_signature_name TEXT,
  
  -- Legal Flags (Terms of Service, Privacy Policy, Service Agreement)
  tos_accepted BOOLEAN DEFAULT false,
  tos_accepted_at TIMESTAMPTZ,
  tos_version TEXT,
  privacy_accepted BOOLEAN DEFAULT false,
  privacy_accepted_at TIMESTAMPTZ,
  privacy_version TEXT,
  service_agreement_accepted BOOLEAN DEFAULT false,
  service_agreement_accepted_at TIMESTAMPTZ,
  service_agreement_signature TEXT,
  
  -- Stripe & Status
  stripe_session_id TEXT,
  stripe_payment_status TEXT DEFAULT 'unpaid',
  status TEXT DEFAULT 'pending', -- 'pending', 'nda_signed', 'legal_accepted', 'paid', 'active'
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT PURCHASES (Main table for standard checkout flows)
CREATE TABLE IF NOT EXISTS product_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  product_tier TEXT NOT NULL, -- 'launchpad', 'integration-suite', 'custom'
  product_name TEXT NOT NULL,
  upfront_cost_cents BIGINT NOT NULL,
  monthly_cost_cents BIGINT NOT NULL,
  currency TEXT DEFAULT 'USD',
  
  -- Legal Flags
  tos_accepted BOOLEAN DEFAULT false,
  tos_accepted_at TIMESTAMPTZ,
  tos_version TEXT,
  privacy_accepted BOOLEAN DEFAULT false,
  privacy_accepted_at TIMESTAMPTZ,
  privacy_version TEXT,
  service_agreement_accepted BOOLEAN DEFAULT false,
  service_agreement_accepted_at TIMESTAMPTZ,
  service_agreement_signature TEXT,
  
  -- Stripe Data
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'paid', 'cancelled'
  
  -- System
  user_agent TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'legal_accepted', 'payment_pending', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROFILES (Client data after signup)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  company_name TEXT,
  website_url TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client',
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_steps JSONB DEFAULT '[]',
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  subscription_tier TEXT,
  automation_webhook_id TEXT,
  is_admin BOOLEAN DEFAULT false,
  is_owner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CLIENT AUTOMATIONS (Configured active agents)
CREATE TABLE IF NOT EXISTS public.client_automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  automation_type TEXT NOT NULL,
  display_name TEXT NOT NULL,
  tier TEXT DEFAULT 'standard',
  status TEXT DEFAULT 'active',
  webhook_secret TEXT DEFAULT gen_random_uuid()::text,
  config JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{"total_runs": 0, "hours_saved": 0}',
  last_run_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SAFE VIEW REPLACEMENT (Fixes 42809 error)
DO $$ 
BEGIN
    -- If 'automations' exists as a base table, we must drop it to allow the view
    -- We only do this because 'client_automations' is the primary source of truth for n8n/backend
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'automations' 
        AND table_type = 'BASE TABLE'
    ) THEN
        -- Rename instead of drop if you want to be ultra-safe, but here we drop to fix the view
        DROP TABLE public.automations CASCADE;
    END IF;
END $$;

-- Create a view for "automations" to support both naming conventions during transition
CREATE OR REPLACE VIEW public.automations AS SELECT * FROM public.client_automations;

-- 6. AUTOMATION LOGS (Activity history)
CREATE TABLE IF NOT EXISTS public.automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES public.client_automations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT,
  event_name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'error', 'failed'
  metadata JSONB DEFAULT '{}',
  description TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SET RLS POLICIES
ALTER TABLE legal_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;
-- Ensure other sensitive tables are secured
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_code_usage ENABLE ROW LEVEL SECURITY;

-- DROP AND RECREATE POLICIES TO AVOID "ALREADY EXISTS" ERRORS
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow all operations for legal_acceptances" ON legal_acceptances;
    DROP POLICY IF EXISTS "Allow all operations for custom_agreements" ON custom_agreements;
    DROP POLICY IF EXISTS "Allow all operations for product_purchases" ON product_purchases;
    DROP POLICY IF EXISTS "Allow all operations for profiles" ON profiles;
    DROP POLICY IF EXISTS "Allow all operations for automations" ON automations;
    DROP POLICY IF EXISTS "Automation access policy" ON automations;
    DROP POLICY IF EXISTS "Allow all operations for automation_logs" ON automation_logs;

    DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can view own automations" ON public.client_automations;
    DROP POLICY IF EXISTS "Automation access policy" ON public.client_automations;
    DROP POLICY IF EXISTS "Users can view own logs" ON public.automation_logs;
    DROP POLICY IF EXISTS "View logs via automation ownership" ON public.automation_logs;
END $$;

CREATE POLICY "Allow all operations for legal_acceptances" ON legal_acceptances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for custom_agreements" ON custom_agreements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for product_purchases" ON product_purchases FOR ALL USING (true) WITH CHECK (true);

-- New policies
CREATE POLICY "Users view own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ROBURST AUTOMATION POLICY: Users see own, Admins see all
CREATE POLICY "Automation access policy" ON public.client_automations
  FOR ALL USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (role IN ('admin', 'super_admin') OR is_admin = true OR is_owner = true)
    )
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND (role IN ('admin', 'super_admin') OR is_admin = true OR is_owner = true)
    )
  );

CREATE POLICY "Universal Access" ON public.automation_logs
  FOR SELECT USING (
    -- 1. My Own Logs (Fastest, relies on user_id)
    user_id = auth.uid()
    OR
    -- 2. Admin Oversight (Slower, requires profile check)
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role IN ('admin', 'super_admin') OR is_admin = true OR is_owner = true)
    )
  );

-- FINAL TRIGGER: ENSURE VISIBILITY FOR NEW LOGS
CREATE OR REPLACE FUNCTION public.ensure_log_visibility()
RETURNS TRIGGER AS $$
BEGIN
    -- Copy ownership from parent automation
    IF NEW.automation_id IS NOT NULL THEN
        SELECT user_id INTO NEW.user_id
        FROM public.client_automations
        WHERE id = NEW.automation_id;
    END IF;
    -- Safety Fallback
    IF NEW.user_id IS NULL THEN
        NEW.user_id := '7cfe109c-8e79-42a7-95ce-101a582fc30b'; -- Kdawg
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_log_visibility_trigger ON public.automation_logs;
CREATE TRIGGER ensure_log_visibility_trigger
BEFORE INSERT ON public.automation_logs
FOR EACH ROW
EXECUTE FUNCTION public.ensure_log_visibility();

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop triggers if they exist before creating
DROP TRIGGER IF EXISTS update_custom_agreements_updated_at ON custom_agreements;
DROP TRIGGER IF EXISTS update_product_purchases_updated_at ON product_purchases;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_client_automations_updated_at ON public.client_automations;

CREATE TRIGGER update_custom_agreements_updated_at BEFORE UPDATE ON custom_agreements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_product_purchases_updated_at BEFORE UPDATE ON product_purchases FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_client_automations_updated_at BEFORE UPDATE ON public.client_automations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- DATABASE CORRECTION SCRIPT (Run this if tables already exist but are missing columns)
DO $$ 
BEGIN
    -- Add missing columns to custom_agreements
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='phone') THEN
        ALTER TABLE custom_agreements ADD COLUMN phone TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='automation_type') THEN
        ALTER TABLE custom_agreements ADD COLUMN automation_type TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='agreement_reference') THEN
        ALTER TABLE custom_agreements ADD COLUMN agreement_reference TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='upfront_cost_cents') THEN
        ALTER TABLE custom_agreements ADD COLUMN upfront_cost_cents BIGINT DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='monthly_cost_cents') THEN
        ALTER TABLE custom_agreements ADD COLUMN monthly_cost_cents BIGINT DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='nda_signed') THEN
        ALTER TABLE custom_agreements ADD COLUMN nda_signed BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='nda_signature_name') THEN
        ALTER TABLE custom_agreements ADD COLUMN nda_signature_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='tos_accepted') THEN
        ALTER TABLE custom_agreements ADD COLUMN tos_accepted BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='tos_accepted_at') THEN
        ALTER TABLE custom_agreements ADD COLUMN tos_accepted_at TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='tos_version') THEN
        ALTER TABLE custom_agreements ADD COLUMN tos_version TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='privacy_accepted') THEN
        ALTER TABLE custom_agreements ADD COLUMN privacy_accepted BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='privacy_accepted_at') THEN
        ALTER TABLE custom_agreements ADD COLUMN privacy_accepted_at TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='privacy_version') THEN
        ALTER TABLE custom_agreements ADD COLUMN privacy_version TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='service_agreement_accepted') THEN
        ALTER TABLE custom_agreements ADD COLUMN service_agreement_accepted BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='service_agreement_accepted_at') THEN
        ALTER TABLE custom_agreements ADD COLUMN service_agreement_accepted_at TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='service_agreement_signature') THEN
        ALTER TABLE custom_agreements ADD COLUMN service_agreement_signature TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='custom_agreements' AND column_name='user_agent') THEN
        ALTER TABLE custom_agreements ADD COLUMN user_agent TEXT;
    END IF;

    -- profiles
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'client';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='is_admin') THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='is_owner') THEN
        ALTER TABLE public.profiles ADD COLUMN is_owner BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='updated_at') THEN
        ALTER TABLE public.profiles ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- client_automations
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='display_name') THEN
        ALTER TABLE public.client_automations ADD COLUMN display_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='automation_type') THEN
        ALTER TABLE public.client_automations ADD COLUMN automation_type TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='tier') THEN
        ALTER TABLE public.client_automations ADD COLUMN tier TEXT DEFAULT 'standard';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='webhook_secret') THEN
        ALTER TABLE public.client_automations ADD COLUMN webhook_secret TEXT DEFAULT gen_random_uuid()::text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='last_run_at') THEN
        ALTER TABLE public.client_automations ADD COLUMN last_run_at TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='client_automations' AND column_name='updated_at') THEN
        ALTER TABLE public.client_automations ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- automation_logs
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='automation_logs' AND column_name='metadata') THEN
        ALTER TABLE public.automation_logs ADD COLUMN metadata JSONB DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='automation_logs' AND column_name='event_type') THEN
        ALTER TABLE public.automation_logs ADD COLUMN event_type TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='automation_logs' AND column_name='event_name') THEN
        ALTER TABLE public.automation_logs ADD COLUMN event_name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='automation_logs' AND column_name='description') THEN
        ALTER TABLE public.automation_logs ADD COLUMN description TEXT;
    END IF;
    -- Update foreign key for automation_logs if it points to old automations table
    -- This is more complex and might require dropping and re-adding the constraint.
    -- For now, we'll assume the table creation handles it, and this script is for missing columns.
END $$;

-- Populate role column if it was empty, based on is_admin/is_owner flags
UPDATE profiles SET role = 'super_admin' WHERE is_owner = true AND (role IS NULL OR role = 'client');
UPDATE profiles SET role = 'admin' WHERE is_admin = true AND is_owner = false AND (role IS NULL OR role = 'client');

-- VERIFICATION QUERY
SELECT 'Tables created and RLS set' as status;
SELECT table_name, (SELECT count(*) FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('legal_acceptances', 'custom_agreements', 'product_purchases', 'profiles', 'automations', 'automation_logs');

-- CLEAR EXISTING TABLES (Warning: Deletes all data!)
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
  document_type TEXT NOT NULL, -- 'terms_of_service', 'privacy_policy', 'service_agreement'
  document_version TEXT NOT NULL,
  acceptance_method TEXT DEFAULT 'checkbox', -- 'checkbox' or 'signature'
  signature_name TEXT, -- Only for service_agreement
  related_purchase_type TEXT, -- 'launchpad', 'integration-suite', etc.
  user_agent TEXT,
  ip_address TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CUSTOM AGREEMENTS (For bespoke deals)
CREATE TABLE IF NOT EXISTS custom_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  project_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  upfront_price NUMERIC NOT NULL,
  monthly_price NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  nda_status TEXT DEFAULT 'pending', -- 'pending', 'signed'
  nda_signature TEXT,
  nda_signed_at TIMESTAMPTZ,
  stripe_payment_status TEXT DEFAULT 'unpaid',
  stripe_session_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT PURCHASES (Main table for checkout flows)
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
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  company_name TEXT,
  website_url TEXT,
  phone TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_steps JSONB DEFAULT '[]',
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  subscription_tier TEXT, -- 'launchpad', 'integration', etc.
  automation_webhook_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AUTOMATIONS (Configured active agents)
CREATE TABLE IF NOT EXISTS automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  config JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{"total_runs": 0, "hours_saved": 0}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUTOMATION LOGS (Activity history)
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failed'
  details TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SET RLS POLICIES (Allow all for now, as requested)
ALTER TABLE legal_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Note: In a production environment with sensitive data, these policies should be much stricter.
-- However, as per instructions for THIS setup, they are set to allow all operations.
CREATE POLICY "Allow all operations for legal_acceptances" ON legal_acceptances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for custom_agreements" ON custom_agreements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for product_purchases" ON product_purchases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for automations" ON automations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for automation_logs" ON automation_logs FOR ALL USING (true) WITH CHECK (true);

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_custom_agreements_updated_at BEFORE UPDATE ON custom_agreements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_product_purchases_updated_at BEFORE UPDATE ON product_purchases FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- VERIFICATION QUERY
SELECT 'Tables created and RLS set' as status;
SELECT table_name, (SELECT count(*) FROM information_schema.columns WHERE table_schema = 'public' AND table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('legal_acceptances', 'custom_agreements', 'product_purchases', 'profiles', 'automations', 'automation_logs');

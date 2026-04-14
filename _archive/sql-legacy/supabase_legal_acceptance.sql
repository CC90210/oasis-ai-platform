-- ============================================================================
-- OASIS AI - Legal Acceptance System Database Setup
-- Run this in Supabase SQL Editor
-- Version: 2026-01-28
-- ============================================================================

-- 1. Create legal_acceptances table (audit trail for all legal acceptances)
CREATE TABLE IF NOT EXISTS legal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who accepted
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  
  -- What they accepted
  document_type TEXT NOT NULL,
  document_version TEXT NOT NULL,
  
  -- How they accepted
  acceptance_method TEXT NOT NULL,
  signature_name TEXT,
  
  -- Technical evidence
  ip_address TEXT,
  user_agent TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Reference
  related_agreement_id UUID,
  related_purchase_type TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for quick lookups
CREATE INDEX IF NOT EXISTS idx_legal_acceptances_email ON legal_acceptances(client_email);
CREATE INDEX IF NOT EXISTS idx_legal_acceptances_document ON legal_acceptances(document_type, document_version);

-- Enable RLS and create policy
ALTER TABLE legal_acceptances ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on legal_acceptances" ON legal_acceptances;
CREATE POLICY "Allow all operations on legal_acceptances" ON legal_acceptances
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 2. Add columns to existing custom_agreements table
-- ============================================================================
ALTER TABLE custom_agreements 
ADD COLUMN IF NOT EXISTS tos_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS tos_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS tos_version TEXT,
ADD COLUMN IF NOT EXISTS privacy_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS privacy_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS privacy_version TEXT,
ADD COLUMN IF NOT EXISTS service_agreement_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS service_agreement_accepted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS service_agreement_signature TEXT,
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- ============================================================================
-- 3. Create product_purchases table (for standard tier purchases)
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  
  -- Product info
  product_tier TEXT NOT NULL,
  product_name TEXT NOT NULL,
  
  -- Pricing
  upfront_cost_cents INTEGER DEFAULT 0,
  monthly_cost_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Legal acceptance tracking
  tos_accepted BOOLEAN DEFAULT FALSE,
  tos_accepted_at TIMESTAMPTZ,
  tos_version TEXT,
  privacy_accepted BOOLEAN DEFAULT FALSE,
  privacy_accepted_at TIMESTAMPTZ,
  privacy_version TEXT,
  service_agreement_accepted BOOLEAN DEFAULT FALSE,
  service_agreement_accepted_at TIMESTAMPTZ,
  service_agreement_signature TEXT,
  
  -- Technical evidence
  ip_address TEXT,
  user_agent TEXT,
  
  -- Stripe integration
  stripe_checkout_session_id TEXT,
  stripe_subscription_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  
  -- Status tracking
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_purchases_email ON product_purchases(client_email);
CREATE INDEX IF NOT EXISTS idx_product_purchases_status ON product_purchases(status);

-- Enable RLS and create policy
ALTER TABLE product_purchases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on product_purchases" ON product_purchases;
CREATE POLICY "Allow all operations on product_purchases" ON product_purchases
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- Done! All tables created successfully.
-- ============================================================================

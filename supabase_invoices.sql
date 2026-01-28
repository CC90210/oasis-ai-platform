-- =====================================================
-- OASIS AI - Invoices Table for Stripe Integration
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create invoices table for storing Stripe invoice data
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  stripe_invoice_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'draft', -- draft, open, paid, void, uncollectible
  description TEXT,
  invoice_pdf_url TEXT,
  hosted_invoice_url TEXT,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_email ON invoices(user_email);
CREATE INDEX IF NOT EXISTS idx_invoices_stripe_invoice ON invoices(stripe_invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Users can only view their own invoices
CREATE POLICY "Users can view own invoices" ON invoices
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.jwt()->>'email' = user_email
  );

-- Service role can insert/update invoices (for webhooks)
CREATE POLICY "Service role can manage invoices" ON invoices
  FOR ALL USING (auth.role() = 'service_role');

-- 5. Create function to update updated_at on changes
CREATE OR REPLACE FUNCTION update_invoices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_invoices_timestamp ON invoices;
CREATE TRIGGER update_invoices_timestamp
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_invoices_updated_at();

-- =====================================================
-- FIX: Update agreement statuses based on payment
-- =====================================================

-- View all current agreements to find ones that need fixing
SELECT 
  id, 
  client_name, 
  client_email, 
  status, 
  payment_status,
  nda_signed,
  created_at
FROM custom_agreements
ORDER BY created_at DESC;

-- Update agreements where NDA was signed and payment completed
-- Uncomment and modify the WHERE clause as needed:

-- UPDATE custom_agreements
-- SET 
--   payment_status = 'paid', 
--   status = 'active'
-- WHERE client_email = 'client@example.com';

-- Or update by ID:
-- UPDATE custom_agreements
-- SET 
--   payment_status = 'paid', 
--   status = 'active'
-- WHERE id = 'your-agreement-id-here';

-- =====================================================
-- GRANT PERMISSIONS (if needed)
-- =====================================================

-- Grant authenticated users select on invoices
GRANT SELECT ON invoices TO authenticated;

-- Grant service role full access
GRANT ALL ON invoices TO service_role;

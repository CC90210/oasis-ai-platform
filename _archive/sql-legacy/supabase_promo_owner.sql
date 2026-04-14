-- ============================================
-- OASIS AI - Promo Codes & Owner Account SQL
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. PROMO CODES TABLE
-- Stores all promo codes with their discount configuration
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage' or 'fixed'
  discount_value INTEGER NOT NULL, -- percentage (10 = 10%) or cents for fixed
  applies_to TEXT NOT NULL DEFAULT 'setup', -- 'setup', 'monthly', or 'both'
  max_uses INTEGER DEFAULT NULL, -- NULL = unlimited
  uses_count INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ DEFAULT NULL, -- NULL = no expiry
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROMO CODE USAGE TRACKING
-- Track which users have used which promo codes (prevents reuse)
CREATE TABLE IF NOT EXISTS promo_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id UUID REFERENCES promo_codes(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID, -- Can link to orders table if you have one
  discount_amount_cents INTEGER NOT NULL,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  -- CRITICAL: Each email can only use each code ONCE
  UNIQUE(promo_code_id, user_email)
);

-- 3. CREATE DEFAULT PROMO CODES
-- WELCOME10: 10% off setup only (standard welcome code)
INSERT INTO promo_codes (code, discount_type, discount_value, applies_to, max_uses, is_active)
VALUES ('WELCOME10', 'percentage', 10, 'setup', NULL, TRUE)
ON CONFLICT (code) DO UPDATE SET
  discount_value = 10,
  applies_to = 'setup',
  is_active = TRUE;

-- OASISAI15: 15% off setup only
INSERT INTO promo_codes (code, discount_type, discount_value, applies_to, max_uses, is_active)
VALUES ('OASISAI15', 'percentage', 15, 'setup', NULL, TRUE)
ON CONFLICT (code) DO UPDATE SET
  discount_value = 15,
  applies_to = 'setup',
  is_active = TRUE;

-- LAUNCH20: 20% off setup only (limited time launch promotion)
INSERT INTO promo_codes (code, discount_type, discount_value, applies_to, max_uses, is_active)
VALUES ('LAUNCH20', 'percentage', 20, 'setup', 100, TRUE)
ON CONFLICT (code) DO UPDATE SET
  discount_value = 20,
  applies_to = 'setup',
  max_uses = 100,
  is_active = TRUE;

-- 4. INCREMENT PROMO USES FUNCTION
-- Used to safely increment the uses_count when a promo is applied
CREATE OR REPLACE FUNCTION increment_promo_uses(promo_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE promo_codes 
  SET uses_count = uses_count + 1 
  WHERE id = promo_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. ADD OWNER/ADMIN FLAGS TO PROFILES
-- These flags control special account behavior
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_owner BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS billing_exempt BOOLEAN DEFAULT FALSE;

-- 6. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_usage_email ON promo_code_usage(user_email);
CREATE INDEX IF NOT EXISTS idx_promo_usage_promo_id ON promo_code_usage(promo_code_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_owner ON profiles(is_owner) WHERE is_owner = TRUE;

-- 7. ROW LEVEL SECURITY FOR PROMO TABLES
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_code_usage ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active promo codes (for validation)
CREATE POLICY IF NOT EXISTS "Anyone can read active promo codes"
ON promo_codes FOR SELECT
USING (is_active = TRUE);

-- Policy: Only admins can modify promo codes
CREATE POLICY IF NOT EXISTS "Admins can manage promo codes"
ON promo_codes FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND (profiles.is_admin = TRUE OR profiles.is_owner = TRUE)
  )
);

-- Policy: Authenticated users can insert their own usage records
CREATE POLICY IF NOT EXISTS "Users can record their own usage"
ON promo_code_usage FOR INSERT
WITH CHECK (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR auth.uid() IS NOT NULL
);

-- Policy: Users can view their own usage records
CREATE POLICY IF NOT EXISTS "Users can view their own usage"
ON promo_code_usage FOR SELECT
USING (
  user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR user_id = auth.uid()
);

-- ============================================
-- IMPORTANT: SET YOUR OWNER ACCOUNT
-- Replace 'your-email@example.com' with your actual email
-- ============================================
-- First find your user ID:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then set the owner flags:
-- UPDATE profiles 
-- SET is_owner = TRUE, is_admin = TRUE, billing_exempt = TRUE
-- WHERE email = 'your-email@example.com';

-- ============================================
-- VERIFICATION QUERIES
-- Run these to confirm everything is set up correctly
-- ============================================

-- Check promo codes:
-- SELECT code, discount_type, discount_value, applies_to, max_uses, uses_count, is_active FROM promo_codes;

-- Check profiles with owner flags:
-- SELECT email, is_owner, is_admin, billing_exempt FROM profiles WHERE is_owner = TRUE OR is_admin = TRUE;

-- Check promo usage:
-- SELECT pc.code, pcu.user_email, pcu.discount_amount_cents, pcu.used_at 
-- FROM promo_code_usage pcu 
-- JOIN promo_codes pc ON pc.id = pcu.promo_code_id 
-- ORDER BY pcu.used_at DESC;

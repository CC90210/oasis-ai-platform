-- ============================================================
-- PRODUCTION FIX: Kim's Active Subscription ($150/month)
-- Client: Kim | User ID: 6f23f504-9bf6-4da6-ac0e-46c656195aab
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================================

-- Insert Kim's subscription with her verified user ID
INSERT INTO subscriptions (
    user_id,
    stripe_customer_id,
    stripe_subscription_id,
    product_name,
    tier,
    status,
    amount_cents,
    currency,
    billing_interval,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    metadata
) VALUES (
    '6f23f504-9bf6-4da6-ac0e-46c656195aab'::uuid,
    'cus_kim_oasis_prod',
    'sub_kim_oasis_prod_001',
    'Website & Automation Services',
    'professional',
    'active',
    15000,
    'usd',
    'month',
    NOW(),
    NOW() + INTERVAL '1 month',
    false,
    '{"client": "Kim", "service_type": "website_automation", "automation_id": "21f64e1b-b540-4525-a84a-6054f1f32629"}'::jsonb
)
ON CONFLICT (stripe_subscription_id) 
DO UPDATE SET
    product_name = EXCLUDED.product_name,
    tier = EXCLUDED.tier,
    status = EXCLUDED.status,
    amount_cents = EXCLUDED.amount_cents,
    current_period_start = EXCLUDED.current_period_start,
    current_period_end = EXCLUDED.current_period_end,
    updated_at = NOW();

-- Verify the subscription was created successfully
SELECT 
    'SUCCESS' as result,
    s.id as subscription_id,
    s.user_id,
    s.product_name,
    s.tier,
    s.status,
    CONCAT('$', (s.amount_cents / 100.0)::text) as monthly_amount,
    s.billing_interval,
    s.current_period_end as next_billing_date
FROM subscriptions s
WHERE s.user_id = '6f23f504-9bf6-4da6-ac0e-46c656195aab'::uuid;

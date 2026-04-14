-- ============================================================
-- SUPABASE SCHEDULED FUNCTION: Auto-Renew Subscription Periods
-- This function updates current_period_end for active subscriptions
-- Run this in Supabase SQL Editor to create the function
-- ============================================================

-- 1. Create the renewal function
CREATE OR REPLACE FUNCTION public.renew_subscription_periods()
RETURNS integer AS $$
DECLARE
    updated_count integer;
BEGIN
    -- Update subscriptions where the current period has ended
    -- and the subscription is still active (not cancelled)
    UPDATE subscriptions
    SET 
        current_period_start = current_period_end,
        current_period_end = CASE 
            WHEN billing_interval = 'month' THEN current_period_end + INTERVAL '1 month'
            WHEN billing_interval = 'year' THEN current_period_end + INTERVAL '1 year'
            ELSE current_period_end + INTERVAL '1 month'
        END,
        updated_at = NOW()
    WHERE 
        status = 'active'
        AND current_period_end IS NOT NULL
        AND current_period_end <= NOW()
        AND cancel_at_period_end = false;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    -- Log the renewal (optional - for debugging)
    RAISE NOTICE 'Renewed % subscription(s)', updated_count;
    
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Grant execute permission
GRANT EXECUTE ON FUNCTION public.renew_subscription_periods() TO service_role;

-- 3. Create pg_cron extension if not exists (for scheduled jobs)
-- Note: pg_cron must be enabled in Supabase Dashboard > Database > Extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 4. Schedule the function to run daily at midnight UTC
-- This checks if any subscriptions need their period updated
SELECT cron.schedule(
    'renew-subscription-periods',  -- Job name
    '0 0 * * *',                   -- Cron expression: every day at midnight
    $$SELECT public.renew_subscription_periods()$$
);

-- 5. Verify the scheduled job was created
SELECT * FROM cron.job WHERE jobname = 'renew-subscription-periods';

-- ============================================================
-- MANUAL TEST: Run this to test the function immediately
-- ============================================================
-- SELECT public.renew_subscription_periods();

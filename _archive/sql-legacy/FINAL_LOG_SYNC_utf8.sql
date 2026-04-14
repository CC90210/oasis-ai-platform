
-- FINAL LOG SYNC (Brute Force)
-- 1. Ensure 'user_id' is correct on logs (Group-Sync)
-- 2. Define Policy that trusts 'user_id' explicitly.

DO \$\$
BEGIN
    -- A. FORCE DATA SYNC
    UPDATE public.automation_logs l
    SET user_id = a.user_id
    FROM public.client_automations a
    WHERE l.automation_id = a.id
    AND l.user_id IS DISTINCT FROM a.user_id;

    -- B. RLS POLICY (Hybrid)
    DROP POLICY IF EXISTS \
View
logs
via
automation
ownership\ ON public.automation_logs;
    DROP POLICY IF EXISTS \Simple
owner
view\ ON public.automation_logs;
    
    CREATE POLICY \Universal
Access\
    ON public.automation_logs
    FOR SELECT
    USING (
        -- 1. My Own Logs (Fastest, relies on user_id)
        user_id = auth.uid()
        OR
        -- 2. Admin Oversight (Slower, requires profile check)
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND (role IN ('admin', 'super_admin') OR is_owner = true)
        )
    );
    
    RAISE NOTICE 'SUCCESS: Hybrid RLS applied.';
END \$\$;


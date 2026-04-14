
-- BULLETPROOF LOG FETCHING (RPC)
-- This function bypasses RLS to ensure logs are returned if they exist.
-- It checks if the user calling it owns the automation or is an admin.

CREATE OR REPLACE FUNCTION get_portal_logs(target_automation_id UUID DEFAULT NULL, target_user_id UUID DEFAULT NULL, log_limit INTEGER DEFAULT 50)
RETURNS SETOF public.automation_logs
LANGUAGE plpgsql
SECURITY DEFINER -- MASTER KEY: Runs with postgres permissions
AS \$\$
BEGIN
    -- Security Check: Only return logs if the requester is an admin OR owns the data
    IF EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (role IN ('admin', 'super_admin') OR is_admin = true OR is_owner = true)
    ) OR (target_user_id = auth.uid()) OR (
        target_automation_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.client_automations 
            WHERE id = target_automation_id AND user_id = auth.uid()
        )
    ) THEN
        RETURN QUERY
        SELECT * FROM public.automation_logs
        WHERE (target_automation_id IS NULL OR automation_id = target_automation_id)
        AND (target_user_id IS NULL OR user_id = target_user_id)
        ORDER BY created_at DESC
        LIMIT log_limit;
    ELSE
        -- Return nothing if unauthorized
        RETURN;
    END IF;
END;
\$\$;

-- ALSO: Ensure the 'automations' view is robust
CREATE OR REPLACE VIEW public.automations AS SELECT * FROM public.client_automations;
GRANT SELECT ON public.automations TO authenticated;
GRANT SELECT ON public.automation_logs TO authenticated;

-- FINAL DATA SYNC (Force one more time)
UPDATE public.automation_logs l
SET user_id = a.user_id
FROM public.client_automations a
WHERE l.automation_id = a.id
AND l.user_id IS NULL;


-- 1. Create a secure function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin_val boolean;
  is_owner_val boolean;
  role_val text;
BEGIN
  -- This runs with "Security Definer" privileges, bypassing RLS on profiles to avoid loops
  SELECT is_admin, is_owner, role INTO is_admin_val, is_owner_val, role_val
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN (role_val IN ('admin', 'super_admin') OR is_admin_val = true OR is_owner_val = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update Automation Policy to use the secure function
DROP POLICY IF EXISTS "Automation access policy" ON public.client_automations;
CREATE POLICY "Automation access policy" ON public.client_automations
  FOR ALL USING (
    auth.uid() = user_id 
    OR 
    public.check_is_admin(auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    public.check_is_admin(auth.uid())
  );

-- 3. Update Log Policies to use the secure function
DROP POLICY IF EXISTS "Universal Log Deletion" ON public.automation_logs;
CREATE POLICY "Universal Log Deletion" ON public.automation_logs
  FOR DELETE USING (
    user_id = auth.uid()
    OR
    EXISTS (
        SELECT 1 FROM public.client_automations a
        WHERE a.id = automation_logs.automation_id
        AND a.user_id = auth.uid()
    )
    OR
    public.check_is_admin(auth.uid())
  );

DROP POLICY IF EXISTS "Universal Log Visibility" ON public.automation_logs;
CREATE POLICY "Universal Log Visibility" ON public.automation_logs
  FOR SELECT USING (
    user_id = auth.uid()
    OR
    EXISTS (
        SELECT 1 FROM public.client_automations a
        WHERE a.id = automation_logs.automation_id
        AND a.user_id = auth.uid()
    )
    OR
    public.check_is_admin(auth.uid())
  );

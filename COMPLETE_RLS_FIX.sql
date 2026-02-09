-- COMPLETE RLS FIX: Resolve Recursion & Harden Security
-- Run this entire script in Supabase SQL Editor to fix the "infinite recursion" error.

-- 1. Create Security Definer Function to bypass Recursion
-- This function accesses profiles with system privileges, breaking the RLS loop.
CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
DECLARE
  is_admin_val boolean;
  is_owner_val boolean;
  role_val text;
BEGIN
  SELECT is_admin, is_owner, role INTO is_admin_val, is_owner_val, role_val
  FROM public.profiles
  WHERE id = user_id;
  
  RETURN (role_val IN ('admin', 'super_admin') OR is_admin_val = true OR is_owner_val = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.check_is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_is_admin TO service_role;

-- 2. Clean up ALL potential conflicting policies
DO $$ 
BEGIN
    -- Automations
    DROP POLICY IF EXISTS "Automation access policy" ON public.client_automations;
    DROP POLICY IF EXISTS "Users can view own automations" ON public.client_automations;
    DROP POLICY IF EXISTS "Allow all operations for automations" ON public.client_automations;
    
    -- Logs
    DROP POLICY IF EXISTS "Universal Log Deletion" ON public.automation_logs;
    DROP POLICY IF EXISTS "Universal Log Visibility" ON public.automation_logs;
    DROP POLICY IF EXISTS "Users can view own logs" ON public.automation_logs;
    DROP POLICY IF EXISTS "View logs via automation ownership" ON public.automation_logs;
    DROP POLICY IF EXISTS "Allow all operations for automation_logs" ON public.automation_logs;
    
    -- Profiles
    DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Allow all operations for profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Profiles Policy" ON public.profiles;
END $$;

-- 3. Apply Consolidated, Non-Recursive Policies

-- Profiles: Users see themselves, Admins see everyone
CREATE POLICY "Profiles Policy" ON public.profiles
  FOR ALL USING (
    auth.uid() = id
    OR
    public.check_is_admin(auth.uid())
  );

-- Automations: Users see their own, Admins see all
CREATE POLICY "Automations Policy" ON public.client_automations
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

-- Automation Logs: Owners of the automation OR the log itself + Admins
CREATE POLICY "Logs Policy" ON public.automation_logs
  FOR ALL USING (
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

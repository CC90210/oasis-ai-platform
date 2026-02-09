-- NUCLEAR FIX for Infinite Recursion
-- This script drops the conflicting function and its dependent policies to ensure a clean slate.
-- Run this in the Supabase SQL Editor.

-- 1. DROP EVERYTHING related to these policies carefully
DROP FUNCTION IF EXISTS public.check_is_admin(uuid) CASCADE; 
-- The CASCADE above automatically drops policies using this function, but we clean up others manually too:

DO $$ 
BEGIN
    -- Drop Policies on Profiles
    DROP POLICY IF EXISTS "Profiles Policy" ON public.profiles;
    DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Allow all operations for profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
    DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
    DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;

    -- Drop Policies on Automations
    DROP POLICY IF EXISTS "Automations Policy" ON public.client_automations;
    DROP POLICY IF EXISTS "Automation access policy" ON public.client_automations;
    DROP POLICY IF EXISTS "Users can view own automations" ON public.client_automations;
    
    -- Drop Policies on Logs
    DROP POLICY IF EXISTS "Logs Policy" ON public.automation_logs;
    DROP POLICY IF EXISTS "Universal Log Deletion" ON public.automation_logs;
    DROP POLICY IF EXISTS "Universal Log Visibility" ON public.automation_logs;
END $$;

-- 2. Create the SECURE Function (SECURITY DEFINER is Critical)
CREATE OR REPLACE FUNCTION public.check_is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
DECLARE
  -- Variables to hold data
  current_role text;
  is_admin_flag boolean;
  is_owner_flag boolean;
BEGIN
  -- Perform a direct lookup on the profiles table.
  -- Because this function is SECURITY DEFINER, it runs with the privileges of the creator (you/admin),
  -- effectively BYPASSING RLS on the 'profiles' table for this specific lookup.
  SELECT role, is_admin, is_owner 
  INTO current_role, is_admin_flag, is_owner_flag
  FROM public.profiles
  WHERE id = user_id;

  -- Return true if any admin condition is met
  RETURN (current_role IN ('admin', 'super_admin') OR is_admin_flag = true OR is_owner_flag = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.check_is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_is_admin TO service_role;

-- 3. Re-Create Policies (Clean and Non-Recursive)

-- Profiles: 
-- We intentionally simplify this. Users see themselves. 
-- Admin visibility is handled by the function if needed, but for now we keep RLS simple to avoid any "Profile -> Profile" loops.
CREATE POLICY "Profiles Access" ON public.profiles
  FOR ALL USING (
    id = auth.uid()
    OR
    public.check_is_admin(auth.uid()) 
  );
-- Note: the check_is_admin above is safe because it is SECURITY DEFINER.

-- Automations:
CREATE POLICY "Automations Access" ON public.client_automations
  FOR ALL USING (
    user_id = auth.uid()
    OR 
    public.check_is_admin(auth.uid())
  );

-- Logs:
CREATE POLICY "Logs Access" ON public.automation_logs
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

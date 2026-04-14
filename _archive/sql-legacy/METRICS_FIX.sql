-- METRICS SYNC FIX
-- 1. Create a function to automatically update automation stats
CREATE OR REPLACE FUNCTION public.update_automation_stats()
RETURNS TRIGGER AS $$
DECLARE
    v_hours_per_task NUMERIC := 0.25; -- 15 minutes default
BEGIN
    -- Increment stats on EVERY new log
    UPDATE public.client_automations
    SET 
        stats = COALESCE(stats, '{}'::jsonb) || jsonb_build_object(
            'total_runs', COALESCE((stats->>'total_runs')::int, 0) + 1,
            'hours_saved', ROUND((COALESCE((stats->>'hours_saved')::numeric, 0) + 
                CASE 
                    WHEN NEW.status IN ('success', 'completed') OR (NEW.status = '' AND NEW.event_type = 'execution') THEN v_hours_per_task 
                    ELSE 0 
                END)::numeric, 2),
            'successful_runs', COALESCE((stats->>'successful_runs')::int, 0) + 
                CASE 
                    WHEN NEW.status IN ('success', 'completed') OR (NEW.status = '' AND NEW.event_type = 'execution') THEN 1 
                    ELSE 0 
                END
        ),
        last_run_at = NEW.created_at,
        updated_at = NOW()
    WHERE id = NEW.automation_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Attach trigger to automation_logs
DROP TRIGGER IF EXISTS on_automation_log_inserted ON public.automation_logs;
CREATE TRIGGER on_automation_log_inserted
    AFTER INSERT ON public.automation_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_automation_stats();

-- 3. BRUTE FORCE RE-SYNC (Fix existing discrepancies)
DO $$
DECLARE
    auto_rec RECORD;
BEGIN
    FOR auto_rec IN SELECT id FROM public.client_automations LOOP
        UPDATE public.client_automations a
        SET stats = (
            SELECT jsonb_build_object(
                'total_runs', COUNT(*),
                'successful_runs', COUNT(*) FILTER (WHERE status IN ('success', 'completed') OR (status = '' AND event_type = 'execution')),
                'hours_saved', ROUND((COUNT(*) FILTER (WHERE status IN ('success', 'completed') OR (status = '' AND event_type = 'execution')) * 0.25)::numeric, 2)
            )
            FROM public.automation_logs
            WHERE automation_id = auto_rec.id
        ),
        last_run_at = (
            SELECT MAX(created_at)
            FROM public.automation_logs
            WHERE automation_id = auto_rec.id
        )
        WHERE id = auto_rec.id;
    END LOOP;
END;
$$;

-- 4. RE-ENFORCE LOG VISIBILITY (Updated version of the existing trigger)
CREATE OR REPLACE FUNCTION public.ensure_log_visibility()
RETURNS TRIGGER AS $$
BEGIN
    -- Copy ownership from parent automation if missing
    IF NEW.user_id IS NULL AND NEW.automation_id IS NOT NULL THEN
        SELECT user_id INTO NEW.user_id
        FROM public.client_automations
        WHERE id = NEW.automation_id;
    END IF;
    
    -- Safety Fallback for Kdawg (original owner)
    IF NEW.user_id IS NULL THEN
        NEW.user_id := '7cfe109c-8e79-42a7-95ce-101a582fc30b';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_log_visibility_trigger ON public.automation_logs;
CREATE TRIGGER ensure_log_visibility_trigger
    BEFORE INSERT ON public.automation_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.ensure_log_visibility();

-- Final Verification
DO $$ 
BEGIN 
    RAISE NOTICE 'Metrics Sync Fix Applied Successfully.'; 
END $$;

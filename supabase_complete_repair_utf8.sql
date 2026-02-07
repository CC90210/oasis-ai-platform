-- 1. Reset and Re-create Tables (Safety First)
-- Warning: This clears existing data to ensure a clean slate for the fix.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;

create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  company_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.client_automations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  automation_type text not null,
  display_name text not null,
  tier text default 'standard',
  status text default 'pending_setup',
  webhook_secret text default gen_random_uuid()::text,
  last_run_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.automation_logs (
  id uuid default gen_random_uuid() primary key,
  automation_id uuid references public.client_automations(id),
  user_id uuid references public.profiles(id) not null,
  event_type text,
  event_name text not null,
  status text not null,
  metadata jsonb default '{}'::jsonb,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.automation_metrics (
  id uuid default gen_random_uuid() primary key,
  automation_id uuid references public.client_automations(id),
  user_id uuid references public.profiles(id) not null,
  metric_name text not null,
  metric_category text default 'general',
  value_numeric numeric,
  value_text text,
  value_json jsonb,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.profiles enable row level security;
alter table public.client_automations enable row level security;
alter table public.automation_logs enable row level security;
alter table public.automation_metrics enable row level security;

-- 3. Create Permissive Policies (Fixes "Empty Table" issues for users)
-- Profiles
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Automations
drop policy if exists "Users can view own automations" on public.client_automations;
create policy "Users can view own automations" on public.client_automations for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own automations" on public.client_automations;
create policy "Users can insert own automations" on public.client_automations for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own automations" on public.client_automations;
create policy "Users can update own automations" on public.client_automations for update using (auth.uid() = user_id);

-- Logs
drop policy if exists "Users can view own logs" on public.automation_logs;
create policy "Users can view own logs" on public.automation_logs for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own logs" on public.automation_logs;
create policy "Users can insert own logs" on public.automation_logs for insert with check (auth.uid() = user_id);

-- Metrics
drop policy if exists "Users can view own metrics" on public.automation_metrics;
create policy "Users can view own metrics" on public.automation_metrics for select using (auth.uid() = user_id);

-- 4. Advanced Trigger: Auto-Create Profile ONLY (No Default Automation)
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_profile_id uuid;
begin
  -- Create Profile
  insert into public.profiles (id, email, full_name, company_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company_name'
  );

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. REPAIR SCRIPT: Fix existing users who have no profile
do $$
declare
  r record;
begin
  for r in select * from auth.users loop
    -- Check if profile exists
    if not exists (select 1 from public.profiles where id = r.id) then
        -- Insert Profile
        insert into public.profiles (id, email, full_name, company_name)
        values (
            r.id, 
            r.email, 
            coalesce(r.raw_user_meta_data->>'full_name', 'Client'), 
            coalesce(r.raw_user_meta_data->>'company_name', '')
        );
    end if;
  end loop;
end;
$$;

-- ============================================================================
-- QWIKI AUTH & EDITORIAL MIGRATION
-- Run this in your Supabase SQL Editor AFTER supabase_setup.sql
-- ============================================================================

-- 1. Create public.users profile table (mirrors auth.users)
create table if not exists public.users (
    id uuid references auth.users(id) on delete cascade primary key,
    email text not null,
    display_name text,
    role text not null default 'contributor' check (role in ('contributor', 'editor')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Trigger: auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'contributor'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Add author_id and feedback_note to wiki_contributions
alter table public.wiki_contributions
  add column if not exists author_id uuid references auth.users(id) on delete set null,
  add column if not exists feedback_note text;

-- 4. Helper function: get current user role (safe, avoids RLS recursion)
-- Define this first so policies can refer to it
create or replace function public.get_my_role()
returns text
language sql
security definer
stable
as $$
  select role from public.users where id = auth.uid();
$$;

-- 5. Enable RLS on public.users
alter table public.users enable row level security;

-- Drop existing user policies if re-running
drop policy if exists "Users can view their own profile" on public.users;
drop policy if exists "Users can update their own profile" on public.users;
drop policy if exists "Editors can view all profiles" on public.users;

-- Users can read/update their own profile
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Editors can see all profiles (for invite management)
create policy "Editors can view all profiles"
  on public.users for select
  using (
    public.get_my_role() = 'editor'
  );

-- 6. Update wiki_contributions RLS policies for RBAC
-- Drop existing contribution policies
drop policy if exists "Allow public inserts for submissions" on public.wiki_contributions;
drop policy if exists "Allow public read access for submissions" on public.wiki_contributions;
drop policy if exists "Contributors can insert their own submissions" on public.wiki_contributions;
drop policy if exists "Contributors can view their own submissions" on public.wiki_contributions;
drop policy if exists "Editors can view all pending submissions" on public.wiki_contributions;
drop policy if exists "Editors can update submission status" on public.wiki_contributions;

-- Contributors can insert (must be authenticated)
create policy "Contributors can insert their own submissions"
  on public.wiki_contributions for insert
  with check (auth.uid() is not null);

-- Contributors see only their own submissions
create policy "Contributors can view their own submissions"
  on public.wiki_contributions for select
  using (
    author_id = auth.uid()
    or public.get_my_role() = 'editor'
  );

-- Editors can update status + feedback_note
create policy "Editors can update submission status"
  on public.wiki_contributions for update
  using (
    public.get_my_role() = 'editor'
  )
  with check (
    public.get_my_role() = 'editor'
  );

-- 7. Update wiki_articles RLS: editors can insert (publish flow)
drop policy if exists "Editors can insert published articles" on public.wiki_articles;
drop policy if exists "Allow all article reads" on public.wiki_articles;

-- Keep existing public read, but add editor write
create policy "Allow all article reads"
  on public.wiki_articles for select
  using (true);

create policy "Editors can insert published articles"
  on public.wiki_articles for insert
  with check (
    public.get_my_role() = 'editor'
  );

create policy "Editors can update articles"
  on public.wiki_articles for update
  using (
    public.get_my_role() = 'editor'
  );

-- ============================================================================
-- MANUAL STEPS AFTER RUNNING THIS MIGRATION:
-- 1. To make a user an editor:
--    UPDATE public.users SET role = 'editor' WHERE email = 'your@email.com';
-- 2. Ensure Supabase Auth email confirmations are enabled in:
--    Dashboard → Authentication → Email → Enable email confirmations
-- 3. Set the Site URL in Supabase:
--    Dashboard → Authentication → URL Configuration → Site URL = http://localhost:3000
-- 4. Add Redirect URLs:
--    Dashboard → Authentication → URL Configuration → Redirect URLs
--    Add: http://localhost:3000/auth/callback
-- ============================================================================

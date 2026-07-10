-- ============================================================================
-- QWIKI RLS RECURSION FIX
-- Run this in your Supabase SQL Editor to resolve the infinite recursion issue.
-- ============================================================================

-- 1. Ensure helper function exists and is defined first
create or replace function public.get_my_role()
returns text
language sql
security definer
stable
as $$
  select role from public.users where id = auth.uid();
$$;

-- 2. Fix public.users policies
drop policy if exists "Editors can view all profiles" on public.users;
create policy "Editors can view all profiles"
  on public.users for select
  using (
    public.get_my_role() = 'editor'
  );

-- 3. Fix public.wiki_contributions policies
drop policy if exists "Contributors can view their own submissions" on public.wiki_contributions;
create policy "Contributors can view their own submissions"
  on public.wiki_contributions for select
  using (
    author_id = auth.uid()
    or public.get_my_role() = 'editor'
  );

drop policy if exists "Editors can update submission status" on public.wiki_contributions;
create policy "Editors can update submission status"
  on public.wiki_contributions for update
  using (
    public.get_my_role() = 'editor'
  )
  with check (
    public.get_my_role() = 'editor'
  );

-- 4. Fix public.wiki_articles policies
drop policy if exists "Editors can insert published articles" on public.wiki_articles;
create policy "Editors can insert published articles"
  on public.wiki_articles for insert
  with check (
    public.get_my_role() = 'editor'
  );

drop policy if exists "Editors can update articles" on public.wiki_articles;
create policy "Editors can update articles"
  on public.wiki_articles for update
  using (
    public.get_my_role() = 'editor'
  );

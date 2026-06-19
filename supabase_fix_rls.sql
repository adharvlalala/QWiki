-- ============================================================================
-- QWIKI QUICK FIX — Run this in Supabase SQL Editor
-- Ensures all articles are published and RLS policies are correct
-- ============================================================================

-- Step 1: Check how many articles exist (bypasses RLS — runs as superuser in SQL Editor)
select count(*), published from public.wiki_articles group by published;

-- Step 2: Force ALL articles to published = true
update public.wiki_articles set published = true;

-- Step 3: Recreate the RLS policy cleanly
drop policy if exists "Allow public read access for published articles" on public.wiki_articles;

create policy "Allow public read access for published articles"
on public.wiki_articles
for select
to anon, authenticated
using (published = true);

-- Step 4: Also allow anon to count (needed for head queries)
drop policy if exists "Allow anon count" on public.wiki_articles;

-- Step 5: Verify — should now return all articles
select slug, title, published from public.wiki_articles order by category, slug;

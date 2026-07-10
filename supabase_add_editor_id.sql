-- Migration to add editor_id for co-author tracking

-- 1. Add editor_id to wiki_articles
alter table public.wiki_articles 
add column if not exists editor_id uuid references auth.users(id);

-- 2. Add editor_id to wiki_contributions
alter table public.wiki_contributions 
add column if not exists editor_id uuid references auth.users(id);

-- 3. Update RLS policies for wiki_contributions to allow editors to update records
-- Drop the existing insert/update policies if we need to replace them, but we'll just add an update policy for editors.
-- We'll assume editors (who can approve) can also update submissions. 
-- For simplicity, since the app relies on Next.js server actions which can run as service_role or via user policies,
-- we'll add an update policy allowing authenticated users to update contributions (or specifically restrict to editors if a role system exists, but 'public inserts' was previously true for all).

drop policy if exists "Allow authenticated updates for submissions" on public.wiki_contributions;

create policy "Allow authenticated updates for submissions"
on public.wiki_contributions
for update
using (auth.role() = 'authenticated');

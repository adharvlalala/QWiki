-- ============================================================================
-- QWIKI ACTIVE STARS FEATURE MIGRATION
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- 1. Create the article_stars table to track user-starred articles
create table if not exists public.article_stars (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    article_id uuid references public.wiki_articles(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, article_id)
);

-- 2. Enable Row Level Security (RLS) on article_stars
alter table public.article_stars enable row level security;

-- 3. Define RLS Policies for article_stars
drop policy if exists "Users can view their own stars" on public.article_stars;
create policy "Users can view their own stars"
on public.article_stars
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can insert their own stars" on public.article_stars;
create policy "Users can insert their own stars"
on public.article_stars
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can delete their own stars" on public.article_stars;
create policy "Users can delete their own stars"
on public.article_stars
for delete
to authenticated
using (user_id = auth.uid());

-- 4. Create the toggle_article_star RPC function
-- This increments or decrements the stars count of the article.
-- If the user is authenticated, it also creates or deletes a record in article_stars.
-- Defined with SECURITY DEFINER to bypass RLS for updating stars on wiki_articles.
create or replace function public.toggle_article_star(
  article_slug text,
  increment_amount int
)
returns int
language plpgsql
security definer set search_path = public
as $$
DECLARE
  v_article_id uuid;
  new_stars int;
  v_user_id uuid;
BEGIN
  -- Enforce that increment_amount must be either 1 or -1
  if increment_amount not in (-1, 1) then
    raise exception 'Invalid increment amount. Must be 1 or -1.';
  end if;

  -- Get the article ID
  select id into v_article_id from public.wiki_articles where slug = article_slug;
  if v_article_id is null then
    raise exception 'Article with slug % not found', article_slug;
  end if;

  -- Get current authenticated user ID (returns NULL if anonymous)
  v_user_id := auth.uid();

  -- If user is authenticated, track their starred state in the database
  if v_user_id is not null then
    if increment_amount = 1 then
      insert into public.article_stars (user_id, article_id)
      values (v_user_id, v_article_id)
      on conflict (user_id, article_id) do nothing;
    else
      delete from public.article_stars
      where user_id = v_user_id and article_id = v_article_id;
    end if;
  END IF;

  -- Update stars count in wiki_articles table
  update public.wiki_articles
  set stars = greatest(0, stars + increment_amount)
  where id = v_article_id
  returning stars into new_stars;

  return new_stars;
END;
$$;

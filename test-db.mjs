import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const idx = trimmed.indexOf('=');
    env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  // 1. Count ALL articles (anon client, respects RLS)
  const { count: anonCount, error: e1 } = await supabase
    .from('wiki_articles')
    .select('*', { count: 'exact', head: true });
  console.log('Articles visible to anon client:', anonCount, '| Error:', e1?.message);

  // 2. Fetch trapped-ions specifically
  const { data, error: e2 } = await supabase
    .from('wiki_articles')
    .select('slug, title, published')
    .eq('slug', 'trapped-ions')
    .single();
  console.log('trapped-ions fetch result:', data, '| Error code:', e2?.code, '| Message:', e2?.message);

  // 3. Fetch ALL without filters (to see if RLS is blocking)
  const { data: all, error: e3 } = await supabase
    .from('wiki_articles')
    .select('slug, published')
    .limit(20);
  console.log('All slugs (anon):', all?.map(a => a.slug), '| Error:', e3?.message);
}

test();

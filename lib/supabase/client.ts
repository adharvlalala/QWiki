import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client — safe to use in Client Components.
 * Reads public env vars (NEXT_PUBLIC_*) at runtime.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

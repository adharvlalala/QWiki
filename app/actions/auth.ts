"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getURL } from "@/lib/utils";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = getURL();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error.message);
    return;
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * Sign out the current user and redirect to login.
 * Uses ?signedout=true so the proxy middleware does not auto-redirect
 * back to the dashboard even if the session cookie hasn't cleared yet.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login?signedout=true");
}

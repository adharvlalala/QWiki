"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


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

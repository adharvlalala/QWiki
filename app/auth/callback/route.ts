import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getURL } from "@/lib/utils";

/**
 * Supabase PKCE Magic Link callback handler.
 * The magic-link email redirects here with a `code` query param.
 * We exchange it for a session, then redirect to the dashboard.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/contributor";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const baseUrl = getURL();
      return NextResponse.redirect(`${baseUrl}${next.startsWith('/') ? next : `/${next}`}`);
    } else {
      console.error("Auth callback error:", error.message, error.name);
    }
  }
  
  return NextResponse.redirect(`${getURL()}/login?error=auth_callback_error`);
}


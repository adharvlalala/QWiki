import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardLayoutClient from "@/components/DashboardLayoutClient";

/**
 * Dashboard layout — server component.
 * Fetches user session and profile server-side, then passes data
 * to DashboardLayoutClient which manages client-side mobile drawer state.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role, display_name")
    .eq("id", user.id)
    .single();

  const userRole = profile?.role ?? "contributor";

  return (
    <DashboardLayoutClient userEmail={user.email ?? ""} userRole={userRole}>
      {children}
    </DashboardLayoutClient>
  );
}

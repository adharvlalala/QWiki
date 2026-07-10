import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";

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
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <DashboardNav
        userEmail={user.email ?? ""}
        userRole={userRole}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

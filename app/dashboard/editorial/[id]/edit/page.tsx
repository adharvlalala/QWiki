import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditSubmissionClient from "./EditSubmissionClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSubmissionPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "editor") {
    redirect("/dashboard/contributor");
  }
  const { data: submission, error } = await supabase
    .from("wiki_contributions")
    .select("id, title, content, tags")
    .eq("id", id)
    .single();

  if (error || !submission) notFound();

  return <EditSubmissionClient submission={submission} />;
}

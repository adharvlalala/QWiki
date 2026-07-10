import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import EditorialReviewClient from "./EditorialReviewClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("wiki_contributions")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: data ? `Review: ${data.title} — QWiki Editorial` : "Review Submission",
  };
}

export default async function EditorialReviewPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Verify editor role
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "editor") {
    redirect("/dashboard/contributor");
  }

  // Fetch submission
  const { data: submission, error } = await supabase
    .from("wiki_contributions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !submission) notFound();

  return <EditorialReviewClient submission={submission} />;
}

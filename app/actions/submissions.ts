"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { slugify, readingTime } from "@/lib/utils";

export type SubmissionState = {
  error?: string;
  success?: boolean;
  fieldErrors?: {
    title?: string;
    content?: string;
    category?: string;
  };
};

/**
 * Create a new wiki contribution (draft → pending_review).
 */
export async function createSubmission(
  _prevState: SubmissionState | undefined,
  formData: FormData
): Promise<SubmissionState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to submit an article." };
  }

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();
  const tagsRaw = (formData.get("tags") as string)?.trim() ?? "";
  const authorNote = (formData.get("author_note") as string)?.trim() ?? "";
  const fieldErrors: SubmissionState["fieldErrors"] = {};
  if (!title || title.length < 5)
    fieldErrors.title = "Title must be at least 5 characters.";
  if (!content || content.length < 100)
    fieldErrors.content = "Content must be at least 100 characters.";
  if (!category) fieldErrors.category = "Please select a category.";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const slug = slugify(title);
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const { error } = await supabase.from("wiki_contributions").insert({
    type: "new",
    title,
    slug,
    category,
    tags,
    content,
    author_name: user.email?.split("@")[0] ?? "Anonymous",
    author_note: authorNote || null,
    author_id: user.id,
    status: "pending_review",
    target_slug: null,
  });

  if (error) {
    if (error.code === "23505") {
      return { fieldErrors: { title: "An article with this title already exists. Please choose a different title." } };
    }
    return { error: error.message };
  }

  return { success: true };
}

/**
 * Approve a pending submission: copy it to wiki_articles, mark as approved.
 */
export async function approveSubmission(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: contrib, error: fetchError } = await supabase
    .from("wiki_contributions")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !contrib) throw new Error("Submission not found.");
  const { error: insertError } = await supabase.from("wiki_articles").insert({
    slug: contrib.slug,
    title: contrib.title,
    excerpt: contrib.author_note || contrib.content.slice(0, 200),
    content: contrib.content,
    category: contrib.category,
    author: contrib.author_name,
    tags: contrib.tags,
    editor_id: contrib.editor_id,
    published: true,
    reading_time: readingTime(contrib.content),
    stars: 0,
  });

  if (insertError) {
    const slugWithSuffix = `${contrib.slug}-${Date.now()}`;
    await supabase.from("wiki_articles").insert({
      slug: slugWithSuffix,
      title: contrib.title,
      excerpt: contrib.author_note || contrib.content.slice(0, 200),
      content: contrib.content,
      category: contrib.category,
      author: contrib.author_name,
      tags: contrib.tags,
      editor_id: contrib.editor_id,
      published: true,
      reading_time: readingTime(contrib.content),
      stars: 0,
    });
  }
  await supabase
    .from("wiki_contributions")
    .update({ status: "approved" })
    .eq("id", id);

  redirect("/dashboard/editorial");
}

/**
 * Reject a pending submission with a feedback note.
 */
export async function rejectSubmission(
  id: string,
  feedbackNote: string
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("wiki_contributions")
    .update({
      status: "rejected",
      feedback_note: feedbackNote.trim() || "No reason provided.",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  redirect("/dashboard/editorial");
}

/**
 * Update an existing pending submission (Editorial Edit).
 */
export async function updateSubmission(
  id: string,
  updates: { title: string; content: string; tags: string[] }
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("wiki_contributions")
    .update({
      title: updates.title,
      content: updates.content,
      tags: updates.tags,
      editor_id: user.id,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

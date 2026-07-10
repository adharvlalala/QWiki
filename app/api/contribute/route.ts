import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const runtime = "edge";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCache = new Map<string, number[]>();

function checkRateLimit(ip: string): { limitReached: boolean } {
  const now = Date.now();
  const timestamps = ipRequestCache.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return { limitReached: true };
  }
  
  recentTimestamps.push(now);
  ipRequestCache.set(ip, recentTimestamps);
  
  return { limitReached: false };
}

/**
 * POST /api/contribute
 *
 * Body (JSON):
 *   {
 *     type:        "new" | "edit",
 *     title:       string,
 *     slug:        string,          // auto-generated on client, editable
 *     category:    string,
 *     tags:        string,          // comma-separated
 *     content:     string,          // markdown
 *     author_name: string,
 *     author_note: string,
 *     target_slug: string | null,   // for "edit" submissions — existing article slug
 *   }
 *
 * The submission is stored in the `wiki_contributions` table with
 * status = "pending_review" so an editor can approve / reject it.
 *
 * If Supabase is not configured the handler returns 200 with a
 * mock success response so the UI still works during development.
 */
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const { limitReached } = checkRateLimit(ip);
    
    if (limitReached) {
      return NextResponse.json(
        { error: "Too many contributions submitted. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      type,
      title,
      slug,
      category,
      tags,
      content,
      author_name,
      author_note,
      target_slug,
    } = body;
    if (!title?.trim() || !content?.trim() || !slug?.trim()) {
      return NextResponse.json(
        { error: "Title, slug and content are required." },
        { status: 400 }
      );
    }

    if (content.trim().length < 50) {
      return NextResponse.json(
        { error: "Content must be at least 50 characters." },
        { status: 400 }
      );
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === "your-supabase-url") {
      return NextResponse.json({
        success: true,
        id: `mock-${Date.now()}`,
        message:
          "Contribution received (dev mode — Supabase not connected). " +
          "Wire up NEXT_PUBLIC_SUPABASE_URL to persist submissions.",
      });
    }
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("wiki_contributions")
      .insert([
        {
          type:        type ?? "new",
          title:       title.trim(),
          slug:        slug.trim(),
          category:    category?.trim() ?? "Uncategorized",
          tags:        tags
            ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : [],
          content:     content.trim(),
          author_name: author_name?.trim() ?? "Anonymous",
          author_note: author_note?.trim() ?? null,
          target_slug: target_slug?.trim() ?? null,
          status:      "pending_review",
          created_at:  new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (error) throw error;
    try {
      if (category) {
        const catSlug = category.toLowerCase().trim().replace(/[\s_]+/g, "-");
        revalidatePath(`/categories/${catSlug}`);
      }
      revalidatePath("/categories/[category]");
      revalidatePath("/categories");
    } catch (revalErr) {
      console.error("Failed to revalidate categories:", revalErr);
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Thank you! Your contribution has been submitted for review.",
    });
  } catch (err) {
    console.error("[/api/contribute] Error:", err);
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}

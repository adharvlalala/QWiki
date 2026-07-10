import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

/**
 * GET /api/search?q=<query>&limit=<n>
 *
 * Full-text + semantic hybrid search over the wiki_articles table.
 * pgvector semantic search is stubbed — replace the embedding call
 * with your preferred embedding model (e.g., OpenAI, Cohere, Gemini).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "10"), 50);

  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: "Query must be at least 2 characters." },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data: ftsResults, error: ftsError } = await supabase
      .from("wiki_articles")
      .select("id, slug, title, excerpt, category, reading_time, updated_at")
      .textSearch("fts", query, { type: "websearch", config: "english" })
      .eq("published", true)
      .limit(limit);

    if (ftsError) throw ftsError;

    return NextResponse.json({
      results: ftsResults ?? [],
      query,
      total: ftsResults?.length ?? 0,
      semantic: false, // flip to true once pgvector is wired up
    });
  } catch (error) {
    console.error("[/api/search] Error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}

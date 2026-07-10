import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Submissions — QWiki Dashboard",
};

// ── Status tag styles ─────────────────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
  pending_review: "PENDING",
  approved: "PUBLISHED",
  rejected: "REJECTED",
};

const STATUS_COLOR: Record<string, string> = {
  pending_review: "#666666",
  approved: "#000000",
  rejected: "#000000",
};

// ── Page ──────────────────────────────────────────────────────────────────

export default async function ContributorDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch the contributor's own submissions
  const { data: submissions } = await supabase
    .from("wiki_contributions")
    .select("id, title, category, status, feedback_note, created_at")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-[900px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[#E5E5E5]">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.1em] text-[#999999] mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contributor Dashboard
          </p>
          <h1
            className="text-[32px] font-semibold tracking-[-0.02em] text-black"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            My Submissions
          </h1>
        </div>
        <Link
          href="/dashboard/submit"
          className="px-6 py-3 text-[12px] font-medium uppercase tracking-[0.06em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 transition-opacity hover:opacity-80"
          style={{
            backgroundColor: "#000000",
            borderRadius: 0,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          + New Submission
        </Link>
      </div>

      {/* Submission List */}
      {!submissions || submissions.length === 0 ? (
        <div className="py-20 text-center">
          <p
            className="text-[13px] uppercase tracking-[0.08em] text-[#AAAAAA] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            No submissions yet
          </p>
          <p
            className="text-[15px] text-[#666666] mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Share your quantum knowledge with the world.
          </p>
          <Link
            href="/dashboard/submit"
            className="inline-block px-8 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-white hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "#000000",
              borderRadius: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Write your first article
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E5E5]">
          {submissions.map((sub) => (
            <li key={sub.id} className="py-7">
              {/* Title row */}
              <div className="flex items-start justify-between gap-6 mb-3">
                <div className="flex-1">
                  <h2
                    className="text-[18px] font-medium text-black leading-[140%] tracking-[-0.01em]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {sub.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span
                      className="text-[12px] text-[#999999]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {sub.category}
                    </span>
                    <span
                      className="text-[12px] text-[#BBBBBB]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {new Date(sub.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Status tag */}
                <span
                  className="shrink-0 text-[10px] uppercase tracking-[0.1em] px-2 py-1 border"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: STATUS_COLOR[sub.status] ?? "#000000",
                    borderColor: STATUS_COLOR[sub.status] ?? "#000000",
                    borderRadius: 0,
                  }}
                >
                  {STATUS_LABEL[sub.status] ?? sub.status.toUpperCase()}
                </span>
              </div>

              {/* Feedback blockquote — only shown on rejection */}
              {sub.status === "rejected" && sub.feedback_note && (
                <blockquote
                  className="mt-4 py-1"
                  style={{
                    borderLeft: "2px solid #000000",
                    paddingLeft: "16px",
                  }}
                >
                  <p
                    className="text-[14px] leading-[160%] text-[#333333] italic"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {sub.feedback_note}
                  </p>
                  <cite
                    className="block mt-2 text-[11px] uppercase tracking-[0.08em] text-[#999999] not-italic"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    — Editorial Team
                  </cite>
                </blockquote>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Queue — QWiki Editorial",
};

export default async function EditorialIndexPage() {
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
  const { data: submissions } = await supabase
    .from("wiki_contributions")
    .select("id, title, category, author_name, created_at, status")
    .eq("status", "pending_review")
    .order("created_at", { ascending: true }); // oldest first (FIFO editorial queue)

  return (
    <div className="max-w-[900px] mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[#E5E5E5]">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.1em] text-[#999999] mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Editorial Dashboard
          </p>
          <h1
            className="text-[32px] font-semibold tracking-[-0.02em] text-black"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Review Queue
          </h1>
        </div>
        <Link
          href="/dashboard/editorial/invite"
          className="px-6 py-3 text-[12px] font-medium uppercase tracking-[0.06em] text-black border border-black hover:bg-[#F9F9F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          style={{ borderRadius: 0, fontFamily: "'Inter', sans-serif" }}
        >
          Invite Editor
        </Link>
      </div>

      {/* Stat */}
      <div className="flex items-center gap-2 mb-8">
        <span
          className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 border border-[#000000] text-black"
          style={{ fontFamily: "'JetBrains Mono', monospace", borderRadius: 0 }}
        >
          {submissions?.length ?? 0} PENDING
        </span>
        <span
          className="text-[13px] text-[#999999]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          articles awaiting editorial review
        </span>
      </div>

      {/* Submission List */}
      {!submissions || submissions.length === 0 ? (
        <div className="py-20 text-center">
          <p
            className="text-[13px] uppercase tracking-[0.08em] text-[#AAAAAA]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Queue is empty
          </p>
          <p
            className="text-[15px] text-[#666666] mt-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            All submissions have been reviewed.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E5E5]" role="list">
          {submissions.map((sub, i) => (
            <li key={sub.id}>
              <Link
                href={`/dashboard/editorial/${sub.id}`}
                className="flex items-center justify-between py-6 px-2 hover:bg-[#F9F9F9] transition-colors group focus-visible:outline-none focus-visible:bg-[#F9F9F9]"
              >
                <div className="flex items-start gap-4">
                  {/* Index number */}
                  <span
                    className="text-[12px] text-[#BBBBBB] pt-0.5 shrink-0 w-6 text-right"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2
                      className="text-[16px] font-medium text-black leading-[140%] group-hover:underline underline-offset-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {sub.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-[12px] text-[#999999]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {sub.author_name}
                      </span>
                      <span className="text-[#DDDDDD]">·</span>
                      <span
                        className="text-[12px] text-[#999999]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {sub.category}
                      </span>
                      <span className="text-[#DDDDDD]">·</span>
                      <span
                        className="text-[12px] text-[#AAAAAA]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {new Date(sub.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className="shrink-0 text-[10px] uppercase tracking-[0.1em] px-2 py-1 border border-[#000000] text-black ml-4"
                  style={{ fontFamily: "'JetBrains Mono', monospace", borderRadius: 0 }}
                >
                  PENDING REVIEW
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

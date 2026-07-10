"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import ActionBar from "./ActionBar";

type EditorialReviewClientProps = {
  submission: {
    id: string;
    type: string;
    title: string;
    slug: string;
    category: string;
    tags: string[];
    content: string;
    author_name: string;
    author_note: string | null;
    created_at: string;
    status: string;
  };
};

export default function EditorialReviewClient({ submission }: EditorialReviewClientProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      {/* ── Review Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-[#E5E5E5] bg-white">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/editorial"
              className="text-[12px] text-[#999999] hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Review Queue
            </Link>
            <div className="w-[1px] h-4 bg-[#E5E5E5]" />
            <span
              className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 border border-[#000000] text-black"
              style={{ fontFamily: "'JetBrains Mono', monospace", borderRadius: 0 }}
            >
              {submission.status.replace("_", " ")}
            </span>
          </div>

          {/* Mobile tab toggle */}
          <div className="flex md:hidden border border-[#E5E5E5]">
            <button
              onClick={() => setActiveTab("write")}
              className="px-4 py-2 text-[12px] uppercase tracking-[0.06em] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === "write" ? "#000000" : "#ffffff",
                color: activeTab === "write" ? "#ffffff" : "#000000",
                borderRadius: 0,
              }}
            >
              Markdown
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className="px-4 py-2 text-[12px] uppercase tracking-[0.06em] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: activeTab === "preview" ? "#000000" : "#ffffff",
                color: activeTab === "preview" ? "#ffffff" : "#000000",
                borderRadius: 0,
              }}
            >
              Preview
            </button>
          </div>

          <div className="hidden sm:block text-right">
            <p
              className="text-[12px] text-[#999999]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Submitted by{" "}
              <strong className="text-black">{submission.author_name}</strong>
            </p>
            <p
              className="text-[11px] text-[#AAAAAA]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {new Date(submission.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      {/* ── Split Pane Layout ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Markdown Source Pane */}
        <div
          className={`flex-1 border-r border-[#E5E5E5] ${
            activeTab === "preview" ? "hidden md:flex" : "flex"
          } flex-col`}
        >
          <div className="px-6 py-3 border-b border-[#E5E5E5] flex items-center justify-between bg-[#fafafa]">
            <span
              className="text-[10px] uppercase tracking-[0.1em] text-[#999999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              MARKDOWN SOURCE
            </span>
            <span
              className="text-[11px] text-[#aaaaaa]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {submission.content.length} chars
            </span>
          </div>
          <textarea
            readOnly
            value={submission.content}
            className="flex-1 w-full resize-none outline-none px-8 py-6 text-[14px] leading-[1.8] text-black bg-[#ffffff]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border: "none",
            }}
          />
        </div>

        {/* Rendered Preview Pane */}
        <div
          className={`flex-1 overflow-auto ${
            activeTab === "write" ? "hidden md:flex" : "flex"
          } flex-col bg-[#ffffff]`}
        >
          <div className="px-6 py-3 border-b border-[#E5E5E5] flex items-center gap-2 sticky top-0 bg-[#fafafa] z-10">
            <span
              className="text-[10px] uppercase tracking-[0.1em] text-[#999999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PREVIEW
            </span>
            <span
              className="text-[10px] text-[#CCCCCC] ml-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              · {submission.slug}
            </span>
          </div>

          <div className="flex-1 overflow-auto">
            <article className="max-w-[760px] mx-auto px-8 py-12">
              {/* Category + Tags */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.1em] text-[#666666]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {submission.category}
                </span>
                {submission.tags?.length > 0 && (
                  <>
                    <span className="text-[#DDDDDD]">·</span>
                    <div className="flex gap-2">
                      {submission.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.06em] text-[#999999]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-[36px] font-bold leading-[120%] tracking-[-0.025em] text-black mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {submission.title}
              </h1>

              {/* Author note / excerpt */}
              {submission.author_note && (
                <div
                  className="mb-8 py-1"
                  style={{ borderLeft: "2px solid #E5E5E5", paddingLeft: "16px" }}
                >
                  <p
                    className="text-[14px] leading-[165%] text-[#666666] italic"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {submission.author_note}
                  </p>
                  <cite
                    className="block mt-1 text-[11px] uppercase tracking-[0.06em] text-[#AAAAAA] not-italic"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    — Author&apos;s Note
                  </cite>
                </div>
              )}

              {/* Divider */}
              <div className="h-[1px] bg-[#E5E5E5] mb-8" />

              {/* Rendered Markdown */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#000000",
                  lineHeight: "1.7",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
                  components={{
                    h1: ({ children }) => (
                      <h1 style={{ fontSize: "28px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "16px", marginTop: "32px", letterSpacing: "-0.02em", color: "#000000" }}>{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 style={{ fontSize: "22px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "12px", marginTop: "28px", letterSpacing: "-0.01em", color: "#000000", borderBottom: "1px solid #E5E5E5", paddingBottom: "8px" }}>{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 style={{ fontSize: "17px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px", marginTop: "24px", color: "#000000" }}>{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p style={{ fontSize: "15px", lineHeight: "1.75", marginBottom: "16px", color: "#1a1a1a" }}>{children}</p>
                    ),
                    code: (props) => {
                      const { children, className } = props;
                      const isInline = !className;
                      return isInline ? (
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", backgroundColor: "#F5F5F5", padding: "2px 5px", color: "#000000" }}>{children}</code>
                      ) : (
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", display: "block", backgroundColor: "#F5F5F5", padding: "16px", overflowX: "auto", lineHeight: "1.6" }}>{children}</code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote style={{ borderLeft: "2px solid #000000", paddingLeft: "16px", margin: "20px 0", color: "#5e5e5e", fontStyle: "italic" }}>{children}</blockquote>
                    ),
                    ul: ({ children }) => <ul style={{ paddingLeft: "24px", marginBottom: "16px", listStyleType: "disc" }}>{children}</ul>,
                    ol: ({ children }) => <ol style={{ paddingLeft: "24px", marginBottom: "16px", listStyleType: "decimal" }}>{children}</ol>,
                    li: ({ children }) => <li style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "4px" }}>{children}</li>,
                    strong: ({ children }) => <strong style={{ fontWeight: 600, color: "#000000" }}>{children}</strong>,
                    a: ({ href, children }) => <a href={href} style={{ color: "#000000", textDecoration: "underline", textUnderlineOffset: "3px" }}>{children}</a>,
                    hr: () => <hr style={{ border: "none", borderTop: "1px solid #E5E5E5", margin: "32px 0" }} />,
                    table: ({ children }) => (
                      <div style={{ overflowX: "auto", marginBottom: "24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>{children}</table>
                      </div>
                    ),
                    th: ({ children }) => <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, borderBottom: "2px solid #000000" }}>{children}</th>,
                    td: ({ children }) => <td style={{ padding: "8px 12px", borderBottom: "1px solid #E5E5E5" }}>{children}</td>,
                  }}
                >
                  {submission.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ── Action Bar ────────────────────────────────────────────────── */}
      <ActionBar submissionId={submission.id} />
    </div>
  );
}

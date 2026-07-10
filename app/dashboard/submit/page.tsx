"use client";

import { useActionState, useState, useCallback } from "react";
import { createSubmission } from "@/app/actions/submissions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import "katex/dist/katex.min.css";

const CATEGORIES = [
  "Fundamentals",
  "Quantum Computing",
  "Algorithms",
  "Hardware",
  "Research",
  "Applications",
  "Photonics",
  "Cryptography",
];

const SAMPLE_CONTENT = `## Introduction

Write your article here using **Markdown**.

### Mathematical Notation

Inline math: $E = mc^2$

Display math:
$$\\hat{H}\\psi = E\\psi$$

### Features Supported

- **Bold**, *italic*, \`code\`
- Tables, lists, blockquotes
- Code blocks with syntax highlighting
- LaTeX math via KaTeX

> This is a blockquote

\`\`\`python
# Code block example
def quantum_state(alpha, beta):
    return alpha * |0⟩ + beta * |1⟩
\`\`\`
`;

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div
      className="prose max-w-none"
      style={{
        fontFamily: "'Inter', sans-serif",
        color: "#000000",
        lineHeight: "1.7",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "16px",
                marginTop: "32px",
                letterSpacing: "-0.02em",
                color: "#000000",
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "12px",
                marginTop: "28px",
                letterSpacing: "-0.01em",
                color: "#000000",
                borderBottom: "1px solid #E5E5E5",
                paddingBottom: "8px",
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: "17px",
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "8px",
                marginTop: "24px",
                color: "#000000",
              }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.75",
                marginBottom: "16px",
                color: "#1a1a1a",
              }}
            >
              {children}
            </p>
          ),
          code: (props) => {
            const { children, className } = props;
            const isInline = !className;
            return isInline ? (
              <code
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  backgroundColor: "#F5F5F5",
                  padding: "2px 5px",
                  color: "#000000",
                }}
              >
                {children}
              </code>
            ) : (
              <code
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  display: "block",
                  backgroundColor: "#F5F5F5",
                  padding: "16px",
                  overflowX: "auto",
                  lineHeight: "1.6",
                }}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "2px solid #000000",
                paddingLeft: "16px",
                margin: "20px 0",
                color: "#5e5e5e",
                fontStyle: "italic",
              }}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                paddingLeft: "24px",
                marginBottom: "16px",
                listStyleType: "disc",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                paddingLeft: "24px",
                marginBottom: "16px",
                listStyleType: "decimal",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "4px" }}>
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: 600, color: "#000000" }}>{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              style={{
                color: "#000000",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {children}
            </a>
          ),
          hr: () => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #E5E5E5",
                margin: "32px 0",
              }}
            />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", marginBottom: "24px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: "8px 12px",
                textAlign: "left",
                fontWeight: 600,
                borderBottom: "2px solid #000000",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid #E5E5E5",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {content || "_Start writing in the left pane to see a live preview here._"}
      </ReactMarkdown>
    </div>
  );
}

export default function SubmitPage() {
  const [state, action, pending] = useActionState(createSubmission, undefined);
  const [content, setContent] = useState(SAMPLE_CONTENT);
  const [title, setTitle] = useState("");
  const [autoSlug, setAutoSlug] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setAutoSlug(slugify(e.target.value));
  }, []);

  if (state?.success) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-sm text-center px-8">
          <p
            className="text-[11px] uppercase tracking-[0.1em] text-[#999999] mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Submission received
          </p>
          <h2
            className="text-[32px] font-semibold tracking-[-0.02em] text-black mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Under review.
          </h2>
          <p
            className="text-[15px] leading-[165%] text-[#5e5e5e] mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your article has been submitted to the editorial queue. You&apos;ll see it in your submissions list.
          </p>
          <Link
            href="/dashboard/contributor"
            className="inline-block px-8 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-white hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "#000000", borderRadius: 0, fontFamily: "'Inter', sans-serif" }}
          >
            View My Submissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* ── Sticky Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-[#E5E5E5] bg-white">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard/contributor"
              className="text-[12px] text-[#999999] hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Back
            </Link>
            <h1
              className="text-[14px] font-medium text-black"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              New Article Submission
            </h1>
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
              Write
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
        </div>

        {/* Metadata fields strip */}
        <div className="px-8 py-3 border-t border-[#E5E5E5] grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div className="md:col-span-1">
            <input
              name="title"
              form="submit-form"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Article Title"
              className="w-full bg-transparent text-[15px] text-black placeholder:text-[#CCCCCC] outline-none py-1 transition-all duration-200"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                borderBottom: "1px solid #E5E5E5",
              }}
              onFocus={(e) => { e.target.style.borderBottom = "1px solid #000000"; }}
              onBlur={(e) => { e.target.style.borderBottom = "1px solid #E5E5E5"; }}
            />
            {state?.fieldErrors?.title && (
              <p className="text-[11px] text-black mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {state.fieldErrors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              name="category"
              form="submit-form"
              required
              className="w-full bg-transparent text-[13px] text-black outline-none py-1 cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderBottom: "1px solid #E5E5E5",
                borderRadius: 0,
                appearance: "none",
              }}
              onFocus={(e) => { e.target.style.borderBottom = "1px solid #000000"; }}
              onBlur={(e) => { e.target.style.borderBottom = "1px solid #E5E5E5"; }}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {state?.fieldErrors?.category && (
              <p className="text-[11px] text-black mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {state.fieldErrors.category}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <input
              name="tags"
              form="submit-form"
              placeholder="Tags (comma-separated)"
              className="w-full bg-transparent text-[13px] text-black placeholder:text-[#CCCCCC] outline-none py-1 transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                borderBottom: "1px solid #E5E5E5",
              }}
              onFocus={(e) => { e.target.style.borderBottom = "1px solid #000000"; }}
              onBlur={(e) => { e.target.style.borderBottom = "1px solid #E5E5E5"; }}
            />
          </div>
        </div>
      </header>

      {/* ── Hidden form for actual submission data ────────────────────── */}
      <form id="submit-form" action={action} className="hidden">
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="category" defaultValue="" />
        <input type="hidden" name="tags" defaultValue="" />
      </form>

      {/* ── Split Pane Editor ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Write pane */}
        <div
          className={`flex-1 border-r border-[#E5E5E5] ${activeTab === "preview" ? "hidden md:flex" : "flex"} flex-col`}
        >
          <div className="px-6 py-3 border-b border-[#E5E5E5] flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.1em] text-[#999999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              MARKDOWN
            </span>
          </div>
          <textarea
            id="markdown-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article in Markdown…"
            className="flex-1 w-full resize-none outline-none px-8 py-6 text-[14px] leading-[1.8] text-black placeholder:text-[#CCCCCC]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              backgroundColor: "#ffffff",
              border: "none",
            }}
            spellCheck={true}
          />
          {state?.fieldErrors?.content && (
            <div className="px-8 py-3 border-t border-[#E5E5E5]">
              <p className="text-[12px] text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                {state.fieldErrors.content}
              </p>
            </div>
          )}
        </div>

        {/* Preview pane */}
        <div
          className={`flex-1 overflow-auto ${activeTab === "write" ? "hidden md:flex" : "flex"} flex-col`}
        >
          <div className="px-6 py-3 border-b border-[#E5E5E5] flex items-center gap-2 sticky top-0 bg-white z-10">
            <span
              className="text-[10px] uppercase tracking-[0.1em] text-[#999999]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              PREVIEW
            </span>
            {title && (
              <span
                className="text-[10px] text-[#CCCCCC] ml-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                · {autoSlug}
              </span>
            )}
          </div>
          <div className="px-8 py-6">
            {title && (
              <h1
                className="text-[30px] font-bold tracking-[-0.02em] text-black mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {title}
              </h1>
            )}
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>

      {/* ── Action Bar ────────────────────────────────────────────────── */}
      <footer
        className="sticky bottom-0 z-20 border-t border-[#E5E5E5] bg-white"
      >
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {state?.error && (
              <p
                className="text-[12px] text-black"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {state.error}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/contributor"
              className="text-[13px] text-[#999999] hover:text-black transition-colors focus-visible:outline-none focus-visible:underline"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Discard
            </Link>
            <button
              id="submit-article-btn"
              type="submit"
              form="submit-form"
              disabled={pending || !title || !content}
              onClick={(e) => {
                e.preventDefault();
                const form = document.getElementById("submit-form") as HTMLFormElement;
                const titleInput = form.querySelector("[name='title']") as HTMLInputElement;
                const contentInput = form.querySelector("[name='content']") as HTMLInputElement;
                const categorySelect = document.querySelector("select[name='category']") as HTMLSelectElement;
                const tagsInput = document.querySelector("input[name='tags']") as HTMLInputElement;
                if (titleInput) titleInput.value = title;
                if (contentInput) contentInput.value = content;
                if (categorySelect) {
                  const catHidden = form.querySelector("input[name='category']") as HTMLInputElement;
                  if (catHidden) catHidden.value = categorySelect.value;
                }
                if (tagsInput) {
                  const tagsHidden = form.querySelector("input[name='tags']") as HTMLInputElement;
                  if (tagsHidden) tagsHidden.value = tagsInput.value;
                }
                form.requestSubmit();
              }}
              className="px-8 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-white transition-opacity disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              style={{
                backgroundColor: "#000000",
                borderRadius: 0,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {pending ? "Submitting…" : "Submit for Review"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

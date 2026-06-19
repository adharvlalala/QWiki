"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  ChevronRight,
  FileText,
  Edit3,
  Eye,
  Code2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Info,
  Tag,
  User,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { slugify } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Fundamentals",
  "Computing",
  "Algorithms",
  "Hardware",
  "Research",
  "Applications",
  "Photonics",
  "Cryptography",
  "Other",
];

const MARKDOWN_STARTER = `## Introduction

Write a clear introduction to the topic here.

## Background

Provide historical context or prerequisite knowledge.

## Core Concepts

Explain the main ideas. You can use:

- **Bold** for emphasis
- \`inline code\` for terms
- Math notation like |ψ⟩ = α|0⟩ + β|1⟩

\`\`\`
Block code for equations or pseudocode
\`\`\`

## Applications

Describe real-world uses or implications.

## See Also

- Link to related articles
- Reference materials
`;

// ── Markdown toolbar buttons ───────────────────────────────────────────────
const TOOLBAR = [
  { label: "B",    title: "Bold",         wrap: ["**", "**"],         mono: true  },
  { label: "I",    title: "Italic",       wrap: ["_", "_"],           mono: false },
  { label: "`",    title: "Inline code",  wrap: ["`", "`"],           mono: true  },
  { label: "H2",   title: "Heading 2",    wrap: ["## ", ""],          mono: false },
  { label: "H3",   title: "Heading 3",    wrap: ["### ", ""],         mono: false },
  { label: "[ ]",  title: "Bullet list",  wrap: ["- ", ""],           mono: true  },
  { label: "```",  title: "Code block",   wrap: ["```\n", "\n```"],   mono: true  },
  { label: "🔗",   title: "Link",         wrap: ["[", "](url)"],      mono: false },
];

// ── Types ──────────────────────────────────────────────────────────────────
type ContribType = "new" | "edit";
type Tab = "write" | "preview";
type Status = "idle" | "submitting" | "success" | "error";

// ── MarkdownEditor component ───────────────────────────────────────────────
function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("write");

  const applyWrap = useCallback(
    ([prefix, suffix]: [string, string]) => {
      const ta = document.getElementById(
        "md-editor"
      ) as HTMLTextAreaElement | null;
      if (!ta) return;
      const { selectionStart: s, selectionEnd: e } = ta;
      const sel = value.slice(s, e) || "text";
      const next =
        value.slice(0, s) + prefix + sel + suffix + value.slice(e);
      onChange(next);
      // Restore focus and selection
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(
          s + prefix.length,
          s + prefix.length + sel.length
        );
      });
    },
    [value, onChange]
  );

  return (
    <div className="border border-[#E5E5E5] flex flex-col" style={{ minHeight: 480 }}>
      {/* ── Toolbar ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#E5E5E5] px-4 py-2 bg-[#fafafa]">
        {/* Format buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          {TOOLBAR.map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.title}
              onClick={() => applyWrap(btn.wrap as [string, string])}
              className="px-2.5 py-1 text-[12px] text-[#444444] hover:bg-[#eeeeee] hover:text-black transition-colors border border-transparent hover:border-[#E5E5E5]"
              style={{
                fontFamily: btn.mono ? "'JetBrains Mono', monospace" : "'Inter', sans-serif",
                fontWeight: 600,
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Write / Preview toggle */}
        <div className="flex items-center border border-[#E5E5E5] ml-4 shrink-0">
          {(["write", "preview"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.05em] transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: tab === t ? "#000000" : "transparent",
                color: tab === t ? "#ffffff" : "#666666",
              }}
            >
              {t === "write" ? <Code2 size={11} /> : <Eye size={11} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Editor / Preview ──────────────────────────────────────────── */}
      {tab === "write" ? (
        <textarea
          id="md-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck
          placeholder="Write your article in Markdown…"
          className="flex-1 resize-none outline-none p-5 text-[14px] leading-[180%] text-[#1b1b1b] placeholder:text-[#aaaaaa] bg-white"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            minHeight: 420,
          }}
          aria-label="Article content in Markdown"
        />
      ) : (
        <div className="flex-1 p-6 bg-white overflow-auto">
          {value.trim() ? (
            <article
              className="prose prose-slate max-w-none"
              style={{
                "--tw-prose-body":     "#333333",
                "--tw-prose-headings": "#000000",
                "--tw-prose-code":     "#000000",
              } as React.CSSProperties}
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
              >
                {value}
              </ReactMarkdown>
            </article>
          ) : (
            <p
              className="text-[14px] text-[#aaaaaa] italic"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Nothing to preview yet — start writing in the editor.
            </p>
          )}
        </div>
      )}

      {/* ── Word count footer ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-end gap-4 px-4 py-2 border-t border-[#E5E5E5] bg-[#fafafa]"
        aria-live="polite"
      >
        <span
          className="text-[11px] text-[#aaaaaa]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {value.trim().split(/\s+/).filter(Boolean).length} words ·{" "}
          {value.length} chars
        </span>
        <span
          className="text-[11px] text-[#aaaaaa]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Markdown supported
        </span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ContributePage() {
  // Form state
  const [type, setType]             = useState<ContribType>("new");
  const [title, setTitle]           = useState("");
  const [slug, setSlug]             = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory]     = useState(CATEGORIES[0]);
  const [tags, setTags]             = useState("");
  const [content, setContent]       = useState(MARKDOWN_STARTER);
  const [authorName, setAuthorName] = useState("");
  const [authorNote, setAuthorNote] = useState("");
  const [targetSlug, setTargetSlug] = useState("");

  // UI state
  const [status, setStatus]         = useState<Status>("idle");
  const [errorMsg, setErrorMsg]     = useState("");

  // Auto-derive slug from title (unless user manually edited it)
  useEffect(() => {
    if (!slugEdited && title) setSlug(slugify(title));
  }, [title, slugEdited]);

  // Reset slug-edited flag when type changes
  useEffect(() => { setSlugEdited(false); setSlug(""); setTitle(""); }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!title.trim()) { setErrorMsg("Please enter a title."); return; }
    if (!slug.trim())  { setErrorMsg("Please enter a slug."); return; }
    if (content.trim().length < 50) {
      setErrorMsg("Content must be at least 50 characters.");
      return;
    }
    if (type === "edit" && !targetSlug.trim()) {
      setErrorMsg("Please enter the slug of the article you want to edit.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contribute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, title, slug, category, tags, content,
          author_name: authorName,
          author_note: authorNote,
          target_slug: type === "edit" ? targetSlug : null,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Unknown error");
      setStatus("success");
    } catch (err) {
      setErrorMsg((err as Error).message ?? "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <>
        <Navbar />
        <main
          id="main-content"
          className="min-h-screen flex flex-col items-center justify-center px-8 pt-28 pb-20"
          style={{ backgroundColor: "#ffffff" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg w-full text-center"
          >
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-[#E5E5E5]">
              <CheckCircle2 size={32} className="text-[#a855f7]" />
            </div>
            <h1
              className="text-[48px] leading-[110%] font-semibold text-black tracking-[-0.03em] mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Contribution received.
            </h1>
            <p
              className="text-[17px] leading-[160%] text-[#5e5e5e] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Thank you for contributing to QWiki. Your submission has been queued
              for editorial review and will be published once approved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/wiki"
                className="bg-black text-white px-8 py-4 text-[14px] font-medium uppercase tracking-[0.02em] hover:bg-[#303030] transition-colors text-center flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Browse Wiki
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button
                onClick={() => {
                  setStatus("idle");
                  setTitle(""); setSlug(""); setTags(""); setAuthorName("");
                  setAuthorNote(""); setTargetSlug(""); setContent(MARKDOWN_STARTER);
                  setSlugEdited(false);
                }}
                className="bg-transparent border border-black text-black px-8 py-4 text-[14px] font-medium uppercase tracking-[0.02em] hover:bg-[#f9f9f9] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Contribute Again
              </button>
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />

      <main id="main-content" style={{ backgroundColor: "#ffffff" }}>

        {/* ── Hero header ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="contribute-heading"
          className="border-b border-[#E5E5E5] pt-28 pb-16 px-8"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[12px] text-[#999999] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link href="/" className="hover:text-[#000000] transition-colors">Home</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-[#1b1b1b]">Contribute</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span
                    className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 border border-[#E5E5E5] text-[#000000] uppercase tracking-[0.05em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Open Contributions
                  </span>
                  <span
                    className="text-[11px] text-[#a855f7]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Markdown supported
                  </span>
                </motion.div>

                <motion.h1
                  id="contribute-heading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-[clamp(2.5rem,5vw,72px)] leading-[110%] font-semibold text-black tracking-[-0.03em] mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Share your knowledge.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[18px] leading-[160%] text-[#4c4546] max-w-2xl"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  QWiki is community-driven. Add a new article or propose edits to an existing one.
                  All submissions are reviewed by the editorial team before publishing.
                </motion.p>
              </div>

              {/* Stats panel */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-4 border border-[#E5E5E5] p-6"
              >
                <dl className="space-y-4">
                  {[
                    { label: "Format",   value: "Markdown (GFM)" },
                    { label: "Review",   value: "Editorial team" },
                    { label: "License",  value: "CC BY 4.0"      },
                    { label: "Status",   value: "Open"            },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline">
                      <dt
                        className="text-[12px] font-medium uppercase tracking-[0.05em] text-[#999999]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="text-[14px] font-medium text-[#1b1b1b]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Form section ────────────────────────────────────────────── */}
        <section className="px-8 py-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Sidebar guide ──────────────────────────────────────── */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-28 space-y-8">

                {/* How it works */}
                <div>
                  <h2
                    className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    How it works
                  </h2>
                  <ol className="space-y-4">
                    {[
                      { n: "01", text: "Choose to add a new article or suggest an edit." },
                      { n: "02", text: "Fill in the title, category and tags." },
                      { n: "03", text: "Write your content using Markdown." },
                      { n: "04", text: "Preview before submitting." },
                      { n: "05", text: "The editorial team reviews and publishes." },
                    ].map(({ n, text }) => (
                      <li key={n} className="flex gap-3">
                        <span
                          className="text-[11px] font-medium text-[#cccccc] shrink-0 mt-0.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {n}
                        </span>
                        <p
                          className="text-[13px] leading-[160%] text-[#5e5e5e]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Markdown quick ref */}
                <div className="border-t border-[#E5E5E5] pt-6">
                  <h2
                    className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Markdown cheatsheet
                  </h2>
                  <ul className="space-y-2">
                    {[
                      ["**text**",       "Bold"],
                      ["_text_",         "Italic"],
                      ["`code`",         "Inline code"],
                      ["## Heading",     "H2 heading"],
                      ["- item",         "Bullet"],
                      ["[text](url)",    "Link"],
                      ["```\\ncode\\n```", "Code block"],
                    ].map(([syntax, desc]) => (
                      <li key={syntax} className="flex items-baseline gap-2">
                        <code
                          className="text-[11px] text-[#a855f7] shrink-0"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {syntax}
                        </code>
                        <span
                          className="text-[11px] text-[#999999]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          — {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guidelines link */}
                <div className="border-t border-[#E5E5E5] pt-6">
                  <Link
                    href="/style-guide"
                    className="flex items-center gap-2 text-[13px] text-[#5e5e5e] hover:text-[#000000] transition-colors group"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <BookOpen size={13} className="shrink-0" aria-hidden="true" />
                    Read the style guide
                    <ArrowRight
                      size={12}
                      className="ml-auto group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── Main form ──────────────────────────────────────────── */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <form onSubmit={handleSubmit} noValidate className="space-y-8">

                {/* ── Contribution type ─────────────────────────────── */}
                <fieldset>
                  <legend
                    className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999] mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Contribution type
                  </legend>
                  <div className="flex gap-0 border border-[#E5E5E5] w-fit">
                    {(["new", "edit"] as ContribType[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className="flex items-center gap-2 px-6 py-3 text-[13px] font-medium uppercase tracking-[0.05em] transition-colors"
                        style={{
                          fontFamily:      "'Inter', sans-serif",
                          backgroundColor: type === t ? "#000000" : "transparent",
                          color:           type === t ? "#ffffff" : "#666666",
                        }}
                        aria-pressed={type === t}
                      >
                        {t === "new"
                          ? <><FileText size={14} aria-hidden="true" /> New Article</>
                          : <><Edit3   size={14} aria-hidden="true" /> Edit Existing</>
                        }
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Edit — target slug field */}
                <AnimatePresence>
                  {type === "edit" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border border-[#E5E5E5] bg-[#fafafa] flex gap-3 mb-2">
                        <Info size={15} className="text-[#a855f7] shrink-0 mt-0.5" aria-hidden="true" />
                        <p
                          className="text-[13px] leading-[160%] text-[#5e5e5e]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Enter the slug of the article you&apos;d like to edit (e.g.{" "}
                          <code
                            className="text-[#a855f7]"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            quantum-entanglement
                          </code>
                          ). You can find it in the article&apos;s URL.
                        </p>
                      </div>
                      <FormField label="Article slug to edit" required htmlFor="target-slug">
                        <input
                          id="target-slug"
                          type="text"
                          value={targetSlug}
                          onChange={(e) => setTargetSlug(e.target.value)}
                          placeholder="quantum-entanglement"
                          className="w-full h-11 border border-[#E5E5E5] bg-white px-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        />
                      </FormField>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Title & slug ───────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Article title" required htmlFor="art-title">
                    <input
                      id="art-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={type === "new" ? "Quantum Entanglement" : "Your proposed title"}
                      className="w-full h-11 border border-[#E5E5E5] bg-white px-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      required
                    />
                  </FormField>

                  <FormField
                    label="Slug (URL identifier)"
                    required
                    htmlFor="art-slug"
                    hint="Auto-generated from title — editable"
                  >
                    <input
                      id="art-slug"
                      type="text"
                      value={slug}
                      onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                      placeholder="quantum-entanglement"
                      className="w-full h-11 border border-[#E5E5E5] bg-white px-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      required
                    />
                  </FormField>
                </div>

                {/* ── Category & Tags ────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Category" required htmlFor="art-category">
                    <div className="relative">
                      <select
                        id="art-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-11 border border-[#E5E5E5] bg-white px-4 pr-10 text-[14px] text-[#1b1b1b] outline-none focus:border-[#000000] transition-colors appearance-none"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronRight
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[#999999] pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </FormField>

                  <FormField
                    label="Tags"
                    htmlFor="art-tags"
                    hint="Comma-separated, e.g. entanglement, bell-states"
                  >
                    <div className="relative flex items-center">
                      <Tag
                        size={14}
                        className="absolute left-4 text-[#aaaaaa] pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="art-tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="entanglement, bell-states, EPR"
                        className="w-full h-11 border border-[#E5E5E5] bg-white pl-9 pr-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  </FormField>
                </div>

                {/* ── Markdown editor ────────────────────────────────── */}
                <FormField label="Article content" required htmlFor="md-editor">
                  <MarkdownEditor value={content} onChange={setContent} />
                </FormField>

                {/* ── Author info ────────────────────────────────────── */}
                <div className="border-t border-[#E5E5E5] pt-8">
                  <h2
                    className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#999999] mb-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    About you (optional)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Your name / handle" htmlFor="author-name">
                      <div className="relative flex items-center">
                        <User
                          size={14}
                          className="absolute left-4 text-[#aaaaaa] pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="author-name"
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Anonymous"
                          className="w-full h-11 border border-[#E5E5E5] bg-white pl-9 pr-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                    </FormField>

                    <FormField
                      label="Note to editors"
                      htmlFor="author-note"
                      hint="Context, sources, or anything useful for review"
                    >
                      <input
                        id="author-note"
                        type="text"
                        value={authorNote}
                        onChange={(e) => setAuthorNote(e.target.value)}
                        placeholder="e.g. Based on Nielsen & Chuang §6.3"
                        className="w-full h-11 border border-[#E5E5E5] bg-white px-4 text-[14px] text-[#1b1b1b] placeholder:text-[#aaaaaa] outline-none focus:border-[#000000] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </FormField>
                  </div>
                </div>

                {/* ── Error banner ───────────────────────────────────── */}
                <AnimatePresence>
                  {(status === "error" || errorMsg) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="flex items-start gap-3 p-4 border border-[#f3c1c1] bg-[#fff8f8]"
                      role="alert"
                    >
                      <AlertCircle size={16} className="text-[#ba1a1a] shrink-0 mt-0.5" aria-hidden="true" />
                      <p
                        className="text-[13px] text-[#ba1a1a]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {errorMsg || "Something went wrong. Please try again."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Submit ─────────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-[#E5E5E5] pt-8">
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={status !== "submitting" ? { scale: 1.01 } : {}}
                    whileTap={status !== "submitting" ? { scale: 0.99 } : {}}
                    className="flex items-center gap-3 bg-black text-white px-10 py-4 text-[14px] font-medium uppercase tracking-[0.02em] hover:bg-[#303030] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit for review
                        <ArrowRight size={16} aria-hidden="true" />
                      </>
                    )}
                  </motion.button>

                  <p
                    className="text-[12px] text-[#999999] leading-[160%] max-w-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    By submitting you agree to license your contribution under{" "}
                    <Link
                      href="https://creativecommons.org/licenses/by/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#000000] transition-colors"
                    >
                      CC BY 4.0
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="h-[1px] w-full" style={{ backgroundColor: "#E5E5E5" }} />
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer
          aria-label="Contribute page footer"
          className="px-8 py-[80px]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <div
                className="text-[32px] leading-[130%] tracking-[-0.01em] font-semibold text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                QWIKI
              </div>
              <p
                className="text-[16px] leading-[160%] text-[#5e5e5e] max-w-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A community-driven knowledge base exploring the frontiers of quantum science
                and computing.
              </p>
              <p
                className="mt-4 text-[14px] text-[#666666]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                © 2026 A MuLearn Foundation Initiative. All rights reserved.
                Organized by Quantum Technology Interest Group.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="col-span-12 md:col-span-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#666666] uppercase tracking-[0.02em] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Explore
                  </h3>
                  <ul className="space-y-3">
                    {["Wiki", "Categories", "Recent Changes", "Random Article"].map((l) => (
                      <li key={l}>
                        <Link
                          href={`/${l.toLowerCase().replace(/ /g, "-")}`}
                          className="text-[16px] leading-[160%] text-[#5e5e5e] hover:text-[#000000] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className="text-[14px] font-medium text-[#666666] uppercase tracking-[0.02em] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Contribute
                  </h3>
                  <ul className="space-y-3">
                    {["Start Writing", "Style Guide", "Community", "GitHub"].map((l) => (
                      <li key={l}>
                        <Link
                          href={`/${l.toLowerCase().replace(/ /g, "-")}`}
                          className="text-[16px] leading-[160%] text-[#5e5e5e] hover:text-[#000000] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}

// ── FormField helper ───────────────────────────────────────────────────────
function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={htmlFor}
          className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#444444]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label}
          {required && (
            <span className="text-[#a855f7] ml-1" aria-hidden="true">*</span>
          )}
        </label>
        {hint && (
          <span
            className="text-[11px] text-[#aaaaaa]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

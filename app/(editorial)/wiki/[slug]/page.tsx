import { createPublicClient } from "@/lib/supabase/public";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Clock, Calendar, User, ChevronRight } from "lucide-react";
import MonoChip from "@/components/MonoChip";
import SidebarNav from "@/components/SidebarNav";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { formatDate, readingTime } from "@/lib/utils";
import ScrollToHash from "@/components/ScrollToHash";

interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  updated_at: string;
  published: boolean;
  tags: string[];
  stars: number;
  editor_id?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("wiki_articles")
      .select("slug")
      .eq("published", true)
      .limit(200);
    return (data ?? []).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("wiki_articles")
      .select("title, excerpt")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!data) return { title: "Article not found — QWiki" };

    return {
      title: `${data.title} — QWiki`,
      description: data.excerpt,
    };
  } catch {
    return { title: "QWiki" };
  }
}
function extractHeadings(markdown: string) {
  const regex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const text = match[2].replace(/[*_`]/g, "");
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}
const DEMO_ARTICLE: WikiArticle = {
  id: "demo",
  slug: "quantum-entanglement",
  title: "Quantum Entanglement: Spooky Action at a Distance",
  excerpt:
    "Explore how two particles can share quantum states regardless of the distance separating them.",
  content: `## Introduction

Quantum entanglement is a phenomenon in quantum mechanics where two or more particles become **correlated** in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances.

## Mathematical Description

For a two-qubit system, an entangled state (Bell state) is written as:

\`\`\`
|Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩)
\`\`\`

This state cannot be factored into a product of individual qubit states, which is the defining characteristic of entanglement.

## EPR Paradox

In 1935, Einstein, Podolsky, and Rosen (EPR) published a thought experiment challenging quantum mechanics. They argued that if quantum mechanics were complete, it would violate the principle of **local realism**.

## Bell's Theorem

John Bell (1964) devised a mathematical inequality (Bell inequalities) that, if violated, would rule out local hidden variable theories. Experiments by Aspect et al. (1982) conclusively demonstrated these violations.

## Applications

- **Quantum Cryptography:** Quantum key distribution (QKD) using entangled photons
- **Quantum Teleportation:** Transfer of quantum states using entanglement + classical communication  
- **Quantum Computing:** Entanglement as a computational resource for quantum speedup

## See Also

- Bell States
- Quantum Teleportation
- Quantum Key Distribution
`,
  category: "Fundamentals",
  author: "QWiki Team",
  updated_at: new Date().toISOString(),
  published: true,
  tags: ["entanglement", "bell-states", "EPR", "foundations"],
  stars: 1204,
};
export default async function WikiArticlePage({ params }: Props) {
  const { slug } = await params;

  let article: WikiArticle | null = null;
  let editorName: string | null = null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && supabaseUrl !== "your-supabase-url") {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("wiki_articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        console.error("Supabase fetch error for slug:", slug, error);
        notFound();
      }
      article = data as WikiArticle;

      if (article.editor_id) {
        const { data: editorData } = await supabase
          .from("users")
          .select("display_name")
          .eq("id", article.editor_id)
          .single();
        if (editorData) {
          editorName = editorData.display_name;
        }
      }
    } catch (err) {
      console.error("Exception in article fetch:", err);
      notFound();
    }
  } else {
    article = slug === DEMO_ARTICLE.slug ? DEMO_ARTICLE : null;
    if (!article) notFound();
  }

  const headings = extractHeadings(article.content);
  const mins = readingTime(article.content);

  return (
    <>
      <Navbar />
      <ScrollToHash />
      <div className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-[1280px] mx-auto flex gap-0">

          <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] w-60 shrink-0">
            <SidebarNav activeSlug={slug} />
          </div>

          <main
            id="article-content"
            className="flex-1 min-w-0 px-0 lg:pl-8 lg:pr-6"
            aria-labelledby="article-title"
          >
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#666666] mb-5 sm:mb-6 mt-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
              <Link href="/" className="hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline shrink-0">Home</Link>
              <ChevronRight size={13} aria-hidden="true" className="shrink-0" />
              <Link href="/wiki" className="hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline shrink-0">Wiki</Link>
              <ChevronRight size={13} aria-hidden="true" className="shrink-0" />
              <span className="text-[#1b1b1b] truncate max-w-[200px] sm:max-w-none">{article.title}</span>
            </nav>

            {/* Article header */}
            <header className="mb-6 sm:mb-8">
              <MonoChip color="editorial" className="mb-3 sm:mb-4">{article.category}</MonoChip>

              <h1
                id="article-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-3 sm:mb-4 leading-tight break-words"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {article.title}
              </h1>

              <p
                className="text-[15px] sm:text-[17px] md:text-[18px] leading-[160%] text-[#4c4546] mb-5 sm:mb-6 max-w-3xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {article.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#E5E5E5]">
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#666666]" aria-label={`Author: ${article.author}`}>
                  <User size={14} aria-hidden="true" />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>
                    {article.author} {editorName && <span className="italic ml-1">| Edited by: {editorName}</span>}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#666666]" aria-label={`Last updated ${formatDate(article.updated_at)}`}>
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={article.updated_at} style={{ fontFamily: "'Inter', sans-serif" }}>
                    {formatDate(article.updated_at)}
                  </time>
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#666666]" aria-label={`${mins} minute read`}>
                  <Clock size={14} aria-hidden="true" />
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>{mins} min read</span>
                </span>
              </div>

              {/* Tags and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mt-4" aria-label="Article actions and tags">
                {article.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <MonoChip key={tag} color="editorial">#{tag}</MonoChip>
                    ))}
                  </div>
                )}
                
                <Link
                  href="/labs"
                  className="bg-transparent border border-[#cfc4c5] text-[#5e5e5e] px-4 sm:px-6 py-2 text-[11px] sm:text-[12px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:border-black hover:text-black hover:bg-[#f9f9f9] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Labs
                </Link>
              </div>
            </header>

            {/* Markdown content */}
            <article
              className="prose prose-slate max-w-none break-words"
              style={{
                "--tw-prose-body": "#333333",
                "--tw-prose-headings": "#000000",
                "--tw-prose-lead": "#4c4546",
                "--tw-prose-links": "#000000",
                "--tw-prose-code": "#000000",
                "--tw-prose-pre-bg": "#ffffff",
              } as React.CSSProperties}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
                components={{
                  h2: ({ children, ...props }) => (
                    <h2
                      {...props}
                      id={String(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}
                      className="text-xl sm:text-2xl font-bold text-[#000000] mt-8 sm:mt-10 mb-3 sm:mb-4 scroll-mt-24"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3
                      {...props}
                      id={String(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}
                      className="text-lg sm:text-xl font-semibold text-[#000000] mt-6 sm:mt-8 mb-2 sm:mb-3 scroll-mt-24"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p
                      className="text-[15px] sm:text-[16px] leading-[165%] text-[#333333] mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {children}
                    </p>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    return isBlock ? (
                      <code className={className}>{children}</code>
                    ) : (
                      <code
                        className="px-1.5 py-0.5 text-[#000000] text-xs sm:text-sm"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          backgroundColor: "#F9F9F9",
                          borderRadius: "0px",
                        }}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre
                      className="bg-white border border-[#E5E5E5] p-3 sm:p-5 overflow-x-auto text-xs sm:text-sm my-4 sm:my-6 max-w-full"
                      style={{ borderRadius: "0px" }}
                    >
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-[#000000] underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#000000]"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1.5 mb-4 text-[#333333] text-[15px] sm:text-[16px]">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1.5 mb-4 text-[#333333] text-[15px] sm:text-[16px]">{children}</ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#000000] pl-3 sm:pl-4 italic text-[#4c4546] my-4 sm:my-6 text-[15px] sm:text-[16px]">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>
          </main>

          {headings.length > 0 && (
            <aside
              aria-label="Table of contents"
              className="hidden xl:block sticky top-24 h-[calc(100vh-6rem)] w-56 shrink-0 pl-6"
            >
              <div className="border-l border-[#E5E5E5] pl-4 py-4">
                <h2
                  className="text-xs font-semibold text-[#666666] uppercase tracking-[0.02em] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  On this page
                </h2>
                <nav aria-label="On this page">
                  <ul className="space-y-1">
                    {headings.map((h) => (
                      <li key={h.id} style={{ paddingLeft: (h.level - 2) * 12 }}>
                        <a
                          href={`#${h.id}`}
                          className="block text-xs text-[#666666] hover:text-[#000000] py-1 transition-colors focus-visible:outline-none focus-visible:underline"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}

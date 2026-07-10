"use client";

import { useState, useTransition } from "react";
import { updateSubmission } from "@/app/actions/submissions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type EditSubmissionClientProps = {
  submission: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  };
};

export default function EditSubmissionClient({ submission }: EditSubmissionClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(submission.title);
  const [content, setContent] = useState(submission.content);
  const [tags, setTags] = useState(submission.tags.join(", "));
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    startTransition(async () => {
      try {
        await updateSubmission(submission.id, {
          title: title.trim(),
          content: content.trim(),
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        });
        router.push(`/dashboard/editorial/${submission.id}`);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to save changes.";
        setError(errMsg);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <header className="sticky top-0 z-20 border-b border-[#E5E5E5] bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href={`/dashboard/editorial/${submission.id}`}
              className="text-[12px] text-[#999999] hover:text-black transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Back to Review
            </Link>
            <h1 className="text-[14px] font-medium text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
              Editing Submission
            </h1>
          </div>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-2 text-[12px] font-medium uppercase tracking-[0.06em] text-white bg-black hover:bg-[#333] transition-colors disabled:opacity-50"
            style={{ borderRadius: 0, fontFamily: "'Inter', sans-serif" }}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 w-full max-w-[1600px] mx-auto flex flex-col gap-6">
        {error && (
          <div className="p-4 border border-[#f3c1c1] bg-[#fff8f8] text-[#ba1a1a] text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-[600px]">
          {/* LEFT: Editor */}
          <div className="flex flex-col gap-6 border-r border-[#E5E5E5] pr-8">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] text-[#666666] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-[#E5E5E5] px-4 py-2 text-[14px] outline-none focus:border-black transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] text-[#666666] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-[#E5E5E5] px-4 py-2 text-[14px] outline-none focus:border-black transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-[11px] uppercase tracking-[0.1em] text-[#666666] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Markdown Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full border border-[#E5E5E5] p-4 text-[14px] leading-[1.8] outline-none focus:border-black transition-colors resize-none"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div className="flex flex-col">
            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#666666] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              Live Preview
            </label>
            <div className="flex-1 border border-[#E5E5E5] p-8 overflow-y-auto bg-[#FAFAFA]">
              <article
                className="prose prose-slate max-w-none"
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
                        className="text-2xl font-bold text-[#000000] mt-10 mb-4 scroll-mt-24"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3
                        {...props}
                        className="text-xl font-semibold text-[#000000] mt-8 mb-3 scroll-mt-24"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p
                        className="text-[16px] leading-[160%] text-[#333333] mb-4"
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
                          className="px-1.5 py-0.5 text-[#000000] text-sm"
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
                        className="bg-white border border-[#E5E5E5] p-5 overflow-x-auto text-sm my-6"
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
                      <ul className="list-disc list-inside space-y-1.5 mb-4 text-[#333333]">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-[#333333]">{children}</ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-[#000000] pl-4 italic text-[#4c4546] my-6">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {content || "*Nothing to preview*"}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  BookOpen,
  Cpu,
  Zap,
  Layers,
  FlaskConical,
  Globe,
  Atom,
  GitBranch,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
const PROMPTS = [
  { eyebrow: "What are you curious about?", headline: "Search the quantum frontier." },
  { eyebrow: "The universe is non-classical.", headline: "Find your next discovery." },
  { eyebrow: "Superposition. Entanglement. Error correction.", headline: "It all starts here." },
  { eyebrow: "From qubits to algorithms.", headline: "Explore the knowledge base." },
  { eyebrow: "Science is a living document.", headline: "Read. Learn. Contribute." },
  { eyebrow: "Bell states, Shor, and beyond.", headline: "Your quantum reference." },
];
const INPUT_PLACEHOLDERS = [
  "Search quantum entanglement…",
  "Search superposition states…",
  "Search Shor's algorithm…",
  "Search qubit architectures…",
  "Search topological qubits…",
  "Search quantum error correction…",
  "Search Bell inequality…",
];
const CATEGORIES = [
  { label: "Fundamentals", icon: <BookOpen size={16} />, href: "/categories/fundamentals" },
  { label: "Computing", icon: <Cpu size={16} />, href: "/categories/computing" },
  { label: "Algorithms", icon: <Zap size={16} />, href: "/categories/algorithms" },
  { label: "Hardware", icon: <Layers size={16} />, href: "/categories/hardware" },
  { label: "Research", icon: <FlaskConical size={16} />, href: "/categories/research" },
  { label: "Applications", icon: <Globe size={16} />, href: "/categories/applications" },
  { label: "Photonics", icon: <Atom size={16} />, href: "/categories/photonics" },
  { label: "Cryptography", icon: <GitBranch size={16} />, href: "/categories/cryptography" },
];
interface SearchResult {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}
function WikiSearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const id = setInterval(
      () => setPhIdx((i) => (i + 1) % INPUT_PLACEHOLDERS.length),
      3200
    );
    return () => clearInterval(id);
  }, []);
  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6`, {
        signal: abortRef.current.signal,
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 350);
    return () => clearTimeout(t);
  }, [query, search]);

  const clear = () => { setQuery(""); setResults([]); inputRef.current?.focus(); };

  const isOpen = focused && results.length > 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          borderRadius: "0px",
          background: focused
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.10) 0%, transparent 70%)",
          transition: "background 0.5s ease",
          transform: "scaleY(1.6) translateY(8px)",
        }}
      />

      <motion.div
        animate={focused
          ? { boxShadow: "0 0 0 1px #a855f7, 0 0 32px 8px rgba(168,85,247,0.28), 0 4px 60px rgba(168,85,247,0.15)" }
          : { boxShadow: "0 0 0 1px #E5E5E5, 0 0 0px 0px rgba(168,85,247,0)" }
        }
        transition={{ duration: 0.35 }}
        className="relative flex items-center h-[68px] bg-white"
        style={{ borderRadius: "0px" }}
      >
        {/* Search icon */}
        <motion.div
          animate={{ color: focused ? "#a855f7" : "#666666" }}
          transition={{ duration: 0.25 }}
          className="absolute left-5 pointer-events-none"
          aria-hidden="true"
        >
          <Search size={22} />
        </motion.div>

        <label htmlFor="wiki-main-search" className="sr-only">
          Search the quantum wiki
        </label>
        <input
          ref={inputRef}
          id="wiki-main-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={INPUT_PLACEHOLDERS[phIdx]}
          aria-label="Search the quantum wiki"
          aria-expanded={isOpen}
          aria-controls="wiki-search-results"
          aria-autocomplete="list"
          role="combobox"
          className="flex-1 bg-transparent outline-none text-[#1b1b1b] placeholder:text-[#999999] text-[18px] px-[56px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />

        {/* Clear / spinner */}
        {query && (
          <button
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-5 p-1 text-[#666666] hover:text-[#000000] transition-colors"
          >
            {loading
              ? <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              : <X size={18} aria-hidden="true" />
            }
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="wiki-search-results"
            role="listbox"
            aria-label="Search results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 bg-white border border-[#E5E5E5] overflow-hidden"
            style={{
              boxShadow: "0 8px 40px rgba(168,85,247,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {results.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                role="option"
                aria-selected="false"
              >
                <Link
                  href={`/wiki/${r.slug}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#f9f9f9] transition-colors group border-b border-[#f3f3f3] last:border-0"
                  onClick={() => { setFocused(false); setQuery(""); }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#a855f7] mt-0.5 shrink-0"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {r.category}
                    </span>
                    <div>
                      <p
                        className="text-[14px] font-medium text-[#1b1b1b] leading-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="text-[12px] text-[#666666] line-clamp-1 mt-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {r.excerpt}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-[#cccccc] group-hover:text-[#000000] transition-colors shrink-0 ml-4"
                    aria-hidden="true"
                  />
                </Link>
              </motion.li>
            ))}

            {/* View all link */}
            <li>
              <Link
                href={`/wiki?q=${encodeURIComponent(query)}`}
                className="flex items-center justify-center gap-2 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.05em] text-[#666666] hover:text-[#000000] hover:bg-[#f9f9f9] transition-colors border-t border-[#E5E5E5]"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={() => setFocused(false)}
              >
                View all results for &ldquo;{query}&rdquo;
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function WikiHomePage() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPromptIdx((i) => (i + 1) % PROMPTS.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const prompt = PROMPTS[promptIdx];

  return (
    <>
      <Navbar />

      <main id="main-content" style={{ backgroundColor: "#ffffff" }}>

        <section
          aria-labelledby="wiki-search-heading"
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-20 overflow-hidden"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Subtle ambient orb — top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 65%)",
            }}
          />
          {/* Subtle ambient orb — bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 w-full max-w-[860px] mx-auto flex flex-col items-center text-center">

            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[12px] text-[#999999] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Link href="/" className="hover:text-[#000000] transition-colors">Home</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-[#1b1b1b]">Wiki</span>
            </motion.nav>

            <div
              className="mb-12 min-h-[120px] flex flex-col items-center justify-end"
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                {visible && (
                  <motion.div
                    key={promptIdx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.38, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    {/* Eyebrow */}
                    <span
                      className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#a855f7]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {prompt.eyebrow}
                    </span>

                    {/* Headline */}
                    <h1
                      id="wiki-search-heading"
                      className="text-[clamp(2.2rem,5.5vw,64px)] leading-[110%] font-semibold text-black tracking-[-0.03em]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {(() => {
                        const words = prompt.headline.split(" ");
                        const lastWord = words.pop();
                        const rest = words.join(" ");
                        return (
                          <>
                            {rest}{rest.length > 0 ? " " : ""}
                            <span style={{ color: "#7e22ce" }}>{lastWord}</span>
                          </>
                        );
                      })()}
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full"
            >
              <WikiSearchBar />
            </motion.div>

            {/* Keyboard hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 text-[12px] text-[#aaaaaa]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Press{" "}
              <kbd
                className="px-1.5 py-0.5 border border-[#E5E5E5] text-[11px] text-[#666666]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                /
              </kbd>{" "}
              to focus · Browse by category below
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap justify-center gap-2 mt-10"
              aria-label="Browse by category"
            >
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href}>
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 border border-[#E5E5E5] text-[#666666] hover:border-[#000000] hover:text-[#000000] hover:bg-[#f9f9f9] transition-all cursor-pointer uppercase tracking-[0.05em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cat.icon}
                    {cat.label}
                  </motion.span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="h-[1px] w-full" style={{ backgroundColor: "#E5E5E5" }} />
        </div>

        <footer
          aria-label="Wiki footer"
          className="px-8 py-[80px]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6">
              <div
                className="text-[32px] leading-[130%] tracking-[-0.01em] font-semibold text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                BEYOND CLASSICAL
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
                          className="text-[16px] leading-[160%] text-[#5e5e5e] hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline"
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
                          className="text-[16px] leading-[160%] text-[#5e5e5e] hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline"
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

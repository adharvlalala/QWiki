"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PLACEHOLDER_CYCLE = [
  "Search quantum entanglement…",
  "Search superposition states…",
  "Search Shor's algorithm…",
  "Search qubit architectures…",
  "Search topological qubits…",
  "Search quantum error correction…",
];

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

interface SearchBarProps {
  className?: string;
  size?: "sm" | "lg";
  placeholder?: string;
}

export default function SearchBar({
  className,
  size = "lg",
  placeholder,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => {
    if (placeholder) return;
    const id = setInterval(
      () => setPlaceholderIdx((i) => (i + 1) % PLACEHOLDER_CYCLE.length),
      3000
    );
    return () => clearInterval(id);
  }, [placeholder]);
  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&limit=5`,
        { signal: abortRef.current.signal }
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 350);
    return () => clearTimeout(t);
  }, [query, search]);

  const clear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  const currentPlaceholder = placeholder ?? PLACEHOLDER_CYCLE[placeholderIdx];

  return (
    <div className={cn("relative w-full", className)}>
      
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          size === "lg" ? "h-14" : "h-10",
          !focused && "bg-[#f9f9f9] border border-[#E5E5E5]",
          focused && [
            "bg-white",
            "border border-[#000000]",
          ]
        )}
      >
        <Search
          size={size === "lg" ? 18 : 14}
          className={cn(
            "absolute left-4 transition-colors duration-300",
            focused ? "text-[#000000]" : "text-[#666666]"
          )}
          aria-hidden="true"
        />

        <label htmlFor="hero-search" className="sr-only">
          Search quantum wiki articles
        </label>
        <input
          ref={inputRef}
          id="hero-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={currentPlaceholder}
          aria-label="Search quantum wiki articles"
          aria-expanded={focused && results.length > 0}
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
          className={cn(
            "flex-1 bg-transparent outline-none",
            "placeholder:text-[#666666] text-[#1b1b1b]",
            size === "lg"
              ? "px-12 text-base"
              : "px-10 text-sm",
            "transition-placeholder duration-500"
          )}
          style={{ fontFamily: "'Inter', sans-serif" }}
        />

        {query && (
          <button
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-4 p-1 text-[#666666] hover:text-[#000000] hover:bg-[#f9f9f9] transition-colors"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <X size={16} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.ul
            id="search-results"
            role="listbox"
            aria-label="Search results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 bg-white border border-[#E5E5E5] overflow-hidden"
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
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f9f9] transition-colors group"
                  onClick={() => { setFocused(false); setQuery(""); }}
                >
                  <div>
                    <p className="text-sm font-medium text-[#1b1b1b]">{r.title}</p>
                    <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">{r.excerpt}</p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-[#666666] group-hover:text-[#000000] transition-colors shrink-0 ml-3"
                    aria-hidden="true"
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

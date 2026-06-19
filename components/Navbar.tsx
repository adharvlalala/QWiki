"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/wiki", label: "Wiki" },
  { href: "/contribute", label: "Contribute" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ─────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "bg-white border-b border-[#E5E5E5]",
          "transition-all duration-300",
        )}
        role="banner"
      >
        <nav
          className="flex items-center gap-4 px-8 py-4 max-w-[1280px] mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:underline"
            aria-label="QWiki — Home"
          >
            <span
              className="font-bold text-lg text-black tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              QWIKI
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 ml-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium",
                  "text-[#5e5e5e] hover:text-[#000000]",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:underline",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search bar */}
          <div className="relative hidden sm:flex items-center">
            <label htmlFor="navbar-search" className="sr-only">
              Search wiki articles
            </label>
            <motion.div
              animate={searchFocused ? { width: 280 } : { width: 200 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
                aria-hidden="true"
              />
              <input
                id="navbar-search"
                type="search"
                placeholder="Search articles…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search wiki articles"
                className={cn(
                  "w-full pl-8 pr-4 py-1.5 text-sm",
                  "bg-[#f9f9f9] text-[#1b1b1b] placeholder:text-[#666666]",
                  "border border-[#E5E5E5]",
                  "transition-all duration-300",
                  "focus:outline-none focus:bg-white",
                  "focus:border-[#000000]",
                )}
              />
            </motion.div>
          </div>

          {/* Connect button */}
          <Link
            href="/about"
            className={cn(
              "hidden md:flex items-center gap-1 px-6 py-2 text-sm font-medium",
              "bg-black text-white",
              "uppercase tracking-[0.02em]",
              "transition-all duration-300",
              "hover:bg-[#303030]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
            )}
          >
            Connect
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={cn(
              "md:hidden p-2 text-[#1b1b1b]",
              "hover:bg-[#f9f9f9]",
              "focus-visible:outline-none focus-visible:underline",
              "transition-colors"
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white border-l border-[#E5E5E5] flex flex-col pt-24 px-6 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile search */}
              <div className="relative mb-6">
                <label htmlFor="mobile-search" className="sr-only">Search wiki articles</label>
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
                  aria-hidden="true"
                />
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Search…"
                  className="w-full pl-8 pr-4 py-2 text-sm bg-[#f9f9f9] border border-[#E5E5E5] focus:border-[#000000] focus:outline-none"
                />
              </div>

              {/* Nav links */}
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-[#1b1b1b] font-medium hover:bg-[#f9f9f9] transition-colors"
                      >
                        {link.label}
                        <ChevronRight size={16} className="text-[#666666]" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 font-medium bg-black text-white uppercase tracking-[0.02em]"
                >
                  Connect
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

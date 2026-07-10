"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/wiki", label: "Wiki" },
  { href: "/categories", label: "Categories" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
      {/* ── Desktop / Tablet Navbar ─────────────────────────────────────── */}
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
          className="relative grid grid-cols-3 items-center px-8 py-4 max-w-[1280px] mx-auto"
          aria-label="Main navigation"
        >
          {/* ── LEFT: Nav Links ───────────────────────────────── */}
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-medium",
                    "text-[#5e5e5e] hover:text-[#000000]",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:underline",
                  )}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── CENTER: Brand Logo (absolutely positioned for true center) ── */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:underline"
              aria-label="QWiki — Home"
            >
              <span
                className="font-bold text-[15px] text-black tracking-[-0.01em] uppercase"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                BEYOND CLASSICAL
              </span>
            </Link>
          </div>

          {/* ── RIGHT: Login / Contribute + Search ──────────────────────────────── */}
          <div className="flex items-center justify-end gap-1">
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/login"
                id="navbar-login"
                className={cn(
                  "relative overflow-hidden flex items-center justify-center text-[13px] font-bold text-black uppercase tracking-[0.04em]",
                  "px-4 py-2 bg-[#00fa9a] border-2 border-black shadow-[4px_4px_0px_#000000]",
                  "transition-all duration-150",
                  "hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000000]",
                  "active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_#000000]",
                  "focus-visible:outline-none focus-visible:underline"
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="relative z-10">LOGIN/CONTRIBUTE</span>
                <div className="absolute top-0 bottom-0 w-[150%] left-[-150%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-0 animate-glare" />
              </Link>
            </div>

            {/* Search bar */}
            <div className="relative hidden sm:flex items-center ml-2">
              <label htmlFor="navbar-search" className="sr-only">
                Search wiki articles
              </label>
              <motion.div
                animate={searchFocused ? { width: 220 } : { width: 160 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <Search
                  size={13}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666666]"
                  aria-hidden="true"
                />
                <input
                  id="navbar-search"
                  type="search"
                  placeholder="Search…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  aria-label="Search wiki articles"
                  className={cn(
                    "w-full pl-7 pr-3 py-1.5 text-[12px]",
                    "bg-[#f9f9f9] text-[#1b1b1b] placeholder:text-[#999999]",
                    "border border-[#E5E5E5]",
                    "transition-all duration-300",
                    "focus:outline-none focus:bg-white",
                    "focus:border-[#000000]",
                  )}
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: 0 }}
                />
              </motion.div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className={cn(
                "md:hidden p-2 text-[#1b1b1b] ml-2",
                "hover:bg-[#f9f9f9]",
                "focus-visible:outline-none focus-visible:underline",
                "transition-colors"
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ──────────────────────────────────── */}
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
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
                  aria-hidden="true"
                />
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Search…"
                  className="w-full pl-7 pr-3 py-2 text-[13px] bg-[#f9f9f9] border border-[#E5E5E5] focus:border-[#000000] focus:outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: 0 }}
                />
              </div>

              {/* Nav links */}
              <nav aria-label="Mobile navigation">
                <ul className="space-y-0">
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
                        className="flex items-center justify-between px-4 py-3 text-[#1b1b1b] font-medium border-b border-[#E5E5E5] hover:bg-[#f9f9f9] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                        <ChevronRight size={16} className="text-[#666666]" aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="relative overflow-hidden flex items-center justify-center w-full px-4 py-3 text-[13px] font-bold bg-[#00fa9a] border-2 border-black text-black uppercase tracking-[0.04em] shadow-[4px_4px_0px_#000000] transition-all duration-150 active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0px_#000000]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">LOGIN/CONTRIBUTE</span>
                  <div className="absolute top-0 bottom-0 w-[150%] left-[-150%] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-0 animate-glare" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

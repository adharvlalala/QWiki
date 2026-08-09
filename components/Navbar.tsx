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
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const spotlightEl = document.getElementById("home-event-spotlight");
      if (spotlightEl) {
        const rect = spotlightEl.getBoundingClientRect();
        const navHeight = 72;

        const isOverSpotlight = rect.top <= navHeight && rect.bottom >= navHeight;
        setIsDarkSection(isOverSpotlight);
      } else {
        setIsDarkSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
   
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isDarkSection
            ? "bg-[#0c0a18] border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-white border-b border-[#E5E5E5]",
        )}
        role="banner"
      >
        <nav
          className="relative grid grid-cols-3 items-center px-8 py-4 max-w-[1280px] mx-auto"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-300",
                    isDarkSection
                      ? "text-white/70 hover:text-[#c084fc]"
                      : "text-[#5e5e5e] hover:text-[#000000]",
                    "focus-visible:outline-none focus-visible:underline",
                  )}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="focus-visible:outline-none focus-visible:underline"
              aria-label="QWiki — Home"
            >
              <span
                className={cn(
                  "font-bold text-[15px] tracking-[-0.01em] uppercase transition-all duration-500",
                  isDarkSection ? "text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "text-black"
                )}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                BEYOND CLASSICAL
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-1">
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/login"
                id="navbar-login"
                className={cn(
                  "flex items-center justify-center text-[13px] font-medium px-4 py-1.5 rounded-full transition-all duration-300",
                  isDarkSection
                    ? "text-white border border-white/20 hover:bg-[#c084fc]/15 hover:border-[#c084fc] hover:text-[#c084fc] hover:shadow-[0_0_15px_rgba(192,132,252,0.3)]"
                    : "text-black border border-[#E5E5E5] hover:bg-[#f9f9f9] hover:border-[#D1D1D1]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>Login / Contribute</span>
              </Link>
            </div>

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
                  className={cn(
                    "absolute left-2.5 top-1/2 -translate-y-1/2 transition-colors duration-300",
                    isDarkSection ? "text-white/50" : "text-[#666666]"
                  )}
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
                    "w-full pl-7 pr-3 py-1.5 text-[12px] transition-all duration-300",
                    isDarkSection
                      ? "bg-white/10 text-white placeholder:text-white/40 border border-white/15 focus:bg-white/15 focus:border-[#a855f7]"
                      : "bg-[#f9f9f9] text-[#1b1b1b] placeholder:text-[#999999] border border-[#E5E5E5] focus:bg-white focus:border-[#000000]",
                    "focus:outline-none"
                  )}
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: 0 }}
                />
              </motion.div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className={cn(
                "md:hidden p-2 ml-2 transition-colors duration-300",
                isDarkSection
                  ? "text-white hover:bg-white/10"
                  : "text-[#1b1b1b] hover:bg-[#f9f9f9]",
                "focus-visible:outline-none focus-visible:underline"
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

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
            className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "absolute right-0 top-0 bottom-0 w-72 border-l flex flex-col pt-24 px-6 pb-8 transition-colors duration-500",
                isDarkSection
                  ? "bg-[#0c0a18] border-white/10 text-white"
                  : "bg-white border-[#E5E5E5] text-[#1b1b1b]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="relative mb-6">
                <label htmlFor="mobile-search" className="sr-only">Search wiki articles</label>
                <Search
                  size={13}
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2",
                    isDarkSection ? "text-white/50" : "text-[#666666]"
                  )}
                  aria-hidden="true"
                />
                <input
                  id="mobile-search"
                  type="search"
                  placeholder="Search…"
                  className={cn(
                    "w-full pl-7 pr-3 py-2 text-[13px] border focus:outline-none transition-all",
                    isDarkSection
                      ? "bg-white/10 text-white placeholder:text-white/40 border-white/15 focus:border-[#a855f7]"
                      : "bg-[#f9f9f9] text-[#1b1b1b] border-[#E5E5E5] focus:border-[#000000]"
                  )}
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: 0 }}
                />
              </div>

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
                        className={cn(
                          "flex items-center justify-between px-4 py-3 font-medium border-b transition-colors",
                          isDarkSection
                            ? "text-white/80 border-white/10 hover:bg-white/5 hover:text-[#c084fc]"
                            : "text-[#1b1b1b] border-[#E5E5E5] hover:bg-[#f9f9f9]"
                        )}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                        <ChevronRight size={16} className={isDarkSection ? "text-white/40" : "text-[#666666]"} aria-hidden="true" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-center w-full px-4 py-3 text-[13px] font-medium border rounded-lg transition-all duration-300 focus-visible:outline-none",
                    isDarkSection
                      ? "text-white border-white/20 hover:bg-[#c084fc]/15 hover:border-[#c084fc] hover:text-[#c084fc]"
                      : "text-black border-[#E5E5E5] hover:bg-[#f9f9f9]"
                  )}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Login / Contribute</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

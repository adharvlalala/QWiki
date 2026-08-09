"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#why", label: "Mission" },
  { href: "#guests", label: "Guests" },
  { href: "#schedule", label: "Schedule" },
];

export default function QtmNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 70; // height of sticky navbar + breathing room
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "#090710",
          borderBottom: "1px solid #333333",
        }}
        role="banner"
      >
        <nav
          className="flex justify-between items-center px-6 md:px-8 h-14 max-w-[1400px] mx-auto"
          aria-label="Quantum Tech Matrix navigation"
        >
          {/* LEFT: Brand Wordmark */}
          <div className="flex items-center">
            <Link href="https://quantum-tech-matrix.mulearn.org/" className="focus-visible:outline-none" aria-label="Quantum Tech Matrix">
              <span
                className="font-black text-[13px] md:text-[14px] text-white tracking-[0.18em] uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                QUANTUM TECH MATRIX
              </span>
            </Link>
          </div>

          {/* RIGHT: Nav links & Contact Dropdown */}
          <div className="flex items-center gap-0">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href.substring(1))}
                  className="px-4 h-14 flex items-center text-[12px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3] transition-colors duration-100 hover:text-[#FFFFFF] hover:bg-[#120F1C] focus-visible:outline-none"
                  style={{ fontFamily: "var(--font-display)", borderRight: "1px solid #333333" }}
                >
                  {link.label}
                </a>
              ))}
              {/* Contact Dropdown */}
              <div className="relative group h-14 flex items-center">
                <button
                  className="px-4 h-14 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#A3A3A3] transition-colors duration-100 group-hover:text-[#FFFFFF] group-hover:bg-[#120F1C] focus-visible:outline-none cursor-pointer"
                  style={{ fontFamily: "var(--font-display)", borderRight: "1px solid #333333" }}
                >
                  Contact <ChevronDown size={14} className="text-[#A3A3A3] group-hover:text-white transition-colors" />
                </button>
                <div className="absolute top-14 left-0 w-48 bg-[#090710] border border-[#333333] border-t-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col z-50 shadow-2xl">
                  <a href="https://wa.me/917510630753" target="_blank" rel="noopener noreferrer" className="px-4 py-3 text-[11px] font-bold text-[#A3A3A3] hover:text-[#00fa9a] hover:bg-[#120F1C] border-b border-[#333333] transition-colors uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-display)" }}>
                    Akhila Sunesh
                  </a>
                  <a href="https://wa.me/918921915789" target="_blank" rel="noopener noreferrer" className="px-4 py-3 text-[11px] font-bold text-[#A3A3A3] hover:text-[#00fa9a] hover:bg-[#120F1C] transition-colors uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-display)" }}>
                    Adharvlal
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-[#A3A3A3] hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog" aria-label="Navigation" aria-modal="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "rgba(9,7,16,0.9)" }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="absolute right-0 top-0 bottom-0 w-64 flex flex-col pt-16"
              style={{ backgroundColor: "#090710", borderLeft: "1px solid #333333" }}
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href.substring(1))}
                  className="px-6 py-4 text-[13px] font-bold text-[#A3A3A3] uppercase tracking-[0.1em] hover:text-white hover:bg-[#120F1C] transition-colors"
                  style={{ fontFamily: "var(--font-display)", borderBottom: "1px solid #333333" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Contact Section */}
              <div className="px-6 py-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-[13px] font-bold text-white uppercase tracking-[0.1em]">Contact</span>
                <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#333333]">
                  <a href="https://wa.me/917510630753" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-[#A3A3A3] hover:text-[#00fa9a] uppercase tracking-[0.1em] transition-colors">
                    Akhila Sunesh
                  </a>
                  <a href="https://wa.me/918921915789" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-[#A3A3A3] hover:text-[#00fa9a] uppercase tracking-[0.1em] transition-colors">
                    Adharvlal
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Zap,
  FlaskConical,
  Layers,
  BookOpen,
  Globe,
  Atom,
  GitBranch,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import HeroParticles from "@/components/HeroParticles";
import HomeEventSpotlight from "@/components/HomeEventSpotlight";

const CATEGORIES = [
  { label: "Fundamentals", icon: <BookOpen size={20} />, color: "#000000" },
  { label: "Computing", icon: <Cpu size={20} />, color: "#000000" },
  { label: "Algorithms", icon: <Zap size={20} />, color: "#000000" },
  { label: "Hardware", icon: <Layers size={20} />, color: "#000000" },
  { label: "Research", icon: <FlaskConical size={20} />, color: "#000000" },
  { label: "Applications", icon: <Globe size={20} />, color: "#000000" },
  { label: "Photonics", icon: <Atom size={20} />, color: "#000000" },
  { label: "Cryptography", icon: <GitBranch size={20} />, color: "#000000" },
];
export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main id="main-content" className="relative z-10">
        <section
          aria-labelledby="hero-heading"
          className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-28 pb-20 overflow-hidden"
          style={{ backgroundColor: "#ffffff", position: "relative" }}
        >
          <HeroParticles />
          <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-1.5 mb-8"
              >
                {/* Version badge row */}
                <div className="inline-flex items-center gap-2">
                  <span
                    className="inline-flex items-center text-xs font-medium px-2 py-0.5 border border-[#E5E5E5] text-[#000000] uppercase tracking-[0.05em]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    V1.0.0 Alpha
                  </span>
                  <span className="text-xs text-[#666666]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    knowledge base initialized
                  </span>
                </div>
                {/* Quiet event signal — contextual, not a popup */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7e22ce] flex-shrink-0" />
                  <span className="text-xs text-[#999]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    QTM concluded ·{" "}
                    <Link
                      href="#home-event-spotlight"
                      className="text-[#7e22ce] hover:underline"
                    >
                      see how QWiki was born ↓
                    </Link>
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-black mb-6 leading-[110%]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 72px)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                Navigate the
                <br />
                <span style={{ color: "#7e22ce" }}>
                  Quantum Frontier.
                </span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[18px] leading-[160%] text-[#4c4546] max-w-lg mb-10"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A living knowledge base for quantum computing, mechanics, and information
                science. Structured clarity meets quantum-era intelligence.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14"
              >
                <Link
                  href="/wiki/quantum-entanglement"
                  className="bg-black text-white px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors text-center flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-label="Start exploring the wiki"
                >
                  Start Exploring
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/labs"
                  className="bg-transparent border border-black text-black px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#f9f9f9] transition-colors text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-label="Explore labs"
                >
                  Explore LABS
                </Link>
              </motion.div>
            </div>

            {/* Search bar — right column */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-md"
              >
                <SearchBar size="lg" />

                {/* Suggestion chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Entanglement", "Qubits", "Shor's", "NISQ", "Bell States"].map((s) => (
                    <Link key={s} href={`/wiki/${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center text-xs font-medium px-2 py-0.5 border border-[#E5E5E5] text-[#000000] hover:bg-[#f9f9f9] transition-colors cursor-pointer uppercase tracking-[0.05em]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {s}
                      </motion.span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <HomeEventSpotlight />

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="h-[1px] w-full" style={{ backgroundColor: "#E5E5E5" }} />
        </div>

        <section
          aria-labelledby="categories-heading"
          className="px-8 py-[160px]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2
                id="categories-heading"
                className="text-[48px] leading-[120%] tracking-[-0.02em] font-semibold text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Browse by Category
              </h2>
              <span
                className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase hidden md:block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                01 — 08
              </span>
            </div>

            <div className="border-t border-[#E5E5E5]">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/categories/${cat.label.toLowerCase()}`}
                    aria-label={cat.label}
                    className="flex items-center justify-between py-6 px-4 border-b border-[#E5E5E5] hover:bg-[#f9f9f9] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center text-[#666666] group-hover:text-black transition-colors"
                        aria-hidden="true"
                      >
                        {cat.icon}
                      </div>
                      <span
                        className="text-[24px] leading-[140%] font-medium text-black group-hover:pl-2 transition-all duration-300"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}. {cat.label}
                      </span>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-[#5e5e5e] group-hover:text-black transition-colors"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1280px] mx-auto px-8">
          <div className="h-[1px] w-full" style={{ backgroundColor: "#E5E5E5" }} />
        </div>

        <footer
          aria-label="Site footer"
          className="relative px-8 py-[160px]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8">
            {/* Brand */}
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
                © 2025 QWiki · CC BY 4.0
              </p>
            </div>

            {/* Links */}
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

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

export default function CategoriesPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="relative z-10 pt-24">
        <section
          aria-labelledby="categories-heading"
          className="px-8 pt-8 pb-[80px] md:pb-[120px]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span
                className="inline-flex items-center text-xs font-medium px-2 py-0.5 border border-[#E5E5E5] text-[#000000] uppercase tracking-[0.05em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Directory
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
            >
              <div>
                <h1
                  id="categories-heading"
                  className="text-[48px] md:text-[64px] leading-[110%] tracking-[-0.02em] font-semibold text-black mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  All Categories
                </h1>
                <p
                  className="text-[18px] leading-[160%] text-[#4c4546] max-w-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Explore the breadth of quantum knowledge. From fundamental principles to cutting-edge research.
                </p>
              </div>
              <span
                className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase hidden md:block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                01 — {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="h-full"
                >
                  <Link
                    href={`/categories/${cat.label.toLowerCase()}`}
                    aria-label={cat.label}
                    className="flex flex-col items-start justify-between h-full p-8 border border-[#E5E5E5] bg-white hover:bg-black hover:border-black transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-16">
                      <div
                        className="w-10 h-10 flex items-center justify-center text-black group-hover:text-white transition-colors"
                        aria-hidden="true"
                      >
                        {cat.icon}
                      </div>
                      <span
                        className="text-[12px] font-medium text-[#888888] group-hover:text-[#bbbbbb] transition-colors uppercase tracking-[0.05em]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <span
                        className="text-[20px] md:text-[22px] leading-[140%] font-medium text-black group-hover:text-white transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {cat.label}
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-black opacity-0 group-hover:opacity-100 group-hover:text-white transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                        aria-hidden="true"
                      />
                    </div>
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
          className="relative px-8 py-[120px] md:py-[160px]"
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

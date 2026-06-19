"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Interactive Row Component ────────────────────────────────────────── */
function IndexRow({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="editorial-interactive-row border-b border-[#cfc4c5] py-8 px-4 cursor-pointer group">
      <div className="flex justify-between items-center">
        <h3
          className="text-[32px] leading-[130%] tracking-[-0.01em] font-medium text-black group-hover:pl-4 transition-all duration-300"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {number}. {title}
        </h3>
        <span className="material-symbols-outlined text-[#5e5e5e] group-hover:text-black transition-colors">
          arrow_forward
        </span>
      </div>
      <div className="editorial-interactive-row-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 md:col-start-7">
            <p
              className="text-[16px] leading-[160%] text-[#4c4546]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Material Symbols font (for arrow icons) */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .editorial-interactive-row {
          transition: background-color 0.3s ease;
        }
        .editorial-interactive-row:hover {
          background-color: #f9f9f9;
        }
        .editorial-interactive-row-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
        }
        .editorial-interactive-row:hover .editorial-interactive-row-content {
          max-height: 200px;
          opacity: 1;
          margin-top: 1rem;
        }
      `}</style>

      {/* ── TopNavBar ───────────────────────────────────────────────── */}
      <nav className="w-full top-0 border-b border-[#cfc4c5]" style={{ backgroundColor: "#ffffff" }}>
        <div className="flex justify-between items-center h-20 px-8 max-w-[1280px] mx-auto">
          <Link
            href="/about"
            className="text-[24px] leading-[140%] font-bold text-black"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            QUANTUM INITIATIVE
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#principles"
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-black border-b border-black pb-1 cursor-pointer active:opacity-70 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Principles
            </a>
            <a
              href="#curriculum"
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e] hover:text-black cursor-pointer active:opacity-70 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Curriculum
            </a>
            <a
              href="#research"
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e] hover:text-black cursor-pointer active:opacity-70 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Research
            </a>
            <a
              href="#archive"
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e] hover:text-black cursor-pointer active:opacity-70 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Archive
            </a>
          </div>

          <Link
            href="/"
            className="hidden md:block bg-black text-white px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore Wiki
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-black">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#cfc4c5] px-8 py-6 flex flex-col gap-4" style={{ backgroundColor: "#ffffff" }}>
            <a
              href="#principles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-black"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Principles
            </a>
            <a
              href="#curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Curriculum
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Research
            </a>
            <a
              href="#archive"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-[#5e5e5e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Archive
            </a>
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase text-center mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Explore Wiki
            </Link>
          </div>
        )}
      </nav>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main>
        {/* ── Hero Section ────────────────────────────────────────── */}
        <section
          id="principles"
          className="max-w-[1280px] mx-auto px-8 py-[160px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[819px]"
        >
          <div className="md:col-span-6 flex flex-col items-start justify-center">
            {/* Mobile heading */}
            <h1
              className="text-[48px] leading-[110%] font-semibold text-black mb-6 md:hidden"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Advancing the Quantum Frontier.
            </h1>
            {/* Desktop heading */}
            <h1
              className="hidden md:block text-[120px] leading-[110%] tracking-[-0.04em] font-semibold text-black mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Advancing the Quantum Frontier.
            </h1>

            <p
              className="text-[18px] leading-[160%] text-[#4c4546] max-w-lg mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A rigorous academic framework dedicated to the fundamental
              principles and transformative potential of quantum mechanics,
              computing, and information theory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="bg-black text-white px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors text-center w-full sm:w-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore Curriculum
              </Link>
              <a
                href="#research"
                className="bg-transparent border border-black text-black px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#f3f3f3] transition-colors text-center w-full sm:w-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Research Papers
              </a>
              <Link
                href="/labs"
                className="bg-transparent border border-[#cfc4c5] text-[#5e5e5e] px-8 py-4 text-[14px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:border-black hover:text-black hover:bg-[#f9f9f9] transition-colors text-center w-full sm:w-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore Labs
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#f9f9f9" }}>
            {/* Geometric pattern overlay */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+Cjxwb2x5Z29uIHBvaW50cz0iMCA0MCA0MCAwIDQwIDQwIiBmaWxsPSIjZjNmM2YzIiAvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+")`,
              }}
            />
            <Image
              src="/quantum-abstract.png"
              alt="Abstract visualization of quantum wave interference patterns"
              fill
              className="object-cover mix-blend-luminosity opacity-30"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* ── Mission & Vision ────────────────────────────────────── */}
        <section id="research" className="max-w-[1280px] mx-auto px-8 py-[160px]">
          {/* Top divider */}
          <div className="h-[1px] w-full mb-[160px]" style={{ backgroundColor: "#E5E5E5" }} />

          {/* Quote block */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-[160px]">
            <h2
              className="text-[48px] leading-[120%] tracking-[-0.02em] font-semibold text-black mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              &ldquo;To construct a coherent structural understanding of quantum
              phenomena, prioritizing intellectual rigor over decorative
              complexity.&rdquo;
            </h2>
            <p
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase mt-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              The Primary Directive
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 border-t border-[#cfc4c5] pt-8">
              <h3
                className="text-[24px] leading-[140%] font-medium text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Vision
              </h3>
              <p
                className="text-[16px] leading-[160%] text-[#4c4546]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Establishing a global standard for quantum education through
                transparent methodologies, open-source computational models, and
                peer-reviewed architectural frameworks.
              </p>
            </div>
            <div className="md:col-span-4 border-t border-[#cfc4c5] pt-8">
              <h3
                className="text-[24px] leading-[140%] font-medium text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Methodology
              </h3>
              <p
                className="text-[16px] leading-[160%] text-[#4c4546]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our approach strips away the superficial, focusing entirely on
                mathematical precision and reproducible experimental validation
                within controlled environments.
              </p>
            </div>
            <div className="md:col-span-4 border-t border-[#cfc4c5] pt-8">
              <h3
                className="text-[24px] leading-[140%] font-medium text-black mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Impact
              </h3>
              <p
                className="text-[16px] leading-[160%] text-[#4c4546]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Translating theoretical physics into applicable technological
                paradigms that define the next generation of computational
                infrastructure.
              </p>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="h-[1px] w-full mt-[160px]" style={{ backgroundColor: "#E5E5E5" }} />
        </section>

        {/* ── Index (Interactive List) ────────────────────────────── */}
        <section id="curriculum" className="max-w-[1280px] mx-auto px-8 py-[160px]">
          <div className="flex justify-between items-end mb-16">
            <h2
              className="text-[72px] leading-[110%] tracking-[-0.03em] font-semibold text-black"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Index
            </h2>
            <span
              className="text-[14px] leading-[100%] tracking-[0.02em] font-medium text-[#5e5e5e] uppercase hidden md:block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              01 — 04
            </span>
          </div>

          <div className="border-t border-[#cfc4c5]" id="archive">
            <IndexRow
              number="01"
              title="Algorithmic Foundations"
              description="Comprehensive analysis of quantum gates, circuit design, and error correction protocols. This module establishes the baseline mathematical vocabulary required for advanced study."
            />
            <IndexRow
              number="02"
              title="Hardware Architecture"
              description="Examination of physical qubit implementation, from superconducting loops to trapped ions. Focuses on coherence times, fidelity measurements, and cryogenic engineering constraints."
            />
            <IndexRow
              number="03"
              title="Cryptographic Implications"
              description="Evaluating Shor's algorithm impact on RSA and elliptical curve cryptography. Post-quantum cryptographic standards and lattice-based security frameworks."
            />
            <IndexRow
              number="04"
              title="Entanglement Studies"
              description="Deep dive into Bell's inequality, non-locality, and quantum teleportation mechanisms. Experimental verification methodologies and theoretical boundary conditions."
            />
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer
        className="w-full py-[160px] border-t border-[#cfc4c5]"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="grid grid-cols-12 gap-8 px-8 max-w-[1280px] mx-auto">
          <div className="col-span-12 md:col-span-6 mb-8 md:mb-0">
            <div
              className="text-[32px] leading-[130%] tracking-[-0.01em] font-semibold text-black mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              QUANTUM INITIATIVE
            </div>
            <p
              className="text-[16px] leading-[160%] text-[#5e5e5e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © 2026 A MuLearn Foundation Initiative. All rights
              reserved. Organized by Quantum Technology Interest Group.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col items-start md:items-end space-y-4">
            {[
              "Institutional Framework",
              "Privacy Protocol",
              "Accessibility Standards",
              "Academic Integrity",
              "Global Outreach",
              "Faculty Portal",
            ].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[16px] leading-[160%] text-[#5e5e5e] hover:text-black transition-colors duration-200 cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

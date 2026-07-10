"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// ── Placeholder Data Arrays ──────────────────────────────────────────────────

const MANDATE_DATA = [
  {
    title: "Mission & Vision",
    content: "Placeholder text outlining the core mission and long-term vision of the platform. Emphasize rigorous academic standards and open-source accessibility.",
  },
  {
    title: "The Problem",
    content: "Placeholder text describing the current fragmentation or barriers in quantum education and research that this initiative aims to solve.",
  },
  {
    title: "The Solution",
    content: "Placeholder text detailing how this platform uniquely addresses the problem through structured knowledge, community curation, and open access.",
  },
];

const TRAJECTORIES_DATA = [
  { year: "2026 Q1", milestone: "Knowledge Base Alpha Launch" },
  { year: "2026 Q2", milestone: "Peer-Review Protocol Implementation" },
  { year: "2026 Q3", milestone: "Interactive Quantum Sandboxes" },
  { year: "2026 Q4", milestone: "Open-Access Research Integration" },
];

const ROSTER_MENTORS = [
  { name: "[Name Placeholder]", role: "[Role Placeholder]", affiliation: "[Institution]" },
  { name: "[Name Placeholder]", role: "[Role Placeholder]", affiliation: "[Institution]" },
  { name: "[Name Placeholder]", role: "[Role Placeholder]", affiliation: "[Institution]" },
];

const ROSTER_MEMBERS = [
  { name: "[Name Placeholder]", role: "[Role Placeholder]", focus: "[Research Focus]" },
  { name: "[Name Placeholder]", role: "[Role Placeholder]", focus: "[Research Focus]" },
  { name: "[Name Placeholder]", role: "[Role Placeholder]", focus: "[Research Focus]" },
  { name: "[Name Placeholder]", role: "[Role Placeholder]", focus: "[Research Focus]" },
];

const ARCHIVE_MEDIA = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  caption: `Archive Media Placeholder ${i + 1}`,
}));

const ECOSYSTEM_LINKS = [
  { title: "Essential Literature", url: "#", description: "Curated foundational texts and papers." },
  { title: "Key Figures", url: "#", description: "Prominent researchers and theorists to follow." },
  { title: "Partner Labs", url: "#", description: "Academic and industry laboratories." },
  { title: "Developer Tools", url: "#", description: "SDKs, simulators, and open-source repos." },
];

// ── Main Page Component ──────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main 
        id="main-content" 
        className="relative z-10 pt-20 bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Page Header */}
        <header className="px-8 pt-16 pb-12 border-b border-[#E5E5E5]">
          <div className="max-w-[1280px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[64px] leading-[110%] tracking-[-0.03em] font-semibold text-black uppercase"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              About the Initiative
            </motion.h1>
          </div>
        </header>

        {/* 1. Our Mandate Section */}
        <section aria-labelledby="mandate-heading" className="px-8 py-24 border-b border-[#E5E5E5]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 
                id="mandate-heading" 
                className="text-[32px] leading-[110%] font-medium tracking-[-0.02em] uppercase text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Our Mandate
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-16">
              {MANDATE_DATA.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <h3 
                    className="text-[18px] font-bold uppercase tracking-[0.05em] text-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-[18px] leading-[160%] text-[#333333] max-w-3xl"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Forward Trajectories Section */}
        <section aria-labelledby="trajectories-heading" className="px-8 py-24 border-b border-[#E5E5E5]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 
                id="trajectories-heading" 
                className="text-[32px] leading-[110%] font-medium tracking-[-0.02em] uppercase text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Forward Trajectories
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col border-t border-[#E5E5E5]">
                {TRAJECTORIES_DATA.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#E5E5E5] group"
                  >
                    <span 
                      className="text-[14px] font-mono uppercase tracking-[0.05em] text-[#666666] mb-2 md:mb-0 w-32 shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.year}
                    </span>
                    <span 
                      className="text-[20px] leading-[140%] text-black font-medium w-full"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Collective Section */}
        <section aria-labelledby="collective-heading" className="px-8 py-24 border-b border-[#E5E5E5]">
          <div className="max-w-[1280px] mx-auto">
            <header className="mb-16">
              <h2 
                id="collective-heading" 
                className="text-[32px] leading-[110%] font-medium tracking-[-0.02em] uppercase text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Collective
              </h2>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Mentors / Advisory */}
              <div>
                <h3 
                  className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#666666] mb-8 pb-4 border-b border-[#E5E5E5]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Mentors & Advisory
                </h3>
                <ul className="flex flex-col gap-6">
                  {ROSTER_MENTORS.map((person, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="text-[18px] font-medium text-black uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {person.name}
                      </span>
                      <span className="text-[14px] text-[#666666] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {person.role} — {person.affiliation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Members / Researchers */}
              <div>
                <h3 
                  className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#666666] mb-8 pb-4 border-b border-[#E5E5E5]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Members & Researchers
                </h3>
                <ul className="flex flex-col gap-6">
                  {ROSTER_MEMBERS.map((person, i) => (
                    <li key={i} className="flex flex-col">
                      <span className="text-[18px] font-medium text-black uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {person.name}
                      </span>
                      <span className="text-[14px] text-[#666666] mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {person.role} — {person.focus}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Archive Section */}
        <section aria-labelledby="archive-heading" className="px-8 py-24 border-b border-[#E5E5E5] bg-[#FAFAFA]">
          <div className="max-w-[1280px] mx-auto">
            <header className="mb-16 flex flex-col md:flex-row justify-between md:items-end gap-6">
              <h2 
                id="archive-heading" 
                className="text-[32px] leading-[110%] font-medium tracking-[-0.02em] uppercase text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Archive
              </h2>
              <span 
                className="text-[12px] font-mono uppercase tracking-[0.05em] text-[#666666]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Media / Galleries / Artifacts
              </span>
            </header>

            {/* Modular Grid with Grayscale to Color Interaction Placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARCHIVE_MEDIA.map((media) => (
                <div 
                  key={media.id} 
                  className="group relative aspect-square bg-[#E5E5E5] overflow-hidden border border-[#D4D4D4] cursor-crosshair"
                >
                  {/* Image Placeholder (Grayscale by default, color on hover) */}
                  <div className="absolute inset-0 bg-[#CCCCCC] transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-105" />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span 
                      className="text-[12px] font-mono text-white tracking-[0.05em]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {media.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Ecosystem Resources Section */}
        <section aria-labelledby="ecosystem-heading" className="px-8 py-24">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 
                id="ecosystem-heading" 
                className="text-[32px] leading-[110%] font-medium tracking-[-0.02em] uppercase text-black"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ecosystem
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {ECOSYSTEM_LINKS.map((link, i) => (
                  <Link 
                    key={i} 
                    href={link.url}
                    className="flex flex-col group block p-6 border border-[#E5E5E5] hover:bg-black transition-colors duration-300"
                  >
                    <span 
                      className="text-[18px] font-bold uppercase text-black group-hover:text-white transition-colors duration-300 mb-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.title}
                    </span>
                    <span 
                      className="text-[14px] leading-[160%] text-[#666666] group-hover:text-[#BBBBBB] transition-colors duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

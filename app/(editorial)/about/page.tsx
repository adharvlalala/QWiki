"use client";

import Navbar from "@/components/Navbar";
import { Cpu, Atom } from "lucide-react";



// Commitments
const COMMITMENTS = [
  {
    title: "Show Up Consistently",
    desc: "Active participation is how community capability compounds."
  },
  {
    title: "Build in Public",
    desc: "Share files, simulations, learnings, and progress openly."
  },
  {
    title: "Stay Mission-Aligned",
    desc: "Connect projects to real quantum impact for Kerala and India."
  }
];

// Roster Data
const ROSTER_MENTORS = [
  { name: "Manoj Joseph", role: "CBO, Board Director", affiliation: "SuperQ Quantum Computing (CSE: QBTQ), Canada. Co Founder, Ebiz Technologies, UAE." },
];

const ROSTER_MEMBERS = [
  { name: "Adharvlal", role: "IG Lead" },
  { name: "Akhila Sunesh", role: "IG Lead" },
  { name: "Arathy", role: "Core Team Member" },
  { name: "Ihan", role: "Core Team Member" },
  { name: "Johan", role: "Core Team Member" },
  { name: "Aswin", role: "Core Team Member" },
  { name: "Kenaz", role: "Core Team Member" },
  { name: "Maheshwar", role: "Core Team Member" },
  { name: "Nandakishor", role: "Core Team Member" },
  { name: "Nasih", role: "Core Team Member" },
  { name: "Naveen", role: "Core Team Member" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main 
        id="main-content" 
        className="relative z-10 pt-20 bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* 1. Header Section */}
        <header className="px-8 pt-20 pb-16 text-center max-w-4xl mx-auto">
          <span 
            className="text-[#7e22ce] text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            QTM Interest Group
          </span>
          <h1 
            className="text-4xl md:text-5xl font-bold tracking-tight text-black mt-3 leading-tight uppercase font-display"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            About the Initiative
          </h1>
          <p 
            className="text-[#555555] text-lg mt-6 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We are a coordinated community of students, researchers, and developers in Kerala. We build practical skills and active pipelines aligned with India&apos;s National Quantum Mission.
          </p>

          {/* Core Stats Row */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto border-y border-[#E5E5E5] py-8">
            <div>
              <div className="text-3xl font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>35+</div>
              <div className="text-xs text-[#666666] uppercase tracking-wider mt-1 font-medium font-body">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>2</div>
              <div className="text-xs text-[#666666] uppercase tracking-wider mt-1 font-medium font-body">Core Verticals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>11</div>
              <div className="text-xs text-[#666666] uppercase tracking-wider mt-1 font-medium font-body">Core Team</div>
            </div>
          </div>
        </header>

        {/* 2. Why We Exist Section */}
        <section className="px-8 py-16 bg-[#FAFAFA] border-y border-[#E5E5E5]">
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 
                className="text-lg font-bold text-black uppercase tracking-tight mb-3 font-display"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Opportunity
              </h3>
              <p 
                className="text-[14px] text-[#555555] leading-relaxed font-body"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                India&apos;s National Quantum Mission (NQM) aims to establish leading quantum capabilities by 2031. With a high concentration of engineering talent, Kerala is uniquely positioned to become a regional node—provided we coordinate, build skills, and organize research avenues now.
              </p>
            </div>
            <div>
              <h3 
                className="text-lg font-bold text-black uppercase tracking-tight mb-3 font-display"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                The Kerala Gap
              </h3>
              <p 
                className="text-[14px] text-[#555555] leading-relaxed font-body"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Despite top-tier technical literacy, students and early-career researchers have historically worked in isolated silos, lacking cross-disciplinary exchange. QTM IG acts as the community hub that aggregates talent, coordinates learning paths, and matches members to research openings.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Core Focus Areas Section */}
        <section className="px-8 py-20 max-w-[1280px] mx-auto">
          <h2 
            className="text-2xl font-bold text-black text-center uppercase tracking-tight font-display mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QC Card */}
            <div className="p-8 border border-[#E5E5E5] hover:border-[#7e22ce] transition-all bg-white rounded-lg flex flex-col justify-between hover:shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FAF5FF] flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5 text-[#7e22ce]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1 font-display" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Quantum Computing (QC)
                </h3>
                <span className="text-xs text-[#7e22ce] tracking-wider block mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Aligned with IISc QC Hub
                </span>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-6 font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
                  We study circuits, optimization algorithms, and NISQ applications. Members learn to design and optimize quantum algorithms for real-world computing platforms.
                </p>
              </div>
              <div className="border-t border-[#F0F0F0] pt-4">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block mb-2 font-display">Key Practical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Qiskit", "PennyLane", "Variational Algorithms"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-[12px] text-[#333] rounded"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* QComm Card */}
            <div className="p-8 border border-[#E5E5E5] hover:border-[#7e22ce] transition-all bg-white rounded-lg flex flex-col justify-between hover:shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#FAF5FF] flex items-center justify-center mb-6">
                  <Atom className="w-5 h-5 text-[#7e22ce]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-1 font-display" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Quantum Communication (QComm)
                </h3>
                <span className="text-xs text-[#7e22ce] tracking-wider block mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Aligned with IIT-M CDOT Hub
                </span>
                <p className="text-[14px] text-[#555555] leading-relaxed mb-6 font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
                  We cover QKD protocols, secure quantum networking topologies, and entanglement-based distribution systems. Members learn secure routing protocols and cryptographic systems.
                </p>
              </div>
              <div className="border-t border-[#F0F0F0] pt-4">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block mb-2 font-display">Key Practical Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {["BB84 Protocol", "Entanglement Distribution", "Secure Networks"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 bg-[#F5F5F5] border border-[#E5E5E5] text-[12px] text-[#333] rounded"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Commitments Section */}
        <section className="px-8 py-20 max-w-xl mx-auto">
          <div>
            <h3 
              className="text-xl font-bold text-black font-display mb-8 uppercase tracking-tight text-center"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Our Commitments
            </h3>
            <div className="space-y-6">
              {COMMITMENTS.map((c, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-lg font-bold text-[#7e22ce]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>0{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-sm text-black font-display" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {c.title}
                    </h4>
                    <p className="text-xs text-[#666666] mt-1 leading-relaxed font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. The Collective Roster Section */}
        <section className="px-8 py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
          <div className="max-w-[1280px] mx-auto">
            <h2 
              className="text-2xl font-bold text-black text-center uppercase tracking-tight font-display mb-12"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The Collective
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Mentors */}
              <div className="lg:col-span-4">
                <h3 className="text-xs text-[#7e22ce] uppercase tracking-wider mb-4 font-bold border-b border-[#E5E5E5] pb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Advisor
                </h3>
                <div className="p-4 bg-white border border-[#E5E5E5] rounded-lg">
                  <div className="font-bold text-black text-base font-display" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {ROSTER_MENTORS[0].name}
                  </div>
                  <div className="text-xs text-[#7e22ce] mt-1 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {ROSTER_MENTORS[0].role}
                  </div>
                  <div className="text-xs text-[#666666] mt-2 leading-relaxed font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {ROSTER_MENTORS[0].affiliation}
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="lg:col-span-8">
                <h3 className="text-xs text-[#7e22ce] uppercase tracking-wider mb-4 font-bold border-b border-[#E5E5E5] pb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Core Team
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ROSTER_MEMBERS.map((p, i) => (
                    <div key={i} className="p-3 bg-white border border-[#E5E5E5] rounded-lg flex flex-col justify-between">
                      <span className="text-xs font-bold text-black uppercase tracking-tight font-display" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {p.name}
                      </span>
                      <span className="text-[10px] text-[#7e22ce] mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {p.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Motto Callout Section */}
        <section className="px-8 py-16 bg-neutral-950 text-white text-center">
          <blockquote 
            className="text-lg md:text-xl italic font-display text-white tracking-wide max-w-3xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            &ldquo;QC for optimization. QComm for secure Kerala infrastructure. Mentor-aligned, socially-grounded.&rdquo;
          </blockquote>
          <p className="text-xs text-[#888888] mt-4 max-w-lg mx-auto font-body" style={{ fontFamily: "'Inter', sans-serif" }}>
            Building real quantum impact for Kerala and India.
          </p>
        </section>
      </main>
    </>
  );
}

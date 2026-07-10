"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
type Goal = {
  title: string;
  highlight: string;
  description: string;
};

const GOALS: Goal[] = [
  {
    title: "IG & Website Launch",
    highlight: "Official Unveiling",
    description: "Formally launch the Quantum Technologies Interest Group and its official website to the community."
  },
  {
    title: "Expert Platform",
    highlight: "Knowledge Hub",
    description: "Create a space for academic leaders and industry experts to share perspectives on quantum tech."
  },
  {
    title: "ChatQLM Demo",
    highlight: "Hands-on Lab",
    description: "Introduce the ChatQLM quantum computing simulation tool for interactive participant exposure."
  },
  {
    title: "Ecosystem Network",
    highlight: "Sponsor & Community",
    description: "Connect student talent, researchers, mentors, and industry sponsors in a persistent ecosystem."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Spring cascade variants for the stat chips
const statContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
};


export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raf = requestAnimationFrame(() => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);
  return (
    <section
      id="about"
      aria-labelledby="qtm-about-heading"
      className="relative py-16 md:py-24 lg:py-32 px-6 md:px-8"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Section index + heading row */}
        <div className="flex items-start gap-8 mb-12">
          {/* Large section number — stark muted gray watermark */}
          <div
            className="hidden md:flex flex-col items-center pt-2"
            aria-hidden="true"
          >
            <span
              className="text-[64px] font-black leading-none"
              style={{ color: "#444444", fontFamily: "var(--font-display)", lineHeight: 1 }}
            >
              01
            </span>
            <div className="w-[1px] h-12 bg-[#333333] mt-2" />
          </div>

          <div className="flex-1">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-3"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
            >
              — About
            </motion.p>

            <motion.h2
              id="qtm-about-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="leading-[1.0] tracking-[-0.03em] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 56px)",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              About Quantum<br />Tech <span style={{ color: "#7B2FBE" }}>Matrix</span>
            </motion.h2>

            {/* Body */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-14 max-w-2xl space-y-4"
              style={{ borderLeft: "1px solid #333333", paddingLeft: "1.25rem" }}
            >
              <p
                className="text-[16px] leading-[1.75]"
                style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
              >
                Quantum Tech Matrix is the launch event of the{" "}
                <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                  MuLearn Quantum Technologies{" "}
                  Interest Group (IG)
                </span>{" "}
                — the first of its kind in Kerala. Bringing together students, researchers,
                faculty, and industry leaders under one roof.
              </p>
              <p
                className="text-[16px] leading-[1.75]"
                style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
              >
                From keynote sessions and live lab demonstrations to networking and the
                official unveiling of QWiki — this is where theory meets action.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Event Logo with Smooth High-Tech Glitch */}
          <motion.div
            className="hidden lg:flex flex-col items-center justify-center pl-8 pt-4"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, x: 20 }}
            whileInView={{
              opacity: [0, 1, 0.2, 1, 0.7, 1],
              scale: [0.95, 1.02, 0.98, 1.01, 0.99, 1],
              filter: [
                "blur(10px) brightness(2)",
                "blur(0px) brightness(1)",
                "blur(4px) brightness(1.5)",
                "blur(0px) brightness(1)",
                "blur(1px) brightness(1.2)",
                "blur(0px) brightness(1)"
              ],
              x: [20, -5, 5, -2, 2, 0],
              y: [0, 5, -5, 2, -2, 0]
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut", times: [0, 0.15, 0.3, 0.5, 0.7, 1] }}
          >
            <img
              src="/images/qtm-logo.png"
              alt="Quantum Tech Matrix Logo"
              className="w-full max-w-[280px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </motion.div>
        </div>

        {/* Goals chips — spring cascade: each chip bounces in staggered left-to-right */}
        <motion.div
          variants={statContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {GOALS.map((goal, idx) => (
            <motion.div
              key={goal.title}
              variants={statItemVariants}
              whileHover={isMobile ? undefined : { y: -4, borderColor: "#7B2FBE" }}
              className="group flex flex-col justify-between p-6 md:p-8 bg-[#090710] border border-[#333333] transition-colors duration-300 min-h-[240px]"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00fa9a]">
                  0{idx + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight font-sans">
                  {goal.title}
                </h3>
                <p className="text-[14px] text-[#A3A3A3] leading-relaxed font-sans">
                  {goal.description}
                </p>
              </div>
              
              <div className="text-[11px] font-medium tracking-[0.1em] text-[#7B2FBE] uppercase mt-6">
                {goal.highlight}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

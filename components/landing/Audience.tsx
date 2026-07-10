"use client";

import { motion } from "framer-motion";
const AUDIENCE = [
  { role: "Students" },
  { role: "Researchers & Faculty" },
  { role: "Industry & Sponsors" },
];

export default function Audience() {
  return (
    <section
      id="audience"
      aria-labelledby="qtm-audience-heading"
      className="relative py-16 md:py-24 lg:py-32 px-6 md:px-8"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* Left Column: Sticky Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-3"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
          >
            — 05 / For You
          </p>
          <h2
            id="qtm-audience-heading"
            className="leading-[1.0] tracking-[-0.03em] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            Who Should<br /><span style={{ color: "#7B2FBE" }}>Participate?</span>
          </h2>
          <p 
            className="text-[15px] leading-relaxed text-[#A3A3A3] max-w-sm"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Whether you are writing quantum algorithms, building curriculum, or simply exploring the possibilities of{" "}
            post-classical computation, we have designed a space for you.
          </p>
        </div>

        {/* Right Column: Static List of Categories */}
        <div className="lg:col-span-7 w-full border-t border-[#333333]">
          {AUDIENCE.map((item, i) => {
            return (
              <div
                key={item.role}
                className="border-b border-[#333333] relative py-6 md:py-8 pl-4 md:pl-6 pr-2 flex items-center justify-between gap-6"
              >
                {/* Growing left-border rail — animates in as the row enters viewport */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.12 }}
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#00fa9a]"
                  style={{ transformOrigin: "top" }}
                />
                
                <div className="flex items-center gap-5 md:gap-8">
                  {/* Index */}
                  <span 
                    className="text-sm font-black text-[#00fa9a]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Role Title */}
                  <h3 
                    className="text-xl md:text-3xl font-black uppercase tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.role}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

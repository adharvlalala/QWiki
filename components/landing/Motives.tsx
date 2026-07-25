"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const POINTS = [
  {
    title: "Putting Kerala on the Quantum Map",
    body: <>To make God’s Own Country anchor a permanent coordinate as a global quantum hub.</>,
    image: "/images/kerala-map.png",
    imageClass: "w-full h-full object-contain p-2 scale-125",
  },
  {
    title: "National Quantum Mission",
    body: (
      <>
        India set a ₹6,003 Crore quantum goal by 2031 under the{" "}
        National Quantum Mission. We take local talent and
        teach them the exact skills the future needs: quantum code, secure data, and{" "}
        advanced sensors.
      </>
    ),
    image: "/images/qtm-national.png",
    imageClass: "w-full h-full object-contain p-2 scale-110",
  },
  {
    title: "Beyond the Textbook",
    body: (
      <>
        Exploring how quantum principles manifest in real-world computing,{" "}
        post-quantum cryptography, biological sensing, and secure communication.
      </>
    ),
    image: "/images/qtm-textbook.png",
    imageClass: "w-full h-full object-contain p-2 scale-110 translate-y-6",
  },
  {
    title: "Persistent Mentorship Network",
    body: <>Connecting students, researchers, mentors, and industry in a structured ecosystem that persists well beyond the launch event.</>,
    image: "/images/qtm-mentorship.png?v=3",
    imageClass: "w-full h-full object-contain p-4 scale-110",
  },
];

export default function Motives() {
  return (
    <section
      id="why"
      aria-labelledby="qtm-motives-heading"
      className="relative py-16 md:py-24 lg:py-32 px-6 md:px-8"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      <div className="max-w-[1100px] mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12">
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-2"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
          >
            — 02 / Mission
          </p>
          <h2
            id="qtm-motives-heading"
            className="leading-[1.0] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 48px)",
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            Why Quantum Tech <span style={{ color: "#7B2FBE" }}>Matrix?</span>
          </h2>
        </div>

        {/* Content Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-stretch">
          {/* Left Column: First Image */}
          <div className="md:col-span-5 w-full aspect-[4/3] md:aspect-auto md:h-full bg-[#120F1C] border border-[#333333] border-t-[3px] border-t-[#00fa9a] p-2 flex items-center justify-center overflow-hidden shadow-lg shadow-black/40">
            <ImageWithFallback src={POINTS[0].image} alt={POINTS[0].title} index={0} imageClass={POINTS[0].imageClass} />
          </div>

          {/* Right Column: All 4 points/cards displayed together */}
          <div className="md:col-span-7 flex flex-col gap-6 w-full">
            {POINTS.map((pt, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 border bg-[#120F1C] border-[#333333] hover:border-[#00fa9a] hover:shadow-[0_0_25px_rgba(0,250,154,0.15)] transition-all duration-300 cursor-default"
              >
                {/* Step Number */}
                <span
                  className="text-[32px] md:text-[38px] font-black leading-none flex-shrink-0 select-none text-[#00fa9a]"
                  style={{
                    fontFamily: "var(--font-display)",
                    lineHeight: 0.9,
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="pt-1 flex flex-col gap-1.5 overflow-hidden">
                  <h3
                    className="text-[14px] md:text-[16px] font-black uppercase tracking-tight text-white font-[family-name:var(--font-display)]"
                  >
                    {pt.title}
                  </h3>
                  <p
                    className="text-[12px] md:text-[13px] leading-[1.6] text-[#A3A3A3] font-[family-name:var(--font-display)]"
                  >
                    {pt.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Helper Component: Image loader with sci-fi grid fallback */
function ImageWithFallback({ src, alt, index, imageClass }: { src: string; alt: string; index: number; imageClass?: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoading(false);
    }
  }, []);

  if (error) {
    return <TechFallback index={index} title={alt} />;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#120F1C]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#120F1C] z-10">
          <div className="w-8 h-8 border-2 border-t-[#00fa9a] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${
          imageClass || (src.endsWith('.png') ? 'w-full h-full object-contain p-2 scale-125' : 'w-full h-full object-cover')
        } ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
}

/* Sci-fi HUD / Quantum Console Fallback styling */
function TechFallback({ index, title }: { index: number; title: string }) {
  return (
    <div className="w-full h-full relative bg-[#0d0a16] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Status LED */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00fa9a] animate-pulse shadow-[0_0_6px_#00fa9a]" />
        <span className="text-[7.5px] tracking-[0.15em] text-[#00fa9a] font-mono font-bold">ONLINE</span>
      </div>

      {/* Mesh/Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #7B2FBE 1px, transparent 1px),
            linear-gradient(to bottom, #7B2FBE 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glowing radial core */}
      <div className="absolute w-[180px] h-[180px] rounded-full bg-[#7B2FBE] opacity-10 blur-[50px]" />

      {/* Orbit/Circle SVG animation */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-5 z-10">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r="62"
            className="stroke-[#221e33] fill-none"
            strokeWidth="1"
          />
          {/* Animated dashing ring */}
          <motion.circle
            cx="72"
            cy="72"
            r="62"
            className="stroke-[#7B2FBE] fill-none"
            strokeWidth="1.5"
            strokeDasharray="90 180"
            animate={{
              strokeDashoffset: [0, 540],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
          />
          {/* Outer dotted ring (Green accent) */}
          <circle
            cx="72"
            cy="72"
            r="68"
            className="stroke-[#00fa9a] opacity-30 fill-none"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Step Number */}
        <div className="flex flex-col items-center justify-center">
          <span
            className="text-[40px] font-black leading-none text-white tracking-tighter"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: "0 0 12px rgba(123, 47, 190, 0.4)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[8px] font-bold tracking-[0.25em] text-[#00fa9a] mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SYS NODE
          </span>
        </div>
      </div>

      {/* Text/Metadata overlay */}
      <div className="relative z-10 text-center max-w-[280px]">
        <div
          className="text-[12px] font-black uppercase tracking-wider text-white truncate mb-1"
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </div>
        <div className="text-[8px] tracking-[0.15em] text-[#666666] font-mono">
          MATRIX.LOC_0{index + 1} {"//"} <span className="text-[#00fa9a]">Q_INIT_OK</span>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#7B2FBE]/40" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#7B2FBE]/40" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#7B2FBE]/40" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#7B2FBE]/40" />
    </div>
  );
}

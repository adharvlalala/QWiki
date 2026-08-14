"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL_MS = 5000;

const EVENT_SLIDES = [
  {
    src: "/images/QTM_Gallery/event1.jpg",
    fallback: "/images/qtm-national.png",
    isFallback: false,
    caption: "The mission",
    sub: "India's National Quantum Mission · Kerala's answer",
  },
  {
    src: "/images/QTM_Gallery/event2.JPG",
    fallback: "/images/qtm-mentorship.png",
    isFallback: false,
    caption: "The speaker",
    sub: "Engaging keynotes laying out the roadmap for quantum computing",
  },
  {
    src: "/images/QTM_Gallery/event3.jpeg",
    fallback: "/images/qtm-textbook.png",
    isFallback: false,
    caption: "The team",
    sub: "The core group of volunteers and organizers who made it happen",
  },
  {
    src: "/images/QTM_Gallery/event4.jpg",
    fallback: "/images/qtm-national.png",
    isFallback: false,
    caption: "The audience",
    sub: "Students, builders, and enthusiasts diving into new frontiers",
  },
  {
    src: "/images/QTM_Gallery/event5.JPG",
    fallback: "/images/qtm-mentorship.png",
    isFallback: false,
    caption: "The mentor",
    sub: "Guiding the next generation of builders through hardware and software",
  },
  {
    src: "/images/QTM_Gallery/event6.JPG",
    fallback: "/images/qtm-national.png",
    isFallback: false,
    caption: "The professionals",
    sub: "Academics and industry experts sharing insights on emerging tech",
  },
  {
    src: "/images/QTM_Gallery/event7.jpg",
    fallback: "/images/qtm-mentorship.png",
    isFallback: false,
    caption: "The likeminded",
    sub: "A community united by curiosity and a drive to create local impact",
  },
];

const GUESTS = [
  {
    src: "/images/guest1.png",
    name: "Shri CP John",
    role: "Chief Guest",
    detail: "Minister of Transport, Government of Kerala",
    cls: "object-cover object-top group-hover:scale-105",
  },
  {
    src: "/images/guest2.png",
    name: "Prof. Dr. Mathew Chandrankunnel",
    role: "Keynote Speaker",
    detail: "Quantum Scientist, Sr. Consultant, JIS University, Kolkata.",
    cls: "object-cover object-[25%_30%] group-hover:scale-105",
  },
  {
    src: "/images/guest5.png",
    name: "Dr. Fathima Nihla Latheef",
    role: "Keynote",
    detail: "Ph.D Research Scholar, Department of Computer Science and Engineering at IIIT Kottayam and Quantum Research Intern, Unisys R&D Research Team",
    cls: "object-cover object-top group-hover:scale-105",
  },
  {
    src: "/images/guest4.png",
    name: "Shri Manoj Joseph",
    role: "Mentor",
    detail: "Director, SuperQ Quantum, Canada",
    cls: "object-cover object-[50%_80%] group-hover:scale-105",
  },
  {
    src: "/images/guest3.png",
    name: "Deepu S Nath",
    role: "Chief Volunteer - MuLearn",
    detail: "Managing Director @ FAYA",
    cls: "object-cover object-top scale-[2.2] origin-[50%_45%] group-hover:scale-[2.3]",
  },
];

const PRESS_CLIPS = [
  { src: "/images/press/press1.jpeg", pub: "Times Of India", lang: "en" },
  { src: "/images/press/press2.jpeg", pub: "Kerala Kaumudi", lang: "ml" },
  { src: "/images/press/press3.jpeg", pub: "Metro Vaartha", lang: "ml" },
  { src: "/images/press/press4.jpeg", pub: "Veekshanam", lang: "ml" },
  { src: "/images/press/press5.jpeg", pub: "Deepika", lang: "ml" },
];

const STACK_ROTATIONS = [-5, -2, 0.5, 3, 6];

export default function HomeEventSpotlight() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const modalSliderRef = useRef<HTMLDivElement>(null);
  const [hoveredGuest, setHoveredGuest] = useState<number | null>(null);
  const [fanned, setFanned] = useState(false);
  const [selectedClip, setSelectedClip] = useState<number | null>(null);
  const [hoveredClip, setHoveredClip] = useState<number | null>(null);

  const scrollToSlide = useCallback((idx: number, smooth = true) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const width = container.clientWidth;
    container.scrollTo({
      left: idx * width,
      behavior: smooth ? "smooth" : "auto",
    });
    setCurrent(idx);
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const width = container.clientWidth;
    if (width === 0) return;
    const newIndex = Math.round(container.scrollLeft / width);
    if (newIndex >= 0 && newIndex < EVENT_SLIDES.length && newIndex !== current) {
      setCurrent(newIndex);
    }
  };

  const prevSlide = () => {
    const prevIdx = (current - 1 + EVENT_SLIDES.length) % EVENT_SLIDES.length;
    scrollToSlide(prevIdx);
  };

  const nextSlide = () => {
    const nextIdx = (current + 1) % EVENT_SLIDES.length;
    scrollToSlide(nextIdx);
  };

  const scrollToModalClip = useCallback((idx: number, smooth = true) => {
    if (!modalSliderRef.current) return;
    const container = modalSliderRef.current;
    const width = container.clientWidth;
    container.scrollTo({
      left: idx * width,
      behavior: smooth ? "smooth" : "auto",
    });
    setSelectedClip(idx);
  }, []);

  const handleModalScroll = () => {
    if (!modalSliderRef.current) return;
    const container = modalSliderRef.current;
    const width = container.clientWidth;
    if (width === 0) return;
    const newIndex = Math.round(container.scrollLeft / width);
    if (newIndex >= 0 && newIndex < PRESS_CLIPS.length && newIndex !== selectedClip) {
      setSelectedClip(newIndex);
    }
  };

  // Sync scroll position when modal opens
  useEffect(() => {
    if (selectedClip !== null) {
      const timer = setTimeout(() => {
        if (modalSliderRef.current) {
          const width = modalSliderRef.current.clientWidth;
          modalSliderRef.current.scrollTo({
            left: selectedClip * width,
            behavior: "auto",
          });
        }
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [selectedClip === null]);

  // Keyboard navigation for clipping modal
  useEffect(() => {
    if (selectedClip === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedClip(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (selectedClip - 1 + PRESS_CLIPS.length) % PRESS_CLIPS.length;
        scrollToModalClip(prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (selectedClip + 1) % PRESS_CLIPS.length;
        scrollToModalClip(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedClip, scrollToModalClip]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const nextIdx = (current + 1) % EVENT_SLIDES.length;
      scrollToSlide(nextIdx);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [current, isPaused, scrollToSlide]);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.clientWidth;
        sliderRef.current.scrollTo({
          left: current * width,
          behavior: "auto",
        });
      }
      if (modalSliderRef.current && selectedClip !== null) {
        const modalWidth = modalSliderRef.current.clientWidth;
        modalSliderRef.current.scrollTo({
          left: selectedClip * modalWidth,
          behavior: "auto",
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [current, selectedClip]);

  return (
    <section
      id="home-event-spotlight"
      aria-labelledby="spotlight-heading"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0c0a18" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right,  #7B2FBE 1px, transparent 1px),
            linear-gradient(to bottom, #7B2FBE 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.03,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "-180px",
          left: "-140px",
          width: "720px",
          height: "720px",
          background:
            "radial-gradient(circle, rgba(126,34,206,0.14) 0%, transparent 65%)",
        }}
      />

      <div
        className="flex items-center justify-between flex-wrap gap-x-4 gap-y-2 px-6 md:px-10 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"
            style={{ boxShadow: "0 0 6px #a855f7" }}
          />
          <span
            className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#a855f7]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            QUANTUM TECH MATRIX
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span
            className="text-[10px] tracking-[0.15em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-display)" }}
          >
            12 · 07 · 2026 · GOKULAM GRAND · TRIVANDRUM
          </span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pt-14 lg:pt-20 pb-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div
              className="relative group/slider"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Corner futuristic tech brackets */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-5 h-5 z-20 pointer-events-none"
                style={{ borderTop: "1.5px solid #7e22ce", borderLeft: "1.5px solid #7e22ce" }}
              />
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-5 h-5 z-20 pointer-events-none"
                style={{ borderTop: "1.5px solid #7e22ce", borderRight: "1.5px solid #7e22ce" }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-5 h-5 z-20 pointer-events-none"
                style={{ borderBottom: "1.5px solid #7e22ce", borderLeft: "1.5px solid #7e22ce" }}
              />
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-5 h-5 z-20 pointer-events-none"
                style={{ borderBottom: "1.5px solid #7e22ce", borderRight: "1.5px solid #7e22ce" }}
              />

              {/* Scrollable / Swipeable Track */}
              <div
                ref={sliderRef}
                onScroll={handleScroll}
                tabIndex={0}
                role="region"
                aria-label="Event Photo Slideshow"
                aria-roledescription="carousel"
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    prevSlide();
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    nextSlide();
                  }
                }}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth focus:outline-none focus:ring-1 focus:ring-[#a855f7]/40 relative touch-pan-x"
                style={{
                  aspectRatio: "4/3",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {EVENT_SLIDES.map((s, idx) => {
                  const sImgSrc = s.isFallback ? s.fallback : s.src;
                  return (
                    <div
                      key={idx}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${s.caption} (${idx + 1} of ${EVENT_SLIDES.length})`}
                      className="min-w-full w-full h-full flex-shrink-0 snap-center relative bg-[#080614] overflow-hidden select-none"
                    >
                      <img
                        src={sImgSrc}
                        alt={s.caption}
                        draggable={false}
                        className="w-full h-full object-contain p-4 sm:p-6"
                      />

                      {/* Ambient gradient */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(12,10,24,0.96) 0%, rgba(12,10,24,0.45) 30%, transparent 60%)",
                        }}
                      />

                      {/* Discrete Slide Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 pointer-events-none">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase text-[#a855f7]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {String(idx + 1).padStart(2, "0")}&nbsp;/&nbsp;
                            {String(EVENT_SLIDES.length).padStart(2, "0")}
                          </span>
                          <div className="h-px flex-1 bg-[#a855f7]/20" />
                          <span
                            className="text-[10px] tracking-[0.15em] uppercase text-white/50"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {s.caption}
                          </span>
                        </div>
                        <p
                          className="text-[11px] sm:text-[12px] text-white/55"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {s.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Discrete Left/Right Arrow Navigation Controls */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-[#080614]/80 border border-white/10 text-white/70 hover:text-white hover:border-[#a855f7]/60 hover:bg-[#120e28] transition-all opacity-80 md:opacity-0 group-hover/slider:opacity-100 backdrop-blur-xs shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-[#080614]/80 border border-white/10 text-white/70 hover:text-white hover:border-[#a855f7]/60 hover:bg-[#120e28] transition-all opacity-80 md:opacity-0 group-hover/slider:opacity-100 backdrop-blur-xs shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Discrete Progress Bar */}
            <div
              className="h-[2px] overflow-hidden mt-0 relative"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                  background: "linear-gradient(90deg, #7e22ce, #c084fc)",
                  width: `${((current + 1) / EVENT_SLIDES.length) * 100}%`,
                }}
              />
            </div>

            {/* Discrete Indicators with Accessible Touch Targets */}
            <div className="flex items-center justify-between mt-3.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {EVENT_SLIDES.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    aria-label={`Go to slide ${i + 1}: ${s.caption}`}
                    className="p-1.5 group flex items-center justify-center cursor-pointer focus:outline-none"
                  >
                    <span
                      style={{
                        width: i === current ? "26px" : "6px",
                        height: "3px",
                        borderRadius: "2px",
                        background:
                          i === current
                            ? "#a855f7"
                            : "rgba(255,255,255,0.18)",
                        transition: "all 0.3s ease",
                      }}
                      className="block group-hover:bg-[#c084fc]"
                    />
                  </button>
                ))}
              </div>

              <div
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/30 select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="hidden sm:inline">Scroll or swipe to browse</span>
                <span className="sm:hidden">Swipe to browse</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-10">
              {["On July 12th,", "Kerala entered", null].map((line, idx) => (
                <div key={idx} className="overflow-hidden pb-4 -mb-4">
                  <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line !== null ? (
                      <h2
                        id={idx === 0 ? "spotlight-heading" : undefined}
                        aria-hidden={idx !== 0}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(2.8rem, 4.5vw, 68px)",
                          fontWeight: 400,
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                          color: "#fff",
                        }}
                      >
                        {line}
                      </h2>
                    ) : (
                      <p
                        aria-hidden="true"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(2.8rem, 4.5vw, 68px)",
                          fontWeight: 400,
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                          color: "#fff",
                        }}
                      >
                        the{" "}
                        <span
                          style={{
                            background:
                              "linear-gradient(125deg, #c084fc 0%, #7e22ce 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Quantum
                        </span>{" "}
                        age.
                      </p>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-2"
            >
              
              <div className="mb-6">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c084fc]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PRESS COVERAGE
                </span>
                <h3
                  className="text-white/90 font-serif italic mt-1.5"
                  style={{
                    fontSize: "clamp(1.2rem, 1.8vw, 24px)",
                    lineHeight: 1.25,
                  }}
                >
                  Kerala’s quantum leap, documented.
                </h3>
              </div>

              <div
                className="relative flex justify-center mt-4"
                style={{ height: fanned ? "190px" : "175px", transition: "height 0.4s ease" }}
                onMouseEnter={() => setFanned(true)}
                onMouseLeave={() => setFanned(false)}
              >
                {PRESS_CLIPS.map((clip, i) => {
                  const fanX = fanned ? (i - 2) * 68 : 0;
                  const isHovered = hoveredClip === i;

                  const fanRot = fanned
                    ? (isHovered ? 0 : STACK_ROTATIONS[i] * 0.5)
                    : STACK_ROTATIONS[i];

                  const cardY = isHovered
                    ? -32
                    : (fanned ? -12 : 0);

                  const zBase = isHovered ? 50 : 10 + (5 - i);

                  return (
                    <motion.div
                      key={clip.src}
                      className="absolute top-0 cursor-pointer origin-bottom"
                      style={{ zIndex: zBase }}
                      animate={{
                        x: `${fanX}px`,
                        rotate: fanRot,
                        y: cardY,
                        scale: isHovered ? 1.06 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      onMouseEnter={() => setHoveredClip(i)}
                      onMouseLeave={() => setHoveredClip(null)}
                      onClick={() => setSelectedClip(i)}
                    >
                      <div
                        style={{
                          width: "250px",
                          height: "165px",
                          outline: isHovered
                            ? "1px solid rgba(255,255,255,0.35)"
                            : "1px solid rgba(255,255,255,0.08)",
                          overflow: "hidden",
                          position: "relative",
                          background: "#0a0816",
                          boxShadow: isHovered
                            ? "0 24px 48px -8px rgba(0,0,0,0.85)"
                            : "0 12px 36px -8px rgba(0,0,0,0.75)",
                          transition: "outline 0.3s, box-shadow 0.3s",
                        }}
                      >
                        <img
                          src={clip.src}
                          alt={`Press clipping — ${clip.pub}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            filter: isHovered
                              ? "none"
                              : (fanned
                                ? "sepia(70%) brightness(0.45) contrast(1.1)"
                                : "sepia(100%) brightness(0.28) contrast(1.15)"),
                            transition: "filter 0.4s ease",
                          }}
                        />

                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(to top, #0c0a18 0%, transparent 60%)",
                            opacity: isHovered ? 0.2 : 0.5,
                            transition: "opacity 0.3s",
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 pt-6 pb-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          aria-hidden="true"
        >
          <span
            className="text-[#7B2FBE] select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 300 }}
          >
            ⟨
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c084fc]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONTEXT & IMPACT
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span
            className="text-[#7B2FBE] select-none"
            style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 300 }}
          >
            ⟩
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-16 items-start">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7 flex flex-col justify-between h-full"
          >
            
            <div
              className="relative p-6 sm:p-8 rounded-r-xl transition-all duration-500 hover:border-[#c084fc]"
              style={{
                borderLeft: "3px solid #a855f7",
                background: "linear-gradient(90deg, rgba(168,85,247,0.12) 0%, rgba(126,34,206,0.03) 60%, transparent 100%)",
                boxShadow: "0 4px 20px -5px rgba(126,34,206,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.3rem, 2.2vw, 28px)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                &ldquo;The day Kerala stopped watching quantum computing happen
                — and started building it.&rdquo;
              </p>
            </div>

            <div
              className="flex items-start justify-between mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { num: "70+", label: "people gathered" },
                { num: "5", label: "expert keynotes" },
                { num: "1st", label: "Quantum IG · Kerala" },
              ].map(({ num, label }, i) => (
                <div
                  key={label}
                  className="flex-1 group"
                  style={{
                    paddingRight: i < 2 ? "20px" : "0",
                    paddingLeft: i > 0 ? "20px" : "0",
                    borderRight:
                      i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <p
                    className="text-white leading-none mb-2.5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:text-[#c084fc] origin-left"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2.2rem, 4vw, 54px)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      fontStyle: "italic",
                    }}
                  >
                    {num}
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em] text-white/35 font-medium group-hover:text-white/60 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-5 flex flex-col justify-between h-full lg:pt-2"
          >
            <div>
              
              <p
                className="text-[14px] sm:text-[15px] leading-[1.85] text-white/50 mb-7"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                India committed{" "}
                <span className="text-white font-semibold underline decoration-[#a855f7]/60 underline-offset-4">₹6,003 Cr </span> to
                the National Quantum Mission. Quantum Tech Matrix was Kerala&apos;s
                grassroots response — formally launching the state&apos;s first
                Quantum Technologies Interest Group, and giving birth to this
                very wiki.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Kerala's 1st Quantum Technologies Interest Group via MuLearn",
                  "QWiki — this open knowledge base, born from the event",
                  "A live network of students, researchers & global mentors",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3.5 group cursor-default">
                    <span
                      className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] transition-transform duration-300 group-hover:scale-150"
                      aria-hidden="true"
                    />
                    <p
                      className="text-[13px] sm:text-[14px] leading-[1.75] text-white/45 group-hover:text-white/85 transition-colors duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <Link
                href="/wiki"
                aria-label="Explore the QWiki knowledge base"
                className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3 text-[11px] font-bold uppercase tracking-[0.1em] transition-all hover:bg-[#c084fc] hover:text-black hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] hover:scale-[1.02]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore QWiki
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>

              <Link
                href="https://quantum-tech-matrix.mulearn.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the full Quantum Tech Matrix event recap"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40 hover:text-[#c084fc] transition-colors group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Full recap
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="pb-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2 pt-8 mb-7" aria-hidden="true">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Distinguished Guests
            </span>
            <div className="h-px flex-1 bg-white/5" />
            <span
              className="text-[10px] tracking-[0.15em] text-white/25 uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              5 speakers
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-5 gap-4 lg:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0" style={{ scrollbarWidth: "none" }}>
            {GUESTS.map((guest, i) => (
              <motion.div
                key={guest.src}
                className="relative flex-shrink-0 w-[170px] md:w-auto md:flex-shrink group cursor-default"
                onMouseEnter={() => setHoveredGuest(i)}
                onMouseLeave={() => setHoveredGuest(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                
                <div
                  className="w-full overflow-hidden relative"
                  style={{
                    aspectRatio: "3/4",
                    outline: hoveredGuest === i
                      ? "1px solid rgba(168,85,247,0.5)"
                      : "1px solid rgba(255,255,255,0.05)",
                    transition: "outline 0.3s, filter 0.4s",
                    filter: hoveredGuest === i
                      ? "grayscale(0%) brightness(1.05)"
                      : "grayscale(85%) brightness(0.65)",
                  }}
                >
                  <img
                    src={guest.src}
                    alt={guest.name}
                    className={`w-full h-full transition-transform duration-500 ${guest.cls}`}
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 px-3 py-2"
                    style={{
                      background: "rgba(8,6,20,0.88)",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span
                      className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#a855f7",
                      }}
                    >
                      {guest.role}
                    </span>
                  </div>

                  <div
                    className="absolute top-2 left-2 w-2.5 h-2.5 pointer-events-none transition-opacity duration-300"
                    style={{
                      borderTop: "1.5px solid #7e22ce",
                      borderLeft: "1.5px solid #7e22ce",
                      opacity: hoveredGuest === i ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute top-2 right-2 w-2.5 h-2.5 pointer-events-none transition-opacity duration-300"
                    style={{
                      borderTop: "1.5px solid #7e22ce",
                      borderRight: "1.5px solid #7e22ce",
                      opacity: hoveredGuest === i ? 1 : 0,
                    }}
                  />
                </div>

                <div className="mt-3.5 px-0.5">
                  <p
                    className="text-[13px] md:text-[14px] font-semibold text-white/70 leading-snug group-hover:text-white/95 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {guest.name}
                  </p>
                  <p
                    className="text-[11px] md:text-[12px] text-white/40 mt-1 leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {guest.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div
          className="relative overflow-hidden"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
          aria-hidden="true"
        >
          
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0c0a18 0%, transparent 100%)" }}
          />
          
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0c0a18 0%, transparent 100%)" }}
          />

          <div
            className="flex items-center gap-0 whitespace-nowrap"
            style={{ animation: "marquee 55s linear infinite", willChange: "transform" }}
          >
            {[...PRESS_CLIPS, ...PRESS_CLIPS, ...PRESS_CLIPS].map((clip, i) => (
              <span
                key={i}
                className="inline-flex flex-col items-center mr-8 flex-shrink-0"
              >
                
                <span
                  style={{
                    display: "inline-block",
                    width: "100px",
                    height: "66px",
                    overflow: "hidden",
                    outline: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={clip.src}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      filter: "sepia(100%) brightness(0.3) contrast(1.2)",
                    }}
                  />
                </span>
                
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "8px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(168,85,247,0.35)",
                    marginTop: "5px",
                  }}
                >
                  {clip.pub}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedClip !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#080614]/92 backdrop-blur-md"
            onClick={() => setSelectedClip(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[840px] bg-[#0c0a18] border border-white/10 p-2.5 sm:p-4 group/modal"
              style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.85)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#7e22ce] pointer-events-none z-20" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#7e22ce] pointer-events-none z-20" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#7e22ce] pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#7e22ce] pointer-events-none z-20" />

              {/* Scrollable / Swipeable Newspaper Clippings Track */}
              <div className="relative overflow-hidden">
                <div
                  ref={modalSliderRef}
                  onScroll={handleModalScroll}
                  tabIndex={0}
                  role="region"
                  aria-label="Newspaper Clippings Viewer"
                  aria-roledescription="carousel"
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth focus:outline-none touch-pan-x max-h-[66vh] sm:max-h-[70vh]"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {PRESS_CLIPS.map((clip, idx) => (
                    <div
                      key={idx}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${clip.pub} (${idx + 1} of ${PRESS_CLIPS.length})`}
                      className="min-w-full w-full flex-shrink-0 snap-center flex items-center justify-center p-1 sm:p-2 select-none"
                    >
                      <img
                        src={clip.src}
                        alt={clip.pub}
                        draggable={false}
                        className="max-w-full max-h-[62vh] sm:max-h-[66vh] w-auto h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Discrete Navigation Arrows */}
                <button
                  type="button"
                  onClick={() => scrollToModalClip((selectedClip - 1 + PRESS_CLIPS.length) % PRESS_CLIPS.length)}
                  aria-label="Previous clipping"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#080614]/85 border border-white/10 text-white/70 hover:text-white hover:border-[#a855f7]/60 hover:bg-[#120e28] transition-all backdrop-blur-xs shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToModalClip((selectedClip + 1) % PRESS_CLIPS.length)}
                  aria-label="Next clipping"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#080614]/85 border border-white/10 text-white/70 hover:text-white hover:border-[#a855f7]/60 hover:bg-[#120e28] transition-all backdrop-blur-xs shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Discrete Progress Bar */}
              <div
                className="h-[2px] overflow-hidden mt-3 relative"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    background: "linear-gradient(90deg, #7e22ce, #c084fc)",
                    width: `${((selectedClip + 1) / PRESS_CLIPS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-3 px-2 sm:px-3 pb-1 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-serif italic text-base sm:text-lg leading-tight">
                      {PRESS_CLIPS[selectedClip].pub}
                    </h4>
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30 font-medium">
                      {PRESS_CLIPS[selectedClip].lang === "ml" ? "Malayalam" : "English"}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-[#a855f7] mt-0.5" style={{ fontFamily: "var(--font-display)" }}>
                    Press Clipping {String(selectedClip + 1).padStart(2, "0")} / {String(PRESS_CLIPS.length).padStart(2, "0")}
                  </p>
                </div>

                {/* Discrete Pagination Dots */}
                <div className="flex items-center gap-1">
                  {PRESS_CLIPS.map((clip, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToModalClip(i)}
                      aria-label={`View ${clip.pub}`}
                      className="p-1.5 group flex items-center justify-center cursor-pointer focus:outline-none"
                    >
                      <span
                        style={{
                          width: i === selectedClip ? "20px" : "5px",
                          height: "3px",
                          borderRadius: "2px",
                          background:
                            i === selectedClip
                              ? "#a855f7"
                              : "rgba(255,255,255,0.2)",
                          transition: "all 0.3s ease",
                        }}
                        className="block group-hover:bg-[#c084fc]"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-white/30" style={{ fontFamily: "var(--font-display)" }}>
                    Swipe / Arrows to browse
                  </span>
                  <button
                    onClick={() => setSelectedClip(null)}
                    className="px-4 py-1.5 border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

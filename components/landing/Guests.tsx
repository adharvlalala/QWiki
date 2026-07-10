"use client";

import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

const GUESTS = [
  { id: "g1", name: "Shri CP John", role: "Chief Guest", position: "Minister of Transport, Government of Kerala", image: "/images/guest1.png" },
  { id: "g2", name: "Prof. Dr. Mathew Chandrankunnel", role: "Keynote Speaker", position: "Quantum Scientist, Sr. Consultant, JIS University, Kolkata.", image: "/images/guest2.png" },
  { id: "g3", name: "Deepu S Nath", role: "Chief Volunteer - MuLearn", position: "Managing Director @ FAYA", image: "/images/guest3.png" },
  { id: "g-new", name: "Dr. Rubell Marion Lincy G", role: "Keynote Speaker", position: "Assistant Professor and Head of the Department of Computer Science and Engineering, IIIT Kottayam", image: "/images/guest5.png" },
  { id: "g4", name: "Shri Manoj Joseph", role: "Mentor", position: "Director, SuperQ Quantum, Canada", image: "/images/guest4.png" },
];

export default function Guests() {
  return (
    <section
      id="guests"
      aria-labelledby="qtm-guests-heading"
      className="relative py-16 md:py-32 px-4 md:px-8"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-10 md:mb-14">
          <p
            className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] mb-2 md:mb-3"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
          >
            — 03 / Special Guests
          </p>
          <motion.h2
            id="qtm-guests-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="leading-[1.0] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            Voices of the<br />Quantum <span style={{ color: "#7B2FBE" }}>Future</span>
          </motion.h2>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-[#333333]"
          style={{ border: "1px solid #333333" }}
        >
          {GUESTS.map((guest, i) => {
            return (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                className={i === 0 ? "col-span-2 md:col-span-2 lg:col-span-1" : "col-span-1"}
              >
                <TiltCard className="flex flex-col h-full cursor-default group relative overflow-hidden bg-[#120F1C] hover:shadow-[0_0_30px_rgba(0,250,154,0.25),inset_0_0_0_1px_#00fa9a] hover:z-10 transition-shadow duration-300">
                  <article className={`flex h-full ${i === 0 ? "flex-row md:flex-row lg:flex-col" : "flex-col"}`}>
                    <div
                      className={`aspect-square relative overflow-hidden bg-[#090710] ${
                        i === 0
                          ? "w-1/2 md:w-1/2 lg:w-full border-r border-[#333333] lg:border-r-0 lg:border-b"
                          : "w-full border-b border-[#333333]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-glare transition-opacity z-10 pointer-events-none" />

                      {guest.image ? (
                        <img
                          src={guest.image}
                          alt={guest.name}
                          className={`w-full h-full transition-transform duration-500 ${guest.id === "g1"
                            ? "object-cover object-top group-hover:scale-105"
                            : guest.id === "g2"
                              ? "object-cover object-[25%_top] group-hover:scale-105"
                              : guest.id === "g3"
                                ? "object-cover object-top scale-[2.2] origin-[50%_55%] group-hover:scale-[2.3]"
                                : guest.id === "g-new"
                                  ? "object-cover object-[50%_20%] scale-[1.6] origin-[50%_20%] group-hover:scale-[1.7]"
                                  : "object-cover group-hover:scale-105"
                            }`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <div className="w-1/3 h-[1px] bg-[#FFFFFF] absolute rotate-45" />
                          <div className="w-1/3 h-[1px] bg-[#FFFFFF] absolute -rotate-45" />
                        </div>
                      )}
                    </div>

                    <div className={`p-3.5 md:p-5 flex-1 flex flex-col justify-center lg:justify-start ${i === 0 ? "w-1/2 md:w-1/2 lg:w-full" : ""}`}>
                      <h3
                        className="text-[12px] md:text-[15px] font-black uppercase tracking-[0.05em] mb-1 group-hover:text-[#00fa9a] transition-colors relative z-10 line-clamp-2"
                        style={{ color: "#FFFFFF", fontFamily: "var(--font-display)", minHeight: "2.4em" }}
                      >
                        {guest.name}
                      </h3>
                      <p
                        className="text-[9px] md:text-[12px] uppercase tracking-[0.1em] relative z-10 mb-1.5 md:mb-2"
                        style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
                      >
                        {guest.role || "\u00A0"}
                      </p>
                      <p
                        className="text-[9px] md:text-[11px] leading-[140%] relative z-10 line-clamp-3 md:line-clamp-none"
                        style={{ color: "#888888", fontFamily: "var(--font-display)" }}
                      >
                        {guest.position}
                      </p>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

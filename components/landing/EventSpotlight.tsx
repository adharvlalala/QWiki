"use client";

import { motion } from "framer-motion";

const EVENT = {
  dateDisplay: "12.JUL.2026",
  venue: "Gokulam Grand Trivandrum",
  title: "Quantum Tech Matrix",
  subtitle: "Kerala's first Quantum Technologies IG Launch",
  description:
    "A landmark full-day summit that formally unveiled the MuLearn Quantum Technologies Interest Group — bringing together students, researchers, faculty, and industry leaders for keynote sessions, live lab simulations, and the official launch of QWiki.",
  chiefGuest: {
    name: "Shri CP John",
    role: "Chief Guest",
    position: "Minister of Transport, Government of Kerala",
    image: "/images/guest1.png",
  },
  speakers: [
    {
      name: "Prof. Dr. Mathew Chandrankunnel",
      role: "Keynote Speaker",
      position: "Quantum Scientist, Sr. Consultant, JIS University, Kolkata",
      image: "/images/guest2.png",
    },
    {
      name: "Dr. Rubell Marion Lincy G",
      role: "Keynote Speaker",
      position: "HoD, CSE — IIIT Kottayam",
      image: "/images/guest5.png",
    },
    {
      name: "Shri Manoj Joseph",
      role: "Mentor",
      position: "Director, SuperQ Quantum, Canada",
      image: "/images/guest4.png",
    },
    {
      name: "Deepu S Nath",
      role: "Chief Volunteer – MuLearn",
      position: "Managing Director @ FAYA",
      image: "/images/guest3.png",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};


/** Thin wireframe grid overlay — purely decorative */
function WireGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, #7B2FBE 1px, transparent 1px),
          linear-gradient(to bottom, #7B2FBE 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        opacity: 0.035,
      }}
    />
  );
}

/** ⟨ | ⟩  divider using bra-ket notation */
function BraKetDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 my-6" aria-hidden="true">
      <span
        className="text-[#7B2FBE] select-none"
        style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}
      >
        ⟨
      </span>
      <div className="flex-1 h-[1px] bg-[#333333]" />
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-[1px] bg-[#333333]" />
      <span
        className="text-[#7B2FBE] select-none"
        style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}
      >
        ⟩
      </span>
    </div>
  );
}

/** Speaker card — sharp hover, color inversion on name */
function SpeakerCard({
  person,
}: {
  person: {
    name: string;
    role: string;
    position: string;
    image: string;
  };
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col bg-[#120F1C] border border-[#333333] overflow-hidden cursor-default transition-all duration-300 hover:border-[#00fa9a] hover:shadow-[0_0_20px_rgba(0,250,154,0.18)]"
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#7B2FBE]/50 z-10 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#7B2FBE]/50 z-10 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#7B2FBE]/50 z-10 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#7B2FBE]/50 z-10 pointer-events-none" />

      {/* Glare sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-[0.06] group-hover:animate-glare transition-opacity z-10 pointer-events-none" />

      {/* Image */}
      <div className="relative overflow-hidden bg-[#090710] border-b border-[#333333] aspect-square">
        <img
          src={person.image}
          alt={person.name}
          className={`w-full h-full transition-transform duration-500 ${
            person.image === "/images/guest1.png"
              ? "object-cover object-top group-hover:scale-105"
              : person.image === "/images/guest2.png"
              ? "object-cover object-[25%_top] group-hover:scale-105"
              : person.image === "/images/guest3.png"
              ? "object-cover object-top scale-[2.2] origin-[50%_55%] group-hover:scale-[2.3]"
              : person.image === "/images/guest5.png"
              ? "object-cover object-[50%_20%] scale-[1.6] origin-[50%_20%] group-hover:scale-[1.7]"
              : "object-cover group-hover:scale-105"
          }`}
        />
        {/* Role badge */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-[#090710]/85 backdrop-blur-sm border-t border-[#333333]">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "#00fa9a", fontFamily: "var(--font-mono)" }}
          >
            {person.role}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h4
          className="text-[12px] md:text-[13px] font-black uppercase tracking-tight text-white group-hover:text-[#00fa9a] transition-colors duration-300 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {person.name}
        </h4>
        <p
          className="text-[10px] leading-[1.5] text-[#888888]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {person.position}
        </p>
      </div>
    </motion.article>
  );
}

export default function EventSpotlight() {
  return (
    <section
      id="event-spotlight"
      aria-labelledby="qtm-spotlight-heading"
      className="relative py-16 md:py-24 lg:py-32 px-6 md:px-8 overflow-hidden"
      style={{
        backgroundColor: "#0c0a18",
        borderTop: "1px solid #333333",
        borderBottom: "1px solid #333333",
      }}
    >
      <WireGrid />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full">

        <div className="mb-10 md:mb-14 flex items-start justify-between gap-6 flex-wrap">
          <div>
            {/* Badge row */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="quantum-chip"
                style={{ borderRadius: "0px", letterSpacing: "0.12em" }}
              >
                RECENT EVENT
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#00fa9a] animate-pulse"
                  style={{ boxShadow: "0 0 6px #00fa9a" }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#00fa9a]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  CONCLUDED
                </span>
              </span>
            </div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-3"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
            >
              — 00 / Spotlight
            </motion.p>

            <motion.h2
              id="qtm-spotlight-heading"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="leading-[1.0] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 52px)",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              Quantum Tech <span style={{ color: "#7B2FBE" }}>Matrix</span>
              <br />
              <span
                className="text-[16px] md:text-[18px] font-medium tracking-normal text-[#A3A3A3]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {EVENT.subtitle}
              </span>
            </motion.h2>
          </div>

          {/* Mono metadata block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-col gap-2 text-right"
            aria-label="Event metadata"
          >
            {[
              { key: "DATE", val: EVENT.dateDisplay, color: "#A3A3A3" },
              { key: "VENUE", val: EVENT.venue, color: "#A3A3A3" },
              { key: "STATE", val: "COMPLETE", color: "#00fa9a" },
            ].map(({ key, val, color }) => (
              <div
                key={key}
                className="text-[11px] font-medium tracking-[0.08em]"
                style={{ fontFamily: "var(--font-mono)", color: "#888888" }}
              >
                <span className="text-[#555555]">{key} /</span>{" "}
                <span style={{ color }}>{val}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-[#333333] border border-[#333333]">

          {/* CELL A — Primary image: 7 cols */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative bg-[#120F1C] overflow-hidden group"
            style={{ minHeight: "340px" }}
          >
            {/* Green top-accent line (matches Motives.tsx) */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00fa9a] z-10" />

            <img
              src="/placeholder-event.jpg"
              alt="Quantum Tech Matrix — Main stage"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#090710]/90 to-transparent z-10">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00fa9a]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                QTM.GALLERY_01 // MAIN_STAGE
              </p>
            </div>

            {/* Corner brackets on image */}
            <div className="absolute top-6 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00fa9a]/60 z-10 pointer-events-none" />
            <div className="absolute bottom-10 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00fa9a]/60 z-10 pointer-events-none" />
          </motion.div>

          {/* CELL B — Description + secondary image: 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-[1px]">

            {/* B1 — Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#120F1C]"
              style={{ borderBottom: "1px solid #333333" }}
            >
              <div>
                <span
                  className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-[#7B2FBE] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SYS.EVENT_DESC
                </span>
                <p
                  className="text-[14px] md:text-[15px] leading-[1.75] text-[#A3A3A3]"
                  style={{
                    fontFamily: "var(--font-display)",
                    borderLeft: "1px solid #333333",
                    paddingLeft: "1rem",
                  }}
                >
                  {EVENT.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#333333]">
                {[
                  { label: "Speakers", value: "05" },
                  { label: "Sessions", value: "06+" },
                  { label: "Attendees", value: "200+" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span
                      className="text-[22px] font-black text-white leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.18em] text-[#555555]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* B2 — Secondary image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="relative bg-[#090710] overflow-hidden group"
              style={{ minHeight: "160px" }}
            >
              <img
                src="/placeholder-event.jpg"
                alt="Quantum Tech Matrix — Session highlight"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none">
                <span
                  className="text-[8px] font-bold tracking-[0.18em] text-[#333333]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  QTM.GALLERY_02
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <BraKetDivider label="Chief Guest" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[#333333] border border-[#333333] border-t-[3px] border-t-[#7B2FBE]"
        >
          {/* Portrait */}
          <div className="relative bg-[#120F1C] overflow-hidden group" style={{ minHeight: "280px" }}>
            <img
              src={EVENT.chiefGuest.image}
              alt={EVENT.chiefGuest.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-[0.06] group-hover:animate-glare transition-opacity pointer-events-none z-10" />
          </div>

          {/* Info */}
          <div className="bg-[#120F1C] p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="quantum-chip"
                  style={{
                    borderRadius: "0px",
                    background: "rgba(123,47,190,0.12)",
                    borderColor: "rgba(123,47,190,0.4)",
                    color: "#a855f7",
                  }}
                >
                  {EVENT.chiefGuest.role}
                </span>
              </div>
              <h3
                className="font-black uppercase tracking-tight text-white leading-[1.05] mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 3vw, 2rem)",
                }}
              >
                {EVENT.chiefGuest.name}
              </h3>
              <p
                className="text-[13px] text-[#888888] leading-relaxed"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {EVENT.chiefGuest.position}
              </p>
            </div>

            {/* HUD footer line */}
            <div className="mt-6 pt-4 border-t border-[#333333] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FBE]" />
              <span
                className="text-[9px] uppercase tracking-[0.2em] text-[#444444]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                QTM.CHIEF_GUEST // PRESENT
              </span>
            </div>
          </div>
        </motion.div>

        <BraKetDivider label="Keynote Speakers" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#333333] border border-[#333333]"
        >
          {EVENT.speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} person={speaker} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

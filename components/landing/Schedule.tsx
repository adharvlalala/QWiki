"use client";

import { motion } from "framer-motion";

const SCHEDULE_ITEMS = [
  { time: "10:00 AM – 10:10 AM", title: "Invitation", desc: "Welcoming guests and setting the stage." },
  { time: "10:10 AM – 10:30 AM", title: "Introduction", desc: "Overview of the Quantum Technologies Interest Group (IG) launch." },
  { time: "10:30 AM – 11:00 AM", title: "Minister's Speech", desc: "Address by Shri CP John, Minister of Transport, Government of Kerala." },
  { time: "11:00 AM – 11:15 AM", title: "Website Launch", desc: "Official launch of the website and speech by Manoj Sir, Mentor." },
  { time: "11:15 AM – 12:00 PM", title: "Keynote", desc: "Keynote address by Prof. Dr. Mathew Chandrankunnel CMI." },
  { time: "12:00 PM – 12:10 PM", title: "Break", desc: "Short intermission." },
  { time: "12:10 PM – 01:00 PM", title: "Interactive Session", desc: "Audience Q&A and active discussion." },
  { time: "01:00 PM – 02:15 PM", title: "Lunch Break", desc: "Lunch and group networking photo (at 1:45 PM)." },
  { time: "02:20 PM – 02:35 PM", title: "ChatQLM Demo", desc: "Quantum Computing Lab Simulation Demo by Nanostuff Technologies, powered by SuperQ Quantum Computing." },
  { time: "02:35 PM – 03:05 PM", title: "Networking Session", desc: "Session led by G Hari Kumar, Founder Editor, TikTalk newsletter." },
  { time: "03:05 PM – 03:25 PM", title: "Company Sponsors", desc: "Brief segment honoring sponsor companies." },
  { time: "03:25 PM – 03:45 PM", title: "Vote of Thanks", desc: "Gratitude remarks." },
  { time: "03:45 PM – 04:00 PM", title: "Feedback", desc: "Feedback forms collection." }
];

export default function Schedule() {
  return (
    <section
      id="schedule"
      aria-labelledby="qtm-schedule-heading"
      className="relative py-16 md:py-24 lg:py-32 px-6 md:px-8"
      style={{ backgroundColor: "#090710", borderTop: "1px solid #333333" }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header row */}
        <div className="flex items-end justify-between mb-14 gap-4">
          <div>
            <p
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-3"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)" }}
            >
              — 04 / Programme
            </p>
            <motion.h2
              id="qtm-schedule-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="leading-[1.0] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 56px)",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              Event <span style={{ color: "#7B2FBE" }}>Schedule</span>
            </motion.h2>
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative border-l border-[#333333] pl-6 md:pl-8 ml-2 md:ml-4 space-y-6 md:space-y-8">
          {SCHEDULE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Dot indicator */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#120F1C] border-2 border-[#333333] group-hover:border-[#00fa9a] group-hover:bg-[#00fa9a] transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)]" />

              <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-8">
                {/* Time badge */}
                <div className="text-[12px] font-black uppercase tracking-[0.1em] text-[#00fa9a] md:w-[200px] shrink-0 font-[family-name:var(--font-display)]">
                  {item.time}
                </div>
                {/* Title & Description */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1 uppercase tracking-tight font-[family-name:var(--font-display)]">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#A3A3A3] font-[family-name:var(--font-display)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

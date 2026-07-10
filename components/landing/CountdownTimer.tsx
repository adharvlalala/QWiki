"use client";

import { useState, useEffect } from "react";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

const EVENT_DATE = new Date("2026-07-12T10:00:00+05:30");

function calcTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1 md:gap-1.5">
      <div
        className="flex items-center justify-center w-[40px] h-[40px] md:w-[68px] md:h-[68px]"
        style={{
          backgroundColor: "#120F1C",
          border: `1px solid #333333`,
        }}
      >
        <span
          className="text-[18px] md:text-[28px] font-black tabular-nums text-white"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {formatted}
        </span>
      </div>
      <span
        className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.18em]"
        style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  if (!mounted) return null;

  const isOver = !Object.values(timeLeft).some(Boolean);

  return (
    <div className="flex flex-col items-center gap-3">
      {!isOver ? (
        <div className="flex items-start gap-1 md:gap-3">
          <Digit value={timeLeft.days} label="Days" />
          <span className="text-[#333333] font-bold text-[18px] md:text-[24px] leading-[40px] md:leading-[68px]">:</span>
          <Digit value={timeLeft.hours} label="Hours" />
          <span className="text-[#333333] font-bold text-[18px] md:text-[24px] leading-[40px] md:leading-[68px]">:</span>
          <Digit value={timeLeft.minutes} label="Mins" />
          <span className="text-[#333333] font-bold text-[18px] md:text-[24px] leading-[40px] md:leading-[68px]">:</span>
          <Digit value={timeLeft.seconds} label="Secs" />
        </div>
      ) : (
        <p className="text-lg font-black text-[#FFFFFF] uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
          The event has begun.
        </p>
      )}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantumProgressBarProps {
  label: string;
  value: number;     
  displayValue?: string;
  color?: "cyan" | "blue" | "purple";
  className?: string;
  animateOnView?: boolean;
}

export default function QuantumProgressBar({
  label,
  value,
  displayValue,
  color = "cyan",
  className,
  animateOnView = true,
}: QuantumProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const animated = !animateOnView || inView;

  const trackColors = {
    cyan:   "from-[#a855f7] to-[#7e22ce]",
    blue:   "from-[#7e22ce] to-[#8127cf]",
    purple: "from-[#8127cf] to-[#a855f7]",
  };

  const glowColors = {
    cyan:   "rgba(168,85,247,0.5)",
    blue:   "rgba(126,34,206,0.5)",
    purple: "rgba(129,39,207,0.5)",
  };

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium text-[#424754]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#006577",
            letterSpacing: "0.05em",
          }}
          aria-live="polite"
        >
          {displayValue ?? `${value}%`}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-[2px] w-full rounded-full bg-[#e1e3e4] overflow-visible"
      >
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animated ? `${value}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className={cn(
            "absolute top-0 left-0 h-full rounded-full",
            "bg-gradient-to-r",
            trackColors[color]
          )}
          style={{
            boxShadow: `0 0 8px 1px ${glowColors[color]}`,
          }}
        >
          
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
              backgroundSize: "200% auto",
            }}
            animate={animated ? { backgroundPosition: ["200% center", "-200% center"] } : undefined}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          <span
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              background: color === "cyan" ? "#a855f7" : color === "blue" ? "#7e22ce" : "#8127cf",
              boxShadow: `0 0 6px 2px ${glowColors[color]}`,
              transform: "translateY(-50%) translateX(50%)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

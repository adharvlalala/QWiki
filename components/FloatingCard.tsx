"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  
  "aria-label"?: string;
}

export default function FloatingCard({
  children,
  className,
  delay = 0,
  hover = true,
  "aria-label": ariaLabel,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      aria-label={ariaLabel}
      className={cn(
        "relative bg-white rounded-xl overflow-hidden",
        "border border-[rgba(168,85,247,0.15)]",
        "shadow-[0_8px_30px_rgba(168,85,247,0.08)]",
        "transition-all duration-300",
        hover && [
          "hover:border-[rgba(168,85,247,0.45)]",
          "hover:shadow-[0_16px_48px_rgba(168,85,247,0.18)]",
          "group cursor-pointer",
        ],
        className
      )}
    >
      
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 right-0 h-px",
          "bg-gradient-to-r from-transparent via-[rgba(168,85,247,0.4)] to-transparent",
          "opacity-0 transition-opacity duration-300",
          hover && "group-hover:opacity-100"
        )}
      />
      {children}
    </motion.div>
  );
}

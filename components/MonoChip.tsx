import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MonoChipProps {
  children: ReactNode;
  color?: "cyan" | "blue" | "purple" | "gray" | "editorial";
  className?: string;
}

const colorMap = {
  cyan: {
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
    text: "#6900b3",
  },
  blue: {
    bg: "rgba(126,34,206,0.08)",
    border: "rgba(126,34,206,0.25)",
    text: "#6900b3",
  },
  purple: {
    bg: "rgba(129,39,207,0.08)",
    border: "rgba(129,39,207,0.25)",
    text: "#6900b3",   // on-secondary-fixed-variant — WCAG AA compliant
  },
  gray: {
    bg: "rgba(114,119,133,0.08)",
    border: "rgba(114,119,133,0.25)",
    text: "#424754",   // on-surface-variant — WCAG AA compliant
  },
  editorial: {
    bg: "transparent",
    border: "#E5E5E5",
    text: "#000000",
  },
};

export default function MonoChip({ children, color = "cyan", className }: MonoChipProps) {
  const c = colorMap[color];
  return (
    <span
      className={cn("inline-flex items-center quantum-chip", className)}
      style={{
        background: c.bg,
        borderColor: c.border,
        color: c.text,
        borderRadius: "0px",
      }}
    >
      {children}
    </span>
  );
}

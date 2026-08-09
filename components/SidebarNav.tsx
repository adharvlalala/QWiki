"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Hash,
  BookOpen,
  Layers,
  Cpu,
  Zap,
  FlaskConical,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: { href: string; label: string }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    icon: <BookOpen size={15} aria-hidden="true" />,
    items: [
      { href: "/wiki/quantum-mechanics", label: "Quantum Mechanics" },
      { href: "/wiki/wave-particle-duality", label: "Wave-Particle Duality" },
      { href: "/wiki/uncertainty-principle", label: "Uncertainty Principle" },
    ],
  },
  {
    id: "computing",
    label: "Quantum Computing",
    icon: <Cpu size={15} aria-hidden="true" />,
    items: [
      { href: "/wiki/qubits", label: "Qubits" },
      { href: "/wiki/quantum-gates", label: "Quantum Gates" },
      { href: "/wiki/quantum-circuits", label: "Quantum Circuits" },
      { href: "/wiki/error-correction", label: "Error Correction" },
    ],
  },
  {
    id: "algorithms",
    label: "Algorithms",
    icon: <Zap size={15} aria-hidden="true" />,
    items: [
      { href: "/wiki/shors-algorithm", label: "Shor's Algorithm" },
      { href: "/wiki/grovers-algorithm", label: "Grover's Algorithm" },
      { href: "/wiki/vqe", label: "Variational QE" },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: <Layers size={15} aria-hidden="true" />,
    items: [
      { href: "/wiki/superconducting-qubits", label: "Superconducting" },
      { href: "/wiki/photonic-qubits", label: "Photonic" },
      { href: "/wiki/trapped-ions", label: "Trapped Ions" },
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: <FlaskConical size={15} aria-hidden="true" />,
    items: [
      { href: "/wiki/quantum-advantage", label: "Quantum Advantage" },
      { href: "/wiki/nisq-era", label: "NISQ Era" },
    ],
  },
];

interface SidebarNavProps {
  activeSlug?: string;
}

export default function SidebarNav({ activeSlug }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["fundamentals", "computing"])
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 48 : 240 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "relative flex flex-col shrink-0 h-full",
        "ml-4 border-r border-[#E5E5E5]",
        "overflow-hidden",
        "bg-white"
      )}
      aria-label="Wiki navigation sidebar"
    >
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
        className={cn(
          "absolute -right-3.5 top-6 z-10",
          "w-7 h-7",
          "bg-white border border-[#E5E5E5]",
          "flex items-center justify-center",
          "text-[#666666] hover:text-[#000000]",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
        )}
      >
        {collapsed ? (
          <ChevronRight size={12} aria-hidden="true" />
        ) : (
          <ChevronLeft size={12} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full py-5 px-3 overflow-y-auto"
          >
            
            <div className="flex items-center gap-2 px-2 mb-5">
              <Hash size={14} className="text-[#666666]" aria-hidden="true" />
              <span
                className="text-xs font-semibold text-[#666666] uppercase tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Contents
              </span>
            </div>

            <nav aria-label="Article sections">
              <ul className="space-y-1">
                {NAV_SECTIONS.map((section) => {
                  const isOpen = openSections.has(section.id);
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        aria-expanded={isOpen}
                        aria-controls={`section-${section.id}`}
                        className={cn(
                          "w-full flex items-center justify-between",
                          "px-3 py-2 text-sm font-medium",
                          "text-[#1b1b1b]",
                          "hover:bg-[#f9f9f9]",
                          "transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:underline"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#666666]">{section.icon}</span>
                          {section.label}
                        </span>
                        <ChevronDown
                          size={13}
                          aria-hidden="true"
                          className={cn(
                            "text-[#666666] transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            id={`section-${section.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden ml-4 mt-0.5 border-l border-[#E5E5E5]"
                          >
                            {section.items.map((item) => {
                              const isActive = activeSlug
                                ? item.href.endsWith(activeSlug)
                                : false;
                              return (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                      "block pl-4 pr-3 py-1.5 text-sm",
                                      "transition-colors duration-150",
                                      "focus-visible:outline-none focus-visible:underline",
                                      isActive
                                        ? "text-[#000000] font-semibold border-l-2 border-[#000000] -ml-[1px]"
                                        : "text-[#666666] hover:text-[#000000]"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

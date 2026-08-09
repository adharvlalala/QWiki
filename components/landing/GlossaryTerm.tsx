"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
const ENTRIES: Record<string, { term: string; type: string; definition: string }> = {
  "lab-simulations": {
    term: "Quantum Lab Simulations",
    type: "METHODOLOGY",
    definition:
      "Hands-on practice using software to act like a real quantum computer. It lets you learn and test quantum code without needing access to a million-dollar physical machine.",
  },
  "quantum-community": {
    term: "Quantum Community",
    type: "ECOSYSTEM",
    definition:
      "A supportive network of students, teachers, and tech fans working together to learn and build quantum tech. It's the first group of its kind in Kerala.",
  },
  "interest-group": {
    term: "Interest Group (IG)",
    type: "ORGANIZATION",
    definition:
      "A special club inside MuLearn focused on one specific technology. Members team up on projects, share what they learn, and help each other grow.",
  },
  "qwiki": {
    term: "QWiki",
    type: "PLATFORM",
    definition:
      "An online encyclopedia built entirely by our community. It explains quantum concepts in simple terms, written and reviewed by our own members.",
  },
  "national-quantum-mission": {
    term: "National Quantum Mission (NQM)",
    type: "GOVERNMENT MISSION",
    definition:
      "A massive ₹6,003 Crore project by the Indian government to make the country a world leader in quantum computers, ultra-secure communication, and next-gen sensors.",
  },
  "post-quantum-cryptography": {
    term: "Post-Quantum Cryptography",
    type: "SECURITY",
    definition:
      "Super-strong digital locks designed to keep your data safe. They are so tough that even future ultra-powerful quantum computers won't be able to break them.",
  },
  "quantum-sensors": {
    term: "Quantum Sensors",
    type: "HARDWARE",
    definition:
      "Extremely sensitive devices that use quantum physics to measure things like gravity, magnetic fields, and temperature much more accurately than regular sensors ever could.",
  },
  "post-classical-computation": {
    term: "Post-Classical Computation",
    type: "PARADIGM",
    definition:
      "The next generation of computing. Instead of just using normal 1s and 0s like your laptop, it uses new methods—like quantum physics or light—to solve problems much faster.",
  },
  "quantum-mechanics": {
    term: "Quantum Mechanics",
    type: "PRINCIPLE",
    definition:
      "The branch of physics that explains how the universe works at the tiniest level—like atoms and electrons. At this scale, normal physics rules break down and things act very differently.",
  },
  "chatqlm": {
    term: "ChatQLM",
    type: "SIMULATOR",
    definition:
      "A learning tool that combines AI (like ChatGPT) with quantum computing. It helps explain quantum concepts and shows how AI can interact with quantum systems.",
  },
};

const CARD_WIDTH = 264;
type Corner = "tl" | "tr" | "bl" | "br";
function CornerBracket({ corner }: { corner: Corner }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 8,
        height: 8,
        ...(corner[0] === "t" ? { top: 5 } : { bottom: 5 }),
        ...(corner[1] === "l" ? { left: 5 } : { right: 5 }),
        borderTop: corner[0] === "t" ? "1px solid #7B2FBE" : undefined,
        borderBottom: corner[0] === "b" ? "1px solid #7B2FBE" : undefined,
        borderLeft: corner[1] === "l" ? "1px solid #7B2FBE" : undefined,
        borderRight: corner[1] === "r" ? "1px solid #7B2FBE" : undefined,
      }}
    />
  );
}
/**
 * GlossaryTerm
 *
 * Wraps a word or phrase with a dotted purple underline. On hover (desktop)
 * or tap (mobile), a precisely positioned annotation card appears with a
 * term definition styled to match the neo-brutalist design language.
 *
 * The card is rendered via React Portal into document.body, bypassing any
 * CSS transform ancestors that would break position: fixed.
 *
 * Usage:
 *   <GlossaryTerm id="qwiki">QWiki</GlossaryTerm>
 */
export function GlossaryTerm({ id, children }: { id: string; children: React.ReactNode }) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const entry = ENTRIES[id];
  const computeCardStyle = useCallback((): React.CSSProperties => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    const above = rect.top > window.innerHeight * 0.55;
    const rawLeft = rect.left + rect.width / 2;
    const clampedLeft = Math.max(
      CARD_WIDTH / 2 + 12,
      Math.min(window.innerWidth - CARD_WIDTH / 2 - 12, rawLeft)
    );
    return {
      left: `${clampedLeft}px`,
      transform: "translateX(-50%)",
      ...(above
        ? { bottom: `${window.innerHeight - rect.top + 10}px` }
        : { top: `${rect.bottom + 10}px` }),
    };
  }, []);
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => clearTimeout(closeTimerRef.current);

  const openCard = useCallback(() => {
    cancelClose();
    setCardStyle(computeCardStyle());
    setOpen(true);
  }, [computeCardStyle]);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    openCard();
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    scheduleClose();
  };

  const handleCardMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    cancelClose();
  };

  const handleCardMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    scheduleClose();
  };
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      openCard();
    }
  };
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!triggerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  if (!entry) return <>{children}</>;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-help"
        style={{ borderBottom: "1px dotted #7B2FBE", paddingBottom: "1px" }}
        aria-describedby={open ? `gloss-${id}` : undefined}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id={`gloss-${id}`}
                role="tooltip"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  ...cardStyle,
                  width: `${CARD_WIDTH}px`,
                  zIndex: 9999,
                  backgroundColor: "#0d0a16",
                  border: "1px solid #2a2a2a",
                  padding: "16px 18px",
                  pointerEvents: "auto",
                }}
              >
                {/* Decorative corner brackets */}
                <CornerBracket corner="tl" />
                <CornerBracket corner="tr" />
                <CornerBracket corner="bl" />
                <CornerBracket corner="br" />

                {/* Type badge */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "#00fa9a",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  {entry.type}
                </p>

                {/* Term name */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                  }}
                >
                  {entry.term}
                </p>

                {/* Hairline rule */}
                <div
                  style={{
                    height: 1,
                    backgroundColor: "#1e1e1e",
                    marginBottom: "10px",
                  }}
                />

                {/* Definition */}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "12px",
                    color: "#A3A3A3",
                    lineHeight: 1.68,
                  }}
                >
                  {entry.definition}
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

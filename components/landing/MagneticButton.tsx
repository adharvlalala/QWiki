"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * MagneticButton
 * Wraps any element with cursor-attraction physics. The child drifts
 * toward the cursor (capped at 8px) while the cursor is within bounds,
 * then snaps back with a spring on mouse leave.
 *
 * Touch devices: mousemove doesn't fire on touch, so the effect
 * is automatically inactive — zero degradation on mobile.
 */
export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - (left + width / 2);
    const dy = e.clientY - (top + height / 2);
    x.set(Math.max(-8, Math.min(8, dx * 0.18)));
    y.set(Math.max(-8, Math.min(8, dy * 0.18)));
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex"
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}

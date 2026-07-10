"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

/**
 * TiltCard
 * Applies a 3D perspective tilt + specular light highlight that follows
 * the cursor within the card. Resets with spring physics on mouse leave.
 *
 * Touch devices: mousemove doesn't fire on touch, so the card renders
 * and behaves as a normal static element — zero degradation on mobile.
 *
 * Usage: drop it around any card content, passing the same className/style
 * you'd put on the card's root element.
 */
export function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Rotation springs — tight stiffness for responsiveness, enough damping to avoid jitter
  const rotX = useSpring(0, { stiffness: 280, damping: 24 });
  const rotY = useSpring(0, { stiffness: 280, damping: 24 });

  // Specular highlight position springs — follows cursor
  const glowX = useSpring(50, { stiffness: 280, damping: 24 });
  const glowY = useSpring(50, { stiffness: 280, damping: 24 });
  const glowOpacity = useSpring(0, { stiffness: 280, damping: 24 });

  // Motion template generates the reactive gradient string
  const specularBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.09) 0%, transparent 55%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Normalize to −0.5 → 0.5 range
    const nx = (e.clientX - left) / width - 0.5;
    const ny = (e.clientY - top) / height - 0.5;
    rotX.set(-ny * 10);  // max ±5° vertical tilt
    rotY.set(nx * 10);   // max ±5° horizontal tilt
    glowX.set(((e.clientX - left) / width) * 100);
    glowY.set(((e.clientY - top) / height) * 100);
    glowOpacity.set(1);
  }

  function onMouseLeave() {
    rotX.set(0);
    rotY.set(0);
    glowOpacity.set(0);
    // glowX/Y intentionally not reset — prevents harsh jump on re-enter
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 800,
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {/* Specular light overlay — absolutely positioned, pointer-events off */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: specularBg,
          opacity: glowOpacity,
          pointerEvents: "none",
          zIndex: 20,
          borderRadius: "inherit",
        }}
      />
      {children}
    </motion.div>
  );
}

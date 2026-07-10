"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

interface QNode {
  baseX: number; baseY: number;
  radius: number; opacity: number;
  superState: number;
  ghost1X: number; ghost1Y: number;
  ghost2X: number; ghost2Y: number;
  ghostOffsetAngle: number;
  collapseFlash: number;
  phase: number;
}

const GRID_SPACING = 72;
const PROXIMITY_RADIUS = 170;
const GHOST_AMPLITUDE = 11;

function buildGrid(W: number, H: number): QNode[] {
  const nodes: QNode[] = [];
  const cols = Math.ceil(W / GRID_SPACING) + 1;
  const rows = Math.ceil(H / GRID_SPACING) + 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * GRID_SPACING + GRID_SPACING / 2;
      const y = r * GRID_SPACING + GRID_SPACING / 2;
      nodes.push({
        baseX: x, baseY: y,
        radius: 1.5 + Math.random() * 1.2,
        opacity: 0.18 + Math.random() * 0.22,
        superState: 0,
        ghost1X: x, ghost1Y: y,
        ghost2X: x, ghost2Y: y,
        ghostOffsetAngle: Math.random() * Math.PI * 2,
        collapseFlash: 0,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }
  return nodes;
}

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<QNode[]>([]);
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width: W, height: H } = canvas;
      const { x: mx, y: my } = mouseRef.current;
      const t = frameRef.current * 0.012;
      frameRef.current++;

      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;
      for (const n of nodes) {
        const dx = n.baseX - mx, dy = n.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const blend = dist < PROXIMITY_RADIUS ? 1 - dist / PROXIMITY_RADIUS : 0;
        const wasSplit = n.superState > 0.05;
        n.superState += (blend - n.superState) * 0.09;
        if (wasSplit && n.superState <= 0.05) n.collapseFlash = 1;
        n.collapseFlash *= 0.86;
        const amp = GHOST_AMPLITUDE * n.superState;
        n.ghost1X = n.baseX + Math.cos(n.ghostOffsetAngle + t * 2.5) * amp;
        n.ghost1Y = n.baseY + Math.sin(n.ghostOffsetAngle + t * 2.5) * amp * 0.6;
        n.ghost2X = n.baseX - Math.cos(n.ghostOffsetAngle + t * 2.5) * amp;
        n.ghost2Y = n.baseY - Math.sin(n.ghostOffsetAngle + t * 2.5) * amp * 0.6;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.baseX - b.baseX, dy = a.baseY - b.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > GRID_SPACING * 1.5) continue;
          const superBlend = (a.superState + b.superState) / 2;
          const baseAlpha = 0.07 * (1 - dist / (GRID_SPACING * 1.5));
          const alpha = baseAlpha + superBlend * 0.3;
          ctx.beginPath();
          ctx.moveTo(a.baseX, a.baseY);
          ctx.lineTo(b.baseX, b.baseY);
          ctx.strokeStyle = `rgba(123, 47, 190, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.5 + superBlend * 0.5;
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        const ga = n.opacity + n.superState * 0.5;
        ctx.beginPath();
        ctx.arc(n.baseX, n.baseY, n.radius + n.collapseFlash * 4, 0, Math.PI * 2);
        ctx.fillStyle = n.superState > 0.05 
          ? `rgba(123, 47, 190, ${ga.toFixed(3)})` 
          : `rgba(255, 255, 255, ${ga.toFixed(3)})`;
        ctx.fill();

        if (n.superState > 0.05) {
          ctx.beginPath();
          ctx.arc(n.ghost1X, n.ghost1Y, n.radius * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 250, 154, ${(ga * 0.8).toFixed(3)})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.ghost2X, n.ghost2Y, n.radius * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 250, 154, ${(ga * 0.8).toFixed(3)})`;
          ctx.fill();
          ctx.save();
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(n.ghost1X, n.ghost1Y);
          ctx.lineTo(n.ghost2X, n.ghost2Y);
          ctx.strokeStyle = `rgba(0, 250, 154, ${(ga * 0.35).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodesRef.current = buildGrid(canvas.width, canvas.height);
    };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    let rafTouchId: number | null = null;
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (rafTouchId !== null) return;
      rafTouchId = requestAnimationFrame(() => {
        rafTouchId = null;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      });
    };
    const onTouchEnd = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (rafTouchId !== null) cancelAnimationFrame(rafTouchId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

const HEX_CHARS = "0123456789ABCDEF!#$@%&?><~";

function useGlitchText(target: string, delay: number = 0): string {
  const [display, setDisplay] = useState(() => target.replace(/[^ ]/g, "█"));
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const timeout = setTimeout(() => {
      if (!mountedRef.current) return;
      const scrambleMs = 700;
      const lockPerChar = 35;
      const start = Date.now();
      const scrambleInterval = setInterval(() => {
        if (!mountedRef.current) return;
        const elapsed = Date.now() - start;
        if (elapsed > scrambleMs) {
          clearInterval(scrambleInterval);
          let locked = 0;
          const chars = target.split("");
          const lockInterval = setInterval(() => {
            if (!mountedRef.current) return;
            while (locked < chars.length && chars[locked] === " ") locked++;
            if (locked >= chars.length) { clearInterval(lockInterval); setDisplay(target); return; }
            locked++;
            setDisplay(chars.map((ch, i) => {
              if (ch === " ") return " ";
              if (i < locked) return ch;
              return HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
            }).join(""));
          }, lockPerChar);
        } else {
          setDisplay(target.split("").map(ch => ch === " " ? " " : HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]).join(""));
        }
      }, 40);
      return () => clearInterval(scrambleInterval);
    }, delay);
    return () => { mountedRef.current = false; clearTimeout(timeout); };
  }, [target, delay]);

  return display;
}

export default function Hero() {
  const line1 = useGlitchText("Quantum Tech", 300);
  const line2 = useGlitchText("Matrix.", 700);
  const [line2Settled, setLine2Settled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const line2SettledRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLine2Settled(true);
      line2SettledRef.current = true;
    }, 2400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const section = sectionRef.current;
    const h1 = h1Ref.current;
    if (!section || !h1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!line2SettledRef.current) return;
        const rect = section.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        h1.style.textShadow = `${
          dx * 3.5
        }px ${dy * 1.2}px 0 rgba(0,245,255,0.42), ${
          -dx * 3.5
        }px ${-dy * 1.2}px 0 rgba(255,0,229,0.42)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafId);
      h1.style.transition = "text-shadow 0.6s ease";
      h1.style.textShadow = "none";
      setTimeout(() => { if (h1Ref.current) h1Ref.current.style.transition = ""; }, 620);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || !("ontouchstart" in window)) return;
    if (!window.DeviceOrientationEvent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onOrient = (e: DeviceOrientationEvent) => {
      const h1 = h1Ref.current;
      if (!h1 || !line2SettledRef.current) return;
      const gamma = (e.gamma ?? 0) / 45; // left-right tilt, normalised −1→1
      const ox = gamma * 2.5;
      h1.style.textShadow = `${ox}px 0px 0 rgba(0,245,255,0.35), ${-ox}px 0px 0 rgba(255,0,229,0.35)`;
    };

    window.addEventListener("deviceorientation", onOrient, { passive: true });
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="qtm-hero-heading"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-8 py-12 md:py-20 overflow-hidden"
      style={{ backgroundColor: "transparent" }} // Inherits #090710 from layout
    >
      <QuantumCanvas />

      {/* Hard horizontal rule at top */}
      <div className="absolute top-14 left-0 right-0 h-[1px] bg-[#333333] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[920px] mx-auto w-full flex flex-col items-center justify-center text-center gap-6 md:gap-8 mt-8 md:mt-0">

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.12 }}>
          <CountdownTimer />
        </motion.div>

        {/* Glitch headline */}
        <h1
          ref={h1Ref}
          id="qtm-hero-heading"
          className="leading-[0.95] tracking-[-0.04em] w-full"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 13vw, 96px)",
            fontWeight: 900,
          }}
        >
          <span
            className="block text-white"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {line1}
          </span>
          <span
            className="block transition-all duration-500"
            style={{
              color: line2Settled ? "#7B2FBE" : "#FFFFFF",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {line2}
          </span>
        </h1>

        {/* Horizontal rule */}
        <div className="w-full h-[1px] bg-[#333333]" />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="max-w-lg text-[16px] leading-[1.65] text-center"
          style={{ color: "#A3A3A3", fontFamily: "var(--font-display)" }}
        >
          Welcome to <strong className="text-white font-bold">Quantum Tech Matrix</strong> — the premier launch event of the MuLearn Quantum Technologies IG. Join industry leaders, researchers, and students for a full-day summit featuring keynote sessions, interactive{" "}
          lab simulations, and the unveiling of Kerala&apos;s first{" "}
          quantum community.
        </motion.p>


      </div>
    </section>
  );
}

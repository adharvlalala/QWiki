"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Tuning constants ──────────────────────────────────────────────────────────
const PARTICLE_COUNT = 48;
const CURSOR_ATTRACT_RADIUS = 140; // px — cursor pulls particles gently
const CONNECT_DIST_IDLE = 110;     // px — passive neighbour connections
const CONNECT_DIST_CURSOR = 160;   // px — connections from cursor to nearby particles

// Qubit colour palette (matches the purple/violet theme)
const QUBIT_COLORS = [
  "126, 34, 206",   // purple-700
  "168, 85, 247",   // purple-500
  "139, 92, 246",   // violet-500
];
const LINE_COLOR = "168, 85, 247";  // purple-500

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** base speed magnitude — used to restore velocity after cursor deflection */
  speed: number;
  radius: number;
  opacity: number;
  colorIdx: number;
  /** qubit ring phase — advances each frame for a subtle pulsing ring */
  phase: number;
  phaseSpeed: number;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const mouse     = useRef({ x: -9999, y: -9999, inside: false });
  const isVisible = useRef(true);
  const isTabActive = useRef(true);

  // ── Initialise particles ─────────────────────────────────────────────────
  const initParticles = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const speed = Math.random() * 0.28 + 0.06;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        speed,
        radius: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.45 + 0.15,
        colorIdx: Math.floor(Math.random() * QUBIT_COLORS.length),
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.025 + 0.008,
      };
    });
  }, []);

  // ── Draw one frame ───────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: W, height: H } = canvas;
    const { x: mx, y: my, inside } = mouse.current;

    ctx.clearRect(0, 0, W, H);

    const pts = particles.current;

    // ── Update positions ─────────────────────────────────────────────────
    pts.forEach((p) => {
      // Soft cursor attraction / deflection
      if (inside) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CURSOR_ATTRACT_RADIUS && d > 0) {
          const force = ((CURSOR_ATTRACT_RADIUS - d) / CURSOR_ATTRACT_RADIUS) * 0.012;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
      }

      // Dampen to prevent run-away velocity
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = p.speed * 2.8;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      // Drift back to natural speed when cursor is away
      if (!inside || Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2) > CURSOR_ATTRACT_RADIUS) {
        p.vx *= 0.995;
        p.vy *= 0.995;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.phaseSpeed;

      // Bounce off edges
      if (p.x < 0)  { p.x = 0;  p.vx *= -1; }
      if (p.x > W)  { p.x = W;  p.vx *= -1; }
      if (p.y < 0)  { p.y = 0;  p.vy *= -1; }
      if (p.y > H)  { p.y = H;  p.vy *= -1; }
    });

    // ── Draw passive particle-to-particle connections ────────────────────
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx   = pts[i].x - pts[j].x;
        const dy   = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST_IDLE) {
          const alpha = (1 - dist / CONNECT_DIST_IDLE) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // ── Draw cursor-to-particle connections (only while hovering) ────────
    if (inside) {
      pts.forEach((p) => {
        const dx   = mx - p.x;
        const dy   = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST_CURSOR) {
          const alpha = (1 - dist / CONNECT_DIST_CURSOR) * 0.5;
          const grad  = ctx.createLinearGradient(mx, my, p.x, p.y);
          grad.addColorStop(0, `rgba(${LINE_COLOR}, ${alpha})`);
          grad.addColorStop(1, `rgba(${QUBIT_COLORS[p.colorIdx]}, ${alpha * 0.5})`);
          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.9;
          ctx.moveTo(mx, my);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });

      // Cursor dot
      ctx.beginPath();
      ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${LINE_COLOR}, 0.55)`;
      ctx.fill();
    }

    // ── Draw qubit particles ─────────────────────────────────────────────
    pts.forEach((p) => {
      const color = QUBIT_COLORS[p.colorIdx];

      // Pulsing outer ring
      const ringR = p.radius + 3 + Math.sin(p.phase) * 1.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, ${p.opacity * 0.25 + Math.sin(p.phase) * 0.08})`;
      ctx.lineWidth   = 0.7;
      ctx.stroke();

      // Inner glow core
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
      grad.addColorStop(0, `rgba(${color}, ${p.opacity})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Solid core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.opacity + 0.2})`;
      ctx.fill();
    });
  }, []);

  // ── Animation loop ───────────────────────────────────────────────────────
  const loopRef = useRef<() => void>(() => {});
  useEffect(() => {
    loopRef.current = () => {
      if (!isVisible.current || !isTabActive.current) return;
      draw();
      animRef.current = requestAnimationFrame(loopRef.current);
    };
  }, [draw]);

  const startLoop = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(loopRef.current);
  }, []);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(animRef.current);
  }, []);

  // ── Mount / resize / observers ───────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const resize = () => {
      const w = parent ? parent.offsetWidth  : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      initParticles(w, h);
    };

    resize();
    startLoop();

    const ro = new ResizeObserver(resize);
    if (parent) ro.observe(parent);

    // Pause when hero scrolls out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        entry.isIntersecting ? startLoop() : stopLoop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Pause on hidden tab
    const onVisibility = () => {
      isTabActive.current = document.visibilityState === "visible";
      isTabActive.current ? startLoop() : stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Mouse tracking — relative to the canvas
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x      = e.clientX - rect.left;
      mouse.current.y      = e.clientY - rect.top;
      mouse.current.inside = true;
    };
    const onMouseLeave = () => {
      mouse.current.inside = false;
    };

    // Attach to the parent section so the whole hero area is reactive
    const target = parent ?? canvas;
    target.addEventListener("mousemove",  onMouseMove  as EventListener);
    target.addEventListener("mouseleave", onMouseLeave as EventListener);

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      target.removeEventListener("mousemove",  onMouseMove  as EventListener);
      target.removeEventListener("mouseleave", onMouseLeave as EventListener);
    };
  }, [initParticles, startLoop, stopLoop]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        0,
        opacity:       0.65,
      }}
    />
  );
}

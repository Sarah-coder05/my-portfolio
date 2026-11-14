"use client";

import { useEffect, useRef } from "react";

// Hero background: a field of twinkling blue + gold dots that float gently,
// a few dots that briefly flare ("glints"), and comet-like dotted trails that
// glide along curved paths. Drawn on a <canvas> so it stays cheap to animate.
// Colours come from --sparkle-1 / --sparkle-2, so they follow the theme.

type Dot = {
  x: number;
  y: number;
  r: number;
  base: number; // resting opacity
  amp: number; // twinkle strength
  speed: number; // twinkle speed (rad/s)
  phase: number;
  vx: number; // drift, px/s
  vy: number;
  gold: boolean;
  glint: boolean; // occasionally flares larger with a glow
};

type Trail = {
  cx: number; // circle centre, as a fraction of width / height
  cy: number;
  r: number; // radius, as a fraction of height
  from: number; // angle range the head travels (radians)
  to: number;
  speed: number; // rad/s
  length: number; // number of dots in the trail
  gap: number; // angle between trail dots
  offset: number; // start position (0..1 of the range)
};

// Sweeping arcs on the left side, like the reference design
const TRAILS: Trail[] = [
  {
    cx: -0.05,
    cy: 1.15,
    r: 0.85,
    from: -1.75,
    to: -0.35,
    speed: 0.12,
    length: 46,
    gap: 0.012,
    offset: 0.1,
  },
  {
    cx: 0.02,
    cy: 1.3,
    r: 1.05,
    from: -1.65,
    to: -0.55,
    speed: 0.09,
    length: 54,
    gap: 0.009,
    offset: 0.55,
  },
  {
    cx: -0.12,
    cy: 0.55,
    r: 0.5,
    from: -1.3,
    to: 0.6,
    speed: 0.16,
    length: 36,
    gap: 0.018,
    offset: 0.8,
  },
];

const DENSITY = 1 / 3800; // dots per px² of hero area

// Overall animation speed: raise to make everything (drift, twinkle, trails) faster
const SPEED = 1.7;

export default function HeroSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let colors = { blue: "#4f7fff", gold: "#e3b341" };
    let raf = 0;
    let running = true;
    let last = 0;
    let elapsed = 0;

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = {
        blue: s.getPropertyValue("--sparkle-1").trim() || colors.blue,
        gold: s.getPropertyValue("--sparkle-2").trim() || colors.gold,
      };
    };

    const makeDots = () => {
      const count = Math.round(width * height * DENSITY);
      dots = Array.from({ length: count }, () => {
        const glint = Math.random() < 0.06;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: glint ? 1.3 + Math.random() * 0.8 : 0.6 + Math.random() * 1.2,
          base: 0.25 + Math.random() * 0.35,
          amp: 0.35 + Math.random() * 0.4,
          speed: 1 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 14,
          vy: -4 - Math.random() * 12, // gentle upward float
          gold: Math.random() < 0.38,
          glint,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeDots();
    };

    const dot = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      color: string,
    ) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTrails = (t: number) => {
      for (const tr of TRAILS) {
        const range = tr.to - tr.from;
        const cx = tr.cx * width;
        const cy = tr.cy * height;
        const R = tr.r * height;
        // Head position loops through the range
        const p = (tr.offset + (t * tr.speed) / range) % 1;
        const head = tr.from + p * range;
        // Fade the whole trail in at the start of its path and out at the end
        const edge = Math.sin(Math.PI * p);
        for (let i = 0; i < tr.length; i++) {
          const a = head - i * tr.gap;
          const k = 1 - i / tr.length; // 1 at head -> 0 at tail
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          const color = i < 3 ? colors.gold : colors.blue;
          dot(x, y, 0.6 + k * 1.3, edge * k * 0.85, color);
        }
      }
    };

    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        if (!reduceMotion) {
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          if (d.x < -4) d.x += width + 8;
          if (d.x > width + 4) d.x -= width + 8;
          if (d.y < -4) {
            d.y = height + 4;
            d.x = Math.random() * width;
          }
        }
        const tw = reduceMotion ? 0 : Math.sin(t * d.speed + d.phase);
        const alpha = Math.max(0, Math.min(1, d.base + tw * d.amp));
        const color = d.gold ? colors.gold : colors.blue;

        if (d.glint && tw > 0.75) {
          // Brief flare: soft halo + slightly bigger core
          const f = (tw - 0.75) / 0.25;
          dot(d.x, d.y, d.r * (2.5 + f * 3), 0.12 * f, color);
          dot(d.x, d.y, d.r * (1 + f * 0.6), alpha, color);
        } else {
          dot(d.x, d.y, d.r, alpha, color);
        }
      }

      drawTrails(t);
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = (last ? Math.min((now - last) / 1000, 0.05) : 0) * SPEED;
      last = now;
      elapsed += dt;
      draw(elapsed, dt);
      if (running) raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    if (reduceMotion) {
      draw(4, 0); // one still frame, trails mid-path
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(4, 0);
    });
    ro.observe(canvas);

    // Re-read colours when the theme class on <html> changes
    const mo = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw(4, 0);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Only animate while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

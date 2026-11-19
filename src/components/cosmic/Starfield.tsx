"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; d: number };

// Twinkling stars behind the whole site, with a little parallax on mouse move.
// Star colour and strength come from the --star / --star-alpha theme tokens,
// so the same field reads as night sky (dark) or faint specks (light).
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let raf = 0;
    let last = 0;
    const mouse = { x: 0.5, y: 0.5 };
    let rgb = "255,255,255";
    let strength = 1;

    const readTheme = () => {
      const cs = getComputedStyle(document.documentElement);
      rgb = cs.getPropertyValue("--star").trim() || "255,255,255";
      strength = parseFloat(cs.getPropertyValue("--star-alpha")) || 1;
    };

    const resize = () => {
      W = innerWidth;
      H = innerHeight;
      const dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(480, Math.round((W * H) / 3400));
      stars = Array.from({ length: n }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.1 + 0.25,
        a: Math.random() * 0.7 + 0.25,
        tw: Math.random() * 1.5 + 0.3,
        ph: Math.random() * 6.3,
        d: Math.random(),
      }));
      draw(performance.now());
    };

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = `rgb(${rgb})`;
      const ox = (mouse.x - 0.5) * -24;
      const oy = (mouse.y - 0.5) * -16;
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * s.tw + s.ph);
        ctx.globalAlpha = s.a * twinkle * strength;
        ctx.beginPath();
        ctx.arc(s.x * W + ox * s.d, s.y * H + oy * s.d, s.r, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // ~30fps is plenty for a twinkle and keeps the CPU cool
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < 33) return;
      last = now;
      draw(now);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / W;
      mouse.y = e.clientY / H;
      if (reduce) draw(performance.now());
    };

    // Re-read colours when the theme class on <html> changes
    const mo = new MutationObserver(() => {
      readTheme();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    readTheme();
    resize();
    addEventListener("resize", resize);
    if (!reduce) {
      addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}

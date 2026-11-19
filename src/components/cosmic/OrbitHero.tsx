"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { PROJECTS } from "@/data/projects";

// One card per project, each with its own shape (sizes are at scale 1)
const CARDS = [
  { shape: "circle", w: 186, h: 186 },
  { shape: "pill", w: 290, h: 108 },
  { shape: "capsule", w: 150, h: 236 },
  { shape: "square", w: 196, h: 196 },
  { shape: "blob", w: 216, h: 192 },
] as const;

// Small moons that share the orbit
const ORBS = [
  { a: "#e61e49", w: 28, f: 0.38, th: 0.6, sp: 1.9 },
  { a: "#00a87e", w: 40, f: 0.56, th: 2.4, sp: 1.45 },
  { a: "#007bc2", w: 22, f: 0.56, th: 5.1, sp: 1.45 },
  { a: "#494fdf", w: 48, f: 0.76, th: 4.0, sp: 1.15 },
];
const RINGS = [0.26, 0.38, 0.47, 0.56, 0.66, 0.76, 0.88, 1, 1.07];
const TILT = (-11 * Math.PI) / 180;

/** Ask the projects carousel to show (and open) a world, then scroll to it. */
export function openWorld(index: number) {
  window.dispatchEvent(new CustomEvent("worlds:open", { detail: { index } }));
}

const v = (a: string) => ({ "--a": a }) as CSSProperties;

export default function OrbitHero() {
  const stage = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLButtonElement | null)[]>([]);
  const orbEls = useRef<(HTMLSpanElement | null)[]>([]);
  const hover = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, S = 1, cx = 0, cy = 0, Rx = 0, Ry = 0;
    let raf = 0, visible = true, last = performance.now(), t = 0, speed = 1;

    const resize = () => {
      W = el.clientWidth;
      H = el.clientHeight;
      const st = Math.abs(Math.sin(TILT)), ct = Math.cos(TILT);
      const mobile = W < 760;
      S = Math.max(0.4, Math.min(1, W / 1440, H / 470));
      Rx = Math.min(W * (mobile ? 0.44 : 0.4), 640);
      Ry = Math.min(H * 0.22, Rx * 0.32);
      // Shrink until the tilted ellipse plus the tallest card fits the stage
      const cardH = mobile ? 0 : 240;
      const need = () => Math.hypot(Rx * st, Ry * ct) * 2 + cardH * S;
      for (let i = 0; i < 30 && need() > H - 24; i++) {
        Rx *= 0.95;
        Ry *= 0.95;
        S = Math.max(0.4, S * 0.97);
      }
      cx = W / 2;
      cy = H / 2 + (mobile ? 0 : 8);
      el.style.setProperty("--s", String(S));
      el.style.setProperty("--cx", cx + "px");
      el.style.setProperty("--cy", cy + "px");
      el.style.setProperty("--rx", Rx + "px");
      el.style.setProperty("--ry", Ry + "px");
      CARDS.forEach((b, k) => {
        const e = cardEls.current[k];
        if (e) {
          e.style.width = b.w * S + "px";
          e.style.height = b.h * S + "px";
        }
      });
      ORBS.forEach((b, k) => {
        const e = orbEls.current[k];
        if (e) e.style.width = e.style.height = b.w * S * (mobile ? 1.3 : 1) + "px";
      });
      place();
    };

    const put = (e: HTMLElement, th: number, f: number, w: number, h: number) => {
      const ex = Math.cos(th) * Rx * f, ey = Math.sin(th) * Ry * f;
      const x = cx + ex * Math.cos(TILT) - ey * Math.sin(TILT);
      const y = cy + ex * Math.sin(TILT) + ey * Math.cos(TILT);
      const d = Math.sin(th), q = (d + 1) / 2; // q: 0 = far side, 1 = near side
      e.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px,${(y - h / 2).toFixed(1)}px,0) scale(${(0.74 + 0.26 * q).toFixed(3)})`;
      e.style.zIndex = String(Math.round(10 + d * 8));
      e.style.opacity = (0.82 + 0.18 * q).toFixed(3);
    };

    const place = () => {
      const base = t * 0.075;
      CARDS.forEach((b, k) => {
        const e = cardEls.current[k];
        if (e) put(e, base + (k / CARDS.length) * Math.PI * 2, 1, b.w * S, b.h * S);
      });
      ORBS.forEach((b, k) => {
        const e = orbEls.current[k];
        if (e) {
          const w = e.offsetWidth;
          put(e, b.th + base * b.sp, b.f, w, w);
        }
      });
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      // Ease to a stop while a card is hovered so it's easy to click
      speed += ((hover.current ? 0 : 1) - speed) * (1 - Math.exp(-dt * 4));
      t += dt * speed;
      place();
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    if (!reduce) raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const go = (i: number) => openWorld(i);

  return (
    <section id="home" className="orbit-hero" aria-label="Introduction">
      <div className="orbit-copy">
        <p className="orbit-eyebrow">Ufedo · Sarah Moses, frontend engineer</p>
        <h1 className="orbit-title font-display">
          {PROJECTS.length === 5 ? "Five" : PROJECTS.length} worlds I helped build.
        </h1>
        <p className="orbit-sub">
          From EdTech platforms to a venture fund&apos;s CMS, a marketplace and a livestock dashboard. I build
          products people actually use. Pick a planet to land on.
        </p>
        <div className="orbit-ctas">
          <a href="#work" className="btn btn-primary btn-lg">
            Begin mission <HiArrowRight aria-hidden />
          </a>
          <a href="/sarah.pdf" target="_blank" rel="noopener" className="btn btn-outline btn-lg">
            View CV
          </a>
        </div>
      </div>

      <div ref={stage} className="orbit-stage">
        <div className="sys" aria-hidden="true">
          <div className="sys-disc" />
          {RINGS.map((f) => (
            <div
              key={f}
              className={"sys-ring" + (f === 1 ? " main" : "")}
              style={{ "--f": f } as CSSProperties}
            />
          ))}
          <div className="sys-core" />
        </div>
        {ORBS.map((b, k) => (
          <span
            key={k}
            ref={(e) => {
              orbEls.current[k] = e;
            }}
            className="orb planet"
            style={v(b.a)}
            aria-hidden="true"
          />
        ))}
        {PROJECTS.slice(0, CARDS.length).map((p, k) => (
          <button
            key={p.slug}
            ref={(e) => {
              cardEls.current[k] = e;
            }}
            type="button"
            className={"ocard shape-" + CARDS[k].shape}
            style={v(p.accent)}
            onClick={() => go(k)}
            onMouseEnter={() => (hover.current = true)}
            onMouseLeave={() => (hover.current = false)}
            onFocus={() => (hover.current = true)}
            onBlur={() => (hover.current = false)}
            aria-label={`${p.company}: ${p.subtitle}`}
          >
            <span className="planet" />
            <span className="ocard-txt">
              <span className="ocard-co">{p.company}</span>
              <span className="ocard-sub">{p.tag}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Phones: the moving cards are too small to tap, so list the worlds instead */}
      <ul className="orbit-list" aria-label="Projects">
        {PROJECTS.map((p, k) => (
          <li key={p.slug}>
            <button type="button" onClick={() => go(k)} style={v(p.accent)}>
              <span className="planet" />
              <span>
                {p.company}
                <small>{p.tag}</small>
              </span>
              <HiArrowUpRight className="go" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

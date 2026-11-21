"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiArrowsPointingOut, HiXMark } from "react-icons/hi2";
import { PROJECTS } from "@/data/projects";

const N = PROJECTS.length;
const mod = (n: number) => ((n % N) + N) % N;
const pad = (n: number) => String(n).padStart(2, "0");

export default function WorldsCarousel() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const section = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pos = useRef(0); // animated position
  const tgt = useRef(0); // target position (unbounded so wrapping animates the short way)
  const openRef = useRef(false);
  const inView = useRef(false);
  const cur = PROJECTS[index];
  openRef.current = open;

  const go = useCallback((d: number) => {
    tgt.current += d;
    setIndex(mod(tgt.current));
  }, []);

  const jump = useCallback(
    (k: number) => {
      let d = k - mod(tgt.current);
      if (d > N / 2) d -= N;
      if (d < -N / 2) d += N;
      if (d) go(d);
    },
    [go],
  );

  const scrollToSection = (smooth = true) => {
    const el = section.current;
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: smooth ? "smooth" : "auto" });
  };

  const select = useCallback(() => {
    scrollToSection();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    cards.current[mod(tgt.current)]?.focus({ preventScroll: true });
  }, []);

  // Lock page scroll while a product is open, and move focus into the panel
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    const t = setTimeout(() => {
      root.style.overflow = "hidden";
      closeBtn.current?.focus({ preventScroll: true });
    }, 450);
    return () => {
      clearTimeout(t);
      root.style.overflow = prev;
    };
  }, [open]);

  // Keyboard and swipe
  useEffect(() => {
    const kd = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) return close();
      if (openRef.current || !inView.current) return;
      const t = e.target;
      if (t instanceof Element && t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    let sx: number | null = null, sy = 0;
    const ts = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const te = (e: TouchEvent) => {
      if (sx == null || openRef.current) return;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      sx = null;
    };
    const el = section.current!;
    window.addEventListener("keydown", kd);
    el.addEventListener("touchstart", ts, { passive: true });
    el.addEventListener("touchend", te);
    return () => {
      window.removeEventListener("keydown", kd);
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchend", te);
    };
  }, [go, close]);

  // Animation loop: lay the cards out on a 3D ring, and fly the current one
  // to the left of the panel when it's open. Runs only while on screen.
  useEffect(() => {
    const el = section.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = performance.now(), oa = 0;
    const io = new IntersectionObserver(([e]) => (inView.current = e.intersectionRatio > 0.5), {
      threshold: [0, 0.5, 1],
    });
    io.observe(el);

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const visible = el.getBoundingClientRect();
      if (visible.bottom < 0 || visible.top > innerHeight) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k1 = reduce ? 1 : 1 - Math.exp(-dt * 6);
      const k2 = reduce ? 1 : 1 - Math.exp(-dt * 7);
      pos.current += (tgt.current - pos.current) * k1;
      oa += ((openRef.current ? 1 : 0) - oa) * k2;

      const c0 = cards.current[0];
      const ringEl = ring.current;
      if (!c0 || !ringEl) return;
      const cw = c0.offsetWidth || 340, ch = c0.offsetHeight || 420;
      const W = el.clientWidth, H = el.clientHeight, mob = W <= 900;
      const navH = 76;
      const rr = ringEl.getBoundingClientRect();
      const ringCy = rr.top - visible.top + rr.height / 2;
      const panelW = mob ? 0 : Math.min(460, W - 48) + 24;
      const tx = mob ? 0 : (W - panelW) / 2 - W / 2 + 8;
      const topSpace = mob ? H * 0.26 - 12 : H - 24;
      const ty = (navH + topSpace) / 2 - ringCy;
      const availW = mob ? W - 32 : W - panelW - 40;
      const availH = topSpace - navH - 16;
      const ts = Math.max(mob ? 0.3 : 0.5, Math.min(1.6, availW / cw, availH / ch));
      const curK = mod(Math.round(tgt.current));

      cards.current.forEach((card, k) => {
        if (!card) return;
        let o = k - pos.current;
        o = ((((o + N / 2) % N) + N) % N) - N / 2;
        const a = Math.abs(o);
        const x = o * cw * 1.04 * (1 - 0.05 * Math.min(a, 2.5));
        const ry = -Math.max(-62, Math.min(62, o * 40));
        const z = -a * 50;
        const me = k === curK, e = me ? oa : 0;
        const L = (p: number, q: number) => p + (q - p) * e;
        card.style.transform = `translate(-50%,-50%) translate3d(${L(x, tx).toFixed(1)}px,${L(0, ty).toFixed(1)}px,${L(z, 0).toFixed(1)}px) rotateY(${L(ry, 0).toFixed(2)}deg) scale(${L(1, ts).toFixed(3)})`;
        const base = Math.max(0, Math.min(1, 2.9 - a));
        card.style.opacity = (me ? base : base * (1 - oa)).toFixed(3);
        card.style.zIndex = String(me && oa > 0.01 ? 120 : 100 - Math.round(a * 10));
        card.style.setProperty("--f", (Math.min(1, a) * (1 - e)).toFixed(3));
        card.style.pointerEvents = a > 2.4 || (oa > 0.5 && !me) ? "none" : "auto";
        card.tabIndex = me && !openRef.current ? 0 : -1;
      });
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={section}
      id="work"
      className={"worlds" + (open ? " phase-open" : "")}
      aria-roledescription="carousel"
      aria-label="Projects"
    >
      <div className="cz-glow" style={{ "--a": cur.accent } as CSSProperties} aria-hidden />

      <div className="cz-head">
        <h2 className="font-display">Pick a product to explore</h2>
        <p>Use the arrows or swipe to move between products. Select one to see the details.</p>
      </div>

      <div ref={ring} className="cz-ring">
        {PROJECTS.map((p, k) => (
          <button
            key={p.slug}
            type="button"
            ref={(e) => {
              cards.current[k] = e;
            }}
            className="cz-card"
            style={{ "--a": p.accent } as CSSProperties}
            onClick={() => (open ? null : k === index ? select() : jump(k))}
            aria-label={k === index ? `Explore ${p.company}` : `Show ${p.company}`}
            aria-current={k === index}
          >
            <span className="cz-top">
              <span>{p.sector}</span>
              <span>{p.status}</span>
            </span>
            <span className="cz-mid">
              <span className="planet" />
              <span className="cz-name font-display">{p.company}</span>
              <span className="cz-sub">{p.subtitle}</span>
            </span>
            <span className="cz-bot">
              <span>Role</span>
              <b>{p.role}</b>
            </span>
            <span className="cz-shade" />
          </button>
        ))}
      </div>

      <div className="cz-scrim" onClick={close} aria-hidden />

      <div className="cz-actions">
        <button type="button" className="btn btn-outline btn-lg" onClick={() => go(-1)} aria-label="Previous product">
          <HiArrowLeft aria-hidden />
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={select}>
          <HiArrowsPointingOut aria-hidden /> Explore {cur.company}
        </button>
        <button type="button" className="btn btn-outline btn-lg" onClick={() => go(1)} aria-label="Next product">
          <HiArrowRight aria-hidden />
        </button>
      </div>

      <div className="cz-dots">
        <span className="cz-count" aria-live="polite">
          {pad(index + 1)} / {pad(N)}
        </span>
        <div>
          {PROJECTS.map((p, k) => (
            <button
              key={p.slug}
              type="button"
              className={"cz-dot" + (k === index ? " on" : "")}
              onClick={() => jump(k)}
              aria-label={p.company}
            />
          ))}
        </div>
      </div>

      <aside
        className="details"
        aria-hidden={!open}
        aria-label={`${cur.company} details`}
        style={{ "--a": cur.accent } as CSSProperties}
      >
        <div className="dt-scroll" key={cur.slug}>
          <div className="dt-top">
            <span className="badge">
              <span className="dot" /> {cur.tag}
            </span>
            <button ref={closeBtn} type="button" className="dt-x" onClick={close} aria-label="Close">
              <HiXMark size={18} aria-hidden />
            </button>
          </div>
          <p className="dt-co">{cur.company}</p>
          <h3 className="dt-title font-display">{cur.subtitle}</h3>
          <div className="dt-cover">
            <Image
              src={cur.images[0].src}
              alt={cur.images[0].alt}
              fill
              sizes="(max-width: 900px) 100vw, 460px"
              style={{ objectFit: "cover", objectPosition: "left top" }}
            />
          </div>
          <p className="dt-body">{cur.summary}</p>
          <dl className="meta-grid">
            <div>
              <dt>Role</dt>
              <dd>{cur.role}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{cur.platform}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{cur.status}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{cur.sector}</dd>
            </div>
          </dl>
          <h4 className="dt-h font-display">What I did</h4>
          <ul className="dt-list">
            {cur.did.slice(0, 4).map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h4 className="dt-h font-display">Stack</h4>
          <div className="chips">
            {cur.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="dt-actions">
            <Link href={`/work/${cur.slug}`} className="btn btn-primary">
              Read the case study <HiArrowRight aria-hidden />
            </Link>
            {cur.liveUrl && (
              <a href={cur.liveUrl} target="_blank" rel="noopener" className="btn btn-outline">
                Visit site
              </a>
            )}
            <button type="button" className="btn btn-outline" onClick={() => go(1)}>
              Next product
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}

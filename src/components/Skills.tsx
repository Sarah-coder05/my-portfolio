"use client";

import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Core",
    orbit: 1,
    duration: "20s",
    size: 200,
    skills: [
      { icon: "⚛", name: "React", angle: 0 },
      { icon: "▲", name: "Next.js", angle: 90 },
      { icon: "TS", name: "TypeScript", angle: 180 },
      { icon: "🎨", name: "Tailwind", angle: 270 },
    ],
  },
  {
    label: "Backend & Infra",
    orbit: 2,
    duration: "30s",
    size: 320,
    reverse: true,
    skills: [
      { icon: "🗄", name: "Supabase", angle: 0 },
      { icon: "📦", name: "Strapi", angle: 60 },
      { icon: "💳", name: "Paystack", angle: 120 },
      { icon: "✉", name: "Resend", angle: 180 },
      { icon: "🔗", name: "REST APIs", angle: 240 },
      { icon: "🐘", name: "PostgreSQL", angle: 300 },
    ],
  },
  {
    label: "Tools",
    orbit: 3,
    duration: "42s",
    size: 440,
    skills: [
      { icon: "⚡", name: "Vercel", angle: 0 },
      { icon: "🔀", name: "Git", angle: 51 },
      { icon: "🎭", name: "Framer", angle: 102 },
      { icon: "{}", name: "HTML/CSS", angle: 153 },
      { icon: "JS", name: "JavaScript", angle: 204 },
      { icon: "Vue", name: "Vue.js", angle: 255 },
      { icon: "🔴", name: "Redux", angle: 306 },
    ],
  },
];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      style={{ maxWidth: "1300px", margin: "0 auto", padding: "100px 24px" }}
    >
      {/* Label */}
      <div
        className="font-mono-custom text-xs uppercase tracking-widest mb-4 flex items-center gap-3"
        style={{ color: "var(--accent)", letterSpacing: "3px" }}
      >
        <span
          style={{
            display: "block",
            width: "24px",
            height: "1px",
            background: "var(--accent)",
          }}
        />
        Technical Skills
      </div>

      <h2
        className="font-syne font-extrabold mb-3"
        style={{
          fontSize: "clamp(32px, 4vw, 48px)",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          color: "var(--text)",
        }}
      >
        Tools I work with.
      </h2>
      <p
        className="mb-16"
        style={{
          color: "var(--muted)",
          fontWeight: 300,
          fontSize: "16px",
          maxWidth: "440px",
        }}
      >
        Technologies I&apos;ve used in real production environments
      </p>

      {/* Orbital Universe */}
      <div
        className="skills-universe"
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {/* Core center */}
        <div
          className="animate-pulse-glow font-mono-custom"
          style={{
            position: "absolute",
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--accent), var(--accent2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "9px",
            color: "#fff",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          STACK
        </div>

        {/* Orbits */}
        {skillGroups.map((group) => (
          <div
            key={group.orbit}
            className={
              group.reverse
                ? "animate-spin-slow-reverse"
                : group.orbit === 3
                  ? "animate-spin-slower"
                  : "animate-spin-slow"
            }
            style={{
              position: "absolute",
              width: `${group.size}px`,
              height: `${group.size}px`,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {group.skills.map((skill) => {
              const rad = (skill.angle * Math.PI) / 180;
              const r = group.size / 2;
              const x = r + r * Math.cos(rad) - 18;
              const y = r + r * Math.sin(rad) - 18;
              const isHovered = hoveredSkill === skill.name;

              return (
                <div
                  key={skill.name}
                  className={
                    group.reverse
                      ? "counter-spin-reverse"
                      : group.orbit === 3
                        ? "counter-spin-slower"
                        : "counter-spin"
                  }
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: "absolute",
                    left: `${x}px`,
                    top: `${y}px`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isHovered
                        ? "var(--accent)"
                        : "var(--surface)",
                      border: `1px solid ${isHovered ? "var(--accent)" : "var(--border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.3s",
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                      boxShadow: isHovered
                        ? "0 0 20px rgba(79,127,255,0.5)"
                        : "none",
                      color: isHovered ? "#fff" : "var(--text)",
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span
                    className="font-mono-custom"
                    style={{
                      fontSize: "8px",
                      color: isHovered ? "var(--text)" : "var(--muted)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s",
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

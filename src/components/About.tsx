"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: "6+", label: "Production projects shipped" },
    { num: "3+", label: "Years building for the web" },
    { num: "14+", label: "Technologies in production" },
    { num: "3", label: "Roles — Dev & Analyst" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-28"
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
        About
      </div>

      <div className="grid md:grid-cols-2 gap-20 items-center">
        {/* Left — Text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="font-syne font-extrabold mb-8"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Engineer by trade.
            <br />
            Builder by nature.
          </h2>

          <p
            className="mb-5"
            style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}
          >
            I'm a frontend engineer with a background in{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              Mathematics;
            </strong>{" "}
            which means I approach problems analytically before I approach them
            creatively. I don't just build what looks good. I build what works.
          </p>
          <p
            className="mb-5"
            style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}
          >
            Over the past few years I've shipped full production products, an{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              EdTech platform
            </strong>{" "}
            handling multi-currency payments and automated scheduling, a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              headless CMS
            </strong>{" "}
            for an investment firm, and multiple dashboards with complex
            role-based access systems.
          </p>
          <p
            style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}
          >
            I'm also a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              Subject Matter Content Analyst
            </strong>
            , which keeps me sharp on the intersection of content, curriculum,
            and user experience.
          </p>
        </div>

        {/* Right — Stats */}
        <div
          className="grid grid-cols-2 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            padding: "30px 24px",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "24px",
                margin: "6px 10px",
              }}
            >
              <div
                className="font-syne font-extrabold"
                style={{
                  fontSize: "36px",
                  color: "var(--accent)",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.num}
              </div>
              <div
                className="font-mono-custom"
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

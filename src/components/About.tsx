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
    { num: "6", label: "Products built" },
    { num: "3+", label: "Years building for the web" },
    { num: "5", label: "Years in EdTech" },
    { num: "14+", label: "Technologies in production" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-28"
      style={{ maxWidth: "1300px", margin: "0 auto", padding: "100px 24px" }}
    >
     

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
            className="font-heading font-extrabold mb-8"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            From the maths classroom
            <br />
            to building products.
          </h2>

          <p className="mb-5" style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}>
            I studied <strong style={{ color: "var(--text)", fontWeight: 500 }}>Mathematics</strong> and spent my first working years
            teaching it, first as a maths instructor at uLesson, then reviewing
            curriculum at Slate NG. Teaching taught me the thing I still build by:
            if people can&apos;t follow it, it doesn&apos;t work, no matter how
            clever it is.
          </p>
          <p className="mb-5" style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}>
            So when I moved into code, I kept building for real people. Today I
            build <strong style={{ color: "var(--text)", fontWeight: 500 }}>full products</strong>, from the screens people use to the
            Supabase backends, Paystack payments and admin dashboards behind them.
            A lot of my work is in <strong style={{ color: "var(--text)", fontWeight: 500 }}>EdTech</strong>, because that&apos;s where I
            come from, but I&apos;ve also built for a venture fund, a secondhand
            marketplace and a livestock farm.
          </p>
          <p style={{ color: "var(--muted)", fontWeight: 300, lineHeight: 1.9 }}>
            I&apos;m based in Abuja, Nigeria. I like clear, honest work that people
            actually use, and I like finishing what I start. If you&apos;re building
            something and need someone who&apos;ll care about it as much as you do,
            let&apos;s talk.
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
                className="font-heading font-extrabold"
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

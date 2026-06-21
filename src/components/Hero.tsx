"use client";

import Image from "next/image";
import profilePic from "../../public/profilePic.png";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",

        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(79,127,255,0.07) 0%, transparent 70%)",
          top: "-100px",
          right: "-80px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          bottom: "0",
          left: "200px",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "80px 24px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* Left — Text */}
        <div className="animate-fadeUp">
          {/* Eyebrow */}
          <div
            className="font-mono-custom"
            style={{
              fontSize: "11px",
              color: "var(--accent)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "32px",
                height: "1px",
                background: "var(--accent)",
              }}
            />
            Frontend Engineer
          </div>

          {/* Name */}
          <h1
            className="font-syne"
            style={{
              fontSize: "clamp(52px, 7vw, 84px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Ufedo<span className="gradient-text">.</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "17px",
              color: "rgba(241,245,249,0.65)",
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: "480px",
              marginBottom: "40px",
            }}
          >
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              I don&apos;t just write code. I build products people actually use.
            </strong>{" "}
            From EdTech platforms to headless CMS integrations, I engineer
            frontend experiences that are clean, scalable, and production-ready.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#3d6ce0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--accent)")
              }
            >
              See my work
            </a>
            <a
              href="/sarah.pdf"
              target="_blank"
              style={{
                color: "var(--muted)",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
              }}
            >
              View CV
            </a>
          </div>
        </div>

        {/* Right — Image */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div className="animate-float" style={{ position: "relative" }}>
            {/* Image — no border */}
            <div
              style={{
                width: "360px",
                height: "440px",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={profilePic}
                alt="Ufedo — Sarah Moses"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  filter: "grayscale(10%)",
                }}
                priority
              />
              {/* Subtle gradient at bottom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(8,12,20,0.4) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="font-mono-custom"
              style={{
                position: "absolute",
                bottom: "28px",
                left: "-28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "11px",
                color: "var(--muted)",
              }}
            >
              <strong
                className="font-syne"
                style={{
                  display: "block",
                  color: "var(--accent)",
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  marginBottom: "2px",
                }}
              >
                3+
              </strong>
              Years building
              <br />
              for the web
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

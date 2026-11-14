"use client";

import Image from "next/image";
import profilePic from "../../public/profilePic.png";
import CompanyTicker from "./CompanyTicker";
import HeroSparkles from "./HeroSparkles";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",

        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Twinkling blue + gold sparkle field */}
      <HeroSparkles />

      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, var(--glow-1) 0%, transparent 70%)",
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
            "radial-gradient(circle, var(--glow-2) 0%, transparent 70%)",
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
          padding: "120px 24px 64px",
          width: "100%",
          // Fill the space above the companies strip and centre the content in it
          flex: 1,
          alignContent: "center",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — Text */}
        <div className="animate-fadeUp">
          {/* Eyebrow */}
         

          {/* Name */}
          <h1
            className="font-heading"
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
              color: "var(--text-soft)",
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
                ((e.currentTarget as HTMLElement).style.background = "var(--accent-hover)")
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
                  "var(--border-strong)";
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
                    "linear-gradient(to top, var(--img-overlay-soft) 0%, transparent 50%)",
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
                className="font-heading"
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

      {/* Companies strip along the bottom of the hero, full content width */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "24px 24px 40px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CompanyTicker />
      </div>
    </section>
  );
}

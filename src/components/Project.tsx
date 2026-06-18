"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import vikidemyhub1 from "../../public/vikidemyhub1.png";
import vikidemyhub2 from "../../public/vikidemyhub2.png";
import velocityAfrica1 from "../../public/velocityAfrica1.png";
import velocityAfrica2 from "../../public/velocityAfrica2.png";
import edusproute1 from "../../public/edusproute1.png";
import edusproute2 from "../../public/edusproute2.png";

interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  image1: StaticImageData;
  image2: StaticImageData;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    number: "01",
    category: "EdTech Platform",
    title: "Vikidemy Hub",
    description:
      "A full-stack EdTech platform with multi-role dashboards (parent, student, educator, admin), multi-currency payments in NGN and USD, automated session scheduling, renewal reminders via cron jobs, and transactional email notifications. Built end to end.",
    image1: vikidemyhub1,
    image2: vikidemyhub2,
    tags: ["Next.js", "TypeScript", "Supabase", "Paystack", "Resend", "Vercel"],
    liveUrl: "https://vikidemyhub.com",
    githubUrl: "https://github.com/Sarah-coder05/vikidemy_hub",
  },
  {
    number: "02",
    category: "Investment Platform",
    title: "Velocity Africa CMS",
    description:
      "Built a headless CMS using Strapi Cloud for an African investment firm, enabling the team to manage blog posts, insights, portfolio news and events independently. Also migrated an interactive data report from Vite into Next.js.",
    image1: velocityAfrica1,
    image2: velocityAfrica2,
    tags: ["Next.js", "Strapi", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://velocity.africa",
  },
  {
    number: "03",
    category: "EdTech Dashboard",
    title: "Edusproute",
    description:
      "An EdTech platform for managing tech courses, helping educators and students organize learning materials and track progress efficiently.",
    image1: edusproute1,
    image2: edusproute2,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://edusproute.com",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? "rgba(79,127,255,0.3)" : "var(--border)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s, border-color 0.3s`,
        position: "relative",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: 2,
        }}
      />

      {/* Two images side by side */}
      <div
        className="project-images"
        style={{ display: "flex", height: "280px", overflow: "hidden" }}
      >
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Image
            src={project.image1}
            alt={`${project.title} screenshot 1`}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
              filter: "brightness(0.75)",
            }}
          />
        </div>
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Image
            src={project.image2}
            alt={`${project.title} screenshot 2`}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
              filter: "brightness(0.75)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 60%)",
            zIndex: 1,
          }}
        />
        <div
          className="absolute font-mono-custom"
          style={{
            top: "14px",
            left: "16px",
            fontSize: "10px",
            color: "var(--accent)",
            letterSpacing: "2px",
            zIndex: 2,
            opacity: 0.9,
          }}
        >
          {project.number} — {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px" }}>
        <h3
          className="font-syne font-bold mb-3"
          style={{
            fontSize: "18px",
            letterSpacing: "-0.5px",
            color: "var(--text)",
          }}
        >
          {project.title}
        </h3>
        <p
          className="mb-5"
          style={{
            fontSize: "14px",
            color: "var(--muted)",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono-custom"
              style={{
                fontSize: "10px",
                color: "var(--accent)",
                background: "rgba(79,127,255,0.08)",
                border: "1px solid rgba(79,127,255,0.15)",
                padding: "5px 12px",
                borderRadius: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-custom"
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
            }
          >
            ↗ Live Site
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-custom"
              style={{
                fontSize: "11px",
                color: "var(--muted)",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              ↗ GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      style={{ maxWidth: "1300px", margin: "0 auto", padding: "100px 24px" }}
    >
      <div ref={ref}>
        <div
          className="font-mono-custom"
          style={{
            fontSize: "11px",
            color: "var(--accent)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--accent)",
            }}
          />
          Selected Work
        </div>

        <h2
          className="font-syne font-extrabold"
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            letterSpacing: "-1.5px",
            lineHeight: 1.3,
            color: "var(--text)",
            marginBottom: "12px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Things I've built.
        </h2>

        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            fontSize: "16px",
            maxWidth: "440px",
            marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          Real products, real users, real production environments.
        </p>
      </div>

      <div className="grid md:grid-cols-2" style={{ gap: "24px" }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

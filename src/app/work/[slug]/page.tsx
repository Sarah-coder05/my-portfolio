import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { PROJECTS, getProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.company} — Sarah Moses`,
    description: p.subtitle,
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = PROJECTS.indexOf(p);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const a = (accent: string) => ({ "--a": accent }) as CSSProperties;

  return (
    <>
      <Navbar />
      <main className="cs" style={a(p.accent)}>
        <Link href="/#work" className="cs-back">
          <HiArrowLeft aria-hidden /> All products
        </Link>

        <header className="cs-head">
          <span className="planet" aria-hidden />
          <div>
            <span className="badge">
              <span className="dot" /> {p.tag}
            </span>
            <h1 className="cs-title font-display">{p.company}</h1>
            <p className="cs-sub">{p.subtitle}</p>
          </div>
        </header>

        <div className="cs-shot">
          <Image
            src={p.images[0].src}
            alt={p.images[0].alt}
            fill
            priority
            sizes="(max-width: 1080px) 100vw, 1032px"
            style={{ objectFit: "cover", objectPosition: "left top" }}
          />
        </div>

        <div className="cs-grid">
          <div>
            <h2 className="dt-h font-display" style={{ marginTop: 0 }}>
              Overview
            </h2>
            <p className="dt-body" style={{ fontSize: 18 }}>
              {p.summary}
            </p>

            <h2 className="dt-h font-display">What I did</h2>
            <ul className="dt-list">
              {p.did.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            {p.images.length > 1 && (
              <div className="cs-gallery" style={{ marginTop: 40 }}>
                {p.images.slice(1).map((img) => (
                  <div key={img.src} className="cs-shot">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 860px) 100vw, 680px"
                      style={{ objectFit: "cover", objectPosition: "left top" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="cs-side">
            <dl className="meta-grid">
              <div>
                <dt>Role</dt>
                <dd>{p.role}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{p.status}</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>{p.platform}</dd>
              </div>
              <div>
                <dt>Sector</dt>
                <dd>{p.sector}</dd>
              </div>
            </dl>
            <div>
              <h2 className="dt-h font-display" style={{ marginTop: 0 }}>
                Stack
              </h2>
              <div className="chips">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {(p.liveUrl || p.githubUrl) && (
              <div className="dt-actions" style={{ marginTop: 0 }}>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener" className="btn btn-primary">
                    Visit site <HiArrowUpRight aria-hidden />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener" className="btn btn-outline">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        <nav className="cs-nav" aria-label="More projects">
          <Link href={`/work/${prev.slug}`} style={a(prev.accent)}>
            <HiArrowLeft aria-hidden />
            <span className="planet" />
            <span>
              <small>Previous product</small>
              {prev.company}
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="next" style={a(next.accent)}>
            <span>
              <small>Next product</small>
              {next.company}
            </span>
            <span className="planet" />
            <HiArrowRight aria-hidden />
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

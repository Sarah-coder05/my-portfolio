import type { CSSProperties } from "react";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { PROJECTS } from "@/data/projects";

// Every product at a glance, for people who don't want to click through the carousel.
export default function ProductGrid() {
  return (
    <section className="pgrid-wrap" aria-labelledby="pgrid-title">
      <h2 id="pgrid-title" className="pgrid-title font-display">
        All products at a glance
      </h2>
      <ul className="pgrid">
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="pcard"
              style={{ "--a": p.accent } as CSSProperties}
            >
              <span className="pcard-top">
                <span className="planet" aria-hidden />
                <HiArrowUpRight className="pcard-go" aria-hidden />
              </span>
              <span className="pcard-name font-display">{p.company}</span>
              <span className="pcard-sub">{p.subtitle}</span>
              <span className="pcard-meta">
                {p.role} · {p.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

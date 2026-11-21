import { HiArrowRight } from "react-icons/hi2";

// Intro over the starfield. The products themselves live in the carousel below.
export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-copy">
        <p className="hero-eyebrow">Ufedo · Sarah Moses, frontend engineer</p>
        <h1 className="hero-title font-display">Some of the products I&apos;ve worked on.</h1>
        <p className="hero-sub">
          From EdTech platforms to a venture fund&apos;s CMS, a marketplace and a livestock
          dashboard. I don&apos;t just write code. I build products people actually use.
        </p>
        <div className="hero-ctas">
          <a href="#work" className="btn btn-primary btn-lg">
            See the products <HiArrowRight aria-hidden />
          </a>
          <a href="/sarah.pdf" target="_blank" rel="noopener" className="btn btn-outline btn-lg">
            View CV
          </a>
        </div>
      </div>
    </section>
  );
}

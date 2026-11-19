import Navbar from "@/components/navbar";
import OrbitHero from "@/components/cosmic/OrbitHero";
import WorldsCarousel from "@/components/cosmic/WorldsCarousel";
import CompanyTicker from "@/components/CompanyTicker";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CoreExpertise from "@/components/CoreExpertise";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <OrbitHero />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 24px" }}>
          <CompanyTicker />
        </div>
        <WorldsCarousel />
        <div className="section-divider" />
        <CoreExpertise />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

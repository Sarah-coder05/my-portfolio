import Navbar from "@/components/navbar";
import Hero from "@/components/cosmic/Hero";
import WorldsCarousel from "@/components/cosmic/WorldsCarousel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CoreExpertise from "@/components/CoreExpertise";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorldsCarousel />
        <div className="section-divider" />
        <CoreExpertise />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

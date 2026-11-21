import Navbar from "@/components/navbar";
import Hero from "@/components/cosmic/Hero";
import WorldsCarousel from "@/components/cosmic/WorldsCarousel";
import ProductGrid from "@/components/cosmic/ProductGrid";
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
        <ProductGrid />
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

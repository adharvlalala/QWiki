import QtmNavbar from "@/components/landing/QtmNavbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Schedule from "@/components/landing/Schedule";
import Motives from "@/components/landing/Motives";
import Guests from "@/components/landing/Guests";
import Audience from "@/components/landing/Audience";
import Footer from "@/components/landing/Footer";

export default function QuantumTechMatrixPage() {
  return (
    <>
      <QtmNavbar />
      <main id="qtm-main">
        <Hero />
        <About />
        <Motives />
        <Guests />
        <Schedule />
        <Audience />
      </main>
      <Footer />
    </>
  );
}

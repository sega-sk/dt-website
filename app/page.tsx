import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AISearchSection from "@/components/AISearchSection";
import LightningFastSection from "@/components/LightningFastSection";
import SRPCustomizerSection from "@/components/SRPCustomizerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pt-14 sm:pt-16">
      <Header />
      <HeroSection />
      <AISearchSection />
      <LightningFastSection />
      <SRPCustomizerSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
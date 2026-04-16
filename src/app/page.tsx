import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TreatmentsSection } from "@/components/TreatmentsSection";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { VideoTestimonialsSection } from "@/components/VideoTestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactCTASection } from "@/components/ContactCTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TreatmentsSection />
        <AboutSection />
        <ProcessSection />
        <ResultsSection />
        <VideoTestimonialsSection />
        <FaqSection />
        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}

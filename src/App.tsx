import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Lore } from "./components/Lore";
import { Skills } from "./components/Skills";
import { CaseStudies } from "./components/CaseStudies";
import { MediaShowcase } from "./components/MediaShowcase";
import { Guidelines } from "./components/Guidelines";
import { TechStack } from "./components/TechStack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-body text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <CaseStudies />
        <About />
        <Lore />
        <Skills />
        <TechStack />
        <MediaShowcase />
        <Guidelines />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

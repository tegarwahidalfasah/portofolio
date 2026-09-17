import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { CaseStudies } from "./components/CaseStudies";
import { TechStack } from "./components/TechStack";
import { Leadership } from "./components/Leadership";
import { MediaShowcase } from "./components/MediaShowcase";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-body text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Education />
        <Experience />
        <CaseStudies />
        <Skills />
        <TechStack />
        <Leadership />
        <MediaShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

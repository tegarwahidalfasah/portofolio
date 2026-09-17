import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { CaseStudies } from "./components/CaseStudies";
import { Skills } from "./components/Skills";
import { TechStack } from "./components/TechStack";
import { Leadership } from "./components/Leadership";
import { Services } from "./components/Services";
import { Workflow } from "./components/Workflow";
import { FAQ } from "./components/FAQ";
import { MediaShowcase } from "./components/MediaShowcase";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingBackToTop } from "./components/FloatingBackToTop";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  return (
    <div className="min-h-screen font-body text-text-primary">
      <ScrollProgress />
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
        <Services />
        <Workflow />
        <Leadership />
        <MediaShowcase />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingBackToTop />
    </div>
  );
}

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Lore } from "./components/Lore";
import { Skills } from "./components/Skills";
import { Works } from "./components/Works";
import { MediaShowcase } from "./components/MediaShowcase";
import { Guidelines } from "./components/Guidelines";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Organizations } from "./components/Organizations";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 font-body text-navy-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Lore />
        <Skills />
        <Works />
        <MediaShowcase />
        <Guidelines />
        <Education />
        <Experience />
        <Organizations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

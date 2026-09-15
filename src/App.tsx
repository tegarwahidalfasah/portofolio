import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Works } from "./components/Works";
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
        <Skills />
        <Works />
        <Education />
        <Experience />
        <Organizations />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

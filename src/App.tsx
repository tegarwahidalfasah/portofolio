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
import { CmsProvider, useCms } from "./cms/store";
import { ThemeProvider } from "./cms/theme";
import { Analytics } from "@vercel/analytics/react";

/* ───────────────────────────────────────────────
   Bundle ini HANYA berisi website publik. Halaman admin
   dibuild terpisah (vite.config.admin.ts → dist-admin/admin.html)
   dan cuma dikirim oleh api/admin.ts setelah password cocok,
   jadi tidak ada satu baris pun kode CMS di sini.
   ─────────────────────────────────────────────── */

/** Banner kecil penanda mode pratinjau draft (hanya terlihat di browser yang punya draft). */
function DraftBanner() {
  const { hasDraft, t } = useCms();
  if (!hasDraft) return null;
  return (
    <a
      href="/admin"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-indigo-400/30 bg-slate-950/90 px-4 py-2.5 font-mono text-[11px] font-medium text-indigo-200 shadow-2xl backdrop-blur-xl transition-all hover:bg-slate-900"
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
      {t.bannerPreview} — Buka Admin →
    </a>
  );
}

function Site() {
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
      <DraftBanner />
      <Analytics />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <ThemeProvider>
        <Site />
      </ThemeProvider>
    </CmsProvider>
  );
}

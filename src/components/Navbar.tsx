import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Briefcase, Download, Sun, Moon } from "lucide-react";
import { useCms, type Lang } from "../cms/store";
import { useTheme } from "../cms/theme";

function LangSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-glass-300 bg-white/60 p-1 backdrop-blur-xl dark:bg-slate-950/60">
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-label={l === "id" ? "Bahasa Indonesia" : "English"}
          className={`rounded-full px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
            lang === l
              ? "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const {
    content: { profile },
    t,
    lang,
    setLang,
  } = useCms();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.navAbout, href: "#about" },
    { label: t.navEducation, href: "#pendidikan" },
    { label: t.navExperience, href: "#pengalaman" },
    { label: t.navWorks, href: "#karya" },
    { label: t.navSkills, href: "#skills" },
    { label: t.navServices, href: "#layanan" },
    { label: t.navFaq, href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-glass-border bg-glass-50/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-sky-400 font-display text-sm font-bold text-white shadow-lg shadow-accent-500/25">
              {profile.initials}
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
              {profile.shortName}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-600">
              <Briefcase size={10} />
              {profile.roles?.[1] ?? profile.tagline}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 font-display text-sm font-medium text-text-secondary transition-colors hover:bg-glass-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 xl:flex">
            <LangSwitch lang={lang} setLang={setLang} />
            <button
              onClick={toggle}
              aria-label={lang === "id" ? "Ganti mode gelap/terang" : "Toggle dark/light mode"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600 dark:bg-slate-950/60"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {Boolean(profile.cvUrl && profile.cvUrl.trim()) && (
              <a
                href={profile.cvUrl}
                download
                className="group flex items-center gap-2 rounded-full border border-glass-300 bg-white/60 px-4 py-2.5 font-display text-sm font-semibold text-text-primary backdrop-blur-xl transition-all hover:border-accent-400 dark:bg-slate-950/60"
              >
                <Download size={14} />
                CV
              </a>
            )}
            <a
              href="#kontak"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl hover:shadow-accent-500/35"
            >
              {t.hireMe}
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile: theme + toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggle}
              aria-label={lang === "id" ? "Ganti mode gelap/terang" : "Toggle dark/light mode"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-glass-300 bg-glass-bg text-text-primary backdrop-blur-lg"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-glass-300 bg-glass-bg text-text-primary backdrop-blur-lg"
              aria-label={t.toggleMenu}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-primary/90 backdrop-blur-xl xl:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto py-24">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-2xl font-bold text-text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
              >
                <LangSwitch lang={lang} setLang={setLang} />
              </motion.div>
              {Boolean(profile.cvUrl && profile.cvUrl.trim()) && (
                <motion.a
                  href={profile.cvUrl}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 rounded-full border border-glass-300 bg-white/60 px-7 py-3.5 font-display text-base font-semibold text-text-primary dark:bg-slate-950/60"
                >
                  <Download size={18} />
                  {t.downloadCv}
                </motion.a>
              )}
              <motion.a
                href="#kontak"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-7 py-3.5 font-display text-base font-semibold text-white shadow-lg shadow-accent-500/25"
              >
                {t.hireMe}
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

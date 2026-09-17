import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "../data";

const links = [
  { label: "About", href: "#about" },
  { label: "Lore", href: "#lore" },
  { label: "Karya", href: "#karya" },
  { label: "Media", href: "#media" },
  { label: "Guideline", href: "#guideline" },
  { label: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
              <Sparkles size={10} />
              VTuber
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
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

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={profile.youtubeHref}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl hover:shadow-accent-500/35"
            >
              Tonton Stream
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-glass-300 bg-glass-bg text-text-primary backdrop-blur-lg lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-primary/90 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
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
              <motion.a
                href={profile.youtubeHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-7 py-3.5 font-display text-base font-semibold text-white shadow-lg shadow-accent-500/25"
              >
                Tonton Stream
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

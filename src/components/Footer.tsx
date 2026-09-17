import { ArrowUp, Sparkles, Download } from "lucide-react";
import { useCms } from "../cms/store";
import { InstagramIcon } from "./Icons";
import { MailIcon } from "./PlatformIcons";

export function Footer() {
  const { profile, footer } = useCms().content;
  const { t } = useCms();
  const navLinks = [
    { label: t.navAbout, href: "#about" },
    { label: t.navEducation, href: "#pendidikan" },
    { label: t.navExperience, href: "#pengalaman" },
    { label: t.navSkills, href: "#skills" },
    { label: t.navServices, href: "#layanan" },
    { label: t.navFaq, href: "#faq" },
    { label: t.navContact, href: "#kontak" },
  ];

  return (
    <footer className="border-t border-glass-300/50 bg-glass-50/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-sky-400 font-display text-sm font-bold text-white shadow-lg shadow-accent-500/25">
                {profile.initials}
              </span>
              <span className="font-display text-lg font-bold text-text-primary">
                {profile.shortName} {profile.lastName}
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              {footer.tagline}
            </p>
            <a
              href={profile.cvUrl}
              download
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 px-5 py-2.5 font-display text-xs font-semibold text-text-primary backdrop-blur-xl transition-all hover:border-accent-400"
            >
              <Download size={14} />
              {t.downloadFullCv}
            </a>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm font-medium text-text-secondary transition-colors hover:text-accent-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={profile.instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600"
            >
              <MailIcon size={17} />
            </a>
            <a
              href="#top"
              aria-label={t.ftTop}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-glass-300/50 pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. {t.ftRights}</p>
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-accent-400" />
            <p className="font-mono">
              {t.ftBuilt}
            </p>
            <span className="text-glass-300">•</span>
            <a href="/admin" className="font-mono transition-colors hover:text-accent-600">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

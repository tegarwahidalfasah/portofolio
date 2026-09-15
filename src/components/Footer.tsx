import { ArrowUp } from "lucide-react";
import { profile } from "../data";
import { InstagramIcon } from "./Icons";

const navLinks = [
  { label: "Tentang", href: "#tentang" },
  { label: "Keahlian", href: "#keahlian" },
  { label: "Karya", href: "#karya" },
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Kontak", href: "#kontak" },
];

export function Footer() {
  return (
    <footer className="border-t border-cream-100/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 font-display text-sm font-bold text-white">
                {profile.initials}
              </span>
              <span className="font-display text-lg font-semibold text-cream-50">
                Tegar Wahid Alfasah
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-100/50">
              Content creator, desainer, fotografer & videografer asal Subang,
              Jawa Barat.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm text-cream-100/60 transition-colors hover:text-brand-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:border-brand-400 hover:text-brand-400"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:border-brand-400 hover:text-brand-400"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="#top"
              aria-label="Kembali ke atas"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-100/40 sm:flex-row sm:items-center">
          <p>© 2026 Tegar Wahid Alfasah. Seluruh hak cipta dilindungi.</p>
          <p className="font-mono">
            Designed &amp; built with creativity{" "}
            <span className="text-accent-400">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

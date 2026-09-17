import { ArrowUp, Sparkles } from "lucide-react";
import { profile } from "../data";
import { InstagramIcon } from "./Icons";
import { YouTubeIcon, TwitchIcon, TikTokIcon, HeartIcon } from "./PlatformIcons";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Lore", href: "#lore" },
  { label: "Karya", href: "#karya" },
  { label: "Media", href: "#media" },
  { label: "Guideline", href: "#guideline" },
  { label: "Kontak", href: "#kontak" },
];

export function Footer() {
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
                {profile.shortName}
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              VTuber, content creator, desainer, fotografer & videografer
              asal Subang, Jawa Barat.
            </p>
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
            {[
              { icon: YouTubeIcon, href: profile.youtubeHref, label: "YouTube" },
              { icon: TwitchIcon, href: profile.twitchHref, label: "Twitch" },
              { icon: InstagramIcon, href: profile.instagramHref, label: "Instagram" },
              { icon: TikTokIcon, href: profile.tiktokHref, label: "TikTok" },
              { icon: HeartIcon, href: profile.donation, label: "Trakteer" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-300 bg-white/60 text-text-secondary backdrop-blur-xl transition-all hover:border-accent-400 hover:text-accent-600"
              >
                <Icon size={17} />
              </a>
            ))}
            <a
              href="#top"
              aria-label="Kembali ke atas"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-glass-300/50 pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>© 2026 Sora Wirya (Tegar Wahid Alfasah). All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-accent-400" />
            <p className="font-mono">
              Designed & built with creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

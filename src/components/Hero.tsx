import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, Mail, GraduationCap, Download } from "lucide-react";
import { useCms } from "../cms/store";
import { InstagramIcon } from "./Icons";
import portrait from "../assets/portrait.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { profile, hero } = useCms().content;
  const { t } = useCms();
  const portraitSrc = profile.photoUrl?.trim() ? profile.photoUrl.trim() : portrait;

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-bg-primary pt-[72px]"
    >
      {/* Background glow orbs */}
      <div className="glow-orb h-[520px] w-[520px] -right-40 top-10 bg-accent-400/30" />
      <div className="glow-orb h-[440px] w-[440px] -left-52 bottom-0 bg-sky-400/20" />

      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
        {/* Text column */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent-500/20 bg-white/60 dark:bg-slate-950/60 px-4 py-1.5 backdrop-blur-xl"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-500" />
            <span className="font-mono text-xs tracking-wide text-text-secondary">
              {t.available}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 hero-display"
          >
            {hero.line1}
            <br />
            <span className="gradient-text">{hero.line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mt-5 font-display text-lg font-semibold tracking-tight text-text-primary sm:text-xl"
          >
            {hero.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#karya"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl hover:shadow-accent-500/35"
            >
              {t.viewWork}
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="group flex items-center gap-2 rounded-full border border-glass-300 bg-white/60 dark:bg-slate-950/60 px-7 py-3.5 font-display text-sm font-semibold text-text-primary backdrop-blur-xl transition-all hover:border-accent-400 hover:bg-white/80 dark:hover:bg-slate-900/80"
            >
              <Download size={16} />
              {t.downloadCv}
            </a>
            <a
              href="#kontak"
              className="group flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-7 py-3.5 font-display text-sm font-semibold text-accent-600 transition-all hover:border-accent-500/50 hover:bg-accent-500/15"
            >
              {t.hireMe}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-text-secondary"
          >
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-accent-500" />
              {profile.location}
            </span>
            <a
              href={profile.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-accent-600"
            >
              <InstagramIcon size={15} className="text-accent-500" />
              {profile.instagram}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent-600"
            >
              <Mail size={15} className="text-accent-500" />
              Email
            </a>
            <span className="flex items-center gap-2">
              <GraduationCap size={15} className="text-accent-500" />
              {t.gpa} {profile.gpa} — {t.classOf} {profile.graduationYear}
            </span>
          </motion.div>
        </div>

        {/* Portrait column */}
        <div className="relative order-1 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative animate-float"
          >
            {/* Portrait frame */}
            <div className="overflow-hidden rounded-[2rem] border border-glass-border bg-white/40 dark:bg-slate-950/40 shadow-2xl shadow-accent-500/10 backdrop-blur-xl">
              <img
                src={portraitSrc}
                alt={`${profile.name} — ${hero.role}`}
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent" />
            </div>

            {/* Floating chip: role */}
            <div className="animate-float-slow absolute -left-6 top-12 flex items-center gap-2.5 rounded-2xl border border-glass-border bg-white/80 dark:bg-slate-950/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              </span>
              <div>
                <p className="font-display text-xs font-bold text-text-primary">
                  Video Editor
                </p>
                <p className="font-mono text-[10px] text-text-muted">
                  Premiere · After Effects · CapCut
                </p>
              </div>
            </div>

            {/* Floating chip: available */}
            <div className="animate-float absolute -bottom-4 -right-2 flex items-center gap-2.5 rounded-2xl border border-glass-border bg-white/80 dark:bg-slate-950/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </span>
              <div>
                <p className="font-display text-xs font-bold text-text-primary">
                  {t.chipAvailable}
                </p>
                <p className="font-mono text-[10px] text-text-muted">
                  {t.chipFreelance}
                </p>
              </div>
            </div>

            {/* Small badge */}
            <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-white/80 dark:bg-slate-950/80 shadow-lg backdrop-blur-xl">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-400 to-sky-400 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{profile.initials}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

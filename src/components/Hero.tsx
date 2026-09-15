import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin, Aperture, Mail } from "lucide-react";
import { profile, disciplines } from "../data";
import { InstagramIcon } from "./Icons";
import portrait from "../assets/portrait.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-screen flex-col overflow-hidden bg-navy-950 pt-[72px]"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-brand-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute -left-52 bottom-0 h-[440px] w-[440px] rounded-full bg-accent-500/20 blur-[130px]" />
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.55) 1px, transparent 1px)",
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
            className="inline-flex items-center gap-2.5 rounded-full border border-cream-100/15 bg-cream-100/5 px-4 py-1.5"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent-400" />
            <span className="font-mono text-xs tracking-wide text-cream-100/80">
              Terbuka untuk kolaborasi & proyek kreatif
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-cream-50 sm:text-6xl lg:text-[5.4rem] xl:text-[6.2rem]"
          >
            TEGAR WAHID
            <br />
            <span className="text-outline-blue">ALFASAH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/70 sm:text-lg"
          >
            <span className="font-accent text-2xl italic text-gradient">
              {profile.tagline}
            </span>
            <br />
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#karya"
              className="group flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Lihat Karya
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#kontak"
              className="group flex items-center gap-2 rounded-full border border-cream-100/25 px-7 py-3.5 font-display text-sm font-semibold text-cream-50 transition-colors hover:border-brand-400 hover:text-brand-400"
            >
              Hubungi Saya
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
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-cream-100/60"
          >
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-brand-400" />
              {profile.locationShort}
            </span>
            <a
              href={profile.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-brand-400"
            >
              <InstagramIcon size={15} className="text-brand-400" />
              {profile.instagram}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 transition-colors hover:text-brand-400"
            >
              <Mail size={15} className="text-brand-400" />
              Email
            </a>
          </motion.div>
        </div>

        {/* Portrait column */}
        <div className="relative order-1 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative"
          >
            {/* offset frame */}
            <div className="absolute -inset-3 rounded-t-[220px] rounded-b-3xl border border-brand-500/40 sm:-inset-4" />
            <div className="overflow-hidden rounded-t-[220px] rounded-b-3xl border border-cream-100/15 bg-navy-800">
              <img
                src={portrait}
                alt="Potret Tegar Wahid Alfasah"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            </div>

            {/* floating chip: role */}
            <div className="animate-float-slow absolute -left-4 top-10 flex items-center gap-2.5 rounded-2xl border border-cream-100/15 bg-navy-900/90 px-4 py-3 shadow-2xl backdrop-blur sm:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <Aperture size={18} />
              </span>
              <div>
                <p className="font-display text-xs font-semibold text-cream-50">
                  Content Creator
                </p>
                <p className="font-mono text-[10px] text-cream-100/50">
                  Photo · Video · Design
                </p>
              </div>
            </div>

            {/* floating chip: location */}
            <div className="animate-float-slower absolute -bottom-5 -right-2 flex items-center gap-2.5 rounded-2xl border border-cream-100/15 bg-navy-900/90 px-4 py-3 shadow-2xl backdrop-blur sm:-right-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <MapPin size={18} />
              </span>
              <div>
                <p className="font-display text-xs font-semibold text-cream-50">
                  Based in
                </p>
                <p className="font-mono text-[10px] text-cream-100/50">
                  Subang, Jawa Barat
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-mask relative border-t border-cream-100/10 bg-navy-900/60 py-4">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {disciplines.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex items-center font-display text-sm font-medium uppercase tracking-[0.2em] text-cream-100/45"
                >
                  <span className="px-7">{item}</span>
                  <span className="text-accent-400">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

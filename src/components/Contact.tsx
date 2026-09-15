import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { profile } from "../data";
import { InstagramIcon } from "./Icons";

const cards = [
  {
    label: "Telepon / WhatsApp",
    value: profile.phone,
    href: profile.phoneHref,
    icon: Phone,
  },
  {
    label: "Instagram",
    value: profile.instagram,
    href: profile.instagramHref,
    icon: InstagramIcon,
  },
  {
    label: "Lokasi",
    value: profile.location,
    href: "https://maps.google.com/?q=Walahar+Dangdeur+Subang",
    icon: MapPin,
  },
];

export function Contact() {
  return (
    <section
      id="kontak"
      className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 07" title="Kontak" tone="dark" />
        </Reveal>

        <div className="mt-12 text-center">
          <Reveal delay={0.05}>
            <h2 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-cream-50 sm:text-7xl">
              Mari{" "}
              <span className="font-accent font-normal italic text-accent-400">
                berkolaborasi
              </span>{" "}
              dan berkarya bersama.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream-100/60">
              Tertarik membuat konten, dokumentasi, atau kebutuhan desain untuk
              brand & acara Anda? Jangan ragu untuk menghubungi saya.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand-500 px-8 py-4 font-display text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <Mail size={18} />
              {profile.email}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.label} delay={0.08 * i}>
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card-hover group flex h-full items-start gap-4 rounded-3xl border border-cream-100/10 bg-navy-900 p-6 hover:border-brand-500/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/45">
                      {card.label}
                    </span>
                    <span className="mt-1.5 block break-words font-display text-base font-semibold text-cream-50">
                      {card.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

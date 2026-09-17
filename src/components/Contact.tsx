import { useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight, Send, CheckCircle } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { profile, platforms, contactPurposes } from "../data";
import { InstagramIcon } from "././Icons";
import { YouTubeIcon, TwitchIcon, TikTokIcon, HeartIcon } from "./PlatformIcons";

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

const platformIconMap: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  twitch: TwitchIcon,
  tiktok: TikTokIcon,
  heart: HeartIcon,
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend / CMS
    // For now, we construct a mailto link
    const subject = `[${contactPurposes.find(p => p.value === formData.purpose)?.label || "Pertanyaan"}] dari ${formData.name}`;
    const body = `Nama: ${formData.name}%0AEmail: ${formData.email}%0AKeperluan: ${contactPurposes.find(p => p.value === formData.purpose)?.label}%0A%0APesan:%0A${encodeURIComponent(formData.message)}`;
    window.open(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="kontak"
      className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="// 09" title="Kontak" tone="dark" />
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
              brand & acara Anda? Atau ingin berkolaborasi sebagai VTuber?
              Jangan ragu untuk menghubungi saya.
            </p>
          </Reveal>
        </div>

        {/* Platform links */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => {
              const Icon = platformIconMap[p.icon] || InstagramIcon;
              return (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-hover group flex items-center gap-3 rounded-2xl border border-cream-100/10 bg-navy-900 px-5 py-3 hover:border-brand-500/50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-cream-50">
                      {p.name}
                    </p>
                    <p className="font-mono text-[10px] text-cream-100/50">
                      {p.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Contact form + Info cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-cream-100/10 bg-navy-900 p-7 sm:p-9">
              <h3 className="font-display text-xl font-semibold text-cream-50">
                Formulir Kontak Bisnis
              </h3>
              <p className="mt-2 text-sm text-cream-100/50">
                Isi form di bawah untuk tawaran komisi, sponsor, kolaborasi,
                atau pertanyaan lainnya.
              </p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-success-500/30 bg-success-500/10 p-10 text-center">
                  <CheckCircle size={40} className="text-success-400" />
                  <p className="font-display text-lg font-semibold text-cream-50">
                    Pesan Siap Dikirim!
                  </p>
                  <p className="text-sm text-cream-100/60">
                    Aplikasi email akan terbuka untuk menyelesaikan pengiriman.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/50">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Masukkan nama Anda"
                        className="form-input mt-2 bg-navy-800 border-cream-100/10 text-cream-50 placeholder:text-cream-100/30"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/50">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        className="form-input mt-2 bg-navy-800 border-cream-100/10 text-cream-50 placeholder:text-cream-100/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/50">
                      Jenis Keperluan
                    </label>
                    <select
                      required
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      className="form-input mt-2 bg-navy-800 border-cream-100/10 text-cream-50"
                    >
                      <option value="" disabled>
                        Pilih jenis keperluan...
                      </option>
                      {contactPurposes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/50">
                      Pesan
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Ceritakan detail kebutuhan Anda..."
                      className="form-input mt-2 resize-none bg-navy-800 border-cream-100/10 text-cream-50 placeholder:text-cream-100/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    <Send size={16} />
                    Kirim Pesan
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info cards */}
          <div className="space-y-5 lg:col-span-2">
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

            {/* Donation CTA */}
            <Reveal delay={0.3}>
              <a
                href={profile.donation}
                target="_blank"
                rel="noreferrer"
                className="card-hover group flex items-center gap-4 rounded-3xl border border-accent-500/30 bg-accent-500/10 p-6 hover:border-accent-500/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-500/20 text-accent-400 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                  <HeartIcon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-cream-100/45">
                    Dukung Sora
                  </span>
                  <span className="mt-1.5 block font-display text-base font-semibold text-cream-50">
                    {profile.donationLabel} — Trakteer
                  </span>
                  <span className="mt-0.5 block text-xs text-cream-100/50">
                    Apresiasi karya & dukung perjalanan kreatif
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

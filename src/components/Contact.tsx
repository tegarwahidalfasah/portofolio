import { useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight, Send, CheckCircle, Sparkles } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { profile, platforms, contactPurposes } from "../data";
import { InstagramIcon } from "./Icons";
import { YouTubeIcon, TwitchIcon, TikTokIcon, HeartIcon } from "./PlatformIcons";

const contactCards = [
  { label: "Telepon / WhatsApp", value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: "Instagram", value: profile.instagram, href: profile.instagramHref, icon: InstagramIcon },
  { label: "Lokasi", value: profile.locationShort, href: "https://maps.google.com/?q=Walahar+Dangdeur+Subang", icon: MapPin },
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
    const purposeLabel = contactPurposes.find(p => p.value === formData.purpose)?.label || "Pertanyaan";
    const subject = `[${purposeLabel}] dari ${formData.name}`;
    const body = `Nama: ${formData.name}%0AEmail: ${formData.email}%0AKeperluan: ${purposeLabel}%0A%0APesan:%0A${encodeURIComponent(formData.message)}`;
    window.open(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="kontak" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="// 09" title="Kontak" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
            Let's Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="mt-3 max-w-lg text-text-secondary">
            Have a project in mind or want to collaborate? I'm always open to new
            opportunities. Jangan ragu untuk menghubungi saya.
          </p>
        </Reveal>

        {/* Platform links */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            {platforms.map((p) => {
              const Icon = platformIconMap[p.icon] || InstagramIcon;
              return (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-card glass-hover group flex items-center gap-3 px-5 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-500 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-text-primary">
                      {p.name}
                    </p>
                    <p className="font-mono text-[10px] text-text-muted">
                      {p.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Form + Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass-card-strong p-7 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25">
                  <Mail size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    Formulir Kontak Bisnis
                  </h3>
                  <p className="text-sm text-text-muted">
                    Untuk komisi, sponsor, kolaborasi, atau pertanyaan lainnya.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center">
                  <CheckCircle size={40} className="text-green-500" />
                  <p className="font-display text-lg font-bold text-text-primary">
                    Pesan Siap Dikirim!
                  </p>
                  <p className="text-sm text-text-muted">
                    Aplikasi email akan terbuka untuk menyelesaikan pengiriman.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama Anda"
                        className="form-glass mt-2"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="form-glass mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                      Jenis Keperluan
                    </label>
                    <select
                      required
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="form-glass mt-2"
                    >
                      <option value="" disabled>Pilih jenis keperluan...</option>
                      {contactPurposes.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                      Pesan
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan detail kebutuhan Anda..."
                      className="form-glass mt-2 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-7 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-xl"
                  >
                    <Send size={16} />
                    Kirim Pesan
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Info cards */}
          <div className="space-y-5 lg:col-span-2">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.label} delay={0.08 * i}>
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="glass-card glass-hover group flex items-start gap-4 p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/10 to-sky-400/10 text-accent-500 transition-all duration-300 group-hover:from-accent-500 group-hover:to-sky-400 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                        {card.label}
                      </span>
                      <span className="mt-1 block font-display text-base font-bold text-text-primary">
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
                className="glass-card glass-hover group flex items-center gap-4 border-accent-500/20 bg-accent-500/5 p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25">
                  <HeartIcon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-text-muted">
                    Dukung Sora
                  </span>
                  <span className="mt-1 block font-display text-base font-bold text-text-primary">
                    {profile.donationLabel} — Trakteer
                  </span>
                  <span className="mt-0.5 block text-xs text-text-muted">
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

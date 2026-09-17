import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const faqs = [
  {
    question: "Berapa lama proses editing video?",
    answer:
      "Tergantung kompleksitas dan durasi video. Untuk video pendek (1-3 menit), biasanya 2-3 hari kerja. Video panjang (10+ menit) bisa memakan waktu 5-7 hari kerja. Revisi minor biasanya selesai dalam 1 hari.",
  },
  {
    question: "Apakah bisa revisi hasil editing?",
    answer:
      "Tentu! Saya menyediakan 2x revisi gratis untuk setiap proyek. Revisi tambahan dikenakan biaya sesuai kesepakatan. Saya selalu berkomunikasi dengan klien di setiap tahap untuk memastikan hasil sesuai ekspektasi.",
  },
  {
    question: "Bagaimana cara memesan jasa?",
    answer:
      "Anda bisa menghubungi saya melalui formulir kontak di website ini, email ke tegarwahidalfasah@gmail.com, atau DM Instagram @tegarwahidalfasah. Saya akan merespon dalam waktu 24 jam.",
  },
  {
    question: "Apa yang perlu disiapkan sebelum memesan?",
    answer:
      "Untuk video editing: footage mentah, referensi style yang diinginkan, durasi target, dan brief singkat. Untuk desain: teks/konten, ukuran yang dibutuhkan, referensi visual, dan brand guidelines jika ada.",
  },
  {
    question: "Apakah ada garansi?",
    answer:
      "Saya menjamin kualitas kerja profesional. Jika hasil tidak sesuai brief yang disepakati, saya akan melakukan revisi tanpa biaya tambahan. Kepuasan klien adalah prioritas utama saya.",
  },
  {
    question: "Metode pembayaran apa yang diterima?",
    answer:
      "Saya menerima pembayaran via transfer bank (BCA, BRI, Mandiri), e-wallet (GoPay, OVO, DANA), dan pembayaran di muka 50% sebelum proyek dimulai, 50% setelah selesai.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionLabel index="// 10" title="FAQ" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-3 max-w-lg text-text-secondary">
            Pertanyaan umum yang sering ditanyakan oleh calon klien.
          </p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={0.06 * i}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/40"
                  >
                    <span className="font-display text-base font-bold text-text-primary sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-glass-300 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-accent-400 bg-accent-500 text-white"
                          : "text-text-muted"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-glass-300/50 px-6 pb-6">
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

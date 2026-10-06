import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, Navigation, Phone } from 'lucide-react';
import ClientsSection from '@/app/components/frontend/ClientsSection';
import ContactForm from '@/app/components/frontend/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'সফটওয়্যার ডেমো, প্রাইসিং বা যেকোনো তথ্যের জন্য School SoftwareBD-র সাথে যোগাযোগ করুন।',
};

/* scroll reveal-এর delay (ms) */
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Sahara+Center+37%2FA+VIP+Road+Kakrail+Dhaka';

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-1.56 19.88v-7H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v7A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    svg: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    svg: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
      </svg>
    ),
  },
];

/* ================================ HERO ================================ */
const ContactHero = () => (
  <section className="relative overflow-hidden bg-secondary pb-20 lg:pb-24">
    <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-primary/25 blur-[160px]" />
    <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-rose-500/20 blur-[170px]" />

    {/* Navbar layout-এ absolute, তাই উপরে navbar-এর উচ্চতা (~100px) যোগ করা */}
    <div className="container-x relative z-10 pt-44 text-center lg:pt-48">
      <span
        data-reveal
        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
      >
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        যোগাযোগ
      </span>

      <h1
        data-reveal
        style={delay(120)}
        className="mx-auto mt-8 max-w-4xl text-[34px] font-bold leading-[1.3] text-white sm:text-5xl sm:leading-[1.3]"
      >
        আপনার যেকোনো প্রয়োজনে
        <span className="block bg-gradient-to-r from-primary via-violet-400 to-pink-500 bg-clip-text pb-1 text-transparent">
          আমরা আছি পাশে
        </span>
      </h1>

      <p data-reveal style={delay(240)} className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-[29px]">
        সফটওয়্যার ডেমো, প্রাইসিং বা অন্য যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন। আমাদের সাপোর্ট টিম দ্রুততম
        সময়ের মধ্যে আপনার সাথে সংযুক্ত হবে।
      </p>
    </div>
  </section>
);

/* ================================ PAGE ================================ */
export default function ContactPage() {
  return (
    <main id="top">
      <ContactHero />

      <section className="section dot-pattern">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
          {/* ---------- left: info cards ---------- */}
          <div data-stagger="3" className="space-y-6">
            <div data-reveal className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-semibold leading-7 text-secondary">সরাসরি কথা বলুন</h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="icon-box bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] text-muted">ফোন নম্বর</p>
                    <a href="tel:+8801857770000" className="mt-0.5 block text-base font-semibold text-secondary transition hover:text-primary">
                      +৮৮০ ১৮৫৭ ৭৭০০০০
                    </a>
                    <p className="mt-0.5 text-[13px] text-muted">শনি-বৃহস্পতি, সকাল ৯টা – সন্ধ্যা ৬টা</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="icon-box bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] text-muted">ইমেইল ঠিকানা</p>
                    <a
                      href="mailto:info@schoolsoftwarebd.com"
                      className="mt-0.5 block break-all text-base font-semibold text-secondary transition hover:text-primary"
                    >
                      info@schoolsoftwarebd.com
                    </a>
                    <p className="mt-0.5 text-[13px] text-muted">২৪/৭ ইমেইল সাপোর্ট</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-semibold leading-7 text-secondary">আমাদের অফিস</h2>
              <div className="mt-6 flex gap-4">
                <div className="icon-box bg-rose-500/10">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <address className="not-italic">
                  <p className="text-base font-semibold text-secondary">স্কুল সফটওয়্যার বিডি</p>
                  <p className="mt-1 text-[15px] leading-7 text-body">
                    সাহারা সেন্টার, ৩৭/এ, লিফট ১৬, ভিআইপি রোড, কাকরাইল, ঢাকা
                  </p>
                </address>
              </div>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-secondary transition hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <Navigation className="h-4 w-4" /> গুগল ম্যাপে দেখুন
              </a>
            </div>

            <div data-reveal className="relative overflow-hidden rounded-2xl bg-secondary p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
              <h2 className="relative text-xl font-semibold leading-7 text-white">আমাদের সাথে যুক্ত থাকুন</h2>
              <p className="relative mt-2 text-sm text-muted">নতুন ফিচার, টিউটোরিয়াল ও আপডেট পেতে ফলো করুন।</p>
              <div className="relative mt-6 flex gap-3">
                {SOCIALS.map(({ label, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-primary"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- right: form ---------- */}
          <div
            id="contact-form"
            data-reveal
            style={delay(150)}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.2)] sm:p-10"
          >
            <h2 className="text-2xl font-bold leading-[1.4] text-secondary md:text-[30px]">বার্তা পাঠান</h2>
            <p className="mt-2 text-base leading-7 text-body">
              ফর্মটি পূরণ করুন, আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <ClientsSection className="bg-white" />
    </main>
  );
}
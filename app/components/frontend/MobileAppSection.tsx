/**
 * মোবাইল অ্যাপ ডাউনলোড সেকশন
 * স্ক্রিনশট রাখুন: public/assets/frontend/mobile-app.webp  (706×1600)
 */
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { BadgeCheck, Bell, CalendarCheck, CircleCheck, CreditCard, GraduationCap, Smartphone, type LucideIcon } from 'lucide-react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.schoolproject.amis';

const FEATURES: { icon: LucideIcon; text: string }[] = [
  { icon: Bell, text: 'নোটিশ ও আপডেট সরাসরি ফোনে' },
  { icon: CreditCard, text: 'বকেয়া ফি সহজে অনলাইনে পরিশোধ' },
  { icon: GraduationCap, text: 'পরীক্ষার ফলাফল দেখুন যেকোনো সময়' },
  { icon: CalendarCheck, text: 'ক্লাস রুটিন ও উপস্থিতি ট্র্যাক করুন' },
];

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/* Google Play বাটন — অফিসিয়াল ব্যাজের স্টাইলে */
const GooglePlayButton = () => (
  <a
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Google Play থেকে অ্যাপটি ডাউনলোড করুন"
    className="group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black px-5 py-2.5 text-white shadow-[0_14px_34px_-12px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-0.5 hover:border-white/40"
  >
    <svg viewBox="0 0 24 26" className="h-7 w-7 shrink-0" aria-hidden="true">
      <path fill="#00D7FE" d="M.6.5C.2.9 0 1.5 0 2.3v21.4c0 .8.2 1.4.6 1.8l.1.1L12.6 13.6v-.3L.7.4z" />
      <path fill="#FFCE00" d="m16.6 17.6-4-4v-.3l4-4 .1.1 4.7 2.7c1.4.8 1.4 2 0 2.8l-4.7 2.7z" />
      <path fill="#FF3A44" d="M16.7 17.5 12.6 13.4.6 25.4c.4.5 1.2.5 2 .1l14.1-8" />
      <path fill="#00F076" d="M16.7 9.3 2.6 1.3C1.8.8 1 .9.6 1.4l12 12z" />
    </svg>
    <span className="text-left leading-none">
      <span className="block text-[10px] font-medium uppercase tracking-wider text-white/75">Get it on</span>
      <span className="mt-1 block text-lg font-semibold tracking-tight">Google Play</span>
    </span>
  </a>
);

export default function MobileAppSection() {
  return (
    <section id="mobile-app" className="section relative overflow-hidden bg-secondary">
      {/* phone ভাসার animation — reduce-motion-এ বন্ধ */}
      <style>{`
        @keyframes app-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        .app-float { animation: app-float 6s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .app-float { animation: none } }
      `}</style>

      {/* background glow — অ্যাপের সবুজ + সাইটের indigo */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[620px] w-[620px] rounded-full bg-emerald-500/20 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-52 -left-52 h-[600px] w-[700px] rounded-full bg-primary/25 blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_50%,black_20%,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* ---------- বাঁ পাশ: লেখা ---------- */}
        <div data-reveal>
          <span className="eyebrow border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
            <Smartphone className="h-4 w-4" /> মোবাইল অ্যাপ
          </span>
          <h2 className="section-title text-white">আমাদের মোবাইল অ্যাপ ডাউনলোড করুন</h2>
          <p className="section-desc max-w-xl text-slate-400">
            নোটিশ, বকেয়া ফি, ফলাফল ও রুটিন — সবকিছু এখন হাতের মুঠোয়। এখনই অ্যাপটি ইনস্টল করে সহজে সবকিছু ম্যানেজ করুন।
          </p>

          <ul data-stagger="2" className="mt-9 grid gap-3 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li
                key={text}
                data-reveal
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-medium leading-6 text-slate-200">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <GooglePlayButton />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                <BadgeCheck className="h-6 w-6 text-emerald-400" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm text-slate-400">আমাদের প্রতিষ্ঠান</span>
                <span className="block text-base font-semibold text-white">অফিসিয়াল অ্যাপ</span>
              </span>
            </div>
          </div>
        </div>

        {/* ---------- ডান পাশ: ফোন ---------- */}
        <div data-reveal style={delay(150)} className="relative mx-auto w-full max-w-[420px]">
          {/* ফোনের পেছনের আলো ও বৃত্ত */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 max-sm:hidden" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          <div className="app-float relative mx-auto w-[250px] sm:w-[290px]">
            {/* phone frame */}
            <div className="relative rounded-[46px] bg-gradient-to-b from-slate-700 to-slate-900 p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
              {/* সাইড বাটন */}
              <span className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-slate-600" />
              <span className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-slate-600" />

              <div className="relative overflow-hidden rounded-[36px] bg-black">
                <Image
                  src="/assets/frontend/mobile-app.webp"
                  alt="মোবাইল অ্যাপের হোম স্ক্রিন — উপস্থিতি, ফি, ফলাফল ও নোটিশ"
                  width={706}
                  height={1600}
                  sizes="(min-width: 640px) 290px, 250px"
                  className="h-auto w-full"
                />
                {/* screen glare */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12]" />
              </div>
            </div>
          </div>

          {/* floating cards — বড় স্ক্রিনে */}
          <div className="absolute -left-6 top-10 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl backdrop-blur sm:flex lg:-left-24">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
              <Bell className="h-5 w-5 text-amber-600" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-secondary">নতুন নোটিশ</span>
              <span className="block text-[11px] text-muted">অর্ধবার্ষিক পরীক্ষার রুটিন</span>
            </span>
          </div>

          <div className="absolute -right-4 bottom-20 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl backdrop-blur sm:flex lg:-right-16">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
              <CircleCheck className="h-5 w-5 text-emerald-600" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-secondary">ফি পরিশোধ সফল</span>
              <span className="block text-[11px] text-muted">৳ ৩,১০০ · বিকাশ</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Gift, Headset, Globe, PlayCircle } from 'lucide-react';
import SchoolRegistration from '../components/frontend/SchoolRegistration';

export const metadata: Metadata = {
  title: 'যোগ দিন - School SoftwareBD',
  description:
    'আপনার স্কুল, কলেজ বা মাদ্রাসাকে School SoftwareBD-তে যুক্ত করুন — ফ্রি সাবডোমেইন, ১ মাসের ফ্রি ট্রায়াল ও ২৪/৭ সাপোর্ট।',
};

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

const PERKS = [
  { icon: Gift, text: '১ মাসের ফ্রি ট্রায়াল' },
  { icon: Globe, text: 'ফ্রি সাবডোমেইন' },
  { icon: Headset, text: '২৪/৭ বাংলায় সাপোর্ট' },
];

const JoinHero = () => (
  <section className="relative overflow-hidden bg-secondary pb-24 lg:pb-28">
    <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-primary/25 blur-[160px]" />
    <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-rose-500/20 blur-[170px]" />
    <div
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    <div className="container-x relative z-10 pt-44 text-center lg:pt-48">
      <span
        data-reveal
        className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
        ৮৭+ প্রতিষ্ঠান ইতিমধ্যে যুক্ত হয়েছে
      </span>

      <h1
        data-reveal
        style={delay(120)}
        className="mx-auto mt-8 max-w-4xl text-[34px] font-bold leading-[1.3] text-white sm:text-5xl sm:leading-[1.3] lg:text-[56px]"
      >
        আপনার স্কুলকে যুক্ত করুন
        <span className="block bg-gradient-to-r from-primary via-violet-400 to-pink-500 bg-clip-text pb-1 text-transparent">
          ডিজিটাল বাংলাদেশের সাথে
        </span>
      </h1>

      <p
        data-reveal
        style={delay(240)}
        className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-[29px]"
      >
        কয়েক মিনিটেই রেজিস্ট্রেশন করুন। আমরা তথ্য যাচাই করে আপনার স্কুলের নিজস্ব ড্যাশবোর্ড ও ওয়েবসাইট চালু করে দেব —
        কোনো ঝামেলা ছাড়াই।
      </p>

      <div data-reveal style={delay(360)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="#register" className="btn btn-primary">
          রেজিস্ট্রেশন শুরু করুন <ArrowRight className="h-5 w-5" />
        </Link>
        <Link href="/#demo" className="btn btn-outline">
          আগে ডেমো দেখুন <PlayCircle className="h-5 w-5" />
        </Link>
      </div>

      <ul
        data-reveal
        style={delay(460)}
        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
      >
        {PERKS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15">
              <Icon className="h-4 w-4 text-success" />
            </span>
            {text} 
          </li>
        ))}
      </ul>

      <nav
        data-reveal
        style={delay(560)}
        aria-label="breadcrumb"
        className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm"
      >
        <Link href="/" className="text-slate-300 transition hover:text-white">
          মূল পাতা
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted" />
        <span className="text-primary" aria-current="page">
          যোগ দিন
        </span>
      </nav>
    </div>
  </section>
);

export default function JoinPage() {
  return (
    <main id="top">
      <JoinHero />
      <SchoolRegistration />
    </main>
  );
}
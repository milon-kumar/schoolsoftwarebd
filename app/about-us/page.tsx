import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  CircleCheck,
  ContactRound,
  Fingerprint,
  FolderOpen,
  GraduationCap,
  Headphones,
  MessageCircle,
  Presentation,
  Rocket,
  School,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import ClientsSection from '@/app/components/frontend/ClientsSection';
import CountUp from '@/app/components/frontend/CountUp';

export const metadata: Metadata = {
  title: 'About Us - School SoftwareBD',
  description:
    '২০১৫ সাল থেকে ৮৭টিরও বেশি শিক্ষা প্রতিষ্ঠানকে ডিজিটাল করেছে School SoftwareBD — বাংলাদেশের স্কুলের জন্য বাংলায় তৈরি School Management Software।',
};

/* scroll reveal-এর delay (ms) — যেমন: style={delay(150)} */
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/* ================================ HERO ================================ */
const AboutHero = () => (
  <section className="relative overflow-hidden bg-secondary pb-24 lg:pb-28">
    <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-primary/25 blur-[160px]" />
    <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-rose-500/20 blur-[170px]" />

    {/* Navbar layout-এ absolute, তাই উপরে navbar-এর উচ্চতা (~100px) যোগ করা */}
    <div className="container-x relative z-10 pt-44 text-center lg:pt-48">
      <h1
        data-reveal
        className="mx-auto max-w-4xl text-[34px] font-bold leading-[1.3] text-white sm:text-5xl sm:leading-[1.3] lg:text-[56px]"
      >
        ৯ বছরে ৮৭টি প্রতিষ্ঠানের ডিজিটাল
        <span className="block bg-gradient-to-r from-primary via-violet-400 to-pink-500 bg-clip-text pb-1 text-transparent">
          রূপান্তরের অভিজ্ঞতা
        </span>
      </h1>

      <nav
        data-reveal
        style={delay(150)}
        aria-label="breadcrumb"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm"
      >
        <Link href="/" className="text-slate-300 transition hover:text-white">
          মূল পাতা
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted" />
        <span className="text-primary" aria-current="page">
          আমাদের সম্পর্কে
        </span>
      </nav>
    </div>
  </section>
);

/* ================================ STORY =============================== */
const StorySection = () => (
  <section className="section dot-pattern">
    <div className="container-x grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div data-reveal>
        <span className="eyebrow">কোম্পানি প্রোফাইল</span>
        <h2 className="section-title">আমাদের গল্পের শুরু যেভাবে</h2>
        <div className="section-desc space-y-4">
          <p>
            ২০১৫ সাল। বাংলাদেশের স্কুলগুলো তখনো রেজিস্টার খাতায় হাজিরা নিচ্ছে। হাতে হিসাব করে বেতন তুলছে। পরীক্ষার রেজাল্ট
            বানাতে শিক্ষকদের রাত জাগতে হচ্ছে। বিদেশি সফটওয়্যার ছিল ঠিকই, কিন্তু দাম আকাশছোঁয়া। বাংলা সাপোর্ট নেই।
            বিকাশ-নগদ চলে না। বাংলাদেশের শিক্ষাবোর্ডের নিয়মের সাথে মেলে না।
          </p>
          <p>
            তখন একটাই প্রশ্ন মাথায় এলো — বাংলাদেশের স্কুলের জন্য, বাংলাদেশেই তৈরি সফটওয়্যার কেন নেই? সেই প্রশ্ন থেকেই জন্ম
            নিল School SoftwareBD। সম্পূর্ণ বাংলায়। বাংলাদেশের বাস্তবতার কথা মাথায় রেখে। সাশ্রয়ী মূল্যে।
          </p>
          <p>আজ ৯ বছর পর ৮৭টিরও বেশি প্রতিষ্ঠান আমাদের সফটওয়্যার ব্যবহার করছে। এই সংখ্যা প্রতিদিন বাড়ছে।</p>
        </div>
      </div>

      <div data-stagger="2" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        <div data-reveal className="card flex items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-body">স্থাপিত</p>
            <p className="mt-1 text-[40px] font-bold leading-tight text-secondary">২০১৫</p>
            <p className="mt-1 text-sm text-muted">সাফল্যের সাথে প্রযুক্তি সেবায়</p>
          </div>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-[0_10px_30px_rgba(99,102,241,0.45)]">
            <Rocket className="h-7 w-7 text-white" />
          </div>
        </div>

        <div
          data-reveal
          className="relative flex items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 p-7 shadow-[0_20px_40px_-12px_rgba(249,115,22,0.55)] hover:-translate-y-1"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/15" />
          <div className="relative">
            <p className="text-sm font-semibold text-white/90">মোট কর্মচারী ও পার্টনার</p>
            <p className="mt-1 text-[40px] font-bold leading-tight text-white">১৫+</p>
            <p className="mt-1 text-sm text-white/80">সহযোগী পার্টনার ৩০০+</p>
          </div>
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
            <Users className="h-7 w-7 text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* =============================== MISSION ============================== */
const missionPoints = [
  'কাগজবিহীন (Paperless) শিক্ষাপ্রতিষ্ঠান গড়া',
  'স্বচ্ছ ও রিয়েল-টাইম যোগাযোগ ব্যবস্থা',
  'প্রশাসনিক কাজে সময় ও খরচ সাশ্রয়',
];

const MissionSection = () => (
  <section className="section overflow-hidden bg-white">
    <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
      <div data-reveal className="relative">
        <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-primary/10 via-transparent to-rose-500/10 blur-xl" />
        {/* নিজের টিমের ছবি দিতে: public/assets/frontend/-এ রেখে src="/assets/frontend/team.webp" করুন */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
          alt="আমাদের টিম কাজ করছে"
          loading="lazy"
          className="aspect-[5/4] w-full rounded-2xl object-cover shadow-xl"
        />
        <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-200 sm:-right-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
            <ShieldCheck className="h-5 w-5 text-success" />
          </span>
          <div>
            <p className="text-[11px] text-muted">অভিজ্ঞতা</p>
            <p className="text-base font-bold text-secondary">৯+ বছর</p>
          </div>
        </div>
      </div>

      <div data-reveal style={delay(150)}>
        <span className="eyebrow">লক্ষ্য ও উদ্দেশ্য</span>
        <h2 className="section-title">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
        <div className="section-desc space-y-4">
          <p>
            আমাদের মূল লক্ষ্য হলো তথ্যপ্রযুক্তির সর্বোত্তম ব্যবহারের মাধ্যমে দেশের প্রতিটি শিক্ষাপ্রতিষ্ঠানকে আধুনিক,
            কাগজবিহীন (Paperless) এবং গতিশীল করে তোলা।
          </p>
          <p>
            ম্যানুয়াল কাজের জটিলতা ও সময়ক্ষেপণ কমিয়ে, প্রতিষ্ঠান প্রধান, শিক্ষক, শিক্ষার্থী এবং অভিভাবকদের মাঝে একটি স্বচ্ছ ও
            রিয়েল-টাইম যোগাযোগ ব্যবস্থা গড়ে তোলাই আমাদের প্রধান উদ্দেশ্য। এটি একটি সম্পূর্ণ ক্লাউড-ভিত্তিক প্ল্যাটফর্ম, যা
            দৈনন্দিন প্রশাসনিক কাজগুলোকে করে তোলে সহজ ও সম্পূর্ণ স্বয়ংক্রিয়।
          </p>
        </div>
        <ul className="mt-7 space-y-3.5">
          {missionPoints.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] font-medium leading-6 text-secondary">
              <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* =============================== MODULES ============================== */
// hover-এ card-এর border ও icon box নিজের রঙে ভরে যায়
type Module = { icon: LucideIcon; title: string; desc: string; tone: string };

const modules: Module[] = [
  {
    icon: UserRound,
    title: 'শিক্ষার্থী ব্যবস্থাপনা',
    desc: 'অনলাইন ভর্তি, ডিজিটাল আইডি কার্ড, প্রোফাইল আপডেট এবং শিক্ষার্থীদের সার্বিক তথ্য সংরক্ষণের আধুনিক ব্যবস্থা।',
    tone: 'hover:border-primary/50 [--c:#6366f1]',
  },
  {
    icon: FolderOpen,
    title: 'একাডেমিক ও রেজাল্ট',
    desc: 'রুটিন তৈরি, সিলেবাস, পরীক্ষা ব্যবস্থাপনা, স্বয়ংক্রিয় মার্কশিট ও টেবুলেশন শিট তৈরির ঝামেলাহীন প্রক্রিয়া।',
    tone: 'hover:border-success/50 [--c:#10b981]',
  },
  {
    icon: Calculator,
    title: 'অনলাইন ফি কালেকশন',
    desc: 'বিকাশ, রকেট, নগদ বা ব্যাংকের মাধ্যমে ঘরে বসেই ফি প্রদান। ইনভয়েস এবং আয়-ব্যয়ের রিয়েল টাইম হিসাব।',
    tone: 'hover:border-orange-400 [--c:#f97316]',
  },
  {
    icon: Fingerprint,
    title: 'ডিজিটাল হাজিরা',
    desc: 'বায়োমেট্রিক বা আরএফআইডি (RFID) ডিভাইসের মাধ্যমে স্বয়ংক্রিয় হাজিরা এবং অনুপস্থিতির সাথে সাথে এসএমএস এলার্ট।',
    tone: 'hover:border-purple-400 [--c:#a855f7]',
  },
  {
    icon: MessageCircle,
    title: 'এসএমএস ও নোটিশ',
    desc: 'জরুরি নোটিশ, পরীক্ষার রেজাল্ট বা ফি বকেয়া থাকলে এক ক্লিকে শিক্ষক, শিক্ষার্থী ও অভিভাবকদের কাছে এসএমএস।',
    tone: 'hover:border-rose-300 [--c:#f43f5e]',
  },
  {
    icon: ContactRound,
    title: 'এইচআর ও পেরোল',
    desc: 'শিক্ষক-কর্মচারীদের হাজিরা, ছুটির হিসাব এবং স্বয়ংক্রিয় স্যালারি শিট তৈরির সম্পূর্ণ ব্যবস্থাপনা।',
    tone: 'hover:border-teal-400 [--c:#0d9488]',
  },
];

const ModulesSection = () => (
  <section className="section bg-light">
    <div className="container-x">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="eyebrow">মূল মডিউলসমূহ</span>
          <h2 className="section-title">সবকিছু এক প্ল্যাটফর্মে</h2>
        </div>
        <Link
          href="/software-features"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          সব মডিউল দেখুন <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div data-stagger="3" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map(({ icon: Icon, title, desc, tone }) => (
          <div key={title} data-reveal className={`card group ${tone}`}>
            <div className="icon-box bg-[color-mix(in_oklab,var(--c)_10%,transparent)] text-[var(--c)] transition-colors duration-300 group-hover:bg-[var(--c)] group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="card-title mt-6">{title}</h3>
            <p className="card-text">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================ ACHIEVEMENTS ============================ */
type Stat = { to: number; suffix: string; label: string; icon: LucideIcon; ring: string };

const stats: Stat[] = [
  { to: 87, suffix: '+', label: 'নিবন্ধিত প্রতিষ্ঠান', icon: School, ring: 'border-primary bg-primary/10 text-primary shadow-[0_0_25px_rgba(99,102,241,.6)]' },
  { to: 47, suffix: ' হাজার+', label: 'শিক্ষার্থী', icon: GraduationCap, ring: 'border-success bg-success/10 text-success shadow-[0_0_25px_rgba(16,185,129,.6)]' },
  { to: 1300, suffix: '+', label: 'শিক্ষক', icon: Presentation, ring: 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_25px_rgba(245,158,11,.6)]' },
  { to: 45, suffix: ' হাজার+', label: 'অভিভাবক', icon: Users, ring: 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-[0_0_25px_rgba(244,63,94,.6)]' },
];

const AchievementsSection = () => (
  <section
    className="section relative overflow-hidden bg-secondary"
    style={{
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  >
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />

    <div className="container-x relative z-10">
      <div data-reveal className="section-head">
        <span className="eyebrow">পরিসংখ্যান</span>
        <h2 className="section-title text-white">আমাদের অর্জন ও নির্ভরতা</h2>
        <p className="section-desc text-muted">
          দীর্ঘদিনের পথচলায় উন্নত সেবা এবং বিশ্বস্ততার মাধ্যমে আমরা অর্জন করেছি দেশের অসংখ্য প্রতিষ্ঠানের আস্থা।
        </p>
      </div>

      <div data-stagger="4" className="mt-14 grid grid-cols-2 gap-10 lg:grid-cols-4">
        {stats.map(({ to, suffix, label, icon: Icon, ring }) => (
          <div key={label} data-reveal className="text-center">
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 ${ring}`}>
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-6 whitespace-nowrap text-[28px] font-bold leading-[1.4] text-white sm:text-2xl">
              <CountUp to={to} />
              {suffix}
            </p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-14 flex flex-wrap items-center justify-center gap-4">
        <Link href="/software-features" className="btn btn-primary">
          <Smartphone className="h-5 w-5" /> ডেডিকেটেড মোবাইল অ্যাপ
        </Link>
        <a href="#contact" className="btn btn-outline">
          <Headphones className="h-5 w-5" /> ২৪/৭ কাস্টমার সাপোর্ট
        </a>
      </div>
    </div>
  </section>
);

/* ================================ PAGE ================================ */
export default function AboutPage() {
  return (
    <main id="top">
      <AboutHero />
      <StorySection />
      <MissionSection />
      <ModulesSection />
      <AchievementsSection />
      <ClientsSection className="bg-white" />
    </main>
  );
}
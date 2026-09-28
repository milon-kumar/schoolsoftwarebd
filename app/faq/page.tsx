import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  CircleHelp,
  Headset,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import ClientsSection from '@/app/components/frontend/ClientsSection';
import FaqAccordion, { type FaqItem } from '@/app/components/frontend/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ - School SoftwareBD',
  description:
    'School SoftwareBD সম্পর্কে সাধারণ প্রশ্ন ও উত্তর — মূল্য, সেটআপ, ফিচার, সাপোর্ট ও ডাটা নিরাপত্তা।',
};

/* scroll reveal-এর delay (ms) */
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/* =====================================================================
   সব প্রশ্ন-উত্তর এখানে — নতুন প্রশ্ন যোগ করতে শুধু array-তে লিখুন।
   এই একই data থেকে Google-এর FAQ schema-ও তৈরি হয়।
   ===================================================================== */
type FaqGroup = { title: string; icon: LucideIcon; items: FaqItem[] };

const general: FaqGroup = {
  title: 'সাধারণ প্রশ্ন',
  icon: CircleHelp,
  items: [
    {
      q: 'School SoftwareBD আসলে কী?',
      a: 'School SoftwareBD হলো বাংলাদেশের স্কুল, কলেজ ও মাদ্রাসার জন্য তৈরি একটি ক্লাউড-ভিত্তিক School Management Software। ভর্তি, হাজিরা, ফি কালেকশন, রেজাল্ট, পেরোল — সব কাজ একটি প্ল্যাটফর্মে করা যায়। ২০১৫ সাল থেকে আমরা ৮৭টিরও বেশি প্রতিষ্ঠানকে ডিজিটাল করেছি।',
    },
    {
      q: 'এটা কি শুধু স্কুলের জন্য নাকি অন্য প্রতিষ্ঠানেও ব্যবহার করা যাবে?',
      a: 'শুধু স্কুল নয় — কলেজ, মাদ্রাসা ও কোচিং সেন্টারেও ব্যবহার করা যায়। প্রতিটি প্রতিষ্ঠানের ধরন ও প্রয়োজন অনুযায়ী সফটওয়্যারটি কাস্টমাইজ করে দেওয়া হয়।',
    },
    {
      q: 'সফটওয়্যারটি কি বাংলায় ব্যবহার করা যাবে?',
      a: 'হ্যাঁ। সফটওয়্যারটি সম্পূর্ণ বাংলায় তৈরি, তাই কম্পিউটারে নতুন এমন শিক্ষক বা স্টাফরাও সহজেই ব্যবহার করতে পারেন। রেজাল্ট কার্ড, রশিদ ও রিপোর্টও বাংলায় পাওয়া যায়।',
    },
    {
      q: 'এটা কি অনলাইন নাকি অফলাইন সফটওয়্যার?',
      a: 'এটি একটি ক্লাউড-ভিত্তিক অনলাইন সফটওয়্যার। কম্পিউটারে কিছু ইনস্টল করতে হয় না — ইন্টারনেট থাকলে কম্পিউটার, ল্যাপটপ বা মোবাইল থেকে যেকোনো জায়গায় বসে ব্যবহার করা যায়।',
    },
    {
      q: 'ইন্টারনেট স্লো হলে কি সমস্যা হবে?',
      a: 'সফটওয়্যারটি হালকা করে তৈরি, তাই সাধারণ ব্রডব্যান্ড বা মোবাইল ইন্টারনেটেও স্বাভাবিকভাবে চলে। সব তথ্য ক্লাউডে সংরক্ষিত থাকে, তাই সংযোগ সাময়িক বিচ্ছিন্ন হলেও কোনো ডাটা হারায় না।',
    },
  ],
};

const pricing: FaqGroup = {
  title: 'মূল্য ও প্যাকেজ',
  icon: Wallet,
  items: [
    {
      q: 'School SoftwareBD-র মূল্য কত?',
      a: 'মূল্য নির্ভর করে প্রতিষ্ঠানের আকার, শিক্ষার্থী সংখ্যা ও প্রয়োজনীয় মডিউলের উপর। ছোট প্রতিষ্ঠান থেকে বড় প্রতিষ্ঠান — সবার জন্য আলাদা প্যাকেজ আছে। সঠিক মূল্য জানতে আমাদের সাথে যোগাযোগ করুন বা ফ্রি ডেমো বুক করুন।',
    },
    {
      q: 'কি মাসিক নাকি বার্ষিক পেমেন্ট করতে হবে?',
      a: 'আপনার সুবিধা অনুযায়ী মাসিক বা বার্ষিক — দুইভাবেই পেমেন্ট করা যায়। কোন প্যাকেজে কোন পেমেন্ট অপশন আপনার জন্য সাশ্রয়ী হবে, তা আমাদের টিম বুঝিয়ে দেবে।',
    },
    {
      q: 'কি কোনো সেটআপ বা ইনস্টলেশন চার্জ আছে?',
      a: 'সেটআপ চার্জ প্যাকেজ ও প্রয়োজনীয় কাস্টমাইজেশনের উপর নির্ভর করে। কোনো লুকানো খরচ নেই — চুক্তির আগেই সব খরচ পরিষ্কারভাবে জানিয়ে দেওয়া হয়।',
    },
    {
      q: 'ফ্রি ট্রায়াল বা ডেমো পাওয়া যাবে?',
      a: 'হ্যাঁ। আপনি ফ্রি ডেমো দেখে নিতে পারেন এবং ১ মাসের ফ্রি ট্রায়াল উপভোগ করতে পারেন। ব্যবহার করে সন্তুষ্ট হলে তবেই সিদ্ধান্ত নিন।',
    },
    {
      q: 'পেমেন্ট কীভাবে করব?',
      a: 'বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন। প্রতিটি পেমেন্টের জন্য আপনি রশিদ পাবেন।',
    },
  ],
};

const setup: FaqGroup = {
  title: 'সেটআপ ও ইনস্টলেশন',
  icon: Settings,
  items: [
    {
      q: 'সফটওয়্যার সেটআপ করতে কতদিন লাগবে?',
      a: 'সাধারণত ৭-১৫ কার্যদিবসের মধ্যে সেটআপ সম্পন্ন হয়। প্রতিষ্ঠানের আকার ও জটিলতার উপর নির্ভর করে সময় কম-বেশি হতে পারে। সেটআপের পর আমাদের টিম আপনাকে হাতে-কলমে ব্যবহার শিখিয়ে দেবে।',
    },
    {
      q: 'সেটআপের জন্য কি আলাদা হার্ডওয়্যার বা সার্ভার কিনতে হবে?',
      a: 'না। সফটওয়্যারটি ক্লাউডে চলে, তাই আলাদা সার্ভার লাগে না — একটি কম্পিউটার বা মোবাইল আর ইন্টারনেট সংযোগই যথেষ্ট। শুধু বায়োমেট্রিক বা RFID হাজিরা ব্যবহার করতে চাইলে হাজিরার ডিভাইস লাগবে।',
    },
    {
      q: 'পুরনো ডেটা কি নতুন সিস্টেমে নিয়ে আসা যাবে?',
      a: 'হ্যাঁ। শিক্ষার্থী, শিক্ষক ও ফি-র পুরনো তথ্য Excel বা অন্য ফরম্যাট থেকে নতুন সিস্টেমে ইমপোর্ট করা যায়। এই কাজে আমাদের টিম আপনাকে সহযোগিতা করবে।',
    },
    {
      q: 'শিক্ষক ও স্টাফদের কি আলাদা প্রশিক্ষণ দরকার হবে?',
      a: 'সফটওয়্যারটি বাংলায় এবং ব্যবহার সহজ, তাই বড় কোনো প্রশিক্ষণের দরকার হয় না। তারপরও সেটআপের পর আমাদের টিম শিক্ষক ও স্টাফদের হাতে-কলমে ব্যবহার শিখিয়ে দেয়।',
    },
  ],
};

const features: FaqGroup = {
  title: 'ফিচার ও মডিউল',
  icon: LayoutGrid,
  items: [
    {
      q: 'কোন কোন মডিউল আছে?',
      a: 'শিক্ষার্থী ভর্তি ও প্রোফাইল, ডিজিটাল হাজিরা (বায়োমেট্রিক/RFID), অনলাইন ফি কালেকশন, একাডেমিক ও রেজাল্ট ম্যানেজমেন্ট, এসএমএস ও নোটিশ বোর্ড, এইচআর ও পেরোল, স্বচ্ছ হিসাব ও অ্যাকাউন্টিং, মোবাইল অ্যাপ এবং ডাইনামিক স্কুল ওয়েবসাইট।',
    },
    {
      q: 'বিকাশ বা নগদ দিয়ে ফি কালেকশন করা যাবে?',
      a: 'হ্যাঁ। বিকাশ, নগদ, রকেট ও ব্যাংকের মাধ্যমে অভিভাবক ঘরে বসেই ফি দিতে পারেন। পেমেন্টের সাথে সাথে স্বয়ংক্রিয় রশিদ তৈরি হয় এবং হিসাব আপডেট হয়ে যায়।',
    },
    {
      q: 'বায়োমেট্রিক হাজিরা সিস্টেম কি এই সফটওয়্যারে যুক্ত করা যাবে?',
      a: 'হ্যাঁ। বায়োমেট্রিক বা RFID কার্ড ডিভাইস সফটওয়্যারের সাথে যুক্ত করা যায়। হাজিরা স্বয়ংক্রিয়ভাবে রেকর্ড হয় এবং অনুপস্থিত শিক্ষার্থীর অভিভাবক সাথে সাথে SMS পান।',
    },
    {
      q: 'মোবাইল অ্যাপ কি পাওয়া যাবে?',
      a: 'হ্যাঁ। অ্যান্ড্রয়েড অ্যাপে শিক্ষক, অভিভাবক ও শিক্ষার্থী নিজ নিজ লগইনে হাজিরা, ফি, রেজাল্ট ও নোটিশ দেখতে পারেন। প্রতিষ্ঠান প্রধান অফিসের বাইরে থেকেও সব রিপোর্ট দেখতে পারেন।',
    },
    {
      q: 'মডিউল কি পরে যোগ করা যাবে?',
      a: 'অবশ্যই। প্রয়োজনীয় মডিউল দিয়ে শুরু করে পরে যেকোনো সময় নতুন মডিউল যোগ করতে পারবেন। আগের সব তথ্য অক্ষত থাকবে।',
    },
  ],
};

const support: FaqGroup = {
  title: 'সাপোর্ট ও নিরাপত্তা',
  icon: ShieldCheck,
  items: [
    {
      q: 'সমস্যা হলে কীভাবে সাপোর্ট পাব?',
      a: 'আমাদের ডেডিকেটেড সাপোর্ট টিম ২৪/৭ সাহায্যের জন্য প্রস্তুত। ফোন, WhatsApp ও ইমেইলে যোগাযোগ করতে পারবেন। সব সাপোর্ট বাংলায় দেওয়া হয়।',
    },
    {
      q: 'ডেটা কি নিরাপদ থাকবে?',
      a: 'হ্যাঁ। প্রতিদিন স্বয়ংক্রিয় ক্লাউড ব্যাকআপ হয়, সব ডাটা এনক্রিপ্টেড অবস্থায় আদান-প্রদান হয় এবং Role-ভিত্তিক Access Control থাকায় প্রত্যেকে শুধু নিজের অনুমতি পাওয়া তথ্যই দেখতে পারেন।',
    },
    {
      q: 'কতজন ব্যবহারকারী একসাথে ব্যবহার করতে পারবেন?',
      a: 'প্রতিষ্ঠান প্রধান, শিক্ষক, স্টাফ, শিক্ষার্থী ও অভিভাবক — সবাই নিজ নিজ লগইনে একসাথে ব্যবহার করতে পারেন। আপনার প্যাকেজ অনুযায়ী ব্যবহারকারীর বিস্তারিত আমাদের টিম জানিয়ে দেবে।',
    },
    {
      q: 'সফটওয়্যার আপডেট কীভাবে হবে?',
      a: 'সফটওয়্যারটি ক্লাউডে চলে, তাই নতুন ফিচার ও উন্নতি স্বয়ংক্রিয়ভাবে যুক্ত হয়ে যায়। আপনাকে কিছু ডাউনলোড বা ইনস্টল করতে হবে না — সবসময় আপ টু ডেট থাকবেন।',
    },
    {
      q: 'চুক্তি বাতিল করতে চাইলে কি ডেটা ফেরত পাব?',
      a: 'হ্যাঁ। আপনার প্রতিষ্ঠানের তথ্য আপনারই। চুক্তি বাতিল করলে আপনার সব ডেটা Excel বা PDF আকারে ফেরত দেওয়া হয়।',
    },
  ],
};

/* Google search-এ প্রশ্ন-উত্তর দেখানোর জন্য (server-এ render হয়, SEO-র জন্য ভালো) */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [general, pricing, setup, features, support].flatMap((g) =>
    g.items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  ),
};

/* ============================== Components ============================== */
const GroupBlock = ({ group, revealDelay = 0 }: { group: FaqGroup; revealDelay?: number }) => {
  const Icon = group.icon;
  return (
    <div data-reveal style={revealDelay ? delay(revealDelay) : undefined}>
      <h2 className="flex items-center gap-3 text-xl font-bold leading-8 text-secondary md:text-2xl">
        <Icon className="h-6 w-6 text-primary" />
        {group.title}
      </h2>
      <FaqAccordion items={group.items} />
    </div>
  );
};

const FaqHero = () => (
  <section className="relative overflow-hidden bg-secondary pb-20 lg:pb-24">
    <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-primary/25 blur-[160px]" />
    <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-rose-500/20 blur-[170px]" />

    {/* Navbar layout-এ absolute, তাই উপরে navbar-এর উচ্চতা (~100px) যোগ করা */}
    <div className="container-x relative z-10 pt-44 text-center lg:pt-48">
      <h1 data-reveal className="text-[34px] font-bold leading-[1.3] text-white sm:text-5xl sm:leading-[1.3]">
        প্রশ্ন উত্তর{' '}
        <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-500 bg-clip-text text-transparent">(FAQ)</span>
      </h1>
      <nav
        data-reveal
        style={delay(150)}
        aria-label="breadcrumb"
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm"
      >
        <Link href="/" className="text-slate-300 transition hover:text-white">
          মূল পাতা
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-muted" />
        <span className="text-primary" aria-current="page">
          প্রশ্ন উত্তর
        </span>
      </nav>
    </div>
  </section>
);

/* ================================= Page ================================= */
export default function FaqPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FaqHero />

      {/* ---------- সাধারণ প্রশ্ন + sidebar ---------- */}
      <section className="section bg-white">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <aside data-reveal className="lg:sticky lg:top-8">
            <span className="eyebrow">সাহায্য কেন্দ্র</span>
            <h2 className="section-title">আপনার যেকোনো প্রশ্নের উত্তর খুঁজুন</h2>
            <p className="section-desc">
              আমরা বিশ্বাস করি আপনার মাথায় অনেক প্রশ্নের উদয় হয়েছে আমাদের সফটওয়্যার নিয়ে এবং আপনি ওই প্রশ্নগুলির উত্তর
              খোঁজার জন্য এইখানে এসেছেন। আপনার সহযোগিতার জন্য আমাদের জিজ্ঞাসাকৃত প্রশ্নের উত্তর নিচে দেয়ার প্রচেষ্টা
              করেছি মাত্র।
            </p>

            <div className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10" />
              <div className="icon-box relative bg-primary/10">
                <Headset className="h-6 w-6 text-primary" />
              </div>
              <h3 className="card-title relative mt-6">উত্তর খুঁজে পাননি?</h3>
              <p className="card-text relative">
                আমাদের সাপোর্ট টিমের সাথে সরাসরি কথা বলুন। আমরা সবসময় আপনার সেবায় নিয়োজিত আছি।
              </p>
              <Link
                href="/contact-us"
                className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                যোগাযোগ করুন <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <GroupBlock group={general} revealDelay={120} />
        </div>
      </section>

      {/* ---------- মূল্য + সেটআপ ---------- */}
      <section className="section dot-pattern">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-10">
          <GroupBlock group={pricing} />
          <GroupBlock group={setup} revealDelay={120} />
        </div>
      </section>

      {/* ---------- ফিচার + সাপোর্ট ---------- */}
      <section className="section bg-white">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-10">
          <GroupBlock group={features} />
          <GroupBlock group={support} revealDelay={120} />
        </div>
      </section>

      <ClientsSection className="dot-pattern" />
    </main>
  );
}
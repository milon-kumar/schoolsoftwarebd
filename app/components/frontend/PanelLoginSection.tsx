"use client";

/**
 * অ্যাডমিন ও শিক্ষক প্যানেলের ডেমো লগইন সেকশন
 * বাঁ পাশে: লগইনের ধাপ + কপি করা যায় এমন ইউজারনেম/পাসওয়ার্ড + লগইন বাটন
 * ডান পাশে: প্যানেলের একটি প্রিভিউ (HTML দিয়ে বানানো, ছবি লাগে না)
 *
 * লগইন লিংক: ADMIN_LOGIN / TEACHER_LOGIN (app/lib/school-software.ts)
 *   local → http://admin.schoolsoftwarebd.test/login
 *   prod  → https://admin.schoolsoftwarebd.com/login
 */
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BookOpenCheck,
  Check,
  Copy,
  Info,
  KeyRound,
  Lock,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { ADMIN_LOGIN, TEACHER_LOGIN, type PanelLogin } from '@/app/lib/school-software';

type Theme = 'dark' | 'light';

const T = {
  dark: {
    section: 'bg-secondary',
    title: 'text-white',
    desc: 'text-slate-400',
    stepNum: 'border-white/15 bg-white/5 text-white',
    stepText: 'text-slate-300',
    line: 'before:bg-white/10',
    box: 'border-white/10 bg-white/[0.04]',
    label: 'text-slate-400',
    value: 'text-white hover:bg-white/10',
    note: 'border-white/10 bg-white/[0.03] text-slate-400',
  },
  light: {
    section: 'dot-pattern',
    title: 'text-secondary',
    desc: 'text-body',
    stepNum: 'border-slate-200 bg-white text-secondary',
    stepText: 'text-body',
    line: 'before:bg-slate-200',
    box: 'border-slate-200 bg-white',
    label: 'text-muted',
    value: 'text-secondary hover:bg-slate-100',
    note: 'border-slate-200 bg-white text-body',
  },
} as const;

/* ------------------------------ copy row ------------------------------ */
function CopyRow({ icon: Icon, label, value, theme }: { icon: LucideIcon; label: string; value: string; theme: Theme }) {
  const [copied, setCopied] = useState(false);
  const t = T[theme];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // http (.test) সাইটে clipboard API কাজ না করলে পুরনো পদ্ধতি
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className={`flex shrink-0 items-center gap-2 text-sm ${t.label}`}>
        <Icon className="h-4 w-4 text-[var(--c)]" /> {label}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} কপি করুন: ${value}`}
        className={`group/copy flex min-w-0 items-center gap-2 rounded-lg px-2 py-1 font-mono text-sm transition ${t.value}`}
      >
        <span className="truncate">{value}</span>
        {copied ? (
          <span className="flex items-center gap-1 text-xs font-sans font-semibold text-success">
            <Check className="h-4 w-4" /> কপি হয়েছে
          </span>
        ) : (
          <Copy className="h-4 w-4 shrink-0 opacity-50 transition group-hover/copy:opacity-100" />
        )}
      </button>
    </div>
  );
}

/* ------------------------------ layout ------------------------------ */
type PanelSectionProps = {
  id: string;
  theme: Theme;
  accent: string;
  eyebrowIcon: LucideIcon;
  eyebrow: string;
  title: ReactNode;
  desc: string;
  steps: string[];
  login: PanelLogin;
  buttonLabel: string;
  note: string;
  visual: ReactNode;
};

function PanelSection({
  id,
  theme,
  accent,
  eyebrowIcon: EyebrowIcon,
  eyebrow,
  title,
  desc,
  steps,
  login,
  buttonLabel,
  note,
  visual,
}: PanelSectionProps) {
  const t = T[theme];
  const host = login.loginUrl.replace(/^https?:\/\//, '');

  return (
    <section id={id} style={{ '--c': accent } as CSSProperties} className={`section relative overflow-hidden ${t.section}`}>
      {theme === 'dark' && (
        <>
          <div className="pointer-events-none absolute -left-52 top-1/3 h-[560px] w-[560px] rounded-full bg-primary/25 blur-[150px]" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[620px] rounded-full bg-rose-500/15 blur-[160px]" />
        </>
      )}

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <span className="eyebrow border-[color-mix(in_oklab,var(--c)_35%,transparent)] bg-[color-mix(in_oklab,var(--c)_12%,transparent)] text-[var(--c)]">
            <EyebrowIcon className="h-4 w-4" /> {eyebrow}
          </span>
          <h2 className={`section-title ${t.title}`}>{title}</h2>
          <p className={`section-desc ${t.desc}`}>{desc}</p>

          <ol className={`relative mt-8 space-y-5 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px ${t.line}`}>
            {steps.map((step, i) => (
              <li key={step} className="relative flex items-start gap-4">
                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${t.stepNum}`}
                >
                  {['১', '২', '৩', '৪'][i]}
                </span>
                <p className={`pt-1.5 text-[15px] leading-6 ${t.stepText}`}>{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={login.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[var(--c)] text-white shadow-[0_12px_32px_-10px_var(--c)] hover:-translate-y-0.5 hover:brightness-110"
            >
              {buttonLabel} <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <p className={`mt-6 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${t.note}`}>
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c)]" />
            {note}
          </p>
        </div>

        {/* ---------- ডান পাশ: প্রিভিউ ---------- */}
        <div data-reveal style={{ '--reveal-delay': '150ms' } as CSSProperties} className="relative">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-[color-mix(in_oklab,var(--c)_18%,transparent)] blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.45)]">
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 flex flex-1 items-center gap-1.5 truncate rounded-md bg-white px-3 py-1 text-[11px] text-muted ring-1 ring-slate-200">
                <Lock className="h-3 w-3" /> {host}
              </span>
            </div>
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ previews ============================ */
const AdminPreview = () => (
  <div className="flex text-[11px]">
    {/* sidebar */}
    <aside className="hidden w-36 shrink-0 space-y-1 bg-secondary p-3 sm:block">
      <p className="mb-3 px-2 text-xs font-bold text-white">School Admin</p>
      {['ড্যাশবোর্ড', 'শিক্ষার্থী', 'শিক্ষক', 'ফি কালেকশন', 'হাজিরা', 'রিপোর্ট'].map((m, i) => (
        <p key={m} className={`rounded-md px-2 py-1.5 ${i === 0 ? 'bg-primary text-white' : 'text-slate-400'}`}>
          {m}
        </p>
      ))}
    </aside>
    <div className="min-w-0 flex-1 space-y-3 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-secondary">ড্যাশবোর্ড</p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">আজ</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ['শিক্ষার্থী', '১,২৪০', 'text-primary'],
          ['উপস্থিত', '৯৪%', 'text-success'],
          ['আজকের ফি', '৳৩৪,৯৯০', 'text-amber-600'],
        ].map(([l, v, c]) => (
          <div key={l} className="rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
            <p className="text-muted">{l}</p>
            <p className={`mt-0.5 text-sm font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100">
        <p className="mb-2 font-semibold text-secondary">মাসিক ফি কালেকশন</p>
        <div className="flex h-20 items-end gap-1.5">
          {[35, 52, 44, 68, 58, 80, 72, 92].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i === 7 ? 'bg-primary' : 'bg-primary/25'}`} />
          ))}
        </div>
      </div>
      <div className="space-y-1.5 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100">
        {[
          ['আরিফ হোসেন', 'ভর্তি সম্পন্ন', 'bg-success/10 text-emerald-700'],
          ['সাদিয়া আক্তার', 'ফি পরিশোধিত', 'bg-primary/10 text-primary'],
          ['তানভীর আহমেদ', 'বকেয়া', 'bg-rose-50 text-rose-600'],
        ].map(([n, s, c]) => (
          <div key={n} className="flex items-center justify-between">
            <span className="text-secondary">{n}</span>
            <span className={`rounded-full px-2 py-0.5 font-semibold ${c}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TeacherPreview = () => (
  <div className="space-y-3 bg-slate-50 p-4 text-[11px]">
    <div className="flex items-center justify-between rounded-lg bg-emerald-600 px-4 py-3 text-white">
      <div>
        <p className="text-[13px] font-bold">হাজিরা — ৮ম শ্রেণি (ক)</p>
        <p className="text-emerald-100">বাংলা · ১ম পিরিয়ড</p>
      </div>
      <span className="rounded-full bg-white/20 px-2.5 py-1 font-semibold">৩৮ / ৪০ উপস্থিত</span>
    </div>
    <div className="divide-y divide-slate-100 rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
      {[
        ['০১', 'রাফিয়া সুলতানা', true],
        ['০২', 'তানভীর আহমেদ', true],
        ['০৩', 'মাহিন হোসেন', false],
        ['০৪', 'নুসরাত জাহান', true],
        ['০৫', 'সাদিয়া ইসলাম', true],
      ].map(([roll, name, present]) => (
        <div key={roll as string} className="flex items-center justify-between px-3 py-2">
          <span className="flex items-center gap-2.5">
            <span className="w-5 text-muted">{roll}</span>
            <span className="text-secondary">{name}</span>
          </span>
          <span className="flex gap-1">
            <span className={`rounded-md px-2 py-0.5 font-semibold ${present ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-muted'}`}>উ</span>
            <span className={`rounded-md px-2 py-0.5 font-semibold ${!present ? 'bg-rose-500 text-white' : 'bg-slate-100 text-muted'}`}>অ</span>
          </span>
        </div>
      ))}
    </div>
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-100">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-secondary">নম্বর এন্ট্রি — অর্ধবার্ষিক</p>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">সংরক্ষিত ✓</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        {['রোল', 'লিখিত', 'MCQ', 'মোট'].map((h) => (
          <span key={h} className="font-semibold text-muted">{h}</span>
        ))}
        {['০১', '৬২', '২৮', '৯০', '০২', '৫৫', '২৫', '৮০'].map((v, i) => (
          <span key={i} className={`rounded bg-slate-50 py-1 ${i % 4 === 3 ? 'font-bold text-emerald-700' : 'text-secondary'}`}>
            {v}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ============================ exports ============================ */
export function AdminLoginSection() {
  return (
    <PanelSection
      id="admin-demo"
      theme="dark"
      accent="#6366f1"
      eyebrowIcon={ShieldCheck}
      eyebrow="অ্যাডমিন ড্যাশবোর্ড ডেমো"
      title={
        <>
          প্রতিষ্ঠান প্রধানের চোখে <br className="hidden sm:block" />
          পুরো স্কুল এক নজরে
        </>
      }
      desc="শিক্ষার্থী ভর্তি, শিক্ষক ব্যবস্থাপনা, ফি কালেকশন, হাজিরা আর রিপোর্ট — অ্যাডমিন প্যানেলে লগইন করে নিজেই সব ঘুরে দেখুন।"
      steps={[
        '"অ্যাডমিন প্যানেলে লগইন" বাটনে ক্লিক করুন — নতুন ট্যাবে লগইন পেজ খুলবে।',
        `স্বয়ংক্রিয়ভাবে ইউজার নেম এবং পাসওয়ার্ড বসে যাবে`,
        'লগইন করুন, তারপর ড্যাশবোর্ড থেকে যেকোনো মডিউল চালিয়ে দেখুন।',
      ]}
      login={ADMIN_LOGIN}
      buttonLabel="অ্যাডমিন প্যানেলে লগইন"
      note="এটি ডেমো অ্যাকাউন্ট — নিশ্চিন্তে যেকোনো তথ্য যোগ, বদল বা মুছে দেখুন। সব ডাটা প্রতিদিন রাত ১২টায় রিসেট হয়।"
      visual={<AdminPreview />}
    />
  );
}

export function TeacherLoginSection() {
  return (
    <PanelSection
      id="teacher-demo"
      theme="light"
      accent="#10b981"
      eyebrowIcon={BookOpenCheck}
      eyebrow="শিক্ষক প্যানেল ডেমো"
      title={
        <>
          শিক্ষকের প্রতিদিনের কাজ <br className="hidden sm:block" />
          এখন কয়েক ক্লিকে
        </>
      }
      desc="ক্লাসে হাজিরা নেওয়া, পরীক্ষার নম্বর এন্ট্রি, রুটিন ও নোটিশ দেখা — শিক্ষক হিসেবে লগইন করে বাস্তব অভিজ্ঞতা নিন।"
      steps={[
        'নিচের শিক্ষকের ইমেইল ও পাসওয়ার্ড কপি করুন।',
        '"শিক্ষক প্যানেলে লগইন" বাটনে ক্লিক করুন — নতুন ট্যাবে লগইন পেজ খুলবে।',
        'লগইন করে কোনো ক্লাসের হাজিরা নিন বা নম্বর এন্ট্রি করে দেখুন — রেজাল্ট তৈরি হবে স্বয়ংক্রিয়ভাবে।',
      ]}
      login={TEACHER_LOGIN}
      buttonLabel="শিক্ষক প্যানেলে লগইন"
      note="শিক্ষক অ্যাকাউন্টে শুধু নিজের ক্লাস ও বিষয়ের তথ্য দেখা যায় — বাস্তব স্কুলেও ঠিক এভাবেই কাজ করে।"
      visual={<TeacherPreview />}
    />
  );
}
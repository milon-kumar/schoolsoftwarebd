"use client";

import { useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  School,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { DEMO_ROLES, demoUrl, type DemoRole, type DemoRoleKey } from '@/app/lib/school-software';

/* প্রতিটি রোলের রঙ ও আইকন — সাইটের বাকি card-গুলোর palette থেকে নেওয়া */
const ROLE_STYLE: Record<DemoRoleKey, { icon: LucideIcon; color: string }> = {
  'school-portal': { icon: School, color: '#f97316' },
  admin: { icon: ShieldCheck, color: '#6366f1' },
  teacher: { icon: BookOpen, color: '#10b981' },
  student: { icon: GraduationCap, color: '#f43f5e' },
};

/* এক ক্লিকে কপি — ২ সেকেন্ড ✓ দেখায় */
function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // পুরনো ব্রাউজার / http-তে clipboard API না থাকলে
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
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="shrink-0 text-slate-400">{label}</span>
      <button
        type="button"
        onClick={copy}
        title="কপি করুন"
        aria-label={`${label} কপি করুন: ${value}`}
        className="group/copy flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-right font-mono text-xs text-slate-100 transition hover:bg-white/10"
      >
        {/* লম্বা ইমেইল দরকার হলে শুধু @-এর আগে ভাঙে, মাঝখানে কাটে না */}
        <span className="break-words">
          {value.split('@').map((part, i) => (
            <span key={i}>
              {i > 0 && (
                <>
                  <wbr />@
                </>
              )}
              {part}
            </span>
          ))}
        </span>
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-success" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-60 transition group-hover/copy:opacity-100" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'কপি হয়েছে' : ''}
      </span>
    </div>
  );
}

function RoleCard({ role }: { role: DemoRole }) {
  const { icon: Icon, color } = ROLE_STYLE[role.key];
  const hasCredentials = Boolean(role.username && role.password);

  return (
    <div
      data-reveal
      style={{ '--c': color } as React.CSSProperties}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm hover:-translate-y-1 hover:border-[var(--c)] hover:bg-white/[0.07] hover:shadow-[0_24px_48px_-20px_var(--c)]"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--c)] text-white shadow-[0_8px_20px_-8px_var(--c)]">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="text-base font-bold leading-6 text-white">{role.title}</h3>
          <p className="mt-0.5 text-xs leading-5 text-slate-400">{role.subtitle}</p>
        </div>
      </div>

      {/* accent রেখা — hover-এ লম্বা হয় */}
      <div className="my-5 flex items-center">
        <span className="h-0.5 w-5 bg-[var(--c)] transition-all duration-300 group-hover:w-12" />
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="flex-1">
        {hasCredentials ? (
          <div className="space-y-1">
            <CopyValue label="ইউজারনেম" value={role.username!} />
            <CopyValue label="পাসওয়ার্ড" value={role.password!} />
          </div>
        ) : (
          <p className="text-xs leading-5 text-slate-400">লগইন ছাড়াই সরাসরি ওয়েবসাইট প্রিভিউ দেখা যাবে।</p>
        )}
      </div>

      <a
        href={demoUrl(role)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--c)] hover:bg-[var(--c)] hover:text-white"
      >
        {hasCredentials ? 'লগইন করে দেখুন' : 'পোর্টাল দেখুন'}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function DemoSection() {
  return (
    <section id="demo" className="section relative overflow-hidden bg-secondary">
      {/* background glow — সাইটের অন্য dark section-এর মতো */}
      <div className="pointer-events-none absolute -left-52 -top-52 h-[600px] w-[600px] rounded-full bg-primary/25 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-52 -right-52 h-[600px] w-[700px] rounded-full bg-rose-500/20 blur-[160px]" />

      <div className="container-x relative z-10">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <span className="eyebrow">লাইভ ডেমো</span>
            <h2 className="section-title text-white">সবগুলো ডেমো দেখুন</h2>
            <p className="section-desc text-slate-400">
              নিচের যেকোনো অ্যাকাউন্ট দিয়ে সরাসরি লগইন করে সম্পূর্ণ ডেমো স্কুলের ড্যাশবোর্ড ঘুরে দেখুন।
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            প্রতিদিন রাত ১২টায় রিসেট হয়
          </span>
        </div>

        <div data-stagger="4" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_ROLES.map((role) => (
            <RoleCard key={role.key} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
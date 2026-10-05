"use client";

/**
 * "আপনার স্কুলের ওয়েবসাইট ডিজাইন বেছে নিন" — ৬টি ফ্রন্টএন্ড টেমপ্লেট
 * card-এ ক্লিক → ডেমো স্কুলের সাইট ওই টেমপ্লেটে খোলে:
 *   http://nondomohol.schoolsoftwarebd.test/?template_slug=prism   (local)
 *   https://nondomohol.schoolsoftwarebd.com/?template_slug=prism   (production)
 *
 * ছবিগুলো রাখুন: public/assets/frontend_templates/{slug}.png
 */
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Eye, LayoutTemplate, Sparkles } from 'lucide-react';
import { FRONTEND_TEMPLATES, templateDemoUrl, type FrontendTemplate } from '@/app/lib/school-software';

/* ছবি না থাকলে প্রতিটি টেমপ্লেটের জন্য আলাদা রঙের placeholder */
const FALLBACK_GRADIENT: Record<string, string> = {
  lumin: 'from-indigo-500 via-violet-500 to-purple-600',
  catalyst: 'from-orange-500 via-rose-500 to-pink-600',
  meridian: 'from-teal-500 via-emerald-500 to-green-600',
  horizon: 'from-sky-500 via-blue-500 to-indigo-600',
  prism: 'from-pink-500 via-fuchsia-500 to-violet-600',
  default: 'from-slate-500 via-slate-600 to-slate-800',
};

const toBn = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

function TemplatePreview({ tpl }: { tpl: FrontendTemplate }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // hydration-এর আগেই ছবি লোড ফেল করলে onError ধরা পড়ে না — তাই একবার নিজে চেক করি
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${
          FALLBACK_GRADIENT[tpl.slug] ?? FALLBACK_GRADIENT.default
        } text-white`}
      >
        {/* ছোট্ট wireframe — যেন ওয়েবসাইটের মতো দেখায় */}
        <div className="w-3/4 space-y-2 opacity-80">
          <div className="h-2 w-1/3 rounded-full bg-white/70" />
          <div className="h-12 rounded-lg bg-white/25" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 rounded-md bg-white/20" />
            <div className="h-8 rounded-md bg-white/20" />
            <div className="h-8 rounded-md bg-white/20" />
          </div>
        </div>
        <span className="text-lg font-bold tracking-wide">{tpl.title}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={tpl.image}
      alt={`${tpl.title} টেমপ্লেটের প্রিভিউ`}
      loading="lazy"
      onError={() => setFailed(true)}
      // পুরো পেজের স্ক্রিনশট হলে hover-এ ধীরে ধীরে নিচে স্ক্রল করে দেখায়
      className="h-full w-full object-cover object-top transition-[object-position] duration-[3500ms] ease-in-out group-hover:object-bottom"
    />
  );
}

function TemplateCard({ tpl }: { tpl: FrontendTemplate }) {
  const isDefault = tpl.slug === 'default';

  return (
    <a
      data-reveal
      href={templateDemoUrl(tpl.slug)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${tpl.title} টেমপ্লেটের লাইভ প্রিভিউ দেখুন (নতুন ট্যাবে খুলবে)`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-20px_rgba(99,102,241,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
    >
      {/* browser frame */}
      <div className="border-b border-slate-100 bg-slate-50 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-0.5 text-[11px] text-muted ring-1 ring-slate-200">
            ?template_slug={tpl.slug}
          </span>
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <TemplatePreview tpl={tpl} />

        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-secondary/80 via-secondary/10 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-secondary shadow-lg transition duration-300 group-hover:translate-y-0">
            <Eye className="h-4 w-4 text-primary" /> লাইভ প্রিভিউ
          </span>
        </div>

        {isDefault && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            ডিফল্ট
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold leading-7 text-secondary">{tpl.title}</h3>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-6 text-body">{tpl.description}</p>
      </div>
    </a>
  );
}

export default function TemplatesSection() {
  return (
    <section id="demo" className="section relative overflow-hidden dot-pattern">
      <div className="container-x">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <LayoutTemplate className="h-4 w-4" /> ওয়েবসাইট টেমপ্লেট
            </span>
            <h2 className="section-title">আপনার স্কুলের ওয়েবসাইটের ডিজাইন বেছে নিন</h2>
            <p className="section-desc">
              প্রতিটি স্কুল পায় নিজস্ব ডাইনামিক ওয়েবসাইট। নিচের যেকোনো টেমপ্লেটে ক্লিক করে ডেমো স্কুলের সাইট সেই ডিজাইনে লাইভ দেখে নিন —
              পরে যেকোনো সময় এক ক্লিকে বদলানো যায়।
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-body shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            {toBn(FRONTEND_TEMPLATES.length)}টি রেডিমেড টেমপ্লেট
          </span>
        </div>

        <div data-stagger="3" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FRONTEND_TEMPLATES.map((tpl) => (
            <TemplateCard key={tpl.slug} tpl={tpl} />
          ))}
        </div>
      </div>
    </section>
  );
}
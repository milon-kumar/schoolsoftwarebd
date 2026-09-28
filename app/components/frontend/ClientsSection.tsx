"use client"

import type { LucideIcon } from 'lucide-react';
import {
    Award,
    BookOpen,
    Building2,
    Globe,
    GraduationCap,
    IdCard,
    Landmark,
    Pencil,
    Presentation,
    School
} from 'lucide-react';

type ClientsSectionProps = {
  className?: string;
};


const ClientsSection = ({ className = '' }: ClientsSectionProps) => {
  const clients1 = [
    { line1: 'সেন্ট জোসেফ', line2: 'উচ্চ বিদ্যালয়', icon: Building2, tone: 'bg-amber-50 text-amber-500' },
    { line1: 'দিনাজপুর জিলা', line2: 'স্কুল', icon: BookOpen, tone: 'bg-purple-50 text-purple-500' },
    { line1: 'ইস্পাহানী পাবলিক', line2: 'স্কুল ও কলেজ', icon: Award, tone: 'bg-teal-50 text-teal-600' },
    { line1: 'ঢাকা রেসিডেন্সিয়াল', line2: 'মডেল কলেজ', icon: School, tone: 'bg-red-50 text-red-500' },
    { line1: 'সৈয়দপুর সরকারি', line2: 'বিজ্ঞান কলেজ', icon: BookOpen, tone: 'bg-blue-50 text-blue-600' },
    { line1: 'জামালপুর টেকনিক্যাল', line2: 'স্কুল এন্ড কলেজ', icon: GraduationCap, tone: 'bg-emerald-50 text-emerald-500' },
  ];

  const clients2 = [
    { line1: 'গ্রীন ফিল্ড', line2: 'স্কুল এন্ড কলেজ', icon: IdCard, tone: 'bg-emerald-50 text-emerald-500' },
    { line1: 'আনোয়ারা উচ্চ', line2: 'বিদ্যালয়', icon: Globe, tone: 'bg-orange-50 text-orange-500' },
    { line1: 'গোপালপুর দারুল', line2: 'উলুম কামিল মাদ্রাসা', icon: GraduationCap, tone: 'bg-cyan-50 text-cyan-600' },
    { line1: 'মনি কানন', line2: 'উচ্চ বিদ্যালয়', icon: Landmark, tone: 'bg-rose-50 text-rose-500' },
    { line1: 'মাইজদী সরকারি', line2: 'বালিকা বিদ্যালয়', icon: Pencil, tone: 'bg-pink-50 text-pink-500' },
    { line1: 'উত্তর বাংলা', line2: 'কলেজ', icon: Presentation, tone: 'bg-indigo-50 text-indigo-500' },
  ];

  const renderMarqueeRow = (items: { line1: string; line2: string; icon: LucideIcon; tone: string }[]) => {
    // Quadruple items to ensure seamless infinite scroll
    const quad = [...items, ...items, ...items, ...items];
    return quad.map((item, idx) => {
      const Icon = item.icon;
      return (
        <div
          key={idx}
          className="flex w-[200px] shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
            <Icon className="h-4 w-4" />
          </span>
          <p className="text-[13px] font-medium leading-[19px] text-[#4B5563]">
            {item.line1}
            <br />
            {item.line2}
          </p>
        </div>
      );
    });
  };

  return (
    <section className="section overflow-hidden bg-white">
      <div className="container-x">
        <div data-reveal className="section-head">
          <span className="eyebrow">আমাদের গ্রাহক</span>
          <h2 className="section-title">যাঁরা আমাদের উপর আস্থাশীল</h2>
          <p className="section-desc">সারাদেশের ৮৭+ এর অধিক শিক্ষা প্রতিষ্ঠান ব্যবহার করছে আমাদের সফটওয়্যার</p>
        </div>
      </div>

      <div data-reveal className="marquee-mask mt-12 space-y-3">
        <div className="flex w-max gap-4 animate-marquee-left">{renderMarqueeRow(clients1)}</div>
        <div className="flex w-max gap-4 animate-marquee-right">{renderMarqueeRow(clients2)}</div>
      </div>
    </section>
  );
};

export default ClientsSection
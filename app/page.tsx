"use client"

import ClientsSection from '@/app/components/frontend/ClientsSection';
import DemoSection from '@/app/components/frontend/DemoSection';
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChartPie,
  Check,
  Clock,
  FileChartColumn,
  FileText,
  Fingerprint,
  GraduationCap,
  HandCoins,
  Megaphone,
  Menu,
  MessageCircleMore,
  Phone,
  Presentation,
  Printer,
  Rocket,
  ShieldCheck,
  Smile,
  Trophy,
  UserRoundPlus,
  Users,
  Wallet
} from 'lucide-react';
import type { CSSProperties } from 'react';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] pb-40 md:pb-32 lg:pb-44">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-[#6366F1]/25 blur-[160px]"></div>
      <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-[#F43F5E]/20 blur-[170px]"></div>
 
      {/* Hero Content */}
      {/* Navbar এখন layout-এ absolute, জায়গা নেয় না — তাই উপরের padding-এ navbar-এর উচ্চতা (~100px) যোগ করা হয়েছে */}
      <div className="container-x relative z-10 flex flex-col items-center gap-16 pt-44 lg:flex-row lg:items-start lg:justify-between lg:pt-52">
        {/* Left Column */}
        <div className="max-w-[920px]">
          <span data-reveal className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#F43F5E]"></span>
            স্কুল, কলেজ ও মাদ্রাসার আধুনিক সমাধান
          </span>
 
          <h1 data-reveal style={delay(120)} className="mt-8 text-[40px] font-bold leading-[1.15] sm:text-6xl sm:leading-[1.15] lg:text-[70px]">
            <span className="block pb-2 text-white">স্কুল চালান সহজে।</span>
            <span className="block bg-gradient-to-r from-[#6366F1] via-violet-400 to-pink-500 bg-clip-text pb-2 text-transparent">
              School Management
            </span>
            <span className="block bg-gradient-to-r from-[#F43F5E] to-pink-500 bg-clip-text pb-2 text-transparent">
              Software BD
            </span>
          </h1>
 
          <p data-reveal style={delay(240)} className="mt-8 max-w-[720px] text-base leading-7 text-[#9CA3AF] sm:text-[18px] sm:leading-[29px]">
            ভর্তি। হাজিরা। রেজাল্ট। ফি কালেকশন। সব এক জায়গায়। আমাদের School Management System দিয়ে আপনার স্কুল, কলেজ বা মাদ্রাসা চালান আরও সহজে। কাগজ লাগবে না। ভুল হবে না। সময় বাঁচবে।
          </p>
 
          <div data-reveal style={delay(360)} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#demo" className="btn btn-primary">
              সফটওয়্যার ডেমো <Rocket className="h-5 w-5" />
            </a>
            <a href="#contact" className="btn btn-outline">
              এখনই যোগাযোগ করুন <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
 
        {/* Right Visual Dashboard Cards */}
        <div data-reveal style={delay(300)} className="relative -mt-4 hidden h-[460px] w-[420px] shrink-0 lg:block">
          {/* Decorative Rings */}
          <div className="absolute left-2 top-20 h-[310px] w-[390px] rounded-full border border-white/10"></div>
          <div className="absolute left-[64px] top-10 h-[290px] w-[260px] rounded-full border border-white/10"></div>
 
          {/* Students Count Card */}
          <div className="absolute right-0 top-0 w-[330px] rotate-[3deg] rounded-2xl border border-white/10 bg-[#161d33]/90 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm font-semibold text-slate-200">মোট শিক্ষার্থী</p>
              <span className="rounded bg-[#10B981]/15 px-2 py-0.5 text-[11px] font-semibold text-[#10B981]">+১২.৫%</span>
            </div>
            <p className="mt-5 text-3xl font-bold text-white">৩,৪৫০</p>
            <div className="mt-4 flex h-[72px] items-end gap-2.5">
              <div className="h-[20px] w-11 rounded-sm bg-indigo-800"></div>
              <div className="h-[32px] w-11 rounded-sm bg-indigo-700"></div>
              <div className="h-[68px] w-11 rounded-sm bg-[#6366F1]"></div>
              <div className="h-[52px] w-11 rounded-sm bg-[#F43F5E]"></div>
              <div className="h-[44px] w-11 rounded-sm bg-indigo-800"></div>
            </div>
          </div>
 
          {/* Fee Collection Card */}
          <div className="absolute bottom-8 left-0 w-[255px] -rotate-[6deg] rounded-2xl border border-white/10 bg-[#161d33]/90 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Wallet className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[13px] text-[#9CA3AF]">ফি কালেকশন</p>
                <p className="text-[17px] font-bold text-white">৳ ৪৫,০০০</p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-white/10">
              <div className="h-full w-[75%] rounded-full bg-amber-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
const StatsSection = () => {
  return (
    // flow-root: card-এর negative margin যেন section-কে টেনে উপরে না নেয় (margin collapse বন্ধ)
    <section className="dot-pattern relative flow-root pb-10">
      <div className="container-x">
        <div data-reveal className="relative z-10 -mt-[110px] grid sm:-mt-[105px] md:-mt-[75px] xl:-mt-[61px] grid-cols-2 gap-x-4 gap-y-8 rounded-3xl border border-white bg-gradient-to-b from-slate-300 via-white to-white px-5 py-8 shadow-xl sm:px-10 md:grid-cols-4">
          <div className="flex items-center gap-3 sm:gap-4 md:border-r md:border-slate-200">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6366F1]/10 sm:h-14 sm:w-14">
              <Building2 className="h-6 w-6 text-[#6366F1]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A] sm:text-2xl">৮৭+</p>
              <p className="text-sm text-[#4B5563]">নিবন্ধিত স্কুল/কলেজ</p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 sm:gap-4 md:border-r md:border-slate-200 md:pl-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10B981]/10 sm:h-14 sm:w-14">
              <GraduationCap className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A] sm:text-2xl">৪৭ হাজার</p>
              <p className="text-sm text-[#4B5563]">শিক্ষার্থী</p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 sm:gap-4 md:border-r md:border-slate-200 md:pl-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 sm:h-14 sm:w-14">
              <Presentation className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A] sm:text-2xl">১৩০০+</p>
              <p className="text-sm text-[#4B5563]">শিক্ষক</p>
            </div>
          </div>
 
          <div className="flex items-center gap-3 sm:gap-4 md:pl-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F43F5E]/10 sm:h-14 sm:w-14">
              <Users className="h-6 w-6 text-[#F43F5E]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#0F172A] sm:text-2xl">৪৫ হাজার</p>
              <p className="text-sm text-[#4B5563]">অভিভাবক</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const WhySection = () => {
  return (
    <section id="about" className="dot-pattern pb-20 pt-12 lg:pb-24">
      <div className="container-x">
        <div data-reveal className="section-head">
          <span className="eyebrow">আমাদের সম্পর্কে</span>
          <h2 className="section-title">
            কেন School Management Software
            <br className="hidden md:block" /> আপনার প্রতিষ্ঠানের জন্য জরুরি
          </h2>
          <div className="section-desc space-y-4">
            <p>প্রতিদিন ভর্তি, হাজিরা, পরীক্ষা আর ফি আদায়ের কাজ হাতে-কলমে করছেন? তাহলে সময় যাচ্ছে বেশি, ভুলও হচ্ছে বেশি।</p>
            <p>
              আমাদের School Management Software এই সমস্যার সমাধান। এটি বাংলাদেশের স্কুলের জন্যই তৈরি। সম্পূর্ণ বাংলায়। বিকাশ, নগদ, রকেট — সব পেমেন্ট গেটওয়ে যুক্ত। শিক্ষার্থীদের রেজাল্ট কার্ড ও সার্টিফিকেট অটোমেটিক তৈরি হয়।
            </p>
            <p>স্কুল হোক, কলেজ হোক বা মাদ্রাসা — সবার জন্য এটি কাস্টমাইজ করা যায়।</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ModulesSection = () => {
  const modules = [
    {
      icon: UserRoundPlus,
      iconBg: 'bg-[#6366F1]/10',
      iconColor: 'text-[#6366F1]',
      title: 'শিক্ষার্থী ব্যবস্থাপনা ও অনলাইন ভর্তি',
      desc: 'ভর্তি আবেদন এখন অনলাইনেই। শিক্ষার্থীর আইডি কার্ড তৈরি হয় সহজে। প্রতিটি শিক্ষার্থীর তথ্য থাকে এক জায়গায়। অভিভাবকরাও ঘরে বসে আবেদন ট্র্যাক করতে পারেন।',
    },
    {
      icon: FileText,
      iconBg: 'bg-[#10B981]/10',
      iconColor: 'text-[#10B981]',
      title: 'একাডেমিক ও রেজাল্ট ব্যবস্থাপনা',
      desc: 'রুটিন বানান সহজে। ক্লাস ও পরীক্ষার সময়সূচি ঠিক করুন। মার্কশিট আর রেজাল্ট কার্ড অটোমেটিক তৈরি হয়। শিক্ষকদের আর হাতে হিসাব করতে হয় না।',
    },
    {
      icon: HandCoins,
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      title: 'অনলাইন ফি কালেকশন সফটওয়্যার',
      desc: 'ফি দিন ঘরে বসেই। বিকাশ, নগদ, রকেট বা ব্যাংক — সব সুবিধা আছে। প্রতিটি লেনদেনের রিসিট তৈরি হয় স্বয়ংক্রিয়ভাবে। বকেয়ার হিসাব সবসময় আপডেট।',
    },
    {
      icon: Fingerprint,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      title: 'ডিজিটাল হাজিরা সিস্টেম',
      desc: 'বায়োমেট্রিক বা কার্ড দিয়ে হাজিরা দিন এক সেকেন্ডে। কেউ অনুপস্থিত থাকলে সাথে সাথে অভিভাবকের কাছে এসএমএস চলে যায়।',
    },
    {
      icon: MessageCircleMore,
      iconBg: 'bg-[#F43F5E]/10',
      iconColor: 'text-[#F43F5E]',
      title: 'এসএমএস ও নোটিশ বোর্ড',
      desc: 'জরুরি নোটিশ পাঠান এক ক্লিকে। রেজাল্ট হোক বা ফি জমার তথ্য — শিক্ষক, শিক্ষার্থী ও অভিভাবক সবাই পেয়ে যাবে সাথে সাথে।',
    },
    {
      icon: BriefcaseBusiness,
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-600',
      title: 'এইচআর ও বেতন ম্যানেজমেন্ট',
      desc: 'শিক্ষক ও স্টাফদের হাজিরা, ছুটি, বেতন — সব এক জায়গায়। মাসশেষে স্যালারি শিট তৈরি হয় স্বয়ংক্রিয়ভাবে। হাতে হিসাবের ঝামেলা নেই।',
    },
  ];

  return (
    <section id="modules" className="section bg-[#F9FAFB]">
      <div className="container-x">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow">মূল মডিউলসমূহ</span>
            <h2 className="section-title">আমাদের School Management System-এর প্রধান মডিউলসমূহ</h2>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-[#6366F1] hover:underline">
            সব মডিউল দেখুন <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div data-stagger="3" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const hexColor = mod.iconColor.match(/#\w+/)?.[0] || 'currentColor';

            return (
              <div
                key={idx}
                data-reveal
                className="card group hover:bg-slate-50/50"
                style={{ '--hover-color': hexColor } as React.CSSProperties}
              >
                <div className={`icon-box ${mod.iconBg} transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${mod.iconColor} `} />
                </div>
                <h3 className="card-title mt-6">{mod.title}</h3>
                <p className="card-text">{mod.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DashboardSection = () => {
  return (
    <section className="section relative overflow-hidden bg-[#0F172A]">
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#6366F1]/30 blur-[150px]"></div>

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-2">
        {/* Left Column */}
        <div>
          <div data-reveal>
            <span className="eyebrow">মূল বৈশিষ্ট্যসমূহ</span>
            <h2 className="section-title text-white">প্রধান শিক্ষক বা পরিচালক — অফিসে না থাকলেও সব নজরে থাকবে</h2>
            <p className="section-desc text-[#9CA3AF]">
              আজকে কতজন উপস্থিত, কত টাকা ফি জমা হলো, কোন শিক্ষক ক্লাস নিলেন — এখন আর অফিসে বসে থাকতে হবে না। School SoftwareBD-র মোবাইল অ্যাপ ও ওয়েব ড্যাশবোর্ডে সব রিয়েল-টাইম রিপোর্ট দেখুন, যেকোনো জায়গা থেকে।
            </p>
          </div>

          <div data-stagger="2" className="mt-10 space-y-4">
            <div data-reveal className="card-dark flex items-start gap-4">
              <div className="icon-box bg-[#6366F1]/20">
                <ChartPie className="h-5 w-5 text-[#6366F1]" />
              </div>
              <div>
                <h3 className="card-title text-white">আয়-ব্যয় লাইভ রিপোর্ট</h3>
                <p className="card-text text-[#9CA3AF]">
                  দিন শেষে কত টাকা জমা হলো, কত খরচ হলো — সব হিসাব দেখুন এক নজরে। কোনো কিছু লুকানো থাকবে না।
                </p>
              </div>
            </div>

            <div data-reveal className="card-dark flex items-start gap-4">
              <div className="icon-box bg-[#10B981]/20">
                <Users className="h-5 w-5 text-[#10B981]" />
              </div>
              <div>
                <h3 className="card-title text-white">সঠিক হাজিরা আপডেট</h3>
                <p className="card-text text-[#9CA3AF]">
                  কে ক্লাসে এসেছে, কে আসেনি — সাথে সাথে জানুন। অনুপস্থিত শিক্ষার্থীর অভিভাবক পান স্বয়ংক্রিয় এসএমএস।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup */}
        <div data-reveal style={delay(150)} className="relative mx-auto h-[600px] w-[300px]">
          <div className="absolute inset-0 rounded-[48px] border-[10px] border-[#1f2937] bg-[#1f2937] shadow-2xl ring-1 ring-white/20">
            <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[#F9FAFB]">
              <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#1f2937]"></div>

              {/* Phone Header */}
              <div className="bg-[#6366F1] px-5 pb-16 pt-10 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Menu className="h-4 w-4" />
                    <p className="text-[12px] font-semibold leading-tight">
                      School SoftwareBD
                      <br />
                      Dashboard
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/25"></div>
                </div>
                <p className="mt-6 text-[11px] text-white/70">Today's Revenue</p>
                <p className="text-[28px] font-bold leading-tight">৳ ৩৪,৯৯০</p>
              </div>

              {/* Phone Body Dashboard Content */}
              <div className="-mt-10 space-y-3 px-4">
                <div className="flex h-[100px] items-end justify-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="h-[25%] w-4 rounded-sm bg-indigo-200"></div>
                  <div className="h-[40%] w-4 rounded-sm bg-indigo-300"></div>
                  <div className="h-[90%] w-4 rounded-sm bg-[#6366F1]"></div>
                  <div className="h-[70%] w-4 rounded-sm bg-indigo-700"></div>
                  <div className="h-[60%] w-4 rounded-sm bg-[#F43F5E]"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border-l-4 border-amber-400 bg-white p-3 shadow-sm">
                    <p className="text-[10px] text-[#9CA3AF]">Absent Today</p>
                    <p className="text-[14px] font-bold leading-tight text-[#0F172A]">
                      23
                      <br />
                      Students
                    </p>
                  </div>
                  <div className="rounded-2xl border-l-4 border-[#10B981] bg-white p-3 shadow-sm">
                    <p className="text-[10px] text-[#9CA3AF]">Fees Collected</p>
                    <p className="text-[14px] font-bold leading-tight text-[#0F172A]">145 Paid</p>
                  </div>
                </div>

                <div className="h-16 rounded-2xl bg-white shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute -right-4 top-24 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-xl backdrop-blur sm:-right-24">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981]">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span className="text-[11px] font-medium text-[#4B5563]">SMS sent successfully</span>
          </div>

          <div className="absolute -left-4 bottom-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-xl backdrop-blur sm:-left-16">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F43F5E]">
              <Bell className="h-3 w-3 text-white" />
            </span>
            <span className="text-[11px] font-medium text-[#4B5563]">New admission</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: ChartPie,
      iconBg: 'bg-[#6366F1]/10',
      iconColor: 'text-[#6366F1]',
      title: 'স্বচ্ছ হিসাব নিকাশ',
      desc: 'প্রতিটি টাকার হিসাব থাকে ডিজিটালি। আয়, ব্যয়, বকেয়া — সব এক জায়গায়। মাসশেষে হিসাব মেলানোর ঝামেলা নেই। অডিটের জন্য রিপোর্ট তৈরি হয় এক ক্লিকে।',
    },
    {
      icon: Clock,
      iconBg: 'bg-[#10B981]/10',
      iconColor: 'text-[#10B981]',
      title: 'দ্রুত বেতন রশিদ',
      desc: 'এক সেকেন্ডেই বেতন বা ফি রশিদ তৈরি হয়। অভিভাবক পান সাথে সাথে। ভুল রশিদ বা হারিয়ে যাওয়ার সম্ভাবনা একেবারেই নেই।',
    },
    {
      icon: Megaphone,
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      title: 'উন্নত যোগাযোগ',
      desc: 'শিক্ষক, শিক্ষার্থী আর অভিভাবক — সবাই থাকেন connected। নোটিশ, রেজাল্ট বা জরুরি বার্তা পৌঁছায় সবার কাছে। প্রতিষ্ঠানের সুনাম বাড়ে।',
    },
    {
      icon: FileChartColumn,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      title: 'দ্রুত রিপোর্ট জেনারেশন',
      desc: 'দৈনিক, মাসিক বা বার্ষিক — যেকোনো রিপোর্ট তৈরি হয় মিনিটেই। আর্থিক অবস্থা সহজে বুঝতে পারবেন, অনুমানের দরকার নেই।',
    },
    {
      icon: Smile,
      iconBg: 'bg-[#F43F5E]/10',
      iconColor: 'text-[#F43F5E]',
      title: 'কাজের চাপ হ্রাস',
      desc: 'রুটিন কাজ চলে স্বয়ংক্রিয়ভাবে, শিক্ষকরা পান বেশি সময়। সেই সময় যায় শিক্ষার্থীদের পেছনে। পড়াশোনার মান বাড়ে, প্রতিষ্ঠানের সুনাম বাড়ে।',
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-600',
      title: 'শক্তিশালী ডাটা নিরাপত্তা',
      desc: 'তথ্য চুরি বা হারানোর ভয় নেই। ক্লাউডে প্রতিদিন ব্যাকআপ হয়। আধুনিক এনক্রিপশনে আপনার প্রতিষ্ঠানের তথ্য থাকে সম্পূর্ণ সুরক্ষিত।',
    },
  ];

  return (
    <section className="section bg-[#F9FAFB]">
      <div className="container-x">
        <div data-reveal className="section-head">
          <span className="eyebrow">কেন আমাদের বেছে নেবেন</span>
          <h2 className="section-title">
            কেন আমাদের School Management
            <br className="hidden md:block" /> Software BD বেছে নেবেন
          </h2>
          <p className="section-desc">
            সম্পূর্ণ বাংলায়। বাংলাদেশের স্কুলের জন্যই তৈরি। বিকাশ, নগদ, রকেট — সব পেমেন্ট গেটওয়ে যুক্ত। দ্রুত ও নিরাপদ ক্লাউড সার্ভার, সাশ্রয়ী খরচ, ২৪/৭ সাপোর্ট। স্কুল, কলেজ, মাদ্রাসা, কোচিং — সবার জন্য কাস্টমাইজযোগ্য।
          </p>
        </div>

        <div data-stagger="3" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((res, idx) => {
            const Icon = res.icon;
            return (
              <div key={idx} data-reveal className="card text-center">
                <div className={`icon-box mx-auto ${res.iconBg}`}>
                  <Icon className={`h-6 w-6 ${res.iconColor}`} />
                </div>
                <h3 className="card-title mt-6">{res.title}</h3>
                <p className="card-text">{res.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const OneClickSection = () => {
  const steps = [
    {
      icon: UserRoundPlus,
      borderColor: 'border-[#6366F1]',
      bgColor: 'bg-[#6366F1]/10',
      glowShadow: 'shadow-[0_0_25px_rgba(99,102,241,.6)]',
      iconColor: 'text-[#6366F1]',
      title: 'এক ক্লিকে',
      subTitle: 'নতুন ছাত্র নিবন্ধন',
      desc: 'নাম, ছবি, অভিভাবকের তথ্য — সব এক ফর্মে। আইডি কার্ড আর রোল নম্বর তৈরি হয় সাথে সাথে।',
    },
    {
      icon: FileText,
      borderColor: 'border-[#10B981]',
      bgColor: 'bg-[#10B981]/10',
      glowShadow: 'shadow-[0_0_25px_rgba(16,185,129,.6)]',
      iconColor: 'text-[#10B981]',
      title: 'ঝামেলামুক্ত',
      subTitle: 'অনলাইন ভর্তি',
      desc: 'আবেদন থেকে ভর্তি পর্যন্ত সবকিছু অনলাইনে। লাইনে দাঁড়ানোর দরকার নেই, কাগজেরও ঝামেলা নেই।',
    },
    {
      icon: Wallet,
      borderColor: 'border-amber-500',
      bgColor: 'bg-amber-500/10',
      glowShadow: 'shadow-[0_0_25px_rgba(245,158,11,.6)]',
      iconColor: 'text-amber-500',
      title: 'যেকোনো সময়',
      subTitle: 'ফি আদায়',
      desc: 'বিকাশ, নগদ বা রকেটে ফি দিন ঘরে বসে। অটোমেটিক রিসিট চলে যায় অভিভাবকের মোবাইলে।',
    },
    {
      icon: Printer,
      borderColor: 'border-[#F43F5E]',
      bgColor: 'bg-[#F43F5E]/10',
      glowShadow: 'shadow-[0_0_25px_rgba(244,63,94,.6)]',
      iconColor: 'text-[#F43F5E]',
      title: 'সবার কাছে একসাথে',
      subTitle: 'ফলাফল প্রকাশ',
      desc: 'পুরো স্কুলের রেজাল্ট একসাথে publish করুন। সব অভিভাবক এসএমএস পান স্বয়ংক্রিয়ভাবে।',
    },
  ];

  return (
    <section
      className="section relative overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      <div className="container-x">
        <div data-reveal className="section-head">
          <span className="eyebrow">সময় বাঁচান</span>
          <h2 className="section-title text-white">এক ক্লিকেই হয়ে যায় — আপনার মূল্যবান সময় বাঁচে</h2>
        </div>

        <div data-stagger="4" className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} data-reveal className="text-center">
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 ${step.borderColor} ${step.bgColor} ${step.glowShadow}`}
                >
                  <Icon className={`h-7 w-7 ${step.iconColor}`} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">{step.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-300">{step.subTitle}</p>
                <p className="card-text mx-auto max-w-[260px] text-[#9CA3AF]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  return (
    <section className="section bg-[#F9FAFB]">
      <div className="container-x">
        <div data-reveal className="section-head">
          <span className="eyebrow">স্বীকৃতি ও পুরস্কার</span>
          <h2 className="section-title">আমাদের অর্জনসমূহ</h2>
          <p className="section-desc">
            আমরা একটি জাতীয় আইসিটি পুরস্কার বিজয়ী সফটওয়্যার কোম্পানি। শিক্ষা ব্যবস্থাপনা ডিজিটালাইজেশনে আমাদের বিশেষ অবদানের স্বীকৃতিস্বরূপ আমরা এই সম্মাননা অর্জন করেছি।
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2"></div>

          {/* Timeline Item 1 */}
          <div data-reveal className="relative pb-16">
            <div className="relative z-10 mb-8 flex md:justify-center">
              <span className="rounded-full border-2 border-[#6366F1]/60 bg-white px-3 py-0.5 text-[12px] font-semibold text-[#6366F1]">
                ২০১০
              </span>
            </div>
            <div className="grid items-center gap-8 pl-14 md:grid-cols-2 md:gap-20 md:pl-0">
              <div className="rounded-xl bg-white p-3 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80"
                  alt="পুরস্কার"
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-lg object-cover"
                />
              </div>
              <div className="relative">
                <span className="absolute -left-[53px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow md:-left-[58px]">
                  <Trophy className="h-4 w-4 text-[#0F172A]" />
                </span>
                <h3 className="card-title">চ্যাম্পিয়ন, বেসিস জাতীয় আইসিটি পুরস্কার ২০১০</h3>
                <p className="card-text">আমাদেরকে আমাদের স্কুল ব্যবস্থাপনা সফটওয়্যার এর জন্য পুরস্কৃত করা হয়েছে।</p>
              </div>
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div data-reveal className="relative">
            <div className="relative z-10 mb-8 flex md:justify-center">
              <span className="rounded-full border-2 border-[#6366F1]/60 bg-white px-3 py-0.5 text-[12px] font-semibold text-[#6366F1]">
                ২০১০
              </span>
            </div>
            <div className="grid items-center gap-8 pl-14 md:grid-cols-2 md:gap-20 md:pl-0">
              <div className="relative md:order-1 md:text-right">
                <span className="absolute -left-[53px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow md:left-auto md:-right-[58px]">
                  <Trophy className="h-4 w-4 text-[#0F172A]" />
                </span>
                <h3 className="card-title">চ্যাম্পিয়ন, বেসিস জাতীয় আইসিটি পুরস্কার ২০১০</h3>
                <p className="card-text">আমাদেরকে আমাদের স্কুল ব্যবস্থাপনা সফটওয়্যার এর জন্য পুরস্কৃত করা হয়েছে।</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-lg md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80"
                  alt="পুরস্কার"
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoTutorialSection = () => {
  return (
    <section className="section relative overflow-hidden bg-[#0F172A]">
      <div className="pointer-events-none absolute -left-52 -top-52 h-[600px] w-[600px] rounded-full bg-[#6366F1]/25 blur-[150px]"></div>
      <div className="pointer-events-none absolute -bottom-52 -right-52 h-[600px] w-[700px] rounded-full bg-[#F43F5E]/20 blur-[160px]"></div>

      <div className="container-x relative z-10">
        <div data-reveal className="section-head">
          <span className="eyebrow">ভিডিও টিউটোরিয়াল</span>
          <h2 className="section-title text-white">সফটওয়্যারটি কীভাবে কাজ করে?</h2>
        </div>

        <div data-reveal style={delay(120)} className="mx-auto mt-12 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/XHOmBV4js_E"
            title="সফটওয়্যারটি কীভাবে কাজ করে?"
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};



export default function App() {
  return (
    <div id="top" className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <WhySection />
      <DemoSection />
      <ModulesSection />
      <DashboardSection />
      <WhyChooseUsSection />
      <OneClickSection />
      <AchievementsSection />
      <VideoTutorialSection />
      <ClientsSection />
    </div>
  );
}
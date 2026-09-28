"use client";

import {
    Award,
    Banknote,
    BookOpen,
    Building2,
    CircleCheck,
    DatabaseBackup,
    FileCheck,
    FileDown,
    Globe,
    GraduationCap,
    IdCard,
    Images,
    KeyRound,
    Landmark,
    Library,
    Lock,
    LogIn,
    Mail,
    MapPin,
    Megaphone,
    MessageSquareText,
    Paperclip,
    Pencil,
    Phone,
    Presentation,
    ReceiptText,
    Rocket,
    School,
    Send,
    ShieldAlert,
    Smartphone,
    Upload
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock Data Interfaces
interface AdmissionField {
  label: string;
  placeholder: string;
  fullWidth?: boolean;
}

const admissionFields: AdmissionField[] = [
  { label: "শিক্ষার্থীর নাম", placeholder: "মোঃ আরিফ হোসেন", fullWidth: true },
  { label: "জন্ম তারিখ", placeholder: "১২/০৪/২০১৪" },
  { label: "শ্রেণি", placeholder: "৬ষ্ঠ শ্রেণি ▾" },
  { label: "পিতার নাম", placeholder: "মোঃ আব্দুল করিম" },
  { label: "মাতার নাম", placeholder: "রোকেয়া বেগম" },
  { label: "মোবাইল নম্বর", placeholder: "০১৭xx-xxxxxx" },
  { label: "রক্তের গ্রুপ", placeholder: "B+ ▾" },
  { label: "ঠিকানা", placeholder: "বাড়ি ১২, রোড ৩, ধানমন্ডি, ঢাকা", fullWidth: true },
];

const attendanceData = [
  { roll: "০১", name: "আরিফ হোসেন", time: "৮:০২", status: "উপস্থিত", tone: "green" },
  { roll: "০২", name: "সাদিয়া আক্তার", time: "৭:৫৮", status: "উপস্থিত", tone: "green" },
  { roll: "০৩", name: "তানভীর আহমেদ", time: "—", status: "অনুপস্থিত", tone: "red" },
  { roll: "০৪", name: "নুসরাত জাহান", time: "৮:০০", status: "উপস্থিত", tone: "green" },
  { roll: "০৫", name: "রাকিব হাসান", time: "৮:২১", status: "দেরিতে", tone: "amber" },
];

const feeData = [
  { receipt: "#১০২৪", name: "আরিফ হোসেন", month: "সেপ্টেম্বর", amount: "৳ ১,৫০০", status: "পরিশোধিত", tone: "green" },
  { receipt: "#১০২৫", name: "সাদিয়া আক্তার", month: "সেপ্টেম্বর", amount: "৳ ১,৫০০", status: "পরিশোধিত", tone: "green" },
  { receipt: "#১০২৬", name: "তানভীর আহমেদ", month: "আগস্ট", amount: "৳ ১,২০০", status: "বকেয়া", tone: "red" },
  { receipt: "#১০২৭", name: "রাকিব হাসান", month: "সেপ্টেম্বর", amount: "৳ ৭৫০", status: "আংশিক", tone: "amber" },
];

const resultData = [
  { roll: "০১", name: "আরিফ হোসেন", bangla: "৮৮", english: "৮২", math: "৯৫", gpa: "৫.০০", tone: "blue" },
  { roll: "০২", name: "সাদিয়া আক্তার", bangla: "৯১", english: "৮৭", math: "৮৯", gpa: "৫.০০", tone: "blue" },
  { roll: "০৩", name: "তানভীর আহমেদ", bangla: "৭২", english: "৬৮", math: "৭৪", gpa: "৪.২৫", tone: "green" },
  { roll: "০৪", name: "নুসরাত জাহান", bangla: "৭৮", english: "৮০", math: "৭১", gpa: "৪.৫০", tone: "green" },
  { roll: "০৫", name: "রাকিব হাসান", bangla: "৬১", english: "৫৮", math: "৬৬", gpa: "৩.৭৫", tone: "amber" },
];

const payrollData = [
  { name: "মোঃ করিম উদ্দিন", title: "প্রধান শিক্ষক", base: "৳ ৪৫,০০০", leave: "০", net: "৳ ৪৫,০০০" },
  { name: "ফাতেমা বেগম", title: "সহকারী শিক্ষক", base: "৳ ২৮,০০০", leave: "১", net: "৳ ২৭,০৬৭" },
  { name: "রহিম মিয়া", title: "সহকারী শিক্ষক", base: "৳ ২৮,০০০", leave: "০", net: "৳ ২৮,০০০" },
  { name: "শাহানা পারভীন", title: "অফিস সহকারী", base: "৳ ১৬,০০০", leave: "২", net: "৳ ১৪,৯৩৩" },
  { name: "জসিম উদ্দিন", title: "অফিস সহায়ক", base: "৳ ১২,০০০", leave: "০", net: "৳ ১২,০০০" },
];

const accountsData = [
  { date: "২৮/০৯", title: "টিউশন ফি", income: "৳ ৪৫,০০০", expense: "—" },
  { date: "২৭/০৯", title: "বিদ্যুৎ বিল", income: "—", expense: "৳ ৮,৫০০" },
  { date: "২৬/০৯", title: "ভর্তি ফি", income: "৳ ২৪,০০০", expense: "—" },
  { date: "২৫/০৯", title: "স্টেশনারি", income: "—", expense: "৳ ৩,২০০" },
  { date: "২৫/০৯", title: "পরীক্ষা ফি", income: "৳ ১৮,৫০০", expense: "—" },
];

const noticesData = [
  { tag: "জরুরি", tone: "red", date: "২৮ সেপ্টেম্বর", title: "আগামীকাল বিদ্যালয় বন্ধ থাকবে" },
  { tag: "পরীক্ষা", tone: "blue", date: "২৬ সেপ্টেম্বর", title: "অর্ধবার্ষিক পরীক্ষার রুটিন প্রকাশ" },
  { tag: "ফি", tone: "amber", date: "২৪ সেপ্টেম্বর", title: "অক্টোবর মাসের বেতন জমার শেষ তারিখ" },
  { tag: "সভা", tone: "green", date: "২২ সেপ্টেম্বর", title: "অভিভাবক সমাবেশ — শনিবার সকাল ১০টা" },
];

const securityLogs = [
  { icon: DatabaseBackup, tone: "bg-emerald-50 text-emerald-600", title: "দৈনিক ক্লাউড ব্যাকআপ সম্পন্ন", time: "আজ, রাত ২:০০", status: "সফল", statusTone: "green" },
  { icon: LogIn, tone: "bg-indigo-50 text-indigo-600", title: "Admin লগইন — ঢাকা, Chrome", time: "আজ, ১০:২৪ AM", status: "যাচাইকৃত", statusTone: "blue" },
  { icon: KeyRound, tone: "bg-amber-50 text-amber-600", title: "শিক্ষক রোলের পারমিশন আপডেট", time: "আজ, ৯:১৫ AM", status: "পরিবর্তন", statusTone: "amber" },
  { icon: ShieldAlert, tone: "bg-rose-50 text-rose-600", title: "ভুল পাসওয়ার্ডে ৩ বার চেষ্টা — ব্লক", time: "গতকাল, ১১:৪০ PM", status: "ব্লকড", statusTone: "red" },
  { icon: Lock, tone: "bg-emerald-50 text-emerald-600", title: "SSL এনক্রিপশন সক্রিয়", time: "সবসময়", status: "চালু", statusTone: "green" },
];

const clients1 = [
  { title1: "সেন্ট জোসেফ", title2: "উচ্চ বিদ্যালয়", icon: Building2, tone: "bg-amber-50 text-amber-500" },
  { title1: "দিনাজপুর জিলা", title2: "স্কুল", icon: Library, tone: "bg-purple-50 text-purple-500" },
  { title1: "ইস্পাহানী পাবলিক", title2: "স্কুল ও কলেজ", icon: Award, tone: "bg-teal-50 text-teal-600" },
  { title1: "ঢাকা রেসিডেন্সিয়াল", title2: "মডেল কলেজ", icon: School, tone: "bg-red-50 text-red-500" },
  { title1: "সৈয়দপুর সরকারি", title2: "বিজ্ঞান কলেজ", icon: BookOpen, tone: "bg-blue-50 text-blue-600" },
  { title1: "জামালপুর টেকনিক্যাল", title2: "স্কুল এন্ড কলেজ", icon: GraduationCap, tone: "bg-emerald-50 text-emerald-500" },
];

const clients2 = [
  { title1: "গ্রীন ফিল্ড", title2: "স্কুল এন্ড কলেজ", icon: IdCard, tone: "bg-emerald-50 text-emerald-500" },
  { title1: "আনোয়ারা উচ্চ", title2: "বিদ্যালয়", icon: Globe, tone: "bg-orange-50 text-orange-500" },
  { title1: "গোপালপুর দারুল", title2: "উলুম কামিল মাদ্রাসা", icon: GraduationCap, tone: "bg-cyan-50 text-cyan-600" },
  { title1: "মনি কানন", title2: "উচ্চ বিদ্যালয়", icon: Landmark, tone: "bg-rose-50 text-rose-500" },
  { title1: "মাইজদী সরকারি", title2: "বালিকা বিদ্যালয়", icon: Pencil, tone: "bg-pink-50 text-pink-500" },
  { title1: "উত্তর বাংলা", title2: "কলেজ", icon: Presentation, tone: "bg-indigo-50 text-indigo-500" },
];

// Reusable Status Pill Component
const StatusPill = ({ tone, text }: { tone: string; text: string }) => {
  const toneMap: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-indigo-50 text-indigo-600",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneMap[tone] || ""}`}>
      {text}
    </span>
  );
};

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#F9FAFB] font-sans text-[#4B5563] antialiased">
      <section className="relative overflow-hidden bg-[#0F172A] pt-12 pb-24 lg:pb-32">
        <div className="pointer-events-none absolute -left-52 -top-52 h-[760px] w-[760px] rounded-full bg-[#6366F1]/25 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-52 -right-52 h-[760px] w-[860px] rounded-full bg-[#F43F5E]/20 blur-[170px]" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20 text-center lg:pt-24">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-1 text-[14px] text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#F43F5E]"></span>
            ফিচার
          </span>

          <h1 className="mx-auto mt-8 max-w-4xl text-[36px] font-bold leading-[1.25] text-white sm:text-5xl lg:text-[64px]">
            সব ফিচার এক{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-violet-400 to-pink-500 bg-clip-text text-transparent">
              School Management System-এ
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#9CA3AF] sm:text-[18px]">
            ভর্তি থেকে শুরু করে ফি কালেকশন, হাজিরা, রেজাল্ট, বেতন — সব কিছু এক সাথে। একটি প্রতিষ্ঠান চালাতে যা যা লাগে, আমাদের Online School
            Management Software-এ তার সবই আছে। সম্পূর্ণ বাংলায়।
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#6366F1] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.55)] transition hover:bg-indigo-600"
            >
              ফ্রি ডেমো দেখুন <Rocket className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              এখনই যোগাযোগ করুন <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-20 lg:py-24 bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
              আমাদের সম্পর্কে
            </span>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.35] text-[#0F172A] md:text-[36px]">
              কেন আমাদের Online School
              <br className="hidden md:block" /> Management Software আলাদা
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">
              আমাদের সফটওয়্যার শুধু একটি টুল নয় — এটি আপনার পুরো প্রতিষ্ঠানের ডিজিটাল রূপান্তর। প্রতিটি ফিচার বাংলাদেশের শিক্ষা প্রতিষ্ঠানের
              বাস্তব প্রয়োজনের কথা মাথায় রেখে তৈরি। সহজ ব্যবহার, বাংলা ইন্টারফেস আর সাশ্রয়ী খরচ — এজন্যই আমরা আলাদা।
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE 1: ADMISSION */}
      <section id="features" className="py-20 lg:py-24 overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
              মূল বৈশিষ্ট্যসমূহ
            </span>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.35] text-[#0F172A] md:text-[36px]">
              আমাদের School Management Software-এর সম্পূর্ণ ফিচার তালিকা
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 mt-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                ভর্তি
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">অনলাইন ভর্তি ব্যবস্থাপনা</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                ভর্তির জন্য আর লম্বা লাইনে দাঁড়াতে হবে না। অভিভাবক ঘরে বসেই অনলাইনে আবেদন করতে পারেন। আবেদন থেকে ভর্তি পর্যন্ত পুরো প্রক্রিয়া
                স্বয়ংক্রিয়।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "অনলাইনে আবেদন ফরম পূরণ ও জমাদান",
                  "প্রয়োজনীয় ডকুমেন্ট ও ছবি আপলোড",
                  "অনলাইনে ভর্তি ফি পেমেন্ট ও SMS কনফার্মেশন",
                  "সিট লিমিট ও অপেক্ষমাণ তালিকা ব্যবস্থাপনা",
                  "আবেদন রিভিউ, অনুমোদন ও এডমিট কার্ড তৈরি",
                  "ভর্তি পরীক্ষার ফলাফল প্রকাশ ও SMS নোটিফিকেশন",
                  "এক ক্লিকে সব আবেদনকারীকে SMS পাঠানো",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6366F1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/admission
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]/10">
                        <School className="h-4 w-4 text-[#6366F1]" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-[#0F172A]">ভর্তি আবেদন ফরম</p>
                        <p className="text-[10px] text-[#9CA3AF]">শিক্ষাবর্ষ ২০২৭</p>
                      </div>
                    </div>
                    <span className="inline-flex rounded-full bg-[#6366F1]/10 px-2 py-0.5 text-[10px] font-semibold text-[#6366F1]">
                      ধাপ ১ / ৩
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {admissionFields.map((f, i) => (
                      <div key={i} className={f.fullWidth ? "col-span-2" : ""}>
                        <p className="text-[10px] font-medium text-[#4B5563]">{f.label}</p>
                        <div className="mt-1 flex h-8 items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[11px] text-[#9CA3AF]">
                          {f.placeholder}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-2 flex items-center gap-3 rounded-md border border-dashed border-[#6366F1]/40 bg-[#6366F1]/5 px-3 py-2.5">
                      <Upload className="h-4 w-4 text-[#6366F1]" />
                      <p className="text-[11px] text-[#4B5563]">ছবি ও জন্ম নিবন্ধন আপলোড করুন</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <span className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-[#4B5563]">বাতিল</span>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">আবেদন জমা দিন</span>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -left-3 bottom-10 sm:-left-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/15">
                  <CircleCheck className="h-5 w-5 text-[#10B981]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Payment Successful</p>
                  <p className="text-[10px] text-[#9CA3AF]">Application ID: ADM-2027-0142</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: ATTENDANCE */}
      <section className="py-20 lg:py-24 overflow-hidden bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                হাজিরা
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">ডিজিটাল হাজিরা সিস্টেম</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                হাজিরা খাতার যুগ শেষ। বায়োমেট্রিক বা RFID কার্ডে এক সেকেন্ডে হাজিরা হয়, আর অনুপস্থিত হলে অভিভাবক সাথে সাথে জেনে যান।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "বায়োমেট্রিক ও RFID কার্ড দিয়ে হাজিরা",
                  "QR Code বা ID দিয়ে দ্রুত হাজিরা গ্রহণ",
                  "অনুপস্থিতিতে অভিভাবককে স্বয়ংক্রিয় SMS",
                  "শিক্ষক ও শিক্ষার্থীর আলাদা হাজিরা রিপোর্ট",
                  "দৈনিক, মাসিক ও বার্ষিক হাজিরা রিপোর্ট",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:order-1">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/attendance
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">আজকের হাজিরা — ৮ম শ্রেণি (ক)</p>
                      <p className="text-[10px] text-[#9CA3AF]">২৮ সেপ্টেম্বর ২০২৬</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">রিপোর্ট</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg p-2.5 bg-emerald-50">
                      <p className="text-[10px] text-emerald-700">উপস্থিত</p>
                      <p className="text-base font-bold text-emerald-700">১১২</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-rose-50">
                      <p className="text-[10px] text-rose-700">অনুপস্থিত</p>
                      <p className="text-base font-bold text-rose-700">৮</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-amber-50">
                      <p className="text-[10px] text-amber-700">দেরিতে</p>
                      <p className="text-base font-bold text-amber-700">৪</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[11px] sm:text-[12px]">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">রোল</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">নাম</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">সময়</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceData.map((row, i) => (
                          <tr key={i}>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.roll}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.name}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.time}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">
                              <StatusPill tone={row.tone} text={row.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -right-3 bottom-10 sm:-right-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                  <MessageSquareText className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">SMS পাঠানো হয়েছে</p>
                  <p className="text-[10px] text-[#9CA3AF]">৮ জন অভিভাবককে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 3: FEE COLLECTION */}
      <section className="py-20 lg:py-24 overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                ফি কালেকশন
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">অনলাইন ফি কালেকশন সফটওয়্যার</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                ফি দিতে আর অফিসে আসতে হবে না। অভিভাবক ঘরে বসে মোবাইলেই ফি দিতে পারবেন, আর রিসিট পৌঁছে যাবে সাথে সাথে।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "বিকাশ, নগদ, রকেট ও অনলাইন ব্যাংকিং পেমেন্ট",
                  "স্বয়ংক্রিয় ডিজিটাল রিসিট তৈরি",
                  "বকেয়া ফি-র জন্য SMS রিমাইন্ডার",
                  "শ্রেণি ও খাত ভিত্তিক আয়ের রিপোর্ট",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6366F1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/fees
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">ফি কালেকশন</p>
                      <p className="text-[10px] text-[#9CA3AF]">সেপ্টেম্বর ২০২৬</p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="inline-flex rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold text-pink-600">বিকাশ</span>
                      <span className="inline-flex rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-600">নগদ</span>
                      <span className="inline-flex rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-600">রকেট</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-2.5 bg-[#6366F1]/10">
                      <p className="text-[10px] text-[#6366F1]">আজকের কালেকশন</p>
                      <p className="text-base font-bold text-[#0F172A]">৳ ৩৪,৯৯০</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-rose-50">
                      <p className="text-[10px] text-rose-700">মোট বকেয়া</p>
                      <p className="text-base font-bold text-[#0F172A]">৳ ১২,৪০০</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[11px] sm:text-[12px]">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">রশিদ</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">শিক্ষার্থী</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">মাস</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">পরিমাণ</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeData.map((row, i) => (
                          <tr key={i}>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.receipt}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.name}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.month}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.amount}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">
                              <StatusPill tone={row.tone} text={row.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -left-3 bottom-10 sm:-left-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/15">
                  <CircleCheck className="h-5 w-5 text-[#10B981]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Payment Successful</p>
                  <p className="text-[10px] text-[#9CA3AF]">Transaction ID: TXN84215</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 4: RESULT MANAGEMENT */}
      <section className="py-20 lg:py-24 overflow-hidden bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                রেজাল্ট
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">একাডেমিক ও রেজাল্ট ব্যবস্থাপনা</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                পরীক্ষার নম্বর দিলেই রেজাল্ট তৈরি। হিসাবের ভুলের ঝামেলা নেই, শিক্ষকদের সময়ও বাঁচে অনেক।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "বিষয়ভিত্তিক নম্বর এন্ট্রি ও অটোমেটিক GPA হিসাব",
                  "মার্কশিট ও রিপোর্ট কার্ড প্রিন্ট",
                  "ক্লাস রুটিন ও পরীক্ষার সময়সূচি ব্যবস্থাপনা",
                  "অনলাইনে রেজাল্ট প্রকাশ ও SMS নোটিফিকেশন",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F43F5E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:order-1">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/results
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">অর্ধবার্ষিক পরীক্ষা — ১০ম শ্রেণি</p>
                      <p className="text-[10px] text-[#9CA3AF]">টেবুলেশন শিট</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">প্রকাশ করুন</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg p-2.5 bg-slate-100">
                      <p className="text-[10px] text-[#4B5563]">মোট</p>
                      <p className="text-base font-bold text-[#0F172A]">১২০</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-emerald-50">
                      <p className="text-[10px] text-emerald-700">পাস</p>
                      <p className="text-base font-bold text-emerald-700">১১২</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-[#6366F1]/10">
                      <p className="text-[10px] text-[#6366F1]">GPA ৫</p>
                      <p className="text-base font-bold text-[#6366F1]">৩৪</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[11px] sm:text-[12px]">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">রোল</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">নাম</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">বাংলা</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">ইংরেজি</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">গণিত</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">GPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultData.map((row, i) => (
                          <tr key={i}>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.roll}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.name}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.bangla}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.english}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.math}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">
                              <StatusPill tone={row.tone} text={row.gpa} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -right-3 bottom-10 sm:-right-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100">
                  <FileCheck className="h-5 w-5 text-rose-600" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">রেজাল্ট প্রকাশিত</p>
                  <p className="text-[10px] text-[#9CA3AF]">১২০ জন অভিভাবককে SMS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 5: SMS & NOTICE */}
      <section className="py-20 lg:py-24 overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                নোটিশ
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">এসএমএস ও নোটিশ বোর্ড</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                জরুরি নোটিশ এখন এক ক্লিকে সবার কাছে পৌঁছে যায় — শিক্ষক, শিক্ষার্থী ও অভিভাবক সবাই জানেন সাথে সাথে।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "এক ক্লিকে বাল্ক SMS পাঠানো",
                  "ক্লাস বা বিভাগ অনুযায়ী আলাদা নোটিশ",
                  "PDF বা Image আকারে নোটিশ আপলোড",
                  "অভিভাবক, শিক্ষক ও শিক্ষার্থীর জন্য আলাদা নোটিশ",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6366F1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/notice
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">নোটিশ বোর্ড</p>
                      <p className="text-[10px] text-[#9CA3AF]">সর্বশেষ নোটিশসমূহ</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">+ নতুন নোটিশ</span>
                  </div>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {noticesData.map((item, idx) => (
                      <div key={idx} className="rounded-lg border border-slate-100 p-3">
                        <div className="flex items-center justify-between">
                          <StatusPill tone={item.tone} text={item.tag} />
                          <span className="text-[9px] text-[#9CA3AF]">{item.date}</span>
                        </div>
                        <p className="mt-2 text-[11px] font-semibold leading-snug text-[#0F172A]">{item.title}</p>
                        <div className="mt-2 flex items-center gap-1 text-[9px] text-[#9CA3AF]">
                          <Paperclip className="h-3 w-3" />
                          notice.pdf
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -left-3 bottom-10 sm:-left-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366F1]/15">
                  <Send className="h-5 w-5 text-[#6366F1]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">নোটিশ পাঠানো হয়েছে</p>
                  <p className="text-[10px] text-[#9CA3AF]">১,২৪০ জনের কাছে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 6: HR & PAYROLL */}
      <section className="py-20 lg:py-24 overflow-hidden bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                এইচআর
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">এইচআর ও পেরোল ম্যানেজমেন্ট</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                শিক্ষক-কর্মচারীদের বেতন হিসাব এখন আর ঝামেলার কাজ নয়। হাজিরা ও ছুটি অনুযায়ী বেতন হিসাব হয় স্বয়ংক্রিয়ভাবে।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "শিক্ষক ও স্টাফের সম্পূর্ণ প্রোফাইল ব্যবস্থাপনা",
                  "হাজিরা ও ছুটির সাথে যুক্ত বেতন হিসাব",
                  "অটোমেটিক স্যালারি শিট ও পে-স্লিপ",
                  "Leave Management ও অনুমোদন প্রক্রিয়া",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:order-1">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/payroll
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">স্যালারি শিট</p>
                      <p className="text-[10px] text-[#9CA3AF]">সেপ্টেম্বর ২০২৬ · ৪২ জন স্টাফ</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">স্লিপ প্রিন্ট</span>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[11px] sm:text-[12px]">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">নাম</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">পদবি</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">মূল বেতন</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">ছুটি</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">নেট বেতন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollData.map((row, i) => (
                          <tr key={i}>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.name}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.title}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.base}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.leave}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.net}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -right-3 bottom-10 sm:-right-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                  <Banknote className="h-5 w-5 text-amber-600" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">স্যালারি শিট তৈরি</p>
                  <p className="text-[10px] text-[#9CA3AF]">মোট ৳ ১২,৪৮,০০০</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 7: ACCOUNTING */}
      <section className="py-20 lg:py-24 overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                হিসাব
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">স্বচ্ছ হিসাব ও অ্যাকাউন্টিং</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                প্রতিটি টাকার হিসাব থাকে স্বচ্ছভাবে। আয়, ব্যয়, বকেয়া — সব এক জায়গায় দেখুন, যেকোনো সময়।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "দৈনিক ক্যাশবুক ও লেজার",
                  "খাতভিত্তিক আয়-ব্যয় রিপোর্ট",
                  "ব্যালেন্স শিট ও ট্রায়াল ব্যালেন্স",
                  "এক ক্লিকে অডিট রিপোর্ট",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6366F1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/accounts
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">ক্যাশবুক</p>
                      <p className="text-[10px] text-[#9CA3AF]">চলতি মাস</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[#6366F1] px-3 py-1.5 text-[11px] font-semibold text-white">এক্সপোর্ট</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg p-2.5 bg-emerald-50">
                      <p className="text-[10px] text-emerald-700">আয়</p>
                      <p className="text-[13px] font-bold text-emerald-700 sm:text-base">৳ ২,৪৫,০০০</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-rose-50">
                      <p className="text-[10px] text-rose-700">ব্যয়</p>
                      <p className="text-[13px] font-bold text-rose-700 sm:text-base">৳ ১,৬৮,৫০০</p>
                    </div>
                    <div className="rounded-lg p-2.5 bg-[#6366F1]/10">
                      <p className="text-[10px] text-[#6366F1]">ব্যালেন্স</p>
                      <p className="text-[13px] font-bold text-[#6366F1] sm:text-base">৳ ৭৬,৫০০</p>
                    </div>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[380px] text-left text-[11px] sm:text-[12px]">
                      <thead>
                        <tr>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">তারিখ</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">বিবরণ</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">আয়</th>
                          <th className="border-b border-slate-100 bg-slate-50 px-2.5 py-2 font-semibold text-[#0F172A]">ব্যয়</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountsData.map((row, i) => (
                          <tr key={i}>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.date}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-[#4B5563]">{row.title}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-emerald-600">{row.income}</td>
                            <td className="border-b border-slate-100 px-2.5 py-2 text-rose-600">{row.expense}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -left-3 bottom-10 sm:-left-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/15">
                  <FileDown className="h-5 w-5 text-[#10B981]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">অডিট রিপোর্ট তৈরি</p>
                  <p className="text-[10px] text-[#9CA3AF]">PDF ডাউনলোড প্রস্তুত</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 8: WEBSITE */}
      <section className="py-20 lg:py-24 overflow-hidden bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                ওয়েবসাইট
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">ডাইনামিক স্কুল ওয়েবসাইট</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                আপনার প্রতিষ্ঠানের নিজস্ব আধুনিক ওয়েবসাইট। সফটওয়্যারের সাথে সরাসরি যুক্ত, তাই নোটিশ-রেজাল্ট সব আপডেট হয় স্বয়ংক্রিয়ভাবে।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "প্রতিষ্ঠানের নিজস্ব ডোমেইনে ওয়েবসাইট",
                  "নোটিশ, রেজাল্ট ও ভর্তি তথ্য স্বয়ংক্রিয়ভাবে প্রকাশ",
                  "শিক্ষক পরিচিতি ও ফটো গ্যালারি",
                  "SEO-friendly URL, Google-এ সহজে খুঁজে পাওয়া যায়",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F43F5E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:order-1">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    www.yourschool.edu.bd
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1e3a8a]">
                        <GraduationCap className="h-3.5 w-3.5 text-white" />
                      </span>
                      <p className="text-[11px] font-bold text-[#0F172A]">আদর্শ উচ্চ বিদ্যালয়</p>
                    </div>
                    <div className="hidden gap-3 text-[10px] text-[#4B5563] sm:flex">
                      <span>হোম</span>
                      <span>নোটিশ</span>
                      <span>রেজাল্ট</span>
                      <span>ভর্তি</span>
                      <span>গ্যালারি</span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#6366F1] px-5 py-8 text-white">
                    <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
                    <div className="absolute -bottom-12 right-16 h-32 w-32 rounded-full bg-[#F43F5E]/30 blur-2xl" />
                    <p className="relative text-[10px] text-white/70">স্থাপিত ১৯৭২ · EIIN ১০৮৪২৫</p>
                    <p className="relative mt-1 text-xl font-bold leading-snug">
                      জ্ঞানের আলোয়
                      <br />
                      আলোকিত ভবিষ্যৎ
                    </p>
                    <div className="relative mt-4 flex gap-2">
                      <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-semibold text-[#1e3a8a]">অনলাইন ভর্তি</span>
                      <span className="rounded-md border border-white/40 px-3 py-1.5 text-[10px]">রেজাল্ট দেখুন</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 p-4">
                    <div className="rounded-lg border border-slate-100 p-2.5">
                      <Megaphone className="h-4 w-4 text-[#6366F1]" />
                      <p className="mt-1.5 text-[10px] font-semibold text-[#0F172A]">নোটিশ</p>
                      <p className="text-[9px] text-[#9CA3AF]">৩টি নতুন</p>
                    </div>
                    <div className="rounded-lg border border-slate-100 p-2.5">
                      <Award className="h-4 w-4 text-[#F43F5E]" />
                      <p className="mt-1.5 text-[10px] font-semibold text-[#0F172A]">রেজাল্ট</p>
                      <p className="text-[9px] text-[#9CA3AF]">প্রকাশিত</p>
                    </div>
                    <div className="rounded-lg border border-slate-100 p-2.5">
                      <Images className="h-4 w-4 text-amber-500" />
                      <p className="mt-1.5 text-[10px] font-semibold text-[#0F172A]">গ্যালারি</p>
                      <p className="text-[9px] text-[#9CA3AF]">১২০+ ছবি</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -right-3 bottom-10 sm:-right-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100">
                  <Globe className="h-5 w-5 text-rose-600" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">ওয়েবসাইট লাইভ</p>
                  <p className="text-[10px] text-[#9CA3AF]">অটো আপডেট চালু</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
              মোবাইল অ্যাপ
            </span>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.35] text-[#0F172A] md:text-[36px]">অ্যান্ড্রয়েড অ্যাপ</h2>
            <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-[#0F172A] px-6 py-3.5 text-[14px] text-slate-200">
              শিক্ষক, অভিভাবক ও শিক্ষার্থী — সবার জন্য আলাদা লগইন। হাজিরা, ফি, রেজাল্ট ও নোটিশ দেখুন মোবাইল থেকেই, যেকোনো সময়।
            </p>
          </div>

          <div className="relative mt-14">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden border-t-2 border-dashed border-slate-300 lg:block" />

            <div className="relative grid items-center gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl mx-auto bg-[#6366F1]/10">
                  <Smartphone className="h-6 w-6 text-[#6366F1]" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-[#0F172A] mt-6">১. মোবাইল অ্যাপ</h3>
                <p className="mt-2 text-[14px] text-[#4B5563]">
                  হাজিরা, ফি ও রেজাল্ট দেখুন অ্যাপ থেকেই। অভিভাবক পান সব আপডেট সাথে সাথে, পুশ নোটিফিকেশনে।
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-9 text-center shadow-2xl shadow-[#6366F1]/20 lg:scale-105">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#6366F1]/40 blur-3xl" />
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl relative mx-auto bg-white/10">
                  <ReceiptText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-7 relative mt-6 text-white">২. দ্রুত বেতন রশিদ</h3>
                <p className="mt-2 text-[14px] relative text-[#9CA3AF]">
                  এক ট্যাপে ফি পরিশোধ, সাথে সাথে ডিজিটাল রশিদ। রশিদ হারানোর ভয় আর নেই।
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl mx-auto bg-[#F43F5E]/10">
                  <Globe className="h-6 w-6 text-[#F43F5E]" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-[#0F172A] mt-6">৩. অনলাইন অ্যাক্সেস</h3>
                <p className="mt-2 text-[14px] text-[#4B5563]">
                  যেকোনো জায়গা থেকে লগইন করুন। ক্লাউডে সব তথ্য থাকে নিরাপদে, ২৪ ঘণ্টা।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 9: SECURITY */}
      <section className="py-20 lg:py-24 overflow-hidden bg-[radial-gradient(#E5E7EB_1.5px,transparent_1.5px)] [background-size:20px_20px]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
                নিরাপত্তা
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.4] text-[#0F172A] md:text-[30px]">শক্তিশালী ডাটা নিরাপত্তা</h3>
              <p className="mt-5 text-base leading-7 text-[#4B5563]">
                আপনার প্রতিষ্ঠানের তথ্য সম্পূর্ণ নিরাপদ। প্রতিদিন ব্যাকআপ হয়, আর আধুনিক এনক্রিপশনে সব ডাটা থাকে সুরক্ষিত।
              </p>
              <ul className="mt-7 space-y-3.5">
                {[
                  "প্রতিদিন স্বয়ংক্রিয় ক্লাউড ব্যাকআপ",
                  "Role-ভিত্তিক Access Control",
                  "Encrypted ডাটা ট্রান্সফার (SSL)",
                  "অডিট লগ ও লগইন ইতিহাস ট্র্যাকিং",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] leading-6 text-[#4B5563]">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#6366F1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#F43F5E]/10 blur-xl" />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-[#9CA3AF] ring-1 ring-slate-200">
                    app.schoolsoftwarebd.com/security
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#0F172A]">নিরাপত্তা ও অ্যাক্টিভিটি লগ</p>
                      <p className="text-[10px] text-[#9CA3AF]">সর্বশেষ ২৪ ঘণ্টা</p>
                    </div>
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                      সুরক্ষিত
                    </span>
                  </div>
                  <div className="mt-3 divide-y divide-slate-100">
                    {securityLogs.map((log, i) => {
                      const IconComp = log.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 py-2.5">
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${log.tone}`}>
                            <IconComp className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold text-[#0F172A]">{log.title}</p>
                            <p className="text-[10px] text-[#9CA3AF]">{log.time}</p>
                          </div>
                          <StatusPill tone={log.statusTone} text={log.status} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-xl ring-1 ring-slate-200 -left-3 bottom-10 sm:-left-10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10B981]/15">
                  <DatabaseBackup className="h-5 w-5 text-[#10B981]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">ব্যাকআপ সম্পন্ন</p>
                  <p className="text-[10px] text-[#9CA3AF]">আজ রাত ২:০০ টায়</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-20 lg:py-24 overflow-hidden bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-3.5 py-1 text-[14px] font-semibold text-[#6366F1]">
              আমাদের গ্রাহক
            </span>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.35] text-[#0F172A] md:text-[36px]">যাঁরা আমাদের উপর আস্থাশীল</h2>
            <p className="mt-5 text-base leading-7 text-[#4B5563]">সারাদেশের ৮৭+ এর অধিক শিক্ষা প্রতিষ্ঠান ব্যবহার করছে আমাদের সফটওয়্যার</p>
          </div>
        </div>

        <div className="mt-12 space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          {/* Row 1 */}
          <div className="flex w-max gap-4 animate-[marquee-left_40s_linear_infinite] hover:[animation-play-state:paused]">
            {[...clients1, ...clients1, ...clients1].map((client, idx) => {
              const IconComp = client.icon;
              return (
                <div key={idx} className="flex w-[200px] shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${client.tone}`}>
                    <IconComp className="h-4 w-4" />
                  </span>
                  <p className="text-[13px] font-medium leading-[19px] text-[#4B5563]">
                    {client.title1}
                    <br />
                    {client.title2}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 2 */}
          <div className="flex w-max gap-4 animate-[marquee-right_40s_linear_infinite] hover:[animation-play-state:paused]">
            {[...clients2, ...clients2, ...clients2].map((client, idx) => {
              const IconComp = client.icon;
              return (
                <div key={idx} className="flex w-[200px] shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${client.tone}`}>
                    <IconComp className="h-4 w-4" />
                  </span>
                  <p className="text-[13px] font-medium leading-[19px] text-[#4B5563]">
                    {client.title1}
                    <br />
                    {client.title2}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER & CTA */}
      <footer
        id="contact"
        className="relative overflow-hidden bg-[#0F172A]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[30px] font-bold leading-[1.3] text-white md:text-[48px]">
              আপনার শিক্ষা প্রতিষ্ঠানকে ডিজিটাল রূপান্তর করতে প্রস্তুত?
            </h2>
            <p className="mt-5 text-base leading-7 text-[#9CA3AF]">
              আজই আমাদের সাথে যোগাযোগ করুন এবং ১ মাসের ফ্রি ট্রায়াল উপভোগ করুন।
            </p>
            <a
              href="#"
              className="mt-10 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#6366F1] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.55)] transition hover:bg-indigo-600"
            >
              এখনই ডেমো রিকোয়েস্ট করুন <Rocket className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 pb-14 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-1.5">
                <svg className="h-9 w-9" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4l14 8v4H6v-4l14-8z" fill="#1e7a8c" />
                  <rect x="9" y="17" width="4" height="13" fill="#2f9aa8" />
                  <rect x="18" y="17" width="4" height="13" fill="#2f9aa8" />
                  <rect x="27" y="17" width="4" height="13" fill="#2f9aa8" />
                  <rect x="5" y="31" width="30" height="3" rx="1" fill="#3b82f6" />
                  <path d="M5 36c5-3 10 2 15-1s10 2 15-1" stroke="#3b82f6" strokeWidth="1.5" />
                </svg>
                <div className="leading-none">
                  <p className="text-[15px] font-bold text-[#2f9aa8]">
                    SchoolSoftware<span className="text-blue-500">BD</span>
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#9CA3AF]">www.schoolsoftwarebd.com</p>
                </div>
              </Link>
              <p className="mt-5 text-[14px] text-[#9CA3AF]">
                <span className="font-semibold text-slate-300">“School SoftwareBD”</span> বাংলাদেশের স্কুল, কলেজ, মাদ্রাসা ও কোচিং
                সেন্টারের জন্য তৈরি একটি ক্লাউড-ভিত্তিক School Management Software। ভর্তি থেকে রেজাল্ট, ফি কালেকশন থেকে স্টাফ ম্যানেজমেন্ট — সব এক
                জায়গায়। সম্পূর্ণ বাংলায়। বাংলাদেশের বাস্তবতার কথা মাথায় রেখে।
              </p>
            </div>

            <div className="lg:pl-10">
              <h3 className="text-base font-bold text-white">আমাদের সম্পর্কে</h3>
              <ul className="mt-5 space-y-3 text-[14px] text-[#9CA3AF]">
                <li>
                  <Link href="/" className="transition hover:text-[#6366F1]">
                    মূল পাতা
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="transition hover:text-[#6366F1]">
                    মডিউল
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    আমাদের সম্পর্কে
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    রিটার্ন এবং রিফান্ড নীতি
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    গোপনীয়তা নীতি
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:pl-6">
              <h3 className="text-base font-bold text-white">বৈশিষ্ট্য</h3>
              <ul className="mt-5 space-y-3 text-[14px] text-[#9CA3AF]">
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    ব্যবহার করা সহজ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    সবসময় আপ টু ডেট
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    ডিজিটাল হাজিরা সিস্টেম
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    শিক্ষার্থীদের পড়াশোনার বেতন আদায়
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#6366F1]">
                    ইন্টিগ্রেটেড এসএমএস
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:pl-6">
              <h3 className="text-base font-bold text-white">যোগাযোগের তথ্য</h3>
              <ul className="mt-5 space-y-4 text-[14px] text-[#9CA3AF]">
                <li className="flex gap-2.5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                  <span>Sahara Center, 37/A, Lift 16, VIP Road, Kakrail, Dhaka</span>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                  <a href="mailto:info@schoolsoftwarebd.com" className="transition hover:text-[#6366F1]">
                    info@schoolsoftwarebd.com
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[#6366F1]" />
                  <a href="tel:+8801857770000" className="transition hover:text-[#6366F1]">
                    +৮৮০ ১৮৫৭ ৭৭০০০০
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-400/40 py-6 text-center text-[13px] text-[#9CA3AF]">
            কপিরাইট © ২০১০ – ২০২৬, School SoftwareBD | স্বত্ব সংরক্ষিত।
          </div>
        </div>
      </footer>
    </div>
  );
}
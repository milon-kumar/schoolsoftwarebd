import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-secondary py-20 lg:py-32">
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="eyebrow border-primary/40 bg-primary/20 text-accent">
            🚀 ডিজিটাল বাংলাদেশ এডুকেশন অটোমেশন
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-accent sm:text-5xl lg:text-6xl">
            স্মার্ট শিক্ষা প্রতিষ্ঠানের জন্য <br className="hidden sm:inline" />
            <span className="text-primary">সম্পূর্ণ ডিজিটাল ম্যানেজমেন্ট</span> সিস্টেম
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
            ভর্তি, উপস্থিতি, ফি সংগ্রহ, অটোমেটিক SMS নোটিফিকেশন ও রেজাল্ট শিট তৈরিসহ সবকিছু এখন পরিচালনা করুন একটি সফটওয়্যারে।
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#contact" className="btn btn-primary">
              ফ্রি ট্রায়াল শুরু করুন
            </Link>
            <Link href="#demo" className="btn btn-outline">
              লাইভ ডেমো দেখুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
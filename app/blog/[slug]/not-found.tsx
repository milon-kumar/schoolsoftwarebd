import Link from 'next/link';
import { ArrowLeft, FileX2 } from 'lucide-react';

/** ভুল slug, অথবা লেখাটি draft/archived হলে (API 404) */
export default function BlogNotFound() {
  return (
    <main>
      <section className="relative overflow-hidden bg-secondary">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/25 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-rose-500/20 blur-[160px]" />
        <div className="container-x relative z-10 flex flex-col items-center pb-24 pt-44 text-center lg:pt-52">
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-primary ring-1 ring-white/20">
            <FileX2 className="h-10 w-10" />
          </span>
          <h1 className="mt-7 text-[32px] font-bold leading-[1.35] text-white sm:text-[44px]">লেখাটি খুঁজে পাওয়া যায়নি</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            লিংকটি হয়তো ভুল, অথবা লেখাটি সরিয়ে নেওয়া হয়েছে। আমাদের অন্য লেখাগুলো পড়ে দেখতে পারেন।
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/blog" className="btn btn-primary">
              <ArrowLeft className="h-5 w-5" /> সব লেখা দেখুন
            </Link>
            <Link href="/" className="btn btn-outline">
              মূল পাতা
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

/**
 * ব্লগ সার্চ + সর্টিং — টাইপ থামালে (৫০০ms) নিজে থেকেই খোঁজে, Enter চাপলে সাথে সাথে।
 * সব অবস্থা URL-এ থাকে (?q=&sort=), তাই লিংক শেয়ার/রিফ্রেশ করলেও একই ফলাফল।
 */
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowDownWideNarrow, LoaderCircle, Search, X } from 'lucide-react';
import { blogHref, parseBlogQuery, type BlogQuery } from './blog-query';

type Props = {
  query: BlogQuery;
  sorts: readonly { value: string; label: string }[];
};

/** URL থেকে বর্তমান সার্চ/সর্ট পড়ে (page-এ <Suspense>-এর ভেতরে রাখতে হয়) */
export default function BlogToolbar({ sorts }: Pick<Props, 'sorts'>) {
  const searchParams = useSearchParams();
  const values = sorts.map((s) => s.value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = useMemo(() => parseBlogQuery(Object.fromEntries(searchParams), values), [searchParams]);
  return <BlogToolbarView query={query} sorts={sorts} />;
}

/** static HTML-এ (Suspense fallback) আর ব্রাউজারে — একই UI */
export function BlogToolbarView({ query, sorts }: Props) {
  const router = useRouter();
  const [text, setText] = useState(query.q);
  const [pending, startTransition] = useTransition();
  const lastPushed = useRef(query.q);

  // বাইরে থেকে q বদলালে (যেমন "ফিল্টার মুছুন") input-ও আপডেট
  useEffect(() => {
    setText(query.q);
    lastPushed.current = query.q;
  }, [query.q]);

  const go = (patch: Partial<BlogQuery>) =>
    startTransition(() => router.replace(blogHref(query, patch), { scroll: false }));

  const submit = (value: string) => {
    const q = value.trim();
    if (q === lastPushed.current) return;
    lastPushed.current = q;
    go({ q });
  };

  // debounce
  useEffect(() => {
    const id = setTimeout(() => submit(text), 500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        submit(text);
      }}
      className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-2 backdrop-blur-md sm:flex-row"
    >
      <label className="relative flex-1">
        <span className="sr-only">ব্লগে খুঁজুন</span>
        {pending ? (
          <LoaderCircle className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-primary" />
        ) : (
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="লেখার শিরোনাম বা বিষয় লিখে খুঁজুন..."
          maxLength={100}
          className="h-12 w-full rounded-xl border-0 bg-white pl-12 pr-11 text-[15px] text-secondary placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/30 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {text && (
          <button
            type="button"
            onClick={() => setText('')}
            aria-label="সার্চ মুছুন"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>

      <label className="relative sm:w-48">
        <span className="sr-only">সাজানোর ক্রম</span>
        <ArrowDownWideNarrow className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <select
          value={query.sort}
          onChange={(e) => go({ sort: e.target.value })}
          className="h-12 w-full cursor-pointer appearance-none rounded-xl border-0 bg-white pl-12 pr-10 text-[15px] font-medium text-secondary focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        >
          <path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
        </svg>
      </label>
    </form>
  );
}

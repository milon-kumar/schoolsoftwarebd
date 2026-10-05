/**
 * পেজিনেশন — ১ … ৪ ৫ ৬ … ১২  (সব ফিল্টার URL-এ রেখে শুধু page বদলায়)
 */
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogHref, type BlogQuery } from './blog-query';

const toBn = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

function pageList(current: number, last: number): (number | '…')[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  const pages = new Set([1, last, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= last - 2) [last - 1, last - 2, last - 3].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

const base =
  'flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-[15px] font-semibold transition-colors';

export default function BlogPagination({ query, lastPage }: { query: BlogQuery; lastPage: number }) {
  if (lastPage <= 1) return null;
  const current = Math.min(query.page, lastPage);

  const arrow = (page: number, label: string, children: React.ReactNode) =>
    page < 1 || page > lastPage ? (
      <span aria-hidden="true" className={`${base} cursor-not-allowed border-slate-200 bg-white text-slate-300`}>
        {children}
      </span>
    ) : (
      <Link
        href={blogHref(query, { page })}
        scroll={false}
        aria-label={label}
        className={`${base} border-slate-200 bg-white text-secondary hover:border-primary hover:text-primary`}
      >
        {children}
      </Link>
    );

  return (
    <nav aria-label="পেজিনেশন" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {arrow(current - 1, 'আগের পাতা', <ChevronLeft className="h-5 w-5" />)}
      {pageList(current, lastPage).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-muted">
            …
          </span>
        ) : p === current ? (
          <span
            key={p}
            aria-current="page"
            className={`${base} border-primary bg-primary text-white shadow-[0_10px_24px_-10px_rgba(99,102,241,0.8)]`}
          >
            {toBn(p)}
          </span>
        ) : (
          <Link
            key={p}
            href={blogHref(query, { page: p })}
            scroll={false}
            aria-label={`পাতা ${toBn(p)}`}
            className={`${base} border-slate-200 bg-white text-secondary hover:border-primary hover:text-primary`}
          >
            {toBn(p)}
          </Link>
        ),
      )}
      {arrow(current + 1, 'পরের পাতা', <ChevronRight className="h-5 w-5" />)}
    </nav>
  );
}

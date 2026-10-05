"use client";

/**
 * সূচিপত্র — যে অংশ এখন পড়া হচ্ছে সেটা হাইলাইট হয়।
 * লিংকগুলো সাধারণ #anchor, তাই SmoothScroll নিজেই smooth scroll করে (navbar offset সহ)।
 */
import { useEffect, useState } from 'react';
import { ListTree } from 'lucide-react';

type TocItem = { id: string; text: string; level: 2 | 3 };

export default function BlogToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    const onScroll = () => {
      // স্ক্রিনের উপর থেকে ~১৪০px নিচে যে শিরোনাম পার হয়েছে, সেটাই active
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top - 140 <= 0) current = h.id;
        else break;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="সূচিপত্র" className="rounded-3xl border border-slate-200 bg-white p-6">
      <h2 className="flex items-center gap-2 text-base font-bold text-secondary">
        <ListTree className="h-5 w-5 text-primary" /> এই লেখায় যা আছে
      </h2>
      <ol className="mt-4 space-y-1 border-l-2 border-slate-100">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`-ml-0.5 block border-l-2 py-1.5 text-sm leading-6 ${item.level === 3 ? 'pl-7' : 'pl-4'} ${
                  isActive
                    ? 'border-primary font-semibold text-primary'
                    : 'border-transparent text-body hover:border-slate-300 hover:text-secondary'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

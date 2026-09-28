"use client";

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqItem = { q: string; a: string };

/**
 * একটি গ্রুপের accordion — একসাথে একটাই খোলা থাকে।
 * উচ্চতা grid-rows দিয়ে smooth ভাবে খোলে/বন্ধ হয়।
 * (পেজের উচ্চতা বদলালে SmoothScroll-এর ResizeObserver Lenis-কে নিজে থেকেই জানায়)
 */
export default function FaqAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="mt-6 space-y-4">
      {items.map(({ q, a }, i) => {
        const open = openIndex === i;
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;

        return (
          <div
            key={q}
            className={`rounded-2xl border bg-white transition duration-300 ${
              open
                ? 'border-primary/60 shadow-[0_14px_34px_-14px_rgba(99,102,241,0.4)]'
                : 'border-slate-200 hover:border-primary/40'
            }`}
          >
            <button
              id={btnId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-semibold leading-7 text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:px-6"
            >
              <span>{q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                  open ? 'rotate-180 bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-5 pb-5 text-[15px] leading-7 text-body transition-opacity duration-300 sm:px-6 ${
                    open ? 'opacity-100 delay-100' : 'opacity-0'
                  }`}
                >
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
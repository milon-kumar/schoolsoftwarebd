"use client";

import { useEffect, useRef } from 'react';

/**
 * স্ক্রিনে এলে ০ থেকে গুনে গুনে বাংলা সংখ্যায় target পর্যন্ত যায়।
 * Server-এ আসল সংখ্যাটাই render হয় (SEO ও JavaScript বন্ধ থাকলেও ঠিক থাকে)।
 *
 * <CountUp to={87} />  →  ৮৭
 */
const toBn = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export default function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    // এই সময় element টা data-reveal-এর কারণে লুকানো, তাই ০ দেখানোতে কোনো ঝলক দেখা যায় না
    el.textContent = toBn(0);
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = toBn(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = toBn(to);
    };
  }, [to, duration]);

  return <span ref={ref}>{toBn(to)}</span>;
}
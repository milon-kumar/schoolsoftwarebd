"use client";

/**
 * ডিটেইল পেজ static/ISR — তাই ভিউ গোনার জন্য ব্রাউজার থেকে একবার ডিটেইল API কল করি
 * (Laravel প্রতি কলে views +১ করে) আর সেখান থেকে টাটকা views/likes নিই।
 * একই পেজে কয়েকটা কম্পোনেন্ট ব্যবহার করলেও (বা dev-এর StrictMode) API একবারই কল হয়।
 */
import { useEffect, useState } from 'react';
import { PUBLIC_BLOG_API_BASE } from '@/app/lib/blog-shared';

type Stats = { views: number; likes: number };

const requests = new Map<string, Promise<Stats | null>>();

function loadStats(slug: string) {
  let p = requests.get(slug);
  if (!p) {
    p = fetch(`${PUBLIC_BLOG_API_BASE}/school/blogs/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((r: { data?: { views_count: number; likes_count: number } } | null) =>
        // রেসপন্সের views_count বাড়ানোর আগের মান — তাই +১
        r?.data ? { views: r.data.views_count + 1, likes: r.data.likes_count } : null,
      )
      .catch(() => null);
    requests.set(slug, p);
  }
  return p;
}

export function useBlogStats(slug: string) {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    let alive = true;
    loadStats(slug).then((s) => alive && s && setStats(s));
    return () => {
      alive = false;
    };
  }, [slug]);
  return stats;
}

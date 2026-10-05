"use client";

/**
 * লাইক বাটন → ব্রাউজার থেকে সরাসরি Laravel: POST {API}/school/blogs/{slug}/like
 *   (সরাসরি যায় বলে Laravel আসল ভিজিটরের IP পায় — throttle ঠিকমতো কাজ করে)
 * - সাথে সাথে সংখ্যা বাড়ে (optimistic), সার্ভার যা ফেরত দেয় সেটাই পরে বসে
 * - একই ব্রাউজার থেকে একবারই লাইক (localStorage-এ মনে রাখে)
 * - ১ মিনিটে ১০ বারের বেশি হলে (429) মেসেজ দেখায়
 */
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { PUBLIC_BLOG_API_BASE } from '@/app/lib/blog-shared';
import { useBlogStats } from './useBlogStats';

const toBn = (n: number) => n.toLocaleString('en-US').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
const storageKey = (slug: string) => `blog-liked:${slug}`;

export default function LikeButton({ slug, initialCount, size = 'md' }: { slug: string; initialCount: number; size?: 'md' | 'lg' }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pop, setPop] = useState(false);
  const [msg, setMsg] = useState('');
  const stats = useBlogStats(slug);

  // পেজ static — API থেকে টাটকা লাইক সংখ্যা এলে সেটা বসাই
  useEffect(() => {
    if (stats) setCount(stats.likes);
  }, [stats]);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey(slug)) === '1');
    } catch {
      /* private mode — সমস্যা নেই */
    }
  }, [slug]);

  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(''), 3500);
    return () => clearTimeout(id);
  }, [msg]);

  const like = async () => {
    if (liked || busy) {
      if (liked) setMsg('আপনি আগেই লাইক দিয়েছেন ❤️');
      return;
    }
    setBusy(true);
    setLiked(true);
    setPop(true);
    setCount((c) => c + 1);

    try {
      const res = await fetch(`${PUBLIC_BLOG_API_BASE}/school/blogs/${encodeURIComponent(slug)}/like`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      });
      const body = (await res.json().catch(() => ({}))) as { likes_count?: number; message?: string };

      if (!res.ok) {
        setLiked(false);
        setCount((c) => c - 1);
        setMsg(res.status === 429 ? 'অনেকবার চেষ্টা হয়েছে, এক মিনিট পর আবার চেষ্টা করুন।' : (body.message ?? 'লাইক দেওয়া যায়নি।'));
        return;
      }
      if (typeof body.likes_count === 'number') setCount(body.likes_count);
      try {
        localStorage.setItem(storageKey(slug), '1');
      } catch {}
      setMsg('ধন্যবাদ! লেখাটি আপনার ভালো লেগেছে জেনে খুশি হলাম।');
    } catch {
      setLiked(false);
      setCount((c) => c - 1);
      setMsg('ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    } finally {
      setBusy(false);
    }
  };

  const lg = size === 'lg';

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={like}
        aria-pressed={liked}
        aria-label={liked ? 'লাইক দেওয়া হয়েছে' : 'লেখাটি লাইক দিন'}
        className={`group inline-flex items-center gap-2.5 rounded-full border font-semibold ${
          lg ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        } ${
          liked
            ? 'border-rose-200 bg-rose-50 text-rose-600'
            : 'border-slate-200 bg-white text-secondary hover:border-rose-300 hover:text-rose-600'
        }`}
      >
        <Heart
          onAnimationEnd={() => setPop(false)}
          className={`${lg ? 'h-5 w-5' : 'h-[18px] w-[18px]'} ${liked ? 'fill-current' : ''} ${pop ? 'animate-[like-pop_.45s_ease-out]' : ''}`}
        />
        <span>{liked ? 'ভালো লেগেছে' : 'ভালো লাগলো'}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs ${liked ? 'bg-rose-100' : 'bg-slate-100 text-body'}`}>{toBn(count)}</span>
      </button>

      <span
        role="status"
        className={`pointer-events-none absolute left-0 top-full z-10 mt-2 w-max max-w-[260px] rounded-xl bg-secondary px-3 py-2 text-xs leading-5 text-white shadow-lg transition-opacity ${
          msg ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {msg}
      </span>

      <style>{`@keyframes like-pop{0%{transform:scale(1)}40%{transform:scale(1.45)}100%{transform:scale(1)}}`}</style>
    </div>
  );
}

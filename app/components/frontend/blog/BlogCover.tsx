"use client";

/**
 * ব্লগের কভার ছবি — ছবি না থাকলে বা লোড ফেল করলে সুন্দর gradient placeholder।
 * ছবি Laravel storage থেকে আসে (অন্য ডোমেইন), তাই next/image-এর বদলে সাধারণ <img>
 * (next/image চাইলে next.config-এ images.remotePatterns-এ ডোমেইন যোগ করতে হবে)।
 */
import { useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';

const GRADIENTS = [
  'from-indigo-500 via-violet-500 to-purple-600',
  'from-sky-500 via-blue-500 to-indigo-600',
  'from-teal-500 via-emerald-500 to-green-600',
  'from-orange-500 via-rose-500 to-pink-600',
  'from-pink-500 via-fuchsia-500 to-violet-600',
  'from-amber-500 via-orange-500 to-rose-500',
];

type Props = {
  src: string | null;
  alt: string;
  seed: number; // placeholder-এর রং ঠিক করতে (post id)
  label?: string | null; // placeholder-এ দেখানো লেখা (ক্যাটাগরি)
  eager?: boolean;
  className?: string;
};

export default function BlogCover({ src, alt, seed, label, eager = false, className = '' }: Props) {
  const [failed, setFailed] = useState(!src);
  const imgRef = useRef<HTMLImageElement>(null);

  // hydration-এর আগেই লোড ফেল করলে onError ধরা পড়ে না
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br text-white ${
          GRADIENTS[Math.abs(seed) % GRADIENTS.length]
        } ${className}`}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
        <div className="relative flex flex-col items-center gap-2 px-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
            <BookOpen className="h-6 w-6" />
          </span>
          {label && <span className="text-sm font-semibold tracking-wide text-white/90">{label}</span>}
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src!}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

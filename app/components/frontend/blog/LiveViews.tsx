"use client";

/** "১,০০২ বার পড়া হয়েছে" — প্রথমে static মান, তারপর API থেকে টাটকা মান (ভিউ +১ সহ) */
import { formatCount } from '@/app/lib/blog-shared';
import { useBlogStats } from './useBlogStats';

export default function LiveViews({ slug, initial }: { slug: string; initial: number }) {
  const stats = useBlogStats(slug);
  return <>{formatCount(stats?.views ?? initial)}</>;
}

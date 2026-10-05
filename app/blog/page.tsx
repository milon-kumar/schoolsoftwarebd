/**
 * /blog — ব্লগ লিস্ট (সার্চ, ক্যাটাগরি, ট্যাগ, সর্টিং, পেজিনেশন)
 * সব ফিল্টার URL-এ থাকে:  /blog?q=exam&category=education&tags=tips,study&sort=popular&page=2
 *
 * পেজটা static (ISR) — server searchParams পড়ে না, তাই `dynamic = 'error'` থাকলেও চলে।
 * ফিল্টার ছাড়া প্রথম পাতার পোস্টগুলো HTML-এই থাকে (SEO), বাকিটা ব্রাউজারে (BlogBrowser)।
 */
import { Suspense, type CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FolderOpen, Newspaper } from 'lucide-react';
import BlogBrowser from '@/app/components/frontend/blog/BlogBrowser';
import BlogListView from '@/app/components/frontend/blog/BlogListView';
import BlogToolbar, { BlogToolbarView } from '@/app/components/frontend/blog/BlogToolbar';
import { DEFAULT_BLOG_QUERY } from '@/app/components/frontend/blog/blog-query';
import { BLOG_SORTS, getBlogCategories, getBlogs, getBlogTags, toBn } from '@/app/lib/blog';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'ব্লগ - School SoftwareBD',
  description: 'স্কুল ম্যানেজমেন্ট, শিক্ষা ও প্রযুক্তি নিয়ে টিপস, গাইড ও সর্বশেষ খবর — School SoftwareBD ব্লগ।',
};

export default async function BlogPage() {
  const [initial, categories, popularTags] = await Promise.all([
    getBlogs({ page: 1 }),
    getBlogCategories(),
    getBlogTags({ popular: true, limit: 12 }),
  ]);
  const totalPosts = categories.reduce((sum, c) => sum + (c.blogs_count ?? 0), 0) || initial?.meta?.total || 0;

  return (
    <main>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-secondary pb-20 lg:pb-24">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/25 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-rose-500/20 blur-[160px]" />
        <div
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container-x relative z-10 pt-44 text-center lg:pt-48">
          <div data-reveal>
            <nav
              aria-label="breadcrumb"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
            >
              <Link href="/" className="hover:text-white">
                মূল পাতা
              </Link>
              <ChevronRight className="h-4 w-4 text-slate-500" />
              <span className="text-primary">ব্লগ</span>
            </nav>

            <h1 className="mx-auto mt-6 max-w-3xl text-[34px] font-bold leading-[1.3] text-white sm:text-5xl sm:leading-[1.3]">
              শিক্ষা ও প্রযুক্তির{' '}
              <span className="bg-gradient-to-r from-primary via-violet-400 to-pink-500 bg-clip-text text-transparent">ব্লগ</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              স্কুল ম্যানেজমেন্ট, পড়াশোনা আর ডিজিটাল শিক্ষা নিয়ে কাজের টিপস, গাইড ও সর্বশেষ খবর — সব এক জায়গায়।
            </p>
          </div>

          <div data-reveal style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            {/* useSearchParams ব্যবহার করে, তাই Suspense — static HTML-এ fallback দেখায় */}
            <Suspense fallback={<BlogToolbarView query={DEFAULT_BLOG_QUERY} sorts={BLOG_SORTS} />}>
              <BlogToolbar sorts={BLOG_SORTS} />
            </Suspense>

            {(totalPosts > 0 || categories.length > 0) && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
                {totalPosts > 0 && (
                  <span className="inline-flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-primary" /> {toBn(totalPosts)}টি লেখা
                  </span>
                )}
                {categories.length > 0 && (
                  <span className="inline-flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-pink-400" /> {toBn(categories.length)}টি ক্যাটাগরি
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================ LIST ============================ */}
      <section className="section dot-pattern">
        <div className="container-x">
          <Suspense
            fallback={
              <BlogListView
                query={DEFAULT_BLOG_QUERY}
                categories={categories}
                popularTags={popularTags}
                state={initial ? { status: 'ok', list: initial } : { status: 'loading' }}
              />
            }
          >
            <BlogBrowser initial={initial} categories={categories} popularTags={popularTags} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

/**
 * /blog/{slug} — ব্লগ ডিটেইল
 * SEO: API-র seo{} থেকে title/description/keywords/og image, সাথে BlogPosting schema
 *
 * পেজটা static (ISR): build-এর সময় সব পোস্ট তৈরি হয়, নতুন পোস্ট প্রথম ভিজিটে তৈরি হয়,
 * আর প্রতি ৬০ সেকেন্ডে API থেকে আপডেট নেয়। ভিউ কাউন্ট ব্রাউজার থেকে হয় (LiveViews)।
 */
import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Eye, FolderOpen, Hash, Rocket, Tag } from 'lucide-react';
import BlogCard from '@/app/components/frontend/blog/BlogCard';
import BlogCover from '@/app/components/frontend/blog/BlogCover';
import BlogToc from '@/app/components/frontend/blog/BlogToc';
import LikeButton from '@/app/components/frontend/blog/LikeButton';
import LiveViews from '@/app/components/frontend/blog/LiveViews';
import ShareButtons from '@/app/components/frontend/blog/ShareButtons';
import { prepareBlogContent } from '@/app/lib/blog-content';
import {
  formatBlogDate,
  getAllBlogSlugs,
  getBlog,
  getBlogCategories,
  getBlogTags,
  getRelatedBlogs,
  toBn,
} from '@/app/lib/blog';
import '../blog-content.css';

type Params = Promise<{ slug: string }>;

export const revalidate = 60;

/** build-এর সময় সব পোস্টের পেজ আগে থেকে তৈরি */
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/** production-এ .env-এ দিন: NEXT_PUBLIC_SITE_URL=https://schoolsoftwarebd.com */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug); // React cache() — page-এর সাথে একবারই API কল হয়
  if (!post) return { title: 'লেখাটি পাওয়া যায়নি - School SoftwareBD' };

  const title = post.seo?.meta_title || `${post.title} - School SoftwareBD ব্লগ`;
  const description = post.seo?.meta_description || post.summary || undefined;
  const image = post.seo?.og_image_url || post.featured_image_url;

  return {
    title,
    description,
    keywords: post.seo?.meta_keywords || undefined,
    ...(SITE_URL && { metadataBase: new URL(SITE_URL), alternates: { canonical: `/blog/${post.slug}` } }),
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.published_at,
      authors: post.author_name ? [post.author_name] : undefined,
      section: post.category?.name,
      tags: post.tags.map((t) => t.name),
      ...(SITE_URL && { url: `${SITE_URL}/blog/${post.slug}` }),
      ...(image && { images: [{ url: image, alt: post.title }] }),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image && { images: [image] }) },
  };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  const [related, categories, tags] = await Promise.all([
    getRelatedBlogs(post.slug, 3),
    getBlogCategories(),
    getBlogTags({ popular: true, limit: 12 }),
  ]);
  const { html, toc } = prepareBlogContent(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo?.meta_description || post.summary || undefined,
    image: post.seo?.og_image_url || post.featured_image_url || undefined,
    datePublished: post.published_at,
    author: { '@type': 'Person', name: post.author_name || 'School SoftwareBD' },
    publisher: { '@type': 'Organization', name: 'School SoftwareBD' },
    keywords: post.tags.map((t) => t.name).join(', ') || undefined,
    ...(SITE_URL && { mainEntityOfPage: `${SITE_URL}/blog/${post.slug}` }),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      {/* ============================ HERO ============================ */}
      <section className={`relative overflow-hidden bg-secondary ${post.featured_image_url ? 'pb-40 lg:pb-52' : 'pb-20 lg:pb-24'}`}>
        <div className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/25 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-rose-500/20 blur-[160px]" />

        <div className="container-x relative z-10 pt-40 text-center lg:pt-48">
          <div data-reveal className="mx-auto max-w-4xl">
            <nav
              aria-label="breadcrumb"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
            >
              <Link href="/" className="shrink-0 hover:text-white">
                মূল পাতা
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
              <Link href="/blog" className="shrink-0 hover:text-white">
                ব্লগ
              </Link>
              {post.category && (
                <>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  <Link href={`/blog?category=${encodeURIComponent(post.category.slug)}`} className="truncate text-primary hover:text-white">
                    {post.category.name}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="mt-6 text-[28px] font-bold leading-[1.45] text-white sm:text-4xl sm:leading-[1.4] lg:text-[44px]">{post.title}</h1>
            {post.summary && <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{post.summary}</p>}

            {/* লেখক ও অন্যান্য তথ্য */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink-500 text-sm font-bold text-white ring-2 ring-white/20">
                  {(post.author_name?.trim()[0] ?? 'A').toUpperCase()}
                </span>
                <span className="font-semibold text-white">{post.author_name ?? 'অ্যাডমিন'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" />
                <time dateTime={post.published_at}>{formatBlogDate(post.published_at)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> {toBn(post.reading_time || 1)} মিনিটে পড়ুন
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-primary" /> <LiveViews slug={post.slug} initial={post.views_count} /> বার পড়া হয়েছে
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ছবি + লেখা ============================ */}
      <section className="dot-pattern relative flow-root pb-20 lg:pb-24">
        <div className="container-x">
          {post.featured_image_url && (
            <div
              data-reveal
              style={delay(100)}
              className="relative z-10 mx-auto -mt-28 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.45)] lg:-mt-40"
            >
              <BlogCover src={post.featured_image_url} alt={post.title} seed={post.id} label={post.category?.name} eager />
            </div>
          )}

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
            {/* ---------- মূল লেখা ---------- */}
            <article className="min-w-0">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12">
                {/* ছোট স্ক্রিনে সূচিপত্র লেখার উপরে */}
                {toc.length > 1 && (
                  <details className="group mb-8 rounded-2xl border border-slate-200 bg-slate-50 lg:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-secondary [&::-webkit-details-marker]:hidden">
                      এই লেখায় যা আছে
                      <ChevronRight className="h-5 w-5 text-muted transition-transform group-open:rotate-90" />
                    </summary>
                    <ol className="space-y-2 border-t border-slate-200 px-5 py-4 text-sm">
                      {toc.map((t) => (
                        <li key={t.id} className={t.level === 3 ? 'pl-4' : ''}>
                          <a href={`#${t.id}`} className="text-body hover:text-primary">
                            {t.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}

                <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

                {post.tags.length > 0 && (
                  <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-8">
                    <Tag className="mr-1 h-5 w-5 text-muted" />
                    {post.tags.map((t) => (
                      <Link
                        key={t.id}
                        href={`/blog?tags=${encodeURIComponent(t.slug)}`}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-body hover:border-violet-400 hover:text-violet-700"
                      >
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <LikeButton slug={post.slug} initialCount={post.likes_count} />
                  <ShareButtons title={post.title} />
                </div>
              </div>

              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:gap-3"
              >
                <ArrowLeft className="h-5 w-5" /> সব লেখা দেখুন
              </Link>
            </article>

            {/* ---------- সাইডবার ---------- */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 1 && (
                <div className="hidden lg:block">
                  <BlogToc items={toc} />
                </div>
              )}

              {categories.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-secondary">
                    <FolderOpen className="h-5 w-5 text-primary" /> ক্যাটাগরি
                  </h2>
                  <ul className="mt-4 space-y-1">
                    {categories.map((c) => {
                      const active = c.slug === post.category?.slug;
                      return (
                        <li key={c.id}>
                          <Link
                            href={`/blog?category=${encodeURIComponent(c.slug)}`}
                            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium ${
                              active ? 'bg-primary/10 text-primary' : 'text-body hover:bg-slate-50 hover:text-secondary'
                            }`}
                          >
                            {c.name}
                            {typeof c.blogs_count === 'number' && (
                              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-primary text-white' : 'bg-slate-100 text-muted'}`}>
                                {toBn(c.blogs_count)}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {tags.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h2 className="flex items-center gap-2 text-base font-bold text-secondary">
                    <Hash className="h-5 w-5 text-primary" /> জনপ্রিয় ট্যাগ
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Link
                        key={t.id}
                        href={`/blog?tags=${encodeURIComponent(t.slug)}`}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-body hover:border-violet-400 hover:text-violet-700"
                      >
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-white">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                    <Rocket className="h-5 w-5 text-primary" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold leading-7">আপনার প্রতিষ্ঠানকে ডিজিটাল করুন আজই</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">ভর্তি থেকে রেজাল্ট — সব কাজ এক সফটওয়্যারে। ফ্রি ডেমো দেখে নিন।</p>
                  <Link
                    href="/#register"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    রেজিস্ট্রেশন করুন <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================ রিলেটেড ============================ */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="container-x">
            <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className="eyebrow">আরও পড়ুন</span>
                <h2 className="section-title">এই বিষয়ে আরও কিছু লেখা</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:gap-3">
                সব লেখা <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div data-stagger="3" className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

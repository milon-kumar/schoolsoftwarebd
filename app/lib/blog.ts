/**
 * ব্লগ API — server-side (build / ISR-এর সময় পেজ বানাতে)
 * ---------------------------------------------------------------
 *   GET  /school/blogs                 লিস্ট (q, category, tags, sort, per_page, page)
 *   GET  /school/blogs/{slug}          ডিটেইল (প্রতি কলে views +১)
 *   GET  /school/blogs/{slug}/related  রিলেটেড
 *   POST /school/blogs/{slug}/like     লাইক      → ব্রাউজার থেকে সরাসরি (LikeButton)
 *   GET  /school/blog-categories       ক্যাটাগরি
 *   GET  /school/blog-tags             ট্যাগ (?popular=1&limit=10)
 *
 * পেজগুলো static/ISR — কোনো fetch-এ `no-store` বা searchParams নেই, তাই
 * `dynamic = 'error'` বা static রেন্ডারিং থাকলেও কাজ করে।
 * সার্চ/ফিল্টার আর ভিউ কাউন্ট ব্রাউজারে হয় (BlogBrowser, useBlogStats)।
 */
import 'server-only';
import { cache } from 'react';
import {
  BlogApiError,
  PUBLIC_BLOG_API_BASE,
  blogListQueryString,
  readApiError,
  type BlogCategory,
  type BlogList,
  type BlogListParams,
  type BlogPost,
  type BlogPostDetail,
  type BlogTag,
} from './blog-shared';

export * from './blog-shared';

/** server চাইলে আলাদা (internal) URL দিতে পারে: BLOG_API_BASE_URL=http://127.0.0.1:8000/api */
const API_BASE = (process.env.BLOG_API_BASE_URL ?? PUBLIC_BLOG_API_BASE).replace(/\/$/, '');

/** কত সেকেন্ড পর পর API থেকে নতুন ডাটা আনবে (নতুন পোস্ট/এডিট এর মধ্যে দেখা যাবে) */
const REVALIDATE = 60;

async function api<T>(path: string, revalidate = REVALIDATE): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      // Accept না দিলে Laravel 404/422-এ HTML পাঠাতে পারে
      headers: { Accept: 'application/json' },
      next: { revalidate, tags: ['blog'] },
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new BlogApiError('ব্লগ সার্ভারের সাথে যোগাযোগ করা যায়নি।', 503);
  }
  if (!res.ok) throw await readApiError(res);
  return res.json() as Promise<T>;
}

/** লিস্টের প্রথম পাতা (ফিল্টার ছাড়া) — static HTML-এ থাকে, তাই Google পড়তে পারে */
export async function getBlogs(params: BlogListParams = {}): Promise<BlogList | null> {
  try {
    const r = await api<BlogList>(`/school/blogs?${blogListQueryString(params)}`);
    return { data: r.data ?? [], meta: r.meta };
  } catch {
    return null; // ব্রাউজার আবার চেষ্টা করবে
  }
}

/** ডিটেইল — React cache(): generateMetadata আর page একই রিকোয়েস্টে একবারই কল করে */
export const getBlog = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  try {
    const r = await api<{ data: BlogPostDetail }>(`/school/blogs/${encodeURIComponent(slug)}`);
    return r.data;
  } catch (e) {
    if (e instanceof BlogApiError && e.status === 404) return null;
    throw e;
  }
});

/** build-এর সময় সব পোস্টের পেজ আগে থেকে বানাতে (generateStaticParams) */
export async function getAllBlogSlugs(maxPages = 20): Promise<string[]> {
  const slugs: string[] = [];
  try {
    for (let page = 1; page <= maxPages; page++) {
      const r = await api<BlogList>(`/school/blogs?${blogListQueryString({ page, perPage: 50 })}`, 3600);
      slugs.push(...(r.data ?? []).map((p) => p.slug));
      if (!r.meta || page >= r.meta.last_page) break;
    }
  } catch {
    /* API বন্ধ থাকলে build আটকাবে না — পেজ প্রথম ভিজিটে তৈরি হবে */
  }
  return slugs;
}

export async function getRelatedBlogs(slug: string, limit = 3): Promise<BlogPost[]> {
  try {
    const r = await api<{ data: BlogPost[] }>(`/school/blogs/${encodeURIComponent(slug)}/related?limit=${limit}`, 300);
    return r.data ?? [];
  } catch {
    return []; // related না পেলে পেজ ভাঙবে না
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const r = await api<{ data: BlogCategory[] }>('/school/blog-categories', 300);
    return r.data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogTags(opts: { popular?: boolean; limit?: number } = {}): Promise<BlogTag[]> {
  const sp = new URLSearchParams();
  if (opts.popular) sp.set('popular', '1');
  if (opts.limit) sp.set('limit', String(opts.limit));
  try {
    const r = await api<{ data: BlogTag[] }>(`/school/blog-tags${sp.size ? `?${sp}` : ''}`, 300);
    return r.data ?? [];
  } catch {
    return [];
  }
}

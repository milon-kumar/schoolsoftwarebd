/**
 * ব্লগ — types, API URL আর ফরম্যাটিং (server ও browser দুই জায়গাতেই চলে)
 * ---------------------------------------------------------------
 * .env.local:
 *   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
 *
 * ব্রাউজার সরাসরি Laravel API কল করে (সার্চ/ফিল্টার, লাইক, ভিউ কাউন্ট) —
 * Laravel-এর config/cors.php-তে 'paths' => ['api/*'] আর allowed_origins-এ
 * আপনার সাইটের ডোমেইন (বা '*') থাকতে হবে। Laravel-এর ডিফল্ট সেটিংসে এটা আগে থেকেই আছে।
 */

export const PUBLIC_BLOG_API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://cp.schoolsoftwarebd.test/api').replace(
  /\/$/,
  '',
);

/* =============================== types =============================== */
export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  blogs_count?: number;
};

export type BlogTag = { id: number; name: string; slug: string; blogs_count?: number };

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  is_featured: boolean;
  is_commentable: boolean;
  views_count: number;
  likes_count: number;
  reading_time: number;
  published_at: string;
  category: BlogCategory | null;
  tags: BlogTag[];
};

export type BlogPostDetail = BlogPost & {
  content: string;
  seo: {
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image_url: string | null;
  } | null;
};

export type BlogListMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export type BlogList = { data: BlogPost[]; meta: BlogListMeta };

/** API-র sort মান — Laravel validation-এ যা আছে শুধু সেগুলোই রাখুন */
export const BLOG_SORTS = [
  { value: 'latest', label: 'সর্বশেষ' },
  { value: 'popular', label: 'জনপ্রিয়' },
  { value: 'oldest', label: 'পুরনো' },
] as const;
export type BlogSort = (typeof BLOG_SORTS)[number]['value'];

export const BLOG_PER_PAGE = 9;

export class BlogApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/** Laravel-এর error JSON থেকে প্রথম মেসেজটা বের করে */
export async function readApiError(res: Response): Promise<BlogApiError> {
  const body = (await res.json().catch(() => ({}))) as { message?: string; errors?: Record<string, string[]> };
  const first = body.errors ? Object.values(body.errors)[0]?.[0] : undefined;
  return new BlogApiError(first ?? body.message ?? `অনুরোধ ব্যর্থ হয়েছে (${res.status})`, res.status);
}

export type BlogListParams = {
  q?: string;
  category?: string;
  tags?: string[];
  sort?: string;
  page?: number;
  perPage?: number;
};

export function blogListQueryString(params: BlogListParams = {}) {
  const sp = new URLSearchParams();
  if (params.q) sp.set('q', params.q);
  if (params.category) sp.set('category', params.category);
  if (params.tags?.length) sp.set('tags', params.tags.join(','));
  if (params.sort) sp.set('sort', params.sort);
  sp.set('per_page', String(params.perPage ?? BLOG_PER_PAGE));
  if (params.page && params.page > 1) sp.set('page', String(params.page));
  return sp.toString();
}

/* ============================== formatting ============================== */
export const toBn = (n: number | string) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const dateFmt = new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' });
export const formatBlogDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : dateFmt.format(d);
};

/** ১২৩৪ → ১,২৩৪ ; ১৫০০০ → ১৫ হা. */
export const formatCount = (n: number) => (n >= 10000 ? `${toBn(Math.round(n / 1000))} হা.` : toBn(n.toLocaleString('en-US')));

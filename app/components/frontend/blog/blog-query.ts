/**
 * /blog পেজের URL query — server ও client দুই জায়গাতেই ব্যবহার হয় (server-only নয়)
 *   /blog?q=exam&category=education&tags=tips,study&sort=popular&page=2
 */
export type BlogQuery = {
  q: string;
  category: string;
  tags: string[];
  sort: string;
  page: number;
};

export const DEFAULT_SORT = 'latest';

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';

export function parseBlogQuery(sp: RawParams, allowedSorts: readonly string[]): BlogQuery {
  const sort = first(sp.sort);
  const page = Number.parseInt(first(sp.page), 10);
  return {
    q: first(sp.q).trim().slice(0, 100),
    category: first(sp.category).trim(),
    tags: [...new Set(first(sp.tags).split(',').map((t) => t.trim()).filter(Boolean))].slice(0, 10),
    sort: allowedSorts.includes(sort) ? sort : DEFAULT_SORT,
    page: Number.isFinite(page) && page > 1 ? page : 1,
  };
}

/** বর্তমান query-র উপর পরিবর্তন বসিয়ে নতুন /blog লিংক — ফিল্টার বদলালে page সবসময় ১-এ ফেরে */
export function blogHref(current: BlogQuery, patch: Partial<BlogQuery> = {}) {
  const next = { ...current, page: 1, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set('q', next.q);
  if (next.category) sp.set('category', next.category);
  if (next.tags.length) sp.set('tags', next.tags.join(','));
  if (next.sort && next.sort !== DEFAULT_SORT) sp.set('sort', next.sort);
  if (next.page > 1) sp.set('page', String(next.page));
  const qs = sp.toString().replace(/%2C/g, ',');
  return qs ? `/blog?${qs}` : '/blog';
}

export const hasFilters = (q: BlogQuery) => Boolean(q.q || q.category || q.tags.length);

/** কোনো ফিল্টার ছাড়া /blog */
export const DEFAULT_BLOG_QUERY: BlogQuery = { q: '', category: '', tags: [], sort: DEFAULT_SORT, page: 1 };

"use client";

/**
 * /blog-এর সার্চ, ফিল্টার, সর্ট, পেজিনেশন — URL (?q=&category=…) পড়ে ব্রাউজার থেকে
 * সরাসরি Laravel API কল করে। ফিল্টার ছাড়া প্রথম পাতা server থেকে আগেই আসে (initial)।
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogListView, { type BlogListState } from './BlogListView';
import { blogHref, parseBlogQuery } from './blog-query';
import { smoothScrollTo } from '@/app/components/frontend/SmoothScroll';
import {
  BLOG_SORTS,
  BlogApiError,
  PUBLIC_BLOG_API_BASE,
  blogListQueryString,
  readApiError,
  type BlogCategory,
  type BlogList,
  type BlogTag,
} from '@/app/lib/blog-shared';

const SORT_VALUES = BLOG_SORTS.map((s) => s.value);

type Props = {
  initial: BlogList | null;
  categories: BlogCategory[];
  popularTags: BlogTag[];
};

export default function BlogBrowser({ initial, categories, popularTags }: Props) {
  const searchParams = useSearchParams();
  const query = useMemo(() => parseBlogQuery(Object.fromEntries(searchParams), SORT_VALUES), [searchParams]);
  const key = blogHref(query, { page: query.page }); // blogHref নিজে page ১-এ ফেরায়, তাই page আলাদা করে দিই
  const isDefault = key === '/blog';

  const [state, setState] = useState<BlogListState>(() =>
    isDefault && initial ? { status: 'ok', list: initial } : { status: 'loading' },
  );
  const [retry, setRetry] = useState(0);

  /* ডাটা আনা */
  useEffect(() => {
    if (isDefault && initial && retry === 0) {
      setState({ status: 'ok', list: initial });
      return;
    }
    const ctrl = new AbortController();
    setState({ status: 'loading' });

    fetch(
      `${PUBLIC_BLOG_API_BASE}/school/blogs?${blogListQueryString({
        q: query.q || undefined,
        category: query.category || undefined,
        tags: query.tags,
        sort: query.sort,
        page: query.page,
      })}`,
      { headers: { Accept: 'application/json' }, signal: ctrl.signal },
    )
      .then(async (res) => {
        if (!res.ok) throw await readApiError(res);
        const r = (await res.json()) as BlogList;
        setState({ status: 'ok', list: { data: r.data ?? [], meta: r.meta } });
      })
      .catch((e: unknown) => {
        if (ctrl.signal.aborted) return;
        setState({
          status: 'error',
          message: e instanceof BlogApiError ? e.message : 'ব্লগ সার্ভারের সাথে যোগাযোগ করা যায়নি।',
        });
      });

    return () => ctrl.abort();
    // key-তেই পুরো query আছে
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, retry]);

  /* পাতা/ফিল্টার বদলালে লিস্টের শুরুতে স্ক্রল (লিস্টের শুরু স্ক্রিনের উপরে চলে গেলে) */
  const prevKey = useRef(key);
  useEffect(() => {
    if (prevKey.current === key) return;
    prevKey.current = key;
    // skeleton বসে পেজের উচ্চতা বদলানোর পর স্ক্রল শুরু করি
    const t = window.setTimeout(() => {
      const el = document.getElementById('posts');
      if (el && el.getBoundingClientRect().top < 0) smoothScrollTo(el);
    }, 60);
    return () => window.clearTimeout(t);
  }, [key]);

  return (
    <BlogListView
      query={query}
      categories={categories}
      popularTags={popularTags}
      state={state}
      onRetry={() => setRetry((n) => n + 1)}
    />
  );
}

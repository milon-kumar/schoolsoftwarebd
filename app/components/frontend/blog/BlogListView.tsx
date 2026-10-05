/**
 * ব্লগ লিস্টের UI — ফিল্টার চিপস + ফলাফল (শুধু দেখায়, ডাটা আনে না)
 * server (static HTML) আর client (BlogBrowser) দুই জায়গাতেই একই কম্পোনেন্ট।
 */
import type { ReactNode } from 'react';
import Link from 'next/link';
import { AlertTriangle, FileSearch, FolderOpen, Hash, RotateCcw, X } from 'lucide-react';
import BlogCard from './BlogCard';
import BlogPagination from './BlogPagination';
import { BlogGridSkeleton } from './BlogSkeleton';
import { blogHref, hasFilters, type BlogQuery } from './blog-query';
import { toBn, type BlogCategory, type BlogList, type BlogTag } from '@/app/lib/blog-shared';

export type BlogListState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; list: BlogList };

type Props = {
  query: BlogQuery;
  categories: BlogCategory[];
  popularTags: BlogTag[];
  state: BlogListState;
  onRetry?: () => void;
};

export default function BlogListView({ query, categories, popularTags, state, onRetry }: Props) {
  return (
    <>
      <Filters query={query} categories={categories} popularTags={popularTags} />
      <div id="posts" className="mt-10">
        <Results query={query} categories={categories} state={state} onRetry={onRetry} />
      </div>
    </>
  );
}

/* ============================ ফিল্টার চিপস ============================ */
function Filters({ query, categories, popularTags }: { query: BlogQuery; categories: BlogCategory[]; popularTags: BlogTag[] }) {
  // URL-এ এমন ট্যাগ থাকতে পারে যা popular লিস্টে নেই — সেটাও দেখাই, যাতে মুছে ফেলা যায়
  const tags: Pick<BlogTag, 'name' | 'slug'>[] = [
    ...popularTags,
    ...query.tags.filter((s) => !popularTags.some((t) => t.slug === s)).map((s) => ({ name: s, slug: s })),
  ];
  if (!categories.length && !tags.length) return null;

  const chip = (active: boolean) =>
    `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? 'border-primary bg-primary text-white shadow-[0_10px_24px_-12px_rgba(99,102,241,0.9)]'
        : 'border-slate-200 bg-white text-secondary hover:border-primary/50 hover:text-primary'
    }`;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
      {categories.length > 0 && (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-muted lg:w-28">
            <FolderOpen className="h-4 w-4" /> ক্যাটাগরি
          </span>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible">
            <Link href={blogHref(query, { category: '' })} scroll={false} className={chip(!query.category)}>
              সব
            </Link>
            {categories.map((c) => {
              const active = query.category === c.slug;
              return (
                <Link
                  key={c.id}
                  href={blogHref(query, { category: active ? '' : c.slug })}
                  scroll={false}
                  aria-pressed={active}
                  title={c.description ?? undefined}
                  className={chip(active)}
                >
                  {c.name}
                  {typeof c.blogs_count === 'number' && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-muted'}`}>
                      {toBn(c.blogs_count)}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className={`flex flex-col gap-3 lg:flex-row lg:items-center ${categories.length ? 'mt-5 border-t border-slate-100 pt-5' : ''}`}>
          <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-muted lg:w-28">
            <Hash className="h-4 w-4" /> জনপ্রিয় ট্যাগ
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = query.tags.includes(t.slug);
              const nextTags = active ? query.tags.filter((s) => s !== t.slug) : [...query.tags, t.slug];
              return (
                <Link
                  key={t.slug}
                  href={blogHref(query, { tags: nextTags })}
                  scroll={false}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? 'border-violet-500 bg-violet-500/10 text-violet-700'
                      : 'border-slate-200 bg-slate-50 text-body hover:border-violet-400 hover:text-violet-700'
                  }`}
                >
                  #{t.name}
                  {active && <X className="h-3.5 w-3.5" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ ফলাফল ============================ */
function Results({
  query,
  categories,
  state,
  onRetry,
}: {
  query: BlogQuery;
  categories: BlogCategory[];
  state: BlogListState;
  onRetry?: () => void;
}) {
  if (state.status === 'loading') return <BlogGridSkeleton count={6} />;

  if (state.status === 'error') {
    return (
      <StateBox
        icon={<AlertTriangle className="h-8 w-8" />}
        tone="error"
        title="ব্লগ লোড করা যায়নি"
        text={`${state.message} একটু পরে আবার চেষ্টা করুন।`}
        action={
          onRetry && (
            <button type="button" onClick={onRetry} className="btn btn-primary">
              <RotateCcw className="h-4 w-4" /> আবার চেষ্টা করুন
            </button>
          )
        }
      />
    );
  }

  const { data: posts, meta } = state.list;
  const filtered = hasFilters(query);
  const categoryName = categories.find((c) => c.slug === query.category)?.name ?? query.category;
  const clearHref = blogHref(query, { q: '', category: '', tags: [] });

  /* পাতার নম্বর সীমার বাইরে (যেমন ?page=99) */
  if (!posts.length && meta?.total > 0) {
    return (
      <StateBox
        icon={<FileSearch className="h-8 w-8" />}
        title="এই পাতায় কোনো লেখা নেই"
        text={`মোট ${toBn(meta.last_page)}টি পাতা আছে।`}
        action={
          <Link href={blogHref(query, { page: 1 })} scroll={false} className="btn btn-primary">
            প্রথম পাতায় যান
          </Link>
        }
      />
    );
  }

  if (!posts.length) {
    return (
      <StateBox
        icon={<FileSearch className="h-8 w-8" />}
        title={filtered ? 'কোনো লেখা পাওয়া যায়নি' : 'এখনো কোনো লেখা প্রকাশ হয়নি'}
        text={filtered ? 'অন্য শব্দ দিয়ে খুঁজে দেখুন অথবা ফিল্টার সরিয়ে দিন।' : 'খুব শিগগিরই এখানে নতুন লেখা আসছে — একটু পরে আবার ঘুরে যান।'}
        action={
          filtered && (
            <Link href={clearHref} scroll={false} className="btn btn-primary">
              <X className="h-4 w-4" /> সব ফিল্টার মুছুন
            </Link>
          )
        }
      />
    );
  }

  // প্রথম পাতায়, কোনো ফিল্টার/সর্ট ছাড়া → একটি বড় ফিচার্ড কার্ড উপরে
  const showFeatured = !filtered && query.page === 1 && query.sort === 'latest' && posts.length > 3;
  const featured = showFeatured ? (posts.find((p) => p.is_featured) ?? posts[0]) : null;
  const grid = featured ? posts.filter((p) => p.id !== featured.id) : posts;
  const total = meta?.total ?? posts.length;
  const lastPage = meta?.last_page ?? 1;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-body">
          {query.q && (
            <>
              “<strong className="text-secondary">{query.q}</strong>”{' '}
            </>
          )}
          {query.category && (
            <>
              <strong className="text-secondary">{categoryName}</strong> ক্যাটাগরিতে{' '}
            </>
          )}
          মোট <strong className="text-primary">{toBn(total)}</strong>টি লেখা{filtered && ' পাওয়া গেছে'}
          {lastPage > 1 && (
            <span className="text-muted">
              {' '}
              · পাতা {toBn(meta.current_page)}/{toBn(lastPage)}
            </span>
          )}
        </p>
        {filtered && (
          <Link
            href={clearHref}
            scroll={false}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-body hover:border-rose-300 hover:text-rose-600"
          >
            <X className="h-4 w-4" /> ফিল্টার মুছুন
          </Link>
        )}
      </div>

      {featured && (
        <div className="mb-8">
          <BlogCard post={featured} variant="featured" />
        </div>
      )}

      <div data-stagger="3" className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <BlogPagination query={query} lastPage={lastPage} />
    </>
  );
}

function StateBox({
  icon,
  title,
  text,
  action,
  tone = 'default',
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
  tone?: 'default' | 'error';
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
          tone === 'error' ? 'bg-rose-50 text-rose-500' : 'bg-primary/10 text-primary'
        }`}
      >
        {icon}
      </span>
      <h2 className="mt-5 text-xl font-bold text-secondary">{title}</h2>
      <p className="mt-2 max-w-md text-[15px] leading-7 text-body">{text}</p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}

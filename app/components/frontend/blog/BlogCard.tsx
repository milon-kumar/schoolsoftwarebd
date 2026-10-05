/**
 * ব্লগ কার্ড — লিস্ট, রিলেটেড পোস্ট সব জায়গায় একই কার্ড (server ও client দুই জায়গাতেই চলে)
 *   variant="featured" → পাশাপাশি বড় কার্ড (লিস্টের প্রথম পাতায় উপরে)
 */
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, Eye, Heart, Star } from 'lucide-react';
import BlogCover from './BlogCover';
import { formatBlogDate, formatCount, toBn, type BlogPost } from '@/app/lib/blog-shared';

const initial = (name: string | null) => (name?.trim()?.[0] ?? 'A').toUpperCase();

function Author({ name }: { name: string | null }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-xs font-bold text-white">
        {initial(name)}
      </span>
      <span className="truncate text-sm font-medium text-secondary">{name ?? 'অ্যাডমিন'}</span>
    </span>
  );
}

function Stats({ post }: { post: BlogPost }) {
  return (
    <span className="flex shrink-0 items-center gap-3 text-[13px] text-muted">
      <span className="inline-flex items-center gap-1" title="মোট পড়া হয়েছে">
        <Eye className="h-4 w-4" /> {formatCount(post.views_count)}
      </span>
      <span className="inline-flex items-center gap-1" title="লাইক">
        <Heart className="h-4 w-4" /> {formatCount(post.likes_count)}
      </span>
    </span>
  );
}

export default function BlogCard({ post, variant = 'default' }: { post: BlogPost; variant?: 'default' | 'featured' }) {
  const href = `/blog/${post.slug}`;
  const featured = variant === 'featured';

  return (
    <article
      data-reveal
      className={`group relative flex overflow-hidden rounded-3xl border border-slate-200 bg-white hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-20px_rgba(99,102,241,0.35)] ${
        featured ? 'flex-col lg:grid lg:grid-cols-[1.15fr_1fr]' : 'flex-col'
      }`}
    >
      <div className={`relative overflow-hidden bg-slate-100 ${featured ? 'aspect-[16/9] lg:aspect-auto lg:min-h-[400px]' : 'aspect-[16/10]'}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <BlogCover src={post.featured_image_url} alt={post.title} seed={post.id} label={post.category?.name} eager={featured} />
        </div>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {post.category && (
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              {post.category.name}
            </span>
          )}
          {post.is_featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-current" /> ফিচার্ড
            </span>
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'p-7 sm:p-9 lg:p-11' : 'p-6'}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.published_at}>{formatBlogDate(post.published_at)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {toBn(post.reading_time || 1)} মিনিটে পড়ুন
          </span>
        </div>

        <h3
          className={`mt-3 font-bold text-secondary transition-colors group-hover:text-primary ${
            featured ? 'text-2xl leading-[1.45] sm:text-[28px]' : 'line-clamp-2 text-lg leading-8'
          }`}
        >
          {/* পুরো কার্ড ক্লিকযোগ্য — stretched link */}
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {post.summary && (
          <p className={`mt-3 text-body ${featured ? 'line-clamp-4 text-base leading-7' : 'line-clamp-3 text-[15px] leading-7'}`}>
            {post.summary}
          </p>
        )}

        {featured && (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            পুরোটা পড়ুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <Author name={post.author_name} />
            <Stats post={post} />
          </div>
        </div>
      </div>
    </article>
  );
}

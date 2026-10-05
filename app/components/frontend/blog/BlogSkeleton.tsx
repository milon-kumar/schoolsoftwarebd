/** লোড হওয়ার সময় কার্ডের আকারে ধূসর placeholder */
export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="aspect-[16/10] animate-pulse bg-slate-200/80" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
        <div className="h-5 w-11/12 animate-pulse rounded-full bg-slate-200" />
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-100" />
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5">
          <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="লোড হচ্ছে" className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

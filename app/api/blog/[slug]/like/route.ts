/**
 * POST /api/blog/{slug}/like  →  Laravel: POST {BLOG_API_BASE}/school/blogs/{slug}/like
 * ব্রাউজার সরাসরি Laravel-এ না গিয়ে এখানে আসে — CORS ঝামেলা নেই, API URL লুকানো থাকে।
 *
 * ⚠️ Laravel-এর throttle (১ মিনিটে ১০ বার) IP ধরে কাজ করে। সব রিকোয়েস্ট এই Next সার্ভার
 * থেকে যায়, তাই আসল ভিজিটরের IP X-Forwarded-For-এ পাঠাই। Laravel-এ
 * bootstrap/app.php → $middleware->trustProxies(at: '<Next সার্ভারের IP>') সেট না করলে
 * সব ভিজিটর একই IP হিসেবে গোনা হবে।
 */
import { NextResponse, type NextRequest } from 'next/server';
import { PUBLIC_BLOG_API_BASE as BLOG_API_BASE } from '@/app/lib/blog';

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[^/?#\s]{1,200}$/.test(slug)) {
    return NextResponse.json({ success: false, message: 'ভুল লিংক।' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '';

  try {
    const res = await fetch(`${BLOG_API_BASE}/school/blogs/${encodeURIComponent(slug)}/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(ip ? { 'X-Forwarded-For': ip, 'X-Real-IP': ip } : {}),
        'User-Agent': req.headers.get('user-agent') ?? 'next-proxy',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    const body = (await res.json().catch(() => ({}))) as { likes_count?: number; message?: string };

    if (!res.ok) {
      const message =
        res.status === 404 ? 'লেখাটি পাওয়া যায়নি।' : res.status === 429 ? 'Too Many Attempts.' : (body.message ?? 'লাইক দেওয়া যায়নি।');
      return NextResponse.json({ success: false, message }, { status: res.status });
    }
    return NextResponse.json({ success: true, likes_count: body.likes_count });
  } catch {
    return NextResponse.json({ success: false, message: 'সার্ভারের সাথে যোগাযোগ করা যায়নি।' }, { status: 503 });
  }
}

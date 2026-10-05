/**
 * ব্লগের HTML content নিরাপদ করা + সূচিপত্র (Table of Contents) তৈরি
 *   npm i sanitize-html && npm i -D @types/sanitize-html
 *
 * অ্যাডমিন প্যানেলের editor থেকে আসা HTML সরাসরি dangerouslySetInnerHTML-এ দিলে
 * <script>, onclick="" ইত্যাদি দিয়ে XSS হতে পারে — তাই আগে sanitize করি।
 */
import 'server-only';
import sanitizeHtml from 'sanitize-html';

export type TocItem = { id: string; text: string; level: 2 | 3 };

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags, // p, a, ul, ol, li, blockquote, table, code, pre, h1-h6 …
    'img',
    'figure',
    'figcaption',
    'iframe',
    'video',
    'source',
    'span',
    'u',
    's',
    'mark',
    'sub',
    'sup',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading'],
    video: ['src', 'controls', 'poster', 'width', 'height', 'preload'],
    source: ['src', 'type'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan', 'scope'],
    ol: ['start', 'type'],
    '*': ['style'],
  },
  // style-এর মধ্যে শুধু লেখার alignment রাখি (editor-এর রং/ফন্ট সাইটের ডিজাইন নষ্ট করে)
  allowedStyles: { '*': { 'text-align': [/^(left|right|center|justify)$/] } },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'www.facebook.com', 'www.google.com'],
  transformTags: {
    // পেজে h1 একটাই থাকবে (শিরোনাম) — content-এর h1 → h2
    h1: 'h2',
    a: (tagName, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href ?? '');
      return {
        tagName,
        attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs,
      };
    },
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy', alt: attribs.alt ?? '' } }),
    iframe: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
  },
};

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");

/** বাংলা লেখা থেকেও কাজ করে: "১. রুটিন তৈরি করুন" → "১-রুটিন-তৈরি-করুন" */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'section';

export function prepareBlogContent(raw: string): { html: string; toc: TocItem[] } {
  let html = sanitizeHtml(raw ?? '', OPTIONS);

  /* h2/h3-তে id বসিয়ে সূচিপত্র বানাই */
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  html = html.replace(/<h([23])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, attrs: string, inner: string) => {
    const text = decode(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    if (!text) return `<h${lvl}${attrs}>${inner}</h${lvl}>`;
    const base = slugify(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl} id="${id}"${attrs}>${inner}</h${lvl}>`;
  });

  /* বড় টেবিল মোবাইলে পাশে স্ক্রল হবে; ভিডিও embed 16:9 থাকবে */
  html = html
    .replace(/<table/g, '<div class="table-wrap"><table')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<iframe([\s\S]*?)<\/iframe>/g, '<div class="embed"><iframe$1</iframe></div>');

  return { html, toc };
}

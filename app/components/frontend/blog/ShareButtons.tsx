"use client";

/** শেয়ার — Facebook, WhatsApp, LinkedIn, X আর লিংক কপি (মোবাইলে native share-ও) */
import { useEffect, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

const Icon = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8.3v3.2h2.5V21h3.2v-9.3h2.6l.4-3.2H14Z" />
  ),
  whatsapp: (
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3Z" />
  ),
  linkedin: (
    <path d="M6.9 21H3.3V9.3h3.6V21ZM5.1 7.7a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM21 21h-3.6v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21H9.7V9.3h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21Z" />
  ),
  x: <path d="M17.8 3h3.1l-6.7 7.7 7.9 10.3h-6.2l-4.8-6.3L5.6 21H2.5l7.2-8.2L2.2 3h6.3l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z" />,
};

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    setUrl(window.location.href.split('#')[0]);
    setCanNative(typeof navigator.share === 'function');
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { key: 'facebook', label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, cls: 'hover:bg-[#1877f2]' },
    { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, cls: 'hover:bg-[#25d366]' },
    { key: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, cls: 'hover:bg-[#0a66c2]' },
    { key: 'x', label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, cls: 'hover:bg-black' },
  ] as const;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // পুরনো ব্রাউজার
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary hover:-translate-y-0.5 hover:border-transparent hover:text-white';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">শেয়ার করুন:</span>
      {links.map((l) => (
        <a
          key={l.key}
          href={url ? l.href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label}-এ শেয়ার করুন`}
          title={l.label}
          className={`${btn} ${l.cls}`}
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
            {Icon[l.key]}
          </svg>
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="লিংক কপি করুন" title="লিংক কপি" className={`${btn} hover:bg-primary`}>
        {copied ? <Check className="h-[18px] w-[18px]" /> : <Link2 className="h-[18px] w-[18px]" />}
      </button>
      {canNative && (
        <button
          type="button"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
          aria-label="অন্য অ্যাপে শেয়ার করুন"
          className={`${btn} hover:bg-primary sm:hidden`}
        >
          <Share2 className="h-[18px] w-[18px]" />
        </button>
      )}
      <span role="status" className={`text-sm font-medium text-success transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
        লিংক কপি হয়েছে!
      </span>
    </div>
  );
}

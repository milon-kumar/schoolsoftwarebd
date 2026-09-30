"use client"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  ArrowRight,
  Building2,
  ChevronDown,
  CircleHelp,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react';

type SubItem = { label: string; href: string; desc?: string; icon: LucideIcon };
type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: SubItem[] };

const NAV_ITEMS: NavItem[] = [
  { label: 'মূল পাতা', href: '/' },
  { label: 'ফীচার', href: '/software-features' },
  {
    label: 'কোম্পানি',
    children: [
      { label: 'আমাদের সম্পর্কে', href: '/about-us', desc: 'আমাদের গল্প, লক্ষ্য ও অর্জন', icon: Building2 },
    ],
  },
  {
    label: 'সলুশন',
    children: [
      { label: 'প্রশ্ন উত্তর', href: '/faq', desc: 'সাধারণ প্রশ্নের উত্তর', icon: CircleHelp },
    ],
  },
  { label: 'যোগাযোগ', href: '/contact-us' },
];

const matchPath = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

const isItemActive = (pathname: string, item: NavItem) =>
  item.children ? item.children.some((c) => matchPath(pathname, c.href)) : matchPath(pathname, item.href);

const DesktopDropdown = ({ item, pathname }: { item: Extract<NavItem, { children: SubItem[] }>; pathname: string }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const active = isItemActive(pathname, item);
  const menuId = `menu-${item.label}`;

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        wrapRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(e) => {
          const mouseWithHover = e.detail > 0 && window.matchMedia('(hover: hover)').matches;
          if (mouseWithHover) show();
          else setOpen((v) => !v);
        }}
        className={
          active
            ? 'flex items-center gap-1 rounded-full bg-white px-4 py-1.5 font-medium text-[#6366F1] shadow-sm'
            : `flex items-center gap-1 rounded-full px-4 py-1.5 transition hover:text-[#6366F1] ${open ? 'text-[#6366F1]' : ''}`
        }
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id={menuId}
        className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 transition duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-1 opacity-0'
          }`}
      >
        <ul className="w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)]">
          {item.children.map(({ label, href, desc, icon: Icon }) => {
            const current = matchPath(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`group flex items-start gap-3 rounded-xl p-2.5 transition ${current ? 'bg-[#6366F1]/10' : 'hover:bg-slate-50'
                    }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${current
                        ? 'bg-[#6366F1] text-white'
                        : 'bg-[#6366F1]/10 text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white'
                      }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-semibold ${current ? 'text-[#6366F1]' : 'text-[#0F172A]'}`}>
                      {label}
                    </span>
                    {desc && <span className="mt-0.5 block text-xs text-[#9CA3AF]">{desc}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

const MobileGroup = ({
  item,
  pathname,
  onNavigate,
}: {
  item: Extract<NavItem, { children: SubItem[] }>;
  pathname: string;
  onNavigate: () => void;
}) => {
  const active = isItemActive(pathname, item);
  const [open, setOpen] = useState(active);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition hover:bg-white/5 ${active ? 'text-white' : ''
          }`}
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <ul className="overflow-hidden">
          {item.children.map(({ label, href, icon: Icon }) => {
            const current = matchPath(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  tabIndex={open ? undefined : -1}
                  aria-current={current ? 'page' : undefined}
                  className={`ml-4 mt-1 flex items-center gap-3 rounded-xl border-l-2 px-4 py-2.5 text-[15px] transition ${current
                      ? 'border-[#6366F1] bg-white/5 text-white'
                      : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                >
                  <Icon className={`h-4 w-4 ${current ? 'text-[#818CF8]' : 'text-slate-400'}`} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

/* ================================ Navbar ================================ */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}
    >
      <div className="container-x">
        <nav
          aria-label="প্রধান মেনু"
          className={`flex items-center justify-between rounded-full border-2 border-white/80 bg-gradient-to-b from-white to-slate-200 px-4 py-3 transition-shadow duration-300 sm:px-8 sm:py-3.5 ${scrolled ? 'shadow-[0_12px_40px_-12px_rgba(15,23,42,0.45)]' : 'shadow-lg'
            }`}
        >
          <Link href="/" aria-label="School SoftwareBD — মূল পাতা" className="shrink-0">
            <Image src="/assets/frontend/ssbd-logo.webp" alt="School SoftwareBD" width={150} height={50} priority />
          </Link>

          <ul className="hidden items-center gap-1 rounded-full bg-slate-200/80 p-1.5 text-sm text-[#4B5563] lg:flex">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return <DesktopDropdown key={item.label} item={item} pathname={pathname} />;
              }
              const active = matchPath(pathname, item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={
                      active
                        ? 'block rounded-full bg-white px-4 py-1.5 font-medium text-[#6366F1] shadow-sm'
                        : 'block rounded-full px-4 py-1.5 transition hover:text-[#6366F1]'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/register" className="hidden text-sm font-medium text-[#4B5563] transition hover:text-[#6366F1] sm:inline">
              যোগ দিন
            </Link>
            <a
              href="https://web.schoolsoftwarebd.com" target='_blank'
              className="hidden items-center gap-2 rounded-full bg-[#0F172A] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:inline-flex"
            >
              ডেমো দেখুন <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              type="button"
              aria-label="মেনু"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F172A] text-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            data-lenis-prevent
            className="mt-3 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-3xl border border-white/10 bg-[#161d33] p-3 shadow-2xl lg:hidden"
          >
            <ul className="text-base text-slate-200">
              {NAV_ITEMS.map((item) => {
                if (item.children) {
                  return (
                    <MobileGroup
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      onNavigate={() => setMobileMenuOpen(false)}
                    />
                  );
                }
                const active = matchPath(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`block rounded-xl px-4 py-3 transition hover:bg-white/5 ${active ? 'bg-white/5 font-medium text-white' : ''
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/10 p-2 pt-4">
              <a href="#" className="rounded-full border border-white/30 py-2.5 text-center text-sm font-medium text-white">
                লগইন
              </a>
              <a href="https://web.schoolsoftwarebd.com" target='_blank' className="rounded-full bg-[#6366F1] py-2.5 text-center text-sm font-medium text-white">
                ডেমো দেখুন
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
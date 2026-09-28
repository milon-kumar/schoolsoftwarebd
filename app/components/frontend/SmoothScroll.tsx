"use client";

/**
 * SmoothScroll — HTML সাইটের মতো "butter smooth" scroll + scroll reveal
 * --------------------------------------------------------------------
 * 1) Lenis দিয়ে smooth wheel scroll
 * 2) একই পেজের anchor link (#contact, #top …) smooth ভাবে scroll হয়
 * 3) পেজ বদলালে (route change) উপরে ফিরে যায়, URL-এ #hash থাকলে সেখানে যায়
 * 4) যে element-এ data-reveal আছে, সেটা স্ক্রিনে এলে fade-up হয়ে আসে
 *    - data-stagger="3" দেওয়া parent-এর ভেতরের card-গুলো একটা একটা করে আসে
 *    - নির্দিষ্ট delay: style={{ '--reveal-delay': '120ms' }}
 *
 * layout.tsx-এ একবার <SmoothScroll /> বসালেই সব পেজে কাজ করবে।
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const SCROLL_OFFSET = -16; // anchor-এ গিয়ে উপরে একটু ফাঁকা রাখে

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* অন্য component থেকে smooth scroll করার জন্য (যেমন: ফর্মের ভুল ঘরে যাওয়া) */
let activeLenis: Lenis | null = null;

export function smoothScrollTo(target: HTMLElement | number, offset = SCROLL_OFFSET) {
  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: typeof target === "number" ? 0 : offset });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  const scrollToTarget = (target: HTMLElement | number, immediate = false) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : SCROLL_OFFSET, immediate });
      return;
    }
    const top =
      typeof target === "number"
        ? target
        : target.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
    window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
  };

  /* ---------- 1) Lenis smooth scroll ---------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    activeLenis = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // ছবি/ফন্ট লোড হয়ে পেজের উচ্চতা বদলালে Lenis-কে জানাই
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, []);

  /* ---------- 2) একই পেজের #anchor link smooth scroll ---------- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
      if (!samePage || !url.hash) return;

      // href="#" (placeholder link) — পেজ লাফ দিয়ে উপরে যাওয়া বন্ধ
      if (url.hash === "#") {
        e.preventDefault();
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      // Next <Link> নিজে instant jump করে — capture phase-এ আগেই ধরে নিই
      e.preventDefault();
      e.stopPropagation();
      scrollToTarget(target);
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* ---------- 3) Route change: উপরে যাও / #hash-এ যাও ---------- */
  useEffect(() => {
    if (isFirstRoute.current) {
      // প্রথম লোডে URL-এ #hash থাকলে (যেমন /#contact) সেখানে যাও
      isFirstRoute.current = false;
      const hash = window.location.hash;
      if (hash.length > 1) {
        const t = window.setTimeout(() => {
          const el = document.getElementById(decodeURIComponent(hash.slice(1)));
          if (el) scrollToTarget(el, true);
        }, 60);
        return () => window.clearTimeout(t);
      }
      return;
    }

    const hash = window.location.hash;
    const t = window.setTimeout(() => {
      lenisRef.current?.resize();
      const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (el) scrollToTarget(el);
      else scrollToTarget(0, true);
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  /* ---------- 4) Scroll reveal (fade-up) ---------- */
  useEffect(() => {
    const root = document.documentElement;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      root.classList.add("reveal-off");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // className নয়, attribute — React re-render করলেও মুছে যাবে না
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const track = (el: HTMLElement) => {
      if (el.hasAttribute("data-revealed")) return;
      const parent = el.parentElement;
      if (parent?.hasAttribute("data-stagger") && !el.style.getPropertyValue("--reveal-delay")) {
        const cols = Number(parent.getAttribute("data-stagger")) || 3;
        const index = Array.prototype.indexOf.call(parent.children, el);
        el.style.setProperty("--reveal-delay", `${(index % cols) * 110}ms`);
      }
      io.observe(el);
    };

    const scan = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach(track);
    };

    scan(document);

    // পরে render হওয়া element (নতুন পেজ, mobile menu ইত্যাদি)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-reveal")) track(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
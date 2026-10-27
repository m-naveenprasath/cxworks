'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Site-wide scroll effects:
 *  - the thin progress bar at the top,
 *  - the back-to-top button,
 *  - reveal-on-scroll: section headings and grid/flex children below the fold get [data-sr]
 *    and animate in (CSS in styles/globals.css) when they enter the viewport.
 */
export function SiteEffects() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const se = document.scrollingElement || document.documentElement;
      const y = window.scrollY || se.scrollTop || 0;
      const max = se.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      if (top.current) {
        const on = y > window.innerHeight * 0.8 && window.innerWidth >= 760;
        top.current.style.opacity = on ? '1' : '0';
        top.current.style.pointerEvents = on ? 'auto' : 'none';
      }
    };
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => reveal(), [pathname]);

  return (
    <>
      <div
        ref={bar}
        data-prog-bar=""
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          height: '2px',
          zIndex: '200',
          background: 'var(--acc)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
      <button
        ref={top}
        className="hv-9ccb562"
        data-totop=""
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          right: 'clamp(14px,2.5vw,28px)',
          bottom: 'clamp(14px,2.5vw,28px)',
          zIndex: '95',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          fontSize: '20px',
          color: 'var(--acc)',
          background:
            'radial-gradient(120% 120% at 30% 0%, rgba(var(--glass),.28), rgba(var(--glass),.06) 55%), rgba(var(--acc-rgb),.12)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          border: '1px solid rgba(var(--glass),.28)',
          boxShadow:
            'inset 0 1px 0 rgba(var(--glass),.45), inset 0 -1px 0 rgba(var(--glass),.08), 0 14px 32px -14px rgba(var(--acc-rgb),.55)',
          cursor: 'pointer',
          opacity: '0',
          pointerEvents: 'none',
          transform: 'translateY(16px)',
          transition: 'opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1), border-color .3s',
        }}
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
          <path
            d="M9 14 V4 M4.5 8.5 L9 4 L13.5 8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}

const NOT_HERO = 'main section:not([data-screen-label$="hero"])';
const GRIDS = '[style*="display: grid"],[style*="display:grid"],[style*="flex-wrap: wrap"],[style*="flex-wrap:wrap"]';

/** Tags elements for the reveal animation and observes them. Returns a cleanup function. */
function reveal() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-in', '1');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -6% 0px' },
  );
  // Content already on screen stays put; only content below the fold animates in.
  const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;
  const mark = (el: Element, i?: number) => {
    if (!below(el)) return;
    el.setAttribute('data-sr', '');
    if (i != null) (el as HTMLElement).style.setProperty('--sr-i', String(i % 8));
  };

  const raf = requestAnimationFrame(() => {
    document.querySelectorAll(`${NOT_HERO} h2:not([data-sr]):not([data-reveal])`).forEach((el) => mark(el));
    document.querySelectorAll(`${NOT_HERO} :is(${GRIDS}):not([data-ngpanel] *)`).forEach((g) => {
      [...g.children].slice(0, 16).forEach((el, i) => {
        if (el.hasAttribute('data-sr') || el.hasAttribute('data-reveal') || el.tagName.toLowerCase() === 'svg') return;
        mark(el, i);
        const s = el.getAttribute('style') || '';
        const deco = !el.textContent?.trim() && !el.querySelector('img,svg');
        if (
          !deco &&
          el.tagName !== 'BUTTON' &&
          !el.querySelector('input,select,textarea,form') &&
          el.getAttribute('aria-hidden') !== 'true' &&
          (el.tagName === 'A' || /border: ?1px solid|border-radius/.test(s))
        )
          el.setAttribute('data-srcard', '');
      });
    });
    document.querySelectorAll(`${NOT_HERO} [data-reveal]:not([data-srcard])`).forEach((el) => {
      const s = el.getAttribute('style') || '';
      if (
        /border: ?1px solid/.test(s) &&
        /border-radius/.test(s) &&
        !el.querySelector('input,select,textarea,form') &&
        el.textContent?.trim() &&
        (el as HTMLElement).offsetWidth < 900
      )
        el.setAttribute('data-srcard', '');
    });
    document.querySelectorAll('[data-reveal]:not([data-in]), [data-sr]:not([data-in])').forEach((el) => io.observe(el));
  });

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
  };
}

'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { pad2 } from '@/lib/links';
import { NAV, navSection, type NavLink, type NavSection } from '@/lib/nav';
import { SITE } from '@/lib/site';
import { A } from '@/components/ui/A';

type Menu = 'diagnose' | 'build' | 'run';

const navItem: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  minHeight: '36px',
  padding: '0 clamp(9px,1vw,14px)',
  borderRadius: '999px',
  fontSize: '14px',
  border: '0',
  cursor: 'pointer',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  transition: 'background .3s',
};
const ctaBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  borderRadius: '999px',
  background: 'var(--acc)',
  color: 'var(--on-acc)',
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: '600',
  whiteSpace: 'nowrap',
  border: '0',
  cursor: 'pointer',
  transition: 'background .3s',
};
const menuNum: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '12px',
  color: 'var(--muted2)',
  minWidth: '20px',
};
const menuTitle: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: '500',
  fontSize: '24px',
  letterSpacing: '-0.02em',
};

const color = (on: boolean) => (on ? 'var(--acc)' : 'var(--ink3)');

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const active: NavSection = navSection(pathname);
  const [open, setOpen] = useState<Menu | null>(null);
  const [menu, setMenu] = useState(false);
  const opened = useRef(0);

  // Close menus on navigation (reset during render when the path changes) and on Escape.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(null);
    setMenu(false);
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(null), setMenu(false));
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // `t` is the event timestamp. A click right after hover-open keeps the menu open (touch devices fire both).
  const enter = (k: Menu, t: number) => {
    if (open !== k) opened.current = t;
    setOpen(k);
  };
  const toggle = (k: Menu, t: number) => setOpen((cur) => (cur === k && t - opened.current > 600 ? null : k));

  const dropdown = (k: Menu, label: string, items: NavLink[]) => {
    const on = open === k;
    return (
      <div onMouseEnter={(e) => enter(k, e.timeStamp)} style={{ position: 'relative' }}>
        <button
          onClick={(e) => toggle(k, e.timeStamp)}
          aria-expanded={on}
          style={{
            ...navItem,
            color: color(active === k),
            background: on ? 'rgba(var(--acc-rgb),.12)' : 'transparent',
          }}
        >
          {label}
          <span
            aria-hidden="true"
            style={{ fontSize: '10px', transform: on ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}
          >
            ▾
          </span>
        </button>
        {on && (
          <div style={{ position: 'absolute', top: '100%', left: '0', paddingTop: '12px', zIndex: '5' }}>
            <div
              style={{
                width: 'max-content',
                minWidth: '300px',
                maxWidth: 'calc(100vw - 48px)',
                padding: '8px',
                borderRadius: '22px',
                background: 'var(--surface)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(var(--ink-rgb),.12)',
                boxShadow: '0 30px 60px -20px rgba(var(--shade),.9)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'cxFade .3s cubic-bezier(.16,1,.3,1)',
              }}
            >
              {items.map((m, i) => (
                <A
                  key={m.href}
                  className="hv-a228edf"
                  href={m.href}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '30px auto 16px',
                    gap: '14px',
                    alignItems: 'center',
                    minHeight: '44px',
                    padding: '8px 14px',
                    borderRadius: '14px',
                    color: 'var(--ink)',
                    fontSize: '14.5px',
                    transition: 'background .25s',
                  }}
                >
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px', color: 'var(--acc)' }}>
                    {pad2(i)}
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>{m.l}</span>
                  <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
                    →
                  </span>
                </A>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const link = (href: string, label: string, section: NavSection) => (
    <A
      className="hv-7891572"
      href={href}
      onMouseEnter={() => setOpen(null)}
      style={{ ...navItem, background: 'transparent', color: color(active === section) }}
    >
      {label}
    </A>
  );

  return (
    <>
      <header
        data-mhdr=""
        onMouseLeave={() => setOpen(null)}
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          right: '12px',
          maxWidth: '1280px',
          margin: '0 auto',
          zIndex: '100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '6px 6px 6px 20px',
          borderRadius: '999px',
          background:
            'linear-gradient(140deg, rgba(var(--glass),.12), rgba(var(--glass),.03) 50%, rgba(var(--glass),.07))',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: '1px solid rgba(var(--glass),.16)',
          boxShadow:
            'inset 0 1px 0 rgba(var(--glass),.32), inset 0 -1px 0 rgba(var(--glass),.06), 0 16px 40px -16px rgba(var(--shade),.85)',
        }}
      >
        <A href="/" aria-label="CXWorks home" style={{ display: 'flex', alignItems: 'center', minHeight: '44px' }}>
          <img
            data-logo=""
            src={SITE.logo}
            alt="CXWorks"
            width={120}
            height={24}
            style={{ height: '24px', width: 'auto', display: 'block' }}
          />
        </A>

        {/* Desktop (>= 880px) */}
        <div className="cx-desk">
          <nav
            aria-label="Main"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              padding: '4px',
              borderRadius: '999px',
              background: 'rgba(var(--shade),.22)',
              boxShadow: 'inset 0 1px 2px rgba(var(--shade),.35)',
              width: 'max-content',
              maxWidth: '100%',
              height: '42px',
              boxSizing: 'border-box',
            }}
          >
            {dropdown('diagnose', 'Diagnose', NAV.diagnose)}
            {dropdown('build', 'Build', NAV.build)}
            {dropdown('run', 'Run', NAV.run)}
            {link('/nine-gates/', 'Nine Gates', 'nine-gates')}
            {link('/insights/', 'Insights', 'insights')}
            {link('/about/', 'Contact us', 'about')}
            <A
              className="hv-7891572"
              href={SITE.productsUrl}
              target="_blank"
              onMouseEnter={() => setOpen(null)}
              style={{ ...navItem, background: 'transparent', color: 'var(--ink3)' }}
            >
              {'Products '}
              <span aria-hidden="true" style={{ fontSize: '13px' }}>
                ↗
              </span>
            </A>
          </nav>
          <A
            className="hv-c30ce7c"
            href="/free-ai-scan/"
            data-magnet=""
            style={{ ...ctaBtn, minHeight: '46px', padding: '0 22px', fontSize: '14.5px' }}
          >
            Free AI scan
          </A>
        </div>

        {/* Mobile (< 880px) */}
        <div className="cx-mob">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <A
              className="hv-c30ce7c"
              data-mcta=""
              href="/free-ai-scan/"
              style={{ ...ctaBtn, minHeight: '44px', padding: '0 16px', fontSize: '14px' }}
            >
              Free AI scan
            </A>
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              style={{
                width: '44px',
                height: '44px',
                flex: '0 0 44px',
                borderRadius: '50%',
                border: '1px solid rgba(var(--ink-rgb),.2)',
                background: 'rgba(var(--glass),.06)',
                color: 'var(--ink)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '0',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  borderRadius: '2px',
                  background: 'currentColor',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '16px',
                  height: '1.5px',
                  borderRadius: '2px',
                  background: 'currentColor',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '10px',
                  height: '1.5px',
                  borderRadius: '2px',
                  background: 'currentColor',
                  marginLeft: '6px',
                }}
              />
            </button>
          </div>
        </div>
      </header>
      {menu && <MobileMenu close={() => setMenu(false)} />}
    </>
  );
}

const GROUPS: { t: string; items: NavLink[] }[] = [
  { t: 'Diagnose', items: NAV.diagnose },
  { t: 'Build', items: NAV.build },
  { t: 'Run', items: NAV.run },
  { t: 'Nine Gates', items: [{ l: 'The framework', href: '/nine-gates/' }, ...NAV.solutions] },
];
const LINKS: (NavLink & { arr: string })[] = [
  { l: 'Insights', href: '/insights/', arr: '→' },
  { l: 'Contact us', href: '/about/', arr: '→' },
  { l: 'Products', href: SITE.productsUrl, target: '_blank', arr: '↗' },
];

function MobileMenu({ close }: { close: () => void }) {
  const [acc, setAcc] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-mmenu=""
      style={{
        position: 'fixed',
        inset: '0',
        zIndex: '150',
        background:
          'radial-gradient(70% 40% at 85% 0%, rgba(var(--acc-rgb),.18), transparent 70%), radial-gradient(60% 40% at 0% 60%, rgba(40,90,180,.12), transparent 70%), rgba(12,13,15,.5)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(170%)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'cxFade .25s both',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 13px 13px 22px',
          borderBottom: '1px solid rgba(var(--ink-rgb),.1)',
        }}
      >
        <img
          data-logo=""
          src={SITE.logo}
          alt="CXWorks"
          width={90}
          height={18}
          style={{ height: '18px', width: 'auto' }}
        />
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid rgba(var(--ink-rgb),.2)',
            background: 'rgba(var(--glass),.06)',
            color: 'var(--ink)',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          flex: '1',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '8px 22px 24px',
          animation: 'cxSheet .35s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {GROUPS.map((g, gi) => {
            const on = acc === gi;
            return (
              <div key={g.t} style={{ borderBottom: '1px solid rgba(var(--ink-rgb),.1)' }}>
                <button
                  onClick={() => setAcc(on ? null : gi)}
                  aria-expanded={on}
                  style={{
                    width: '100%',
                    minHeight: '64px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'none',
                    border: '0',
                    padding: '12px 0',
                    color: on ? 'var(--acc)' : 'var(--ink)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                    <span style={menuNum}>{pad2(gi)}</span>
                    <span style={menuTitle}>{g.t}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: '0 0 32px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      color: on ? 'var(--acc)' : 'var(--muted)',
                      transform: on ? 'rotate(180deg)' : 'none',
                      transition: 'transform .3s, background .3s',
                      fontSize: '13px',
                    }}
                  >
                    ▾
                  </span>
                </button>
                {on && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '4px 0 16px',
                      borderTop: '1px solid rgba(var(--ink-rgb),.08)',
                      animation: 'cxSheet .3s both',
                    }}
                  >
                    {g.items.map((m, i) => (
                      <A
                        key={m.href}
                        className="hv-3ffee7d"
                        href={m.href}
                        target={m.target}
                        onClick={close}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '36px minmax(0,1fr) 32px',
                          alignItems: 'center',
                          gap: '12px',
                          minHeight: '54px',
                          color: 'var(--ink)',
                        }}
                      >
                        <span
                          style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12.5px', color: 'var(--acc)' }}
                        >
                          {pad2(i)}
                        </span>
                        <span style={{ fontSize: '16px', lineHeight: '1.3' }}>{m.l}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--acc)',
                            color: 'var(--on-acc)',
                            fontSize: '14px',
                            boxShadow: '0 6px 18px -6px rgba(var(--acc-rgb),.7)',
                          }}
                        >
                          →
                        </span>
                      </A>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {LINKS.map((m, i) => (
            <Fragment key={m.href}>
              <A
                className="hv-3ffee7d"
                href={m.href}
                target={m.target}
                onClick={close}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  minHeight: '64px',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(var(--ink-rgb),.1)',
                  color: 'var(--ink)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                  <span style={menuNum}>{pad2(i + GROUPS.length)}</span>
                  <span style={menuTitle}>{m.l}</span>
                </span>
                <span aria-hidden="true" style={{ fontSize: '16px', color: 'var(--acc)' }}>
                  {m.arr}
                </span>
              </A>
            </Fragment>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: '14px 22px calc(14px + env(safe-area-inset-bottom))',
          borderTop: '1px solid rgba(var(--ink-rgb),.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <A
          className="hv-c30ce7c"
          href="/free-ai-scan/"
          onClick={close}
          style={{ ...ctaBtn, display: 'flex', minHeight: '54px', fontSize: '16px' }}
        >
          Get your free AI scan →
        </A>
        <A
          className="hv-7891572"
          href={'mailto:' + SITE.email}
          style={{
            textAlign: 'center',
            fontSize: '13.5px',
            color: 'var(--muted)',
            minHeight: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {SITE.email}
        </A>
      </div>
    </div>
  );
}

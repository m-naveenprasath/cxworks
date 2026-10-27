'use client';

import { useState, type MouseEvent } from 'react';
import { ui } from '@/components/ui/styles';

export function CopyLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      style={{
        marginLeft: 'auto',
        background: 'none',
        border: '0',
        padding: '0',
        color: 'var(--acc)',
        font: 'inherit',
        letterSpacing: 'inherit',
        textTransform: 'inherit',
        cursor: 'pointer',
      }}
    >
      {copied ? 'Link copied' : 'Copy link'}
    </button>
  );
}

/** "On this page" navigation. Collapsible on small screens (see [data-toc] in globals.css). */
export function PostToc({ items }: { items: { n: string; t: string; id: string }[] }) {
  const [open, setOpen] = useState(false);
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    history.replaceState(null, '', '#' + id);
  };
  return (
    <>
      <button
        data-tocbtn=""
        onClick={() => setOpen((x) => !x)}
        aria-expanded={open}
        style={{
          display: 'none',
          width: '100%',
          minHeight: '52px',
          padding: '0 18px',
          borderRadius: '16px',
          border: '1px solid rgba(var(--ink-rgb),.14)',
          background: 'var(--surface)',
          color: 'var(--ink)',
          fontFamily: "'Montserrat',sans-serif",
          fontSize: '15px',
          fontWeight: '500',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        On this page
        <span
          aria-hidden="true"
          style={{ color: 'var(--acc)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}
        >
          ▾
        </span>
      </button>
      <nav
        aria-label="On this page"
        data-toc=""
        data-open={open}
        style={{ position: 'static', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <span style={{ ...ui.kicker, marginBottom: '10px' }}>On this page</span>
        {items.map((tc) => (
          <a
            key={tc.id}
            className="hv-3ffee7d"
            href={'#' + tc.id}
            onClick={(e) => go(e, tc.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minHeight: '44px',
              padding: '8px 0',
              border: '0',
              background: 'none',
              color: 'var(--ink3)',
              fontFamily: 'inherit',
              fontSize: '14.5px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '12px',
                color: 'var(--acc)',
                paddingTop: '2px',
              }}
            >
              {tc.n}
            </span>
            {tc.t}
          </a>
        ))}
      </nav>
    </>
  );
}

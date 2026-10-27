'use client';

import { useState } from 'react';
import { A } from '@/components/ui/A';
import { useTick } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface LoopBlock {
  eb?: string;
  h?: string;
}

const COLS = [
  {
    n: 'Diagnose',
    verb: 'Find',
    href: '/services/dcx-transformation/dcx-audit/',
    human: 'confirm the earliest failing gate and put a money value on fixing it.',
    signal: 'zero-result searches on 2,300 part numbers',
    watch: [1, 2],
  },
  {
    n: 'Build',
    verb: 'Fix',
    href: '/services/dcx-transformation/',
    human: 'design the fix, build it and check it before it ships.',
    signal: 'one product template slowing 9,000 pages',
    watch: [0, 2],
  },
  {
    n: 'Run',
    verb: 'Keep',
    href: '/run-pods/',
    human: 'review what changed each month and ship the next fixes.',
    signal: 'conversion dip on mobile checkout this week',
    watch: [1, 3],
  },
];
const WATCH = ['Catalog', 'Search', 'Funnel', 'AI answers'];

function Connector({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        height: '40px',
        width: '2px',
        margin: '0 auto',
        background: on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)',
        transition: 'background .4s ease',
      }}
    >
      <span
        style={{
          display: on ? 'block' : 'none',
          position: 'absolute',
          left: '-3px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--acc)',
          boxShadow: '0 0 0 4px rgba(var(--acc-rgb),.18)',
          animation: 'cxDrop 1.5s linear infinite',
        }}
      />
    </div>
  );
}

/** "AI watches, experts ship" diagram. Cycles through Diagnose → Build → Run; hover pins a stage. */
export function Loop({ b }: BlockProps<LoopBlock>) {
  const [tick] = useTick(9);
  const [hover, setHover] = useState<number | null>(null);
  const L = hover ?? Math.floor(tick / 3) % 3;
  const A0 = COLS[L];

  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div style={ui.head}>
        <p style={ui.eyebrow}>{b.eb}</p>
        {b.h && <h2 style={ui.h2}>{b.h}</h2>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div
          data-reveal=""
          style={{
            background: 'rgba(var(--acc-rgb),.08)',
            border: '1px solid rgba(var(--acc-rgb),.6)',
            borderRadius: '22px',
            padding: 'clamp(20px,2.4vw,30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(18px,1.6vw,22px)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--acc)',
                animation: 'cxPulse 1.6s ease-in-out infinite',
              }}
            />
            Always-on AI layer
          </span>
          <p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.55', color: 'var(--ink3)', maxWidth: '60ch' }}>
            Watches catalog, search, funnel and AI answers, and flags what changed.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
            {WATCH.map((t, i) => {
              const a = A0.watch.includes(i);
              return (
                <span
                  key={t}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    border: `1px solid ${a ? 'rgba(var(--acc-rgb),.7)' : 'rgba(var(--ink-rgb),.14)'}`,
                    background: a ? 'rgba(var(--acc-rgb),.14)' : 'transparent',
                    color: a ? 'var(--ink)' : 'var(--ink3)',
                    transition: 'all .4s ease',
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>
          <p
            style={{
              margin: '6px 0 0',
              fontSize: '13.5px',
              color: 'var(--acc)',
              minHeight: '1.4em',
              animation: 'cxFade .5s ease',
            }}
          >
            {'Flagged now: '}
            {A0.signal}
          </p>
        </div>
        <div
          data-mrail=""
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '0 16px',
          }}
        >
          {COLS.map((c, i) => {
            const on = i === L;
            return (
              <div key={c.n} style={{ display: 'flex', flexDirection: 'column' }}>
                <Connector on={on} />
                <A
                  href={c.href}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '10px',
                    padding: 'clamp(20px,2.2vw,28px)',
                    borderRadius: '20px',
                    border: `1px solid ${on ? 'rgba(var(--acc-rgb),.75)' : 'rgba(var(--ink-rgb),.12)'}`,
                    background: on ? 'rgba(var(--acc-rgb),.08)' : 'rgba(var(--glass),.03)',
                    transform: on ? 'translateY(-4px)' : 'none',
                    opacity: on ? '1' : '.7',
                    textDecoration: 'none',
                    color: 'var(--ink)',
                    transition: 'all .4s cubic-bezier(.2,.7,.2,1)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '600', fontSize: '20px' }}>
                      {c.n}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: 'var(--acc)',
                      }}
                    >
                      {c.verb}
                    </span>
                  </span>
                </A>
                <Connector on={on} />
              </div>
            );
          })}
        </div>
        <div
          data-reveal=""
          style={{
            border: '1px solid rgba(var(--ink-rgb),.28)',
            background: 'rgba(var(--glass),.05)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: '22px',
            padding: 'clamp(20px,2.4vw,30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(18px,1.6vw,22px)',
            }}
          >
            <span
              aria-hidden="true"
              style={{ color: 'var(--acc)', flex: 'none', display: 'inline-flex', paddingTop: '.25em' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                <path d="M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z" />
              </svg>
            </span>
            Human in the loop
          </span>
          <p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.55', color: 'var(--ink3)' }}>
            Experts check what AI flags, decide, build and ship.
          </p>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: '14px',
              color: 'var(--ink)',
              maxWidth: '60ch',
              animation: 'cxFade .5s ease',
            }}
          >
            <span style={{ color: 'var(--acc)', fontWeight: '600' }}>{A0.n}:</span> Experts {A0.human}
          </p>
        </div>
        <Connector on />
        <A
          className="hv-464937f"
          href="/nine-gates/"
          style={{
            alignSelf: 'center',
            width: 'min(100%, 640px)',
            boxSizing: 'border-box',
            border: '1px solid var(--acc)',
            borderRadius: '20px',
            padding: '18px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px 14px',
            textDecoration: 'none',
            color: 'var(--ink)',
            background: 'rgba(var(--acc-rgb),.05)',
          }}
        >
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '600', fontSize: '17px' }}>
            Cited, Clicked, Chosen
          </span>
          <span style={{ fontSize: '14.5px', color: 'var(--ink3)' }}>across all nine gates →</span>
        </A>
      </div>
    </section>
  );
}

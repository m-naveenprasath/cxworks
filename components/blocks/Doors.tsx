'use client';

import { useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

interface Door {
  pts: string[];
  eg: string;
  fix: string;
}
export interface DoorsBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** "I sell online" */
  sell: Door;
  /** "I get enquiries online" */
  enq: Door;
}

/** Two side-by-side cards: businesses that sell online vs. ones that take enquiries. */
export function Doors({ b }: BlockProps<DoorsBlock>) {
  const [hover, setHover] = useState<number | null>(null);
  const doors = [
    { t: 'I sell online', ...b.sell },
    { t: 'I get enquiries online', ...b.enq },
  ];
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}
      >
        {doors.map((d, i) => {
          const on = hover === i;
          const A = i === 0;
          return (
            <div
              key={d.t}
              data-reveal=""
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: on
                  ? A
                    ? 'linear-gradient(160deg, rgba(var(--acc-rgb),.16), rgba(var(--glass),.03) 55%)'
                    : 'linear-gradient(340deg, rgba(var(--accd-rgb),.18), rgba(var(--glass),.03) 60%)'
                  : 'linear-gradient(140deg, rgba(var(--glass),.075), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: `1px solid ${on ? (A ? 'rgba(var(--acc-rgb),.75)' : 'rgba(var(--accd-rgb),.6)') : 'rgba(var(--glass),.12)'}`,
                boxShadow: on
                  ? A
                    ? '0 24px 50px -24px rgba(var(--acc-rgb),.55), inset 0 1px 0 rgba(var(--glass),.2)'
                    : 'inset 0 0 0 1px rgba(var(--accd-rgb),.25), inset 0 -60px 80px -40px rgba(var(--accd-rgb),.22)'
                  : 'inset 0 1px 0 rgba(var(--glass),.16)',
                transform: on ? (A ? 'translateY(-6px)' : 'scale(1.015)') : 'none',
                transition:
                  'transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease, border-color .35s ease, background .45s ease',
                borderRadius: '22px',
                padding: 'clamp(22px,2.6vw,32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(24px,2.2vw,30px)',
                  letterSpacing: '-0.03em',
                  color: on ? (A ? 'var(--acc)' : 'var(--acc-soft)') : 'var(--ink)',
                  transition: 'color .35s ease',
                }}
              >
                {d.t}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(d.pts ?? []).map((p) => (
                  <span
                    key={p}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: '34px',
                      padding: '0 14px',
                      borderRadius: '999px',
                      border: `1px solid ${on ? (A ? 'rgba(var(--acc-rgb),.55)' : 'rgba(var(--accd-rgb),.5)') : 'rgba(var(--ink-rgb),.16)'}`,
                      background: on ? (A ? 'rgba(var(--acc-rgb),.1)' : 'rgba(var(--accd-rgb),.12)') : 'transparent',
                      fontSize: '13.5px',
                      color: on ? 'var(--ink)' : 'var(--ink3)',
                      transition: 'all .35s ease',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div
                style={{
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span style={ui.kicker}>Example</span>
                <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{d.eg}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '12px',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--acc)',
                  }}
                >
                  Fix
                </span>
                <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{d.fix}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

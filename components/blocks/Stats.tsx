'use client';

import { PROOF_STATS } from '@/lib/data';
import { useRevealProgress } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

const easeOutQuart = (q: number) => 1 - Math.pow(1 - q, 4);

/** Proof numbers (content/site/proof-stats.json) that count up when scrolled into view. */
export function Stats({ b }: BlockProps<object>) {
  const [ref, pk] = useRevealProgress<HTMLElement>(2200, easeOutQuart, 0.9);
  const stats = PROOF_STATS.filter((x) => !/team/i.test(x.t)).slice(0, 3);
  return (
    <section
      ref={ref}
      data-screen-label={b.label}
      data-proof=""
      style={{ ...ui.section, paddingTop: 'clamp(48px,6vw,80px)' }}
    >
      <div
        data-m2=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px' }}
      >
        {stats.map((st, i) => {
          const k = Math.max(0, Math.min(1, pk * 1.3 - i * 0.15));
          const m = String(st.v).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
          const v = m ? m[1] + Math.round(parseFloat(m[2]) * k) + m[3] : st.v;
          return (
            <div
              key={st.t}
              className="hv-13b5983"
              data-reveal=""
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(var(--acc-rgb),.10)',
                border: '1px solid rgba(var(--acc-rgb),.55)',
                borderRadius: '22px',
                padding: '0',
                isolation: 'isolate',
                transition:
                  'transform .45s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .45s, background .35s, opacity .9s cubic-bezier(.16,1,.3,1)',
                transitionDelay: i * 120 + 'ms',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '21px',
                  padding: 'clamp(22px,2.4vw,30px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '600',
                    fontSize: 'clamp(44px,5vw,72px)',
                    letterSpacing: '-0.05em',
                    lineHeight: '1',
                    color: 'var(--acc)',
                  }}
                >
                  {v}
                </span>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '16px', fontWeight: '500' }}>
                  {st.t}
                </span>
                <span style={{ margin: '0', fontSize: '14px', lineHeight: '1.55', color: 'var(--muted)' }}>{st.d}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

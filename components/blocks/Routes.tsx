'use client';

import { A } from '@/components/ui/A';
import { useTick } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface RoutesBlock {
  eb?: string;
  h?: string;
}

const STAGES = [
  {
    n: 'Diagnose',
    href: '/services/dcx-transformation/dcx-audit/',
    items: [
      'DCX Audit (flagship)',
      'SEO audit',
      'Technical SEO audit',
      'AI visibility audit',
      'CRO audit',
      'Digital Analytics audit',
      'Accessibility audit',
      'Digital Merchandising audit',
    ],
  },
  {
    n: 'Build',
    href: '/services/dcx-transformation/',
    items: [
      '90-day Build sprints',
      'Catalog and product data',
      'Search and templates',
      'Tracking setup',
      'Website development',
      'AI feed and content fixes',
    ],
  },
];
const ENTRY = [
  { t: '8 service pages', d: 'Each shows all 3 stages', href: '/services/dcx-transformation/' },
  { t: '3 solution pages', d: 'Buyer search terms', href: '/customer-experience-consulting/' },
];
const ENDS = [
  { t: 'Free AI scan', href: '/free-ai-scan/' },
  { t: 'DCX Audit', href: '/services/dcx-transformation/dcx-audit/' },
];
const line = { width: '2px', height: '28px', margin: '0 auto', background: 'rgba(var(--ink-rgb),.2)' } as const;

/** Site-map diagram: every route ends at the free AI scan or the DCX Audit (highlight alternates). */
export function Routes({ b }: BlockProps<RoutesBlock>) {
  const [tick] = useTick(9);
  const L = Math.floor(tick / 3) % 2;
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div style={ui.head}>
        <p style={ui.eyebrow}>{b.eb}</p>
        {b.h && <h2 style={ui.h2}>{b.h}</h2>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <A
          className="hv-84a942f"
          href="/nine-gates/"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '18px 20px',
            borderRadius: '18px',
            border: '1px solid rgba(var(--ink-rgb),.18)',
            background: 'rgba(var(--ink-rgb),.05)',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '17px',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          Home and Nine Gates hub
        </A>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '0 16px',
          }}
        >
          {STAGES.map((c) => (
            <div key={c.n} style={{ display: 'flex', flexDirection: 'column' }}>
              <div aria-hidden="true" style={line} />
              <A
                className="hv-6d9cbc8"
                href={c.href}
                style={{
                  ...ui.stack8,
                  padding: '20px 22px',
                  borderRadius: '18px',
                  border: '1px solid rgba(var(--ink-rgb),.12)',
                  background: 'rgba(var(--glass),.03)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  transition: 'all .3s ease',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '600', fontSize: '19px' }}>
                  {c.n}
                </span>
                {c.items.map((it) => (
                  <span key={it} style={{ fontSize: '14.5px', lineHeight: '1.4', color: 'var(--ink3)' }}>
                    {it}
                  </span>
                ))}
              </A>
            </div>
          ))}
        </div>
        <div aria-hidden="true" style={line} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '12px',
          }}
        >
          {ENTRY.map((e) => (
            <A
              key={e.t}
              className="hv-afdf513"
              href={e.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'center',
                textAlign: 'center',
                padding: '18px',
                borderRadius: '16px',
                border: '1px solid rgba(var(--ink-rgb),.12)',
                textDecoration: 'none',
                color: 'var(--ink)',
                transition: 'all .3s ease',
              }}
            >
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '600', fontSize: '16px' }}>{e.t}</span>
              <span style={{ fontSize: '13.5px', color: 'var(--ink3)' }}>{e.d}</span>
            </A>
          ))}
        </div>
        <div aria-hidden="true" style={line} />
        <div
          style={{
            border: '1px dashed rgba(var(--ink-rgb),.22)',
            borderRadius: '20px',
            padding: 'clamp(16px,2vw,24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span style={{ fontSize: '12px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
            Where every route ends
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {ENDS.map((e, i) => (
              <A
                key={e.t}
                href={e.href}
                style={{
                  flex: '1 1 180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '56px',
                  padding: '0 18px',
                  borderRadius: '14px',
                  border: `1px solid ${i === L ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)'}`,
                  background: i === L ? 'rgba(var(--acc-rgb),.12)' : 'transparent',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all .5s ease',
                }}
              >
                {e.t}
                <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
                  →
                </span>
              </A>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ALL_GATES, GATE_EXAMPLES } from '@/lib/data';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface JourneyBlock {
  eb?: string;
  h?: string;
  p?: string;
}

/** Tabbed walk through the nine gates, with an example for each kind of business. */
export function Journey({ b }: BlockProps<JourneyBlock>) {
  const [cur, setCur] = useState(0);
  const g = ALL_GATES[cur];
  const eg = GATE_EXAMPLES[g.name];
  const panel = {
    ...ui.glass,
    borderRadius: '22px',
    padding: 'clamp(22px,2.6vw,32px)',
    display: 'flex',
    flexDirection: 'column',
  } as const;
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div data-mchips="" style={ui.head}>
        <p style={ui.eyebrow}>{b.eb}</p>
        {b.h && <h2 style={ui.h2}>{b.h}</h2>}
        {b.p && <p style={ui.lead}>{b.p}</p>}
      </div>
      <div
        role="tablist"
        aria-label="Nine Gates"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 110px), 1fr))', gap: '6px' }}
      >
        {ALL_GATES.map((t, i) => {
          const on = cur === i;
          const pick = () => setCur(i);
          return (
            <button
              key={t.name}
              className="hv-f3109f6"
              role="tab"
              aria-selected={on}
              onClick={pick}
              onMouseEnter={pick}
              onFocus={pick}
              style={{
                minHeight: '64px',
                padding: '10px 12px',
                borderRadius: '14px',
                border: `1px solid ${on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)'}`,
                background: on ? 'rgba(var(--acc-rgb),.14)' : 'transparent',
                color: on ? 'var(--ink)' : 'var(--muted)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4px',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all .4s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  lineHeight: '1.3',
                  fontFamily: "'Montserrat',sans-serif",
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  opacity: '.8',
                }}
              >
                {t.n}
                {' · '}
                {t.stage}
              </span>
              <span
                style={{
                  display: 'block',
                  lineHeight: '1.3',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: '14.5px',
                }}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        style={{
          marginTop: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '16px',
        }}
      >
        <div style={{ ...panel, gap: '10px' }}>
          <span
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: '12px',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--acc)',
            }}
          >
            {g.n}
            {' · '}
            {g.stage}
          </span>
          <span style={{ ...ui.h3, fontSize: 'clamp(26px,2.4vw,34px)' }}>{g.name}</span>
          <span style={{ ...ui.body, color: 'var(--ink3)', fontSize: '16px' }}>{g.d}</span>
        </div>
        <div style={{ ...panel, gap: '8px' }}>
          <span style={ui.kicker}>I sell online</span>
          <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{eg?.sell}</span>
        </div>
        <div style={{ ...panel, gap: '8px' }}>
          <span style={ui.kicker}>I get enquiries online</span>
          <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{eg?.enq}</span>
        </div>
      </div>
    </section>
  );
}

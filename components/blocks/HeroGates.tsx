'use client';

import { useState } from 'react';
import { ALL_GATES } from '@/lib/data';
import { useTick } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';

const ICONS = [
  'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
  'M3 5h18M6 12h12M10 19h4',
  'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
  'M2 12s4-7 10-7s10 7 10 7s-4 7-10 7S2 12 2 12M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6',
  'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M11 18h2',
  'M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6zM9 12l2 2l4-4',
  'M3 4h3l2.5 11h10l2-8H7M10 20h.01M17 20h.01',
  'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01',
  'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4',
];
const SIGNALS = [
  'AI answers mention 2 competitors, not you.',
  '1 in 6 searches return no results.',
  'Ad landing pages miss the search intent.',
  'Specs missing on 38% of products.',
  'Mobile filters reset on back.',
  'Returns policy not shown near the button.',
  'Shipping cost appears at the last step.',
  'Delivery dates missing on 12 templates.',
  'No quick reorder for trade accounts.',
];

/** Home hero panel: AI "scans" the nine gates one by one; hovering a gate pins it. */
export function HeroGates() {
  const [tick, setTick] = useTick(9);
  const [hover, setHover] = useState<number | null>(null);
  const tk = hover ?? tick;

  return (
    <div
      data-ngpanel=""
      aria-label="AI agents watching the nine gates"
      style={{
        backdropFilter: 'blur(28px) saturate(170%)',
        WebkitBackdropFilter: 'blur(28px) saturate(170%)',
        background:
          'radial-gradient(60% 40% at 100% 0%, rgba(var(--acc-rgb),.14), transparent 70%), radial-gradient(55% 35% at 0% 0%, rgba(40,90,180,.12), transparent 70%), radial-gradient(70% 45% at 0% 100%, rgba(var(--acc-rgb),.16), transparent 70%), radial-gradient(55% 45% at 100% 85%, rgba(40,90,180,.16), transparent 70%), linear-gradient(150deg, rgba(var(--glass),.10), rgba(var(--glass),.025) 45%, rgba(var(--glass),.06)), rgba(10,12,14,.55)',
        border: '1px solid rgba(var(--glass),.18)',
        boxShadow:
          'inset 0 1px 0 rgba(var(--glass),.22), inset 0 0 0 1px rgba(var(--glass),.03), 0 30px 60px -30px rgba(0,0,0,.8)',
        borderRadius: '24px',
        padding: 'clamp(18px,2.4vw,28px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        animation: 'cxFade 1.2s .2s cubic-bezier(.16,1,.3,1) both',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <span style={ui.kicker}>Nine Gates · Example</span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--acc)',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(var(--acc-rgb),.45)' }} />
          Example
        </span>
      </div>
      <div
        onMouseLeave={() => {
          if (hover != null) setTick(hover);
          setHover(null);
        }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '8px' }}
      >
        {ALL_GATES.map((g, i) => {
          const on = i === tk;
          const seen = i < tk;
          return (
            <div
              key={g.name}
              onMouseEnter={() => setHover(i)}
              onClick={() => setHover(i)}
              style={{
                cursor: 'pointer',
                aspectRatio: '1.25/1',
                padding: '12px',
                borderRadius: '14px',
                border: `1px solid ${on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)'}`,
                background: on ? 'rgba(var(--acc-rgb),.16)' : 'rgba(var(--glass),.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all .6s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '11.5px',
                  whiteSpace: 'nowrap',
                  color: on ? 'var(--acc)' : 'var(--muted2)',
                }}
              >
                {g.n}
                {' · '}
                {g.stage}
              </span>
              <span
                aria-hidden="true"
                style={{
                  alignSelf: 'center',
                  width: 'clamp(40px,4.4vw,56px)',
                  height: 'clamp(40px,4.4vw,56px)',
                  borderRadius: '14px',
                  display: 'grid',
                  placeItems: 'center',
                  background: on ? 'rgba(var(--acc-rgb),.18)' : 'rgba(var(--ink-rgb),.05)',
                  color: on ? 'var(--acc)' : seen ? 'var(--ink3)' : 'var(--muted2)',
                  transition: 'all .6s cubic-bezier(.16,1,.3,1)',
                }}
              >
                <svg
                  width="55%"
                  height="55%"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={ICONS[i]} />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: 'clamp(12.5px,1vw,14.5px)',
                  fontWeight: '500',
                  color: on ? 'var(--ink)' : seen ? 'var(--ink3)' : 'var(--muted)',
                }}
              >
                {g.name}
              </span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          padding: '18px 20px',
          borderRadius: '22px',
          background: 'linear-gradient(120deg, rgba(var(--acc-rgb),.16), rgba(40,90,180,.12))',
          border: '1px solid rgba(var(--acc-rgb),.5)',
          boxShadow: 'inset 0 1px 0 rgba(var(--glass),.12)',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flex: 'none',
            width: '7px',
            height: '7px',
            marginTop: '8px',
            borderRadius: '50%',
            background: 'var(--acc)',
          }}
        />
        <span
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '14.5px',
            fontWeight: '500',
            lineHeight: '1.5',
            color: 'var(--ink)',
          }}
        >
          {ALL_GATES[tk].name}: {SIGNALS[tk]} Expert review queued.
        </span>
      </div>
    </div>
  );
}

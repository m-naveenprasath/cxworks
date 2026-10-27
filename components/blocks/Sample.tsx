import { ALL_GATES } from '@/lib/data';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface SampleBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** Product name shown in the sample header, e.g. "Free AI scan". */
  name: string;
}

const SCORES = [72, 41, 64, 58, 61, 55, 49, 70, 52];

/** Mock Nine Gate score report. */
export function Sample({ b }: BlockProps<SampleBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-reveal=""
        role="img"
        aria-label="Sample report: Nine Gate score 58 out of 100, earliest failing gate Findability"
        style={{
          ...ui.glass,
          borderRadius: '22px',
          padding: 'clamp(20px,3vw,36px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(20px,3vw,40px)',
          maxWidth: '1100px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={ui.kicker}>
            {'Sample · '}
            {b.name}
          </span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: '600',
                fontSize: 'clamp(56px,6vw,84px)',
                letterSpacing: '-0.05em',
                lineHeight: '1',
                color: 'var(--acc)',
              }}
            >
              58
            </span>
            <span style={{ fontSize: '18px', color: 'var(--muted)' }}>/ 100 Nine Gate score</span>
          </span>
          <div
            style={{
              padding: '14px',
              background: 'rgba(var(--acc-rgb),.10)',
              border: '1px solid rgba(var(--acc-rgb),.55)',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '12px',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--acc)',
              }}
            >
              Earliest failing gate
            </span>
            <span style={{ fontSize: '16px' }}>Findability: 1 in 6 searches return no results.</span>
          </div>
          <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
            Expert note: fix part-number search before running more checkout tests.
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ALL_GATES.map((g, i) => {
            const c = i === 1 ? '#E77A6A' : 'var(--acc)';
            return (
              <div
                key={g.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px minmax(0,1fr) 36px',
                  gap: '10px',
                  alignItems: 'center',
                  fontSize: '13.5px',
                }}
              >
                <span style={{ color: 'var(--ink3)' }}>{g.name}</span>
                <span
                  style={{
                    height: '8px',
                    borderRadius: '999px',
                    background: 'rgba(var(--ink-rgb),.08)',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      height: '100%',
                      width: SCORES[i] + '%',
                      background: c,
                      borderRadius: '999px',
                    }}
                  />
                </span>
                <span style={{ textAlign: 'right', color: c }}>{SCORES[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

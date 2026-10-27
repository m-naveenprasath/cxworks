import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface ProblemBlock {
  eb?: string;
  a: string;
  b?: string;
  /** [label, text] */
  lines: [string, string][];
}

export function Problem({ b }: BlockProps<ProblemBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '16px' }}>{b.eb}</p>
      <h2 style={{ ...ui.h2, maxWidth: '24ch' }}>
        {b.a} <span style={{ color: 'var(--acc)', fontStyle: 'italic', fontWeight: '400' }}>{b.b}</span>
      </h2>
      <div
        style={{
          marginTop: 'clamp(28px,3.4vw,48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '16px',
        }}
      >
        {b.lines.map(([k, v]) => (
          <div
            key={k}
            data-reveal=""
            style={{
              padding: '24px',
              borderRadius: '20px',
              border: '1px solid rgba(var(--ink-rgb),.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '12px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--acc)',
              }}
            >
              {k}
            </span>
            <span style={{ fontSize: '17px', lineHeight: '1.5', color: 'var(--ink)' }}>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface StepsBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** [step title, description] */
  items: [string, string][];
}

export function Steps({ b }: BlockProps<StepsBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}
      >
        {b.items.map(([k, v], i) => (
          <div
            key={k}
            data-reveal=""
            style={{
              padding: 'clamp(20px,2.2vw,28px)',
              borderRadius: '22px',
              border: '1px solid rgba(var(--ink-rgb),.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--acc)',
                display: 'grid',
                placeItems: 'center',
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '14px',
                color: 'var(--acc)',
              }}
            >
              {i + 1}
            </span>
            <span style={ui.h3}>{k}</span>
            <span style={ui.body}>{v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

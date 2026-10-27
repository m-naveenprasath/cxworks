import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface SplitBlock {
  eb?: string;
  /** What the AI agents do. */
  ai: string;
  /** What the human experts do. */
  hu: string;
}

export function Split({ b }: BlockProps<SplitBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '24px' }}>{b.eb}</p>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}
      >
        <div
          data-reveal=""
          style={{
            background: 'rgba(var(--acc-rgb),.10)',
            border: '1px solid rgba(var(--acc-rgb),.55)',
            borderRadius: '22px',
            padding: 'clamp(22px,2.6vw,32px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '600',
              fontSize: '17px',
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
            AI agents
          </span>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>{b.ai}</p>
        </div>
        <div
          data-reveal=""
          style={{
            ...ui.glass,
            borderRadius: '22px',
            padding: 'clamp(22px,2.6vw,32px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '600', fontSize: '17px' }}>Experts</span>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.55' }}>{b.hu}</p>
        </div>
      </div>
    </section>
  );
}

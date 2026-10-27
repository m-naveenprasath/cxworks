import { pad2 } from '@/lib/links';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface FactsBlock {
  eb?: string;
  /** [label, value]; value may contain line breaks. */
  items: [string, string][];
}

const ICONS = [
  'M13 2L4 14h7l-1 8l9-12h-7z',
  'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
  'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5l-2.5-.5l-.5-2.5z',
  'M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z',
];

export function Facts({ b }: BlockProps<FactsBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '24px' }}>{b.eb}</p>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}
      >
        {b.items.map(([k, v], i) => (
          <div
            key={k}
            className="hv-13b5983"
            data-reveal=""
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '22px',
              padding: '0',
              isolation: 'isolate',
              background: 'rgba(var(--acc-rgb),.10)',
              border: '1px solid rgba(var(--acc-rgb),.55)',
              transition:
                'transform .45s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .45s, background .35s, opacity .9s cubic-bezier(.16,1,.3,1)',
              transitionDelay: i * 120 + 'ms',
            }}
          >
            <div
              style={{
                position: 'relative',
                height: '100%',
                boxSizing: 'border-box',
                borderRadius: '21px',
                padding: 'clamp(22px,2.4vw,30px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '12px',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--acc)',
                  }}
                >
                  {pad2(i)}
                  {' · '}
                  {k}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'rgba(var(--acc-rgb),.14)',
                    color: 'var(--acc)',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={ICONS[i % 4]} />
                  </svg>
                </span>
              </span>
              <span
                style={{
                  whiteSpace: 'pre-line',
                  overflowWrap: 'anywhere',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(19px,1.6vw,23px)',
                  lineHeight: '1.3',
                  color: 'var(--ink)',
                  textWrap: 'pretty',
                }}
              >
                {v}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ALL_GATES, GATE_EXAMPLES, GATES } from '@/lib/data';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface GatesallBlock {
  eb?: string;
  h?: string;
}

const doorLabel = {
  fontSize: '11.5px',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: 'var(--muted2)',
} as const;

/** Every gate, grouped by stage, with an example for both kinds of business. */
export function Gatesall({ b }: BlockProps<GatesallBlock>) {
  return (
    <section
      data-screen-label={b.label}
      style={{ padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <div style={ui.head}>
        <p style={ui.eyebrow}>{b.eb}</p>
        <h2 style={ui.h2}>{b.h}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,4vw,56px)' }}>
        {GATES.map((st) => (
          <div key={st.stage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '8px 16px',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(var(--ink-rgb),.1)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(24px,2.4vw,32px)',
                  letterSpacing: '-0.03em',
                  color: 'var(--acc)',
                }}
              >
                {st.stage}.
              </span>
              <span style={{ fontSize: '16px', color: 'var(--muted)' }}>{st.tag}</span>
            </div>
            <div
              data-mrail=""
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '16px',
              }}
            >
              {st.gates.map(([name, d]) => {
                const n = ALL_GATES.find((a) => a.name === name)?.n;
                const eg = GATE_EXAMPLES[name];
                return (
                  <div
                    key={name}
                    className="hv-ba8ff82"
                    data-reveal=""
                    style={{
                      ...ui.glass,
                      borderRadius: '22px',
                      padding: 'clamp(20px,2.2vw,28px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      transition:
                        'border-color .4s, transform .4s cubic-bezier(.16,1,.3,1), opacity .9s cubic-bezier(.16,1,.3,1)',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: '12px',
                          letterSpacing: '.08em',
                          color: 'var(--acc)',
                        }}
                      >
                        {'GATE '}
                        {n}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: "'Montserrat',sans-serif",
                          fontWeight: '500',
                          fontSize: 'clamp(20px,1.8vw,24px)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {name}
                      </h3>
                      <span style={{ fontSize: '15px', lineHeight: '1.55', color: 'var(--ink3)', textWrap: 'pretty' }}>
                        {d}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={doorLabel}>I sell online</span>
                        <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--ink)' }}>{eg?.sell}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span style={doorLabel}>I get enquiries online</span>
                        <span style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--ink)' }}>{eg?.enq}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

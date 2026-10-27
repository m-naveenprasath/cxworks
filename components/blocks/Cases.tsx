import { SERVICE_METRICS, SERVICES, servicePath } from '@/lib/data';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

const METRICS = SERVICE_METRICS as Record<string, { value: string; label: string; gate: string } | undefined>;

/** "Results by solution": one headline number per service (content/site/service-metrics.json). */
export function Cases({ b }: BlockProps<object>) {
  return (
    <section
      data-screen-label={b.label}
      style={{ padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px 32px',
          marginBottom: 'clamp(28px,3.4vw,44px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={ui.eyebrow}>Results by solution</p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(30px,4vw,54px)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
              textWrap: 'balance',
            }}
          >
            One number for every solution.
          </h2>
        </div>
        <p style={{ margin: '0', maxWidth: '34ch', fontSize: '14px', lineHeight: '1.5', color: 'var(--muted)' }}>
          Typical results from client work. Figures are illustrative.
        </p>
      </div>
      <div
        data-mrail=""
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
          gap: '14px',
        }}
      >
        {SERVICES.map((s) => {
          const m = METRICS[s.slug] ?? { value: '—', label: '', gate: s.gates ?? '' };
          return (
            <A
              key={s.slug}
              className="hv-702eb0d"
              href={servicePath(s.slug)}
              data-reveal=""
              style={{
                background:
                  'linear-gradient(140deg, rgba(var(--glass),.075), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
                border: '1px solid rgba(var(--glass),.12)',
                boxShadow: 'inset 0 1px 0 rgba(var(--glass),.14)',
                borderRadius: '20px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                minHeight: '220px',
                boxSizing: 'border-box',
                color: 'var(--ink)',
                transition:
                  'border-color .35s, transform .35s cubic-bezier(.16,1,.3,1), opacity .9s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  background: 'rgba(var(--acc-rgb),.12)',
                  color: 'var(--acc)',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '12px',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.gate}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '600',
                    fontSize: 'clamp(40px,3.6vw,52px)',
                    letterSpacing: '-0.04em',
                    lineHeight: '1',
                    color: 'var(--acc)',
                  }}
                >
                  {m.value}
                </span>
                <span style={{ fontSize: '14.5px', lineHeight: '1.45', color: 'var(--ink3)', textWrap: 'pretty' }}>
                  {m.label}
                </span>
              </span>
              <span
                style={{
                  marginTop: 'auto',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: '14.5px',
                  lineHeight: '1.3',
                }}
              >
                {s.name}
                <span
                  aria-hidden="true"
                  style={{
                    flex: '0 0 28px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--acc)',
                    color: 'var(--on-acc)',
                    fontSize: '13px',
                  }}
                >
                  →
                </span>
              </span>
            </A>
          );
        })}
      </div>
    </section>
  );
}

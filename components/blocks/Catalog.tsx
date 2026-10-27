import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface CatalogBlock {
  eb?: string;
  h?: string;
  p?: string;
  chips?: string[];
  /** [what was fixed, the result], e.g. ["1 template", "9,000+ pages improved"] */
  big: [string, string];
}

export function Catalog({ b }: BlockProps<CatalogBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(28px,5vw,72px)',
          alignItems: 'center',
        }}
      >
        <div>
          <SectionHead eb={b.eb} h={b.h} p={b.p} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(b.chips ?? []).map((c) => (
              <span
                key={c}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '34px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(var(--ink-rgb),.16)',
                  fontSize: '13.5px',
                  color: 'var(--ink3)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div
          data-reveal=""
          style={{
            ...ui.glass,
            borderRadius: '22px',
            padding: 'clamp(28px,3.4vw,44px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '14px', color: 'var(--muted)' }}>
            {b.big[0]} fixed
          </span>
          <span
            aria-hidden="true"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '28px', color: 'var(--acc)' }}
          >
            ↓
          </span>
          <span
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '600',
              fontSize: 'clamp(40px,5vw,68px)',
              letterSpacing: '-0.05em',
              lineHeight: '1',
              color: 'var(--acc)',
            }}
          >
            {b.big[1]}
          </span>
          <div
            aria-hidden="true"
            style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px' }}
          >
            {Array.from({ length: 36 }, (_, i) => (
              <span key={i} style={{ aspectRatio: '1', borderRadius: '3px', background: 'rgba(var(--acc-rgb),.55)' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

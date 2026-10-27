import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface SeoBlock {
  eb?: string;
  h: string;
  /** Long-form paragraphs ("In depth" copy). */
  paras: string[];
}

export function Seo({ b }: BlockProps<SeoBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '880px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={ui.eyebrow}>{b.eb}</p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(28px,3.2vw,44px)',
              letterSpacing: '-0.035em',
              lineHeight: '1.1',
              textWrap: 'balance',
            }}
          >
            {b.h}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(b.paras ?? []).map((pa, i) => (
            <p
              key={i}
              data-reveal=""
              style={{
                margin: '0',
                fontSize: 'clamp(16px,1.2vw,17.5px)',
                lineHeight: '1.75',
                color: 'var(--ink3)',
                textWrap: 'pretty',
              }}
            >
              {pa}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

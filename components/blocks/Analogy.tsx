import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface AnalogyBlock {
  h: string;
  p?: string;
}

/** Large pull-quote. */
export function Analogy({ b }: BlockProps<AnalogyBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <blockquote
        style={{
          margin: '0',
          paddingLeft: 'clamp(0px,4vw,64px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p
          style={{
            margin: '0',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '500',
            fontSize: 'clamp(28px,3.6vw,52px)',
            letterSpacing: '-0.035em',
            lineHeight: '1.12',
            maxWidth: '24ch',
          }}
        >
          {b.h}
        </p>
        <p style={{ ...ui.lead, color: 'var(--muted)' }}>{b.p}</p>
      </blockquote>
    </section>
  );
}

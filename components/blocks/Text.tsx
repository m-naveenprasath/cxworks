import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface TextBlock {
  eb?: string;
  h: string;
  p?: string;
}

/** Simple heading + paragraph section. */
export function Text({ b }: BlockProps<TextBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '16px' }}>{b.eb}</p>
      <h2 style={{ ...ui.h2, fontSize: 'clamp(26px,3vw,42px)', maxWidth: '30ch' }}>{b.h}</h2>
      {b.p && <p style={{ ...ui.lead, marginTop: '16px' }}>{b.p}</p>}
    </section>
  );
}

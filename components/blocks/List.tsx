import { pad2 } from '@/lib/links';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface ListBlock {
  eb?: string;
  h?: string;
  p?: string;
  items: string[];
  /** Show ✦ instead of 01, 02, … */
  check?: boolean;
}

export function List({ b }: BlockProps<ListBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(24px,4vw,64px)',
        }}
      >
        <div>
          <SectionHead eb={b.eb} h={b.h} p={b.p} />
        </div>
        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid rgba(var(--ink-rgb),.12)' }}>
          {b.items.map((t, i) => (
            <div
              key={i}
              data-reveal=""
              style={{
                display: 'grid',
                gridTemplateColumns: '44px minmax(0,1fr)',
                gap: '12px',
                padding: '20px 0',
                borderBottom: '1px solid rgba(var(--ink-rgb),.12)',
                fontSize: 'clamp(17px,1.4vw,19px)',
                lineHeight: '1.45',
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '13px',
                  color: 'var(--acc)',
                  paddingTop: '4px',
                }}
              >
                {b.check ? '✦' : pad2(i)}
              </span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

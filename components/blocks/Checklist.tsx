import { SectionHead } from '@/components/ui/SectionHead';
import { Bullet } from '@/components/ui/Sparkle';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface ChecklistBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** One card per gate; gate "All" is shown as "Across all gates". */
  groups: { gate: string; items: [string, string][] }[];
}

export function Checklist({ b }: BlockProps<ChecklistBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px' }}
      >
        {b.groups.map((g) => (
          <div
            key={g.gate}
            data-reveal=""
            style={{
              ...ui.glass,
              borderRadius: '22px',
              padding: 'clamp(20px,2.4vw,28px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontStyle: 'italic',
                fontSize: '26px',
                color: 'var(--acc)',
                marginBottom: '8px',
              }}
            >
              {g.gate === 'All' ? 'Across all gates' : g.gate}
            </span>
            {g.items.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '24px minmax(0,1fr)',
                  gap: '10px',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                }}
              >
                <Bullet />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '500', fontSize: '16px' }}>
                    {k}
                  </span>
                  <span style={{ fontSize: '14.5px', lineHeight: '1.5', color: 'var(--muted)' }}>{v}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

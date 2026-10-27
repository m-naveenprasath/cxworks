import { ALL_GATES } from '@/lib/data';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface GatechipsBlock {
  eb?: string;
  /** Comma-separated gate names this page covers, or a string starting with "All". */
  gates: string;
}

/** The nine gates as chips; the ones this page covers are highlighted. */
export function Gatechips({ b }: BlockProps<GatechipsBlock>) {
  const covers = (name: string) => b.gates.startsWith('All') || b.gates.includes(name);
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '20px' }}>{b.eb}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {ALL_GATES.map((g) => {
          const y = covers(g.name);
          return (
            <A
              key={g.name}
              className="hv-83ee23b"
              href="/nine-gates/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '44px',
                padding: '0 18px',
                borderRadius: '999px',
                border: `1px solid ${y ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)'}`,
                background: y ? 'var(--acc)' : 'transparent',
                color: y ? 'var(--on-acc)' : 'var(--muted2)',
                fontSize: '14.5px',
                fontWeight: y ? '600' : '400',
                boxShadow: y ? '0 10px 24px -12px rgba(var(--acc-rgb),.7)' : 'none',
                transition: 'transform .3s cubic-bezier(.16,1,.3,1), filter .3s',
              }}
            >
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '12px', opacity: '.8' }}>{g.n}</span>
              {g.name}
              <span aria-hidden="true" style={{ display: y ? 'inline' : 'none' }}>
                →
              </span>
            </A>
          );
        })}
      </div>
    </section>
  );
}

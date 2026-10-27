import { A } from '@/components/ui/A';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface DbrBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** What "Diagnose" includes for this service. */
  d: string;
  /** What "Build" includes for this service. */
  b: string;
  /** Run (retired column, kept in the data). */
  r?: string;
}

/** "Two ways to buy": Diagnose vs Build for a service. */
export function Dbr({ b }: BlockProps<DbrBlock>) {
  const cols = [
    { k: 'Diagnose', v: b.d, price: 'Fixed price', href: '/services/dcx-transformation/dcx-audit/' },
    { k: 'Build', v: b.b, price: 'Fixed price or sprint', href: '/services/dcx-transformation/' },
  ];
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}
      >
        {cols.map((c) => (
          <A
            key={c.k}
            className="hv-2961766"
            href={c.href}
            data-reveal=""
            style={{
              ...ui.glass,
              borderRadius: '22px',
              padding: 'clamp(20px,2.2vw,28px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: 'var(--ink)',
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: '12px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--acc)',
              }}
            >
              {c.k}
            </span>
            <span style={{ fontSize: '17px', lineHeight: '1.45' }}>{c.v}</span>
            <span style={{ marginTop: 'auto', fontSize: '13.5px', color: 'var(--muted)' }}>{c.price}</span>
          </A>
        ))}
      </div>
    </section>
  );
}

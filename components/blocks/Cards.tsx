import { A } from '@/components/ui/A';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

interface Card {
  t: string;
  d: string;
  meta?: string[];
  href?: string;
  badge?: string;
  /** Render as a plain card instead of a link. */
  noLink?: boolean;
}
export interface CardsBlock {
  eb?: string;
  h?: string;
  p?: string;
  items: Card[];
  cols?: number;
}

function Inner({ c, arrow }: { c: Card; arrow: boolean }) {
  return (
    <>
      {c.badge && (
        <span
          style={{
            alignSelf: 'flex-start',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'var(--acc)',
            color: 'var(--on-acc)',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '11.5px',
            fontWeight: '600',
          }}
        >
          {c.badge}
        </span>
      )}
      <span style={ui.h3}>{c.t}</span>
      <span style={{ ...ui.body, fontSize: '14.5px' }}>{c.d}</span>
      <span
        style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid rgba(var(--ink-rgb),.1)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '6px 12px',
          fontSize: '13.5px',
          color: 'var(--ink3)',
        }}
      >
        {(c.meta ?? []).map((m) => (
          <span key={m}>{m}</span>
        ))}
        {arrow && (
          <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
            →
          </span>
        )}
      </span>
    </>
  );
}

export function Cards({ b }: BlockProps<CardsBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-mrail=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}
      >
        {b.items.map((c) => {
          const style = {
            ...ui.glass,
            borderRadius: '22px',
            padding: 'clamp(20px,2.2vw,28px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: 'var(--ink)',
            borderColor: c.badge === 'Most complete' ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--glass),.12)',
            transition: 'border-color .4s, transform .4s cubic-bezier(.16,1,.3,1)',
          } as const;
          return c.noLink ? (
            <div key={c.t} data-reveal="" style={style}>
              <Inner c={c} arrow={false} />
            </div>
          ) : (
            <A key={c.t} className="hv-f71741d" href={c.href} data-reveal="" style={style}>
              <Inner c={c} arrow />
            </A>
          );
        })}
      </div>
    </section>
  );
}

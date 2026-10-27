import { A } from '@/components/ui/A';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface LadderBlock {
  eb?: string;
  h?: string;
  p?: string;
  items: { n: string; t: string; d: string; time: string; price: string; href: string; hi?: boolean }[];
  link?: { l: string; href: string };
}

/** Step-by-step offer ladder (free scan → audit → sprint …). `hi` marks the "Most complete" step. */
export function Ladder({ b }: BlockProps<LadderBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-mrail=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}
      >
        {b.items.map((s) => (
          <A
            key={s.n}
            className="hv-088d9e0"
            href={s.href}
            data-reveal=""
            style={{
              padding: 'clamp(20px,2.2vw,28px)',
              borderRadius: '22px',
              border: `1px solid ${s.hi ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)'}`,
              background: s.hi ? 'rgba(var(--acc-rgb),.10)' : 'rgba(var(--glass),.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              color: 'var(--ink)',
              transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
            }}
          >
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', color: 'var(--acc)' }}>
                {'Step '}
                {s.n}
              </span>
              {s.hi && (
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'var(--acc)',
                    color: 'var(--on-acc)',
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '11.5px',
                    fontWeight: '600',
                  }}
                >
                  Most complete
                </span>
              )}
            </span>
            <span style={ui.h3}>{s.t}</span>
            <span style={{ ...ui.body, fontSize: '14.5px' }}>{s.d}</span>
            <span
              style={{
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px',
                fontSize: '13.5px',
                color: 'var(--ink3)',
              }}
            >
              <span>{s.time}</span>
              <span style={{ color: 'var(--acc)' }}>{s.price}</span>
            </span>
          </A>
        ))}
      </div>
      {b.link && (
        <A
          className="hv-88d6c5d"
          href={b.link.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '44px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '15px',
            fontWeight: '500',
            color: 'var(--acc)',
            marginTop: '24px',
          }}
        >
          {b.link.l} <span aria-hidden="true">→</span>
        </A>
      )}
    </section>
  );
}

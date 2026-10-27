import { pad2 } from '@/lib/links';
import type { LinkTuple } from '@/lib/types';
import { A } from '@/components/ui/A';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface StagesBlock {
  eb?: string;
  h?: string;
  p?: string;
  items: { slug: string; name: string; verb: string; line: string; links: LinkTuple[] }[];
}

export function Stages({ b }: BlockProps<StagesBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-mrail=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px' }}
      >
        {b.items.map((s, i) => (
          <div
            key={s.slug}
            data-reveal=""
            style={{
              ...ui.glass,
              borderRadius: '22px',
              padding: 'clamp(22px,2.4vw,30px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <span style={ui.kicker}>
              {pad2(i)}
              {' · '}
              {s.verb}
            </span>
            <h3 style={{ ...ui.h3, fontSize: 'clamp(28px,2.6vw,36px)', letterSpacing: '-0.035em' }}>{s.name}</h3>
            <p style={ui.body}>{s.line}</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {s.links.map(([l, href]) => (
                <A
                  key={l}
                  className="hv-3ffee7d"
                  href={href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                    alignItems: 'center',
                    minHeight: '44px',
                    borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                    fontSize: '15px',
                    color: 'var(--ink)',
                  }}
                >
                  {l}
                  <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
                    →
                  </span>
                </A>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        data-reveal=""
        style={{
          marginTop: '16px',
          background: 'rgba(var(--acc-rgb),.10)',
          border: '1px solid rgba(var(--acc-rgb),.55)',
          borderRadius: '22px',
          padding: 'clamp(18px,2.2vw,26px) clamp(20px,2.6vw,32px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px 28px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '17px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--acc)',
              animation: 'cxPulse 1.6s ease-in-out infinite',
            }}
          />
          AI agent layer
        </span>
        <span style={{ fontSize: '15.5px', color: 'var(--ink)', flex: '1 1 320px' }}>
          Runs across all three stages, watching all nine gates, every day. Experts decide before anything ships.
        </span>
      </div>
    </section>
  );
}

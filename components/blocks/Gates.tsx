import { GATES } from '@/lib/data';
import { pad2 } from '@/lib/links';
import { A } from '@/components/ui/A';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface GatesBlock {
  eb?: string;
  h?: string;
  p?: string;
  link?: { l: string; href: string };
}

/** The nine gates grouped by stage (Cited / Clicked / Chosen), from content/site/gates.json. */
export function Gates({ b }: BlockProps<GatesBlock>) {
  let n = 0;
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(20px,5vw,64px)',
          top: 'clamp(40px,5vw,72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3,14px)',
          gap: '6px',
          opacity: '.5',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 9 }, (_, i) =>
          i === 4 ? (
            <span key={i} style={{ height: '14px', background: 'var(--acc)', borderRadius: '3px' }} />
          ) : (
            <span
              key={i}
              style={{ height: '14px', border: '1px solid rgba(var(--acc-rgb),.5)', borderRadius: '3px' }}
            />
          ),
        )}
      </div>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-mrail=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px' }}
      >
        {GATES.map((gc) => (
          <div
            key={gc.stage}
            data-reveal=""
            style={{
              ...ui.glass,
              borderRadius: '22px',
              padding: 'clamp(22px,2.4vw,30px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(30px,3vw,40px)',
                  letterSpacing: '-0.04em',
                  color: 'var(--acc)',
                  fontStyle: 'italic',
                }}
              >
                {gc.stage}
              </span>
              <span style={{ fontSize: '15px', color: 'var(--muted)' }}>{gc.tag}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {gc.gates.map(([name, d]) => (
                <div
                  key={name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '34px minmax(0,1fr)',
                    gap: '10px',
                    padding: '14px 0',
                    borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: '12.5px',
                      color: 'var(--acc)',
                      paddingTop: '3px',
                    }}
                  >
                    {pad2(n++)}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: '500', fontSize: '17px' }}>
                      {name}
                    </span>
                    <span style={{ fontSize: '14.5px', lineHeight: '1.5', color: 'var(--muted)' }}>{d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
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

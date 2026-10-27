'use client';

import { useId, useState } from 'react';
import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface FaqBlock {
  eb?: string;
  h?: string;
  p?: string;
  /** [question, answer]. Also emitted as FAQPage structured data. */
  items: [string, string][];
}

/** Accordion. Every answer is in the HTML (closed ones use `hidden`), so all of it is indexable. */
export function Faq({ b }: BlockProps<FaqBlock>) {
  const [open, setOpen] = useState(0);
  const id = useId();
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
        <div style={{ borderTop: '1px solid rgba(var(--ink-rgb),.12)', gridColumn: '1 / -1' }}>
          {b.items.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(var(--ink-rgb),.12)' }}>
                <h3 style={{ margin: 0, font: 'inherit' }}>
                  <button
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    aria-controls={`${id}-${i}`}
                    style={{
                      width: '100%',
                      minHeight: '64px',
                      padding: '18px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'none',
                      border: '0',
                      color: on ? 'var(--acc)' : 'var(--ink)',
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: '500',
                      fontSize: 'clamp(17px,1.4vw,19px)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    {q}
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 'none',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: `1px solid ${on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.2)'}`,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--acc)',
                        transform: on ? 'rotate(45deg)' : 'none',
                        transition: 'transform .4s',
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <p
                  id={`${id}-${i}`}
                  hidden={!on}
                  style={{ ...ui.body, padding: '0 48px 22px 0', fontSize: '16px', color: 'var(--ink3)' }}
                >
                  {a}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { formFor } from '@/components/forms/formFor';
import { LeadForm, type FormKind } from '@/components/forms/LeadForm';
import { Bullet } from '@/components/ui/Sparkle';
import { ui } from '@/components/ui/styles';
import { GridMark } from './CtaBlock';
import type { BlockProps } from './types';

export interface ConvertBlock {
  /** "scan" (free AI scan) or "book" (contact enquiry). */
  kind?: FormKind;
  eb?: string;
  a: string;
  b?: string;
  items?: string[];
  /** [step, detail] */
  steps?: [string, string][];
}

/** Form-first page header (Free AI scan, Contact us). Renders the page's H1. */
export function Convert({ b, page }: BlockProps<ConvertBlock>) {
  const form = formFor(page);
  return (
    <section
      data-screen-label={b.label}
      style={{
        padding: 'clamp(110px,13vw,160px) clamp(20px,5vw,64px) 0',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <GridMark />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(28px,5vw,72px)',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            animation: 'cxFade 1s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <p style={ui.eyebrow}>{b.eb}</p>
          <h1
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(40px,5.4vw,80px)',
              letterSpacing: '-0.045em',
              lineHeight: '1.02',
            }}
          >
            {b.a} <span style={{ color: 'var(--acc)', fontStyle: 'italic', fontWeight: '400' }}>{b.b}</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(b.items ?? []).map((it) => (
              <span
                key={it}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                  fontSize: '16.5px',
                }}
              >
                <Bullet />
                {it}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={ui.kicker}>What happens next</span>
            {(b.steps ?? []).map(([k, v], i) => (
              <div
                key={k}
                style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr)', gap: '10px', alignItems: 'start' }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid var(--acc)',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '12.5px',
                    color: 'var(--acc)',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: '15.5px', lineHeight: '1.5' }}>
                  <strong style={{ fontWeight: '600' }}>{k}.</strong> <span style={{ color: 'var(--muted)' }}>{v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <LeadForm kind={form.kind} title={form.title} />
      </div>
    </section>
  );
}

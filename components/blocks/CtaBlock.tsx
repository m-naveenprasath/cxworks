import { ctaLink } from '@/lib/links';
import type { Cta } from '@/lib/types';
import { formFor } from '@/components/forms/formFor';
import { LeadForm } from '@/components/forms/LeadForm';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface CtaBlockData {
  h?: string;
  p?: string;
  ctas?: Cta[];
  btn?: Cta;
  /** Show the lead form instead of buttons (the last CTA on a page gets it automatically at migration). */
  form?: boolean;
}

export function GridMark() {
  return (
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
          <span key={i} style={{ height: '14px', border: '1px solid rgba(var(--acc-rgb),.5)', borderRadius: '3px' }} />
        ),
      )}
    </div>
  );
}

export const ctaBox = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '28px',
  padding: 'clamp(36px,6vw,88px) clamp(22px,5vw,72px)',
  background:
    'radial-gradient(120% 140% at 0% 0%, rgba(var(--acc-rgb),.28), rgba(var(--acc-rgb),.05) 45%, var(--surface) 80%)',
  border: '1px solid rgba(var(--acc-rgb),.35)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
  gap: '32px',
  alignItems: 'center',
} as const;

export function CtaBlock({ b, page }: BlockProps<CtaBlockData>) {
  const btn1 = ctaLink(b.ctas?.[0] ?? b.btn);
  const btn2 = ctaLink(b.ctas?.[1]);
  const form = formFor(page);
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div data-ctabox="" style={ctaBox}>
        <GridMark />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h2 style={ui.h2}>{b.h}</h2>
          <p style={ui.lead}>{b.p}</p>
          {!b.form && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {btn1 && (
                <A className="hv-7760e51" href={btn1.href} data-magnet="" style={ui.btnPrimary}>
                  {btn1.l} <span aria-hidden="true">→</span>
                </A>
              )}
              {btn2 && (
                <A
                  className="hv-a3fdaa4"
                  href={btn2.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    minHeight: '52px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1px solid rgba(var(--ink-rgb),.32)',
                    color: 'var(--ink)',
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '500',
                    fontSize: '15px',
                    lineHeight: '1.2',
                    textAlign: 'center',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'border-color .3s, background .3s',
                  }}
                >
                  {btn2.l}
                </A>
              )}
            </div>
          )}
        </div>
        {b.form && <LeadForm kind={form.kind} title={form.title} />}
      </div>
    </section>
  );
}

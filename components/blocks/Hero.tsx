import { Fragment } from 'react';
import { ctaLink } from '@/lib/links';
import type { Cta } from '@/lib/types';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import { HeroGates } from './HeroGates';
import type { BlockProps } from './types';

export interface HeroBlock {
  eb?: string;
  /** Headline, first part. */
  a: string;
  /** Headline, highlighted second part. */
  b?: string;
  lead?: string;
  badge?: string;
  meta?: string[];
  ctas?: Cta[];
  btn?: Cta;
  small?: { l: string; href: string };
  /** Home-page layout with the animated Nine Gates panel. */
  home?: boolean;
}

export function Hero({ b, page }: BlockProps<HeroBlock>) {
  const btn1 = ctaLink(b.ctas?.[0] ?? b.btn);
  const btn2 = ctaLink(b.ctas?.[1]);
  const crumb = page.crumb ?? [];
  return (
    <section
      data-screen-label={b.label}
      style={{
        padding: 'clamp(120px,12vw,160px) clamp(20px,5vw,64px) 0',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Keeps the same top spacing on pages without breadcrumbs (e.g. home). */}
      {crumb.length === 0 && <div aria-hidden="true" style={{ height: '28px' }} />}
      {crumb.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            margin: '0 0 28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '12px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {crumb.map(([l, href], i) =>
            i === crumb.length - 1 ? (
              <span key={i} aria-current="page" style={{ color: 'var(--acc)' }}>
                {l}
              </span>
            ) : (
              <Fragment key={i}>
                {href ? (
                  <A className="hv-3ffee7d" href={href} style={{ color: 'var(--muted)' }}>
                    {l}
                  </A>
                ) : (
                  <span>{l}</span>
                )}
                <span aria-hidden="true">/</span>
              </Fragment>
            ),
          )}
        </nav>
      )}
      <div
        data-herogrid={b.home ? 'home' : 'page'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(36px,5vw,72px)',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            animation: 'cxFade 1s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <p style={ui.eyebrow}>{b.eb}</p>
            {b.badge && (
              <span
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  background: 'var(--acc)',
                  color: 'var(--on-acc)',
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                {b.badge}
              </span>
            )}
          </div>
          <h1
            id="hero-title"
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: b.home ? 'clamp(38px,3.8vw,54px)' : 'clamp(40px,5.6vw,84px)',
              letterSpacing: '-0.045em',
              lineHeight: '1.02',
              maxWidth: b.home ? '26ch' : '18ch',
              textWrap: 'balance',
            }}
          >
            {b.a} <span style={{ color: 'var(--acc)', fontWeight: '400', fontStyle: 'italic' }}>{b.b}</span>
          </h1>
          <p data-hero-sub="" style={{ ...ui.lead, fontSize: 'clamp(17px,1.5vw,21px)', color: 'var(--ink3)' }}>
            {b.lead}
          </p>
          {!!b.meta?.length && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {b.meta.map((m) => (
                <span
                  key={m}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: '34px',
                    padding: '0 14px',
                    borderRadius: '999px',
                    border: '1px solid rgba(var(--ink-rgb),.16)',
                    fontSize: '13.5px',
                    color: 'var(--ink)',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          )}
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
          {b.small && (
            <A
              className="hv-3ffee7d"
              href={b.small.href}
              style={{
                fontSize: '15px',
                color: 'var(--muted)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                alignSelf: 'flex-start',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {b.small.l}
            </A>
          )}
        </div>
        {b.home && <HeroGates />}
      </div>
    </section>
  );
}

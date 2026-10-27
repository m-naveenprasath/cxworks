import { AUDITS, auditPath, INDUSTRIES, SERVICES, SOLUTIONS } from '@/lib/data';
import { pad2 } from '@/lib/links';
import type { LinkTuple } from '@/lib/types';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface RelatedBlock {
  eb?: string;
  /** [title, href]; descriptions are looked up from the service/audit/solution with that URL. */
  items: LinkTuple[];
  /** Extra pill links under the cards. */
  hubs?: LinkTuple[];
  svcs?: LinkTuple[];
  hasSvcs?: boolean;
}

const ICONS = [
  'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
  'M4 19h4l10-10l-4-4L4 15zM13 6l4 4',
  'M3 17l6-6l4 4l8-8M15 7h6v6',
  'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
  'M3 12h18M12 3l9 9l-9 9',
  'M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z',
];

type Described = { promise?: string; d?: string; fix?: string; line?: string; gates?: string; time?: string };

function describe(href = '') {
  const audit = AUDITS.find((a) => auditPath(a.slug) === href);
  const slug = href.split('/').filter(Boolean).pop();
  const m = (audit ?? [...SERVICES, ...SOLUTIONS, ...INDUSTRIES].find((o) => o.slug === slug) ?? {}) as Described;
  const tag = audit
    ? 'Diagnose'
    : href.includes('/services/')
      ? 'Build'
      : href.includes('/industries/')
        ? 'Industry'
        : /run/.test(href)
          ? 'Run'
          : 'Explore';
  return { tag, d: m.promise || m.d || m.fix || m.line || '', meta: m.gates ? 'Gates: ' + m.gates : m.time || '' };
}

const pill = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '40px',
  padding: '0 16px',
  borderRadius: '999px',
  fontSize: '14px',
  color: 'var(--ink)',
  transition: 'border-color .25s, background .25s',
} as const;

/** Cards linking to related services/audits, with optional pill links. */
export function Related({ b }: BlockProps<RelatedBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '24px' }}>{b.eb}</p>
      <div
        data-mrail=""
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '16px' }}
      >
        {b.items.map(([l, href], i) => {
          const r = describe(href);
          return (
            <A
              key={href ?? l}
              className="hv-48aa3a4"
              href={href}
              data-reveal=""
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '250px',
                boxSizing: 'border-box',
                padding: 'clamp(22px,2.4vw,30px)',
                borderRadius: '22px',
                color: 'var(--ink)',
                border: '1px solid rgba(var(--ink-rgb),.12)',
                background: 'var(--surface)',
                transition:
                  'transform .4s cubic-bezier(.16,1,.3,1), border-color .4s, background .4s, opacity .9s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: '13px', color: 'var(--acc)' }}>
                  {r.tag} {pad2(i)}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'rgba(var(--acc-rgb),.14)',
                    color: 'var(--acc)',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={ICONS[i % 6]} />
                  </svg>
                </span>
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(20px,1.7vw,24px)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  textWrap: 'balance',
                }}
              >
                {l}
              </span>
              {r.d && (
                <span style={{ fontSize: '15px', lineHeight: '1.55', color: 'var(--muted)', textWrap: 'pretty' }}>
                  {r.d}
                </span>
              )}
              <span
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  fontSize: '14px',
                }}
              >
                <span style={{ color: 'var(--ink3)' }}>{r.meta}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--acc)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </A>
          );
        })}
      </div>
      {!!b.hubs?.length && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
          <span style={{ ...ui.kicker, marginRight: '6px' }}>Also explore</span>
          {b.hubs.map(([l, href]) => (
            <A
              key={l}
              className="hv-5dd360e"
              href={href}
              style={{
                ...pill,
                gap: '8px',
                border: '1px solid rgba(var(--ink-rgb),.16)',
                background: 'rgba(var(--glass),.03)',
              }}
            >
              {l}
              <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
                →
              </span>
            </A>
          ))}
        </div>
      )}
      {b.hasSvcs && !!b.svcs?.length && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginTop: '14px' }}>
          {b.svcs.map(([l, href]) => (
            <A
              key={l}
              className="hv-c59165b"
              href={href}
              style={{ ...pill, border: '1px solid rgba(var(--acc-rgb),.3)', background: 'rgba(var(--acc-rgb),.06)' }}
            >
              {l}
            </A>
          ))}
        </div>
      )}
    </section>
  );
}

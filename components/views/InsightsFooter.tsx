import { FOOTER, type NavLink } from '@/lib/nav';
import { LeadForm } from '@/components/forms/LeadForm';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import { ctaBox, GridMark } from '@/components/blocks/CtaBlock';

const panel = {
  borderRadius: '22px',
  padding: 'clamp(22px,2.6vw,32px)',
  background: 'linear-gradient(140deg, rgba(var(--glass),.075), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  border: '1px solid rgba(var(--ink-rgb),.12)',
  boxShadow: 'inset 0 1px 0 rgba(var(--glass),.16)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
} as const;

function Group({ title, sub, items }: { title: string; sub: string; items: NavLink[] }) {
  return (
    <div data-reveal="" style={panel}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '500',
            fontSize: 'clamp(22px,2vw,28px)',
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: '14px', color: 'var(--muted)' }}>{sub}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {items.map((m) => (
          <A
            key={m.href}
            className="hv-5dd360e"
            href={m.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '40px',
              padding: '0 16px',
              borderRadius: '999px',
              border: '1px solid rgba(var(--ink-rgb),.16)',
              background: 'rgba(var(--glass),.03)',
              fontSize: '14px',
              color: 'var(--ink)',
              transition: 'border-color .25s, background .25s',
            }}
          >
            {m.l}
            <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
              →
            </span>
          </A>
        ))}
      </div>
    </div>
  );
}

/** Shown under the insights listing and every article: service links + the free AI scan form. */
export function InsightsFooter() {
  return (
    <>
      <section
        data-screen-label="Insights · Diagnose and Build"
        style={{ padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
      >
        <p
          style={{
            margin: '0 0 24px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '12px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--acc)',
          }}
        >
          Put this into practice
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '16px',
          }}
        >
          <Group title="Diagnose" sub="Find the gate that fails first" items={FOOTER.diagnose} />
          <Group title="Build" sub="Fix it in a sprint or fixed-price job" items={FOOTER.build} />
        </div>
      </section>
      <section data-screen-label="Insights · Form" style={ui.section}>
        <div data-ctabox="" style={ctaBox}>
          <GridMark />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={ui.h2}>Find your earliest failing gate.</h2>
            <p style={ui.lead}>Free AI scan. Nine Gate score in about 48 hours.</p>
          </div>
          <LeadForm id="cx-form-ins" kind="scan" title="Get your free AI scan" />
        </div>
      </section>
    </>
  );
}

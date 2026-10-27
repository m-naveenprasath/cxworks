import type { Metadata } from 'next';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | CXWorks' },
  robots: { index: false, follow: true },
};

const links = [
  { l: 'Home', href: '/' },
  { l: 'Free AI scan', href: '/free-ai-scan/' },
  { l: 'DCX Audit', href: '/services/dcx-transformation/dcx-audit/' },
  { l: 'Insights', href: '/insights/' },
  { l: 'Contact us', href: '/contact-us/' },
];

export default function NotFound() {
  return (
    <section
      data-screen-label="404 hero"
      style={{ ...ui.section, paddingTop: 'clamp(140px,16vw,200px)', minHeight: '60vh' }}
    >
      <p style={ui.eyebrow}>404</p>
      <h1 style={{ ...ui.h2, marginTop: '16px', fontSize: 'clamp(40px,5.6vw,84px)' }}>
        This page failed a gate.{' '}
        <span style={{ color: 'var(--acc)', fontStyle: 'italic', fontWeight: 400 }}>Findability.</span>
      </h1>
      <p style={{ ...ui.lead, marginTop: '20px' }}>
        The page you were looking for has moved or no longer exists. Try one of these instead.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '32px' }}>
        {links.map((x, i) => (
          <A
            key={x.href}
            className={i ? 'hv-a3fdaa4' : 'hv-7760e51'}
            href={x.href}
            style={
              i
                ? {
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: '52px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1px solid rgba(var(--ink-rgb),.32)',
                    color: 'var(--ink)',
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '500',
                    fontSize: '15px',
                  }
                : ui.btnPrimary
            }
          >
            {x.l}
          </A>
        ))}
      </div>
    </section>
  );
}

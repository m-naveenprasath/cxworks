import type { CSSProperties } from 'react';
import { FOOTER, type NavLink } from '@/lib/nav';
import { SITE } from '@/lib/site';
import { A } from '@/components/ui/A';

const colHead: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '12px',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: 'var(--acc)',
  marginBottom: '8px',
  minHeight: '24px',
  display: 'flex',
  alignItems: 'center',
};
const colLink: CSSProperties = {
  display: 'block',
  padding: '6px 0',
  fontSize: '14.5px',
  lineHeight: '1.4',
  color: 'var(--muted)',
  textWrap: 'pretty',
};
const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' };

function Links({ items }: { items: NavLink[] }) {
  return items.map((m) => (
    <A key={m.href} className="hv-d9e551b" href={m.href} target={m.target} style={colLink}>
      {m.l}
    </A>
  ));
}

export function Footer() {
  return (
    <footer
      data-screen-label="Footer"
      style={{
        marginTop: '0',
        borderTop: '1px solid rgba(var(--ink-rgb),.1)',
        padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px) 32px',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '24px',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '520px' }}>
            <img
              data-logo=""
              src={SITE.logo}
              alt="CXWorks"
              width={130}
              height={26}
              loading="lazy"
              style={{ height: '26px', width: 'auto', alignSelf: 'flex-start' }}
            />
            <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.6', color: 'var(--muted)' }}>
              CXWorks is a digital customer experience (DCX) firm. We pair AI agents that monitor every step of the
              customer journey with experts who decide and deliver the fixes.
            </p>
          </div>
          <A
            className="hv-c30ce7c"
            href="/free-ai-scan/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '0 22px',
              borderRadius: '999px',
              background: 'var(--acc)',
              color: 'var(--on-acc)',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '600',
              fontSize: '14.5px',
              whiteSpace: 'nowrap',
              border: '0',
              cursor: 'pointer',
              transition: 'background .3s',
              minHeight: '52px',
            }}
          >
            Get your free AI scan →
          </A>
        </div>
        <nav
          aria-label="Footer"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: '32px 24px',
          }}
        >
          <div style={col}>
            <span style={colHead}>Diagnose</span>
            <Links items={FOOTER.diagnose} />
          </div>
          <div style={col}>
            <span style={colHead}>Build</span>
            <Links items={FOOTER.build} />
          </div>
          <div style={col}>
            <span style={colHead}>Run</span>
            <Links items={FOOTER.run} />
          </div>
          <div style={col}>
            <A className="hv-531886e" href="/insights/" style={colHead}>
              Insights
            </A>
            <Links items={FOOTER.insights} />
          </div>
          <div style={col}>
            <A className="hv-531886e" href={SITE.productsUrl} target="_blank" style={colHead}>
              Products
            </A>
            <Links items={FOOTER.products} />
            <A
              className="hv-7760e51"
              href={SITE.productsUrl}
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                alignSelf: 'flex-start',
                minHeight: '40px',
                marginTop: '10px',
                padding: '0 18px',
                borderRadius: '999px',
                background: 'var(--acc)',
                color: 'var(--on-acc)',
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: '600',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                transition: 'background .3s, transform .3s',
              }}
            >
              {'Visit Products '}
              <span aria-hidden="true">↗</span>
            </A>
          </div>
          <div style={col}>
            <A className="hv-531886e" href="/about/" style={colHead}>
              Contact us
            </A>
            <Links items={FOOTER.company} />
          </div>
        </nav>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '12px 24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(var(--ink-rgb),.1)',
            fontSize: '13px',
            color: 'var(--muted2)',
          }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
              {FOOTER.contact.map((m) => (
                <A
                  key={m.href}
                  className="hv-3ffee7d"
                  href={m.href}
                  style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}
                >
                  {m.l}
                </A>
              ))}
            </span>
            <span>
              © {new Date().getFullYear()} CXWorks. All rights reserved. {SITE.address.streetAddress},{' '}
              {SITE.address.addressLocality}, {SITE.address.addressRegion}, USA.
            </span>
          </span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
            {/* TODO: point these at real privacy/terms pages once they exist. */}
            <A className="hv-3ffee7d" href="/" style={{ color: 'var(--muted2)', whiteSpace: 'nowrap' }}>
              Privacy policy
            </A>
            <A className="hv-3ffee7d" href="/" style={{ color: 'var(--muted2)' }}>
              Terms
            </A>
            <A
              className="hv-3ffee7d"
              href={SITE.productsUrl}
              target="_blank"
              style={{ color: 'var(--muted2)', whiteSpace: 'nowrap' }}
            >
              Visit CXWorks Products ↗
            </A>
            <A
              className="hv-3ffee7d"
              href={SITE.linkedin}
              target="_blank"
              aria-label="CXWorks on LinkedIn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--muted2)',
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn ↗
            </A>
          </span>
        </div>
      </div>
    </footer>
  );
}

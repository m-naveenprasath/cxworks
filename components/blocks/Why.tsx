import type { BlockProps } from './types';

export interface WhyBlock {
  h: string;
  items: string[];
  p?: string;
}

/** Highlighted "Why CXWorks?" panel: ticked reasons + a paragraph. */
export function Why({ b }: BlockProps<WhyBlock>) {
  return (
    <section
      data-screen-label={b.label}
      style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <div
        className="hv-13b5983"
        data-reveal=""
        style={{
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(24px,4vw,64px)',
          alignItems: 'start',
          padding: 'clamp(28px,4vw,48px)',
          borderRadius: '28px',
          background: 'rgba(var(--acc-rgb),.10)',
          border: '1px solid rgba(var(--acc-rgb),.55)',
          transition: 'transform .45s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .45s, background .35s',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(30px,3.4vw,48px)',
              letterSpacing: '-0.04em',
              lineHeight: '1.08',
            }}
          >
            {b.h}
          </h2>
          <ul
            style={{
              listStyle: 'none',
              margin: '0',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {b.items.map((w) => (
              <li
                key={w}
                className="hv-ebdf00e"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: 'clamp(17px,1.4vw,20px)',
                  color: 'var(--ink)',
                  transition: 'transform .35s cubic-bezier(.16,1,.3,1), color .3s',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(var(--acc-rgb),.14)',
                    border: '1px solid rgba(var(--acc-rgb),.35)',
                    color: 'var(--acc)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {w}
              </li>
            ))}
          </ul>
        </div>
        <p
          style={{
            margin: '0',
            fontSize: 'clamp(17px,1.4vw,20px)',
            lineHeight: '1.6',
            color: 'var(--ink2)',
            textWrap: 'pretty',
          }}
        >
          {b.p}
        </p>
      </div>
    </section>
  );
}

import type { CSSProperties } from 'react';
import { getCategories, listingPath, type Listing } from '@/lib/insights';
import { A } from '@/components/ui/A';
import { InsightCard } from './InsightCard';

const chip = (on: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '42px',
  padding: '0 18px',
  borderRadius: '999px',
  border: `1px solid ${on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)'}`,
  background: on ? 'var(--acc)' : 'transparent',
  color: on ? 'var(--bg)' : 'var(--ink3)',
  fontFamily: 'inherit',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'all .4s cubic-bezier(.16,1,.3,1)',
});
const pageBtn: CSSProperties = {
  minWidth: '44px',
  height: '44px',
  padding: '0 14px',
  borderRadius: '999px',
  border: '1px solid rgba(var(--ink-rgb),.16)',
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '14.5px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  color: 'var(--ink)',
};

/** Insights index: category links, article cards and crawlable page links. */
export function InsightsList({ listing }: { listing: Listing }) {
  const { cat, page, pages, total, posts } = listing;
  const cats = getCategories();
  const first = (page - 1) * 10 + 1;
  return (
    <section
      data-screen-label="Insights"
      style={{ padding: 'clamp(140px,16vw,200px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <nav
        aria-label="Breadcrumb"
        style={{
          margin: '0 0 28px',
          fontFamily: "'Montserrat',sans-serif",
          fontSize: '12px',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          animation: 'cxFade .9s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <A className="hv-3ffee7d" href="/" style={{ color: 'var(--muted)' }}>
          Home
        </A>
        {' / '}
        {cat ? (
          <>
            <A className="hv-3ffee7d" href="/insights/" style={{ color: 'var(--muted)' }}>
              Insights
            </A>
            {' / '}
            <span aria-current="page" style={{ color: 'var(--acc)' }}>
              {cat.name}
            </span>
          </>
        ) : (
          <span aria-current="page" style={{ color: 'var(--acc)' }}>
            Insights
          </span>
        )}
      </nav>
      <h1
        style={{
          margin: '0',
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: '500',
          fontSize: 'clamp(44px,7.2vw,116px)',
          letterSpacing: '-0.05em',
          lineHeight: '.98',
          maxWidth: '15ch',
          animation: 'cxFade 1s .1s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        {cat ? `${cat.name} Insights.` : 'eCommerce & Digital CX Insights.'}
      </h1>
      <nav
        aria-label="Insight categories"
        style={{
          marginTop: 'clamp(36px,4vw,56px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          animation: 'cxFade 1s .2s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <A href="/insights/" aria-current={!cat ? 'page' : undefined} style={chip(!cat)}>
          All
        </A>
        {cats.map((c) => (
          <A
            key={c.slug}
            href={listingPath(c.slug, 1)}
            aria-current={cat?.slug === c.slug ? 'page' : undefined}
            style={chip(cat?.slug === c.slug)}
          >
            {c.name}
          </A>
        ))}
      </nav>
      <div
        style={{
          marginTop: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(16px,2vw,28px)',
        }}
      >
        {posts.map((p, i) => (
          <InsightCard key={p.slug} post={p} i={i} />
        ))}
      </div>
      {pages > 1 && (
        <nav
          aria-label="Insights pages"
          style={{
            marginTop: 'clamp(32px,4vw,48px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
            Showing {first}–{Math.min(page * 10, total)} of {total}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {page > 1 ? (
              <A href={listingPath(cat?.slug, page - 1)} rel="prev" aria-label="Previous page" style={pageBtn}>
                ←
              </A>
            ) : (
              <span aria-hidden="true" style={{ ...pageBtn, opacity: '.35', cursor: 'default' }}>
                ←
              </span>
            )}
            {Array.from({ length: pages }, (_, i) => {
              const n = i + 1;
              const on = n === page;
              return (
                <A
                  key={n}
                  href={listingPath(cat?.slug, n)}
                  aria-current={on ? 'page' : undefined}
                  style={{
                    ...pageBtn,
                    background: on ? 'var(--acc)' : 'transparent',
                    color: on ? 'var(--on-acc)' : 'var(--ink2)',
                  }}
                >
                  {n}
                </A>
              );
            })}
            {page < pages ? (
              <A href={listingPath(cat?.slug, page + 1)} rel="next" aria-label="Next page" style={pageBtn}>
                →
              </A>
            ) : (
              <span aria-hidden="true" style={{ ...pageBtn, opacity: '.35', cursor: 'default' }}>
                →
              </span>
            )}
          </div>
        </nav>
      )}
    </section>
  );
}

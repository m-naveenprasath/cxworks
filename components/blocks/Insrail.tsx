import { getPosts } from '@/lib/content';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import { InsightCard } from '@/components/views/InsightCard';
import type { BlockProps } from './types';

/** The three most recent insights. */
export function Insrail({ b }: BlockProps<object>) {
  const posts = getPosts().slice(0, 3);
  return (
    <section
      data-screen-label={b.label}
      style={{ padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px 32px',
          marginBottom: 'clamp(28px,3.4vw,44px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={ui.eyebrow}>Insights</p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(30px,4vw,54px)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
              textWrap: 'balance',
            }}
          >
            {'Notes on being '}
            <span style={{ color: 'var(--acc)', fontStyle: 'italic', fontWeight: '400' }}>Cited, Clicked, Chosen.</span>
          </h2>
        </div>
        <A
          className="hv-7891572"
          href="/insights/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '16px',
            color: 'var(--acc)',
            whiteSpace: 'nowrap',
          }}
        >
          {'All insights '}
          <span aria-hidden="true">→</span>
        </A>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(16px,2vw,28px)',
        }}
      >
        {posts.map((p, i) => (
          <InsightCard key={p.slug} post={p} i={i} />
        ))}
      </div>
    </section>
  );
}

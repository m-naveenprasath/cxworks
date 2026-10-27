import { getPosts } from '@/lib/content';
import { serviceBySlug, servicePath } from '@/lib/data';
import { categoryPath, slugify } from '@/lib/insights';
import { pad2 } from '@/lib/links';
import type { Post } from '@/lib/types';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import { InsightCard } from './InsightCard';
import { CopyLink, PostToc } from './PostClient';

/** Which service to promote when a post has no `sols`, by category keyword. */
const CAT_SERVICE: [string, string][] = [
  ['analytic', 'digital-analytics'],
  ['cro', 'conversion-rate-optimization'],
  ['conversion', 'conversion-rate-optimization'],
  ['merch', 'digital-merchandising'],
  ['catalog', 'catalog-management'],
  ['ai', 'ai-search-visibility'],
  ['seo', 'ai-search-visibility'],
  ['growth', 'growth-marketing'],
];

const metaRow = {
  marginTop: '28px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px 28px',
  padding: '18px 0',
  borderTop: '1px solid rgba(var(--ink-rgb),.12)',
  borderBottom: '1px solid rgba(var(--ink-rgb),.12)',
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '12px',
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
} as const;

export function PostView({ post, isoDate }: { post: Post; isoDate?: string }) {
  const posts = getPosts();
  const pc = post.cat.toLowerCase();
  const fallback = CAT_SERVICE.find(([k]) => pc.includes(k))?.[1] ?? 'dcx-transformation';
  const sols = (post.sols?.length ? post.sols : [fallback]).map((slug, i) => ({
    name: serviceBySlug(slug)?.name ?? slug,
    href: servicePath(slug),
    n: 'Solution ' + pad2(i),
  }));
  const related = [
    ...posts.filter((x) => x.slug !== post.slug && x.cat === post.cat),
    ...posts.filter((x) => x.slug !== post.slug && x.cat !== post.cat),
  ].slice(0, 3);
  const secs = post.secs.map((s, i) => ({ ...s, id: 'ps-' + i }));
  const toc = secs
    .map((s, i) => ({ n: pad2(i), t: s.h, id: s.id }))
    .concat(post.faq?.length ? [{ n: pad2(secs.length), t: 'FAQ', id: 'ps-take' }] : []);

  return (
    <>
      <article
        data-screen-label="Article"
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
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            animation: 'cxFade .9s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <A className="hv-3ffee7d" href="/" style={{ color: 'var(--muted)' }}>
            Home
          </A>
          {' / '}
          <A className="hv-3ffee7d" href="/insights/" style={{ color: 'var(--muted)' }}>
            Insights
          </A>
          {' / '}
          <A className="hv-3ffee7d" href={categoryPath(slugify(post.cat))} style={{ color: 'var(--muted)' }}>
            {post.cat}
          </A>
          {' / '}
          <span
            aria-current="page"
            style={{
              color: 'var(--acc)',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.t}
          </span>
        </nav>
        <h1
          style={{
            margin: '0',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '500',
            fontSize: 'clamp(38px,5.6vw,88px)',
            letterSpacing: '-0.045em',
            lineHeight: '1.02',
            maxWidth: '20ch',
            textWrap: 'balance',
            animation: 'cxFade 1s .1s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          {post.t}
        </h1>
        <p
          style={{
            margin: '28px 0 0',
            maxWidth: '60ch',
            fontSize: 'clamp(18px,1.6vw,22px)',
            lineHeight: '1.55',
            color: 'var(--ink3)',
            animation: 'cxFade 1s .2s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          {post.ex}
        </p>
        <div style={metaRow}>
          <span>
            {'By '}
            <span style={{ color: 'var(--ink)' }}>CXWorks Editorial</span>
          </span>
          <span>
            {'Published · '}
            <time dateTime={isoDate}>{post.date}</time>
          </span>
          <span>
            {'Updated · '}
            <time dateTime={isoDate}>{post.date}</time>
          </span>
          <span>
            {post.read}
            {' read'}
          </span>
          <CopyLink />
        </div>
        <div
          data-artgrid=""
          style={{
            marginTop: 'clamp(40px,5vw,72px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr)',
            gap: '40px clamp(28px,5vw,80px)',
            alignItems: 'start',
          }}
        >
          <PostToc items={toc} />
          <div
            style={{
              gridColumn: '1 / -1',
              minWidth: '0',
              maxWidth: '760px',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
            data-artbody=""
          >
            {secs.map((s) => (
              <section
                key={s.id}
                id={s.id}
                data-reveal=""
                style={{ display: 'flex', flexDirection: 'column', gap: '16px', scrollMarginTop: '100px' }}
              >
                <h2
                  style={{
                    margin: '0',
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '500',
                    fontSize: 'clamp(26px,2.6vw,38px)',
                    letterSpacing: '-0.035em',
                    lineHeight: '1.12',
                  }}
                >
                  {s.h}
                </h2>
                {s.b.map((bk, i) =>
                  'p' in bk ? (
                    <p
                      key={i}
                      style={{
                        margin: '0',
                        fontSize: 'clamp(17px,1.3vw,19px)',
                        lineHeight: '1.7',
                        color: 'var(--ink3)',
                        textWrap: 'pretty',
                      }}
                    >
                      {bk.p}
                    </p>
                  ) : 'ul' in bk ? (
                    <ul
                      key={i}
                      style={{
                        margin: '0',
                        padding: '0',
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      {bk.ul.map((li, j) => (
                        <li
                          key={j}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '18px minmax(0,1fr)',
                            gap: '10px',
                            fontSize: 'clamp(16.5px,1.25vw,18px)',
                            lineHeight: '1.6',
                            color: 'var(--ink3)',
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              width: '6px',
                              height: '6px',
                              marginTop: '.7em',
                              borderRadius: '50%',
                              background: 'var(--acc)',
                            }}
                          />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      key={i}
                      style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(var(--ink-rgb),.14)' }}
                    >
                      <table
                        style={{
                          width: '100%',
                          minWidth: '520px',
                          borderCollapse: 'collapse',
                          fontSize: '15.5px',
                          lineHeight: '1.5',
                        }}
                      >
                        <tbody>
                          {bk.tb.map((rw, ri) => (
                            <tr key={ri} style={{ background: ri === 0 ? 'rgba(var(--acc-rgb),.1)' : 'transparent' }}>
                              {rw.map((cl, ci) => {
                                const Cell = ri === 0 ? 'th' : 'td';
                                return (
                                  <Cell
                                    key={ci}
                                    scope={ri === 0 ? 'col' : undefined}
                                    style={{
                                      padding: '12px 16px',
                                      borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                                      verticalAlign: 'top',
                                      textAlign: 'left',
                                      color: ri === 0 ? 'var(--ink)' : 'var(--ink3)',
                                      fontWeight: ri === 0 ? '600' : '400',
                                    }}
                                  >
                                    {cl}
                                  </Cell>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ),
                )}
              </section>
            ))}
            {!!post.faq?.length && (
              <section
                id="ps-take"
                data-reveal=""
                style={{
                  padding: 'clamp(26px,3vw,36px)',
                  borderRadius: '24px',
                  background:
                    'linear-gradient(140deg, rgba(var(--glass),.10), rgba(var(--glass),.025) 45%, rgba(var(--glass),.05))',
                  backdropFilter: 'blur(30px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(190%)',
                  border: '1px solid rgba(var(--acc-rgb),.4)',
                  boxShadow:
                    'inset 0 1px 0 rgba(var(--glass),.28), inset 0 -1px 0 rgba(var(--glass),.05), inset 0 0 24px rgba(var(--glass),.03), 0 24px 60px -28px rgba(var(--shade),.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  scrollMarginTop: '100px',
                }}
              >
                <h2
                  style={{
                    margin: '0',
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '500',
                    fontSize: '26px',
                    letterSpacing: '-0.03em',
                  }}
                >
                  FAQ
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {post.faq.map(([q, a]) => (
                    <div
                      key={q}
                      style={{ ...ui.stack8, padding: '18px 0', borderTop: '1px solid rgba(var(--ink-rgb),.1)' }}
                    >
                      <h3
                        style={{
                          margin: '0',
                          fontFamily: "'Montserrat',sans-serif",
                          fontWeight: '500',
                          fontSize: '18px',
                          lineHeight: '1.35',
                          color: 'var(--ink)',
                        }}
                      >
                        {q}
                      </h3>
                      <p
                        style={{
                          margin: '0',
                          fontSize: '16.5px',
                          lineHeight: '1.6',
                          color: 'var(--ink3)',
                          textWrap: 'pretty',
                        }}
                      >
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div
              className="hv-7c93944"
              data-reveal=""
              style={{
                display: 'grid',
                gridTemplateColumns: '64px minmax(0,1fr)',
                gap: '18px',
                alignItems: 'center',
                paddingTop: '28px',
                borderTop: '1px solid rgba(var(--ink-rgb),.12)',
                transition: 'transform .45s cubic-bezier(.16,1,.3,1)',
              }}
            >
              <span
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--acc)',
                  color: 'var(--on-acc)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '700',
                  fontSize: '20px',
                }}
              >
                CX
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: '600', color: 'var(--ink)' }}>CXWorks Editorial</span>
                <span style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: '1.5' }}>
                  DCX strategists, analysts and CRO specialists writing about how eCommerce brands get Cited, Clicked
                  and Chosen.
                </span>
              </span>
            </div>
            <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={ui.eyebrow}>Related solutions</p>
              {sols.map((s) => (
                <A
                  key={s.href}
                  className="hv-a23e27c"
                  href={s.href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    padding: 'clamp(20px,2.4vw,26px)',
                    borderRadius: '24px',
                    background: 'var(--acc)',
                    color: 'var(--on-acc)',
                  }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: '11.5px',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {s.n}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontWeight: '500',
                        fontSize: 'clamp(20px,1.8vw,26px)',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.15',
                      }}
                    >
                      {s.name}
                    </span>
                  </span>
                  <span
                    style={{
                      flex: 'none',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'var(--bg)',
                      color: 'var(--acc)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '19px',
                    }}
                  >
                    →
                  </span>
                </A>
              ))}
            </div>
          </div>
        </div>
      </article>
      <section
        data-screen-label="Article · Related"
        style={{ padding: 'clamp(72px,10vw,140px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
      >
        <p
          data-reveal=""
          style={{
            margin: '0 0 28px',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '12px',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          Keep reading
        </p>
        <div
          data-reveal=""
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '12px',
          }}
        >
          {related.map((p, i) => (
            <InsightCard key={p.slug} post={p} i={i} />
          ))}
        </div>
      </section>
    </>
  );
}

import { ImageResponse } from 'next/og';
import { getPageByPath, getPages, getPost, getPosts } from '@/lib/content';
import { getListing } from '@/lib/insights';

/**
 * Open Graph / social share images, one per page and article, generated at build time.
 *   /og/home/                     → home page
 *   /og/<page path>               → e.g. /og/services/digital-analytics/
 *   /og/insights/<slug>/          → article
 * Referenced from lib/seo.ts via ogImagePath().
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: ['home'] },
    ...getPages()
      .filter((p) => p.path !== '/')
      .map((p) => ({ slug: p.path.split('/').filter(Boolean) })),
    { slug: ['insights'] },
    ...getPosts().map((p) => ({ slug: ['insights', ...p.slug.split('/')] })),
  ];
}

function describe(slug: string[]): { eyebrow: string; title: string } {
  if (slug[0] === 'home') {
    const home = getPageByPath('/');
    return { eyebrow: 'Digital customer experience', title: home?.title.split('|')[0].trim() || 'CXWorks' };
  }
  if (slug[0] === 'insights') {
    const post = slug.length > 1 ? getPost(slug.slice(1).join('/')) : undefined;
    if (post) return { eyebrow: `Insights · ${post.cat}`, title: post.t };
    return { eyebrow: 'Insights', title: getListing(undefined, 1) ? 'eCommerce & Digital CX Insights' : 'Insights' };
  }
  const page = getPageByPath('/' + slug.join('/') + '/');
  const hero = page?.blocks.find((b) => b.type === 'hero' || b.type === 'convert') as
    { eb?: string; a?: string; b?: string } | undefined;
  const title = hero?.a ? [hero.a, hero.b].filter(Boolean).join(' ') : page?.title.split('|')[0].trim() || 'CXWorks';
  return { eyebrow: hero?.eb || 'CXWorks', title };
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { eyebrow, title } = describe((await params).slug);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background:
          'radial-gradient(70% 90% at 0% 0%, rgba(64,200,224,.35), rgba(64,200,224,0) 60%), radial-gradient(60% 80% at 100% 100%, rgba(0,130,153,.35), rgba(0,0,0,0) 60%), #000000',
        color: '#F5F5F7',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: '#40C8E0',
            color: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}
        >
          CX
        </div>
        CXWorks
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#40C8E0' }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 60 ? 56 : 68, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#98989D' }}>Cited. Clicked. Chosen.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}

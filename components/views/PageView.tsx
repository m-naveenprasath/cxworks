import type { Page } from '@/lib/types';
import { BLOCKS } from '@/components/blocks/registry';
import { StickyCta } from '@/components/layout/StickyCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageJsonLd } from '@/lib/seo';

/** Renders a content page: its blocks in order, the mobile sticky CTA and structured data. */
export function PageView({ page }: { page: Page }) {
  const name = (page.title || 'Page').split('|')[0].trim().slice(0, 40);
  return (
    <>
      <JsonLd data={pageJsonLd(page)} />
      {page.blocks.map((block, i) => {
        const Block = BLOCKS[block.type];
        if (!Block) {
          if (process.env.NODE_ENV !== 'production')
            console.warn(`[PageView] Unknown block type "${block.type}" on ${page.path}`);
          return null;
        }
        return <Block key={i} b={{ ...block, label: `${name} · ${block.type}` }} page={page} />;
      })}
      {page.sticky && <StickyCta l={page.sticky.l} href={page.sticky.href} />}
    </>
  );
}

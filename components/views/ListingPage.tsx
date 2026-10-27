import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { getInsightsMeta, postPath } from '@/lib/content';
import { getListing } from '@/lib/insights';
import { listingJsonLd, pageMetadata } from '@/lib/seo';
import { InsightsFooter } from './InsightsFooter';
import { InsightsList } from './InsightsList';

function meta(catSlug: string | undefined, page: number) {
  const listing = getListing(catSlug, page);
  if (!listing) return null;
  const base = getInsightsMeta();
  const name = listing.cat ? `${listing.cat.name} Insights` : base.title.split('|')[0].trim();
  const suffix = page > 1 ? ` – Page ${page}` : '';
  const title = `${name}${suffix} | CXWorks`;
  const description = listing.cat
    ? `${listing.cat.name} guides and articles from CXWorks: practical advice on digital customer experience and eCommerce growth.${suffix}`
    : base.description + suffix;
  return { listing, title, description };
}

export function listingMetadata(catSlug: string | undefined, page: number) {
  const m = meta(catSlug, page);
  return m ? pageMetadata({ title: m.title, description: m.description, path: m.listing.path }) : {};
}

/** /insights/, /insights/page/N/, /insights/category/X/ and /insights/category/X/page/N/ */
export function ListingPage({ catSlug, page }: { catSlug?: string; page: number }) {
  const m = meta(catSlug, page);
  if (!m) notFound();
  return (
    <>
      <JsonLd
        data={listingJsonLd(
          m.title,
          m.description,
          m.listing.path,
          m.listing.posts.map((p) => ({ name: p.t, path: postPath(p.slug) })),
        )}
      />
      <InsightsList listing={m.listing} />
      <InsightsFooter />
    </>
  );
}

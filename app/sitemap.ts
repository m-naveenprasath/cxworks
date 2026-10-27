import type { MetadataRoute } from 'next';
import { getPages, getPosts, isoDate, postPath } from '@/lib/content';
import { allListings, listingPath } from '@/lib/insights';
import { absoluteUrl } from '@/lib/site';

/** /sitemap.xml: every indexable page, article and insights listing. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPages()
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: absoluteUrl(p.path),
      changeFrequency: 'monthly' as const,
      priority: p.path === '/' ? 1 : p.key.startsWith('svc:') || p.key.startsWith('sol:') ? 0.9 : 0.7,
    }));
  const posts = getPosts()
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: absoluteUrl(postPath(p.slug)),
      lastModified: isoDate(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  const listings = allListings().map(([cat, n]) => ({
    url: absoluteUrl(listingPath(cat, n)),
    changeFrequency: 'weekly' as const,
    priority: !cat && n === 1 ? 0.8 : 0.4,
  }));
  return [...pages, ...listings, ...posts];
}

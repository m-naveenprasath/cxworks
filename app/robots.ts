import type { MetadataRoute } from 'next';
import { absoluteUrl, SITE } from '@/lib/site';

/** /robots.txt. Set NEXT_PUBLIC_SITE_URL so the sitemap URL points at production. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE.url,
  };
}

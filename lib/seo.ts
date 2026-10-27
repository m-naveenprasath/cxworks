/**
 * SEO helpers: <head> metadata and schema.org JSON-LD for every page type.
 * Pages call `pageMetadata()` from generateMetadata and render <JsonLd data={…} /> from
 * components/seo/JsonLd.tsx.
 */
import type { Metadata } from 'next';
import { ogImagePath } from './og';
import { absoluteUrl, SITE } from './site';
import type { LinkTuple, Page, Post } from './types';

interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  section?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  noindex,
  publishedTime,
  section,
}: MetaInput): Metadata {
  const image = { url: ogImagePath(path), width: 1200, height: 630, alt: title };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      title,
      description,
      images: [image],
      ...(type === 'article' ? { publishedTime, section, authors: [`${SITE.name} Editorial`] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

// ---------------------------------------------------------------------------------- JSON-LD

const ORG_ID = absoluteUrl('/#organization');
const SITE_ID = absoluteUrl('/#website');

export function organizationLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(SITE.logo),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone.href.replace('tel:', ''),
    address: { '@type': 'PostalAddress', ...SITE.address },
    sameAs: [SITE.linkedin],
  };
}

export function websiteLd() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: absoluteUrl('/'), name: SITE.name, publisher: { '@id': ORG_ID } };
}

function webPageLd(name: string, description: string, path: string) {
  return {
    '@type': 'WebPage',
    '@id': absoluteUrl(path) + '#webpage',
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  };
}

function breadcrumbLd(crumbs: LinkTuple[], path: string) {
  // Intermediate crumbs without a page of their own (e.g. "Run") are left out.
  const items = crumbs.filter(([, href], i) => href || i === crumbs.length - 1);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, href], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absoluteUrl(href || path),
    })),
  };
}

function faqLd(items: [string, string][]) {
  const qa = items.filter((x) => x && x[0] && x[1]);
  if (!qa.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

const graph = (nodes: (object | null)[]) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });

/** Structured data for a content page (FAQ only when the FAQ is visible on the page). */
export function pageJsonLd(page: Page) {
  const name = page.title.split('|')[0].trim();
  const faq = page.blocks.find((b) => b.type === 'faq')?.items as [string, string][] | undefined;
  const isService = page.key.startsWith('svc:') || page.key.startsWith('audit:') || page.key.startsWith('sol:');
  return graph([
    organizationLd(),
    websiteLd(),
    { ...webPageLd(page.title, page.description, page.path), primaryImageOfPage: absoluteUrl(ogImagePath(page.path)) },
    page.crumb?.length ? breadcrumbLd(page.crumb, page.path) : null,
    isService
      ? {
          '@type': 'Service',
          name,
          description: page.description,
          url: absoluteUrl(page.path),
          provider: { '@id': ORG_ID },
          areaServed: 'Worldwide',
          serviceType: name,
        }
      : null,
    faq ? faqLd(faq) : null,
  ]);
}

export function postJsonLd(post: Post, path: string, isoDate?: string) {
  return graph([
    organizationLd(),
    websiteLd(),
    webPageLd(post.title, post.d, path),
    breadcrumbLd(
      [
        ['Home', '/'],
        ['Insights', '/insights/'],
        [post.t, path],
      ],
      path,
    ),
    {
      '@type': 'BlogPosting',
      headline: post.t,
      description: post.d,
      articleSection: post.cat,
      datePublished: isoDate,
      dateModified: isoDate,
      author: { '@type': 'Organization', name: `${SITE.name} Editorial`, url: absoluteUrl('/about/') },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: absoluteUrl(path),
      image: absoluteUrl(ogImagePath(path)),
    },
    post.faq ? faqLd(post.faq) : null,
  ]);
}

export function listingJsonLd(
  name: string,
  description: string,
  path: string,
  items: { name: string; path: string }[],
) {
  return graph([
    organizationLd(),
    websiteLd(),
    { ...webPageLd(name, description, path), '@type': 'CollectionPage' },
    {
      '@type': 'ItemList',
      itemListElement: items.map((x, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(x.path),
        name: x.name,
      })),
    },
  ]);
}

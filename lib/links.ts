import type { Cta } from './types';

export const CONTACT_PATH = '/contact-us/';

/** Href for a CTA: its own link, or the contact form with a topic preselected. */
export const ctaHref = (c: Cta) => c.href || `${CONTACT_PATH}?topic=${encodeURIComponent(c.topic || 'General')}`;

export const ctaLink = (c?: Cta | null) => (c ? { l: c.l, href: ctaHref(c) } : null);

export const isInternal = (href?: string) => !!href && href.startsWith('/') && !href.startsWith('//');

/** "01", "02", … */
export const pad2 = (i: number) => String(i + 1).padStart(2, '0');

/** Topics offered in the contact form (`?topic=` must be one of these). */
export const TOPICS = [
  'DCX Audit',
  'Free AI scan',
  'SEO Audit',
  'Technical SEO Audit',
  'AI Visibility Audit',
  'CRO Audit',
  'Digital Analytics Audit',
  'Accessibility Audit',
  'Digital Merchandising Audit',
  'Build sprint',
  'Prepaid credits',
  'Ways to work',
  'General',
];

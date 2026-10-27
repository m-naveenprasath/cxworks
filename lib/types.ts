/** Content types. The JSON files in /content follow these shapes. */

/** `[label, href]`. A missing href renders plain text (e.g. the current breadcrumb). */
export type LinkTuple = [label: string, href?: string];

/** A button. Give `href` for a link, or `topic` to open the contact form with that topic preselected. */
export interface Cta {
  l: string;
  href?: string;
  act?: string;
  topic?: string;
}

/**
 * One section of a page. `type` picks the component in components/blocks/registry.ts;
 * the other fields are that component's props (see the `*Block` interface in its file).
 */
export interface BlockData {
  type: string;
  [field: string]: unknown;
}

export interface Page {
  /** Stable id, e.g. `home`, `svc:digital-analytics`, `audit:seo-audit`, `sol:ecommerce-consulting`. */
  key: string;
  /** Canonical URL path with trailing slash, e.g. `/services/digital-analytics/`. */
  path: string;
  /** Full <title>, used as-is. */
  title: string;
  /** Meta description (aim for 120–160 characters). */
  description: string;
  crumb?: LinkTuple[];
  /** Mobile sticky call-to-action. */
  sticky?: { l: string; href: string };
  /** Hide from search engines (adds noindex and leaves it out of the sitemap). */
  noindex?: boolean;
  blocks: BlockData[];
}

export type PostBody = { p: string } | { ul: string[] } | { tb: string[][] };

export interface Post {
  slug: string;
  cat: string;
  /** Headline (H1). */
  t: string;
  /** <title> */
  title: string;
  /** Meta description. */
  d: string;
  /** Card excerpt. */
  ex: string;
  /** Display date, e.g. "July 28, 2026". */
  date: string;
  read: string;
  secs: { h: string; b: PostBody[] }[];
  faq?: [question: string, answer: string][];
  /** Service slugs to promote at the end of the article. */
  sols?: string[];
  draft?: boolean;
  noindex?: boolean;
}

export interface GateGroup {
  stage: string;
  tag: string;
  gates: [name: string, description: string][];
}

export interface Service {
  slug: string;
  name: string;
  kw?: string;
  h1?: string[];
  promise?: string;
  gates?: string;
  d?: string;
  b?: string;
  r?: string;
  audit?: string;
  doors?: boolean;
  symptoms?: string[];
  tools?: string[];
}

export interface Audit {
  slug: string;
  name: string;
  kw?: string;
  out?: string;
  time?: string;
  price?: string;
  badge?: string;
  who?: string[];
  get?: string[];
}

export interface Solution {
  slug: string;
  name: string;
  svcs?: string[];
}

export interface Industry {
  slug: string;
  name: string;
  fix?: string;
}

export interface CaseStudy {
  slug: string;
  gate: string;
  door: string;
  ind: string;
  client: string;
  n1: [value: string, label: string];
  n2: [value: string, label: string];
  t: string;
  ch: string;
  ai: string;
  ex: string;
  built: string[];
  quote: string;
}

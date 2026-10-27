/**
 * Shared site data (content/site/*.json). Safe to import from server and client components.
 * Page and insight content is loaded separately by lib/content.ts (server only).
 */
import auditsJson from '@/content/site/audits.json';
import casesJson from '@/content/site/cases.json';
import gatesJson from '@/content/site/gates.json';
import industriesJson from '@/content/site/industries.json';
import proofStatsJson from '@/content/site/proof-stats.json';
import servicesJson from '@/content/site/services.json';
import solutionsJson from '@/content/site/solutions.json';
import { pad2 } from './links';
import type { Audit, CaseStudy, GateGroup, Industry, Service, Solution } from './types';

export const GATES = gatesJson as GateGroup[];
export const SERVICES = servicesJson as Service[];
export const AUDITS = auditsJson as Audit[];
export const SOLUTIONS = solutionsJson as Solution[];
export const INDUSTRIES = industriesJson as Industry[];
export const CASES = casesJson as unknown as CaseStudy[];
export const PROOF_STATS = proofStatsJson as { v: string; t: string; d: string }[];

/** All nine gates in journey order, numbered "01"–"09". */
export const ALL_GATES = GATES.flatMap((g) => g.gates.map(([name, d]) => ({ stage: g.stage, name, d }))).map(
  (g, i) => ({
    ...g,
    n: pad2(i),
  }),
);

/** Canonical page path for an audit (some audits live under their service). */
const AUDIT_PATHS: Record<string, string> = {
  'dcx-diagnostic': '/services/dcx-transformation/dcx-audit/',
  'catalog-search-audit': '/services/digital-merchandising/audit/',
  'analytics-audit': '/services/digital-analytics/audit/',
  'cro-ux-audit': '/services/conversion-rate-optimization/audit/',
};
export const auditPath = (slug: string) => AUDIT_PATHS[slug] || `/audits/${slug}/`;
export const servicePath = (slug: string) => `/services/${slug}/`;
export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** Partner logos: public/partners/<slug>.png */
export { default as PARTNERS } from '@/content/site/partners.json';
export { default as REVIEWS } from '@/content/site/reviews.json';
/** Headline result per service, shown by the "cases" block. */
export { default as SERVICE_METRICS } from '@/content/site/service-metrics.json';
import gateExamplesJson from '@/content/site/gate-examples.json';
/** Example failure per gate for each kind of business ("I sell online" / "I get enquiries online"). */
export const GATE_EXAMPLES = gateExamplesJson as Record<string, { sell: string; enq: string } | undefined>;

/** Navigation menus (header, mobile menu, footer). Built from the shared site data. */
import { AUDITS, auditPath, SERVICES, servicePath, SOLUTIONS } from './data';
import { SITE } from './site';

export interface NavLink {
  l: string;
  href: string;
  target?: '_blank';
}

export const NAV = {
  diagnose: AUDITS.map((a): NavLink => ({ l: a.name, href: auditPath(a.slug) })),
  build: SERVICES.map((s): NavLink => ({ l: s.name, href: servicePath(s.slug) })),
  run: [
    { l: 'Run pods', href: '/run-pods/' },
    { l: 'Ways to work', href: '/ways-to-work/' },
    { l: 'Nine Gates', href: '/nine-gates/' },
  ] as NavLink[],
  solutions: SOLUTIONS.map((s): NavLink => ({ l: s.name, href: `/${s.slug}/` })),
};

export const FOOTER = {
  diagnose: NAV.diagnose,
  build: NAV.build,
  run: NAV.run,
  insights: [
    { l: 'All insights', href: '/insights/' },
    { l: 'Free AI scan', href: '/free-ai-scan/' },
  ] as NavLink[],
  products: [
    { l: 'NUARK ↗', href: SITE.productsUrl + 'nuark', target: '_blank' },
    { l: 'Query Prism ↗', href: SITE.productsUrl + 'query-prism', target: '_blank' },
  ] as NavLink[],
  company: [
    { l: 'About CXWorks', href: '/about/' },
    { l: 'Contact', href: '/contact-us/' },
    { l: 'LinkedIn ↗', href: SITE.linkedin, target: '_blank' },
  ] as NavLink[],
  contact: [
    { l: SITE.phone.label, href: SITE.phone.href },
    { l: SITE.email, href: 'mailto:' + SITE.email },
    ...SITE.support.map((e) => ({ l: e, href: 'mailto:' + e })),
  ] as NavLink[],
};

export type NavSection = 'diagnose' | 'build' | 'run' | 'nine-gates' | 'insights' | 'about' | null;

const SOLUTION_PATHS = new Set(NAV.solutions.map((s) => s.href));

/** Which top-level menu item to highlight for a path. */
export function navSection(path: string): NavSection {
  if (path.startsWith('/audits/') || /^\/services\/[^/]+\/(dcx-)?audit\/$/.test(path)) return 'diagnose';
  if (path.startsWith('/services/')) return 'build';
  if (path === '/run-pods/' || path === '/ways-to-work/') return 'run';
  if (path.startsWith('/insights/')) return 'insights';
  if (path === '/about/') return 'about';
  if (path === '/nine-gates/' || SOLUTION_PATHS.has(path)) return 'nine-gates';
  return null;
}

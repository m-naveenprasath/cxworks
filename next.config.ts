import type { NextConfig } from 'next';

/**
 * Old URLs from the single-page version of the site. Each one now 308-redirects to its
 * canonical page so existing links and search rankings carry over.
 */
const DCX_AUDIT = '/services/dcx-transformation/dcx-audit/';
const AUDIT_MOVES: Record<string, string> = {
  'dcx-diagnostic': DCX_AUDIT,
  'catalog-search-audit': '/services/digital-merchandising/audit/',
  'analytics-audit': '/services/digital-analytics/audit/',
  'cro-ux-audit': '/services/conversion-rate-optimization/audit/',
};
const SOLUTIONS = ['customer-experience-consulting', 'customer-journey-optimization', 'ecommerce-consulting'];

const legacyRedirects = [
  { source: '/index.html', destination: '/' },
  { source: '/diagnose', destination: DCX_AUDIT },
  { source: '/dcx-audit', destination: DCX_AUDIT },
  { source: '/build', destination: '/services/dcx-transformation/' },
  { source: '/run', destination: '/run-pods/' },
  // Any service's /dcx-audit, except the canonical one itself (that would loop).
  { source: '/services/:slug((?!dcx-transformation/)[^/]+)/dcx-audit', destination: DCX_AUDIT },
  ...Object.entries(AUDIT_MOVES).flatMap(([slug, to]) => [
    { source: `/audits/${slug}`, destination: to },
    { source: `/diagnose/${slug}`, destination: to },
  ]),
  { source: '/diagnose/:slug', destination: '/audits/:slug/' },
  ...SOLUTIONS.map((slug) => ({ source: `/solutions/${slug}`, destination: `/${slug}/` })),
  { source: '/solutions/:slug', destination: '/services/:slug/' },
  { source: '/industries/:path*', destination: '/' },
  { source: '/case-studies/:path*', destination: '/insights/' },
  { source: '/blog/:path*', destination: '/insights/:path*' },
].map((r) => ({ ...r, permanent: true }));

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: 'standalone',
  // Canonical URLs on the site end with a slash (/services/digital-analytics/).
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/fonts/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;

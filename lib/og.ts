/** URL of the generated Open Graph image for a page path (see app/og/[...slug]/route.tsx). */
export function ogImagePath(path: string) {
  if (path === '/') return '/og/home/';
  // Paginated and category listings share the insights image.
  if (/^\/insights\/(page|category)\//.test(path)) return '/og/insights/';
  return '/og' + path;
}

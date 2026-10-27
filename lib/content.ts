/**
 * Loads pages and insights from /content at build time.
 *
 *   content/pages/*.json            top-level pages (home, about, nine-gates, …)
 *   content/pages/services/*.json   key "svc:<slug>"
 *   content/pages/audits/*.json     key "audit:<slug>"
 *   content/pages/solutions/*.json  key "sol:<slug>"
 *   content/insights/NNN-*.json     one article each; the number sets the listing order
 *
 * Adding a JSON file is enough to publish a page: routes, sitemap and metadata pick it up.
 */
import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Page, Post } from './types';

const ROOT = path.join(process.cwd(), 'content');
// Re-read files on every request in dev so content edits show up on refresh.
const fresh = process.env.NODE_ENV === 'development';

function jsonFiles(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? jsonFiles(path.join(dir, e.name)) : e.name.endsWith('.json') ? [path.join(dir, e.name)] : [],
    )
    .sort();
}
const read = <T>(rel: string): T => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) as T;

function memo<T>(load: () => T): () => T {
  let v: T | undefined;
  return () => (fresh ? load() : (v ??= load()));
}

export const getPages = memo(() => jsonFiles('pages').map((f) => read<Page>(f)));

export const getPosts = memo(() => jsonFiles('insights').map((f) => read<Post>(f)));

export const getInsightsMeta = memo(() => read<{ title: string; description: string }>('site/insights-meta.json'));

export function getPage(key: string): Page | undefined {
  return getPages().find((p) => p.key === key);
}

const normalize = (p: string) => '/' + p.split('/').filter(Boolean).join('/') + (p === '/' || p === '' ? '' : '/');

export function getPageByPath(p: string): Page | undefined {
  const want = normalize(p);
  return getPages().find((pg) => normalize(pg.path) === want);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((x) => x.slug === slug);
}

export { postPath } from './paths';

/** Parses "July 28, 2026" style dates to ISO (YYYY-MM-DD). */
export function isoDate(d?: string): string | undefined {
  if (!d) return undefined;
  const t = Date.parse(d + ' UTC');
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().slice(0, 10);
}

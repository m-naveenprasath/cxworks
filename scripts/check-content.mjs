#!/usr/bin/env node
/**
 * Validates /content before you commit or deploy:  npm run content:check
 *
 * Errors (exit 1): missing required fields, duplicate paths/slugs, unknown block types,
 *                  internal links that point at no page.
 * Warnings:        SEO titles/descriptions outside the recommended length.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const errors = [];
const warnings = [];

const files = (dir) =>
  fs
    .readdirSync(path.join(CONTENT, dir), { recursive: true })
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(dir, f));
const read = (f) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT, f), 'utf8'));
  } catch (e) {
    errors.push(`${f}: invalid JSON (${e.message})`);
    return null;
  }
};

// Block types registered in components/blocks/registry.ts
const registry = fs.readFileSync(path.join(ROOT, 'components/blocks/registry.ts'), 'utf8');
const blockTypes = new Set([...registry.slice(registry.indexOf('BLOCKS')).matchAll(/^\s{2}(\w+): \w+,$/gm)].map((m) => m[1]));

const pages = files('pages').map((f) => [f, read(f)]).filter(([, p]) => p);
const posts = files('insights').map((f) => [f, read(f)]).filter(([, p]) => p);

const known = new Set(['/', '/insights/']);
const seen = new Map();
for (const [f, p] of pages) {
  for (const k of ['key', 'path', 'title', 'description', 'blocks']) if (p[k] == null) errors.push(`${f}: missing "${k}"`);
  if (p.path && !/^\/([a-z0-9-]+\/)*$/.test(p.path)) errors.push(`${f}: path "${p.path}" must be lowercase and end with "/"`);
  if (seen.has(p.path)) errors.push(`${f}: path ${p.path} also used by ${seen.get(p.path)}`);
  seen.set(p.path, f);
  known.add(p.path);
}
const slugs = new Set();
for (const [f, p] of posts) {
  for (const k of ['slug', 'cat', 't', 'title', 'd', 'date', 'secs']) if (p[k] == null) errors.push(`${f}: missing "${k}"`);
  if (slugs.has(p.slug)) errors.push(`${f}: duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  known.add(`/insights/${p.slug}/`);
}

const seo = (f, title, desc) => {
  if (title && (title.length < 25 || title.length > 65)) warnings.push(`${f}: title is ${title.length} chars (aim for 30–60)`);
  if (!desc) warnings.push(`${f}: no meta description`);
  else if (desc.length < 70 || desc.length > 165) warnings.push(`${f}: description is ${desc.length} chars (aim for 120–160)`);
};

function checkLinks(f, v) {
  if (typeof v === 'string') {
    if (v.startsWith('#/')) errors.push(`${f}: old hash link "${v}" (use a path like /about/)`);
    else if (/^\/[^/]/.test(v) && !/\.\w+$/.test(v) && v.length < 200 && !v.includes(' ')) {
      const p = v.split(/[?#]/)[0];
      if (!known.has(p) && p.endsWith('/')) errors.push(`${f}: link to unknown page ${v}`);
    }
  } else if (Array.isArray(v)) v.forEach((x) => checkLinks(f, x));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => checkLinks(f, x));
}

for (const [f, p] of pages) {
  (p.blocks || []).forEach((b, i) => {
    if (!blockTypes.has(b.type)) errors.push(`${f}: block ${i} has unknown type "${b.type}" (see components/blocks/registry.ts)`);
  });
  checkLinks(f, p.blocks);
  checkLinks(f, p.crumb);
  seo(f, p.title, p.description);
}
for (const [f, p] of posts) seo(f, p.title, p.d);
for (const f of files('site')) checkLinks(f, read(f));

for (const w of warnings) console.warn('warn  ' + w);
for (const e of errors) console.error('error ' + e);
console.log(`\n${pages.length} pages, ${posts.length} insights, ${blockTypes.size} block types: ${errors.length} errors, ${warnings.length} warnings`);
process.exitCode = errors.length ? 1 : 0;

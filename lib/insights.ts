/** Insights listing helpers: categories and pagination (server only, reads content). */
import 'server-only';
import { getPosts } from './content';
import type { Post } from './types';

export const PER_PAGE = 10;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Categories in first-seen order, with their URL slug. */
export function getCategories() {
  const seen = new Map<string, string>();
  for (const p of getPosts()) if (!seen.has(p.cat)) seen.set(p.cat, slugify(p.cat));
  return [...seen].map(([name, slug]) => ({ name, slug }));
}

export const categoryPath = (slug?: string) => (slug ? `/insights/category/${slug}/` : '/insights/');
export const listingPath = (catSlug: string | undefined, page: number) =>
  categoryPath(catSlug) + (page > 1 ? `page/${page}/` : '');

export interface Listing {
  cat?: { name: string; slug: string };
  page: number;
  pages: number;
  total: number;
  posts: Post[];
  path: string;
}

/** One page of the listing, optionally filtered by category slug. Returns null for an unknown category or page. */
export function getListing(catSlug: string | undefined, page: number): Listing | null {
  const cat = catSlug ? getCategories().find((c) => c.slug === catSlug) : undefined;
  if (catSlug && !cat) return null;
  const all = getPosts().filter((p) => !cat || p.cat === cat.name);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > pages) return null;
  return {
    cat,
    page,
    pages,
    total: all.length,
    posts: all.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    path: listingPath(cat?.slug, page),
  };
}

/** Every listing URL to pre-render: [category slug or undefined, page]. */
export function allListings(): [string | undefined, number][] {
  const out: [string | undefined, number][] = [];
  for (const cat of [undefined, ...getCategories().map((c) => c.slug)]) {
    const l = getListing(cat, 1)!;
    for (let p = 1; p <= l.pages; p++) out.push([cat, p]);
  }
  return out;
}

export type PostLike = Pick<Post, 'slug' | 'cat' | 't' | 'title' | 'd' | 'date'>;

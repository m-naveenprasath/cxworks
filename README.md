# CXWorks website

Marketing site for CXWorks, built with **Next.js 16 (App Router) + React 19 + TypeScript**.
Every page is statically generated at build time: full HTML, unique metadata, structured data
and a share image per URL.

```bash
npm install
npm run dev            # http://localhost:3000 (content edits show on refresh)
npm run build          # production build (pre-renders ~230 routes)
npm start              # serve the production build
npm run lint           # ESLint (Next + React Compiler rules)
npm run typecheck      # TypeScript
npm run content:check  # validate content: links, block types, SEO lengths
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, OG).
Optional: `NEXT_PUBLIC_GA_ID` (GA4), `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_FORM_ENDPOINT`.

## How it fits together

```
content/                 ← all copy lives here (JSON); no code changes needed to edit text
  pages/*.json           top-level pages        (home, about, nine-gates, contact, …)
  pages/services/*.json  /services/<slug>/      key "svc:<slug>"
  pages/audits/*.json    audit pages            key "audit:<slug>" (path set in the file)
  pages/solutions/*.json /<slug>/               key "sol:<slug>"
  insights/NNN-*.json    one article each; NNN sets the listing order
  site/*.json            shared data: gates, services, audits, reviews, charts, partners …

app/                     routes
  page.tsx               home
  [...slug]/page.tsx     every other content page, matched by its JSON "path"
  insights/…             listing, /page/N/, /category/<cat>/, and articles
  og/[...slug]/route.tsx generated 1200×630 share images
  sitemap.ts robots.ts manifest.ts icon.tsx not-found.tsx

components/
  blocks/                one component per block type + registry.ts (type → component)
  layout/                header + mobile menu, footer, marquee, scroll effects, thanks dialog
  views/                 PageView (renders blocks), insights listing, article
  forms/LeadForm.tsx     the lead form (Formspree), used by the cta/convert blocks
  ui/                    A (smart link), SectionHead, style tokens, hooks
lib/                     content loaders, SEO (metadata + JSON-LD), nav, site config
styles/                  globals.css (theme variables), fonts.css, hover.css
```

A page is a list of **blocks**. `PageView` looks up each block's `type` in
`components/blocks/registry.ts` and renders that component with the block's JSON as `b`.
Each block file starts with an interface documenting its fields.

Components are server components by default (zero JS). Only interactive pieces are
client components (`'use client'`): header/menu, forms, FAQ, carousel, charts, animated panels.

## Common tasks

**Edit text on a page.** Find the page in `content/pages/` (search for the sentence), edit, refresh.

**Change a page's SEO title / description.** The `title` and `description` fields at the top of the page JSON.
Aim for 30–60 and 120–160 characters; `npm run content:check` warns otherwise.

**Add a page.** Create `content/pages/my-page.json`:

```json
{
  "key": "my-page",
  "path": "/my-page/",
  "title": "My Page Title | CXWorks",
  "description": "What this page is about, in 120–160 characters.",
  "crumb": [["Home", "/"], ["My page"]],
  "blocks": [
    { "type": "hero", "eb": "Eyebrow", "a": "Headline,", "b": "highlighted part.", "lead": "Intro.", "ctas": [{ "l": "Get your free AI scan", "href": "/free-ai-scan/" }] },
    { "type": "faq", "eb": "", "h": "FAQ", "items": [["Question?", "Answer."]] },
    { "type": "cta", "h": "Talk to the team.", "p": "We reply within one business day.", "form": true }
  ]
}
```

It is live at `/my-page/`, in the sitemap, with metadata, breadcrumbs JSON-LD, FAQ schema and a share image.
Link to it from navigation in `lib/nav.ts` if needed.

**Add an article.** Copy a file in `content/insights/`, give it the next number, and change `slug`, `t`
(headline), `title`, `d` (meta description), `ex` (excerpt), `cat`, `date` and `secs`. Section bodies are
`{ "p": "…" }`, `{ "ul": ["…"] }` or `{ "tb": [["header", …], ["row", …]] }`. A new `cat` automatically gets
a category page at `/insights/category/<cat-slug>/`.

**Add a block type.** Create `components/blocks/MyBlock.tsx` (`export function MyBlock({ b }: BlockProps<MyBlockData>)`),
add it to `registry.ts`, then use `{ "type": "myblock", … }` in a page.

**Buttons.** `{ "l": "Label", "href": "/path/" }` links; `{ "l": "Book a call", "topic": "CRO Audit" }` opens
`/contact-us/?topic=…` with the topic preselected (must be one of `TOPICS` in `lib/links.ts`).

**Change brand colours.** The `:root` variables at the end of `styles/globals.css`.

**Change contact details, form endpoint, social links.** `lib/site.ts` (and `.env`).

**Redirect an old URL.** `next.config.ts` → `legacyRedirects` (308, keeps rankings).

## SEO checklist (built in)

- Static HTML for every route; `trailingSlash` canonical URLs; 308s from all old URLs.
- Per-page `<title>`, description, canonical, Open Graph and Twitter tags, generated share image.
- JSON-LD: Organization, WebSite, WebPage, BreadcrumbList, Service (services/audits/solutions),
  FAQPage (only where the FAQ is visible), BlogPosting, CollectionPage/ItemList (listings).
- `sitemap.xml`, `robots.txt`, web manifest, favicon; crawlable category and pagination pages.
- FAQ answers are in the HTML even when collapsed; article TOC uses real `#anchor` links.
- Old hash URLs (`/#/services/…`) are forwarded to the real page.
- `noindex: true` on a page or article hides it from search and the sitemap.

## Notes

- `_legacy/` is the previous single-page version, kept for comparison (open `_legacy/index.html`).
  It is not part of the build and can be deleted once you're happy with the migration.
- Styling uses inline styles plus the shared tokens in `components/ui/styles.ts`, which keeps the original
  design exactly. Some global rules in `globals.css` match on inline styles (`[style*='backdrop-filter']`),
  so keep those property names when restyling.
- 37 insights are marked `"draft": true` in their JSON. They were public on the old site and still are.
  Add `"noindex": true` (or delete the file) to hide one.
- Footer "Privacy policy" and "Terms" link to `/` until those pages exist.
- Deploy on Vercel (zero config) or any Node host (`npm run build && npm start`). Redirects need a
  Node/edge server, so this is not a pure static export.

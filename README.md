# Fitlab Reviews — Developer Handoff

Independent supplement testing publication. Static Next.js 15 site, fully deployable to any CDN.

---

## What Was Built

### Tech Stack
- **Next.js 15.3.2** with App Router, static export (`output: 'export'`)
- **TypeScript** throughout
- **CSS custom properties** design system (no Tailwind, no component library)
- **JSON data files** as the content layer

### Fonts
- **Antonio** — display headings
- **Host Grotesk** — body text
- **JetBrains Mono** — metadata, labels, kickers

All loaded via Google Fonts in `app/layout.tsx`.

### Pages Built (54 static routes)

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — 7 sections |
| `/reviews/` | `app/reviews/page.tsx` + `ReviewsClient.tsx` | Filter/sort UI, featured card |
| `/reviews/[slug]/` | `app/reviews/[slug]/page.tsx` | Full review detail |
| `/brands/` | `app/brands/page.tsx` + `BrandsClient.tsx` | Filter/search |
| `/brands/[slug]/` | `app/brands/[slug]/page.tsx` | Brand detail, products table |
| `/ingredients/` | `app/ingredients/page.tsx` + `IngredientsClient.tsx` | Filter/search |
| `/ingredients/[slug]/` | `app/ingredients/[slug]/page.tsx` | Ingredient detail |
| `/research/` | `app/research/page.tsx` + `ResearchFilters.tsx` | Research briefs index |
| `/research/[slug]/` | `app/research/[slug]/page.tsx` | Brief detail with full article |
| `/blog/` | `app/blog/page.tsx` | Blog index grid |
| `/blog/[slug]/` | `app/blog/[slug]/page.tsx` | Blog post detail |
| `/best/` | `app/best/page.tsx` | Best-of category rankings |
| `/methodology/` | `app/methodology/page.tsx` | How we test |
| `/about/` | `app/about/page.tsx` | Team, funding model, history |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated from data |
| `/robots.txt` | `app/robots.ts` | Allows all, excludes `/admin/` |

### Shared Components

| Component | Location | Description |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | Sticky nav, mobile drawer, ticker animation |
| `Footer` | `components/layout/Footer.tsx` | Newsletter form, footer links |
| `ConsentBanner` | `components/layout/ConsentBanner.tsx` | GDPR cookie banner (localStorage) |
| `ReviewCard` | `components/cards/ReviewCard.tsx` | Review card with rubric bars, SVG illustration |
| `FilterSidebar` | `components/filters/FilterSidebar.tsx` | Reusable filter rail for listing pages |

### Style System

All CSS lives in `app/globals.css`. Design tokens:

```css
--ink: #0a0a0a        /* primary text */
--paper: #f5f2ea      /* background */
--red: #d93025        /* accent / CTA */
--green-deep: #2d7a4f /* pass / editor's pick */
--f-head: 'Antonio'
--f-body: 'Host Grotesk'
--f-mono: 'JetBrains Mono'
```

---

## Project Structure

```
repo/
├── app/
│   ├── globals.css        ← all styles
│   ├── layout.tsx         ← root layout (Header, Footer, ConsentBanner)
│   ├── page.tsx           ← homepage
│   ├── about/
│   ├── best/
│   ├── blog/[slug]/
│   ├── brands/[slug]/
│   ├── ingredients/[slug]/
│   ├── methodology/
│   ├── research/[slug]/
│   ├── reviews/[slug]/
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── cards/ReviewCard.tsx
│   ├── filters/FilterSidebar.tsx
│   └── layout/
│       ├── ConsentBanner.tsx
│       ├── Footer.tsx
│       └── Header.tsx
├── data/                  ← JSON content files (replace with real data)
│   ├── brands.json
│   ├── reviews.json
│   ├── ingredients.json
│   ├── research.json
│   └── blog.json
├── lib/
│   ├── data.ts            ← data access helpers
│   └── types.ts           ← TypeScript interfaces
└── next.config.ts
```

---

## Link Structure

| Pattern | Example |
|---|---|
| `/reviews/{slug}/` | `/reviews/thorne-creatine/` |
| `/brands/{slug}/` | `/brands/transparent-labs/` |
| `/ingredients/{slug}/` | `/ingredients/creatine-monohydrate/` |
| `/research/{slug}/` | `/research/r-102-creatine-loading/` |
| `/blog/{slug}/` | `/blog/proprietary-blends-tax/` |

All routes use trailing slashes (`trailingSlash: true` in `next.config.ts`). Internal `<Link>` components all include the trailing slash.

---

## What's Left to Build

These items were scoped but not completed:

### High Priority
- **Real review content** — The `[slug]` detail pages render static placeholder copy alongside real data fields. Each detail page needs real article body content (ingredient analysis, lab findings, narrative). This is a content task, not a code task.
- **Real research brief bodies** — `research/[slug]/page.tsx` renders generic placeholder sections. Swap in actual study summaries, evidence tables, and citations.
- **Real blog post content** — `blog/[slug]/page.tsx` renders placeholder article text. Replace with real post bodies.
- **Newsletter form** — The email input in the Footer and on the homepage currently has no action. Wire to Mailchimp, ConvertKit, Beehiiv, or similar.
- **Search** — No global search. Each listing page has local filter/search; a site-wide search (Algolia, Pagefind) is not yet implemented.

### Medium Priority
- **Authentication / subscriber wall** — No paywall is implemented. The site is fully public. If subscription-only content is needed, add NextAuth or a Clerk integration.
- **Analytics** — No tracking installed. Add Plausible, Fathom, or GA4 inside `app/layout.tsx` (respect the ConsentBanner before firing).
- **Image optimization** — Product illustrations are inline SVGs. Real product photography or brand logo images would need to be added to `public/` and referenced in the JSON.
- **Best-of page depth** — `/best/` is a static placeholder. Consider a dynamic category page that pulls top-scored reviews per category from `reviews.json`.
- **Recall wall** — The homepage references active recalls. A dedicated `/recalls/` page is not built.

### Low Priority
- **Dark mode** — CSS tokens are in place (`--paper`, `--ink`), but no `prefers-color-scheme` media query or toggle is implemented.
- **Pagination** — All listing pages render all items client-side. At scale (500+ reviews), pagination or virtual scrolling would improve performance.
- **Breadcrumbs** — Individual detail pages don't have breadcrumb navigation.
- **JSON-LD structured data** — `generateMetadata` is implemented for SEO titles/descriptions. `Article`, `Product`, and `BreadcrumbList` JSON-LD schemas are not yet added.

---

## How to Replace Demo Data with Real Content

All content is driven by five JSON files in `data/`. Replace them to populate the real site.

### Schema Quick Reference

**`data/reviews.json`**
```json
{
  "reviews": [{
    "slug": "brand-product-name",
    "brand_slug": "brand-name",
    "brand": "Brand Name",
    "product": "Product Name",
    "cat": "Protein",
    "illus": "tub",
    "score": 9.2,
    "pick": true,
    "blurb": "Short verdict sentence.",
    "rubric": {
      "Ingredient": 9.5,
      "Dosing": 9.0,
      "Transparency": 9.2,
      "Value": 8.8
    },
    "tags": [{ "t": "NSF Certified" }, { "t": "Prop 65 pass" }],
    "has_detail": true,
    "last_tested": "2026-04-15"
  }]
}
```
> `illus` controls the SVG product illustration: `tub`, `bottle`, `jar`, `pouch`, or `shaker`.
> `tags` can be plain strings or objects `{ "t": "label", "c": "optional-css-class" }`.

**`data/brands.json`**
```json
{
  "brands": [{
    "slug": "brand-name",
    "name": "Brand Name",
    "letter": "B",
    "initials": "BN",
    "cat": "Protein",
    "region": "US",
    "hq": "Austin, TX",
    "founded": 2014,
    "blurb": "One-sentence brand description.",
    "score": 8.7,
    "n_prod": 12,
    "recalls": 0,
    "dev_pct": "4%",
    "trust": "High",
    "certs": ["NSF", "Informed Sport"],
    "featured": true,
    "has_detail": true,
    "trust_breakdown": {
      "disclosure": 9.2,
      "lab_verify": 9.0,
      "mfg": 8.5,
      "track_record": 8.8,
      "pricing": 7.9
    },
    "mfg": "In-house, Lehi UT",
    "mfg_blurb": "Manufactures in a cGMP facility.",
    "who_blurb": "Founded by a former powerlifter.",
    "products": [{
      "slug": "brand-product-name",
      "name": "Product Name",
      "cat": "Protein",
      "illus": "tub",
      "score": 9.2,
      "pick": true,
      "audits": 3,
      "last": "2026-04-15"
    }]
  }]
}
```

**`data/ingredients.json`**
```json
{
  "ingredients": [{
    "slug": "creatine-monohydrate",
    "name": "Creatine Monohydrate",
    "sym": "Cr",
    "cat": "Performance",
    "primary_effect": "ATP resynthesis",
    "formula": "C4H9N3O2",
    "mw": "131.13 g/mol",
    "alt_names": ["CreaPure", "Creatine"],
    "grade": "A",
    "verdict": "Extensively studied. Works.",
    "meta": "★ Editor's pick",
    "dose": 5,
    "dose_unit": "g/day",
    "dose_range": "3–5 g/day",
    "nprod": 48,
    "summary": "One-paragraph summary.",
    "featured": true,
    "has_detail": true,
    "mech_short": "Replenishes PCr in muscle, enabling sustained high-intensity effort.",
    "side_effects": ["Water retention (intramuscular)"],
    "stack_with": ["Beta-alanine", "Caffeine"]
  }]
}
```

**`data/research.json`**
```json
{
  "briefs": [{
    "slug": "r-101-study-title",
    "id": "R-101",
    "type": "Meta-analysis",
    "title": "Study title here",
    "key": "One-line key finding.",
    "author": "Dr. Author Name",
    "author_av": "AN",
    "date": "2026-03-22",
    "mins": 8,
    "citations": 42,
    "reads": 1840,
    "grade": "A",
    "evidence": "Strong",
    "pick": true,
    "has_detail": true
  }]
}
```

**`data/blog.json`**
```json
{
  "posts": [{
    "slug": "post-slug",
    "cat": "Analysis",
    "title": "Post title",
    "dek": "Subtitle / deck sentence.",
    "author": "Author Name",
    "author_av": "AN",
    "date": "2026-04-10",
    "mins": 6,
    "reads": 3200,
    "pick": false,
    "has_detail": true
  }]
}
```

---

## Development Commands

```bash
npm run dev      # local dev server at localhost:3000
npm run build    # production build → out/
```

Output goes to `out/` — a fully static directory ready to upload to Netlify, Vercel, Cloudflare Pages, or any CDN.

---

## Deployment

Because `output: 'export'` is set, this is a fully static site. Deploy the `out/` directory.

- **Netlify** — connect the repo, set build command `npm run build`, publish dir `out`
- **Vercel** — connect the repo; Next.js is auto-detected
- **Cloudflare Pages** — same as Netlify
- **S3 + CloudFront** — upload `out/` to a bucket with static website hosting enabled

---

## Changing the Domain

Three places reference `https://fitlabreviews.com`:

1. `app/sitemap.ts` — `const BASE = 'https://fitlabreviews.com'`
2. `app/robots.ts` — `sitemap:` field
3. `app/layout.tsx` — `metadataBase` in `export const metadata`

Update all three if the domain changes.

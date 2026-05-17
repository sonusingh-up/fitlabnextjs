import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { brands, reviews, ingredients, researchBriefs, blogPosts, comparisons } from '@/lib/data';

const BASE = 'https://fitlabreviews.com';

const STACK_SLUGS = [
  'cognitive-focus',
  'complete-supplement-stack',
  'endurance',
  'fat-loss',
  'foundational-health',
  'muscle-gain',
  'pre-workout-performance',
  'recovery',
  'sleep-optimization',
  'stress-cortisol',
];

const INDIA_SLUGS = [
  'best-pre-workout-supplements-india-2026',
  'best-protein-supplements-india-2026',
  'best-vitamins-minerals-india-2026',
];

const BEST_SLUGS = [
  'best-creatine',
  'best-fat-burners',
  'best-mass-gainers',
  'best-nootropics-under-30',
  'best-pre-workouts',
  'best-protein-powders',
  'best-sleep-supplements',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE + '/', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: BASE + '/reviews/', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: BASE + '/brands/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: BASE + '/ingredients/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/research/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/blog/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/best/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: BASE + '/stacks/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/compare/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/india/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/methodology/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: BASE + '/about/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: BASE + '/privacy/', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: BASE + '/terms/', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const brandPages = brands.map(b => ({
    url: `${BASE}/brands/${b.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const reviewPages = reviews.map(r => ({
    url: `${BASE}/reviews/${r.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const ingredientPages = ingredients.map(i => ({
    url: `${BASE}/ingredients/${i.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const researchPages = researchBriefs.map(r => ({
    url: `${BASE}/research/${r.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts.map(p => ({
    url: `${BASE}/blog/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparePages = comparisons.map((c: { slug: string }) => ({
    url: `${BASE}/compare/${c.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const stackPages = STACK_SLUGS.map(slug => ({
    url: `${BASE}/stacks/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const indiaPages = INDIA_SLUGS.map(slug => ({
    url: `${BASE}/india/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const bestPages = BEST_SLUGS.map(slug => ({
    url: `${BASE}/best/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...reviewPages,
    ...ingredientPages,
    ...researchPages,
    ...blogPages,
    ...comparePages,
    ...stackPages,
    ...indiaPages,
    ...bestPages,
  ];
}

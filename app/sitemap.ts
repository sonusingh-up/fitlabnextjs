import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { brands, reviews, ingredients, researchBriefs, blogPosts } from '@/lib/data';

const BASE = 'https://fitlabreviews.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE + '/', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: BASE + '/reviews/', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: BASE + '/brands/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: BASE + '/ingredients/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/research/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/blog/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: BASE + '/best/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: BASE + '/methodology/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: BASE + '/about/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
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

  return [
    ...staticPages,
    ...brandPages,
    ...reviewPages,
    ...ingredientPages,
    ...researchPages,
    ...blogPages,
  ];
}

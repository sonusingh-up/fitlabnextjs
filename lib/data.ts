import brandsRaw from '@/data/brands.json';
import reviewsRaw from '@/data/reviews.json';
import ingredientsRaw from '@/data/ingredients.json';
import researchRaw from '@/data/research.json';
import blogRaw from '@/data/blog.json';
import type { Brand, Review, Ingredient, ResearchBrief, BlogPost } from './types';

export const brands: Brand[] = ((brandsRaw as unknown) as { brands: Brand[] }).brands;
export const reviews: Review[] = ((reviewsRaw as unknown) as { reviews: Review[] }).reviews;
export const ingredients: Ingredient[] = ((ingredientsRaw as unknown) as { ingredients: Ingredient[] }).ingredients;
export const researchBriefs: ResearchBrief[] = ((researchRaw as unknown) as { briefs: ResearchBrief[] }).briefs;
export const blogPosts: BlogPost[] = ((blogRaw as unknown) as { posts: BlogPost[] }).posts;

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug);
}
export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find(r => r.slug === slug);
}
export function getIngredientBySlug(slug: string): Ingredient | undefined {
  return ingredients.find(i => i.slug === slug);
}
export function getResearchBySlug(slug: string): ResearchBrief | undefined {
  return researchBriefs.find(r => r.slug === slug);
}
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function scoreClass(score: number): string {
  return score >= 8.5 ? 'hi' : score >= 7 ? 'mid' : 'lo';
}
export function gradeClass(grade: string): string {
  return (grade || '').replace('+', '').replace('-', '').charAt(0);
}

export function fmtDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
}
export function fmtDateShort(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
}

export interface BrandProduct {
  slug: string;
  name: string;
  cat: string;
  illus: string;
  score: number;
  pick: boolean;
  audits: number;
  last: string;
}

export interface Brand {
  slug: string;
  name: string;
  letter: string;
  initials: string;
  cat: string;
  region: string;
  hq: string;
  founded: string | number;
  blurb: string;
  score: number;
  n_prod: number;
  recalls: number;
  dev_pct: string;
  trust: string;
  certs: string[];
  featured: boolean;
  has_detail: boolean;
  trust_breakdown: { disclosure: number; lab_verify: number; mfg: number; track_record: number; pricing: number };
  mfg: string;
  mfg_blurb: string;
  who_blurb: string;
  products: BrandProduct[];
}

export interface Review {
  slug: string;
  brand_slug: string;
  brand: string;
  product: string;
  cat: string;
  illus: string;
  score: number;
  pick: boolean;
  blurb: string;
  rubric: { Ingredient: number; Dosing: number; Transparency: number; Value: number };
  tags: Array<string | { t: string; c?: string }>;
  has_detail: boolean;
  last_tested: string;
}

export interface Ingredient {
  slug: string;
  name: string;
  sym: string;
  cat: string;
  primary_effect: string;
  formula: string;
  mw: string;
  alt_names: string[];
  grade: string;
  verdict: string;
  meta: string;
  dose: number;
  dose_unit: string;
  dose_range: string;
  nprod: number;
  summary: string;
  featured: boolean;
  has_detail: boolean;
  mech_short: string;
  side_effects: string[];
  stack_with: string[];
}

export interface ResearchBrief {
  slug: string;
  id: string;
  type: string;
  title: string;
  key: string;
  author: string;
  author_av: string;
  date: string;
  mins: number;
  citations: number;
  reads: number;
  grade: string;
  evidence: string;
  pick: boolean;
  has_detail: boolean;
}

export interface BlogPost {
  slug: string;
  cat: string;
  title: string;
  dek: string;
  author: string;
  author_av: string;
  date: string;
  mins: number;
  reads: number;
  pick: boolean;
  has_detail: boolean;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ingredients } from '@/lib/data';
import type { Ingredient } from '@/lib/types';
import IngredientsClient from './IngredientsClient';

export const metadata: Metadata = {
  title: 'Supplement Ingredients Library — Evidence-Based Guides · Fitlab',
  description:
    '312 supplement ingredients indexed with evidence grades, clinical dose ranges, mechanism summaries, and the products that contain them. Independent. No paid placements.',
};

const GRADE_ORDER: Record<string, number> = { 'A+': 0, A: 1, B: 2, C: 3, D: 4, F: 5 };

const EFFECT_ACCENT: Record<string, string> = {
  muscle:   'var(--red)',
  energy:   'var(--amber)',
  cog:      'var(--green)',
  sleep:    '#2563eb',
  heart:    '#c2185b',
  recovery: 'var(--mute-2)',
};

function gradeColor(grade: string) {
  const g = grade.replace('+', '');
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  if (g === 'D') return 'var(--red-deep)';
  return 'var(--ink)';
}

export default function IngredientsPage() {
  const featured: Ingredient =
    ingredients.find(i => i.featured) ??
    ingredients.slice().sort((a, b) => (GRADE_ORDER[a.grade] ?? 9) - (GRADE_ORDER[b.grade] ?? 9))[0];

  const topIngredients = ingredients
    .slice()
    .sort((a, b) => (GRADE_ORDER[a.grade] ?? 9) - (GRADE_ORDER[b.grade] ?? 9))
    .slice(0, 32);

  const EFFECT_STRIP = [
    { key: 'muscle',   num: '01', title: 'Muscle &\nStrength' },
    { key: 'energy',   num: '02', title: 'Energy' },
    { key: 'cog',      num: '03', title: 'Cognition' },
    { key: 'sleep',    num: '04', title: 'Sleep' },
    { key: 'heart',    num: '05', title: 'Heart' },
    { key: 'recovery', num: '06', title: 'Recovery' },
  ].map(e => ({
    ...e,
    count: ingredients.filter(i => i.primary_effect === e.key).length,
  }));

  const featuredGrade = featured.grade ?? '—';
  const featuredGradeColor = gradeColor(featuredGrade);

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/ingredients" className="active">All ingredients</Link>
            <Link href="/ingredients">By evidence</Link>
            <Link href="/ingredients">Most-asked</Link>
            <span className="spacer" />
            <span className="meta">312 ingredients · 412 citations · Re-graded quarterly</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="idx-hero">
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>
            INGREDIENTS · EVIDENCE-GRADED · Q2 2026
          </div>
          <h1>
            Ingredients
            <br />
            library.
          </h1>
          <div className="meta-grid" style={{ gridTemplateColumns: '1fr auto auto auto auto' }}>
            <p className="lede">
              Every supplement ingredient we cover, scored on a modified GRADE framework.
              Plain-language summaries, clinical dose ranges, and the products that actually
              contain a useful dose.{' '}
              <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
                How we grade evidence →
              </Link>
            </p>
            <div className="stat">
              <div className="v">312</div>
              <div className="k">Ingredients</div>
            </div>
            <div className="stat">
              <div className="v green">40</div>
              <div className="k">Grade A / A+</div>
            </div>
            <div className="stat">
              <div className="v">412</div>
              <div className="k">Citations</div>
            </div>
            <div className="stat">
              <div className="v red">8</div>
              <div className="k">Avoid list</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 28, paddingBottom: 0 }}>

        {/* Featured ingredient spotlight */}
        <article className="ing-spot" style={{ marginBottom: 28 }}>
          {/* Chemistry symbol block */}
          <div className="sym-block">
            <span className="num">// 01</span>
            <span className="mw">{featured.mw} g/mol</span>
            <span className="sym">{featured.sym}</span>
            <span className="nm">{featured.name}</span>
          </div>

          {/* Body */}
          <div className="body">
            <span className="cat">{featured.cat.toUpperCase()}</span>
            <h2>{featured.name}</h2>
            <p className="summary">{featured.summary}</p>
            <div className="key-pairs">
              <div>
                <div className="v">{featured.dose}</div>
                <div className="k">Clinical dose</div>
              </div>
              <div>
                <div className="v">{featured.meta.match(/\d+/)?.[0] ?? '—'}</div>
                <div className="k">RCTs pooled</div>
              </div>
              <div>
                <div className="v">{featured.nprod}</div>
                <div className="k">Products w/it</div>
              </div>
              <div>
                <div className="v" style={{ color: featuredGradeColor }}>{featuredGrade}</div>
                <div className="k">Evidence</div>
              </div>
            </div>
          </div>

          {/* Side: grade box */}
          <div className="side">
            <div className="verdict-tag">{featured.verdict.toUpperCase()}</div>
            <div className="grade-box">
              <div className="gl">Evidence</div>
              <div className="gv" style={{ color: featuredGradeColor }}>{featuredGrade}</div>
              <div className="gd">{featured.meta}</div>
            </div>
            <Link href={`/ingredients/${featured.slug}/`} className="read">
              Full ingredient guide →
            </Link>
          </div>
        </article>

        {/* Top-by-effect strip */}
        <div className="effect-strip">
          {EFFECT_STRIP.map(e => (
            <a key={e.key} href={`#effect-${e.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="top">/ {e.num} · {e.key.toUpperCase()}</div>
              <div className="nm" style={{ whiteSpace: 'pre-line' }}>{e.title}</div>
              <div className="ct"><b>{e.count}</b> ingredients</div>
            </a>
          ))}
        </div>

        {/* Periodic-table featured grid */}
        <div className="cat-head">
          <div className="l"><span className="num">/ 01</span> The top 32</div>
          <div className="n">Evidence grade ≥ B · most-asked</div>
        </div>

        <div className="periodic" style={{ marginBottom: 32 }}>
          {topIngredients.map((ing, idx) => {
            const grade = ing.grade ?? '—';
            const effect = ing.primary_effect ?? '';
            const accentColor = EFFECT_ACCENT[effect] ?? 'var(--mute-2)';
            const sub = ing.cat.split('·')[0].trim();
            const isFeatured = ing.slug === featured.slug;

            return (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}/`}
                className={`pell${isFeatured ? ' featured' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="top">
                  <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="ev">
                    <div
                      className="gv"
                      style={
                        grade.startsWith('A')
                          ? { color: isFeatured ? 'var(--paper)' : 'var(--green-deep)' }
                          : {}
                      }
                    >
                      {grade}
                    </div>
                    <div className="gl">EVID</div>
                  </span>
                </div>
                <div className="sym">{ing.sym}</div>
                <div className="pn">{ing.name.split(' ')[0]}</div>
                <div className="sub">{sub}</div>
                <div className="acc" style={{ background: accentColor }} />
              </Link>
            );
          })}
        </div>

        {/* Trending callout */}
        <div className="trending" style={{ marginBottom: 28 }}>
          <h3>What people <em>are</em><br />searching this week.</h3>
          <ul>
            <li>
              <span className="n">01</span>
              <span className="nm">Creatine — does loading matter?</span>
              <span className="d up">↑ 84%</span>
            </li>
            <li>
              <span className="n">02</span>
              <span className="nm">Ashwagandha — KSM-66 vs Sensoril</span>
              <span className="d up">↑ 41%</span>
            </li>
            <li>
              <span className="n">03</span>
              <span className="nm">Magnesium L-threonate — cognition claim</span>
              <span className="d up">↑ 36%</span>
            </li>
            <li>
              <span className="n">04</span>
              <span className="nm">Berberine — Ozempic comparison</span>
              <span className="d up">↑ 28%</span>
            </li>
            <li>
              <span className="n">05</span>
              <span className="nm">Melatonin — pediatric labeling</span>
              <span className="d dn">↓ 12%</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Client: filter + table */}
      <IngredientsClient ingredients={ingredients} featuredSlug={featured.slug} />
    </>
  );
}

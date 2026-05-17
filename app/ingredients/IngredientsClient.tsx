'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FilterSidebar from '@/components/filters/FilterSidebar';
import type { Ingredient } from '@/lib/types';

const EFFECT_LABELS: Record<string, { num: string; title: string }> = {
  muscle:   { num: '01', title: 'Muscle & Strength' },
  energy:   { num: '02', title: 'Energy' },
  cog:      { num: '03', title: 'Cognition & Focus' },
  sleep:    { num: '04', title: 'Sleep & Relaxation' },
  heart:    { num: '05', title: 'Heart & Metabolism' },
  recovery: { num: '06', title: 'Recovery' },
};

const EFFECT_ACCENT: Record<string, string> = {
  muscle:   'var(--red)',
  energy:   'var(--amber)',
  cog:      'var(--green)',
  sleep:    '#2563eb',
  heart:    '#c2185b',
  recovery: 'var(--mute-2)',
};

const SORT_OPTIONS = [
  { label: 'Evidence grade ↓', value: 'grade' },
  { label: 'Most products', value: 'products' },
  { label: 'Alphabetical', value: 'alpha' },
];

const PAGE_SIZE = 30;

const GRADE_ORDER: Record<string, number> = { 'A+': 0, A: 1, B: 2, C: 3, D: 4, F: 5 };

interface Props {
  ingredients: Ingredient[];
  featuredSlug?: string;
}

function gradeColorStyle(grade: string): React.CSSProperties {
  const g = grade.replace('+', '');
  if (g === 'A') return { color: 'var(--green-deep)' };
  if (g === 'B') return { color: 'var(--ink)' };
  if (g === 'C') return { color: '#8a6b00' };
  if (g === 'D') return { color: 'var(--red-deep)' };
  return {};
}

export default function IngredientsClient({ ingredients, featuredSlug }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({
    effect: new Set(),
    grade: new Set(),
  });
  const [sort, setSort] = useState('grade');
  const [page, setPage] = useState(1);

  function handleFilterChange(key: string, value: string) {
    setActiveFilters(prev => {
      const next = { ...prev };
      const s = new Set(prev[key] ?? []);
      if (s.has(value)) s.delete(value); else s.add(value);
      next[key] = s;
      return next;
    });
    setPage(1);
  }

  function handleSearch(q: string) {
    setQuery(q);
    setPage(1);
  }

  const pool = useMemo(
    () => ingredients.filter(i => i.slug !== featuredSlug),
    [ingredients, featuredSlug],
  );

  const filtered = useMemo(() => {
    let items = pool;

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.sym.toLowerCase().includes(q) ||
        i.cat.toLowerCase().includes(q) ||
        (Array.isArray(i.alt_names) ? i.alt_names.join(' ') : String(i.alt_names)).toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q),
      );
    }

    const effectFilters = activeFilters.effect;
    if (effectFilters && effectFilters.size > 0) {
      items = items.filter(i => effectFilters.has(i.primary_effect));
    }

    const gradeFilters = activeFilters.grade;
    if (gradeFilters && gradeFilters.size > 0) {
      items = items.filter(i => gradeFilters.has(i.grade.toUpperCase()));
    }

    const sorted = [...items];
    if (sort === 'grade') {
      sorted.sort((a, b) => (GRADE_ORDER[a.grade] ?? 9) - (GRADE_ORDER[b.grade] ?? 9));
    } else if (sort === 'products') {
      sorted.sort((a, b) => b.nprod - a.nprod);
    } else {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [pool, query, activeFilters, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount =
    Object.values(activeFilters).reduce((s, set) => s + set.size, 0) + (query ? 1 : 0);

  // Group visible by primary_effect
  const grouped: Record<string, Ingredient[]> = {};
  visible.forEach(i => {
    const k = i.primary_effect || 'other';
    (grouped[k] = grouped[k] ?? []).push(i);
  });

  const filterGroups = [
    {
      title: 'Primary effect',
      key: 'effect',
      options: [
        { label: 'Muscle & Strength', value: 'muscle' },
        { label: 'Energy', value: 'energy' },
        { label: 'Cognition', value: 'cog' },
        { label: 'Sleep', value: 'sleep' },
        { label: 'Heart', value: 'heart' },
        { label: 'Recovery', value: 'recovery' },
      ],
    },
    {
      title: 'Evidence grade',
      key: 'grade',
      options: [
        { label: 'A+', value: 'A+' },
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' },
      ],
    },
  ];

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
      <div className="with-rail">
        <FilterSidebar
          groups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          searchQuery={query}
          resultCount={filtered.length}
        />

        <main>
          {/* Toolbar */}
          <div className="toolbar">
            <div className="results">
              <b>{filtered.length}</b> ingredients
              {activeCount > 0 && <> · <span>{activeCount}</span> filters applied</>}
            </div>
            <div className="actions">
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {query && (
                <button className="chip-filter on" onClick={() => handleSearch('')} style={{ cursor: 'pointer' }}>
                  &ldquo;{query}&rdquo; ×
                </button>
              )}
              {Object.entries(activeFilters).map(([key, vals]) =>
                Array.from(vals).map(v => (
                  <button
                    key={`${key}:${v}`}
                    className="chip-filter on"
                    onClick={() => handleFilterChange(key, v)}
                    style={{ cursor: 'pointer' }}
                  >
                    {v} ×
                  </button>
                )),
              )}
              <button
                onClick={() => { setQuery(''); setActiveFilters({ effect: new Set(), grade: new Set() }); setPage(1); }}
                style={{
                  fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 10px', background: 'none', border: '1px solid var(--line-2)', cursor: 'pointer', color: 'var(--mute)',
                }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results */}
          {visible.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', border: '1px dashed var(--line-2)', color: 'var(--mute)' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>
                No ingredients match.
              </div>
              <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto 16px' }}>
                Try removing some filters or broadening your search.
              </p>
              <button
                onClick={() => { setQuery(''); setActiveFilters({ effect: new Set(), grade: new Set() }); setPage(1); }}
                style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px 18px', background: 'var(--ink)', color: 'var(--paper)', border: 0, cursor: 'pointer' }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              {Object.entries(grouped).map(([effect, items]) => {
                const lbl = EFFECT_LABELS[effect] ?? { num: '00', title: effect };
                return (
                  <div key={effect} id={`effect-${effect}`}>
                    <div className="cat-head">
                      <div className="l">
                        <span className="num">/ {lbl.num}</span> {lbl.title}
                      </div>
                      <div className="n">{items.length} entries</div>
                    </div>

                    <div className="ing-tbl">
                      <div className="ing-tbl-head">
                        <div />
                        <div>Ingredient · Form</div>
                        <div>Evidence</div>
                        <div>What it does</div>
                        <div>Clinical dose</div>
                        <div>Products</div>
                        <div />
                      </div>

                      {items.map(ing => (
                        <Link
                          key={ing.slug}
                          href={`/ingredients/${ing.slug}/`}
                          className="ing-tbl-row"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <div className="mini-sym">
                            {ing.sym}
                            <span
                              className="acc"
                              style={{ background: EFFECT_ACCENT[ing.primary_effect] ?? 'var(--mute-2)' }}
                            />
                          </div>
                          <div className="nm">
                            {ing.name}
                            <small>{ing.cat}</small>
                          </div>
                          <div className="ev-grade">
                            <span className="g" style={gradeColorStyle(ing.grade)}>
                              {ing.grade}
                            </span>
                            <span className="ml">{ing.meta}</span>
                          </div>
                          <div className="verdict">
                            {ing.summary.slice(0, 120)}
                            {ing.summary.length > 120 ? '…' : ''}
                          </div>
                          <div className="dose">
                            {String(ing.dose)}
                            <small>{ing.dose_unit}</small>
                          </div>
                          <div className="n-prod">
                            {ing.nprod}
                            <small>products</small>
                          </div>
                          <div className="cta">Read</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pager">
              {page > 1 && (
                <button className="pg-btn" onClick={() => setPage(p => p - 1)}>← Prev</button>
              )}
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`pg-btn${p === page ? ' active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              {totalPages > 10 && page < totalPages && (
                <button className="pg-btn" onClick={() => setPage(p => p + 1)}>Next →</button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

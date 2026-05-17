'use client';

import { useState, useMemo } from 'react';
import ReviewCard from '@/components/cards/ReviewCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import type { Review } from '@/lib/types';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Proteins', value: 'protein' },
  { label: 'Pre-Workout', value: 'pre' },
  { label: 'Creatine', value: 'creatine' },
  { label: 'BCAAs', value: 'bcaa' },
  { label: 'Vitamins', value: 'vitamin' },
  { label: 'Greens', value: 'greens' },
];

const SORT_OPTIONS = [
  { label: 'Highest scored', value: 'score' },
  { label: 'Recently tested', value: 'recent' },
  { label: 'Alphabetical', value: 'alpha' },
  { label: 'Lowest scored', value: 'low' },
];

const PAGE_SIZE = 12;

interface Props {
  reviews: Review[];
  featuredSlug?: string;
}

export default function ReviewsClient({ reviews, featuredSlug }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({
    cat: new Set(),
    cert: new Set(),
  });
  const [sort, setSort] = useState('score');
  const [page, setPage] = useState(1);
  const [catTab, setCatTab] = useState('');

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

  const pool = useMemo(() => {
    return reviews.filter(r => featuredSlug ? r.slug !== featuredSlug : true);
  }, [reviews, featuredSlug]);

  const filtered = useMemo(() => {
    let items = pool;

    if (catTab) {
      items = items.filter(r => r.cat.toLowerCase().includes(catTab));
    }

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(r =>
        r.brand.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q)
      );
    }

    const catFilters = activeFilters.cat;
    if (catFilters && catFilters.size > 0) {
      items = items.filter(r =>
        [...catFilters].some(v => r.cat.toLowerCase().includes(v.toLowerCase()))
      );
    }

    const certFilters = activeFilters.cert;
    if (certFilters && certFilters.size > 0) {
      items = items.filter(r =>
        [...certFilters].some(v =>
          r.tags?.some(c => (typeof c === 'string' ? c : c.t).toLowerCase().includes(v.toLowerCase()))
        )
      );
    }

    const sorted = [...items];
    if (sort === 'score') sorted.sort((a, b) => b.score - a.score);
    else if (sort === 'recent') sorted.sort((a, b) => (b.last_tested ?? '').localeCompare(a.last_tested ?? ''));
    else if (sort === 'alpha') sorted.sort((a, b) => (a.brand + a.product).localeCompare(b.brand + b.product));
    else if (sort === 'low') sorted.sort((a, b) => a.score - b.score);

    return sorted;
  }, [pool, query, activeFilters, sort, catTab]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount =
    Object.values(activeFilters).reduce((s, set) => s + set.size, 0) +
    (query ? 1 : 0);

  const filterGroups = [
    {
      title: 'Category',
      key: 'cat',
      options: [
        { label: 'Whey Isolate', value: 'whey isolate' },
        { label: 'Pre-Workout', value: 'pre' },
        { label: 'Creatine', value: 'creatine' },
        { label: 'Protein Blend', value: 'protein blend' },
        { label: 'BCAAs', value: 'bcaa' },
        { label: 'Vitamins', value: 'vitamin' },
      ],
    },
    {
      title: 'Certifications',
      key: 'cert',
      options: [
        { label: 'NSF Certified', value: 'nsf' },
        { label: 'Informed Sport', value: 'informed' },
        { label: 'cGMP', value: 'cgmp' },
        { label: 'Informed Choice', value: 'informed choice' },
      ],
    },
  ];

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
      {/* Sub-nav category tabs */}
      <div className="sub-nav" style={{ marginBottom: 0 }}>
        <div className="sub-nav-inner" style={{ paddingLeft: 0, paddingRight: 0 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              className={catTab === c.value ? 'active' : ''}
              onClick={() => { setCatTab(c.value); setPage(1); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0', fontFamily: 'inherit' }}
            >
              {c.label}
            </button>
          ))}
          <span className="spacer" />
          <span className="meta">Last lab run · May 12, 2026</span>
        </div>
      </div>

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
              <b>{filtered.length}</b> products{activeCount > 0 && <> · <span>{activeCount}</span> filters applied</>}
            </div>
            <div className="actions">
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {activeCount > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {query && (
                <button
                  className="chip-filter on"
                  onClick={() => handleSearch('')}
                  style={{ cursor: 'pointer' }}
                >
                  "{query}" ×
                </button>
              )}
              {Object.entries(activeFilters).map(([key, vals]) =>
                [...vals].map(v => (
                  <button
                    key={`${key}:${v}`}
                    className="chip-filter on"
                    onClick={() => handleFilterChange(key, v)}
                    style={{ cursor: 'pointer' }}
                  >
                    {v} ×
                  </button>
                ))
              )}
            </div>
          )}

          {visible.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', border: '1px dashed var(--line-2)', color: 'var(--mute)' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>
                No products match.
              </div>
              <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto 16px' }}>
                Try removing some filters or broadening your search.
              </p>
              <button
                onClick={() => { setQuery(''); setActiveFilters({ cat: new Set(), cert: new Set() }); setCatTab(''); setPage(1); }}
                style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px 18px', background: 'var(--ink)', color: 'var(--paper)', border: 0, cursor: 'pointer' }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="bgrid-2">
              {visible.map(r => <ReviewCard key={r.slug} review={r} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pager">
              {page > 1 && (
                <button className="pg-btn" onClick={() => setPage(p => p - 1)}>← Prev</button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`pg-btn${p === page ? ' active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              {page < totalPages && (
                <button className="pg-btn" onClick={() => setPage(p => p + 1)}>Next →</button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

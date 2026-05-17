'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FilterSidebar from '@/components/filters/FilterSidebar';
import type { FilterGroup } from '@/components/filters/FilterSidebar';

// Raw JSON shape (the actual runtime data)
interface RawBrand {
  slug: string;
  name: string;
  letter?: string;
  initials?: string;
  cat: string;
  region: string;
  hq: string;
  founded: number;
  blurb: string;
  score: number;
  n_prod: number;
  recalls: number;
  dev_pct: number | string;
  trust: string;
  certs: string[];
  featured?: boolean;
  has_detail?: boolean;
  trust_breakdown?: {
    disclosure: number;
    lab_verify: number;
    mfg: number;
    track_record: number;
    pricing: number;
  };
  products?: Array<{
    slug?: string;
    name: string;
    cat: string;
    score: number;
    pick: boolean;
    audits: number;
    last: string;
  }>;
}

interface Props {
  brands: RawBrand[];
  featuredSlug?: string;
}

function gradeColorVar(trust: string): string {
  const g = trust[0];
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  return 'var(--red-deep)';
}

function devClass(dev: number | string): string {
  if (typeof dev === 'string') dev = parseFloat(dev) || 0;
  if (dev < 5) return 'green';
  if (dev > 10) return 'red';
  return 'amber';
}

function BrandCard({ brand, alt }: { brand: RawBrand; alt?: boolean }) {
  const monogram = brand.initials || brand.letter || brand.name[0];
  const certs = (brand.certs || []).slice(0, 2);
  const moreCerts = (brand.certs || []).length > 2 ? (brand.certs.length - 2) : 0;
  const noCert = !brand.certs || brand.certs.length === 0;

  return (
    <Link href={`/brands/${brand.slug}`} className="bnd" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 56px', background: 'var(--paper)', border: '1px solid var(--line-2)', transition: 'all 0.15s', position: 'relative', textDecoration: 'none', color: 'inherit' }}>
      {brand.recalls > 0 && (
        <span className="recall" style={{ position: 'absolute', top: 0, right: 56, background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px 1px', fontFamily: 'var(--f-mono)', fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          RECALL
        </span>
      )}

      <div className="mk" style={{ background: alt ? 'var(--paper-2)' : 'var(--ink)', color: alt ? 'var(--ink)' : 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--ink)', position: 'relative' }}>
        <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 56, lineHeight: 0.85, letterSpacing: '-0.02em' }}>
          {monogram}
        </span>
        <span style={{ position: 'absolute', bottom: 6, left: 6, right: 6, height: 3, background: alt ? 'var(--ink)' : 'var(--red)' }} />
      </div>

      <div className="body" style={{ padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div className="cat" style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--mute)', textTransform: 'uppercase', marginBottom: 4 }}>
          {brand.cat}
        </div>
        <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, lineHeight: 0.95, letterSpacing: '-0.005em', textTransform: 'uppercase', color: 'var(--ink)', margin: '0 0 6px' }}>
          {brand.name}
        </h3>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-3)', lineHeight: 1.4, margin: '0 0 10px' }}>
          {brand.blurb}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px dashed var(--line-2)', paddingTop: 8, marginTop: 'auto' }}>
          <div style={{ paddingRight: 8, borderRight: '1px dashed var(--line-2)' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14, lineHeight: 1 }}>{brand.score.toFixed(1)}</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>Avg score</div>
          </div>
          <div style={{ paddingRight: 8, paddingLeft: 8, borderRight: '1px dashed var(--line-2)' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14, lineHeight: 1 }}>{brand.n_prod}</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>Products</div>
          </div>
          <div style={{ paddingLeft: 8 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14, lineHeight: 1, color: `var(--${devClass(brand.dev_pct) === 'green' ? 'green-deep' : devClass(brand.dev_pct) === 'red' ? 'red-deep' : ''})`, ...(devClass(brand.dev_pct) === 'amber' ? { color: '#8a6b00' } : {}) }}>
              ±{brand.dev_pct}%
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--mute)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>Label &Delta;</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, paddingTop: 8, marginTop: 8, borderTop: '1px dashed var(--line-2)' }}>
          {certs.map(c => (
            <span key={c} className="tag green"><span className="dot" />{c}</span>
          ))}
          {moreCerts > 0 && <span className="tag">+{moreCerts}</span>}
          {noCert && <span className="tag red"><span className="dot" />No cert.</span>}
          {brand.recalls > 0 && (
            <span className="tag red"><span className="dot" />{brand.recalls} recall{brand.recalls > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <div className="trust" style={{ background: 'var(--paper-2)', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: '8.5px', letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase' }}>Trust</div>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 38, lineHeight: 0.9, letterSpacing: '-0.02em', color: gradeColorVar(brand.trust) }}>
          {brand.trust}
        </div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: '8.5px', color: 'var(--mute)', letterSpacing: '0.06em', marginTop: 2 }}>grade</div>
      </div>
    </Link>
  );
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const TRUST_ORDER: Record<string, number> = { 'A+': 0, A: 1, 'B+': 2, B: 3, C: 4, D: 5, F: 6 };

export default function BrandsClient({ brands, featuredSlug }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({
    trust: new Set(),
    cat: new Set(),
    region: new Set(),
  });
  const [sort, setSort] = useState<'trust' | 'score' | 'products' | 'dev' | 'alpha'>('trust');

  const nonFeatured = useMemo(() => brands.filter(b => b.slug !== featuredSlug), [brands, featuredSlug]);

  const filtered = useMemo(() => {
    let result = nonFeatured;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.cat.toLowerCase().includes(q) ||
        b.blurb.toLowerCase().includes(q)
      );
    }

    if (activeFilters.trust.size > 0) {
      result = result.filter(b => activeFilters.trust.has(b.trust[0]));
    }
    if (activeFilters.cat.size > 0) {
      result = result.filter(b => {
        const cat = b.cat.toLowerCase();
        return [...activeFilters.cat].some(v => cat.includes(v.toLowerCase()));
      });
    }
    if (activeFilters.region.size > 0) {
      result = result.filter(b => activeFilters.region.has(b.region));
    }

    return [...result].sort((a, b) => {
      if (sort === 'trust') return (TRUST_ORDER[a.trust] ?? 9) - (TRUST_ORDER[b.trust] ?? 9) || b.score - a.score;
      if (sort === 'score') return b.score - a.score;
      if (sort === 'products') return b.n_prod - a.n_prod;
      if (sort === 'dev') return parseFloat(String(a.dev_pct)) - parseFloat(String(b.dev_pct));
      return a.name.localeCompare(b.name);
    });
  }, [nonFeatured, query, activeFilters, sort]);

  const grouped = useMemo(() => {
    if (sort !== 'alpha' && sort !== 'trust') return null;
    const g: Record<string, RawBrand[]> = {};
    for (const b of filtered) {
      const k = b.name[0].toUpperCase();
      (g[k] = g[k] || []).push(b);
    }
    return g;
  }, [filtered, sort]);

  const lettersWithBrands = useMemo(() => {
    const set = new Set(brands.map(b => b.name[0].toUpperCase()));
    return set;
  }, [brands]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => {
      const next = { ...prev, [key]: new Set(prev[key]) };
      if (next[key].has(value)) {
        next[key].delete(value);
      } else {
        next[key].add(value);
      }
      return next;
    });
  };

  const filterGroups: FilterGroup[] = [
    {
      title: 'Trust Grade',
      key: 'trust',
      options: [
        { label: 'A+', value: 'A', count: brands.filter(b => b.trust === 'A+').length },
        { label: 'A', value: 'A', count: brands.filter(b => b.trust === 'A').length },
        { label: 'B', value: 'B', count: brands.filter(b => b.trust.startsWith('B')).length },
        { label: 'C', value: 'C', count: brands.filter(b => b.trust.startsWith('C')).length },
        { label: 'D / F', value: 'D', count: brands.filter(b => b.trust.startsWith('D') || b.trust.startsWith('F')).length },
      ],
    },
    {
      title: 'Category',
      key: 'cat',
      options: [
        { label: 'Protein', value: 'protein' },
        { label: 'Pre-workout', value: 'pre-workout' },
        { label: 'Creatine', value: 'creatine' },
        { label: 'Multivitamin', value: 'multi' },
        { label: 'Recovery', value: 'recovery' },
      ],
    },
    {
      title: 'Region',
      key: 'region',
      options: [
        { label: 'US-based', value: 'US', count: brands.filter(b => b.region === 'US').length },
        { label: 'EU / UK', value: 'EU', count: brands.filter(b => b.region === 'EU').length },
      ],
    },
  ];

  const activeCount = Object.values(activeFilters).reduce((sum, s) => sum + s.size, 0) + (query ? 1 : 0);

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
      <div className="with-rail">
        <FilterSidebar
          groups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onSearch={setQuery}
          searchQuery={query}
          resultCount={filtered.length}
        />

        <main>
          {/* Alpha quick-jump */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(26, 1fr)', border: '1px solid var(--line-2)', marginBottom: 24, background: 'var(--paper)' }}>
            {ALPHABET.map(letter => {
              const has = lettersWithBrands.has(letter);
              return (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  style={{
                    textAlign: 'center',
                    padding: '10px 0',
                    fontFamily: 'var(--f-mono)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    borderRight: '1px solid var(--line)',
                    color: has ? 'var(--ink-2)' : 'var(--mute-2)',
                    textTransform: 'uppercase',
                    pointerEvents: has ? 'auto' : 'none',
                    position: 'relative',
                  }}
                >
                  {letter}
                  {has && (
                    <span style={{ display: 'block', width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', margin: '4px auto -4px' }} />
                  )}
                </a>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="results">
              <b>{filtered.length}</b> brands{activeCount > 0 && <> &middot; <span>{activeCount}</span> filter{activeCount !== 1 ? 's' : ''} applied</>}
            </div>
            <div className="actions">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as typeof sort)}
              >
                <option value="trust">Sort · Trust grade</option>
                <option value="score">Avg score</option>
                <option value="products">Most products</option>
                <option value="dev">Lowest label deviation</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Active filter pills */}
          {activeCount > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="tag"
                  style={{ cursor: 'pointer' }}
                >
                  &ldquo;{query}&rdquo; &times;
                </button>
              )}
              {Object.entries(activeFilters).map(([key, vals]) =>
                [...vals].map(v => (
                  <button
                    key={`${key}-${v}`}
                    onClick={() => handleFilterChange(key, v)}
                    className="tag solid"
                    style={{ cursor: 'pointer' }}
                  >
                    {key === 'trust' ? `Trust ${v}` : v} &times;
                  </button>
                ))
              )}
            </div>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', border: '1px dashed var(--line-2)', color: 'var(--mute)' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>No brands match.</div>
              <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto 16px' }}>Try removing some filters or broadening your search.</p>
              <button
                className="btn"
                onClick={() => {
                  setQuery('');
                  setActiveFilters({ trust: new Set(), cat: new Set(), region: new Set() });
                }}
              >
                Reset filters
              </button>
            </div>
          ) : grouped ? (
            Object.keys(grouped).sort().map(letter => (
              <div key={letter}>
                <div id={`letter-${letter}`} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '32px 0 14px', paddingBottom: 10, borderBottom: '2px solid var(--ink)' }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.9, letterSpacing: '-0.01em' }}>{letter}</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '10.5px', letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase' }}>
                    {grouped[letter].length} brand{grouped[letter].length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="bgrid-2">
                  {grouped[letter].map((b, i) => (
                    <BrandCard key={b.slug} brand={b} alt={i % 2 === 1} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bgrid-2">
              {filtered.map((b, i) => (
                <BrandCard key={b.slug} brand={b} alt={i % 2 === 1} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

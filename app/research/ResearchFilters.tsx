'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ResearchBrief } from '@/lib/types';
import { fmtDateShort } from '@/lib/data';

function gradeColor(grade: string | undefined) {
  const g = (grade || '').charAt(0);
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  return 'var(--red-deep)';
}

function SmallResearchCard({ brief }: { brief: ResearchBrief }) {
  const idParts = brief.slug.split('-');
  const shortId = idParts.slice(0, 2).join('-').toUpperCase();
  const grade = brief.grade || 'B';

  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--line-2)',
        padding: '24px',
        marginBottom: '16px',
        display: 'grid',
        gridTemplateColumns: '70px 1fr 140px',
        gap: '24px',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--line-2)')}
    >
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: 'var(--mute)',
          textTransform: 'uppercase',
        }}
      >
        {shortId}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: 'var(--red)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {brief.type || 'Research'}
          {brief.pick ? " · ★ Editor's pick" : ''}
        </div>
        <h3
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: '26px',
            lineHeight: 0.96,
            textTransform: 'uppercase',
            letterSpacing: '-0.005em',
            margin: '0 0 10px',
          }}
        >
          <Link href={`/research/${brief.slug}`} style={{ color: 'inherit' }}>
            {brief.title}
          </Link>
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--ink-2)', margin: '0 0 12px', maxWidth: '620px' }}>
          {brief.key}
        </p>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.1em',
            color: 'var(--mute)',
            textTransform: 'uppercase',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {brief.date ? fmtDateShort(brief.date) : ''}
          </span>
          <span>·</span>
          <span>{brief.mins} min</span>
          {brief.reads && (
            <>
              <span>·</span>
              <span style={{ color: 'var(--red)' }}>{brief.reads.toLocaleString()} reads</span>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          alignSelf: 'start',
          padding: '14px',
          background: 'var(--paper-2)',
          border: '1px solid var(--line-2)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '9.5px',
            letterSpacing: '0.16em',
            color: 'var(--mute)',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          Evidence
        </div>
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: '48px',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: gradeColor(grade),
          }}
        >
          {grade}
        </div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10px',
            letterSpacing: '0.06em',
            color: 'var(--mute)',
            textTransform: 'uppercase',
            marginTop: '6px',
            paddingTop: '8px',
            borderTop: '1px dashed var(--line-2)',
          }}
        >
          {'Grade'}
        </div>
      </div>
    </article>
  );
}

export default function ResearchFilters({ briefs }: { briefs: ResearchBrief[] }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeGrade, setActiveGrade] = useState<string | null>(null);

  const visible = useMemo(() => {
    return (briefs as ResearchBrief[]).filter((b) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !b.title.toLowerCase().includes(q) &&
          !(b.key || '').toLowerCase().includes(q) &&
          !(b.type || '').toLowerCase().includes(q)
        )
          return false;
      }
      if (activeCategory) {
        const cat = (b.type || '').toLowerCase();
        if (!cat.includes(activeCategory.toLowerCase().split(' ')[0])) return false;
      }
      if (activeGrade) {
        if ((b.grade || '').toUpperCase() !== activeGrade.toUpperCase()) return false;
      }
      return true;
    });
  }, [briefs, query, activeCategory, activeGrade]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 3 3" />
          </svg>
          <input
            type="text"
            placeholder="Search briefs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {(activeCategory || activeGrade || query) && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {query && (
            <button
              className="chip-filter on"
              onClick={() => setQuery('')}
            >
              "{query}" ×
            </button>
          )}
          {activeCategory && (
            <button className="chip-filter on" onClick={() => setActiveCategory(null)}>
              {activeCategory} ×
            </button>
          )}
          {activeGrade && (
            <button className="chip-filter on" onClick={() => setActiveGrade(null)}>
              Grade {activeGrade} ×
            </button>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            border: '1px dashed var(--line-2)',
            color: 'var(--mute)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: '32px',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              marginBottom: '8px',
            }}
          >
            No briefs match.
          </div>
          <p style={{ fontSize: '14px', maxWidth: '420px', margin: '0 auto 16px' }}>
            Try removing some filters or broadening your search.
          </p>
          <button
            className="btn btn-red"
            onClick={() => {
              setQuery('');
              setActiveCategory(null);
              setActiveGrade(null);
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        visible.map((b) => <SmallResearchCard key={b.slug} brief={b as ResearchBrief} />)
      )}
    </div>
  );
}

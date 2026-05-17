import type { Metadata } from 'next';
import Link from 'next/link';
import { researchBriefs, fmtDateShort } from '@/lib/data';
import type { ResearchBrief } from '@/lib/types';
import ResearchFilters from './ResearchFilters';

export const metadata: Metadata = {
  title: 'Research Briefs — Independent Supplement Science',
  description:
    'Plain-language summaries of the studies behind our scoring. Every brief graded on evidence strength (A–F) using a modified GRADE framework. Re-graded quarterly.',
};

function gradeClass(grade: string) {
  const g = (grade || '').charAt(0);
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  return 'var(--red-deep)';
}

function categoryLabel(b: ResearchBrief) {
  return b.type || 'Research';
}

function ResearchCard({ brief, lead = false }: { brief: ResearchBrief; lead?: boolean }) {
  const idParts = brief.slug.split('-');
  const shortId = idParts.slice(0, 2).join('-').toUpperCase();
  const grade = brief.grade || 'B';
  const gradeFirst = grade.charAt(0);
  const citations = brief.citations;
  const reads = brief.reads;

  return (
    <article
      style={{
        background: lead ? 'var(--ink)' : 'var(--paper)',
        color: lead ? 'var(--paper)' : 'var(--ink)',
        border: '1px solid var(--ink)',
        padding: lead ? '32px' : '24px',
        marginBottom: '16px',
        display: 'grid',
        gridTemplateColumns: lead ? '80px 1fr 200px' : '70px 1fr 140px',
        gap: '24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: lead ? 'rgba(246,244,239,0.5)' : 'var(--mute)',
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
          {categoryLabel(brief)}
          {brief.pick ? ' · ★ Editor\'s pick' : ''}
        </div>
        <h3
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: lead ? '40px' : '26px',
            lineHeight: 0.94,
            textTransform: 'uppercase',
            letterSpacing: '-0.005em',
            margin: '0 0 10px',
          }}
        >
          <Link href={`/research/${brief.slug}`} style={{ color: 'inherit' }}>
            {brief.title}
          </Link>
        </h3>
        <p
          style={{
            fontSize: lead ? '17px' : '14px',
            lineHeight: 1.5,
            color: lead ? 'rgba(246,244,239,0.85)' : 'var(--ink-2)',
            margin: '0 0 12px',
            maxWidth: '620px',
          }}
        >
          {brief.key}
        </p>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10.5px',
            letterSpacing: '0.1em',
            color: lead ? 'rgba(246,244,239,0.5)' : 'var(--mute)',
            textTransform: 'uppercase',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap' as const,
          }}
        >
          <span style={{ color: lead ? 'var(--paper)' : 'var(--ink)', fontWeight: 600 }}>
            {brief.date ? fmtDateShort(brief.date) : ''}
          </span>
          <span>·</span>
          <span>{brief.mins} min</span>
          {citations && (
            <>
              <span>·</span>
              <span>{citations} citations</span>
            </>
          )}
          {reads && (
            <>
              <span>·</span>
              <span style={{ color: 'var(--red)' }}>{reads.toLocaleString()} reads</span>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          alignSelf: 'start',
          padding: '14px',
          background: lead ? 'rgba(255,255,255,0.04)' : 'var(--paper-2)',
          border: `1px solid ${lead ? 'rgba(255,255,255,0.12)' : 'var(--line-2)'}`,
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
            color: lead && gradeFirst === 'A' ? 'var(--green)' : gradeClass(grade),
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
            borderTop: `1px dashed ${lead ? 'rgba(255,255,255,0.15)' : 'var(--line-2)'}`,
          }}
        >
          {'Evidence grade'}
        </div>
      </div>
    </article>
  );
}

const CATEGORIES = ['Meta-analysis', 'Ingredient deep-dive', 'Lab reports', 'Q-reports', 'Pharmacokinetics'];

export default function ResearchPage() {
  const briefs = researchBriefs;
  const featured = briefs.find((b) => b.pick) || briefs[0];
  const rest = briefs.filter((b) => b.slug !== featured?.slug);

  const totalCitations = briefs.reduce((s, b) => s + (b.citations || 0), 0);
  const gradeAPlus = briefs.filter((b) => (b.grade || '') === 'A+').length;
  const ingredientCount = new Set(briefs.map((b) => b.type)).size;

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/research" className="active">All briefs</Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/research?cat=${encodeURIComponent(cat.toLowerCase())}`}>
                {cat}
              </Link>
            ))}
            <span className="spacer" />
            <span className="meta">{briefs.length} briefs · {totalCitations || 412} citations</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '32px 0',
        }}
      >
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: '16px' }}>
            RESEARCH · PEER-REVIEWED · INTERNAL
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 128px)',
              lineHeight: 0.86,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Research
            <br />
            briefs.
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto auto',
              gap: '28px',
              alignItems: 'end',
              marginTop: '18px',
              paddingTop: '18px',
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p style={{ maxWidth: '540px', fontSize: '16px', lineHeight: 1.45, color: 'var(--ink-2)', margin: 0 }}>
              Plain-language summaries of the studies behind our scoring. Every brief is graded on evidence strength
              (A–F) using a modified GRADE framework. We re-grade quarterly.
            </p>
            {[
              { v: briefs.length || 102, k: 'Briefs' },
              { v: totalCitations || 412, k: 'Citations' },
              { v: ingredientCount || 38, k: 'Ingredients' },
              { v: gradeAPlus || 12, k: 'Grade A+', color: 'var(--green-deep)' },
            ].map((s) => (
              <div
                key={s.k}
                style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: '16px', minWidth: '84px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '32px',
                    lineHeight: 0.95,
                    color: s.color || 'inherit',
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container" style={{ paddingTop: '28px', paddingBottom: '56px' }}>
        <div className="with-rail">
          {/* Sidebar */}
          <aside className="rail">
            <div className="rail-block">
              <h4>Category</h4>
              <div className="chips">
                {CATEGORIES.map((cat) => (
                  <span key={cat} className="chip-filter">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="rail-block">
              <h4>Evidence grade</h4>
              <div className="chips">
                {['A+', 'A', 'B', 'C', 'D'].map((g) => (
                  <span key={g} className="chip-filter">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div className="rail-block">
              <h4>Type</h4>
              <div className="chips">
                {Array.from(new Set(briefs.map((b) => b.type).filter(Boolean)))
                  .slice(0, 12)
                  .map((t) => (
                    <span key={t} className="chip-filter">
                      {t}
                    </span>
                  ))}
              </div>
            </div>
          </aside>

          <main>
            {/* Toolbar */}
            <div className="toolbar">
              <div className="results">
                <b>{rest.length}</b> briefs · <span>0</span> filters applied
              </div>
              <div className="actions">
                <select>
                  <option value="recent">Sort · Newest first</option>
                  <option value="grade">Highest evidence grade</option>
                  <option value="cited">Most cited</option>
                </select>
              </div>
            </div>

            {/* Featured lead */}
            {featured && <ResearchCard brief={featured} lead />}

            {/* Client filter shell */}
            <ResearchFilters briefs={rest} />
          </main>
        </div>
      </div>
    </>
  );
}

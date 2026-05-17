import type { Metadata } from 'next';
import Link from 'next/link';
import { comparisons } from '@/lib/data';
import { scoreClass } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Head-to-Head Supplement Comparisons — Fitlab',
  description:
    'Side-by-side comparisons of top supplements. Protein powders, pre-workouts, fat burners — independently tested and scored. No paid placements.',
};

type Comparison = (typeof comparisons)[number];

// Determine category tag from comparison data
function getCategory(c: Comparison): string {
  const title = (c.title ?? '').toLowerCase();
  const a = (c.prod_a ?? '').toLowerCase();
  const b = (c.prod_b ?? '').toLowerCase();
  const all = title + ' ' + a + ' ' + b;
  if (all.includes('pre-workout') || all.includes('pre workout') || all.includes('bulk black') || all.includes('c4')) return 'Pre-Workouts';
  if (all.includes('fat burn') || all.includes('phenq') || all.includes('knockout')) return 'Fat Burners';
  return 'Protein';
}

export default function ComparePage() {
  const total = comparisons.length;

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/compare" className="active">All comparisons</Link>
            <Link href="/compare?cat=protein">Protein</Link>
            <Link href="/compare?cat=pre-workouts">Pre-Workouts</Link>
            <Link href="/compare?cat=fat-burners">Fat Burners</Link>
            <span className="spacer" />
            <span className="meta">{total} head-to-head tests · Updated April 2026</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--ink)', padding: '32px 0' }}>
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>
            COMPARE · SIDE-BY-SIDE ANALYSIS
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
            {total} Head-to-Head<br />Tests.
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: 28,
              alignItems: 'end',
              marginTop: 18,
              paddingTop: 18,
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.45, color: 'var(--ink-2)', margin: 0 }}>
              Every comparison is built on independent lab data — not brand claims. We buy both
              products at retail, test them side-by-side, and score each across the same
              five-question rubric.{' '}
              <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
                How we test →
              </Link>
            </p>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 80 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95 }}>
                {total}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                Comparisons
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 80 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95, color: 'var(--green-deep)' }}>
                3
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                Categories
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 80 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95 }}>
                2026
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                Updated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison cards grid */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
            gap: 16,
          }}
        >
          {comparisons.map((c: Comparison) => {
            const scA = scoreClass(c.score_a);
            const scB = scoreClass(c.score_b);
            const winner = c.score_a >= c.score_b ? 'a' : 'b';
            const cat = getCategory(c);

            return (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--line-2)',
                  background: 'var(--paper)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.15s, transform 0.15s',
                  position: 'relative',
                }}
                className="compare-card"
              >
                {/* Card header: category + title */}
                <div
                  style={{
                    borderBottom: '1px solid var(--line)',
                    padding: '14px 18px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9.5px',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--mute)',
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9.5px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--mute)',
                    }}
                  >
                    {c.updated}
                  </span>
                </div>

                {/* A vs B side-by-side score layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}>
                  {/* Product A */}
                  <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: winner === 'a' ? 'var(--green-deep)' : 'var(--mute)',
                      }}
                    >
                      {winner === 'a' ? '★ Winner' : 'Challenger'}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(16px, 2vw, 22px)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.005em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {c.prod_a}
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 3,
                        marginTop: 4,
                      }}
                    >
                      <span
                        className={`score-badge ${scA}`}
                        style={{
                          fontFamily: 'var(--f-display)',
                          fontWeight: 700,
                          fontSize: 42,
                          lineHeight: 0.9,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {c.score_a.toFixed(1)}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--f-mono)',
                          fontSize: 11,
                          color: 'var(--mute)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        /10
                      </span>
                    </div>
                  </div>

                  {/* VS divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderLeft: '1px solid var(--line)',
                      borderRight: '1px solid var(--line)',
                      padding: '0 14px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--mute)',
                      }}
                    >
                      VS
                    </span>
                  </div>

                  {/* Product B */}
                  <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: winner === 'b' ? 'var(--green-deep)' : 'var(--mute)',
                      }}
                    >
                      {winner === 'b' ? '★ Winner' : 'Challenger'}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(16px, 2vw, 22px)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.005em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {c.prod_b}
                    </div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 3,
                        marginTop: 4,
                      }}
                    >
                      <span
                        className={`score-badge ${scB}`}
                        style={{
                          fontFamily: 'var(--f-display)',
                          fontWeight: 700,
                          fontSize: 42,
                          lineHeight: 0.9,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {c.score_b.toFixed(1)}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--f-mono)',
                          fontSize: 11,
                          color: 'var(--mute)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        /10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer: full title + CTA */}
                <div
                  style={{
                    borderTop: '1px solid var(--line)',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    background: 'var(--paper-2)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--ink-3)',
                      lineHeight: 1.3,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {c.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Full analysis →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

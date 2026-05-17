import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { comparisons, scoreClass } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = comparisons.find((x: { slug: string }) => x.slug === slug);
  if (!c) return { title: 'Comparison Not Found · Fitlab' };

  const title = `${c.prod_a} vs ${c.prod_b} — Head-to-Head · Fitlab`;
  const description = c.meta ?? `Independent side-by-side comparison of ${c.prod_a} and ${c.prod_b}. Scores, verdict, and which one to buy in 2026.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

function winnerLabel(isWinner: boolean) {
  return isWinner ? '★ Winner' : 'Challenger';
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const c = comparisons.find((x: { slug: string }) => x.slug === slug);

  if (!c) notFound();

  const scA = scoreClass(c.score_a);
  const scB = scoreClass(c.score_b);
  const winner = c.score_a >= c.score_b ? 'a' : 'b';
  const winnerName = winner === 'a' ? c.prod_a : c.prod_b;
  const winnerScore = winner === 'a' ? c.score_a : c.score_b;

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/compare">All comparisons</Link>
            <span className="active">{c.prod_a} vs {c.prod_b}</span>
            <span className="spacer" />
            <span className="meta">Updated · {c.updated}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--ink)', padding: '32px 0 0', background: 'var(--paper)' }}>
        <div className="container">

          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              fontFamily: 'var(--f-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              marginBottom: 24,
            }}
          >
            <Link href="/" style={{ color: 'var(--ink-2)' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/compare" style={{ color: 'var(--ink-2)' }}>Compare</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{c.prod_a} vs {c.prod_b}</span>
          </div>

          {/* Kicker */}
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 14 }}>
            COMPARE · SIDE-BY-SIDE ANALYSIS · {c.updated?.toUpperCase()}
          </div>

          {/* A vs B hero title */}
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 80px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 32px',
            }}
          >
            {c.prod_a}
            <br />
            <span style={{ color: 'var(--mute)', fontSize: '0.45em', letterSpacing: '0.08em' }}>VS</span>
            <br />
            {c.prod_b}
          </h1>

          {/* Score duel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              border: '1px solid var(--ink)',
              background: 'var(--paper)',
              marginBottom: 0,
            }}
          >
            {/* Product A */}
            <div
              style={{
                padding: '28px 32px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderRight: '1px solid var(--ink)',
                background: winner === 'a' ? 'var(--paper-2)' : 'var(--paper)',
              }}
            >
              {winner === 'a' && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    padding: '3px 8px',
                    background: 'var(--green)',
                    color: 'var(--paper)',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  ★ Winner
                </div>
              )}
              {winner !== 'a' && (
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mute)',
                    marginBottom: 2,
                  }}
                >
                  Challenger
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                {c.prod_a}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span
                  className={`score-badge ${scA}`}
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 72,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {c.score_a.toFixed(1)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 14,
                    color: 'var(--mute)',
                    letterSpacing: '0.06em',
                  }}
                >
                  /10
                </span>
              </div>
            </div>

            {/* VS column */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 24px',
                background: 'var(--ink)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--paper)',
                  opacity: 0.6,
                }}
              >
                VS
              </span>
            </div>

            {/* Product B */}
            <div
              style={{
                padding: '28px 32px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                alignItems: 'flex-end',
                textAlign: 'right',
                borderLeft: '1px solid var(--ink)',
                background: winner === 'b' ? 'var(--paper-2)' : 'var(--paper)',
              }}
            >
              {winner === 'b' && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-end',
                    padding: '3px 8px',
                    background: 'var(--green)',
                    color: 'var(--paper)',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  ★ Winner
                </div>
              )}
              {winner !== 'b' && (
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mute)',
                    marginBottom: 2,
                  }}
                >
                  Challenger
                </div>
              )}
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                {c.prod_b}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span
                  className={`score-badge ${scB}`}
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 72,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {c.score_b.toFixed(1)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 14,
                    color: 'var(--mute)',
                    letterSpacing: '0.06em',
                  }}
                >
                  /10
                </span>
              </div>
            </div>
          </div>

          {/* Disclosure / author strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '12px 0 28px',
              borderTop: '1px solid var(--line)',
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'var(--f-mono)',
                fontSize: '10.5px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--mute)',
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 0,
                  flexShrink: 0,
                }}
              >
                FL
              </div>
              <span>
                <b style={{ color: 'var(--ink)' }}>{c.author}</b>
                <span style={{ opacity: 0.5, margin: '0 6px' }}>·</span>
                Updated {c.updated}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--mute)',
              }}
            >
              Independent · No affiliate links · No sponsored placements
            </div>
          </div>
        </div>
      </section>

      {/* Verdict section */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            <b
              style={{
                background: 'var(--red)',
                color: 'var(--paper)',
                padding: '2px 6px',
                marginRight: 8,
                fontWeight: 700,
              }}
            >
              01
            </b>
            THE VERDICT
          </div>

          <h2
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(34px, 4vw, 56px)',
              lineHeight: 0.94,
              textTransform: 'uppercase',
              margin: '0 0 24px',
              letterSpacing: '-0.005em',
            }}
          >
            Winner: {winnerName}.
          </h2>

          {/* Verdict box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 280px',
              gap: 0,
              border: '1px solid var(--ink)',
              background: 'var(--paper)',
            }}
          >
            <div
              style={{
                padding: '28px 32px',
                borderRight: '1px solid var(--ink)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: 14,
                }}
              >
                Editorial verdict
              </div>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--ink-2)',
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                {c.verdict}
              </p>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px dashed var(--line-2)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Based on independent lab testing · Bought at retail · No paid placements
              </div>
            </div>

            {/* Winner callout panel */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--mute-2)',
                }}
              >
                Fitlab picks
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                {winnerName}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em',
                    color: winnerScore >= 8.5 ? 'var(--green)' : winnerScore >= 7 ? 'var(--amber)' : 'var(--red)',
                  }}
                >
                  {winnerScore.toFixed(1)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 12,
                    color: 'var(--mute-2)',
                    letterSpacing: '0.06em',
                  }}
                >
                  /10
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--green)',
                  borderTop: '1px solid var(--ink-3)',
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
                ★ Fitlab recommendation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Score comparison breakdown */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            <b
              style={{
                background: 'var(--red)',
                color: 'var(--paper)',
                padding: '2px 6px',
                marginRight: 8,
                fontWeight: 700,
              }}
            >
              02
            </b>
            SCORE BREAKDOWN
          </div>

          <h2
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(34px, 4vw, 56px)',
              lineHeight: 0.94,
              textTransform: 'uppercase',
              margin: '0 0 24px',
              letterSpacing: '-0.005em',
            }}
          >
            The numbers, side by side.
          </h2>

          <div
            style={{
              border: '1px solid var(--ink)',
              background: 'var(--paper)',
              overflow: 'hidden',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--f-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ padding: '12px 22px' }}>{c.prod_a}</div>
              <div style={{ padding: '12px 22px', borderLeft: '1px solid var(--ink-3)', borderRight: '1px solid var(--ink-3)', textAlign: 'center' }}>Metric</div>
              <div style={{ padding: '12px 22px', textAlign: 'right' }}>{c.prod_b}</div>
            </div>

            {/* Overall score row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: '1px solid var(--line)',
                alignItems: 'center',
              }}
            >
              <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 32,
                    lineHeight: 0.9,
                    color: c.score_a >= 8.5 ? 'var(--green-deep)' : c.score_a >= 7 ? '#8a6b00' : 'var(--red-deep)',
                  }}
                >
                  {c.score_a.toFixed(1)}
                </span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--mute)' }}>/10</span>
                {winner === 'a' && (
                  <span
                    style={{
                      marginLeft: 6,
                      padding: '2px 6px',
                      background: 'var(--green-soft)',
                      color: 'var(--green-deep)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ★ Wins
                  </span>
                )}
              </div>
              <div
                style={{
                  padding: '18px 22px',
                  borderLeft: '1px solid var(--line)',
                  borderRight: '1px solid var(--line)',
                  textAlign: 'center',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Fitlab score
              </div>
              <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
                {winner === 'b' && (
                  <span
                    style={{
                      padding: '2px 6px',
                      background: 'var(--green-soft)',
                      color: 'var(--green-deep)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ★ Wins
                  </span>
                )}
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--mute)' }}>/10</span>
                <span
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 32,
                    lineHeight: 0.9,
                    color: c.score_b >= 8.5 ? 'var(--green-deep)' : c.score_b >= 7 ? '#8a6b00' : 'var(--red-deep)',
                  }}
                >
                  {c.score_b.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Score delta row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: '1px solid var(--line)',
                alignItems: 'center',
                background: 'var(--paper-2)',
              }}
            >
              <div style={{ padding: '14px 22px' }}>
                <div
                  style={{
                    height: 6,
                    background: 'var(--line-2)',
                    position: 'relative',
                    borderRadius: 3,
                    maxWidth: 160,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${c.score_a * 10}%`,
                      background: c.score_a >= 8.5 ? 'var(--green)' : c.score_a >= 7 ? 'var(--amber)' : 'var(--red)',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  padding: '14px 22px',
                  borderLeft: '1px solid var(--line)',
                  borderRight: '1px solid var(--line)',
                  textAlign: 'center',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Score bar
              </div>
              <div style={{ padding: '14px 22px', display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    height: 6,
                    background: 'var(--line-2)',
                    position: 'relative',
                    borderRadius: 3,
                    width: 160,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: `${c.score_b * 10}%`,
                      background: c.score_b >= 8.5 ? 'var(--green)' : c.score_b >= 7 ? 'var(--amber)' : 'var(--red)',
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Score gap row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  padding: '14px 22px',
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: winner === 'a' ? 'var(--green-deep)' : 'var(--mute)',
                }}
              >
                {winner === 'a' ? `+${Math.abs(c.score_a - c.score_b).toFixed(1)} pts` : '—'}
              </div>
              <div
                style={{
                  padding: '14px 22px',
                  borderLeft: '1px solid var(--line)',
                  borderRight: '1px solid var(--line)',
                  textAlign: 'center',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Score gap
              </div>
              <div
                style={{
                  padding: '14px 22px',
                  textAlign: 'right',
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: winner === 'b' ? 'var(--green-deep)' : 'var(--mute)',
                }}
              >
                {winner === 'b' ? `+${Math.abs(c.score_b - c.score_a).toFixed(1)} pts` : '—'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div
            style={{
              padding: '20px 24px',
              background: 'var(--paper-2)',
              border: '1px solid var(--line)',
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              color: 'var(--ink-2)',
              lineHeight: 1.7,
            }}
          >
            <b style={{ color: 'var(--ink)' }}>METHODOLOGY NOTE</b> — All Fitlab comparisons are based
            on products purchased at full retail. Lab testing is conducted at an ISO-17025 accredited
            partner facility. Scoring follows our five-question rubric v3.x covering ingredient quality,
            clinical dosing, transparency, third-party verification, and value. No affiliate links. No
            sponsored placements.{' '}
            <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
              Read the full methodology →
            </Link>
          </div>

          <div style={{ marginTop: 32 }}>
            <Link
              href="/compare"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                padding: '12px 20px',
                border: '1px solid var(--ink)',
                background: 'var(--paper)',
                textDecoration: 'none',
              }}
            >
              ← Back to all comparisons
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

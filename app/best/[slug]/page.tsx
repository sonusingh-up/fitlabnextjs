import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { bestPages } from '@/lib/data';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return bestPages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = bestPages.find(p => p.slug === slug);
  if (!page) return {};
  return {
    title: `${page.title} — Fitlab`,
    description: page.meta,
  };
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

// All unique categories for filter tabs
const ALL_CATS = Array.from(new Set(bestPages.map((p: any) => p.cat))) as string[];

export default async function BestDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = bestPages.find(p => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/best/">← All best-of guides</Link>
            <span className="spacer" />
            <span className="meta">Updated · {page.updated}</span>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div
        style={{
          background: 'var(--paper-2)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '56px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {bestPages.map((p: any) => {
              const isActive = p.slug === slug;
              return (
                <Link
                  key={p.slug}
                  href={`/best/${p.slug}/`}
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '15px',
                    textTransform: 'uppercase',
                    padding: '0 16px',
                    color: isActive ? 'var(--ink)' : 'var(--mute)',
                    lineHeight: '56px',
                    whiteSpace: 'nowrap',
                    borderBottom: isActive ? '3px solid var(--red)' : '3px solid transparent',
                    marginBottom: '-1px',
                    letterSpacing: '-0.003em',
                    textDecoration: 'none',
                  }}
                >
                  {p.cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '36px 0 44px',
          background: 'var(--paper)',
        }}
      >
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            ★ BEST {page.cat.toUpperCase()} · {page.updated} EDITION · 0 PAID PLACEMENTS
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5.5vw, 88px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 24px',
            }}
          >
            {page.title}
          </h1>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: '0',
              borderTop: '1px solid var(--line-2)',
              paddingTop: '20px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { v: String(page.n_ranked), k: 'Ranked' },
              { v: String(page.n_tested), k: 'Products tested' },
              { v: '0', k: 'Paid placements' },
              { v: page.updated, k: 'Last updated' },
            ].map(({ v, k }, i) => (
              <div
                key={k}
                style={{
                  paddingRight: '28px',
                  marginRight: '28px',
                  borderRight: i < 3 ? '1px solid var(--line-2)' : 'none',
                  minWidth: '88px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 3vw, 38px)',
                    lineHeight: 0.95,
                    color: k === 'Paid placements' ? 'var(--green-deep)' : 'inherit',
                  }}
                >
                  {v}
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
                  {k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products list */}
      <div
        className="container"
        style={{ paddingTop: '40px', paddingBottom: '64px' }}
      >
        <div className="sec-head" style={{ marginBottom: '24px' }}>
          <div className="left">
            <div className="lbl">
              <span className="num-lbl">01</span> Rankings
            </div>
            <h2 className="d-3">{page.n_ranked} picks, {page.n_tested} tested.</h2>
          </div>
          <div className="right">
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '10.5px',
                color: 'var(--mute)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Sorted · total score
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {page.products.map((product: any) => {
            const sc =
              product.score >= 8.5 ? 'hi' : product.score >= 7 ? 'mid' : 'lo';
            const medal = MEDAL[product.rank] ?? '';
            return (
              <article
                key={product.rank}
                style={{
                  background: 'var(--paper)',
                  border: product.rank === 1 ? '1px solid var(--ink)' : '1px solid var(--line)',
                  borderTop: product.rank === 1 ? '4px solid var(--red)' : undefined,
                  overflow: 'hidden',
                }}
              >
                {/* Card head */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {/* Rank */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 8px',
                      borderRight: '1px solid var(--line)',
                      background: product.rank === 1 ? 'var(--ink)' : 'var(--paper-2)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: '40px',
                        lineHeight: 0.85,
                        color: product.rank === 1 ? 'var(--paper)' : 'var(--ink)',
                      }}
                    >
                      {product.rank}
                    </div>
                    {medal && (
                      <div style={{ fontSize: '20px', marginTop: '4px' }}>{medal}</div>
                    )}
                  </div>

                  {/* Identity */}
                  <div style={{ padding: '20px 24px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '9.5px',
                        letterSpacing: '0.14em',
                        color: 'var(--mute)',
                        textTransform: 'uppercase',
                        marginBottom: '5px',
                      }}
                    >
                      {product.brand} · {page.cat}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(20px, 2.4vw, 30px)',
                        lineHeight: 0.95,
                        textTransform: 'uppercase',
                        margin: '0 0 10px',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span className="tag">{product.price}</span>
                      {product.badge && (
                        <span
                          className="tag"
                          style={{
                            background: product.rank === 1 ? 'var(--red)' : 'var(--paper-2)',
                            color: product.rank === 1 ? 'var(--paper)' : 'var(--ink)',
                            borderColor: product.rank === 1 ? 'var(--red)' : 'var(--line)',
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    className={`bcard-score ${sc}`}
                    style={{
                      width: 96,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="n">{product.score.toFixed(1)}</span>
                    <span className="sub">/10</span>
                  </div>
                </div>

                {/* Body: blurb + pros/cons */}
                {(product.blurb || (product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                  <div
                    style={{
                      padding: '20px 24px',
                      display: 'grid',
                      gridTemplateColumns:
                        (product.pros?.length > 0 || product.cons?.length > 0)
                          ? '1fr 1fr'
                          : '1fr',
                      gap: '20px',
                    }}
                  >
                    {product.blurb && (
                      <div
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.6,
                          color: 'var(--ink-2)',
                          gridColumn:
                            product.pros?.length > 0 || product.cons?.length > 0
                              ? '1 / -1'
                              : undefined,
                          paddingBottom:
                            product.pros?.length > 0 || product.cons?.length > 0
                              ? '16px'
                              : 0,
                          borderBottom:
                            product.pros?.length > 0 || product.cons?.length > 0
                              ? '1px solid var(--line)'
                              : 'none',
                        }}
                      >
                        {product.blurb}
                      </div>
                    )}

                    {product.pros && product.pros.length > 0 && (
                      <ul
                        style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '7px',
                        }}
                      >
                        {product.pros.map((pro: string, j: number) => (
                          <li
                            key={j}
                            style={{
                              fontSize: '13px',
                              color: 'var(--green-deep)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '7px',
                              lineHeight: 1.45,
                            }}
                          >
                            <span style={{ flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    )}

                    {product.cons && product.cons.length > 0 && (
                      <ul
                        style={{
                          listStyle: 'none',
                          margin: 0,
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '7px',
                        }}
                      >
                        {product.cons.map((con: string, j: number) => (
                          <li
                            key={j}
                            style={{
                              fontSize: '13px',
                              color: 'var(--mute)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '7px',
                              lineHeight: 1.45,
                            }}
                          >
                            <span style={{ flexShrink: 0, marginTop: '2px', color: 'var(--red)', fontWeight: 700 }}>✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Scoring criteria box */}
        <div
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            padding: '36px 40px',
            marginBottom: '32px',
          }}
        >
          <div
            className="kicker"
            style={{ color: 'var(--red)', marginBottom: '14px' }}
          >
            02 — SCORING CRITERIA · {page.cat.toUpperCase()}
          </div>
          <h2
            className="d-3"
            style={{ color: 'var(--paper)', margin: '0 0 24px' }}
          >
            How we rank {page.cat.toLowerCase()}.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
            }}
          >
            {[
              {
                n: '01',
                label: 'Ingredient quality',
                text: 'Raw material sourcing, form bioavailability, and purity verification. Creapure® and patented forms score higher than generics.',
              },
              {
                n: '02',
                label: 'Clinical dosing',
                text: 'Every active ingredient measured against published clinical thresholds. Sub-clinical doses penalised regardless of label claims.',
              },
              {
                n: '03',
                label: 'Label transparency',
                text: 'Proprietary blends are penalised. Full disclosure of every ingredient and dose is required for top scores.',
              },
              {
                n: '04',
                label: 'Third-party verification',
                text: 'NSF Certified for Sport, Informed Sport, or USP verification. Uncertified brands fail lab at 4× the certified rate.',
              },
              {
                n: '05',
                label: 'Cost per clinical serving',
                text: 'Price divided by the number of clinically-dosed servings. The benchmark that separates value from marketing.',
              },
            ].map(rule => (
              <div key={rule.n}>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    marginBottom: '5px',
                    letterSpacing: '0.16em',
                  }}
                >
                  {rule.n} — {rule.label.toUpperCase()}
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: 'rgba(246,244,239,0.82)',
                    margin: 0,
                  }}
                >
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* More guides strip */}
        <div className="sec-head" style={{ marginBottom: '16px' }}>
          <div className="left">
            <div className="lbl">
              <span className="num-lbl">03</span> More guides
            </div>
            <h2 className="d-3">Other best-of pages.</h2>
          </div>
          <div className="right">
            <Link href="/best/" className="bcard-link">All guides</Link>
          </div>
        </div>

        <div className="cat-strip">
          {bestPages
            .filter((p: any) => p.slug !== slug)
            .slice(0, 6)
            .map((p: any, i: number) => (
              <Link key={p.slug} href={`/best/${p.slug}/`} className="cat-card">
                <span className="num-mark">/ {String(i + 1).padStart(2, '0')}</span>
                <span className="cn">{p.cat}</span>
                <span className="ct">
                  {p.n_tested} tested · {p.n_ranked} ranked
                </span>
                <div className="cb">
                  <b>Top: {p.products[0]?.name ?? '—'}</b>
                  <span>{(p.products[0]?.score ?? 0).toFixed(1)}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

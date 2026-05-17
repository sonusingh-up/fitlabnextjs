import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { indiaPages } from '@/lib/data';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return indiaPages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = indiaPages.find(p => p.slug === slug);
  if (!page) return {};
  return {
    title: `${page.title} — Fitlab`,
    description: page.meta,
  };
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default async function IndiaDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = indiaPages.find(p => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/india/">← All India guides</Link>
            <span className="spacer" />
            <span className="meta">Updated · {page.updated}</span>
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
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 14 }}>
            🇮🇳 INDIA GUIDE · {page.cat.toUpperCase()} · INR PRICING
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 96px)',
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
              { v: String(page.n_reviewed), k: 'Products reviewed' },
              { v: page.avg_score, k: 'Avg score' },
              { v: page.price_range, k: 'Price range (INR)' },
              { v: page.updated, k: 'Last updated' },
            ].map(({ v, k }, i) => (
              <div
                key={k}
                style={{
                  paddingRight: '28px',
                  marginRight: '28px',
                  borderRight: i < 3 ? '1px solid var(--line-2)' : 'none',
                  minWidth: '96px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 3vw, 38px)',
                    lineHeight: 0.95,
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

      {/* India disclaimer banner */}
      <div
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderBottom: '1px solid var(--ink)',
        }}
      >
        <div
          className="container"
          style={{
            padding: '12px var(--gutter)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '16px' }}>🇮🇳</span>
          {['INR pricing', 'Amazon India links', 'FSSAI certification status'].map((item, i) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: i === 0 ? 'var(--paper)' : 'rgba(246,244,239,0.65)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {i > 0 && <span style={{ opacity: 0.3 }}>·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>

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
            <h2 className="d-3">{page.n_reviewed} products ranked.</h2>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    gridTemplateColumns: '72px 1fr auto',
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
                        fontSize: '36px',
                        lineHeight: 0.85,
                        color: product.rank === 1 ? 'var(--paper)' : 'var(--ink)',
                      }}
                    >
                      {product.rank}
                    </div>
                    {medal && (
                      <div style={{ fontSize: '18px', marginTop: '4px' }}>{medal}</div>
                    )}
                  </div>

                  {/* Identity */}
                  <div style={{ padding: '18px 22px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '9.5px',
                        letterSpacing: '0.14em',
                        color: 'var(--mute)',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {product.brand} · {page.cat}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(20px, 2.4vw, 28px)',
                        lineHeight: 0.95,
                        textTransform: 'uppercase',
                        margin: '0 0 8px',
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span className="tag">{product.price}</span>
                      {product.badge && product.badge !== String(product.score) && (
                        <span className="tag green">{product.badge}</span>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    className={`bcard-score ${sc}`}
                    style={{ width: 88, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span className="n">{product.score.toFixed(1)}</span>
                    <span className="sub">/10</span>
                  </div>
                </div>

                {/* Body: blurb + pros/cons */}
                {(product.blurb || (product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                  <div
                    style={{
                      padding: '18px 22px',
                      display: 'grid',
                      gridTemplateColumns: product.pros?.length || product.cons?.length ? '1fr 1fr' : '1fr',
                      gap: '20px',
                    }}
                  >
                    {product.blurb && (
                      <div
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.55,
                          color: 'var(--ink-2)',
                          gridColumn: product.pros?.length || product.cons?.length ? '1 / -1' : undefined,
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
                          gap: '6px',
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
                              gap: '6px',
                              lineHeight: 1.4,
                            }}
                          >
                            <span style={{ flexShrink: 0, marginTop: '2px' }}>✓</span>
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
                          gap: '6px',
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
                              gap: '6px',
                              lineHeight: 1.4,
                            }}
                          >
                            <span style={{ flexShrink: 0, marginTop: '2px', color: 'var(--red)' }}>✗</span>
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

        {/* India footer disclaimer */}
        <div
          style={{
            marginTop: '48px',
            background: 'var(--paper-2)',
            border: '1px solid var(--line-2)',
            padding: '24px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              marginBottom: '10px',
            }}
          >
            About this guide
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
            Prices are in INR as listed on Amazon India at time of review ({page.updated}).
            FSSAI certification status is checked against the official FSSAI product approval
            database. We have no paid placements — rankings are based solely on ingredient
            quality, label transparency, and value for Indian buyers.
          </p>
          <div style={{ marginTop: '12px' }}>
            <Link
              href="/india/"
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              ← All India guides
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

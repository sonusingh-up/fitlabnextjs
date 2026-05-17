import type { Metadata } from 'next';
import Link from 'next/link';
import { indiaPages } from '@/lib/data';

export const metadata: Metadata = {
  title: 'India Supplement Guides 2026 — INR Pricing & Amazon India',
  description:
    'Independent supplement guides for India. INR pricing, FSSAI certification status, and Amazon India availability. Protein, pre-workouts, and vitamins ranked for Indian buyers.',
};

const CAT_TABS = [
  { label: 'All India guides', cat: null },
  { label: 'Protein', cat: 'Protein' },
  { label: 'Pre-Workouts', cat: 'Pre-Workouts' },
  { label: 'Vitamins', cat: 'Vitamins & Minerals' },
] as const;

export default function IndiaPage() {
  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            {CAT_TABS.map((tab, i) => (
              <Link
                key={tab.label}
                href="/india/"
                className={i === 0 ? 'active' : undefined}
              >
                {tab.label}
              </Link>
            ))}
            <span className="spacer" />
            <span className="meta">Updated · April 2026</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '32px 0 40px',
          background: 'var(--paper)',
        }}
      >
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>
            🇮🇳 INDIA · INR PRICING · AMAZON INDIA
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 136px)',
              lineHeight: 0.86,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}
          >
            India
            <br />
            Supplement
            <br />
            Guides.
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: '28px',
              alignItems: 'end',
              paddingTop: '20px',
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p
              style={{
                maxWidth: '520px',
                fontSize: '17px',
                lineHeight: 1.45,
                color: 'var(--ink-2)',
                margin: 0,
              }}
            >
              Supplement rankings built for Indian buyers — INR pricing, FSSAI
              certification status, and Amazon India availability verified for each pick.
            </p>
            {[
              { v: String(indiaPages.length), k: 'Guides' },
              { v: String(indiaPages.reduce((s, p) => s + p.n_reviewed, 0)), k: 'Products reviewed' },
              { v: '₹', k: 'INR pricing' },
            ].map(({ v, k }) => (
              <div
                key={k}
                style={{
                  borderLeft: '1px solid var(--line-2)',
                  paddingLeft: '16px',
                  minWidth: '88px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '38px',
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

      {/* Guide cards */}
      <section
        style={{
          background: 'var(--paper-2)',
          borderBottom: '1px solid var(--line)',
          padding: '48px 0',
        }}
      >
        <div className="container">
          <div className="sec-head" style={{ marginBottom: '24px' }}>
            <div className="left">
              <div className="lbl">
                <span className="num-lbl">01</span> All guides
              </div>
              <h2 className="d-3">{indiaPages.length} categories. INR-priced.</h2>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            }}
          >
            {indiaPages.map((page, i) => {
              const top = page.products[0];
              const sc =
                top.score >= 8.5 ? 'hi' : top.score >= 7 ? 'mid' : 'lo';
              return (
                <Link
                  key={page.slug}
                  href={`/india/${page.slug}/`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <article
                    style={{
                      background: 'var(--paper)',
                      border: '1px solid var(--ink)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'transform 0.12s',
                    }}
                    className="bcard"
                  >
                    {/* Card header */}
                    <div
                      style={{
                        borderBottom: '1px solid var(--line)',
                        padding: '20px 22px 16px',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--f-mono)',
                          fontSize: '10px',
                          letterSpacing: '0.18em',
                          color: 'var(--red)',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}
                      >
                        / {String(i + 1).padStart(2, '0')} · {page.cat}
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--f-display)',
                          fontWeight: 700,
                          fontSize: 'clamp(22px, 2.2vw, 28px)',
                          lineHeight: 0.96,
                          textTransform: 'uppercase',
                          margin: '0 0 16px',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {page.title}
                      </h2>

                      {/* Stats row */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '20px',
                          flexWrap: 'wrap',
                          marginBottom: '16px',
                        }}
                      >
                        {[
                          { k: 'Reviewed', v: page.n_reviewed },
                          { k: 'Avg score', v: page.avg_score },
                          { k: 'Updated', v: page.updated },
                        ].map(({ k, v }) => (
                          <div key={k}>
                            <div
                              style={{
                                fontFamily: 'var(--f-display)',
                                fontWeight: 700,
                                fontSize: '22px',
                                lineHeight: 0.95,
                              }}
                            >
                              {v}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--f-mono)',
                                fontSize: '9.5px',
                                letterSpacing: '0.12em',
                                color: 'var(--mute)',
                                textTransform: 'uppercase',
                                marginTop: '3px',
                              }}
                            >
                              {k}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price range tag */}
                      <span className="tag">
                        {page.price_range}
                      </span>
                    </div>

                    {/* Top product strip */}
                    <div
                      style={{
                        padding: '14px 22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        borderBottom: '1px solid var(--line)',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: '9.5px',
                            letterSpacing: '0.12em',
                            color: 'var(--mute)',
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                          }}
                        >
                          #1 Pick
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--f-display)',
                            fontWeight: 700,
                            fontSize: '16px',
                            lineHeight: 1.0,
                            textTransform: 'uppercase',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {top.name}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'var(--ink-3)',
                            marginTop: '2px',
                          }}
                        >
                          {top.brand} · {top.price}
                        </div>
                      </div>
                      <div className={`bcard-score ${sc}`} style={{ width: 64, height: 64, flexShrink: 0 }}>
                        <span className="n">{top.score.toFixed(1)}</span>
                        <span className="sub">/10</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bcard-foot">
                      <span
                        style={{
                          fontFamily: 'var(--f-mono)',
                          fontSize: '10px',
                          color: 'var(--mute)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        🇮🇳 FSSAI · Amazon India
                      </span>
                      <span className="bcard-link">View guide</span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* India disclaimer */}
      <div className="container" style={{ padding: '32px var(--gutter)' }}>
        <div
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--line-2)',
            padding: '20px 24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '20px', flexShrink: 0 }}>🇮🇳</span>
          <div>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--mute)',
                marginBottom: '6px',
              }}
            >
              India Guide Disclaimer
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.55 }}>
              All prices are in INR and sourced from Amazon India at time of writing.
              FSSAI certification status is verified against the FSSAI product approval
              database. International products shipped to India may be subject to import
              duties. Prices fluctuate — always verify before purchasing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

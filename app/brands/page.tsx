import type { Metadata } from 'next';
import Link from 'next/link';
import brandsData from '@/data/brands.json';
import BrandsClient from './BrandsClient';

export const metadata: Metadata = {
  title: 'All Supplement Brands — Independent Trust Ratings',
  description:
    'Independent trust ratings for 89 supplement brands. Lab-verified manufacturing, CoA practices, recall history, and per-product scores. No paid placements.',
};

const meta = { count: 26, last_audit: 'Apr 2026', audited_q2_pct: 100, under_dose_pct: 34, fail_pct: 19, avg_dev_pct: 6.2 };
const allBrands = brandsData.brands as typeof brandsData.brands;
const featured = allBrands.find(b => b.featured) ?? allBrands[0];

// Aggregate stats derived from the actual dataset
const aGrade = allBrands.filter(b => b.trust.startsWith('A')).length;
const bcGrade = allBrands.filter(b => b.trust.startsWith('B') || b.trust.startsWith('C')).length;
const dfGrade = allBrands.filter(b => b.trust.startsWith('D') || b.trust.startsWith('F')).length;

export default function BrandsPage() {
  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/brands" className="active">All brands</Link>
            <Link href="/brands?sort=trust">By trust grade</Link>
            <Link href="/brands?filter=trust:A">A-listed (verified)</Link>
            <Link href="/brands?filter=recall:1">Recall watchlist</Link>
            <span className="spacer" />
            <span className="meta">
              {meta.count} brands · Last audit {meta.last_audit}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid var(--ink)', padding: '32px 0' }}>
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>
            BRANDS · INDEPENDENT TRUST AUDIT · Q2 2026
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
            89 brands.<br />One rubric.
          </h1>

          {/* Meta grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto auto',
              gap: 28,
              alignItems: 'end',
              marginTop: 18,
              paddingTop: 18,
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.45, color: 'var(--ink-2)', margin: 0 }}>
              Every brand we&rsquo;ve sent to the lab. Trust grades are based on independent CoA
              verification, recall history, dosing accuracy across their portfolio, and
              label-vs-assay deviation.{' '}
              <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
                How we grade →
              </Link>
            </p>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 90 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95 }}>
                {meta.count}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                Brands audited
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 90 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95, color: 'var(--green-deep)' }}>
                {aGrade}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                A-grade
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 90 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95, color: '#8a6b00' }}>
                {bcGrade}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                B / C
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--line-2)', paddingLeft: 16, minWidth: 90 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 36, lineHeight: 0.95, color: 'var(--red-deep)' }}>
                {dfGrade}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                D / F
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit stat strip */}
      <div className="container" style={{ paddingTop: 28 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            border: '1px solid var(--ink)',
            marginBottom: 28,
            background: 'var(--paper)',
          }}
        >
          <div style={{ padding: '18px 22px', borderRight: '1px solid var(--ink)' }}>
            <h3
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 700,
                fontSize: 22,
                lineHeight: 1,
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}
            >
              The brand audit
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-3)', lineHeight: 1.4, margin: 0 }}>
              Every brand on this directory has been independently graded across 5 trust dimensions.
              Re-audited every quarter.
            </p>
          </div>
          <div style={{ padding: '18px 22px', borderRight: '1px solid var(--ink)' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 42, lineHeight: 0.9, color: 'var(--green-deep)' }}>
              {meta.audited_q2_pct}%
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
              Brands re-audited Q2
            </div>
          </div>
          <div style={{ padding: '18px 22px', borderRight: '1px solid var(--ink)' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 42, lineHeight: 0.9, color: '#8a6b00' }}>
              {meta.under_dose_pct}%
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
              Under-dose ≥1 product
            </div>
          </div>
          <div style={{ padding: '18px 22px', borderRight: '1px solid var(--ink)' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 42, lineHeight: 0.9, color: 'var(--red-deep)' }}>
              {meta.fail_pct}%
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
              Failed lab on ≥1 product
            </div>
          </div>
          <div style={{ padding: '18px 22px' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 42, lineHeight: 0.9 }}>
              ±{meta.avg_dev_pct}
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
              Avg label deviation %
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brand Spotlight */}
      {featured && (
        <div className="container" style={{ marginBottom: 28 }}>
          <Link
            href={`/brands/${featured.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 220px',
              border: '1px solid var(--ink)',
              background: 'var(--paper)',
              overflow: 'hidden',
              position: 'relative',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {/* "Brand of Q2" label */}
            <span
              style={{
                position: 'absolute',
                top: -1,
                left: 24,
                background: 'var(--red)',
                color: 'var(--paper)',
                padding: '6px 12px 5px',
                fontFamily: 'var(--f-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                zIndex: 2,
              }}
            >
              BRAND OF Q2 · 2026
            </span>

            {/* Monogram */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid var(--ink)',
                position: 'relative',
                paddingTop: 32,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 156,
                  lineHeight: 0.85,
                  letterSpacing: '-0.03em',
                }}
              >
                {featured.letter ?? featured.name[0]}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.16em',
                  color: 'var(--mute-2)',
                  textTransform: 'uppercase',
                }}
              >
                EST. {featured.founded} · {featured.hq?.toUpperCase()}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '36px 32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10.5px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                {featured.cat?.toUpperCase()}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 64px)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {featured.name}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 580, margin: 0 }}>
                <b style={{ color: 'var(--ink)' }}>The benchmark brand of the quarter.</b>{' '}
                {featured.blurb}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(featured.certs ?? []).map(c => (
                  <span key={c} className="tag green">
                    <span className="dot" />
                    {c}
                  </span>
                ))}
                <span className="tag">
                  {featured.recalls} recall{featured.recalls === 1 ? '' : 's'}
                </span>
                <span className="tag">{featured.n_prod} products</span>
              </div>
            </div>

            {/* Side panel */}
            <div
              style={{
                borderLeft: '1px solid var(--ink)',
                background: 'var(--paper-2)',
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '14px 0 16px',
                  border: '1px solid var(--ink)',
                  background: 'var(--paper)',
                }}
              >
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', letterSpacing: '0.18em', color: 'var(--mute)', textTransform: 'uppercase' }}>
                  Trust grade
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 56,
                    lineHeight: 0.9,
                    color: 'var(--green-deep)',
                    marginTop: 2,
                  }}
                >
                  {featured.trust}
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', color: 'var(--mute)', letterSpacing: '0.06em', marginTop: 4 }}>
                  Verified · n = 4 audits
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { v: featured.score.toFixed(1), k: 'Avg score' },
                  { v: String(featured.n_prod), k: 'Products' },
                  { v: String(featured.recalls), k: 'Recalls', color: featured.recalls === 0 ? 'var(--green-deep)' : 'var(--red-deep)' },
                  { v: `±${featured.dev_pct}%`, k: 'Label Δ', color: parseFloat(String(featured.dev_pct)) < 5 ? 'var(--green-deep)' : parseFloat(String(featured.dev_pct)) < 10 ? '#8a6b00' : 'var(--red-deep)' },
                ].map(({ v, k, color }) => (
                  <div key={k} style={{ padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--line-2)' }}>
                    <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, lineHeight: 0.95, color: color ?? 'var(--ink)' }}>
                      {v}
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 2 }}>
                      {k}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 'auto',
                  padding: 12,
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                View brand →
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Client component handles search/filter/sorted brand cards */}
      <BrandsClient brands={allBrands as Parameters<typeof BrandsClient>[0]['brands']} featuredSlug={featured?.slug} />
    </>
  );
}

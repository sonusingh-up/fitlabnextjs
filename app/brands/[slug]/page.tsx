import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import brandsData from '@/data/brands.json';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrustBreakdown {
  disclosure: number;
  lab_verify: number;
  mfg: number;
  track_record: number;
  pricing: number;
}

interface Product {
  slug?: string;
  name: string;
  cat: string;
  illus?: string;
  score: number;
  pick: boolean;
  audits: number;
  last: string;
}

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
  alert?: boolean;
  trust_breakdown?: TrustBreakdown;
  mfg?: string | { location: string; cgmp_audit: string; lab_partner: string };
  mfg_blurb?: string;
  who_blurb?: string;
  products?: Product[];
}

const allBrands = brandsData.brands as RawBrand[];

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return allBrands.map(b => ({ slug: b.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = allBrands.find(b => b.slug === slug);
  if (!brand) return { title: 'Brand Not Found' };

  const description = `${brand.n_prod} products tested, ${brand.recalls} recalls in audit window, ±${brand.dev_pct}% mean label deviation. The full independent audit of ${brand.name}.`;

  return {
    title: `${brand.name} — Independent Brand Audit`,
    description,
    openGraph: {
      title: `${brand.name} — Independent Brand Audit · Fitlab`,
      description,
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function gradeColor(trust: string): string {
  const g = trust[0];
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  return 'var(--red-deep)';
}

function gradeBg(trust: string): string {
  const g = trust[0];
  if (g === 'A') return 'var(--green)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return 'var(--amber)';
  return 'var(--red)';
}

function devClass(dev: number | string) {
  const n = typeof dev === 'string' ? parseFloat(dev) : dev;
  if (n < 5) return 'var(--green-deep)';
  if (n > 10) return 'var(--red-deep)';
  return '#8a6b00';
}

function scoreColor(score: number) {
  if (score >= 8.5) return 'var(--green-deep)';
  if (score >= 7) return '#8a6b00';
  return 'var(--red-deep)';
}

function rubricLabel(key: keyof TrustBreakdown): string {
  const map: Record<keyof TrustBreakdown, string> = {
    disclosure: 'Disclosure',
    lab_verify: 'Lab verify',
    mfg: 'Mfg quality',
    track_record: 'Track record',
    pricing: 'Pricing',
  };
  return map[key];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = allBrands.find(b => b.slug === slug);
  if (!brand) notFound();

  const monogram = brand.letter ?? brand.initials ?? brand.name[0];
  const editorPicks = brand.products?.filter(p => p.pick).length ?? 0;

  const trustRows: Array<{ key: keyof TrustBreakdown; weight: string; note: string }> = [
    { key: 'disclosure', weight: '25%', note: 'Ingredients disclosed · no prop. blends' },
    { key: 'lab_verify', weight: '25%', note: 'CoA published · ISO lab partner' },
    { key: 'mfg', weight: '20%', note: 'cGMP facility · consistent lots' },
    { key: 'track_record', weight: '20%', note: 'Recalls · FDA warnings · corrections' },
    { key: 'pricing', weight: '10%', note: 'Cost per clinical serving vs. peers' },
  ];

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <a href="#identity" className="active">Identity</a>
            <a href="#trust">Trust rubric</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#verdict">Verdict</a>
            {brand.mfg && <a href="#operation">Operation</a>}
            <span className="spacer" />
            <span className="meta">Audit v3.2 · Apr 2026</span>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid var(--ink)', padding: '28px 0 0', background: 'var(--paper)' }}>
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
            <Link href="/brands" style={{ color: 'var(--ink-2)' }}>Brands</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{brand.name}</span>
          </div>

          {/* Identity row */}
          <div
            id="identity"
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr 240px',
              gap: 32,
              alignItems: 'stretch',
              paddingBottom: 32,
            }}
          >
            {/* Monogram block */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 16,
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: 'var(--red)' }} />
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 196,
                  lineHeight: 0.78,
                  letterSpacing: '-0.04em',
                  marginBottom: -8,
                }}
              >
                {monogram}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  letterSpacing: '0.16em',
                  color: 'var(--mute-2)',
                  textTransform: 'uppercase',
                  borderTop: '1px solid var(--ink-3)',
                  paddingTop: 10,
                  marginTop: 10,
                }}
              >
                EST. {brand.founded} · {brand.hq?.toUpperCase()}
                <br />
                {brand.n_prod} PRODUCTS
              </div>
            </div>

            {/* Titles */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: 'var(--red)',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  {brand.cat?.toUpperCase()}
                </div>
                <h1
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(56px, 7vw, 112px)',
                    lineHeight: 0.86,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.36em',
                      color: 'var(--mute)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      marginBottom: 8,
                    }}
                  >
                    The Fitlab brand audit
                  </span>
                  {brand.name}
                </h1>
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 620, margin: 0 }}>
                {brand.blurb}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(brand.certs ?? []).map(c => (
                  <span key={c} className="tag green">
                    <span className="dot" />
                    {c}
                  </span>
                ))}
                <span className="tag">
                  {brand.recalls} recall{brand.recalls === 1 ? '' : 's'}
                </span>
                <span className="tag">{brand.n_prod} products</span>
                {brand.alert && (
                  <span className="tag red">
                    <span className="dot" />
                    Flagged
                  </span>
                )}
              </div>
            </div>

            {/* Grade panel */}
            <aside
              style={{
                border: '1px solid var(--ink)',
                background: 'var(--paper)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ background: gradeBg(brand.trust), color: 'var(--paper)', padding: '18px 20px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85 }}>
                  FITLAB TRUST
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 88,
                    lineHeight: 0.86,
                    letterSpacing: '-0.02em',
                    margin: '4px 0 2px',
                  }}
                >
                  {brand.trust}
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85 }}>
                  Verified · {brand.region}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {brand.trust_breakdown
                  ? trustRows.map(({ key, weight: _w }) => {
                      const val = brand.trust_breakdown![key];
                      const isHigh = val >= 8.5;
                      return (
                        <div
                          key={key}
                          style={{
                            padding: '8px 16px',
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            alignItems: 'center',
                            fontFamily: 'var(--f-mono)',
                            fontSize: 11,
                            borderTop: '1px solid var(--line)',
                          }}
                        >
                          <span style={{ letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                            {rubricLabel(key)}
                          </span>
                          <span style={{ fontWeight: 700, color: isHigh ? 'var(--green-deep)' : 'var(--ink)' }}>
                            {val.toFixed(1)}
                          </span>
                        </div>
                      );
                    })
                  : (
                    <div style={{ padding: '12px 16px', fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', borderTop: '1px solid var(--line)' }}>
                      Full rubric in next audit
                    </div>
                  )}
              </div>
            </aside>
          </div>

          {/* Fact strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              border: '1px solid var(--ink)',
              borderBottom: 0,
              background: 'var(--paper)',
            }}
          >
            {[
              { k: 'Products tested', v: String(brand.n_prod), vs: 'Across audit window', color: undefined },
              { k: 'Avg score', v: `${brand.score.toFixed(1)}`, vs: 'Out of 10', color: scoreColor(brand.score) },
              { k: "Editor's picks", v: String(editorPicks), vs: `of ${brand.n_prod} SKUs`, color: editorPicks > 0 ? 'var(--green-deep)' : undefined },
              { k: 'Label deviation', v: `±${brand.dev_pct}%`, vs: 'Mean across audits', color: devClass(brand.dev_pct) },
              { k: 'Recalls', v: String(brand.recalls), vs: 'Cat. avg: 0.8', color: brand.recalls === 0 ? 'var(--green-deep)' : 'var(--red-deep)' },
              { k: 'Region', v: brand.region, vs: brand.hq, color: undefined },
            ].map((stat, i) => (
              <div
                key={stat.k}
                style={{
                  padding: '16px 18px',
                  borderRight: i < 5 ? '1px solid var(--ink)' : undefined,
                }}
              >
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 4 }}>
                  {stat.k}
                </div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 24, lineHeight: 0.95, color: stat.color ?? 'var(--ink)' }}>
                  {stat.v}
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.04em', marginTop: 4 }}>
                  {stat.vs}
                </div>
              </div>
            ))}
          </div>

          {/* Disclosure note */}
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              padding: '14px 20px',
              fontFamily: 'var(--f-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderLeft: '3px solid var(--red)',
              lineHeight: 1.5,
              marginTop: 14,
              marginBottom: 0,
            }}
          >
            <b style={{ color: 'var(--red)', fontWeight: 700 }}>Affiliate disclosure.</b>{' '}
            Fitlab earns $0 from {brand.name}. We have no commercial relationship with this brand. We bought all audited products at full retail.
          </div>
        </div>
      </section>

      {/* ── TRUST RUBRIC ── */}
      {brand.trust_breakdown && (
        <section id="trust" style={{ padding: '48px 0', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18 }}>
              <b style={{ background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px', marginRight: 8, fontWeight: 700 }}>02</b>
              THE TRUST RUBRIC
            </div>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 700,
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: 0.94,
                textTransform: 'uppercase',
                margin: '0 0 8px',
                letterSpacing: '-0.005em',
              }}
            >
              How a brand earns an {brand.trust[0]}.
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 720, margin: '0 0 24px' }}>
              Brand trust grades are not the same as product scores. We score five independent dimensions, then derive the letter grade.{' '}
              <Link href="/methodology#brands" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
                Brand methodology →
              </Link>
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                border: '1px solid var(--ink)',
                background: 'var(--paper)',
              }}
            >
              {trustRows.map(({ key, weight, note }, i) => {
                const val = brand.trust_breakdown![key];
                const isHi = val >= 8.5;
                const isMid = val >= 7 && val < 8.5;
                const barColor = isHi ? 'var(--green)' : isMid ? 'var(--amber)' : 'var(--red)';
                const scoreCol = isHi ? 'var(--green-deep)' : isMid ? '#8a6b00' : 'var(--red-deep)';
                return (
                  <div
                    key={key}
                    style={{
                      padding: 20,
                      borderRight: i < 4 ? '1px solid var(--ink)' : undefined,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--f-mono)', fontSize: '10.5px', letterSpacing: '0.14em', color: 'var(--red)', fontWeight: 700 }}>
                        B.0{i + 1}
                      </span>
                      <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 32, lineHeight: 0.9, letterSpacing: '-0.02em', color: scoreCol }}>
                        {val.toFixed(1)}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>
                      {rubricLabel(key)}
                    </h3>
                    <div style={{ height: 4, background: 'var(--line)', position: 'relative', marginTop: 'auto' }}>
                      <i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${val * 10}%`, background: barColor, display: 'block' }} />
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', letterSpacing: '0.06em', color: 'var(--mute)', textTransform: 'uppercase' }}>
                      Weight · {weight} · {note}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── PORTFOLIO ── */}
      {brand.products && brand.products.length > 0 && (
        <section id="portfolio" style={{ padding: '48px 0', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18 }}>
              <b style={{ background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px', marginRight: 8, fontWeight: 700 }}>03</b>
              EVERY PRODUCT, EVERY TEST
            </div>
            <h2
              style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 700,
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: 0.94,
                textTransform: 'uppercase',
                margin: '0 0 8px',
                letterSpacing: '-0.005em',
              }}
            >
              The {brand.n_prod}-product audit.
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 720, margin: '0 0 24px' }}>
              Each row is one product we&rsquo;ve reviewed. Score is the most recent.{' '}
              <b style={{ color: 'var(--ink)' }}>{editorPicks} of {brand.n_prod}</b>{' '}
              hold Editor&rsquo;s Choice as of Apr 2026.
            </p>

            {/* Certifications badge row */}
            {(brand.certs ?? []).length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {(brand.certs ?? []).map(c => (
                  <span key={c} className="tag green">
                    <span className="dot" />
                    {c}
                  </span>
                ))}
              </div>
            )}

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
                  gridTemplateColumns: '1fr 90px 120px 90px',
                  gap: 16,
                  padding: '12px 22px',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <div>Product · Category</div>
                <div>Score</div>
                <div>Status</div>
                <div>Audits</div>
              </div>

              {brand.products.map((product, i) => {
                const href = product.slug ? `/reviews/${product.slug}` : '#';
                return (
                  <Link
                    key={product.name}
                    href={href}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 90px 120px 90px',
                      gap: 16,
                      padding: '14px 22px',
                      borderBottom: i < brand.products!.length - 1 ? '1px solid var(--line)' : undefined,
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'background 0.1s',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 18, lineHeight: 1, textTransform: 'uppercase' }}>
                        {product.name}
                      </div>
                      <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', letterSpacing: '0.1em', color: 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                        {product.cat}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 28, lineHeight: 0.9, color: scoreColor(product.score) }}>
                      {product.score.toFixed(1)}
                      <small style={{ fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 500, color: 'var(--mute)', marginLeft: 2 }}>/10</small>
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)', lineHeight: 1.4 }}>
                      {product.pick ? (
                        <span style={{ display: 'inline-block', padding: '2px 6px', background: 'var(--green-soft)', color: 'var(--green-deep)', border: '1px solid var(--green)', fontSize: 9, letterSpacing: '0.06em' }}>
                          ★ Ed. pick
                        </span>
                      ) : (
                        <b style={{ color: 'var(--ink)' }}>Reviewed</b>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: '10.5px', color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
                      <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{product.audits}× audits</div>
                      <div style={{ fontSize: '9.5px', color: 'var(--mute)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {product.last}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── VERDICT ── */}
      <section id="verdict" style={{ padding: '48px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18 }}>
            <b style={{ background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px', marginRight: 8, fontWeight: 700 }}>04</b>
            EDITORIAL POSITION
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
            Our verdict on {brand.name}.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              border: '1px solid var(--ink)',
              background: 'var(--paper)',
            }}
          >
            {/* Case for */}
            <div style={{ padding: 28, borderRight: '1px solid var(--ink)' }}>
              <h4
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 0.96,
                  textTransform: 'uppercase',
                  margin: '0 0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    background: 'var(--green)',
                    color: 'var(--paper)',
                    borderRadius: '50%',
                    fontFamily: 'var(--f-mono)',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  +
                </span>
                The case for
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(brand.certs ?? []).length > 0 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>Certified across multiple standards.</b>{' '}
                    {brand.certs.join(', ')} — independently verified.
                  </li>
                )}
                {brand.recalls === 0 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>Zero recalls in audit window.</b>{' '}
                    Clean track record across all tested SKUs.
                  </li>
                )}
                {parseFloat(String(brand.dev_pct)) < 5 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>Tight label deviation (±{brand.dev_pct}%).</b>{' '}
                    What you see on the label is what you get in the product.
                  </li>
                )}
                {brand.score >= 8.5 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>High portfolio average ({brand.score.toFixed(1)}/10).</b>{' '}
                    Consistently strong across the tested lineup.
                  </li>
                )}
                {brand.mfg_blurb && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>Manufacturing transparency.</b>{' '}
                    {brand.mfg_blurb}
                  </li>
                )}
              </ul>
            </div>

            {/* Case against */}
            <div style={{ padding: 28 }}>
              <h4
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 0.96,
                  textTransform: 'uppercase',
                  margin: '0 0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'var(--red-deep)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    background: 'var(--red)',
                    color: 'var(--paper)',
                    borderRadius: '50%',
                    fontFamily: 'var(--f-mono)',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  −
                </span>
                The case against
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {brand.recalls > 0 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>{brand.recalls} recall{brand.recalls > 1 ? 's' : ''} in audit window.</b>{' '}
                    Check the specific SKUs affected before purchasing.
                  </li>
                )}
                {parseFloat(String(brand.dev_pct)) > 10 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>High label deviation (±{brand.dev_pct}%).</b>{' '}
                    Consistent under-dosing detected across independent lab runs.
                  </li>
                )}
                {(brand.certs ?? []).length === 0 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>No third-party certifications.</b>{' '}
                    No NSF, Informed Sport, or equivalent independent certification verified.
                  </li>
                )}
                {brand.score < 7 && (
                  <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5 }}>
                    <b>Below-average portfolio score ({brand.score.toFixed(1)}/10).</b>{' '}
                    Multiple SKUs failed to meet clinical dose standards in our testing.
                  </li>
                )}
                <li style={{ padding: '12px 0', borderTop: '1px dashed var(--line)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  Full claims-vs-reality breakdown publishes with the next quarterly audit.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATION (if data available) ── */}
      {(brand.mfg || brand.mfg_blurb || brand.who_blurb) && (
        <section id="operation" style={{ padding: '48px 0', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18 }}>
              <b style={{ background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px', marginRight: 8, fontWeight: 700 }}>05</b>
              THE OPERATION
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
              Who runs it. Where it&rsquo;s made.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {brand.who_blurb && (
                <div style={{ border: '1px solid var(--line-2)', background: 'var(--paper)', padding: 24 }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
                    // THE OPERATION
                  </div>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 14px', letterSpacing: '-0.005em' }}>
                    Who they are
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
                    {brand.who_blurb}
                  </p>
                  <dl
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '130px 1fr',
                      rowGap: 8,
                      columnGap: 14,
                      margin: 0,
                      paddingTop: 14,
                      borderTop: '1px solid var(--line)',
                      marginTop: 14,
                      fontSize: 13,
                    }}
                  >
                    <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>Founded</dt>
                    <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{brand.founded}</dd>
                    <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>HQ</dt>
                    <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{brand.hq}</dd>
                    <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>Region</dt>
                    <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{brand.region}</dd>
                  </dl>
                </div>
              )}
              {(brand.mfg || brand.mfg_blurb) && (
                <div style={{ border: '1px solid var(--line-2)', background: 'var(--paper)', padding: 24 }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
                    // SUPPLY CHAIN
                  </div>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, lineHeight: 1.05, textTransform: 'uppercase', margin: '0 0 14px', letterSpacing: '-0.005em' }}>
                    Where it&rsquo;s made
                  </h3>
                  {brand.mfg_blurb && (
                    <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', margin: '0 0 14px' }}>
                      {brand.mfg_blurb}
                    </p>
                  )}
                  {brand.mfg && (
                    <dl
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '130px 1fr',
                        rowGap: 8,
                        columnGap: 14,
                        margin: 0,
                        paddingTop: 14,
                        borderTop: '1px solid var(--line)',
                        fontSize: 13,
                      }}
                    >
                      <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>Mfg location</dt>
                      <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{typeof brand.mfg === 'object' ? brand.mfg?.location : (brand.mfg || '—')}</dd>
                      <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>cGMP audit</dt>
                      <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{typeof brand.mfg === 'object' ? brand.mfg?.cgmp_audit : '—'}</dd>
                      <dt style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', paddingTop: 2 }}>Lab partner</dt>
                      <dd style={{ margin: 0, color: 'var(--ink-2)' }}>{typeof brand.mfg === 'object' ? brand.mfg?.lab_partner : '—'}</dd>
                    </dl>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── WHERE TO BUY ── */}
      <section style={{ padding: '48px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18 }}>
            <b style={{ background: 'var(--red)', color: 'var(--paper)', padding: '2px 6px', marginRight: 8, fontWeight: 700 }}>
              {brand.mfg ? '06' : '05'}
            </b>
            PRICE &amp; AVAILABILITY
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
            Where they sell.
          </h2>

          <div
            style={{
              background: 'var(--paper-2)',
              border: '1px solid var(--line-2)',
              padding: '22px 24px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 22,
            }}
          >
            {[
              {
                k: `DIRECT // ${brand.name.toLowerCase().replace(/\s+/g, '')}.com`,
                v: 'Freshest stock',
                vd: 'Best price-per-unit after any subscription discount. Watch for auto-ship defaults at checkout.',
              },
              {
                k: 'AMAZON · PRIME',
                v: 'Convenient · slower turnover',
                vd: 'Sold by manufacturer on most brands. Inventory turn may be slower than direct — stock can be 3–9 months old.',
              },
              {
                k: 'IHERB · INTERNATIONAL',
                v: 'EU / APAC availability',
                vd: 'Where international buyers find US brands at reasonable prices. Check for local import duties.',
              },
            ].map((item, i) => (
              <div
                key={item.k}
                style={{
                  borderRight: i < 2 ? '1px solid var(--line)' : undefined,
                  paddingRight: i < 2 ? 22 : undefined,
                }}
              >
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>
                  {item.k}
                </div>
                <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.05, marginBottom: 4 }}>
                  {item.v}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.45 }}>
                  {item.vd}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(34px, 4vw, 56px)',
                  lineHeight: 0.92,
                  textTransform: 'uppercase',
                  margin: '0 0 14px',
                  letterSpacing: '-0.01em',
                }}
              >
                Brand-audit feed —{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--red)' }}>email me</em>
                <br />
                when the score changes.
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--paper)', opacity: 0.85, margin: 0 }}>
                Quarterly re-audits, recall alerts, and corrections — for {brand.name} and any of the{' '}
                26 brands in our directory. One email per change. Zero marketing.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--paper)', marginBottom: 12 }}>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 0,
                    padding: '14px 18px',
                    color: 'var(--paper)',
                    font: 'inherit',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    background: 'var(--red)',
                    color: 'var(--paper)',
                    border: 0,
                    padding: '0 22px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Watch →
                </button>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute-2)' }}>
                28,412 readers · Free · No tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to brands link */}
      <div className="container" style={{ paddingBottom: 48 }}>
        <Link href="/brands" className="btn">
          ← Back to all brands
        </Link>
      </div>
    </>
  );
}

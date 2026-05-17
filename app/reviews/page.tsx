import type { Metadata } from 'next';
import Link from 'next/link';
import { reviews } from '@/lib/data';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'All Supplement Reviews — Independent Lab Tests · Fitlab',
  description:
    'Every supplement we have lab-tested. Bought at retail, sent to an ISO-17025 lab, scored against a five-question rubric. No paid placements.',
};

type RawReview = (typeof reviews)[number];

export default function ReviewsPage() {
  const raw = reviews as RawReview[];

  const featured: RawReview =
    raw.filter(r => r.pick).sort((a, b) => b.score - a.score)[0] ??
    raw.slice().sort((a, b) => b.score - a.score)[0];

  const sc = featured.score >= 8.5 ? 'hi' : featured.score >= 7 ? 'mid' : 'lo';

  const rubricEntries = featured.rubric ? Object.entries(featured.rubric) : [];

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/reviews" className="active">All reviews</Link>
            <Link href="/reviews">Editor&apos;s picks</Link>
            <Link href="/reviews">Recently tested</Link>
            <Link href="/reviews">Failed lab</Link>
            <span className="spacer" />
            <span className="meta">Last lab run · May 12, 2026</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="idx-hero">
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>
            REVIEWS · 512 PRODUCTS · 89 BRANDS
          </div>
          <h1>
            All
            <br />
            reviews.
          </h1>
          <div className="meta-grid">
            <p className="lede">
              Every supplement we&apos;ve tested. Bought at retail, sent to an ISO-17025 lab, scored
              against a five-question rubric.{' '}
              <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
                How we test →
              </Link>
            </p>
            <div className="stat">
              <div className="v">512</div>
              <div className="k">Tested</div>
            </div>
            <div className="stat">
              <div className="v green">22</div>
              <div className="k">Editor&apos;s pick</div>
            </div>
            <div className="stat">
              <div className="v red">97</div>
              <div className="k">Failed lab</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured card — wide bcard */}
      <div className="container" style={{ paddingTop: 28 }}>
        <article className="bcard" style={{ marginBottom: 16 }}>
          {featured.pick && (
            <span className="bcard-ribbon green">★ Editor&apos;s Choice · #1 IN CATEGORY</span>
          )}
          <div className="bcard-head" style={{ gridTemplateColumns: '140px 1fr 96px', display: 'grid' }}>
            <div className="bcard-img">
              <svg viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="20" width="40" height="44" rx="3" fill="#e7e3d7" stroke="#0a0a0a" strokeWidth="1.5" />
                <rect x="8" y="16" width="48" height="10" rx="2" fill="#0a0a0a" />
                <rect x="18" y="36" width="28" height="2" fill="#0a0a0a" opacity=".2" />
                <rect x="18" y="41" width="20" height="2" fill="#0a0a0a" opacity=".2" />
              </svg>
            </div>
            <div className="bcard-id" style={{ padding: '18px 22px' }}>
              <div className="bcard-cat">{featured.cat}</div>
              <h3 className="bcard-name" style={{ fontSize: 28 }}>
                {featured.brand}
                <br />
                {featured.product}
              </h3>
              {featured.blurb && (
                <div className="bcard-tag" style={{ marginTop: 8, maxWidth: 520 }}>
                  {featured.blurb}
                </div>
              )}
            </div>
            <div className={`bcard-score ${sc}`} style={{ width: 'auto' }}>
              <span className="n">{featured.score.toFixed(1)}</span>
              <span className="sub">/10</span>
            </div>
          </div>

          {rubricEntries.length > 0 && (
            <div className="bcard-rubric" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              {rubricEntries.map(([label, val]) => {
                const cls = val >= 8.5 ? 'hi' : val >= 7 ? 'mid' : 'lo';
                return (
                  <div key={label} className="rb-row">
                    <span className="rb-lbl">{label}</span>
                    <span className="rb-val">{Number(val).toFixed(1)}</span>
                    <div className="rb-bar">
                      <i className={cls} style={{ width: `${Number(val) * 10}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bcard-foot">
            <div className="bcard-tags">
              {(featured.tags ?? []).slice(0, 3).map((t, i) => {
                const label = typeof t === 'string' ? t : t.t;
                const cls = typeof t === 'object' && t.c ? ` ${t.c}` : '';
                return <span key={i} className={`tag${cls}`}>{label}</span>;
              })}
            </div>
            <Link href={`/reviews/${featured.slug}/`} className="bcard-link">
              Full analysis
            </Link>
          </div>
        </article>
      </div>

      {/* Client-side filter + grid */}
      <ReviewsClient reviews={reviews} featuredSlug={featured.slug} />
    </>
  );
}

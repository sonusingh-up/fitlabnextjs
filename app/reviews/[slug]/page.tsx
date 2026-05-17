import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reviews, getReviewBySlug } from '@/lib/data';
import type { Review } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return reviews.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return { title: 'Review Not Found · Fitlab' };

  const title = `${review.brand} ${review.product} — Independent Lab Review · Fitlab`;
  const blurb = review.blurb ?? '';
  const description = `${review.brand} ${review.product} — Fitlab score ${review.score}/10. ${blurb}`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

function scoreColorClass(val: number) {
  return val >= 8.5 ? 'hi' : val >= 7 ? 'mid' : 'lo';
}

function verdictWord(score: number) {
  if (score >= 8.5) return 'Buy';
  if (score >= 7) return 'Consider';
  if (score >= 5) return 'Skip';
  return 'Avoid';
}

function verdictBg(score: number) {
  if (score >= 8.5) return 'var(--green)';
  if (score >= 7) return 'var(--amber)';
  return 'var(--red)';
}

const RUBRIC_QUESTIONS = [
  {
    key: 'Ingredient',
    num: 'Q.01',
    title: 'Ingredient quality',
    sub: '25% of total score · Form, source, bioavailability',
    copy: 'We evaluate the form, source, and bioavailability of each active ingredient against the peer-reviewed literature.',
  },
  {
    key: 'Dosing',
    num: 'Q.02',
    title: 'Clinical dosing',
    sub: '25% of total score · Dose vs. evidence-based effect range',
    copy: 'Each ingredient dose is compared against the range used in clinical trials for the relevant outcome.',
  },
  {
    key: 'Transparency',
    num: 'Q.03',
    title: 'Transparency',
    sub: '20% of total score · Disclosure, CoAs, manufacturer named',
    copy: 'Full label disclosure, published certificates of analysis, and named manufacturer all contribute to this score.',
  },
  {
    key: 'Third-party',
    num: 'Q.04',
    title: 'Third-party verification',
    sub: '15% of total score · Independent assay vs. brand CoA',
    copy: 'We independently re-assay products at an ISO-17025 accredited partner lab and compare against brand-published CoAs.',
  },
  {
    key: 'Value',
    num: 'Q.05',
    title: 'Value',
    sub: '15% of total score · Cost-per-clinical-serving',
    copy: 'Cost is evaluated per clinical serving (adjusted for dosing accuracy), not per scoop or per gram.',
  },
];

export default async function ReviewDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) notFound();

  const sc = scoreColorClass(review.score);

  const rubricEntries: Array<[string, number]> = review.rubric
    ? Object.entries(review.rubric)
    : [];

  const displayCat = review.cat;
  const testedDate = review.last_tested;

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav review-subnav">
        <div className="container">
          <div className="sub-nav-inner">
            <a href="#verdict" className="active">Verdict</a>
            <a href="#rubric">Rubric</a>
            <a href="#ingredients">Ingredients</a>
            <a href="#faq">FAQ</a>
            <span className="spacer" />
            <span className="meta">Reading time · 8 min</span>
            {testedDate && (
              <>
                <span className="meta">·</span>
                <span className="meta">Tested · {testedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="r-hero">
        <div className="container">
          {/* Breadcrumb */}
          <div className="r-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/reviews">Reviews</Link>
            <span className="sep">/</span>
            {displayCat && (
              <>
                <Link href="/reviews">{displayCat.split('·')[0].trim()}</Link>
                <span className="sep">/</span>
              </>
            )}
            <span>{review.brand} {review.product}</span>
          </div>

          <div className="r-hero-grid" id="verdict">
            {/* Left: title + verdict */}
            <div>
              <h1>
                <span className="sub">{review.brand}</span>
                {review.product}
              </h1>
              {review.blurb ? (
                <p className="verdict" dangerouslySetInnerHTML={{ __html: review.blurb }} />
              ) : null}
              <div className="author-row">
                <div className="av">FL</div>
                <div><b>Fitlab Team</b> · Reviewed</div>
                <span style={{ opacity: 0.5 }}>·</span>
                {testedDate && <div>Tested · <b>{testedDate}</b></div>}
                {review.pick && (
                  <>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <div style={{ color: 'var(--green-deep)', fontWeight: 700 }}>★ Editor&apos;s pick</div>
                  </>
                )}
              </div>
            </div>

            {/* Right: score block */}
            <aside className="score-block">
              <div className="score-top" style={{ background: verdictBg(review.score) }}>
                <div>
                  <div className="label">Fitlab Score</div>
                  <div className="verdict-word">{verdictWord(review.score)}</div>
                </div>
                <div className="big">
                  {review.score.toFixed(1)}<small>/10</small>
                </div>
              </div>
              <div className="score-rubric">
                {rubricEntries.map(([label, val]) => {
                  const cls = scoreColorClass(val);
                  return (
                    <div key={label} className="r">
                      <span className="l">{label}</span>
                      <div className="b">
                        <i className={cls} style={{ width: `${val * 10}%` }} />
                      </div>
                      <span className="v">{Number(val).toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>

          {/* Fact strip */}
          <div className="fact-strip">
            <div>
              <div className="k">Category</div>
              <div className="v" style={{ fontSize: 18, textTransform: 'uppercase' }}>{displayCat?.split('·')[0].trim() ?? '—'}</div>
            </div>
            <div>
              <div className="k">Fitlab Score</div>
              <div className={`v ${sc}`}>{review.score.toFixed(1)}</div>
              <div className="vs">/10 possible</div>
            </div>
            <div>
              <div className="k">Verdict</div>
              <div className="v" style={{ fontSize: 22 }}>{verdictWord(review.score)}</div>
            </div>
            <div>
              <div className="k">Tags</div>
              <div className="v" style={{ fontSize: 18 }}>{review.tags?.length ?? 0}</div>
              <div className="vs" style={{ color: review.tags?.length ? 'var(--green-deep)' : 'var(--mute)' }}>
                {review.tags?.map(t => typeof t === 'string' ? t : t.t).join(', ') || 'None listed'}
              </div>
            </div>
            <div>
              <div className="k">Date tested</div>
              <div className="v" style={{ fontSize: 18 }}>{testedDate ? testedDate.slice(0, 7) : '—'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rubric detail */}
      <section className="rsec" id="rubric">
        <div className="container">
          <div className="h-lbl"><b>02</b> THE FIVE QUESTIONS</div>
          <h2>How it scored, one question at a time.</h2>

          <div className="rubric-detail" style={{ marginTop: 24 }}>
            {RUBRIC_QUESTIONS.map(q => {
              const val = rubricEntries.find(([k]) => k.toLowerCase().startsWith(q.key.toLowerCase()))?.[1] ?? 0;
              const cls = scoreColorClass(val);
              return (
                <div key={q.key} className="rd-q">
                  <div className="rd-num">{q.num}</div>
                  <div className="rd-content">
                    <h3>{q.title}</h3>
                    <div className="sub">{q.sub}</div>
                    <p>{q.copy}</p>
                  </div>
                  <div className="rd-vis">
                    <div className="gauge">
                      <div className={`v ${cls}`}>
                        {Number(val).toFixed(1)}<small>/10</small>
                      </div>
                      <div className="k">{q.num} score</div>
                    </div>
                    <div className="vbar">
                      <div className="row">
                        <span className="lbl">This product</span>
                        <div className="bar"><i className={cls} style={{ width: `${val * 10}%` }} /></div>
                        <span className="v">{Number(val).toFixed(1)}</span>
                      </div>
                      <div className="row">
                        <span className="lbl">Cat. avg</span>
                        <div className="bar"><i style={{ width: '74%', background: 'var(--mute-2)' }} /></div>
                        <span className="v">7.4</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <section className="rsec" id="ingredients">
          <div className="container">
            <div className="h-lbl"><b>03</b> LABELS &amp; TAGS</div>
            <h2>What we verified.</h2>
            <div style={{ marginTop: 24 }}>
              <div className="pc-grid">
                <div className="pc-col pro">
                  <h4><span className="mark">+</span>Labels &amp; tags</h4>
                  <ul>
                    {review.tags.map((t, i) => {
                      const label = typeof t === 'string' ? t : t.t;
                      return <li key={i}><b>{label}</b></li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="rsec" id="faq">
        <div className="container">
          <div className="h-lbl"><b>04</b> COMMON QUESTIONS</div>
          <h2>What readers ask.</h2>

          <div className="faq" style={{ marginTop: 24 }}>
            <details className="faq-item" open>
              <summary>How was this product tested?</summary>
              <div className="faq-content">
                Products are purchased at full retail price with no brand knowledge. Each product is sent to an ISO-17025
                accredited laboratory for independent assay. We score against our five-question rubric covering ingredient
                quality, clinical dosing, transparency, third-party verification, and value.
              </div>
            </details>
            <details className="faq-item">
              <summary>What does the Fitlab score represent?</summary>
              <div className="faq-content">
                The Fitlab score is a weighted composite of five rubric questions: ingredient quality (25%), clinical dosing
                (25%), transparency (20%), third-party verification (15%), and value (15%). A score of 8.5+ is a buy
                recommendation. 7.0–8.4 is conditional. Below 7.0 we recommend skipping.
              </div>
            </details>
            <details className="faq-item">
              <summary>Does Fitlab earn affiliate commissions from this review?</summary>
              <div className="faq-content">
                No. Fitlab does not earn affiliate commissions from any purchases made through this site. We bought this
                product at full retail price. The site is funded by reader subscriptions and an annual enterprise report.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Methodology note */}
      <section className="rsec">
        <div className="container">
          <div style={{
            padding: '20px 24px',
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--f-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'var(--ink-2)',
            lineHeight: 1.7,
          }}>
            <b style={{ color: 'var(--ink)' }}>METHODOLOGY NOTE</b> — All Fitlab reviews are based on products
            purchased at full retail. Lab testing is conducted at an ISO-17025 accredited partner facility.
            Scoring follows our five-question rubric v3.x. No affiliate links. No sponsored placements.{' '}
            <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
              Read the full methodology →
            </Link>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link href="/reviews" className="bcard-link">← Back to all reviews</Link>
          </div>
        </div>
      </section>
    </>
  );
}

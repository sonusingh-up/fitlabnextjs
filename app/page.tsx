import Link from 'next/link';
import ReviewCard from '@/components/cards/ReviewCard';
import { reviews, researchBriefs, blogPosts, fmtDateShort } from '@/lib/data';

// Top 6 reviews for the featured grid
const featuredReviews = reviews.slice(0, 6);

// Top 3 research briefs
const topResearch = researchBriefs.slice(0, 3);

// Top 3 blog posts
const topPosts = blogPosts.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ======== HERO ======== */}
      <section className="hero">
        <div className="container">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
            <span className="kicker" style={{ color: 'var(--red)' }}>FILE NO. 24 / 026</span>
            <span style={{ height: '1px', background: 'var(--line-2)', flex: 1 }}></span>
            <span className="eyebrow">Updated: May 17, 2026 · 09:14 EDT</span>
          </div>

          <div className="hero-grid">
            <div>
              <h1 className="hero-headline">
                The <span className="red">truth</span><br />
                about your<br />
                <span className="out">supplements.</span>
              </h1>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-row">
                <p><b>We buy 100% of products at retail.</b> No samples. No sponsorships. No affiliate-driven scoring. Just a third-party lab and a five-question rubric.</p>
              </div>
              <div className="hero-cta-row">
                <Link href="/reviews/" className="btn btn-lg btn-red">See all 512 reviews →</Link>
                <Link href="/methodology/" className="btn btn-lg btn-ghost">How we test</Link>
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontFamily: 'var(--f-mono)', fontSize: '11px', color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="live-dot" style={{ background: 'var(--red)' }}></span>
                  3 active recalls
                </span>
                <span>·</span>
                <span>28,412 readers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== LIVE STRIP ======== */}
      <section className="live-strip">
        <div className="container">
          <div className="live-grid">
            <div>
              <div className="k"><span className="live-dot"></span>Tested to date</div>
              <div className="v">512</div>
            </div>
            <div>
              <div className="k">Brands · Q2 2026</div>
              <div className="v">68<span className="small">/yr</span></div>
            </div>
            <div>
              <div className="k">Failed lab assay</div>
              <div className="v" style={{ color: '#ff7a5a' }}>19<span className="small">%</span></div>
            </div>
            <div>
              <div className="k">Under-dosed vs label</div>
              <div className="v" style={{ color: '#ffb04a' }}>34<span className="small">%</span></div>
            </div>
            <div>
              <div className="k">Editor&apos;s choice</div>
              <div className="v" style={{ color: '#6fd8a0' }}>22</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FEATURED TESTS ======== */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">01</span> Tested this week</div>
              <h2 className="d-2">Fresh from the lab</h2>
            </div>
            <div className="right">
              <span>Week 20 · 2026</span>
              <span>·</span>
              <Link href="/reviews/" className="bcard-link">All reviews</Link>
            </div>
          </div>

          <div className="bgrid-3">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ======== CATEGORY STRIP ======== */}
      <section style={{ padding: '0 0 56px' }}>
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">02</span> Best of 2026</div>
              <h2 className="d-2">By category.<br />By the lab.</h2>
            </div>
            <div className="right">
              <Link href="/best/" className="bcard-link">See all categories</Link>
            </div>
          </div>

          <div className="cat-strip">
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 01</span>
              <span className="cn">Whey<br />Protein</span>
              <span className="ct">42 brands tested. Only 6 hit ≥24g protein per scoop at &lt;1ppm heavy metals.</span>
              <div className="cb"><b>Top: Transparent Labs</b><span>9.4</span></div>
            </Link>
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 02</span>
              <span className="cn">Pre-<br />Workout</span>
              <span className="ct">Caffeine, beta-alanine, citrulline doses checked against published clinical ranges.</span>
              <div className="cb"><b>Top: Legion Pulse</b><span>9.1</span></div>
            </Link>
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 03</span>
              <span className="cn">Creatine<br />Mono</span>
              <span className="ct">Cheapest evidence-backed supplement. Easiest category to fake purity claims.</span>
              <div className="cb"><b>Top: Thorne</b><span>9.2</span></div>
            </Link>
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 04</span>
              <span className="cn">Multi-<br />vitamin</span>
              <span className="ct">61 brands tested. Mega-dosing common. Folate form matters; B12 form matters more.</span>
              <div className="cb"><b>Top: Thorne Basic</b><span>8.8</span></div>
            </Link>
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 05</span>
              <span className="cn">Omega-3</span>
              <span className="ct">Oxidation, dose form, EPA:DHA ratio. Half the category is rancid on arrival.</span>
              <div className="cb"><b>Top: Nordic Naturals</b><span>9.0</span></div>
            </Link>
            <Link href="/best/" className="cat-card">
              <span className="num-mark">/ 06</span>
              <span className="cn">Greens<br />Powder</span>
              <span className="ct">Most expensive per-gram supplement on the market. Most lacking in any evidence.</span>
              <div className="cb"><b>Top: AG1</b><span>7.4</span></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ======== RUBRIC ======== */}
      <section className="section" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">03</span> The 5-question rubric</div>
              <h2 className="d-2">Every product, the same five questions.</h2>
            </div>
            <div className="right">
              <Link href="/methodology/" className="bcard-link">Full methodology</Link>
            </div>
          </div>

          <div className="rubric-preview">
            <div className="rubric-q">
              <div className="qn">Q.01</div>
              <div className="qt">Ingredient quality</div>
              <div className="qd">Form, source, bioavailability. Magnesium glycinate, not oxide. Methylfolate, not folic acid. The actual molecule on the label.</div>
              <div className="qweight">Weight · 25%</div>
            </div>
            <div className="rubric-q">
              <div className="qn">Q.02</div>
              <div className="qt">Clinical dosing</div>
              <div className="qd">Does the dose match the dose that worked in published human trials? Or is it pixie-dusted at 5% of clinical effect range?</div>
              <div className="qweight">Weight · 25%</div>
            </div>
            <div className="rubric-q">
              <div className="qn">Q.03</div>
              <div className="qt">Transparency</div>
              <div className="qd">Full ingredient amounts disclosed, not hidden behind proprietary blends. CoAs published. Manufacturer named.</div>
              <div className="qweight">Weight · 20%</div>
            </div>
            <div className="rubric-q">
              <div className="qn">Q.04</div>
              <div className="qt">Third-party verified</div>
              <div className="qd">NSF, Informed Sport, USP, or equivalent. We re-test independently and compare to the brand&apos;s published CoA.</div>
              <div className="qweight">Weight · 15%</div>
            </div>
            <div className="rubric-q">
              <div className="qn">Q.05</div>
              <div className="qt">Value</div>
              <div className="qd">Cost-per-clinical-serving, not cost-per-scoop. Compared across the category and weighted to dosing accuracy.</div>
              <div className="qweight">Weight · 15%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FAIL WALL ======== */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">04</span> The bad news</div>
              <h2 className="d-2">19% of products<br />failed lab assay.</h2>
            </div>
            <div className="right">
              <Link href="/research/" className="bcard-link">See the data</Link>
            </div>
          </div>

          <div className="fail-wall">
            <div className="fail-vis">
              <div className="eyebrow" style={{ marginBottom: '16px' }}>Failure mode · 2025–2026 testing window · n=512</div>

              <div className="fail-bar-row">
                <div className="fbl">Under-dosed</div>
                <div className="fail-bar">
                  <i style={{ width: '34%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(34% + 8px)' }}>175 brands</span>
                </div>
                <div className="fbn">34%</div>
              </div>
              <div className="fail-bar-row">
                <div className="fbl">Prop. blend</div>
                <div className="fail-bar">
                  <i style={{ width: '28%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(28% + 8px)' }}>143 brands</span>
                </div>
                <div className="fbn">28%</div>
              </div>
              <div className="fail-bar-row">
                <div className="fbl">Heavy metals</div>
                <div className="fail-bar">
                  <i style={{ width: '11%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(11% + 8px)' }}>56 brands</span>
                </div>
                <div className="fbn">11%</div>
              </div>
              <div className="fail-bar-row">
                <div className="fbl">Rancidity</div>
                <div className="fail-bar">
                  <i style={{ width: '8%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(8% + 8px)' }}>41 brands</span>
                </div>
                <div className="fbn">8%</div>
              </div>
              <div className="fail-bar-row">
                <div className="fbl">Mislabeled</div>
                <div className="fail-bar">
                  <i style={{ width: '6%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(6% + 8px)' }}>31 brands</span>
                </div>
                <div className="fbn">6%</div>
              </div>
              <div className="fail-bar-row">
                <div className="fbl">Banned subst.</div>
                <div className="fail-bar">
                  <i style={{ width: '2%' }}></i>
                  <span className="lbl-outer" style={{ left: 'calc(2% + 8px)' }}>10 brands</span>
                </div>
                <div className="fbn">2%</div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div><div className="eyebrow">All passes</div><div className="num" style={{ fontSize: '22px', fontWeight: 700 }}>81%</div></div>
                <div><div className="eyebrow">Any failure</div><div className="num" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--red-deep)' }}>19%</div></div>
                <div><div className="eyebrow">Recalls issued</div><div className="num" style={{ fontSize: '22px', fontWeight: 700 }}>3</div></div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '22px', lineHeight: 1.4, color: 'var(--ink)', margin: '0 0 24px', maxWidth: '480px' }}>
                We&apos;ve sent <b>512 products</b> to ISO-17025 accredited labs since 2024. The single biggest failure mode isn&apos;t contamination — <b>it&apos;s under-dosing</b>: brands advertise clinical-grade compounds at half the dose published research used.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <span className="kicker" style={{ color: 'var(--red)', minWidth: '28px' }}>01</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Dosing failures are concentrated in pre-workout, sleep, and &ldquo;longevity&rdquo; categories.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <span className="kicker" style={{ color: 'var(--red)', minWidth: '28px' }}>02</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-2)' }}>11% had heavy-metal levels above Prop. 65 limits — mostly greens and protein.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <span className="kicker" style={{ color: 'var(--red)', minWidth: '28px' }}>03</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-2)' }}>Brands with NSF certification failed at 4%. Uncertified: 26%.</span>
                </li>
              </ul>
              <Link href="/research/" className="btn btn-red">Read the full Q2 report →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======== RESEARCH BRIEFS ======== */}
      <section className="section" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">05</span> Research briefs</div>
              <h2 className="d-2">What the studies actually say.</h2>
            </div>
            <div className="right">
              <Link href="/research/" className="bcard-link">All research</Link>
            </div>
          </div>

          <div className="rsc-grid">
            {topResearch.map((brief, i) => (
              <Link
                key={brief.slug}
                href={`/research/${brief.slug}/`}
                className={`rsc-card${i === 0 ? ' lead' : ''}`}
              >
                <div className="rsc-cat">{brief.type}</div>
                <h3 className="rsc-title">{brief.title}</h3>
                <div className="rsc-key">{brief.key}</div>
                <div className="rsc-meta">
                  <span>{fmtDateShort(brief.date)}</span>
                  <span>·</span>
                  <span>{brief.mins} min</span>
                  {brief.pick && (
                    <>
                      <span>·</span>
                      <span style={{ color: 'var(--red)' }}>★ Editor&apos;s pick</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== MANIFESTO ======== */}
      <section className="manifesto">
        <div className="container">
          <div className="num-mark">06 — POSITION</div>
          <h2>
            We accept <span className="strike">samples</span>,<br />
            <span className="strike">affiliate deals</span>,<br />
            <span className="strike">sponsorships</span>, or<br />
            <em>any other money</em><br />
            from brands we cover.
          </h2>
          <div className="manifesto-grid">
            <div>
              <h4>How we&apos;re funded</h4>
              <p>Reader subscriptions ($6/mo) and one annual report sold to enterprise customers. Zero ad revenue. Zero affiliate income. Every product on this site was purchased at retail.</p>
            </div>
            <div>
              <h4>How we&apos;re staffed</h4>
              <p>Three PhDs (pharmacology, exercise physiology, analytical chemistry), one ISO-17025 lab partner, two journalists. No founders moonlighting as brand consultants.</p>
            </div>
            <div>
              <h4>What we publish</h4>
              <p>Raw lab reports for every product. Methodology under version control on GitHub. Corrections logged with timestamps. If we&apos;re wrong, we say so on the same page where we were wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== BLOG ======== */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div className="left">
              <div className="lbl"><span className="num-lbl">07</span> Field notes</div>
              <h2 className="d-2">From the blog.</h2>
            </div>
            <div className="right">
              <Link href="/blog/" className="bcard-link">All posts</Link>
            </div>
          </div>

          <div className="blog-grid">
            {topPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="blog-card">
                <span className="b-cat">{post.cat}</span>
                <h3>{post.title}</h3>
                <p>{post.dek}</p>
                <div className="b-meta">
                  <span>{fmtDateShort(post.date)}</span>
                  <span>·</span>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.mins} min</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SUPER CTA ======== */}
      <section style={{ padding: '56px 0 96px' }}>
        <div className="container">
          <div className="super-card">
            <h2>Get the <em>weekly</em> brief.<br />One email.<br />Zero affiliate hype.</h2>
            <div>
              <div className="stats" style={{ marginBottom: '32px' }}>
                <div className="stat"><div className="v">28,412</div><div className="k">Subscribers</div></div>
                <div className="stat"><div className="v">98%</div><div className="k">Open rate · Q1</div></div>
                <div className="stat"><div className="v">512</div><div className="k">Brands tested</div></div>
                <div className="stat"><div className="v">$0</div><div className="k">Affiliate income</div></div>
              </div>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--paper)' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{ flex: 1, background: 'transparent', border: 0, padding: '16px 20px', color: 'var(--paper)', font: 'inherit', fontSize: '15px', outline: 'none' }}
                />
                <button style={{ background: 'var(--red)', color: 'var(--paper)', border: 0, padding: '0 28px', fontFamily: 'var(--f-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Subscribe →
                </button>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute-2)', marginTop: '12px' }}>
                Free. Unsubscribe in one click. No tracking pixels.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

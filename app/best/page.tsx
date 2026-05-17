import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Supplements by Category — 2026 Edition',
  description:
    'Lab-tested, rubric-scored best-of picks for whey protein, pre-workout, creatine, multivitamins, omega-3, and greens. Updated quarterly. No affiliate commissions.',
};

const CATEGORY_TABS = [
  { label: 'Whey Protein', href: '/best/' },
  { label: 'Plant Protein', href: '/best/' },
  { label: 'Creatine', href: '/best/' },
  { label: 'Pre-Workout', href: '/best/' },
  { label: 'Multivitamin', href: '/best/' },
  { label: 'Omega-3', href: '/best/' },
  { label: 'Magnesium', href: '/best/' },
  { label: 'Greens', href: '/best/' },
  { label: 'Sleep', href: '/best/' },
  { label: 'Probiotics', href: '/best/' },
  { label: 'Vitamin D', href: '/best/' },
] as const;

type QuickPick = {
  icon: string;
  label: string;
  name: string;
  sub: string;
};

type PodiumItem = {
  rank: 1 | 2 | 3;
  cat: string;
  name: string;
  sub: string;
  score: number;
  price: string;
  why: string;
};

type LeaderboardRow = {
  rank: number;
  brand: string;
  sub: string;
  score: number;
  scoreClass: 'hi' | 'mid' | 'lo';
  verdict: string;
  verdictClass: 'b' | 's' | 'a' | 'x';
  protein: string;
  perScoop: string;
  pricePerLb: string;
  pricePer25g: string;
};

type CategoryCard = {
  slug: string;
  label: string;
  numTested: number;
  topProduct: string;
  topScore: number;
  blurb: string;
};

const QUICK_PICKS: QuickPick[] = [
  { icon: '⭐', label: 'Best overall', name: 'Transparent Labs WPI', sub: '9.4/10 · $59/lb · NSF Sport' },
  { icon: '💰', label: 'Best value', name: 'Dymatize ISO-100', sub: '9.0/10 · $48/lb · Informed Choice' },
  { icon: '🌱', label: 'Best minimalist', name: 'Naked Whey', sub: '9.0/10 · $54/lb · 1 ingredient' },
  { icon: '🏃', label: 'Best for athletes', name: 'Klean Athlete Iso', sub: '8.8/10 · $64/lb · NSF Sport' },
];

const PODIUM: PodiumItem[] = [
  {
    rank: 2,
    cat: '#2 · WHEY ISOLATE',
    name: 'Dymatize ISO-100',
    sub: 'Whey Isolate · Hydrolyzed',
    score: 9.0,
    price: '$48/lb',
    why: 'Pricing wins. Hydrolyzed isolate, full disclosure, Informed Choice. The right answer for most lifters under 30.',
  },
  {
    rank: 1,
    cat: '★ #1 OVERALL · EDITOR\'S PICK',
    name: 'Transparent Labs 100% WPI',
    sub: 'Whey Isolate · Cross-flow',
    score: 9.4,
    price: '$59/lb',
    why: '90.4% protein by mass. Heavy metals <0.05ppm across four lots. Best-in-class transparency. The honest scoop.',
  },
  {
    rank: 3,
    cat: '#3 · MINIMALIST PICK',
    name: 'Naked Whey',
    sub: 'Whey Concentrate · Single-ingredient',
    score: 9.0,
    price: '$54/lb',
    why: 'One ingredient: whey. No sweetener, no flavor, no lecithin. The minimalist pick that won the no-additive bracket.',
  },
];

const LEADERBOARD: LeaderboardRow[] = [
  { rank: 4, brand: 'Now Sports Whey', sub: 'Whey Isolate · Unflavored', score: 8.8, scoreClass: 'hi', verdict: 'Buy', verdictClass: 'b', protein: '25g', perScoop: 'per 32g scoop', pricePerLb: '$42', pricePer25g: '$1.46' },
  { rank: 5, brand: 'Klean Athlete Iso', sub: 'Whey Isolate · NSF Sport', score: 8.8, scoreClass: 'hi', verdict: 'Buy · athletes', verdictClass: 'b', protein: '24g', perScoop: 'per 30g scoop', pricePerLb: '$64', pricePer25g: '$2.21' },
  { rank: 6, brand: 'Momentous Essential', sub: 'Whey Isolate · Performance', score: 8.6, scoreClass: 'hi', verdict: 'Buy', verdictClass: 'b', protein: '24g', perScoop: 'per 30g scoop', pricePerLb: '$58', pricePer25g: '$2.04' },
  { rank: 7, brand: 'Optimum Nutrition Gold', sub: 'Whey Blend · Established 1987', score: 8.4, scoreClass: 'mid', verdict: 'Solid', verdictClass: 's', protein: '24g', perScoop: 'per 31g scoop', pricePerLb: '$36', pricePer25g: '$1.20' },
  { rank: 8, brand: 'Garden of Life Sport', sub: 'Whey Iso · Grass-fed organic', score: 8.4, scoreClass: 'mid', verdict: 'Solid', verdictClass: 's', protein: '24g', perScoop: 'per 32g scoop', pricePerLb: '$48', pricePer25g: '$1.68' },
  { rank: 9, brand: 'Bulk Powders WPI', sub: 'Whey Isolate · EU sourced', score: 7.8, scoreClass: 'mid', verdict: 'Solid', verdictClass: 's', protein: '23g', perScoop: 'per 30g scoop', pricePerLb: '$32', pricePer25g: '$1.16' },
  { rank: 10, brand: 'Promix Standard', sub: 'Whey Concentrate · Bulk', score: 7.2, scoreClass: 'mid', verdict: 'Acceptable', verdictClass: 'a', protein: '24g', perScoop: 'per 30g scoop', pricePerLb: '$38', pricePer25g: '$1.32' },
  { rank: 11, brand: 'Ghost Whey', sub: 'Whey · Flavor-forward', score: 7.4, scoreClass: 'mid', verdict: 'Acceptable', verdictClass: 'a', protein: '25g', perScoop: 'per 36g scoop', pricePerLb: '$52', pricePer25g: '$1.74' },
  { rank: 12, brand: 'MuscleTech NitroTech', sub: 'Whey blend · Creatine added', score: 7.0, scoreClass: 'mid', verdict: 'Acceptable', verdictClass: 'a', protein: '30g', perScoop: 'per 46g scoop', pricePerLb: '$36', pricePer25g: '$1.05' },
];

const FAILED = [
  { name: 'Body Fortress Iso', reason: 'Lead 0.38ppm · Under-dosed 28%', score: 5.4 },
  { name: 'CVS Whey Iso', reason: 'Prop. blend · Protein −22%', score: 4.8 },
  { name: 'Six Star Whey', reason: 'Lead 0.42ppm · Mislabeled', score: 5.1 },
  { name: 'Muscletech Premium', reason: 'Under-dosed leucine', score: 5.8 },
  { name: 'JYM Pro', reason: 'Rancid · 2024 lot', score: 6.0 },
  { name: 'Walmart Equate', reason: 'Cadmium · Under-dosed', score: 5.0 },
  { name: 'Bowmar Whey', reason: 'Off-label sweetener', score: 5.9 },
  { name: 'Animal Whey', reason: 'Prop. blend · Protein −18%', score: 6.2 },
  { name: 'Bare Performance', reason: 'Lead 0.31ppm', score: 6.4 },
];

const CATEGORY_CARDS: CategoryCard[] = [
  { slug: 'whey-protein', label: 'Whey Protein', numTested: 42, topProduct: 'Transparent Labs WPI', topScore: 9.4, blurb: '90.4% protein by mass. Best-in-class disclosure. 4 lots clean.' },
  { slug: 'pre-workout', label: 'Pre-Workout', numTested: 31, topProduct: 'Legion Pulse', topScore: 9.1, blurb: 'Full-dose citrulline (8g). Clinical beta-alanine. No prop blend.' },
  { slug: 'creatine', label: 'Creatine', numTested: 18, topProduct: 'Thorne Creatine', topScore: 9.2, blurb: 'Cheapest evidence-backed supplement. Purity is the only metric that matters.' },
  { slug: 'multivitamin', label: 'Multivitamin', numTested: 61, topProduct: 'Thorne Basic Nutrients', topScore: 8.8, blurb: 'Methylfolate. Adenosylcobalamin. Correct forms of D3, K2-MK7.' },
  { slug: 'omega-3', label: 'Omega-3', numTested: 24, topProduct: 'Nordic Naturals Ultimate', topScore: 9.0, blurb: 'Lowest TOTOX score in category. Triglyceride form. No fishy oxidation.' },
  { slug: 'greens', label: 'Greens Powder', numTested: 14, topProduct: 'AG1', topScore: 7.4, blurb: 'Highest score in a difficult category. Cadmium improved vs. 2025.' },
];

export default function BestPage() {
  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/best/" className="active">Best of 2026</Link>
            <a href="#">2025 archive</a>
            <a href="#">2024 archive</a>
            <Link href="/methodology/">Methodology</Link>
            <span className="spacer" />
            <span className="meta">Re-tested · May 12, 2026</span>
          </div>
        </div>
      </div>

      {/* Category tabs */}
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
            {CATEGORY_TABS.map((tab, i) => (
              <Link
                key={tab.label}
                href={tab.href}
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  padding: '0 18px',
                  color: i === 0 ? 'var(--ink)' : 'var(--mute)',
                  lineHeight: '56px',
                  whiteSpace: 'nowrap',
                  borderBottom: i === 0 ? '3px solid var(--red)' : '3px solid transparent',
                  marginBottom: '-1px',
                  letterSpacing: '-0.003em',
                  textDecoration: 'none',
                }}
              >
                {tab.label}
              </Link>
            ))}
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
            ★ BEST SUPPLEMENTS BY CATEGORY · 2026 EDITION · UPDATED MAY 12
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(64px, 9vw, 152px)',
              lineHeight: 0.84,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Best
            <br />
            Supplements.
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto auto',
              gap: '28px',
              alignItems: 'end',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p
              style={{
                maxWidth: '560px',
                fontSize: '17px',
                lineHeight: 1.45,
                color: 'var(--ink-2)',
                margin: 0,
              }}
            >
              Six categories. Lab-verified. Re-tested quarterly. Every pick is backed
              by our five-question rubric: ingredient quality, clinical dosing,
              transparency, third-party verification, and cost-per-clinical-serving.
            </p>
            {[
              { v: '6', k: 'Categories' },
              { v: '190+', k: 'Brands tested' },
              { v: '22', k: "Editor's picks" },
              { v: '9', k: 'Failed this cycle', color: 'var(--red-deep)' },
            ].map(({ v, k, color }) => (
              <div
                key={k}
                style={{
                  borderLeft: '1px solid var(--line-2)',
                  paddingLeft: '16px',
                  minWidth: '96px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '38px',
                    lineHeight: 0.95,
                    color: color ?? 'inherit',
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

      {/* Category cards overview */}
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
                <span className="num-lbl">00</span> All categories
              </div>
              <h2 className="d-3">Six categories. One rubric.</h2>
            </div>
            <div className="right">
              <Link href="/methodology/" className="bcard-link">Our scoring rubric</Link>
            </div>
          </div>

          <div className="cat-strip">
            {CATEGORY_CARDS.map((card, i) => (
              <Link key={card.slug} href="/best/" className="cat-card">
                <span className="num-mark">/ {String(i + 1).padStart(2, '0')}</span>
                <span className="cn">{card.label}</span>
                <span className="ct">
                  {card.numTested} brands tested. {card.blurb}
                </span>
                <div className="cb">
                  <b>Top: {card.topProduct}</b>
                  <span>{card.topScore.toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Whey protein detail section */}
      <div
        className="container"
        style={{ paddingTop: '28px', paddingBottom: '56px' }}
      >
        {/* Quick picks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--ink)',
            background: 'var(--paper)',
            marginBottom: '32px',
          }}
        >
          {QUICK_PICKS.map((qp, i) => (
            <div
              key={qp.label}
              style={{
                padding: '18px 20px',
                borderRight: i < QUICK_PICKS.length - 1 ? '1px solid var(--ink)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: 'var(--mute)',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                {qp.icon} {qp.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: '22px',
                  lineHeight: 0.96,
                  textTransform: 'uppercase',
                }}
              >
                {qp.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '11px',
                  color: 'var(--ink-3)',
                  marginTop: '6px',
                  letterSpacing: '0.06em',
                }}
              >
                {qp.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Podium */}
        <div className="sec-head" style={{ marginBottom: '16px' }}>
          <div className="left">
            <div className="lbl">
              <span className="num-lbl">01</span> The podium
            </div>
            <h2 className="d-3">Top 3, head-to-head.</h2>
          </div>
          <div className="right">
            <span>Scored · v3.2 rubric</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr 1fr',
            gap: '16px',
            alignItems: 'end',
            marginBottom: '32px',
          }}
        >
          {PODIUM.map((item) => (
            <PodiumCard key={item.rank} item={item} />
          ))}
        </div>

        {/* Leaderboard */}
        <div className="sec-head" style={{ marginBottom: '0' }}>
          <div className="left">
            <div className="lbl">
              <span className="num-lbl">02</span> Full leaderboard
            </div>
            <h2 className="d-3">All 12 we recommend.</h2>
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

        <div
          style={{
            border: '1px solid var(--ink)',
            background: 'var(--paper)',
            marginBottom: '32px',
            overflow: 'hidden',
          }}
        >
          {/* Head */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 1.6fr 70px 1fr 80px 80px 80px',
              gap: '14px',
              padding: '12px 20px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              fontFamily: 'var(--f-mono)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>#</span>
            <span>Brand · Product</span>
            <span>Score</span>
            <span>Verdict</span>
            <span>Protein</span>
            <span>$/lb</span>
            <span>$/25g</span>
          </div>
          {LEADERBOARD.map((row) => (
            <LeaderboardRow key={row.rank} row={row} />
          ))}
        </div>

        {/* Failed list */}
        <div
          style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--line-2)',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: '0 0 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--red-deep)',
            }}
          >
            Didn&apos;t make the list{' '}
            <span
              style={{
                background: 'var(--red)',
                color: 'var(--paper)',
                fontFamily: 'var(--f-mono)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                padding: '4px 8px',
              }}
            >
              9 FAILED LAB
            </span>
          </h3>
          <p
            style={{
              margin: '0 0 18px',
              fontSize: '13px',
              color: 'var(--ink-2)',
              lineHeight: 1.45,
            }}
          >
            These products either under-dosed against label by &gt;20%, failed
            heavy-metal screening above Prop. 65 limits, or contained undisclosed
            ingredients.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {FAILED.map((f) => (
              <div
                key={f.name}
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  padding: '12px 14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: 1.0,
                      textTransform: 'uppercase',
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '9.5px',
                      color: 'var(--red-deep)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginTop: '3px',
                    }}
                  >
                    {f.reason}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--red-deep)',
                  }}
                >
                  {f.score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buying guide */}
        <div
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            padding: '40px',
            marginBottom: '32px',
          }}
        >
          <div
            className="kicker"
            style={{ color: 'var(--red)', marginBottom: '14px' }}
          >
            03 — HOW TO PICK · 4 RULES
          </div>
          <h2
            className="d-3"
            style={{ color: 'var(--paper)', margin: '0 0 20px' }}
          >
            If you&apos;re buying whey for the first time.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
            }}
          >
            {[
              {
                n: '01',
                text: (
                  <>
                    Look for <b style={{ color: 'var(--paper)' }}>&ldquo;isolate&rdquo;</b> on the label if you&apos;re lactose-sensitive. Otherwise, concentrate is fine and 30% cheaper.
                  </>
                ),
              },
              {
                n: '02',
                text: (
                  <>
                    Compute <b style={{ color: 'var(--paper)' }}>cost-per-25g-protein</b>, not cost-per-scoop. The scoop size lies more often than the price.
                  </>
                ),
              },
              {
                n: '03',
                text: (
                  <>
                    Prefer brands with <b style={{ color: 'var(--paper)' }}>third-party certification</b> — NSF, Informed Sport, or USP. Uncertified brands fail lab at 4× the rate.
                  </>
                ),
              },
              {
                n: '04',
                text: (
                  <>
                    Ignore <b style={{ color: 'var(--paper)' }}>&ldquo;grass-fed&rdquo;</b> marketing for protein content. Amino acid profile is identical. The premium pays for sourcing transparency, not nutrition.
                  </>
                ),
              },
            ].map((rule) => (
              <div key={rule.n}>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    marginBottom: '6px',
                    letterSpacing: '0.16em',
                  }}
                >
                  {rule.n}
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.55,
                    color: 'rgba(246,244,239,0.85)',
                    margin: 0,
                  }}
                >
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Revision log */}
        <div
          style={{
            border: '1px solid var(--line)',
            padding: '20px 24px',
            background: 'var(--paper-2)',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              margin: '0 0 12px',
            }}
          >
            04 — REVISION LOG
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
            }}
          >
            {[
              { date: 'MAY 12 ·', text: 'Re-tested Transparent Labs and Dymatize. Both scores stable.' },
              { date: 'APR 18 ·', text: 'Removed BSN Syntha-6 from "recommended" tier; moved to "did not make the list."' },
              { date: 'MAR 02 ·', text: 'Added Now Sports Whey and Klean Athlete Iso.' },
              { date: 'FEB 10 ·', text: 'v3.2 rubric rolled out. All scores recalibrated; ranking unchanged.' },
            ].map((entry) => (
              <li key={entry.date}>
                <b
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'var(--mute)',
                  }}
                >
                  {entry.date}
                </b>{' '}
                {entry.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ─── Podium card ─── */
function PodiumCard({ item }: { item: PodiumItem }) {
  const topBorder =
    item.rank === 1 ? '10px solid var(--red)' :
    item.rank === 2 ? '6px solid var(--mute)' :
    '6px solid var(--line-3)';

  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderTop: topBorder,
        padding: item.rank === 1 ? '28px 24px' : '20px 20px 24px',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '10px',
          letterSpacing: '0.16em',
          color: 'var(--red)',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        {item.cat}
      </div>

      {/* Rank watermark */}
      <div
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: item.rank === 1 ? '120px' : '80px',
          lineHeight: 0.8,
          color: item.rank === 1 ? 'var(--red)' : 'var(--paper-3)',
          opacity: item.rank === 1 ? 0.18 : 1,
          position: 'absolute',
          top: '14px',
          right: '16px',
          pointerEvents: 'none',
        }}
      >
        {item.rank}
      </div>

      <h3
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: item.rank === 1 ? '32px' : '24px',
          lineHeight: 0.96,
          textTransform: 'uppercase',
          margin: '0 0 4px',
          position: 'relative',
        }}
      >
        {item.name}
      </h3>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--ink-3)',
          marginBottom: '14px',
        }}
      >
        {item.sub}
      </div>

      {/* Visual placeholder */}
      <div
        style={{
          background: 'var(--paper-2)',
          border: '1px solid var(--line)',
          margin: '12px 0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: item.rank === 1 ? '170px' : '130px',
          padding: item.rank === 1 ? '24px' : '18px',
        }}
      >
        <svg
          viewBox="0 0 80 100"
          width={item.rank === 1 ? 80 : 64}
          height={item.rank === 1 ? 100 : 80}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="4" width="64" height="92" rx="4" fill="var(--line-3)" stroke="var(--line-2)" strokeWidth="1" />
          <rect x="16" y="18" width="48" height="8" fill="var(--red)" opacity="0.4" />
          <rect x="16" y="32" width="48" height="3" fill="var(--ink)" opacity="0.12" />
          <rect x="16" y="38" width="36" height="3" fill="var(--ink)" opacity="0.12" />
          <rect x="16" y="44" width="40" height="3" fill="var(--ink)" opacity="0.12" />
          <text x="40" y="76" fontFamily="Antonio" fontSize="8" fontWeight="700" fill="var(--mute)" textAnchor="middle">TUB</text>
        </svg>
      </div>

      <p
        style={{
          fontSize: '13px',
          lineHeight: 1.45,
          color: 'var(--ink-2)',
          margin: '0 0 14px',
        }}
      >
        {item.why}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          paddingTop: '14px',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: item.rank === 1 ? '60px' : '44px',
            lineHeight: 0.9,
            letterSpacing: '-0.015em',
            color: 'var(--green-deep)',
          }}
        >
          {item.score.toFixed(1)}
          <small
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '12px',
              color: 'var(--mute)',
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}
          >
            /10
          </small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              marginBottom: '4px',
            }}
          >
            FROM
          </div>
          <b
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: '16px',
              color: 'var(--ink)',
              letterSpacing: 0,
            }}
          >
            {item.price}
          </b>
        </div>
      </div>
    </article>
  );
}

/* ─── Leaderboard row ─── */
function LeaderboardRow({ row }: { row: LeaderboardRow }) {
  const scoreColor =
    row.scoreClass === 'hi'
      ? 'var(--green-deep)'
      : row.scoreClass === 'mid'
      ? '#8a6b00'
      : 'var(--red-deep)';

  const verdictColor =
    row.verdictClass === 'b'
      ? 'var(--green-deep)'
      : row.verdictClass === 's'
      ? 'var(--ink-2)'
      : row.verdictClass === 'a'
      ? '#8a6b00'
      : 'var(--red-deep)';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50px 1.6fr 70px 1fr 80px 80px 80px',
        gap: '14px',
        padding: '14px 20px',
        borderBottom: '1px solid var(--line)',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: 0.9,
          color: row.rank <= 5 ? 'var(--red)' : 'var(--ink)',
        }}
      >
        {row.rank}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: 1.0,
            textTransform: 'uppercase',
          }}
        >
          {row.brand}
        </div>
        <small
          style={{
            display: 'block',
            fontFamily: 'var(--f-mono)',
            fontWeight: 500,
            fontSize: '10px',
            color: 'var(--mute)',
            letterSpacing: '0.06em',
            marginTop: '3px',
          }}
        >
          {row.sub}
        </small>
      </div>
      <div
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '22px',
          lineHeight: 0.95,
          color: scoreColor,
        }}
      >
        {row.score.toFixed(1)}
      </div>
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: verdictColor,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            background: verdictColor,
            borderRadius: '50%',
          }}
        />
        {row.verdict}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {row.protein}
        </div>
        <small
          style={{
            display: 'block',
            fontWeight: 500,
            fontSize: '9.5px',
            color: 'var(--mute)',
            letterSpacing: '0.06em',
          }}
        >
          {row.perScoop}
        </small>
      </div>
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '13px',
          fontWeight: 700,
        }}
      >
        {row.pricePerLb}
      </div>
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '13px',
          fontWeight: 700,
        }}
      >
        {row.pricePer25g}
        <small
          style={{
            display: 'block',
            fontWeight: 500,
            fontSize: '9.5px',
            color: 'var(--mute)',
            letterSpacing: '0.06em',
          }}
        >
          per 25g
        </small>
      </div>
    </div>
  );
}

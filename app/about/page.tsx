import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Fitlab — Independent Supplement Testing',
  description:
    'We buy supplements at retail, test them at ISO-17025 labs, and publish the results. No samples, no sponsorships, no affiliate income.',
};

const TEAM = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Pharmacologist',
    av: 'SC',
    bio: 'PhD in pharmacology from UCSF. Former drug safety reviewer at the FDA. Leads the ingredient-quality scoring and bioavailability analysis.',
  },
  {
    name: 'Dr. Marcus Webb',
    role: 'Exercise Physiologist',
    av: 'MW',
    bio: 'PhD from Penn State. Specializes in ergogenic aids and sport nutrition. Reviews clinical dosing against peer-reviewed sports science literature.',
  },
  {
    name: 'Dr. Priya Rajan',
    role: 'Analytical Chemist',
    av: 'PR',
    bio: 'PhD in analytical chemistry. Manages our ISO-17025 lab partnerships and interprets CoA data, heavy-metal panels, and contaminant screens.',
  },
  {
    name: 'James Okafor',
    role: 'Investigative Journalist',
    av: 'JO',
    bio: 'Former health correspondent at STAT News. Covers brand accountability, regulatory failures, and the economics of the supplement industry.',
  },
  {
    name: 'Dr. Lena Hoffmann',
    role: 'Research Analyst',
    av: 'LH',
    bio: 'PhD in molecular biology. Authors the research briefs series, synthesizing recent trials into accessible, evidence-graded summaries.',
  },
];

const TIMELINE = [
  { year: '2022', event: 'Fitlab founded. First 12 products tested on personal budget.' },
  { year: '2023', event: 'Expanded to 94 products. ISO-17025 partnership established with Eurofins.' },
  { year: '2024', event: '512 products reached. Subscription model launched. First enterprise report sold.' },
  { year: '2025', event: 'Research briefs series launched. First FDA recall we flagged independently.' },
  { year: '2026', event: '28,000+ subscribers. Zero affiliate income. Same mission.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/about" className="active">About</Link>
            <Link href="/methodology">Methodology</Link>
            <Link href="/research">Research</Link>
            <span className="spacer" />
            <span className="meta">Est. 2022 · New York, NY</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="idx-hero">
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>ABOUT FITLAB</div>
          <h1>
            We test.
            <br />
            You decide.
          </h1>
          <div className="meta-grid">
            <p className="lede">
              Fitlab is an independent supplement testing publication. We buy products at retail,
              send them to ISO-17025 accredited labs, and score them against a five-question rubric.
              No samples. No sponsorships. No affiliate income.
            </p>
            <div className="stat">
              <div className="v">512</div>
              <div className="k">Tested</div>
            </div>
            <div className="stat">
              <div className="v green">2022</div>
              <div className="k">Founded</div>
            </div>
            <div className="stat">
              <div className="v">$0</div>
              <div className="k">Affiliate income</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="rsec" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="h-lbl"><b>01</b> MISSION</div>
          <h2>Why we exist.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: 32 }}>
            <div>
              <h4 style={{ marginBottom: 12, fontFamily: 'var(--f-head)', fontSize: 18 }}>The problem</h4>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                The supplement industry is a $50B market with almost no mandatory pre-market
                testing. The FDA cannot review every product before it hits shelves. Brands
                self-certify quality. Influencers get 15–40% affiliate commissions to recommend
                them. Consumers have no independent source of truth.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 12, fontFamily: 'var(--f-head)', fontSize: 18 }}>Our answer</h4>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                We buy 100% of products at retail — no samples, ever. We send them to
                ISO-17025 accredited labs. We apply the same five-question rubric to every
                product. We publish raw CoAs alongside our scores. We are funded by reader
                subscriptions, not by the industry we cover.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 12, fontFamily: 'var(--f-head)', fontSize: 18 }}>The result</h4>
              <p style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                19% of products we have tested have failed lab assay. 34% are under-dosed
                vs. label claims. 11% exceed Prop. 65 heavy-metal limits. Our readers make
                better decisions. Some brands have improved formulations after our coverage.
                Three recalls we flagged have been issued by regulators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="rsec">
        <div className="container">
          <div className="h-lbl"><b>02</b> TEAM</div>
          <h2>The people behind the tests.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: 32 }}>
            {TEAM.map(member => (
              <div
                key={member.name}
                style={{
                  border: '1px solid var(--line)',
                  padding: '24px',
                  background: 'var(--paper)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--f-mono)',
                      fontWeight: 700,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {member.av}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--f-head)', fontWeight: 700, fontSize: 16 }}>{member.name}</div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginTop: 2 }}>{member.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.65, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="rsec" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="h-lbl"><b>03</b> FUNDING</div>
          <h2>How we&apos;re funded.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: 32 }}>
            {[
              { src: 'Reader subscriptions', pct: '68%', detail: '$6/month or $60/year. Full access to all reviews, raw lab data, and research briefs.' },
              { src: 'Enterprise reports', pct: '32%', detail: 'Annual category deep-dives sold to retailers, insurers, and wellness platforms.' },
              { src: 'Affiliate income', pct: '0%', detail: 'We do not participate in affiliate programs. Ever. This is a hard policy, not a preference.' },
              { src: 'Brand advertising', pct: '0%', detail: 'We do not sell ad space. We have declined every sponsorship offer we have received.' },
            ].map(row => (
              <div key={row.src} style={{ border: '1px solid var(--line)', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>{row.src}</div>
                <div
                  style={{
                    fontFamily: 'var(--f-head)',
                    fontSize: 36,
                    fontWeight: 900,
                    color: row.pct === '0%' ? 'var(--mute-2)' : 'var(--red)',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {row.pct}
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{row.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="rsec">
        <div className="container">
          <div className="h-lbl"><b>04</b> HISTORY</div>
          <h2>How we got here.</h2>
          <div style={{ marginTop: 32, maxWidth: 640 }}>
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '16px 24px',
                  paddingBottom: i < TIMELINE.length - 1 ? 24 : 0,
                  marginBottom: i < TIMELINE.length - 1 ? 24 : 0,
                  borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontWeight: 700,
                    fontSize: 13,
                    color: 'var(--red)',
                    letterSpacing: '0.06em',
                    paddingTop: 2,
                  }}
                >
                  {item.year}
                </div>
                <p style={{ margin: 0, fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.65 }}>{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '56px 0 96px', background: 'var(--ink)' }}>
        <div className="container">
          <div style={{ color: 'var(--paper)' }}>
            <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>GET INVOLVED</div>
            <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'var(--f-head)', marginBottom: 24 }}>
              Support independent supplement testing.
            </h2>
            <p style={{ color: 'var(--mute-2)', maxWidth: 560, marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
              A reader subscription is the only way to keep Fitlab independent. $6/month
              funds lab tests, staff, and infrastructure — nothing goes to brands we cover.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/reviews/" className="btn btn-red btn-lg">Browse all reviews</Link>
              <Link href="/methodology/" className="btn btn-ghost btn-lg" style={{ color: 'var(--paper)', borderColor: 'var(--paper)' }}>
                How we test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

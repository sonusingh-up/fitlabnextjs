import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology — How We Test Supplements',
  description:
    'Every Fitlab review follows the same pipeline: same procurement, same lab, same rubric, same scoring formula, same re-test cadence. Full protocol documentation, including every change we have made and why.',
};

const PIPELINE_STEPS = [
  {
    num: '01',
    name: 'Procure',
    desc: 'An anonymous buyer purchases the product at full retail from a randomized retailer. We never accept samples, comp products, or pre-release units.',
    meta: '~3 days · $35–$220',
  },
  {
    num: '02',
    name: 'Catalog',
    desc: 'Lot number, expiration, manufacturer code, retail price, retailer, and receipt are catalogued. Two scoops are weighed and bagged for chain-of-custody to lab.',
    meta: '~2 hours · 4 samples',
  },
  {
    num: '03',
    name: 'Lab assay',
    desc: 'Eurofins or Covance, both ISO-17025 accredited, run protein content, amino acid panel, heavy metals (ICP-MS), microbial, and selected ingredient assays.',
    meta: '~14 days · $480/run',
  },
  {
    num: '04',
    name: 'Score',
    desc: 'Two reviewers independently score against the five-question rubric. Disagreements >0.3 points are arbitrated by a third reviewer.',
    meta: '~6 hours · 2 reviewers',
  },
  {
    num: '05',
    name: 'Right-of-reply',
    desc: 'Manufacturer receives a 72-hour right-of-reply on factual claims before publication. They cannot influence scoring; they can correct errors of fact.',
    meta: '72 hours · manufacturer',
  },
  {
    num: '06',
    name: 'Publish',
    desc: 'Score, lab data, raw CoA, and all author notes are published. CoA PDF is publicly hosted. Re-test date is scheduled 18 months out.',
    meta: 'Live · permanent',
  },
] as const;

const RUBRIC_ITEMS = [
  {
    n: 'Q.01',
    title: 'Ingredient quality',
    weight: 25,
    desc: 'Form, source, bioavailability. Is the ingredient the actual molecule that worked in the clinical trial — or a cheaper analogue that pretends to be? Synthetic vs. natural where it matters (vitamin E), specific isomers (magnesium glycinate vs. oxide), specific salt forms (folate vs. folic acid).',
    measures: ['Active form on label', 'HPLC/NMR verification', 'Source disclosure', 'Excipient profile'],
    goodEx: { label: 'Methylfolate (5-MTHF)', text: 'The bioactive form, no MTHFR gene barrier.' },
    badEx: { label: 'Folic acid', text: 'Synthetic, requires conversion, masks B12 deficiency in genotypes.' },
  },
  {
    n: 'Q.02',
    title: 'Clinical dosing',
    weight: 25,
    desc: 'Does the per-serving dose match the dose that worked in published human trials? Or is the ingredient "pixie-dusted" at 5% of the clinical effect range? Our threshold for "clinical" is the median dose in the meta-analyzed RCT pool for the primary endpoint.',
    measures: ['Per-serving dose', 'vs. clinical range', 'Lab-assayed actual', 'Cumulative if multi-dose'],
    goodEx: { label: 'L-Citrulline 8.0g', text: 'Within or above clinical range (6–8g).' },
    badEx: { label: 'L-Citrulline 1.5g', text: 'Pixie dust; no clinical signal at this dose.' },
  },
  {
    n: 'Q.03',
    title: 'Transparency',
    weight: 20,
    desc: 'Full ingredient amounts disclosed on label, not hidden behind "proprietary blends." Manufacturer named. Certificates of Analysis published per-lot. Marketing claims align with the dose actually in the product. Brand discloses any third-party relationships.',
    measures: ['Per-lot CoA', 'Proprietary blend?', 'Manufacturer named', 'Marketing/dose match'],
    goodEx: { label: 'Full disclosure', text: 'Per-lot CoA, manufacturer named, no prop. blends, accurate marketing.' },
    badEx: { label: '"Energy Matrix 3,200mg"', text: 'Five ingredients hidden, no CoA, generic mfr.' },
  },
  {
    n: 'Q.04',
    title: 'Third-party verification',
    weight: 15,
    desc: 'Independent testing by NSF, Informed Sport, USP, or equivalent. We re-test independently and compare our findings to the brand\'s published CoA. A brand\'s first CoA mismatch loses points; a second triggers a public recall flag.',
    measures: ['NSF / IS / USP cert', 'Banned-subst panel', 'Re-assay vs CoA match', 'Facility audit status'],
    goodEx: { label: 'NSF Certified for Sport + Informed Sport', text: 'Both verified by us at re-test.' },
    badEx: { label: '"GMP facility" claim only', text: 'No third-party batch testing or banned-substance screening.' },
  },
  {
    n: 'Q.05',
    title: 'Value',
    weight: 15,
    desc: 'Cost-per-clinical-serving, not cost-per-scoop. We calculate the cost-per-unit of the dose that produces a clinically meaningful effect, normalized across the category. Value is therefore a function of dosing accuracy, not raw price.',
    measures: ['Cost / clinical serving', 'Category percentile', 'Bulk-pricing adjusted', 'Cost stability 24mo'],
    goodEx: { label: '$1.86 per 25g clinical-serving', text: 'Top-decile efficiency for whey isolate.' },
    badEx: { label: '$0.92 labeled, 21g assayed', text: '= $1.10 per clinical-serving after dose correction.' },
  },
] as const;

const WEIGHT_BARS = [
  { label: 'Q.01 Ingredient quality', pct: 25, color: 'var(--red)' },
  { label: 'Q.02 Clinical dosing', pct: 25, color: 'var(--ink)' },
  { label: 'Q.03 Transparency', pct: 20, color: 'var(--green)' },
  { label: 'Q.04 Third-party', pct: 15, color: '#f0b040' },
  { label: 'Q.05 Value', pct: 15, color: '#6aacff' },
] as const;

const LAB_PARTNERS = [
  {
    name: 'Eurofins · Madison',
    accred: 'ISO-17025 · A2LA #2856 · Primary',
    desc: 'Our primary lab partner since 2024. Performs all heavy metals (ICP-MS), protein content (combustion N), amino acid panels (HPLC), and ingredient-specific assays.',
    scope: 'Scope: Active ingredients · Heavy metals · Micro',
  },
  {
    name: 'Covance / Labcorp',
    accred: 'ISO-17025 · Backup + cross-check',
    desc: '10% of samples are sent to Covance for cross-validation. Any >5% discrepancy between labs triggers a third blind run.',
    scope: 'Scope: Cross-validation · Specialty assays',
  },
  {
    name: 'Internal Lab · BK',
    accred: 'In-house · Brooklyn, NY · Pre-screen',
    desc: 'Visual inspection, label transcription, pH, density, dissolution time. Used to flag obvious red flags before sending to a paid lab; never used for primary scoring.',
    scope: 'Scope: Triage · Photography · Receipt',
  },
] as const;

const QA_ITEMS = [
  {
    q: 'When do you re-test?',
    a: 'Every 18 months. Every time a brand reformulates. Every time we receive a credible reader-flagged anomaly. Re-tests use the methodology version current at the time of the re-test.',
  },
  {
    q: 'What happens when a re-test changes the score?',
    a: 'The new score replaces the old. The old score remains visible in the review\'s changelog with the date and a note about what changed. We do not retroactively edit prior scores.',
  },
  {
    q: 'What if you make a mistake?',
    a: 'We log corrections on the page where the mistake was made, dated, with a description. Major errors get a banner at the top of the review until a re-test is run. All substantive corrections from 2024 onward are listed on our corrections page.',
  },
  {
    q: 'Can a brand contest a score?',
    a: 'Yes, on factual grounds only. We accept written appeals with new lab data or corrected information. We do not accept appeals based on tone, branding, or weighting preferences. All appeals and our responses are published in a public archive.',
  },
  {
    q: "What's the right-of-reply window?",
    a: '72 hours before publication. The manufacturer sees factual claims (lab values, dose calculations, ingredient identification) and can flag errors of fact. They cannot see the score. They cannot prevent publication.',
  },
  {
    q: 'Have you ever been sued?',
    a: 'Twice. Both cases withdrew before discovery. We carry libel insurance and publish nothing that is not backed by lab data or documented sources. Brands that do not like the score have better options than litigation — submit better data.',
  },
] as const;

const CHANGELOG = [
  {
    version: 'v3.2',
    date: "FEB '26",
    text: 'Rebalanced Q.04 (Third-party) from 20% to 15%. Added Q.05 (Value) at 15%. Heavy metals threshold tightened to Prop. 65 (was FDA action levels).',
  },
  {
    version: 'v3.0',
    date: "SEP '25",
    text: 'Added "right-of-reply" formal window. Doubled per-product lab budget from $240 to $480/run, enabling HPLC + ICP-MS on every product.',
  },
  {
    version: 'v2.0',
    date: "MAR '25",
    text: 'Two-reviewer scoring became mandatory. Disagreement arbitration formalized.',
  },
  {
    version: 'v1.0',
    date: "JAN '24",
    text: 'Original Fitlab methodology published. Five-question rubric, Eurofins as sole lab, single-reviewer scoring.',
  },
] as const;

export default function MethodologyPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: '80px 0 96px',
          borderBottom: '1px solid var(--ink)',
        }}
      >
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            METHODOLOGY · V3.2 · MAY 2026
          </div>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(64px, 9vw, 168px)',
              lineHeight: 0.84,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              margin: '0 0 32px',
            }}
          >
            How we
            <br />
            actually <span style={{ color: 'var(--red)', fontStyle: 'normal' }}>test.</span>
          </h1>
          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              maxWidth: '760px',
              color: 'rgba(246,244,239,0.85)',
              margin: '0 0 32px',
            }}
          >
            Every Fitlab review follows the same pipeline. Same procurement (retail).
            Same lab (Eurofins, ISO-17025). Same rubric (five weighted questions). Same
            scoring formula. Same re-test cadence (18 months). Every detail of the
            protocol is in this document, including the things that have changed over
            time, including our mistakes.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--mute-2)',
              textTransform: 'uppercase',
              flexWrap: 'wrap',
            }}
          >
            {[
              ['Version', <b key="v" style={{ color: 'var(--red)' }}>3.2</b>],
              ['Effective', <b key="e" style={{ color: 'var(--red)' }}>Feb 10, 2026</b>],
              ['Next review', 'Q4 2026'],
              ['Source on', <b key="g" style={{ color: 'var(--red)' }}>GitHub</b>],
            ].map(([label, val], i) => (
              <span key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {i > 0 && <span style={{ opacity: 0.4 }}>·</span>}
                {label} {val}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — Pipeline */}
      <section
        style={{
          padding: '64px 0',
          borderBottom: '1px solid var(--line)',
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
              marginBottom: '14px',
            }}
          >
            01 — PIPELINE
          </div>
          <h2 className="d-2" style={{ margin: '0 0 12px' }}>
            From shelf to score, in six steps.
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              maxWidth: '720px',
              margin: '0 0 32px',
            }}
          >
            No brand ever sends us a sample. No brand ever sees the score before
            publication. No brand has any contact with us between procurement and
            publication, except to answer specific technical questions on the record.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              border: '1px solid var(--ink)',
            }}
          >
            {PIPELINE_STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: '20px 18px 24px',
                  borderRight: i < PIPELINE_STEPS.length - 1 ? '1px solid var(--ink)' : 'none',
                  position: 'relative',
                  minHeight: '240px',
                  background: 'var(--paper)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '48px',
                    lineHeight: 0.85,
                    color: 'var(--paper-3)',
                    marginBottom: '8px',
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  {step.name}
                </div>
                <div
                  style={{
                    fontSize: '12.5px',
                    lineHeight: 1.45,
                    color: 'var(--ink-2)',
                  }}
                >
                  {step.desc}
                </div>
                <div
                  style={{
                    marginTop: '14px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    color: 'var(--mute)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.meta}
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '32px',
                      background: 'var(--paper)',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--red)',
                      fontWeight: 700,
                      zIndex: 2,
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Rubric */}
      <section
        style={{
          padding: '64px 0',
          borderBottom: '1px solid var(--line)',
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
              marginBottom: '14px',
            }}
          >
            02 — THE RUBRIC · 5 QUESTIONS · 100 POINTS
          </div>
          <h2 className="d-2" style={{ margin: '0 0 12px' }}>
            Five questions. Same five. Every time.
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              maxWidth: '760px',
              margin: 0,
            }}
          >
            The rubric is intentionally narrow. We do not score on packaging, branding,
            customer service, or &ldquo;feel.&rdquo; We score on what&apos;s in the
            bottle and how it relates to what the bottle claims.
          </p>

          {/* Rubric items */}
          <div style={{ marginTop: '32px' }}>
            {RUBRIC_ITEMS.map((item) => (
              <div
                key={item.n}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 280px',
                  gap: '40px',
                  padding: '40px 0',
                  borderTop: '1px solid var(--line)',
                  alignItems: 'start',
                }}
              >
                {/* Q number */}
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: 'var(--red)',
                  }}
                >
                  {item.n}
                </div>

                {/* Body */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontWeight: 700,
                      fontSize: '36px',
                      lineHeight: 0.94,
                      textTransform: 'uppercase',
                      margin: '0 0 14px',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: 1.55,
                      color: 'var(--ink-2)',
                      margin: '0 0 14px',
                      maxWidth: '620px',
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Examples */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      marginTop: '14px',
                    }}
                  >
                    {/* Good */}
                    <div
                      style={{
                        padding: '10px 12px',
                        borderLeft: '3px solid var(--green)',
                        background: 'var(--paper-2)',
                        fontSize: '12.5px',
                        lineHeight: 1.4,
                        color: 'var(--ink-2)',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--f-mono)',
                          fontSize: '9.5px',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          color: 'var(--green-deep)',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}
                      >
                        ✓ Full points
                      </span>
                      <b>{item.goodEx.label}</b> — {item.goodEx.text}
                    </div>
                    {/* Bad */}
                    <div
                      style={{
                        padding: '10px 12px',
                        borderLeft: '3px solid var(--red)',
                        background: 'var(--paper-2)',
                        fontSize: '12.5px',
                        lineHeight: 1.4,
                        color: 'var(--ink-2)',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--f-mono)',
                          fontSize: '9.5px',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          color: 'var(--red-deep)',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}
                      >
                        ✗ Low score
                      </span>
                      <b>{item.badEx.label}</b> — {item.badEx.text}
                    </div>
                  </div>
                </div>

                {/* Weight card */}
                <aside
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    padding: '24px',
                    alignSelf: 'start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '10.5px',
                      letterSpacing: '0.16em',
                      color: 'var(--mute-2)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Weight
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontWeight: 700,
                      fontSize: '72px',
                      lineHeight: 0.85,
                      letterSpacing: '-0.02em',
                      color: 'var(--red)',
                    }}
                  >
                    {item.weight}
                    <small style={{ fontSize: '0.5em', color: 'var(--paper)', opacity: 0.6 }}>%</small>
                  </div>
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '10.5px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--mute-2)',
                    }}
                  >
                    What we measure
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
                    {item.measures.map((m) => (
                      <li
                        key={m}
                        style={{
                          padding: '4px 0',
                          fontSize: '11px',
                          color: 'var(--paper)',
                          display: 'flex',
                          gap: '6px',
                        }}
                      >
                        <span style={{ color: 'var(--red)', fontWeight: 700 }}>·</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            ))}
          </div>

          {/* Scoring formula */}
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--ink)',
              padding: '32px',
              margin: '32px 0',
              display: 'grid',
              gridTemplateColumns: '1fr 360px',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '11px',
                  color: 'var(--mute)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                Scoring formula · v3.2
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: 'var(--ink)',
                  fontWeight: 600,
                }}
              >
                Score = <b>0.25</b>·Q<sub>1</sub> + <b>0.25</b>·Q<sub>2</sub> +{' '}
                <b>0.20</b>·Q<sub>3</sub> + <b>0.15</b>·Q<sub>4</sub> +{' '}
                <b>0.15</b>·Q<sub>5</sub>
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--ink-3)',
                  marginTop: '14px',
                  lineHeight: 1.5,
                }}
              >
                where each Q is the average of two reviewers&apos; independent 0–10 scores.
                Disagreements &gt;0.3 are arbitrated by a third reviewer.{' '}
                <b style={{ color: 'var(--ink)' }}>Hard failures</b> (heavy metals above
                Prop. 65, mislabeling &gt;20%, banned substances) trigger a maximum score
                cap of 5.0 regardless of weighted average.
              </div>
            </div>

            {/* Weight bars */}
            <div
              style={{
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                padding: '20px',
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
                  marginBottom: '12px',
                }}
              >
                Weight distribution
              </div>
              {WEIGHT_BARS.map((bar) => (
                <div
                  key={bar.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr 36px',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 0',
                    fontFamily: 'var(--f-mono)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-2)',
                    }}
                  >
                    {bar.label.split(' ')[0]}
                  </span>
                  <div
                    style={{
                      height: '16px',
                      background: 'var(--paper)',
                      border: '1px solid var(--line)',
                      position: 'relative',
                    }}
                  >
                    <i
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${(bar.pct / 25) * 100}%`,
                        background: bar.color,
                        display: 'block',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      textAlign: 'right',
                    }}
                  >
                    {bar.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Lab partners */}
      <section
        style={{
          padding: '64px 0',
          borderBottom: '1px solid var(--line)',
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
              marginBottom: '14px',
            }}
          >
            03 — LAB PARTNERS
          </div>
          <h2 className="d-2" style={{ margin: '0 0 12px' }}>
            Where we send the samples.
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              maxWidth: '760px',
              margin: 0,
            }}
          >
            We use two independent third-party labs. Both are ISO-17025 accredited. We
            rotate samples between labs as a continuous internal validity check.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              border: '1px solid var(--ink)',
              margin: '24px 0',
            }}
          >
            {LAB_PARTNERS.map((lab, i) => (
              <div
                key={lab.name}
                style={{
                  padding: '24px',
                  borderRight: i < LAB_PARTNERS.length - 1 ? '1px solid var(--ink)' : 'none',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    margin: '0 0 6px',
                  }}
                >
                  {lab.name}
                </h4>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    color: 'var(--red)',
                    textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}
                >
                  {lab.accred}
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--ink-2)',
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {lab.desc}
                </p>
                <div
                  style={{
                    marginTop: '14px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    color: 'var(--mute)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lab.scope}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Q&A */}
      <section
        style={{
          padding: '64px 0',
          borderBottom: '1px solid var(--line)',
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
              marginBottom: '14px',
            }}
          >
            04 — RE-TESTING · CORRECTIONS · APPEALS
          </div>
          <h2 className="d-2" style={{ margin: '0 0 12px' }}>
            How we update, when we&apos;re wrong, and what brands can do about it.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '24px',
            }}
          >
            {QA_ITEMS.map((item) => (
              <div
                key={item.q}
                style={{
                  padding: '24px',
                  borderLeft: '4px solid var(--red)',
                  background: 'var(--paper-2)',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    margin: '0 0 10px',
                  }}
                >
                  {item.q}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: 'var(--ink-2)',
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Changelog */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            05 — METHODOLOGY CHANGELOG
          </div>
          <h2 className="d-2" style={{ margin: '0 0 12px' }}>
            How this document has evolved.
          </h2>
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              maxWidth: '760px',
              margin: '0 0 24px',
            }}
          >
            We keep this file under version control because methodology changes are not
            edits — they are events. Every change is dated and explained.
          </p>

          <div
            style={{
              border: '1px solid var(--line)',
              background: 'var(--paper-2)',
              padding: '24px',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {CHANGELOG.map((entry, i) => (
                <li
                  key={entry.version}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: i < CHANGELOG.length - 1 ? '1px dashed var(--line)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: i === 0 ? 'var(--red)' : 'var(--ink)',
                    }}
                  >
                    {entry.version} · {entry.date}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--ink)' }}>{entry.text}</div>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: '32px',
              paddingTop: '28px',
              borderTop: '1px solid var(--ink)',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <Link href="/about/" className="btn btn-red btn-lg">
              Conflicts policy →
            </Link>
            <Link href="/research/" className="btn btn-ghost btn-lg">
              Research briefs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

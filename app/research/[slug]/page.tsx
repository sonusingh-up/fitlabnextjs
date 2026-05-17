import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { researchBriefs, getResearchBySlug, fmtDate } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return researchBriefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brief = getResearchBySlug(slug);
  if (!brief) return { title: 'Not found' };
  return {
    title: brief.title,
    description: brief.key,
  };
}

/* Extend the type for raw JSON fields not on the canonical type */
type RawBrief = {
  slug: string;
  id?: string;
  type?: string;
  title: string;
  key?: string;
  keyFinding?: string;
  author?: string;
  date?: string;
  publishedDate?: string;
  mins?: number;
  readTime?: string;
  citations?: number;
  reads?: number;
  grade?: string;
  evidence?: string;
  pick?: boolean;
  editorPick?: boolean;
  trialCount?: number;
  summary?: string;
  tags?: string[];
  category?: string;
};

const TOC_SECTIONS = [
  { id: 'sec-background', label: 'Background & rationale' },
  { id: 'sec-methods', label: 'Methods' },
  { id: 'sec-results', label: 'Results' },
  { id: 'sec-discussion', label: 'Discussion' },
  { id: 'sec-recommendation', label: 'Practical recommendation' },
  { id: 'sec-limitations', label: 'Limitations' },
  { id: 'sec-conflicts', label: 'Conflicts' },
  { id: 'sec-citations', label: 'Citations' },
];

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const brief = getResearchBySlug(slug) as RawBrief | undefined;
  if (!brief) notFound();

  const grade = (brief.grade ?? 'B').charAt(0);
  const gradeColor =
    grade === 'A'
      ? 'var(--green)'
      : grade === 'B'
      ? 'var(--paper)'
      : grade === 'C'
      ? '#f0c040'
      : 'var(--red)';

  const author = brief.author ?? 'Fitlab Research Team';
  const date = brief.publishedDate ?? brief.date ?? '';
  const mins = brief.readTime ?? (brief.mins ? `${brief.mins}` : '10');
  const keyFinding = brief.keyFinding ?? brief.key ?? '';
  const summary = brief.summary ?? keyFinding;
  const briefId = brief.id ?? slug.toUpperCase().replace(/-/g, ' ');
  const briefType = brief.type ?? brief.category ?? 'Research brief';

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderBottom: '1px solid var(--ink)',
          padding: '40px 0 48px',
        }}
      >
        <div className="container">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              fontFamily: 'var(--f-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(246,244,239,0.5)',
              marginBottom: '24px',
            }}
          >
            <Link href="/" style={{ color: 'rgba(246,244,239,0.7)' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/research/" style={{ color: 'rgba(246,244,239,0.7)' }}>Research</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{briefType.split(' · ')[0]}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{briefId}</span>
          </div>

          {/* Badge row */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                background: 'var(--red)',
                color: 'var(--paper)',
                padding: '6px 12px 5px',
                fontFamily: 'var(--f-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
              }}
            >
              {briefId} · {date ? fmtDate(date) : 'May 2026'}
            </span>
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: 'rgba(246,244,239,0.55)',
                textTransform: 'uppercase',
              }}
            >
              {briefType}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(40px, 5.5vw, 80px)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              margin: '0 0 20px',
              maxWidth: '1100px',
            }}
          >
            {brief.title}
          </h1>

          {/* Dek */}
          <p
            style={{
              fontSize: '19px',
              lineHeight: 1.5,
              color: 'rgba(246,244,239,0.85)',
              maxWidth: '780px',
              margin: '0 0 24px',
            }}
          >
            {keyFinding}
          </p>

          {/* Byline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '18px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--f-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(246,244,239,0.5)',
              flexWrap: 'wrap',
            }}
          >
            <span>
              <b style={{ color: 'var(--paper)' }}>{author}</b>
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{typeof mins === 'string' ? mins : `${mins} min`} read</span>
            {brief.reads && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>
                  <b style={{ color: 'var(--paper)' }}>
                    {brief.reads.toLocaleString()}
                  </b>{' '}
                  reads
                </span>
              </>
            )}
            {brief.citations && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{brief.citations} citations</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Abstract callout */}
      <div className="container">
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--ink)',
            padding: '36px',
            marginTop: '-24px',
            position: 'relative',
            boxShadow: '0 4px 0 var(--ink)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              left: '32px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              padding: '6px 12px',
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
            }}
          >
            ABSTRACT
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 220px',
              gap: '32px',
              alignItems: 'start',
              marginTop: '16px',
            }}
          >
            <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--ink)', margin: 0 }}>
              {summary}
            </p>

            {/* Grade card */}
            <div
              style={{
                border: '1px solid var(--line-2)',
                background: 'var(--paper-2)',
                padding: '18px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: 'var(--mute)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Evidence
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: '56px',
                  lineHeight: 0.9,
                  color:
                    grade === 'A'
                      ? 'var(--green-deep)'
                      : grade === 'B'
                      ? 'var(--ink)'
                      : grade === 'C'
                      ? '#8a6b00'
                      : 'var(--red-deep)',
                }}
              >
                {brief.grade ?? 'B'}
              </div>
              {brief.evidence && (
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: '4px',
                    paddingTop: '8px',
                    borderTop: '1px dashed var(--line-2)',
                  }}
                >
                  {brief.evidence}
                </div>
              )}
            </div>
          </div>

          {/* Key numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderTop: '1px solid var(--line)',
              marginTop: '24px',
              paddingTop: '20px',
            }}
          >
            {[
              { v: brief.trialCount ?? brief.citations ?? '—', k: 'Studies' },
              { v: brief.reads ? brief.reads.toLocaleString() : '—', k: 'Reads' },
              { v: brief.grade ?? 'B', k: 'Evidence grade' },
              { v: typeof mins === 'string' ? mins : `${mins}`, k: 'Min read' },
            ].map((item, i) => (
              <div
                key={item.k}
                style={{
                  paddingRight: i < 3 ? '18px' : 0,
                  borderRight: i < 3 ? '1px solid var(--line)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '32px',
                    lineHeight: 0.95,
                  }}
                >
                  {item.v}
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
                  {item.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body layout: TOC + article */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: '40px',
            padding: '64px 0 56px',
            alignItems: 'start',
          }}
        >
          {/* TOC */}
          <aside
            style={{
              position: 'sticky',
              top: '80px',
              alignSelf: 'start',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: 'var(--ink)',
                textTransform: 'uppercase',
                margin: '0 0 14px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--ink)',
              }}
            >
              Sections
            </h4>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {TOC_SECTIONS.map((s, i) => (
                <li key={s.id} style={{ marginBottom: '10px' }}>
                  <a
                    href={`#${s.id}`}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--f-body)',
                      fontSize: '13px',
                      lineHeight: 1.35,
                      color: i === 0 ? 'var(--ink)' : 'var(--mute)',
                      paddingLeft: '28px',
                      position: 'relative',
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        fontFamily: 'var(--f-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: 'var(--red)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>

          </aside>

          {/* Article body */}
          <article style={{ maxWidth: '760px' }}>
            <Section id="sec-background" num="01" title="Background & Rationale">
              <p>
                This research brief summarizes the current state of evidence for{' '}
                <b>{brief.title.toLowerCase()}</b>. The analysis draws on published
                peer-reviewed literature and Fitlab's internal evidence grading framework
                (modified GRADE).
              </p>
              <p>
                The evidence base is assessed for quality, consistency, and clinical applicability.
              </p>
            </Section>

            <Section id="sec-methods" num="02" title="Methods">
              <p>
                Studies were identified through a systematic PubMed and Cochrane Library
                search. Inclusion required: randomized or controlled study design, human
                subjects, peer-reviewed publication, and minimum 4-week follow-up for
                chronic supplement interventions.
              </p>
              {brief.trialCount && (
                <p>
                  A total of <b>{brief.trialCount} trials</b> met inclusion criteria and
                  were pooled for this analysis. Evidence quality was graded using a
                  modified GRADE framework, with adjustments for supplement-specific
                  confounders including dietary co-interventions and industry funding.
                </p>
              )}
            </Section>

            <Section id="sec-results" num="03" title="Results">
              {/* Key Finding highlight box */}
              <div
                style={{
                  background: 'var(--paper-2)',
                  borderLeft: '4px solid var(--red)',
                  padding: '24px',
                  margin: '24px 0',
                  fontFamily: 'var(--f-mono)',
                }}
              >
                <div
                  style={{
                    fontSize: '10.5px',
                    letterSpacing: '0.14em',
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  Key finding
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    lineHeight: 1.4,
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  {keyFinding}
                </div>
              </div>
              <p>
                The pooled data support the key finding stated above. Effect sizes are
                presented where available. Heterogeneity between studies was assessed
                using the I² statistic; where I² exceeded 50%, results are interpreted
                with caution.
              </p>
            </Section>

            <Section id="sec-discussion" num="04" title="Discussion">
              <p>
                The evidence reviewed here suggests {summary.toLowerCase()}
              </p>
              <p>
                The practical implications of this finding are most relevant for consumers
                making purchasing and dosing decisions. Industry marketing claims in this
                area frequently exceed what the published evidence supports.
              </p>
            </Section>

            <Section id="sec-recommendation" num="05" title="Practical Recommendation">
              <p>
                Based on the evidence reviewed, Fitlab's recommendation is to evaluate
                products in this category against clinical dose ranges published in the
                meta-analyzed trial pool. Products using proprietary blends that obscure
                individual ingredient amounts cannot be scored favorably on our dosing
                rubric (Q.02, weight 25%).
              </p>
              <p>
                Consumers should prioritize products with third-party certification (NSF,
                Informed Sport, USP) that independently verify label accuracy and absence
                of prohibited substances.
              </p>
            </Section>

            <Section id="sec-limitations" num="06" title="Limitations">
              <p>
                This brief summarizes published literature as of the date of publication.
                The supplement research landscape evolves; new RCTs may change grade
                assignments. Fitlab re-grades all briefs on a quarterly basis.
              </p>
              <p>
                Individual response variation is not captured by aggregate analysis.
                Approximately 20–25% of subjects in pooled supplement trials show minimal
                response regardless of product quality or protocol adherence.
              </p>
            </Section>

            <Section id="sec-conflicts" num="07" title="Conflicts of Interest">
              <p>
                The authors declare no financial relationships with manufacturers of
                products in the category covered by this brief. This analysis was funded
                entirely by Fitlab Reviews LLC, which derives its revenue from reader
                subscriptions and one annual enterprise report. No supplement brand
                provided product, sample, or compensation in connection with this work.
              </p>
              <p>
                See the <Link href="/about/" style={{ color: 'var(--red)' }}>conflicts policy</Link> for
                full staff disclosures.
              </p>
            </Section>

            <Section id="sec-citations" num="08" title="Citations">
              <p
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '13px',
                  color: 'var(--mute)',
                  marginBottom: '16px',
                }}
              >
                {brief.citations
                  ? `${brief.citations} citations on file.`
                  : 'Citations on file.'}
                {' '}Full bibliography available on request.
              </p>
              <div style={{ marginTop: '16px' }}>
                <Link
                  href="/methodology/"
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    borderBottom: '2px solid var(--red)',
                    paddingBottom: '2px',
                    textDecoration: 'none',
                  }}
                >
                  See our evidence grading methodology →
                </Link>
              </div>
            </Section>
          </article>
        </div>
      </div>

      {/* Related briefs */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: '48px 0',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <h3
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: '32px',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: '0 0 24px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--ink)',
            }}
          >
            Related research
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {researchBriefs
              .filter((b) => b.slug !== slug)
              .slice(0, 3)
              .map((b) => {
                const raw = b as RawBrief;
                return (
                  <Link
                    key={b.slug}
                    href={`/research/${b.slug}/`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingTop: '16px',
                      borderTop: '2px solid var(--ink)',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.14em',
                        color: 'var(--red)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {raw.type ?? 'Research'}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: 0.96,
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      {b.title}
                    </h4>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '10px',
                        color: 'var(--mute)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 'auto',
                      }}
                    >
                      {raw.grade && (
                        <span
                          style={{
                            color:
                              raw.grade.charAt(0) === 'A'
                                ? 'var(--green-deep)'
                                : 'var(--ink)',
                            fontWeight: 700,
                            marginRight: '8px',
                          }}
                        >
                          {raw.grade}
                        </span>
                      )}
                      {raw.mins ? `${raw.mins} min` : '—'}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Section helper ─── */
function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '36px',
          lineHeight: 0.96,
          textTransform: 'uppercase',
          margin: '48px 0 16px',
          paddingTop: '28px',
          borderTop: '2px solid var(--ink)',
          letterSpacing: '-0.005em',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--f-mono)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: 'var(--red)',
            marginBottom: '14px',
          }}
        >
          § {num} —
        </span>
        {title}
      </h2>
      <div
        style={{
          fontSize: '17px',
          lineHeight: 1.62,
          color: 'var(--ink)',
        }}
      >
        {children}
      </div>
    </section>
  );
}

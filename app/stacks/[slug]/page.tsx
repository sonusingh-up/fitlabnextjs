import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stacks, getStackBySlug } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

type Ingredient = {
  name: string;
  evidence: string;
  dose: string;
  desc: string;
};

type Stack = {
  slug: string;
  title: string;
  goal: string;
  meta: string;
  blurb: string;
  n_ingredients: number;
  cost_day: string;
  tldr: string;
  ingredients: Ingredient[];
};

export function generateStaticParams() {
  return stacks.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stack = getStackBySlug(slug) as Stack | undefined;
  if (!stack) return { title: 'Not Found · Fitlab' };
  return {
    title: `${stack.title} — Evidence-Based Stack · Fitlab`,
    description: stack.meta,
  };
}

const GOAL_COLORS: Record<string, string> = {
  Muscle: 'green',
  Focus: 'amber',
  Endurance: '',
  'Fat Loss': 'red',
  Foundation: '',
  Performance: '',
  Recovery: '',
  Sleep: '',
  Stress: 'amber',
  Complete: '',
};

function evidenceTagClass(evidence: string): string {
  if (!evidence) return 'tag';
  const e = evidence.toLowerCase();
  if (e.includes('strong')) return 'tag green';
  if (e.includes('moderate')) return 'tag amber';
  return 'tag';
}

export default async function StackDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = getStackBySlug(slug);
  if (!raw) notFound();

  const stack = raw as Stack;
  const goalColor = GOAL_COLORS[stack.goal] ?? '';
  const goalTagCls = goalColor ? `tag ${goalColor}` : 'tag';

  // Filter to real ingredients (those with a dose or desc)
  const realIngredients = stack.ingredients.filter(
    (ing) => ing.dose || ing.desc
  );

  // Sibling stacks for "explore more" sidebar
  const siblings = (stacks as Stack[])
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/stacks">All stacks</Link>
            <a href="#">By goal</a>
            <a href="#">Budget builds</a>
            <span className="spacer" />
            <span className="meta">{stack.n_ingredients} ingredients · {stack.cost_day}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '40px 0 48px',
          background: 'var(--paper)',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              fontFamily: 'var(--f-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              marginBottom: '28px',
            }}
          >
            <Link href="/" style={{ color: 'var(--ink-2)' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/stacks" style={{ color: 'var(--ink-2)' }}>Stacks</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{stack.goal}</span>
          </div>

          <div className="kicker" style={{ color: 'var(--red)', marginBottom: '16px' }}>
            STACKS · EVIDENCE-BASED COMBINATIONS
          </div>

          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 0.88,
              letterSpacing: '-0.015em',
              textTransform: 'uppercase',
              margin: '0 0 28px',
              maxWidth: '1100px',
            }}
          >
            {stack.title}
          </h1>

          {/* Stats bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto auto 1fr',
              border: '1px solid var(--ink)',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                borderRight: '1px solid var(--ink)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span className={goalTagCls}>{stack.goal}</span>
            </div>
            {[
              { v: String(stack.n_ingredients), k: 'Ingredients' },
              { v: stack.cost_day, k: 'Est. cost' },
              { v: '0', k: 'Paid placements' },
            ].map(({ v, k }) => (
              <div
                key={k}
                style={{
                  padding: '14px 28px',
                  borderRight: '1px solid var(--ink)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: 0.95,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                  }}
                >
                  {k}
                </div>
              </div>
            ))}
            <div
              style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Link href="/stacks" className="btn btn-ghost">
                All stacks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body: main + sidebar */}
      <div className="container" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* ── Main column ── */}
          <main>
            {/* TL;DR box */}
            {stack.tldr && (
              <div
                style={{
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  padding: '28px 32px',
                  marginBottom: '40px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    marginBottom: '12px',
                  }}
                >
                  TL;DR — The short version
                </div>
                <p
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.55,
                    color: 'var(--paper)',
                    margin: 0,
                    opacity: 0.9,
                  }}
                >
                  {stack.tldr}
                </p>
              </div>
            )}

            {/* Ingredients section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '4px',
                paddingBottom: '14px',
                borderBottom: '2px solid var(--ink)',
              }}
            >
              <div>
                <div className="kicker" style={{ color: 'var(--mute)', marginBottom: '6px' }}>
                  <span
                    style={{
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      padding: '2px 6px',
                      marginRight: '8px',
                      fontFamily: 'var(--f-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      borderRadius: '1px',
                    }}
                  >
                    {realIngredients.length > 0 ? realIngredients.length : stack.n_ingredients}
                  </span>
                  Ingredients
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 3.5vw, 48px)',
                    lineHeight: 0.95,
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  What&apos;s in this stack
                </h2>
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '11px',
                  color: 'var(--mute)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                Total: <b style={{ color: 'var(--ink)' }}>{stack.cost_day}</b>
              </div>
            </div>

            {/* Ingredient cards */}
            {realIngredients.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {realIngredients.map((ing, idx) => (
                  <article
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '56px 1fr',
                      borderTop: idx === 0 ? 'none' : '1px solid var(--line)',
                      padding: '24px 0',
                    }}
                  >
                    {/* Index number */}
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontWeight: 700,
                        fontSize: '13px',
                        letterSpacing: '0.12em',
                        color: 'var(--red)',
                        paddingTop: '3px',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          marginBottom: '8px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--f-display)',
                            fontWeight: 700,
                            fontSize: '26px',
                            lineHeight: 0.96,
                            textTransform: 'uppercase',
                            margin: 0,
                          }}
                        >
                          {ing.name}
                        </h3>
                        {ing.evidence && (
                          <span className={evidenceTagClass(ing.evidence)}>
                            {ing.evidence}
                          </span>
                        )}
                      </div>

                      {ing.dose && (
                        <div
                          style={{
                            fontFamily: 'var(--f-mono)',
                            fontSize: '10.5px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--mute)',
                            marginBottom: ing.desc ? '10px' : '0',
                          }}
                        >
                          Dose:{' '}
                          <b style={{ color: 'var(--ink)', fontWeight: 700 }}>{ing.dose}</b>
                        </div>
                      )}

                      {ing.desc && (
                        <p
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: 'var(--ink-3)',
                            margin: 0,
                            maxWidth: '640px',
                          }}
                        >
                          {ing.desc}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '32px',
                  marginTop: '16px',
                  border: '1px solid var(--line)',
                  background: 'var(--paper-2)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mute)',
                  }}
                >
                  {stack.n_ingredients} evidence-based ingredients
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--ink-3)',
                    lineHeight: 1.55,
                    margin: '12px auto 0',
                    maxWidth: '520px',
                  }}
                >
                  {stack.blurb}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid var(--line)',
              }}
            >
              <p
                style={{
                  fontSize: '12.5px',
                  color: 'var(--mute)',
                  lineHeight: 1.5,
                  borderLeft: '3px solid var(--line-2)',
                  paddingLeft: '12px',
                  margin: 0,
                }}
              >
                This stack is for informational purposes only. Always consult a healthcare
                provider before starting supplements, especially if you take medication or
                have a medical condition.
              </p>
            </div>
          </main>

          {/* ── Right sidebar ── */}
          <aside
            style={{
              position: 'sticky',
              top: '80px',
              alignSelf: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* At a glance */}
            <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)' }}>
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--ink)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Stack at a glance
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1px',
                  background: 'var(--line)',
                }}
              >
                {[
                  { v: stack.goal, k: 'Goal' },
                  { v: String(stack.n_ingredients), k: 'Ingredients' },
                  { v: stack.cost_day, k: 'Daily cost' },
                  { v: 'Clinical', k: 'Doses' },
                ].map(({ v, k }) => (
                  <div
                    key={k}
                    style={{
                      background: 'var(--paper)',
                      padding: '14px 16px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: '9.5px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--mute)',
                        marginBottom: '3px',
                      }}
                    >
                      {k}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: 1.0,
                        textTransform: 'uppercase',
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other stacks */}
            <div
              style={{
                border: '1px solid var(--line-2)',
                background: 'var(--paper-2)',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--line-2)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                Other stacks
              </div>
              <div>
                {siblings.map((s, i) => {
                  const sc = GOAL_COLORS[s.goal] ?? '';
                  const stc = sc ? `tag ${sc}` : 'tag';
                  return (
                    <Link
                      key={s.slug}
                      href={`/stacks/${s.slug}/`}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                        padding: '12px 16px',
                        borderBottom: i < siblings.length - 1 ? '1px solid var(--line)' : 'none',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <span className={stc} style={{ flexShrink: 0, marginTop: '2px' }}>{s.goal}</span>
                      <span
                        style={{
                          fontFamily: 'var(--f-display)',
                          fontWeight: 700,
                          fontSize: '14px',
                          lineHeight: 1.1,
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.title}
                      </span>
                    </Link>
                  );
                })}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--line)' }}>
                  <Link
                    href="/stacks"
                    className="btn btn-ghost"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    View all stacks
                  </Link>
                </div>
              </div>
            </div>

            {/* Methodology note */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--red)',
                  marginBottom: '8px',
                }}
              >
                Our methodology
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--mute-2)',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                }}
              >
                Doses sourced from peer-reviewed human trials. No affiliate relationships with brands listed.
              </p>
              <Link
                href="/methodology/"
                className="btn btn-red"
                style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}
              >
                How we work
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer CTA — back to stacks */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: '48px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div className="kicker" style={{ color: 'var(--red)', marginBottom: '8px' }}>
                EXPLORE MORE STACKS
              </div>
              <h3
                style={{
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  margin: '0 0 10px',
                }}
              >
                10 Science-Backed Stacks.
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--ink-3)',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '480px',
                }}
              >
                Every stack built ingredient-by-ingredient from the clinical evidence.
              </p>
            </div>
            <Link href="/stacks" className="btn btn-lg">
              Browse all stacks
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { stacks } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Science-Backed Supplement Stacks — Evidence-Based Combinations · Fitlab',
  description:
    'Ten evidence-based supplement stacks with clinical doses, honest cost breakdowns, and ingredient-by-ingredient evidence ratings. No sponsored placements.',
};

type Stack = (typeof stacks)[number];

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

export default function StacksPage() {
  const all = stacks as Stack[];

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <Link href="/stacks" className="active">All stacks</Link>
            <a href="#">By goal</a>
            <a href="#">Budget builds</a>
            <span className="spacer" />
            <span className="meta">{all.length} stacks · Evidence-based</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '32px 0',
        }}
      >
        <div className="container">
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: '16px' }}>
            STACKS · EVIDENCE-BASED COMBINATIONS
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
            10 Science-Backed
            <br />
            Stacks.
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: '32px',
              alignItems: 'end',
              marginTop: '18px',
              paddingTop: '18px',
              borderTop: '1px solid var(--line-2)',
            }}
          >
            <p
              style={{
                maxWidth: '540px',
                fontSize: '16px',
                lineHeight: 1.45,
                color: 'var(--ink-2)',
                margin: 0,
              }}
            >
              Every stack is built ingredient-by-ingredient from the clinical evidence.
              We show you exactly what to take, at what dose, and what the research actually says.
            </p>
            {[
              { v: String(all.length), k: 'Stacks' },
              { v: String(all.reduce((s, st) => s + st.n_ingredients, 0)), k: 'Ingredients' },
              { v: '100%', k: 'Evidence-only' },
            ].map(({ v, k }) => (
              <div
                key={k}
                style={{
                  borderLeft: '1px solid var(--line-2)',
                  paddingLeft: '16px',
                  minWidth: '100px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '36px',
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
          </div>
        </div>
      </section>

      {/* Stack grid */}
      <div
        className="container"
        style={{ paddingTop: '36px', paddingBottom: '64px' }}
      >
        <div className="bgrid-3" style={{ gap: '16px' }}>
          {all.map((stack, idx) => {
            const goalColor = GOAL_COLORS[stack.goal] ?? '';
            const tagCls = goalColor ? `tag ${goalColor}` : 'tag';
            return (
              <Link
                key={stack.slug}
                href={`/stacks/${stack.slug}/`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <article
                  className="bcard"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                >
                  {/* Card head — number + goal */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '56px 1fr',
                      alignItems: 'stretch',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    {/* Index number */}
                    <div
                      style={{
                        background: 'var(--ink)',
                        color: 'var(--paper)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '1px solid var(--ink)',
                        fontFamily: 'var(--f-mono)',
                        fontWeight: 700,
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                      }}
                    >
                      /{String(idx + 1).padStart(2, '0')}
                    </div>

                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ marginBottom: '6px' }}>
                        <span className={tagCls}>{stack.goal}</span>
                      </div>
                      <h3
                        className="bcard-name"
                        style={{ fontSize: '20px', margin: 0 }}
                      >
                        {stack.title}
                      </h3>
                    </div>
                  </div>

                  {/* Blurb */}
                  <div
                    style={{
                      flex: 1,
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'var(--ink-3)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {stack.blurb}
                    </p>
                  </div>

                  {/* Footer stats */}
                  <div className="bcard-foot">
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        fontFamily: 'var(--f-mono)',
                        fontSize: '10.5px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--mute)',
                      }}
                    >
                      <span>
                        <b style={{ color: 'var(--ink)', fontWeight: 700 }}>
                          {stack.n_ingredients}
                        </b>{' '}
                        ingredients
                      </span>
                      <span>
                        <b style={{ color: 'var(--ink)', fontWeight: 700 }}>
                          {stack.cost_day}
                        </b>
                      </span>
                    </div>
                    <span className="bcard-link">View stack</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

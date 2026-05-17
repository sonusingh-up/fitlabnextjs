import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ingredients, getIngredientBySlug } from '@/lib/data';
import type { Ingredient } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ingredients.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ing = getIngredientBySlug(slug);
  if (!ing) return { title: 'Ingredient Not Found · Fitlab' };

  const title = `${ing.name} — Evidence-Based Guide · Fitlab`;
  const description = `Clinical dose, mechanism, forms comparison, side effects. Grade ${ing.grade} evidence. ${ing.summary}`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

const GRADE_ORDER: Record<string, number> = { 'A+': 0, A: 1, B: 2, C: 3, D: 4, F: 5 };

function gradeColor(grade: string) {
  const g = grade.replace('+', '');
  if (g === 'A') return 'var(--green-deep)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return '#8a6b00';
  if (g === 'D') return 'var(--red-deep)';
  return 'var(--ink)';
}

function gradeBg(grade: string) {
  const g = grade.replace('+', '');
  if (g === 'A') return 'var(--green)';
  if (g === 'B') return 'var(--ink)';
  if (g === 'C') return 'var(--amber)';
  return 'var(--red)';
}

const EFFECT_ACCENT: Record<string, string> = {
  muscle:   'var(--red)',
  energy:   'var(--amber)',
  cog:      'var(--green)',
  sleep:    '#2563eb',
  heart:    '#c2185b',
  recovery: 'var(--mute-2)',
};

const DOSE_PROTOCOLS = [
  { label: 'Maintenance', sub: 'Daily, no load', markerPct: 40, clinicLeft: 30, clinicRight: 30, verdict: 'Optimal', verdictCls: '' },
  { label: 'Loading phase', sub: '5–7 day phase', markerPct: 75, clinicLeft: 60, clinicRight: 10, verdict: 'Optional', verdictCls: '' },
  { label: 'Microdose', sub: 'Budget / sensitive', markerPct: 20, clinicLeft: 15, clinicRight: 55, verdict: 'Suboptimal', verdictCls: ' lo' },
];

export default async function IngredientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ing = getIngredientBySlug(slug);

  if (!ing) notFound();

  const grade = ing.grade ?? '—';
  const gc = gradeColor(grade);
  const gb = gradeBg(grade);
  const accentColor = EFFECT_ACCENT[ing.primary_effect] ?? 'var(--mute-2)';

  // Related ingredients from stack_with
  const relatedIngredients: Ingredient[] = (ing.stack_with ?? [])
    .map((s: string) => ingredients.find(i => i.slug === s))
    .filter((i): i is Ingredient => i !== undefined);

  // Index for display number
  const idx = ingredients.findIndex(i => i.slug === slug);

  const sideEffects: string[] = Array.isArray(ing.side_effects)
    ? ing.side_effects
    : ing.side_effects
    ? [String(ing.side_effects)]
    : [];

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            <a href="#overview" className="active">Overview</a>
            <a href="#mechanism">Mechanism</a>
            <a href="#dosing">Dosing</a>
            <a href="#side-effects">Safety</a>
            <a href="#related">Related</a>
            <span className="spacer" />
            <span className="meta">Grade {grade} · {ing.meta}</span>
          </div>
        </div>
      </div>

      {/* Hero — chemistry card */}
      <section className="i-hero">
        <div className="container">
          {/* Breadcrumb */}
          <div className="i-crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/ingredients">Ingredients</Link>
            <span className="sep">/</span>
            <span>{ing.name}</span>
          </div>

          <div className="i-card">
            {/* Chemistry symbol */}
            <div className="i-sym">
              <div className="acc" style={{ background: accentColor }} />
              <span className="num">// {String(idx + 1).padStart(2, '0')}</span>
              <span className="mw">
                {ing.mw}
                <small>g/mol</small>
              </span>
              <span className="sym" style={{ fontSize: 'clamp(80px, 14vw, 180px)' }}>
                {ing.sym}
              </span>
              <span className="formula">{ing.formula}</span>
              <span className="nm">{ing.name}</span>
            </div>

            {/* Title + summary */}
            <div className="i-titles" id="overview">
              <span className="cat">{ing.cat.toUpperCase()}</span>
              <h1>
                <span className="small">{ing.formula}</span>
                {ing.name}
              </h1>
              <p className="verdict">{ing.summary}</p>
              {ing.alt_names && (
                <div className="alt-names">
                  <b>Also known as:</b>{' '}
                  {Array.isArray(ing.alt_names) ? ing.alt_names.join(', ') : String(ing.alt_names)}
                </div>
              )}
            </div>

            {/* Grade block */}
            <div className="i-grade">
              <div className="top" style={{ background: gb }}>
                <div className="gl">Evidence grade</div>
                <div className="gv">{grade}</div>
                <div className="gd">{ing.meta}</div>
              </div>
              <div className="verdict-band">
                {ing.verdict.toUpperCase()}
                <span className="small">Fitlab recommendation</span>
              </div>
              <div className="rows">
                <div>
                  <span className="l">Clinical dose</span>
                  <span className="v g">{String(ing.dose)}</span>
                </div>
                <div>
                  <span className="l">Dose unit</span>
                  <span className="v">{ing.dose_unit}</span>
                </div>
                <div>
                  <span className="l">Primary effect</span>
                  <span className="v">{ing.primary_effect.toUpperCase()}</span>
                </div>
                <div>
                  <span className="l">Products tracked</span>
                  <span className="v">{ing.nprod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Facts strip */}
          <div className="i-facts">
            <div>
              <div className="k">Evidence grade</div>
              <div className="v g" style={{ color: gc }}>{grade}</div>
            </div>
            <div>
              <div className="k">Clinical dose</div>
              <div className="v" style={{ fontSize: 18 }}>{String(ing.dose)}</div>
              <div className="vs">{ing.dose_unit}</div>
            </div>
            <div>
              <div className="k">RCTs pooled</div>
              <div className="v">{ing.meta.match(/\d+/)?.[0] ?? '—'}</div>
            </div>
            <div>
              <div className="k">Primary effect</div>
              <div className="v" style={{ fontSize: 16, textTransform: 'uppercase' }}>
                {ing.primary_effect}
              </div>
            </div>
            <div>
              <div className="k">Formula</div>
              <div className="v" style={{ fontSize: 14 }}>{ing.formula}</div>
            </div>
            <div>
              <div className="k">Products tracked</div>
              <div className="v">{ing.nprod}</div>
              <div className="vs">containing this</div>
            </div>
          </div>

          {/* TL;DR */}
          <div className="tldr">
            <div className="tldr-grid">
              <div className="left">
                <p>{ing.summary}</p>
                {ing.mech_short && <p>{ing.mech_short}</p>}
              </div>
              <ul>
                <li>
                  <span className="k">Evidence</span>
                  <span style={{ color: gc, fontWeight: 700 }}>
                    {grade} — {
                      grade.startsWith('A') ? 'Strong, consistent RCT evidence' :
                      grade === 'B' ? 'Good evidence, some inconsistency' :
                      grade === 'C' ? 'Weak or preliminary evidence' :
                      'Limited or poor evidence'
                    }
                  </span>
                </li>
                <li>
                  <span className="k">Clinical dose</span>
                  <span><b>{String(ing.dose)}</b> {ing.dose_unit}</span>
                </li>
                <li>
                  <span className="k">Safety</span>
                  <span>
                    {sideEffects.length > 0
                      ? sideEffects[0]
                      : 'Generally well-tolerated at clinical doses.'}
                  </span>
                </li>
                <li>
                  <span className="k">Verdict</span>
                  <span><b>{ing.verdict}</b></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="i-sec" id="mechanism">
        <div className="container">
          <div className="h-lbl"><b>02</b> MECHANISM OF ACTION</div>
          <h2>How it works.</h2>
          <p className="h-sub">
            {ing.mech_short
              ? ing.mech_short
              : `${ing.name} acts through multiple pathways to produce its primary effects.`}
          </p>

          <div className="mech-grid">
            <div className="mech-card">
              <div style={{
                fontFamily: 'var(--f-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: 0.96,
                textTransform: 'uppercase',
                letterSpacing: '-0.005em',
                marginBottom: 20,
              }}>
                {ing.name.split(' ')[0]}<br />
                <span style={{ color: accentColor }}>mechanism</span>
              </div>
              <p style={{
                fontFamily: 'var(--f-mono)',
                fontSize: 12,
                letterSpacing: '0.06em',
                lineHeight: 1.7,
                color: 'var(--mute-2)',
                margin: 0,
              }}>
                {ing.mech_short ?? ing.summary}
              </p>
              <div style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: '1px solid var(--ink-3)',
                fontFamily: 'var(--f-mono)',
                fontSize: 10,
                letterSpacing: '0.14em',
                color: 'var(--red)',
                textTransform: 'uppercase',
              }}>
                Primary effect: {ing.primary_effect.toUpperCase()}
              </div>
            </div>

            <div>
              <div style={{ padding: 24, background: 'var(--paper)', border: '1px solid var(--ink)' }}>
                <div style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  color: 'var(--mute)',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                  Key mechanism steps
                </div>
                {[
                  `Absorbed and distributed to target tissue`,
                  `Interacts with primary pathway (${ing.primary_effect})`,
                  `Downstream physiological effect produced`,
                  `Effect persists with continued supplementation`,
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 1fr',
                    gap: 14,
                    padding: '10px 0',
                    borderTop: i === 0 ? 'none' : '1px dashed var(--line)',
                    alignItems: 'start',
                  }}>
                    <span style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      color: accentColor,
                      letterSpacing: '0.1em',
                      paddingTop: 2,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dosing protocols */}
      <section className="i-sec" id="dosing">
        <div className="container">
          <div className="h-lbl"><b>03</b> DOSING PROTOCOLS</div>
          <h2>How much, when, and why.</h2>
          <p className="h-sub">
            Clinical dose for <b>{ing.name}</b> is <b>{String(ing.dose)}</b> ({ing.dose_unit}).
          </p>

          <div className="dose-card" style={{ marginTop: 24 }}>
            <div className="dose-head">
              <h3>Dose protocols</h3>
              <span className="meta">Based on {ing.meta}</span>
            </div>
            <div className="dose-ranges">
              {DOSE_PROTOCOLS.map(protocol => (
                <div key={protocol.label} className="dose-row">
                  <div className="lbl">
                    {protocol.label}
                    <small>{protocol.sub}</small>
                  </div>
                  <div className="dose-bar">
                    <div className="axis" />
                    <div
                      className="clinic"
                      style={{ left: `${protocol.clinicLeft}%`, right: `${protocol.clinicRight}%` }}
                    >
                      <span className="clinic-label">Clinical range</span>
                    </div>
                    <div className="marker" style={{ left: `${protocol.markerPct}%` }} />
                    <div className="axis-labels">
                      <span>Low</span>
                      <span>Clinical</span>
                      <span>High</span>
                    </div>
                  </div>
                  <div className={`verdict${protocol.verdictCls}`}>{protocol.verdict}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Forms comparison */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 24,
              textTransform: 'uppercase',
              marginBottom: 16,
              letterSpacing: '-0.005em',
            }}>
              Forms compared
            </h3>
            <div className="forms-grid">
              <div className="form-col">
                <div className="form-head this">
                  <div className="lbl">Recommended · Best evidence</div>
                  <div className="nm">{ing.name.split(' ')[0]}</div>
                  <div className="grade A">Grade {grade}</div>
                </div>
                <div className="form-row">
                  <div className="k">Bioavailability</div>
                  <div className="v green">High</div>
                </div>
                <div className="form-row">
                  <div className="k">RCT count</div>
                  <div className="v">{ing.meta.match(/\d+/)?.[0] ?? '—'}</div>
                </div>
                <div className="form-row">
                  <div className="k">Clinical dose</div>
                  <div className="v">{String(ing.dose)}</div>
                </div>
                <div className="form-row">
                  <div className="k">Cost</div>
                  <div className="v">Low–medium</div>
                </div>
              </div>
              {['Alternate form', 'Proprietary blend', 'Combination'].map(form => (
                <div key={form} className="form-col">
                  <div className="form-head">
                    <div className="lbl">Alternative</div>
                    <div className="nm">{form}</div>
                    <div className="grade B">Grade B</div>
                  </div>
                  <div className="form-row">
                    <div className="k">Bioavailability</div>
                    <div className="v">Variable</div>
                  </div>
                  <div className="form-row">
                    <div className="k">RCT count</div>
                    <div className="v">Fewer</div>
                  </div>
                  <div className="form-row">
                    <div className="k">Clinical dose</div>
                    <div className="v">Varies</div>
                  </div>
                  <div className="form-row">
                    <div className="k">Cost</div>
                    <div className="v">Higher</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Side effects */}
      <section className="i-sec" id="side-effects">
        <div className="container">
          <div className="h-lbl"><b>04</b> SAFETY &amp; SIDE EFFECTS</div>
          <h2>What to know before you take it.</h2>

          <div className="risk-grid" style={{ marginTop: 24 }}>
            <div className="risk-col">
              <h4>
                <span className="mk">✓</span>
                Generally safe for
              </h4>
              <ul>
                <li>
                  <span className="k">Adults</span>
                  <span>Healthy adults at clinical doses. Extensive safety data from {ing.meta}.</span>
                </li>
                <li>
                  <span className="k">Long-term</span>
                  <span>No adverse signals in studies up to 5 years at maintenance dose.</span>
                </li>
                <li>
                  <span className="k">Drug-tested</span>
                  <span>Not a banned substance under WADA, NSF, or Informed Sport frameworks.</span>
                </li>
              </ul>
            </div>
            <div className="risk-col danger">
              <h4>
                <span className="mk">!</span>
                Cautions &amp; notes
              </h4>
              <ul>
                {sideEffects.length > 0 ? (
                  sideEffects.map((effect, i) => (
                    <li key={i}>
                      <span className="k">{i === 0 ? 'Side effects' : 'Note'}</span>
                      <span>{effect}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="k">Side effects</span>
                    <span>Generally well-tolerated at clinical doses.</span>
                  </li>
                )}
                <li>
                  <span className="k">Interactions</span>
                  <span>Consult your physician if taking prescription medications or if you have a chronic condition.</span>
                </li>
                <li>
                  <span className="k">Quality</span>
                  <span>Purity varies by brand. Use products with third-party verification (NSF, Informed Sport).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related ingredients */}
      {relatedIngredients.length > 0 && (
        <section className="i-sec" id="related">
          <div className="container">
            <div className="h-lbl"><b>05</b> STACK WITH</div>
            <h2>Related ingredients.</h2>
            <p className="h-sub">
              Ingredients commonly combined with {ing.name} for complementary effects.
            </p>

            <div className="prod-grid" style={{ marginTop: 24 }}>
              {relatedIngredients.map(rel => {
                const relGrade = rel.grade ?? '—';
                const relGc = gradeColor(relGrade);
                return (
                  <Link
                    key={rel.slug}
                    href={`/ingredients/${rel.slug}/`}
                    className="ix-prod"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="img">
                      <div style={{
                        width: 32, height: 32,
                        background: 'var(--ink)', color: 'var(--paper)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em',
                      }}>
                        {rel.sym}
                      </div>
                    </div>
                    <div className="body">
                      <div className="nm">{rel.name}</div>
                      <div className="dose">
                        <b style={{ color: relGc }}>{relGrade}</b> · {String(rel.dose)}
                      </div>
                    </div>
                    <div className="sc" style={{ color: relGc, fontSize: 20 }}>
                      {relGrade}
                      <small>evid</small>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation + methodology note */}
      <section className="i-sec">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0 }}>
            <Link href="/ingredients" className="bcard-link">← Back to ingredients library</Link>
            <Link href="/reviews" className="bcard-link">See reviewed products →</Link>
          </div>

          <div style={{
            marginTop: 24,
            padding: '16px 20px',
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            fontFamily: 'var(--f-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            color: 'var(--ink-2)',
            lineHeight: 1.7,
          }}>
            <b style={{ color: 'var(--ink)' }}>EVIDENCE NOTE</b> — Evidence grades follow a modified GRADE
            framework. A+ = multiple large RCTs, consistent results. A = good RCT evidence.
            B = some inconsistency or fewer trials. C = preliminary or mechanistic evidence only.
            D = animal data or unreplicated.{' '}
            <Link href="/methodology" style={{ color: 'var(--red)', textDecoration: 'underline' }}>
              Full grading methodology →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

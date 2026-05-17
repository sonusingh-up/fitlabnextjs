import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, getBlogPostBySlug, fmtDate } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  const raw = post as RawPost;
  return {
    title: post.title,
    description: raw.dek ?? raw.excerpt ?? post.dek,
  };
}

type RawPost = {
  slug: string;
  cat?: string;
  category?: string;
  title: string;
  dek?: string;
  excerpt?: string;
  author: string;
  author_av?: string;
  date?: string;
  publishedDate?: string;
  mins?: number;
  readTime?: string;
  reads?: number;
  pick?: boolean;
  tags?: string[];
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug) as RawPost | undefined;
  if (!post) notFound();

  const cat = post.cat ?? post.category ?? 'Opinion';
  const dek = post.dek ?? post.excerpt ?? '';
  const date = post.publishedDate ?? post.date ?? '';
  const mins = post.mins ?? (typeof post.readTime === 'string' ? parseInt(post.readTime) : 8);
  const av =
    post.author_av ??
    post.author
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2);

  // Related posts: same category, exclude current
  const allPosts = blogPosts as unknown as RawPost[];
  const related = allPosts
    .filter((p) => p.slug !== slug && (p.cat ?? p.category) === cat)
    .slice(0, 3);
  const fallbackRelated = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          borderBottom: '1px solid var(--ink)',
          padding: '40px 0 48px',
          background: 'var(--paper)',
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
              color: 'var(--mute)',
              marginBottom: '28px',
            }}
          >
            <Link href="/" style={{ color: 'var(--ink-2)' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog/" style={{ color: 'var(--ink-2)' }}>Blog</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{cat}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '240px',
              }}
            >
              {post.title}
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: 'var(--red)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {cat} · {date ? fmtDate(date) : 'May 2026'}
          </div>

          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              lineHeight: 0.88,
              letterSpacing: '-0.015em',
              textTransform: 'uppercase',
              margin: '0 0 24px',
              maxWidth: '1100px',
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              color: 'var(--ink-2)',
              maxWidth: '720px',
              margin: '0 0 28px',
            }}
          >
            {dek}
          </p>

          {/* Byline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '18px',
              borderTop: '1px solid var(--line-2)',
              fontFamily: 'var(--f-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--ink)',
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '50%',
              }}
            >
              {av}
            </div>
            <span>
              <b style={{ color: 'var(--ink)' }}>{post.author}</b>
            </span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{mins} min read</span>
            {post.reads && (
              <>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>
                  <b style={{ color: 'var(--ink)' }}>{post.reads.toLocaleString()}</b> reads
                </span>
              </>
            )}
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Published {date ? fmtDate(date) : ''}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr 200px',
            gap: '40px',
            padding: '56px 0',
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
                textTransform: 'uppercase',
                color: 'var(--ink)',
                margin: '0 0 14px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--ink)',
              }}
            >
              In this piece
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { id: 'sec1', label: 'The premise' },
                { id: 'sec2', label: 'The evidence' },
                { id: 'sec3', label: 'The data' },
                { id: 'sec4', label: 'The defense' },
                { id: 'sec5', label: 'What to do' },
                { id: 'sec6', label: 'Coda' },
              ].map((item, i) => (
                <li key={item.id} style={{ marginBottom: '10px' }}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: i === 0 ? 'var(--ink)' : 'var(--mute)',
                      display: 'flex',
                      gap: '8px',
                      lineHeight: 1.4,
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--red)',
                        fontWeight: 700,
                        minWidth: '20px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content */}
          <article style={{ maxWidth: '720px' }}>
            {/* Opening lede with drop-cap */}
            <p
              id="sec1"
              style={{
                fontSize: '22px',
                lineHeight: 1.45,
                color: 'var(--ink)',
                marginBottom: '28px',
              }}
            >
              {dek}
            </p>

            <PostSection id="sec2" num="01" label="EVIDENCE" title="What the research actually shows">
              <p>
                The conventional wisdom in this area has propagated through marketing
                channels without rigorous re-examination of the underlying data. When we
                pull the original studies, the picture is often more nuanced — and
                sometimes more damning — than the product copy suggests.
              </p>
              <p>
                Our analysis focuses on peer-reviewed human trials. We excluded in vitro
                studies, animal models, and manufacturer-funded trials where the conflict
                of interest was not adequately controlled for. What remains is a smaller
                evidence base than most brands imply, but a more honest one.
              </p>
            </PostSection>

            <PostSection id="sec3" num="02" label="DATA" title="What we found in the lab">
              <p>
                We purchased products at retail, catalogued lot numbers, and sent samples
                to our ISO-17025 accredited lab partner. The assay panel included active
                ingredient quantification (HPLC), heavy metals (ICP-MS), and microbial
                screening.
              </p>

              {/* Blockquote */}
              <blockquote
                style={{
                  margin: '32px 0',
                  padding: '28px 0 28px 32px',
                  borderLeft: '4px solid var(--red)',
                  fontFamily: 'var(--f-display)',
                  fontSize: '32px',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.005em',
                }}
              >
                The label is not the product. The assay is the product.
                <cite
                  style={{
                    display: 'block',
                    marginTop: '16px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--mute)',
                    fontStyle: 'normal',
                  }}
                >
                  — Fitlab lab protocol manual
                </cite>
              </blockquote>

              <p>
                The results were consistent with our broader testing dataset: brands with
                third-party certification (NSF, Informed Sport) showed significantly
                better agreement between label and assay values. Uncertified products
                were more likely to under-dose key actives.
              </p>
            </PostSection>

            <PostSection id="sec4" num="03" label="REBUTTAL" title="The industry defense">
              <p>
                Industry&apos;s common defense in this space comes in two forms. First,
                that proprietary blends protect trade secrets from competitors. Second,
                that synergistic formulations justify sub-clinical individual doses.
                Neither defense holds up to scrutiny.
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                }}
              >
                {[
                  'Competitors can reverse-engineer any formula with a $50 lab assay. Proprietary blends protect against consumers, not competition.',
                  '"Synergistic formulations" remain an unsubstantiated claim in the absence of brand-funded human trial data — which no brand we contacted has published.',
                  'Third-party certification requires full dose disclosure by definition. A certified proprietary blend is a contradiction in terms.',
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '17px',
                      lineHeight: 1.55,
                      padding: '12px 0 12px 36px',
                      borderTop: '1px solid var(--line)',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '14px',
                        fontFamily: 'var(--f-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--red)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </PostSection>

            <PostSection id="sec5" num="04" label="PRACTICAL" title="What to do about it">
              <p>
                The practical implications of this analysis are straightforward. Use our
                methodology as a filter: if a product hides any ingredient amounts behind
                a proprietary blend, it automatically scores a 0 on our Q.03
                transparency rubric. No certification, no full-disclosure score.
              </p>
              <p>
                For the specific category covered in this piece, see our{' '}
                <Link
                  href="/best/"
                  style={{
                    color: 'var(--ink)',
                    textDecorationColor: 'var(--red)',
                    textDecorationThickness: '2px',
                  }}
                >
                  best-of guide
                </Link>{' '}
                for the products that passed our full rubric. For the methodology behind
                that guide, read the{' '}
                <Link
                  href="/methodology/"
                  style={{
                    color: 'var(--ink)',
                    textDecorationColor: 'var(--red)',
                    textDecorationThickness: '2px',
                  }}
                >
                  methodology page
                </Link>
                .
              </p>
            </PostSection>

            <PostSection id="sec6" num="05" label="CODA" title="Why this matters">
              <p>
                Supplements are an asymmetric information market. Brands know exactly
                what is in the bottle. Consumers do not. The opacity is not accidental —
                it is the product strategy. Our job is to close that gap, one assay at a
                time.
              </p>
            </PostSection>

            {/* Author bio */}
            <div
              style={{
                border: '1px solid var(--ink)',
                background: 'var(--paper)',
                padding: '28px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '20px',
                margin: '48px 0',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--f-display)',
                  fontWeight: 700,
                  fontSize: '28px',
                  borderRadius: '50%',
                }}
              >
                {av}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontWeight: 700,
                    fontSize: '26px',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    margin: '0 0 4px',
                  }}
                >
                  {post.author}
                </h4>
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Fitlab Reviews staff
                </div>
                <p
                  style={{
                    fontSize: '14.5px',
                    lineHeight: 1.5,
                    color: 'var(--ink-2)',
                    margin: '0 0 12px',
                  }}
                >
                  Independent supplement research. No commercial relationships with
                  brands covered. Declares any potential conflicts on the{' '}
                  <Link href="/about/" style={{ color: 'var(--red)' }}>
                    conflicts page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </article>

          {/* Right sidebar */}
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
            <div
              style={{
                background: 'var(--paper-2)',
                border: '1px solid var(--line-2)',
                padding: '14px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: '8px',
                }}
              >
                This piece
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
                {mins} min
              </div>
              {post.reads && (
                <div
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '11px',
                    color: 'var(--ink-3)',
                    marginTop: '4px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {post.reads.toLocaleString()} reads
                </div>
              )}
            </div>

            <div
              style={{
                background: 'var(--paper-2)',
                border: '1px solid var(--line-2)',
                padding: '14px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: '8px',
                }}
              >
                Published
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
                {date ? fmtDate(date).slice(0, 6) : 'May 26'}
              </div>
            </div>

            {/* Subscribe card */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '14px',
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
                Get the weekly
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--mute-2)',
                  margin: '6px 0 12px',
                  lineHeight: 1.45,
                }}
              >
                One email. Field reports, recalls, new lab data. Zero affiliate hype.
              </p>
              <Link href="/" className="btn btn-red" style={{ fontSize: '10px', display: 'block', textAlign: 'center' }}>
                Subscribe →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Related posts */}
      <section
        style={{
          background: 'var(--paper-2)',
          padding: '48px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
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
            Related reading
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {relatedPosts.map((p) => {
              const pCat = p.cat ?? p.category ?? '';
              const pDate = p.publishedDate ?? p.date ?? '';
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
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
                    {pCat}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontWeight: 700,
                      fontSize: '22px',
                      lineHeight: 0.96,
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    {p.title}
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
                    {pDate ? fmtDate(pDate).slice(0, 6) : ''} ·{' '}
                    {p.mins ?? p.readTime} min · {p.author}
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
function PostSection({
  id,
  num,
  label,
  title,
  children,
}: {
  id: string;
  num: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2
        style={{
          fontFamily: 'var(--f-display)',
          fontWeight: 700,
          fontSize: '40px',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          letterSpacing: '-0.005em',
          margin: '48px 0 18px',
          paddingTop: '24px',
          borderTop: '2px solid var(--ink)',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--f-mono)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: 'var(--red)',
            marginBottom: '12px',
          }}
        >
          {num} — {label}
        </span>
        {title}
      </h2>
      <div style={{ fontSize: '18px', lineHeight: 1.62, color: 'var(--ink)' }}>
        {children}
      </div>
    </section>
  );
}

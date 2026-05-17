import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, fmtDateShort } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog — Field Notes from Independent Supplement Research',
  description:
    'Opinions, field reports, and explainers from our reviewers. Updated twice weekly. No sponsored content.',
};

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

const CATEGORIES = [
  'All posts',
  'Opinion',
  'Field reports',
  'Explainers',
  'Recall watch',
  'Behind the score',
] as const;

export default function BlogPage() {
  const posts = blogPosts as unknown as RawPost[];
  const featured = posts.find((p) => p.pick) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  const totalReads = posts.reduce((s, p) => s + (p.reads ?? 0), 0);
  const authors = new Set(posts.map((p) => p.author)).size;

  return (
    <>
      {/* Sub-nav */}
      <div className="sub-nav">
        <div className="container">
          <div className="sub-nav-inner">
            {CATEGORIES.map((cat, i) => (
              <a key={cat} href="#" className={i === 0 ? 'active' : undefined}>
                {cat}
              </a>
            ))}
            <span className="spacer" />
            <span className="meta">{posts.length} posts · {authors} authors</span>
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
          <div
            className="kicker"
            style={{ color: 'var(--red)', marginBottom: '16px' }}
          >
            FIELD NOTES · UPDATED WEEKLY
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
            The Blog.
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
              What&apos;s happening behind the scoring. Opinions from our reviewers,
              field reports from the supplement aisle, and the explainers we wish someone
              had written for us.
            </p>
            {[
              { v: String(posts.length), k: 'Posts' },
              { v: String(authors), k: 'Authors' },
              { v: '2×', k: '/ Week' },
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

      {/* Content */}
      <div
        className="container"
        style={{ paddingTop: '28px', paddingBottom: '56px' }}
      >
        <div className="with-rail">
          {/* Sidebar */}
          <aside className="rail">
            <div className="rail-block">
              <h4>Category</h4>
              <div className="chips">
                {CATEGORIES.slice(1).map((cat) => (
                  <span key={cat} className="chip-filter">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="rail-block">
              <h4>Authors</h4>
              <div className="chips">
                {Array.from(new Set(posts.map((p) => p.author))).map((a) => (
                  <span key={a} className="chip-filter">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main>
            {/* Toolbar */}
            <div className="toolbar">
              <div className="results">
                <b>{rest.length}</b> posts · <span>0</span> filters applied
              </div>
              <div className="actions">
                <select
                  defaultValue="recent"
                  style={{
                    fontFamily: 'var(--f-mono)',
                    fontSize: '10.5px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '6px 28px 6px 10px',
                    border: '1px solid var(--line-2)',
                    background: 'var(--paper)',
                    color: 'var(--ink-2)',
                  }}
                >
                  <option value="recent">Sort · Most recent</option>
                  <option value="reads">Most read</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Featured post */}
            <FeaturedPost post={featured} />

            {/* Post list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {rest.map((post, idx) => (
                <PostRow key={post.slug} post={post} index={idx} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

/* ─── Featured post ─── */
function FeaturedPost({ post }: { post: RawPost }) {
  const cat = post.cat ?? post.category ?? '';
  const dek = post.dek ?? post.excerpt ?? '';
  const date = post.publishedDate ?? post.date ?? '';
  const mins = post.mins ?? post.readTime ?? '5';
  const av = post.author_av ?? post.author.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <article
      style={{
        border: '1px solid var(--ink)',
        background: 'var(--paper)',
        padding: '40px',
        marginBottom: '32px',
        display: 'grid',
        gridTemplateColumns: '1fr 220px',
        gap: '32px',
        position: 'relative',
      }}
    >
      {/* Featured badge */}
      <div
        style={{
          position: 'absolute',
          top: '-1px',
          left: '24px',
          background: 'var(--red)',
          color: 'var(--paper)',
          padding: '6px 12px 5px',
          fontFamily: 'var(--f-mono)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
        }}
      >
        FEATURED · {date ? date.slice(0, 7).replace('-', ' ').toUpperCase() : 'MAY 2026'}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            marginBottom: '16px',
            marginTop: '14px',
          }}
        >
          {cat} · {mins} min read · ★ Most-read this week
        </div>
        <h2
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: 'clamp(36px, 4vw, 64px)',
            lineHeight: 0.92,
            letterSpacing: '-0.005em',
            textTransform: 'uppercase',
            margin: '0 0 18px',
          }}
        >
          <Link href={`/blog/${post.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {post.title}
          </Link>
        </h2>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.5,
            color: 'var(--ink-2)',
            maxWidth: '640px',
            margin: '0 0 24px',
          }}
        >
          {dek}
        </p>
        <Link
          href={`/blog/${post.slug}/`}
          className="btn btn-red"
        >
          Read the piece →
        </Link>

        {/* Byline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--f-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--mute)',
            paddingTop: '16px',
            borderTop: '1px solid var(--line-2)',
            marginTop: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
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
          <span>Published {date ? fmtDateShort(date) : ''}</span>
          {post.reads && (
            <>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>
                <b style={{ color: 'var(--ink)' }}>{post.reads.toLocaleString()}</b> reads
              </span>
            </>
          )}
        </div>
      </div>

      {/* Visual */}
      <div
        style={{
          background: 'var(--paper-2)',
          border: '1px solid var(--line-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <svg
          viewBox="0 0 120 140"
          width="140"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="14" y="6" width="92" height="128" fill="#0a0a0a" />
          <rect x="14" y="30" width="92" height="14" fill="#c8412b" />
          <rect x="20" y="56" width="80" height="3" fill="#f6f4ef" opacity="0.4" />
          <rect x="20" y="64" width="60" height="3" fill="#f6f4ef" opacity="0.4" />
          <rect x="20" y="72" width="68" height="3" fill="#f6f4ef" opacity="0.4" />
          <rect x="20" y="80" width="44" height="3" fill="#f6f4ef" opacity="0.4" />
          <rect x="20" y="88" width="76" height="3" fill="#f6f4ef" opacity="0.4" />
          <rect x="20" y="96" width="56" height="3" fill="#f6f4ef" opacity="0.4" />
          <text
            x="60"
            y="120"
            fontFamily="Antonio"
            fontSize="13"
            fontWeight="700"
            fill="#c8412b"
            textAnchor="middle"
          >
            ★ #1
          </text>
          <text
            x="60"
            y="132"
            fontFamily="Antonio"
            fontSize="11"
            fontWeight="700"
            fill="#c8412b"
            textAnchor="middle"
          >
            WEEK
          </text>
        </svg>
      </div>
    </article>
  );
}

/* ─── Post row ─── */
function PostRow({ post, index }: { post: RawPost; index: number }) {
  const cat = post.cat ?? post.category ?? '';
  const dek = post.dek ?? post.excerpt ?? '';
  const date = post.publishedDate ?? post.date ?? '';
  const mins = post.mins ?? (typeof post.readTime === 'string' ? parseInt(post.readTime) : 5);

  return (
    <Link
      href={`/blog/${post.slug}/`}
      style={{
        display: 'grid',
        gridTemplateColumns: '70px 1fr 110px',
        gap: '24px',
        padding: '28px 0',
        borderTop: '1px solid var(--line)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.15s',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: 'var(--mute)',
        }}
      >
        / {String(index + 1).padStart(3, '0')}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: 'var(--red)',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          {cat}
        </div>
        <h3
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: 0.96,
            textTransform: 'uppercase',
            letterSpacing: '-0.005em',
            margin: '0 0 8px',
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--ink-3)',
            lineHeight: 1.45,
            maxWidth: '640px',
            margin: 0,
          }}
        >
          {dek}
        </p>
        <div
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--mute)',
            marginTop: '8px',
          }}
        >
          <b style={{ color: 'var(--ink)' }}>{post.author}</b>
          {post.reads && (
            <>
              {' · '}
              {(post.reads / 1000).toFixed(1)}k reads
            </>
          )}
          {' · '}
          {mins} min
        </div>
      </div>

      <div style={{ textAlign: 'right', fontFamily: 'var(--f-mono)' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'var(--mute)',
            textTransform: 'uppercase',
          }}
        >
          {date ? fmtDateShort(date) : ''}
        </div>
        <div
          style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: 1.0,
            marginTop: '6px',
          }}
        >
          {mins}
          <small
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: '10px',
              color: 'var(--mute)',
              marginLeft: '4px',
              fontWeight: 500,
              letterSpacing: '0.1em',
            }}
          >
            min
          </small>
        </div>
      </div>
    </Link>
  );
}

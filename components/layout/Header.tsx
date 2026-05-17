'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Reviews',     href: '/reviews/' },
  { label: 'Brands',      href: '/brands/' },
  { label: 'Ingredients', href: '/ingredients/' },
  { label: 'Best',        href: '/best/' },
  { label: 'Research',    href: '/research/' },
  { label: 'Blog',        href: '/blog/' },
  { label: 'Methodology', href: '/methodology/' },
];

const TICKER = [
  'Independent — No bias', 'Est. 2024', '512 brands tested',
  'No paid placements', 'Lab-verified dosing', 'Updated weekly',
  'Editorially independent', 'Funded by readers',
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tickerItems = [...TICKER, ...TICKER];

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>
      <header className="site-head">
        <div className="container">
          <div className="site-head-inner">
            <Link href="/" className="brand">
              <span className="brand-mark" />
              <span className="brand-name">
                <span>Fitlab</span>
                <span className="brand-sub">Reviews · No Bias</span>
              </span>
            </Link>
            <nav className="main-nav">
              {NAV.map(n => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={pathname?.startsWith(n.href.replace(/\/$/, '')) ? 'active' : ''}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="head-utils">
              <button
                className={`hamburger${drawerOpen ? ' open' : ''}`}
                aria-label="Menu"
                onClick={() => setDrawerOpen(true)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-overlay" onClick={() => setDrawerOpen(false)} />
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-head">
            <div className="md-brand">
              <span className="brand-mark" style={{ width: 24, height: 24 }} />
              <span className="brand-name">
                <span>Fitlab</span>
                <span className="brand-sub">Reviews</span>
              </span>
            </div>
            <button className="md-close" onClick={() => setDrawerOpen(false)}>×</button>
          </div>
          <nav className="mobile-drawer-nav">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className={pathname?.startsWith(n.href.replace(/\/$/, '')) ? 'active' : ''}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="dn-i">{String(i + 1).padStart(2, '0')}</span>
                <span>{n.label}</span>
                <span className="dn-arr">→</span>
              </Link>
            ))}
          </nav>
          <div className="mobile-drawer-cta">
            <Link href="/reviews/" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setDrawerOpen(false)}>
              See all reviews →
            </Link>
            <div className="md-stats">
              <div><b>512</b>Tested</div>
              <div><b>19%</b>Failed</div>
              <div><b>$0</b>Affiliate</div>
            </div>
          </div>
          <div className="mobile-drawer-foot">
            <span className="kicker">Funded by readers · No bias</span>
          </div>
        </div>
      </div>
    </>
  );
}

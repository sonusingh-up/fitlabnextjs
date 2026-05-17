/* ============================================================
   FITLAB — Shared chrome injector
   Loads on each page, injects header + footer + mobile drawer.
   ============================================================ */

(function() {
  // ===== Detect base path (preview environments may host under /serve/...) =====
  // In production this is just '/'. In preview, may be '/projects/<id>/serve/'.
  const BASE = (function() {
    const p = window.location.pathname;
    const m = p.match(/^(.*\/serve\/)/);
    return m ? m[1] : '/';
  })();
  window.FITLAB = window.FITLAB || {};
  window.FITLAB.basePath = BASE;

  // Intercept clicks on absolute root-level links and rewrite to BASE+path
  if (BASE !== '/') {
    document.addEventListener('click', function(e) {
      const a = e.target.closest('a[href^="/"]');
      if (!a) return;
      const href = a.getAttribute('href');
      // Skip protocol-relative, hash, mailto, etc.
      if (href.startsWith('//') || href.startsWith('#')) return;
      e.preventDefault();
      window.location.href = BASE + href.slice(1);
    });
  }

  const NAV = [
    { label: 'Reviews',     href: '/reviews/',     key: 'reviews' },
    { label: 'Brands',      href: '/brands/',      key: 'brands' },
    { label: 'Ingredients', href: '/ingredients/', key: 'ingredients' },
    { label: 'Best',        href: '/best/',        key: 'best' },
    { label: 'Research',    href: '/research/',    key: 'research' },
    { label: 'Blog',        href: '/blog/',        key: 'blog' },
    { label: 'Methodology', href: '/methodology/', key: 'methodology' },
  ];

  function renderHeader() {
    const active = document.body.dataset.page || '';
    const ticker = [
      'Independent — No bias',
      'Est. 2024',
      '512 brands tested',
      'No paid placements',
      'Lab-verified dosing',
      'Updated weekly',
      'Editorially independent',
      'Funded by readers',
    ];
    const tickerHTML = ticker.concat(ticker).map(t => `<span class="ticker-item">${t}</span>`).join('');

    const nav = NAV.map(n => `
      <a href="${n.href}" class="${active === n.key ? 'active' : ''}">${n.label}</a>
    `).join('');

    const drawerNav = NAV.map(n => `
      <a href="${n.href}" class="${active === n.key ? 'active' : ''}"><span class="dn-i">${String(NAV.indexOf(n)+1).padStart(2,'0')}</span><span>${n.label}</span><span class="dn-arr">→</span></a>
    `).join('');

    const html = `
      <div class="ticker"><div class="ticker-track">${tickerHTML}</div></div>
      <header class="site-head">
        <div class="container">
          <div class="site-head-inner">
            <a href="/" class="brand">
              <span class="brand-mark"></span>
              <span class="brand-name">
                <span>Fitlab</span>
                <span class="brand-sub">Reviews · No Bias</span>
              </span>
            </a>
            <nav class="main-nav">${nav}</nav>
            <div class="head-utils">
              <button class="icon-btn search-btn-mobile" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <a href="/methodology/" class="btn btn-red free-report-btn" style="white-space: nowrap;">Free Report</a>
              <button class="hamburger" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <div class="mobile-drawer-overlay"></div>
        <aside class="mobile-drawer-panel">
          <div class="mobile-drawer-head">
            <div class="md-brand">
              <span class="brand-mark"></span>
              <span class="brand-name"><span>Fitlab</span><span class="brand-sub">Reviews · No Bias</span></span>
            </div>
            <button class="md-close" aria-label="Close menu">×</button>
          </div>

          <div class="mobile-drawer-search">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input type="text" placeholder="Search 512 reviews"/>
          </div>

          <nav class="mobile-drawer-nav">${drawerNav}</nav>

          <div class="mobile-drawer-cta">
            <a href="/methodology/" class="btn btn-red btn-lg" style="display:block; text-align:center; width:100%;">Free Report →</a>
            <div class="md-stats">
              <div><b>512</b> brands tested</div>
              <div><b>$0</b> affiliate income</div>
              <div><b>28k</b> readers</div>
            </div>
          </div>

          <div class="mobile-drawer-foot">
            <span class="kicker">EST. 2024 · BROOKLYN, NY</span>
          </div>
        </aside>
      </div>
    `;
    const host = document.getElementById('site-head-mount');
    if (host) host.innerHTML = html;

    // Wire hamburger
    const ham = document.querySelector('.hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.querySelector('.mobile-drawer-overlay');
    const closeBtn = document.querySelector('.md-close');

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      ham.setAttribute('aria-expanded', 'true');
      ham.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      ham.setAttribute('aria-expanded', 'false');
      ham.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (ham) ham.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
    if (overlay) overlay.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    // Close on link click
    document.querySelectorAll('.mobile-drawer-nav a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });
    // Close on Esc
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  function renderFooter() {
    const html = `
      <footer class="site-foot">
        <div class="container">
          <div class="foot-top">
            <div class="foot-brand">
              <div class="d-2">No bias.<br/>No paid<br/>placements.</div>
              <p>Independent supplement research. We buy every product at retail, send it to a third-party lab, and publish what we find — even when brands wish we wouldn't.</p>
              <div class="row foot-cta-row" style="gap: 8px;">
                <a href="#" class="btn btn-red">Get the report</a>
                <a href="/methodology/" class="btn btn-ghost" style="color: var(--paper); border-color: var(--ink-3);">How we test</a>
              </div>
            </div>
            <div class="foot-col">
              <h4>Discover</h4>
              <ul>
                <li><a href="/reviews/">All Reviews</a></li>
                <li><a href="/brands/">All Brands</a></li>
                <li><a href="/ingredients/">Ingredient Library</a></li>
                <li><a href="/best/">Best Of 2026</a></li>
                <li><a href="/research/">Research Briefs</a></li>
                <li><a href="/blog/">Blog</a></li>
              </ul>
            </div>
            <div class="foot-col">
              <h4>Categories</h4>
              <ul>
                <li><a href="/best/">Whey Protein</a></li>
                <li><a href="/best/">Pre-Workout</a></li>
                <li><a href="/best/">Creatine</a></li>
                <li><a href="/best/">Multivitamin</a></li>
                <li><a href="/best/">Omega-3</a></li>
                <li><a href="/best/">Greens</a></li>
              </ul>
            </div>
            <div class="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/about/">About</a></li>
                <li><a href="/methodology/">Methodology</a></li>
                <li><a href="/about/">Conflicts Policy</a></li>
                <li><a href="/about/">Editorial Standards</a></li>
                <li><a href="/about/">Corrections</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div class="foot-col foot-news">
              <h4>Weekly Brief</h4>
              <p style="font-size: 12px; color: var(--mute-2); margin: 0 0 14px;">One email. New tests, ingredient breakdowns, recalls. Zero affiliate hype.</p>
              <div class="newsletter-input">
                <input type="email" placeholder="you@domain.com"/>
                <button>Join</button>
              </div>
              <div style="font-family: var(--f-mono); font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute);">
                28,412 subscribers
              </div>
            </div>
          </div>
          <div class="foot-bot">
            <div class="legal">© 2026 Fitlab Reviews LLC · Made in Brooklyn, NY · v2.4.1</div>
            <div class="links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="/about/">Disclosures</a>
              <a href="#">RSS</a>
              <a href="#">Press</a>
            </div>
          </div>
        </div>
      </footer>
    `;
    const host = document.getElementById('site-foot-mount');
    if (host) host.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();

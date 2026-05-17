/* ============================================================
   FITLAB — Shared sidebar renderer
   Adapts per-page (reviews, blog, research, best)
   ============================================================ */

(function() {
  const RECENT = [
    { brand: 'Transparent Labs WPI', cat: 'Whey · Re-tested', score: 9.4, date: 'May 14' },
    { brand: 'Thorne Creatine', cat: 'Creatine · Re-tested', score: 9.2, date: 'May 11' },
    { brand: 'AG1', cat: 'Greens · Q2 re-test', score: 7.4, date: 'May 09' },
    { brand: 'Onnit Alpha Brain', cat: 'Nootropic · First test', score: 6.2, date: 'May 06', cls: 'lo' },
    { brand: 'Legion Pulse V2', cat: 'Pre-workout · Re-tested', score: 9.0, date: 'May 02' },
  ];

  const CATS_REVIEWS = [
    { l: 'Whey protein', n: 42, on: true },
    { l: 'Plant protein', n: 28 },
    { l: 'Creatine', n: 18 },
    { l: 'Pre-workout', n: 36 },
    { l: 'Multivitamin', n: 61 },
    { l: 'Omega-3', n: 24 },
    { l: 'Magnesium', n: 22 },
    { l: 'Greens', n: 17 },
    { l: 'Sleep', n: 19 },
    { l: 'Nootropic', n: 14 },
    { l: 'Probiotics', n: 26 },
    { l: 'Vitamin D', n: 21 },
  ];

  const CATS_BLOG = [
    { l: 'Opinion', n: 28 },
    { l: 'Field reports', n: 19, on: true },
    { l: 'Explainers', n: 34 },
    { l: 'Recall watch', n: 12 },
    { l: 'Behind the score', n: 22 },
    { l: 'Industry', n: 17 },
  ];

  const CATS_RESEARCH = [
    { l: 'Meta-analysis', n: 14, on: true },
    { l: 'Ingredient deep-dive', n: 38 },
    { l: 'Lab reports', n: 24 },
    { l: 'Q-reports', n: 8 },
    { l: 'Pharmacokinetics', n: 11 },
    { l: 'Recalls & adverse', n: 9 },
  ];

  const CATS_BEST = [
    { l: 'Whey Protein', n: 1, on: true },
    { l: 'Plant Protein', n: 1 },
    { l: 'Creatine', n: 1 },
    { l: 'Pre-workout', n: 1 },
    { l: 'Multivitamin', n: 1 },
    { l: 'Omega-3', n: 1 },
    { l: 'Magnesium', n: 1 },
    { l: 'Greens', n: 1 },
    { l: 'Sleep', n: 1 },
    { l: 'Probiotics', n: 1 },
  ];

  const INGREDIENTS = [
    'L-Citrulline', 'Beta-Alanine', 'Creatine Mono', 'Caffeine', 'Theanine',
    'Whey Isolate', 'Casein', 'Pea Protein', 'Magnesium', 'Vit D3',
    'Omega-3 EPA', 'L-Tyrosine', 'Ashwagandha', 'Melatonin',
  ];

  const CERTS = [
    { c: 'green', s: 'NSF', n: 'NSF Certified for Sport', count: 64, on: true },
    { c: 'blue',  s: 'IS',  n: 'Informed Sport / Choice', count: 88 },
    { c: 'green', s: 'USP', n: 'USP Verified',           count: 22 },
    { c: 'amber', s: 'cGMP',n: 'cGMP Audited',           count: 134 },
    { c: '',      s: 'ORG', n: 'USDA Organic',           count: 38 },
  ];

  function html(strings, ...vals) {
    return strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ''), '');
  }

  function searchBlock(placeholder) {
    return `
      <div class="rail-block" style="padding-top: 0;">
        <div class="search-box">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="${placeholder}"/>
          <span class="kbd">⌘K</span>
        </div>
      </div>
    `;
  }

  function chipBlock(title, items) {
    const chips = items.map(i => `
      <span class="chip-filter ${i.on ? 'on' : ''}">${i.l}<span class="n">${i.n}</span></span>
    `).join('');
    return `
      <div class="rail-block">
        <h4>${title}<span class="count">${items.length}</span></h4>
        <div class="chips">${chips}</div>
      </div>
    `;
  }

  function rangeBlock() {
    return `
      <div class="rail-block">
        <h4>Score range<span class="count">7.0 – 10</span></h4>
        <div class="range">
          <div class="range-track">
            <div class="range-fill" style="left: 30%; right: 0%;"></div>
            <div class="range-handle" style="left: 30%;"></div>
            <div class="range-handle" style="left: 100%;"></div>
          </div>
          <div class="range-vals">
            <span>7.0</span>
            <span>10.0</span>
          </div>
          <div class="range-labels">
            <span>0</span><span>5</span><span>10</span>
          </div>
        </div>
      </div>
    `;
  }

  function certBlock() {
    const items = CERTS.map(c => `
      <label class="cert-item ${c.on ? 'on' : ''}">
        <span class="cert-mark ${c.c}">${c.s}</span>
        <span class="cert-name">${c.n}</span>
        <span class="cert-n">${c.count}</span>
      </label>
    `).join('');
    return `
      <div class="rail-block">
        <h4>Certification<span class="count">${CERTS.length}</span></h4>
        <div class="cert-list">${items}</div>
      </div>
    `;
  }

  function ingredientBlock() {
    return `
      <div class="rail-block">
        <h4>Ingredient<span class="count">14 / 312</span></h4>
        <div class="chips">
          ${INGREDIENTS.map(i => `<span class="chip-filter">${i}</span>`).join('')}
          <button style="font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--red); background: none; border: 0; text-transform: uppercase; padding: 4px 6px; cursor: pointer;">+ 298 more</button>
        </div>
      </div>
    `;
  }

  function recentBlock(label) {
    const items = RECENT.map(r => `
      <div class="rail-item">
        <div class="rail-img">${window.pickIllus(r.brand)}</div>
        <div class="rail-meta">
          <div class="rail-name">${r.brand}</div>
          <div class="rail-date">${r.cat} · ${r.date}</div>
        </div>
        <div class="rail-score ${r.cls || (r.score >= 8.5 ? 'hi' : (r.score < 7 ? 'lo' : ''))}">${r.score.toFixed(1)}</div>
      </div>
    `).join('');
    return `
      <div class="rail-block">
        <h4>${label || 'Recently tested'}<span class="count">live</span></h4>
        <div class="rail-list">${items}</div>
      </div>
    `;
  }

  function pickBlock() {
    return `
      <div class="rail-block">
        <h4>Editor's pick</h4>
        <a href="review.html" style="display: block; padding: 14px; background: var(--ink); color: var(--paper); border-radius: 2px;">
          <div style="font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.14em; color: var(--red); margin-bottom: 6px; text-transform: uppercase;">★ #1 WHEY PROTEIN</div>
          <div style="font-family: var(--f-display); font-weight: 700; font-size: 20px; line-height: 1.0; text-transform: uppercase; margin-bottom: 6px;">Transparent Labs WPI</div>
          <div style="font-family: var(--f-mono); font-size: 11px; color: var(--mute-2); letter-spacing: 0.05em; margin-bottom: 12px;">9.4/10 · The honest scoop.</div>
          <div style="font-family: var(--f-mono); font-size: 10px; color: var(--paper); letter-spacing: 0.12em; text-transform: uppercase; border-top: 1px solid var(--ink-3); padding-top: 8px;">Read review →</div>
        </a>
      </div>
    `;
  }

  function reset() {
    return `
      <div class="rail-block" style="padding-bottom: 0;">
        <button style="display: block; width: 100%; padding: 10px; font-family: var(--f-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--red); background: transparent; border: 1px solid var(--red); border-radius: 2px; cursor: pointer;">Reset all filters</button>
      </div>
    `;
  }

  window.renderSidebar = function(host, page) {
    if (!host) return;
    let cats = CATS_REVIEWS;
    let label = 'Category';
    let phold = 'Search 512 reviews';
    if (page === 'blog') { cats = CATS_BLOG; phold = 'Search posts'; }
    else if (page === 'research') { cats = CATS_RESEARCH; phold = 'Search briefs'; }
    else if (page === 'best') { cats = CATS_BEST; phold = 'Search categories'; }

    let blocks = [];
    blocks.push(searchBlock(phold));
    blocks.push(chipBlock(label, cats));

    if (page === 'reviews' || page === 'best') {
      blocks.push(rangeBlock());
      blocks.push(certBlock());
      blocks.push(ingredientBlock());
    }
    if (page === 'research') {
      blocks.push(rangeBlock());
      blocks.push(`
        <div class="rail-block">
          <h4>Evidence grade<span class="count">A-F</span></h4>
          <div class="chips">
            <span class="chip-filter on">A+ <span class="n">8</span></span>
            <span class="chip-filter on">A <span class="n">24</span></span>
            <span class="chip-filter">B <span class="n">38</span></span>
            <span class="chip-filter">C <span class="n">21</span></span>
            <span class="chip-filter">D <span class="n">12</span></span>
            <span class="chip-filter">F <span class="n">4</span></span>
          </div>
        </div>
      `);
    }
    if (page === 'blog') {
      blocks.push(`
        <div class="rail-block">
          <h4>Authors<span class="count">5</span></h4>
          <div class="chips">
            <span class="chip-filter on">Adrian K. <span class="n">38</span></span>
            <span class="chip-filter">Mira J. <span class="n">22</span></span>
            <span class="chip-filter">Dr. Park <span class="n">14</span></span>
            <span class="chip-filter">Sam L. <span class="n">12</span></span>
            <span class="chip-filter">Guest <span class="n">9</span></span>
          </div>
        </div>
      `);
    }
    blocks.push(recentBlock(page === 'blog' ? 'Latest posts' : page === 'research' ? 'Latest briefs' : 'Recently updated'));
    blocks.push(pickBlock());
    blocks.push(reset());

    host.innerHTML = blocks.join('');
  };
})();

/* ============================================================
   FITLAB — Filter engine
   Wires up sidebar chips, search inputs, sort selects, pagination.
   ============================================================ */

(function() {
  window.FITLAB = window.FITLAB || {};
  const F = window.FITLAB;

  /**
   * Build a filter controller over a collection.
   *
   * @param {Object} opts
   *   items: array of source items
   *   render: (visibleItems, ctx) => void  — called on every change with the filtered slice
   *   searchFields: string[] — keys to search across (default: ['name'])
   *   pageSize: number (default 12)
   *   filters: { [filterKey]: (item, value) => boolean }  — predicates per filter
   *   sorts: { [sortKey]: (a, b) => number }  — sort comparators
   *   defaultSort: string
   *   resultsEl, pagerEl, gridEl, chipsEl  — optional DOM hooks
   *   onCountChange: (visibleCount, totalCount) => void
   */
  F.createFilter = function(opts) {
    const state = {
      query: '',
      sort: opts.defaultSort || Object.keys(opts.sorts || {})[0] || null,
      filters: {},   // filterKey → Set of active values
      page: 1,
      pageSize: opts.pageSize || 12,
    };

    function matches(item) {
      // search
      if (state.query) {
        const q = state.query.toLowerCase();
        const fields = opts.searchFields || ['name'];
        const hit = fields.some(f => {
          const v = item[f];
          return v && String(v).toLowerCase().includes(q);
        });
        if (!hit) return false;
      }
      // filters
      for (const [key, values] of Object.entries(state.filters)) {
        if (!values || values.size === 0) continue;
        const pred = opts.filters && opts.filters[key];
        if (!pred) continue;
        let any = false;
        for (const v of values) {
          if (pred(item, v)) { any = true; break; }
        }
        if (!any) return false;
      }
      return true;
    }

    function apply() {
      let visible = opts.items.filter(matches);
      if (state.sort && opts.sorts && opts.sorts[state.sort]) {
        visible = visible.slice().sort(opts.sorts[state.sort]);
      }
      const total = visible.length;
      const start = (state.page - 1) * state.pageSize;
      const slice = visible.slice(start, start + state.pageSize);
      opts.render(slice, { state, total, all: visible });
      if (opts.onCountChange) opts.onCountChange(total, opts.items.length);
      renderPager(total);
    }

    function renderPager(total) {
      if (!opts.pagerEl) return;
      const pages = Math.max(1, Math.ceil(total / state.pageSize));
      if (pages <= 1) { opts.pagerEl.innerHTML = ''; return; }
      const cur = state.page;
      const items = [];
      items.push(`<a data-page="${Math.max(1, cur - 1)}" ${cur === 1 ? 'aria-disabled="true"' : ''}>←</a>`);
      for (let p = 1; p <= pages; p++) {
        if (p === 1 || p === pages || (p >= cur - 1 && p <= cur + 1)) {
          items.push(p === cur ? `<span class="on">${p}</span>` : `<a data-page="${p}">${p}</a>`);
        } else if (p === cur - 2 || p === cur + 2) {
          items.push('<span>…</span>');
        }
      }
      items.push(`<a data-page="${Math.min(pages, cur + 1)}" ${cur === pages ? 'aria-disabled="true"' : ''}>→</a>`);
      opts.pagerEl.innerHTML = items.join('');
      opts.pagerEl.querySelectorAll('a[data-page]').forEach(a =>
        a.addEventListener('click', e => {
          e.preventDefault();
          if (a.getAttribute('aria-disabled') === 'true') return;
          state.page = parseInt(a.dataset.page, 10);
          apply();
          // Scroll to top of results
          if (opts.gridEl) opts.gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
      );
    }

    function setQuery(q) { state.query = q || ''; state.page = 1; apply(); }
    function setSort(s) { state.sort = s; apply(); }
    function toggleFilter(key, value, on) {
      if (!state.filters[key]) state.filters[key] = new Set();
      const set = state.filters[key];
      const present = set.has(value);
      const target = (on === undefined) ? !present : !!on;
      if (target) set.add(value); else set.delete(value);
      state.page = 1;
      apply();
      renderActiveChips();
    }
    function clearAll() {
      state.query = '';
      state.filters = {};
      state.page = 1;
      apply();
      renderActiveChips();
      // Reflect in DOM controls
      if (opts.searchEl) opts.searchEl.value = '';
      document.querySelectorAll('.chip-filter.on, .cert-item.on').forEach(el =>
        el.classList.remove('on')
      );
    }

    function renderActiveChips() {
      if (!opts.activeEl) return;
      const chips = [];
      for (const [key, values] of Object.entries(state.filters)) {
        for (const v of values) {
          const label = opts.filterLabel ? opts.filterLabel(key, v) : v;
          chips.push(`<span class="chip-filter on" data-fk="${key}" data-fv="${escapeHtml(v)}">${label} <span class="x">×</span></span>`);
        }
      }
      if (state.query) {
        chips.push(`<span class="chip-filter on" data-fk="__query">"${escapeHtml(state.query)}" <span class="x">×</span></span>`);
      }
      if (chips.length) {
        chips.push(`<button class="ff-clear" style="font-family: var(--f-mono); font-size: 10px; letter-spacing: 0.1em; color: var(--mute); background: none; border: 0; text-transform: uppercase; padding: 0 8px; cursor: pointer;">Clear all →</button>`);
      }
      opts.activeEl.innerHTML = chips.join('');
      opts.activeEl.querySelectorAll('.chip-filter').forEach(el => {
        el.addEventListener('click', () => {
          const key = el.dataset.fk;
          const value = el.dataset.fv;
          if (key === '__query') { setQuery(''); if (opts.searchEl) opts.searchEl.value = ''; }
          else toggleFilter(key, value, false);
          // Also reflect in sidebar chips
          syncSidebarChip(key, value, false);
        });
      });
      const clr = opts.activeEl.querySelector('.ff-clear');
      if (clr) clr.addEventListener('click', clearAll);
    }

    function syncSidebarChip(key, value, on) {
      document.querySelectorAll(`.chip-filter[data-fk="${key}"][data-fv="${value}"], .cert-item[data-fk="${key}"][data-fv="${value}"]`).forEach(el => {
        el.classList.toggle('on', on);
      });
    }

    function bindSidebar() {
      document.querySelectorAll('.rail .chip-filter[data-fk], .rail .cert-item[data-fk]').forEach(el => {
        el.addEventListener('click', () => {
          const key = el.dataset.fk;
          const value = el.dataset.fv;
          const next = !el.classList.contains('on');
          el.classList.toggle('on', next);
          toggleFilter(key, value, next);
        });
      });
    }

    function bindSearch() {
      if (!opts.searchEl) return;
      let to;
      opts.searchEl.addEventListener('input', () => {
        clearTimeout(to);
        to = setTimeout(() => setQuery(opts.searchEl.value), 150);
      });
      // Also bind any other search box w/ class .ff-search
      document.querySelectorAll('.ff-search').forEach(el => {
        if (el === opts.searchEl) return;
        el.addEventListener('input', () => {
          clearTimeout(to);
          to = setTimeout(() => setQuery(el.value), 150);
        });
      });
    }

    function bindSort() {
      if (!opts.sortEl) return;
      opts.sortEl.addEventListener('change', () => setSort(opts.sortEl.value));
    }

    function bindClearButtons() {
      document.querySelectorAll('.ff-reset, [data-ff-reset]').forEach(el => {
        el.addEventListener('click', clearAll);
      });
    }

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    // Init
    bindSidebar();
    bindSearch();
    bindSort();
    bindClearButtons();
    apply();

    return {
      state, apply, setQuery, setSort, toggleFilter, clearAll
    };
  };

  // ===== Common card-renderer helpers =====
  F.rubricRow = function(label, val) {
    const cls = val >= 8.5 ? 'hi' : (val >= 7 ? 'mid' : 'lo');
    return `<div class="rb-row"><span class="rb-lbl">${label}</span><span class="rb-val">${val.toFixed(1)}</span><div class="rb-bar"><i class="${cls}" style="width:${val*10}%"></i></div></div>`;
  };

  F.reviewCardHTML = function(d) {
    const ribbon = d.pick
      ? `<span class="bcard-ribbon green">★ Editor's Choice</span>`
      : (d.flag === 'fail' ? `<span class="bcard-ribbon red">⚠ Failed lab</span>` : '');
    const rubrics = Object.entries(d.rubric || {}).map(([k,v]) => F.rubricRow(k, v)).join('');
    const tags = (d.tags || []).map(t => `<span class="tag ${t.c||''}">${t.c ? '<span class="dot"></span>' : ''}${t.t}</span>`).join('');
    const href = '/reviews/' + d.slug + '/';
    return `
      <article class="bcard">
        ${ribbon}
        <div class="bcard-head">
          <div class="bcard-img">${(window.PROD_ILLUS && window.PROD_ILLUS[d.illus]) || ''}</div>
          <div class="bcard-id">
            <div class="bcard-cat">${d.cat}</div>
            <h3 class="bcard-name">${d.brand}<br/><span style="font-size:0.66em;font-weight:600;color:var(--mute);">${d.product}</span></h3>
          </div>
          <div class="bcard-score ${F.scoreClass(d.score)}"><span class="n">${d.score.toFixed(1)}</span><span class="sub">/10</span></div>
        </div>
        <div class="bcard-rubric">${rubrics}</div>
        <div class="bcard-foot">
          <div class="bcard-tags">${tags}</div>
          <a href="${href}" class="bcard-link">Analysis</a>
        </div>
      </article>
    `;
  };
})();

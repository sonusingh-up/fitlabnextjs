/* ============================================================
   FITLAB — Data loader
   Fetches JSON content files and exposes them on window.FITLAB.data.
   Pages either await window.FITLAB.ready or listen for 'fitlab:data'.
   ============================================================ */

(function() {
  window.FITLAB = window.FITLAB || {};
  const F = window.FITLAB;
  F.data = F.data || {};

  // Base path detection (preview hosts may serve under .../serve/)
  const BASE = (function() {
    const p = window.location.pathname;
    const m = p.match(/^(.*\/serve\/)/);
    return m ? m[1] : '/';
  })();
  F.basePath = BASE;

  const FILES = {
    brands:      BASE + 'data/brands.json',
    ingredients: BASE + 'data/ingredients.json',
    reviews:     BASE + 'data/reviews.json',
    research:    BASE + 'data/research.json',
    blog:        BASE + 'data/blog.json',
  };

  // Helper for relative loads when running from file:// or sub-host
  function tryLoad(path) {
    return fetch(path).then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  // Try base-resolved first; fall back to ascending parent dirs
  function loadWithFallback(absPath) {
    // Build candidate paths by walking up
    const variants = [absPath];
    // Also try a series of relative paths
    const tail = absPath.replace(BASE, '');
    variants.push(tail);
    variants.push('../' + tail);
    variants.push('../../' + tail);
    variants.push('../../../' + tail);
    let i = 0;
    function tryNext() {
      if (i >= variants.length) {
        return Promise.reject(new Error('All paths failed for ' + absPath));
      }
      return tryLoad(variants[i++]).catch(() => tryNext());
    }
    return tryNext();
  }

  const promises = Object.entries(FILES).map(([key, path]) =>
    loadWithFallback(path).then(d => { F.data[key] = d; return [key, d]; })
                          .catch(e => { console.error('[fitlab] failed', key, e); return [key, null]; })
  );

  F.ready = Promise.all(promises).then(() => {
    document.dispatchEvent(new CustomEvent('fitlab:data', { detail: F.data }));
    return F.data;
  });

  // ===== URL helpers =====
  F.slugFromPath = function() {
    // /brands/transparent-labs/ → 'transparent-labs'
    // /brands/transparent-labs/index.html → 'transparent-labs'
    // /brands/ → ''
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return '';
    let last = parts[parts.length - 1];
    if (last.endsWith('.html')) last = parts[parts.length - 2] || '';
    // If it's just a top-level folder like "brands", no slug
    const topLevels = ['brands', 'ingredients', 'reviews', 'research', 'blog', 'best', 'methodology', 'about'];
    if (topLevels.includes(last)) return '';
    return last;
  };

  F.findBySlug = function(collection, slug) {
    if (!collection || !slug) return null;
    return collection.find(item => item.slug === slug) || null;
  };

  // ===== Format helpers =====
  F.fmtDate = function(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();
  };
  F.fmtDateShort = function(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
  };
  F.scoreClass = function(s) { return s >= 8.5 ? 'hi' : (s >= 7 ? 'mid' : 'lo'); };
  F.gradeClass = function(g) { return (g || '').replace('+', '').replace('-', '').charAt(0); };

  // ===== ENV =====
  F.env = {
    siteName: 'Fitlab Reviews',
    siteUrl: 'https://fitlabreviews.com',
    twitter: '@fitlabreviews',
  };
})();

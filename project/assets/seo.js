/* ============================================================
   FITLAB — SEO helper
   Injects JSON-LD structured data based on page type + entity.
   Each page sets `window.FITLAB.page = { type, entity }` before this loads.
   ============================================================ */

(function() {
  window.FITLAB = window.FITLAB || {};
  const F = window.FITLAB;

  const ORG = {
    "@type": "Organization",
    "name": "Fitlab Reviews",
    "url": "https://fitlabreviews.com",
    "logo": "https://fitlabreviews.com/assets/logo.svg",
    "sameAs": [
      "https://twitter.com/fitlabreviews",
      "https://www.linkedin.com/company/fitlabreviews"
    ]
  };

  function emit(schema) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  function breadcrumb(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  function ensureCanonical(url) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  function ensureMeta(name, content, attr) {
    attr = attr || 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  F.applySEO = function(pageInfo) {
    pageInfo = pageInfo || F.page || {};
    const path = window.location.pathname.replace(/index\.html$/, '');
    const canonical = (F.env && F.env.siteUrl ? F.env.siteUrl : 'https://fitlabreviews.com') + path;

    ensureCanonical(canonical);

    // Default OG
    const ogTitle = pageInfo.title || document.title;
    const ogDesc = pageInfo.description ||
      (document.querySelector('meta[name="description"]') || {}).content || '';
    const ogImage = pageInfo.image || (F.env.siteUrl + '/assets/og-default.png');

    ensureMeta('og:title', ogTitle, 'property');
    ensureMeta('og:description', ogDesc, 'property');
    ensureMeta('og:url', canonical, 'property');
    ensureMeta('og:site_name', 'Fitlab Reviews', 'property');
    ensureMeta('og:type', pageInfo.ogType || 'website', 'property');
    ensureMeta('og:image', ogImage, 'property');
    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:site', '@fitlabreviews');
    ensureMeta('twitter:title', ogTitle);
    ensureMeta('twitter:description', ogDesc);
    ensureMeta('twitter:image', ogImage);

    // Always emit organization + website
    emit({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fitlab Reviews",
      "url": "https://fitlabreviews.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://fitlabreviews.com/?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    });
    emit({ "@context": "https://schema.org", ...ORG });

    // Per-page type
    const type = pageInfo.type;
    const ent = pageInfo.entity || {};

    if (type === 'review' && ent.slug) {
      emit({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": (ent.brand ? ent.brand + ' ' : '') + (ent.product || ''),
          "brand": { "@type": "Brand", "name": ent.brand }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": ent.score,
          "bestRating": 10,
          "worstRating": 0
        },
        "author": { "@type": "Organization", "name": "Fitlab Research Team" },
        "publisher": ORG,
        "datePublished": ent.last_tested,
        "reviewBody": ent.blurb,
        "name": (ent.brand ? ent.brand + ' ' : '') + (ent.product || '') + ' — Independent Lab Review'
      });
      emit(breadcrumb([
        { name: 'Home', url: 'https://fitlabreviews.com/' },
        { name: 'Reviews', url: 'https://fitlabreviews.com/reviews/' },
        { name: ent.brand + ' ' + ent.product, url: canonical }
      ]));
    }

    if (type === 'brand' && ent.slug) {
      emit({
        "@context": "https://schema.org",
        "@type": "Brand",
        "name": ent.name,
        "description": ent.blurb,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": ent.score,
          "bestRating": 10,
          "ratingCount": ent.n_prod,
          "reviewCount": ent.n_prod
        }
      });
      emit(breadcrumb([
        { name: 'Home', url: 'https://fitlabreviews.com/' },
        { name: 'Brands', url: 'https://fitlabreviews.com/brands/' },
        { name: ent.name, url: canonical }
      ]));
    }

    if (type === 'ingredient' && ent.slug) {
      emit({
        "@context": "https://schema.org",
        "@type": "Substance",
        "name": ent.name,
        "alternateName": ent.alt_names ? ent.alt_names.split(' · ') : undefined,
        "description": ent.summary
      });
      emit(breadcrumb([
        { name: 'Home', url: 'https://fitlabreviews.com/' },
        { name: 'Ingredients', url: 'https://fitlabreviews.com/ingredients/' },
        { name: ent.name, url: canonical }
      ]));
    }

    if (type === 'research' && ent.slug) {
      emit({
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": ent.title,
        "description": ent.key,
        "author": { "@type": "Person", "name": ent.author },
        "publisher": ORG,
        "datePublished": ent.date,
        "wordCount": ent.mins ? ent.mins * 200 : undefined,
        "identifier": ent.id
      });
      emit(breadcrumb([
        { name: 'Home', url: 'https://fitlabreviews.com/' },
        { name: 'Research', url: 'https://fitlabreviews.com/research/' },
        { name: ent.id, url: canonical }
      ]));
    }

    if (type === 'blog' && ent.slug) {
      emit({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": ent.title,
        "description": ent.dek,
        "author": { "@type": "Person", "name": ent.author },
        "publisher": ORG,
        "datePublished": ent.date,
        "wordCount": ent.mins ? ent.mins * 200 : undefined
      });
      emit(breadcrumb([
        { name: 'Home', url: 'https://fitlabreviews.com/' },
        { name: 'Blog', url: 'https://fitlabreviews.com/blog/' },
        { name: ent.title, url: canonical }
      ]));
    }

    // Index pages also get a BreadcrumbList
    if (type === 'index') {
      const parts = path.split('/').filter(Boolean);
      const crumbs = [{ name: 'Home', url: 'https://fitlabreviews.com/' }];
      let url = 'https://fitlabreviews.com/';
      parts.forEach(p => { url += p + '/'; crumbs.push({ name: cap(p), url }); });
      emit(breadcrumb(crumbs));

      if (pageInfo.faq) {
        emit({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": pageInfo.faq.map(qa => ({
            "@type": "Question",
            "name": qa.q,
            "acceptedAnswer": { "@type": "Answer", "text": qa.a }
          }))
        });
      }
    }
  };

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' '); }

  // Auto-run on DOMContentLoaded if window.FITLAB.page is already set
  document.addEventListener('DOMContentLoaded', () => {
    if (F.page) F.applySEO(F.page);
  });
})();

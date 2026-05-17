/* ============================================================
   FITLAB — Stylized supplement illustrations (silhouettes)
   Window.PROD_ILLUS map: id -> SVG string
   ============================================================ */

(function() {
  // 2-tone silhouettes — ink base, accent stripe. Sized to fit 64x80 viewport.
  const I = {};

  // Big protein tub (jug)
  I.tub = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="6" width="36" height="8" fill="#0a0a0a"/>
    <rect x="10" y="14" width="44" height="60" fill="#0a0a0a"/>
    <rect x="10" y="32" width="44" height="10" fill="#c8412b"/>
    <rect x="14" y="48" width="36" height="2" fill="#f6f4ef"/>
    <rect x="14" y="54" width="22" height="2" fill="#f6f4ef"/>
    <rect x="14" y="60" width="28" height="2" fill="#f6f4ef"/>
    <rect x="46" y="22" width="6" height="6" fill="#f6f4ef"/>
  </svg>`;

  // Capsule bottle
  I.bottle = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="4" width="20" height="10" fill="#0a0a0a"/>
    <rect x="14" y="14" width="36" height="60" rx="3" fill="#0a0a0a"/>
    <rect x="14" y="30" width="36" height="8" fill="#1f8a5b"/>
    <rect x="18" y="44" width="28" height="2" fill="#f6f4ef"/>
    <rect x="18" y="50" width="18" height="2" fill="#f6f4ef"/>
    <rect x="18" y="56" width="22" height="2" fill="#f6f4ef"/>
    <rect x="18" y="62" width="14" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Pre-workout shaker (taller, narrower)
  I.shaker = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="4" width="24" height="8" fill="#0a0a0a"/>
    <rect x="16" y="12" width="32" height="64" fill="#0a0a0a"/>
    <polygon points="16,12 48,12 50,20 14,20" fill="#c8412b"/>
    <rect x="20" y="30" width="24" height="2" fill="#f6f4ef"/>
    <rect x="20" y="38" width="24" height="2" fill="#f6f4ef"/>
    <rect x="20" y="46" width="24" height="2" fill="#f6f4ef"/>
    <rect x="20" y="54" width="24" height="2" fill="#f6f4ef"/>
    <rect x="20" y="62" width="24" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Powder pouch
  I.pouch = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="4" width="40" height="4" fill="#0a0a0a"/>
    <polygon points="12,8 52,8 56,76 8,76" fill="#0a0a0a"/>
    <rect x="14" y="20" width="36" height="14" fill="#c8412b"/>
    <rect x="18" y="42" width="28" height="2" fill="#f6f4ef"/>
    <rect x="18" y="48" width="20" height="2" fill="#f6f4ef"/>
    <rect x="18" y="56" width="24" height="2" fill="#f6f4ef"/>
    <rect x="18" y="62" width="16" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Liquid bottle (narrow neck)
  I.liquid = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="27" y="4" width="10" height="8" fill="#0a0a0a"/>
    <rect x="24" y="12" width="16" height="6" fill="#0a0a0a"/>
    <polygon points="24,18 40,18 50,26 14,26" fill="#0a0a0a"/>
    <rect x="14" y="26" width="36" height="50" fill="#0a0a0a"/>
    <rect x="14" y="40" width="36" height="10" fill="#1f8a5b"/>
    <rect x="18" y="56" width="28" height="2" fill="#f6f4ef"/>
    <rect x="18" y="62" width="20" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Stick pack
  I.stick = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="6" width="20" height="68" fill="#0a0a0a"/>
    <rect x="22" y="6" width="20" height="6" fill="#1f8a5b"/>
    <rect x="22" y="68" width="20" height="6" fill="#1f8a5b"/>
    <rect x="26" y="24" width="12" height="2" fill="#f6f4ef"/>
    <rect x="26" y="30" width="8" height="2" fill="#f6f4ef"/>
    <rect x="26" y="38" width="12" height="2" fill="#f6f4ef"/>
    <rect x="26" y="44" width="10" height="2" fill="#f6f4ef"/>
    <rect x="26" y="52" width="12" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Greens jar (wide)
  I.jar = `<svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="4" width="32" height="10" fill="#0a0a0a"/>
    <rect x="12" y="14" width="40" height="60" fill="#0a0a0a"/>
    <rect x="12" y="22" width="40" height="20" fill="#1f8a5b"/>
    <circle cx="18" cy="28" r="2" fill="#f6f4ef"/>
    <circle cx="26" cy="34" r="1.5" fill="#f6f4ef"/>
    <circle cx="38" cy="30" r="2" fill="#f6f4ef"/>
    <rect x="16" y="50" width="32" height="2" fill="#f6f4ef"/>
    <rect x="16" y="56" width="20" height="2" fill="#f6f4ef"/>
    <rect x="16" y="64" width="26" height="2" fill="#f6f4ef"/>
  </svg>`;

  // Default fallback — same as tub
  I.default = I.tub;

  // Cycle deterministically based on a string
  function pick(seed) {
    const keys = ['tub', 'bottle', 'shaker', 'pouch', 'liquid', 'stick', 'jar'];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return keys[Math.abs(h) % keys.length];
  }

  window.PROD_ILLUS = I;
  window.pickIllus = (seed) => I[pick(seed || 'x')];
})();

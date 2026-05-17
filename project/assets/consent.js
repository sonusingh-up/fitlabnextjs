/* ============================================================
   FITLAB — Cookie consent banner
   Minimal, dismissible, localStorage-persisted.
   ============================================================ */

(function() {
  const KEY = 'fitlab.consent.v1';
  const stored = (() => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } })();

  if (stored && stored.choice) {
    window.dispatchEvent(new CustomEvent('fitlab:consent', { detail: stored }));
    return;
  }

  const css = `
    .fl-consent {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: var(--ink, #0a0a0a); color: var(--paper, #f6f4ef);
      border-top: 2px solid var(--red, #c8412b);
      padding: 16px 20px;
      z-index: 200;
      box-shadow: 0 -8px 24px rgba(0,0,0,0.25);
      animation: flcsl 0.25s ease-out;
    }
    @keyframes flcsl { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .fl-consent-inner {
      max-width: 1440px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr auto auto;
      gap: 18px; align-items: center;
    }
    .fl-consent .lbl {
      font-family: var(--f-mono, monospace);
      font-size: 10.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--red, #c8412b);
      font-weight: 700;
      margin-bottom: 4px;
    }
    .fl-consent .txt {
      font-size: 13px;
      line-height: 1.5;
      color: var(--paper, #f6f4ef);
      opacity: 0.9;
    }
    .fl-consent .txt a {
      color: var(--paper, #f6f4ef);
      text-decoration: underline;
      text-decoration-color: var(--red, #c8412b);
      text-underline-offset: 3px;
    }
    .fl-consent button {
      font-family: var(--f-mono, monospace);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 12px 18px;
      border: 1px solid currentColor;
      background: transparent;
      color: var(--paper, #f6f4ef);
      cursor: pointer;
      white-space: nowrap;
    }
    .fl-consent button:hover { background: var(--paper, #f6f4ef); color: var(--ink, #0a0a0a); }
    .fl-consent button.primary {
      background: var(--red, #c8412b); border-color: var(--red, #c8412b);
    }
    .fl-consent button.primary:hover { background: var(--paper, #f6f4ef); color: var(--ink, #0a0a0a); border-color: var(--paper, #f6f4ef); }
    @media (max-width: 720px) {
      .fl-consent { padding: 14px 16px; }
      .fl-consent-inner { grid-template-columns: 1fr; gap: 12px; }
      .fl-consent .txt { font-size: 12.5px; }
      .fl-consent .btn-row { display: flex; gap: 8px; }
      .fl-consent button { padding: 10px 14px; font-size: 10.5px; flex: 1; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function mount() {
    const el = document.createElement('div');
    el.className = 'fl-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML = `
      <div class="fl-consent-inner">
        <div>
          <div class="lbl">// COOKIE NOTICE</div>
          <div class="txt">We use essential cookies and one analytics cookie (privacy-first, no tracking pixels). No advertising cookies, no third-party retargeting. See our <a href="/about/#privacy">privacy notice</a>.</div>
        </div>
        <div class="btn-row" style="display: flex; gap: 8px;">
          <button class="reject" type="button">Essential only</button>
          <button class="primary accept" type="button">Accept all</button>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    function decide(choice) {
      const data = { choice: choice, at: new Date().toISOString() };
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
      window.dispatchEvent(new CustomEvent('fitlab:consent', { detail: data }));
      el.style.transition = 'transform 0.25s ease-in, opacity 0.2s';
      el.style.transform = 'translateY(100%)';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 280);
    }
    el.querySelector('.accept').addEventListener('click', () => decide('all'));
    el.querySelector('.reject').addEventListener('click', () => decide('essential'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();

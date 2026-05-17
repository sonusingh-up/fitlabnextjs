'use client';
import { useState, useEffect } from 'react';

const CONSENT_KEY = 'fitlab.consent.v1';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      if (!stored?.choice) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: 'accept', ts: Date.now() })); } catch {}
    setVisible(false);
  }
  function decline() {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: 'decline', ts: Date.now() })); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fl-consent">
      <div className="fl-consent-inner">
        <div>
          <div className="lbl">Cookie notice</div>
          <div className="txt">
            We use cookies for analytics and to remember your preferences. No tracking pixels or ad cookies.{' '}
            <a href="/about/">Privacy policy</a>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ color: 'var(--paper)', borderColor: 'var(--mute)' }} onClick={decline}>
          Decline
        </button>
        <button className="btn btn-red" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}

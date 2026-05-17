import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Fitlab Reviews — how we collect, use, and protect your data.',
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--line)', padding: '48px 0 36px' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'var(--mute)' }}>Home</Link>
            {' › '}
            Privacy Policy
          </div>
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>LEGAL</div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.05, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--mute)', letterSpacing: '0.06em' }}>
            Last updated: <strong>March 1, 2025</strong> · Effective date: March 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr min(260px, 30%)', gap: '64px', alignItems: 'start' }}>

            {/* Main content */}
            <main>
              {/* Summary callout */}
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderLeft: '4px solid var(--ink)',
                padding: '20px 24px',
                marginBottom: 48,
                fontFamily: 'var(--f-sans)',
                fontSize: 14,
                color: 'var(--ink)',
                lineHeight: 1.7,
              }}>
                <strong>Summary:</strong> Fitlab Reviews collects limited data to operate the site and improve your experience. We use Google Analytics for traffic insights, affiliate links that may set cookies, and an email newsletter you can unsubscribe from at any time. We do not sell your personal data.
              </div>

              <LegalSection id="data-collection" number="01" title="Data Collection">
                <p>We collect the following types of information when you use our website:</p>
                <ul>
                  <li><strong>Usage data:</strong> Pages visited, time on site, browser type, IP address (anonymized), referring URL — collected automatically via Google Analytics.</li>
                  <li><strong>Email address:</strong> Only if you voluntarily subscribe to our newsletter. We never add you without your explicit consent.</li>
                  <li><strong>Cookies:</strong> We use cookies for analytics (Google Analytics) and affiliate tracking. See the Cookies section below for full details.</li>
                  <li><strong>Contact form submissions:</strong> Your name and email if you submit a contact form. This data is used solely to respond to your message.</li>
                </ul>
                <p>We do <strong>not</strong> collect payment information, government IDs, or any sensitive personal data.</p>
              </LegalSection>

              <LegalSection id="how-we-use-data" number="02" title="How We Use Data">
                <p>We use the data we collect for the following purposes:</p>
                <ul>
                  <li>To understand how visitors use our site and improve content quality (Google Analytics)</li>
                  <li>To send you our email newsletter if you subscribed (you can unsubscribe any time)</li>
                  <li>To respond to messages or inquiries sent via our contact form</li>
                  <li>To track affiliate link clicks and earn commissions from our affiliate partners</li>
                </ul>
                <p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
                <p>Affiliate relationships never influence our product scores or recommendations. We recommend products because they are genuinely good, not because they pay higher commissions.</p>
              </LegalSection>

              <LegalSection id="cookies" number="03" title="Cookies">
                <p>We use the following cookies on Fitlab Reviews:</p>
                <ul>
                  <li><strong>Google Analytics cookies</strong> (_ga, _gid, _gat): Used to track page views, session duration, and traffic sources. Data is anonymized. You can review{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Google&apos;s Privacy Policy</a>.
                  </li>
                  <li><strong>Affiliate tracking cookies:</strong> Set by our affiliate networks when you click a product link. These track whether a purchase was referred from our site.</li>
                </ul>
                <p>You can disable cookies in your browser settings at any time. Note that disabling cookies may affect the functionality of some features. To opt out of Google Analytics tracking specifically, use the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>.
                </p>
              </LegalSection>

              <LegalSection id="third-party-links" number="04" title="Third-Party Links">
                <p>We use the following third-party services that may collect data independently:</p>
                <ul>
                  <li><strong>Google Analytics</strong> — website traffic analytics</li>
                  <li><strong>Google Fonts</strong> — font delivery (may log request metadata)</li>
                  <li><strong>Amazon Associates</strong> — affiliate link tracking for qualifying purchases</li>
                  <li><strong>Email newsletter provider</strong> — stores subscriber email addresses</li>
                </ul>
                <p>Each of these services operates under its own privacy policy. Our website also contains links to third-party websites for your convenience. We have no control over, and are not responsible for, the content or privacy practices of any third-party site.</p>
                <p>Depending on your location, you may have the following rights regarding your personal data: access, correction, deletion, and the right to unsubscribe from our email newsletter at any time. EU residents have all rights under GDPR. California residents have rights under CCPA (we do not sell data). To exercise any of these rights, email us at the address below.</p>
              </LegalSection>

              <LegalSection id="contact" number="05" title="Contact">
                <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong>{' '}
                    <a href="mailto:contact@fitlabreviews.com" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>contact@fitlabreviews.com</a>
                  </li>
                  <li><strong>Website:</strong>{' '}
                    <Link href="/about/" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>fitlabreviews.com/about</Link>
                  </li>
                </ul>
                <p>We will respond within 30 days. We may update this Privacy Policy from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated policy.</p>
              </LegalSection>
            </main>

            {/* Sticky sidebar TOC */}
            <aside style={{ position: 'sticky', top: 80 }}>
              <div style={{ border: '1px solid var(--line)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 16 }}>
                  Contents
                </div>
                <nav>
                  {[
                    { id: 'data-collection', label: '01 Data Collection' },
                    { id: 'how-we-use-data', label: '02 How We Use Data' },
                    { id: 'cookies', label: '03 Cookies' },
                    { id: 'third-party-links', label: '04 Third-Party Links' },
                    { id: 'contact', label: '05 Contact' },
                  ].map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        display: 'block',
                        fontFamily: 'var(--f-mono)',
                        fontSize: 11,
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        padding: '8px 0',
                        borderBottom: '1px solid var(--line)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div style={{ marginTop: 20, fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--mute)', lineHeight: 1.65 }}>
                  Last updated: March 1, 2025<br />
                  <a href="mailto:contact@fitlabreviews.com" style={{ color: 'var(--ink)' }}>Email us →</a>
                </div>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '20px', marginTop: 16 }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 12 }}>
                  Related
                </div>
                <Link href="/terms/" style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: 13, color: 'var(--ink)', textDecoration: 'none', fontWeight: 600, padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  Terms of Use →
                </Link>
                <Link href="/about/" style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: 13, color: 'var(--ink)', textDecoration: 'none', fontWeight: 600, padding: '6px 0' }}>
                  About Fitlab →
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}

function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} style={{ marginBottom: 48, paddingTop: 8 }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
        {number}
      </div>
      <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--f-sans)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

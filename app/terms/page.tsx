import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Fitlab Reviews — rules for using our website, affiliate disclaimer, and medical disclaimer.',
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--line)', padding: '48px 0 36px' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 12 }}>
            <Link href="/" style={{ color: 'var(--mute)' }}>Home</Link>
            {' › '}
            Terms of Use
          </div>
          <div className="kicker" style={{ color: 'var(--red)', marginBottom: 16 }}>LEGAL</div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.05, marginBottom: 16 }}>
            Terms of Use
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
              {/* Medical disclaimer callout */}
              <div style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderLeft: '4px solid var(--red)',
                padding: '20px 24px',
                marginBottom: 48,
                fontFamily: 'var(--f-sans)',
                fontSize: 14,
                color: 'var(--ink)',
                lineHeight: 1.7,
              }}>
                <strong>Medical Disclaimer:</strong> The content on Fitlab Reviews is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before starting any supplement, diet, or fitness program.
              </div>

              <LegalSection id="use-of-content" number="01" title="Use of Content">
                <p>All content published on Fitlab Reviews — including text, graphics, logos, review scores, and methodology — is the intellectual property of Fitlab Reviews and is protected by applicable copyright laws.</p>
                <p>You may:</p>
                <ul>
                  <li>Read and share links to articles for personal, non-commercial use</li>
                  <li>Quote brief excerpts (under 50 words) with clear attribution and a link back to the original article</li>
                </ul>
                <p>You may <strong>not</strong>:</p>
                <ul>
                  <li>Reproduce or republish our full articles or reviews without written permission</li>
                  <li>Scrape, copy, or use our content for AI training datasets without permission</li>
                  <li>Use our Fitlab scores or review methodology as your own without attribution</li>
                  <li>Use our name or logo without prior written consent</li>
                </ul>
                <p>By accessing or using Fitlab Reviews, you agree to be bound by these Terms of Use. We reserve the right to update these Terms at any time. Continued use of the site constitutes acceptance of the updated Terms.</p>
                <p>For content licensing or partnership inquiries, contact us at{' '}
                  <a href="mailto:contact@fitlabreviews.com" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>contact@fitlabreviews.com</a>.
                </p>
              </LegalSection>

              <LegalSection id="affiliate-disclosure" number="02" title="Affiliate Disclosure">
                <p>Fitlab Reviews is a participant in the Amazon Associates affiliate program. When you click a link on our site and make a purchase, we may earn an affiliate commission at <strong>no additional cost to you</strong>. These commissions help fund the operation of this website.</p>
                <p>Our affiliate relationships <strong>do not influence our editorial content, product scores, or recommendations</strong>. We maintain editorial independence and will recommend — or not recommend — products based solely on their quality and value to our readers.</p>
                <p>In compliance with the FTC&apos;s guidelines on endorsements and testimonials, all affiliate links on this site are clearly disclosed at the point of use.</p>
                <p>We make every effort to ensure the accuracy of our reviews, ingredient analyses, and pricing information. However, product formulas can change without notice and prices fluctuate — always check the manufacturer&apos;s label for the most current information. Fitlab Reviews makes no warranties, express or implied, about the completeness, accuracy, or reliability of the information on this site.</p>
              </LegalSection>

              <LegalSection id="disclaimers" number="03" title="Disclaimers">
                <p>Fitlab Reviews provides information about dietary supplements and fitness products for <strong>general informational and educational purposes only</strong>. Our content is not intended to be, and should not be construed as, medical advice.</p>
                <p>Specifically:</p>
                <ul>
                  <li>We are not medical doctors, pharmacists, or licensed healthcare professionals</li>
                  <li>Our reviews and recommendations are based on ingredient research — not clinical trials conducted by us</li>
                  <li>Supplement effects can vary widely between individuals based on health status, medications, and genetics</li>
                  <li>Always consult your doctor or a qualified healthcare professional before starting any new supplement, especially if you have a pre-existing medical condition, are pregnant, breastfeeding, or taking prescription medications</li>
                </ul>
                <p>The FDA has not evaluated the statements made about the supplements reviewed on this site. Dietary supplements are not intended to diagnose, treat, cure, or prevent any disease.</p>
                <p>To the fullest extent permitted by law, Fitlab Reviews and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website, any supplement you purchase based on content from this site, or any third-party content or websites linked from this site. You use this website and act on its information entirely at your own risk.</p>
              </LegalSection>

              <LegalSection id="contact" number="04" title="Contact">
                <p>If you have any questions about these Terms of Use, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong>{' '}
                    <a href="mailto:contact@fitlabreviews.com" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>contact@fitlabreviews.com</a>
                  </li>
                  <li><strong>Website:</strong>{' '}
                    <Link href="/about/" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>fitlabreviews.com/about</Link>
                  </li>
                </ul>
                <p>These Terms of Use shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from your use of this site shall be subject to the exclusive jurisdiction of courts located in the United States.</p>
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
                    { id: 'use-of-content', label: '01 Use of Content' },
                    { id: 'affiliate-disclosure', label: '02 Affiliate Disclosure' },
                    { id: 'disclaimers', label: '03 Disclaimers' },
                    { id: 'contact', label: '04 Contact' },
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
              <div style={{ border: '1px solid var(--line)', borderLeft: '4px solid var(--red)', padding: '20px', marginTop: 16, background: 'var(--paper)' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 8 }}>
                  Not Medical Advice
                </div>
                <p style={{ fontFamily: 'var(--f-sans)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
                  This site does not provide medical advice. Always consult a qualified healthcare provider before taking any supplement.
                </p>
              </div>
              <div style={{ border: '1px solid var(--line)', padding: '20px', marginTop: 16 }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 12 }}>
                  Related
                </div>
                <Link href="/privacy/" style={{ display: 'block', fontFamily: 'var(--f-sans)', fontSize: 13, color: 'var(--ink)', textDecoration: 'none', fontWeight: 600, padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
                  Privacy Policy →
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

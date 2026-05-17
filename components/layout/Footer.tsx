import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="d-2">Fitlab<br/>Reviews</div>
            <p>Independent supplement testing since 2024. We buy every product at retail. No samples. No sponsorships. No affiliate income.</p>
            <div className="newsletter-input">
              <input type="email" placeholder="your@email.com" />
              <button type="button">Subscribe →</button>
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute-2)' }}>
              Free. Unsubscribe anytime. No tracking pixels.
            </div>
          </div>
          <div className="foot-col">
            <h4>Reviews</h4>
            <ul>
              <li><Link href="/reviews/">All Reviews</Link></li>
              <li><Link href="/reviews/">Whey Protein</Link></li>
              <li><Link href="/reviews/">Creatine</Link></li>
              <li><Link href="/reviews/">Pre-Workout</Link></li>
              <li><Link href="/reviews/">Multivitamins</Link></li>
              <li><Link href="/reviews/">Omega-3</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/brands/">Brands</Link></li>
              <li><Link href="/ingredients/">Ingredients</Link></li>
              <li><Link href="/best/">Best of 2026</Link></li>
              <li><Link href="/research/">Research</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/methodology/">Methodology</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/about/">Press</Link></li>
              <li><Link href="/about/">Contact</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/about/">Privacy Policy</Link></li>
              <li><Link href="/about/">Terms of Use</Link></li>
              <li><Link href="/about/">Disclaimer</Link></li>
              <li><Link href="/about/">Corrections</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span className="legal">© 2026 Fitlab Reviews LLC · All rights reserved</span>
          <div className="links">
            <Link href="/about/">Privacy</Link>
            <Link href="/about/">Terms</Link>
            <Link href="/methodology/">Methodology</Link>
            <Link href="/about/">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

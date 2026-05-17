import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsentBanner from '@/components/layout/ConsentBanner';

export const metadata: Metadata = {
  title: { default: 'Fitlab Reviews — Independent Supplement Testing', template: '%s · Fitlab Reviews' },
  description: 'Independent supplement research. 512 products lab-tested at retail. No paid placements, no affiliate-driven scoring.',
  metadataBase: new URL('https://fitlabreviews.com'),
  openGraph: {
    siteName: 'Fitlab Reviews',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
        <ConsentBanner />
      </body>
    </html>
  );
}

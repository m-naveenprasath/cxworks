import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { BackgroundGlow } from '@/components/layout/BackgroundGlow';
import { Footer } from '@/components/layout/Footer';
import { Marquee } from '@/components/layout/Marquee';
import { SiteEffects } from '@/components/layout/SiteEffects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { UIProvider } from '@/components/layout/UIProvider';
import { Analytics } from '@/components/seo/Analytics';
import { SITE } from '@/lib/site';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/hover.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: SITE.name, type: 'website', locale: SITE.locale },
  twitter: { card: 'summary_large_image' },
  ...(SITE.searchConsoleVerification ? { verification: { google: SITE.searchConsoleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

/**
 * Runs before paint:
 *  - marks the document as JS-enabled (reveal animations only hide content when JS can show it again),
 *  - forwards old single-page URLs (cxworks.com/#/services/…) to their real pages.
 */
const BOOT = `document.documentElement.classList.add('js');if(location.hash.indexOf('#/')===0)location.replace('/'+location.hash.slice(2));`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-flat: the flat glass theme the site always used (see styles/globals.css).
    <html lang="en" data-flat="" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <UIProvider>
          <BackgroundGlow />
          <SiteEffects />
          <SiteHeader />
          <main>{children}</main>
          <Marquee />
          <Footer />
        </UIProvider>
        <Analytics />
      </body>
    </html>
  );
}

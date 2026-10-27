import Script from 'next/script';
import { SITE } from '@/lib/site';

/** Google Analytics 4. Rendered only when NEXT_PUBLIC_GA_ID is set. Page views on client-side
 *  navigation are tracked by GA4 enhanced measurement (browser history events). */
export function Analytics() {
  if (!SITE.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.gaId}');`}
      </Script>
    </>
  );
}

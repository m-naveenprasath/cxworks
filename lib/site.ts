/** Site-wide settings. Values that differ per environment come from .env (see .env.example). */
export const SITE = {
  name: 'CXWorks',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://cxworks.com').replace(/\/$/, ''),
  title: 'CXWorks | Premium DCX Partner for eCommerce Brands',
  description:
    'CXWorks helps eCommerce businesses improve customer experience, analytics, CRO, merchandising, and digital growth through one connected operating system.',
  tagline: 'Making your website Cited, Clicked, Chosen.',
  locale: 'en_US',
  themeColor: '#000000',
  logo: '/images/cxworks-logo.svg',
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || 'https://formspree.io/f/mvkkoyve',
  productsUrl: 'https://products.cxworks.com/',
  phone: { label: '+1 (725) 325 5270', href: 'tel:+17253255270' },
  email: 'info@cxworks.com',
  support: ['idris@cxworks.com', 'rithik@cxworks.com', 'sowmya@cxworks.com'],
  linkedin: 'https://www.linkedin.com/company/cxworks-official/',
  address: {
    streetAddress: '5755 North Point Pkwy',
    addressLocality: 'Alpharetta',
    addressRegion: 'GA',
    addressCountry: 'US',
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  searchConsoleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
} as const;

export const absoluteUrl = (path = '/') => SITE.url + (path.startsWith('/') ? path : '/' + path);

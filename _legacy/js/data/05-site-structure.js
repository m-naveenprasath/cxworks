/* window.CXD — every page and its list of blocks, plus services, audits, gates, cases. */
/* CXWorks DCX site content. One object per page; every page is a list of blocks rendered by CXWorks Site Editorial.dc.html. */
(function () {
  const SCAN = { l: 'Get your free AI scan', href: '#/free-ai-scan' };
  const DIAG = { l: 'Book a DCX Diagnostic', href: '#/services/dcx-transformation/dcx-audit' };
  const GATES = [
    {
      stage: 'Cited',
      tag: 'Can they find you?',
      gates: [
        ['Discoverability', 'Showing up in Google, AI answers and marketplaces when buyers search.'],
        ['Findability', 'Search, menus and filters that get people to the right product or page fast.'],
      ],
    },
    {
      stage: 'Clicked',
      tag: 'Do they stay?',
      gates: [
        ['Relevance', 'The landing page matches what they searched for.'],
        ['Clarity', 'They understand what you offer, who it is for and what to do next.'],
        ['Usability', 'Speed, mobile, navigation and forms that never get in the way.'],
      ],
    },
    {
      stage: 'Chosen',
      tag: 'Do they buy, and come back?',
      gates: [
        ['Trust', 'Reviews, specs, policies and proof that remove doubt.'],
        ['Conversion', 'Checkout, quote, form, call or booking that works first time.'],
        [
          'Assistance',
          'Order updates, onboarding, enquiry follow-up and fast answers on calls, email, chat and WhatsApp.',
        ],
        ['Retention', 'Reorders, renewals and referrals.'],
      ],
    },
  ];
  const CASES = [
    {
      slug: 'industrial-distributor-search',
      gate: 'Findability',
      door: 'I sell online',
      ind: 'Industrial tools and supplies',
      client: 'US industrial distributor',
      n1: ['-71%', 'zero-result searches'],
      n2: ['+34%', 'online reorders'],
      t: 'Part-number search that finally returns parts.',
      ch: 'Trade buyers typed exact part numbers and got "no results", so they picked up the phone instead.',
      ai: 'AI agents flagged 2,300 zero-result searches a month, most of them valid part numbers with formatting differences.',
      ex: 'Experts decided to fix the product data and search synonyms first, not the search UI.',
      built: ['Normalised 48,000 part numbers', 'Synonym and fuzzy-match rules', 'Reorder from order history'],
      quote: 'Our reps stopped being a search engine for our own website.',
    },
    {
      slug: 'retailer-filters',
      gate: 'Usability',
      door: 'I sell online',
      ind: 'Home and furniture',
      client: 'UK multi-category retailer',
      n1: ['+22%', 'filter-to-cart rate'],
      n2: ['-18%', 'returns on sized items'],
      t: 'One template fix across 9,000 product pages.',
      ch: 'Shoppers could not filter by size or delivery date, then returned items that did not fit.',
      ai: 'AI flagged filter drop-off and return reasons clustering around dimensions.',
      ex: 'Experts rebuilt the listing and product templates once, so every page improved together.',
      built: ['Size and delivery filters', 'Dimension block on product template', 'Delivery date promise'],
      quote: 'It felt like we fixed the whole site, not a page.',
    },
    {
      slug: 'rehab-admissions',
      gate: 'Conversion',
      door: 'I get enquiries online',
      ind: 'Enquiry-based businesses',
      client: 'US healthcare and rehab provider',
      n1: ['+41%', 'admission enquiries'],
      n2: ['20 → 6', 'form questions'],
      t: 'From a 20-question form to a call-back.',
      ch: 'The admission form asked 20 questions before anyone could talk to a person.',
      ai: 'AI flagged where families left the form and which pages built the most trust.',
      ex: 'Experts cut the form, added trust signals and a call-back option, within compliance rules.',
      built: ['6-field form with call-back', 'Accreditation and insurance block', 'Same-day response flow'],
      quote: 'Families reach a person sooner, and that is the whole job.',
    },
  ].map((c) => ({ ...c, illustrative: true }));
  const AUDITS = [
    {
      slug: 'dcx-diagnostic',
      name: 'DCX Diagnostic',
      kw: 'Customer experience audit',
      h1: ['Customer experience audit:', 'the full DCX Diagnostic.'],
      out: 'Find the earliest failing gate and what fixing it is worth.',
      time: 'About 30 days',
      price: 'Fixed price by site size',
      badge: 'Most complete',
      who: [
        'Revenue is flat and nobody agrees why',
        'Several agencies, no single owner of the journey',
        'Planning a replatform or redesign',
      ],
      checks: GATES.flatMap((g) => g.gates.map((x) => [g.stage, x[0], x[1]])),
      get: [
        'Nine Gates score with evidence',
        'Earliest failing gate, valued in money',
        'Prioritised 90-day roadmap',
        'Walkthrough with your leadership team',
      ],
    },
    {
      slug: 'seo-audit',
      name: 'SEO Audit',
      kw: 'SEO audit services',
      h1: ['SEO audit services', 'for large catalogs.'],
      out: 'See what holds your rankings back and what to fix first.',
      time: '2 to 3 weeks',
      price: 'Fixed price by site size',
      who: ['Organic traffic is flat or falling', 'Category pages rank below competitors', 'Planning a migration'],
      checks: [
        ['Cited', 'Content', 'Thin, duplicate or missing category and product copy'],
        ['Cited', 'Keywords', 'Buyer terms you rank for, and the ones you miss'],
        ['Cited', 'Links', 'Authority compared with competitors'],
        ['Cited', 'Ecommerce SEO', 'Faceted URLs, pagination, product schema'],
        ['Clicked', 'Relevance', 'Search intent versus landing page'],
      ],
      get: [
        'Issue list ranked by impact',
        'Quick wins for the first 30 days',
        'Ecommerce section for catalogs',
        'One-page Nine Gates snapshot',
      ],
    },
    {
      slug: 'technical-seo-audit',
      name: 'Technical SEO Audit',
      kw: 'Technical SEO audit',
      h1: ['Technical SEO audit', 'for sites with thousands of pages.'],
      out: 'Make sure search engines can crawl, index and understand every page.',
      time: '2 to 3 weeks',
      price: 'Fixed price by site size',
      who: ['Pages missing from Google', 'Slow templates', 'Faceted navigation creating duplicate URLs'],
      checks: [
        ['Cited', 'Crawling', 'Crawl budget, blocked paths, orphan pages'],
        ['Cited', 'Indexing', 'Canonicals, duplicates, parameter URLs'],
        ['Clicked', 'Speed', 'Core Web Vitals by template'],
        ['Cited', 'Structured data', 'Product, offer, review and FAQ schema'],
        ['Cited', 'Large-catalog issues', 'Faceted URLs, near-duplicate products'],
      ],
      get: [
        'Fix list by template',
        'Developer-ready tickets',
        'Indexing and speed benchmarks',
        'One-page Nine Gates snapshot',
      ],
    },
    {
      slug: 'ai-visibility-audit',
      name: 'AI Visibility Audit',
      kw: 'AI visibility audit',
      h1: ['AI visibility audit:', 'are you in the answer?'],
      out: 'See where ChatGPT, Gemini and Google AI Mode mention you, and where they pick a competitor.',
      time: '2 weeks',
      price: 'Fixed price',
      who: [
        'Buyers ask AI tools before they search',
        'Competitors appear in AI answers and you do not',
        'Product feeds are incomplete',
      ],
      checks: [
        ['Cited', 'Mentions', 'Where AI tools name you and competitors'],
        ['Cited', 'Citations', 'Which sources and pages they cite'],
        ['Cited', 'Feeds', 'Product feed and structured data gaps'],
        ['Clicked', 'Content', 'Pages AI can quote: FAQs, specs, comparisons'],
      ],
      get: [
        'AI share of voice versus competitors',
        'Before / after citation examples',
        'Feed and content fix list',
        'One-page Nine Gates snapshot',
      ],
    },
    {
      slug: 'cro-ux-audit',
      name: 'CRO and UX Audit',
      kw: 'CRO audit · UX audit',
      h1: ['CRO and UX audit', 'grouped by gate.'],
      out: 'Find where visitors drop and build a test backlog that fixes causes.',
      time: '2 to 3 weeks',
      price: 'Fixed price',
      who: ['Conversion rate is flat', 'Paid traffic lands and leaves', 'Checkout or forms leak'],
      checks: [
        ['Clicked', 'Usability', 'Navigation, mobile, speed, accessibility basics'],
        ['Chosen', 'Trust', 'Reviews, policies, proof near the decision'],
        ['Chosen', 'Conversion', 'Checkout, quote or form friction'],
        ['Clicked', 'Mobile', 'Thumb reach, sticky actions, form inputs'],
      ],
      get: ['Issues grouped by gate', 'Prioritised test backlog', 'Quick wins', 'One-page Nine Gates snapshot'],
    },
    {
      slug: 'analytics-audit',
      name: 'Analytics (GA4) Audit',
      kw: 'GA4 audit · analytics audit',
      h1: ['GA4 and analytics audit:', 'numbers you can defend.'],
      out: 'Check that every order and lead is tracked correctly.',
      time: '1 to 2 weeks',
      price: 'Fixed price',
      who: ['Reports disagree across tools', 'Teams do not trust the dashboard', 'Moving to GA4 or Adobe'],
      checks: [
        ['All', 'Tracking accuracy', 'Events firing correctly across templates'],
        ['Chosen', 'Orders and leads', 'Purchase, quote, form and call events'],
        ['All', 'Attribution', 'Channel and campaign tagging'],
        ['All', 'Dashboards', 'What leaders see, and whether it is right'],
      ],
      get: [
        'List of tracked events and gaps',
        'Fix plan for your developers',
        'Dashboard recommendations',
        'One-page Nine Gates snapshot',
      ],
    },
    {
      slug: 'accessibility-audit',
      name: 'Accessibility Audit',
      kw: 'Accessibility audit',
      h1: ['Accessibility audit', 'against WCAG 2.2 AA.'],
      out: 'A clear fix list so everyone can use your site.',
      time: '2 to 3 weeks',
      price: 'Fixed price',
      who: ['Legal or procurement requirement', 'Customers using screen readers or keyboards', 'Redesign coming up'],
      checks: [
        ['Clicked', 'WCAG 2.2 AA', 'Checked against the recognised standard'],
        ['Clicked', 'Keyboard', 'Every action reachable without a mouse'],
        ['Clicked', 'Screen readers', 'Labels, headings, alt text'],
        ['Clicked', 'Contrast', 'Text and controls at least 4.5:1'],
      ],
      get: [
        'Fix list by template',
        'Severity and effort per issue',
        'Retest after fixes',
        'One-page Nine Gates snapshot',
      ],
    },
    {
      slug: 'catalog-search-audit',
      name: 'Catalog and Search Audit',
      kw: 'Catalog and search audit',
      h1: ['Catalog and search audit:', 'fix the searches that return nothing.'],
      out: 'Find missing specs, duplicates and zero-result searches.',
      time: '2 weeks',
      price: 'Fixed price by catalog size',
      who: ['Searches return "no results"', 'Filters are empty or wrong', 'Product data comes from many suppliers'],
      checks: [
        ['Cited', 'Zero-result searches', 'What buyers type and get nothing back'],
        ['Cited', 'Filters', 'Missing or inconsistent attributes'],
        ['Clicked', 'Specs', 'Missing, thin or duplicated product data'],
        ['Cited', 'Duplicates', 'Near-identical titles and SKUs'],
      ],
      get: [
        'Catalog health score',
        'Zero-result search report',
        'Batch cleanup plan and price',
        'One-page Nine Gates snapshot',
      ],
    },
  ];
  const SERVICES = [
    {
      slug: 'dcx-transformation',
      name: 'DCX Strategy and Transformation',
      kw: 'Customer experience strategy',
      h1: ['Customer experience strategy', 'for the whole journey.'],
      promise: 'One roadmap and one team owning every gate.',
      gates: 'All nine',
      d: 'DCX Diagnostic, journey mapping',
      b: 'Roadmap, governance setup',
      r: 'dCOE pod that owns the roadmap',
      audit: 'dcx-diagnostic',
      doors: true,
      symptoms: ['Five agencies, no single owner', 'Every team has its own numbers', 'Fixes ship, results do not'],
      tools: ['Adobe', 'Google Analytics', 'Quantum Metric', 'Contentsquare', 'Qualtrics'],
    },
    {
      slug: 'conversion-rate-optimization',
      name: 'Conversion Rate Optimization',
      kw: 'Conversion rate optimization agency',
      h1: ['Conversion rate optimization', 'for businesses that sell or get enquiries online.'],
      promise: 'A testing program that fixes causes, not symptoms.',
      gates: 'Usability, Trust, Conversion',
      d: 'CRO audit, test backlog',
      b: 'Test design and development',
      r: 'Ongoing test program',
      audit: 'cro-ux-audit',
      doors: true,
      perTest: true,
      symptoms: [
        'Conversion rate stuck for months',
        'Tests win, revenue does not move',
        'Paid traffic lands and leaves',
      ],
      tools: ['Optimizely', 'Adobe Target', 'VWO', 'Contentsquare', 'GA4'],
    },
    {
      slug: 'ai-search-visibility',
      name: 'AI Search Visibility (GEO)',
      kw: 'Generative engine optimization agency',
      h1: ['Generative engine optimization:', 'get cited in AI answers.'],
      promise: 'Be the brand ChatGPT, Gemini and Google AI Mode recommend.',
      gates: 'Discoverability',
      d: 'AI visibility audit',
      b: 'Feed, structured data and content fixes',
      r: 'Monthly citation tracking',
      audit: 'ai-visibility-audit',
      doors: true,
      aiAnswer: true,
      symptoms: [
        'Competitors named in AI answers, you are not',
        'Product feeds with missing attributes',
        'No FAQs or specs AI can quote',
      ],
      tools: ['Google Merchant Center', 'Schema.org', 'ChatGPT', 'Gemini', 'Perplexity'],
    },
    {
      slug: 'digital-merchandising',
      name: 'Digital Merchandising',
      kw: 'Ecommerce merchandising',
      h1: ['Ecommerce merchandising', 'that makes the right products easy to find.'],
      promise: 'Search, filters and categories that turn browsing into buying.',
      gates: 'Findability, Relevance',
      d: 'Search, PLP and assortment review',
      b: 'Search tuning, category and filter rebuild',
      r: 'Ongoing merchandising ops',
      audit: 'catalog-search-audit',
      symptoms: ['Searches return the wrong products', 'Category pages buried in filters', 'Promotions hard to find'],
      tools: ['Algolia', 'Bloomreach', 'Constructor', 'Shopify', 'Adobe Commerce'],
    },
    {
      slug: 'catalog-management',
      name: 'Catalog and Product Data',
      kw: 'Catalog management services',
      h1: ['Catalog management services:', 'fix data once, improve thousands of pages.'],
      promise: 'Clean, complete product data for search, filters and AI answers.',
      gates: 'Discoverability, Findability, Clarity',
      d: 'Catalog health check',
      b: 'SKU data cleanup and enrichment',
      r: 'Ongoing catalog upkeep',
      audit: 'catalog-search-audit',
      batch: true,
      symptoms: ['Missing specs and empty filters', 'Duplicate titles across suppliers', 'AI tools skip your products'],
      tools: ['Akeneo', 'Salsify', 'inRiver', 'Shopify', 'Adobe Commerce'],
    },
    {
      slug: 'digital-analytics',
      name: 'Digital Analytics',
      kw: 'Digital analytics consulting',
      h1: ['Digital analytics consulting:', 'decisions you can defend.'],
      promise: 'Tracking for orders and leads that every team trusts.',
      gates: 'All (the measuring layer)',
      d: 'Analytics and tracking audit',
      b: 'GA4 / Adobe setup, dashboards',
      r: 'Monthly insight reviews',
      audit: 'analytics-audit',
      doors: true,
      symptoms: ['Reports disagree', 'Leads not tracked to source', 'Dashboards nobody opens'],
      tools: ['GA4', 'Adobe Analytics', 'Looker Studio', 'Google Tag Manager', 'BigQuery'],
    },
    {
      slug: 'growth-marketing',
      name: 'Growth Marketing',
      kw: 'Growth marketing agency',
      h1: ['Growth marketing', 'tied to every gate.'],
      promise: 'More value from the traffic you already pay for.',
      gates: 'Discoverability, Retention',
      d: 'Channel and CAC review',
      b: 'Campaign and lifecycle setup',
      r: 'Paid, SEO, CRM management',
      audit: null,
      retainer: true,
      symptoms: ['Rising acquisition costs', 'First orders, no repeat orders', 'Channels managed in silos'],
      tools: ['Google Ads', 'Meta', 'Klaviyo', 'HubSpot', 'Salesforce'],
    },
    {
      slug: 'ecommerce-website-development',
      name: 'Ecommerce Website Development',
      kw: 'Ecommerce website development',
      h1: ['Ecommerce website development', 'for complex catalogs.'],
      promise: 'Builds, migrations and template work that ship on time.',
      gates: 'Usability, Assistance',
      d: 'Tech and speed review',
      b: 'Builds, migrations, template work',
      r: 'Dev support on demand',
      audit: null,
      credits: true,
      symptoms: ['Slow templates', 'Replatform on the roadmap', 'Small changes wait months'],
      tools: ['Shopify Plus', 'Adobe Commerce', 'BigCommerce', 'Salesforce Commerce Cloud', 'commercetools'],
    },
  ];
  const SOLUTIONS = [
    {
      slug: 'customer-experience-consulting',
      name: 'Customer Experience Consulting',
      h1: ['Customer experience consulting', 'with AI agents and expert teams.'],
      svcs: ['dcx-transformation', 'conversion-rate-optimization', 'digital-analytics', 'ai-search-visibility'],
      doors: true,
      cta: SCAN,
    },
    {
      slug: 'customer-journey-optimization',
      name: 'Customer Journey Optimization',
      h1: ['Customer journey optimization:', 'find where you lose customers and fix it first.'],
      svcs: ['conversion-rate-optimization', 'digital-merchandising', 'digital-analytics', 'dcx-transformation'],
      doors: true,
      journey: true,
      cta: SCAN,
    },
    {
      slug: 'ecommerce-consulting',
      name: 'Ecommerce Consulting',
      h1: ['Ecommerce consulting', 'for distributors, retailers and D2C brands.'],
      svcs: [
        'catalog-management',
        'digital-merchandising',
        'ecommerce-website-development',
        'conversion-rate-optimization',
      ],
      doors: false,
      deep: true,
      cta: DIAG,
    },
  ];
  const INDUSTRIES = [
    {
      slug: 'industrial-tools-supplies',
      name: 'Industrial Tools and Supplies',
      h1: ['Industrial tools and supplies:', 'move more orders online.'],
      probs: [
        ['Findability', 'Part-number search returns nothing'],
        ['Clarity', 'Specs missing or inconsistent across suppliers'],
        ['Conversion', 'B2B pricing and quotes handled by email'],
        ['Retention', 'Reorders still go through sales reps'],
      ],
      fix: 'Part-number search, spec cleanup, account pricing, quick reorder.',
      plat: ['Adobe Commerce', 'BigCommerce B2B', 'SAP Commerce', 'Shopify Plus B2B'],
      eg: 'Example: "3/8 x 2 hex bolt zinc" should return the SKU, not "no results".',
    },
    {
      slug: 'home-furniture',
      name: 'Home and Furniture',
      h1: ['Home and furniture:', 'fewer returns, more confident buyers.'],
      probs: [
        ['Findability', 'Filtering by size, colour and material'],
        ['Trust', 'Delivery dates and returns unclear'],
        ['Clarity', 'Dimensions hidden below the fold'],
        ['Assistance', 'Delivery promises missed'],
      ],
      fix: 'Visual browsing, size and option pickers, delivery and returns trust blocks.',
      plat: ['Shopify Plus', 'Adobe Commerce', 'Salesforce Commerce Cloud'],
      eg: 'Example: a delivery-date promise on every product page.',
    },
    {
      slug: 'consumer-electronics',
      name: 'Consumer Electronics',
      h1: ['Consumer electronics:', 'win the spec comparison.'],
      probs: [
        ['Clarity', 'Specs not comparable across products'],
        ['Trust', 'Compatibility questions unanswered'],
        ['Discoverability', 'Missing from AI shopping answers'],
        ['Conversion', 'Accessories not bundled'],
      ],
      fix: 'Spec comparison, compatibility checkers, review display, AI shopping feeds.',
      plat: ['Shopify Plus', 'Adobe Commerce', 'commercetools'],
      eg: 'Example: a side-by-side comparison built from clean spec data.',
    },
    {
      slug: 'health-wellness',
      name: 'Health and Wellness',
      h1: ['Health and wellness:', 'trust first, then repeat orders.'],
      probs: [
        ['Trust', 'Claims rules limit what you can say'],
        ['Clarity', 'Ingredients and dosage hard to find'],
        ['Retention', 'Subscriptions cancelled early'],
        ['Conversion', 'Checkout drops at subscription choice'],
      ],
      fix: 'Compliant claims, ingredient clarity, subscription flows, replenishment.',
      plat: ['Shopify Plus', 'BigCommerce', 'Recharge'],
      eg: 'Example: a trust and claims block reviewed against your rules.',
    },
    {
      slug: 'beauty-personal-care',
      name: 'Beauty and Personal Care',
      h1: ['Beauty and personal care:', 'help shoppers pick the right shade.'],
      probs: [
        ['Findability', 'Too many shades and variants'],
        ['Trust', 'Reviews not shown where it matters'],
        ['Retention', 'No replenishment reminders'],
        ['Discoverability', 'Missing from AI beauty answers'],
      ],
      fix: 'Shade and fit finders, review placement, replenishment journeys.',
      plat: ['Shopify Plus', 'Salesforce Commerce Cloud', 'Klaviyo'],
      eg: 'Example: a three-question shade finder that cuts returns.',
    },
    {
      slug: 'apparel-fashion',
      name: 'Apparel and Fashion',
      h1: ['Apparel and fashion:', 'right size, first time.'],
      probs: [
        ['Clarity', 'Size guidance generic or missing'],
        ['Findability', 'Filters miss fit, length, fabric'],
        ['Assistance', 'Returns eat the margin'],
        ['Relevance', 'New drops buried'],
      ],
      fix: 'Size guidance, smarter filters, returns reduction, drop merchandising.',
      plat: ['Shopify Plus', 'Salesforce Commerce Cloud', 'Adobe Commerce'],
      eg: 'Example: fit notes from returns data shown on the product page.',
    },
    {
      slug: 'enquiry-based-businesses',
      name: 'Enquiry-based businesses',
      test: true,
      h1: ['Enquiry-based businesses:', 'more demos, admissions and consultations.'],
      probs: [
        ['Clarity', 'Service pages that do not say who it is for'],
        ['Trust', 'Proof hidden far from the form'],
        ['Conversion', 'Forms with too many questions'],
        ['Assistance', 'Slow follow-up after enquiry'],
      ],
      fix: 'Shorter forms, trust signals, call-back and booking options, faster follow-up. SaaS, education, healthcare and rehab, professional services.',
      plat: ['HubSpot', 'Salesforce', 'WordPress', 'Calendly'],
      eg: 'Example: a 20-question admission form cut to 6 fields plus a call-back.',
    },
  ];
  const STAGES = [
    {
      slug: 'diagnose',
      name: 'Diagnose',
      verb: 'Find',
      line: 'Find the earliest failing gate before you spend on fixes.',
      signs: [
        'You do not know why revenue is flat',
        'Every team blames a different gate',
        'A replatform or redesign is coming',
      ],
      ai: 'AI runs the first pass across all nine gates: search logs, speed, tracking, feeds, AI answers.',
      hu: 'Experts check what is real, value it in money and rank the fixes.',
      get: 'A report, a priority list and quick wins. The Diagnostic adds a 90-day roadmap.',
      time: '1 to 4 weeks',
      price: 'Fixed price. Audits can be paid as you go.',
      cta: DIAG,
    },
    {
      slug: 'build',
      name: 'Build',
      verb: 'Fix',
      line: 'Fix the top issues in a 90-day sprint or a fixed-price job.',
      signs: [
        'You have a roadmap but no team to ship it',
        'Product data or search needs a rebuild',
        'Templates slow down every change',
      ],
      ai: 'AI drafts data fixes, flags template issues and checks every release.',
      hu: 'Experts design, build, test and ship.',
      get: 'Fixed templates, clean data, working search and tracking, first tests live.',
      time: '90 days, or per job',
      price: 'Fixed-scope sprint, or fixed-price jobs.',
      cta: { l: 'Book a sprint scoping call', act: 'book', topic: 'Build sprint' },
    },
    {
      slug: 'run',
      name: 'Run',
      verb: 'Keep improving',
      line: 'An embedded pod that keeps all nine gates improving, month after month.',
      signs: ['Fixes slip back after launch', 'You need a team, not another agency', 'Testing has stopped'],
      ai: 'AI watches every gate daily and alerts the pod to changes.',
      hu: 'The pod decides what matters, ships fixes and reviews results monthly.',
      get: 'Monthly reviews, a live roadmap, steady test and fix releases.',
      time: 'Monthly',
      price: 'Monthly retainer. Small, Medium or Large pod.',
      cta: { l: 'Talk to us about a Run pod', act: 'book', topic: 'Run pod' },
    },
  ];
  const BUILD_LINKS = {
    '90-day Build sprint': '#/services/dcx-transformation',
    'Catalog data cleanup': '#/services/catalog-management',
    'Search tuning': '#/services/digital-merchandising',
    'Template rebuild': '#/services/ecommerce-website-development',
    'Tracking setup': '#/services/digital-analytics',
    'AI feed fixes': '#/services/ai-search-visibility',
    'Dev credits': '#/services/ecommerce-website-development',
    'Test design and build': '#/services/conversion-rate-optimization',
    'Campaign and lifecycle setup': '#/services/growth-marketing',
  };
  const STAGE_ITEMS = {
    diagnose: AUDITS.map((a) => ({
      t: a.name,
      d: a.out,
      href: '#/audits/' + a.slug,
      meta: [a.time, a.price],
      badge: a.badge,
    })),
    build: [
      [
        '90-day Build sprint',
        'Fix the top roadmap issues: templates, data, search, tracking, first tests.',
        '90 days',
        'Fixed scope',
      ],
      [
        'Catalog data cleanup',
        'Specs, titles and attributes cleaned per SKU batch.',
        'Per batch',
        'Fixed price per batch',
      ],
      ['Search tuning', 'Synonyms, part numbers, zero-result fixes.', '2 to 4 weeks', 'Fixed price'],
      [
        'Template rebuild',
        'One listing or product template, improving every page that uses it.',
        '4 to 6 weeks',
        'Fixed price',
      ],
      ['Tracking setup', 'GA4 or Adobe events for orders and leads.', '2 to 3 weeks', 'Fixed price'],
      ['AI feed fixes', 'Product feeds and structured data AI tools can read.', '2 to 4 weeks', 'Fixed price'],
      ['Test design and build', 'A/B tests designed and built, priced per test.', 'Per test', 'Fixed price per test'],
      [
        'Campaign and lifecycle setup',
        'Paid, SEO and CRM programs set up around the gates.',
        '4 to 6 weeks',
        'Fixed scope',
      ],
      ['Dev credits', 'Prepaid blocks for small changes, spent on any job.', 'On demand', 'Prepaid credits'],
    ].map((x) => ({ t: x[0], d: x[1], meta: [x[2], x[3]], href: BUILD_LINKS[x[0]] || '#/ways-to-work' })),
    run: [
      ['Small pod', 'One storefront, focused catalog. DCX lead plus analyst plus AI agents.'],
      ['Medium pod', 'Several categories or storefronts. Adds a merchandiser and developer.'],
      ['Large pod', 'Many storefronts or regions. Full team with AI agents across every gate.'],
    ].map((x, i) => ({
      t: x[0],
      d: x[1],
      meta: ['Monthly', 'Price on request'],
      href: '#/ways-to-work',
      badge: i === 1 ? 'Most chosen' : '',
    })),
  };
  const LADDER = [
    {
      n: '01',
      t: 'Free AI scan',
      d: 'Automated. Nine Gate score, catalog health snapshot, zero-result search sample and AI visibility check. AI does the work, a human adds a two-line note before it goes out.',
      time: 'About 48 hours',
      price: 'Free',
      href: '#/free-ai-scan',
    },
    {
      n: '02',
      t: 'DCX Diagnostic',
      d: 'Human-led. Finds the earliest failing gate and puts a money value on fixing it. Ends with a prioritised roadmap.',
      time: 'About 30 days',
      price: 'Paid, fixed price',
      href: '#/services/dcx-transformation/dcx-audit',
      hi: true,
    },
    {
      n: '03',
      t: '90-day Build sprint',
      d: 'Fixes the top issues from the roadmap: templates, product data, search, tracking, first tests.',
      time: '90 days',
      price: 'Fixed scope',
      href: '#/build',
    },
  ];
  const FAQ_HOME = [
    [
      'What is digital customer experience (DCX)?',
      'It is every step a customer takes online, from finding you in search or an AI answer to buying and coming back. We call these the Nine Gates.',
    ],
    [
      'Are you a CRO agency?',
      'No. Conversion is where problems show up, not where they start. We fix the earliest failing gate first, which is often search, product data or trust.',
    ],
    [
      'How does the AI part work?',
      'AI agents monitor all nine gates all the time and flag changes. Experts check what is real, decide the fix and ship it. Nothing goes live without a person.',
    ],
    [
      'What does the free AI scan include?',
      'A Nine Gate score, a catalog health snapshot, a sample of zero-result searches and an AI visibility check, within about 48 hours.',
    ],
    [
      'Do you only work with ecommerce?',
      'Ecommerce distributors, retailers and large-catalog brands are our core. We also work with enquiry-based businesses where the website drives demos, admissions or consultations.',
    ],
    [
      'Can I buy a single job?',
      'Yes. Audits and many fixes are fixed-price jobs you can pay as you go, or buy with prepaid credits.',
    ],
  ];
  const auditFaq = (a) => [
    [
      'How long does the ' + a.name + ' take?',
      a.time + '. AI does a first pass, then an expert reviews and walks you through it.',
    ],
    ['How is it priced?', a.price + '. You know the price before we start.'],
    ['What do I get at the end?', a.get.join(', ') + '.'],
    [
      'Does the fee count toward the DCX Diagnostic?',
      'Yes, if you book the Diagnostic within 60 days the fee is credited.',
    ],
    [
      'Do I need to give you access?',
      'Read-only access to analytics and search logs helps. We can start with public pages only.',
    ],
  ];
  const svcFaq = (s) => [
    ['What does ' + s.name + ' cover?', s.promise + ' Main gates: ' + s.gates + '.'],
    [
      'Where do we start?',
      s.audit
        ? 'With the matching audit, or the full DCX Diagnostic if the problem spans several gates.'
        : 'With a short call to scope the work.',
    ],
    [
      'How do AI agents help?',
      'They watch the gates this service affects, flag changes and draft fixes. Experts decide and deliver.',
    ],
    [
      'How is it priced?',
      s.retainer
        ? 'Monthly retainer only, because results build over months.'
        : 'Fixed-price jobs for Diagnose and Build, monthly retainer for Run.',
    ],
    ['Which platforms do you work with?', s.tools.join(', ') + ', and others.'],
  ];
  const indFaq = (i) => [
    [
      'Do you work only with ' + i.name.toLowerCase() + '?',
      'No, but we know its journey problems well and bring examples from it.',
    ],
    [
      'Where should we start?',
      'With the free AI scan for ' + i.name.toLowerCase() + ', then the DCX Diagnostic if needed.',
    ],
    ['Which platforms?', i.plat.join(', ') + ', and others.'],
    [
      'How fast do we see results?',
      'Quick wins usually ship in the first 30 days; template and data fixes in a 90-day sprint.',
    ],
  ];

  const P = {};
  const hero = (eb, h1, lead, ctas, extra) => ({ type: 'hero', eb, a: h1[0], b: h1[1], lead, ctas, ...(extra || {}) });
  const cta = (h, p, b) => ({ type: 'cta', h, p, btn: b || SCAN });
  const nine = {
    type: 'gates',
    eb: 'Cited, Clicked, Chosen',
    h: 'Nine gates every customer passes through.',
    p: 'Lost revenue shows up at conversion, but it usually starts earlier. We find the earliest gate that fails and fix that first.',
    link: { l: 'See the Nine Gates framework', href: '#/nine-gates' },
  };
  const aiLayer = {
    type: 'ai',
    eb: 'AI plus human in the loop',
    h: 'AI watches every gate. Experts fix what matters.',
    watch: [
      'Zero-result and failed searches',
      'Speed and errors by template',
      'Tracking breaks and data gaps',
      'Product feed and spec gaps',
      'Mentions and citations in AI answers',
      'Drop-off at checkout, quote or form',
    ],
    decide: [
      'Which signals are real',
      'What fixing it is worth',
      'What to fix first',
      'How to design and build it',
      'When it is ready to ship',
    ],
  };
  const doors = (sell, enq) => ({
    type: 'doors',
    eb: 'Two doors',
    h: 'Whether customers buy from you online or enquire online, they can drop off at any step.',
    sell: sell || {
      eg: 'A distributor whose search shows "no results" for common part numbers.',
      fix: 'Search tuning and product data.',
      pts: ['Product pages', 'Search', 'Checkout', 'Reorders'],
    },
    enq: enq || {
      eg: 'A rehab centre whose admission form asks 20 questions before a call.',
      fix: 'Shorter form, trust signals, call-back option.',
      pts: ['Service pages', 'Forms', 'Demo or booking', 'Onboarding'],
    },
  });
  const ladder = {
    type: 'ladder',
    eb: 'Ways to start',
    h: 'Small enough to say yes to.',
    p: 'Each step sets up the next. Audits and fixed-price jobs sit beside the ladder as a side door, paid as you go or with prepaid credits.',
    items: LADDER,
    link: { l: 'Compare ways to work', href: '#/ways-to-work' },
  };
  const cases = (list, h) => ({
    type: 'cases',
    eb: 'Case stories',
    h: h || 'Named by the gate that was failing.',
    items: CASES,
    link: { l: 'All case stories', href: '#/case-studies' },
  });
  const stages = {
    type: 'stages',
    eb: 'How we work',
    h: 'Diagnose. Build.',
    p: 'Every service sits under one of two stages, with an AI agent layer running across both.',
    items: STAGES.filter((s) => s.slug !== 'run').map((s) => ({
      slug: s.slug,
      name: s.name,
      verb: s.verb,
      line: s.line,
      links:
        s.slug === 'diagnose'
          ? AUDITS.slice(0, 5).map((a) => [a.name, '#/audits/' + a.slug])
          : s.slug === 'build'
            ? SERVICES.slice(0, 5).map((v) => [v.name, '#/services/' + v.slug])
            : [
                ['Small, Medium and Large pods', '#/run'],
                ['Ways to work', '#/ways-to-work'],
                ['Growth Marketing', '#/services/growth-marketing'],
                ['Insights', '#/insights'],
                ['Nine Gates framework', '#/nine-gates'],
              ],
      href: '#/' + s.slug,
    })),
  };
  const faq = (items) => ({ type: 'faq', eb: '', h: 'FAQ', items });

  P.home = {
    t: 'T1',
    title: 'Digital customer experience (DCX) firm | CXWorks',
    blocks: [
      hero(
        'Digital customer experience (DCX)',
        ['Your website is your revenue engine.', 'We make every step of it work.'],
        'Not a CRO agency. A DCX team for businesses with complex journeys, from first search to repeat order. Built for distributors, retailers and large-catalog brands.',
        [SCAN, DIAG],
        {
          home: true,
          small: { l: 'Get enquiries online instead? See how we help', href: '#/industries/enquiry-based-businesses' },
        },
      ),
      { type: 'logos', eb: 'Platforms and partners we work with' },
      { type: 'stats' },
      {
        type: 'problem',
        eb: 'The problem',
        a: 'Your conversion rate is not the problem.',
        b: 'It is where the problem shows up.',
        lines: [
          ['Cited', 'Buyers ask an AI tool and it recommends a competitor.'],
          ['Clicked', 'They land, search for a part number and get "no results".'],
          ['Chosen', 'They hesitate at shipping costs and pick up the phone instead.'],
        ],
      },
      nine,
      stages,
      { type: 'loop', eb: 'How it works', h: 'AI watches every gate. Experts decide and ship.' },
      { type: 'svcmap', eb: 'The service menu', h: 'Every service has a Diagnose, Build and Run version.' },
      {
        type: 'catalog',
        eb: 'Built for large catalogs',
        h: 'One fix, thousands of pages.',
        p: 'We fix templates, product data and search, not single pages. Change one product template or clean one attribute, and every page that uses it improves at once.',
        chips: [
          'Part-number search',
          'Filters and facets',
          'Specs and attributes',
          'B2B reorder',
          'Quotes and account pricing',
          'Product feeds for AI',
        ],
        big: ['1 template', '9,000+ pages improved'],
      },
      doors(),
      ladder,
      cases(),
      { type: 'reviews' },
      { type: 'insrail' },
      faq(FAQ_HOME),
      cta('Find your earliest failing gate.', 'Free AI scan. Nine Gate score in about 48 hours.'),
    ],
  };

  STAGES.forEach((st) => {
    P[st.slug] = {
      t: 'T2',
      crumb: [['Home', '#/'], [st.name]],
      title: st.name + ' | CXWorks',
      blocks: [
        hero(
          st.name,
          [st.name + ':', st.line],
          st.slug === 'diagnose'
            ? 'Start with the DCX Diagnostic, or book a single audit for one gate.'
            : st.slug === 'build'
              ? '90-day sprints and fixed-price jobs: catalog data, search, templates, tracking, dev, AI feeds.'
              : 'Small, Medium or Large pods with AI agents watching every gate.',
          [st.cta],
        ),
        { type: 'list', eb: 'Signs you need this stage', h: 'You will recognise these.', items: st.signs },
        st.slug === 'diagnose'
          ? {
              type: 'analogy',
              h: 'Think of a hospital. The DCX Diagnostic is the full check-up, so it is always listed first.',
              p: 'Stages are the departments, services are the specialties, and audits are single tests anyone can book.',
            }
          : null,
        {
          type: 'cards',
          eb: 'Everything in ' + st.name,
          h:
            st.slug === 'diagnose'
              ? 'Compare audits side by side.'
              : st.slug === 'build'
                ? 'Sprints and fixed-price jobs.'
                : 'Pick a pod size.',
          items: STAGE_ITEMS[st.slug],
          cols: st.slug === 'run' ? 3 : 0,
        },
        st.slug === 'diagnose'
          ? {
              type: 'cards',
              eb: 'Free ways in',
              h: 'Start without spending anything.',
              items: [
                {
                  t: 'Free AI scan',
                  d: 'Your Nine Gate score in about 48 hours.',
                  href: '#/free-ai-scan',
                  meta: ['48 hours', 'Free'],
                  badge: 'Start here',
                },
                {
                  t: 'Revenue leak calculator',
                  d: 'Traffic, conversion and average order value, by gate.',
                  href: '#/free-ai-scan',
                  meta: ['5 minutes', 'Free'],
                },
                {
                  t: 'Catalog health check',
                  d: 'Missing specs, duplicate titles, thin descriptions.',
                  href: '#/free-ai-scan',
                  meta: ['In the scan', 'Free'],
                },
                {
                  t: 'AI shopping visibility check',
                  d: 'Does ChatGPT or Google AI Mode show your products?',
                  href: '#/free-ai-scan',
                  meta: ['In the scan', 'Free'],
                },
              ],
            }
          : null,
        {
          type: 'svcmap',
          eb: 'Every service, in ' + st.name,
          h: 'What ' + st.name + ' looks like for each service.',
          stage: st.slug,
        },
        { type: 'split', eb: 'How AI and experts split the work', ai: st.ai, hu: st.hu },
        {
          type: 'facts',
          eb: 'What you get',
          items: [
            ['You get', st.get],
            ['Timeline', st.time],
            ['Pricing', st.price],
          ],
        },
        st.slug === 'build'
          ? {
              type: 'timeline',
              eb: 'Sprint timeline',
              h: 'What 90 days covers.',
              items: [
                ['Weeks 1 to 2', 'Scope and plan from the roadmap'],
                ['Weeks 3 to 8', 'Data, search and template fixes'],
                ['Weeks 9 to 11', 'Tracking and first tests'],
                ['Week 12', 'Results review and next-step plan'],
              ],
            }
          : null,
        st.slug === 'build'
          ? {
              type: 'related',
              eb: 'Services in ' + st.name,
              items: SERVICES.map((v) => [v.name, '#/services/' + v.slug]),
              hubs: [
                ['Diagnose', '#/diagnose'],
                ['Build', '#/build'],
                ['Run', '#/run'],
                ['Ways to work', '#/ways-to-work'],
              ].filter((x) => x[0] !== st.name),
            }
          : null,
        cases([CASES[st.slug === 'run' ? 1 : st.slug === 'build' ? 0 : 2]], 'One story from this stage.'),
        faq([
          ['What is ' + st.name + '?', st.line],
          ['How long does it take?', st.time + '.'],
          ['How is it priced?', st.price],
          ['Who does the work?', st.ai + ' ' + st.hu],
        ]),
        cta(
          st.slug === 'diagnose' ? 'Not sure which audit?' : 'Ready to talk scope?',
          st.slug === 'diagnose'
            ? 'Start with the free AI scan, or book the full DCX Diagnostic.'
            : 'Tell us what you need and we will reply within one business day.',
          st.cta,
        ),
      ].filter(Boolean),
    };
  });
  if (P.run) {
    P['run-pods'] = {
      ...P.run,
      crumb: [['Home', '#/'], ['Run'], ['Run pods']],
      title: 'Run pods | CXWorks',
      blocks: P.run.blocks.map((b) =>
        b && b.type === 'faq'
          ? {
              ...b,
              items: [
                [
                  'What is a Run pod?',
                  'An embedded CXWorks team, for example a DCX lead, analyst, merchandiser and developer, plus AI agents that watch all nine gates every day. It keeps your digital customer experience improving month after month.',
                ],
                [
                  'How is a Run pod different from a Build sprint?',
                  'A Build sprint fixes a set list of roadmap issues in 90 days. A Run pod is ongoing: it tests, tunes and ships improvements every month, so gains keep compounding.',
                ],
                [
                  'Do I need a Diagnostic or Build sprint first?',
                  'It is the usual path, because the pod then starts from a clear roadmap. If you already know your earliest failing gate, a pod can start with a short onboarding review instead.',
                ],
                [
                  'What is the difference between Small, Medium and Large?',
                  'Small suits one storefront with a focused catalog. Medium adds a merchandiser and developer for several categories or storefronts. Large is a full team with a dedicated pod lead for many storefronts or regions.',
                ],
                [
                  'What work does a pod cover?',
                  'Conversion testing, search and merchandising tuning, catalog data upkeep, analytics and tracking, AI search visibility and growth marketing. The mix follows whichever gate is weakest that month.',
                ],
                [
                  'What do the AI agents do, and what do people do?',
                  'AI agents monitor search logs, speed, tracking, feeds and AI answers, and flag changes. The team decides what matters, ships the fix and checks the result.',
                ],
                [
                  'How is a Run pod priced?',
                  'A fixed monthly retainer based on pod size, catalog size and number of storefronts. No hourly billing, and the price is agreed before you start.',
                ],
                [
                  'What do I get each month?',
                  'A monthly review, a live roadmap, shipped tests and fixes, and a gate-by-gate report on what moved and why.',
                ],
                [
                  'How soon will we see results?',
                  'Quick wins usually ship in the first month. Testing and merchandising gains build over three to six months as each cycle sharpens the next.',
                ],
                [
                  'Can we change pod size or stop?',
                  'Yes. You can move between Small, Medium and Large as needs change. Pods run on a rolling monthly basis after an agreed minimum term.',
                ],
                [
                  'Does the pod work with our in-house team and tools?',
                  'Yes. The pod works inside your existing platforms (Shopify, Adobe Commerce, SAP, GA4 and others) and alongside your own staff and agencies.',
                ],
              ],
            }
          : b,
      ),
    };
    delete P.run;
  }

  AUDITS.forEach((a) => {
    const groups = ['Cited', 'Clicked', 'Chosen', 'All']
      .map((g) => ({ gate: g, items: a.checks.filter((c) => c[0] === g).map((c) => [c[1], c[2]]) }))
      .filter((g) => g.items.length);
    P['audit:' + a.slug] = {
      t: 'T5',
      crumb: [['Home', '#/'], ['Diagnose', '#/diagnose'], [a.name]],
      title: a.kw + ' | CXWorks',
      blocks: [
        hero(
          a.kw,
          a.h1,
          a.out,
          [
            {
              l: a.slug === 'dcx-diagnostic' ? 'Book a DCX Diagnostic' : 'Book this audit',
              act: 'book',
              topic: a.name,
            },
            a.slug === 'dcx-diagnostic'
              ? { l: 'Start with the free AI scan', href: '#/free-ai-scan' }
              : { l: 'Compare with the full DCX Diagnostic', href: '#/services/dcx-transformation/dcx-audit' },
          ],
          { meta: [a.time, a.price], badge: a.badge },
        ),
        { type: 'list', eb: 'Who it is for', h: 'Get it when:', items: a.who },
        { type: 'chart', slug: 'audit-' + a.slug },
        { type: 'checklist', eb: 'What we check', h: 'Checklist by gate.', groups },
        { type: 'list', eb: 'What you get', h: 'Delivered as:', items: a.get, check: true },
        {
          type: 'steps',
          eb: 'How it works',
          h: 'AI first, experts always.',
          items: [
            ['AI first pass', 'Agents scan pages, logs and feeds.'],
            ['Expert review', 'A specialist checks every finding.'],
            ['Walkthrough call', 'We present the priorities and quick wins.'],
          ],
        },
        { type: 'sample', eb: 'Sample report', h: 'What the report looks like.', name: a.name },
        a.slug !== 'dcx-diagnostic'
          ? {
              type: 'upgrade',
              h: 'Credited toward the DCX Diagnostic.',
              p: 'Book the full Diagnostic within 60 days and this audit fee is credited.',
              btn: { l: 'See the DCX Diagnostic', href: '#/services/dcx-transformation/dcx-audit' },
            }
          : null,
        faq(auditFaq(a)),
        cta('Book the ' + a.name + '.', a.time + ' · ' + a.price, { l: 'Book this audit', act: 'book', topic: a.name }),
      ].filter(Boolean),
    };
  });

  SERVICES.forEach((s) => {
    const au = AUDITS.find((a) => a.slug === s.audit);
    const primary = au
      ? { l: 'Book the ' + au.name, act: 'book', topic: au.name }
      : s.slug === 'ecommerce-website-development'
        ? { l: 'Book a scoping call', act: 'book', topic: s.name }
        : { l: 'Talk to an expert', act: 'book', topic: s.name };
    P['svc:' + s.slug] = {
      t: 'T3',
      crumb: [['Home', '#/'], ['Services', '#/build'], [s.name]],
      title: s.kw + ' | CXWorks',
      sticky: primary,
      blocks: [
        hero(
          s.kw,
          s.h1,
          s.promise,
          [primary, { l: 'Talk to an expert', act: 'book', topic: s.name }].filter(
            (x, i) => i === 0 || x.l !== primary.l,
          ),
        ),
        { type: 'list', eb: 'The problem', h: 'Symptoms you will recognise.', items: s.symptoms },
        { type: 'chart', slug: s.slug },
        s.doors ? doors() : null,
        s.aiAnswer
          ? { type: 'aianswer', eb: 'What winning looks like', h: 'A sample AI answer that cites a brand.' }
          : null,
        { type: 'gatechips', eb: 'Gates it covers', gates: s.gates },
        { type: 'dbr', eb: 'Diagnose and Build', h: 'Two ways to buy ' + s.name + '.', d: s.d, b: s.b, r: s.r },
        { type: 'svcmap', eb: 'Where it sits', h: 'The full service menu, one row per service.', svc: s.slug },
        s.batch
          ? {
              type: 'table',
              eb: 'Per-batch pricing',
              h: 'Priced per batch of SKUs.',
              cols: ['Batch', 'What is included', 'Price'],
              rows: [
                ['Up to 1,000 SKUs', 'Titles, specs, attributes', 'Fixed price'],
                ['1,000 to 10,000 SKUs', 'Plus enrichment and filters', 'Fixed price'],
                ['10,000+ SKUs', 'Plus supplier rules and upkeep', 'Quoted'],
                ['Minimum job', 'One batch', '—'],
              ],
            }
          : null,
        {
          type: 'split',
          eb: 'How AI agents and experts work on it',
          ai: 'Agents watch ' + s.gates.toLowerCase() + ', flag changes and draft fixes.',
          hu: 'Experts decide what matters, build it and check results.',
        },
        { type: 'tools', eb: 'Tools and platforms', items: s.tools },
        cases(
          [
            CASES[
              s.slug === 'conversion-rate-optimization'
                ? 2
                : s.slug === 'digital-merchandising' || s.slug === 'catalog-management'
                  ? 0
                  : 1
            ],
          ],
          'Case story and results.',
        ),
        {
          type: 'related',
          eb: 'Related',
          items: SERVICES.filter((x) => x.slug !== s.slug)
            .slice(0, 3)
            .map((x) => [x.name, '#/services/' + x.slug])
            .concat(au ? [[au.name + ' (matching audit)', '#/audits/' + au.slug]] : []),
        },
        faq(svcFaq(s)),
        cta(
          'Start with ' + (au ? 'the ' + au.name : 'a short call') + '.',
          'Fixed price, clear output, no long scoping.',
          primary,
        ),
      ].filter(Boolean),
    };
  });

  SOLUTIONS.forEach((s) => {
    P['sol:' + s.slug] = {
      t: 'T4',
      crumb: [['Home', '#/'], [s.name]],
      title: s.name + ' | CXWorks',
      blocks: [
        hero(
          s.name,
          s.h1,
          s.deep
            ? 'Catalogs, search, B2B ordering and marketplaces, fixed by one team.'
            : 'Whether customers buy from you online or enquire online, they can drop off at any step.',
          [s.cta, s.cta === SCAN ? DIAG : SCAN],
        ),
        s.doors
          ? doors()
          : {
              type: 'catalog',
              eb: 'Deep on catalogs',
              h: 'Built for distributors and large-catalog retail.',
              p: 'Thousands of SKUs, messy supplier data, ERP-connected portals and buyers who reorder. We fix the templates, data and search that every page depends on.',
              chips: [
                'Part-number search',
                'Account pricing',
                'Quick reorder',
                'Quotes',
                'Marketplaces',
                'PIM and ERP',
              ],
              big: ['48,000', 'part numbers normalised in one project'],
            },
        s.journey ? { type: 'journey', eb: 'The method', h: 'Earliest failing gate first.' } : nine,
        aiLayer,
        {
          type: 'cards',
          eb: 'Services in this solution',
          h: 'What makes it up.',
          items: s.svcs
            .map((k) => SERVICES.find((x) => x.slug === k))
            .map((v) => ({ t: v.name, d: v.promise, href: '#/services/' + v.slug, meta: [v.gates] })),
        },
        ladder,
        cases(s.deep ? [CASES[0], CASES[1]] : [CASES[0], CASES[2]]),
        faq([
          [
            'What is ' + s.name.toLowerCase() + '?',
            'Finding where customers drop across the journey and fixing the earliest failing gate first.',
          ],
          [
            'Is it only for ecommerce?',
            s.deep
              ? 'This page is for ecommerce. Enquiry-based businesses should see customer experience consulting.'
              : 'No. It works for online stores and for businesses that get enquiries online.',
          ],
          ['How do you start?', 'With a free AI scan, then a DCX Diagnostic if needed.'],
          ['How long until results?', 'Quick wins in 30 days, larger fixes in a 90-day sprint.'],
        ]),
        cta('Find your earliest failing gate.', 'Free AI scan in about 48 hours.'),
      ],
    };
  });

  INDUSTRIES.forEach((i) => {
    P['ind:' + i.slug] = {
      t: 'T6',
      crumb: [['Home', '#/'], ['Industries', '#/industries'], [i.name]],
      title: i.name + ' | CXWorks',
      blocks: [
        hero(
          i.test ? 'Enquiry-based businesses' : 'Industries',
          i.h1,
          i.fix,
          [
            {
              l: 'Get your free AI scan for ' + (i.test ? 'your business' : i.name.toLowerCase()),
              href: '#/free-ai-scan',
            },
          ],
          { img: i.slug },
        ),
        {
          type: 'probs',
          eb: 'Journey problems by gate',
          h: 'Where ' + i.name.toLowerCase() + ' journeys break.',
          items: i.probs,
        },
        i.test
          ? {
              type: 'steps',
              eb: 'The Nine Gates, for enquiries',
              h: 'The same framework. Only the examples change.',
              items: [
                ['Conversion', 'Becomes a form, call or booking.'],
                ['Assistance', 'Becomes onboarding, follow-up and fast answers.'],
                ['Retention', 'Becomes renewals and referrals.'],
              ],
            }
          : null,
        i.test
          ? {
              type: 'list',
              eb: 'How a test industry graduates',
              h: 'An industry gets its own track once it has:',
              items: [
                '2 or 3 signed clients in that industry',
                'Paid at or above normal ecommerce rates',
                'Delivered without heavy custom work',
                'At least one publishable case story',
              ],
              check: true,
            }
          : null,
        { type: 'text', eb: 'What we fix', h: i.fix, p: i.eg },
        { type: 'tools', eb: 'Common platforms', items: i.plat },
        cases(
          [i.test ? CASES[2] : i.slug === 'home-furniture' ? CASES[1] : CASES[0]],
          'A story from a similar journey.',
        ),
        {
          type: 'facts',
          eb: 'Recommended starting point',
          items: [
            ['Start with', 'Free AI scan'],
            ['Then', i.test ? 'CRO and UX Audit' : 'DCX Diagnostic'],
            ['Typical first fix', i.probs[0][1]],
          ],
        },
        faq(indFaq(i)),
        cta(
          'Get your free AI scan for ' + (i.test ? 'your business' : i.name.toLowerCase()) + '.',
          'Nine Gate score in about 48 hours.',
        ),
      ],
    };
  });
  P.industries = {
    t: 'T2',
    crumb: [['Home', '#/'], ['Industries']],
    title: 'Industries | CXWorks',
    blocks: [
      hero(
        'Industries',
        ['Built for large-catalog commerce,', 'tested beyond it.'],
        'Distributors, retailers and D2C brands are our core. Enquiry-based businesses are welcome too.',
        [SCAN],
      ),
      {
        type: 'table',
        eb: 'Core plus test',
        h: 'Ecommerce is the core. Other industries are a controlled test.',
        p: 'For businesses where the website is the main revenue engine, the journey has many steps or many pages, and nobody owns it end to end.',
        cols: ['', 'Core: ecommerce B2B and B2C', 'Test: enquiry-based businesses'],
        rows: [
          ['Why', 'Proven clients, case stories, team know-how', 'Good inbound prospects who can pay well'],
          [
            'Who',
            'US and UK distributors, retailers, large-catalog D2C brands',
            'One industry at a time: SaaS, education, healthcare and rehab, professional services',
          ],
          ['How we work', 'The full Nine Gates program', 'The same framework, with enquiry examples'],
        ],
      },
      {
        type: 'cards',
        eb: 'Who we work with',
        h: 'Four kinds of business.',
        items: [
          {
            t: 'B2B distributors and wholesalers',
            d: 'Thousands of SKUs, an ordering portal, ERP connected to the site, many orders still by phone or email.',
            href: '#/industries/industrial-tools-supplies',
            meta: ['Core'],
          },
          {
            t: 'Multi-category retailers',
            d: 'Large catalogs across many categories, several storefronts or regions, several agencies working separately.',
            href: '#/industries/home-furniture',
            meta: ['Core'],
          },
          {
            t: 'Large-catalog D2C brands',
            d: 'Hundreds to thousands of SKUs and variants, rising ad costs, flat conversion rate.',
            href: '#/industries/beauty-personal-care',
            meta: ['Core'],
          },
          {
            t: 'Enquiry-based businesses',
            d: 'The website drives demos, admissions or consultations, and leads leak at forms or follow-up.',
            href: '#/industries/enquiry-based-businesses',
            meta: ['Test'],
            badge: 'Enquiries',
          },
        ],
      },
      {
        type: 'cards',
        eb: 'Choose your industry',
        h: 'Examples, not theory.',
        items: INDUSTRIES.map((i) => ({
          t: i.name,
          d: i.fix,
          href: '#/industries/' + i.slug,
          meta: [i.probs[0][0] + ' first'],
          badge: i.test ? 'Enquiries' : '',
        })),
      },
      cta('Get your free AI scan.', 'Nine Gate score in about 48 hours.'),
    ],
  };

  P['nine-gates'] = {
    t: 'T7',
    crumb: [['Home', '#/'], ['Nine Gates']],
    title: 'Customer journey framework: the Nine Gates | CXWorks',
    blocks: [
      hero(
        'Customer journey framework',
        ['Nine gates.', 'Fix the earliest one that fails.'],
        'Cited, Clicked, Chosen. Every customer passes through nine gates. Fixing a later gate while an earlier one fails is money spent in the wrong place.',
        [{ l: 'Get your Nine Gates score', href: '#/free-ai-scan' }],
      ),
      { type: 'journey', eb: 'The journey', h: 'Each gate, with an example for both doors.', full: true },
      { type: 'gatesall', eb: 'All nine gates', h: 'Three stages. Nine gates. One order.' },
      {
        type: 'list',
        eb: 'Why it matters',
        h: 'Why buyers use it.',
        items: [
          'One shared language for every team and agency',
          'Spend goes to the gate that actually fails',
          'Progress you can score and track monthly',
        ],
      },
      { type: 'stats' },
      {
        type: 'related',
        eb: 'Go deeper',
        items: [
          ['DCX Diagnostic', '#/services/dcx-transformation/dcx-audit'],
          ['Customer journey optimization', '#/customer-journey-optimization'],
          ['Conversion rate optimization', '#/services/conversion-rate-optimization'],
          ['AI search visibility', '#/services/ai-search-visibility'],
        ],
      },
      cta('Get your Nine Gates score.', 'Free AI scan in about 48 hours.'),
    ],
  };
  P.about = {
    t: 'T7',
    crumb: [['Home', '#/'], ['Contact us']],
    title: 'Contact us | CXWorks',
    blocks: [
      hero(
        'Contact us',
        ['A digital customer experience (DCX) firm.', 'AI agents plus experts.'],
        'CXWorks is a digital customer experience (DCX) firm. We pair AI agents that monitor every step of the customer journey with experts who decide and deliver the fixes, from being found in search and AI answers to winning and keeping the customer.',
        [{ l: 'Book a call', act: 'book', topic: 'General' }],
      ),
      {
        type: 'analogy',
        h: 'AI is the smoke detector in every room. Our team is the fire crew.',
        p: 'A typical CRO agency only comes when someone calls about the kitchen.',
      },
      aiLayer,
      { type: 'stats' },
      { type: 'team' },
      {
        type: 'facts',
        eb: 'Contact us',
        items: [
          ['United States', '5755 North Point Pkwy, Alpharetta, GA'],
          ['Phone', '+1 (725) 325 5270'],
          ['Email', 'info@cxworks.com\nidris@cxworks.com\nsowmya@cxworks.com\nrithik@cxworks.com'],
        ],
      },
      cta('Talk to the team.', 'We reply within one business day.', {
        l: 'Book a call',
        act: 'book',
        topic: 'General',
      }),
      cases(),
    ],
  };
  P['ways-to-work'] = {
    t: 'T9',
    crumb: [['Home', '#/'], ['Ways to work']],
    title: 'Ways to work with CXWorks',
    blocks: [
      hero(
        'Ways to work',
        ['Start small.', 'Grow step by step.'],
        'A free scan, fixed-price audits and jobs, and 90-day Build sprints.',
        [
          { l: 'Book a call to pick the right option', act: 'book', topic: 'Ways to work' },
          { l: 'Buy credits', act: 'book', topic: 'Prepaid credits' },
        ],
      ),
      {
        type: 'ladder',
        eb: 'The engagement ladder',
        h: 'Each step sets up the next.',
        p: 'Each step is small enough to say yes to. Pay-as-you-go jobs sit beside the ladder as a side door: any of them can lead to step 2.',
        items: LADDER,
      },
      {
        type: 'analogy',
        h: 'Pay-as-you-go: a good idea, with rules.',
        p: 'Fixed-price jobs with a clear output, never hourly billing. Think of a restaurant: the à la carte menu brings people in, but the set menu (a Build sprint) is where the relationship lives.',
      },
      {
        type: 'list',
        eb: 'Good fit for pay-as-you-go',
        h: 'A job can be pay-as-you-go when:',
        items: [
          'It has a clear finish line: a report, a fixed batch of SKUs, a set of built tests',
          'The scope can be priced up front',
          'It feeds data or quick wins into the bigger journey story',
        ],
        check: true,
      },
      {
        type: 'list',
        eb: 'Better on a retainer',
        h: 'Keep it monthly when the value comes from doing it month after month:',
        items: ['Testing programs', 'Merchandising ops', 'Growth marketing'],
      },
      {
        type: 'table',
        eb: 'Pay-as-you-go by service',
        h: 'What you can buy as a one-off job.',
        cols: ['Service', 'Pay-as-you-go?', 'How it is packaged'],
        rows: [
          ['Catalog and Product Data Foundation', 'Yes, best fit', 'Priced per batch of SKUs cleaned or enriched'],
          [
            'Digital Analytics',
            'Yes, for audits and setup',
            'Fixed-price tracking audit, fixed-price GA4 / Adobe setup',
          ],
          ['Ecommerce Website Development', 'Yes', 'Fixed-price projects, plus prepaid dev credits for small changes'],
          [
            'Conversion Rate Optimization',
            'Partly',
            'Per-test build pricing for brands with their own strategy team. The full program stays on retainer',
          ],
          [
            'AI Search and Shopping Visibility',
            'Partly',
            'Audit and feed fixes pay-as-you-go, monthly tracking on retainer',
          ],
          ['Digital Merchandising', 'Partly', 'One-off search or category rebuild, ongoing ops on retainer'],
          ['Growth Marketing', 'No', 'Retainer only. Results build over months'],
          [
            'DCX Strategy and Transformation',
            'No (except the Diagnostic)',
            'Paid Diagnostic up front, then a Build sprint',
          ],
        ],
      },
      {
        type: 'steps',
        eb: 'Three rules',
        h: 'What keeps pay-as-you-go healthy.',
        items: [
          ['A note on your other gates', 'Every job ends with a short "what we saw across your other gates" note.'],
          ['Prepaid credits', 'Buy a block and spend it on any job from the menu.'],
          ['A minimum job size', 'So small jobs stay worth doing for both sides.'],
        ],
      },
      {
        type: 'cards',
        eb: 'Pay as you go',
        h: 'Audits and fixed-price jobs.',
        items: AUDITS.slice(1, 6)
          .map((a) => ({ t: a.name, d: a.out, href: '#/audits/' + a.slug, meta: [a.time, 'Fixed price'] }))
          .concat(STAGE_ITEMS.build.slice(1, 4)),
      },
      {
        type: 'steps',
        eb: 'Prepaid credits',
        h: 'Buy a block, spend it on any job.',
        items: [
          ['Buy a block', 'Credits paid up front at a better rate.'],
          ['Spend on any job', 'Audits, data batches, dev changes.'],
          ['Get a gate note', 'Every job ends with what we saw across your other gates.'],
        ],
      },
      {
        type: 'steps',
        eb: 'Build sprints',
        h: 'What 90 days covers.',
        items: [
          ['Weeks 1 to 2', 'Confirm the roadmap and scope'],
          ['Weeks 3 to 8', 'Data, search and template fixes'],
          ['Weeks 9 to 11', 'Tracking and first tests'],
          ['Week 12', 'Results review and next-step plan'],
        ],
      },
      {
        type: 'table',
        eb: 'Compare',
        h: 'Side by side.',
        cols: ['', 'Pay as you go', 'Build sprint'],
        rows: [
          ['Best for', 'One clear job', 'Top roadmap issues'],
          ['Length', 'Days to weeks', '90 days'],
          ['Pricing', 'Fixed price or credits', 'Fixed scope'],
          ['AI agents', 'First pass', 'Throughout'],
          ['Gate note', 'Yes', 'Yes'],
        ],
      },
      { type: 'routes', eb: 'Site map', h: 'Every route leads to a DCX Diagnostic or a Build sprint.' },
      faq([
        ['Can I start with one job?', 'Yes. Every pay-as-you-go job ends with a short note on your other gates.'],
        ['Is there a minimum?', 'Yes, a minimum job size, so small jobs stay worth doing for both sides.'],
        ['Do credits expire?', 'Credits are valid for 12 months.'],
      ]),
      cta('Not sure which fits?', 'A 30-minute call is enough to pick.', {
        l: 'Book a call',
        act: 'book',
        topic: 'Ways to work',
      }),
    ],
  };
  P['free-ai-scan'] = {
    t: 'T8',
    focus: true,
    crumb: [['Home', '#/'], ['Free AI scan']],
    title: 'Free website audit: AI scan | CXWorks',
    blocks: [
      {
        type: 'convert',
        kind: 'scan',
        eb: 'Free AI scan',
        a: 'Your Nine Gate score',
        b: 'in about 48 hours.',
        items: [
          'Nine Gate score',
          'Catalog health snapshot',
          'Zero-result search sample',
          'AI visibility check',
          'A two-line note from an expert',
        ],
        steps: [
          ['Submit', 'Four fields, under a minute.'],
          ['AI scans', 'Agents check all nine gates.'],
          ['An expert adds a note', 'You get the score within about 48 hours.'],
        ],
      },
      { type: 'sample', eb: 'Sample output', h: 'What lands in your inbox.', name: 'Free AI scan' },
      { type: 'logos', eb: 'Platforms we work with' },
    ],
  };
  P.contact = {
    t: 'T8',
    focus: true,
    crumb: [['Home', '#/'], ['Contact']],
    title: 'Contact CXWorks',
    blocks: [
      {
        type: 'convert',
        kind: 'book',
        eb: 'Contact',
        a: 'Talk to',
        b: 'the CXWorks team.',
        items: [
          'Phone: +1 (725) 325 5270',
          'Office: 5755 North Point Pkwy, Alpharetta, GA, USA',
          'Email: info@cxworks.com',
          'Support: idris@, rithik@, sowmya@cxworks.com',
        ],
        steps: [
          ['Send', 'Tell us what you need.'],
          ['We reply', 'Within one business day.'],
          ['Call', '30 minutes to pick the right start.'],
        ],
      },
      cases(),
      { type: 'reviews' },
    ],
  };
  P['case-studies'] = {
    t: 'T10',
    crumb: [['Home', '#/'], ['Case studies']],
    title: 'Case studies | CXWorks',
    hub: true,
    blocks: [
      hero('Case studies', ['Named by the gate', 'that was failing.'], 'Filter by gate, industry or door.', [SCAN]),
      { type: 'casehub' },
      cta('Find your earliest failing gate.', 'Free AI scan in about 48 hours.'),
    ],
  };
  CASES.forEach((c) => {
    P['case:' + c.slug] = {
      t: 'T10',
      crumb: [['Home', '#/'], ['Insights', '#/insights'], [c.client]],
      title: c.t + ' | CXWorks',
      blocks: [
        { type: 'casehero', c },
        { type: 'caseflow', c },
        cta('Find your earliest failing gate.', 'Free AI scan in about 48 hours.', {
          l: 'Find your earliest failing gate',
          href: '#/free-ai-scan',
        }),
      ],
    };
  });

  const GROUPS = {
    audit: { eb: 'More ways to diagnose', list: AUDITS.map((a) => [a.name, '#/audits/' + a.slug, 'audit:' + a.slug]) },
    svc: { eb: 'More ways to build', list: SERVICES.map((s) => [s.name, '#/services/' + s.slug, 'svc:' + s.slug]) },
    sol: { eb: 'More solutions', list: SOLUTIONS.map((s) => [s.name, '#/' + s.slug, 'sol:' + s.slug]) },
    ind: { eb: 'More industries', list: INDUSTRIES.map((i) => [i.name, '#/industries/' + i.slug, 'ind:' + i.slug]) },
    run: {
      eb: 'More ways to run',
      list: [
        ['Run pods', '#/run', 'run'],
        ['Ways to work', '#/ways-to-work', 'ways-to-work'],
        ['Nine Gates', '#/nine-gates', 'nine-gates'],
        ['Insights', '#/insights', 'insights'],
      ],
    },
  };
  const HUBS = [
    ['Diagnose', '#/diagnose', 'audit'],
    ['Build', '#/build', 'svc'],
    ['Run', '#/run', 'run'],
    ['Solutions', '#/' + SOLUTIONS[0].slug, 'sol'],
    ['Industries', '#/industries', 'ind'],
  ];
  Object.keys(P).forEach((key) => {
    const g = key.includes(':') ? key.split(':')[0] : GROUPS.run.list.some((x) => x[2] === key) ? 'run' : null;
    if (!GROUPS[g]) return;
    const pg = P[key];
    pg.blocks = pg.blocks.filter((b) => b && b.type !== 'related');
    const items = GROUPS[g].list.filter((x) => x[2] !== key).map((x) => [x[0], x[1]]);
    const blk = {
      type: 'related',
      eb: GROUPS[g].eb,
      items,
      hubs: HUBS.filter((x) => x[2] !== g).map((x) => [x[0], x[1]]),
    };
    let at = pg.blocks.length;
    for (let i = pg.blocks.length - 1; i >= 0; i--)
      if (pg.blocks[i].type === 'cta') {
        at = i;
        break;
      }
    if (g !== 'svc') {
      blk.hasSvcs = true;
      blk.svcs = SERVICES.map((v) => [v.name, '#/services/' + v.slug]);
    }
    pg.blocks.splice(at, 0, blk);
  });
  Object.keys(P).forEach((key) => {
    const pg = P[key];
    pg.blocks = pg.blocks.filter(Boolean);
    if (key === 'build' || pg.blocks.some((b) => b.type === 'related')) {
      if (key === 'run' || key === 'nine-gates' || key === 'case-studies' || key === 'ways-to-work')
        pg.blocks.forEach((b) => {
          if (b.type === 'related' && !b.hasSvcs) {
            b.hasSvcs = true;
            b.svcs = SERVICES.map((v) => [v.name, '#/services/' + v.slug]);
          }
        });
    } else {
      const blk = {
        type: 'related',
        eb: 'Build: our services',
        items: SERVICES.map((v) => [v.name, '#/services/' + v.slug]),
        hubs: HUBS.filter((x) => x[2] !== 'svc').map((x) => [x[0], x[1]]),
      };
      let at = pg.blocks.length;
      for (let i = pg.blocks.length - 1; i >= 0; i--)
        if (['cta', 'convert'].includes(pg.blocks[i].type)) {
          at = key === 'free-ai-scan' || key === 'contact' ? pg.blocks.length : i;
          break;
        }
      pg.blocks.splice(at, 0, blk);
    }
    if (!pg.blocks.some((b) => ['cta', 'convert'].includes(b.type))) pg.blocks.push({ type: 'cta' });
  });
  const URLS = {
    home: '/',
    diagnose: '/diagnose/',
    build: '/build/',
    run: '/run/',
    'nine-gates': '/nine-gates/',
    about: '/about/',
    'ways-to-work': '/ways-to-work/',
    'free-ai-scan': '/free-ai-scan/',
    contact: '/contact-us/',
    industries: '/industries/',
    'case-studies': '/case-studies/',
    insights: '/insights/',
    'audit:dcx-diagnostic': '/services/dcx-transformation/dcx-audit/',
  };
  Object.keys(P).forEach((k) => {
    const [t, s] = k.split(':');
    P[k].url =
      URLS[k] ||
      (t === 'audit'
        ? '/audits/' + s + '/'
        : t === 'svc'
          ? '/services/' + s + '/'
          : t === 'sol'
            ? '/' + s + '/'
            : t === 'ind'
              ? '/industries/' + s + '/'
              : t === 'case'
                ? '/case-studies/' + s + '/'
                : '/' + k + '/');
  });
  const SEO = window.CXSEO || {};
  Object.keys(P).forEach((key) => {
    const sx = SEO[key];
    if (!sx) return;
    const pg = P[key];
    pg.desc = sx.d;
    if (!sx.p || !sx.p.length) return;
    const blk = { type: 'seo', eb: 'In depth', h: sx.h, paras: sx.p };
    let at = pg.blocks.findIndex((b) => b && b.type === 'faq');
    if (at < 0) at = pg.blocks.findIndex((b) => b && ['related', 'cta', 'convert'].includes(b.type));
    if (at < 0) at = pg.blocks.length;
    if (key === 'free-ai-scan' || key === 'contact')
      (at = pg.blocks.findIndex((b) => b && b.type === 'related')), (at = at < 0 ? pg.blocks.length : at);
    pg.blocks.splice(at, 0, blk);
  });
  window.CXD = { pages: P, GATES, CASES, AUDITS, SERVICES, SOLUTIONS, INDUSTRIES, STAGES, LADDER };
})();

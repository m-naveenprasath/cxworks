/* Route remaps, audit name aliases and late content overrides (runs after CXD exists). */
window.CX_AUDITMAP = {
  'digital-merchandising': 'catalog-search-audit',
  'digital-analytics': 'analytics-audit',
  'conversion-rate-optimization': 'cro-ux-audit',
};
window.CX_REMAP = {
  '#/audits/dcx-diagnostic': '#/services/dcx-transformation/dcx-audit',
  '#/diagnose/dcx-diagnostic': '#/services/dcx-transformation/dcx-audit',
  '#/dcx-audit': '#/services/dcx-transformation/dcx-audit',
  '#/audits/catalog-search-audit': '#/services/digital-merchandising/audit',
  '#/audits/analytics-audit': '#/services/digital-analytics/audit',
  '#/audits/cro-ux-audit': '#/services/conversion-rate-optimization/audit',
  '#/diagnose/catalog-search-audit': '#/services/digital-merchandising/audit',
  '#/diagnose/analytics-audit': '#/services/digital-analytics/audit',
  '#/diagnose/cro-ux-audit': '#/services/conversion-rate-optimization/audit',
};
window.CX_NAMES = {
  'DCX Diagnostic': 'DCX Audit',
  'DCX Diagnostic (flagship)': 'DCX Audit (flagship)',
  'CRO and UX Audit': 'CRO Audit',
  'CRO and UX audit': 'CRO audit',
  'Analytics (GA4) Audit': 'Digital Analytics Audit',
  'Analytics (GA4) audit': 'Digital Analytics audit',
  'Catalog and Search Audit': 'Digital Merchandising Audit',
  'Catalog and search audit': 'Digital Merchandising audit',
};
window.CXAU = function (slug) {
  var h = '#/audits/' + slug;
  return window.CX_REMAP[h] || h;
};
window.CX_XLSX_APPLY = function () {
  if (!(window.CXD && window.CXD.pages && window.CXD.pages.home)) return false;
  if (window.CXD.__x) return true;
  window.CXD.__x = true;
  window.__cxXlsxDone = true;
  (function () {
    var M = {
      home: {
        url: '/',
        title: 'CXWorks | Premium DCX Partner for eCommerce Brands',
        d: 'CXWorks helps eCommerce businesses improve customer experience, analytics, CRO, merchandising, and digital growth through one connected operating system.',
        h: 'Premium Digital Customer Experience Partner for eCommerce Brands',
        paras: [
          'CXWorks drives measurable eCommerce growth by aligning digital customer experience, analytics, merchandising, and acquisition into an integrated operating system.',
          'CXWorks is a Digital Customer Experience and Growth partner for eCommerce brands across B2B, B2C, and D2C.',
          'Modern eCommerce growth fails not because businesses lack technology, channels, or marketing investment. It fails because customer experience, analytics, merchandising, experimentation, AI search visibility, and growth marketing operate independently rather than as one connected system.',
          'CXWorks helps B2B, B2C, and D2C eCommerce businesses identify where customer journeys break, prioritize the highest-impact improvements, and build measurable digital growth through one connected operating system.',
        ],
        faq: [],
      },
      'svc:digital-merchandising': {
        url: '/services/digital-merchandising/',
        title: 'Digital Merchandising Solutions for eCommerce | CXWorks',
        d: "Improve product discovery, on-site search, category performance, and conversions with CXWorks's data-driven Digital Merchandising Solutions.",
        h: 'Digital Merchandising Solutions',
        lead: 'Grow your business by making the right products easier to find and choose.',
        paras: [
          'CXWorks helps B2B, B2C and D2C eCommerce businesses connect product discovery, search, category experience, product information and commercial intelligence into one merchandising system.',
          'Customers do not always search using the same language businesses use in their product catalogs. They search naturally using synonyms, alternative terminology, incomplete phrases, or even misspellings.',
          'When search depends on exact product names or catalog terminology, relevant products can remain invisible even when they are available.',
          'Discovery friction does not end once a customer reaches the right category. Large assortments still need to be narrowed into a manageable set of relevant options. When filtering, sorting, and category structures fail to support that process, customers are left to do the work themselves.',
        ],
        faq: [
          [
            'What is Digital Merchandising?',
            'Digital Merchandising improves how products are discovered, prioritised, presented, and selected across digital channels.',
          ],
          [
            'Is Digital Merchandising just about ecommerce search?',
            'No. It also covers taxonomy, navigation, PLPs, filtering, ranking, product information, recommendations, and product visibility.',
          ],
          [
            'How does Digital Merchandising improve conversion?',
            'It helps customers find more relevant products and make confident decisions with less friction.',
          ],
          [
            'How does CXWorks approach Digital Merchandising?',
            'CXWorks focuses on making products easier to find, easier to choose, and merchandising decisions more commercially intelligent.',
          ],
          [
            'Can CXWorks help with an existing ecommerce platform?',
            'Yes. CXWorks can improve search, taxonomy, PLPs, filtering, product information, ranking, and recommendations within your existing platform',
          ],
        ],
      },
      'svc:dcx-transformation': {
        url: '/services/dcx-transformation/',
        title: 'DCX Strategy & Transformation Solutions | CXWorks',
        d: 'Transform fragmented digital initiatives into a connected DCX Operating System that improves discoverability, conversion, retention, and long-term growth.',
        h: 'DCX Strategy & Transformation Solutions',
        lead: 'Turn fragmented customer experiences into a connected growth strategy.',
        paras: [
          'CXWorks helps B2B, B2C, and D2C ecommerce businesses identify where digital customer journeys break down, understand what causes the friction, and prioritize the changes that matter commercially.',
          'Customers experience one journey. Businesses manage that journey across separate teams, platforms, channels, data sets, and initiatives.',
          'Marketing owns acquisition. Merchandising owns product discovery. Ecommerce owns conversion. Technology owns platforms. Analytics reports performance. Operations own fulfillment. Customer service handles issues after the purchase.',
          'That disconnect creates commercial friction. A customer can find the right product through search but struggle to understand it on the product page. Checkout can work technically while still creating unnecessary abandonment. A successful acquisition campaign can send qualified traffic into an experience that fails to convert.',
        ],
        faq: [
          [
            'What is DCX strategy?',
            'DCX strategy defines how a business improves digital customer experience across the complete customer journey. It connects customer behavior, experience, commerce, data, technology, and business priorities so teams can make informed transformation decisions.',
          ],
          [
            'What does a DCX transformation include?',
            'A DCX transformation can include customer journey assessment, experience analysis, commerce and conversion analysis, analytics review, technology assessment, operating-model considerations, prioritization, and transformation roadmap development. The exact scope depends on business objectives and current maturity.',
          ],
          [
            'How does DCX strategy improve ecommerce performance?',
            'DCX strategy improves ecommerce performance by identifying customer-experience issues that affect measurable business outcomes. The work connects journey friction with metrics such as discovery, conversion, retention, and customer lifetime value.',
          ],
          [
            'What does a DCX assessment deliver?',
            'A DCX assessment delivers an evidence-based view of current customer experience, key friction points, opportunity areas, and strategic priorities. CXWorks uses these findings to establish what should happen next rather than stopping at diagnosis.',
          ],
          [
            'How do you measure digital customer experience?',
            'Digital customer experience is measured through customer behavior, experience quality, and business performance. Depending on the business, this can include conversion, search behavior, checkout progression, retention, customer feedback, task completion, and customer lifetime value.',
          ],
          [
            'How long does DCX transformation take?',
            'The timeframe depends on the scope, business objectives, current digital maturity, and number of systems and teams involved. CXWorks establishes the appropriate roadmap after assessing the current state rather than applying a fixed timeframe to every business.',
          ],
          [
            'Does DCX strategy include implementation?',
            'DCX strategy establishes the priorities, roadmap, measurement requirements, and direction needed for implementation. Implementation scope depends on the engagement and the transformation priorities identified during the assessment.',
          ],
        ],
      },
      'svc:digital-analytics': {
        url: '/services/digital-analytics/',
        title: 'Digital Analytics Solutions for eCommerce Growth | CXWorks',
        d: 'Improve eCommerce performance with Digital Analytics Solutions from CXWorks. Build trusted measurement, customer intelligence, GA4 and dashboards',
        h: 'Digital Analytics & Experience Intelligence',
        lead: 'Build the system that connects Customer Behavior to Business Performance.',
        paras: [
          'CXWorks helps B2B, B2C, and D2C ecommerce businesses connect analytics implementation, behavioral intelligence, experimentation, customer data, commerce data and business KPIs to create a clearer view of digital customer experience and its effect on growth.',
          'Modern eCommerce businesses collect customer signals across analytics platforms, tag managers, commerce platforms, search systems, CRM and CDP platforms, experimentation tools, data warehouses and BI environments. The problem is rarely a complete absence of data. The problem is that the data often sits in separate systems, follows different definitions and answers different questions.',
          'Google states that large explorations in GA4 can use sampled data, while data thresholds can restrict information displayed in reports and explorations.',
          'Any dashboard can show that conversion has fallen. It cannot automatically pinpoint if the root cause lies in acquisition quality, product discovery, site behavior, pricing, checkout, or an experience issue that standard analytics does not capture.',
        ],
        faq: [
          [
            'What is digital analytics in eCommerce?',
            'Digital analytics measures customer behavior and connects that behavior to commercial performance across the digital customer journey. It helps businesses understand how customers discover, evaluate, purchase and return, while identifying the data and experience signals that explain changes in KPIs.',
          ],
          [
            'How is digital analytics different from standard web analytics?',
            'Digital analytics connects web or app behavior with commerce, customer, search, experimentation and business data. Standard web analytics can report what users do on a digital property, while a broader digital analytics framework examines how those behaviors relate to revenue, customer value, retention and experience performance.',
          ],
          [
            'What is experience intelligence?',
            'Experience intelligence connects quantitative behavioral data with qualitative and technical experience signals to explain why customers behave differently. It brings together analytics, behavioral analysis, experimentation, search, customer data and commerce signals to identify friction that a single analytics platform may not reveal.',
          ],
          [
            'Do we need to replace our existing analytics technology?',
            'No. CXWorks assesses the technology you already use before determining what needs to change. The analytics architecture can include GA4 or Adobe Analytics, GTM, experimentation platforms, search technology, CRM or CDP systems, commerce platforms, data warehouses and BI tools. The objective is to make the existing architecture produce consistent, connected evidence.',
          ],
          [
            'How does CXWorks improve analytics accuracy?',
            'CXWorks improves measurement accuracy by examining how data is collected, defined, transferred and reported across the analytics architecture. This includes event implementation, parameters, tag management, ecommerce tracking, source reconciliation, KPI definitions and the relationship between platform-level metrics and business outcomes.',
          ],
          [
            'How does digital analytics support customer experience improvement?',
            'Digital analytics identifies where customer behavior changes across the journey, while experience intelligence adds the signals needed to investigate why that change occurs. CXWorks connects these findings to commercial KPIs so teams can prioritize the experience issues that have a measurable relationship with conversion, revenue, customer value or retention.',
          ],
        ],
      },
      'svc:conversion-rate-optimization': {
        url: '/services/conversion-rate-optimization/',
        title: 'Conversion Rate Optimisation (CRO) for eCommerce | CXWorks',
        d: 'Increase eCommerce revenue with data-driven Conversion Rate Optimisation (CRO). CXWorks delivers audits, A/B testing, analytics, and UX research.',
        h: 'Conversion Rate Optimisation',
        lead: 'Grow your business by making the right products easier to find and choose.',
        paras: [
          'CXWorks helps B2B, B2C and D2C eCommerce businesses connect product discovery, search, category experience, product information and commercial intelligence into one merchandising system.',
          'Conversion friction often appears as a weak button, an underperforming page, or an abandoned checkout. The true cause usually begins earlier.',
          'A visitor may arrive with the right intent but land on a page that does not match the promise of the campaign. A shopper may find the right product but remain uncertain about specifications, fit, delivery, returns, or value. A buyer may begin checkout but stop when an unexpected cost or unnecessary step interrupts momentum. These are not isolated page problems. They are connected breaks across the customer journey.',
          'Analytics can show where customers leave. Behavioral evidence helps explain how they struggle. Research and experimentation reveal why the friction exists and which change is most likely to remove it.',
        ],
        faq: [
          [
            'What is Conversion Rate Optimization?',
            'Conversion Rate Optimization is the structured process of improving how effectively a digital experience turns visitors into customers, leads, subscribers, or other meaningful outcomes. It combines analytics, customer research, UX evaluation, experimentation, and measurement.',
          ],
          [
            'Do we need large amounts of traffic to run CRO?',
            'Not every CRO engagement requires high-volume A/B testing. When traffic is limited, CXWorks can use deeper qualitative research, funnel analysis, usability evaluation, customer feedback, and phased validation to make evidence-informed improvements. The testing method should reflect the available traffic and the risk of the decision.',
          ],
          [
            'Which parts of the customer journey can CXWorks optimize?',
            'CXWorks can assess and improve landing pages, navigation, search, category pages, product pages, forms, cart, checkout, lead-generation journeys, and selected retention experiences. The priority is determined by where the greatest evidence-backed opportunity exists.',
          ],
          [
            'How does CXWorks decide what to test?',
            'We prioritise hypotheses using customer evidence, commercial impact, confidence, effort, strategic relevance, and technical feasibility. This ensures the testing roadmap is driven by meaningful opportunities rather than opinions or cosmetic preferences.',
          ],
          [
            'Can CXWorks work with our existing analytics, testing, and eCommerce platforms?',
            'Yes. CXWorks can work within existing environments including GA4, Adobe Analytics, VWO, Optimizely, AB Tasty, Hotjar, FullStory, and major eCommerce platforms. We begin by assessing measurement and implementation readiness before defining the programme.',
          ],
          [
            'How does CRO work with the wider CXWorks service portfolio?',
            'CRO owns the Conversion gate and supports Relevance, Usability, and Trust within the DCX Operating System. Where an issue begins earlier in the journey, CRO works with Digital Merchandising, Analytics, UX, Content, Product Data, Growth Marketing, AI Enablement, and eCommerce Development to address the actual cause.',
          ],
        ],
      },
      'svc:growth-marketing': {
        url: '/services/growth-marketing/',
        title: 'Growth Marketing - CXWorks',
        h: 'Growth Marketing Solutions',
        lead: 'Build a Measurable Growth System that integrates Organic & AI Visibility, Customer Acquisition, and Retention',
        paras: [
          'CXWorks helps B2B, B2C and D2C businesses improve how they are discovered, found and remembered across paid media, search, content, AI-driven discovery and lifecycle marketing.',
          'Growth does not always slow because businesses are failing to reach enough people. Brands can invest across paid media, SEO, content, and social while still struggling to turn that activity into sustainable commercial growth.',
          'The first challenge is discoverability. Customers now find brands across traditional search, social platforms, marketplaces, communities and AI-powered answers. If your business is not visible when high-intent questions are being asked, competitors can enter the consideration set before you do.',
          'The challenge continues after discovery. More traffic does not automatically mean better growth. Campaigns can generate clicks without qualified demand. SEO can attract visits without commercial intent. Content can create attention without creating enough value.',
        ],
        faq: [
          [
            'What is Growth Marketing?',
            'Growth Marketing is a data-driven approach to improving discoverability, acquisition, engagement and retention. It connects paid media, SEO, content, AI Search Visibility and lifecycle marketing around measurable business growth.',
          ],
          [
            'What is the difference between Growth Marketing and Performance Marketing?',
            'Performance Marketing typically focuses on measurable outcomes from paid channels. Growth Marketing is broader, combining paid, organic, content, lifecycle and retention activity across the customer journey.',
          ],
          [
            'How does Growth Marketing improve customer retention?',
            'Growth Marketing uses lifecycle strategy, segmentation and behavioural signals to create more relevant post-acquisition engagement, including welcome, post-purchase, reactivation and win-back journeys.',
          ],
          [
            'How does CXWorks approach Growth Marketing?',
            'CXWorks identifies where growth is breaking across discoverability, findability, acquisition and retention, then connects channels, customer behaviour and measurement to prioritise the highest-impact opportunities.',
          ],
          [
            'How does CXWorks measure Growth Marketing success?',
            'CXWorks measures outcomes using metrics such as CAC, ROAS, Organic Traffic Growth, Email Revenue Contribution, LTV:CAC and AI Search Visibility, aligned to the business model and commercial priorities.',
          ],
        ],
      },
      'svc:catalog-management': {
        url: '/services/catalog-management/',
        title: 'Catalog & Product Data Foundation - CXWorks',
        h: 'Catalog & Product Data Foundation',
        lead: 'Give every product the data foundation to be found, understood, and chosen.',
        paras: [
          'CXWorks builds and structures the product data layer across SKUs, attributes, taxonomy, variants, and specifications. The service supports new catalog creation, platform migrations, new-market launches, and legacy catalog cleanup, creating the data foundation required for stronger discoverability, findability, and relevance.',
          'Customers cannot confidently find or evaluate products when key product information is missing, inconsistent, or difficult to compare.',
          'Supplier data arrives in different formats. Attributes remain incomplete. Categories become inconsistent. Product specifications vary across channels. Over time, these gaps affect search, filtering, merchandising, product pages, and AI-powered discovery.',
          'We help B2B, B2C, and D2C eCommerce businesses cover SKU and catalog building, product enrichment, categorization, and attribute governance creating structured product data to support stronger Discoverability, Findability, and Relevance.',
        ],
        faq: [
          [
            'What is Catalog & Product Data Foundation?',
            'Catalog & Product Data Foundation creates the structured product data required for effective eCommerce discovery, search, merchandising, and channel distribution.',
          ],
          [
            'How is this different from Digital Merchandising?',
            'Catalog Foundation builds and structures product data. Digital Merchandising analyzes and optimizes the catalog for discovery, relevance, and commercial performance.',
          ],
          [
            'Can you clean an existing catalog?',
            'Yes. The service supports duplicate detection, missing-attribute remediation, categorization cleanup, enrichment, and ongoing catalog governance.',
          ],
          [
            'Do you use AI for catalog enrichment?',
            'Yes. AI accelerates extraction, categorization, and first-pass content generation, while human review verifies the output before publication.',
          ],
          [
            'When should we start with a Catalog Audit?',
            'Start with a Catalog Audit when the size or quality of the data problem is unclear. The audit identifies the SKUs, attributes, and taxonomy issues that require remediation.',
          ],
        ],
      },
      'svc:ecommerce-website-development': {
        url: '/services/ecommerce-website-development/',
        title: 'eCommerce Website Development - CXWorks',
        h: 'eCommerce Website Development',
        lead: 'Build an ecommerce experience designed to sell, scale and evolve.',
        paras: [
          'CXWorks helps B2B, B2C and D2C businesses design and develop ecommerce websites that connect experience, technology, content and commerce into one scalable system. We identify where customers experience friction, where the current platform limits growth and where technology can create a better path from discovery to purchase.',
          "Customers can struggle because navigation doesn't match how they shop. Product pages may not answer important questions. The checkout experience may introduce unnecessary steps. Mobile experiences may feel like an afterthought. Or the underlying technology may make it difficult for your teams to launch, optimize and scale.",
          'A problem that appears on one page can stem from somewhere else in the experience. Poor navigation can prevent discovery, weak category structures can make product selection difficult, and incomplete product information can create uncertainty.',
          "A complicated checkout can turn purchase intent into abandonment. And an inflexible technology stack can make every improvement slower and more expensive to deliver. That's why ecommerce website development should look beyond individual pages and features.",
        ],
        faq: [
          [
            'What is Ecommerce Website Development?',
            'Ecommerce Website Development covers the design, development, and optimisation of digital experiences that help customers discover, evaluate, and purchase products.',
          ],
          [
            'When should a business invest in Ecommerce Website Development?',
            'When an existing website creates friction in navigation, product discovery, mobile experience, checkout, or performance — or when the current platform no longer supports business growth.',
          ],
          [
            'Can CXWorks redesign an existing ecommerce website?',
            'Yes. CXWorks can assess and redesign existing ecommerce experiences across navigation, product and category pages, mobile experience, checkout, and performance.',
          ],
          [
            'Can CXWorks build a new ecommerce website from scratch?',
            'Yes. CXWorks can support new ecommerce builds from information architecture and experience design through development, integrations, launch, and optimisation.',
          ],
          [
            'Does Ecommerce Website Development include mobile optimisation?',
            'Yes. Mobile experience is considered across navigation, product discovery, product pages, cart, checkout, and other key customer journeys.',
          ],
          [
            'Can CXWorks improve ecommerce website speed and performance?',
            'Yes. CXWorks can assess technical and experience-related performance issues and implement improvements that support faster page experiences, better usability, and more efficient customer journeys.',
          ],
        ],
      },
      'audit:dcx-diagnostic': {
        url: '/services/dcx-transformation/dcx-audit/',
        title: 'DCX Audit: Find Where Your Journey Leaks Revenue | CXWorks',
        d: 'The CXWorks DCX Audit scores your customer journey across nine gates, from Cited to Clicked to Chosen, and shows which fix returns the most revenue first.',
        h: 'DCX Audit Form',
        lead: 'See Where Your Customer Journey is Leaking Revenue',
        paras: [
          'The DCX Audit scores your customer journey across the nine gates that take a buyer from being Cited, to Clicked, to Chosen. We identify the earliest and most impactful gates where your journey breaks, because everything downstream of that leads to lost opportunities.',
          'Most CX audits produce a long list of issues. The harder question is which one matters first.',
          'CXWorks scores each of the nine gates against behavioural evidence, customer feedback and competitor benchmarks. We then trace upstream from where revenue is leaking to find the earliest gate where the journey meaningfully breaks. That gate, not the loudest symptom, is where intervention starts.',
          'Score each gate. Analytics, session behaviour and an expert UX and content review, rated against defined criteria for that gate.',
        ],
        faq: [
          [
            'What does a gate-based CX diagnosis uncover?',
            'Where your journey is breaking across the nine gates, which break comes first, and roughly what each is costing. That gives you a sequence for investment, not just a list of problems.',
          ],
          [
            'How is this different from a standard website audit?',
            'A standard audit catalogues usability, content or technical issues, usually as a flat list. A gate audit places each issue in the journey sequence and sizes its business impact. You see which issues to fix first and which are symptoms of an earlier break.',
          ],
          [
            'How do you estimate revenue leakage?',
            'We take the drop-off at each gate, apply your conversion rate and average order value, and compare it with benchmark performance for that gate. The gap is the estimated leakage. Every assumption is shown, and the figure is used to rank priorities rather than as a claim of exact attribution.',
          ],
          [
            'How long does a CX Audit take?',
            '24 to 48 hours, depending on how quickly we can access your data and how many journeys are in scope.',
          ],
          [
            'What if our analytics data is incomplete?',
            'We work with what exists, add session analysis, expert review and customer research, and flag where confidence in a finding is lower.',
          ],
          [
            'What happens after the diagnosis?',
            'Most of our clients move into Journey Mapping & Experience Redesign for the gates that break first, then use the Experience Optimisation Framework to improve them. The scorecard baseline lets you track progress through the Measurement & Intelligence Layer.',
          ],
        ],
      },
      'audit:catalog-search-audit': {
        url: '/services/digital-merchandising/audit/',
        title: 'Digital Merchandising Audit for eCommerce | CXWorks',
        d: 'A Digital Merchandising Audit that checks search, filters, categories and product data to show where shoppers fail to find, compare and choose products.',
        h: 'Digital Merchandising Audit',
        lead: 'Find Where Your Digital Storefront Is Losing Customers',
        paras: [
          'Your products may be strong, but can customers easily find the right products, understand their options, and move confidently toward purchase?',
          'Our Digital Merchandising Audit examines your digital storefront to uncover gaps in findability, relevance, product presentation, and merchandising performance.',
          'We assess your digital merchandising experience from product discovery through consideration and purchase, focusing on how effectively customers can find, understand, and engage with your product range.',
          "We begin with findability across branded and on-site search, navigation, category structures, rankings, and product discovery. This reflects Merchandising's role in Gate 2, while also supporting Growth Marketing's broader findability work.",
        ],
        faq: [],
      },
      'audit:analytics-audit': {
        url: '/services/digital-analytics/audit/',
        title: 'Digital Analytics Audit: GA4 & Tracking Review | CXWorks',
        d: 'Check that every order, lead and campaign is tracked correctly. Our Digital Analytics Audit reviews GA4, tagging, consent and dashboards you can trust.',
        h: 'Digital Analytics Audit',
        lead: 'Find the Gaps Between Your Data and Your Decisions',
        paras: [
          'Organisations may have plenty of data, but incomplete tracking, inconsistent measurement, and disconnected reporting can make it difficult to know what is really happening.',
          'Our Digital Analytics Audit examines the measurement and intelligence layer behind every digital experience to identify data-quality gaps, tracking issues, reporting limitations, and opportunities to turn customer data into actionable insight.',
          'We assess the measurement infrastructure that supports your digital customer experience, from business objectives and KPI definition through tracking, reporting, behavioural analysis, and customer intelligence.',
          'We begin by reviewing how business goals translate into primary, secondary, and diagnostic KPIs, including the leading metrics used to evaluate performance across the DCX Operating System.',
        ],
        faq: [],
      },
      'audit:cro-ux-audit': {
        url: '/services/conversion-rate-optimization/audit/',
        title: 'CRO Audit: Find What Stops Visitors Converting | CXWorks',
        d: 'Our CRO Audit reviews landing pages, product pages, cart and checkout with analytics and UX evidence to find the friction that costs you conversions.',
        h: 'CRO Audit',
        lead: 'Find Where Customers Are Dropping Out of Your Journey',
        paras: [
          'Your website may be attracting valuable traffic, but are customers completing the actions that matter?',
          'Our CRO Audit examines your conversion experience to identify friction, drop-off points, and opportunities to turn more visitors into customers.',
          'We assess the conversion journey from entry point through completed action, identifying where customers encounter friction and where improvements can create measurable commercial impact.',
          'We begin with quantitative analysis of drop-offs and conversion behaviour, examining funnels, journeys, key actions, and stage-level performance. We complement this with qualitative evidence such as session recordings, heatmaps, surveys, exit polls, and heuristic UX evaluation.',
        ],
        faq: [],
      },
      about: {
        url: '/about/',
        title: 'About CXWorks: Digital Customer Experience Consultancy',
        d: 'CXWorks is a digital customer experience consultancy with 15+ years helping B2B, B2C and D2C eCommerce brands grow through CX, analytics, CRO and search.',
        h: 'A Premium Digital Customer Experience Partner',
        paras: [
          'CXCommerce is a specialist Digital Customer Experience (DCX) consultancy that helps B2B, B2C, and D2C eCommerce businesses unlock measurable growth.',
          'CXWorks is a specialist Digital Customer Experience (DCX) consultancy that helps B2B, B2C, and D2C eCommerce businesses unlock measurable growth through connected strategy, customer intelligence, experimentation, analytics, and optimization.',
          'Most organizations invest heavily in websites, platforms, marketing channels, analytics tools, and customer acquisition programs. Yet many still struggle to achieve consistent improvements in conversion, customer retention, and digital profitability. The reason is rarely a lack of technology. The reason is usually a lack of connection between customer experience, data, optimization, and growth execution.',
          'We help eCommerce organizations move beyond fragmented digital initiatives and build a connected growth system that identifies customer friction, prioritizes the highest-impact opportunities, and continuously improves performance across the customer journey. Our approach is built around the DCX Operating System, a framework that helps businesses become more discoverable, more relevant, and more likely to be chosen by customers. This positioning is central to our mission and operating model.',
        ],
        faq: [],
      },
      contact: {
        url: '/contact-us/',
        title: 'Contact CXWorks | Talk to a Digital CX Expert',
        d: 'Contact CXWorks about eCommerce customer experience, analytics, CRO, merchandising or AI search. Email info@cxworks.com or call +1 (725) 325-5270.',
        paras: [],
        faq: [],
      },
      'sol:customer-journey-optimization': {
        d: 'Map the customer journeys that matter, then turn them into future-state blueprints, IA and wireframes your teams can build',
        paras: [
          'A journey can be technically complete and still feel broken. A customer may land on a product page from search without the context they would have had on the homepage. Someone else might start on mobile and be unable to continue where they left off on desktop. Another customer may see one promise in an ad and a different one at checkout. Each page works on its own, but the overall journey doesn’t.',
          'When teams improve screens one at a time, fixing one gap can create another. A shared future-state design gives every team a clear picture of what the experience should look like before anyone starts building.',
          'Choose the journeys. Agree the 3–5 segments and journeys with the most value at stake, using gate audit evidence where it exists.',
          'Map the current state. Trace how each segment really moves, including entry points midway through, device switches and loops back.',
        ],
        faq: [
          [
            'How do you map a non-linear customer journey?',
            'We start from where customers actually enter, not where the site expects them to. Analytics shows the real entry points and paths for each segment, and we map those, including loops back and device switches, rather than forcing everyone into a single funnel.',
          ],
          [
            'How many journeys should we map?',
            'We usually start with the 3–5 customer segments that carry the most value. Focusing there gets designs built sooner; other journeys can follow once the first set is live.',
          ],
          [
            'Does this include UX design, or just maps?',
            'Both. The work runs from journey maps through to information architecture, wireframes and clickable prototypes your teams can build from.',
          ],
          [
            'Do we need a CX Diagnosis & Gate Audit first?',
            'It isn’t required, but it helps. The audit shows which gates break first, so the redesign starts where it will recover the most value.',
          ],
          [
            'Will our design and engineering teams be able to use the output?',
            'Yes. Blueprints, IA and prototypes are built to slot into your existing design system and backlog, and we hand them over in a working session rather than a slide deck.',
          ],
          [
            'How do we know the redesign worked?',
            "The target gates are scored before and after, and the Experience Optimisation Framework and Measurement & Intelligence Layer track the change once designs go live. It isn't required, but it helps. The audit shows which gates break first, so the redesign starts where it will recover the most value.",
          ],
        ],
      },
      'sol:customer-experience-consulting': {
        d: 'A repeatable system for sizing, prioritising and testing CX improvements, with a hypothesis library, CRO sprint plan and 90-day roadmap',
        paras: [
          'Without a shared way to prioritise, optimisation follows opinion, urgency or whoever asks loudest. The result is a long backlog with no clear view of what each idea is worth, how sure anyone is, or what it costs to try. Tests run in isolation, and lessons from one rarely shape the next.',
          'We build an optimisation system that links the problems found in diagnosis to experiments your teams can run. Every opportunity is scored on the same terms, such as likely impact, confidence in the evidence and effort to deliver, using established models like ICE and PIE.',
          "Experiment: Run an A/B or multivariate test where traffic allows, or another method where it doesn't.",
        ],
        faq: [
          [
            'How do you prioritise CX opportunities?',
            'Every idea is scored on the same few questions: how much impact it could have, how strong the evidence is, and how much effort it takes. Established models such as ICE (Impact, Confidence, Ease) and PIE (Potential, Importance, Ease) provide the structure, adapted to your business. Ideas then compete on evidence, not on who asked for them.',
          ],
          [
            'Is this the same as CRO?',
            'CRO is a core part of it, but the framework is broader. It connects testing to the problems found across the whole journey, so experiments target the gates that are actually holding performance back.',
          ],
          [
            "What if we don't have enough traffic for A/B testing?",
            'Many sites don’t, especially for smaller segments or B2B journeys. We match the method to your traffic, using longer test windows, bigger changes, usability testing or before-and-after measurement where a split test can’t reach significance.',
          ],
          [
            'Do you run the tests, or does our team?',
            'We can work both ways. CXWorks can run the first sprints with your team, then hand over, or support your existing CRO team from the start.',
          ],
          [
            'What happens after the first roadmap?',
            "The cycle keeps going. Each result updates the hypothesis library and the scores, so the next sprint starts from what you’ve learned rather than from scratch. The Measurement & Intelligence Layer tracks the impact over time. Many sites don't, especially for smaller segments or B2B journeys. We match the method to your traffic, using longer test windows, bigger changes, usability testing or before-and-after measurement where a split test can't reach significance. The cycle keeps going. Each result updates the hypothesis library and the scores, so the next sprint starts from what you've learned rather than from scratch. The Measurement & Intelligence Layer tracks the impact over time.",
          ],
        ],
      },
    };
    window.CXSEO = window.CXSEO || {};
    window.CXSEO.insights = Object.assign({}, window.CXSEO.insights || {}, {
      title: 'eCommerce & Digital CX Insights | CXWorks',
      d: 'Guides on digital customer experience, eCommerce challenges, business models, technology platforms, B2B, D2C, content and merchandising from CXWorks.',
    });
    var P = (window.CXD && window.CXD.pages) || {};
    Object.keys(M).forEach(function (k) {
      var pg = P[k],
        m = M[k];
      if (!pg) return;
      if (m.title) pg.title = m.title;
      if (m.d) pg.desc = m.d;
      if (m.url) pg.url = m.url;
      var hero = pg.blocks.find(function (b) {
        return b && b.type === 'hero';
      });
      if (hero && m.lead) hero.lead = m.lead;
      if (hero && m.h && /^(svc|audit):/.test(k)) {
        hero.a = m.h.replace(/ Form$/, '');
        hero.b = '';
      }
      if (m.paras && m.paras.length) {
        var sb = pg.blocks.find(function (b) {
          return b && b.type === 'seo';
        });
        if (sb) {
          sb.paras = m.paras;
          if (m.h) sb.h = m.h;
        } else {
          var at = pg.blocks.findIndex(function (b) {
            return b && ['faq', 'related', 'cta', 'convert'].indexOf(b.type) >= 0;
          });
          pg.blocks.splice(at < 0 ? pg.blocks.length : at, 0, {
            type: 'seo',
            eb: 'In depth',
            h: m.h || pg.title.split('|')[0].trim(),
            paras: m.paras,
          });
        }
      }
      if (m.faq && m.faq.length >= 2) {
        var fb = pg.blocks.find(function (b) {
          return b && b.type === 'faq';
        });
        if (fb) fb.items = m.faq;
        else {
          var at2 = pg.blocks.findIndex(function (b) {
            return b && ['related', 'cta', 'convert'].indexOf(b.type) >= 0;
          });
          pg.blocks.splice(at2 < 0 ? pg.blocks.length : at2, 0, { type: 'faq', eb: '', h: 'FAQ', items: m.faq });
        }
      }
    });
  })();
  (function () {
    var O = {
        run: [
          'Run: Ongoing DCX Optimisation Pods for eCommerce | CXWorks',
          'Keep all nine customer journey gates improving with a CXWorks Run pod: AI agents monitor every gate and a dedicated team ships fixes and tests each month.',
        ],
        'audit:seo-audit': [
          'SEO Audit Services for Large eCommerce Catalogs | CXWorks',
          'An eCommerce SEO audit covering crawl, indexation, category and product pages, internal links and content gaps, with a fix list ranked by revenue impact.',
        ],
        'audit:technical-seo-audit': [
          'Technical SEO Audit for eCommerce Websites | CXWorks',
          'A technical SEO audit of crawlability, indexation, site speed, Core Web Vitals, structured data and faceted navigation, with clear fixes for your dev team.',
        ],
        'audit:ai-visibility-audit': [
          'AI Visibility Audit: ChatGPT, Gemini & Perplexity | CXWorks',
          'See how often AI assistants like ChatGPT, Gemini and Perplexity cite your brand, which competitors they recommend instead, and how to earn more citations.',
        ],
        'audit:accessibility-audit': [
          'eCommerce Accessibility Audit (WCAG 2.2) | CXWorks',
          'A WCAG 2.2 accessibility audit of your store’s key journeys, from navigation and search to checkout, with prioritised fixes that also lift conversion.',
        ],
        'svc:ai-search-visibility': [
          'AI Search Visibility & GEO Services | CXWorks',
          'Get your brand cited in AI answers. CXWorks improves AI search visibility across ChatGPT, Gemini and Perplexity with structured content and entity signals.',
        ],
        'svc:growth-marketing': ['Growth Marketing Services for eCommerce | CXWorks', null],
        'svc:catalog-management': ['Catalog & Product Data Management Services | CXWorks', null],
        'svc:ecommerce-website-development': [
          'eCommerce Website Development Services | CXWorks',
          'eCommerce website development on Shopify, Adobe Commerce, BigCommerce and headless stacks, built for fast pages, clean product data and higher conversion.',
        ],
        'sol:customer-experience-consulting': [
          'Customer Experience Consulting for eCommerce | CXWorks',
          'Customer experience consulting that finds where your digital journey breaks first, puts a revenue value on each fix and helps your team deliver it.',
        ],
        'sol:customer-journey-optimization': [
          'Customer Journey Optimization for eCommerce | CXWorks',
          'Customer journey optimization across all nine gates, from search to repeat order, using journey mapping, analytics and testing to remove friction.',
        ],
        'sol:ecommerce-consulting': [
          'eCommerce Consulting for B2B, B2C & D2C Brands | CXWorks',
          'eCommerce consulting for B2B, B2C and D2C brands: strategy, platform, catalog, search, CRO and analytics, prioritised by where revenue is leaking.',
        ],
        'nine-gates': [
          'The Nine Gates: Customer Journey Framework | CXWorks',
          'The Nine Gates framework maps every step from Cited to Clicked to Chosen, so you can find the earliest gate where your eCommerce journey loses customers.',
        ],
        'ways-to-work': [
          'Ways to Work With CXWorks: Audit, Sprint or Pod',
          'Start with a free AI scan or fixed-price audit, fix the top issues in a 90-day Build sprint. Choose your path.',
        ],
        'free-ai-scan': [
          'Free AI Website Scan: Nine Gate Score in 48h | CXWorks',
          'Get a free AI scan of your eCommerce site: a Nine Gate score, catalog snapshot, zero-result search sample and AI visibility check within about 48 hours.',
        ],
      },
      P = (window.CXD && window.CXD.pages) || {};
    Object.keys(O).forEach(function (k) {
      if (!P[k]) return;
      if (O[k][0]) P[k].title = O[k][0];
      if (O[k][1]) P[k].desc = O[k][1];
    });
  })();
  (function () {
    var N = {
      'dcx-diagnostic': 'DCX Audit',
      'catalog-search-audit': 'Digital Merchandising Audit',
      'analytics-audit': 'Digital Analytics Audit',
      'cro-ux-audit': 'CRO Audit',
    };
    (window.CXD.AUDITS || []).forEach(function (a) {
      if (N[a.slug]) a.name = N[a.slug];
    });
    var P = window.CXD.pages;
    Object.keys(N).forEach(function (s) {
      var pg = P['audit:' + s];
      if (pg && pg.crumb && pg.crumb.length) pg.crumb[pg.crumb.length - 1] = [N[s]];
      var hero =
        pg &&
        pg.blocks.find(function (b) {
          return b.type === 'hero';
        });
      if (hero) hero.eb = N[s];
    });
  })();
  var RN = [
    ['DCX Diagnostic (flagship)', 'DCX Audit (flagship)'],
    ['Analytics (GA4) Audit', 'Digital Analytics Audit'],
    ['Analytics (GA4) audit', 'Digital Analytics audit'],
    ['Catalog and Search Audit', 'Digital Merchandising Audit'],
    ['Catalog and search audit', 'Digital Merchandising audit'],
    ['CRO and UX Audit', 'CRO Audit'],
    ['CRO and UX audit', 'CRO audit'],
    ['DCX Diagnostic', 'DCX Audit'],
  ];
  var fix = function (s) {
    for (var i = 0; i < RN.length; i++) s = s.split(RN[i][0]).join(RN[i][1]);
    return s;
  };
  var walk = function (v) {
    if (typeof v === 'string') return fix(v);
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) v[i] = walk(v[i]);
      return v;
    }
    if (v && typeof v === 'object') {
      for (var k in v) if (k !== 'href' && k !== 'slug') v[k] = walk(v[k]);
      return v;
    }
    return v;
  };
  Object.keys(window.CXD.pages).forEach(function (k) {
    var pg = window.CXD.pages[k];
    pg.blocks = walk(pg.blocks);
    if (pg.title) pg.title = fix(pg.title);
    if (pg.crumb) pg.crumb = walk(pg.crumb);
  });
  ['AUDITS', 'STAGES', 'LADDER', 'SERVICES', 'SOLUTIONS'].forEach(function (n) {
    if (window.CXD[n]) walk(window.CXD[n]);
  });

  var GG = {
    'audit:dcx-diagnostic': 'All nine',
    'audit:seo-audit': 'Discoverability, Findability',
    'audit:technical-seo-audit': 'Discoverability, Usability',
    'audit:ai-visibility-audit': 'Discoverability',
    'audit:cro-ux-audit': 'Usability, Trust, Conversion',
    'audit:analytics-audit': 'All (the measuring layer)',
    'audit:accessibility-audit': 'Usability, Trust',
    'audit:catalog-search-audit': 'Findability, Relevance, Clarity',
    'sol:customer-experience-consulting': 'All nine',
    'sol:customer-journey-optimization': 'All nine',
    'sol:ecommerce-consulting': 'All nine',
  };
  Object.keys(GG).forEach(function (k) {
    var pg = window.CXD.pages[k];
    if (
      !pg ||
      pg.blocks.some(function (b) {
        return b && b.type === 'gatechips';
      })
    )
      return;
    var at = pg.blocks.findIndex(function (b) {
      return b && b.type === 'hero';
    });
    pg.blocks.splice(at + 2, 0, { type: 'gatechips', eb: 'Gates it covers', gates: GG[k] });
  });

  var TL = {
    'svc:digital-analytics': [
      'GA4',
      'Adobe Analytics',
      'Quantum Metric',
      'Contentsquare',
      'Looker Studio',
      'Google Tag Manager',
      'BigQuery',
    ],
    'svc:growth-marketing': [
      'Google Ads',
      'Meta',
      'Instagram Ads',
      'LinkedIn Ads',
      'TikTok Ads',
      'Snapchat Ads',
      'Klaviyo',
      'HubSpot',
      'Salesforce',
    ],
  };
  Object.keys(TL).forEach(function (k) {
    var pg = window.CXD.pages[k];
    var tb =
      pg &&
      pg.blocks.find(function (b) {
        return b && b.type === 'tools';
      });
    if (tb) tb.items = TL[k];
  });

  (function () {
    var ab = window.CXD.pages.about;
    if (
      !ab ||
      ab.blocks.some(function (b) {
        return b && b.type === 'why';
      })
    )
      return;
    var at = ab.blocks.findIndex(function (b) {
      return b && b.type === 'stats';
    });
    ab.blocks.splice(at < 0 ? 2 : at + 1, 0, {
      type: 'why',
      h: 'Why CXWorks?',
      items: ['15+ Years of Experience', 'Top-Rated Consultancy', 'Certified Professionals'],
      p: 'CXCommerce is a specialist Digital Customer Experience (DCX) consultancy that helps B2B, B2C, and D2C eCommerce businesses unlock measurable growth.',
    });
  })();

  (function () {
    var ab = window.CXD.pages.about;
    if (ab)
      ab.blocks = ab.blocks.filter(function (b) {
        return !(b && b.type === 'analogy');
      });
  })();
  (function () {
    var ab = window.CXD.pages.about;
    if (!ab) return;
    var w = ab.blocks.findIndex(function (b) {
      return b && b.type === 'why';
    });
    if (w < 0) return;
    var c = -1;
    for (var i = ab.blocks.length - 1; i >= 0; i--)
      if (ab.blocks[i] && ab.blocks[i].type === 'cta') {
        c = i;
        break;
      }
    var f = c >= 0 ? ab.blocks.splice(c, 1)[0] : { type: 'cta' };
    f.form = true;
    ab.blocks.splice(w + 1, 0, f);
  })();

  return true;
};
(function poll() {
  var was = window.CXD && window.CXD.__x;
  window.CX_XLSX_APPLY();
  if (!was && window.CXD && window.CXD.__x && window.CX_ON_DATA) window.CX_ON_DATA();
  setTimeout(poll, window.CXD && window.CXD.__x ? 250 : 30);
})();
(function () {
  var D = window.CXD;
  if (!D) return;
  if (D.pages.run) {
    D.pages['run-pods'] = D.pages.run;
    var rp = D.pages['run-pods'];
    rp.crumb = [['Home', '#/'], ['Run'], ['Run pods']];
    rp.title = (rp.title || 'Run pods').replace(/^Run\b(?! pods)/, 'Run pods');
  }
  delete D.pages.run;
  if (D.STAGES)
    D.STAGES = D.STAGES.filter(function (s) {
      return s.slug !== 'run';
    });
  var bad = function (x) {
    return typeof x === 'string' && /^#\/run$/.test(x);
  };
  Object.keys(D.pages).forEach(function (k) {
    if (k === 'run-pods') return;
    var pg = D.pages[k];
    pg.blocks = pg.blocks.filter(function (b) {
      return b && !(b.type === 'pricing' && /Run/.test(b.eb || '')) && !(b.stage === 'run');
    });
    pg.blocks.forEach(function (b) {
      if (Array.isArray(b.items))
        b.items = b.items.filter(function (e) {
          if (Array.isArray(e)) return !e.some(bad);
          if (e && typeof e === 'object') return !(bad(e.href) || e.slug === 'run');
          return true;
        });
    });
  });
})();

(function () {
  var D = window.CXD;
  if (!D || !D.pages['run-pods']) return;
  var pg = D.pages['run-pods'];
  var F = [
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
  ];
  var b = pg.blocks.find(function (x) {
    return x && x.type === 'faq';
  });
  if (b) {
    b.items = F;
  } else pg.blocks.splice(pg.blocks.length - 1, 0, { type: 'faq', eb: '', h: 'FAQ', items: F });
})();

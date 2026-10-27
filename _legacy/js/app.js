/*
 * CXWorks app logic (state, routing, forms, all values the templates bind with {{ }}).
 * Written as a plain function so it is a normal, lintable JS file; js/boot.js reads its
 * body and hands it to the DC runtime. Keep everything INSIDE CXApp().
 */
window.CXApp = function () {
  const CONFIG = {
    FORM_ENDPOINT: 'https://formspree.io/f/mvkkoyve',
    PRODUCTS_URL: 'https://products.cxworks.com/',
    SUPPORT: ['idris@cxworks.com', 'rithik@cxworks.com', 'sowmya@cxworks.com'],
  };
  const PARTNERS = [
    ['quantum-metric', 'Quantum Metric'],
    ['adobe', 'Adobe'],
    ['google-analytics', 'Google Analytics'],
    ['qualtrics', 'Qualtrics'],
    ['contentsquare', 'Contentsquare'],
    ['optimizely', 'Optimizely'],
  ];
  const p2 = (i) => String(i + 1).padStart(2, '0');
  const ACT = { bg: 'var(--acc)', c: 'var(--bg)', border: 'var(--acc)' },
    IDLE = { bg: 'transparent', c: 'var(--ink3)', border: 'rgba(var(--ink-rgb),.16)' };
  const POST_SECS = ['Where the problem really starts', 'What to look for', 'What to do next'];
  const DOOR_EG = {
    Discoverability: [
      'AI shopping answers list a competitor for your best-selling category.',
      'An AI tool recommends three rival clinics, not yours.',
    ],
    Findability: ['"3/8 hex bolt" returns no results.', 'The pricing page is three clicks deep.'],
    Relevance: ['A search ad lands on the home page, not the category.', 'A demo ad lands on a generic blog post.'],
    Clarity: ['Specs are buried under marketing copy.', 'The service page never says who it is for.'],
    Usability: ['Filters reset when you go back.', 'The booking form breaks on mobile.'],
    Trust: ['No delivery date or returns policy near the button.', 'Accreditations hidden in the footer.'],
    Conversion: ['Shipping cost appears only at the last step.', 'The form asks 20 questions before a call.'],
    Assistance: ['Order emails go out with no tracking link.', 'Onboarding starts a week after signup.'],
    Retention: ['No quick reorder for repeat trade buyers.', 'No renewal reminder or referral ask.'],
  };
  const SCORES = [72, 41, 64, 58, 61, 55, 49, 70, 52];
  const TOPICS = [
    'DCX Audit',
    'Free AI scan',
    'SEO Audit',
    'Technical SEO Audit',
    'AI Visibility Audit',
    'CRO Audit',
    'Digital Analytics Audit',
    'Accessibility Audit',
    'Digital Merchandising Audit',
    'Build sprint',
    'Prepaid credits',
    'Ways to work',
    'General',
  ];
  const btn = (x) =>
    x ? { l: x.l, href: x.href || '#/contact-us?topic=' + encodeURIComponent(x.topic || 'General') } : null;

  const CHARTS = {
    'dcx-transformation': {
      type: 'funnel',
      eyebrow: 'The journey, gate by gate',
      t: 'More customers make it through every gate.',
      kpi: [68, '+', '%'],
      kpiT: 'more visitors reaching checkout',
      u: '%',
      legend: ['Before (outline)', 'With CXWorks'],
      rows: [
        ['Discover the brand', 100, 100],
        ['Find the right product', 64, 81],
        ['Trust the offer', 38, 58],
        ['Reach checkout', 19, 32],
      ],
      note: 'Share of visitors who pass each stage. Fixing the earliest failing gate lifts every stage after it.',
    },
    'digital-merchandising': {
      type: 'bars',
      eyebrow: 'Discovery performance',
      t: 'Shoppers find the right product faster.',
      kpi: [78, '+', '%'],
      kpiT: 'lift in search-to-cart rate',
      u: '%',
      legend: ['Before', 'With CXWorks'],
      rows: [
        ['Search-to-cart rate', 9, 16],
        ['Filter engagement', 22, 41],
        ['Category click-through', 31, 48],
        ['PDP add-to-cart', 7, 11],
      ],
      note: 'Better search relevance, filters and category structure turn browsing into buying.',
    },
    'digital-analytics': {
      type: 'waffle',
      eyebrow: 'Data you can trust',
      t: 'Every key event, tracked right.',
      kpi: [98, '', '%'],
      kpiT: 'of key events tracked accurately',
      legend: ['Tracked before', 'Fixed by CXWorks', 'Still to fix'],
      base: 61,
      goal: 98,
      side: [
        ['Key events tracked correctly', 61, 98],
        ['Reports matching across tools', 44, 95],
        ['Decisions backed by data', 35, 82],
      ],
      note: 'Each square is one key event. Gold squares are the ones we fix, so reports finally match across tools.',
    },
    'ai-search-visibility': {
      type: 'line',
      eyebrow: 'AI answer citations',
      t: 'Cited in more AI answers, month after month.',
      kpi: [4.2, '', 'x'],
      kpiDec: 1,
      kpiT: 'more AI answers citing the brand',
      legend: ['Without a plan', 'With CXWorks'],
      xs: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      s0: [12, 13, 12, 14, 13, 14],
      s1: [12, 18, 27, 36, 44, 51],
      u: '',
      dec: 0,
      note: 'Share of tracked AI prompts where the brand is cited, across ChatGPT, Perplexity, Gemini and Google AI.',
    },
    'conversion-rate-optimization': {
      type: 'cols',
      eyebrow: 'Compounding experiments',
      t: 'Each test cycle sharpens the next.',
      kpi: [62, '+', '%'],
      kpiT: 'conversion rate after six cycles',
      legend: ['Baseline', 'Conversion rate per cycle'],
      xs: ['Start', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
      vals: [2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.4],
      base: 2.1,
      u: '%',
      dec: 1,
      note: 'Audit, hypothesize, test, learn: wins are kept and built on, so gains compound.',
    },
    'growth-marketing': {
      type: 'donut',
      eyebrow: 'Revenue by channel',
      t: 'Every channel pulling its weight.',
      kpi: [1.8, '', 'x'],
      kpiDec: 1,
      kpiT: 'increase in customer lifetime value',
      legend: ['Share of attributed revenue', ''],
      cV: '4',
      cT: 'Channels, one system',
      segs: [
        ['Paid media', 'Search, social, shopping', 34],
        ['SEO & AI search', 'Organic + AI answers', 26],
        ['Lifecycle & email', 'Retention and repeat', 22],
        ['Content', 'Editorial and guides', 18],
      ],
      note: 'Paid, SEO, content and lifecycle work as one system, so spend goes where it returns.',
    },
    'catalog-management': {
      type: 'rings',
      eyebrow: 'Product data quality',
      t: 'Complete attributes across every category.',
      kpi: [96, '', '%'],
      kpiT: 'average attribute completeness',
      legend: ['Attribute completeness by category', ''],
      cV: '96%',
      cT: 'Avg. complete',
      rows: [
        ['Apparel', 48, 96],
        ['Electronics', 55, 97],
        ['Home & furniture', 41, 94],
        ['Industrial tools', 37, 95],
      ],
      note: 'Clean, complete product data powers search, filters, merchandising and AI discovery.',
    },
    'ecommerce-website-development': {
      type: 'gauge',
      eyebrow: 'Experience performance',
      t: 'Faster pages, smoother checkout.',
      kpi: [75, '+', '%'],
      kpiT: 'lift in mobile conversion',
      legend: ['Before', 'With CXWorks'],
      g: [42, 91],
      cT: 'Page speed score',
      side: [
        ['Checkout completion', 48, 71, '%', 0],
        ['Mobile conversion', 1.2, 2.1, '%', 1],
        ['Repeat visit rate', 18, 27, '%', 0],
      ],
      note: 'A scalable platform built around how customers actually shop, on every device.',
    },
    'audit-dcx-diagnostic': {
      type: 'cols',
      eyebrow: 'Sample Nine Gates score',
      t: 'Find the earliest gate that fails.',
      kpi: [41, '', '/100'],
      kpiT: 'Findability, the earliest failing gate',
      legend: ['Healthy benchmark (60)', 'Score per gate'],
      xs: [
        'Discoverability',
        'Findability',
        'Relevance',
        'Clarity',
        'Usability',
        'Trust',
        'Conversion',
        'Assistance',
        'Retention',
      ],
      vals: [72, 41, 58, 66, 63, 55, 49, 70, 52],
      base: 60,
      u: '',
      dec: 0,
      note: 'A typical Diagnostic result. Fixing Findability first lifts every gate after it, so it goes to the top of the roadmap.',
    },
    'audit-seo-audit': {
      type: 'line',
      eyebrow: 'Organic clicks',
      t: 'Traffic that grows after the fixes.',
      kpi: [58, '+', '%'],
      kpiT: 'organic clicks six months after the audit',
      legend: ['No changes', 'Audit fixes shipped'],
      xs: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      s0: [20, 21, 20, 22, 21, 21],
      s1: [20, 22, 25, 28, 31, 33],
      u: 'k',
      dec: 0,
      note: 'Monthly organic clicks in thousands for a mid-size catalog site. Content, keyword and link fixes compound month on month.',
    },
    'audit-technical-seo-audit': {
      type: 'waffle',
      eyebrow: 'Index coverage',
      t: 'More of your pages Google can see.',
      kpi: [92, '', '%'],
      kpiT: 'of product pages indexed after fixes',
      legend: ['Indexed today', 'Recovered by fixes', 'Still blocked'],
      base: 54,
      goal: 92,
      side: [
        ['Product pages indexed', 54, 92],
        ['Pages passing Core Web Vitals', 38, 81],
        ['Faceted URLs under control', 22, 90],
      ],
      note: 'Each square is 1% of your product pages. Crawl, duplicate and faceted-URL fixes bring hidden pages back into search.',
    },
    'audit-ai-visibility-audit': {
      type: 'bars',
      eyebrow: 'Answers that cite you',
      t: 'Where AI tools mention your brand.',
      kpi: [3.8, '', 'x'],
      kpiDec: 1,
      kpiT: 'more AI answers citing the brand',
      legend: ['Today', 'After feed and content fixes'],
      rows: [
        ['ChatGPT', 8, 31],
        ['Perplexity', 12, 38],
        ['Gemini', 6, 27],
        ['Google AI Mode', 10, 34],
      ],
      u: '%',
      note: 'Share of tracked buyer prompts where each AI tool names or links to the brand.',
    },
    'audit-cro-ux-audit': {
      type: 'funnel',
      eyebrow: 'Where shoppers drop',
      t: 'Find the step that leaks the most.',
      kpi: [62, '+', '%'],
      kpiT: 'more orders from the same traffic',
      legend: ['Today (outline)', 'After fixes'],
      rows: [
        ['View a product', 100, 100],
        ['Add to cart', 18, 26],
        ['Start checkout', 9, 14],
        ['Place the order', 3, 5],
      ],
      note: 'Share of product viewers who reach each step. The audit names the step that leaks the most and why.',
    },
    'audit-analytics-audit': {
      type: 'rings',
      eyebrow: 'Tracking accuracy',
      t: 'Numbers you can defend in a meeting.',
      kpi: [97, '', '%'],
      kpiT: 'average event accuracy after the fix list',
      legend: ['Accuracy by event group', ''],
      cV: '97%',
      cT: 'Avg. accurate',
      rows: [
        ['Purchases', 72, 99],
        ['Leads and forms', 48, 97],
        ['Add to cart', 61, 98],
        ['Site search', 30, 95],
      ],
      note: 'How often GA4 matches your order system and CRM, per event group. Inner ring today, outer ring after the fixes.',
    },
    'audit-accessibility-audit': {
      type: 'gauge',
      eyebrow: 'WCAG 2.2 AA score',
      t: 'A site everyone can use.',
      kpi: [94, '', '/100'],
      kpiT: 'accessibility score after the fix list',
      legend: ['Today', 'After fixes'],
      g: [58, 94],
      cT: 'WCAG AA score',
      side: [
        ['Pages passing WCAG AA', 31, 88, '%', 0],
        ['Keyboard-reachable actions', 64, 100, '%', 0],
        ['Images with alt text', 47, 98, '%', 0],
      ],
      note: 'Scored against WCAG 2.2 AA with automated checks plus keyboard and screen reader testing.',
    },
    'audit-catalog-search-audit': {
      type: 'donut',
      eyebrow: 'What happens after a search',
      t: 'One in six searches finds nothing.',
      kpi: [17, '', '%'],
      kpiT: 'of site searches return zero results today',
      legend: ['Share of site searches', ''],
      cV: '17%',
      cT: 'Zero results',
      segs: [
        ['Relevant results', 'Found and clicked', 58],
        ['Zero results', 'Valid terms, nothing shown', 17],
        ['Weak results', 'Shown, not clicked', 15],
        ['Exit after search', 'Left the site', 10],
      ],
      note: 'A typical large catalog. Most zero-result searches are real part numbers or specs with missing data or synonyms.',
    },
  };
  const SEGC = ['var(--acc)', 'var(--acc-soft)', 'var(--acc-deep)', 'var(--muted3)'];
  const split = (s) => {
    const w = String(s || '')
      .trim()
      .split(/\s+/);
    if (w.length < 4) return { a: '', b: w.join(' ') };
    const k = w.length > 8 ? 3 : 2;
    return { a: w.slice(0, -k).join(' '), b: w.slice(-k).join(' ') };
  };
  const chartVals = (slug, k) => {
    const cf = CHARTS[slug] || CHARTS['dcx-transformation'],
      sp = split(cf.t),
      T = cf.type;
    const fmt = (v, d) => (d ? v.toFixed(d) : String(Math.round(v)));
    const kv = cf.kpi[1] + fmt(cf.kpi[0] * k, cf.kpiDec || 0) + cf.kpi[2];
    const out = {
      eyebrow: cf.eyebrow,
      ta: sp.a,
      tb: sp.b,
      kpiV: kv,
      kpiT: cf.kpiT,
      note: cf.note,
      isFunnel: T === 'funnel',
      isBars: T === 'bars',
      isLine: T === 'line',
      isCols: T === 'cols',
      isWaffle: T === 'waffle',
      cells: [],
      isRadial: T === 'donut' || T === 'rings' || T === 'gauge',
      legend: cf.legend
        .filter(Boolean)
        .map((t, i) => ({ t, c: i ? 'var(--acc)' : T === 'cols' ? 'rgba(var(--ink-rgb),.35)' : 'var(--muted3)' })),
      funnel: [],
      bars: [],
      pts: [],
      xs: [],
      cols: [],
      arcs: [],
      items: [],
      grid: [0, 1, 2, 3],
      ck: k,
      off: String(1 - k),
      d0: '',
      d1: '',
      area: '',
      ar: '1 / 1',
      vb: '0 0 100 100',
      cTop: '50%',
      cV: cf.cV || '',
      cT: cf.cT || '',
    };
    if (T === 'waffle') {
      out.cells = Array.from({ length: 100 }, (_, i) => {
        const fixed = i >= cf.base && i < cf.goal,
          on = i < cf.base ? k > i / 300 : fixed ? k > 0.25 + ((i - cf.base) / (cf.goal - cf.base)) * 0.7 : false;
        return {
          bg:
            i < cf.base
              ? 'rgba(var(--ink-rgb),.32)'
              : fixed
                ? on
                  ? 'var(--acc)'
                  : 'rgba(var(--ink-rgb),.06)'
                : 'rgba(var(--ink-rgb),.06)',
          s: on || !fixed ? 1 : 0.55,
        };
      });
      out.items = cf.side.map((r, i) => ({
        c: i ? 'var(--acc-soft)' : 'var(--acc)',
        label: r[0],
        sub: 'was ' + r[1] + '%',
        v: Math.round(r[1] + (r[2] - r[1]) * k) + '%',
        vc: 'var(--ink)',
      }));
      out.legend = [
        { t: cf.legend[0], c: 'rgba(var(--ink-rgb),.32)' },
        { t: cf.legend[1], c: 'var(--acc)' },
        { t: cf.legend[2], c: 'rgba(var(--ink-rgb),.1)' },
      ];
    } else if (T === 'funnel')
      out.funnel = cf.rows.map((r, i) => {
        const rk = Math.max(0, Math.min(1, k * 1.5 - i * 0.15));
        return {
          label: r[0],
          w0: 30 + r[1] * 0.7 + '%',
          w1: (30 + r[2] * 0.7) * rk + '%',
          v0: r[1] + '%',
          v1: Math.round(r[2] * rk) + '%',
        };
      });
    else if (T === 'bars') {
      const mx = Math.max(...cf.rows.map((r) => Math.max(r[1], r[2])));
      out.bars = cf.rows.map((r, i) => {
        const rk = Math.max(0, Math.min(1, k * 1.5 - i * 0.15));
        const d = r[2] % 1 || r[1] % 1 ? 1 : 0;
        return {
          label: r[0],
          w0: (r[1] / mx) * 100 * rk + '%',
          w1: (r[2] / mx) * 100 * rk + '%',
          v0: fmt(r[1] * rk, d) + cf.u,
          v1: fmt(r[2] * rk, d) + cf.u,
        };
      });
    } else if (T === 'line') {
      const all = cf.s0.concat(cf.s1),
        mn = Math.min(...all),
        mx = Math.max(...all),
        n = cf.s1.length;
      const X = (i) => 3 + i * (94 / (n - 1)),
        Y = (v) => 92 - ((v - mn) / (mx - mn || 1)) * 80;
      const path = (a) => a.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(2) + ' ' + Y(v).toFixed(2)).join(' ');
      out.d0 = path(cf.s0);
      out.d1 = path(cf.s1);
      out.area = out.d1 + ' L' + X(n - 1) + ' 100 L' + X(0) + ' 100 Z';
      out.xs = cf.xs;
      out.pts = cf.s1.map((v, i) => {
        const o = k >= i / (n - 1) ? 1 : 0;
        return { x: X(i) + '%', y: Y(v) + '%', o, lo: i === n - 1 ? o : 0, v: fmt(v, cf.dec || 0) + cf.u };
      });
    } else if (T === 'cols') {
      const mx = Math.max(...cf.vals) * 1.1,
        n = cf.vals.length;
      out.baseY = 'calc(' + (cf.base / mx) * 100 + '% * (1 - 42px / 100%) + 30px)';
      out.baseY = (cf.base / mx) * 82 + 8 + '%';
      out.baseV = fmt(cf.base, cf.dec) + cf.u;
      out.cols = cf.vals.map((v, i) => {
        const rk = Math.max(0, Math.min(1, k * 1.6 - i * 0.1));
        const last = i === n - 1;
        return {
          label: /^C\d$/.test(cf.xs[i]) ? 'Cycle ' + cf.xs[i].slice(1) : cf.xs[i],
          h: (v / mx) * 82 * rk + '%',
          v: fmt(v, cf.dec) + cf.u,
          o: rk > 0.95 ? 1 : 0,
          vc: last ? 'var(--acc)' : 'var(--ink)',
          bg:
            i === 0
              ? 'rgba(var(--ink-rgb),.18)'
              : last
                ? 'linear-gradient(180deg, var(--acc3), var(--acc))'
                : 'linear-gradient(180deg, rgba(var(--acc-rgb),' +
                  (0.35 + i * 0.08) +
                  '), rgba(var(--acc-rgb),' +
                  (0.15 + i * 0.05) +
                  '))',
        };
      });
    } else if (T === 'donut') {
      const C = 'M50 10 A40 40 0 1 1 49.99 10';
      let st = 0;
      out.arcs = [{ d: C, c: 'rgba(var(--ink-rgb),.06)', sw: 14, cap: 'butt', da: '100 0', off: '0' }].concat(
        cf.segs.map((sg, i) => {
          const len = Math.max(0, sg[2] * k - 1);
          const a = { d: C, c: SEGC[i], sw: 14, cap: 'butt', da: len + ' ' + (100 - len), off: String(-st * k) };
          st += sg[2];
          return a;
        }),
      );
      out.items = cf.segs.map((sg, i) => ({
        c: SEGC[i],
        label: sg[0],
        sub: sg[1],
        v: Math.round(sg[2] * k) + '%',
        vc: 'var(--ink)',
      }));
    } else if (T === 'rings') {
      const rs = [44, 34, 24, 14];
      out.arcs = [];
      cf.rows.forEach((r, i) => {
        const d = 'M50 ' + (50 - rs[i]) + ' A' + rs[i] + ' ' + rs[i] + ' 0 1 1 49.99 ' + (50 - rs[i]);
        out.arcs.push({ d, c: 'rgba(var(--ink-rgb),.06)', sw: 7, cap: 'round', da: '100 0', off: '0' });
        const rk = Math.max(0, Math.min(1, k * 1.4 - i * 0.1));
        out.arcs.push({ d, c: SEGC[i], sw: 7, cap: 'round', da: r[2] * rk + ' 100', off: '0' });
      });
      out.cV = '';
      out.cT = '';
      out.items = cf.rows.map((r, i) => ({
        c: SEGC[i],
        label: r[0],
        sub: 'up from ' + r[1] + '%',
        v: Math.round(r[2] * Math.min(1, k)) + '%',
        vc: 'var(--ink)',
      }));
    } else if (T === 'gauge') {
      const d = 'M10 55 A40 40 0 0 1 90 55';
      out.ar = '100 / 62';
      out.vb = '0 0 100 62';
      out.cTop = '72%';
      out.arcs = [
        { d, c: 'rgba(var(--ink-rgb),.06)', sw: 10, cap: 'round', da: '100 0', off: '0' },
        { d, c: 'rgba(var(--ink-rgb),.28)', sw: 10, cap: 'round', da: cf.g[0] + ' 100', off: '0' },
        { d, c: 'var(--acc)', sw: 10, cap: 'round', da: cf.g[1] * k + ' 100', off: '0' },
      ];
      out.cV = String(Math.round(cf.g[1] * k));
      out.cT = cf.cT + ' · was ' + cf.g[0];
      out.items = cf.side.map((r, i) => ({
        c: i % 2 ? 'var(--acc-soft)' : 'var(--acc)',
        label: r[0],
        sub: 'was ' + fmt(r[1], r[4]) + r[3],
        v: fmt(r[1] + (r[2] - r[1]) * k, r[4]) + r[3],
        vc: 'var(--acc)',
      }));
    }
    return out;
  };

  const THEMES = {
    gold: { name: 'Black + gold', sw: ['#0A0A0A', '#C9A84C'], v: {} },
    goldsoft: { name: 'Black + gold Soft glass', lg: true, soft: true, sw: ['#0A0A0A', '#C9A84C'], v: {} },
    berry: {
      name: 'Dark pink · iOS Light',
      ios: true,
      sw: ['#F2F2F7', '#970747', '#FFFFFF'],
      v: {
        bg: '#F2F2F7',
        'bg-rgb': '242,242,247',
        surface: '#FFFFFF',
        surface2: '#FFFFFF',
        ink: '#1C1C1E',
        'ink-rgb': '28,28,30',
        ink2: '#2C2C2E',
        ink3: '#3A3A3C',
        muted: '#6C6C70',
        muted2: '#8E8E93',
        muted3: '#AEAEB2',
        acc: '#970747',
        'acc-rgb': '151,7,71',
        acc2: '#B0105A',
        'acc2-rgb': '176,16,90',
        acc3: '#7A0539',
        'acc-soft': '#F4C9DA',
        'acc-deep': '#6E0533',
        'accd-rgb': '151,7,71',
        'on-acc': '#FFFFFF',
        glass: '28,28,30',
        shade: '60,60,67',
        'logo-f': 'brightness(0)',
        plogo: 'grayscale(1) brightness(.35)',
      },
    },
    berryblack: {
      name: 'Dark pink · Black',
      sw: ['#000000', '#FF4D8D', '#970747'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#1C1C1E',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        acc: '#FF4D8D',
        'acc-rgb': '255,77,141',
        acc2: '#FF7AA8',
        'acc2-rgb': '194,24,91',
        acc3: '#FF8FB6',
        'acc-soft': '#FFC2D8',
        'acc-deep': '#970747',
        'accd-rgb': '151,7,71',
        'on-acc': '#FFFFFF',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        glass: '255,255,255',
      },
    },
    berryglass: {
      name: 'Dark pink · Glass',
      lg: true,
      sw: ['rgba(255,255,255,.28)', '#FF4D8D', '#970747'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        acc: '#FF4D8D',
        'acc-rgb': '255,77,141',
        acc2: '#FF7AA8',
        'acc2-rgb': '194,24,91',
        acc3: '#FF8FB6',
        'acc-soft': '#FFC2D8',
        'acc-deep': '#970747',
        'accd-rgb': '151,7,71',
        'on-acc': '#FFFFFF',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        glass: '255,232,240',
      },
    },
    berryglasssoft: {
      name: 'Dark pink · Soft glass',
      lg: true,
      soft: true,
      lg: true,
      sw: ['rgba(255,255,255,.28)', '#FF4D8D', '#970747'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        acc: '#FF4D8D',
        'acc-rgb': '255,77,141',
        acc2: '#FF7AA8',
        'acc2-rgb': '194,24,91',
        acc3: '#FF8FB6',
        'acc-soft': '#FFC2D8',
        'acc-deep': '#970747',
        'accd-rgb': '151,7,71',
        'on-acc': '#FFFFFF',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        glass: '255,232,240',
      },
    },
    iosteal: {
      name: 'iOS Teal',
      sw: ['#1C1C1E', '#40C8E0', '#0A84FF'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#1C1C1E',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '255,255,255',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#40C8E0',
        'acc-rgb': '64,200,224',
        acc2: '#6AD8EB',
        'acc2-rgb': '10,132,255',
        acc3: '#6AD8EB',
        'acc-soft': '#B0EBF5',
        'acc-deep': '#008299',
        'accd-rgb': '99,230,226',
        'on-acc': '#000000',
      },
    },
    iostealg: {
      name: 'iOS Teal Glass',
      lg: true,
      sw: ['rgba(255,255,255,.28)', '#40C8E0', '#0A84FF'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '228,247,251',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#40C8E0',
        'acc-rgb': '64,200,224',
        acc2: '#6AD8EB',
        'acc2-rgb': '100,210,255',
        acc3: '#6AD8EB',
        'acc-soft': '#B0EBF5',
        'acc-deep': '#008299',
        'accd-rgb': '99,230,226',
        'on-acc': '#000000',
      },
    },
    iostealgsoft: {
      name: 'iOS Teal Soft glass',
      lg: true,
      soft: true,
      sw: ['rgba(255,255,255,.28)', '#40C8E0', '#0A84FF'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '228,247,251',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#40C8E0',
        'acc-rgb': '64,200,224',
        acc2: '#6AD8EB',
        'acc2-rgb': '100,210,255',
        acc3: '#6AD8EB',
        'acc-soft': '#B0EBF5',
        'acc-deep': '#008299',
        'accd-rgb': '99,230,226',
        'on-acc': '#000000',
      },
    },
    iospurpleg: {
      name: 'iOS Purple Glass',
      lg: true,
      sw: ['rgba(255,255,255,.28)', '#BF5AF2', '#FF375F'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '246,232,253',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#BF5AF2',
        'acc-rgb': '191,90,242',
        acc2: '#DA8FFF',
        'acc2-rgb': '255,55,95',
        acc3: '#DA8FFF',
        'acc-soft': '#E5B8FF',
        'acc-deep': '#9A3FCC',
        'accd-rgb': '125,122,255',
        'on-acc': '#FFFFFF',
      },
    },
    iospurplegsoft: {
      name: 'iOS Purple Soft glass',
      lg: true,
      soft: true,
      sw: ['rgba(255,255,255,.28)', '#BF5AF2', '#FF375F'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '246,232,253',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#BF5AF2',
        'acc-rgb': '191,90,242',
        acc2: '#DA8FFF',
        'acc2-rgb': '255,55,95',
        acc3: '#DA8FFF',
        'acc-soft': '#E5B8FF',
        'acc-deep': '#9A3FCC',
        'accd-rgb': '125,122,255',
        'on-acc': '#FFFFFF',
      },
    },
    iospinkg: {
      name: 'iOS Pink Glass',
      lg: true,
      sw: ['rgba(255,255,255,.28)', '#FF375F', '#FF9F0A'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '255,227,233',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#FF375F',
        'acc-rgb': '255,55,95',
        acc2: '#FF6482',
        'acc2-rgb': '191,90,242',
        acc3: '#FF6482',
        'acc-soft': '#FFB3C1',
        'acc-deep': '#D61F45',
        'accd-rgb': '255,69,58',
        'on-acc': '#FFFFFF',
      },
    },
    iospinkgsoft: {
      name: 'iOS Pink Soft glass',
      lg: true,
      soft: true,
      sw: ['rgba(255,255,255,.28)', '#FF375F', '#FF9F0A'],
      v: {
        bg: '#000000',
        'bg-rgb': '0,0,0',
        surface: '#141416',
        surface2: '#121214',
        ink: '#F5F5F7',
        'ink-rgb': '245,245,247',
        ink2: '#E5E5EA',
        ink3: '#C7C7CC',
        muted: '#98989D',
        muted2: '#8E8E93',
        muted3: '#636366',
        glass: '255,227,233',
        shade: '0,0,0',
        'logo-f': 'none',
        plogo: 'grayscale(1) brightness(1.8)',
        acc: '#FF375F',
        'acc-rgb': '255,55,95',
        acc2: '#FF6482',
        'acc2-rgb': '191,90,242',
        acc3: '#FF6482',
        'acc-soft': '#FFB3C1',
        'acc-deep': '#D61F45',
        'accd-rgb': '255,69,58',
        'on-acc': '#FFFFFF',
      },
    },
  };
  const BASE_V = {
    bg: '#0A0A0A',
    'bg-rgb': '10,10,10',
    surface: '#141414',
    surface2: '#0C0B09',
    ink: '#F2EBDD',
    'ink-rgb': '242,235,221',
    ink2: '#E4DDCF',
    ink3: '#CFC8BA',
    muted: '#A9A294',
    muted2: '#8A8374',
    muted3: '#6F6A60',
    acc: '#C9A84C',
    'acc-rgb': '201,168,76',
    acc2: '#E8C547',
    'acc2-rgb': '232,197,71',
    acc3: '#F5D560',
    'acc-soft': '#E8D49A',
    'acc-deep': '#8C7434',
    'accd-rgb': '156,120,60',
    'on-acc': '#0A0A0A',
    glass: '255,255,255',
    shade: '0,0,0',
    'logo-f': 'none',
    plogo: 'grayscale(1) brightness(1.8)',
  };
  const applyTheme = (k) => {
    const t = THEMES[k] || THEMES.gold,
      v = { ...BASE_V, ...t.v },
      r = document.documentElement;
    Object.keys(v).forEach((n) => r.style.setProperty('--' + n, v[n]));
    if (k !== 'gold' && THEMES[k] && !THEMES[k].lg) r.setAttribute('data-flat', '');
    else r.removeAttribute('data-flat');
    if (THEMES[k] && THEMES[k].ios) r.setAttribute('data-ios', '');
    else r.removeAttribute('data-ios');
    if (THEMES[k] && THEMES[k].soft) r.setAttribute('data-soft', '');
    else r.removeAttribute('data-soft');
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', v.bg);
  };

  class Component extends DCLogic {
    state = {
      route: 'home',
      key: 'home',
      slug: '',
      w: typeof window !== 'undefined' ? window.innerWidth : 1280,
      dd: null,
      menu: false,
      mAcc: null,
      tick: 0,
      faqOpen: 0,
      jg: 0,
      pk: 0,
      insCat: 'All',
      cg: 'All',
      cd: 'All',
      door: 'sell',
      f: {},
      err: {},
      status: 'idle',
      topic: 'DCX Audit',
      copied: false,
    };

    componentDidMount() {
      if (this.cxCanPush() && (location.hash || '').indexOf('#/') === 0) {
        try {
          history.replaceState(null, '', '/' + location.hash.slice(2));
        } catch (x) {}
      }
      this.onCxPop = () => this.onHash();
      window.addEventListener('popstate', this.onCxPop);
      this.onCxClick = (ev) => {
        if (
          !this.cxCanPush() ||
          ev.defaultPrevented ||
          ev.button !== 0 ||
          ev.metaKey ||
          ev.ctrlKey ||
          ev.shiftKey ||
          ev.altKey
        )
          return;
        const a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
        if (!a) return;
        const tg = a.getAttribute('target');
        if (tg && tg !== '_self') return;
        let h = a.getAttribute('href') || '';
        if (h.indexOf('#/') === 0) h = h.slice(1);
        else if (!(a.hasAttribute('data-cxh') && h.charAt(0) === '/')) return;
        ev.preventDefault();
        if (location.pathname + location.search !== h || location.hash) {
          try {
            history.pushState(null, '', h);
          } catch (x) {}
          this.onHash();
        }
      };
      document.addEventListener('click', this.onCxClick);
      if (this.cxCanPush() && window.MutationObserver) {
        this.cxMo = new MutationObserver(() => {
          if (this.cxRaf) return;
          this.cxRaf = requestAnimationFrame(() => {
            this.cxRaf = null;
            this.cxClean();
          });
        });
        this.cxMo.observe(document.body, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['href'],
        });
        this.cxClean();
      }
      this.rvT = setInterval(() => {
        if (!this.rvHold && !document.hidden && document.querySelector('[data-reviews]'))
          this.setState((s) => ({ rvI: (s.rvI || 0) + 1 }));
      }, 4500);
      document.addEventListener('mousedown', (ev) => {
        if (
          (this.state.dd === 'diag' || this.state.dd === 'build') &&
          !(ev.target.closest && ev.target.closest('[data-dd]'))
        )
          this.setState({ dd: null });
      });
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && this.state.dd) this.setState({ dd: null });
      });
      const th = 'iosteal';
      applyTheme(th);
      this.setState({ theme: th });
      this.parse();
      window.CX_ON_DATA = () => {
        this.parse();
        this.forceUpdate();
      };
      {
        let n = 0;
        const ready = () => {
          const ok = window.CXD && window.CXD.__x;
          const bl = window.CX_BLOGS && window.CX_BLOGS.length;
          if ((ok && bl) || n++ > 300) {
            this.parse();
            this.forceUpdate();
            return;
          }
          this.dataT = setTimeout(ready, 40);
        };
        ready();
      }
      this.onHash = () => {
        this.chartDone = false;
        clearTimeout(this.cRaf);
        this.setState({ ck: 0 });
        this.parse();
        window.scrollTo(0, 0);
      };
      window.addEventListener('hashchange', this.onHash);
      this.onResize = () => this.setState({ w: window.innerWidth });
      window.addEventListener('resize', this.onResize);
      this.timer = setInterval(() => {
        if (!document.hidden) this.setState((s) => ({ tick: (s.tick + 1) % 9 }));
        if (this.onFx) this.onFx();
      }, 1500);
      this.chartPoll = setInterval(() => {
        if (this.onFx && !this.chartDone) this.onFx();
      }, 300);
      this.io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.setAttribute('data-in', '1');
              this.io.unobserve(e.target);
            }
          }),
        { rootMargin: '0px 0px -6% 0px' },
      );
      this.scan();
      setTimeout(() => this.setTitle(), 50);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.runProof = () => {
        if (reduce) return this.setState({ pk: 1 });
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 2200);
          this.setState({ pk: 1 - Math.pow(1 - k, 4) });
          if (k < 1) this.pRaf = requestAnimationFrame(step);
        };
        this.pRaf = requestAnimationFrame(step);
      };
      this.onFx = () => {
        const se = document.scrollingElement || document.documentElement,
          y = window.scrollY || se.scrollTop || 0,
          max = se.scrollHeight - innerHeight,
          vh = innerHeight;
        const prog = document.querySelector('[data-prog-bar]');
        if (prog) prog.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
        const tt = document.querySelector('[data-totop]');
        if (tt) {
          const on = y > vh * 0.8 && this.state.w >= 760;
          tt.style.opacity = on ? '1' : '0';
          tt.style.pointerEvents = on ? 'auto' : 'none';
        }
        const cel =
          document.querySelector('section[data-screen-label$="· chart"]') || document.querySelector('[data-chart]');
        if (cel && !this.chartDone) {
          const r = cel.getBoundingClientRect();
          if (r.top < vh * 0.85 && r.bottom > 0) {
            this.chartDone = true;
            const t0 = performance.now();
            const step = (now) => {
              const q = Math.min(1, (now - t0) / 1800);
              this.setState({ ck: 1 - Math.pow(1 - q, 3) });
              if (q < 1) this.cRaf = setTimeout(() => step(performance.now()), 16);
            };
            clearTimeout(this.cRaf);
            this.cRaf = setTimeout(() => step(performance.now()), 16);
          }
        }
        const pr = document.querySelector('[data-proof]');
        if (pr && !this.proofDone) {
          const r = pr.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > 0) {
            this.proofDone = true;
            this.runProof();
          }
        }
      };
      document.addEventListener('scroll', this.onFx, { passive: true, capture: true });
      this.fxT = [100, 600].map((t) => setTimeout(this.onFx, t));
      if (!window.CXD || !window.CXW)
        this.wait = setInterval(() => {
          if (window.CXD && window.CXW) {
            clearInterval(this.wait);
            this.parse();
          }
        }, 80);
    }
    componentDidUpdate() {
      this.scan();
      this.setTitle();
      if (this.prevKey !== this.state.key) {
        this.prevKey = this.state.key;
        this.proofDone = false;
        setTimeout(this.onFx, 120);
      }
    }
    componentWillUnmount() {
      clearInterval(this.rvT);
      window.removeEventListener('hashchange', this.onHash);
      window.removeEventListener('popstate', this.onCxPop);
      document.removeEventListener('click', this.onCxClick);
      this.cxMo && this.cxMo.disconnect();
      window.removeEventListener('resize', this.onResize);
      clearInterval(this.timer);
      clearTimeout(this.dataT);
      clearInterval(this.chartPoll);
      clearInterval(this.wait);
      this.io && this.io.disconnect();
      document.removeEventListener('scroll', this.onFx, { capture: true });
      (this.fxT || []).forEach(clearTimeout);
      cancelAnimationFrame(this.pRaf);
    }
    reviewVals() {
      const REVIEWS = [
        [
          'The DCX roadmap gave our leadership one shared view of the journey. For the first time we fixed causes, not symptoms.',
          'Michael Turner',
          'Director of Digital Strategy',
          'Ridgeline Industrial Supply',
          'us',
          'United States',
          'DCX Strategy and Transformation',
          'dcx-transformation',
        ],
        [
          'Checkout tests were planned from real evidence, not opinions. Conversion went up and stayed up after each release.',
          'Charlotte Hughes',
          'Head of Ecommerce',
          'Hartwell Home & Living',
          'gb',
          'United Kingdom',
          'Conversion Rate Optimization',
          'conversion-rate-optimization',
        ],
        [
          'Within weeks we were showing up in AI answers for our core categories. Being cited changed our inbound mix.',
          'Olivia Bennett',
          'Marketing Director',
          'Coastline Wellness',
          'au',
          'Australia',
          'AI Search Visibility (GEO)',
          'ai-search-visibility',
        ],
        [
          'Zero-result searches fell by more than two thirds. Our buyers find part numbers on the first try now.',
          'Ryan Mitchell',
          'Merchandising Manager',
          'Northbay Outfitters',
          'ca',
          'Canada',
          'Digital Merchandising',
          'digital-merchandising',
        ],
        [
          'One template fix improved thousands of product pages at once. The catalog work paid for itself in the first month.',
          "Seán O'Connor",
          'Ecommerce Manager',
          'Liffey Electrical Wholesale',
          'ie',
          'Ireland',
          'Catalog and Product Data',
          'catalog-management',
        ],
        [
          'Our GA4 numbers finally match the ERP. The team stopped arguing about data and started acting on it.',
          'Priya Raman',
          'Director of Analytics',
          'Veda Consumer Brands',
          'in',
          'India',
          'Digital Analytics',
          'digital-analytics',
        ],
        [
          'Paid and organic now work as one plan. Cost per order dropped while new customer revenue grew.',
          'Jessica Alvarez',
          'Marketing Manager',
          'Brightwater Apparel',
          'us',
          'United States',
          'Growth Marketing',
          'growth-marketing',
        ],
        [
          'The replatform landed on time with no traffic loss. Search, filters and B2B ordering all work better than before.',
          'Daniel Clarke',
          'IT Director',
          'Pennine Tool Co.',
          'gb',
          'United Kingdom',
          'Ecommerce Website Development',
          'ecommerce-website-development',
        ],
        [
          'They mapped every step our customers take, online and offline. The quick wins alone justified the engagement.',
          'Emily Tremblay',
          'VP Customer Experience',
          'Maple Ridge Home',
          'ca',
          'Canada',
          'Customer Experience Consulting',
          'customer-experience-consulting',
        ],
        [
          'Drop-off between search and cart was costing us more than we knew. Fixing that one step lifted revenue across the site.',
          'Jack Harrison',
          'Head of Digital Product',
          'Southern Cross Electronics',
          'au',
          'Australia',
          'Customer Journey Optimization',
          'customer-journey-optimization',
        ],
        [
          'Straight answers on platform, pricing and operations. Their advice saved us a year of trial and error.',
          'Aoife Murphy',
          'Managing Director',
          'Wicklow Beauty Co.',
          'ie',
          'Ireland',
          'Ecommerce Consulting',
          'ecommerce-consulting',
        ],
        [
          'Our Run pod feels like part of the team. AI flags issues daily and their experts fix them before we notice.',
          'Arjun Mehta',
          'Director of Ecommerce Operations',
          'Saffron Home Retail',
          'in',
          'India',
          'Run pods',
          'run',
        ],
      ];
      const w = this.state.w || 1200,
        per = w >= 1100 ? 3 : w >= 720 ? 2 : 1,
        n = REVIEWS.length,
        max = n - per + 1,
        idx = (((this.state.rvI || 0) % max) + max) % max;
      const tx = 'translateX(calc(' + -idx + ' * (100% + 16px)))';
      return {
        revs: REVIEWS.map((r) => ({
          q: r[0],
          name: r[1],
          role: r[2],
          co: r[3],
          sol: r[6],
          href:
            r[7] === 'run'
              ? '#/run'
              : ['customer-experience-consulting', 'customer-journey-optimization', 'ecommerce-consulting'].includes(
                    r[7],
                  )
                ? '#/' + r[7]
                : '#/services/' + r[7],
          flag: 'url(https://flagcdn.com/w80/' + r[4] + '.png)',
          country: r[5],
          tx,
          basis: 'calc((100% - ' + (per - 1) * 16 + 'px) / ' + per + ')',
        })),
        rvPrev: () => this.setState((s) => ({ rvI: (s.rvI || 0) - 1 })),
        rvNext: () => this.setState((s) => ({ rvI: (s.rvI || 0) + 1 })),
        rvEnter: () => {
          this.rvHold = true;
        },
        rvLeave: () => {
          this.rvHold = false;
        },
        rvDots: Array.from({ length: max }, (_, i) => ({
          w: i === idx ? '22px' : '8px',
          bg: i === idx ? 'var(--acc)' : 'rgba(var(--ink-rgb),.25)',
          go: () => this.setState({ rvI: i }),
        })),
      };
    }
    insCard(x, i) {
      const P = [
          ['20%', '15%'],
          ['80%', '20%'],
          ['50%', '90%'],
          ['15%', '80%'],
          ['85%', '85%'],
          ['50%', '10%'],
        ][i % 6],
        r1 = 52 + ((i * 7) % 18),
        r2 = 30 + ((i * 5) % 14);
      return {
        cat: x.cat,
        read: x.read,
        date: x.date || '',
        t: x.t,
        ex: x.ex,
        href: '#/insights/' + x.slug,
        d: Math.min(i * 50, 400) + 'ms',
        gx: P[0],
        gy: P[1],
        r1: r1 + '%',
        m1: -r1 / 2 + '%',
        r2: r2 + '%',
        m2: -r2 / 2 + '%',
        sp: 18 + (i % 4) * 6 + 's',
        sp2: 12 + (i % 3) * 5 + 's',
        mono: x.cat
          .split(/[\s&/]+/)
          .filter(Boolean)
          .map((w) => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      };
    }
    setTitle() {
      const t = this.lastVals && this.lastVals.docTitle;
      if (t && document.title !== t) document.title = t;
      const ds = this.lastVals && this.lastVals.docDesc;
      const v = this.lastVals || {};
      const url = 'https://cxworks.com' + (v.docUrl || '/');
      const tag = (sel, mk) => {
        let m = document.head.querySelector(sel);
        if (!m) {
          m = mk();
          document.head.appendChild(m);
        }
        return m;
      };
      const meta = (attr, name, val) => {
        if (!val) return;
        const m = tag('meta[' + attr + '="' + name + '"]', () => {
          const e = document.createElement('meta');
          e.setAttribute(attr, name);
          return e;
        });
        if (m.content !== val) m.content = val;
      };
      meta('name', 'description', ds);
      meta('name', 'robots', 'index, follow');
      meta('property', 'og:type', v.isPost ? 'article' : 'website');
      meta('property', 'og:site_name', 'CXWorks');
      meta('property', 'og:title', t);
      meta('property', 'og:description', ds);
      meta('property', 'og:url', url);
      meta('name', 'twitter:card', 'summary_large_image');
      meta('name', 'twitter:title', t);
      meta('name', 'twitter:description', ds);
      const c = tag('link[rel="canonical"]', () => {
        const e = document.createElement('link');
        e.rel = 'canonical';
        return e;
      });
      if (c.href !== url) c.href = url;
      const ld = tag('script#cx-ld', () => {
        const e = document.createElement('script');
        e.type = 'application/ld+json';
        e.id = 'cx-ld';
        return e;
      });
      const g = [
        { '@type': 'Organization', name: 'CXWorks', url: 'https://cxworks.com/' },
        { '@type': 'WebPage', name: t, description: ds, url },
      ];
      if (v.isPost)
        g.push({
          '@type': 'Article',
          headline: v.docH1,
          description: ds,
          datePublished: v.docDate,
          author: { '@type': 'Organization', name: 'CXWorks Editorial' },
          mainEntityOfPage: url,
        });
      const fq = (v.docFaq || []).filter((x) => x && x[0] && x[1]);
      if (fq.length)
        g.push({
          '@type': 'FAQPage',
          mainEntity: fq.map((x) => ({
            '@type': 'Question',
            name: x[0],
            acceptedAnswer: { '@type': 'Answer', text: x[1] },
          })),
        });
      const js = JSON.stringify({ '@context': 'https://schema.org', '@graph': g });
      if (ld.textContent !== js) ld.textContent = js;
    }
    scan() {
      requestAnimationFrame(() => {
        document
          .querySelectorAll('main section:not([data-screen-label$="hero"]) h2:not([data-sr]):not([data-reveal])')
          .forEach((el) => el.setAttribute('data-sr', ''));
        document
          .querySelectorAll(
            'main section:not([data-screen-label$="hero"]) :is([style*="display: grid"],[style*="display:grid"],[style*="flex-wrap: wrap"]):not([data-ngpanel] *)',
          )
          .forEach((g) => {
            if (g.closest('[data-reveal]:not([data-in])') && g.matches('[data-reveal] *')) {
            }
            [...g.children].slice(0, 16).forEach((el, i) => {
              if (
                el.hasAttribute('data-sr') ||
                el.hasAttribute('data-reveal') ||
                el.tagName === 'SVG' ||
                el.tagName === 'svg'
              )
                return;
              el.setAttribute('data-sr', '');
              el.style.setProperty('--sr-i', i % 8);
              const s = el.getAttribute('style') || '';
              const deco = !el.textContent.trim() && !el.querySelector('img,svg');
              if (
                !deco &&
                el.tagName !== 'BUTTON' &&
                !el.querySelector('input,select,textarea,form') &&
                el.getAttribute('aria-hidden') !== 'true' &&
                (el.tagName === 'A' || /border: ?1px solid|border-radius/.test(s))
              )
                el.setAttribute('data-srcard', '');
            });
          });
        if (!this.srSweep) {
          this.srSweep = () => {
            if (this.srT) return;
            this.srT = setTimeout(() => {
              this.srT = 0;
              document.querySelectorAll('[data-sr]:not([data-in]), [data-reveal]:not([data-in])').forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.width && r.top < innerHeight) el.setAttribute('data-in', '1');
              });
            }, 120);
          };
          window.addEventListener('scroll', this.srSweep, { passive: true });
        }
        document
          .querySelectorAll('main section:not([data-screen-label$="hero"]) [data-reveal]:not([data-srcard])')
          .forEach((el) => {
            const s = el.getAttribute('style') || '';
            if (
              /border: ?1px solid/.test(s) &&
              /border-radius/.test(s) &&
              !el.querySelector('input,select,textarea,form') &&
              el.textContent.trim() &&
              el.offsetWidth < 900
            )
              el.setAttribute('data-srcard', '');
          });
        document.querySelectorAll('[data-reveal]:not([data-obs]), [data-sr]:not([data-obs])').forEach((el) => {
          el.setAttribute('data-obs', '1');
          this.io.observe(el);
        });
      });
    }
    cxCanPush() {
      const pr = location.protocol;
      return pr === 'http:' || pr === 'https:';
    }
    cxPath() {
      const h = location.hash || '';
      if (h.indexOf('#/') === 0) return h.slice(2);
      if (!this.cxCanPush()) return '';
      let p = location.pathname.slice(1);
      if (p === 'index.html' || p === 'index.htm') p = '';
      return p + (location.search || '');
    }
    cxClean() {
      if (!this.cxCanPush()) return;
      document.querySelectorAll('a[href]').forEach((a) => {
        if ((a.getAttribute('href') || '').indexOf('#/') !== 0) return;
        a.setAttribute('data-cxh', '1');
        a.setAttribute('href', '/' + a.getAttribute('href').slice(2));
      });
    }
    parse() {
      const raw = this.cxPath(),
        qi = raw.indexOf('?'),
        path = qi >= 0 ? raw.slice(0, qi) : raw,
        q = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '');
      const p = path.split('/').filter(Boolean),
        P = (window.CXD && window.CXD.pages) || {};
      let key = 'home',
        route = 'page',
        slug = '';
      const has = (k) => !!P[k];
      if (!p.length || p[0] === 'run') key = 'home';
      else if (p[0] === 'insights' || p[0] === 'blog') {
        const sl = p.slice(1).join('/');
        const BL = window.CX_BLOGS || [];
        const hit =
          sl && (BL.find((x) => x.slug === sl) || BL.find((x) => x.slug.split('/').pop() === p[p.length - 1]));
        route = hit ? 'post' : 'insights';
        slug = hit ? hit.slug : '';
        key = 'insights';
      } else if (p[0] === 'services' && p[1] && p[2] === 'audit' && window.CX_AUDITMAP && window.CX_AUDITMAP[p[1]])
        key = 'audit:' + window.CX_AUDITMAP[p[1]];
      else if (p[0] === 'diagnose') key = p[1] && has('audit:' + p[1]) ? 'audit:' + p[1] : 'audit:dcx-diagnostic';
      else if (p[0] === 'build') key = 'svc:dcx-transformation';
      else if (p[0] === 'audits' && p[1]) key = has('audit:' + p[1]) ? 'audit:' + p[1] : 'audit:dcx-diagnostic';
      else if (p[0] === 'dcx-audit') key = 'audit:dcx-diagnostic';
      else if (p[0] === 'services' && p[1])
        key =
          p[2] === 'dcx-audit' ? 'audit:dcx-diagnostic' : has('svc:' + p[1]) ? 'svc:' + p[1] : 'svc:dcx-transformation';
      else if (p[0] === 'solutions' && p[1])
        key = has('sol:' + p[1]) ? 'sol:' + p[1] : has('svc:' + p[1]) ? 'svc:' + p[1] : 'home';
      else if (p[0] === 'industries') key = 'home';
      else if (p[0] === 'case-studies') {
        route = 'insights';
        key = 'insights';
      } else if (
        ['customer-experience-consulting', 'customer-journey-optimization', 'ecommerce-consulting'].includes(p[0])
      )
        key = 'sol:' + p[0];
      else if (p[0] === 'contact-us') key = 'contact';
      else if (has(p[0])) key = p[0];
      const topic = q.get('topic');
      const ns = { route, key, slug, dd: null, menu: false, mAcc: null, faqOpen: 0, jg: 0 };
      if (topic) ns.topic = TOPICS.includes(topic) ? topic : 'General';
      if (this.state.status === 'ok' && key !== this.state.key) {
        ns.status = 'idle';
        ns.f = {};
      }
      this.setState(ns);
    }
    setF(k, v) {
      this.setState((s) => ({ f: { ...s.f, [k]: v }, err: { ...s.err, [k]: null } }));
    }
    async submit(e, kind) {
      e.preventDefault();
      const { f } = this.state,
        err = {};
      if (!(f.name || '').trim()) err.name = 'Please enter your name';
      const em = (f.email || '').trim().toLowerCase(),
        FREE =
          /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|msn|aol|icloud|me|mac|proton|protonmail|gmx|mail|zoho|yandex|rediffmail|qq|163)\.[a-z.]+$/;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) err.email = 'Enter a valid work email, like jane@company.com';
      else if (FREE.test(em)) err.email = 'Please use your work email, not a personal one like Gmail';
      if (kind === 'scan' && !/[\w-]+\.[a-z]{2,}/i.test((f.url || '').trim()))
        err.url = 'Add your website, like company.com';
      if (kind === 'book' && !(f.company || '').trim()) err.company = 'Please enter your company';
      if (Object.keys(err).length) return this.setState({ err });
      this.setState({ status: 'loading' });
      try {
        if (CONFIG.FORM_ENDPOINT) {
          const lbl = kind === 'scan' ? 'Free AI scan request' : 'Contact / booking enquiry';
          const r = await fetch(CONFIG.FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              _subject: 'CXWorks website: ' + lbl + ' from ' + (f.name || '').trim(),
              _replyto: (f.email || '').trim(),
              form_type: lbl,
              type: kind,
              door: this.state.door || '',
              topic: this.state.topic || '',
              diagnose: f.diag || 'Not sure yet',
              build: f.build || 'Not sure yet',
              ...f,
              page: location.href,
              submitted_at: new Date().toISOString(),
            }),
          });
          if (!r.ok) throw new Error(r.status);
        } else await new Promise((r) => setTimeout(r, 700));
        this.setState({ status: 'ok', thanks: true });
      } catch (x) {
        this.setState({ status: 'err' });
      }
    }

    routeVals() {
      const L = Math.floor((this.state.tick || 0) / 3) % 2;
      return {
        stg: [
          [
            'Diagnose',
            '#/diagnose',
            [
              'DCX Audit (flagship)',
              'SEO audit',
              'Technical SEO audit',
              'AI visibility audit',
              'CRO audit',
              'Digital Analytics audit',
              'Accessibility audit',
              'Digital Merchandising audit',
            ],
          ],
          [
            'Build',
            '#/build',
            [
              '90-day Build sprints',
              'Catalog and product data',
              'Search and templates',
              'Tracking setup',
              'Website development',
              'AI feed and content fixes',
            ],
          ],
        ].map((c) => ({ n: c[0], href: c[1], items: c[2] })),
        entry: [
          ['8 service pages', 'Each shows all 3 stages', '#/services/dcx-transformation'],
          ['3 solution pages', 'Buyer search terms', '#/customer-experience-consulting'],
        ].map((e) => ({ t: e[0], d: e[1], href: e[2] })),
        ends: [
          ['Free AI scan', '#/free-ai-scan'],
          ['DCX Audit', '#/services/dcx-transformation/dcx-audit'],
        ].map((e, i) => ({
          t: e[0],
          href: e[1],
          bd: i === L ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)',
          bg: i === L ? 'rgba(var(--acc-rgb),.12)' : 'transparent',
          arrow: i < 2 ? 'inline' : 'none',
        })),
      };
    }
    loopVals() {
      const s = this.state,
        L = s.loopH != null ? s.loopH : Math.floor((s.tick || 0) / 3) % 3;
      const C = [
        [
          'Diagnose',
          'Find',
          '#/dcx-audit',
          ['DCX Audit', 'Analytics and catalog audits', 'AI visibility audit'],
          'they confirm the earliest failing gate and put a money value on fixing it.',
          'zero-result searches on 2,300 part numbers',
          [1, 2],
        ],
        [
          'Build',
          'Fix',
          '#/services/dcx-transformation',
          ['Catalog data and search', 'Test and template builds', 'Tracking and site dev'],
          'they design the fix, build it and check it before it ships.',
          'one product template slowing 9,000 pages',
          [0, 2],
        ],
        [
          'Run',
          'Keep',
          '#/run-pods',
          ['Monthly Run pods', 'All nine gates watched', 'Monthly review and fixes'],
          'they review what changed each month and ship the next fixes.',
          'conversion dip on mobile checkout this week',
          [1, 3],
        ],
      ];
      const on = (i) => i === L,
        A = C[L];
      return {
        loopKey: 'l' + L,
        loopName: A[0],
        loopHuman: 'Experts ' + A[4].replace(/^they /, ''),
        loopSignal: A[5],
        watch: ['Catalog', 'Search', 'Funnel', 'AI answers'].map((t, i) => {
          const a = A[6].includes(i);
          return {
            t,
            bd: a ? 'rgba(var(--acc-rgb),.7)' : 'rgba(var(--ink-rgb),.14)',
            bg: a ? 'rgba(var(--acc-rgb),.14)' : 'transparent',
            c: a ? 'var(--ink)' : 'var(--ink3)',
          };
        }),
        mid: { line: 'var(--acc)', dot: 'block' },
        cols: C.map((c, i) => ({
          n: c[0],
          verb: c[1],
          href: c[2],
          items: c[3],
          bd: on(i) ? 'rgba(var(--acc-rgb),.75)' : 'rgba(var(--ink-rgb),.12)',
          bg: on(i) ? 'rgba(var(--acc-rgb),.08)' : 'rgba(var(--glass),.03)',
          lift: on(i) ? 'translateY(-4px)' : 'none',
          op: on(i) ? '1' : '.7',
          line: on(i) ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)',
          dot: on(i) ? 'block' : 'none',
          enter: () => this.setState({ loopH: i }),
          leave: () => this.setState({ loopH: null }),
        })),
      };
    }
    mapVals(b0, D) {
      const s = this.state,
        K = ['diagnose', 'build', 'run'],
        svcs = D.SERVICES || [];
      const baseC = b0.stage ? K.indexOf(b0.stage) : -1,
        baseR = b0.svc ? svcs.findIndex((v) => v.slug === b0.svc) : -1;
      const AC = s.mapC != null ? s.mapC : baseC,
        AR = s.mapR != null ? s.mapR : baseR;
      const MC = AC >= 0 && AC < 3 ? AC : s.mapM != null ? s.mapM : 0;
      const heads = ['Diagnose (find)', 'Build (fix)', 'Run (keep improving)', 'Main gates'].map((t, i) => ({
        t,
        c: i === AC ? 'var(--acc)' : 'var(--ink3)',
        bg: i === AC ? 'rgba(var(--acc-rgb),.08)' : 'transparent',
        bd: i === MC ? 'var(--acc)' : 'rgba(var(--ink-rgb),.16)',
        enter: () => this.setState({ mapC: i }),
        leave: () => this.setState({ mapC: null }),
        tap: () => this.setState({ mapM: i }),
      }));
      if (this.state.w < 900)
        heads.forEach((hd, i) => {
          hd.bg = i === MC ? 'rgba(var(--acc-rgb),.14)' : 'transparent';
          hd.c = i === MC ? 'var(--ink)' : 'var(--ink3)';
        });
      const rows = svcs.map((v, i) => {
        const r = i === AR,
          vals = [v.d, v.b, v.r, v.gates];
        return {
          name: v.name,
          href: '#/services/' + v.slug,
          bg: r ? 'rgba(var(--acc-rgb),.07)' : 'transparent',
          bd: r ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--ink-rgb),.1)',
          nc: r ? 'var(--acc)' : 'var(--ink)',
          arrow: r ? '1' : '0',
          mob: vals[MC],
          cells: vals.map((t, j) => ({
            t,
            c: j === AC || r ? 'var(--ink)' : 'var(--ink3)',
            bg: j === AC ? 'rgba(var(--acc-rgb),.06)' : 'transparent',
          })),
          enter: () => this.setState({ mapR: i }),
          leave: () => this.setState({ mapR: null }),
        };
      });
      return { heads, rows, wide: this.state.w >= 900, narrow: this.state.w < 900, mobLabel: heads[MC].t };
    }
    renderVals() {
      const s = this.state,
        D = window.CXD || { pages: {}, GATES: [], CASES: [], AUDITS: [], SERVICES: [], SOLUTIONS: [], INDUSTRIES: [] },
        C = window.CXW || {},
        H = C.home || {};
      let page = D.pages[s.key] || D.pages.home || { blocks: [] };
      const isPage = s.route === 'page';
      const wide = s.w >= 900,
        focus = isPage && !!page.focus;
      const allGates = D.GATES.flatMap((g) => g.gates.map((x) => ({ stage: g.stage, name: x[0], d: x[1] }))).map(
        (g, i) => ({ ...g, n: p2(i) }),
      );
      const caseV = (c) => ({
        ...c,
        href: '#/case-studies/' + c.slug,
        n1v: c.n1[0],
        n1t: c.n1[1],
        n2v: c.n2[0],
        n2t: c.n2[1],
      });
      const formKind =
        (page.blocks.find((b) => b.type === 'convert') || {}).kind ||
        (page.blocks.some((b) => b.type === 'cta' && b.form) ? 'scan' : 'scan');
      let fi = 0;
      const GONE = (x) => typeof x === 'string' && /^#\/(diagnose|build|run)$|^#\/industries(\/|$)/.test(x);
      const MAPH = (x) =>
        x === '#/diagnose'
          ? '#/dcx-audit'
          : x === '#/build'
            ? '#/services/dcx-transformation'
            : /^#\/industries/.test(x)
              ? '#/'
              : (window.CX_REMAP && window.CX_REMAP[x]) || x;
      const SELF = (x) => s.key === 'industries' && (x === '#/industries' || /^#\/industries\/./.test(x || ''));
      const NM = window.CX_NAMES || {};
      const SAN = (v) => {
        if (Array.isArray(v)) {
          return v
            .filter((e) => !(Array.isArray(e) && typeof e[0] === 'string' && GONE(e[1])))
            .map((e) =>
              Array.isArray(e) && typeof e[0] === 'string' && typeof e[1] === 'string' && /^#\//.test(e[1])
                ? [NM[e[0]] || e[0], MAPH(e[1])].concat(e.slice(2).map(SAN))
                : typeof e === 'string'
                  ? NM[e] || e
                  : SAN(e),
            );
        }
        if (v && typeof v === 'object' && !v.$typeof) {
          const o = {};
          for (const k in v)
            o[k] = k === 'href' ? MAPH(v[k]) : typeof v[k] === 'string' && NM[v[k]] ? NM[v[k]] : SAN(v[k]);
          if (SELF(v.href)) {
            delete o.href;
            o.noLink = true;
          }
          return o;
        }
        return v;
      };
      page = { ...page, crumb: (page.crumb || []).map((c) => (GONE(c[1]) ? [c[0]] : c)), blocks: SAN(page.blocks) };
      if (s.key === 'about') {
        const hb = (D.pages.home && D.pages.home.blocks) || [],
          cs = hb.find((b) => b && b.type === 'cases'),
          rv = hb.find((b) => b && b.type === 'reviews');
        const rest = page.blocks.filter((b) => b && b.type !== 'cases' && b.type !== 'reviews');
        let at = rest.findIndex((b) => b.type === 'cta');
        at = at < 0 ? rest.length : at + 1;
        rest.splice(at, 0, ...[cs, rv].filter(Boolean).map(SAN));
        page = { ...page, blocks: rest };
      }
      const noCS = (l) => !(Array.isArray(l) && /case-studies/.test(l[1] || ''));
      const blocks = page.blocks
        .map((b0) => {
          let b = b0;
          if (b.list) b = { ...b, list: b.list.filter(noCS) };
          if (b.link && /case-studies/.test(b.link.href || '')) {
            b = { ...b };
            delete b.link;
          }
          if (Array.isArray(b.items) && b.items.some((it) => it && Array.isArray(it.links)))
            b = {
              ...b,
              items: b.items.map((it) =>
                it && Array.isArray(it.links) ? { ...it, links: it.links.filter(noCS) } : it,
              ),
            };
          return b;
        })
        .filter(
          (b) =>
            b.type !== 'team' &&
            b.type !== 'svcmap' &&
            !(s.key !== 'home' && s.key !== 'about' && b.type === 'cases') &&
            !(s.key === 'home' && b.type === 'faq'),
        )
        .map((b0, bi) => {
          const b = {
            ...b0,
            label: (page.title || 'Page').split('|')[0].trim().slice(0, 40) + ' · ' + b0.type,
            hasH: !!b0.h,
            hasP: !!b0.p,
          };
          b['is_' + b0.type] = true;
          if (b0.type === 'loop') Object.assign(b, this.loopVals());
          if (b0.type === 'reviews') Object.assign(b, this.reviewVals());
          if (b0.type === 'insrail') {
            const IA = window.CX_BLOGS && window.CX_BLOGS.length ? window.CX_BLOGS : C.insights || [];
            b.ins = IA.slice(0, 3).map((x, i) => this.insCard(x, i));
          }
          if (b0.type === 'routes') Object.assign(b, this.routeVals());
          if (b0.type === 'svcmap') Object.assign(b, this.mapVals(b0, D));
          if (b0.type === 'tools') {
            const TI = window.CX_TOOL_ICONS || { map: {}, paths: {} },
              BR = {
                adobe: '#FA0F00',
                googleanalytics: '#E37400',
                qualtrics: '#00B4EF',
                google: '#4285F4',
                openai: '#000000',
                googlegemini: '#8E75B2',
                perplexity: '#1FB8CD',
                algolia: '#003DFF',
                shopify: '#7AB55C',
                magento: '#EE672F',
                looker: '#4285F4',
                googletagmanager: '#246FDB',
                googlebigquery: '#669DF6',
                googleads: '#4285F4',
                meta: '#0467DF',
                linkedin: '#0A66C2',
                tiktok: '#000000',
                snapchat: '#000000',
                instagram: '#E4405F',
                hubspot: '#FF7A59',
                salesforce: '#00A1E0',
                bigcommerce: '#121118',
                sap: '#0FAAFF',
                wordpress: '#21759B',
                calendly: '#006BFF',
              };
            b.tools = (b0.items || []).map((x) => {
              const n = Array.isArray(x) ? x[0] : x,
                sl = TI.map[n],
                d = sl && TI.paths[sl];
              const im = (TI.imgs || {})[n];
              return {
                name: n,
                d: d || '',
                c: BR[sl] || '#1C1C1E',
                img: im || '',
                bgi: im ? 'url(' + im + ')' : 'none',
                hasImg: !!im,
                hasIc: !!d && !im,
                noIc: !d && !im,
                m: n.replace(/[^A-Za-z]/g, '').slice(0, 2),
              };
            });
          }
          if (b0.type === 'chart') b.ch = chartVals(b0.slug, s.ck == null ? 0 : s.ck);
          if (b0.ctas) {
            b.btn1 = btn(b0.ctas[0]);
            b.btn2 = btn(b0.ctas[1]);
          }
          if (b0.btn) b.btn1 = btn(b0.btn);
          if (b0.type === 'hero') {
            b.hasCrumb = !!page.crumb;
            b.crumb = (page.crumb || []).map((c, i, a) => ({
              l: c[0],
              href: i < a.length - 1 ? c[1] || '#/' : '',
              last: i === a.length - 1,
            }));
            b.hasMeta = !!(b0.meta && b0.meta.length);
            b.notHome = !b0.home;
            b.h1max = b0.home ? '26ch' : '18ch';
            b.gridKind = b0.home ? 'home' : 'page';
            b.h1size = b0.home ? 'clamp(38px,3.8vw,54px)' : 'clamp(40px,5.6vw,84px)';
          }
          if (b0.type === 'problem') b.lines = b0.lines.map((l) => ({ k: l[0], v: l[1] }));
          if (b0.type === 'stages')
            b.items = b0.items.map((x, i) => ({
              ...x,
              n: p2(i),
              links: x.links.map((l) => ({ l: l[0], href: l[1] })),
            }));
          if (b0.type === 'catalog') {
            b.big0 = b0.big[0] + ' fixed';
            b.big1 = b0.big[1];
          }
          if (b0.type === 'doors')
            b.doors = [
              { t: 'I sell online', ...b0.sell },
              { t: 'I get enquiries online', ...b0.enq },
            ].map((d, i) => {
              const on = s.doorH === i,
                A = i === 0;
              return {
                ...d,
                enter: () => this.setState({ doorH: i }),
                leave: () => this.setState({ doorH: null }),
                tf: on ? (A ? 'translateY(-6px)' : 'scale(1.015)') : 'none',
                bd: on ? (A ? 'rgba(var(--acc-rgb),.75)' : 'rgba(var(--accd-rgb),.6)') : 'rgba(var(--glass),.12)',
                sh: on
                  ? A
                    ? '0 24px 50px -24px rgba(var(--acc-rgb),.55), inset 0 1px 0 rgba(var(--glass),.2)'
                    : 'inset 0 0 0 1px rgba(var(--accd-rgb),.25), inset 0 -60px 80px -40px rgba(var(--accd-rgb),.22)'
                  : 'inset 0 1px 0 rgba(var(--glass),.16)',
                bgi: on
                  ? A
                    ? 'linear-gradient(160deg, rgba(var(--acc-rgb),.16), rgba(var(--glass),.03) 55%)'
                    : 'linear-gradient(340deg, rgba(var(--accd-rgb),.18), rgba(var(--glass),.03) 60%)'
                  : 'linear-gradient(140deg, rgba(var(--glass),.075), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
                tc: on ? (A ? 'var(--acc)' : 'var(--acc-soft)') : 'var(--ink)',
                cb: on ? (A ? 'rgba(var(--acc-rgb),.55)' : 'rgba(var(--accd-rgb),.5)') : 'rgba(var(--ink-rgb),.16)',
                cc: on ? 'var(--ink)' : 'var(--ink3)',
                cbg: on ? (A ? 'rgba(var(--acc-rgb),.1)' : 'rgba(var(--accd-rgb),.12)') : 'transparent',
              };
            });
          if (b0.type === 'ladder')
            b.items = b0.items.map((x) => ({
              ...x,
              bd: x.hi ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)',
              bg: x.hi ? 'rgba(var(--acc-rgb),.10)' : 'rgba(var(--glass),.02)',
            }));
          if (b0.type === 'cases') b.items = b0.items.map(caseV);
          if (b0.type === 'list') b.items = b0.items.map((t, i) => ({ n: b0.check ? '✦' : p2(i), t }));
          if (b0.type === 'cards')
            b.items = b0.items.map((c) => ({
              ...c,
              isLink: !c.noLink,
              noLink: !!c.noLink,
              meta: c.meta || [],
              badge: c.badge || '',
              bd: c.badge === 'Most complete' ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--glass),.12)',
            }));
          if (b0.type === 'facts')
            b.items = b0.items.map((x, i) => ({
              k: x[0],
              v: x[1],
              n: String(i + 1).padStart(2, '0'),
              dl: i * 120 + 'ms',
              spd: 3.6 + i * 0.6 + 's',
              ic: [
                'M13 2L4 14h7l-1 8l9-12h-7z',
                'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
                'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5l-2.5-.5l-.5-2.5z',
                'M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z',
              ][i % 4],
            }));
          if (b0.type === 'timeline') b.items = b0.items.map((x) => ({ k: x[0], v: x[1] }));
          if (b0.type === 'checklist')
            b.groups = b0.groups.map((g) => ({
              gate: g.gate === 'All' ? 'Across all gates' : g.gate,
              items: g.items.map((x) => ({ k: x[0], v: x[1] })),
            }));
          if (b0.type === 'steps') b.items = b0.items.map((x, i) => ({ n: String(i + 1), k: x[0], v: x[1] }));
          if (b0.type === 'gatechips') {
            const on = (n) => b0.gates.startsWith('All') || b0.gates.includes(n);
            b.chips = allGates.map((g) => {
              const y = on(g.name);
              return {
                n: g.n,
                name: g.name,
                bd: y ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)',
                bg: y ? 'var(--acc)' : 'transparent',
                c: y ? 'var(--on-acc)' : 'var(--muted2)',
                fw: y ? '600' : '400',
                sh: y ? '0 10px 24px -12px rgba(var(--acc-rgb),.7)' : 'none',
                arr: y ? 'inline' : 'none',
              };
            });
          }
          if (b0.type === 'dbr')
            b.cols = [
              ['Diagnose', b0.d, 'Fixed price', '#/dcx-audit'],
              ['Build', b0.b, 'Fixed price or sprint', '#/services/dcx-transformation'],
            ].map((x) => ({ k: x[0], v: x[1], price: x[2], href: x[3] }));
          if (b0.type === 'related')
            (b.svcList = (b0.svcs || []).map((x) => ({ l: x[0], href: x[1] }))),
              (b.hasSvcs = !!b0.hasSvcs),
              (b.hubs = (b0.hubs || []).map((x) => ({ l: x[0], href: x[1] }))),
              (b.hasHubs = !!(b0.hubs && b0.hubs.length)),
              (b.items = b0.items
                .map((x, i) => {
                  const hr = x[1] || '',
                    sl = hr.split('/').filter(Boolean).pop(),
                    all = [].concat(D.SERVICES || [], D.AUDITS || [], D.SOLUTIONS || [], D.INDUSTRIES || []),
                    m = all.find((o) => o.slug === sl) || {},
                    st = /\/audits\//.test(hr)
                      ? 'Diagnose'
                      : /\/services\//.test(hr)
                        ? 'Build'
                        : /\/industries\//.test(hr)
                          ? 'Industry'
                          : /run/.test(hr)
                            ? 'Run'
                            : 'Explore';
                  return {
                    tag: st,
                    d: m.promise || m.d || m.fix || m.line || '',
                    hasD: !!(m.promise || m.d || m.fix || m.line),
                    gates: m.gates ? 'Gates: ' + m.gates : m.time || '',
                    x: x,
                    i: i,
                  };
                })
                .map(({ tag, d, hasD, gates, x, i }) => ({
                  tag,
                  d,
                  hasD,
                  gates,
                  l: x[0],
                  href: x[1],
                  n: String(i + 1).padStart(2, '0'),
                  dl: i * 110 + 'ms',
                  spd: 3.6 + i * 0.6 + 's',
                  ic: [
                    'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
                    'M4 19h4l10-10l-4-4L4 15zM13 6l4 4',
                    'M3 17l6-6l4 4l8-8M15 7h6v6',
                    'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
                    'M3 12h18M12 3l9 9l-9 9',
                    'M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z',
                  ][i % 6],
                })));
          if (b0.type === 'probs') b.items = b0.items.map((x) => ({ k: x[0], v: x[1] }));
          if (b0.type === 'pricing')
            b.items = b0.items.map((x, i) => ({
              t: x[0],
              d: x[1],
              inc: x[2],
              hi: i === 1,
              bd: i === 1 ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)',
              bg: i === 1 ? 'rgba(var(--acc-rgb),.10)' : 'rgba(var(--glass),.02)',
            }));
          if (b0.type === 'convert') b.steps = b0.steps.map((x, i) => ({ n: String(i + 1), k: x[0], v: x[1] }));
          if (b0.type === 'cta') {
            b.form = !!b0.form;
            b.noForm = !b0.form;
          }
          if (b0.type === 'casehero' || b0.type === 'caseflow') b.c = caseV(b0.c);
          return b;
        });
      // home final CTA hosts the scan form
      if (!/scan|book|contact|thank/.test(s.key || '')) {
        const last = [...blocks].reverse().find((x) => x.is_cta);
        if (last) {
          last.form = true;
          last.noForm = false;
        }
      }
      const faqB = page.blocks.find((b) => b.type === 'faq');
      const faqItems = ((faqB && faqB.items) || []).map((q, i) => {
        const open = s.faqOpen === i;
        return {
          q: q[0],
          a: q[1],
          open,
          c: open ? 'var(--acc)' : 'var(--ink)',
          ring: open ? 'var(--acc)' : 'rgba(var(--ink-rgb),.2)',
          rot: open ? 'rotate(45deg)' : 'none',
          toggle: () => this.setState({ faqOpen: open ? -1 : i }),
        };
      });
      const jc = allGates[s.jg] || {};
      const navC = (k) => {
        const on =
          (k === 'diagnose' && (s.key === 'diagnose' || s.key.startsWith('audit:'))) ||
          (k === 'build' && (s.key === 'build' || s.key.startsWith('svc:'))) ||
          (k === 'run' && (s.key === 'run-pods' || s.key === 'ways-to-work')) ||
          (k === 'industries' && (s.key === 'industries' || s.key.startsWith('ind:'))) ||
          (k === 'insights' && !isPage) ||
          (k === 'about' && s.key === 'about') ||
          (k === 'nine-gates' && (s.key === 'nine-gates' || s.key.startsWith('sol:')));
        return on ? 'var(--acc)' : 'var(--ink3)';
      };
      const L = (l, href, target) => ({ l, href, target: target || '_self' });
      const megaDiag = D.AUDITS.map((a) => L(a.name, CXAU(a.slug)));
      const megaBuild = D.SERVICES.map((v) => L(v.name, '#/services/' + v.slug));
      const megaRun = [
        L('Run pods', '#/run-pods'),
        L('Ways to work', '#/ways-to-work'),
        L('Nine Gates', '#/nine-gates'),
      ];
      const megaSol = D.SOLUTIONS.map((x) => L(x.name, '#/' + x.slug));
      const indMenu = [];
      const grp = (k, t, items) => ({
        t,
        items,
        open: s.mAcc === k,
        rot: s.mAcc === k ? 'rotate(180deg)' : 'none',
        toggle: () => this.setState((x) => ({ mAcc: x.mAcc === k ? null : k })),
      });
      const mGroups = [
        grp('d', 'Diagnose', megaDiag),
        grp('b', 'Build', megaBuild),
        grp('r', 'Run', megaRun),
        grp('g', 'Nine Gates', [L('The framework', '#/nine-gates')].concat(megaSol)),
      ];
      const mSub = {
        Diagnose: 'Find the gate that fails first',
        Build: 'Fix it in a 90-day sprint',
        Run: 'Keep all nine gates improving',
        'Nine Gates': 'The framework and solutions',
        Industries: 'Who we work with',
      };
      mGroups.forEach((g) => {
        const first = g.items[0] && /^All /.test(g.items[0].l) ? g.items[0] : null;
        g.hasAll = !!first;
        g.all = first
          ? { l: 'View ' + first.l.replace(/^All of /, 'all of ').replace(/^All /, 'all '), href: first.href }
          : null;
        g.items = (first ? g.items.slice(1) : g.items).map((x, i) => ({ ...x, n: String(i + 1).padStart(2, '0') }));
        g.sub = mSub[g.t] || '';
        g.chipBg = 'transparent';
        g.chipC = g.open ? 'var(--acc)' : 'var(--muted)';
        g.tc = g.open ? 'var(--acc)' : 'var(--ink)';
      });
      mGroups.forEach((g, i) => {
        g.num = String(i + 1).padStart(2, '0');
      });
      const mLinks = [
        L('Insights', '#/insights'),
        L('Contact us', '#/about'),
        L('Products', CONFIG.PRODUCTS_URL, '_blank'),
      ].map((m, i) => ({ ...m, num: String(i + 5).padStart(2, '0'), arr: i === 2 ? '↗' : '→' }));
      const stats = ((H.proof && H.proof.stats) || []).filter((x) => !/team/i.test(x.t)).slice(0, 3);
      const cases = D.CASES.map(caseV);
      const caseList = cases.filter((c) => (s.cg === 'All' || c.gate === s.cg) && (s.cd === 'All' || c.door === s.cd));
      const fopt = (k, cur, vals) =>
        vals.map((v) => ({ l: v, on: cur === v, pick: () => this.setState({ [k]: v }), ...(cur === v ? ACT : IDLE) }));
      const insights = window.CX_BLOGS && window.CX_BLOGS.length ? window.CX_BLOGS : C.insights || [],
        cats = ['All'].concat([...new Set(insights.map((x) => x.cat))]);
      const post = insights.find((x) => x.slug === s.slug) || insights[0] || {};
      const pc = String(post.cat || '').toLowerCase(),
        pickSvc = [
          ['analytic', 'digital-analytics'],
          ['cro', 'conversion-rate-optimization'],
          ['conversion', 'conversion-rate-optimization'],
          ['merch', 'digital-merchandising'],
          ['catalog', 'catalog-management'],
          ['ai', 'ai-search-visibility'],
          ['seo', 'ai-search-visibility'],
          ['growth', 'growth-marketing'],
        ].find((m) => pc.includes(m[0]));
      const svc = D.SERVICES.find((v) => v.slug === (pickSvc ? pickSvc[1] : 'dcx-transformation')) || {};
      const postSecs = (post.secs || []).map((x, i) => ({
        id: 'ps-' + i,
        h: x.h,
        blocks: x.b.map((bk) => ({
          isP: !!bk.p,
          isUl: !!bk.ul,
          isTb: !!bk.tb,
          text: bk.p || '',
          items: bk.ul || [],
          rows: (bk.tb || []).map((rw, ri) => ({
            cells: rw,
            bg: ri === 0 ? 'rgba(var(--acc-rgb),.1)' : 'transparent',
            c: ri === 0 ? 'var(--ink)' : 'var(--ink3)',
            fw: ri === 0 ? '600' : '400',
          })),
        })),
      }));
      const postFaq = (post.faq || []).map((q, i) => ({ q: q[0], a: q[1] }));
      const toc = postSecs
        .map((x, i) => ({ n: p2(i), t: x.h, id: x.id }))
        .concat(postFaq.length ? [{ n: p2(postSecs.length), t: 'FAQ', id: 'ps-take' }] : [])
        .map((x) => ({
          ...x,
          go: () => {
            const el = document.getElementById(x.id);
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
          },
        }));
      const f = s.f,
        err = s.err,
        scanF = formKind === 'scan',
        isContactPg = s.key === 'about' || s.key === 'contact';
      const tf = scanF
        ? [
            ['name', 'Name', 'text', 'Jane Smith', 'name'],
            ['email', 'Work email', 'email', 'jane@company.com', 'email'],
            ['url', 'Website', 'text', 'company.com', 'url'],
          ]
        : [
            ['name', 'Name', 'text', 'Jane Smith', 'name'],
            ['email', 'Work email', 'email', 'jane@company.com', 'email'],
            ['company', 'Company', 'text', 'Company name', 'organization'],
            ['url', 'Website (optional)', 'text', 'company.com', 'url'],
          ];
      const busy = s.status === 'loading';
      const pageTitle = !isPage
        ? s.route === 'post'
          ? post.title || post.t + ' | CXWorks'
          : (window.CXSEO && window.CXSEO.insights && window.CXSEO.insights.title) || 'Insights | CXWorks'
        : page.title || 'CXWorks';
      const sticky = page.sticky ? btn(page.sticky) : null;
      const tk = s.hg != null ? s.hg : s.tick;
      const __v = {
        showInsForm: !isPage,
        insCta: {
          label: 'Insights · Form',
          h: 'Find your earliest failing gate.',
          p: 'Free AI scan. Nine Gate score in about 48 hours.',
          form: true,
          noForm: false,
        },
        insForm: {
          label: 'Insights · Form',
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
          ].map((x, i) => ({ n: String(i + 1), k: x[0], v: x[1] })),
        },
        solMetrics: D.SERVICES.map((x) => {
          const M = {
            'dcx-transformation': ['+68%', 'more visitors reaching checkout', 'All nine gates'],
            'conversion-rate-optimization': ['+62%', 'conversion rate after six test cycles', 'Conversion'],
            'ai-search-visibility': ['3x', 'brand citations in AI answers', 'Discoverability'],
            'digital-merchandising': ['+78%', 'lift in search-to-cart rate', 'Findability'],
            'catalog-management': ['96%', 'average attribute completeness', 'Clarity'],
            'digital-analytics': ['98%', 'of key events tracked accurately', 'Measuring layer'],
            'growth-marketing': ['+34%', 'repeat orders from retention flows', 'Retention'],
            'ecommerce-website-development': ['+75%', 'lift in mobile conversion', 'Usability'],
          }[x.slug] || ['—', '', x.gates];
          const on = s.key === 'svc:' + x.slug;
          return {
            name: x.name,
            href: '#/services/' + x.slug,
            v: M[0],
            k: M[1],
            gate: M[2],
            bd: on ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--glass),.12)',
          };
        }),
        docTitle: pageTitle,
        docDesc:
          (isPage
            ? page.desc
            : s.route === 'post'
              ? post.d || post.ex || post.t
              : window.CXSEO && window.CXSEO.insights && window.CXSEO.insights.d) || '',
        docUrl: isPage ? page.url : s.route === 'post' ? post.url || '/insights/' + s.slug + '/' : '/insights/',
        docFaq: isPage
          ? (page.blocks.find((b) => b.type === 'faq') || {}).items || []
          : s.route === 'post'
            ? post.faq || []
            : [],
        docH1: s.route === 'post' ? post.t : '',
        docDate: s.route === 'post' ? post.date : '',
        isPage,
        isInsights: s.route === 'insights',
        isPost: s.route === 'post',
        showFull: s.w >= 880,
        showProducts: s.w >= 1180,
        showBurger: s.w < 880,
        navTight: s.w < 1180,
        isFocus: false,
        menuOpen: s.menu,
        nav: {
          diagnose: navC('diagnose'),
          build: navC('build'),
          run: navC('run'),
          ninegates: navC('nine-gates'),
          industries: navC('industries'),
          insights: navC('insights'),
          about: navC('about'),
        },
        productsUrl: CONFIG.PRODUCTS_URL,
        ddIndOpen: s.dd === 'ind',
        ddIndEnter: () => this.setState({ dd: 'ind' }),
        ddLeave: () => this.setState({ dd: null }),
        ddIndToggle: () => this.setState((x) => ({ dd: x.dd === 'ind' ? null : 'ind' })),
        ...['Diag', 'Build', 'Run'].reduce((o, k) => {
          const on = s.dd === k;
          o['dd' + k + 'Open'] = on;
          o['dd' + k + 'Enter'] = () => {
            if (this.state.dd !== k) this._ddT = Date.now();
            this.setState({ dd: k });
          };
          o['dd' + k + 'Toggle'] = () =>
            this.setState((x) => ({ dd: x.dd === k && Date.now() - (this._ddT || 0) > 600 ? null : k }));
          o['dd' + k + 'Bg'] = on ? 'rgba(var(--acc-rgb),.12)' : 'transparent';
          o['dd' + k + 'Rot'] = on ? 'rotate(180deg)' : 'none';
          return o;
        }, {}),
        megaDiag: megaDiag.map((m, i) => ({ ...m, n: p2(i) })),
        megaBuild: megaBuild.map((m, i) => ({ ...m, n: p2(i) })),
        megaRun: megaRun.map((m, i) => ({ ...m, n: p2(i) })),
        megaSol,
        indMenu,
        openMenu: () => this.setState({ menu: true }),
        closeMenu: () => this.setState({ menu: false, mAcc: null }),
        mGroups,
        mLinks,
        blocks,
        faqItems,
        themes: Object.keys(THEMES).map((k) => ({
          k,
          name: THEMES[k].name,
          sw: THEMES[k].sw.map((c) => ({ c })),
          on: (s.theme || 'gold') === k,
          bd: (s.theme || 'gold') === k ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)',
          pick: () => {
            applyTheme(k);
            try {
              localStorage.setItem('cx-theme', k);
            } catch (e) {}
            this.setState({ theme: k });
          },
        })),
        themeOpen: !!s.themeOpen,
        toggleTheme: () => this.setState((x) => ({ themeOpen: !x.themeOpen })),
        themeName: (THEMES[s.theme || 'gold'] || THEMES.gold).name,
        heroGatesLeave: () => this.setState((x) => ({ hg: null, tick: x.hg != null ? x.hg : x.tick })),
        heroGates: allGates.map((g, i) => {
          const on = i === tk,
            seen = i < tk;
          return {
            ...g,
            enter: () => this.setState({ hg: i }),
            ic:
              [
                'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M16 16l5 5',
                'M3 5h18M6 12h12M10 19h4',
                'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
                'M2 12s4-7 10-7s10 7 10 7s-4 7-10 7S2 12 2 12M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6',
                'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M11 18h2',
                'M12 3l8 3v6c0 5-3.5 8-8 9c-4.5-1-8-4-8-9V6zM9 12l2 2l4-4',
                'M3 4h3l2.5 11h10l2-8H7M10 20h.01M17 20h.01',
                'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01',
                'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4',
              ][i] || '',
            ic_c: on ? 'var(--acc)' : seen ? 'var(--ink3)' : 'var(--muted2)',
            ic_bg: on ? 'rgba(var(--acc-rgb),.18)' : 'rgba(var(--ink-rgb),.05)',
            bd: on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)',
            bg: on ? 'rgba(var(--acc-rgb),.16)' : 'rgba(var(--glass),.02)',
            c: on ? 'var(--ink)' : seen ? 'var(--ink3)' : 'var(--muted)',
            nc: on ? 'var(--acc)' : 'var(--muted2)',
          };
        }),
        heroSignal:
          (allGates[tk] ? allGates[tk].name + ': ' : '') +
          [
            'AI answers mention 2 competitors, not you.',
            '1 in 6 searches return no results.',
            'Ad landing pages miss the search intent.',
            'Specs missing on 38% of products.',
            'Mobile filters reset on back.',
            'Returns policy not shown near the button.',
            'Shipping cost appears at the last step.',
            'Delivery dates missing on 12 templates.',
            'No quick reorder for trade accounts.',
          ][tk] +
          ' Expert review queued.',
        gateCols: D.GATES.map((g, gi) => {
          const off = D.GATES.slice(0, gi).reduce((a, x) => a + x.gates.length, 0);
          return {
            stage: g.stage,
            tag: g.tag,
            gates: g.gates.map((x, j) => ({ n: p2(off + j), name: x[0], d: x[1] })),
          };
        }),
        jTabs: allGates.map((g, i) => ({
          ...g,
          on: s.jg === i,
          pick: () => this.setState({ jg: i }),
          bd: s.jg === i ? 'var(--acc)' : 'rgba(var(--ink-rgb),.12)',
          bg: s.jg === i ? 'rgba(var(--acc-rgb),.14)' : 'transparent',
          c: s.jg === i ? 'var(--ink)' : 'var(--muted)',
        })),
        gatesAll: D.GATES.map((g, gi) => ({
          stage: g.stage,
          tag: g.tag,
          n: String(gi + 1),
          gates: g.gates.map((x) => {
            const gi2 = allGates.findIndex((a) => a.name === x[0]);
            return { n: p2(gi2), name: x[0], d: x[1], sell: (DOOR_EG[x[0]] || [])[0], enq: (DOOR_EG[x[0]] || [])[1] };
          }),
        })),
        jCur: { ...jc, sell: (DOOR_EG[jc.name] || [])[0], enq: (DOOR_EG[jc.name] || [])[1] },
        sampleBars: allGates.map((g, i) => ({
          name: g.name,
          v: String(SCORES[i]),
          w: SCORES[i] + '%',
          c: i === 1 ? '#E77A6A' : 'var(--acc)',
        })),
        pageDots: Array.from({ length: 36 }, (_, i) => i),
        partners: PARTNERS.map((p) => ({
          src:
            (window.__resources && window.__resources['pt_' + p[0].replace(/-/g, '_')]) ||
            'assets/partners/' + p[0] + '.png',
          name: p[1],
        })),
        statsC: stats.map((st, i) => {
          const k = Math.max(0, Math.min(1, (s.pk || 0) * 1.3 - i * 0.15)),
            m = String(st.v).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
          const base = { ...st, dl: i * 120 + 'ms', spd: 3.6 + i * 0.6 + 's', bar: k * 100 + '%' };
          if (!m) return base;
          return { ...base, v: m[1] + Math.round(parseFloat(m[2]) * k) + m[3] };
        }),
        partnersLoop: [0, 1].flatMap((r) =>
          PARTNERS.map((p) => ({
            src:
              (window.__resources && window.__resources['pt_' + p[0].replace(/-/g, '_')]) ||
              'assets/partners/' + p[0] + '.png',
            alt: r ? '' : p[1],
            dup: r ? 'true' : 'false',
            h: p[0] === 'quantum-metric' ? 'clamp(48px,5vw,64px)' : 'clamp(32px,3.4vw,44px)',
          })),
        ),
        caseFilters: [
          { k: 'Gate', opts: fopt('cg', s.cg, ['All'].concat([...new Set(D.CASES.map((c) => c.gate))])) },
          { k: 'Door', opts: fopt('cd', s.cd, ['All', 'I sell online', 'I get enquiries online']) },
        ],
        caseList,
        caseNone: !caseList.length,
        isScanForm: scanF,
        isBookForm: !scanF,
        formTitle: isContactPg ? 'Reach out to us' : scanF ? 'Get your free AI scan' : 'Tell us what you need',
        doorOpts: [
          ['sell', 'I sell online'],
          ['enq', 'I get enquiries online'],
        ].map((o) => ({
          l: o[1],
          on: s.door === o[0],
          pick: () => this.setState({ door: o[0] }),
          border: s.door === o[0] ? 'var(--acc)' : 'rgba(var(--ink-rgb),.14)',
          bg: s.door === o[0] ? 'rgba(var(--acc-rgb),.14)' : 'rgba(var(--bg-rgb),.5)',
          c: s.door === o[0] ? 'var(--ink)' : 'var(--muted)',
        })),
        textFields: tf.map((x) => ({
          label: x[1],
          type: x[2],
          ph: x[3],
          ac: x[4],
          val: f[x[0]] || '',
          on: (e) => this.setF(x[0], e.target.value),
          bad: !!err[x[0]],
          err: err[x[0]] || '',
          border: err[x[0]] ? '#E77A6A' : 'rgba(var(--ink-rgb),.14)',
        })),
        topicOpts: TOPICS,
        diagOpts: ['Not sure yet'].concat(((window.CXD || {}).AUDITS || []).map((x) => x.name)),
        buildOpts: ['Not sure yet'].concat(((window.CXD || {}).SERVICES || []).map((x) => x.name)),
        ...(() => {
          const o = {};
          const AU = ['Not sure yet'].concat(((window.CXD || {}).AUDITS || []).map((x) => x.name)),
            SV = ['Not sure yet'].concat(((window.CXD || {}).SERVICES || []).map((x) => x.name));
          [
            ['diag', AU],
            ['build', SV],
          ].forEach(([k, L]) => {
            const v = f[k] || 'Not sure yet',
              op = s.dd === k;
            o[k + 'Val'] = v;
            o[k + 'Open'] = op;
            o[k + 'Rot'] = op ? 'rotate(180deg)' : 'none';
            o[k + 'Bd'] = op ? 'rgba(var(--acc-rgb),.6)' : 'rgba(var(--ink-rgb),.14)';
            o[k + 'Toggle'] = () => this.setState({ dd: op ? null : k });
            o[k + 'Items'] = L.map((l) => ({
              l,
              on: l === v,
              bg: l === v ? 'rgba(var(--acc-rgb),.12)' : 'transparent',
              c: l === v ? 'var(--ink)' : 'var(--ink3)',
              pick: () => {
                this.setF(k, l);
                this.setState({ dd: null });
              },
            }));
          });
          return o;
        })(),
        topicVal: s.topic,
        topicOn: (e) => this.setState({ topic: e.target.value }),
        msgVal: f.message || '',
        msgOn: (e) => this.setF('message', e.target.value),
        painVal: f.pain || '',
        painOn: (e) => this.setF('pain', e.target.value),
        submit: (e) => this.submit(e, formKind),
        formOk: s.status === 'ok',
        formShow: s.status !== 'ok',
        formErr: s.status === 'err',
        formBusy: busy,
        busyOp: busy ? 0.75 : 1,
        submitLabel: busy ? 'Sending…' : 'Reach out to us',
        submitIcon: busy ? '◌' : '→',
        spin: busy ? 'cxSpin 1s linear infinite' : 'none',
        okTitle: scanF ? 'Your scan is on its way.' : 'Thanks, we have it.',
        okText: scanF
          ? 'AI agents are checking all nine gates now. An expert adds a short note and you will get your Nine Gate score within about 48 hours.'
          : 'We will reply within one business day to set up a 30-minute call.',
        resetForm: () => this.setState({ status: 'idle', f: {}, err: {} }),
        thanksOn: !!s.thanks,
        closeThanks: () => this.setState({ thanks: false }),
        stopProp: (e) => e.stopPropagation(),
        showSticky: !!sticky && s.w < 760,
        sticky: sticky || {},
        insCats: cats.map((c) => ({
          name: c,
          pick: () => this.setState({ insCat: c, insPage: 1 }),
          ...(s.insCat === c ? ACT : IDLE),
        })),
        ...(() => {
          const all = insights.filter((x) => s.insCat === 'All' || x.cat === s.insCat),
            pages = Math.max(1, Math.ceil(all.length / 10)),
            cur = Math.min(s.insPage || 1, pages),
            go = (n) => {
              this.setState({ insPage: n });
              const el = document.querySelector('section[data-screen-label="Insights"]');
              if (el)
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 120, behavior: 'smooth' });
            };
          return {
            insPager: pages > 1,
            insPages: Array.from({ length: pages }, (_, i) => ({
              n: String(i + 1),
              go: () => go(i + 1),
              bg: i + 1 === cur ? 'var(--acc)' : 'transparent',
              c: i + 1 === cur ? 'var(--on-acc)' : 'var(--ink2)',
              cur: i + 1 === cur ? 'page' : 'false',
            })),
            insPrev: () => go(Math.max(1, cur - 1)),
            insNext: () => go(Math.min(pages, cur + 1)),
            insPrevOp: cur > 1 ? '1' : '.35',
            insNextOp: cur < pages ? '1' : '.35',
            insCount: 'Showing ' + ((cur - 1) * 10 + 1) + '–' + Math.min(cur * 10, all.length) + ' of ' + all.length,
            insPageList: all.slice((cur - 1) * 10, cur * 10),
          };
        })(),
        insList: insights
          .filter((x) => s.insCat === 'All' || x.cat === s.insCat)
          .slice(((s.insPage || 1) - 1) * 10, (s.insPage || 1) * 10)
          .map((x, i) => this.insCard(x, i)),
        __insOld: [].map((x, i) => {
          const P = [
              ['20%', '15%'],
              ['80%', '20%'],
              ['50%', '90%'],
              ['15%', '80%'],
              ['85%', '85%'],
              ['50%', '10%'],
            ][i % 6],
            r1 = 52 + ((i * 7) % 18),
            r2 = 30 + ((i * 5) % 14);
          return {
            cat: x.cat,
            read: x.read,
            t: x.t,
            ex: x.ex,
            href: '#/insights/' + x.slug,
            d: Math.min(i * 50, 400) + 'ms',
            gx: P[0],
            gy: P[1],
            r1: r1 + '%',
            m1: -r1 / 2 + '%',
            r2: r2 + '%',
            m2: -r2 / 2 + '%',
            sp: 18 + (i % 4) * 6 + 's',
            sp2: 12 + (i % 3) * 5 + 's',
            mono: x.cat
              .split(/[\s&/]+/)
              .filter(Boolean)
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
          };
        }),
        post,
        postSecs,
        toc,
        takeaways: [],
        tocOpen: !!s.tocOpen,
        tocRot: s.tocOpen ? 'rotate(180deg)' : 'none',
        tocToggle: () => this.setState((x) => ({ tocOpen: !x.tocOpen })),
        postFaq,
        hasPostFaq: postFaq.length > 0,
        postSols: (post.sols || [svc.slug || 'dcx-transformation']).map((sl, i) => {
          const v = D.SERVICES.find((x) => x.slug === sl) || {};
          return { name: v.name || sl, href: '#/services/' + sl, n: 'Solution ' + p2(i) };
        }),
        postSol: {
          name: svc.name || 'DCX Strategy and Transformation',
          href: '#/services/' + (svc.slug || 'dcx-transformation'),
        },
        related: (() => {
          const same = insights.filter((x) => x.slug !== post.slug && x.cat === post.cat),
            rest = insights.filter((x) => x.slug !== post.slug && x.cat !== post.cat);
          return same.concat(rest).slice(0, 3);
        })().map((x, i) => this.insCard(x, i)),
        copyLabel: s.copied ? 'Link copied' : 'Copy link',
        copyLink: () => {
          try {
            navigator.clipboard.writeText(location.href);
          } catch (x) {}
          this.setState({ copied: true });
          setTimeout(() => this.setState({ copied: false }), 1800);
        },
        toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        showInsLinks: s.route === 'insights' || s.route === 'post',
        insDiag: [L('DCX Audit', '#/services/dcx-transformation/dcx-audit')].concat(
          D.AUDITS.slice(1).map((x) => L(x.name, CXAU(x.slug))),
        ),
        insBuild: D.SERVICES.map((x) => L(x.name, '#/services/' + x.slug)),
        fDiag: [L('DCX Audit', '#/services/dcx-transformation/dcx-audit')].concat(
          D.AUDITS.slice(1).map((x) => L(x.name, CXAU(x.slug))),
        ),
        fBuild: D.SERVICES.map((x) => L(x.name, '#/services/' + x.slug)),
        fRun: [L('Run pods', '#/run-pods'), L('Ways to work', '#/ways-to-work'), L('Nine Gates', '#/nine-gates')],
        fGates: [L('The framework', '#/nine-gates')].concat(megaSol),
        fInd: indMenu.map((i) => L(i.l, i.href)),
        fIns: [L('All insights', '#/insights'), L('Free AI scan', '#/free-ai-scan')],
        fProd: [
          L('NUARK ↗', CONFIG.PRODUCTS_URL + 'nuark', '_blank'),
          L('Query Prism ↗', CONFIG.PRODUCTS_URL + 'query-prism', '_blank'),
        ],
        fCo: [
          L('About CXWorks', '#/about'),
          L('Contact', '#/contact-us'),
          L('LinkedIn ↗', 'https://www.linkedin.com/company/cxworks-official/', '_blank'),
        ],
        fContact: [L('+1 (725) 325 5270', 'tel:+17253255270'), L('info@cxworks.com', 'mailto:info@cxworks.com')].concat(
          CONFIG.SUPPORT.map((e) => L(e, 'mailto:' + e)),
        ),
      };
      this.lastVals = __v;
      return __v;
    }
  }
};

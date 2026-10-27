/**
 * Chart view model. Configs live in content/site/charts.json (one per chart `slug`);
 * `chartView(slug, k)` turns a config into the values the Chart block draws, where `k`
 * is the animation progress from 0 to 1.
 *
 * Chart types: funnel, bars, line, cols, waffle, donut, rings, gauge.
 */
import charts from '@/content/site/charts.json';

interface Base {
  type: 'funnel' | 'bars' | 'line' | 'cols' | 'waffle' | 'donut' | 'rings' | 'gauge';
  eyebrow: string;
  /** Title; its last 2–3 words are highlighted. */
  t: string;
  /** [value, prefix, suffix], e.g. [68, "+", "%"] → "+68%" */
  kpi: [number, string, string];
  kpiDec?: number;
  kpiT: string;
  legend: string[];
  note: string;
  u?: string;
  dec?: number;
  cV?: string;
  cT?: string;
  rows?: [string, number, number][];
  xs?: string[];
  s0?: number[];
  s1?: number[];
  vals?: number[];
  base?: number;
  goal?: number;
  side?: (string | number)[][];
  segs?: [string, string, number][];
  g?: [number, number];
}

export const CHARTS = charts as unknown as Record<string, Base>;

const SEGC = ['var(--acc)', 'var(--acc-soft)', 'var(--acc-deep)', 'var(--muted3)'];
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const fmt = (v: number, d?: number) => (d ? v.toFixed(d) : String(Math.round(v)));

function split(s: string) {
  const w = String(s || '')
    .trim()
    .split(/\s+/);
  if (w.length < 4) return { a: '', b: w.join(' ') };
  const k = w.length > 8 ? 3 : 2;
  return { a: w.slice(0, -k).join(' '), b: w.slice(-k).join(' ') };
}

export interface Arc {
  d: string;
  c: string;
  sw: number;
  cap: 'butt' | 'round';
  da: string;
  off: string;
}
export interface Item {
  c: string;
  label: string;
  sub: string;
  v: string;
  vc: string;
}

export function chartView(slug: string, k: number) {
  const cf = CHARTS[slug] || CHARTS['dcx-transformation'];
  const sp = split(cf.t);
  const T = cf.type;
  const out = {
    eyebrow: cf.eyebrow,
    ta: sp.a,
    tb: sp.b,
    kpiV: cf.kpi[1] + fmt(cf.kpi[0] * k, cf.kpiDec || 0) + cf.kpi[2],
    kpiT: cf.kpiT,
    note: cf.note,
    type: T,
    isRadial: T === 'donut' || T === 'rings' || T === 'gauge',
    legend: cf.legend
      .filter(Boolean)
      .map((t, i) => ({ t, c: i ? 'var(--acc)' : T === 'cols' ? 'rgba(var(--ink-rgb),.35)' : 'var(--muted3)' })),
    cells: [] as { bg: string; s: number }[],
    funnel: [] as { label: string; w0: string; w1: string; v0: string; v1: string }[],
    bars: [] as { label: string; w0: string; w1: string; v0: string; v1: string }[],
    pts: [] as { x: string; y: string; o: number; lo: number; v: string }[],
    xs: [] as string[],
    cols: [] as { label: string; h: string; v: string; o: number; vc: string; bg: string }[],
    arcs: [] as Arc[],
    items: [] as Item[],
    ck: k,
    off: String(1 - k),
    d0: '',
    d1: '',
    area: '',
    baseY: '',
    baseV: '',
    ar: '1 / 1',
    vb: '0 0 100 100',
    cTop: '50%',
    cV: cf.cV || '',
    cT: cf.cT || '',
  };

  if (T === 'waffle') {
    const base = cf.base!,
      goal = cf.goal!;
    out.cells = Array.from({ length: 100 }, (_, i) => {
      const fixed = i >= base && i < goal;
      const on = i < base ? k > i / 300 : fixed ? k > 0.25 + ((i - base) / (goal - base)) * 0.7 : false;
      return {
        bg: i < base ? 'rgba(var(--ink-rgb),.32)' : fixed && on ? 'var(--acc)' : 'rgba(var(--ink-rgb),.06)',
        s: on || !fixed ? 1 : 0.55,
      };
    });
    out.items = cf.side!.map((r, i) => ({
      c: i ? 'var(--acc-soft)' : 'var(--acc)',
      label: String(r[0]),
      sub: 'was ' + r[1] + '%',
      v: Math.round(+r[1] + (+r[2] - +r[1]) * k) + '%',
      vc: 'var(--ink)',
    }));
    out.legend = [
      { t: cf.legend[0], c: 'rgba(var(--ink-rgb),.32)' },
      { t: cf.legend[1], c: 'var(--acc)' },
      { t: cf.legend[2], c: 'rgba(var(--ink-rgb),.1)' },
    ];
  } else if (T === 'funnel') {
    out.funnel = cf.rows!.map((r, i) => {
      const rk = clamp01(k * 1.5 - i * 0.15);
      return {
        label: r[0],
        w0: 30 + r[1] * 0.7 + '%',
        w1: (30 + r[2] * 0.7) * rk + '%',
        v0: r[1] + '%',
        v1: Math.round(r[2] * rk) + '%',
      };
    });
  } else if (T === 'bars') {
    const mx = Math.max(...cf.rows!.map((r) => Math.max(r[1], r[2])));
    out.bars = cf.rows!.map((r, i) => {
      const rk = clamp01(k * 1.5 - i * 0.15);
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
    const s0 = cf.s0!,
      s1 = cf.s1!;
    const all = s0.concat(s1);
    const mn = Math.min(...all),
      mx = Math.max(...all),
      n = s1.length;
    const X = (i: number) => 3 + i * (94 / (n - 1));
    const Y = (v: number) => 92 - ((v - mn) / (mx - mn || 1)) * 80;
    const path = (a: number[]) => a.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(2) + ' ' + Y(v).toFixed(2)).join(' ');
    out.d0 = path(s0);
    out.d1 = path(s1);
    out.area = out.d1 + ' L' + X(n - 1) + ' 100 L' + X(0) + ' 100 Z';
    out.xs = cf.xs!;
    out.pts = s1.map((v, i) => {
      const o = k >= i / (n - 1) ? 1 : 0;
      return { x: X(i) + '%', y: Y(v) + '%', o, lo: i === n - 1 ? o : 0, v: fmt(v, cf.dec || 0) + cf.u };
    });
  } else if (T === 'cols') {
    const vals = cf.vals!;
    const mx = Math.max(...vals) * 1.1,
      n = vals.length;
    out.baseY = (cf.base! / mx) * 82 + 8 + '%';
    out.baseV = fmt(cf.base!, cf.dec) + cf.u;
    out.cols = vals.map((v, i) => {
      const rk = clamp01(k * 1.6 - i * 0.1);
      const last = i === n - 1;
      return {
        label: /^C\d$/.test(cf.xs![i]) ? 'Cycle ' + cf.xs![i].slice(1) : cf.xs![i],
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
    out.arcs = [{ d: C, c: 'rgba(var(--ink-rgb),.06)', sw: 14, cap: 'butt' as const, da: '100 0', off: '0' }].concat(
      cf.segs!.map((sg, i) => {
        const len = Math.max(0, sg[2] * k - 1);
        const a = { d: C, c: SEGC[i], sw: 14, cap: 'butt' as const, da: len + ' ' + (100 - len), off: String(-st * k) };
        st += sg[2];
        return a;
      }),
    );
    out.items = cf.segs!.map((sg, i) => ({
      c: SEGC[i],
      label: sg[0],
      sub: sg[1],
      v: Math.round(sg[2] * k) + '%',
      vc: 'var(--ink)',
    }));
  } else if (T === 'rings') {
    const rs = [44, 34, 24, 14];
    cf.rows!.forEach((r, i) => {
      const d = 'M50 ' + (50 - rs[i]) + ' A' + rs[i] + ' ' + rs[i] + ' 0 1 1 49.99 ' + (50 - rs[i]);
      out.arcs.push({ d, c: 'rgba(var(--ink-rgb),.06)', sw: 7, cap: 'round', da: '100 0', off: '0' });
      const rk = clamp01(k * 1.4 - i * 0.1);
      out.arcs.push({ d, c: SEGC[i], sw: 7, cap: 'round', da: r[2] * rk + ' 100', off: '0' });
    });
    out.cV = '';
    out.cT = '';
    out.items = cf.rows!.map((r, i) => ({
      c: SEGC[i],
      label: r[0],
      sub: 'up from ' + r[1] + '%',
      v: Math.round(r[2] * Math.min(1, k)) + '%',
      vc: 'var(--ink)',
    }));
  } else if (T === 'gauge') {
    const d = 'M10 55 A40 40 0 0 1 90 55';
    const g = cf.g!;
    out.ar = '100 / 62';
    out.vb = '0 0 100 62';
    out.cTop = '72%';
    out.arcs = [
      { d, c: 'rgba(var(--ink-rgb),.06)', sw: 10, cap: 'round', da: '100 0', off: '0' },
      { d, c: 'rgba(var(--ink-rgb),.28)', sw: 10, cap: 'round', da: g[0] + ' 100', off: '0' },
      { d, c: 'var(--acc)', sw: 10, cap: 'round', da: g[1] * k + ' 100', off: '0' },
    ];
    out.cV = String(Math.round(g[1] * k));
    out.cT = cf.cT + ' · was ' + g[0];
    out.items = cf.side!.map((r, i) => ({
      c: i % 2 ? 'var(--acc-soft)' : 'var(--acc)',
      label: String(r[0]),
      sub: 'was ' + fmt(+r[1], +r[4]) + r[3],
      v: fmt(+r[1] + (+r[2] - +r[1]) * k, +r[4]) + r[3],
      vc: 'var(--acc)',
    }));
  }
  return out;
}

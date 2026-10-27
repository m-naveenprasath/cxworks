'use client';

import { chartView } from '@/lib/charts';
import { useRevealProgress } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface ChartBlock {
  /** Key into content/site/charts.json */
  slug: string;
}

const mono = "'Montserrat',sans-serif";

/** Animated results chart; draws in when scrolled into view. */
export function Chart({ b }: BlockProps<ChartBlock>) {
  const [ref, k] = useRevealProgress<HTMLDivElement>(1800);
  const ch = chartView(b.slug, k);
  return (
    <section
      data-screen-label={b.label}
      style={{ padding: 'clamp(72px,10vw,140px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <p
        data-reveal=""
        style={{
          margin: '0 0 28px',
          fontFamily: mono,
          fontSize: '12px',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {ch.eyebrow}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: '24px 64px',
          alignItems: 'end',
        }}
      >
        <h2
          data-reveal=""
          style={{
            margin: '0',
            fontFamily: mono,
            fontWeight: '500',
            fontSize: 'clamp(34px,5vw,76px)',
            letterSpacing: '-0.045em',
            lineHeight: '1.03',
            maxWidth: '18ch',
            textWrap: 'balance',
          }}
        >
          {ch.ta} <span style={{ color: 'var(--acc)', fontWeight: '400', fontStyle: 'italic' }}>{ch.tb}</span>
        </h2>
        <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span
            style={{
              fontFamily: mono,
              fontWeight: '500',
              fontSize: 'clamp(56px,6vw,96px)',
              letterSpacing: '-0.05em',
              lineHeight: '1',
              color: 'var(--acc)',
            }}
          >
            {ch.kpiV}
          </span>
          <span style={{ fontSize: '16px', color: 'var(--ink3)' }}>{ch.kpiT}</span>
        </div>
      </div>
      <div
        ref={ref}
        data-reveal=""
        data-chart=""
        style={{
          marginTop: 'clamp(36px,5vw,56px)',
          padding: 'clamp(22px,3vw,40px)',
          borderRadius: '28px',
          background:
            'linear-gradient(140deg, rgba(var(--glass),.10), rgba(var(--glass),.025) 45%, rgba(var(--glass),.05))',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          border: '1px solid rgba(var(--glass),.14)',
          boxShadow:
            'inset 0 1px 0 rgba(var(--glass),.28), inset 0 -1px 0 rgba(var(--glass),.05), inset 0 0 24px rgba(var(--glass),.03), 0 24px 60px -28px rgba(var(--shade),.85)',
          display: 'flex',
          flexDirection: 'column',
          gap: '26px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '12px 24px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
            {ch.legend.map((lg) => (
              <span
                key={lg.t}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--ink2)' }}
              >
                <span style={{ width: '22px', height: '4px', borderRadius: '4px', background: lg.c }} />
                {lg.t}
              </span>
            ))}
          </div>
          <span style={{ ...ui.kicker, fontSize: '12px' }}>Illustrative · typical engagement</span>
        </div>

        {ch.type === 'funnel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {ch.funnel.map((fn) => (
              <div
                key={fn.label}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr)',
                  gap: '6px',
                  justifyItems: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '58px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      bottom: '0',
                      width: fn.w0,
                      borderRadius: '16px',
                      border: '1px dashed rgba(var(--ink-rgb),.22)',
                      transition: 'width .2s',
                    }}
                  />
                  <div
                    className="hv-5ade74a"
                    style={{
                      position: 'relative',
                      height: '100%',
                      width: fn.w1,
                      borderRadius: '16px',
                      background:
                        'linear-gradient(90deg, rgba(var(--acc-rgb),.55), var(--acc) 50%, rgba(var(--acc-rgb),.55))',
                      boxShadow: 'inset 0 1px 0 rgba(var(--glass),.35), 0 10px 30px -12px rgba(var(--acc-rgb),.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      color: 'var(--on-acc)',
                      fontSize: '14px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      transition: 'filter .3s',
                    }}
                  >
                    {fn.v1}
                    <span style={{ fontWeight: '400', opacity: '.7' }}>
                      {'vs '}
                      {fn.v0}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--ink3)' }}>{fn.label}</span>
              </div>
            ))}
          </div>
        )}

        {ch.type === 'bars' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ch.bars.map((br) => (
              <div
                key={br.label}
                className="hv-f7ff006"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '8px 28px',
                  alignItems: 'center',
                  padding: '6px 10px',
                  margin: '0 -10px',
                  borderRadius: '14px',
                  transition: 'background .3s',
                }}
              >
                <span style={{ fontSize: '15.5px', color: 'var(--ink)' }}>{br.label}</span>
                <div
                  style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '7px', minWidth: '0' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        flex: '1',
                        height: '10px',
                        borderRadius: '10px',
                        background: 'rgba(var(--ink-rgb),.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{ height: '100%', width: br.w0, borderRadius: '10px', background: 'var(--muted3)' }}
                      />
                    </div>
                    <span
                      style={{
                        width: '62px',
                        textAlign: 'right',
                        fontFamily: mono,
                        fontSize: '13px',
                        color: 'var(--muted)',
                      }}
                    >
                      {br.v0}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        flex: '1',
                        height: '10px',
                        borderRadius: '10px',
                        background: 'rgba(var(--ink-rgb),.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: br.w1,
                          borderRadius: '10px',
                          background: 'linear-gradient(90deg, var(--acc-deep), var(--acc))',
                        }}
                      />
                    </div>
                    <span
                      style={{
                        width: '62px',
                        textAlign: 'right',
                        fontFamily: mono,
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--acc)',
                      }}
                    >
                      {br.v1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {ch.type === 'line' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', height: 'clamp(220px,28vw,320px)' }}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ borderTop: '1px dashed rgba(var(--ink-rgb),.08)', height: '0' }} />
                ))}
              </div>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', overflow: 'visible' }}
                aria-hidden="true"
              >
                <path d={ch.area} style={{ fill: 'rgba(var(--acc-rgb),.1)', opacity: ch.ck }} />
                <path
                  d={ch.d0}
                  fill="none"
                  style={{ stroke: 'var(--muted3)' }}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={ch.off}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={ch.d1}
                  fill="none"
                  style={{ stroke: 'var(--acc)' }}
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={ch.off}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {ch.pts.map((pt, i) => (
                <span
                  key={i}
                  className="hv-65bf45b"
                  style={{
                    position: 'absolute',
                    left: pt.x,
                    top: pt.y,
                    width: '28px',
                    height: '28px',
                    margin: '-14px 0 0 -14px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    opacity: pt.o,
                    cursor: 'default',
                    transition: 'opacity .3s',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'var(--bg)',
                      border: '2px solid var(--acc)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'var(--acc)',
                      color: 'var(--on-acc)',
                      fontSize: '12px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      opacity: pt.lo,
                    }}
                  >
                    {pt.v}
                  </span>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {ch.xs.map((x) => (
                <span key={x} style={{ fontFamily: mono, fontSize: '11.5px', color: 'var(--muted2)' }}>
                  {x}
                </span>
              ))}
            </div>
          </div>
        )}

        {ch.type === 'cols' && (
          <div
            style={{
              position: 'relative',
              height: 'clamp(260px,28vw,330px)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 'clamp(6px,2vw,24px)',
              paddingTop: '44px',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '0',
                right: '0',
                bottom: ch.baseY,
                borderTop: '1px dashed rgba(var(--ink-rgb),.35)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '-34px',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'var(--surface)',
                  border: '1px solid rgba(var(--ink-rgb),.2)',
                  fontFamily: mono,
                  fontSize: '12.5px',
                  fontWeight: '500',
                  color: 'var(--ink2)',
                  whiteSpace: 'nowrap',
                }}
              >
                {'Baseline '}
                {ch.baseV}
              </span>
            </div>
            {ch.cols.map((cl) => (
              <div
                key={cl.label}
                style={{
                  flex: '1',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '10px',
                  minWidth: '0',
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 'clamp(12.5px,1.3vw,15px)',
                    fontWeight: '600',
                    color: cl.vc,
                    opacity: cl.o,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cl.v}
                </span>
                <div
                  className="hv-b608ae2"
                  style={{
                    width: '100%',
                    maxWidth: '72px',
                    height: cl.h,
                    borderRadius: '14px 14px 6px 6px',
                    background: cl.bg,
                    boxShadow: 'inset 0 1px 0 rgba(var(--glass),.3)',
                    transition: 'filter .3s, transform .3s',
                  }}
                />
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 'clamp(12px,1.1vw,13.5px)',
                    fontWeight: '500',
                    lineHeight: '1.2',
                    color: 'var(--ink3)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                  }}
                >
                  {cl.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {ch.type === 'waffle' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
              gap: 'clamp(24px,3vw,40px)',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(10,1fr)',
                gap: 'clamp(4px,.6vw,7px)',
                maxWidth: '360px',
                width: '100%',
                margin: '0 auto',
              }}
            >
              {ch.cells.map((cl, i) => (
                <span
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '4px',
                    background: cl.bg,
                    transform: `scale(${cl.s})`,
                    transition: 'transform .5s cubic-bezier(.16,1,.3,1), background .5s',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {ch.items.map((it) => (
                <div
                  key={it.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(var(--ink-rgb),.08)',
                  }}
                >
                  <span
                    style={{ width: '12px', height: '12px', borderRadius: '3px', flex: 'none', background: it.c }}
                  />
                  <span style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontFamily: mono, fontSize: '15px', fontWeight: '500', color: 'var(--ink)' }}>
                      {it.label}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{it.sub}</span>
                  </span>
                  <span style={{ fontFamily: mono, fontSize: '20px', fontWeight: '600', color: it.vc }}>{it.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {ch.isRadial && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '28px clamp(28px,5vw,64px)',
              alignItems: 'center',
            }}
          >
            <div
              style={{ position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: ch.ar, margin: '0 auto' }}
            >
              <svg viewBox={ch.vb} style={{ width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
                {ch.arcs.map((ar, i) => (
                  <path
                    key={i}
                    d={ar.d}
                    fill="none"
                    style={{ stroke: ar.c }}
                    strokeWidth={ar.sw}
                    strokeLinecap={ar.cap}
                    pathLength={100}
                    strokeDasharray={ar.da}
                    strokeDashoffset={ar.off}
                  />
                ))}
              </svg>
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  top: ch.cTop,
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontWeight: '500',
                    fontSize: 'clamp(34px,4vw,52px)',
                    letterSpacing: '-0.05em',
                    lineHeight: '1',
                    color: 'var(--ink)',
                  }}
                >
                  {ch.cV}
                </span>
                <span style={ui.kicker}>{ch.cT}</span>
              </div>
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: '0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid rgba(var(--ink-rgb),.12)',
              }}
            >
              {ch.items.map((it) => (
                <li
                  key={it.label}
                  className="hv-8c2777f"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '14px minmax(0,1fr) auto',
                    gap: '14px',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(var(--ink-rgb),.12)',
                    transition: 'padding .45s cubic-bezier(.16,1,.3,1)',
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: it.c }} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '15.5px', color: 'var(--ink)' }}>{it.label}</span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{it.sub}</span>
                  </span>
                  <span
                    style={{
                      fontFamily: mono,
                      fontWeight: '600',
                      fontSize: 'clamp(20px,2vw,26px)',
                      letterSpacing: '-0.03em',
                      color: it.vc,
                    }}
                  >
                    {it.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ margin: '0', fontSize: '15px', lineHeight: '1.55', color: 'var(--muted)' }}>{ch.note}</p>
      </div>
    </section>
  );
}

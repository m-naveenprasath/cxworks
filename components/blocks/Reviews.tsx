'use client';

import { useEffect, useState } from 'react';
import { REVIEWS } from '@/lib/data';
import { A } from '@/components/ui/A';
import { useInterval } from '@/components/ui/hooks';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

const perPage = (w: number) => (w >= 1100 ? 3 : w >= 720 ? 2 : 1);
const arrowBtn = {
  width: '46px',
  height: '46px',
  borderRadius: '50%',
  border: '0',
  background: 'var(--acc)',
  color: 'var(--bg)',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  transition: 'transform .25s, filter .25s',
} as const;

/** Testimonial carousel (content/site/reviews.json). Auto-advances every 4.5s; pauses on hover. */
export function Reviews({ b }: BlockProps<object>) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [per, setPer] = useState(3);

  useEffect(() => {
    const onResize = () => setPer(perPage(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useInterval(() => setI((x) => x + 1), 4500, hold);

  const max = REVIEWS.length - per + 1;
  const idx = ((i % max) + max) % max;
  const tx = 'translateX(calc(' + -idx + ' * (100% + 16px)))';
  const basis = 'calc((100% - ' + (per - 1) * 16 + 'px) / ' + per + ')';

  return (
    <section
      data-reviews=""
      data-screen-label={b.label}
      style={{ padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0', maxWidth: '1440px', margin: '0 auto' }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px 32px',
          marginBottom: 'clamp(28px,3.4vw,44px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={ui.eyebrow}>In their words</p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontSize: 'clamp(30px,4vw,54px)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
              textWrap: 'balance',
            }}
          >
            {'What clients say about '}
            <span style={{ color: 'var(--acc)', fontStyle: 'italic', fontWeight: '400' }}>working with us.</span>
          </h2>
        </div>
      </div>
      <div onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="hv-7f8fefb"
              style={{
                margin: '0',
                flex: `0 0 ${basis}`,
                minWidth: '0',
                boxSizing: 'border-box',
                transform: tx,
                transition: 'transform .8s cubic-bezier(.16,1,.3,1), border-color .35s',
                borderRadius: '22px',
                border: '1px solid rgba(var(--ink-rgb),.12)',
                background:
                  'linear-gradient(140deg, rgba(var(--glass),.07), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
                boxShadow: 'inset 0 1px 0 rgba(var(--glass),.12)',
                padding: 'clamp(24px,2.6vw,36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
              }}
            >
              <span style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start', gap: '18px' }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: '52px',
                    lineHeight: '.6',
                    color: 'var(--acc)',
                    height: '26px',
                  }}
                >
                  “
                </span>
                <A
                  className="hv-6189f2d"
                  href={r.href}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'rgba(var(--acc-rgb),.12)',
                    border: '1px solid rgba(var(--acc-rgb),.3)',
                    color: 'var(--acc)',
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '12px',
                    letterSpacing: '.04em',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'background .25s',
                  }}
                >
                  {r.solution}
                </A>
              </span>
              <blockquote
                style={{
                  margin: '0',
                  flex: '1',
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(17px,1.35vw,20px)',
                  letterSpacing: '-0.015em',
                  lineHeight: '1.45',
                  color: 'var(--ink)',
                  textWrap: 'pretty',
                }}
              >
                {r.quote}
              </blockquote>
              <figcaption
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '18px',
                  borderTop: '1px solid rgba(var(--ink-rgb),.1)',
                }}
              >
                <span
                  role="img"
                  aria-label={r.country}
                  title={r.country}
                  style={{
                    flex: 'none',
                    width: '40px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundImage: `url(https://flagcdn.com/w80/${r.countryCode}.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 0 0 1px rgba(var(--ink-rgb),.15)',
                  }}
                />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: '600',
                      fontSize: '15px',
                      color: 'var(--ink)',
                    }}
                  >
                    {r.name}
                  </span>
                  <span style={{ fontSize: '13.5px', lineHeight: '1.4', color: 'var(--muted)' }}>
                    {r.role}
                    {', '}
                    {r.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '18px' }}>
        <button
          className="hv-fb6026e"
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setI((x) => x - 1)}
          style={arrowBtn}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          {Array.from({ length: max }, (_, d) => (
            <button
              key={d}
              type="button"
              aria-label={`Go to testimonial ${d + 1}`}
              aria-current={d === idx}
              onClick={() => setI(d)}
              style={{
                width: d === idx ? '22px' : '8px',
                height: '8px',
                padding: '0',
                border: '0',
                borderRadius: '999px',
                background: d === idx ? 'var(--acc)' : 'rgba(var(--ink-rgb),.25)',
                cursor: 'pointer',
                transition: 'width .4s, background .4s',
              }}
            />
          ))}
        </div>
        <button
          className="hv-fb6026e"
          type="button"
          aria-label="Next testimonial"
          onClick={() => setI((x) => x + 1)}
          style={arrowBtn}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

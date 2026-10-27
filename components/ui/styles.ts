/**
 * Shared inline-style tokens. Components spread these and add their own overrides:
 *   <h2 style={{ ...ui.h2, maxWidth: "30ch" }}>
 * Colours come from the CSS variables in styles/globals.css.
 */
import type { CSSProperties } from 'react';

export const ui = {
  section: {
    padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) 0',
    maxWidth: '1440px',
    margin: '0 auto',
    position: 'relative',
  },
  eyebrow: {
    margin: '0',
    fontFamily: "'Montserrat',sans-serif",
    fontSize: '12px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--acc)',
  },
  kicker: {
    fontFamily: "'Montserrat',sans-serif",
    fontSize: '12px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
  },
  h2: {
    margin: '0',
    fontFamily: "'Montserrat',sans-serif",
    fontWeight: '500',
    fontSize: 'clamp(32px,4.4vw,60px)',
    letterSpacing: '-0.04em',
    lineHeight: '1.05',
    maxWidth: '22ch',
    textWrap: 'balance',
  },
  h3: {
    margin: '0',
    fontFamily: "'Montserrat',sans-serif",
    fontWeight: '500',
    fontSize: 'clamp(19px,1.6vw,23px)',
    letterSpacing: '-0.02em',
    lineHeight: '1.25',
  },
  lead: {
    margin: '0',
    fontSize: 'clamp(16px,1.3vw,18px)',
    lineHeight: '1.6',
    color: 'var(--ink3)',
    maxWidth: '62ch',
    textWrap: 'pretty',
  },
  body: {
    margin: '0',
    fontSize: '15.5px',
    lineHeight: '1.55',
    color: 'var(--muted)',
    textWrap: 'pretty',
  },
  head: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: 'clamp(28px,3.4vw,48px)',
  },
  glass: {
    background: 'linear-gradient(140deg, rgba(var(--glass),.075), rgba(var(--glass),.02) 50%, rgba(var(--glass),.04))',
    backdropFilter: 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
    border: '1px solid rgba(var(--glass),.12)',
    boxShadow: 'inset 0 1px 0 rgba(var(--glass),.16)',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    minHeight: '52px',
    padding: '0 26px',
    borderRadius: '999px',
    background: 'var(--acc)',
    color: 'var(--on-acc)',
    fontFamily: "'Montserrat',sans-serif",
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '1.2',
    textAlign: 'center',
    border: '0',
    cursor: 'pointer',
    transition: 'background .3s, transform .3s',
  },
  dot: {
    width: 'clamp(10px,1.2vw,16px)',
    height: 'clamp(10px,1.2vw,16px)',
    borderRadius: '50%',
    background: 'var(--acc)',
    flex: 'none',
  },
  stack8: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
} satisfies Record<string, CSSProperties>;

/** Four-point star used as a bullet throughout the site. */
export function Sparkle({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
      <path d="M12 2.5c.7 4.6 3.4 7.3 8 8-4.6.7-7.3 3.4-8 8-.7-4.6-3.4-7.3-8-8 4.6-.7 7.3-3.4 8-8z" />
    </svg>
  );
}

/** List bullet wrapper (sparkle aligned to the first line of text). */
export function Bullet() {
  return (
    <span aria-hidden="true" style={{ color: 'var(--acc)', flex: 'none', display: 'inline-flex', paddingTop: '.25em' }}>
      <Sparkle />
    </span>
  );
}

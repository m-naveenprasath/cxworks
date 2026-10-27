import { ui } from '@/components/ui/styles';

const WORDS = [
  { t: 'Cited.', outline: false },
  { t: 'Clicked.', outline: true },
  { t: 'Chosen.', outline: false },
];
// Four copies so the strip is wider than any screen; the animation scrolls by half.
const STRIP = [0, 1, 2, 3].flatMap((r) => WORDS.map((w) => ({ ...w, k: r + w.t })));

export function Marquee() {
  return (
    <section
      data-screen-label="Cited Clicked Chosen"
      aria-label="Cited. Clicked. Chosen."
      style={{
        marginTop: 'clamp(72px,9vw,128px)',
        overflow: 'hidden',
        padding: 'clamp(28px,4vw,48px) 0',
        borderTop: '1px solid rgba(var(--ink-rgb),.1)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <div
        aria-hidden="true"
        style={{ display: 'flex', width: 'max-content', animation: 'cxMarq 28s linear infinite' }}
      >
        {STRIP.map((w) => (
          <span
            key={w.k}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(28px,4vw,56px)',
              paddingRight: 'clamp(28px,4vw,56px)',
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: '500',
              fontStyle: 'italic',
              fontSize: 'clamp(40px,7vw,104px)',
              lineHeight: '1',
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
              color: w.outline ? 'transparent' : 'var(--acc)',
              WebkitTextStroke: w.outline ? '1px rgba(var(--acc-rgb),.7)' : '0',
            }}
          >
            {w.t}
            <span aria-hidden="true" style={ui.dot} />
          </span>
        ))}
      </div>
    </section>
  );
}

import { PARTNERS } from '@/lib/data';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface LogosBlock {
  eb?: string;
}

/** Scrolling strip of partner logos (public/partners/<slug>.png). */
export function Logos({ b }: BlockProps<LogosBlock>) {
  // Two copies for a seamless loop; the second copy is hidden from assistive tech.
  const loop = [0, 1].flatMap((copy) => PARTNERS.map((p) => ({ ...p, copy })));
  return (
    <section data-screen-label={b.label} style={{ ...ui.section, paddingTop: 'clamp(48px,6vw,80px)' }}>
      <p style={{ ...ui.eyebrow, color: 'var(--muted)', marginBottom: '20px' }}>{b.eb}</p>
      <div
        className="hv-df6606e"
        style={{
          overflow: 'hidden',
          padding: 'clamp(28px,3vw,40px) 0',
          borderTop: '1px solid rgba(var(--ink-rgb),.1)',
          borderBottom: '1px solid rgba(var(--ink-rgb),.1)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div style={{ display: 'flex', width: 'max-content', animation: 'cxMarq 32s linear infinite' }}>
          {loop.map((p) => (
            <img
              key={p.copy + p.slug}
              className="hv-cd53f70"
              src={`/partners/${p.slug}.png`}
              alt={p.copy ? '' : p.name}
              aria-hidden={p.copy ? 'true' : 'false'}
              loading="lazy"
              decoding="async"
              style={{
                height: p.slug === 'quantum-metric' ? 'clamp(48px,5vw,64px)' : 'clamp(32px,3.4vw,44px)',
                width: 'auto',
                flex: 'none',
                marginRight: 'clamp(48px,6vw,88px)',
                filter: 'var(--plogo)',
                opacity: '.8',
                transition: 'opacity .3s, filter .3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

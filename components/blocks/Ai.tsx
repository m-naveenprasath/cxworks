import { SectionHead } from '@/components/ui/SectionHead';
import { Bullet } from '@/components/ui/Sparkle';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface AiBlock {
  eb?: string;
  h?: string;
  p?: string;
  watch: string[];
  decide: string[];
}

const card = {
  background: 'rgba(var(--acc-rgb),.10)',
  border: '1px solid rgba(var(--acc-rgb),.55)',
  borderRadius: '22px',
  padding: 'clamp(22px,2.6vw,32px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  transition: 'transform .45s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .45s, background .35s',
} as const;
const row = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  padding: '12px 10px 0',
  margin: '0 -10px',
  borderRadius: '10px',
  borderTop: '1px solid rgba(var(--acc-rgb),.22)',
  fontSize: '15.5px',
  color: 'var(--ink)',
  transition: 'transform .35s cubic-bezier(.16,1,.3,1), color .3s',
} as const;
const title = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: '600',
  fontSize: '18px',
} as const;
const pulse = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'var(--acc)',
  animation: 'cxPulse 1.6s ease-in-out infinite',
} as const;

/** "What AI agents watch" vs "What experts decide". */
export function Ai({ b }: BlockProps<AiBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}
      >
        <div className="hv-13b5983" data-reveal="" style={card}>
          <span style={title}>
            <span aria-hidden="true" style={pulse} />
            What AI agents watch
          </span>
          {b.watch.map((w) => (
            <div key={w} className="hv-ebdf00e" style={row}>
              <span aria-hidden="true" style={{ color: 'var(--acc)' }}>
                ◉
              </span>
              {w}
            </div>
          ))}
        </div>
        <div className="hv-13b5983" data-reveal="" style={card}>
          <span style={title}>
            <span aria-hidden="true" style={pulse} />
            What experts decide
          </span>
          {b.decide.map((w) => (
            <div key={w} className="hv-ebdf00e" style={row}>
              <Bullet />
              {w}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ctaLink } from '@/lib/links';
import type { Cta } from '@/lib/types';
import { A } from '@/components/ui/A';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface UpgradeBlock {
  h: string;
  p?: string;
  btn?: Cta;
}

/** Highlighted upsell strip with one button. */
export function Upgrade({ b }: BlockProps<UpgradeBlock>) {
  const btn = ctaLink(b.btn);
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <div
        data-reveal=""
        style={{
          background: 'rgba(var(--acc-rgb),.10)',
          border: '1px solid rgba(var(--acc-rgb),.55)',
          borderRadius: '22px',
          padding: 'clamp(22px,3vw,36px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...ui.stack8, flex: '1 1 360px' }}>
          <span style={ui.h3}>{b.h}</span>
          <span style={{ ...ui.body, color: 'var(--ink3)' }}>{b.p}</span>
        </div>
        {btn && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <A className="hv-7760e51" href={btn.href} data-magnet="" style={ui.btnPrimary}>
              {btn.l} <span aria-hidden="true">→</span>
            </A>
          </div>
        )}
      </div>
    </section>
  );
}

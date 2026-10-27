import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface AianswerBlock {
  eb?: string;
  h?: string;
  p?: string;
}

const source = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '34px',
  padding: '0 14px',
  borderRadius: '999px',
  border: '1px solid rgba(var(--ink-rgb),.16)',
  fontSize: '13.5px',
  borderColor: 'rgba(var(--acc-rgb),.5)',
  color: 'var(--ink)',
} as const;

/** Mock AI-assistant answer that cites the brand. */
export function Aianswer({ b }: BlockProps<AianswerBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div
        data-reveal=""
        role="img"
        aria-label="Sample AI answer recommending and citing a brand"
        style={{
          ...ui.glass,
          borderRadius: '22px',
          padding: 'clamp(20px,3vw,32px)',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            alignSelf: 'flex-end',
            maxWidth: '80%',
            padding: '12px 16px',
            borderRadius: '16px 16px 4px 16px',
            background: 'rgba(var(--ink-rgb),.08)',
            fontSize: '15.5px',
          }}
        >
          Where can I buy M8 stainless hex bolts in bulk with next-day delivery?
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15.5px', lineHeight: '1.6' }}>
          <span>
            <strong style={{ color: 'var(--acc)' }}>Your Brand</strong>
            {' stocks M8 A2 stainless hex bolts in boxes of 100 and 500, with next-day delivery on orders before 4pm '}
            <span style={{ color: 'var(--acc)' }}>[1]</span>
            {'. Trade accounts get tiered pricing '}
            <span style={{ color: 'var(--acc)' }}>[2]</span>.
          </span>
          <span style={{ color: 'var(--muted)' }}>Other options include Competitor A and Competitor B.</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(var(--ink-rgb),.1)',
          }}
        >
          <span style={source}>[1] yourbrand.com/m8-hex-bolts</span>
          <span style={source}>[2] yourbrand.com/trade</span>
        </div>
        <span style={{ fontSize: '12.5px', color: 'var(--muted2)' }}>Illustrative example</span>
      </div>
    </section>
  );
}

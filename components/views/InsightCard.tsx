import { postPath } from '@/lib/paths';
import type { Post } from '@/lib/types';
import { A } from '@/components/ui/A';

const chip = {
  display: 'inline-flex',
  alignItems: 'center',
  height: '26px',
  padding: '0 10px',
  borderRadius: '999px',
  fontFamily: "'Montserrat',sans-serif",
  fontSize: '11.5px',
  letterSpacing: '.04em',
  whiteSpace: 'nowrap',
} as const;

const POS = [
  ['20%', '15%'],
  ['80%', '20%'],
  ['50%', '90%'],
  ['15%', '80%'],
  ['85%', '85%'],
  ['50%', '10%'],
];

/** Article card with a generated thumbnail (orbits + category monogram); `i` varies the artwork. */
export function InsightCard({
  post: x,
  i,
}: {
  post: Pick<Post, 'slug' | 'cat' | 't' | 'ex' | 'date' | 'read'>;
  i: number;
}) {
  const [gx, gy] = POS[i % 6];
  const r1 = 52 + ((i * 7) % 18);
  const r2 = 30 + ((i * 5) % 14);
  const mono = x.cat
    .split(/[\s&/]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <A
      className="hv-f43028e"
      href={postPath(x.slug)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(var(--ink-rgb),.12)',
        background: 'rgba(var(--ink-rgb),.03)',
        color: 'var(--ink)',
        animation: `cxFade .5s ${Math.min(i * 50, 400)}ms cubic-bezier(.16,1,.3,1) both`,
        transition: 'transform .5s cubic-bezier(.16,1,.3,1), border-color .4s',
      }}
    >
      <span
        aria-hidden="true"
        data-mthumb=""
        style={{
          position: 'relative',
          display: 'block',
          aspectRatio: '1/1',
          overflow: 'hidden',
          background: `radial-gradient(120% 90% at ${gx} ${gy}, rgba(var(--acc-rgb),.32), rgba(var(--acc-rgb),.06) 45%, var(--surface) 75%)`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: r1 + '%',
            height: r1 + '%',
            marginLeft: -r1 / 2 + '%',
            marginTop: -r1 / 2 + '%',
            borderRadius: '50%',
            border: '1px dashed rgba(var(--acc-rgb),.45)',
            animation: `cxSpin ${18 + (i % 4) * 6}s linear infinite`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              left: '50%',
              width: '10px',
              height: '10px',
              marginLeft: '-5px',
              borderRadius: '50%',
              background: 'var(--acc)',
              boxShadow: 'none',
            }}
          />
        </span>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: r2 + '%',
            height: r2 + '%',
            marginLeft: -r2 / 2 + '%',
            marginTop: -r2 / 2 + '%',
            borderRadius: '50%',
            border: '1px solid rgba(var(--ink-rgb),.16)',
            animation: `cxSpin ${12 + (i % 3) * 5}s linear infinite reverse`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              width: '8px',
              height: '8px',
              marginLeft: '-4px',
              borderRadius: '50%',
              background: 'var(--ink)',
            }}
          />
        </span>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '64px',
            height: '64px',
            margin: '-32px 0 0 -32px',
            borderRadius: '18px',
            background: 'rgba(var(--bg-rgb),.55)',
            border: '1px solid rgba(var(--acc-rgb),.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'grid',
            placeItems: 'center',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '20px',
            color: 'var(--acc)',
            animation: 'cxBob 5s ease-in-out infinite',
          }}
        >
          {mono}
        </span>
        <span
          style={{
            position: 'absolute',
            left: '16px',
            top: '16px',
            padding: '6px 12px',
            whiteSpace: 'nowrap',
            borderRadius: '999px',
            background: 'rgba(var(--bg-rgb),.6)',
            border: '1px solid rgba(var(--ink-rgb),.14)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '12px',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--acc)',
          }}
        >
          {x.cat}
        </span>
      </span>
      <span
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 'clamp(18px,2vw,24px)', flex: '1' }}
      >
        <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
          <span
            style={{ ...chip, background: 'rgba(var(--acc-rgb),.14)', color: 'var(--acc)', textTransform: 'uppercase' }}
          >
            {x.cat}
          </span>
          <span style={{ ...chip, border: '1px solid rgba(var(--ink-rgb),.14)', color: 'var(--ink3)' }}>{x.date}</span>
          <span style={{ ...chip, border: '1px solid rgba(var(--ink-rgb),.14)', color: 'var(--ink3)' }}>
            {x.read}
            {' read'}
          </span>
        </span>
        <span
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '500',
            fontSize: 'clamp(19px,1.6vw,22px)',
            letterSpacing: '-0.02em',
            lineHeight: '1.2',
            textWrap: 'pretty',
          }}
        >
          {x.t}
        </span>
        <span style={{ fontSize: '14.5px', lineHeight: '1.55', color: 'var(--muted)', textWrap: 'pretty' }}>
          {x.ex}
        </span>
        <span
          style={{
            marginTop: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            height: '44px',
            padding: '0 22px',
            borderRadius: '999px',
            background: 'var(--acc)',
            color: 'var(--on-acc)',
            fontFamily: "'Montserrat',sans-serif",
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '1',
            whiteSpace: 'nowrap',
            boxShadow: '0 10px 24px -12px rgba(var(--acc-rgb),.7)',
          }}
        >
          {'Read now '}
          <span aria-hidden="true">→</span>
        </span>
      </span>
    </A>
  );
}

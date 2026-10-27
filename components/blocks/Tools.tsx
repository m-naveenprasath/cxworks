import toolIcons from '@/content/site/tool-icons.json';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface ToolsBlock {
  eb?: string;
  /** Tool names. Icons come from content/site/tool-icons.json (name → icon slug → SVG path). */
  items: (string | [string, ...unknown[]])[];
}

const ICONS = toolIcons as {
  map: Record<string, string | null>;
  paths: Record<string, string>;
  imgs?: Record<string, string>;
};
const BRAND: Record<string, string> = {
  adobe: '#FA0F00',
  googleanalytics: '#E37400',
  qualtrics: '#00B4EF',
  google: '#4285F4',
  openai: '#000000',
  googlegemini: '#8E75B2',
  perplexity: '#1FB8CD',
  algolia: '#003DFF',
  shopify: '#7AB55C',
  magento: '#EE672F',
  looker: '#4285F4',
  googletagmanager: '#246FDB',
  googlebigquery: '#669DF6',
  googleads: '#4285F4',
  meta: '#0467DF',
  linkedin: '#0A66C2',
  tiktok: '#000000',
  snapchat: '#000000',
  instagram: '#E4405F',
  hubspot: '#FF7A59',
  salesforce: '#00A1E0',
  bigcommerce: '#121118',
  sap: '#0FAAFF',
  wordpress: '#21759B',
  calendly: '#006BFF',
};

/** Tool / platform chips with brand icons (falls back to initials). */
export function Tools({ b }: BlockProps<ToolsBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <p style={{ ...ui.eyebrow, marginBottom: '20px' }}>{b.eb}</p>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
        {b.items.map((x) => {
          const name = Array.isArray(x) ? x[0] : x;
          const slug = ICONS.map[name];
          const d = slug ? ICONS.paths[slug] : undefined;
          const img = ICONS.imgs?.[name];
          return (
            <li
              key={name}
              className="hv-bbf9009"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                minHeight: '48px',
                padding: '0 18px 0 8px',
                borderRadius: '999px',
                border: '1px solid rgba(var(--ink-rgb),.14)',
                background: 'rgba(var(--ink-rgb),.03)',
                fontSize: '15px',
                color: 'var(--ink2)',
                whiteSpace: 'nowrap',
                transition: 'border-color .3s, background .3s',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 32px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                }}
              >
                {img ? (
                  <img
                    src={img}
                    alt=""
                    width={20}
                    height={20}
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '20px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />
                ) : d ? (
                  <svg viewBox="0 0 24 24" width="17" height="17" style={{ display: 'block' }}>
                    <path d={d} fill={(slug && BRAND[slug]) || '#1C1C1E'} />
                  </svg>
                ) : (
                  <span
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: '700',
                      fontSize: '13px',
                      color: '#1C1C1E',
                    }}
                  >
                    {name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
                  </span>
                )}
              </span>
              {name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { SectionHead } from '@/components/ui/SectionHead';
import { ui } from '@/components/ui/styles';
import type { BlockProps } from './types';

export interface TableBlock {
  eb?: string;
  h?: string;
  p?: string;
  cols: string[];
  rows: string[][];
}

export function Table({ b }: BlockProps<TableBlock>) {
  return (
    <section data-screen-label={b.label} style={ui.section}>
      <SectionHead eb={b.eb} h={b.h} p={b.p} />
      <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1px solid rgba(var(--ink-rgb),.12)' }}>
        <table style={{ width: '100%', minWidth: '620px', borderCollapse: 'collapse', fontSize: '15px' }}>
          <thead>
            <tr>
              {b.cols.map((c) => (
                <th
                  key={c}
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '16px 18px',
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'var(--acc)',
                    background: 'rgba(var(--acc-rgb),.08)',
                    borderBottom: '1px solid rgba(var(--ink-rgb),.12)',
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((v, vi) => (
                  <td
                    key={vi}
                    style={{
                      padding: '14px 18px',
                      borderBottom: '1px solid rgba(var(--ink-rgb),.08)',
                      color: 'var(--ink3)',
                      verticalAlign: 'top',
                    }}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

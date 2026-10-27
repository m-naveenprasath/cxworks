import { ui } from './styles';

/** Eyebrow + H2 + lead paragraph used at the top of most sections. */
export function SectionHead({ eb, h, p }: { eb?: string; h?: string; p?: string }) {
  return (
    <div style={ui.head}>
      <p style={ui.eyebrow}>{eb}</p>
      {h && <h2 style={ui.h2}>{h}</h2>}
      {p && <p style={ui.lead}>{p}</p>}
    </div>
  );
}

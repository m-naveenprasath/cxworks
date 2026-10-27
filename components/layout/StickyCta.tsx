import { A } from '@/components/ui/A';

/** Full-width call-to-action pinned to the bottom of the screen on phones (< 760px, see .cx-sticky). */
export function StickyCta({ l, href }: { l: string; href: string }) {
  return (
    <div className="cx-sticky" style={{ position: 'fixed', left: '12px', right: '12px', bottom: '12px', zIndex: '90' }}>
      <A
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '0 22px',
          borderRadius: '999px',
          background: 'var(--acc)',
          color: 'var(--on-acc)',
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: '600',
          fontSize: '14.5px',
          whiteSpace: 'nowrap',
          border: '0',
          cursor: 'pointer',
          transition: 'background .3s',
          width: '100%',
          minHeight: '54px',
          boxShadow: '0 16px 40px -12px rgba(var(--shade),.8)',
        }}
      >
        {l}
        {' →'}
      </A>
    </div>
  );
}

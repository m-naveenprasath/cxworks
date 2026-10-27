'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface UI {
  /** Opens the "thank you" dialog (called after a lead form is sent). */
  showThanks: () => void;
}
const Ctx = createContext<UI>({ showThanks: () => {} });
export const useUI = () => useContext(Ctx);

export function UIProvider({ children }: { children: ReactNode }) {
  const [thanks, setThanks] = useState(false);
  const ui = useMemo<UI>(() => ({ showThanks: () => setThanks(true) }), []);
  return (
    <Ctx.Provider value={ui}>
      {children}
      {thanks && <ThanksModal onClose={() => setThanks(false)} />}
    </Ctx.Provider>
  );
}

function ThanksModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="thanks-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: '0',
        zIndex: '300',
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        background: 'rgba(0,0,0,.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'cxFade .4s cubic-bezier(.16,1,.3,1) both',
      }}
    >
      <div
        data-ngpanel=""
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          boxSizing: 'border-box',
          padding: 'clamp(28px,4vw,44px)',
          borderRadius: '28px',
          background:
            'radial-gradient(60% 45% at 100% 0%, rgba(var(--acc-rgb),.18), transparent 70%), radial-gradient(60% 45% at 0% 100%, rgba(40,90,180,.16), transparent 70%), rgba(14,16,18,.92)',
          border: '1px solid rgba(var(--acc-rgb),.35)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.14), 0 40px 90px -30px rgba(0,0,0,.9)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'cxFade .6s .05s cubic-bezier(.16,1,.3,1) both',
        }}
      >
        <button
          className="hv-b719e6d"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid rgba(var(--ink-rgb),.16)',
            background: 'rgba(var(--ink-rgb),.04)',
            color: 'var(--ink)',
            fontSize: '20px',
            lineHeight: '1',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          ×
        </button>
        <span
          aria-hidden="true"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--acc)',
            color: 'var(--on-acc)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3
          id="thanks-title"
          style={{
            margin: '0',
            paddingRight: '40px',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '500',
            fontSize: 'clamp(24px,2.4vw,30px)',
            letterSpacing: '-0.03em',
            lineHeight: '1.15',
            textWrap: 'balance',
          }}
        >
          Great things start with the right conversation.
        </h3>
        <p
          style={{
            margin: '0',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '16px',
            color: 'var(--ink)',
          }}
        >
          Thank you for reaching out to CXWorks.
        </p>
        <p style={{ margin: '0', fontSize: '15.5px', lineHeight: '1.6', color: 'var(--ink3)', textWrap: 'pretty' }}>
          We&apos;ve received your enquiry. Our experts will review your requirements and get in touch within 24 hours
          to discuss how we can support your business goals.
        </p>
        <p
          style={{
            margin: '0',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '16px',
            color: 'var(--acc)',
          }}
        >
          Let&apos;s turn your business goals into measurable growth.
        </p>
        <p
          style={{
            margin: '4px 0 0',
            paddingTop: '16px',
            borderTop: '1px solid rgba(var(--ink-rgb),.1)',
            fontSize: '13.5px',
            fontStyle: 'italic',
            color: 'var(--muted)',
          }}
        >
          CXWorks | Making Your Website Cited, Clicked, Chosen.
        </p>
        <button
          className="hv-ea59758"
          onClick={onClose}
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            minHeight: '52px',
            padding: '0 26px',
            borderRadius: '999px',
            border: '0',
            background: 'var(--acc)',
            color: 'var(--on-acc)',
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

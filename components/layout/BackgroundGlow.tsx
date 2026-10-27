export function BackgroundGlow() {
  return (
    <div
      data-glow=""
      aria-hidden="true"
      style={{ position: 'fixed', inset: '0', zIndex: '-1', overflow: 'hidden', pointerEvents: 'none' }}
    >
      <div
        style={{
          position: 'absolute',
          width: '46vw',
          height: '46vw',
          minWidth: '420px',
          minHeight: '420px',
          left: '-8vw',
          top: '-10vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--acc-rgb),.30), rgba(var(--acc-rgb),0) 65%)',
          filter: 'blur(40px)',
          animation: 'cxDrift 26s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          minWidth: '380px',
          minHeight: '380px',
          right: '-10vw',
          top: '30vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--acc2-rgb),.20), rgba(var(--acc2-rgb),0) 65%)',
          filter: 'blur(50px)',
          animation: 'cxDrift 32s ease-in-out -8s infinite reverse',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '36vw',
          height: '36vw',
          minWidth: '340px',
          minHeight: '340px',
          left: '30vw',
          bottom: '-14vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accd-rgb),.26), rgba(var(--accd-rgb),0) 65%)',
          filter: 'blur(46px)',
          animation: 'cxDrift 38s ease-in-out -16s infinite',
        }}
      />
    </div>
  );
}

/** Sends a GA4 event when Google Analytics is configured (NEXT_PUBLIC_GA_ID); otherwise a no-op. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', event, params);
}

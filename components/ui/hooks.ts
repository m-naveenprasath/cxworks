'use client';

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

/** A counter that advances every 1.5s (paused while the tab is hidden), wrapping at `mod`. */
export function useTick(mod: number, ms = 1500): [number, Dispatch<SetStateAction<number>>] {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setTick((x) => (x + 1) % mod);
    }, ms);
    return () => clearInterval(t);
  }, [mod, ms]);
  return [tick, setTick];
}

const easeOutCubic = (q: number) => 1 - Math.pow(1 - q, 3);

/**
 * Animation progress 0 → 1 that starts when the element scrolls into view.
 * Server HTML is rendered at 1 (final numbers, good for SEO); on mount it resets to 0 and
 * plays once the element is visible. Respects prefers-reduced-motion.
 */
export function useRevealProgress<T extends Element>(ms = 1800, ease = easeOutCubic, visibleAt = 0.85) {
  const ref = useRef<T>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setK(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const q = Math.min(1, (now - t0) / ms);
          setK(ease(q));
          if (q < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { rootMargin: `0px 0px -${Math.round((1 - visibleAt) * 100)}% 0px` },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ms, ease, visibleAt]);
  return [ref, k] as const;
}

/** Calls `fn` every `ms` while the tab is visible and `paused` is false. */
export function useInterval(fn: () => void, ms: number, paused = false) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  });
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => !document.hidden && saved.current(), ms);
    return () => clearInterval(t);
  }, [ms, paused]);
}

import type { Page } from '@/lib/types';

/**
 * Props every block component receives.
 *  - `b`: the block's JSON from the page file, plus `label` (used for data-screen-label).
 *  - `page`: the page being rendered (key, path, crumb, …).
 */
export interface BlockProps<T> {
  b: T & { type: string; label: string };
  page: Page;
}

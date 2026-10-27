import type { Page } from '@/lib/types';
import type { FormKind } from './LeadForm';

/** Which lead form a page shows: the `convert` block's kind if it has one, otherwise the free AI scan. */
export function formFor(page: Pick<Page, 'key' | 'blocks'>): { kind: FormKind; title: string } {
  const kind = (page.blocks.find((b) => b.type === 'convert')?.kind as FormKind | undefined) || 'scan';
  const contact = page.key === 'about' || page.key === 'contact';
  return {
    kind,
    title: contact ? 'Reach out to us' : kind === 'scan' ? 'Get your free AI scan' : 'Tell us what you need',
  };
}

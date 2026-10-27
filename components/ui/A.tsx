import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { isInternal } from '@/lib/links';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Anchor that uses next/link for internal paths (client-side navigation + prefetch)
 * and a plain <a> for external, mailto: and tel: links.
 */
export function A({ href, target, rel, children, ...rest }: Props) {
  if (href && isInternal(href) && (!target || target === '_self')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target={target} rel={rel ?? (target === '_blank' ? 'noopener' : undefined)} {...rest}>
      {children}
    </a>
  );
}

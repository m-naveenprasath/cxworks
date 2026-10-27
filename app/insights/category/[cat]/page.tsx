import { ListingPage, listingMetadata } from '@/components/views/ListingPage';
import { getCategories } from '@/lib/insights';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ cat: c.slug }));
}

type Props = { params: Promise<{ cat: string }> };

export async function generateMetadata({ params }: Props) {
  return listingMetadata((await params).cat, 1);
}

export default async function InsightsCategoryPage({ params }: Props) {
  return <ListingPage catSlug={(await params).cat} page={1} />;
}

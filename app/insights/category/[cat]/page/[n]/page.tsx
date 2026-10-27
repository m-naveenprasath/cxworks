import { ListingPage, listingMetadata } from '@/components/views/ListingPage';
import { allListings } from '@/lib/insights';

export const dynamicParams = false;

export function generateStaticParams() {
  return allListings()
    .filter(([cat, n]) => cat && n > 1)
    .map(([cat, n]) => ({ cat: cat!, n: String(n) }));
}

type Props = { params: Promise<{ cat: string; n: string }> };

export async function generateMetadata({ params }: Props) {
  const { cat, n } = await params;
  return listingMetadata(cat, Number(n));
}

export default async function InsightsCategoryPageN({ params }: Props) {
  const { cat, n } = await params;
  return <ListingPage catSlug={cat} page={Number(n)} />;
}

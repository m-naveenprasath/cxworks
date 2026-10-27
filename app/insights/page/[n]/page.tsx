import { ListingPage, listingMetadata } from '@/components/views/ListingPage';
import { allListings } from '@/lib/insights';

export const dynamicParams = false;

export function generateStaticParams() {
  return allListings()
    .filter(([cat, n]) => !cat && n > 1)
    .map(([, n]) => ({ n: String(n) }));
}

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props) {
  return listingMetadata(undefined, Number((await params).n));
}

export default async function InsightsPageN({ params }: Props) {
  return <ListingPage page={Number((await params).n)} />;
}

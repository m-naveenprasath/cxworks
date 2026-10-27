import { ListingPage, listingMetadata } from '@/components/views/ListingPage';

export const generateMetadata = () => listingMetadata(undefined, 1);

export default function InsightsPage() {
  return <ListingPage page={1} />;
}

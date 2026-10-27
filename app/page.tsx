import { notFound } from 'next/navigation';
import { PageView } from '@/components/views/PageView';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

/** Home page: content/pages/home.json */
export function generateMetadata() {
  const page = getPage('home');
  return page ? pageMetadata({ title: page.title, description: page.description, path: '/' }) : {};
}

export default function HomePage() {
  const page = getPage('home');
  if (!page) notFound();
  return <PageView page={page} />;
}

import { notFound } from 'next/navigation';
import { PageView } from '@/components/views/PageView';
import { getPageByPath, getPages } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

/**
 * Every content page except the home page, routed by its `path` in content/pages/**.json
 * (e.g. /services/digital-analytics/, /audits/seo-audit/, /about/). All pre-rendered at build.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPages()
    .filter((p) => p.path !== '/')
    .map((p) => ({ slug: p.path.split('/').filter(Boolean) }));
}

type Props = { params: Promise<{ slug: string[] }> };

const find = async (params: Props['params']) => getPageByPath('/' + (await params).slug.join('/') + '/');

export async function generateMetadata({ params }: Props) {
  const page = await find(params);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: page.path, noindex: page.noindex });
}

export default async function ContentPage({ params }: Props) {
  const page = await find(params);
  if (!page) notFound();
  return <PageView page={page} />;
}

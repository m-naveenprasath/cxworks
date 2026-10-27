import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { InsightsFooter } from '@/components/views/InsightsFooter';
import { PostView } from '@/components/views/PostView';
import { getPost, getPosts, isoDate, postPath } from '@/lib/content';
import { pageMetadata, postJsonLd } from '@/lib/seo';

/** One article per content/insights/*.json, at /insights/<slug>/ (slugs may contain "/"). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug.split('/') }));
}

type Props = { params: Promise<{ slug: string[] }> };

const find = async (params: Props['params']) => getPost((await params).slug.join('/'));

export async function generateMetadata({ params }: Props) {
  const post = await find(params);
  if (!post) return {};
  return pageMetadata({
    title: post.title || `${post.t} | CXWorks`,
    description: post.d || post.ex,
    path: postPath(post.slug),
    type: 'article',
    publishedTime: isoDate(post.date),
    section: post.cat,
    noindex: post.noindex,
  });
}

export default async function InsightPage({ params }: Props) {
  const post = await find(params);
  if (!post) notFound();
  const date = isoDate(post.date);
  return (
    <>
      <JsonLd data={postJsonLd(post, postPath(post.slug), date)} />
      <PostView post={post} isoDate={date} />
      <InsightsFooter />
    </>
  );
}

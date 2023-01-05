import { BACKEND_URL } from 'lib/pb';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';

import { Container } from '@/core/Container';
import Image from 'next/image';
import { ArticleContent } from './ArticleContent';
import remarkGfm from 'remark-gfm';

const getPostBySlug = async ({ slug }) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/collections/blog/records?filter=(slug='${slug}')`
    );
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getPosts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/collections/blog/records`);
    const posts = await res.json();
    return posts;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export async function generateStaticParams() {
  const posts = await getPosts();
  if (!posts || !posts.items) {
    return [];
  }
  return posts.items.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params: { slug } }) {
  const postData = await getPostBySlug({ slug });
  const post = postData?.items && postData.items[0];
  if (!post) {
    notFound();
  }
  const content = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
      rehypePlugins: [],
      development: false,
    },
  });
  return (
    <Container className='min-h-page'>
      <Image
        src={`${BACKEND_URL}/api/files/blog/${post.id}/${post.cover}`}
        alt={post.title}
        className='h-64 w-full rounded-md object-cover sm:h-72 md:h-80 lg:h-96'
        width={1200}
        height={600}
      />
      <article className='prose mt-4 dark:prose-invert md:mt-6 lg:prose-xl'>
        <h1>{post.title}</h1>
        <ArticleContent content={content} />
      </article>
    </Container>
  );
}

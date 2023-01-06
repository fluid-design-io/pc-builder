import { BACKEND_URL } from 'lib/pb';
import { notFound } from 'next/navigation';

import { Container } from '@/core/Container';

import { ProjectCard } from './ProjectCard';

const getPosts = async () => {
  try {
    const res = await fetch(
      `https://billowing-hill-1662.fly.dev/api/collections/blog/records`
    );
    const blogs = await res.json();
    return blogs;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function Page() {
  const postsData = await getPosts();
  const posts = postsData?.items;
  if (Object.keys(posts).length === 0) {
    notFound();
  }
  return (
    <Container className='min-h-page'>
      <div className='grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8 xl:gap-12'>
        {posts.map((post) => (
          <ProjectCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}

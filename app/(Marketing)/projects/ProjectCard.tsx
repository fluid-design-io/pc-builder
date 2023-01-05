import { BACKEND_URL } from 'lib/pb';
import Image from 'next/image';
import Link from 'next/link';

export const ProjectCard = ({ post }) => {
  return (
    <Link href={`/projects/${post.slug}`}>
      <div className='card-secondary card-secondary-hover !p-0'>
        <div className='relative'>
          <Image
            src={`${BACKEND_URL}/api/files/blog/${post.id}/${post.cover}?thumb=300x450`}
            alt={post.title}
            className='h-48 w-full object-cover'
            width={300}
            height={450}
          />
        </div>
        <div className='p-4'>
          <h3>{post.title}</h3>
        </div>
      </div>
    </Link>
  );
};

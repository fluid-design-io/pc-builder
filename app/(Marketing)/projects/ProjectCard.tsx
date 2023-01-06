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
            placeholder='blur'
            blurDataURL={`data:image/png;base64, ${post.cover_blur_data}`}
          />
        </div>
        <div className='p-4 pb-2'>
          <h3>{post.title}</h3>
          <div className='mt-4 border-t border-gray-100 pt-1 dark:border-gray-600/40'>
            <time
              dateTime={post.created}
              className='text-sm text-gray-500 dark:text-gray-400'
            >
              {new Date(post.created).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};

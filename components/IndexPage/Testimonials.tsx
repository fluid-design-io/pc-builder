import Image from 'next/image';

import { Container } from '@/core/Container';

import avatarImage1 from '~/assets/images/avatars/avatar-1.png';
import avatarImage3 from '~/assets/images/avatars/avatar-3.png';
import avatarImage5 from '~/assets/images/avatars/avatar-5.png';

import postImage1 from '~/assets/images/posts/post-1.jpg';
import postImage2 from '~/assets/images/posts/post-2.jpg';
import postImage3 from '~/assets/images/posts/post-3.jpg';

const testimonials = [
  [
    {
      content:
        'The service is great and the support is even better. Love how the PC turns out and the price is very reasonable. I will definitely recommend this to my friends.',
      author: {
        name: 'Sheryl Berge',
        role: 'CEO at Lynch LLC',
        image: avatarImage1,
        postImage: postImage1,
      },
    },
  ],
  [
    {
      content:
        'I was very impressed with the quality of the PC. It was very easy to build and the support team was very helpful. I will definitely be back for my next build.',
      author: {
        name: 'Leland Kiehn',
        role: 'Founder of Kiehn and Sons',
        image: avatarImage5,
        postImage: postImage2,
      },
    },
  ],
  [
    {
      content:
        'I love the attention to detail and the games run so smooth. I will definitely be back for my next build.',
      author: {
        name: 'Peter Renolds',
        role: 'Founder of West Inc',
        image: avatarImage3,
        postImage: postImage3,
      },
    },
  ],
];

function QuoteIcon(props) {
  return (
    <svg aria-hidden='true' width={105} height={78} {...props}>
      <path d='M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z' />
    </svg>
  );
}

export function Testimonials() {
  return (
    <Container
      id='testimonials'
      aria-label='What our customers are saying'
      className='py-20 sm:py-32'
    >
      <div className='mx-auto max-w-2xl md:text-center'>
        <h2>Loved by our customers.</h2>
        <p className='mt-4 text-lg tracking-tight'>
          We only build and ship products that our customers love. Our customers
          love us. We love them. It’s a beautiful relationship.
        </p>
      </div>
      <ul
        role='list'
        className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3'
      >
        {testimonials.map((column, columnIndex) => (
          <li key={columnIndex}>
            <ul role='list' className='flex flex-col gap-y-6 sm:gap-y-8'>
              {column.map((testimonial, testimonialIndex) => (
                <li key={testimonialIndex}>
                  <figure className='card-secondary card-secondary-hover relative'>
                    <QuoteIcon className='absolute top-6 left-6 fill-gray-100 dark:fill-gray-500/20' />
                    <div className='relative'>
                      <Image
                        className='mb-2 w-full rounded object-cover'
                        src={testimonial.author.postImage}
                        alt=''
                        placeholder='blur'
                      />
                    </div>
                    <blockquote className='relative'>
                      <p className='text-lg tracking-tight dark:text-gray-100'>
                        {testimonial.content}
                      </p>
                    </blockquote>
                    <figcaption className='relative mt-6 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-700'>
                      <div>
                        <div className='font-display text-base'>
                          {testimonial.author.name}
                        </div>
                        <div className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                          {testimonial.author.role}
                        </div>
                      </div>
                      <div className='overflow-hidden rounded-full bg-gray-50'>
                        <Image
                          className='h-14 w-14 object-cover'
                          src={testimonial.author.image}
                          alt=''
                          width={56}
                          height={56}
                          placeholder='blur'
                        />
                      </div>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
}

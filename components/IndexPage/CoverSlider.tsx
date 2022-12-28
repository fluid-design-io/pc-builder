'use client';

import { Button } from '@/buttons/AppButton';
import clsxm from 'lib/clsxm';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cover_1 from '~/assets/cover/pc-1.jpg';
import cover_2 from '~/assets/cover/pc-2.jpg';
import cover_3 from '~/assets/cover/pc-3.jpg';
import cover_4 from '~/assets/cover/pc-4.jpg';

export const CoverSlider = () => {
  const slides = [
    {
      id: 1,
      image: cover_1,
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      id: 2,
      image: cover_2,
      title: 'Title 2',
      description: 'Description 2',
    },
    {
      id: 3,
      image: cover_3,
      title: 'Title 3',
      description: 'Description 3',
    },
    {
      id: 4,
      image: cover_4,
      title: 'Title 4',
      description: 'Description 4',
    },
  ];
  const slidesMarkup = slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      className={clsxm(
        'relative mx-auto flex w-full',
        'lg:max-w-[calc(100vw-8rem)]',
        'md:max-w-[calc(100vw-6rem)]',
        'max-w-[calc(100vw-4rem)]'
      )}
    >
      <div
        className={clsxm(
          'relative w-full overflow-hidden rounded-md',
          'lg:max-h-[calc(100dvh-8rem-2.5rem)]',
          'md:max-h-[calc(100dvh-6rem-2.5rem)]',
          'max-h-[calc(100dvh-4rem-2.5rem)]',
          'aspect-[4/3]',
          'after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-md after:bg-gray-800/20'
        )}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          placeholder='blur'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </SwiperSlide>
  ));
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
        <div className='mx-10 w-full px-4 font-primary text-white md:mx-14 md:px-6 lg:mx-24 lg:px-8'>
          <h1 className='mb-4 text-4xl font-black uppercase md:text-6xl lg:text-7xl'>
            Customize your PC
          </h1>
          <p className='text-2xl font-bold uppercase md:text-3xl lg:text-4xl'>
            Your next unique PC
          </p>
          <Button
            href='/build'
            color='primary'
            className='pointer-events-auto mt-4 rounded-md px-8 py-2.5 text-xl font-bold uppercase tracking-wide'
          >
            Start Build
          </Button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={16}
        slidesPerView='auto'
        centeredSlides={true}
        autoplay={{ delay: 3500 }}
        initialSlide={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        className='mb-8'
      >
        {slidesMarkup}
      </Swiper>
    </div>
  );
};

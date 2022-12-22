"use client";

import Image from "next/image";
import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import cover_1 from "~/assets/cover/pc-1.jpg";
import cover_2 from "~/assets/cover/pc-2.jpg";
import cover_3 from "~/assets/cover/pc-3.jpg";
import cover_4 from "~/assets/cover/pc-4.jpg";

export const CoverSlider = () => {
  const slides = [
    {
      id: 1,
      image: cover_1,
      title: "Title 1",
      description: "Description 1",
    },
    {
      id: 2,
      image: cover_2,
      title: "Title 2",
      description: "Description 2",
    },
    {
      id: 3,
      image: cover_3,
      title: "Title 3",
      description: "Description 3",
    },
    {
      id: 4,
      image: cover_4,
      title: "Title 4",
      description: "Description 4",
    },
  ];
  const slidesMarkup = slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      className='relative mx-auto flex w-full max-w-[93.75rem]'
    >
      <div className='relative h-[calc(28rem+10vh)] w-full overflow-hidden lg:rounded-md'>
        <Image
          src={slide.image}
          alt={slide.title}
          placeholder='blur'
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </SwiperSlide>
  ));
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={"auto"}
      centeredSlides={true}
      initialSlide={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className='my-8'
    >
      {slidesMarkup}
    </Swiper>
  );
};

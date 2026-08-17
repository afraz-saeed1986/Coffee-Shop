"use client"

import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

function Banner() {
  return (
    <Swiper rewind={true} navigation={true} autoplay={{delay: 2000}} loop={true} modules={[Navigation, Autoplay]} className="mySwiper home-slider">
        <SwiperSlide>
            <img src="/images/slide.jpg" alt="Slide" />
        </SwiperSlide>
         <SwiperSlide>
            <img src="/images/slide1.jpg" alt="Slide" />
        </SwiperSlide>
            <SwiperSlide>
            <img src="/images/slide2.jpg" alt="Slide" />
        </SwiperSlide>
    </Swiper>
  )
}

export default Banner
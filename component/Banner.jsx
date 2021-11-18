import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/autoplay"
// import Swiper core and required modules
import SwiperCore, {
  Pagination,Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);

export default function Banner() {
    return (
        <section className="intro-section banner">
            <Swiper pagination={{"clickable": true}} className="swiper-theme" autoplay={{delay:2000}}>
  <SwiperSlide>
      <img src="https://icms-image.slatic.net/images/ims-web/82e2bcbb-f1af-436a-a954-9253128df5cf.jpg" alt="" />

      </SwiperSlide>
  <SwiperSlide><img src="https://icms-image.slatic.net/images/ims-web/d8f935fc-30af-4f05-a59e-19cd5bae9125.jpg" alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://icms-image.slatic.net/images/ims-web/0f976d76-6849-4810-8a10-3dd854492c55.jpg" alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://icms-image.slatic.net/images/ims-web/9852ab1d-2b37-4e3e-a639-57a8dd6bfbed.jpg" alt="" /></SwiperSlide>
  </Swiper>
         
        </section>

    )
}

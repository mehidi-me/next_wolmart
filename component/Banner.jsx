import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";
import client, { imgPath } from "../pages/api/client";

// install Swiper modules
SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);

export default function Banner() {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    fetch(client + "sliders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSliders(data.data);
        }
      });
  });
  return (
    <section className="intro-section banner">
      <Swiper
        pagination={{ clickable: true }}
        className="swiper-theme"
        autoplay={{ delay: 2000 }}
      >
        {sliders.length
          ? sliders.map((v) => (
              <SwiperSlide key={v.photo}>
                <img src={imgPath + v.photo} alt="" />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </section>
  );
}

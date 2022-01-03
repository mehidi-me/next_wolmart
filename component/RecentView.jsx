import React, { useContext } from "react";
import AppContext from "../storeData/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { imgPath } from "../pages/api/client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Link from "next/link";
import { useRouter } from "next/router";

SwiperCore.use([Autoplay]);
export default function RecentView() {
  const {
    state: { recentView },
  } = useContext(AppContext);

  if (recentView.length) {
    const route = useRouter();

    return (
      <div>
        <h2 className="title title-underline mb-4 ls-normal">
          Your Recent Views
        </h2>
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 3,
            },
            700: {
              slidesPerView: 5,
            },
            1000: {
              slidesPerView: 6,
            },
          }}
          className="swiper-theme"
          autoplay={{ delay: 2000 }}
        >
          {recentView.map((v) => (
            <SwiperSlide key={v.slug}>
              <div className="product text-center product-absolute">
                <figure className="product-media">
                  <a href="product-defaproduct-default.html">
                    <img
                      src={imgPath + v.image}
                      alt="Category image"
                      width={130}
                      height={146}
                      style={{ backgroundColor: "#fff" }}
                    />
                  </a>
                </figure>
                <h4 className="product-name">
                  <a onClick={() => route.push("/product/" + v.slug)}>
                    {v.name}
                  </a>
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return null;
  }
}

import React, { useContext } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { imgPath } from "../pages/api/client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";
import AppContext from "../storeData/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";

SwiperCore.use([Autoplay]);

export default function TopCategory() {
  const {
    state: { category },
  } = useContext(AppContext);
  const route = useRouter();
  return (
    <section className="category-section top-category bg-grey pt-10 pb-10">
      <div className="container pb-2">
        <h2 className="title justify-content-center pt-1 ls-normal mb-5">
          All Categories
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
          {category
            .filter((v) => v.parent_id == 0)
            .map((v) => (
              <SwiperSlide key={v.id}>
                <a onClick={() => route.push("/products?categories=" + v.id)}>
                  <div className="swiper-slide category category-classic category-absolute overlay-zoom br-xs">
                    <a className="category-media">
                      <img
                        src={imgPath + v.banner}
                        alt="Category"
                        width={130}
                        height={130}
                      />
                    </a>
                    <div className="category-content">
                      <h4 className="category-name">{v.name}</h4>
                      <Link href={"/products?categories=" + v.id}>
                        <a className="btn btn-primary btn-link btn-underline">
                          Shop Now
                        </a>
                      </Link>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}

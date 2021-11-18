import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import { imgPath } from "../../pages/api/client";

export default function ImageGallery({ close, pid, productImage }) {
  const [imageurl, setImageurl] = useState([]);

  useEffect(() => {
    if (productImage) {
      let img = [];
      productImage.map((v) => {
        img.push(imgPath + v);
      });
      if (productImage.length == 1) {
        img.push(imgPath + productImage[0]);
      }
      setImageurl(img);
    }
  }, [productImage]);
  const settings = {
    customPaging: function (i) {
      return (
        <div
          className="product-thumb swiper-slide swiper-slide-thumb-active swiper-slide-visible "
          role="group"
          aria-label="1 / 4"
          style={{ width: "61.25px", marginRight: "10px" }}
        >
          <img src={imageurl[i]} alt="Product Thumb" width={95} height={116} />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="product-gallery product-gallery-sticky">
      <div
        className="swiper-container product-single-swiper swiper-theme nav-inner swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
        style={{ width: "100%" }}
      >
        <Slider {...settings}>
          {imageurl.map((v) => (
            <figure
              className="product-image"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
              key={v}
            >
              <img
                src={v}
                data-zoom-image="assets/images/products/popup/1-800x900.jpg"
                alt="Water Boil Black Utensil"
                width={800}
                height={900}
              />
              <img
                role="presentation"
                alt="Water Boil Black Utensil"
                src={v}
                className="zoomImg"
                style={{
                  position: "absolute",
                  top: "-45.1961px",
                  left: "-73.0025px",
                  opacity: 0,
                  width: "484px",
                  height: "543.4px",
                  border: "none",
                  maxWidth: "none",
                  maxHeight: "none",
                }}
              />
            </figure>
          ))}
        </Slider>

        <span
          className="swiper-notification"
          aria-live="assertive"
          aria-atomic="true"
        />
        <span
          className="swiper-notification"
          aria-live="assertive"
          aria-atomic="true"
        />
      </div>
    </div>
  );
}

const SampleNextArrow = ({ onClick }) => {
  return (
    <button
      className="swiper-button-next"
      onClick={onClick}
      tabIndex={0}
      aria-label="Next slide"
      aria-controls="swiper-wrapper-cf2c31d78e8ebb6a"
      aria-disabled="false"
    />
  );
};
const SamplePrevArrow = ({ onClick }) => {
  return (
    <button
      className="swiper-button-prev"
      onClick={onClick}
      tabIndex={0}
      aria-label="Previous slide"
      aria-controls="swiper-wrapper-cf2c31d78e8ebb6a"
      aria-disabled="false"
    />
  );
};

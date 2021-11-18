import React, { useState } from "react";
import ImageGallery from "./productDetails/ImageGallery";
import Skeleton from "react-loading-skeleton";

export default function QuickViewSkeleton({ close }) {
  return (
    <>
      <div className="product product-single product-popup">
        <div className="row gutter-lg">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="product-gallery product-gallery-sticky">
              <div
                className="swiper-container product-single-swiper swiper-theme nav-inner swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
                style={{ width: "100%" }}
              >
                <figure
                  className="product-image"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <Skeleton width={800} height={450} />
                </figure>

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
          </div>

          <div className="col-md-6 overflow-hidden p-relative">
            <div className="product-details scrollable pl-0">
              <h2 className="product-title">
                <Skeleton />
              </h2>
              <div className="product-bm-wrapper">
                <figure className="brand">
                  <Skeleton />
                </figure>
                <div className="product-meta">
                  <div className="product-categories">
                    <span className="product-category">
                      <Skeleton />
                    </span>
                  </div>
                  <div className="product-sku">
                    <Skeleton />
                  </div>
                </div>
              </div>
              <hr className="product-divider" />
              <div className="product-price">
                <Skeleton />
              </div>
              <div className="ratings-container">
                <Skeleton />
              </div>
              <div className="product-short-desc">
                <ul className="list-type-check list-style-none">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </ul>
              </div>
              <hr className="product-divider" />
              <div className="product-form product-variation-form product-color-swatch">
                <Skeleton />
              </div>
              <div className="product-form product-variation-form product-size-swatch">
                <Skeleton />
              </div>
              <div className="product-variation-price">
                <span />
              </div>

              <Skeleton height={30} />

              <Skeleton height={30} />

              <Skeleton />
            </div>
          </div>
        </div>
        <button
          title="Close (Esc)"
          onClick={close}
          type="button"
          className="mfp-close"
        ></button>
      </div>
    </>
  );
}

import Link from "next/link";
import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import client, { imgPath } from "../pages/api/client";
import AppContext from "../storeData/AppContext";
import QuickView from "./QuickView";
import QuickViewSkeleton from "./QuickViewSkeleton";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductCard({
  product: {
    name,
    base_price,
    thumbnail_image,
    slug,
    rating,
    rating_count,
    id,
  },
}) {
  const {
    state: { whishlist },
    dispatch,
  } = useContext(AppContext);

  const [quickViewIsOpen, setquickViewIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qView, setQview] = useState({ product: {}, productImage: [] });
  const quickViewIsOpenClose = () => {
    setquickViewIsOpen(false);
  };
  const quickViewClick = async (id) => {
    setquickViewIsOpen(true);
    setLoading(true);
    const res = await fetch(client + "products/" + id);
    const data = await res.json();
    if (data.success) {
      const product = data.data[0];

      const productImage = [...product.photos, product.thumbnail_image];

      setQview({ product, productImage });
    }

    //
    setLoading(false);
  };

  const addToWhishlist = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
      price: data.base_price,
      image: data.thumbnail_image,
      slug: data.slug,
    };
    dispatch({ type: "ADD_TO_WHISHLIST", payload });
  };

  const route = useRouter();

  const getProductDetailsPage = () => {
    route.push("/product/" + slug);
  };

  return (
    <>
      <div className="product-wrap product text-center">
        <figure className="product-media">
          <div className="product-image-s">
            <a onClick={getProductDetailsPage}>
              <Image
                src={imgPath + thumbnail_image}
                blurDataURL={imgPath + thumbnail_image}
                alt="Product"
                width={216}
                height={243}
                placeholder="blur"
              />
            </a>
          </div>
          {whishlist.find((v) => v.id == id) ? (
            <div
              className="product-action-vertical"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <a
                className="btn-product-icon btn-wishlist w-icon-heart-full"
                title="Add to wishlist"
                style={{
                  borderColor: "#336699",
                  color: "#fff",
                  backgroundColor: "#336699",
                }}
              />
            </div>
          ) : (
            <div className="product-action-vertical">
              <a
                onClick={() =>
                  addToWhishlist({
                    id,
                    slug,
                    base_price,
                    thumbnail_image,
                    name,
                  })
                }
                className="btn-product-icon btn-wishlist w-icon-heart"
                title="Add to wishlist"
              />
            </div>
          )}

          <div className="product-action">
            <a
              onClick={() => quickViewClick(id)}
              className="btn-product btn-quickview"
              title="Quick View"
            >
              Add To Cart
            </a>
          </div>
        </figure>
        <div className="product-details">
          <h4 className="product-name">
            <a onClick={getProductDetailsPage}>{name}</a>
          </h4>
          <div className="ratings-container">
            <div className="ratings-full">
              <span className="ratings" style={{ width: `${rating * 10}%` }} />
              <span className="tooltiptext tooltip-top" />
            </div>
            <a onClick={getProductDetailsPage} className="rating-reviews">
              ({rating_count} reviews)
            </a>
          </div>
          <div className="product-price">
            <span className="price">{base_price}</span>
          </div>
        </div>
      </div>
      <Popup
        modal
        lockScroll
        open={quickViewIsOpen}
        position="center center"
        onClose={quickViewIsOpenClose}
      >
        <div className="mfp-product">
          <div className="mfp-container">
            <div className="mfp-content">
              {loading ? (
                <QuickViewSkeleton close={quickViewIsOpenClose} />
              ) : (
                <QuickView
                  close={quickViewIsOpenClose}
                  product={qView.product}
                  productImage={qView.productImage}
                  slug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

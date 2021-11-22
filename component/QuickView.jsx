import React, { useContext, useState } from "react";
import AppContext from "../storeData/AppContext";
import { add, remove, update } from "./cart/updateCart";
import ImageGallery from "./productDetails/ImageGallery";
import ProgressBar from "./ProgressBar";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function QuickView({ close, product, productImage, slug }) {
  const {
    state: { cartData, whishlist },
    dispatch,
  } = useContext(AppContext);

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(false);

  const currentProduct = cartData.find((v) => v.product_id == product.id);

  const addToCard = async (data, image) => {
    try {
      setLoading(true);
      await add(data.id, qty, dispatch);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const removeToCart = async (id) => {
    try {
      setLoading(true);
      await remove(id, dispatch);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateQty = async (type, payload) => {
    if (!currentProduct) {
      if (type == "in") {
        setQty((v) => v + 1);
      } else {
        qty != 1 && setQty((v) => v - 1);
      }
    } else {
      setLoading(true);
      try {
        await update(type, payload, currentProduct, dispatch);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const addToWhishlist = (data, image) => {
    const payload = {
      id: data.id,
      name: data.name,
      price: data.calculable_price,
      image,
      slug: data.slug,
    };
    dispatch({ type: "ADD_TO_WHISHLIST", payload });
  };

  return (
    <>
      <div className="product product-single product-popup">
        <div className="row gutter-lg">
          <div className="col-md-6 mb-4 mb-md-0">
            <ImageGallery productImage={productImage} pid={product.id} />
          </div>

          <div className="col-md-6 overflow-hidden p-relative">
            <div className="product-details scrollable pl-0">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-bm-wrapper">
                <figure className="brand">
                  <img
                    src="https://portotheme.com/html/wolmart/assets/images/products/brand/brand-1.jpg"
                    alt="Brand"
                    width={102}
                    height={48}
                  />
                </figure>
                <div className="product-meta">
                  <div className="product-categories">
                    Category:
                    <span className="product-category">
                      <a href="#">Electronics</a>
                    </span>
                  </div>
                  <div className="product-sku">
                    SKU: <span>MS46891340</span>
                  </div>
                </div>
              </div>
              <hr className="product-divider" />
              <div className="product-price">{product.main_price}</div>
              <div className="ratings-container">
                <div className="ratings-full">
                  <span
                    className="ratings"
                    style={{ width: `${product.rating * 10}%` }}
                  />
                  <span className="tooltiptext tooltip-top" />
                </div>
                <a href="#" className="rating-reviews">
                  {`(${product.rating_count} Reviews)`}
                </a>
              </div>
              {/* <div className="product-short-desc">
                <ul className="list-type-check list-style-none">
                  {product.sort_desc}
                </ul>
              </div> */}
              <hr className="product-divider" />
              <div className="product-form product-variation-form product-color-swatch">
                <label>Color:</label>
                <div className="d-flex align-items-center product-variations">
                  <a
                    href="#"
                    className="color"
                    style={{ backgroundColor: "#ffcc01" }}
                  />
                  <a
                    href="#"
                    className="color"
                    style={{ backgroundColor: "#ca6d00" }}
                  />
                  <a
                    href="#"
                    className="color"
                    style={{ backgroundColor: "#1c93cb" }}
                  />
                  <a
                    href="#"
                    className="color"
                    style={{ backgroundColor: "#ccc" }}
                  />
                  <a
                    href="#"
                    className="color"
                    style={{ backgroundColor: "#333" }}
                  />
                </div>
              </div>
              <div className="product-form product-variation-form product-size-swatch">
                <label className="mb-1">Size:</label>
                <div className="flex-wrap d-flex align-items-center product-variations">
                  <a href="#" className="size">
                    Small
                  </a>
                  <a href="#" className="size">
                    Medium
                  </a>
                  <a href="#" className="size">
                    Large
                  </a>
                  <a href="#" className="size">
                    Extra Large
                  </a>
                </div>
                <a href="#" className="product-variation-clean">
                  Clean All
                </a>
              </div>
              <div className="product-variation-price">
                <span />
              </div>
              <ProgressBar visible={loading} />
              <div className="product-form container">
                <div className="product-qty-form">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="number"
                      min={1}
                      max={10000000}
                      value={currentProduct ? currentProduct.quantity : qty}
                    />
                    <button
                      className="w-icon-plus"
                      onClick={() =>
                        updateQty("in", {
                          type: "INCREASE_QTY",
                          payload: { id: product.id },
                        })
                      }
                      disabled={loading}
                    />
                    <button
                      className="w-icon-minus"
                      onClick={() =>
                        updateQty("de", {
                          type: "DECREASE_QTY",
                          payload: { id: product.id },
                        })
                      }
                      disabled={loading}
                    />
                  </div>
                </div>

                {currentProduct ? (
                  <button
                    className="btn btn-secondary btn-cart"
                    onClick={() => removeToCart(currentProduct.id)}
                    disabled={loading}
                  >
                    <span>Remove to Cart</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-cart"
                    onClick={() => addToCard(product, product.thumbnail_image)}
                    disabled={loading}
                  >
                    <i className="w-icon-cart" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
              <div className="social-links-wrapper">
                <div className="social-links">
                  <div className="social-icons social-no-color border-thin">
                    <FacebookShareButton
                      url={origin + "/product/" + product.slug}
                      style={{ marginRight: "6px" }}
                    >
                      <FacebookIcon round size={32} />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton
                      url={origin + "/product/" + product.slug}
                      style={{ marginRight: "6px" }}
                    >
                      <FacebookMessengerIcon round size={32} />
                    </FacebookMessengerShareButton>
                    <TwitterShareButton
                      url={origin + "/product/" + product.slug}
                      style={{ marginRight: "6px" }}
                    >
                      <TwitterIcon round size={32} />
                    </TwitterShareButton>

                    <WhatsappShareButton
                      url={origin + "/product/" + product.slug}
                      style={{ marginRight: "6px" }}
                    >
                      <WhatsappIcon round size={32} />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                      url={origin + "/product/" + product.slug}
                    >
                      <LinkedinIcon round size={32} />
                    </LinkedinShareButton>
                  </div>
                </div>
                <span className="divider d-xs-show" />
                <div className="product-link-wrapper d-flex">
                  {whishlist.find((v) => v.id == product.id) ? (
                    <a
                      className="btn-product-icon btn-wishlist w-icon-heart-full"
                      style={{ color: "#336699" }}
                    >
                      <span />
                    </a>
                  ) : (
                    <a
                      onClick={() =>
                        addToWhishlist(product, product.thumbnail_image)
                      }
                      className="btn-product-icon btn-wishlist w-icon-heart"
                    >
                      <span />
                    </a>
                  )}
                </div>
              </div>
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

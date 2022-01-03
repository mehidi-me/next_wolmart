import React, { useContext, useEffect, useState } from "react";
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
import Skeleton from "react-loading-skeleton";
import client from "../pages/api/client";
import Link from "next/link";

export default function QuickView({ close, product, productImage, slug }) {
  const {
    state: { cartData, whishlist },
    dispatch,
  } = useContext(AppContext);

  const [variant, setVariant] = useState([]);
  const [variantLoading, setVariantLoading] = useState(false);
  const [variantPrice, setVariantPrice] = useState({ variant: "", price: "" });

  const getVariant = async (data) => {
    if (!variantLoading) {
      const newVariant = variant.filter((v) => v.type != data.type);
      const newData = [...newVariant, data];
      setVariant(newData);
      var tLength = product.colors.length
        ? product.choice_options.length + 1
        : product.choice_options.length;
      if (newData.length == tLength) {
        let vstr = [];
        product.choice_options.map((data) => {
          vstr.push(newData.find((v) => v.type == data.title).value);
        });
        const color = newData.find((v) => v.type == "Color").value.substring(1);
        setVariantLoading(true);
        try {
          const link = `${client}products/variant/price?id=${
            product.id
          }&color=${color}&variants=${vstr.join()}`;
          const res = await fetch(link);
          const data = await res.json();
          if (data) {
            setVariantPrice({
              variant: data.variant,
              price: data.price_string,
            });
          }
        } catch (error) {
          console.log(error);
        }
        setVariantLoading(false);
      }
    }
  };

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(false);

  const currentProduct = cartData.find((v) => v.product_id == product.id);

  const addToCard = async (data, image) => {
    try {
      setLoading(true);
      await add(data.id, qty, dispatch, variantPrice.variant);
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

  useEffect(() => {
    if (product) {
      dispatch({
        type: "ADD_TO_RECENTVIEW",
        payload: {
          slug: product.slug,
          name: product.name,
          image: product.thumbnail_image,
        },
      });
    }
  }, [product]);

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
                {/* <figure className="brand">
                        <img
                          src="https://portotheme.com/html/wolmart/assets/images/products/brand/brand-1.jpg"
                          alt="Brand"
                          width={102}
                          height={48}
                        />
                      </figure> */}
                <div className="product-meta">
                  <div className="product-categories">
                    Category:
                    <span className="product-category">
                      {product.category ? (
                        <Link
                          href={
                            "/products?categories=" + product.category[0].id
                          }
                        >
                          <a>
                            {" "}
                            {"  "}
                            {product.category[0].name}
                          </a>
                        </Link>
                      ) : null}
                    </span>
                  </div>
                  {/* <div className="product-sku">
                          SKU: <span>MS46891340</span>
                        </div> */}
                </div>
              </div>
              <hr className="product-divider" />
              {variantLoading ? (
                <div className="product-price">
                  <ins className="new-price">
                    <Skeleton width={180} height={30} />
                  </ins>
                </div>
              ) : (
                <div className="product-price">
                  {product.has_discount ? (
                    <>
                      <del className="old-price">{product.stroked_price}</del>
                      <ins className="new-price">
                        {variantPrice.price
                          ? variantPrice.price
                          : product.main_price}
                      </ins>
                    </>
                  ) : (
                    <ins className="new-price">
                      {variantPrice.price
                        ? variantPrice.price
                        : product.main_price}
                    </ins>
                  )}
                </div>
              )}
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

              {product.colors ? (
                product.colors.length ? (
                  <div className="product-form product-variation-form product-color-swatch">
                    <label>Color:</label>
                    <div className="d-flex align-items-center product-variations">
                      {product.colors.map((v) => (
                        <a
                          onClick={() =>
                            getVariant({ type: "Color", value: v })
                          }
                          className={
                            variant.find(
                              (data) => data.type == "Color" && data.value == v
                            )
                              ? "color active"
                              : "color"
                          }
                          style={{ backgroundColor: v }}
                        />
                      ))}
                      {!variant.length ||
                      variant.find((data) => data.type == "Color") ? null : (
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "14px",
                            color: "red",
                          }}
                        >
                          Select Color !
                        </span>
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}

              {product.choice_options
                ? product.choice_options.length
                  ? product.choice_options.map((v) => (
                      <div className="product-form product-variation-form product-size-swatch">
                        <label className="mb-1">{v.title}:</label>
                        <div className="flex-wrap d-flex align-items-center product-variations">
                          {v.options.map((v2) => (
                            <a
                              onClick={() =>
                                getVariant({ type: v.title, value: v2 })
                              }
                              className={
                                variant.find(
                                  (data) =>
                                    data.type == v.title && data.value == v2
                                )
                                  ? "size active"
                                  : "size"
                              }
                            >
                              {v2}
                            </a>
                          ))}

                          {!variant.length ||
                          variant.find(
                            (data) => data.type == v.title
                          ) ? null : (
                            <span
                              style={{
                                marginLeft: "10px",
                                fontSize: "14px",
                                color: "red",
                              }}
                            >
                              Select{" " + v.title + " !"}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  : null
                : null}

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

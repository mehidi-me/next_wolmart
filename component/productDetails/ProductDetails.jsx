import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../storeData/AppContext";
import ImageGallery from "./ImageGallery";
import parse from "html-react-parser";
import client, { imgPath } from "../../pages/api/client";
import UserReviews from "./UserReviews";
import RelatedProducts from "./RelatedProducts";
import ProgressBar from "../ProgressBar";
import { add, remove, update } from "../cart/updateCart";
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
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";

export default function ProductDetails({ product, productImage, slug }) {
  const {
    dispatch,
    state: { category, cartData, whishlist },
  } = useContext(AppContext);

  const [reviews, setReviews] = useState([]);
  const [moreProduct, setMoreProduct] = useState([]);

  const [moreLoading, setMoreLoading] = useState(false);

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(false);

  const getReviews = async (id) => {
    const res = await fetch(client + "reviews/product/" + id);
    const data = await res.json();

    if (data.success) {
      setReviews(data.data);
    }
    console.log(data);
  };

  const getMoreProduct = async () => {
    setMoreLoading(true);
    const res = await fetch(client + "products/random");
    const data = await res.json();

    if (data.success) {
      setMoreProduct(data.data);
    }
    console.log(data);
    setMoreLoading(false);
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

  useEffect(() => {
    getMoreProduct();
    getReviews(product.id);
  }, []);
  return (
    <div className="mb-10 pb-1">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav container">
        <ul className="breadcrumb bb-no">
          <li>
            <a href="demo1.html">Home</a>
          </li>
          <li>Products</li>
        </ul>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of Page Content */}
      <div className="page-content">
        <div className="container">
          <div className="row gutter-lg">
            <div className="main-content">
              <div className="product product-single row">
                <div className="col-md-6 mb-6">
                  <ImageGallery productImage={productImage} pid={product.id} />
                </div>
                <div className="col-md-6 mb-4 mb-md-6">
                  <div
                    className="product-details"
                    data-sticky-options="{'minWidth': 767}"
                  >
                    <h1 className="product-title">{product.name}</h1>
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
                            <a href="#">
                              {/* {
                                category.find(
                                  (v) => v.id == product.category_id
                                ).category_name
                              } */}
                            </a>
                          </span>
                        </div>
                        <div className="product-sku">
                          SKU: <span>MS46891340</span>
                        </div>
                      </div>
                    </div>
                    <hr className="product-divider" />
                    <div className="product-price">
                      <ins className="new-price">{product.main_price}</ins>
                    </div>
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: `${product.rating * 10}%` }}
                        />
                        <span className="tooltiptext tooltip-top" />
                      </div>
                      <a
                        href="#product-tab-reviews"
                        className="rating-reviews scroll-to"
                      >
                        ({reviews.length} Reviews)
                      </a>
                    </div>
                    {/* <div className="product-short-desc">
                      <ul className="list-type-check list-style-none">
                        {product.short_desc}
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
                    <div className="fix-bottom product-sticky-content sticky-content">
                      <ProgressBar visible={loading} />
                      <div className="product-form container">
                        <div className="product-qty-form">
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="number"
                              min={1}
                              max={10000000}
                              value={
                                currentProduct ? currentProduct.quantity : qty
                              }
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
                            onClick={() =>
                              addToCard(product, product.thumbnail_image)
                            }
                            disabled={loading}
                          >
                            <i className="w-icon-cart" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                      </div>
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

              <div className="tab tab-nav-boxed tab-nav-underline product-tabs">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      href="#product-tab-description"
                      className="nav-link active"
                    >
                      Description
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#product-tab-reviews" className="nav-link">
                      Customer Reviews ({reviews.length})
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="product-tab-description">
                    {parse(product.description)}
                  </div>

                  <div className="tab-pane" id="product-tab-reviews">
                    <UserReviews
                      getReviews={getReviews}
                      reviews={reviews}
                      product_id={product.id}
                    />
                  </div>
                </div>
              </div>

              <section className="related-product-section">
                <div className="title-link-wrapper mb-4">
                  <h4 className="title">Related Products</h4>
                  {/* <a
                    href="#"
                    className="btn btn-dark btn-link btn-slide-right btn-icon-right"
                  >
                    More Products
                    <i className="w-icon-long-arrow-right" />
                  </a> */}
                </div>
                <RelatedProducts product_id={product.id} />
              </section>
            </div>
            {/* End of Main Content */}
            <aside className="sidebar product-sidebar sidebar-fixed right-sidebar sticky-sidebar-wrapper">
              <div className="sidebar-overlay" />
              <a className="sidebar-close" href="#">
                <i className="close-icon" />
              </a>
              {/* <a href="#" className="sidebar-toggle d-flex d-lg-none">
                <i className="fas fa-chevron-left" />
              </a> */}
              <div className="sidebar-content scrollable">
                <div className="sticky-sidebar">
                  <div className="widget widget-icon-box mb-6">
                    <div className="icon-box icon-box-side">
                      <span className="icon-box-icon text-dark">
                        <i className="w-icon-truck" />
                      </span>
                      <div className="icon-box-content">
                        <h4 className="icon-box-title">
                          Free Shipping &amp; Returns
                        </h4>
                        <p>For all orders over $99</p>
                      </div>
                    </div>
                    <div className="icon-box icon-box-side">
                      <span className="icon-box-icon text-dark">
                        <i className="w-icon-bag" />
                      </span>
                      <div className="icon-box-content">
                        <h4 className="icon-box-title">Secure Payment</h4>
                        <p>We ensure secure payment</p>
                      </div>
                    </div>
                    <div className="icon-box icon-box-side">
                      <span className="icon-box-icon text-dark">
                        <i className="w-icon-money" />
                      </span>
                      <div className="icon-box-content">
                        <h4 className="icon-box-title">Money Back Guarantee</h4>
                        <p>Any back within 30 days</p>
                      </div>
                    </div>
                  </div>
                  {/* End of Widget Icon Box */}
                  <div className="widget widget-banner mb-9">
                    <div className="banner banner-fixed br-sm">
                      <figure>
                        <img
                          src="assets/images/shop/banner3.jpg"
                          alt="Banner"
                          width={266}
                          height={220}
                          style={{ backgroundColor: "#1D2D44" }}
                        />
                      </figure>
                      <div className="banner-content">
                        <div className="banner-price-info font-weight-bolder text-white lh-1 ls-25">
                          40<sup className="font-weight-bold">%</sup>
                          <sub className="font-weight-bold text-uppercase ls-25">
                            Off
                          </sub>
                        </div>
                        <h4 className="banner-subtitle text-white font-weight-bolder text-uppercase mb-0">
                          Ultimate Sale
                        </h4>
                      </div>
                    </div>
                  </div>
                  {/* End of Widget Banner */}
                  <div className="widget widget-products">
                    <div className="title-link-wrapper mb-2">
                      <h4 className="title title-link font-weight-bold">
                        More Products
                      </h4>
                    </div>
                    <div className=" nav-top">
                      {moreLoading ? (
                        <>
                          <div className="product product-widget">
                            <figure className="product-media">
                              <Skeleton width={100} height={113} />
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Skeleton />
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                <Skeleton />
                              </div>
                            </div>
                          </div>
                          <div className="product product-widget">
                            <figure className="product-media">
                              <Skeleton width={100} height={113} />
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Skeleton />
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                <Skeleton />
                              </div>
                            </div>
                          </div>
                          <div className="product product-widget">
                            <figure className="product-media">
                              <Skeleton width={100} height={113} />
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Skeleton />
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                <Skeleton />
                              </div>
                            </div>
                          </div>
                          <div className="product product-widget">
                            <figure className="product-media">
                              <Skeleton width={100} height={113} />
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Skeleton />
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                <Skeleton />
                              </div>
                            </div>
                          </div>
                          <div className="product product-widget">
                            <figure className="product-media">
                              <Skeleton width={100} height={113} />
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Skeleton />
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                <Skeleton />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : moreProduct.length ? (
                        moreProduct.map((v) => (
                          <div className="product product-widget" key={v.id}>
                            <figure className="product-media">
                              <Link href={`/product/${v.slug}`}>
                                <a>
                                  <img
                                    src={imgPath + v.thumbnail_image}
                                    alt="Product"
                                    width={100}
                                    height={113}
                                  />
                                </a>
                              </Link>
                            </figure>
                            <div className="product-details">
                              <h4 className="product-name">
                                <Link href={`/product/${v.slug}`}>
                                  <a>{v.name}</a>
                                </Link>
                              </h4>
                              <div className="ratings-container">
                                <div className="ratings-full">
                                  <span
                                    className="ratings"
                                    style={{ width: `${v.rating * 10}%` }}
                                  />
                                  <span className="tooltiptext tooltip-top" />
                                </div>
                              </div>
                              <div className="product-price">
                                {v.base_price}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            {/* End of Sidebar */}
          </div>
        </div>
      </div>
      {/* End of Page Content */}
    </div>
  );
}

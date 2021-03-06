import React, { useContext, useState } from "react";
import Link from "next/link";
import AppContext from "../../../storeData/AppContext";
import { imgPath } from "../../../pages/api/client";
import { useRouter } from "next/router";
import { remove } from "../../cart/updateCart";
import ProgressBar from "../../ProgressBar";

export default function MenuBar() {
  const {
    dispatch,
    state: { cartData, category, siteData },
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const closeCart = () => {
    document
      .querySelector(
        "div.header-middle > div > div > div > div.dropdown-box > div.cart-header > a.btn-close"
      )
      .click();
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

  let totalAmount = 0;
  cartData.map((v) => {
    //const price = v.price.substring(1);
    totalAmount = totalAmount + v.quantity * Number(v.price);
  });
  const route = useRouter();

  const getSearchData = (e) => {
    e.preventDefault();

    const catId = e.target[0].value;
    const searchText = e.target[1].value;
    if (catId != 0) {
      route.push(`/products?search=${searchText}&categories=${catId}`);
    } else {
      route.push(`/products?search=${searchText}`);
    }
  };

  // about_us_description: null
  // contact_address: "Mirpur Dhaka"
  // contact_email: "support@shahtechnology.com"
  // footer_logo: "116"
  // meta_description: null
  // meta_image: "116"
  // meta_keywords: null
  // meta_title: "123"
  // site_icon: "116"
  // site_motto: "Shopsbd Mart"
  // website_name: "Shopsbd Mart1"
  return (
    <div className="header-middle">
      <div className="container">
        <div className="header-left mr-md-4">
          <a
            href="#"
            className="mobile-menu-toggle  w-icon-hamburger"
            aria-label="menu-toggle"
          ></a>

          <Link href="/">
            <a className="logo ml-lg-0">
              <img src={imgPath + siteData.logo} alt="logo" width={245} />
            </a>
          </Link>
          <form
            onSubmit={getSearchData}
            className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper"
          >
            <div className="select-box">
              <select id="category" name="category">
                <option value={0}>All Categories</option>
                {category
                  .filter((v) => v.parent_id == 0)
                  .map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="text"
              className="form-control"
              name="search"
              id="search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-search" type="submit">
              <i className="w-icon-search" />
            </button>
          </form>
        </div>
        <div className="header-right ml-4">
          <div className="header-call d-xs-show d-lg-flex align-items-center">
            <a href="tel:#" className="w-icon-call" />
            <div className="call-info d-lg-show">
              {/* <h4 className="chat font-weight-normal font-size-md text-normal ls-normal text-light mb-0">
                <a href="mailto:#" className="text-capitalize">
                  Live Chat
                </a>{" "}
                or :
              </h4> */}
              <a
                href={"tel:" + siteData.contact_phone}
                className="phone-number font-weight-bolder ls-50"
              >
                {siteData.contact_phone}
              </a>
            </div>
          </div>
          <Link href="/wishlist">
            <a className="wishlist label-down link d-xs-show" href="">
              <i className="w-icon-heart" />
              <span className="wishlist-label d-lg-show">Wishlist</span>
            </a>
          </Link>

          <div className="dropdown cart-dropdown cart-offcanvas mr-0 mr-lg-2">
            <div className="cart-overlay" />
            <a href="#" className="cart-toggle label-down link">
              <i className="w-icon-cart">
                {cartData.length ? (
                  <span className="cart-count">{cartData.length}</span>
                ) : null}
              </i>
              <span className="cart-label">Cart</span>
            </a>
            <div className="dropdown-box">
              <div className="cart-header">
                <span>Shopping Cart</span>
                <a href="#" className="btn-close">
                  Close
                  <i className="w-icon-long-arrow-right" />
                </a>
              </div>
              <ProgressBar visible={loading} />
              <div className="products">
                {cartData.length
                  ? cartData.map((v) => (
                      <>
                        <div className="product product-cart" key={v.id}>
                          <div className="product-detail">
                            <Link href={`/product/${v.slug}`}>
                              <a href="" className="product-name">
                                {v.product_name}
                              </a>
                            </Link>
                            <div className="price-box">
                              <span className="product-quantity">
                                {v.quantity}
                              </span>
                              <span className="product-price">
                                {v.currency_symbol}
                                {v.price}
                              </span>
                            </div>
                          </div>
                          <figure className="product-media">
                            <Link href={`/product/${v.slug}`}>
                              <a href="">
                                <img
                                  src={imgPath + v.product_thumbnail_image}
                                  alt="product"
                                  height={84}
                                  width={94}
                                />
                              </a>
                            </Link>
                          </figure>
                          <button
                            className="btn btn-link btn-close"
                            onClick={() => removeToCart(v.id)}
                            disabled={loading}
                          >
                            <i className="fas fa-times" />
                          </button>
                        </div>
                      </>
                    ))
                  : null}
              </div>
              <div className="cart-total">
                <label>Subtotal:</label>
                <span className="price">{totalAmount + ".00"}</span>
              </div>
              <div className="cart-action" style={{ paddingBottom: "120px" }}>
                <Link href="/cart">
                  <a
                    onClick={closeCart}
                    className="btn btn-dark btn-outline btn-rounded"
                  >
                    View Cart
                  </a>
                </Link>
                <Link href="/checkout">
                  <a
                    onClick={closeCart}
                    className="btn btn-primary  btn-rounded"
                  >
                    Checkout
                  </a>
                </Link>
              </div>
            </div>
            {/* End of Dropdown Box */}
          </div>
        </div>
      </div>
    </div>
  );
}

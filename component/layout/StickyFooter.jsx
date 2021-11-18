import React, { useContext } from "react";
import AppContext from "../../storeData/AppContext";

export default function StickyFooter() {
  const {
    state: { cartData },
  } = useContext(AppContext);
  const showCart = () => {
    document
      .querySelector(
        "div.header-middle > div > div.header-right> div.dropdown > a"
      )
      .click();
  };
  return (
    <div className="sticky-footer sticky-content fix-bottom">
      <a href="demo1.html" className="sticky-link active">
        <i className="w-icon-home" />
        <p>Home</p>
      </a>
      <a href="shop-banner-sidebar.html" className="sticky-link">
        <i className="w-icon-category" />
        <p>Shop</p>
      </a>
      <a href="my-account.html" className="sticky-link">
        <i className="w-icon-account" />
        <p>Account</p>
      </a>

      <a onClick={showCart} className="sticky-link">
        <i className="w-icon-cart cart-dropdown">
          {cartData.length ? (
            <span className="cart-count">{cartData.length}</span>
          ) : null}
        </i>
        <p>Cart</p>
      </a>

      <div className="header-search hs-toggle dir-up">
        <a href="#" className="search-toggle sticky-link">
          <i className="w-icon-search" />
          <p>Search</p>
        </a>
        <form action="#" className="input-wrapper">
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            placeholder="Search"
            required
          />
          <button className="btn btn-search" type="submit">
            <i className="w-icon-search" />
          </button>
        </form>
      </div>
    </div>
  );
}

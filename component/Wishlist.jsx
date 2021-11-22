import React, { useContext } from "react";

import Link from "next/link";
import AppContext from "../storeData/AppContext";
import { imgPath } from "../pages/api/client";

export default function Wishlist() {
  const {
    dispatch,
    state: { whishlist },
  } = useContext(AppContext);
  return (
    <main className="main wishlist-page">
      {/* Start of Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title mb-0">Wishlist</h1>
        </div>
      </div>
      {/* End of Page Header */}
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav mb-10">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="demo1.html">Home</a>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of PageContent */}
      <div className="page-content">
        <div className="container">
          <h3 className="wishlist-title">My wishlist</h3>
          <table className="shop-table wishlist-table">
            <thead>
              <tr>
                <th className="product-name">
                  <span>Product</span>
                </th>
                <th />
                <th className="product-price">
                  <span>Price</span>
                </th>
                <th className="product-stock-status">
                  <span>Stock Status</span>
                </th>
                <th className="wishlist-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {whishlist.map((v) => (
                <tr>
                  <td className="product-thumbnail">
                    <div className="p-relative">
                      <Link href={`/product/${v.slug}`}>
                        <figure>
                          <img
                            src={imgPath + v.image}
                            alt="product"
                            width={300}
                            height={338}
                          />
                        </figure>
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-close"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_TO_WHISHLIST",
                            payload: { id: v.id },
                          })
                        }
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </td>
                  <td className="product-name">
                    <a href="product-default.html">{v.name}</a>
                  </td>
                  <td className="product-price">
                    <ins className="new-price">{v.price}</ins>
                  </td>
                  <td className="product-stock-status">
                    <span className="wishlist-in-stock">In Stock</span>
                  </td>
                  <td className="wishlist-action">
                    <div className="d-lg-flex">
                      <Link href={`/product/${v.slug}`}>
                        <a className="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0">
                          Quick View
                        </a>
                      </Link>
                      <Link href={`/product/${v.slug}`}>
                        <a className="btn btn-dark btn-rounded btn-sm ml-lg-2 btn-cart">
                          Add to cart
                        </a>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="social-links">
            <label>Share On:</label>
            <div className="social-icons social-no-color border-thin">
              <a
                href="#"
                className="social-icon social-facebook w-icon-facebook"
              />
              <a
                href="#"
                className="social-icon social-twitter w-icon-twitter"
              />
              <a
                href="#"
                className="social-icon social-pinterest w-icon-pinterest"
              />
              <a
                href="#"
                className="social-icon social-email far fa-envelope"
              />
              <a
                href="#"
                className="social-icon social-whatsapp fab fa-whatsapp"
              />
            </div>
          </div> */}
        </div>
      </div>
      {/* End of PageContent */}
    </main>
  );
}

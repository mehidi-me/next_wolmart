import Link from "next/link";
import React, { useContext, useState } from "react";
import { imgPath } from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";
import ProgressBar from "../ProgressBar";
import { remove, update } from "./updateCart";

export default function Cart() {
  const {
    dispatch,
    state: { cartData },
  } = useContext(AppContext);
  let totalAmount = 0;
  cartData.map((v) => {
    //const price = v.price.substring(1);
    totalAmount = totalAmount + v.quantity * v.price;
  });

  const [loading, setLoading] = useState({});

  const removeToCart = async (id) => {
    try {
      setLoading({ id, load: true });
      await remove(id, dispatch);
    } catch (error) {
      console.log(error);
    }

    setLoading({ id, load: false });
  };

  const updateQty = async (type, payload, currentProduct) => {
    setLoading({ id: currentProduct.id, load: true });
    try {
      await update(type, payload, currentProduct, dispatch);
    } catch (error) {
      console.log(error);
    }
    setLoading({ id: currentProduct.id, load: false });
  };

  // const clearCart = async () => {
  //   await cartData.map(async (v) => {
  //     await removeToCart(v.id);
  //   });

  //   dispatch({ type: "CLEAR_CART" });
  // };

  return (
    <main className="main cart">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no">
            <li className="active">
              <a>Shopping Cart</a>
            </li>
            <li>
              <Link href="/checkout">
                <a>Checkout</a>
              </Link>
            </li>
            <li>
              <a>Order Complete</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of PageContent */}
      <div className="page-content">
        <div className="container">
          <div className="row gutter-lg mb-10">
            <div className="col-lg-8 pr-lg-4 mb-6">
              <table className="shop-table cart-table">
                <thead>
                  <tr>
                    <th className="product-name">
                      <span>Product</span>
                    </th>
                    <th />
                    <th className="product-price">
                      <span>Price</span>
                    </th>
                    <th className="product-quantity">
                      <span>Quantity</span>
                    </th>
                    <th className="product-subtotal">
                      <span>Subtotal</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((v) => (
                    <>
                      {loading.id == v.id ? (
                        <ProgressBar visible={loading.load} />
                      ) : null}
                      <tr>
                        <td className="product-thumbnail">
                          <div className="p-relative">
                            <Link href={`/product/${v.slug}`}>
                              <a href="">
                                <figure>
                                  <img
                                    src={imgPath + v.product_thumbnail_image}
                                    alt="product"
                                    width={300}
                                    height={338}
                                  />
                                </figure>
                              </a>
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-close"
                              onClick={() => removeToCart(v.id)}
                              disabled={loading.load}
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        </td>
                        <td className="product-name">
                          <Link href={`/product/${v.slug}`}>
                            <a href="">{v.product_name}</a>
                          </Link>
                        </td>
                        <td className="product-price">
                          <span className="amount">৳{v.price}</span>
                        </td>
                        <td className="product-quantity">
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="number"
                              min={1}
                              max={100000}
                              value={v.quantity}
                            />
                            <button
                              className="w-icon-plus"
                              onClick={() =>
                                updateQty(
                                  "in",
                                  {
                                    type: "INCREASE_QTY",
                                    payload: { id: v.product_id },
                                  },
                                  v
                                )
                              }
                              disabled={loading.load}
                            />
                            <button
                              className="w-icon-minus"
                              onClick={() =>
                                updateQty(
                                  "de",
                                  {
                                    type: "DECREASE_QTY",
                                    payload: { id: v.product_id },
                                  },
                                  v
                                )
                              }
                              disabled={loading.load}
                            />
                          </div>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">
                            ৳{v.price * v.quantity}
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="cart-action mb-6">
                <Link href="/">
                  <a className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto">
                    <i className="w-icon-long-arrow-left" />
                    Continue Shopping
                  </a>
                </Link>
                {/* <button
                  type="submit"
                  className="btn btn-rounded btn-default btn-clear"
                  name="clear_cart"
                  value="Clear Cart"
                  onClick={clearCart}
                >
                  Clear Cart
                </button> */}
              </div>
            </div>
            <div className="col-lg-4 sticky-sidebar-wrapper">
              <div className="pin-wrapper" style={{ height: "788.969px" }}>
                <div
                  className="sticky-sidebar"
                  style={{
                    borderBottom: "0px none rgb(102, 102, 102)",
                    width: "383.641px",
                  }}
                >
                  <div className="cart-summary mb-4">
                    <h3 className="cart-title text-uppercase">Cart Totals</h3>

                    <hr className="divider mb-6" />
                    <div className="order-total d-flex justify-content-between align-items-center">
                      <label>Total</label>
                      <span className="ls-50">৳{totalAmount}</span>
                    </div>
                    <Link href="/checkout">
                      <a className="btn btn-block btn-dark btn-icon-right btn-rounded  btn-checkout">
                        Proceed to checkout
                        <i className="w-icon-long-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of PageContent */}
    </main>
  );
}

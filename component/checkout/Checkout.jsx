import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import client from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";
import CheckoutLoading from "./CheckoutLoading";
import ProgressBar from "../ProgressBar";
import withAuth from "../auth/withAuth";

const Checkout = () => {
  const route = useRouter();
  const {
    dispatch,
    state: { user, cartData },
  } = useContext(AppContext);
  const [address, setAddress] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    shippingCost: {},
    summary: {},
  });

  const [pmethod, setPmethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [oLoading, setoLoading] = useState(false);
  const [cLoading, setcLoading] = useState(false);

  const updateaddressincart = async (address_id) => {
    try {
      const body = {
        user_id: localStorage.getItem("uid"),
        address_id,
      };
      const res = await fetch(client + "update-address-in-cart", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      const data = await res.json();

      if (data.result) {
        return true;
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  const getCartSummary = async () => {
    try {
      const res = await fetch(
        client + "cart-summary/" + localStorage.getItem("uid") + "/0"
      );
      const data = await res.json();
      console.log("cardSummary", data);
      if (data.grand_total_value) {
        return data;
      } else {
        route.push("/");
        toast.warning("Your cart is empty add some product");
        localStorage.removeItem("cartdata");
        dispatch({ type: "SET_CART_DATA", payload: [] });
        return false;
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  const getShippingCost = async (city_name) => {
    try {
      const body = {
        user_id: localStorage.getItem("uid"),
        city_name,
      };
      const res = await fetch(client + "shipping_cost", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      const data = await res.json();
      console.log("summary", data);
      if (data.result) {
        const summary = await getCartSummary();
        if (summary) {
          setCartSummary({ shippingCost: data, summary });
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  const getAddress = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(client + "user/shipping/address/" + id);
      const data = await res.json();
      if (data.success) {
        if (data.data.length) {
          const defaultData = data.data.find((v) => v.set_default == 1);
          if (defaultData) {
            setAddress(defaultData);
            await updateaddressincart(defaultData.id);
            await getShippingCost(defaultData.city);
          } else {
            setAddress(data.data[0]);
            await updateaddressincart(data.data[0].id);
            await getShippingCost(data.data[0].city);
          }
        } else {
          toast.warning("Add your shipping address");
          route.push({
            pathname: "/user/address/add",
            query: { pathname: "/checkout" },
          });
        }
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
    setLoading(false);
  };

  const placeOrder = async () => {
    setoLoading(true);
    try {
      const body = {
        token_id: localStorage.getItem("uid"),
        user_id: user.id,
        payment_type: "cash_on_delivery",
      };
      const res = await fetch(client + "order/store", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      const data = await res.json();

      if (data.result) {
        toast.success(data.message);
        localStorage.removeItem("cartdata");
        dispatch({ type: "SET_CART_DATA", payload: [] });
        route.push({ pathname: "/order", query: { id: data.order_id } });
      } else {
        toast.error("Something wrong try again!");
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
    setoLoading(false);
  };

  const couponSubmit = async (e) => {
    e.preventDefault();
    const code = e.target[0].value;
    if (code) {
      setcLoading(true);
      try {
        const body = {
          user_id: localStorage.getItem("uid"),
          id: user.id,
          coupon_code: code,
        };
        const res = await fetch(client + "coupon-apply", {
          method: "post",
          body: JSON.stringify(body),
          mode: "cors",
          headers: { "Content-type": "application/json;charset=utf-8" },
        });
        const data = await res.json();
        console.log(data);
        if (data.result) {
          toast.success(data.message);
          getAddress(user.id);
        } else {
          if (data.message) {
            toast.error(data.message);
          } else {
            toast.error("Something wrong try again!");
          }
        }
        //   console.log(data);
      } catch (error) {
        console.log(error);
        toast.error("Something wrong try again!");
      }
      setcLoading(false);
    } else {
      toast.warning("Enter coupon code!");
    }
  };

  const removeCoupon = async () => {
    try {
      const body = {
        user_id: localStorage.getItem("uid"),
      };
      const res = await fetch(client + "coupon-remove", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      const data = await res.json();

      if (data.result) {
        toast.success(data.message);
        getAddress(user.id);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
  };
  useEffect(() => {
    if (user) {
      if (user.id) {
        getAddress(user.id);
      }
    }
  }, [user]);
  return (
    <main className="main checkout">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no">
            <li className="passed">
              <a>Shopping Cart</a>
            </li>
            <li className="active">
              <a>Checkout</a>
            </li>
            <li>
              <a>Order Complete</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of PageContent */}
      {loading ? (
        <CheckoutLoading />
      ) : (
        <div className="page-content">
          <div className="container">
            <div className="row mb-9">
              <div
                className="col-lg-7 pr-lg-4 mb-4"
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h3 className="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">
                    Your Shipping Address
                  </h3>
                  <p className="mb-0">
                    {address.address}
                    {", "}
                    {address.country}
                    {" - "}
                    {address.city}
                    {", "}
                    {address.phone}
                    <button
                      disabled={cLoading || oLoading}
                      onClick={() => route.push("/user/address")}
                      className="btn btn-dark btn-rounded ml-5"
                    >
                      Change Address
                    </button>
                  </p>

                  <div className="mt-10" style={{ width: "100%" }}>
                    <form className="coupon" onSubmit={couponSubmit}>
                      <h5 className="title coupon-title font-weight-bold text-uppercase">
                        Coupon Discount
                      </h5>
                      <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Enter coupon code here..."
                        required
                        name="coupon"
                      />
                      <div
                        style={{ position: "relative", marginBottom: "10px" }}
                      >
                        <ProgressBar visible={cLoading} />
                      </div>
                      <button
                        disabled={oLoading || cLoading}
                        className="btn btn-dark btn-outline btn-rounded"
                      >
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 mb-4 sticky-sidebar-wrapper">
                <div className="pin-wrapper" style={{ height: "892.031px" }}>
                  <div
                    className="order-summary-wrapper sticky-sidebar"
                    style={{
                      borderBottom: "1px solid rgb(238, 238, 238)",
                    }}
                  >
                    <h3 className="title text-uppercase ls-10">Your Order</h3>
                    <div className="order-summary">
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th colSpan={2}>
                              <b>Product</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartData.length
                            ? cartData.map((v) => (
                                <tr className="bb-no">
                                  <td className="product-name">
                                    {v.product_name}
                                    <i className="fas fa-times" />{" "}
                                    <span className="product-quantity">
                                      {v.quantity}
                                    </span>
                                  </td>
                                  <td className="product-total">
                                    {v.currency_symbol}
                                    {v.price}
                                  </td>
                                </tr>
                              ))
                            : null}

                          <tr className="cart-subtotal bb-no">
                            <td>
                              <b>Subtotal</b>
                            </td>
                            <td>
                              <b>{cartSummary.summary.sub_total}</b>
                            </td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr className="shipping-methods">
                            {/* <td colSpan={2} className="text-left">
                              <h4 className="title title-simple bb-no mb-1 pb-0 pt-3">
                                Shipping
                              </h4>
                              <ul id="shipping-method" className="mb-4">
                                <li>
                                  <div className="custom-radio">
                                    <input
                                      type="radio"
                                      id="free-shipping"
                                      className="custom-control-input"
                                      name="shipping"
                                    />
                                    <label
                                      htmlFor="free-shipping"
                                      className="custom-control-label color-dark"
                                    >
                                      Free Shipping
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="custom-radio">
                                    <input
                                      type="radio"
                                      id="local-pickup"
                                      className="custom-control-input"
                                      name="shipping"
                                    />
                                    <label
                                      htmlFor="local-pickup"
                                      className="custom-control-label color-dark"
                                    >
                                      Local Pickup
                                    </label>
                                  </div>
                                </li>
                                <li>
                                  <div className="custom-radio">
                                    <input
                                      type="radio"
                                      id="flat-rate"
                                      className="custom-control-input"
                                      name="shipping"
                                    />
                                    <label
                                      htmlFor="flat-rate"
                                      className="custom-control-label color-dark"
                                    >
                                      Flat rate: $5.00
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </td> */}
                          </tr>
                          <tr className="bb-no">
                            <td className="product-name text-primary">
                              Shipping Fee
                            </td>
                            <td className="product-total">
                              {cartSummary.summary.shipping_cost}
                            </td>
                          </tr>
                          <tr className="bb-no">
                            <td className="product-name text-primary">
                              {"Vat & Tax"}
                            </td>
                            <td className="product-total">
                              {cartSummary.summary.tax}
                            </td>
                          </tr>

                          {cartSummary.summary.coupon_applied ? (
                            <tr className="bb-no">
                              <td className="product-name text-primary">
                                <b style={{ color: "green" }}>
                                  COUPON: {cartSummary.summary.coupon_code}
                                </b>
                              </td>
                              <td className="product-total">
                                <a
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={removeCoupon}
                                >
                                  [Remove]
                                </a>
                              </td>
                            </tr>
                          ) : null}
                          <tr className="bb-no">
                            <td className="product-name text-primary">
                              Discount
                            </td>
                            <td className="product-total">
                              {"- "}
                              {cartSummary.summary.discount}
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>
                              <b>Total</b>
                            </th>
                            <td>
                              <b>{cartSummary.summary.grand_total}</b>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="payment-methods" id="payment_method">
                        <h4 className="title font-weight-bold ls-25 pb-0 mb-1">
                          Payment Methods
                        </h4>
                        <div className="accordion payment-accordion">
                          <div className="card">
                            <div className="card-header">
                              <a
                                onClick={() => setPmethod("c")}
                                className={
                                  pmethod == "c" ? "collapse" : "expand"
                                }
                              >
                                Cash on delivery
                              </a>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <a
                                onClick={() => setPmethod("b")}
                                className={
                                  pmethod == "b" ? "collapse" : "expand"
                                }
                              >
                                Pay With Bkash
                              </a>
                            </div>
                            <div
                              className={
                                pmethod == "b"
                                  ? "card-body expanded"
                                  : "card-body collapse"
                              }
                              style={
                                pmethod == "b"
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p className="mb-0">
                                Please send a check to Store Name, Store Street,
                                Store Town, Store State / County, Store
                                Postcode.
                              </p>
                              <form className="mt-4 pl-5">
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder="Enter Bkash Number"
                                  required
                                  name="number-b"
                                />
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder="Enter Transaction ID"
                                  required
                                  name="t-id"
                                />
                                <button className="btn btn-dark  btn-rounded">
                                  Pay
                                </button>
                              </form>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header">
                              <a
                                onClick={() => setPmethod("n")}
                                className={
                                  pmethod == "n" ? "collapse" : "expand"
                                }
                              >
                                Pay With Nogod
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group place-order pt-6">
                        <button
                          onClick={placeOrder}
                          className={
                            oLoading
                              ? "btn btn-dark btn-block btn-rounded disabled"
                              : "btn btn-dark btn-block btn-rounded"
                          }
                          disabled={oLoading || loading || cLoading}
                        >
                          Place Order
                        </button>
                        <div style={{ position: "relative" }}>
                          <ProgressBar visible={oLoading} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End of PageContent */}
    </main>
  );
};

export default withAuth(Checkout);

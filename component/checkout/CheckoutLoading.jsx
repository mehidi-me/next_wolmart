import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CheckoutLoading() {
  return (
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
              <p className="mb-0" style={{ width: "100%" }}>
                <Skeleton height={50} />
              </p>

              <div className="mt-10" style={{ width: "100%" }}>
                <Skeleton height={50} />
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
                      <tr className="bb-no">
                        <Skeleton height={20} />
                      </tr>
                      <tr className="bb-no">
                        <Skeleton height={20} />
                      </tr>
                      <tr className="cart-subtotal bb-no">
                        <Skeleton height={20} />
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="shipping-methods">
                        <Skeleton height={50} />
                      </tr>
                      <tr className="order-total">
                        <Skeleton />
                      </tr>
                    </tfoot>
                  </table>
                  <div className="payment-methods" id="payment_method">
                    <h4 className="title font-weight-bold ls-25 pb-0 mb-1">
                      Payment Methods
                    </h4>

                    <div className="card">
                      <div className="card-header">
                        <a href="#delivery" className="expand">
                          Cash on delivery
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group place-order pt-6">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block btn-rounded disabled"
                    disabled
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

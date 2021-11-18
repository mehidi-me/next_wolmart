import React from "react";
import OrderDetails from "../OrderDetails";

export default function UserOrderDetails() {
  return (
    <div className=" mb-4" id="account-orders">
      <div className="icon-box icon-box-side icon-box-light">
        <span className="icon-box-icon icon-orders">
          <i className="w-icon-orders" />
        </span>
        <div className="icon-box-content">
          <h4 className="icon-box-title text-capitalize ls-normal mb-0">
            Order Details
          </h4>
        </div>
      </div>

      <OrderDetails />
    </div>
  );
}

import React from "react";
import Skeleton from "react-loading-skeleton";

export default function OrderCompletLoading() {
  return (
    <>
      <ul className="order-view list-style-none">
        <li>
          <label>Order number</label>
          <strong>
            <Skeleton width={100} height={50} />
          </strong>
        </li>
        <li>
          <label>Status</label>
          <strong>
            <Skeleton width={100} height={50} />
          </strong>
        </li>
        <li>
          <label>Date</label>
          <strong>
            <Skeleton width={100} height={50} />
          </strong>
        </li>
        <li>
          <label>Total</label>
          <strong>
            <Skeleton width={100} height={50} />
          </strong>
        </li>
        <li>
          <label>Payment method</label>
          <strong>
            <Skeleton width={100} height={50} />
          </strong>
        </li>
      </ul>
      {/* End of Order View */}
      <div className="order-details-wrapper mb-5">
        <h4 className="title text-uppercase ls-25 mb-5">Order Details</h4>
        <table className="order-table">
          <thead>
            <tr>
              <th className="text-dark">Product</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <Skeleton />
            </tr>
            <tr>
              <Skeleton />
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <Skeleton />
            </tr>
            <tr>
              <Skeleton />
            </tr>
            <tr>
              <Skeleton />
            </tr>
            <tr className="total">
              <Skeleton />
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

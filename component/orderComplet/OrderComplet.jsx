import Link from "next/link";
import React from "react";
import withAuth from "../auth/withAuth";
import OrderDetails from "../OrderDetails";

const OrderComplet = () => {
  return (
    <main className="main order">
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb shop-breadcrumb bb-no">
            <li className="passed">
              <Link href="/cart">
                <a>Shopping Cart</a>
              </Link>
            </li>
            <li className="passed">
              <a>Checkout</a>
            </li>
            <li className="active">
              <a>Order Complete</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of PageContent */}
      <div className="page-content mb-10 pb-2">
        <div className="container">
          <div className="order-success text-center font-weight-bolder text-dark">
            <i className="fas fa-check" />
            Thank you. Your order has been received.
          </div>
          <OrderDetails />
        </div>
      </div>
      {/* End of PageContent */}
    </main>
  );
};

export default withAuth(OrderComplet);

import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../../storeData/AppContext";

export default function UserDashboard() {
  const {
    dispatch,
    state: { user },
  } = useContext(AppContext);
  return (
    <div className="tab-pane active in" id="account-dashboard">
      <p className="greeting">
        Hello
        <span className="text-dark font-weight-bold">
          {user ? ` ${user.name}` : null}
        </span>
      </p>
      <p className="mb-4">
        From your account dashboard you can view your{" "}
        <Link href="/user/orders">
          <a className="text-primary link-to-tab">recent orders</a>
        </Link>
        , manage your{" "}
        <Link href="/user/address">
          <a className="text-primary link-to-tab">shipping addresses</a>
        </Link>
        , and{" "}
        <Link href="/user/account">
          <a className="text-primary link-to-tab">
            edit your password and account details.
          </a>
        </Link>
      </p>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <Link href="/user/orders">
            <a className="link-to-tab">
              <div className="icon-box text-center">
                <span className="icon-box-icon icon-orders">
                  <i className="w-icon-orders" />
                </span>
                <div className="icon-box-content">
                  <p className="text-uppercase mb-0">Orders</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        {/* <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <a href="#account-downloads" className="link-to-tab">
            <div className="icon-box text-center">
              <span className="icon-box-icon icon-download">
                <i className="w-icon-download" />
              </span>
              <div className="icon-box-content">
                <p className="text-uppercase mb-0">Downloads</p>
              </div>
            </div>
          </a>
        </div> */}
        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <Link href="/user/address">
            <a className="link-to-tab">
              <div className="icon-box text-center">
                <span className="icon-box-icon icon-address">
                  <i className="w-icon-map-marker" />
                </span>
                <div className="icon-box-content">
                  <p className="text-uppercase mb-0">Addresses</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <Link href="/user/account">
            <a className="link-to-tab">
              <div className="icon-box text-center">
                <span className="icon-box-icon icon-account">
                  <i className="w-icon-user" />
                </span>
                <div className="icon-box-content">
                  <p className="text-uppercase mb-0">Account Details</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <Link href="/wishlist">
            <a className="link-to-tab">
              <div className="icon-box text-center">
                <span className="icon-box-icon icon-wishlist">
                  <i className="w-icon-heart" />
                </span>
                <div className="icon-box-content">
                  <p className="text-uppercase mb-0">Wishlist</p>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
          <a onClick={() => dispatch({ type: "LOG_OUT" })}>
            <div className="icon-box text-center">
              <span className="icon-box-icon icon-logout">
                <i className="w-icon-logout" />
              </span>
              <div className="icon-box-content">
                <p className="text-uppercase mb-0">Logout</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

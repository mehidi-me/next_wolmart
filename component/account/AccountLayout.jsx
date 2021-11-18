import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import withAuth from "../auth/withAuth";
import AppContext from "../../storeData/AppContext";

const AccountLayout = ({ children }) => {
  const { pathname } = useRouter();
  const { dispatch } = useContext(AppContext);

  return (
    <main className="main my-account">
      {/* Start of Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title mb-0">My Account</h1>
        </div>
      </div>
      {/* End of Page Header */}
      {/* Start of Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="demo1.html">Home</a>
            </li>
            <li>My account</li>
          </ul>
        </div>
      </nav>
      {/* End of Breadcrumb */}
      {/* Start of PageContent */}
      <div className="page-content pt-2">
        <div className="container">
          <div className="tab tab-vertical row gutter-lg">
            <ul className="nav nav-tabs mb-6" role="tablist">
              <li className="nav-item">
                <Link href="/user/dashboard">
                  <a
                    href=""
                    className={
                      pathname == "/user/dashboard"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/user/orders">
                  <a
                    href=""
                    className={
                      pathname == "/user/orders" ||
                      pathname == "/user/orderdetails"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Orders
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/user/address">
                  <a
                    href=""
                    className={
                      pathname.startsWith("/user/address")
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Addresses
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/user/account">
                  <a
                    href=""
                    className={
                      pathname == "/user/account"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Account details
                  </a>
                </Link>
              </li>
              <li className="link-item">
                <Link href="/wishlist">
                  <a>Wishlist</a>
                </Link>
              </li>
              <li className="link-item">
                <a onClick={() => dispatch({ type: "LOG_OUT" })}>Logout</a>
              </li>
            </ul>
            <div className="tab-content mb-6">{children}</div>
          </div>
        </div>
      </div>

      {/* End of PageContent */}
    </main>
  );
};

export default withAuth(AccountLayout);

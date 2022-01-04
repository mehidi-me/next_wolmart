import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../storeData/AppContext";

export default function TopBar() {
  const {
    dispatch,
    state: { user },
  } = useContext(AppContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <p className="welcome-msg">Welcome to Shopsbd mart!</p>
        </div>
        <div className="header-right">
          {user ? (
            <Link href="/user/dashboard">
              <a href="" className="d-lg-show">
                <i className="w-icon-account" />
                {user.name}
              </a>
            </Link>
          ) : null}

          {user ? (
            <a
              className="d-lg-show"
              onClick={() => dispatch({ type: "LOG_OUT" })}
            >
              <b>Logout</b>
            </a>
          ) : (
            <>
              <Link href="/login">
                <a className="d-lg-show">
                  <i className="w-icon-account" />
                  Sign In
                </a>
              </Link>
              <span className="delimiter d-lg-show">/</span>

              <Link href="/signup">
                <a href="" className="ml-0 d-lg-show">
                  Register
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../../../storeData/AppContext";

export default function MobileMenu() {
  const {
    state: { category },
  } = useContext(AppContext);
  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" />
      {/* End of .mobile-menu-overlay */}
      <a href="#" className="mobile-menu-close">
        <i className="close-icon" />
      </a>
      {/* End of .mobile-menu-close */}
      <div className="mobile-menu-container scrollable">
        {/* <form action="#" method="get" className="input-wrapper">
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            placeholder="Search"
            required
          />
          <button className="btn btn-search" type="submit">
            <i className="w-icon-search" />
          </button>
        </form> */}
        {/* End of Search Form */}
        <div className="tab">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a href="#categories" className="nav-link active">
                Categories
              </a>
            </li>
            {/* <li className="nav-item">
              <a href="#main-menu" className="nav-link">
                Main Menu
              </a>
            </li> */}
          </ul>
        </div>
        <ul className="mobile-menu">
          {category.length
            ? category
                .filter((v) => v.parent_id == 0)
                .map((data) => (
                  <li>
                    <Link href={"/products?categories=" + data.id}>
                      <a
                        onClick={() =>
                          document
                            .querySelector("div.mobile-menu-wrapper > a > i")
                            .click()
                        }
                      >
                        <i className="w-icon-ruby" />
                        {data.name}
                      </a>
                    </Link>
                  </li>
                ))
            : null}
        </ul>
        <div className="tab-content">
          <div className="tab-pane" id="main-menu"></div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import React, { useContext } from "react";
import { imgPath } from "../../../pages/api/client";
import AppContext from "../../../storeData/AppContext";
import DropDownMenu from "./DropDownMenu";

export default function NavBar() {
  const {
    state: { category, subCategory, childCategory },
  } = useContext(AppContext);
  console.log(category);
  return (
    <div className="header-bottom sticky-content fix-top sticky-header has-dropdown">
      <div className="container" style={{ maxWidth: "5000px", width: "100%" }}>
        <div
          className="inner-wrap"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="header-left">
            <nav className="main-nav">
              <ul className="menu active-underline">
                <li className="active">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                {category && category.length
                  ? category
                      .filter((v) => v.parent_id == 0)
                      .map((v, key) => (
                        <DropDownMenu
                          classD={"dmenu" + key}
                          key={v.id}
                          id={v.id}
                          name={v.name}
                          img={imgPath + v.banner}
                          subCategory={category.filter(
                            (data) => data.parent_id == v.id
                          )}
                          childCategory={childCategory}
                        />
                      ))
                  : null}
              </ul>
            </nav>
          </div>
          {/* <div className="header-right">
            <a href="#" className="d-xl-show"><i className="w-icon-map-marker mr-1" />Track Order</a>
            <a href="#"><i className="w-icon-sale" />Daily Deals</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

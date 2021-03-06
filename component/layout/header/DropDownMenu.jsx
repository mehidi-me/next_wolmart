import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../storeData/AppContext";

export default function DropDownMenu({
  name,
  id,
  subCategory,
  childCategory,
  classD,
  img,
}) {
  // const [category, setCategory] = useState([]);
  const {
    state: { category },
  } = useContext(AppContext);

  return (
    <li>
      <Link href={"/products?categories=" + id}>
        <a>{name}</a>
      </Link>
      <ul className={"megamenu " + classD}>
        {subCategory.length
          ? subCategory.map((v) => (
              <li key={v.id}>
                <Link href={"/products?categories=" + v.id}>
                  <h4 className="menu-title">
                    <a>{v.name}</a>
                  </h4>
                </Link>
                <hr className="divider" />
                <ul>
                  {category
                    .filter((data) => data.parent_id == v.id)
                    .map((data) => (
                      <li key={data.id}>
                        <Link href={"/products?categories=" + data.id}>
                          <a>{data.name}</a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))
          : null}

        <li>
          <div className="banner-fixed menu-banner menu-banner2">
            <figure>
              <img src={img} alt="Menu Banner" width={235} height={347} />
            </figure>
            {/* <div className="banner-content">
              <div className="banner-price-info mb-1 ls-normal">
                Get up to
                <strong className="text-primary text-uppercase">20%Off</strong>
              </div>
              <h3 className="banner-title ls-normal">Hot Sales</h3>
              <a
                href="shop-banner-sidebar.html"
                className="btn btn-dark btn-sm btn-link btn-slide-right btn-icon-right"
              >
                Shop Now
                <i className="w-icon-long-arrow-right" />
              </a>
            </div> */}
          </div>
        </li>
      </ul>
    </li>
  );
}

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import client from "../pages/api/client";
import Link from "next/link";

export default function AllProducts({ name, id, subCategory }) {
  const [activeCat, setActiveCat] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getActiveCat = async (id) => {
    setLoading(true);
    setActiveCat(subCategory.find((v) => v.id == id));
    const res = await fetch(`${client}products/category/${id}`);
    const data = await res.json();
    setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (subCategory.length) {
      setActiveCat(subCategory[0]);

      getActiveCat(subCategory[0].id);
    }
  }, []);

  return (
    <div className="product-wrapper-1  mb-5">
      <div className="title-link-wrapper pb-1 mb-4">
        <h2 className="title ls-normal mb-0">{name}</h2>

        <Link href={"/products?categories=" + id}>
          <a className="font-size-normal font-weight-bold ls-25 mb-0">
            More Products
            <i className="w-icon-long-arrow-right" />
          </a>
        </Link>
      </div>
      <div
        className="tab tab-nav-boxed tab-nav-outline "
        style={{ margin: "25px auto" }}
      >
        <ul className="nav nav-tabs justify-content-center" role="tablist">
          {subCategory.map((data) => (
            <li className="nav-item mr-2 mb-2" key={data.id}>
              <a
                className={
                  data.id == activeCat.id
                    ? "nav-link active br-sm font-size-md ls-normal"
                    : "nav-link br-sm font-size-md ls-normal"
                }
                onClick={() => getActiveCat(data.id)}
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-4 mb-4">
          <div
            className="banner h-100 br-sm"
            style={{
              backgroundImage: "url(assets/images/demos/demo1/banners/2.jpg)",
              backgroundColor: "#ebeced",
            }}
          >
            <div className="banner-content content-top">
              <h5 className="banner-subtitle font-weight-normal mb-2">
                Weekend Sale
              </h5>
              <hr className="banner-divider bg-dark mb-2" />
              <h3 className="banner-title font-weight-bolder ls-25 text-uppercase">
                New Arrivals
                <br />{" "}
                <span className="font-weight-normal text-capitalize">
                  Collection
                </span>
              </h3>
              <a
                href="shop-banner-sidebar.html"
                className="btn btn-dark btn-outline btn-rounded btn-sm"
              >
                shop Now
              </a>
            </div>
          </div>
        </div>
        {/* End of Banner */}
        <div className="col-lg-9 col-sm-8">
          <div className="s row cols-xl-4 cols-lg-3 cols-2">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              products.map((v) => <ProductCard key={v.id} product={v} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

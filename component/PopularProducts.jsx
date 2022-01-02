import React, { useContext, useEffect, useState } from "react";
import AppContext from "../storeData/AppContext";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import client from "../pages/api/client";

export default function PopularProducts() {
  const {
    state: { category },
  } = useContext(AppContext);
  const [activeCat, setActiveCat] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState([]);

  const getActiveCat = async (id) => {
    setLoading(true);
    try {
      setActiveCat(category.find((v) => v.id == id));
      const res = await fetch(`${client}products/category/${id}`);
      const data = await res.json();
      setProducts(data.data);
      console.log("p", data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (category.length) {
      const fCat = category.filter((v) => v.featured == 1);
      setActiveCat(fCat[0]);

      getActiveCat(fCat[0].id);
    }
  }, [category]);

  return (
    <div className="container">
      <h2
        className="title justify-content-center ls-normal mb-4 mt-10 pt-1 appear-animate fadeIn appear-animation-visible"
        style={{ animationDuration: "1.2s" }}
      >
        Popular Products
      </h2>

      <div
        className="tab tab-nav-boxed tab-nav-outline appear-animate fadeIn appear-animation-visible"
        style={{ animationDuration: "1.2s" }}
      >
        <ul className="nav nav-tabs justify-content-center" role="tablist">
          {category.map((v) => (
            <div key={v.id}>
              {v.featured ? (
                <li className="nav-item mr-2 mb-2">
                  <a
                    className={
                      v.id == activeCat.id
                        ? "nav-link br-sm font-size-md ls-normal active"
                        : "nav-link br-sm font-size-md ls-normal"
                    }
                    onClick={() => getActiveCat(v.id)}
                  >
                    {v.name}
                  </a>
                </li>
              ) : null}
            </div>
          ))}
        </ul>
      </div>
      <div
        className="tab-content product-wrapper appear-animate fadeIn appear-animation-visible"
        style={{ animationDuration: "1.2s" }}
      >
        <div className="tab-pane pt-4 active in" id="tab1-1">
          <div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
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
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {products.length
                  ? products.map((v) => <ProductCard key={v.id} product={v} />)
                  : null}
              </>
            )}
          </div>
        </div>
        {/* End of Tab Pane */}
      </div>
    </div>
  );
}

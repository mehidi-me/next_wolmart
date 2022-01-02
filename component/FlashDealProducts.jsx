import React, { useEffect, useState } from "react";
import client from "../pages/api/client";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function FlashDealProducts({ id }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${client}flash-deal-products/${id}`);
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [id]);
  return (
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
    </div>
  );
}

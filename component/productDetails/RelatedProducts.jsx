import React, { useEffect, useState } from "react";
import client from "../../pages/api/client";
import ProductCard from "../ProductCard";
import SkeletonCard from "../SkeletonCard";

export default function RelatedProducts({ product_id }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getRelatedProducts = async (id) => {
    setLoading(true);

    const res = await fetch(`${client}products/related/${id}`);
    const data = await res.json();
    setProducts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getRelatedProducts(product_id);
  }, [product_id]);
  return (
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
  );
}

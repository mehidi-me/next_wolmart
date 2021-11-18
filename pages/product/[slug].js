import { useRouter } from "next/dist/client/router";
import React from "react";
import ProductDetails from "../../component/productDetails/ProductDetails";
import client from "../api/client";

export default function product({ product, productImage, slug }) {
  return (
    <ProductDetails product={product} productImage={productImage} slug={slug} />
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const res = await fetch(client + "products/" + slug);
  const data = await res.json();

  if (data.success) {
    const product = data.data[0];

    const productImage = [...product.photos, product.thumbnail_image];
    return {
      props: { product, productImage, slug }, // will be passed to the page component as props
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

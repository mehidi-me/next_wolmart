import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import ProductDetails from "../../component/productDetails/ProductDetails";
import client, { imgPath } from "../api/client";

export default function product({ product, productImage, slug }) {
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:image" content={imgPath + product.meta_img} />
        <meta
          name="og:title"
          property="og:title"
          content={product.meta_title}
        />

        <meta name="description" content={product.meta_description} />
      </Head>
      <ProductDetails
        product={product}
        productImage={productImage}
        slug={slug}
      />
    </>
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

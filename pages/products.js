import React from "react";
import Products from "../component/filter/Products";
import client from "./api/client";

export default function products({ data, url }) {
  return <Products data={data} url={url} />;
}

export async function getServerSideProps(context) {
  const {
    query: { categories, brands, sort_key, search, min, max },
  } = context;

  const url = `${client}products/search?categories=${categories}&brands=${brands}&sort_key=${sort_key}&name=${search}&min=${min}&max=${max}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: { data, url }, // will be passed to the page component as props
  };
}

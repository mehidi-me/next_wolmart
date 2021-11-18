import Router from "next/router";
import React, { useEffect, useState } from "react";
import client from "../../pages/api/client";
import Filter from "./Filter";

export default function Products({ data, url }) {
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState({ reload: false, nload: false });
  const [isMoreData, setIsMoreData] = useState(true);

  Router.events.on("routeChangeStart", (e) => {
    if (e.startsWith("/products")) {
      setLoading({ reload: true, nload: false });
    }
  });

  const getMoreProducts = async (pageNo) => {
    setLoading({ reload: false, nload: true });
    const res = await fetch(url + "&page=" + pageNo);
    const data = await res.json();
    setFilterProducts([...filterProducts, ...data.data]);
    setLoading({ reload: false, nload: false });
    if (data.links.next) {
      setIsMoreData(true);
    } else {
      setIsMoreData(false);
    }
  };

  useEffect(() => {
    setLoading({ reload: false, nload: false });
    if (data) {
      setFilterProducts(data.data);
      if (data.links.next) {
        setIsMoreData(true);
      } else {
        setIsMoreData(false);
      }
    }
  }, [data]);
  return (
    <div>
      <Filter
        products={filterProducts}
        loading={loading}
        getmore={getMoreProducts}
        ismoredata={isMoreData}
      />
    </div>
  );
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

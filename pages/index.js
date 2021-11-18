import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AllProducts from "../component/AllProducts";
import Banner from "../component/Banner";
import IconBox from "../component/IconBox";
import PopularProducts from "../component/PopularProducts";
import QuickView from "../component/QuickView";
import RecentView from "../component/RecentView";
import TopCategory from "../component/TopCategory";
import AppContext from "../storeData/AppContext";
import client from "./api/client";

export default function Home() {
  const {
    state: { subCategory, category },
  } = useContext(AppContext);
  const [homeCategory, setHomeCategory] = useState([]);

  const getHomeCat = async () => {
    const res = await fetch(client + "categories/home");
    const data = await res.json();
    setHomeCategory(data.data);
  };
  useEffect(() => {
    getHomeCat();
  }, []);
  return (
    <>
      <Banner />
      <div className="container">
        <IconBox />
      </div>
      <TopCategory />
      <PopularProducts />
      <div className="container" style={{ paddingTop: "20px" }}>
        {homeCategory.map((v) => (
          <AllProducts
            name={v.name}
            key={v.id}
            id={v.id}
            subCategory={category.filter((data) => data.parent_id == v.id)}
          />
        ))}

        <RecentView />
      </div>
    </>
  );
}

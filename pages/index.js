import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AllProducts from "../component/AllProducts";
import Banner from "../component/Banner";
import FlashDeals from "../component/FlashDeals";
import IconBox from "../component/IconBox";
import PopularProducts from "../component/PopularProducts";
import QuickView from "../component/QuickView";
import RecentView from "../component/RecentView";
import TopCategory from "../component/TopCategory";
import AppContext from "../storeData/AppContext";
import client, { imgPath } from "./api/client";

export default function Home() {
  const {
    state: { subCategory, category, siteData },
  } = useContext(AppContext);
  const [homeCategory, setHomeCategory] = useState([]);

  const getHomeCat = async () => {
    const res = await fetch(client + "categories/home");
    const data = await res.json();
    setHomeCategory(data.data);
  };
  const [flashDeal, setFlashDeal] = useState([]);

  const getFlashDeal = async () => {
    const res = await fetch(client + "flash-deals");
    const data = await res.json();
    setFlashDeal(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    getHomeCat();
    getFlashDeal();
  }, []);
  return (
    // {
    //   type: "site_icon",
    //   value: "116"
    //   },
    //   {
    //   type: "base_color",
    //   value: "#e62e04"
    //   },
    //   {
    //   type: "base_hov_color",
    //   value: "#e62e04"
    //   },
    //   {
    //   type: "meta_title",
    //   value: "123"
    //   },
    //   {
    //   type: "meta_description",
    //   value: null
    //   },
    //   {
    //   type: "meta_keywords",
    //   value: null
    //   },
    //   {
    //   type: "meta_image",
    //   value: "uploads/all/oQpudHLwoepcmmWb690rc4h9OsKQXkOiuySq3ScD.jpg"
    //   },
    <>
      <Head>
        <meta name="keywords" content={siteData.meta_keywords} />
        <meta name="description" content={siteData.meta_description} />
        <meta name="author" content="MEHIDI" />
        <meta property="og:image" content={imgPath + siteData.meta_image} />
        <meta property="og:title" content={siteData.meta_title} />
        {/* Favicon */}
        <link rel="icon" type="image/png" href={imgPath + siteData.site_icon} />
        {/* WebFont.js */}
        <title>{siteData.website_name}</title>
      </Head>
      <Banner />
      <div className="container">
        <IconBox />
      </div>
      <TopCategory />
      <PopularProducts />
      <FlashDeals flashDeal={flashDeal} />;
      <div className="container" style={{ paddingTop: "20px" }}>
        {homeCategory.map((v) => (
          <AllProducts
            name={v.name}
            key={v.id}
            id={v.id}
            img={imgPath + v.banner}
            subCategory={category.filter((data) => data.parent_id == v.id)}
          />
        ))}

        <RecentView />
      </div>
    </>
  );
}

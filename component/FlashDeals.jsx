import React, { useContext, useEffect, useState } from "react";
import AppContext from "../storeData/AppContext";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import client from "../pages/api/client";
import CountDown from "./CountDown";
import FlashDealProducts from "./FlashDealProducts";

export default function FlashDeals({ flashDeal }) {
  return (
    <>
      {flashDeal.map((v) => (
        <div className="container" key={v.id}>
          <h2
            className="title justify-content-center ls-normal mb-4 mt-10 pt-1 appear-animate fadeIn appear-animation-visible"
            style={{ animationDuration: "1.2s" }}
          >
            {v.title}
          </h2>
          <CountDown eventTime={v.date} />
          <FlashDealProducts id={v.id} />
        </div>
      ))}
    </>
  );
}

import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";
import Script from "next/script";
import $ from "jquery";

import Layout from "../component/layout/Layout";
import { useContext, useEffect, useReducer } from "react";
import reducer from "../storeData/reducer";
import initialState from "../storeData/initialState";
import AppContext from "../storeData/AppContext";
import client from "../pages/api/client";
import App from "next/app";
import "reactjs-popup/dist/index.css";
import { v1 as uuidv1 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FirebaseConfig from "../FirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const fetcher = (url) => fetch(url).then((res) => res.json());

function MyApp({
  Component,
  pageProps,
  category,
  subCategory,
  childCategory,
  generalSettings,
  siteData,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (category) {
      dispatch({
        type: "GET_ALL_CATEGORY",
        payload: { category, subCategory, childCategory },
      });
    }
    if (generalSettings) {
      dispatch({ type: "SET_SETTING", payload: generalSettings });
    }
    if (siteData) {
      dispatch({ type: "SET_SITE_DATA", payload: siteData });
    }
    const cartData = JSON.parse(localStorage.getItem("cartdata"));
    const whishlist = JSON.parse(localStorage.getItem("whishlist"));
    const user = JSON.parse(localStorage.getItem("user"));
    const recentView = JSON.parse(localStorage.getItem("recentview"));
    const uid = localStorage.getItem("uid");
    if (!uid) {
      localStorage.setItem("uid", uuidv1());
    }
    if (cartData) {
      if (cartData.length) {
        dispatch({ type: "SET_CART_DATA", payload: cartData });
      }
    }
    if (whishlist) {
      if (whishlist.length) {
        dispatch({ type: "SET_WHISHLIST_DATA", payload: whishlist });
      }
    }
    if (recentView) {
      if (recentView.length) {
        dispatch({ type: "ADD_TO_RECENTVIEW_DATA", payload: recentView });
      }
    }
    if (user) {
      if (user.id) {
        dispatch({ type: "SET_LOGIN", payload: user });
      }
    }
    const isInBroswer = typeof window !== "undefined";
    if (isInBroswer) {
      window.jQuery = $;
    }

    // let pid = [];
    // for (let index = 0; index < 1000; index++) {
    //   const id = uuidv1();

    //   if (pid.find((v) => v == id)) {
    //     console.log("macth");
    //     break;
    //   }
    //   pid.push(id);
    // }
    // console.log(pid);
    const app = initializeApp(FirebaseConfig);
    const analytics = getAnalytics(app);

    // console.log(analytics);
  }, []);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* <Script src="/assets/vendor/jquery/jquery.min.js"></Script> */}
      <Script src="/assets/vendor/jquery.plugin/jquery.plugin.min.js"></Script>
      <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></Script>
      {/* <Script src="/assets/vendor/zoom/jquery.zoom.js"></Script> */}
      {/* <Script src="/assets/vendor/jquery.countdown/jquery.countdown.min.js"></Script> */}
      <Script src="/assets/vendor/magnific-popup/jquery.magnific-popup.min.js"></Script>
      <Script src="/assets/vendor/skrollr/skrollr.min.js"></Script>

      {/* <Script src="/assets/vendor/swiper/swiper-bundle.min.js"></Script> */}

      <Script src="/assets/js/main.js"></Script>
      <NextNprogress
        color="#336699"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <ToastContainer theme="dark" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext1) => {
  const appProps = await App.getInitialProps(appContext1);
  const isInBroswer = typeof window !== "undefined";

  if (isInBroswer) {
    return {
      pageProps: {
        ...appProps.pageProps,
      },
    };
  } else {
    try {
      let category = await fetcher(client + "categories/all");
      let siteSetting = await fetcher(client + "business-settings");
      //let generalSettings = await fetcher(client + "general-settings");
      let subCategory = [];
      let childCategory = [];

      return {
        pageProps: {
          ...appProps.pageProps,
        },
        category: category.data,
        subCategory,
        childCategory,
        siteData: siteSetting.data,
        //generalSettings: generalSettings.data[0],
      };
    } catch (error) {
      console.log("init error i: ", error);
      return {
        pageProps: {
          ...appProps.pageProps,
        },
      };
    }
  }
};

export default MyApp;

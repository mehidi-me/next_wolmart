import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import ProgressBar from "../ProgressBar";
import { toast } from "react-toastify";
import fAuth from "../../fAuth";
import FirebaseConfig from "../../FirebaseConfig";
import client from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";

export default function FirebaseAuth() {
  const { dispatch } = useContext(AppContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const login = async (p) => {
    setLoading(true);
    const result = await fAuth(p, FirebaseConfig);
    if (result) {
      try {
        const res = await fetch(client + "auth/social-login", {
          method: "post",
          body: JSON.stringify(result),
          mode: "cors",
          headers: { "Content-type": "application/json;charset=utf-8" },
        });
        const data = await res.json();

        if (data.result) {
          dispatch({ type: "LOGIN", payload: data.user });
          if (router.query.pathname) {
            router.push(router.query.pathname);
          } else {
            router.push("/");
          }
          toast.success("Login successfully!");
        } else {
          //setFerror({ type: data.type, msg: data.message });
          toast.warning(data.message);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Server error please try again!");
      }
    } else {
      toast.error("Server error please try again!");
    }
    setLoading(false);
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <ProgressBar visible={loading} />
      </div>
      <div className="social-icons social-icon-border-color d-flex justify-content-center">
        <a
          onClick={loading ? null : () => login("f")}
          className="social-icon social-facebook w-icon-facebook"
        />
        {/* <a href="#" className="social-icon social-twitter w-icon-twitter" /> */}
        <a
          onClick={loading ? null : () => login("g")}
          className="social-icon social-google fab fa-google"
        />
      </div>
    </>
  );
}

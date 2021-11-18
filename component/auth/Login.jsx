import Link from "next/link";
import React, { useContext, useState } from "react";
import InputBox from "./InputBox";
import ProgressBar from "../ProgressBar";
import client from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";
import { useRouter } from "next/dist/client/router";

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [ferror, setFerror] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onsubmitLogin = async (e) => {
    setFerror("");
    e.preventDefault();
    let tar = e.target;
    if (tar[0].value == "") {
      tar[0].focus();
      return setFerror({ type: "mobile", msg: "Please enter number or email" });
    }
    if (tar[1].value == "") {
      tar[1].focus();
      return setFerror({
        type: "password",
        msg: "Please enter password",
      });
    }

    setLoading(true);
    const body = {
      email: tar[0].value,
      password: tar[1].value,
      user_type: "customer",
    };

    try {
      const res = await fetch(client + "auth/login", {
        method: "post",
        body: JSON.stringify(body),
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
      } else {
        setFerror({ type: data.type, msg: data.message });
      }
    } catch (error) {
      console.log(error);
      setFerror({ type: "server", msg: "Server error please try again!" });
    }

    setLoading(false);
  };
  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="login-popup" style={{ flex: 1 }}>
        <div className="tab tab-nav-boxed tab-nav-center tab-nav-underline">
          <ul className="nav nav-tabs text-uppercase" role="tablist">
            <li className="nav-item">
              <Link href={"/login?pathname=" + router.query.pathname}>
                <a href="#sign-in" className="nav-link active">
                  Sign In
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/signup?pathname=" + router.query.pathname}>
                <a href="#sign-up" className="nav-link">
                  Sign Up
                </a>
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="sign-in">
              <form onSubmit={onsubmitLogin}>
                <InputBox
                  type="text"
                  name="mobile"
                  label="Mobile or email address *"
                  error={ferror}
                />
                <InputBox
                  type="text"
                  name="password"
                  label="Password *"
                  error={ferror}
                />

                {/* <div className="form-checkbox d-flex align-items-center justify-content-between">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="remember"
                  name="remember"
                  required
                />
                <label htmlFor="remember">Remember me</label>
                <a href="#">Last your password?</a>
              </div> */}
                {ferror ? (
                  ferror.type == "server" ? (
                    <p style={{ color: "red" }}>{ferror.msg}</p>
                  ) : null
                ) : null}

                <button
                  type="submit"
                  className={
                    loading ? "btn btn-primary disabled" : "btn btn-primary"
                  }
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  Login
                </button>
                <ProgressBar visible={loading} />
              </form>
            </div>
          </div>
          <p className="text-center">Sign in with social account</p>
          <div className="social-icons social-icon-border-color d-flex justify-content-center">
            <a
              href="#"
              className="social-icon social-facebook w-icon-facebook"
            />
            <a href="#" className="social-icon social-twitter w-icon-twitter" />
            <a href="#" className="social-icon social-google fab fa-google" />
          </div>
        </div>
      </div>
    </div>
  );
}

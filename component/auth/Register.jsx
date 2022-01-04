import Link from "next/link";
import React, { useContext, useState } from "react";
import client from "../../pages/api/client";
import InputBox from "./InputBox";
import ProgressBar from "../ProgressBar";
import AppContext from "../../storeData/AppContext";
import { useRouter } from "next/dist/client/router";
import FirebaseAuth from "./FirebaseAuth";

export default function Register() {
  const { dispatch } = useContext(AppContext);
  const [ferror, setFerror] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const singupSubmit = async (e) => {
    setFerror("");
    e.preventDefault();
    let tar = e.target;
    if (tar[0].value == "") {
      tar[0].focus();
      return setFerror({ type: "fname", msg: "Please enter your full name" });
    }
    if (tar[1].value == "") {
      tar[1].focus();
      return setFerror({
        type: "mobile",
        msg: "Please enter your mobile number",
      });
    }
    if (tar[2].value == "") {
      tar[2].focus();
      return setFerror({ type: "email", msg: "Please enter your email" });
    }
    if (tar[3].value == "") {
      tar[3].focus();
      return setFerror({ type: "password", msg: "Please enter password" });
    }

    setLoading(true);
    const body = {
      name: tar[0].value,
      phone: tar[1].value,
      email: tar[2].value,
      password: tar[3].value,
      register_by: "email",
    };

    try {
      const res = await fetch(client + "auth/signup", {
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
                <a href="#sign-in" className="nav-link">
                  Sign In
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/signup?pathname=" + router.query.pathname}>
                <a href="#sign-up" className="nav-link active">
                  Sign Up
                </a>
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active in" id="sign-up">
              <form onSubmit={singupSubmit}>
                <InputBox
                  type="text"
                  name="fname"
                  label="Enter your full name *"
                  error={ferror}
                />
                <InputBox
                  type="text"
                  name="mobile"
                  label="Enter your mobile number *"
                  error={ferror}
                />
                <InputBox
                  type="email"
                  name="email"
                  label="Enter your email address *"
                  error={ferror}
                />
                <InputBox
                  type="text"
                  name="password"
                  label="Enter your password *"
                  error={ferror}
                />
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <a href="#" className="text-primary">
                    privacy policy
                  </a>
                  .
                </p>

                <div className="form-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id="agree"
                    name="agree"
                    required
                  />

                  <label htmlFor="agree" className="font-size-md">
                    I agree to the{" "}
                    <a href="#" className="text-primary font-size-md mb-1">
                      privacy policy
                    </a>
                  </label>
                </div>
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
                  Sign up
                </button>
                <ProgressBar visible={loading} />
              </form>
            </div>
          </div>
          <p className="text-center">Sign in with social account</p>
          <FirebaseAuth />
        </div>
      </div>
    </div>
  );
}

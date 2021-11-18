import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AppContext from "../../storeData/AppContext";
import client from "../../pages/api/client";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/dist/client/router";
import ProgressBar from "../ProgressBar";

export default function UserAddress() {
  const {
    state: { user },
  } = useContext(AppContext);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dloading, setdLoading] = useState({ type: "", load: false });
  const route = useRouter();

  const getAddress = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(client + "user/shipping/address/" + id);
      const data = await res.json();
      if (data.success) {
        if (!data.data.length) {
          toast.warning("Please add your address");
          route.push("/user/address/add");
        }
        setAddress(data.data);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
    setLoading(false);
  };

  const deleteAddress = async (id) => {
    setdLoading({ type: id, load: true });
    try {
      const res = await fetch(client + "user/shipping/delete/" + id);
      const data = await res.json();
      if (data.result) {
        toast.success(data.message);
        getAddress(user.id);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
    setdLoading({ type: id, load: false });
  };

  const makeDefaultAddress = async (id) => {
    setdLoading({ type: id, load: true });
    try {
      const body = {
        user_id: user.id,
        id,
      };
      const res = await fetch(client + "user/shipping/make_default", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });
      const data = await res.json();

      if (data.result) {
        toast.success(data.message);
        getAddress(user.id);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }

    setdLoading({ type: id, load: false });
  };

  useEffect(() => {
    if (user) {
      getAddress(user.id);
    }
  }, [user]);

  return (
    <div id="account-details">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div className="icon-box icon-box-side icon-box-light">
          <span className="icon-box-icon icon-account mr-2">
            <i className="w-icon-user" />
          </span>
          <div className="icon-box-content">
            <h4 className="icon-box-title mb-0 ls-normal">Address List</h4>
          </div>
        </div>
        <Link href="/user/address/add">
          <a className="btn btn-dark btn-rounded btn-sm ml-lg-2">
            Add New Address
          </a>
        </Link>
      </div>

      <table className="shop-table wishlist-table">
        <thead>
          <tr>
            <th className="product-name">
              <span>Address</span>
            </th>
            <th className="product-price">
              <span>Region</span>
            </th>
            <th className="product-stock-status">
              <span>Phone Numher</span>
            </th>
            <th className="wishlist-action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <tr>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
                <td className="product-name">
                  <Skeleton />
                </td>
              </tr>
            </>
          ) : (
            <>
              {address.length ? (
                address.map((v) => (
                  <>
                    <tr key={v.id}>
                      <td className="product-name">
                        <span>{v.address}</span>
                      </td>

                      <td className="product-name">
                        <span>
                          {v.country}
                          {" - "}
                          {v.city}
                        </span>
                      </td>
                      <td className="product-stock-status">
                        <span className="wishlist-in-stock">{v.phone}</span>
                      </td>
                      <td className="wishlist-action">
                        <div className="d-lg-flex">
                          {v.set_default ? (
                            <span style={{ fontSize: "12px", color: "#333" }}>
                              Default Shipping Address Default Billing Address
                            </span>
                          ) : (
                            <a
                              onClick={() => makeDefaultAddress(v.id)}
                              className="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0"
                            >
                              Make Defualt
                            </a>
                          )}

                          <a
                            onClick={() => {
                              window.confirm(
                                "Are you sure? delete this address"
                              )
                                ? deleteAddress(v.id)
                                : null;
                            }}
                            className="btn btn-dark btn-rounded btn-sm ml-lg-2 btn-cart"
                          >
                            Delete
                          </a>
                        </div>
                      </td>
                    </tr>
                    {dloading.type == v.id ? (
                      <ProgressBar visible={dloading.load} />
                    ) : null}
                  </>
                ))
              ) : (
                <h2>No data found!</h2>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

import Router, { route } from "next/dist/server/router";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import client from "../../pages/api/client";
import AppContext from "../../storeData/AppContext";

export default function UserOrders() {
  const {
    state: { user },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(client + "purchase-history/" + user.id);
      const data = await res.json();
      if (data.success) {
        setAllOrders(data.data);
      } else {
        toast.error("Something wrong try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) {
      getAllOrders();
    }
  }, [user]);
  return (
    <div className=" mb-4" id="account-orders">
      <div className="icon-box icon-box-side icon-box-light">
        <span className="icon-box-icon icon-orders">
          <i className="w-icon-orders" />
        </span>
        <div className="icon-box-content">
          <h4 className="icon-box-title text-capitalize ls-normal mb-0">
            Orders
          </h4>
        </div>
      </div>
      <table className="shop-table account-orders-table mb-6">
        <thead>
          <tr>
            <th className="order-id">Order</th>
            <th className="order-date">Date</th>
            <th className="order-status">Status</th>
            <th className="order-total">Total</th>
            <th className="order-actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <>
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
                <td>
                  <Skeleton />
                </td>
              </tr>
              {/* id: 9,
code: "20211118-081754",
user_id: 22,
payment_type: "Cash On Delivery",
payment_status: "unpaid",
payment_status_string: "Unpaid",
delivery_status: "pending",
delivery_status_string: "Order Placed",
grand_total: "৳120.000",
date: "18-11-2021", */}
            </>
          ) : (
            <>
              {!allOrders.length ? (
                <tr>
                  <td>Data Not Found!</td>
                </tr>
              ) : (
                allOrders.map((v) => (
                  <tr key={v.id}>
                    <td className="order-id">{v.code}</td>
                    <td className="order-date">{v.date}</td>
                    <td className="order-status">{v.delivery_status}</td>
                    <td className="order-total">
                      <span className="order-price">{v.grand_total}</span>
                    </td>
                    <td className="order-action">
                      <Link href={"/user/orderdetails?id=" + v.id}>
                        <a className="btn btn-outline btn-default btn-block btn-sm btn-rounded">
                          View
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>
      <Link href="/">
        <a className="btn btn-dark btn-rounded btn-icon-right">
          Go Shop
          <i className="w-icon-long-arrow-right" />
        </a>
      </Link>
    </div>
  );
}

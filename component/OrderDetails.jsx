import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import client from "../pages/api/client";

export default function OrderDetails() {
  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [itemsLoading, setItemLoading] = useState(false);

  const getData = async (id, setLoading, setData, path) => {
    setLoading(true);
    try {
      const res = await fetch(client + path + id);
      const data = await res.json();
      console.log(data);
      if (data.success) {
        if (data.data.length) {
          setData(data.data);
        } else {
          toast.error("Something wrong try again!");
          router.push("/");
        }
      } else {
        toast.error("Something wrong try again!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
      router.push("/");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        await getData(
          router.query.id,
          setDetailsLoading,
          setOrderDetails,
          "purchase-history-details/"
        );
        await getData(
          router.query.id,
          setItemLoading,
          setOrderItems,
          "purchase-history-items/"
        );
      })();
    } else {
      toast.error("Something wrong try again!");
      router.push("/");
    }
  }, []);
  return (
    <>
      {detailsLoading ? (
        <ul className="order-view list-style-none">
          <li>
            <label>Order number</label>
            <strong>
              <Skeleton width={100} height={50} />
            </strong>
          </li>
          <li>
            <label>Status</label>
            <strong>
              <Skeleton width={100} height={50} />
            </strong>
          </li>
          <li>
            <label>Date</label>
            <strong>
              <Skeleton width={100} height={50} />
            </strong>
          </li>
          <li>
            <label>Total</label>
            <strong>
              <Skeleton width={100} height={50} />
            </strong>
          </li>
          <li>
            <label>Payment method</label>
            <strong>
              <Skeleton width={100} height={50} />
            </strong>
          </li>
        </ul>
      ) : (
        <>
          {orderDetails.length ? (
            <>
              <ul className="order-view list-style-none">
                <li>
                  <label>Order number</label>
                  <strong>{orderDetails[0].code}</strong>
                </li>
                <li>
                  <label>Status</label>
                  <strong>{orderDetails[0].delivery_status}</strong>
                </li>
                <li>
                  <label>Date</label>
                  <strong>{orderDetails[0].date}</strong>
                </li>
                <li>
                  <label>Total</label>
                  <strong>{orderDetails[0].grand_total}</strong>
                </li>
                <li>
                  <label>Payment method</label>
                  <strong>{orderDetails[0].payment_type}</strong>
                </li>
              </ul>

              <div className="ecommerce-address shipping-address">
                <h4 className="title title-underline ls-25 font-weight-bold">
                  Shipping Address
                </h4>
                <address className="mb-4">
                  <table className="address-table">
                    <tbody>
                      <tr>
                        <td>{orderDetails[0].shipping_address.name}</td>
                      </tr>
                      <tr>
                        <td>{orderDetails[0].shipping_address.email}</td>
                      </tr>
                      <tr>
                        <td>{orderDetails[0].shipping_address.phone}</td>
                      </tr>
                      <tr style={{ width: "320px" }}>
                        <td>
                          {orderDetails[0].shipping_address.address +
                            ", " +
                            orderDetails[0].shipping_address.city +
                            ", " +
                            orderDetails[0].shipping_address.postal_code +
                            " " +
                            orderDetails[0].shipping_address.country}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </address>
              </div>
            </>
          ) : null}
        </>
      )}

      <div className="order-details-wrapper mb-5">
        <h4 className="title text-uppercase ls-25 mb-5">Order Details</h4>
        <table className="order-table">
          <thead>
            <tr>
              <th className="text-dark">Product</th>
              <th />
            </tr>
          </thead>

          {itemsLoading || detailsLoading ? (
            <>
              <tbody>
                <tr>
                  <Skeleton />
                </tr>
                <tr>
                  <Skeleton />
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <Skeleton />
                </tr>
                <tr>
                  <Skeleton />
                </tr>
                <tr>
                  <Skeleton />
                </tr>
                <tr className="total">
                  <Skeleton />
                </tr>
              </tfoot>
            </>
          ) : (
            <>
              <tbody>
                {orderItems.map((v) => (
                  <tr key={v.product_id}>
                    <td>
                      <a href="">{v.product_name}</a>&nbsp;
                      <strong>x {v.quantity}</strong>
                    </td>
                    <td>{v.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {orderDetails.length ? (
                  <>
                    <tr>
                      <th>Subtotal:</th>
                      <td>{orderDetails[0].subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping Fee:</th>
                      <td>{orderDetails[0].shipping_cost}</td>
                    </tr>
                    <tr>
                      <th>{"Vat & Tax:"}</th>
                      <td>{orderDetails[0].tax}</td>
                    </tr>
                    {orderDetails[0].coupon_discount != "৳0.000" ? (
                      <tr>
                        <th>{"Coupon Discount:"}</th>
                        <td>
                          {"- "}
                          {orderDetails[0].coupon_discount}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <th>Payment method:</th>
                      <td>{orderDetails[0].payment_type}</td>
                    </tr>
                    <tr className="total">
                      <th className="border-no">Total:</th>
                      <td className="border-no">
                        {orderDetails[0].grand_total}
                      </td>
                    </tr>
                  </>
                ) : null}
              </tfoot>
            </>
          )}
        </table>
      </div>

      {/* End of Account Address */}
      <a
        onClick={() => router.push("/user/orders")}
        className="btn btn-dark btn-rounded btn-icon-left btn-back mt-6"
      >
        <i className="w-icon-long-arrow-left" />
        Back To List
      </a>
    </>
  );
}

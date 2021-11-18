import { region } from "caniuse-lite";
import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import client from "../../pages/api/client";
import { data } from "browserslist";
import AppContext from "../../storeData/AppContext";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";

export default function AddressAdd() {
  const route = useRouter();
  const {
    state: { user },
  } = useContext(AppContext);
  const [loading, setLoading] = useState({ type: "", load: false });

  const [region, setRegion] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  const getData = async (url, setData, type) => {
    setLoading({ type, load: true });

    try {
      const res = await fetch(client + url);
      const data = await res.json();
      if (data) {
        if (data.length) {
          setData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoading({ type, load: false });
  };

  const addAddress = async (e) => {
    e.preventDefault();

    let region = "";
    let city = "";
    let area = "";
    let address = "";
    let code = "";
    let phone = "";
    for (let index = 0; index < e.target.length; index++) {
      const v = e.target[index];
      switch (v.name) {
        case "region":
          region = v.value ? JSON.parse(v.value).name : "";
          break;
        case "city":
          city = v.value ? JSON.parse(v.value).name : "";
          break;
        case "area":
          area = v.value ? JSON.parse(v.value).name : "";
          break;
        case "address":
          address = v.value;
          break;
        case "zip":
          code = v.value;
          break;
        case "phone":
          phone = v.value;
          break;
        default:
          break;
      }
    }

    if (region && city && area && address && code && phone) {
      const body = {
        user_id: user.id,
        address: address,
        country: region + " - " + city,
        city: area,
        postal_code: code,
        phone,
      };
      setLoading({ type: "s", load: true });
      try {
        const res = await fetch(client + "user/shipping/create", {
          method: "post",
          body: JSON.stringify(body),
          mode: "cors",
          headers: { "Content-type": "application/json;charset=utf-8" },
        });
        const data = await res.json();

        if (data.result) {
          toast.success(data.message);
          if (route.query.pathname) {
            route.push(route.query.pathname);
          } else {
            route.push("/user/address");
          }
        } else {
          toast.error("Something wrong try again!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Server error please try again!");
      }
      setLoading({ type: "s", load: false });
    } else {
      toast.error("All input value is required!");
    }
  };

  useEffect(() => {
    getData("divisions", setRegion, "r");
  }, []);
  return (
    <div className="checkout mb-4">
      <h3 className="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">
        Add New Address
      </h3>
      <form onSubmit={addAddress}>
        <div className="row gutter-sm">
          <div className="col-xs-6">
            <div className="form-group">
              <label>Choose Region *</label>
              <div className="select-box">
                <select
                  required
                  name="region"
                  className="form-control form-control-md"
                  disabled={
                    loading.type == "r" && region.length ? loading.load : false
                  }
                  onChange={(e) => {
                    getData(
                      "districts/" + JSON.parse(e.target.value).id,
                      setCity,
                      "c"
                    );
                    setArea([]);
                  }}
                >
                  <option value="" selected="selected" disabled>
                    Choose Your Region
                  </option>
                  {region.map((v) => (
                    <option
                      key={v.id}
                      value={`{"id":"${v.id}","name":"${v.name}"}`}
                    >
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {loading.type == "r" ? (
              <ProgressBar visible={loading.load} />
            ) : null}
          </div>
          <div className="col-xs-6">
            <div className="form-group">
              <label>Choose City *</label>
              <div className="select-box">
                <select
                  required
                  name="city"
                  className="form-control form-control-md"
                  disabled={
                    loading.type == "c" && region.length ? loading.load : false
                  }
                  onChange={(e) =>
                    getData(
                      "upazilas/" + JSON.parse(e.target.value).id,
                      setArea,
                      "a"
                    )
                  }
                >
                  <option value="" selected="selected" disabled>
                    Choose Your City
                  </option>
                  {city.map((v) => (
                    <option
                      key={v.id}
                      value={`{"id":"${v.id}","name":"${v.name}"}`}
                      data-name={v.name}
                    >
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {loading.type == "c" ? (
              <ProgressBar visible={loading.load} />
            ) : null}
          </div>
        </div>

        <div className="form-group">
          <label>Choose Area *</label>
          <div className="select-box">
            <select
              required
              name="area"
              className="form-control form-control-md"
              disabled={
                loading.type == "a" && region.length ? loading.load : false
              }
            >
              <option value="" selected="selected" disabled>
                Choose Your Area
              </option>
              {area.map((v) => (
                <option
                  key={v.id}
                  value={`{"id":"${v.id}","name":"${v.name}"}`}
                  data-name={v.name}
                >
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading.type == "a" ? <ProgressBar visible={loading.load} /> : null}
        <div className="form-group">
          <label>Enter Address *</label>
          <input
            type="text"
            placeholder="For Example: House# 123, Street# 123, ABC Road"
            className="form-control form-control-md mb-2"
            name="address"
            required
          />
        </div>
        <div className="row gutter-sm">
          <div className="col-md-6">
            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                className="form-control form-control-md"
                name="zip"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                className="form-control form-control-md"
                name="phone"
                required
              />
            </div>
          </div>
        </div>
        <div
          className="form-group place-order pt-6"
          style={{ textAlign: "center" }}
        >
          <button
            disabled={loading.type == "s" ? loading.load : false}
            type="submit"
            className="btn btn-dark btn-rounded"
          >
            Submit
          </button>
          {loading.type == "s" ? <ProgressBar visible={loading.load} /> : null}
        </div>
      </form>
    </div>
  );
}

import { toast } from "react-toastify";
import client from "../../pages/api/client";

const update = async (type, payload, curp, dispatch) => {
  const quantity = type == "in" ? curp.quantity + 1 : curp.quantity - 1;
  if (quantity >= 1) {
    const body = {
      id: curp.id,
      quantity,
    };

    try {
      const res = await fetch(client + "carts/change-quantity", {
        method: "post",
        body: JSON.stringify(body),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        if (data.result) {
          dispatch(payload);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong try again!");
    }
  }
};

const remove = async (id, dispatch) => {
  try {
    const res = await fetch(client + "carts/remove", {
      method: "post",
      body: JSON.stringify({ id }),
      mode: "cors",
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      if (data.result) {
        dispatch({
          type: "REMOVE_TO_CART",
          payload: { id },
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Something wrong try again!");
  }
};

const add = async (id, quantity, dispatch) => {
  const body = {
    user_id: localStorage.getItem("uid"),
    id,
    quantity,
    variant: "",
  };
  try {
    const res = await fetch(client + "carts/add", {
      method: "post",
      body: JSON.stringify(body),
      mode: "cors",
      headers: { "Content-type": "application/json;charset=utf-8" },
    });

    const data = await res.json();
    console.log(data);

    if (data) {
      if (data.result) {
        dispatch({ type: "UPDATE_CART", payload: data.data[0].cart_items });
        document
          .querySelector(
            "div.header-middle > div > div.header-right> div.dropdown > a"
          )
          .click();

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("Something wrong try again!");
  }
};

export { update, remove, add };

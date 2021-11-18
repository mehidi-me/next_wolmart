const addToWishlist = (state, payload) => {
  const newData = [...state.whishlist, payload];
  localStorage.setItem("whishlist", JSON.stringify(newData));
  return { ...state, whishlist: newData };
};

const removeWishlist = (state, id) => {
  const newData = state.whishlist.filter((v) => v.id != id);
  localStorage.setItem("whishlist", JSON.stringify(newData));
  return { ...state, whishlist: newData };
};

const addToCart = (state, payload) => {
  const newData = [...state.cartData, payload];
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

// cart update all time *********//
const updateCart = (state, payload) => {
  localStorage.setItem("cartdata", JSON.stringify(payload));
  return { ...state, cartData: payload };
};

const removeCart = (state, id) => {
  const newData = state.cartData.filter((v) => v.id != id);
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const increaseQty = (state, id) => {
  const newData = state.cartData.map((data) => {
    if (data.product_id == id) {
      return { ...data, quantity: data.quantity + 1 };
    }
    return data;
  });
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const decreaseQty = (state, id) => {
  const newData = state.cartData
    .map((data) => {
      if (data.product_id == id) {
        return { ...data, quantity: data.quantity - 1 };
      }
      return data;
    })
    .filter((v) => v.quantity != 0);

  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const login = (state, payload) => {
  localStorage.setItem("user", JSON.stringify(payload));
  return { ...state, user: payload };
};

const logout = (state) => {
  localStorage.removeItem("user");
  return { ...state, user: null };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY":
      return { ...state, ...action.payload };
      break;

    case "ADD_TO_WHISHLIST":
      return addToWishlist(state, action.payload);
      break;

    case "ADD_TO_CART":
      return addToCart(state, action.payload);
      break;

    case "UPDATE_CART":
      return updateCart(state, action.payload);
      break;

    case "SET_CART_DATA":
      return { ...state, cartData: action.payload };
      break;

    case "SET_WHISHLIST_DATA":
      return { ...state, whishlist: action.payload };
      break;

    case "REMOVE_TO_WHISHLIST":
      return removeWishlist(state, action.payload.id);
      break;

    case "REMOVE_TO_CART":
      return removeCart(state, action.payload.id);
      break;

    case "INCREASE_QTY":
      return increaseQty(state, action.payload.id);
      break;

    case "DECREASE_QTY":
      return decreaseQty(state, action.payload.id);
      break;

    case "CLEAR_CART":
      return { ...state, cartData: [] };
      break;

    case "LOGIN":
      return login(state, action.payload);
      break;

    case "SET_LOGIN":
      return { ...state, user: action.payload };
      break;

    case "LOG_OUT":
      return logout(state);
    default:
      return state;
      break;
  }
};

export default reducer;

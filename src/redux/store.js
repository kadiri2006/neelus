import { createStore } from "redux";
import { cartReducer } from "./cartReducer";
import { rootReducer } from "./rootReducer";

const preloadedState = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("myCart")) ?? [],
  },
};

export const store = createStore(
  rootReducer,
  preloadedState,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

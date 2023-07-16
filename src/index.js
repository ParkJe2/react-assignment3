import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import productsReducer from "./redux/products";
import cartReducer from "./redux/cart";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Redux store 구성
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

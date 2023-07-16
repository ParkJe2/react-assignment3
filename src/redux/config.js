import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import products from "./products";
import cart from "./cart";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// 리덕스 스토어 구성
const store = configureStore({
  reducer: {
    products: products.reducer,
    cart: cart.reducer,
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

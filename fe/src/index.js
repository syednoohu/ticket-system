import React from "react";
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { orderApiSlice } from './Redux/features/orderApiSlice';

import { store } from "./Redux/store"
// store.dispatch(orderApiSlice.endpoints.getOrders.initiate());

// setupListeners(store.dispatch);

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
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-slick";
import App from "./App";
import store from "./store";
import { inject } from "@vercel/analytics";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <inject>
        <App />
      </inject>
    </Provider>
  </React.StrictMode>
);

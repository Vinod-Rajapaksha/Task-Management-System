import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import { checkAuth } from "./store/thunks/authThunk";
import "./index.css";

store.dispatch(checkAuth());

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles.scss";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import router from "./routes";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
}

reportWebVitals(console.log);

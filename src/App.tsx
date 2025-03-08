import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;

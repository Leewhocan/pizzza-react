import React from "react";
import ReactDOM from "react-dom/client"; //выташи весь код из библиотеки в кавычках и засунь в переменную ReactDOM
import "./index.css"; //просто запуск кода в файле
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

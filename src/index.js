import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

// import {ConfigProvider} from 'antd'
// import zhCN from 'antd/lib/locale-provider/zh_CN'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // <ConfigProvider locale={zhCN}>
  //      <App />
  // </ConfigProvider>,
  document.getElementById("root")
);

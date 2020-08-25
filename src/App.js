import React from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

// 引入 第三方 国际化组件
import {IntlProvider} from 'react-intl'
// 引入语言包 
import {zh, en} from './locales'
import {connect} from 'react-redux'
// 全球化配置
import { ConfigProvider } from 'antd';
// 语言包
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

function App(props) {
  // 判断
  const locale = props.intl
  const messages = locale === "en" ? en : zh

  const antLocal = locale === 'en' ? enUS : zhCN
  return (
    <Router history={history}>
      <IntlProvider locale={locale} messages={messages}>
        <ConfigProvider locale={antLocal}>
        <Layout />
        </ConfigProvider>
         
      </IntlProvider>
      
    </Router>
  );
}

export default connect(state=>({intl:state.intl}))(App);

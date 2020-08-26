import React, { Component } from "react";
import Analysis from '@pages/Admin/Analysis'
import Scales from '@pages/Admin/Scales'
import Static from '@pages/Admin/Static'
import Search from '@pages/Admin/Search'
export default class Admin extends Component {
  render() {
    return (
      <div>
          {/* 分析组件 */}
          <Analysis></Analysis>

          {/* 销售组件 */}
          <Scales></Scales>

          <Static></Static>

          <Search></Search>
      </div>
    );
  }
}

import React, { Component } from 'react'

import {Card,Button,DatePicker} from 'antd'

// 导入monment时间库
import moment from 'moment'

const { RangePicker } = DatePicker;

const tabListNoTitle = [
  {
    key: 'scales',
    tab: '销售量'
  },
  {
    key: 'visits',
    tab: '访问量'
  }
]

const contentListNoTitle = {
  scales: <p>scales content</p>,
  visits: <p>visits content</p>
}

export default class Scales extends Component {

  state={
    noTitleKey:'scales',
    titleKey:"scales",
    dateFlag:"day",
    rangeTime:[moment(),moment()]
  }

  onTabChange = key =>{

    this.setState({
      noTitleKey:key,
      titleKey:key
    })
  }

  // 日期选择回调
  handleBtnClick = flag => () =>{
    // flag ： day/week/month/year

    let rangeTime = []

    switch (flag) {
      case "day":
          rangeTime = [moment(), moment()]
          break
      case "week":
          rangeTime = [moment(), moment().add(7, 'd')]
          break
      case "month":
          rangeTime = [moment(), moment().add(1, 'M')]
          break
      case "year":
          rangeTime = [moment(), moment().add(1, 'y')]
          break
  }

   this.setState({
    dateFlag:flag,
    rangeTime
   })
  }

  // 时间选择
  RangePickerChange = (moment)=>{
    this.setState({
      rangeTime:moment
    })
  }

  render() {

    const Extra = (
      <>
          <Button type={this.state.dateFlag === "day" ? "link" : "text"} onClick={this.handleBtnClick("day")} >今日</Button>
          <Button type={this.state.dateFlag === "week" ? "link" : "text"} onClick={this.handleBtnClick("week")} >本周</Button>
          <Button type={this.state.dateFlag === "month" ? "link" : "text"} onClick={this.handleBtnClick("month")} >本月</Button>
          <Button type={this.state.dateFlag === "year" ? "link" : "text"} onClick={this.handleBtnClick("year")} >本年</Button>
          <RangePicker value={this.state.rangeTime} onChange={this.RangePickerChange}></RangePicker>
      </>
    )
    return (
      <Card
          style={{ width: '100%' }}
          // tab标题
          tabList={tabListNoTitle}
          // tab高亮效果
          activeTabKey={this.state.noTitleKey}
          tabBarExtraContent={Extra}
          // 高亮动态切换
          onTabChange={
            this.onTabChange
          }
        >
          {/* 内容 */}
          {contentListNoTitle[this.state.titleKey]}
        </Card>
    )
  }
}
